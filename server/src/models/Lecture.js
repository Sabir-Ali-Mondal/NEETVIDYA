const mongoose = require("mongoose");

const lectureSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String },
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    subject: { type: mongoose.Schema.Types.ObjectId, ref: "Subject", required: true },
    unit: { type: mongoose.Schema.Types.ObjectId, ref: "Unit" },
    chapter: { type: mongoose.Schema.Types.ObjectId, ref: "Chapter" },
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    videoUrl: { type: String, required: true },
    videoPublicId: { type: String, required: true },
    thumbnailUrl: { type: String },
    thumbnailPublicId: { type: String },
    duration: { type: Number },
    displayOrder: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Lecture", lectureSchema);
