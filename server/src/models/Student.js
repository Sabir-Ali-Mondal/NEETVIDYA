const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    studentId: { type: String, unique: true, sparse: true }, // e.g. NV-2026-0001
    studentType: {
      type: String,
      enum: ["REGULAR_OFFLINE", "REGULAR_ONLINE", "HYBRID", "EXAM_ONLY", "GUEST"],
      default: "REGULAR_OFFLINE",
    },
    batches: [{ type: mongoose.Schema.Types.ObjectId, ref: "Batch" }],
    enrollmentDate: { type: Date, default: Date.now },
    parentName: { type: String },
    parentPhone: { type: String },
    school: { type: String },
    currentClass: { type: String, enum: ["XI", "XII", "DROPPER", "REPEATER"] },
    address: { type: String },
    city: { type: String },
    whatsappNumber: { type: String },
    tags: [{ type: String }],
    notes: { type: String },
    // Mirror of active ExamPermission grants for fast dashboard display
    examPermissions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Exam" }],
    avatarBase64: { type: String },
    // Where/how this student registered (captured from the public site).
    // Kept free-form so a course, batch, campaign or page can all be recorded.
    registrationSource: {
      type: { type: String, default: "WEBSITE" },
      label: { type: String },        // human label e.g. "Courses page → Crash Course"
      page: { type: String },         // path/route the signup came from
      referrer: { type: String },     // document.referrer or utm_source
      campaign: { type: String },     // utm_campaign
      course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
      courseName: { type: String },   // snapshot so it survives course deletion
      batch: { type: mongoose.Schema.Types.ObjectId, ref: "Batch" },
      batchName: { type: String },
      utm: { type: Object, default: {} },
    },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);
