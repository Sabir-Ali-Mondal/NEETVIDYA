const express = require("express");
const router = express.Router();
const {
  getTeachers,
  getPublicTeachers,
  getMyProfile,
  updatePermissions,
  deactivateTeacher,
  updateTeacher,
} = require("../controllers/teacher.controller");
const { protect } = require("../middleware/auth.middleware");
const { authorize } = require("../middleware/role.middleware");

router.get("/public", getPublicTeachers);
router.get("/", protect, authorize("admin"), getTeachers);
router.get("/my", protect, authorize("teacher"), getMyProfile);
router.put("/:id/permissions", protect, authorize("admin"), updatePermissions);
router.put("/:id/toggle-active", protect, authorize("admin"), deactivateTeacher);
router.put("/:id", protect, authorize("admin"), updateTeacher);

module.exports = router;
