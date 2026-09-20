const Batch = require("../models/Batch");
const Student = require("../models/Student");
const ApiError = require("../utils/apiError");

const resolveBatchStudentUserIds = (batchStudentIds = [], studentRecords = []) => {
  const byLegacyId = new Map();

  for (const student of studentRecords) {
    if (!student) continue;
    if (student.user) byLegacyId.set(String(student.user), String(student.user));
    if (student._id) byLegacyId.set(String(student._id), String(student.user || student._id));
  }

  const normalized = [];
  for (const value of batchStudentIds || []) {
    const raw = String(value);
    if (byLegacyId.has(raw)) {
      normalized.push(byLegacyId.get(raw));
    } else {
      normalized.push(raw);
    }
  }

  return [...new Set(normalized)];
};

// Every teacher has full access to every active batch. Batch assignment no longer
// restricts what a teacher can see or work with, so the filter is role-agnostic.
const buildAccessibleBatchFilter = (user, extraFilter = {}) => {
  return { isActive: true, ...extraFilter };
};

// Keep only valid, non-empty group entries.
const sanitizeGroups = (groups) => {
  if (!Array.isArray(groups)) return undefined;
  return groups
    .filter((g) => g && g.label && g.url)
    .map((g) => ({
      label: String(g.label).trim(),
      type: ["TELEGRAM", "WHATSAPP", "LINK"].includes(g.type) ? g.type : "LINK",
      url: String(g.url).trim(),
      description: g.description ? String(g.description).trim() : undefined,
    }));
};

const createBatch = async (data, userId) => {
  const existing = await Batch.findOne({ code: data.code });
  if (existing) throw new ApiError(400, "Batch code already exists");
  const groups = sanitizeGroups(data.groups);
  const batch = await Batch.create({
    ...data,
    ...(groups ? { groups } : {}),
    createdBy: userId,
  });
  return batch;
};

const getBatches = async (filter = {}, user = null) => {
  const batches = await Batch.find(buildAccessibleBatchFilter(user, filter))
    .populate("assignedTeachers.teacher", "name")
    .populate("assignedTeachers.subject", "name")
    .sort({ createdAt: -1 });
  return batches;
};

const getBatchById = async (id) => {
  const batch = await Batch.findById(id)
    .populate("assignedTeachers.teacher", "name email")
    .populate("assignedTeachers.subject", "name");
  if (!batch) throw new ApiError(404, "Batch not found");
  return batch;
};

const updateBatch = async (id, data) => {
  const update = { ...data };
  const groups = sanitizeGroups(data.groups);
  if (groups !== undefined) update.groups = groups;
  const batch = await Batch.findByIdAndUpdate(id, update, { new: true });
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

  const referencedStudents = await Student.find({
    $or: [{ _id: { $in: studentUserIds } }, { user: { $in: studentUserIds } }],
  }).select("_id user");

  const normalizedStudentIds = resolveBatchStudentUserIds(studentUserIds, referencedStudents);
  const nextStudentIds = [...new Set([...batch.students.map(String), ...normalizedStudentIds.map(String)])];

  batch.students = nextStudentIds;
  await batch.save();

  await Student.updateMany(
    { user: { $in: normalizedStudentIds } },
    { $addToSet: { batches: batchId } }
  );

  return batch;
};

const removeStudentFromBatch = async (batchId, studentUserId) => {
  const student = await Student.findOne({
    $or: [{ _id: studentUserId }, { user: studentUserId }],
  }).select("_id user");

  const normalizedStudentUserId = student?.user || studentUserId;

  await Batch.findByIdAndUpdate(batchId, {
    $pull: { students: { $in: [studentUserId, normalizedStudentUserId] } },
  });

  await Student.updateMany(
    { user: normalizedStudentUserId },
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
  resolveBatchStudentUserIds,
  buildAccessibleBatchFilter,
};
