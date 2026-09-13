const express = require("express");
const router = express.Router();
const Subject = require("../models/Subject");
const Unit = require("../models/Unit");
const Chapter = require("../models/Chapter");
const Topic = require("../models/Topic");
const { protect } = require("../middleware/auth.middleware");
const { authorize } = require("../middleware/role.middleware");
const apiResponse = require("../utils/apiResponse");

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
    const chapters = await Chapter.find(filter).sort({ displayOrder: 1 });
    return apiResponse(res, 200, "Chapters retrieved", { chapters });
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
