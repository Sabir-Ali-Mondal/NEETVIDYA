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

const getAdminDashboard = async () => {
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
  };
};

const getStudentDashboard = async (studentUserId) => {
  const { publishScheduledResults } = require("./exam.service");
  const ExamPermission = require("../models/ExamPermission");

  // Release any scheduled results whose time has come before reading.
  await publishScheduledResults().catch(() => {});
  const student = await Student.findOne({ user: studentUserId }).populate(
    "batches",
    "name code batchType startDate endDate schedule"
  );
  const batchIds = (student?.batches || []).map((b) => b._id || b);
  const perms = await ExamPermission.find({ student: studentUserId, isActive: true }).select("exam");
  const permittedExamIds = perms.map((p) => p.exam);

  // Only released exams for the student's batch (or permitted exams).
  const upcomingTests = await Exam.find({
    $or: [
      { batch: { $in: batchIds }, status: { $in: ["PUBLISHED", "LIVE"] } },
      { _id: { $in: permittedExamIds }, status: { $in: ["PUBLISHED", "LIVE"] } },
    ],
    endTime: { $gt: new Date() },
  })
    .limit(5)
    .select("title testType duration totalQuestions totalMarks startTime endTime batch");

  // Materials are batch-scoped (Batch = Course).
  const recentMaterials = await Material.find({
    isActive: true,
    ...(batchIds.length ? { batch: { $in: batchIds } } : {}),
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

  // NOTE: there is no manual "question bank" for teachers — questions live inside exams.
  const [materialCount, videoCount, examCount, archivedCount, batchCount] = await Promise.all([
    Material.countDocuments({ uploadedBy: teacherUserId, isActive: true }),
    Material.countDocuments({ uploadedBy: teacherUserId, isActive: true, type: "VIDEO" }),
    Exam.countDocuments({ createdBy: teacherUserId, isArchived: { $ne: true } }),
    Exam.countDocuments({ createdBy: teacherUserId, isArchived: true }),
    Batch.countDocuments({ "assignedTeachers.teacher": teacherUserId, isActive: true }),
  ]);

  return { teacher, materialCount, videoCount, examCount, archivedCount, batchCount };
};

module.exports = { getAdminDashboard, getStudentDashboard, getTeacherDashboard };
