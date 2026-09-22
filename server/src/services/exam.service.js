const Exam = require("../models/Exam");
const Attempt = require("../models/Attempt");
const Question = require("../models/Question");
const Result = require("../models/Result");
const ExamPermission = require("../models/ExamPermission");
const Batch = require("../models/Batch");
const { shuffleArray, generateOptionOrder } = require("../utils/shuffle");
const ApiError = require("../utils/apiError");
const { notifyBatch } = require("./notification.service");
const crypto = require("crypto");

// Short, URL-safe public share slug for an exam.
const generateShareSlug = () => crypto.randomBytes(6).toString("hex");

/**
 * Batch = Course. Exams are batch-specific.
 * Question Bank = archive of finished exams (the exam paper IS the question set).
 */

// Resolves which batches an exam targets.
//   examScope = "BATCH"  → just exam.batch
//   examScope = "COURSE" → every batch belonging to exam.course
// Returns an array of batch id strings.
const resolveExamBatchIds = async (exam) => {
  if (!exam) return [];
  if (exam.examScope === "COURSE" && exam.course) {
    const courseId = exam.course?._id || exam.course;
    const batches = await Batch.find({ course: courseId }).select("_id");
    return batches.map((b) => b._id.toString());
  }
  const batchId = exam.batch?._id || exam.batch;
  return batchId ? [batchId.toString()] : [];
};

// ── Access rule ───────────────────
// Draft/secret exams are NEVER visible to students.
// A student may access an exam only when it is released (PUBLISHED/LIVE)
// AND ( they belong to one of the exam's target batches  OR  an active ExamPermission exists ).
const canAccessExam = async (user, exam) => {
  if (!user) return false;
  if (user.role === "admin" || user.role === "teacher") return true;
  if (!exam) return false;

  const Student = require("../models/Student");
  const student = await Student.findOne({ user: user._id });
  const targetBatchIds = await resolveExamBatchIds(exam);
  const studentHasBatch = student?.batches?.some((b) =>
    targetBatchIds.includes(b.toString())
  );
  const explicitPermission = await ExamPermission.findOne({
    student: user._id,
    exam: exam._id || exam.id,
    isActive: true,
  });

  if (["PUBLISHED", "LIVE"].includes(exam.status)) {
    return studentHasBatch || !!explicitPermission;
  }

  if (["CLOSED", "ARCHIVED"].includes(exam.status) && exam.studyVisible) {
    return studentHasBatch || !!explicitPermission;
  }

  return false;
};

const assertExamAccess = async (user, exam) => {
  const allowed = await canAccessExam(user, exam);
  if (!allowed) throw new ApiError(403, "You do not have access to this exam");
};

// Lets the UI decide the CTA: batch members start directly, outsiders request access.
const checkExamAccess = async (user, examId) => {
  const exam = await Exam.findById(examId).populate("batch", "name code");
  if (!exam) throw new ApiError(404, "Exam not found");

  if (user.role === "admin" || user.role === "teacher") {
    return { hasBatchAccess: true, needsPermission: false, canAccess: true };
  }

  const Student = require("../models/Student");
  const student = await Student.findOne({ user: user._id });
  const targetBatchIds = await resolveExamBatchIds(exam);
  const hasBatchAccess = !!student?.batches?.some((b) =>
    targetBatchIds.includes(b.toString())
  );
  const explicitPermission = await ExamPermission.findOne({
    student: user._id,
    exam: exam._id,
    isActive: true,
  });
  const canAccess = await canAccessExam(user, exam);

  return {
    hasBatchAccess,
    needsPermission: !hasBatchAccess && !explicitPermission,
    canAccess,
    batchName: exam.batch?.name || null,
    examTitle: exam.title,
  };
};

