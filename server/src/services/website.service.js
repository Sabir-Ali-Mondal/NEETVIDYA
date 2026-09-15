const WebsiteContent = require("../models/WebsiteContent");
const Course = require("../models/Course");
const Teacher = require("../models/Teacher");
const Testimonial = require("../models/Testimonial");
const Achievement = require("../models/Achievement");

const getHomepageData = async () => {
  const [hero, about, methodology, announcementBar, courses, teachers, testimonials, achievements] =
    await Promise.all([
      WebsiteContent.findOne({ section: "HERO" }),
      WebsiteContent.findOne({ section: "ABOUT" }),
      WebsiteContent.findOne({ section: "METHODOLOGY" }),
      WebsiteContent.findOne({ section: "ANNOUNCEMENT_BAR" }),
      Course.find({ isActive: true }).sort({ displayOrder: 1 }).limit(6),
      Teacher.find({ isActive: true }).populate("user", "name avatar").populate("subject", "name"),
      Testimonial.find({ isActive: true }).sort({ displayOrder: 1 }),
      Achievement.find({ isActive: true, featured: true }).sort({ displayOrder: 1 }),
    ]);

  return {
    hero,
    about,
    methodology,
    announcementBar: announcementBar?.announcementBar || null,
    courses,
    teachers,
    testimonials,
    achievements,
  };
};

const getSection = async (sectionName) => {
  return await WebsiteContent.findOne({ section: sectionName });
};

const updateSection = async (sectionName, data) => {
  return await WebsiteContent.findOneAndUpdate(
    { section: sectionName },
    { $set: data },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  );
};

module.exports = { getHomepageData, getSection, updateSection };
