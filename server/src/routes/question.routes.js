const express = require("express");
const router = express.Router();
const {
  getQuestions,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  addExplanation,
  bulkImport,
} = require("../controllers/question.controller");
const { protect } = require("../middleware/auth.middleware");
const { authorize } = require("../middleware/role.middleware");

router.get("/", protect, authorize("teacher", "admin"), getQuestions);
router.post("/", protect, authorize("teacher", "admin"), createQuestion);
router.post("/bulk-import", protect, authorize("admin"), bulkImport);
router.put("/:id", protect, authorize("teacher", "admin"), updateQuestion);
router.put("/:id/explanation", protect, authorize("teacher", "admin"), addExplanation);
router.delete("/:id", protect, authorize("teacher", "admin"), deleteQuestion);

module.exports = router;
