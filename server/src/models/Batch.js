const mongoose = require("mongoose");

const batchSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Batch name is required"], trim: true },
    code: { type: String, required: true, unique: true, trim: true },
    batchType: {
      type: String,
      enum: ["OFFLINE", "ONLINE", "HYBRID", "EXAM_ONLY", "CRASH_COURSE"],
      required: true,
    },
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    academicYear: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
    capacity: { type: Number },
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    assignedTeachers: [
      {
        teacher: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        subject: { type: mongoose.Schema.Types.ObjectId, ref: "Subject" },
      },
    ],
    schedule: { type: String },
    telegramGroupLink: { type: String },
    color: { type: String, default: "#18A66A" },
    isActive: { type: Boolean, default: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Batch", batchSchema);
