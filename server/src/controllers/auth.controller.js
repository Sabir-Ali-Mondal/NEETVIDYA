const authService = require("../services/auth.service");
const apiResponse = require("../utils/apiResponse");

const register = async (req, res, next) => {
  try {
    const { name, email, password, phone, source } = req.body;
    const result = await authService.register(name, email, password, phone, source);
    return apiResponse(res, 201, result.message, { userId: result.userId, email: result.email });
  } catch (error) {
    next(error);
  }
};

const verifyEmail = async (req, res, next) => {
  try {
    const { token } = req.query;
    if (!token) return apiResponse(res, 400, "Verification token is required");
    const result = await authService.verifyEmail(token);
    return apiResponse(res, 200, result.message);
  } catch (error) {
    next(error);
  }
};

const resendVerification = async (req, res, next) => {
  try {
    const { email } = req.body;
    const result = await authService.resendVerification(email);
    return apiResponse(res, 200, result.message);
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await authService.login(email, password);
    return apiResponse(res, 200, "Login successful", result);
  } catch (error) {
    next(error);
  }
};

const refresh = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    const result = await authService.refreshToken(refreshToken);
    return apiResponse(res, 200, "Token refreshed", result);
  } catch (error) {
    next(error);
  }
};

const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const result = await authService.forgotPassword(email);
    return apiResponse(res, 200, result.message);
  } catch (error) {
    next(error);
  }
};

const resetPassword = async (req, res, next) => {
  try {
    const { token } = req.query;
    const { password } = req.body;
    if (!token) return apiResponse(res, 400, "Reset token is required");
    if (!password || password.length < 8)
      return apiResponse(res, 400, "Password must be at least 8 characters");
    const result = await authService.resetPassword(token, password);
    return apiResponse(res, 200, result.message);
  } catch (error) {
    next(error);
  }
};

const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const result = await authService.changePassword(req.user._id, currentPassword, newPassword);
    return apiResponse(res, 200, result.message);
  } catch (error) {
    next(error);
  }
};

const getMe = async (req, res) => {
  return apiResponse(res, 200, "User profile", { user: req.user });
};

const updateProfile = async (req, res, next) => {
  try {
    const user = await authService.updateProfile(req.user._id, req.body);
    return apiResponse(res, 200, "Profile updated successfully", { user });
  } catch (error) {
    next(error);
  }
};

const adminCreateStudent = async (req, res, next) => {
  try {
    const result = await authService.adminCreateStudent(req.body);
    return apiResponse(res, 201, "Student created successfully", result);
  } catch (error) {
    next(error);
  }
};

const adminCreateTeacher = async (req, res, next) => {
  try {
    const result = await authService.adminCreateTeacher(req.body);
    return apiResponse(res, 201, "Teacher created successfully", result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  verifyEmail,
  resendVerification,
  login,
  refresh,
  forgotPassword,
  resetPassword,
  changePassword,
  getMe,
  updateProfile,
  adminCreateStudent,
  adminCreateTeacher,
};
