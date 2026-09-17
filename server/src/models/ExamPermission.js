const mongoose = require("mongoose");

// Explicit, auditable grant that lets a student who is NOT in the exam's batch
// access that specific exam only (e.g. EXAM_ONLY / GUEST candidates).
const examPermissionSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    exam: { type: mongoose.Schema.Types.ObjectId, ref: "Exam", required: true },
    grantedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    reason: { type: String },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

examPermissionSchema.index({ student: 1, exam: 1 }, { unique: true });

module.exports = mongoose.model("ExamPermission", examPermissionSchema);
