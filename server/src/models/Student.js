const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    studentId: { type: String, unique: true, sparse: true }, // e.g. NV-2026-0001
    studentType: {
      type: String,
      enum: ["REGULAR_OFFLINE", "REGULAR_ONLINE", "HYBRID", "EXAM_ONLY", "GUEST"],
      default: "REGULAR_OFFLINE",
    },
    batches: [{ type: mongoose.Schema.Types.ObjectId, ref: "Batch" }],
    enrollmentDate: { type: Date, default: Date.now },
    parentName: { type: String },
    parentPhone: { type: String },
    school: { type: String },
    currentClass: { type: String, enum: ["XI", "XII", "DROPPER", "REPEATER"] },
    address: { type: String },
    city: { type: String },
    whatsappNumber: { type: String },
    tags: [{ type: String }],
    notes: { type: String },
    // Mirror of active ExamPermission grants for fast dashboard display
    examPermissions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Exam" }],
    avatarBase64: { type: String },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);