// ── Create ─────────────────
const createExam = async (data, userId) => {
  const {
    questions = [],
    publishNow = false,
    resultPublishMode = "IMMEDIATE",
    resultPublishAt,
    startTime,
    endTime,
    batch,
  } = data;

  const examScope = data.examScope === "COURSE" ? "COURSE" : "BATCH";

  if (examScope === "BATCH" && !batch) {
    throw new ApiError(400, "Select a batch, or choose to apply the exam to a whole course");
  }

  // Derive the course from the batch when a specific batch is targeted.
  let courseId = data.course;
  if (batch) {
    const targetBatch = await Batch.findById(batch).select("course");
    if (!targetBatch) throw new ApiError(404, "Batch not found");
    courseId = courseId || targetBatch.course || undefined;
  }
  if (examScope === "COURSE" && !courseId) {
    throw new ApiError(400, "A course must be selected for a course-wide exam");
  }

  if (!Array.isArray(questions)) {
    throw new ApiError(400, "Questions must be provided as an array");
  }
  if (publishNow && (!questions || questions.length === 0)) {
    throw new ApiError(400, "An exam must contain its own question set before it can be published");
  }
  if (startTime && endTime && new Date(startTime) >= new Date(endTime)) {
    throw new ApiError(400, "Exam end time must be after the start time");
  }
  if (resultPublishMode === "SCHEDULED" && !resultPublishAt) {
    throw new ApiError(400, "Scheduled result publishing requires a publish date/time");
  }

  const exam = await Exam.create({
    ...data,
    examScope,
    course: courseId || undefined,
    // A course-wide exam is not tied to a single batch.
    batch: examScope === "BATCH" ? batch : undefined,
    questions,
    totalQuestions: data.totalQuestions || questions.length,
    createdBy: userId,
    status: publishNow ? "LIVE" : "DRAFT",
    resultPublishMode,
    resultPublishAt: resultPublishAt || undefined,
    publishedAt: publishNow ? new Date() : undefined,
    shareSlug: generateShareSlug(),
    isPublic: data.isPublic !== false,
  });
  return exam;
};

// Public exam preview by share slug — returns NO questions/answers.
const getPublicExamBySlug = async (slug) => {
  const exam = await Exam.findOne({ shareSlug: slug }).populate("batch", "name code");
  if (!exam) throw new ApiError(404, "Exam link not found");

  const released = ["PUBLISHED", "LIVE"].includes(exam.status);
  return {
    exam: {
      _id: exam._id,
      title: exam.title,
      description: exam.description,
      testType: exam.testType,
      batchName: exam.batch?.name || null,
      batchCode: exam.batch?.code || null,
      duration: exam.duration,
      totalQuestions: exam.totalQuestions,
      totalMarks: exam.totalMarks,
      marksPerCorrect: exam.marksPerCorrect,
      negativePerWrong: exam.negativePerWrong,
      startTime: exam.startTime,
      endTime: exam.endTime,
      status: exam.status,
      isOpen: released,
    },
  };
};

// Public list of released exams for the marketing / test-series area.
// Returns ONLY released (PUBLISHED/LIVE) exams and a safe field set — no
// questions, answers, or student data. Anonymous visitors can call this.
const getPublicExams = async ({ testType, batch, limit = 12 } = {}) => {
  const filter = {
    status: { $in: ["PUBLISHED", "LIVE"] },
    isArchived: { $ne: true },
  };
  if (testType) filter.testType = testType;
  if (batch) filter.batch = batch;

  const exams = await Exam.find(filter)
    .populate("batch", "name code batchType")
    .populate("course", "name")
    .sort({ publishedAt: -1, createdAt: -1 })
    .limit(parseInt(limit) || 12)
    .select(
      "title description testType duration totalQuestions totalMarks marksPerCorrect negativePerWrong startTime endTime status publishedAt batch course"
    );

  return exams;
};

// ── Read ─────────────────
const getExams = async (filter = {}, { page = 1, limit = 20 } = {}) => {
  const skip = (page - 1) * limit;
  const query = { ...filter };
  const [exams, total] = await Promise.all([
    Exam.find(query)
      .populate("course", "name")
      .populate("batch", "name code batchType")
      .populate("subjects", "name")
      .populate("testSeries", "title")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    Exam.countDocuments(query),
  ]);
  return { exams, total, page, limit, pages: Math.ceil(total / limit) || 1 };
};

// Exams visible to a specific student (batch + permissions + study archive)
const getStudentExams = async (user, { page = 1, limit = 20 } = {}) => {
  const Student = require("../models/Student");
  const student = await Student.findOne({ user: user._id });
  const batchIds = (student?.batches || []).map((b) => b.toString());

  const perms = await ExamPermission.find({ student: user._id, isActive: true }).select("exam");
  const permittedExamIds = perms.map((p) => p.exam);

  // Course-wide exams target every batch belonging to their course — resolve the
  // student's batches back to the courses they belong to.
  const studentBatches = await Batch.find({ _id: { $in: batchIds } }).select("course");
  const courseIds = studentBatches.map((b) => b.course).filter(Boolean);

  const filter = {
    $or: [
      { batch: { $in: batchIds }, status: { $in: ["PUBLISHED", "LIVE"] } },
      { examScope: "COURSE", course: { $in: courseIds }, status: { $in: ["PUBLISHED", "LIVE"] } },
      { _id: { $in: permittedExamIds }, status: { $in: ["PUBLISHED", "LIVE"] } },
      { status: { $in: ["CLOSED", "ARCHIVED"] }, isArchived: true, studyVisible: true },
    ],
  };

  const skip = (page - 1) * limit;
  const [exams, total] = await Promise.all([
    Exam.find(filter)
      .populate("batch", "name code")
      .populate("course", "name")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    Exam.countDocuments(filter),
  ]);
  return { exams, total, page, limit, pages: Math.ceil(total / limit) || 1 };
};

