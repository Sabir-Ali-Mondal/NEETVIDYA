const Student = require("../models/Student");
const Teacher = require("../models/Teacher");
const Exam = require("../models/Exam");
const Attempt = require("../models/Attempt");
const Question = require("../models/Question");
const Course = require("../models/Course");
const Batch = require("../models/Batch");
const Material = require("../models/Material");
const Enquiry = require("../models/Enquiry");
const Result = require("../models/Result");
const ExamPermission = require("../models/ExamPermission");

const getAdminDashboard = async () => {
  const ExamPermission = require("../models/ExamPermission");

  const [
    studentCount,
    teacherCount,
    examCount,
    attemptCount,
    questionCount,
    courseCount,
    batchCount,
    materialCount,
    videoCount,
    enquiryCount,
  ] = await Promise.all([
    Student.countDocuments({ isActive: true }),
    Teacher.countDocuments({ isActive: true }),
    Exam.countDocuments(),
    Attempt.countDocuments({ status: { $in: ["SUBMITTED", "AUTO_SUBMITTED"] } }),
    Question.countDocuments({ isActive: true }),
    Course.countDocuments({ isActive: true }),
    Batch.countDocuments({ isActive: true }),
    Material.countDocuments({ isActive: true }),
    // Video lectures now live as materials with type VIDEO.
    Material.countDocuments({ isActive: true, type: "VIDEO" }),
    Enquiry.countDocuments({ status: "PENDING" }),
  ]);

  const recentAttempts = await Attempt.find()
    .populate("student", "name email")
    .populate("exam", "title testType")
    .sort({ createdAt: -1 })
    .limit(5);

  const recentStudents = await Student.find()
    .populate("user", "name email")
    .sort({ createdAt: -1 })
    .limit(5);

  // Students who need admin follow-up: not in any batch OR no exam permission.
  const attentionStudents = await getAttentionStudents(12);
  const attentionCount = await countAttentionStudents();

  return {
    studentCount,
    teacherCount,
    examCount,
    attemptCount,
    questionCount,
    courseCount,
    batchCount,
    materialCount,
    videoCount,
    enquiryCount,
    recentAttempts,
    recentStudents,
    attentionStudents,
    attentionCount,
  };
};

// Shared: students missing a batch or any exam permission.
const findAttentionStudentDocs = async (limit = 0) => {
  const ExamPermission = require("../models/ExamPermission");

  // Students with at least one active exam permission (excluded from attention).
  const permittedIds = await ExamPermission.find({ isActive: true }).distinct("student");

  const query = Student.find({
    isActive: true,
    $or: [
      // no batch at all — either the field is missing or the array is empty
      { batches: { $exists: false } },
      { batches: { $size: 0 } },
      // or no exam permission
      { user: { $nin: permittedIds } },
    ],
  })
    .populate("user", "name email phone isActive lastLogin createdAt")
    .populate("batches", "name code")
    .populate("registrationSource.course", "name")
    .populate("registrationSource.batch", "name code")
    .sort({ createdAt: -1 });

  if (limit) query.limit(limit);
  return query;
};

const getAttentionStudents = async (limit = 12) => {
  const ExamPermission = require("../models/ExamPermission");
  const students = await findAttentionStudentDocs(limit);

  const userIds = students.map((s) => s.user?._id).filter(Boolean);
  const permittedUserIds = new Set(
    (await ExamPermission.find({ student: { $in: userIds }, isActive: true }).distinct("student"))
      .map((id) => id.toString())
  );

  return students.map((s) => {
    const obj = s.toObject();
    const batchCount = obj.batches?.length || 0;
    const hasExamPermission = s.user?._id ? permittedUserIds.has(s.user._id.toString()) : false;
    const reasons = [];
    if (batchCount === 0) reasons.push("Not enrolled in any batch");
    if (!hasExamPermission) reasons.push("Not permitted for any exam");
    // Yellow when only the batch is missing (exam access exists); red otherwise.
    const attentionLevel = batchCount === 0 && hasExamPermission ? "yellow" : "red";
    return { ...obj, needsAttention: true, attentionReasons: reasons, attentionLevel };
  });
};

