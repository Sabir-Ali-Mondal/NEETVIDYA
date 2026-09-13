const express = require("express");
const router = express.Router();
const { startAttempt, saveAttemptState, submitAttempt, getAttempt, getMyAttempts } = require("../controllers/attempt.controller");
const { protect } = require("../middleware/auth.middleware");
const { authorize } = require("../middleware/role.middleware");

router.post("/exam/:examId/start", protect, authorize("student", "admin"), startAttempt);
router.get("/my", protect, authorize("student"), getMyAttempts);
router.get("/:id", protect, getAttempt);
router.put("/:id/save", protect, authorize("student", "admin"), saveAttemptState);
router.post("/:id/submit", protect, authorize("student", "admin"), submitAttempt);

module.exports = router;
