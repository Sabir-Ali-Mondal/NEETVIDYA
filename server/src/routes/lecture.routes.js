const express = require("express");
const router = express.Router();
const { getLectures, createLecture, updateLecture, deleteLecture } = require("../controllers/lecture.controller");
const { protect } = require("../middleware/auth.middleware");
const { authorize } = require("../middleware/role.middleware");

router.get("/", protect, getLectures);
router.post("/", protect, authorize("admin", "teacher"), createLecture);
router.put("/:id", protect, authorize("admin", "teacher"), updateLecture);
router.delete("/:id", protect, authorize("admin", "teacher"), deleteLecture);

module.exports = router;
