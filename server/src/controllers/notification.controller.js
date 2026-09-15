const {
  createNotification: createNotificationService,
  getNotificationsForUser,
  getUnreadCount: getUnreadCountService,
  markAsRead: markAsReadService,
  markAllAsRead: markAllAsReadService,
} = require("../services/notification.service");
const apiResponse = require("../utils/apiResponse");

const getNotifications = async (req, res, next) => {
  try {
    const notifications = await getNotificationsForUser(req.user._id, req.user.role);
    return apiResponse(res, 200, "Notifications", { notifications });
  } catch (error) {
    next(error);
  }
};

const getUnreadCount = async (req, res, next) => {
  try {
    const count = await getUnreadCountService(req.user._id, req.user.role);
    return apiResponse(res, 200, "Unread count", { count });
  } catch (error) {
    next(error);
  }
};

const markAsRead = async (req, res, next) => {
  try {
    await markAsReadService(req.params.id, req.user._id);
    return apiResponse(res, 200, "Marked as read");
  } catch (error) {
    next(error);
  }
};

const markAllAsRead = async (req, res, next) => {
  try {
    await markAllAsReadService(req.user._id, req.user.role);
    return apiResponse(res, 200, "All marked as read");
  } catch (error) {
    next(error);
  }
};

const createNotification = async (req, res, next) => {
  try {
    const notification = await createNotificationService({ ...req.body, createdBy: req.user._id });
    return apiResponse(res, 201, "Notification created", { notification });
  } catch (error) {
    next(error);
  }
};

module.exports = { getNotifications, getUnreadCount, markAsRead, markAllAsRead, createNotification };
