const Exam = require("../models/Exam");
const Attempt = require("../models/Attempt");
const Question = require("../models/Question");
const { shuffleArray, generateOptionOrder } = require("../utils/shuffle");
const ApiError = require("../utils/apiError");

const createExam = async (data, userId) => {
  const exam = await Exam.create({ ...data, createdBy: userId, status: "DRAFT" });
  return exam;
};

const getExams = async (filter = {}) => {
  const exams = await Exam.find(filter)
    .populate("course", "name")
    .populate("subjects", "name")
    .populate("testSeries", "title")
    .sort({ createdAt: -1 });
  return exams;
};

const getExamById = async (id) => {
  const exam = await Exam.findById(id)
    .populate("course", "name")
    .populate("subjects", "name");
  if (!exam) throw new ApiError(404, "Exam not found");
  return exam;
};

const updateExam = async (id, data) => {
  const exam = await Exam.findByIdAndUpdate(id, data, { new: true });
  if (!exam) throw new ApiError(404, "Exam not found");
  return exam;
};

const publishExam = async (id) => {
  const exam = await Exam.findById(id);
  if (!exam) throw new ApiError(404, "Exam not found");
  exam.status = "LIVE";
  exam.publishedAt = new Date();
  await exam.save();
  return exam;
};

const closeExam = async (id) => {
  await Exam.findByIdAndUpdate(id, { status: "CLOSED" });
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

  let questions = await Question.find({
    subject: { $in: exam.subjects },
    isActive: true,
  }).limit(exam.totalQuestions || 30);

  if (questions.length === 0) {
    questions = await Question.find({ isActive: true }).limit(exam.totalQuestions || 10);
  }

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
  createExam,
  getExams,
  getExamById,
  updateExam,
  publishExam,
  closeExam,
  startAttempt,
};
