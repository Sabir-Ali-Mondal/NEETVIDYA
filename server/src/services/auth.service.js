const User = require("../models/User");
const Student = require("../models/Student");
const Teacher = require("../models/Teacher");
const { generateAccessToken, generateRefreshToken, verifyRefreshToken } = require("../utils/jwt");
const ApiError = require("../utils/apiError");
const { sendVerificationEmail, sendPasswordResetEmail } = require("./email.service");
const { DEFAULT_PASSWORD } = require("../config/constants");
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

// Sanitises the optional registration-context blob sent by the public site into
// the shape stored on Student.registrationSource. Returns a plain object (or
// undefined when nothing useful was provided).
const normalizeRegistrationSource = (source) => {
  if (!source || typeof source !== "object") return undefined;

  const clean = (v) => (typeof v === "string" && v.trim() ? v.trim().slice(0, 300) : undefined);

  const normalized = {
    type: clean(source.type) || "WEBSITE",
    label: clean(source.label),
    page: clean(source.page),
    referrer: clean(source.referrer),
    campaign: clean(source.campaign),
    course: source.course || undefined,
    courseName: clean(source.courseName),
    batch: source.batch || undefined,
    batchName: clean(source.batchName),
    utm: source.utm && typeof source.utm === "object" ? source.utm : {},
  };

  // Nothing meaningful captured → don't store an empty shell.
  const hasData = ["label", "page", "referrer", "campaign", "courseName", "batchName"]
    .some((k) => normalized[k]);
  return hasData ? normalized : undefined;
};

const register = async (name, email, password, phone, source = null) => {
  const existing = await User.findOne({ email });
  if (existing) {
    // If the previous attempt created the account but the person never
    // verified it (e.g. the email never arrived), let them complete
    // registration instead of dead-ending on "Email already registered".
    if (!existing.emailVerified) {
      const verificationToken = crypto.randomBytes(32).toString("hex");
      const hashedToken = crypto.createHash("sha256").update(verificationToken).digest("hex");

      existing.name = name || existing.name;
      existing.phone = phone || existing.phone;
      existing.password = password;
      existing.emailVerificationToken = hashedToken;
      existing.emailVerificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);
      await existing.save();

      // Refresh the captured registration source on a retried signup, but never
      // wipe a previously stored one with empty data.
      const refreshedSource = normalizeRegistrationSource(source);
      if (refreshedSource && (refreshedSource.label || refreshedSource.course || refreshedSource.batch)) {
        await Student.findOneAndUpdate(
          { user: existing._id },
          { registrationSource: refreshedSource }
        );
      }

      sendVerificationEmail(existing, verificationToken).catch((err) => {
        console.error("Verification email failed for", existing.email, err.message);
      });

      return {
        userId: existing._id,
        email: existing.email,
        message: "Please check your email to verify your account.",
      };
    }

    throw new ApiError(400, "Email already registered. Please log in or verify your email.");
  }

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
    emailVerificationExpires: new Date(Date.now() + 24 * 60 * 60 * 1000),
  });

  const studentId = await generateStudentId();
  await Student.create({
    user: user._id,
    studentId,
    enrollmentDate: new Date(),
    registrationSource: normalizeRegistrationSource(source),
  });

  // Send the verification email WITHOUT blocking the response. A slow or
  // unreachable SMTP server must never hold the registration request open
  // (the client would sit on "Creating Account..." forever). Errors are
  // logged so an admin can resend later.
  sendVerificationEmail(user, verificationToken).catch((err) => {
    console.error("Verification email failed for", user.email, err.message);
  });

  return { userId: user._id, email: user.email, message: "Please check your email to verify your account." };
};

const verifyEmail = async (token) => {
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  const user = await User.findOne({ emailVerificationToken: hashedToken }).select(
    "+emailVerificationToken +emailVerificationExpires +lastVerifiedToken"
  );

  if (!user || !user.emailVerificationExpires || new Date(user.emailVerificationExpires).getTime() <= Date.now()) {
    // If the token was already used to verify this account, return idempotent success
    const alreadyVerifiedUser = await User.findOne({ lastVerifiedToken: hashedToken });
    if (alreadyVerifiedUser && alreadyVerifiedUser.emailVerified) {
      return { message: "Email is already verified. You can now log in." };
    }

    if (user) {
      user.emailVerificationToken = undefined;
      user.emailVerificationExpires = undefined;
      await user.save({ validateBeforeSave: false });
    }
    throw new ApiError(400, "Invalid or expired verification link. Please request a new one.");
  }

  user.emailVerified = true;
  user.lastVerifiedToken = hashedToken;
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
  user.emailVerificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);
  await user.save({ validateBeforeSave: false });

  // Non-blocking: don't hold the request open on a slow SMTP server.
  sendVerificationEmail(user, verificationToken).catch((err) => {
    console.error("Verification email resend failed for", user.email, err.message);
  });
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

  // Non-blocking: don't hold the request open on a slow SMTP server.
  sendPasswordResetEmail(user, resetToken).catch((err) => {
    console.error("Password reset email failed for", user.email, err.message);
  });
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
  user.mustChangePassword = false;
  user.passwordChangedAt = new Date();
  await user.save();

  return { message: "Password changed successfully" };
};

const adminCreateStudent = async (data) => {
  const existing = await User.findOne({ email: data.email });
  if (existing) throw new ApiError(400, "Email already registered");

  // Constant default password — the student is forced to change it on first login.
  const user = await User.create({
    name: data.name,
    email: data.email,
    password: DEFAULT_PASSWORD,
    phone: data.phone,
    role: "student",
    emailVerified: true, // admin-created accounts are pre-verified
    mustChangePassword: true,
  });

  const studentId = await generateStudentId();
  const student = await Student.create({
    user: user._id,
    studentId,
    studentType: data.studentType || "REGULAR_OFFLINE",
    batches: data.batch ? [data.batch] : (data.batches || []),
    enrollmentDate: new Date(),
    parentName: data.parentName,
    parentPhone: data.parentPhone,
    school: data.school,
    currentClass: data.currentClass || "XI",
    address: data.address,
    city: data.city,
    whatsappNumber: data.whatsappNumber,
  });

  // No credential email is sent — the admin shares the constant default password.
  return { user, student, studentId };
};

const adminCreateTeacher = async (data) => {
  const existing = await User.findOne({ email: data.email });
  if (existing) throw new ApiError(400, "Email already registered");

  // Constant default password — the teacher is forced to change it on first login.
  const user = await User.create({
    name: data.name,
    email: data.email,
    password: DEFAULT_PASSWORD,
    phone: data.phone,
    role: "teacher",
    emailVerified: true,
    mustChangePassword: true,
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

  // No credential email is sent — the admin shares the constant default password.
  return { user, teacher };
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
