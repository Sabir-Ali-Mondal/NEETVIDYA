const User = require("../models/User");
const Student = require("../models/Student");
const Teacher = require("../models/Teacher");
const { generateAccessToken, generateRefreshToken, verifyRefreshToken } = require("../utils/jwt");
const generatePassword = require("../utils/generatePassword");
const ApiError = require("../utils/apiError");
const { sendVerificationEmail, sendPasswordResetEmail, sendWelcomeEmail } = require("./email.service");
const crypto = require("crypto");
const mongoose = require("mongoose");

// Helper: generate unique student ID like NV-2026-0001
const generateStudentId = async () => {
  const year = new Date().getFullYear();
  const prefix = `NV-${year}-`;
  // Find the last student ID with this prefix
  const last = await Student.findOne({ studentId: { $regex: `^${prefix}` } })
    .sort({ studentId: -1 })
    .select("studentId");
  if (!last || !last.studentId) return `${prefix}0001`;
  const lastNum = parseInt(last.studentId.replace(prefix, "")) || 0;
  return `${prefix}${String(lastNum + 1).padStart(4, "0")}`;
};

const register = async (name, email, password, phone) => {
  const existing = await User.findOne({ email });
  if (existing) throw new ApiError(400, "Email already registered");

  const verificationToken = crypto.randomBytes(32).toString("hex");
  const hashedToken = crypto.createHash("sha256").update(verificationToken).digest("hex");

  const user = await User.create({
    name,
    email,
    password,
    phone,
    role: "student",
    emailVerified: false,
    emailVerificationToken: hashedToken,
    emailVerificationExpires: Date.now() + 24 * 60 * 60 * 1000,
  });

  const studentId = await generateStudentId();
  await Student.create({ user: user._id, studentId, enrollmentDate: new Date() });

  // Send verification email (non-blocking)
  await sendVerificationEmail(user, verificationToken);

  return { userId: user._id, email: user.email, message: "Please check your email to verify your account." };
};

const verifyEmail = async (token) => {
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  const user = await User.findOne({
    emailVerificationToken: hashedToken,
    emailVerificationExpires: { $gt: Date.now() },
  }).select("+emailVerificationToken +emailVerificationExpires");

  if (!user) throw new ApiError(400, "Invalid or expired verification link. Please request a new one.");

  user.emailVerified = true;
  user.emailVerificationToken = undefined;
  user.emailVerificationExpires = undefined;
  await user.save({ validateBeforeSave: false });

  return { message: "Email verified successfully. You can now log in." };
};

const resendVerification = async (email) => {
  const user = await User.findOne({ email }).select("+emailVerificationToken +emailVerificationExpires");
  if (!user) throw new ApiError(404, "No account found with this email.");
  if (user.emailVerified) throw new ApiError(400, "Email is already verified.");

  const verificationToken = crypto.randomBytes(32).toString("hex");
  const hashedToken = crypto.createHash("sha256").update(verificationToken).digest("hex");

  user.emailVerificationToken = hashedToken;
  user.emailVerificationExpires = Date.now() + 24 * 60 * 60 * 1000;
  await user.save({ validateBeforeSave: false });

  await sendVerificationEmail(user, verificationToken);
  return { message: "Verification email has been resent." };
};

const login = async (email, password) => {
  // Support login by studentId as well
  let user;
  if (email.toUpperCase().startsWith("NV-")) {
    // Student ID login
    const student = await Student.findOne({ studentId: email.toUpperCase() }).populate("user");
    if (!student) throw new ApiError(401, "Invalid student ID or password");
    user = await User.findById(student.user._id).select("+password");
  } else {
    user = await User.findOne({ email }).select("+password");
  }

  if (!user) throw new ApiError(401, "Invalid email or password");
  if (!user.isActive) throw new ApiError(403, "Account has been deactivated. Please contact support.");
  if (!user.emailVerified) throw new ApiError(403, "Please verify your email address before logging in.");

  const isMatch = await user.comparePassword(password);
  if (!isMatch) throw new ApiError(401, "Invalid email or password");

  const accessToken = generateAccessToken(user._id, user.role);
  const refreshToken = generateRefreshToken(user._id);

  user.refreshToken = refreshToken;
  user.lastLogin = new Date();
  await user.save({ validateBeforeSave: false });

  const userObj = user.toObject();
  delete userObj.password;
  delete userObj.refreshToken;

  return { user: userObj, accessToken, refreshToken };
};

