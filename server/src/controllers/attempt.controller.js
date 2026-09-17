const apiResponse = require("../utils/apiResponse");
const {
  getAttemptById,
  getMyAttempts: getMyAttemptsService,
  startAttempt: startAttemptService,
  saveAttemptState: saveAttemptStateService,
  submitAttempt: submitAttemptService,
} = require("../services/attempt.service");

const startAttempt = async (req, res, next) => {
  try {
    const result = await startAttemptService(req.params.examId, req.user._id, req.user);
    return apiResponse(res, 200, result.resumed ? "Resuming existing attempt" : "Attempt started", result);
  } catch (error) {
    next(error);
  }
};

const saveAttemptState = async (req, res, next) => {
  try {
    await saveAttemptStateService(req.params.id, req.user._id, req.body);
    return apiResponse(res, 200, "Attempt state saved");
  } catch (error) {
    next(error);
  }
};

const submitAttempt = async (req, res, next) => {
  try {
    const { result, message } = await submitAttemptService(req.params.id, req.user);
    if (result === undefined && message) {
      return apiResponse(res, 200, message);
    }
    if (result === null) {
      return apiResponse(res, 200, "Exam already submitted");
    }
    return apiResponse(res, 200, "Exam submitted successfully", { result });
  } catch (error) {
    next(error);
  }
};

const getAttempt = async (req, res, next) => {
  try {
    const attempt = await getAttemptById(req.params.id);
    return apiResponse(res, 200, "Attempt retrieved", { attempt });
  } catch (error) {
    next(error);
  }
};

const getMyAttempts = async (req, res, next) => {
  try {
    const attempts = await getMyAttemptsService(req.user._id);
    return apiResponse(res, 200, "Attempts retrieved", { attempts });
  } catch (error) {
    next(error);
  }
};

module.exports = { startAttempt, saveAttemptState, submitAttempt, getAttempt, getMyAttempts };
