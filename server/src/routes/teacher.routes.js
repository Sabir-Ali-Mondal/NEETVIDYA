const express = require("express");
const router = express.Router();
const Teacher = require("../models/Teacher");
const User = require("../models/User");
const { protect } = require("../middleware/auth.middleware");
const { authorize } = require("../middleware/role.middleware");
const apiResponse = require("../utils/apiResponse");
const ApiError = require("../utils/apiError");

router.get("/public", async (req, res, next) => {
  try {
    const teachers = await Teacher.find({ isActive: true })
      .populate("user", "name email avatar")
      .populate("subject", "name");
    return apiResponse(res, 200, "Public faculty list", { teachers });
  } catch (error) {
    next(error);
  }
});

router.get("/", protect, authorize("admin"), async (req, res, next) => {
  try {
    const teachers = await Teacher.find()
      .populate("user", "name email phone isActive avatar")
      .populate("subject", "name");
    return apiResponse(res, 200, "Teachers list", { teachers });
  } catch (error) {
    next(error);
  }
});

router.get("/my", protect, authorize("teacher"), async (req, res, next) => {
  try {
    const teacher = await Teacher.findOne({ user: req.user._id })
      .populate("user", "name email phone avatar")
      .populate("subject", "name");
    return apiResponse(res, 200, "Teacher profile", { teacher });
  } catch (error) {
    next(error);
  }
});

router.put("/:id/permissions", protect, authorize("admin"), async (req, res, next) => {
  try {
    const teacher = await Teacher.findByIdAndUpdate(
      req.params.id,
      { $set: { permissions: req.body } },
      { new: true }
    );
    return apiResponse(res, 200, "Permissions updated", { teacher });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
