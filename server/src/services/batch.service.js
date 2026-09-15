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
