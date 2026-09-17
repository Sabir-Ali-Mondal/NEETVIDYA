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
    // Exam is ALWAYS batch-specific (Batch === Course in this platform)
    batch: { type: mongoose.Schema.Types.ObjectId, ref: "Batch", required: true },
    // Every exam carries its OWN fixed question set. Never auto-pulled from a bank.
    questions: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
      validate: {
        validator: (v) => Array.isArray(v) && v.length > 0,
        message: "An exam must contain at least one question",
      },
    },
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
      enum: ["DRAFT", "SCHEDULED", "PUBLISHED", "LIVE", "CLOSED", "ARCHIVED"],
      default: "DRAFT",
    },
    instructions: { type: String },

    // ── Result publishing rule ─────────────────
    resultPublishMode: {
      type: String,
      enum: ["IMMEDIATE", "MANUAL", "SCHEDULED"],
      default: "MANUAL",
    },
    resultPublishAt: { type: Date },
    resultsPublishedAt: { type: Date },
    resultsPublished: { type: Boolean, default: false },

    // ── Outsider / specific-student access (admin granted) ─────
    permittedStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

    // ── Question Bank archive metadata (archive = finished exam paper) ──
    isArchived: { type: Boolean, default: false },
    archivedAt: { type: Date },
    studyVisible: { type: Boolean, default: false },
    reconductedFrom: { type: mongoose.Schema.Types.ObjectId, ref: "Exam" },

    // legacy compatibility
    eligibleBatches: [{ type: mongoose.Schema.Types.ObjectId, ref: "Batch" }],
    eligibleStudentTypes: [{ type: String }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    publishedAt: { type: Date },
  },
  { timestamps: true }
);

examSchema.index({ batch: 1, status: 1 });
examSchema.index({ isArchived: 1, studyVisible: 1 });

module.exports = mongoose.model("Exam", examSchema);
