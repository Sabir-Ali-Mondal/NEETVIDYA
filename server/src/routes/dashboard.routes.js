const express = require("express");
const router = express.Router();
const {
  getAdminDashboard,
  getStudentDashboard,
  getTeacherDashboard,
} = require("../controllers/dashboard.controller");
const { protect } = require("../middleware/auth.middleware");
const { authorize } = require("../middleware/role.middleware");

router.get("/admin", protect, authorize("admin"), getAdminDashboard);
router.get("/student", protect, authorize("student"), getStudentDashboard);
router.get("/teacher", protect, authorize("teacher", "admin"), getTeacherDashboard);

module.exports = router;
