const Notification = require("../models/Notification");

const createNotification = async (data) => {
  return await Notification.create(data);
};

const getNotificationsForUser = async (userId, userRole) => {
  return await Notification.find({
    $or: [
      { targetRole: "all" },
      { targetRole: userRole },
      { targetStudents: userId },
    ],
    isActive: true,
  })
    .sort({ createdAt: -1 })
    .limit(30);
};

const getUnreadCount = async (userId, userRole) => {
  return await Notification.countDocuments({
    $or: [
      { targetRole: "all" },
      { targetRole: userRole },
      { targetStudents: userId },
    ],
    isActive: true,
    readBy: { $ne: userId },
  });
};

const markAsRead = async (notificationId, userId) => {
  await Notification.findByIdAndUpdate(notificationId, {
    $addToSet: { readBy: userId },
  });
};

const markAllAsRead = async (userId, userRole) => {
  await Notification.updateMany(
    {
      $or: [{ targetRole: "all" }, { targetRole: userRole }],
      isActive: true,
    },
    { $addToSet: { readBy: userId } }
  );
};

module.exports = {
  createNotification,
  getNotificationsForUser,
  getUnreadCount,
  markAsRead,
  markAllAsRead,
};
