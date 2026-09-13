const Teacher = require("../models/Teacher");
const ApiError = require("../utils/apiError");

const checkPermission = (permissionKey) => {
  return async (req, res, next) => {
    try {
      if (req.user.role === "admin") return next();

      const teacher = await Teacher.findOne({ user: req.user._id });
      if (!teacher) {
        return next(new ApiError(403, "Teacher profile not found."));
      }
      if (!teacher.permissions || !teacher.permissions[permissionKey]) {
        return next(new ApiError(403, `Permission denied: ${permissionKey}`));
      }
      req.teacherProfile = teacher;
      next();
    } catch (error) {
      next(new ApiError(500, "Permission check failed."));
    }
  };
};

module.exports = { checkPermission };
