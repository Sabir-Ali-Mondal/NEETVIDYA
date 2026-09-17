const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    questionText: { type: String, required: [true, "Question text is required"] },
    questionImageUrl: { type: String },
    questionImagePublicId: { type: String },
    options: [
      {
        text: { type: String, required: true },
        imageUrl: { type: String },
        order: { type: Number },
      },
    ],
    correctAnswer: { type: Number, required: [true, "Correct answer index is required"] },
    explanation: { type: String },
    explanationImageUrl: { type: String },
    explanationImagePublicId: { type: String },
    subject: { type: mongoose.Schema.Types.ObjectId, ref: "Subject" },
    batch: { type: mongoose.Schema.Types.ObjectId, ref: "Batch" },
    unit: { type: mongoose.Schema.Types.ObjectId, ref: "Unit" },
    chapter: { type: mongoose.Schema.Types.ObjectId, ref: "Chapter" },
    topic: { type: mongoose.Schema.Types.ObjectId, ref: "Topic" },
    difficulty: { type: String, enum: ["Easy", "Medium", "Hard"], required: true, default: "Medium" },
    marks: { type: Number, required: true, default: 4 },
    negativeMarks: { type: Number, required: true, default: 1 },
    source: { type: String },
    year: { type: Number },
    tags: [{ type: String }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

questionSchema.index({ subject: 1, chapter: 1 });
questionSchema.index({ difficulty: 1 });
questionSchema.index({ source: 1, year: 1 });

module.exports = mongoose.model("Question", questionSchema);
