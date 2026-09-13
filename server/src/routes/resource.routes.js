const express = require("express");
const router = express.Router();
const CourseResource = require("../models/CourseResource");
const { protect } = require("../middleware/auth.middleware");
const apiResponse = require("../utils/apiResponse");

router.get("/public", async (req, res, next) => {
  try {
    const resources = await CourseResource.find({ isPublic: true, isActive: true });
    return apiResponse(res, 200, "Public resources", { resources });
  } catch (error) {
    next(error);
  }
});

router.get("/", protect, async (req, res, next) => {
  try {
    const filter = { isActive: true };
    if (req.query.course) filter.course = req.query.course;
    const resources = await CourseResource.find(filter);
    return apiResponse(res, 200, "Resources retrieved", { resources });
  } catch (error) {
    next(error);
  }
});

router.post("/", protect, async (req, res, next) => {
  try {
    const resource = await CourseResource.create({ ...req.body, addedBy: req.user._id });
    return apiResponse(res, 201, "Resource created", { resource });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
