const express = require("express");
const router = express.Router();
const Material = require("../models/Material");
const { protect } = require("../middleware/auth.middleware");
const apiResponse = require("../utils/apiResponse");

router.get("/", protect, async (req, res, next) => {
  try {
    const filter = { isActive: true };
    if (req.query.course) filter.course = req.query.course;
    if (req.query.subject) filter.subject = req.query.subject;
    if (req.query.chapter) filter.chapter = req.query.chapter;

    const materials = await Material.find(filter)
      .populate("subject", "name")
      .populate("chapter", "name")
      .sort({ createdAt: -1 });

    return apiResponse(res, 200, "Materials retrieved", { materials });
  } catch (error) {
    next(error);
  }
});

router.post("/", protect, async (req, res, next) => {
  try {
    const material = await Material.create({ ...req.body, uploadedBy: req.user._id });
    return apiResponse(res, 201, "Material created", { material });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
