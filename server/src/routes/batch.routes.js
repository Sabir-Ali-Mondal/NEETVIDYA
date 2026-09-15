const express = require("express");
const router = express.Router();
const {
  getBatches,
  createBatch,
  updateBatch,
  deleteBatch,
  addStudentsToBatch,
  removeStudentFromBatch,
  getBatchStudents,
} = require("../controllers/batch.controller");
const { protect } = require("../middleware/auth.middleware");
const { authorize } = require("../middleware/role.middleware");

router.get("/", protect, getBatches);
router.post("/", protect, authorize("admin"), createBatch);
router.put("/:id", protect, authorize("admin"), updateBatch);
router.delete("/:id", protect, authorize("admin"), deleteBatch);
router.post("/:id/students", protect, authorize("admin"), addStudentsToBatch);
router.delete("/:id/students/:studentId", protect, authorize("admin"), removeStudentFromBatch);
router.get("/:id/students", protect, getBatchStudents);

module.exports = router;
