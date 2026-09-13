const mongoose = require("mongoose");

const testSeriesSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String },
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
    subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subject" }],
    coverImageUrl: { type: String },
    coverImagePublicId: { type: String },
    totalTests: { type: Number, default: 0 },
    exams: [{ type: mongoose.Schema.Types.ObjectId, ref: "Exam" }],
    isActive: { type: Boolean, default: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("TestSeries", testSeriesSchema);
