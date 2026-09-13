const mongoose = require("mongoose");

const courseResourceSchema = new mongoose.Schema(
  {
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    subject: { type: mongoose.Schema.Types.ObjectId, ref: "Subject" },
    chapter: { type: mongoose.Schema.Types.ObjectId, ref: "Chapter" },
    title: { type: String, required: true, trim: true },
    description: { type: String },
    resourceType: {
      type: String,
      enum: ["EXTERNAL_LINK", "YOUTUBE", "GOOGLE_DRIVE", "REFERENCE_SITE", "TOOL", "CUSTOM"],
      required: true,
    },
    url: { type: String, required: true },
    icon: { type: String },
    thumbnailUrl: { type: String },
    displayOrder: { type: Number, default: 0 },
    isPublic: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    addedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CourseResource", courseResourceSchema);
