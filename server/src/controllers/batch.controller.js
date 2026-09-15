const apiResponse = require("../utils/apiResponse");
const ApiError = require("../utils/apiError");
const {
  createBatch: createBatchService,
  getBatches: getBatchesService,
  getBatchById,
  updateBatch: updateBatchService,
  deleteBatch: deleteBatchService,
  addStudentsToBatch: addStudentsToBatchService,
  removeStudentFromBatch: removeStudentFromBatchService,
} = require("../services/batch.service");

const getBatches = async (req, res, next) => {
  try {
    const { type, course } = req.query;
    const filter = {};
    if (type) filter.batchType = type;
    if (course) filter.course = course;
    const batches = await getBatchesService(filter);
    return apiResponse(res, 200, "Batches retrieved", { batches });
  } catch (error) {
    next(error);
  }
};

const createBatch = async (req, res, next) => {
  try {
    const batch = await createBatchService(req.body, req.user._id);
    return apiResponse(res, 201, "Batch created", { batch });
  } catch (error) {
    next(error);
  }
};

const updateBatch = async (req, res, next) => {
  try {
    const batch = await updateBatchService(req.params.id, req.body);
    return apiResponse(res, 200, "Batch updated", { batch });
  } catch (error) {
    next(error);
  }
};

const deleteBatch = async (req, res, next) => {
  try {
    const batch = await deleteBatchService(req.params.id);
    return apiResponse(res, 200, "Batch deactivated", { batch });
  } catch (error) {
    next(error);
  }
};

const addStudentsToBatch = async (req, res, next) => {
  try {
    const { studentIds } = req.body;
    if (!Array.isArray(studentIds) || studentIds.length === 0) {
      throw new ApiError(400, "studentIds array is required");
    }
    const batch = await addStudentsToBatchService(req.params.id, studentIds);
    return apiResponse(res, 200, "Students added to batch", { batch });
  } catch (error) {
    next(error);
  }
};

const removeStudentFromBatch = async (req, res, next) => {
  try {
    const { studentId } = req.params;
    await removeStudentFromBatchService(req.params.id, studentId);
    return apiResponse(res, 200, "Student removed from batch");
  } catch (error) {
    next(error);
  }
};

const getBatchStudents = async (req, res, next) => {
  try {
    const batch = await getBatchById(req.params.id);
    return apiResponse(res, 200, "Batch students", { students: batch.students });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getBatches,
  createBatch,
  updateBatch,
  deleteBatch,
  addStudentsToBatch,
  removeStudentFromBatch,
  getBatchStudents,
};
