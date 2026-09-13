const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema(
  {
    attempt: { type: mongoose.Schema.Types.ObjectId, ref: "Attempt", required: true, unique: true },
    exam: { type: mongoose.Schema.Types.ObjectId, ref: "Exam", required: true },
    student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    totalMarks: { type: Number },
    obtainedMarks: { type: Number },
    correctCount: { type: Number },
    wrongCount: { type: Number },
    unattemptedCount: { type: Number },
    accuracy: { type: Number },
    timeTaken: { type: Number },
    percentage: { type: Number },
    rank: { type: Number },
    percentile: { type: Number },
    subjectBreakdown: [
      {
        subject: { type: mongoose.Schema.Types.ObjectId, ref: "Subject" },
        correct: { type: Number, default: 0 },
        wrong: { type: Number, default: 0 },
        unattempted: { type: Number, default: 0 },
        marks: { type: Number, default: 0 },
      },
    ],
    chapterBreakdown: [
      {
        chapter: { type: mongoose.Schema.Types.ObjectId, ref: "Chapter" },
        correct: { type: Number, default: 0 },
        wrong: { type: Number, default: 0 },
        unattempted: { type: Number, default: 0 },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Result", resultSchema);