const getExamById = async (id) => {
  const exam = await Exam.findById(id)
    .populate("course", "name")
    .populate("batch", "name code batchType")
    .populate("subjects", "name")
    .populate("permittedStudents", "name email");
  if (!exam) throw new ApiError(404, "Exam not found");
  return exam;
};

const updateExam = async (id, data) => {
  const exam = await Exam.findByIdAndUpdate(id, data, { new: true, runValidators: false });
  if (!exam) throw new ApiError(404, "Exam not found");
  return exam;
};

const publishExam = async (id) => {
  const exam = await Exam.findById(id);
  if (!exam) throw new ApiError(404, "Exam not found");
  if (!exam.questions || exam.questions.length === 0) {
    throw new ApiError(400, "Cannot publish an exam without a question set");
  }
  exam.status = "LIVE";
  exam.publishedAt = new Date();
  if (!exam.shareSlug) exam.shareSlug = generateShareSlug();
  await exam.save();

  // Auto-permit every student enrolled in a targeted batch (single batch or
  // every batch under the exam's course).
  await syncBatchExamPermissions(exam).catch((err) =>
    console.error("Auto exam permission sync failed:", err.message)
  );

  // Notify the students of every batch this exam targets (single batch or whole course).
  const targetBatchIds = await resolveExamBatchIds(exam);
  for (const batchId of targetBatchIds) {
    await notifyBatch(batchId, {
      title: "New exam published",
      message: `${exam.title} is now live for your batch.`,
      type: "TEST",
      createdBy: exam.createdBy,
    });
  }

  return exam;
};

// Close → archive into the Question Bank (the exam paper becomes reusable)
const closeExam = async (id) => {
  const exam = await Exam.findById(id);
  if (!exam) throw new ApiError(404, "Exam not found");
  exam.status = "CLOSED";
  exam.isArchived = true;
  exam.archivedAt = new Date();
  await exam.save();
  return exam;
};

const archiveExam = async (id) => {
  const exam = await Exam.findById(id);
  if (!exam) throw new ApiError(404, "Exam not found");
  exam.isArchived = true;
  exam.archivedAt = exam.archivedAt || new Date();
  if (exam.status !== "CLOSED") exam.status = "CLOSED";
  await exam.save();
  return exam;
};

const setStudyVisibility = async (id, visible) => {
  const exam = await Exam.findById(id);
  if (!exam) throw new ApiError(404, "Exam not found");
  exam.studyVisible = !!visible;
  if (visible && !exam.isArchived) {
    exam.isArchived = true;
    exam.archivedAt = new Date();
  }
  await exam.save();
  return exam;
};

// Reconduct: clone an archived exam into a fresh exam (own copy of questions)
const reconductExam = async (id, overrides = {}, userId) => {
  const source = await Exam.findById(id);
  if (!source) throw new ApiError(404, "Exam not found");
  const now = new Date();
  const clone = await Exam.create({
    title: overrides.title || `${source.title} (Reconduct)`,
    description: source.description,
    testType: source.testType,
    batch: overrides.batch || source.batch,
    questions: source.questions,
    subjects: source.subjects,
    totalQuestions: source.totalQuestions,
    totalMarks: source.totalMarks,
    marksPerCorrect: source.marksPerCorrect,
    negativePerWrong: source.negativePerWrong,
    duration: source.duration,
    startTime: overrides.startTime ? new Date(overrides.startTime) : now,
    endTime: overrides.endTime
      ? new Date(overrides.endTime)
      : new Date(now.getTime() + 60 * 60 * 1000),
    maxAttempts: source.maxAttempts,
    randomizeQuestions: source.randomizeQuestions,
    randomizeOptions: source.randomizeOptions,
    instructions: source.instructions,
    resultPublishMode: source.resultPublishMode,
    createdBy: userId,
    status: "DRAFT",
    reconductedFrom: source._id,
  });
  return clone;
};

