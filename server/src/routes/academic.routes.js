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
const { DEFAULT_SUBJECTS } = require("../config/constants");

// Lazily create the four default subjects so the Faculty Library always has options.
const ensureDefaultSubjects = async () => {
  await Promise.all(
    DEFAULT_SUBJECTS.map((name, index) =>
      Subject.findOneAndUpdate(
        { name },
        { $setOnInsert: { name, displayOrder: index, isActive: true, isCustom: false } },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      )
    )
  );
};

router.get("/subjects", async (req, res, next) => {
  try {
    // No course-scoped catalogue exists yet → seed defaults on first read.
    const existingCount = await Subject.countDocuments({ isActive: true });
    if (existingCount === 0) {
      await ensureDefaultSubjects();
    }

    const filter = { isActive: true };
    if (req.query.course) filter.course = req.query.course;
    const subjects = await Subject.find(filter).sort({ displayOrder: 1, name: 1 });
    return apiResponse(res, 200, "Subjects retrieved", { subjects });
  } catch (error) {
    next(error);
  }
});

// Create a custom subject (used by the "Other" option in the Faculty Library).
router.post("/subjects", protect, authorize("admin", "teacher"), async (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name || !name.trim()) {
      return next(new ApiError(400, "Subject name is required"));
    }
    const clean = name.trim();
    const existingSubject = await Subject.findOne({
      name: { $regex: `^${clean}$`, $options: "i" },
    });
    let subject = existingSubject;
    if (!subject) {
      subject = await Subject.create({ name: clean, isCustom: true, isActive: true });
    }
    return apiResponse(res, 201, "Subject ready", { subject });
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
