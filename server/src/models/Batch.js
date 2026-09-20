const mongoose = require("mongoose");

const batchSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Batch name is required"], trim: true },
    code: { type: String, required: true, unique: true, trim: true },
    batchType: {
      type: String,
      enum: ["OFFLINE", "ONLINE", "HYBRID", "EXAM_ONLY", "CRASH_COURSE"],
      required: true,
    },
    // One of the institute's fixed programme identifiers (see client/src/config/courses.js),
    // e.g. "SANKALP" or "UDAAN". Stored as a plain string because the course catalogue is
    // fixed rather than a user-managed collection.
    course: {
      type: String,
      enum: {
        values: ["SANKALP", "UDAAN"],
        message: "Course must be one of: SANKALP, UDAAN",
      },
      default: null,
    },
    academicYear: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
    capacity: { type: Number },
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    assignedTeachers: [
      {
        teacher: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        subject: { type: mongoose.Schema.Types.ObjectId, ref: "Subject" },
      },
    ],
    schedule: { type: String },
    telegramGroupLink: { type: String },
    // Batch-specific groups (doubt / help / community). Shown to students of this batch.
    groups: [
      {
        label: { type: String, trim: true },
        type: { type: String, enum: ["TELEGRAM", "WHATSAPP", "LINK"], default: "LINK" },
        url: { type: String, trim: true },
        description: { type: String, trim: true },
      },
    ],
    color: { type: String, default: "#18A66A" },
    isActive: { type: Boolean, default: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Batch", batchSchema);
