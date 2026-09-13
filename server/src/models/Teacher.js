const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    subject: { type: mongoose.Schema.Types.ObjectId, ref: "Subject" },
    subjectName: { type: String, trim: true },
    qualification: { type: String },
    experience: { type: String },
    specialisation: { type: String },
    bio: { type: String },
    photoUrl: { type: String },
    photoPublicId: { type: String },
    telegramUsername: { type: String },
    permissions: {
      uploadMaterials: { type: Boolean, default: true },
      uploadLectures: { type: Boolean, default: true },
      createQuestions: { type: Boolean, default: true },
      editQuestions: { type: Boolean, default: false },
      createExams: { type: Boolean, default: false },
      createTestSeries: { type: Boolean, default: false },
      viewPerformance: { type: Boolean, default: true },
      manageStudents: { type: Boolean, default: false },
      accessWebsiteSettings: { type: Boolean, default: false },
    },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Teacher", teacherSchema);
