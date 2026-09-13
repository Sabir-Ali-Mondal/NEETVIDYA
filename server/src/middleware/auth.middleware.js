const { verifyAccessToken } = require("../utils/jwt");
const User = require("../models/User");
const ApiError = require("../utils/apiError");

const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next(new ApiError(401, "Not authorized. No token provided."));
    }

    const token = authHeader.split(" ")[1];
    const decoded = verifyAccessToken(token);

    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return next(new ApiError(401, "User not found."));
    }
    if (!user.isActive) {
      return next(new ApiError(403, "Account is deactivated."));
    }

    req.user = user;
    next();
  } catch (error) {
    return next(new ApiError(401, "Not authorized. Token invalid or expired."));
  }
};

module.exports = { protect };
