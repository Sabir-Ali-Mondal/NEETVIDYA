const express = require("express");
const router = express.Router();
const Result = require("../models/Result");
const Attempt = require("../models/Attempt");
const Question = require("../models/Question");
const { protect } = require("../middleware/auth.middleware");
const { authorize } = require("../middleware/role.middleware");
const apiResponse = require("../utils/apiResponse");
const ApiError = require("../utils/apiError");

router.get("/my", protect, authorize("student", "admin"), async (req, res, next) => {
  try {
    // Students only ever see results the exam rule has released.
    const isStudent = req.user.role === "student";
    const filter = { student: req.user._id };
    if (isStudent) filter.isPublished = true;
    const results = await Result.find(filter)
      .populate("exam", "title testType duration totalMarks")
      .populate("subjectBreakdown.subject", "name")
      .sort({ createdAt: -1 });
    return apiResponse(res, 200, "Results retrieved", { results });
  } catch (error) {
    next(error);
  }
});

router.get("/:attemptId", protect, async (req, res, next) => {
  try {
    const result = await Result.findOne({ attempt: req.params.attemptId })
      .populate("exam", "title testType duration totalMarks")
      .populate("subjectBreakdown.subject", "name");
    if (!result) throw new ApiError(404, "Result not found");
    // A student cannot read someone else's result, nor an unpublished result they own.
    if (req.user.role === "student") {
      if (String(result.student) !== String(req.user._id)) {
        throw new ApiError(403, "Not authorized to view this result");
      }
      if (!result.isPublished) {
        return apiResponse(res, 200, "Result not published yet", { result: null, pending: true });
      }
    }
    return apiResponse(res, 200, "Result retrieved", { result });
  } catch (error) {
    next(error);
  }
});

router.get("/:attemptId/solutions", protect, async (req, res, next) => {
  try {
    const attempt = await Attempt.findById(req.params.attemptId);
    if (!attempt) throw new ApiError(404, "Attempt not found");
    if (req.user.role === "student" && String(attempt.student) !== String(req.user._id)) {
      throw new ApiError(403, "Not authorized to view these solutions");
    }

    const solutions = [];
    for (const answer of attempt.answers) {
      const question = await Question.findById(answer.question)
        .populate("subject", "name")
        .populate("chapter", "name");
      if (question) {
        solutions.push({
          question: {
            _id: question._id,
            questionText: question.questionText,
            questionImageUrl: question.questionImageUrl,
            options: question.options,
            correctAnswer: question.correctAnswer,
            explanation: question.explanation,
            explanationImageUrl: question.explanationImageUrl,
            difficulty: question.difficulty,
            subject: question.subject,
            chapter: question.chapter,
          },
          yourAnswer: answer.selectedOption,
          markedForReview: answer.markedForReview,
        });
      }
    }

    return apiResponse(res, 200, "Solutions retrieved", { solutions });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
