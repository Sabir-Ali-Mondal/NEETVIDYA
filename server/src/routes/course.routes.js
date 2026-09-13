const express = require("express");
const router = express.Router();
const Course = require("../models/Course");
const Subject = require("../models/Subject");
const { protect } = require("../middleware/auth.middleware");
const { authorize } = require("../middleware/role.middleware");
const apiResponse = require("../utils/apiResponse");

router.get("/", async (req, res, next) => {
  try {
    const courses = await Course.find({ isActive: true })
      .populate("subjects", "name code")
      .sort({ displayOrder: 1 });
    return apiResponse(res, 200, "Courses retrieved", { courses });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id).populate("subjects");
    return apiResponse(res, 200, "Course details", { course });
  } catch (error) {
    next(error);
  }
});

router.post("/", protect, authorize("admin"), async (req, res, next) => {
  try {
    const course = await Course.create({ ...req.body, createdBy: req.user._id });
    return apiResponse(res, 201, "Course created", { course });
  } catch (error) {
    next(error);
  }
});

router.put("/:id", protect, authorize("admin"), async (req, res, next) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
    return apiResponse(res, 200, "Course updated", { course });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
