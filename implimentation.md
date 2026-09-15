# NEETVIDYA — Complete Implementation Guide for Coding IDE

> This document provides ALL code needed to complete the NEETVIDYA platform.
> Each section contains complete, copy-paste-ready code. Create/replace files exactly as specified.

---

## SECTION 1: MISSING BACKEND SERVICES

### File: `server/src/services/batch.service.js`

```javascript
const Batch = require("../models/Batch");
const Student = require("../models/Student");
const ApiError = require("../utils/apiError");

const createBatch = async (data, userId) => {
  const existing = await Batch.findOne({ code: data.code });
  if (existing) throw new ApiError(400, "Batch code already exists");
  const batch = await Batch.create({ ...data, createdBy: userId });
  return batch;
};

const getBatches = async (filter = {}) => {
  const batches = await Batch.find({ isActive: true, ...filter })
    .populate("course", "name slug")
    .populate("assignedTeachers.teacher", "name")
    .populate("assignedTeachers.subject", "name")
    .sort({ createdAt: -1 });
  return batches;
};

const getBatchById = async (id) => {
  const batch = await Batch.findById(id)
    .populate("course", "name slug")
    .populate("assignedTeachers.teacher", "name email")
    .populate("assignedTeachers.subject", "name")
    .populate("students", "name email");
  if (!batch) throw new ApiError(404, "Batch not found");
  return batch;
};

const updateBatch = async (id, data) => {
  const batch = await Batch.findByIdAndUpdate(id, data, { new: true });
  if (!batch) throw new ApiError(404, "Batch not found");
  return batch;
};

const deleteBatch = async (id) => {
  const batch = await Batch.findByIdAndUpdate(id, { isActive: false });
  if (!batch) throw new ApiError(404, "Batch not found");
  await Student.updateMany({ batches: id }, { $pull: { batches: id } });
  return batch;
};

const addStudentsToBatch = async (batchId, studentUserIds) => {
  const batch = await Batch.findById(batchId);
  if (!batch) throw new ApiError(404, "Batch not found");
  batch.students = [...new Set([...batch.students.map(String), ...studentUserIds.map(String)])];
  await batch.save();
  await Student.updateMany(
    { user: { $in: studentUserIds } },
    { $addToSet: { batches: batchId } }
  );
  return batch;
};

const removeStudentFromBatch = async (batchId, studentUserId) => {
  await Batch.findByIdAndUpdate(batchId, { $pull: { students: studentUserId } });
  await Student.updateMany(
    { user: studentUserId },
    { $pull: { batches: batchId } }
  );
};

module.exports = {
  createBatch,
  getBatches,
  getBatchById,
  updateBatch,
  deleteBatch,
  addStudentsToBatch,
  removeStudentFromBatch,
};
```

### File: `server/src/services/course.service.js`

```javascript
const Course = require("../models/Course");
const Subject = require("../models/Subject");
const generateSlug = require("../utils/slug");
const ApiError = require("../utils/apiError");

const createCourse = async (data, userId) => {
  const slug = generateSlug(data.name);
  const existing = await Course.findOne({ slug });
  if (existing) throw new ApiError(400, "Course with this name already exists");
  const course = await Course.create({ ...data, slug, createdBy: userId });
  return course;
};

const getCourses = async (filter = {}) => {
  const courses = await Course.find({ isActive: true, ...filter })
    .populate("subjects", "name code")
    .sort({ displayOrder: 1 });
  return courses;
};

const getCourseById = async (id) => {
  const course = await Course.findById(id).populate("subjects");
  if (!course) throw new ApiError(404, "Course not found");
  return course;
};

const updateCourse = async (id, data) => {
  if (data.name) data.slug = generateSlug(data.name);
  const course = await Course.findByIdAndUpdate(id, data, { new: true });
  if (!course) throw new ApiError(404, "Course not found");
  return course;
};

const deleteCourse = async (id) => {
  await Course.findByIdAndUpdate(id, { isActive: false });
};

const addSubjectToCourse = async (courseId, subjectData) => {
  const subject = await Subject.create({ ...subjectData, course: courseId });
  await Course.findByIdAndUpdate(courseId, { $push: { subjects: subject._id } });
  return subject;
};

module.exports = {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  addSubjectToCourse,
};
```

### File: `server/src/services/question.service.js`

