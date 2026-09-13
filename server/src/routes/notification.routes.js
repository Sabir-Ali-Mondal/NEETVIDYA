const express = require("express");
const router = express.Router();
const Notification = require("../models/Notification");
const { protect } = require("../middleware/auth.middleware");
const apiResponse = require("../utils/apiResponse");

router.get("/", protect, async (req, res, next) => {
  try {
    const notifications = await Notification.find({
      $or: [
        { targetRole: "all" },
        { targetRole: req.user.role },
        { targetStudents: req.user._id },
      ],
      isActive: true,
    }).sort({ createdAt: -1 }).limit(20);

    return apiResponse(res, 200, "Notifications", { notifications });
  } catch (error) {
    next(error);
  }
});

router.put("/:id/read", protect, async (req, res, next) => {
  try {
    await Notification.findByIdAndUpdate(req.params.id, {
      $addToSet: { readBy: req.user._id },
    });
    return apiResponse(res, 200, "Marked as read");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