// Downloadable exam pack (JSON)
const buildExamPack = async (id) => {
  const exam = await Exam.findById(id).populate("batch", "name code");
  if (!exam) throw new ApiError(404, "Exam not found");
  const questions = await Question.find({ _id: { $in: exam.questions }});
  return {
    title: exam.title,
    testType: exam.testType,
    batch: exam.batch?.name || null,
    totalMarks: exam.totalMarks,
    marksPerCorrect: exam.marksPerCorrect,
    negativePerWrong: exam.negativePerWrong,
    duration: exam.duration,
    questions: questions.map((q) => ({
      questionText: q.questionText,
      questionImageUrl: q.questionImageUrl || null,
      options: q.options.map((o) => ({ text: o.text, imageUrl: o.imageUrl || null })),
      correctAnswer: q.correctAnswer,
      explanation: q.explanation || null,
      marks: q.marks,
      negativeMarks: q.negativeMarks,
      difficulty: q.difficulty,
    })),
  };
};

// ── Question Bank (archive of finished exams) ─────────
const getQuestionBank = async ({ page = 1, limit = 20, search = "" } = {}) => {
  const filter = { isArchived: true };
  if (search) filter.title = { $regex: search, $options: "i" };
  const skip = (page - 1) * limit;
  const [exams, total] = await Promise.all([
    Exam.find(filter)
      .populate("batch", "name code")
      .populate("createdBy", "name")
      .sort({ archivedAt: -1, createdAt: -1 })
      .skip(skip)
      .limit(limit),
    Exam.countDocuments(filter),
  ]);
  return { exams, total, page, limit, pages: Math.ceil(total / limit) || 1 };
};

// ── Results publishing ────────────
const publishResults = async (id, { publish = true } = {}) => {
  const exam = await Exam.findById(id);
  if (!exam) throw new ApiError(404, "Exam not found");
  exam.resultsPublished = publish;
  exam.resultsPublishedAt = publish ? new Date() : undefined;
  await exam.save();
  await Result.updateMany(
    { exam: id },
    { isPublished: publish, publishedAt: publish ? new Date() : undefined }
  );

  if (publish) {
    const targetBatchIds = await resolveExamBatchIds(exam);
    for (const batchId of targetBatchIds) {
      await notifyBatch(batchId, {
        title: "Results published",
        message: `Results for ${exam.title} are now available.`,
        type: "RESULT",
        createdBy: exam.createdBy,
      });
    }
  }

  return exam;
};

// Called on each read/tick — releases SCHEDULED results whose time has come.
const publishScheduledResults = async () => {
  const now = new Date();
  const due = await Exam.find({
    resultPublishMode: "SCHEDULED",
    resultsPublished: false,
    resultPublishAt: { $lte: now },
  });
  for (const exam of due) {
    exam.resultsPublished = true;
    exam.resultsPublishedAt = now;
    await exam.save();
    await Result.updateMany({ exam: exam._id }, { isPublished: true, publishedAt: now });
  }
  return due.length;
};

// ── Exam permissions (outsider exam-only students) ────────
const grantExamPermission = async ({ studentId, examId, reason }, grantedBy) => {
  const Student = require("../models/Student");
  const perm = await ExamPermission.findOneAndUpdate(
    { student: studentId, exam: examId },
    { student: studentId, exam: examId, reason, grantedBy, isActive: true },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  );
  await Student.findOneAndUpdate(
    { user: studentId },
    { $addToSet: { examPermissions: examId } }
  );
  return perm;
};

const revokeExamPermission = async ({ studentId, examId }) => {
  const Student = require("../models/Student");
  await ExamPermission.findOneAndUpdate(
    { student: studentId, exam: examId },
    { isActive: false }
  );
  await Student.findOneAndUpdate({ user: studentId }, { $pull: { examPermissions: examId }});
  return { revoked: true };
};

