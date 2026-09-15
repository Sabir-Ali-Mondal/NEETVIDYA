const mongoose = require("mongoose");

const materialSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String },
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
    subject: { type: mongoose.Schema.Types.ObjectId, ref: "Subject", required: true },
    unit: { type: mongoose.Schema.Types.ObjectId, ref: "Unit" },
    chapter: { type: mongoose.Schema.Types.ObjectId, ref: "Chapter" },
    topic: { type: mongoose.Schema.Types.ObjectId, ref: "Topic" },
    type: { type: String, enum: ["PDF", "DOC", "PPT", "IMAGE"], default: "PDF" },
    fileUrl: { type: String, required: true },
    filePublicId: { type: String, default: "external" },
    fileSize: { type: Number },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Material", materialSchema);
