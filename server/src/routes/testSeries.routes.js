const express = require("express");
const router = express.Router();
const TestSeries = require("../models/TestSeries");
const { protect } = require("../middleware/auth.middleware");
const apiResponse = require("../utils/apiResponse");

router.get("/", async (req, res, next) => {
  try {
    const testSeries = await TestSeries.find({ isActive: true })
      .populate("exams", "title duration totalMarks totalQuestions")
      .populate("course", "name");
    return apiResponse(res, 200, "Test series retrieved", { testSeries });
  } catch (error) {
    next(error);
  }
});

router.post("/", protect, async (req, res, next) => {
  try {
    const series = await TestSeries.create({ ...req.body, createdBy: req.user._id });
    return apiResponse(res, 201, "Test series created", { testSeries: series });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
