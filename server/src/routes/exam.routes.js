const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024 }});

const {
  getExams,
  getExamById,
  checkExamAccess,
  createExam,
  updateExam,
  publishExam,
  closeExam,
  archiveExam,
  setStudyVisibility,
  reconductExam,
  downloadExam,
  getQuestionBank,
  getPublicExamBySlug,
  publishResults,
  grantPermission,
  revokePermission,
  listPermissions,
  importQuestions,
  createExamQuestion,
  getExamQuestions,
  deleteExamQuestion,
  deleteExam,
  getExamResults,
} = require("../controllers/exam.controller");
const { protect } = require("../middleware/auth.middleware");
const { authorize } = require("../middleware/role.middleware");

// Question Bank = archive of finished exams
router.get("/bank", protect, authorize("admin", "teacher"), getQuestionBank);

// Public exam preview by share slug — no auth, no questions exposed.
router.get("/public/:slug", getPublicExamBySlug);

// Access check for a student — decides Start Exam vs WhatsApp request CTA.
router.get("/:id/access-check", protect, checkExamAccess);

router.get("/", protect, getExams);
router.post("/", protect, authorize("admin", "teacher"), createExam);
router.get("/:id", protect, getExamById);
router.put("/:id", protect, authorize("admin", "teacher"), updateExam);
router.delete("/:id", protect, authorize("admin", "teacher"), deleteExam);

// Lifecycle
router.put("/:id/publish", protect, authorize("admin", "teacher"), publishExam);
router.put("/:id/close", protect, authorize("admin", "teacher"), closeExam);
router.put("/:id/archive", protect, authorize("admin", "teacher"), archiveExam);
router.put("/:id/study-visibility", protect, authorize("admin", "teacher"), setStudyVisibility);
router.post("/:id/reconduct", protect, authorize("admin", "teacher"), reconductExam);
router.get("/:id/download", protect, authorize("admin", "teacher"), downloadExam);

// Results publishing
router.get("/:id/results", protect, authorize("admin", "teacher"), getExamResults);
router.put("/:id/publish-results", protect, authorize("admin", "teacher"), publishResults);

// Exam-specific questions (belong to THIS exam only)
router.get("/:id/questions", protect, getExamQuestions);
router.post(
  "/:id/questions",
  protect,
  authorize("admin", "teacher"),
  upload.fields([
    { name: "questionImage", maxCount: 1 },
    { name: "explanationImage", maxCount: 1 },
    { name: "optionImage_0", maxCount: 1 },
    { name: "optionImage_1", maxCount: 1 },
    { name: "optionImage_2", maxCount: 1 },
    { name: "optionImage_3", maxCount: 1 },
  ]),
  createExamQuestion
);
router.post("/:id/import-questions", protect, authorize("admin", "teacher"), importQuestions);
router.delete(
  "/:id/questions/:questionId",
  protect,
  authorize("admin", "teacher"),
  deleteExamQuestion
);

// Outsider / exam-only student permissions
router.get("/:id/permissions", protect, authorize("admin", "teacher"), listPermissions);
router.post("/:id/permissions", protect, authorize("admin"), grantPermission);
router.delete("/:id/permissions/:studentId", protect, authorize("admin"), revokePermission);

module.exports = router;
