const mongoose = require("mongoose");

const examSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String },
    testType: {
      type: String,
      enum: ["DPP", "CHAPTER_TEST", "UNIT_TEST", "MOCK_TEST", "PYQ"],
      required: true,
    },
    testSeries: { type: mongoose.Schema.Types.ObjectId, ref: "TestSeries" },
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
    subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subject" }],
    totalQuestions: { type: Number, required: true },
    totalMarks: { type: Number, required: true },
    marksPerCorrect: { type: Number, default: 4 },
    negativePerWrong: { type: Number, default: 1 },
    duration: { type: Number, required: true }, // in minutes
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    maxAttempts: { type: Number, default: 1 },
    randomizeQuestions: { type: Boolean, default: true },
    randomizeOptions: { type: Boolean, default: true },
    status: {
      type: String,
      enum: ["DRAFT", "SCHEDULED", "LIVE", "CLOSED"],
      default: "DRAFT",
    },
    instructions: { type: String },
    eligibleBatches: [{ type: mongoose.Schema.Types.ObjectId, ref: "Batch" }],
    eligibleStudentTypes: [{ type: String }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    publishedAt: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Exam", examSchema);
