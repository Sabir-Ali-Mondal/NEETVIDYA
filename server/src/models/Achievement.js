const mongoose = require("mongoose");

const achievementSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    category: {
      type: String,
      enum: ["STUDENT_RESULT", "INSTITUTE_MILESTONE", "AWARD", "CERTIFICATION", "EVENT", "CUSTOM"],
      required: true,
    },
    studentName: { type: String },
    studentBatch: { type: String },
    studentPhotoUrl: { type: String },
    studentPhotoPublicId: { type: String },
    imageUrl: { type: String },
    imagePublicId: { type: String },
    score: { type: String },
    year: { type: Number },
    featured: { type: Boolean, default: false },
    displayOrder: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Achievement", achievementSchema);
