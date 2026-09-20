const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String },
    // Optional: default subjects (Biology/Physics/...) and custom "Other" subjects
    // are stored without a fixed course.
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
    code: { type: String },
    description: { type: String },
    icon: { type: String },
    // True when a teacher created this subject through the "Other" option.
    isCustom: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    displayOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Subject", subjectSchema);
