const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    message: { type: String, required: true },
    type: {
      type: String,
      enum: ["MATERIAL", "LECTURE", "TEST", "RESULT", "ANNOUNCEMENT", "GENERAL"],
      default: "GENERAL",
    },
    // Routing scope. BATCH (default) = only students of targetBatches see it.
    // STUDENT = only targetStudents. ROLE = rare admin-wide broadcast.
    scope: { type: String, enum: ["BATCH", "STUDENT", "ROLE"], default: "BATCH" },
    targetRole: { type: String, enum: ["student", "teacher", "all"], default: "student" },
    targetBatches: [{ type: mongoose.Schema.Types.ObjectId, ref: "Batch" }],
    targetStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    isRead: { type: Boolean, default: false },
    readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notification", notificationSchema);
