const mongoose = require("mongoose");

const attemptSchema = new mongoose.Schema(
  {
    exam: { type: mongoose.Schema.Types.ObjectId, ref: "Exam", required: true },
    student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    startedAt: { type: Date, required: true },
    serverEndTime: { type: Date, required: true },
    submittedAt: { type: Date },
    status: {
      type: String,
      enum: ["IN_PROGRESS", "SUBMITTED", "AUTO_SUBMITTED", "ABANDONED"],
      default: "IN_PROGRESS",
    },
    answers: [
      {
        question: { type: mongoose.Schema.Types.ObjectId, ref: "Question" },
        selectedOption: { type: Number, default: null },
        markedForReview: { type: Boolean, default: false },
        timeSpent: { type: Number, default: 0 },
      },
    ],
    currentQuestion: { type: Number, default: 0 },
    questionOrder: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
    optionOrders: [[Number]],
    totalScore: { type: Number },
    correctCount: { type: Number },
    wrongCount: { type: Number },
    unattemptedCount: { type: Number },
    accuracy: { type: Number },
    timeTaken: { type: Number },
    tabSwitchCount: { type: Number, default: 0 },
    isFullScreen: { type: Boolean, default: true },
  },
  { timestamps: true }
);

attemptSchema.index({ exam: 1, student: 1 });

module.exports = mongoose.model("Attempt", attemptSchema);