```javascript
const Question = require("../models/Question");
const ApiError = require("../utils/apiError");

const createQuestion = async (data, userId) => {
  if (!data.questionText || !data.options || data.options.length < 4) {
    throw new ApiError(400, "Question text and 4 options are required");
  }
  if (data.correctAnswer === undefined || data.correctAnswer < 0 || data.correctAnswer > 3) {
    throw new ApiError(400, "Valid correct answer index (0-3) is required");
  }
  const question = await Question.create({ ...data, createdBy: userId });
  return question;
};

const getQuestions = async (filter = {}, page = 1, limit = 20) => {
  const skip = (page - 1) * limit;
  const questions = await Question.find({ isActive: true, ...filter })
    .populate("subject", "name code")
    .populate("chapter", "name")
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });
  const total = await Question.countDocuments({ isActive: true, ...filter });
  return { questions, total, page, limit, pages: Math.ceil(total / limit) };
};

const updateQuestion = async (id, data) => {
  const question = await Question.findByIdAndUpdate(id, data, { new: true });
  if (!question) throw new ApiError(404, "Question not found");
  return question;
};

const deleteQuestion = async (id) => {
  await Question.findByIdAndUpdate(id, { isActive: false });
};

const addExplanation = async (id, explanation) => {
  const question = await Question.findByIdAndUpdate(
    id,
    { explanation },
    { new: true }
  );
  if (!question) throw new ApiError(404, "Question not found");
  return question;
};

const bulkImport = async (questions, userId) => {
  const valid = questions.filter(
    (q) => q.questionText && q.options?.length >= 4 && q.correctAnswer !== undefined
  );
  if (valid.length === 0) throw new ApiError(400, "No valid questions in payload");
  const created = await Question.insertMany(
    valid.map((q) => ({ ...q, createdBy: userId }))
  );
  return { imported: created.length, total: questions.length, skipped: questions.length - valid.length };
};

const getRandomQuestions = async (filter = {}, count = 10) => {
  const questions = await Question.aggregate([
    { $match: { isActive: true, ...filter } },
    { $sample: { size: count } },
  ]);
  return questions;
};

module.exports = {
  createQuestion,
  getQuestions,
  updateQuestion,
  deleteQuestion,
  addExplanation,
  bulkImport,
  getRandomQuestions,
};
```

### File: `server/src/services/exam.service.js`

```javascript
const Exam = require("../models/Exam");
const Attempt = require("../models/Attempt");
const Question = require("../models/Question");
const { shuffleArray, generateOptionOrder } = require("../utils/shuffle");
const ApiError = require("../utils/apiError");

const createExam = async (data, userId) => {
  const exam = await Exam.create({ ...data, createdBy: userId, status: "DRAFT" });
  return exam;
};

const getExams = async (filter = {}) => {
  const exams = await Exam.find(filter)
    .populate("course", "name")
    .populate("subjects", "name")
    .populate("testSeries", "title")
    .sort({ createdAt: -1 });
  return exams;
};

const getExamById = async (id) => {
  const exam = await Exam.findById(id)
    .populate("course", "name")
    .populate("subjects", "name");
  if (!exam) throw new ApiError(404, "Exam not found");
  return exam;
};

const updateExam = async (id, data) => {
  const exam = await Exam.findByIdAndUpdate(id, data, { new: true });
  if (!exam) throw new ApiError(404, "Exam not found");
  return exam;
};

const publishExam = async (id) => {
  const exam = await Exam.findById(id);
  if (!exam) throw new ApiError(404, "Exam not found");
  exam.status = "LIVE";
  exam.publishedAt = new Date();
  await exam.save();
  return exam;
};

const closeExam = async (id) => {
  await Exam.findByIdAndUpdate(id, { status: "CLOSED" });
};

const startAttempt = async (examId, studentId) => {
  const exam = await Exam.findById(examId);
  if (!exam) throw new ApiError(404, "Exam not found");
  if (exam.status !== "LIVE") throw new ApiError(400, "Exam is not live");

  const now = new Date();
  if (now < exam.startTime) throw new ApiError(400, "Exam has not started yet");
  if (now > exam.endTime) throw new ApiError(400, "Exam has ended");

  const existingInProgress = await Attempt.findOne({
    exam: examId,
    student: studentId,
    status: "IN_PROGRESS",
  });
  if (existingInProgress) {
    return { resumed: true, attempt: existingInProgress };
  }

  const completedAttempts = await Attempt.countDocuments({
    exam: examId,
    student: studentId,
    status: { $in: ["SUBMITTED", "AUTO_SUBMITTED"] },
  });
  if (completedAttempts >= (exam.maxAttempts || 1)) {
    throw new ApiError(400, "Maximum attempts reached");
  }

  let questions = await Question.find({
    subject: { $in: exam.subjects },
    isActive: true,
  }).limit(exam.totalQuestions || 30);

  if (questions.length === 0) {
    questions = await Question.find({ isActive: true }).limit(exam.totalQuestions || 10);
  }

  let questionOrder = questions.map((q) => q._id);
  if (exam.randomizeQuestions) {
    questionOrder = shuffleArray(questionOrder);
  }

  const optionOrders = questionOrder.map(() =>
    exam.randomizeOptions ? generateOptionOrder(4) : [0, 1, 2, 3]
  );

  const serverEndTime = new Date(now.getTime() + (exam.duration || 60) * 60 * 1000);

  const answers = questionOrder.map((qId) => ({
    question: qId,
    selectedOption: null,
    markedForReview: false,
    timeSpent: 0,
  }));

  const attempt = await Attempt.create({
    exam: examId,
    student: studentId,
    startedAt: now,
    serverEndTime,
    status: "IN_PROGRESS",
    answers,
    questionOrder,
    optionOrders,
  });

  const questionsData = questionOrder.map((qId) => {
    const q = questions.find((qq) => qq._id.toString() === qId.toString());
    if (!q) return null;
    return {
      _id: q._id,
      questionText: q.questionText,
      questionImageUrl: q.questionImageUrl,
      options: q.options,
      marks: q.marks,
      negativeMarks: q.negativeMarks,
      difficulty: q.difficulty,
      subject: q.subject,
      chapter: q.chapter,
    };
  }).filter(Boolean);

  return {
    resumed: false,
    attemptId: attempt._id,
    serverEndTime,
    duration: exam.duration,
    totalQuestions: questionOrder.length,
    totalMarks: exam.totalMarks,
    marksPerCorrect: exam.marksPerCorrect,
    negativePerWrong: exam.negativePerWrong,
    instructions: exam.instructions,
    questions: questionsData,
    optionOrders,
    answers,
  };
};

module.exports = {
  createExam,
  getExams,
  getExamById,
  updateExam,
  publishExam,
  closeExam,
  startAttempt,
};
```

