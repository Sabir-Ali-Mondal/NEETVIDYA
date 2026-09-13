const mongoose = require("mongoose");

const enrollmentSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    batch: { type: mongoose.Schema.Types.ObjectId, ref: "Batch" },
    status: {
      type: String,
      enum: ["ACTIVE", "EXPIRED", "SUSPENDED", "COMPLETED"],
      default: "ACTIVE",
    },
    enrolledAt: { type: Date, default: Date.now },
    expiresAt: { type: Date },
    paymentStatus: {
      type: String,
      enum: ["FREE", "PENDING", "PAID", "PARTIAL", "REFUNDED"],
      default: "FREE",
    },
    paymentId: { type: String },
    amountPaid: { type: Number, default: 0 },
    amountTotal: { type: Number, default: 0 },
    access: {
      materials: { type: Boolean, default: true },
      lectures: { type: Boolean, default: true },
      testSeries: { type: Boolean, default: true },
      downloads: { type: Boolean, default: true },
    },
    enrolledBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    enrollmentType: {
      type: String,
      enum: ["ADMIN_MANUAL", "SELF_REGISTER", "PAYMENT", "INVITATION"],
      default: "ADMIN_MANUAL",
    },
  },
  { timestamps: true }
);

enrollmentSchema.index({ student: 1, course: 1 }, { unique: true });

module.exports = mongoose.model("Enrollment", enrollmentSchema);
