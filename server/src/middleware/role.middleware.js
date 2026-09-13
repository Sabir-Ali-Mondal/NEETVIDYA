const ApiError = require("../utils/apiError");

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(new ApiError(403, "Access denied. Insufficient permissions."));
    }
    next();
  };
};

// Alias for single role check
const requireRole = (role) => authorize(role);

module.exports = { authorize, requireRole };