### File: `server/src/services/notification.service.js`

```javascript
const Notification = require("../models/Notification");

const createNotification = async (data) => {
  return await Notification.create(data);
};

const getNotificationsForUser = async (userId, userRole) => {
  return await Notification.find({
    $or: [
      { targetRole: "all" },
      { targetRole: userRole },
      { targetStudents: userId },
    ],
    isActive: true,
  })
    .sort({ createdAt: -1 })
    .limit(30);
};

const getUnreadCount = async (userId, userRole) => {
  return await Notification.countDocuments({
    $or: [
      { targetRole: "all" },
      { targetRole: userRole },
      { targetStudents: userId },
    ],
    isActive: true,
    readBy: { $ne: userId },
  });
};

const markAsRead = async (notificationId, userId) => {
  await Notification.findByIdAndUpdate(notificationId, {
    $addToSet: { readBy: userId },
  });
};

const markAllAsRead = async (userId, userRole) => {
  await Notification.updateMany(
    {
      $or: [{ targetRole: "all" }, { targetRole: userRole }],
      isActive: true,
    },
    { $addToSet: { readBy: userId } }
  );
};

module.exports = {
  createNotification,
  getNotificationsForUser,
  getUnreadCount,
  markAsRead,
  markAllAsRead,
};
```

### File: `server/src/services/dashboard.service.js`

```javascript
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
```

### File: `server/src/services/website.service.js`

```javascript
const WebsiteContent = require("../models/WebsiteContent");
const Course = require("../models/Course");
const Teacher = require("../models/Teacher");
const Testimonial = require("../models/Testimonial");
const Achievement = require("../models/Achievement");

const getHomepageData = async () => {
  const [hero, about, methodology, announcementBar, courses, teachers, testimonials, achievements] =
    await Promise.all([
      WebsiteContent.findOne({ section: "HERO" }),
      WebsiteContent.findOne({ section: "ABOUT" }),
      WebsiteContent.findOne({ section: "METHODOLOGY" }),
      WebsiteContent.findOne({ section: "ANNOUNCEMENT_BAR" }),
      Course.find({ isActive: true }).sort({ displayOrder: 1 }).limit(6),
      Teacher.find({ isActive: true }).populate("user", "name avatar").populate("subject", "name"),
      Testimonial.find({ isActive: true }).sort({ displayOrder: 1 }),
      Achievement.find({ isActive: true, featured: true }).sort({ displayOrder: 1 }),
    ]);

  return {
    hero,
    about,
    methodology,
    announcementBar: announcementBar?.announcementBar || null,
    courses,
    teachers,
    testimonials,
    achievements,
  };
};

const getSection = async (sectionName) => {
  return await WebsiteContent.findOne({ section: sectionName });
};

const updateSection = async (sectionName, data) => {
  return await WebsiteContent.findOneAndUpdate(
    { section: sectionName },
    { $set: data },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  );
};

module.exports = { getHomepageData, getSection, updateSection };
```

---

## SECTION 2: COMPLETE BACKEND CONTROLLERS (Replace Existing)

### File: `server/src/controllers/dashboard.controller.js`

```javascript
const { getAdminDashboard, getStudentDashboard, getTeacherDashboard } = require("../services/dashboard.service");
const apiResponse = require("../utils/apiResponse");

const adminDashboard = async (req, res, next) => {
  try {
    const data = await getAdminDashboard();
    return apiResponse(res, 200, "Admin dashboard", data);
  } catch (error) {
    next(error);
  }
};

const studentDashboard = async (req, res, next) => {
  try {
    const data = await getStudentDashboard(req.user._id);
    return apiResponse(res, 200, "Student dashboard", data);
  } catch (error) {
    next(error);
  }
};

const teacherDashboard = async (req, res, next) => {
  try {
    const data = await getTeacherDashboard(req.user._id);
    return apiResponse(res, 200, "Teacher dashboard", data);
  } catch (error) {
    next(error);
  }
};

module.exports = { adminDashboard, studentDashboard, teacherDashboard };
```

### File: `server/src/controllers/contactSettings.controller.js`

```javascript
const mongoose = require("mongoose");
const apiResponse = require("../utils/apiResponse");

const ContactSettings = mongoose.model("ContactSettings") || mongoose.model("ContactSettings", new mongoose.Schema({
  instituteEmail: { type: String, default: "admissions@neetvidya.com" },
  institutePhone: { type: String, default: "+91 98765 43210" },
  address: { type: String, default: "" },
  city: { type: String, default: "" },
  state: { type: String, default: "" },
  telegramChannelLink: { type: String, default: "https://t.me/neetvidya_official" },
  whatsappGroupLink: { type: String, default: "" },
  whatsappNumber: { type: String, default: "919876543210" },
  whatsappDefaultMessage: { type: String, default: "Hello NEETVIDYA! I have a query." },
  facebookLink: { type: String, default: "" },
  instagramLink: { type: String, default: "" },
  youtubeLink: { type: String, default: "" },
  officeHours: { type: String, default: "Mon - Sat: 9:00 AM - 6:00 PM" },
  mapEmbedUrl: { type: String, default: "" },
}, { timestamps: true }));

const getSettings = async (req, res, next) => {
  try {
    let settings = await ContactSettings.findOne();
    if (!settings) settings = await ContactSettings.create({});
    return apiResponse(res, 200, "Contact settings", { settings });
  } catch (error) {
    next(error);
  }
};

const updateSettings = async (req, res, next) => {
  try {
    const settings = await ContactSettings.findOneAndUpdate(
      {},
      { $set: req.body },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    return apiResponse(res, 200, "Contact settings updated", { settings });
  } catch (error) {
    next(error);
  }
};

module.exports = { getSettings, updateSettings, ContactSettings };
```

