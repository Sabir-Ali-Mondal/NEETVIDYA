const express = require("express");
const router = express.Router();
const Enrollment = require("../models/Enrollment");
const { protect } = require("../middleware/auth.middleware");
const { authorize } = require("../middleware/role.middleware");
const apiResponse = require("../utils/apiResponse");

router.get("/my", protect, authorize("student"), async (req, res, next) => {
  try {
    const enrollments = await Enrollment.find({ student: req.user._id, status: "ACTIVE" })
      .populate("course")
      .populate("batch");
    return apiResponse(res, 200, "Enrollments retrieved", { enrollments });
  } catch (error) {
    next(error);
  }
});

router.post("/", protect, authorize("admin"), async (req, res, next) => {
  try {
    const enrollment = await Enrollment.create({
      ...req.body,
      enrolledBy: req.user._id,
    });
    return apiResponse(res, 201, "Student enrolled successfully", { enrollment });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
