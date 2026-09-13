const express = require("express");
const router = express.Router();
const Lecture = require("../models/Lecture");
const { protect } = require("../middleware/auth.middleware");
const apiResponse = require("../utils/apiResponse");

router.get("/", protect, async (req, res, next) => {
  try {
    const filter = { isActive: true };
    if (req.query.course) filter.course = req.query.course;
    if (req.query.subject) filter.subject = req.query.subject;
    if (req.query.chapter) filter.chapter = req.query.chapter;

    const lectures = await Lecture.find(filter)
      .populate("subject", "name")
      .populate("chapter", "name")
      .populate("teacher", "name")
      .sort({ displayOrder: 1 });

    return apiResponse(res, 200, "Lectures retrieved", { lectures });
  } catch (error) {
    next(error);
  }
});

router.post("/", protect, async (req, res, next) => {
  try {
    const lecture = await Lecture.create({ ...req.body, teacher: req.user._id });
    return apiResponse(res, 201, "Lecture created", { lecture });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
