const express = require("express");
const router = express.Router();
const {
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
} = require("../controllers/auth.controller");
const { protect } = require("../middleware/auth.middleware");
const { requireRole } = require("../middleware/role.middleware");
const { authLimiter } = require("../middleware/rateLimiter.middleware");

// Public routes
router.post("/register", authLimiter, register);
router.get("/verify-email", verifyEmail);
router.post("/resend-verification", authLimiter, resendVerification);
router.post("/login", authLimiter, login);
router.post("/refresh", refresh);
router.post("/forgot-password", authLimiter, forgotPassword);
router.post("/reset-password", authLimiter, resetPassword);

// Protected routes
router.get("/me", protect, getMe);
// Every logged-in user (student, teacher, admin) can update their own profile and password.
router.put("/profile", protect, updateProfile);
router.put("/change-password", protect, changePassword);

// Admin-only
router.post("/admin/create-student", protect, requireRole("admin"), adminCreateStudent);
router.post("/admin/create-teacher", protect, requireRole("admin"), adminCreateTeacher);

module.exports = router;