---

## SECTION 3: COMPLETE ROUTES INDEX (Replace)

### File: `server/src/routes/index.js`

```javascript
const express = require("express");
const router = express.Router();

router.use("/auth", require("./auth.routes"));
router.use("/students", require("./student.routes"));
router.use("/teachers", require("./teacher.routes"));
router.use("/batches", require("./batch.routes"));
router.use("/enrollments", require("./enrollment.routes"));
router.use("/courses", require("./course.routes"));
router.use("/academics", require("./academic.routes"));
router.use("/materials", require("./material.routes"));
router.use("/lectures", require("./lecture.routes"));
router.use("/resources", require("./resource.routes"));
router.use("/questions", require("./question.routes"));
router.use("/test-series", require("./testSeries.routes"));
router.use("/exams", require("./exam.routes"));
router.use("/attempts", require("./attempt.routes"));
router.use("/results", require("./result.routes"));
router.use("/notifications", require("./notification.routes"));
router.use("/achievements", require("./achievement.routes"));
router.use("/testimonials", require("./testimonial.routes"));
router.use("/enquiries", require("./enquiry.routes"));
router.use("/website", require("./website.routes"));
router.use("/upload", require("./upload.routes"));
router.use("/telegram", require("./telegram.routes"));
router.use("/admin", require("./admin.routes"));
router.use("/dashboard", require("./dashboard.routes"));
router.use("/contact-settings", require("./contactSettings.routes"));

module.exports = router;
```

---

## SECTION 4: MISSING FRONTEND COMPONENTS

### File: `client/src/components/exam/ExamInstructions.jsx`

```jsx
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Clock, AlertTriangle, ArrowRight, FileText, Shield } from "lucide-react";
import api from "../../config/api";
import toast from "react-hot-toast";

export default function ExamInstructions() {
  const { examId } = useParams();
  const navigate = useNavigate();
  const [agreed, setAgreed] = useState(false);
  const [starting, setStarting] = useState(false);
  const [exam, setExam] = useState(null);

  useState(() => {
    api.get(`/exams/${examId}`)
      .then(({ data }) => setExam(data.data?.exam))
      .catch(() => navigate("/student/tests"));
  }, []);

  const handleStart = async () => {
    if (!agreed) return;
    setStarting(true);
    try {
      navigate(`/exam/${examId}/attempt`);
    } catch (err) {
      toast.error("Could not start exam");
      setStarting(false);
    }
  };

  if (!exam) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg max-w-2xl w-full overflow-hidden">
        <div className="bg-brand-black text-white p-6">
          <h1 className="font-heading font-extrabold text-xl">{exam.title}</h1>
          <p className="text-gray-300 text-sm mt-1">Read all instructions carefully before starting</p>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-gray-50 rounded-xl p-3 text-center">
              <Clock className="w-5 h-5 mx-auto mb-1 text-blue-600" />
              <div className="font-bold text-lg">{exam.duration} min</div>
              <div className="text-xs text-gray-500">Duration</div>
            </div>
            <div className="bg-gray-50 rounded-xl p-3 text-center">
              <FileText className="w-5 h-5 mx-auto mb-1 text-purple-600" />
              <div className="font-bold text-lg">{exam.totalQuestions}</div>
              <div className="text-xs text-gray-500">Questions</div>
            </div>
            <div className="bg-gray-50 rounded-xl p-3 text-center">
              <div className="font-bold text-lg text-green-600">+{exam.marksPerCorrect}</div>
              <div className="text-xs text-gray-500">Per Correct</div>
            </div>
            <div className="bg-gray-50 rounded-xl p-3 text-center">
              <div className="font-bold text-lg text-red-600">-{exam.negativePerWrong}</div>
              <div className="text-xs text-gray-500">Per Wrong</div>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-amber-800 space-y-1.5">
                <p className="font-semibold">Important Instructions:</p>
                <ul className="list-disc list-inside space-y-1 text-xs">
                  <li>Timer starts immediately and is server-enforced</li>
                  <li>Test auto-submits when time expires</li>
                  <li>Tab switching is recorded and reported</li>
                  <li>Maximum {exam.maxAttempts || 1} attempt(s) allowed</li>
                  <li>Use Mark for Review to flag questions for later review</li>
                  <li>Unanswered questions carry zero marks</li>
                </ul>
              </div>
            </div>
          </div>

          {exam.instructions && (
            <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-700">
              <p className="font-semibold mb-2">Additional Instructions:</p>
              <p>{exam.instructions}</p>
            </div>
          )}

          <label className="flex items-center gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="w-4 h-4 rounded accent-green-600"
            />
            <span className="text-sm text-gray-700">
              I have read and understood all instructions. I agree to the exam rules.
            </span>
          </label>

          <button
            onClick={handleStart}
            disabled={!agreed || starting}
            className="w-full bg-brand-green hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2"
          >
            {starting ? "Starting..." : "Start Examination"}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
```

