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
    const results = await Result.find({ student: req.user._id })
      .populate("exam", "title testType duration totalMarks")
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
    return apiResponse(res, 200, "Result retrieved", { result });
  } catch (error) {
    next(error);
  }
});

router.get("/:attemptId/solutions", protect, async (req, res, next) => {
  try {
    const attempt = await Attempt.findById(req.params.attemptId);
    if (!attempt) throw new ApiError(404, "Attempt not found");

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
