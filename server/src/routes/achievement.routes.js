const express = require("express");
const router = express.Router();
const Achievement = require("../models/Achievement");
const { protect } = require("../middleware/auth.middleware");
const { authorize } = require("../middleware/role.middleware");
const apiResponse = require("../utils/apiResponse");

router.get("/", async (req, res, next) => {
  try {
    const achievements = await Achievement.find({ isActive: true }).sort({ displayOrder: 1 });
    return apiResponse(res, 200, "Achievements", { achievements });
  } catch (error) {
    next(error);
  }
});

router.post("/", protect, authorize("admin"), async (req, res, next) => {
  try {
    const achievement = await Achievement.create({ ...req.body, createdBy: req.user._id });
    return apiResponse(res, 201, "Achievement created", { achievement });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
