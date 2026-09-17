const express = require("express");
const router = express.Router();
const Subject = require("../models/Subject");
const Unit = require("../models/Unit");
const Chapter = require("../models/Chapter");
const Topic = require("../models/Topic");
const { protect } = require("../middleware/auth.middleware");
const { authorize } = require("../middleware/role.middleware");
const apiResponse = require("../utils/apiResponse");
const ApiError = require("../utils/apiError");

router.get("/subjects", async (req, res, next) => {
  try {
    const filter = { isActive: true };
    if (req.query.course) filter.course = req.query.course;
    const subjects = await Subject.find(filter).sort({ displayOrder: 1 });
    return apiResponse(res, 200, "Subjects retrieved", { subjects });
  } catch (error) {
    next(error);
  }
});

router.get("/chapters", async (req, res, next) => {
  try {
    const filter = { isActive: true };
    if (req.query.subject) filter.subject = req.query.subject;
    if (req.query.unit) filter.unit = req.query.unit;
    const chapters = await Chapter.find(filter).sort({ displayOrder: 1 });
    return apiResponse(res, 200, "Chapters retrieved", { chapters });
  } catch (error) {
    next(error);
  }
});

router.get("/units", async (req, res, next) => {
  try {
    const filter = { isActive: true };
    if (req.query.subject) filter.subject = req.query.subject;
    const units = await Unit.find(filter)
      .populate("subject", "name")
      .sort({ displayOrder: 1 });
    return apiResponse(res, 200, "Units retrieved", { units });
  } catch (error) {
    next(error);
  }
});

// ── Create / manage academic structure (admin + teacher) ────
router.post("/units", protect, authorize("admin", "teacher"), async (req, res, next) => {
  try {
    const { name, subject, description, displayOrder } = req.body;
    if (!name || !subject) {
      return next(new ApiError(400, "Unit name and subject are required"));
    }
    // Return an existing unit with the same name instead of duplicating.
    let unit = await Unit.findOne({ name, subject });
    if (!unit) {
      unit = await Unit.create({ name, subject, description, displayOrder });
    }
    return apiResponse(res, 201, "Unit ready", { unit });
  } catch (error) {
    next(error);
  }
});

router.post("/chapters", protect, authorize("admin", "teacher"), async (req, res, next) => {
  try {
    const { name, unit, subject, description, displayOrder } = req.body;
    if (!name || !unit) {
      return next(new ApiError(400, "Chapter name and unit are required"));
    }
    let resolvedSubject = subject;
    if (!resolvedSubject) {
      const parent = await Unit.findById(unit);
      resolvedSubject = parent?.subject;
    }
    let chapter = await Chapter.findOne({ name, unit });
    if (!chapter) {
      chapter = await Chapter.create({
        name,
        unit,
        subject: resolvedSubject,
        description,
        displayOrder,
      });
    }
    return apiResponse(res, 201, "Chapter ready", { chapter });
  } catch (error) {
    next(error);
  }
});

router.get("/tree/:courseId", async (req, res, next) => {
  try {
    const subjects = await Subject.find({ course: req.params.courseId, isActive: true });
    const chapters = await Chapter.find({ subject: { $in: subjects.map(s => s._id) }, isActive: true });
    return apiResponse(res, 200, "Academic tree", { subjects, chapters });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
