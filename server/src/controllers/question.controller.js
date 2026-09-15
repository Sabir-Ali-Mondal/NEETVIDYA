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

module.exports = { getQuestions, createQuestion, updateQuestion, deleteQuestion, addExplanation, bulkImport };
