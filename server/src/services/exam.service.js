const Exam = require("../models/Exam");
const Attempt = require("../models/Attempt");
const Question = require("../models/Question");
const Result = require("../models/Result");
const ExamPermission = require("../models/ExamPermission");
const { shuffleArray, generateOptionOrder } = require("../utils/shuffle");
const ApiError = require("../utils/apiError");

/**
 * Batch = Course. Exams are batch-specific.
 * Question Bank = archive of finished exams (the exam paper IS the question set).
 */

// ── Access rule ───────────────────
// Draft/secret exams are NEVER visible to students.
// A student may access an exam only when it is released (PUBLISHED/LIVE)
// AND ( they belong to the exam's batch  OR  an active ExamPermission exists ).
const canAccessExam = async (user, exam) => {
  if (!user) return false;
  if (user.role === "admin" || user.role === "teacher") return true;
  if (!exam) return false;
  if (!["PUBLISHED", "LIVE"].includes(exam.status)) return false;

  const Student = require("../models/Student");
  const student = await Student.findOne({ user: user._id });
  const batchId = exam.batch?._id || exam.batch;
  if (student?.batches?.some((b) => b.toString() === batchId?.toString())) return true;

  const perm = await ExamPermission.findOne({
    student: user._id,
    exam: exam._id || exam.id,
    isActive: true,
  });
  return !!perm;
};

const assertExamAccess = async (user, exam) => {
  const allowed = await canAccessExam(user, exam);
  if (!allowed) throw new ApiError(403, "You do not have access to this exam");
};

// ── Create ─────────────────
const createExam = async (data, userId) => {
  const {
    questions = [],
    publishNow = false,
    resultPublishMode = "MANUAL",
    resultPublishAt,
    startTime,
    endTime,
    batch,
  } = data;

  if (!batch) throw new ApiError(400, "A batch must be selected for every exam");
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
    questions,
    totalQuestions: data.totalQuestions || questions.length,
    createdBy: userId,
    status: publishNow ? "LIVE" : "DRAFT",
    resultPublishMode,
    resultPublishAt: resultPublishAt || undefined,
    publishedAt: publishNow ? new Date() : undefined,
  });
  return exam;
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

  const filter = {
    $or: [
      { batch: { $in: batchIds }, status: { $in: ["PUBLISHED", "LIVE"] } },
      { _id: { $in: permittedExamIds }, status: { $in: ["PUBLISHED", "LIVE"] } },
      { status: { $in: ["CLOSED", "ARCHIVED"] }, isArchived: true, studyVisible: true },
    ],
  };

  const skip = (page - 1) * limit;
  const [exams, total] = await Promise.all([
    Exam.find(filter)
      .populate("batch", "name code")
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
  await exam.save();
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
  createExam,
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
  listExamPermissions,
  startAttempt,
};