### File: `client/src/components/exam/ExamResumeScreen.jsx`

```jsx
import { Clock, RefreshCw } from "lucide-react";

export default function ExamResumeScreen({ timeLeft, onResume }) {
  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg max-w-md w-full p-8 text-center">
        <RefreshCw className="w-12 h-12 text-blue-600 mx-auto mb-4" />
        <h1 className="font-heading font-extrabold text-xl text-gray-900 mb-2">Exam Session Found</h1>
        <p className="text-gray-500 text-sm mb-6">
          You have an exam in progress. Your answers have been saved automatically.
        </p>
        <div className="bg-gray-50 rounded-xl p-4 mb-6">
          <Clock className="w-6 h-6 mx-auto mb-1 text-gray-400" />
          <div className="font-mono font-bold text-3xl text-gray-800">{formatTime(timeLeft)}</div>
          <div className="text-xs text-gray-400 mt-1">Time Remaining</div>
        </div>
        <button
          onClick={onResume}
          className="w-full bg-brand-green hover:bg-emerald-700 text-white font-bold py-3 rounded-xl transition"
        >
          Resume Exam
        </button>
      </div>
    </div>
  );
}
```

### File: `client/src/components/shared/FileUpload.jsx`

```jsx
import { useState, useRef } from "react";
import { Upload, CheckCircle, X } from "lucide-react";
import toast from "react-hot-toast";

export default function FileUpload({ onUpload, accept = ".pdf", maxSizeMB = 20, label = "Upload File" }) {
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploaded, setUploaded] = useState(false);
  const inputRef = useRef();

  const handleFile = async (file) => {
    if (!file) return;
    if (file.size > maxSizeMB * 1024 * 1024) {
      toast.error(`File too large. Max ${maxSizeMB}MB allowed.`);
      return;
    }
    setUploading(true);
    setProgress(10);

    try {
      const formData = new FormData();
      formData.append("file", file);
      const result = await onUpload(formData);
      setProgress(100);
      setUploaded(true);
      toast.success("File uploaded successfully");
      return result;
    } catch (err) {
      toast.error(err.response?.data?.message || "Upload failed");
      setProgress(0);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => { e.preventDefault(); setDragging(false); handleFile(e.dataTransfer.files[0]); }}
      onClick={() => inputRef.current?.click()}
      className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
        dragging ? "border-green-500 bg-green-50" : "border-gray-200 hover:border-green-300 hover:bg-gray-50"
      }`}
    >
      <input ref={inputRef} type="file" accept={accept} className="hidden" onChange={(e) => handleFile(e.target.files[0])} />
      {uploaded ? (
        <div className="flex items-center justify-center gap-2 text-green-600">
          <CheckCircle className="w-6 h-6" />
          <span className="font-semibold text-sm">Uploaded Successfully</span>
        </div>
      ) : uploading ? (
        <div className="space-y-3">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-green-500 h-2 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
          </div>
          <span className="text-sm text-gray-500">{progress}%</span>
        </div>
      ) : (
        <>
          <Upload className="w-8 h-8 text-gray-300 mx-auto mb-3" />
          <p className="text-sm font-semibold text-gray-600">{label}</p>
          <p className="text-xs text-gray-400 mt-1">Drag and drop or click to browse (Max {maxSizeMB}MB)</p>
        </>
      )}
    </div>
  );
}
```

### File: `client/src/components/shared/PDFViewer.jsx`

```jsx
import { useState } from "react";
import { Download, X, Maximize2 } from "lucide-react";

export default function PDFViewer({ url, title, onClose }) {
  if (!url) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex flex-col">
      <div className="bg-white px-4 py-3 flex items-center justify-between">
        <h3 className="font-bold text-gray-800 text-sm truncate max-w-[60%]">{title || "Document Viewer"}</h3>
        <div className="flex items-center gap-2">
          <a href={url} target="_blank" rel="noreferrer" className="p-2 rounded-lg hover:bg-gray-100 text-gray-500">
            <Maximize2 className="w-4 h-4" />
          </a>
          <a href={url} download className="p-2 rounded-lg hover:bg-gray-100 text-gray-500">
            <Download className="w-4 h-4" />
          </a>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100 text-gray-500">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
      <iframe src={url} className="flex-1 w-full bg-white" title={title} />
    </div>
  );
}
```

### File: `client/src/components/shared/SkeletonLoader.jsx`

```jsx
export default function SkeletonLoader({ rows = 3, type = "card" }) {
  if (type === "card") {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-100 p-6 animate-pulse">
            <div className="h-40 bg-gray-100 rounded-xl mb-4" />
            <div className="h-4 bg-gray-100 rounded w-3/4 mb-3" />
            <div className="h-3 bg-gray-100 rounded w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  if (type === "table") {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 p-6 animate-pulse">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 py-4 border-b border-gray-50 last:border-0">
            <div className="w-10 h-10 bg-gray-100 rounded-full flex-shrink-0" />
            <div className="flex-1">
              <div className="h-3 bg-gray-100 rounded w-1/3 mb-2" />
              <div className="h-2 bg-gray-100 rounded w-1/4" />
            </div>
            <div className="h-6 bg-gray-100 rounded-full w-16" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-pulse">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="h-4 bg-gray-100 rounded" style={{ width: `${80 - i * 10}%` }} />
      ))}
    </div>
  );
}
```

---

## SECTION 5: COMPLETE FRONTEND PAGES (Replace Existing)

### File: `client/src/pages/student/StudentDashboard.jsx`

```jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BookOpen, ClipboardList, FileText, TrendingUp, ArrowRight, Clock } from "lucide-react";
import api from "../../config/api";
import StudentBadge from "../../components/shared/StudentBadge";
import SkeletonLoader from "../../components/shared/SkeletonLoader";

