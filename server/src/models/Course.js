const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Course name is required"], trim: true },
    slug: { type: String, unique: true },
    description: { type: String },
    targetClass: { type: String },
    subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subject" }],
    duration: { type: String },
    features: [{ type: String }],
    coverImageUrl: { type: String },
    coverImagePublicId: { type: String },
    feeAmount: { type: Number, default: 0 },
    feeCurrency: { type: String, default: "INR" },
    isActive: { type: Boolean, default: true },
    displayOrder: { type: Number, default: 0 },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);
