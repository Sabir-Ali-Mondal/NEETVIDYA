const express = require("express");
const router = express.Router();
const Enrollment = require("../models/Enrollment");
const Exam = require("../models/Exam");
const Material = require("../models/Material");
const Batch = require("../models/Batch");
const Question = require("../models/Question");
const { protect } = require("../middleware/auth.middleware");
const { authorize } = require("../middleware/role.middleware");
const apiResponse = require("../utils/apiResponse");

router.get("/student", protect, authorize("student"), async (req, res, next) => {
  try {
    const enrollments = await Enrollment.find({ student: req.user._id, status: "ACTIVE" }).populate("course");
    const upcomingTests = await Exam.find({ status: "LIVE" }).limit(3);
    const recentMaterials = await Material.find({ isActive: true }).sort({ createdAt: -1 }).limit(4);

    return apiResponse(res, 200, "Student dashboard", {
      enrollments,
      upcomingTests,
      recentMaterials,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/teacher", protect, authorize("teacher", "admin"), async (req, res, next) => {
  try {
    const batchCount = await Batch.countDocuments({ isActive: true });
    const questionCount = await Question.countDocuments({ createdBy: req.user._id });
    const examCount = await Exam.countDocuments({ createdBy: req.user._id });

    return apiResponse(res, 200, "Teacher dashboard", {
      batchCount,
      questionCount,
      examCount,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
