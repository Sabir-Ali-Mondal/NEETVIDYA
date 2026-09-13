const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Student = require("../models/Student");
const Teacher = require("../models/Teacher");
const Exam = require("../models/Exam");
const Attempt = require("../models/Attempt");
const ActivityLog = require("../models/ActivityLog");
const { protect } = require("../middleware/auth.middleware");
const { authorize } = require("../middleware/role.middleware");
const apiResponse = require("../utils/apiResponse");

router.get("/dashboard", protect, authorize("admin"), async (req, res, next) => {
  try {
    const studentCount = await Student.countDocuments();
    const teacherCount = await Teacher.countDocuments();
    const examCount = await Exam.countDocuments();
    const attemptCount = await Attempt.countDocuments();
    const recentAttempts = await Attempt.find()
      .populate("student", "name email")
      .populate("exam", "title")
      .sort({ createdAt: -1 })
      .limit(5);

    return apiResponse(res, 200, "Admin dashboard data", {
      studentCount,
      teacherCount,
      examCount,
      attemptCount,
      recentAttempts,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/activity-logs", protect, authorize("admin"), async (req, res, next) => {
  try {
    const logs = await ActivityLog.find()
      .populate("user", "name email role")
      .sort({ createdAt: -1 })
      .limit(50);
    return apiResponse(res, 200, "Activity logs", { logs });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
