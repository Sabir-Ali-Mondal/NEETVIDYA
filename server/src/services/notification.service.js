const Notification = require("../models/Notification");
const Student = require("../models/Student");

// Resolve every batch a user belongs to. Only students are batch-scoped.
const getUserBatchIds = async (userId, userRole) => {
  if (userRole !== "student") return [];
  const student = await Student.findOne({ user: userId }).select("batches");
  return (student?.batches || []).map((b) => b.toString());
};

// Visibility filter: only batch-scoped notifications for the user's batches,
// plus notifications addressed directly to the user. No global floods.
const buildVisibilityFilter = async (userId, userRole) => {
  const batchIds = await getUserBatchIds(userId, userRole);

  const or = [{ targetStudents: userId }];

  if (batchIds.length > 0) {
    or.push({ scope: "BATCH", targetBatches: { $in: batchIds } });
  }

  // Rare admin-wide broadcast — only when explicitly published with scope ROLE.
  or.push({ scope: "ROLE", targetRole: { $in: ["all", userRole] }});

  return { $or: or, isActive: true };
};

const createNotification = async (data) => {
  return await Notification.create(data);
};

// Emitter helper: notify only the students of one specific batch.
const notifyBatch = async (batchId, { title, message, type = "GENERAL", createdBy } = {}) => {
  if (!batchId || !title || !message) return null;
  return await Notification.create({
    title,
    message,
    type,
    scope: "BATCH",
    targetBatches: [batchId],
    createdBy,
  });
};

const getNotificationsForUser = async (userId, userRole) => {
  const filter = await buildVisibilityFilter(userId, userRole);
  return await Notification.find(filter).sort({ createdAt: -1 }).limit(30);
};

const getUnreadCount = async (userId, userRole) => {
  const filter = await buildVisibilityFilter(userId, userRole);
  return await Notification.countDocuments({
    ...filter,
    readBy: { $ne: userId },
  });
};

const markAsRead = async (notificationId, userId) => {
  await Notification.findByIdAndUpdate(notificationId, {
    $addToSet: { readBy: userId },
  });
};

const markAllAsRead = async (userId, userRole) => {
  const filter = await buildVisibilityFilter(userId, userRole);
  await Notification.updateMany(filter, { $addToSet: { readBy: userId }});
};

module.exports = {
  createNotification,
  notifyBatch,
  getUserBatchIds,
  getNotificationsForUser,
  getUnreadCount,
  markAsRead,
  markAllAsRead,
};
