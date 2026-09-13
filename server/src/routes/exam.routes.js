const express = require("express");
const router = express.Router();
const Exam = require("../models/Exam");
const { protect } = require("../middleware/auth.middleware");
const { authorize } = require("../middleware/role.middleware");
const apiResponse = require("../utils/apiResponse");

router.get("/", protect, async (req, res, next) => {
  try {
    const filter = {};
    if (req.user.role === "student") {
      filter.status = "LIVE";
    }
    const exams = await Exam.find(filter)
      .populate("course", "name")
      .populate("subjects", "name")
      .sort({ createdAt: -1 });
    return apiResponse(res, 200, "Exams retrieved", { exams });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", protect, async (req, res, next) => {
  try {
    const exam = await Exam.findById(req.params.id)
      .populate("course", "name")
      .populate("subjects", "name");
    return apiResponse(res, 200, "Exam details", { exam });
  } catch (error) {
    next(error);
  }
});

router.post("/", protect, authorize("admin", "teacher"), async (req, res, next) => {
  try {
    const exam = await Exam.create({ ...req.body, createdBy: req.user._id });
    return apiResponse(res, 201, "Exam created", { exam });
  } catch (error) {
    next(error);
  }
});

router.put("/:id", protect, authorize("admin", "teacher"), async (req, res, next) => {
  try {
    const exam = await Exam.findByIdAndUpdate(req.params.id, req.body, { new: true });
    return apiResponse(res, 200, "Exam updated", { exam });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