const refreshToken = async (token) => {
  const decoded = verifyRefreshToken(token);
  const user = await User.findById(decoded.id).select("+refreshToken");
  if (!user || user.refreshToken !== token) {
    throw new ApiError(401, "Invalid refresh token");
  }

  const accessToken = generateAccessToken(user._id, user.role);
  return { accessToken };
};

const forgotPassword = async (email) => {
  const user = await User.findOne({ email });
  // Always return same message to prevent email enumeration
  if (!user) return { message: "If an account exists with that email, a reset link has been sent." };

  const resetToken = crypto.randomBytes(32).toString("hex");
  const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

  user.passwordResetToken = hashedToken;
  user.passwordResetExpires = Date.now() + 60 * 60 * 1000; // 1 hour
  await user.save({ validateBeforeSave: false });

  await sendPasswordResetEmail(user, resetToken);
  return { message: "If an account exists with that email, a reset link has been sent." };
};

const resetPassword = async (token, newPassword) => {
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  }).select("+passwordResetToken +passwordResetExpires");

  if (!user) throw new ApiError(400, "Invalid or expired password reset link. Please request a new one.");

  user.password = newPassword;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  return { message: "Password has been reset successfully. You can now log in." };
};

const changePassword = async (userId, currentPassword, newPassword) => {
  const user = await User.findById(userId).select("+password");
  if (!user) throw new ApiError(404, "User not found");

  const isMatch = await user.comparePassword(currentPassword);
  if (!isMatch) throw new ApiError(400, "Current password is incorrect");

  user.password = newPassword;
  await user.save();

  return { message: "Password changed successfully" };
};

const adminCreateStudent = async (data) => {
  const existing = await User.findOne({ email: data.email });
  if (existing) throw new ApiError(400, "Email already registered");

  const tempPassword = data.password || generatePassword();
  const user = await User.create({
    name: data.name,
    email: data.email,
    password: tempPassword,
    phone: data.phone,
    role: "student",
    emailVerified: true, // admin-created accounts are pre-verified
  });

  const studentId = await generateStudentId();
  const student = await Student.create({
    user: user._id,
    studentId,
    studentType: data.studentType || "REGULAR_OFFLINE",
    batches: data.batches || [],
    enrollmentDate: new Date(),
    parentName: data.parentName,
    parentPhone: data.parentPhone,
    school: data.school,
    currentClass: data.currentClass || "XI",
    address: data.address,
    city: data.city,
    whatsappNumber: data.whatsappNumber,
  });

  // Send welcome email with credentials
  await sendWelcomeEmail(user, tempPassword);

  return { user, student, tempPassword, studentId };
};

const adminCreateTeacher = async (data) => {
  const existing = await User.findOne({ email: data.email });
  if (existing) throw new ApiError(400, "Email already registered");

  const tempPassword = data.password || generatePassword();
  const user = await User.create({
    name: data.name,
    email: data.email,
    password: tempPassword,
    phone: data.phone,
    role: "teacher",
    emailVerified: true,
  });

  const teacher = await Teacher.create({
    user: user._id,
    subjectName: typeof data.subject === "string" ? data.subject : undefined,
    subject: typeof data.subject !== "string" ? data.subject : undefined,
    qualification: data.qualification,
    experience: data.experience,
    specialisation: data.specialisation,
    bio: data.bio,
    permissions: data.permissions || {},
  });

  await sendWelcomeEmail(user, tempPassword);

  return { user, teacher, tempPassword };
};

const updateProfile = async (userId, updates) => {
  const allowedFields = ["name", "phone", "avatar"];
  const filteredUpdates = {};
  allowedFields.forEach((field) => {
    if (updates[field] !== undefined) filteredUpdates[field] = updates[field];
  });

  const user = await User.findByIdAndUpdate(userId, filteredUpdates, { new: true, runValidators: true });
  if (!user) throw new ApiError(404, "User not found");
  return user;
};

module.exports = {
  register,
  verifyEmail,
  resendVerification,
  login,
  refreshToken,
  forgotPassword,
  resetPassword,
  changePassword,
  adminCreateStudent,
  adminCreateTeacher,
  updateProfile,
};
