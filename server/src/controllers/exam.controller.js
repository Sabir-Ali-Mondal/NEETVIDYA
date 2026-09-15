const Exam = require("../models/Exam");
const Result = require("../models/Result");
const Attempt = require("../models/Attempt");
const apiResponse = require("../utils/apiResponse");
const ApiError = require("../utils/apiError");

const getExams = async (req, res, next) => {
  try {
    const filter = {};
    if (req.user.role === "student") filter.status = "LIVE";
    if (req.query.status) filter.status = req.query.status;
    if (req.query.testType) filter.testType = req.query.testType;
    const exams = await Exam.find(filter)
      .populate("course", "name")
      .populate("subjects", "name")
      .populate("testSeries", "title")
      .sort({ createdAt: -1 });
    return apiResponse(res, 200, "Exams retrieved", { exams });
  } catch (error) {
    next(error);
  }
};

const getExamById = async (req, res, next) => {
  try {
    const exam = await Exam.findById(req.params.id)
      .populate("subjects", "name")
      .populate("course", "name");
    if (!exam) throw new ApiError(404, "Exam not found");
    return apiResponse(res, 200, "Exam details", { exam });
  } catch (error) {
    next(error);
  }
};

const createExam = async (req, res, next) => {
  try {
    const exam = await Exam.create({ ...req.body, createdBy: req.user._id, status: "DRAFT" });
    return apiResponse(res, 201, "Exam created", { exam });
  } catch (error) {
    next(error);
  }
};

const updateExam = async (req, res, next) => {
  try {
    const exam = await Exam.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!exam) throw new ApiError(404, "Exam not found");
    return apiResponse(res, 200, "Exam updated", { exam });
  } catch (error) {
    next(error);
  }
};

const publishExam = async (req, res, next) => {
  try {
    const exam = await Exam.findById(req.params.id);
    if (!exam) throw new ApiError(404, "Exam not found");
    exam.status = "LIVE";
    exam.publishedAt = new Date();
    await exam.save();
    return apiResponse(res, 200, "Exam published", { exam });
  } catch (error) {
    next(error);
  }
};

const closeExam = async (req, res, next) => {
  try {
    const exam = await Exam.findByIdAndUpdate(req.params.id, { status: "CLOSED" }, { new: true });
    if (!exam) throw new ApiError(404, "Exam not found");
    return apiResponse(res, 200, "Exam closed");
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
  deleteExam,
  getExamResults,
};
