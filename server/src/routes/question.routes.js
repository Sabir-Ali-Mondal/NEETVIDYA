const express = require("express");
const router = express.Router();
const Question = require("../models/Question");
const { protect } = require("../middleware/auth.middleware");
const { authorize } = require("../middleware/role.middleware");
const apiResponse = require("../utils/apiResponse");

router.get("/", protect, authorize("teacher", "admin"), async (req, res, next) => {
  try {
    const filter = { isActive: true };
    if (req.query.subject) filter.subject = req.query.subject;
    if (req.query.difficulty) filter.difficulty = req.query.difficulty;
    const questions = await Question.find(filter)
      .populate("subject", "name")
      .populate("chapter", "name")
      .limit(100)
      .sort({ createdAt: -1 });
    return apiResponse(res, 200, "Questions retrieved", { questions });
  } catch (error) {
    next(error);
  }
});

router.post("/", protect, authorize("teacher", "admin"), async (req, res, next) => {
  try {
    const question = await Question.create({ ...req.body, createdBy: req.user._id });
    return apiResponse(res, 201, "Question created", { question });
  } catch (error) {
    next(error);
  }
});

router.put("/:id", protect, authorize("teacher", "admin"), async (req, res, next) => {
  try {
    const question = await Question.findByIdAndUpdate(req.params.id, req.body, { new: true });
    return apiResponse(res, 200, "Question updated", { question });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