// Auto-permit students who are enrolled in a batch this exam targets.
// Targeted batches = the exam's own batch (BATCH scope) OR every batch under
// the exam's course (COURSE scope) — resolved by resolveExamBatchIds().
// This keeps batch members and exam permissions in sync without an admin
// having to grant access manually. Existing manual grants are left untouched.
const syncBatchExamPermissions = async (examOrId) => {
  const Student = require("../models/Student");
  const exam = examOrId && examOrId.examScope
    ? examOrId
    : await Exam.findById(examOrId);
  if (!exam) return { granted: 0 };

  const targetBatchIds = await resolveExamBatchIds(exam);
  if (targetBatchIds.length === 0) return { granted: 0 };

  // Student docs (with their user ids) enrolled in any target batch.
  const students = await Student.find({ batches: { $in: targetBatchIds } }).select("user");
  const userIds = students.map((s) => s.user).filter(Boolean);
  if (userIds.length === 0) return { granted: 0 };

  // Upsert one active permission per (student, exam) — idempotent.
  const ops = userIds.map((studentUserId) => ({
    updateOne: {
      filter: { student: studentUserId, exam: exam._id },
      update: {
        $set: { isActive: true, reason: "Auto-granted via batch enrollment" },
        $setOnInsert: { student: studentUserId, exam: exam._id },
      },
      upsert: true,
    },
  }));
  await ExamPermission.bulkWrite(ops, { ordered: false });

  // Mirror on the Student docs for fast dashboard display.
  await Student.updateMany(
    { user: { $in: userIds } },
    { $addToSet: { examPermissions: exam._id } }
  );

  return { granted: userIds.length };
};

const listExamPermissions = async (examId) => {
  return ExamPermission.find({ exam: examId, isActive: true }).populate(
    "student",
    "name email"
  );
};

const startAttempt = async (examId, studentId) => {
  const exam = await Exam.findById(examId);
  if (!exam) throw new ApiError(404, "Exam not found");
  if (exam.status !== "LIVE") throw new ApiError(400, "Exam is not live");

  const now = new Date();
  if (now < exam.startTime) throw new ApiError(400, "Exam has not started yet");
  if (now > exam.endTime) throw new ApiError(400, "Exam has ended");

  const existingInProgress = await Attempt.findOne({
    exam: examId,
    student: studentId,
    status: "IN_PROGRESS",
  });
  if (existingInProgress) {
    return { resumed: true, attempt: existingInProgress };
  }

  const completedAttempts = await Attempt.countDocuments({
    exam: examId,
    student: studentId,
    status: { $in: ["SUBMITTED", "AUTO_SUBMITTED"] },
  });
  if (completedAttempts >= (exam.maxAttempts || 1)) {
    throw new ApiError(400, "Maximum attempts reached");
  }

  // Only the exam's own question set — no random bank selection
  const ownQuestions = await Question.find({
    _id: { $in: exam.questions || [] },
    isActive: true,
  });
  if (ownQuestions.length === 0) {
    throw new ApiError(400, "This exam has no questions configured");
  }
  const questions = ownQuestions;

  let questionOrder = questions.map((q) => q._id);
  if (exam.randomizeQuestions) {
    questionOrder = shuffleArray(questionOrder);
  }

  const optionOrders = questionOrder.map(() =>
    exam.randomizeOptions ? generateOptionOrder(4) : [0, 1, 2, 3]
  );

  const serverEndTime = new Date(now.getTime() + (exam.duration || 60) * 60 * 1000);

  const answers = questionOrder.map((qId) => ({
    question: qId,
    selectedOption: null,
    markedForReview: false,
    timeSpent: 0,
  }));

  const attempt = await Attempt.create({
    exam: examId,
    student: studentId,
    startedAt: now,
    serverEndTime,
    status: "IN_PROGRESS",
    answers,
    questionOrder,
    optionOrders,
  });

  const questionsData = questionOrder.map((qId) => {
    const q = questions.find((qq) => qq._id.toString() === qId.toString());
    if (!q) return null;
    return {
      _id: q._id,
      questionText: q.questionText,
      questionImageUrl: q.questionImageUrl,
      options: q.options,
      marks: q.marks,
      negativeMarks: q.negativeMarks,
      difficulty: q.difficulty,
      subject: q.subject,
      chapter: q.chapter,
    };
  }).filter(Boolean);

  return {
    resumed: false,
    attemptId: attempt._id,
    serverEndTime,
    duration: exam.duration,
    totalQuestions: questionOrder.length,
    totalMarks: exam.totalMarks,
    marksPerCorrect: exam.marksPerCorrect,
    negativePerWrong: exam.negativePerWrong,
    instructions: exam.instructions,
    questions: questionsData,
    optionOrders,
    answers,
  };
};

module.exports = {
  canAccessExam,
  assertExamAccess,
  checkExamAccess,
  resolveExamBatchIds,
  createExam,
  getPublicExamBySlug,
  getPublicExams,
  getExams,
  getStudentExams,
  getExamById,
  updateExam,
  publishExam,
  closeExam,
  archiveExam,
  setStudyVisibility,
  reconductExam,
  buildExamPack,
  getQuestionBank,
  publishResults,
  publishScheduledResults,
  grantExamPermission,
  revokeExamPermission,
  syncBatchExamPermissions,
  listExamPermissions,
  startAttempt,
};
