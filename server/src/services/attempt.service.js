const Attempt = require("../models/Attempt");
const Exam = require("../models/Exam");
const Question = require("../models/Question");
const Result = require("../models/Result");
const { evaluateAttempt } = require("./evaluation.service");
const { shuffleArray, generateOptionOrder } = require("../utils/shuffle");
const ApiError = require("../utils/apiError");

const getAttemptById = async (id) => {
  const attempt = await Attempt.findById(id).populate("exam", "title duration totalMarks");
  if (!attempt) throw new ApiError(404, "Attempt not found");
  return attempt;
};

const getMyAttempts = async (studentId) => {
  const attempts = await Attempt.find({ student: studentId })
    .populate("exam", "title testType duration totalMarks")
    .sort({ createdAt: -1 });
  return attempts;
};

const startAttempt = async (examId, studentId, user) => {
  const exam = await Exam.findById(examId);
  if (!exam) throw new ApiError(404, "Exam not found");

  // Enforce access (batch membership or explicit admin permission) on the backend.
  const { assertExamAccess } = require("./exam.service");
  await assertExamAccess(user || { _id: studentId, role: "student" }, exam);

  const existingInProgress = await Attempt.findOne({
    exam: examId,
    student: studentId,
    status: "IN_PROGRESS",
  });

  if (existingInProgress) {
    const questions = await Question.find({
      _id: { $in: existingInProgress.questionOrder },
    });
    const questionMap = new Map(questions.map((q) => [q._id.toString(), q]));
    const orderedQuestions = existingInProgress.questionOrder.map((id) => {
      const q = questionMap.get(id.toString());
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
      attemptId: existingInProgress._id,
      serverEndTime: existingInProgress.serverEndTime,
      duration: exam.duration,
      totalQuestions: orderedQuestions.length,
      totalMarks: exam.totalMarks,
      marksPerCorrect: exam.marksPerCorrect,
      negativePerWrong: exam.negativePerWrong,
      instructions: exam.instructions,
      questions: orderedQuestions,
      answers: existingInProgress.answers,
    };
  }

  const completedAttempts = await Attempt.countDocuments({
    exam: examId,
    student: studentId,
    status: { $in: ["SUBMITTED", "AUTO_SUBMITTED"] },
  });

  if (completedAttempts >= (exam.maxAttempts || 1)) {
    throw new ApiError(400, "Maximum attempts reached for this exam");
  }

  // Every exam runs on its OWN fixed question set - never a random bank pool.
  const questions = await Question.find({
    _id: { $in: exam.questions || [] },
    isActive: true,
  });
  if (questions.length === 0) {
    throw new ApiError(400, "This exam has no questions configured");
  }

  let questionOrder = questions.map((q) => q._id);
  if (exam.randomizeQuestions) {
    questionOrder = shuffleArray(questionOrder);
  }

  const optionOrders = questionOrder.map(() => generateOptionOrder(4));
  const now = new Date();
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

  const questionMap = new Map(questions.map((q) => [q._id.toString(), q]));
  const questionsWithoutAnswers = questionOrder.map((qId) => {
    const q = questionMap.get(qId.toString());
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
    attemptId: attempt._id,
    serverEndTime,
    duration: exam.duration,
    totalQuestions: questionOrder.length,
    totalMarks: exam.totalMarks,
    marksPerCorrect: exam.marksPerCorrect,
    negativePerWrong: exam.negativePerWrong,
    instructions: exam.instructions,
    questions: questionsWithoutAnswers,
    optionOrders,
    answers,
  };
};

const saveAttemptState = async (attemptId, studentId, payload = {}) => {
  const { answers, currentQuestion } = payload;

  const attempt = await Attempt.findById(attemptId);
  if (!attempt) throw new ApiError(404, "Attempt not found");
  if (attempt.student.toString() !== studentId.toString()) {
    throw new ApiError(403, "Unauthorized");
  }
  if (attempt.status !== "IN_PROGRESS") {
    throw new ApiError(400, "Attempt already submitted");
  }

  if (answers && Array.isArray(answers)) {
    answers.forEach((answer, idx) => {
      if (attempt.answers[idx]) {
        attempt.answers[idx].selectedOption = answer.selectedOption;
        attempt.answers[idx].markedForReview = answer.markedForReview;
        attempt.answers[idx].timeSpent = answer.timeSpent || 0;
      }
    });
  }

  if (currentQuestion !== undefined) {
    attempt.currentQuestion = currentQuestion;
  }

  await attempt.save();
  return attempt;
};

const submitAttempt = async (attemptId, user) => {
  const attempt = await Attempt.findById(attemptId);
  if (!attempt) throw new ApiError(404, "Attempt not found");
  if (attempt.student.toString() !== user._id.toString() && user.role !== "admin") {
    throw new ApiError(403, "Unauthorized");
  }

  if (attempt.status !== "IN_PROGRESS") {
    const existingResult = await Result.findOne({ attempt: attempt._id });
    return { result: existingResult };
  }

  attempt.status = "SUBMITTED";
  attempt.submittedAt = new Date();
  await attempt.save();

  const result = await evaluateAttempt(attempt);
  return { result };
};

module.exports = {
  getAttemptById,
  getMyAttempts,
  startAttempt,
  saveAttemptState,
  submitAttempt,
};
