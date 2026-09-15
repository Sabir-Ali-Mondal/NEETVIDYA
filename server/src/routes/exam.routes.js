const express = require("express");
const router = express.Router();
const {
  getExams,
  getExamById,
  createExam,
  updateExam,
  publishExam,
  closeExam,
  deleteExam,
  getExamResults,
} = require("../controllers/exam.controller");
const { protect } = require("../middleware/auth.middleware");
const { authorize } = require("../middleware/role.middleware");

router.get("/", protect, getExams);
router.get("/:id", protect, getExamById);
router.get("/:id/results", protect, authorize("admin", "teacher"), getExamResults);
router.post("/", protect, authorize("admin", "teacher"), createExam);
router.put("/:id", protect, authorize("admin", "teacher"), updateExam);
router.put("/:id/publish", protect, authorize("admin", "teacher"), publishExam);
router.put("/:id/close", protect, authorize("admin", "teacher"), closeExam);
router.delete("/:id", protect, authorize("admin"), deleteExam);

module.exports = router;
