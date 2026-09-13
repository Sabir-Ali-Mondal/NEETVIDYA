const ActivityLog = require("../models/ActivityLog");

const logActivity = (action, resource, resourceId) => {
  return async (req, res, next) => {
    try {
      await ActivityLog.create({
        user: req.user ? req.user._id : null,
        action,
        resource,
        resourceId: resourceId || req.params.id || null,
        details: req.body,
        ipAddress: req.ip,
        userAgent: req.headers["user-agent"],
      });
    } catch (err) {}
    next();
  };
};

module.exports = { logActivity };
