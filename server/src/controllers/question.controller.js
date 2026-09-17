const apiResponse = require("../utils/apiResponse");
const { getPagination, buildPaginationMeta } = require("../utils/pagination");
const {
  createQuestion: createQuestionService,
  getQuestions: getQuestionsService,
  updateQuestion: updateQuestionService,
  deleteQuestion: deleteQuestionService,
  addExplanation: addExplanationService,
  bulkImport: bulkImportService,
} = require("../services/question.service");

const getQuestions = async (req, res, next) => {
  try {
    const { page, limit } = getPagination(req.query);
    const filter = {};
    if (req.query.subject) filter.subject = req.query.subject;
    if (req.query.chapter) filter.chapter = req.query.chapter;
    if (req.query.difficulty) filter.difficulty = req.query.difficulty;
    if (req.query.source) filter.source = req.query.source;
    if (req.query.search) filter.questionText = { $regex: req.query.search, $options: "i" };

    const { questions, total, pages } = await getQuestionsService(filter, page, limit);
    return apiResponse(res, 200, "Questions retrieved", {
      questions,
      currentPage: page,
      totalPages: pages,
      totalItems: total,
      limit,
    });
  } catch (error) {
    next(error);
  }
};

const createQuestion = async (req, res, next) => {
  try {
    const question = await createQuestionService(req.body, req.user._id);
    return apiResponse(res, 201, "Question created", { question });
  } catch (error) {
    next(error);
  }
};

const updateQuestion = async (req, res, next) => {
  try {
    const question = await updateQuestionService(req.params.id, req.body);
    return apiResponse(res, 200, "Question updated", { question });
  } catch (error) {
    next(error);
  }
};

const deleteQuestion = async (req, res, next) => {
  try {
    await deleteQuestionService(req.params.id);
    return apiResponse(res, 200, "Question deleted");
  } catch (error) {
    next(error);
  }
};

const addExplanation = async (req, res, next) => {
  try {
    const question = await addExplanationService(req.params.id, req.body.explanation);
    return apiResponse(res, 200, "Explanation added", { question });
  } catch (error) {
    next(error);
  }
};

const bulkImport = async (req, res, next) => {
  try {
    const { questions } = req.body;
    const result = await bulkImportService(questions, req.user._id);
    return apiResponse(res, 201, `${result.imported} questions imported`, {
      count: result.imported,
      total: result.total,
      skipped: result.skipped,
    });
  } catch (error) {
    next(error);
  }
};

const { uploadFile } = require("../services/cloudinary.service");
const FOLDERS = require("../constants/cloudinaryFolders");
const Question = require("../models/Question");

const createQuestionWithImages = async (req, res, next) => {
  try {
    const body = { ...req.body };
    let options = JSON.parse(body.options || "[]");

    // Upload question image
    if (req.files?.questionImage?.[0]) {
      const result = await uploadFile(req.files.questionImage[0].buffer, FOLDERS.QUESTIONS, "image");
      body.questionImageUrl = result.url;
      body.questionImagePublicId = result.publicId;
    }

    // Upload explanation image
    if (req.files?.explanationImage?.[0]) {
      const result = await uploadFile(req.files.explanationImage[0].buffer, FOLDERS.QUESTIONS, "image");
      body.explanationImageUrl = result.url;
      body.explanationImagePublicId = result.publicId;
    }

    // Upload option images
    for (let i = 0; i < 4; i++) {
      const key = `optionImage_${i}`;
      if (req.files?.[key]?.[0]) {
        const result = await uploadFile(req.files[key][0].buffer, FOLDERS.QUESTIONS, "image");
        if (options[i]) options[i].imageUrl = result.url;
      }
    }

    body.options = options;
    body.correctAnswer = Number(body.correctAnswer || 0);
    body.marks = Number(body.marks || 4);
    body.negativeMarks = Number(body.negativeMarks || 1);
    if (!body.subject) delete body.subject;
    if (!body.batch) delete body.batch;

    const question = await Question.create({ ...body, createdBy: req.user._id });
    return apiResponse(res, 201, "Question with images created", { question });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getQuestions,
  createQuestion,
  createQuestionWithImages,
  updateQuestion,
  deleteQuestion,
  addExplanation,
  bulkImport,
};
