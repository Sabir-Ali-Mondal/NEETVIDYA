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
