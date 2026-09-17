const mongoose = require("mongoose");

const materialSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String },
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
    // Batch = Course. Materials are always published to a batch (Unit → Chapter).
    batch: { type: mongoose.Schema.Types.ObjectId, ref: "Batch", required: true },
    subject: { type: mongoose.Schema.Types.ObjectId, ref: "Subject" },
    unit: { type: mongoose.Schema.Types.ObjectId, ref: "Unit", required: true },
    chapter: { type: mongoose.Schema.Types.ObjectId, ref: "Chapter", required: true },
    topic: { type: mongoose.Schema.Types.ObjectId, ref: "Topic" },
    type: { type: String, enum: ["PDF", "DOC", "PPT", "IMAGE", "VIDEO", "LINK"], default: "PDF" },
    // Direct file/link source. For videos, prefer an external link (Drive/YouTube) to save storage.
    sourceType: { type: String, enum: ["LINK", "UPLOAD"], default: "LINK" },
    fileUrl: { type: String, required: true },
    filePublicId: { type: String, default: "external" },
    fileSize: { type: Number },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Material", materialSchema);
