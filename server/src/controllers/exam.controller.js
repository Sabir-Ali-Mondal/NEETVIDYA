const Exam = require("../models/Exam");
const Result = require("../models/Result");
const Attempt = require("../models/Attempt");
const apiResponse = require("../utils/apiResponse");
const ApiError = require("../utils/apiError");
const svc = require("../services/exam.service");

const getExams = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;

    if (req.user.role === "student") {
      // Students only ever see released exams for their batch / permitted exams.
      const data = await svc.getStudentExams(req.user, { page, limit });
      return apiResponse(res, 200, "Exams retrieved", data);
    }

    const filter = req.query.archived === "true"
      ? { isArchived: true }
      : { isArchived: { $ne: true } };
    if (req.query.status) filter.status = req.query.status;
    if (req.query.testType) filter.testType = req.query.testType;
    if (req.query.batch) filter.batch = req.query.batch;
    if (req.query.search) filter.title = { $regex: req.query.search, $options: "i" };

    const data = await svc.getExams(filter, { page, limit });
    return apiResponse(res, 200, "Exams retrieved", data);
  } catch (error) {
    next(error);
  }
};

const getExamById = async (req, res, next) => {
  try {
    const exam = await svc.getExamById(req.params.id);
    if (req.user.role === "student") {
      await svc.assertExamAccess(req.user, exam);
      // Students never receive correct answers of a live/secret exam.
    }
    return apiResponse(res, 200, "Exam details", { exam });
  } catch (error) {
    next(error);
  }
};

const createExam = async (req, res, next) => {
  try {
    const exam = await svc.createExam(req.body, req.user._id);
    return apiResponse(res, 201, "Exam created", { exam });
  } catch (error) {
    next(error);
  }
};

const updateExam = async (req, res, next) => {
  try {
    const exam = await svc.updateExam(req.params.id, req.body);
    return apiResponse(res, 200, "Exam updated", { exam });
  } catch (error) {
    next(error);
  }
};

const publishExam = async (req, res, next) => {
  try {
    const exam = await svc.publishExam(req.params.id);
    return apiResponse(res, 200, "Exam published", { exam });
  } catch (error) {
    next(error);
  }
};

const closeExam = async (req, res, next) => {
  try {
    const exam = await svc.closeExam(req.params.id);
    return apiResponse(res, 200, "Exam closed and archived into Question Bank", { exam });
  } catch (error) {
    next(error);
  }
};

const archiveExam = async (req, res, next) => {
  try {
    const exam = await svc.archiveExam(req.params.id);
    return apiResponse(res, 200, "Exam archived", { exam });
  } catch (error) {
    next(error);
  }
};

const setStudyVisibility = async (req, res, next) => {
  try {
    const exam = await svc.setStudyVisibility(req.params.id, req.body.studyVisible);
    return apiResponse(res, 200, "Study visibility updated", { exam });
  } catch (error) {
    next(error);
  }
};

const reconductExam = async (req, res, next) => {
  try {
    const exam = await svc.reconductExam(req.params.id, req.body || {}, req.user._id);
    return apiResponse(res, 201, "Exam reconducted as new draft", { exam });
  } catch (error) {
    next(error);
  }
};

const downloadExam = async (req, res, next) => {
  try {
    const pack = await svc.buildExamPack(req.params.id);
    return apiResponse(res, 200, "Exam pack", { pack });
  } catch (error) {
    next(error);
  }
};

const getQuestionBank = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const data = await svc.getQuestionBank({ page, limit, search: req.query.search || "" });
    return apiResponse(res, 200, "Question bank (archived exam papers)", data);
  } catch (error) {
    next(error);
  }
};

const publishResults = async (req, res, next) => {
  try {
    const exam = await svc.publishResults(req.params.id, {
      publish: req.body.publish !== false,
    });
    return apiResponse(res, 200, "Results published", { exam });
  } catch (error) {
    next(error);
  }
};

const grantPermission = async (req, res, next) => {
  try {
    const perm = await svc.grantExamPermission(
      { studentId: req.body.studentId, examId: req.params.id, reason: req.body.reason },
      req.user._id
    );
    return apiResponse(res, 201, "Exam permission granted", { permission: perm });
  } catch (error) {
    next(error);
  }
};

const revokePermission = async (req, res, next) => {
  try {
    await svc.revokeExamPermission({ studentId: req.params.studentId, examId: req.params.id });
    return apiResponse(res, 200, "Exam permission revoked");
  } catch (error) {
    next(error);
  }
};

const listPermissions = async (req, res, next) => {
  try {
    const permissions = await svc.listExamPermissions(req.params.id);
    return apiResponse(res, 200, "Exam permissions", { permissions });
  } catch (error) {
    next(error);
  }
};

const importQuestions = async (req, res, next) => {
  try {
    const Question = require("../models/Question");
    const { questions = [] } = req.body;
    const exam = await Exam.findById(req.params.id);
    if (!exam) throw new ApiError(404, "Exam not found");

    const valid = questions.filter(
      (q) => q.questionText && q.options?.length >= 4 && q.correctAnswer !== undefined
    );
    if (valid.length === 0) throw new ApiError(400, "No valid questions found");

    const created = await Question.insertMany(
      valid.map((q) => ({
        questionText: q.questionText,
        questionImageUrl: q.questionImageUrl,
        options: q.options.map((o, i) => ({ text: o.text, imageUrl: o.imageUrl, order: i })),
        correctAnswer: Number(q.correctAnswer),
        explanation: q.explanation,
        difficulty: q.difficulty || "Medium",
        marks: Number(q.marks || exam.marksPerCorrect || 4),
        negativeMarks: Number(q.negativeMarks || exam.negativePerWrong || 1),
        subject: q.subject || undefined,
        chapter: q.chapter || undefined,
        batch: exam.batch,
        createdBy: req.user._id,
      }))
    );
    exam.questions = [...(exam.questions || []), ...created.map((c) => c._id)];
    exam.totalQuestions = exam.questions.length;
    if (!exam.totalMarks || exam.totalMarks === 0) {
      exam.totalMarks = exam.totalQuestions * (exam.marksPerCorrect || 4);
    }
    await exam.save();

    return apiResponse(res, 201, `${created.length} questions imported into exam`, {
      count: created.length,
      exam,
    });
  } catch (error) {
    next(error);
  }
};

