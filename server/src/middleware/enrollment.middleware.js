const Enrollment = require("../models/Enrollment");
const ApiError = require("../utils/apiError");

const checkCourseAccess = async (req, res, next) => {
  try {
    const courseId = req.params.courseId || req.params.id;

    if (["admin", "teacher"].includes(req.user.role)) return next();

    const enrollment = await Enrollment.findOne({
      student: req.user._id,
      course: courseId,
      status: "ACTIVE",
      $or: [
        { expiresAt: null },
        { expiresAt: { $gte: new Date() } },
      ],
    });

    if (!enrollment) {
      return next(new ApiError(403, "You do not have access to this course. Contact admin for enrollment."));
    }

    req.enrollment = enrollment;
    next();
  } catch (error) {
    next(new ApiError(500, "Access check failed."));
  }
};

module.exports = { checkCourseAccess };
