const express = require("express");
const router = express.Router();
const WebsiteContent = require("../models/WebsiteContent");
const Course = require("../models/Course");
const Teacher = require("../models/Teacher");
const Testimonial = require("../models/Testimonial");
const Achievement = require("../models/Achievement");
const { protect } = require("../middleware/auth.middleware");
const { authorize } = require("../middleware/role.middleware");
const apiResponse = require("../utils/apiResponse");

router.get("/home", async (req, res, next) => {
  try {
    const hero = await WebsiteContent.findOne({ section: "HERO" });
    const about = await WebsiteContent.findOne({ section: "ABOUT" });
    const methodology = await WebsiteContent.findOne({ section: "METHODOLOGY" });
    const announcementBar = await WebsiteContent.findOne({ section: "ANNOUNCEMENT_BAR" });

    const courses = await Course.find({ isActive: true }).sort({ displayOrder: 1 });
    const teachers = await Teacher.find({ isActive: true }).populate("user", "name avatar").populate("subject", "name");
    const testimonials = await Testimonial.find({ isActive: true }).sort({ displayOrder: 1 });
    const achievements = await Achievement.find({ isActive: true, featured: true }).sort({ displayOrder: 1 });

    return apiResponse(res, 200, "Homepage data", {
      hero,
      about,
      methodology,
      announcementBar: announcementBar ? announcementBar.announcementBar : null,
      courses,
      teachers,
      testimonials,
      achievements,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/section/:section", async (req, res, next) => {
  try {
    const content = await WebsiteContent.findOne({ section: req.params.section });
    return apiResponse(res, 200, "Section content", { content });
  } catch (error) {
    next(error);
  }
});

router.put("/section/:section", protect, authorize("admin"), async (req, res, next) => {
  try {
    const content = await WebsiteContent.findOneAndUpdate(
      { section: req.params.section },
      { $set: req.body },
      { new: true, upsert: true }
    );
    return apiResponse(res, 200, "Section updated", { content });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
