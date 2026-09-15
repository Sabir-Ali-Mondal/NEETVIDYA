const express = require("express");
const router = express.Router();
const {
  getStudents,
  getStudentById,
  getMyProfile,
  updateMyProfile,
  updateMyAvatar,
  updateStudent,
  deactivateStudent,
  deleteStudent,
} = require("../controllers/student.controller");
const { protect } = require("../middleware/auth.middleware");
const { authorize } = require("../middleware/role.middleware");

router.get("/", protect, authorize("admin", "teacher"), getStudents);
router.get("/my", protect, authorize("student"), getMyProfile);
router.put("/my", protect, authorize("student"), updateMyProfile);
router.put("/my/avatar", protect, authorize("student"), updateMyAvatar);
router.get("/:id", protect, getStudentById);
router.put("/:id", protect, authorize("admin"), updateStudent);
router.put("/:id/toggle-active", protect, authorize("admin"), deactivateStudent);
router.delete("/:id", protect, authorize("admin"), deleteStudent);

module.exports = router;
