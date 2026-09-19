const mongoose = require("mongoose");
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
  resolveBatchStudentUserIds,
} = require("../services/batch.service");

const getBatches = async (req, res, next) => {
  try {
    const { type, course } = req.query;
    const filter = {};
    if (type) filter.batchType = type;
    if (course) filter.course = course;
    const batches = await getBatchesService(filter, req.user);
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

const Student = require("../models/Student");

const getBatchStudents = async (req, res, next) => {
  try {
    const batch = await getBatchById(req.params.id);
    const batchStudentIds = Array.isArray(batch.students) ? batch.students : [];

    const validObjectIds = batchStudentIds.filter((id) => mongoose.Types.ObjectId.isValid(id));
    const studentProfiles = await Student.find({
      $or: [
        { user: { $in: batchStudentIds.filter((id) => !mongoose.Types.ObjectId.isValid(id) ? false : false) } },
        { _id: { $in: validObjectIds } },
      ],
    }).populate("user", "name email phone avatar");

    const validUserIds = resolveBatchStudentUserIds(batchStudentIds, studentProfiles);
    const students = await Student.find({ user: { $in: validUserIds } })
      .populate("user", "name email phone avatar")
      .sort({ createdAt: -1 });

    return apiResponse(res, 200, "Batch students", { students });
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
