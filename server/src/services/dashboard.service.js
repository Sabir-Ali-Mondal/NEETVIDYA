const Student = require("../models/Student");
const Teacher = require("../models/Teacher");
const Exam = require("../models/Exam");
const Attempt = require("../models/Attempt");
const Question = require("../models/Question");
const Course = require("../models/Course");
const Batch = require("../models/Batch");
const Material = require("../models/Material");
const Lecture = require("../models/Lecture");
const Enquiry = require("../models/Enquiry");
const Result = require("../models/Result");

const getAdminDashboard = async () => {
  const [
    studentCount,
    teacherCount,
    examCount,
    attemptCount,
    questionCount,
    courseCount,
    batchCount,
    materialCount,
    lectureCount,
    enquiryCount,
  ] = await Promise.all([
    Student.countDocuments({ isActive: true }),
    Teacher.countDocuments({ isActive: true }),
    Exam.countDocuments(),
    Attempt.countDocuments(),
    Question.countDocuments({ isActive: true }),
    Course.countDocuments({ isActive: true }),
    Batch.countDocuments({ isActive: true }),
    Material.countDocuments({ isActive: true }),
    Lecture.countDocuments({ isActive: true }),
    Enquiry.countDocuments({ status: "PENDING" }),
  ]);

  const recentAttempts = await Attempt.find()
    .populate("student", "name email")
    .populate("exam", "title testType")
    .sort({ createdAt: -1 })
    .limit(5);

  const recentStudents = await Student.find()
    .populate("user", "name email")
    .sort({ createdAt: -1 })
    .limit(5);

  return {
    studentCount,
    teacherCount,
    examCount,
    attemptCount,
    questionCount,
    courseCount,
    batchCount,
    materialCount,
    lectureCount,
    enquiryCount,
    recentAttempts,
    recentStudents,
  };
};

const getStudentDashboard = async (studentUserId) => {
  const student = await Student.findOne({ user: studentUserId }).populate("batches", "name code batchType");

  const upcomingTests = await Exam.find({
    status: "LIVE",
    endTime: { $gt: new Date() },
  }).limit(3).select("title testType duration totalQuestions totalMarks startTime endTime");

  const recentMaterials = await Material.find({ isActive: true })
    .populate("subject", "name")
    .sort({ createdAt: -1 })
    .limit(4);

  const recentResults = await Result.find({ student: studentUserId })
    .populate("exam", "title testType")
    .sort({ createdAt: -1 })
    .limit(3);

  return { student, upcomingTests, recentMaterials, recentResults };
};

const getTeacherDashboard = async (teacherUserId) => {
  const teacher = await Teacher.findOne({ user: teacherUserId }).populate("subject", "name");

  const [questionCount, materialCount, lectureCount, examCount] = await Promise.all([
    Question.countDocuments({ createdBy: teacherUserId, isActive: true }),
    Material.countDocuments({ uploadedBy: teacherUserId, isActive: true }),
    Lecture.countDocuments({ teacher: teacherUserId, isActive: true }),
    Exam.countDocuments({ createdBy: teacherUserId }),
  ]);

  return { teacher, questionCount, materialCount, lectureCount, examCount };
};

module.exports = { getAdminDashboard, getStudentDashboard, getTeacherDashboard };
