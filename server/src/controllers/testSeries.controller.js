const TestSeries = require("../models/TestSeries");
const apiResponse = require("../utils/apiResponse");
const ApiError = require("../utils/apiError");

const getTestSeries = async (req, res, next) => {
  try {
    const series = await TestSeries.find({ isActive: true })
      .populate("exams", "title duration totalMarks status")
      .populate("course", "name");
    return apiResponse(res, 200, "Test series", { testSeries: series });
  } catch (error) {
    next(error);
  }
};

const createTestSeries = async (req, res, next) => {
  try {
    const series = await TestSeries.create({ ...req.body, createdBy: req.user._id });
    return apiResponse(res, 201, "Test series created", { testSeries: series });
  } catch (error) {
    next(error);
  }
};

const updateTestSeries = async (req, res, next) => {
  try {
    const series = await TestSeries.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!series) throw new ApiError(404, "Test series not found");
    return apiResponse(res, 200, "Test series updated", { testSeries: series });
  } catch (error) {
    next(error);
  }
};

module.exports = { getTestSeries, createTestSeries, updateTestSeries };