// Create a single question that belongs to this exam only
const createExamQuestion = async (req, res, next) => {
  try {
    const exam = await Exam.findById(req.params.id);
    if (!exam) throw new ApiError(404, "Exam not found");

    const { uploadFile } = require("../services/cloudinary.service");
    const FOLDERS = require("../constants/cloudinaryFolders");
    const Question = require("../models/Question");

    const body = { ...req.body };
    let options = JSON.parse(body.options || "[]");

    if (req.files?.questionImage?.[0]) {
      const r = await uploadFile(req.files.questionImage[0].buffer, FOLDERS.QUESTIONS, "image");
      body.questionImageUrl = r.url;
      body.questionImagePublicId = r.publicId;
    }
    if (req.files?.explanationImage?.[0]) {
      const r = await uploadFile(req.files.explanationImage[0].buffer, FOLDERS.QUESTIONS, "image");
      body.explanationImageUrl = r.url;
      body.explanationImagePublicId = r.publicId;
    }
    for (let i = 0; i < 4; i++) {
      const key = `optionImage_${i}`;
      if (req.files?.[key]?.[0]) {
        const r = await uploadFile(req.files[key][0].buffer, FOLDERS.QUESTIONS, "image");
        if (options[i]) options[i].imageUrl = r.url;
      }
    }

    const question = await Question.create({
      questionText: body.questionText,
      questionImageUrl: body.questionImageUrl,
      questionImagePublicId: body.questionImagePublicId,
      options: options.map((o, i) => ({ text: o.text, imageUrl: o.imageUrl, order: i })),
      correctAnswer: Number(body.correctAnswer || 0),
      explanation: body.explanation,
      explanationImageUrl: body.explanationImageUrl,
      explanationImagePublicId: body.explanationImagePublicId,
      difficulty: body.difficulty || "Medium",
      marks: Number(body.marks || exam.marksPerCorrect || 4),
      negativeMarks: Number(body.negativeMarks || exam.negativePerWrong || 1),
      subject: body.subject || undefined,
      chapter: body.chapter || undefined,
      batch: exam.batch,
      createdBy: req.user._id,
    });

    exam.questions = [...(exam.questions || []), question._id];
    exam.totalQuestions = exam.questions.length;
    await exam.save();

    return apiResponse(res, 201, "Question added to exam", { question });
  } catch (error) {
    next(error);
  }
};

const getExamQuestions = async (req, res, next) => {
  try {
    const Question = require("../models/Question");
    const exam = await Exam.findById(req.params.id);
    if (!exam) throw new ApiError(404, "Exam not found");
    const questions = await Question.find({ _id: { $in: exam.questions }});
    return apiResponse(res, 200, "Exam questions", { questions });
  } catch (error) {
    next(error);
  }
};

const deleteExamQuestion = async (req, res, next) => {
  try {
    const Question = require("../models/Question");
    const exam = await Exam.findById(req.params.id);
    if (!exam) throw new ApiError(404, "Exam not found");
    exam.questions = (exam.questions || []).filter(
      (q) => q.toString() !== req.params.questionId
    );
    exam.totalQuestions = exam.questions.length;
    await exam.save();
    await Question.findByIdAndUpdate(req.params.questionId, { isActive: false });
    return apiResponse(res, 200, "Question removed from exam");
  } catch (error) {
    next(error);
  }
};

const deleteExam = async (req, res, next) => {
  try {
    const exam = await Exam.findByIdAndDelete(req.params.id);
    if (!exam) throw new ApiError(404, "Exam not found");
    return apiResponse(res, 200, "Exam deleted");
  } catch (error) {
    next(error);
  }
};

const getExamResults = async (req, res, next) => {
  try {
    const exam = await Exam.findById(req.params.id).populate("course", "name");
    if (!exam) throw new ApiError(404, "Exam not found");

    const results = await Result.find({ exam: req.params.id })
      .populate("student", "name email phone")
      .sort({ rank: 1, obtainedMarks: -1 });

    const totalSubmissions = results.length;
    const avgScore = totalSubmissions > 0
      ? Math.round(results.reduce((acc, r) => acc + (r.obtainedMarks || 0), 0) / totalSubmissions)
      : 0;

    return apiResponse(res, 200, "Exam results retrieved", {
      exam,
      results,
      analytics: {
        totalSubmissions,
        avgScore,
        highestScore: results[0]?.obtainedMarks || 0,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getExams,
  getExamById,
  createExam,
  updateExam,
  publishExam,
  closeExam,
  archiveExam,
  setStudyVisibility,
  reconductExam,
  downloadExam,
  getQuestionBank,
  publishResults,
  grantPermission,
  revokePermission,
  listPermissions,
  importQuestions,
  createExamQuestion,
  getExamQuestions,
  deleteExamQuestion,
  deleteExam,
  getExamResults,
};
