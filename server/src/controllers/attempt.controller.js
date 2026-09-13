const Exam = require("../models/Exam");
const Attempt = require("../models/Attempt");
const Question = require("../models/Question");
const { evaluateAttempt } = require("../services/evaluation.service");
const { shuffleArray, generateOptionOrder } = require("../utils/shuffle");
const apiResponse = require("../utils/apiResponse");
const ApiError = require("../utils/apiError");

const startAttempt = async (req, res, next) => {
  try {
    const { examId } = req.params;
    const studentId = req.user._id;

    const exam = await Exam.findById(examId);
    if (!exam) throw new ApiError(404, "Exam not found");

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
      });

      return apiResponse(res, 200, "Resuming existing attempt", {
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
      });
    }

    const completedAttempts = await Attempt.countDocuments({
      exam: examId,
      student: studentId,
      status: { $in: ["SUBMITTED", "AUTO_SUBMITTED"] },
    });

    if (completedAttempts >= (exam.maxAttempts || 1)) {
      throw new ApiError(400, "Maximum attempts reached for this exam");
    }

    let questions = await Question.find({
      $or: [
        { subject: { $in: exam.subjects || [] } },
        { isActive: true },
      ],
    }).limit(exam.totalQuestions || 10);

    if (questions.length === 0) {
      questions = await Question.find().limit(10);
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
    });

    return apiResponse(res, 201, "Exam started", {
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
    });
  } catch (error) {
    next(error);
  }
};

const saveAttemptState = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { answers, currentQuestion } = req.body;

    const attempt = await Attempt.findById(id);
    if (!attempt) throw new ApiError(404, "Attempt not found");
    if (attempt.student.toString() !== req.user._id.toString()) {
      throw new ApiError(403, "Unauthorized");
    }
    if (attempt.status !== "IN_PROGRESS") {
      throw new ApiError(400, "Attempt already submitted");
    }

    if (answers && Array.isArray(answers)) {
      answers.forEach((a, idx) => {
        if (attempt.answers[idx]) {
          attempt.answers[idx].selectedOption = a.selectedOption;
          attempt.answers[idx].markedForReview = a.markedForReview;
          attempt.answers[idx].timeSpent = a.timeSpent || 0;
        }
      });
    }

    if (currentQuestion !== undefined) {
      attempt.currentQuestion = currentQuestion;
    }
    await attempt.save();

    return apiResponse(res, 200, "Attempt state saved");
  } catch (error) {
    next(error);
  }
};

const submitAttempt = async (req, res, next) => {
  try {
    const { id } = req.params;

    const attempt = await Attempt.findById(id);
    if (!attempt) throw new ApiError(404, "Attempt not found");
    if (attempt.student.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      throw new ApiError(403, "Unauthorized");
    }
    if (attempt.status !== "IN_PROGRESS") {
      const existingResult = await require("../models/Result").findOne({ attempt: attempt._id });
      return apiResponse(res, 200, "Exam already submitted", { result: existingResult });
    }

    attempt.status = "SUBMITTED";
    attempt.submittedAt = new Date();
    await attempt.save();

    const result = await evaluateAttempt(attempt);

    return apiResponse(res, 200, "Exam submitted successfully", { result });
  } catch (error) {
    next(error);
  }
};

const getAttempt = async (req, res, next) => {
  try {
    const attempt = await Attempt.findById(req.params.id).populate("exam", "title duration totalMarks");
    if (!attempt) throw new ApiError(404, "Attempt not found");
    return apiResponse(res, 200, "Attempt retrieved", { attempt });
  } catch (error) {
    next(error);
  }
};

const getMyAttempts = async (req, res, next) => {
  try {
    const attempts = await Attempt.find({ student: req.user._id })
      .populate("exam", "title testType duration totalMarks")
      .sort({ createdAt: -1 });
    return apiResponse(res, 200, "Attempts retrieved", { attempts });
  } catch (error) {
    next(error);
  }
};

module.exports = { startAttempt, saveAttemptState, submitAttempt, getAttempt, getMyAttempts };
