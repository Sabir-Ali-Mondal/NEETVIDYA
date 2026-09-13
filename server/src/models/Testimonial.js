const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    role: { type: String, enum: ["STUDENT", "PARENT"], required: true },
    course: { type: String },
    photoUrl: { type: String },
    photoPublicId: { type: String },
    content: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    displayOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Testimonial", testimonialSchema);