const countAttentionStudents = async () => {
  const ExamPermission = require("../models/ExamPermission");
  const permittedIds = await ExamPermission.find({ isActive: true }).distinct("student");
  return Student.countDocuments({
    isActive: true,
    $or: [
      { batches: { $exists: false } },
      { batches: { $size: 0 } },
      { user: { $nin: permittedIds } },
    ],
  });
};

const getStudentDashboard = async (studentUserId) => {
  const { publishScheduledResults } = require("./exam.service");
  const ExamPermission = require("../models/ExamPermission");

  // Release any scheduled results whose time has come before reading.
  await publishScheduledResults().catch(() => {});
  const student = await Student.findOne({ user: studentUserId }).populate(
    "batches",
    "name code batchType startDate endDate schedule course"
  );
  const batchIds = (student?.batches || []).map((b) => b._id || b);
  const perms = await ExamPermission.find({ student: studentUserId, isActive: true }).select("exam");
  const permittedExamIds = perms.map((p) => p.exam);

  // Course-wide exams (examScope = COURSE) target every batch under their course
  // rather than a single `batch`, so resolve the student's batches back to their
  // courses — otherwise those tests would never appear on the dashboard.
  const studentCourseIds = [
    ...new Set(
      (student?.batches || [])
        .map((b) => (b?.course ? (b.course._id || b.course) : null))
        .filter(Boolean)
        .map((c) => c.toString())
    ),
  ];

  // Only released exams for the student's batch, their course, or explicitly permitted.
  const upcomingTests = await Exam.find({
    $or: [
      { batch: { $in: batchIds }, status: { $in: ["PUBLISHED", "LIVE"] } },
      { examScope: "COURSE", course: { $in: studentCourseIds }, status: { $in: ["PUBLISHED", "LIVE"] } },
      { _id: { $in: permittedExamIds }, status: { $in: ["PUBLISHED", "LIVE"] } },
    ],
    endTime: { $gt: new Date() },
  })
    .limit(5)
    .select("title testType duration totalQuestions totalMarks startTime endTime batch course");

  // Materials are batch-scoped (Batch = Course). A student with no batch must
  // see NOTHING here — never fall through to an unfiltered query.
  const recentMaterials = await Material.find({
    isActive: true,
    batch: { $in: batchIds },
  })
    .populate("subject", "name")
    .populate("unit", "name")
    .populate("chapter", "name")
    .sort({ createdAt: -1 })
    .limit(5);

  // Students only see released results.
  const recentResults = await Result.find({ student: studentUserId, isPublished: true })
    .populate("exam", "title testType")
    .sort({ createdAt: -1 })
    .limit(3);

  // Archived exams published for study.
  const studyPapers = await Exam.find({
    isArchived: true,
    studyVisible: true,
  })
    .limit(5)
    .select("title testType totalQuestions duration archivedAt");

  return { student, upcomingTests, recentMaterials, recentResults, studyPapers };
};

const getTeacherDashboard = async (teacherUserId) => {
  const teacher = await Teacher.findOne({ user: teacherUserId }).populate("subject", "name");

  const teacherBatchIds = await Batch.find({
    isActive: true,
    $or: [
      { "assignedTeachers.teacher": teacherUserId },
      { createdBy: teacherUserId },
    ],
  }).distinct("_id");

  const [materialCount, videoCount, examCount, archivedCount, batchCount] = await Promise.all([
    Material.countDocuments({ uploadedBy: teacherUserId, isActive: true }),
    Material.countDocuments({ uploadedBy: teacherUserId, isActive: true, type: "VIDEO" }),
    Exam.countDocuments({
      $or: [
        { createdBy: teacherUserId },
        { batch: { $in: teacherBatchIds } },
      ],
      isArchived: { $ne: true },
    }),
    Exam.countDocuments({
      $or: [
        { createdBy: teacherUserId },
        { batch: { $in: teacherBatchIds } },
      ],
      isArchived: true,
    }),
    Batch.countDocuments({
      isActive: true,
      $or: [
        { "assignedTeachers.teacher": teacherUserId },
        { createdBy: teacherUserId },
      ],
    }),
  ]);

  return { teacher, materialCount, videoCount, examCount, archivedCount, batchCount };
};

module.exports = { getAdminDashboard, getStudentDashboard, getTeacherDashboard };