export default function StudentDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/dashboard/student")
      .then(({ data }) => setData(data.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-6"><SkeletonLoader rows={4} type="card" /></div>;

  const { student, upcomingTests, recentMaterials, recentResults } = data || {};

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-heading font-extrabold text-2xl text-brand-dark">
              Hello, {student?.user?.name || "Student"}!
            </h1>
            <p className="text-sm text-gray-500 mt-1">Continue your NEET preparation journey</p>
          </div>
          {student?.studentType && (
            <StudentBadge batchType={student.studentType === "REGULAR_OFFLINE" ? "OFFLINE" : student.studentType === "REGULAR_ONLINE" ? "ONLINE" : "HYBRID"} />
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card p-5">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide">Enrolled</p>
              <p className="font-bold text-brand-dark">{student?.batches?.[0]?.name || "No batch"}</p>
            </div>
          </div>
        </div>
        <div className="card p-5">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-orange-50 flex items-center justify-center">
              <ClipboardList className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide">Live Tests</p>
              <p className="font-bold text-brand-dark">{upcomingTests?.length || 0} Available</p>
            </div>
          </div>
        </div>
        <div className="card p-5">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center">
              <FileText className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide">Materials</p>
              <p className="font-bold text-brand-dark">{recentMaterials?.length || 0} New</p>
            </div>
          </div>
        </div>
        <div className="card p-5">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-purple-50 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide">Tests Taken</p>
              <p className="font-bold text-brand-dark">{recentResults?.length || 0}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading font-bold text-lg">Upcoming Tests</h3>
            <Link to="/student/tests" className="text-xs text-brand-green font-semibold hover:underline">View All</Link>
          </div>
          {upcomingTests?.length > 0 ? (
            <div className="space-y-3">
              {upcomingTests.map((test) => (
                <div key={test._id} className="p-4 rounded-xl bg-gray-50 flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-sm text-gray-800">{test.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {test.duration} min | {test.totalQuestions} Qs
                    </p>
                  </div>
                  <Link to={`/exam/${test._id}`} className="text-xs bg-brand-green text-white px-3 py-1.5 rounded-lg font-semibold hover:bg-emerald-700 transition">
                    Start
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-400 text-center py-8">No upcoming tests</p>
          )}
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading font-bold text-lg">Recent Materials</h3>
            <Link to="/student/learn" className="text-xs text-brand-green font-semibold hover:underline">View All</Link>
          </div>
          {recentMaterials?.length > 0 ? (
            <div className="space-y-3">
              {recentMaterials.map((mat) => (
                <div key={mat._id} className="p-3 rounded-xl bg-gray-50 flex items-center gap-3">
                  <FileText className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="font-medium text-sm text-gray-800 truncate">{mat.title}</p>
                    <p className="text-xs text-gray-400">{mat.subject?.name}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-400 text-center py-8">No materials yet</p>
          )}
        </div>
      </div>
    </div>
  );
}
```

---

## SECTION 6: ADMIN CONTACT SETTINGS PAGE (New)

### File: `client/src/pages/admin/AdminContactSettings.jsx`

```jsx
import { useState, useEffect } from "react";
import api from "../../config/api";
import { Save, Globe, Phone, Mail, Send, MessageCircle, MapPin } from "lucide-react";
import toast from "react-hot-toast";

export default function AdminContactSettings() {
  const [form, setForm] = useState({});
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/contact-settings")
      .then(({ data }) => { if (data.data?.settings) setForm(data.data.settings); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.put("/contact-settings", form);
      toast.success("Contact settings saved");
    } catch (err) {
      toast.error("Failed to save");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-6 animate-pulse"><div className="h-64 bg-gray-100 rounded-2xl" /></div>;

  const inputCls = "w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green transition";
  const labelCls = "block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2";

  return (
    <div className="space-y-6">
      <h1 className="font-heading font-extrabold text-2xl">Contact & Link Settings</h1>
      <form onSubmit={handleSave} className="space-y-6">
        <div className="card space-y-4">
          <h2 className="font-bold flex items-center gap-2"><Mail className="w-4 h-4 text-green-600" /> Basic Contact</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div><label className={labelCls}>Email</label><input name="instituteEmail" value={form.instituteEmail || ""} onChange={handleChange} className={inputCls} /></div>
            <div><label className={labelCls}>Phone</label><input name="institutePhone" value={form.institutePhone || ""} onChange={handleChange} className={inputCls} /></div>
          </div>
          <div><label className={labelCls}>Address</label><input name="address" value={form.address || ""} onChange={handleChange} className={inputCls} /></div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div><label className={labelCls}>City</label><input name="city" value={form.city || ""} onChange={handleChange} className={inputCls} /></div>
            <div><label className={labelCls}>Office Hours</label><input name="officeHours" value={form.officeHours || ""} onChange={handleChange} className={inputCls} /></div>
          </div>
        </div>

        <div className="card space-y-4">
          <h2 className="font-bold flex items-center gap-2"><Send className="w-4 h-4 text-sky-600" /> Channel Links</h2>
          <div><label className={labelCls}>Telegram Channel Link</label><input name="telegramChannelLink" value={form.telegramChannelLink || ""} onChange={handleChange} className={inputCls} placeholder="https://t.me/neetvidya_official" /></div>
          <div><label className={labelCls}>WhatsApp Group Link</label><input name="whatsappGroupLink" value={form.whatsappGroupLink || ""} onChange={handleChange} className={inputCls} placeholder="https://chat.whatsapp.com/..." /></div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div><label className={labelCls}>WhatsApp Number</label><input name="whatsappNumber" value={form.whatsappNumber || ""} onChange={handleChange} className={inputCls} placeholder="919876543210" /></div>
            <div><label className={labelCls}>WhatsApp Default Message</label><input name="whatsappDefaultMessage" value={form.whatsappDefaultMessage || ""} onChange={handleChange} className={inputCls} /></div>
          </div>
        </div>

        <div className="card space-y-4">
          <h2 className="font-bold flex items-center gap-2"><Globe className="w-4 h-4 text-purple-600" /> Social Links</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div><label className={labelCls}>Facebook</label><input name="facebookLink" value={form.facebookLink || ""} onChange={handleChange} className={inputCls} /></div>
            <div><label className={labelCls}>Instagram</label><input name="instagramLink" value={form.instagramLink || ""} onChange={handleChange} className={inputCls} /></div>
            <div><label className={labelCls}>YouTube</label><input name="youtubeLink" value={form.youtubeLink || ""} onChange={handleChange} className={inputCls} /></div>
            <div><label className={labelCls}>Map Embed URL</label><input name="mapEmbedUrl" value={form.mapEmbedUrl || ""} onChange={handleChange} className={inputCls} /></div>
          </div>
        </div>

        <button type="submit" disabled={saving} className="btn-primary">
          <Save className="w-4 h-4" /> {saving ? "Saving..." : "Save All Settings"}
        </button>
      </form>
    </div>
  );
}
```

---

## SECTION 7: UPDATED APP ROUTES

### File: `client/src/App.jsx`

```jsx
import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/shared/ProtectedRoute";
import PublicLayout from "./layouts/PublicLayout";
import StudentLayout from "./layouts/StudentLayout";
import TeacherLayout from "./layouts/TeacherLayout";
import AdminLayout from "./layouts/AdminLayout";
import ExamLayout from "./layouts/ExamLayout";
import SkeletonLoader from "./components/shared/SkeletonLoader";

import HomePage from "./pages/public/HomePage";
import AboutPage from "./pages/public/AboutPage";
import CoursesPage from "./pages/public/CoursesPage";
import FacultyPage from "./pages/public/FacultyPage";
import TestSeriesPage from "./pages/public/TestSeriesPage";
import ResultsPage from "./pages/public/ResultsPage";
import ContactPage from "./pages/public/ContactPage";
import LoginPage from "./pages/public/LoginPage";
import RegisterPage from "./pages/public/RegisterPage";
import VerifyEmailPage from "./pages/public/VerifyEmailPage";
import ForgotPasswordPage from "./pages/public/ForgotPasswordPage";
import ResetPasswordPage from "./pages/public/ResetPasswordPage";

import StudentDashboard from "./pages/student/StudentDashboard";
import LearnPage from "./pages/student/LearnPage";
import TestsPage from "./pages/student/TestsPage";
import StudentResults from "./pages/student/ResultPage";
import PerformancePage from "./pages/student/PerformancePage";
import StudentProfile from "./pages/student/ProfilePage";
import ExamPage from "./pages/student/ExamPage";
import ExamInstructions from "./components/exam/ExamInstructions";

import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import TeacherMaterials from "./pages/teacher/TeacherMaterials";
import TeacherClasses from "./pages/teacher/TeacherClasses";
import TeacherQuestions from "./pages/teacher/TeacherQuestions";
import TeacherExams from "./pages/teacher/TeacherExams";
import TeacherPerformance from "./pages/teacher/TeacherPerformance";

import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminStudents from "./pages/admin/AdminStudents";
import AdminTeachers from "./pages/admin/AdminTeachers";
import AdminBatches from "./pages/admin/AdminBatches";
import AdminCourses from "./pages/admin/AdminCourses";
import AdminQuestions from "./pages/admin/AdminQuestions";
import AdminExams from "./pages/admin/AdminExams";
import AdminEnquiries from "./pages/admin/AdminEnquiries";
import AdminAchievements from "./pages/admin/AdminAchievements";
import AdminContactSettings from "./pages/admin/AdminContactSettings";
import AdminSettings from "./pages/admin/AdminSettings";

import NotFound from "./pages/errors/NotFound";
import Unauthorized from "./pages/errors/Unauthorized";

export default function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/faculty" element={<FacultyPage />} />
        <Route path="/test-series" element={<TestSeriesPage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Route>

      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/verify-email" element={<VerifyEmailPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />

      <Route path="/student" element={<ProtectedRoute role="student"><StudentLayout /></ProtectedRoute>}>
        <Route index element={<StudentDashboard />} />
        <Route path="learn" element={<LearnPage />} />
        <Route path="tests" element={<TestsPage />} />
        <Route path="results" element={<StudentResults />} />
        <Route path="performance" element={<PerformancePage />} />
        <Route path="profile" element={<StudentProfile />} />
      </Route>

      <Route path="/exam/:examId" element={<ProtectedRoute role="student"><ExamLayout /></ProtectedRoute>}>
        <Route index element={<ExamInstructions />} />
        <Route path="attempt" element={<ExamPage />} />
      </Route>

      <Route path="/teacher" element={<ProtectedRoute role="teacher"><TeacherLayout /></ProtectedRoute>}>
        <Route index element={<TeacherDashboard />} />
        <Route path="materials" element={<TeacherMaterials />} />
        <Route path="classes" element={<TeacherClasses />} />
        <Route path="questions" element={<TeacherQuestions />} />
        <Route path="exams" element={<TeacherExams />} />
        <Route path="performance" element={<TeacherPerformance />} />
      </Route>

      <Route path="/admin" element={<ProtectedRoute role="admin"><AdminLayout /></ProtectedRoute>}>
        <Route index element={<AdminDashboard />} />
        <Route path="students" element={<AdminStudents />} />
        <Route path="teachers" element={<AdminTeachers />} />
        <Route path="batches" element={<AdminBatches />} />
        <Route path="courses" element={<AdminCourses />} />
        <Route path="questions" element={<AdminQuestions />} />
        <Route path="exams" element={<AdminExams />} />
        <Route path="enquiries" element={<AdminEnquiries />} />
        <Route path="achievements" element={<AdminAchievements />} />
        <Route path="contact-settings" element={<AdminContactSettings />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>

      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
```

---

## SECTION 8: UPDATED TAILWIND CONFIG

### File: `client/tailwind.config.js`

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          black: "#0B0F0D",
          lime: "#A8C900",
          green: "#18A66A",
          white: "#FFFFFF",
          soft: "#F6F8F7",
          dark: "#111714",
        },
      },
      fontFamily: {
        heading: ["Manrope", "sans-serif"],
        body: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      borderRadius: {
        card: "12px",
        btn: "8px",
      },
      boxShadow: {
        card: "0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.03)",
        "card-hover": "0 4px 8px rgba(0,0,0,0.06), 0 12px 32px rgba(0,0,0,0.08)",
      },
    },
  },
  plugins: [],
};
```

---

## SECTION 9: UPDATED INDEX CSS

### File: `client/src/index.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply font-body text-brand-dark bg-white antialiased;
  }
  h1, h2, h3, h4, h5, h6 {
    @apply font-heading tracking-tight;
  }
  * {
    @apply transition-colors duration-150;
  }
}

@layer components {
  .btn-primary {
    @apply bg-brand-green text-white px-6 py-2.5 rounded-btn font-medium
           hover:bg-emerald-700 active:scale-[0.97] transition-all duration-200
           inline-flex items-center justify-center gap-2 shadow-sm;
  }
  .btn-secondary {
    @apply border-2 border-brand-green text-brand-green px-6 py-2.5 rounded-btn
           font-medium hover:bg-brand-green hover:text-white active:scale-[0.97]
           transition-all duration-200 inline-flex items-center justify-center gap-2;
  }
  .btn-dark {
    @apply bg-brand-black text-white px-6 py-2.5 rounded-btn font-medium
           hover:bg-gray-800 active:scale-[0.97] transition-all duration-200
           inline-flex items-center justify-center gap-2;
  }
  .btn-lime {
    @apply bg-brand-lime text-brand-black px-6 py-2.5 rounded-btn font-semibold
           hover:brightness-105 active:scale-[0.97] transition-all duration-200
           inline-flex items-center justify-center gap-2;
  }
  .btn-danger {
    @apply bg-red-600 text-white px-6 py-2.5 rounded-btn font-medium
           hover:bg-red-700 active:scale-[0.97] transition-all duration-200
           inline-flex items-center justify-center gap-2;
  }
  .card {
    @apply bg-white rounded-card border border-gray-100 p-6 shadow-card;
  }
  .card-hover {
    @apply hover:-translate-y-1 hover:shadow-card-hover transition-all duration-300;
  }
  .input-field {
    @apply w-full px-4 py-2.5 border border-gray-200 rounded-btn text-sm
           focus:outline-none focus:ring-2 focus:ring-brand-green/20
           focus:border-brand-green transition-all bg-white;
  }
  .section-padding {
    @apply py-16 md:py-24;
  }
  .badge {
    @apply inline-flex items-center gap-1.5 px-3 py-1 rounded-full
           text-xs font-semibold tracking-wide;
  }
}
```

---

## SECTION 10: IMPLEMENTATION CHECKLIST

Execute in this exact order:

| Step | Action | Files |
|---|---|---|
| 1 | Create backend services | All files in Section 1 |
| 2 | Replace backend controllers | Section 2 files |
| 3 | Replace routes/index.js | Section 3 |
| 4 | Create exam components | Section 4 exam files |
| 5 | Create shared components | Section 4 shared files |
| 6 | Replace StudentDashboard | Section 5 |
| 7 | Create AdminContactSettings | Section 6 |
| 8 | Replace App.jsx | Section 7 |
| 9 | Replace tailwind.config.js | Section 8 |
| 10 | Replace index.css | Section 9 |
| 11 | Run `npm run dev` and test | All routes |
| 12 | Fix any remaining errors | Per error message |

---

This document provides complete, copy-paste-ready code for every missing or broken piece. The coding IDE should create/replace each file exactly as specified, then run the app to verify.