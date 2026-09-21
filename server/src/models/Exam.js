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
    // The course an exam belongs to. For an exam covering ALL batches of a course
    // (examScope = COURSE) this is the only target; for a single-batch exam
    // (examScope = BATCH) it is derived from the selected batch.
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
    // What the exam is assigned to:
    //   BATCH  → the single batch in `batch`
    //   COURSE → every active batch that belongs to `course`
    examScope: {
      type: String,
      enum: ["BATCH", "COURSE"],
      default: "BATCH",
    },
    // Specific batch. Required only when examScope === "BATCH".
    batch: { type: mongoose.Schema.Types.ObjectId, ref: "Batch" },
    // Every exam carries its OWN fixed question set. Drafts can be created before
    // the questions are attached; a non-empty question set is required before publishing.
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
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

    // ── Public share link (advertisement / virality) ──
    // Anyone can open /e/:shareSlug to see a sanitized exam preview (no questions).
    shareSlug: { type: String, unique: true, sparse: true },
    isPublic: { type: Boolean, default: false },

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
examSchema.index({ course: 1, status: 1 });
examSchema.index({ isArchived: 1, studyVisible: 1 });

module.exports = mongoose.model("Exam", examSchema);
