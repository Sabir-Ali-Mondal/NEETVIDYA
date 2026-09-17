const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024 } });

const {
  getQuestions,
  createQuestion,
  createQuestionWithImages,
  updateQuestion,
  deleteQuestion,
  addExplanation,
  bulkImport,
} = require("../controllers/question.controller");
const { protect } = require("../middleware/auth.middleware");
const { authorize } = require("../middleware/role.middleware");

const Question = require("../models/Question");
const apiResponse = require("../utils/apiResponse");

// Question Bank = archive of completed exams (exam papers), NOT a manual question store.
router.get("/bank", protect, authorize("teacher", "admin"), async (req, res, next) => {
  try {
    const svc = require("../services/exam.service");
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const data = await svc.getQuestionBank({ page, limit, search: req.query.search || "" });
    return apiResponse(res, 200, "Question bank (archived exam papers)", data);
  } catch (error) {
    next(error);
  }
});

router.get("/", protect, authorize("teacher", "admin"), getQuestions);
router.post("/", protect, authorize("teacher", "admin"), createQuestion);
router.post(
  "/with-images",
  protect,
  authorize("teacher", "admin"),
  upload.fields([
    { name: "questionImage", maxCount: 1 },
    { name: "explanationImage", maxCount: 1 },
    { name: "optionImage_0", maxCount: 1 },
    { name: "optionImage_1", maxCount: 1 },
    { name: "optionImage_2", maxCount: 1 },
    { name: "optionImage_3", maxCount: 1 },
  ]),
  createQuestionWithImages
);
router.post("/bulk-import", protect, authorize("admin"), bulkImport);
router.put("/:id", protect, authorize("teacher", "admin"), updateQuestion);
router.put("/:id/explanation", protect, authorize("teacher", "admin"), addExplanation);
router.delete("/:id", protect, authorize("teacher", "admin"), deleteQuestion);

module.exports = router;
