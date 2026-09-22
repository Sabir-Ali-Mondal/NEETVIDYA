const Student = require("../models/Student");
const User = require("../models/User");
const Enrollment = require("../models/Enrollment");
const ExamPermission = require("../models/ExamPermission");
const apiResponse = require("../utils/apiResponse");
const ApiError = require("../utils/apiError");

// A student "needs attention" when they are not enrolled in any batch OR they
// have no active exam permission at all.
//   red    → no batch AND no exam access (nothing set up at all)
//   yellow → no batch, but they ARE enrolled/permitted for exams (partial setup)
// Returns the reasons + level so the UI can colour the indicator correctly.
const computeAttention = (student, hasExamPermission) => {
  const reasons = [];
  const batchCount = student?.batches?.length || 0;
  const noBatch = batchCount === 0;

  if (noBatch) reasons.push("Not enrolled in any batch");
  if (!hasExamPermission) reasons.push("Not permitted for any exam");

  if (reasons.length === 0) {
    return { needsAttention: false, attentionReasons: [], attentionLevel: null };
  }

  // Yellow when the only gap is the missing batch (exam access exists); red when
  // exam access is also missing.
  const attentionLevel = noBatch && hasExamPermission ? "yellow" : "red";

  return { needsAttention: true, attentionReasons: reasons, attentionLevel };
};

const getStudents = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, search, batch, type, status } = req.query;
    const filter = {};
    if (type) filter.studentType = type;
    if (batch) filter.batches = batch;
    if (status === "active") filter.isActive = true;
    if (status === "inactive") filter.isActive = false;

    if (search) {
      if (search.toUpperCase().startsWith("NV-")) {
        filter.studentId = { $regex: search, $options: "i" };
      } else {
        const users = await User.find({
          $or: [
            { name: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } },
          ],
          role: "student",
        }).select("_id");
        filter.user = { $in: users.map((u) => u._id) };
      }
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const students = await Student.find(filter)
      .populate("user", "name email phone isActive avatar lastLogin")
      .populate("batches", "name code batchType color")
      .populate("registrationSource.course", "name")
      .populate("registrationSource.batch", "name code")
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const total = await Student.countDocuments(filter);

    // Determine who has at least one active exam permission (batched query).
    const userIds = students.map((s) => s.user?._id).filter(Boolean);
    const permittedUserIds = new Set(
      (await ExamPermission.find({ student: { $in: userIds }, isActive: true })
        .distinct("student")
      ).map((id) => id.toString())
    );

    const enriched = students.map((s) => {
      const obj = s.toObject();
      const hasExamPermission = s.user?._id
        ? permittedUserIds.has(s.user._id.toString())
        : false;
      return { ...obj, ...computeAttention(obj, hasExamPermission) };
    });

    return apiResponse(res, 200, "Students retrieved", {
      students: enriched,
      total,
      page: parseInt(page),
      limit: parseInt(limit),
    });
  } catch (error) {
    next(error);
  }
};

const getStudentById = async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id)
      .populate("user", "name email phone isActive avatar lastLogin createdAt")
      .populate("batches", "name code batchType course schedule color")
      .populate("examPermissions", "title testType status batch")
      .populate("registrationSource.course", "name")
      .populate("registrationSource.batch", "name code");
    if (!student) throw new ApiError(404, "Student not found");

    const enrollments = await Enrollment.find({ student: student.user }).populate("course", "name");

    // Attendance / eligibility summary for the red-dot action panel.
    const activePermissions = await ExamPermission.find({
      student: student.user?._id || student.user,
      isActive: true,
    }).populate("exam", "title batch course testType status");

    const obj = student.toObject();
    const attention = computeAttention(obj, activePermissions.length > 0);

    return apiResponse(res, 200, "Student details", {
      student: { ...obj, ...attention },
      enrollments,
      activePermissions,
    });
  } catch (error) {
    next(error);
  }
};

const getMyProfile = async (req, res, next) => {
  try {
    let student = await Student.findOne({ user: req.user._id })
      .populate("user", "name email phone avatar")
      .populate("batches", "name code batchType course schedule color groups telegramGroupLink");
    if (!student) {
      student = await Student.create({
        user: req.user._id,
        studentId: `NV-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 9999)).padStart(4, "0")}`,
      });
      student = await student.populate("user", "name email phone avatar");
    }
    return apiResponse(res, 200, "Student profile", { student });
  } catch (error) {
    next(error);
  }
};

const updateMyProfile = async (req, res, next) => {
  try {
    const { phone } = req.body;
    if (phone) await User.findByIdAndUpdate(req.user._id, { phone });
    const student = await Student.findOneAndUpdate({ user: req.user._id }, req.body, { new: true });
    return apiResponse(res, 200, "Profile updated", { student });
  } catch (error) {
    next(error);
  }
};

const updateMyAvatar = async (req, res, next) => {
  try {
    const { avatarBase64 } = req.body;
    if (!avatarBase64 || !avatarBase64.startsWith("data:image/")) {
      throw new ApiError(400, "Invalid image data");
    }
    const sizeInBytes = Math.round((avatarBase64.length * 3) / 4);
    if (sizeInBytes > 200 * 1024) throw new ApiError(400, "Image too large. Max 200KB.");
    await Student.findOneAndUpdate({ user: req.user._id }, { avatarBase64 }, { upsert: true });
    return apiResponse(res, 200, "Avatar updated");
  } catch (error) {
    next(error);
  }
};

const updateStudent = async (req, res, next) => {
  try {
    const { name, phone } = req.body;
    const student = await Student.findById(req.params.id);
    if (!student) throw new ApiError(404, "Student not found");

    if (name || phone) {
      await User.findByIdAndUpdate(student.user, {
        ...(name && { name }),
        ...(phone && { phone }),
      });
    }

    const allowed = [
      "isActive", "studentType", "batches", "currentClass", "city", "school",
      "parentName", "parentPhone", "tags", "notes", "address",
    ];
    allowed.forEach((f) => {
      if (req.body[f] !== undefined) student[f] = req.body[f];
    });

    await student.save();

    // If the admin assigned batches here, auto-permit the student for every
    // released exam targeting those batches (keeps exam access in sync).
    if (Array.isArray(req.body.batches) && req.body.batches.length > 0) {
      const { syncBatchExamPermissionsForBatch } = require("../services/batch.service");
      for (const batchId of req.body.batches) {
        await syncBatchExamPermissionsForBatch(batchId).catch((err) =>
          console.error("Auto exam permission sync failed:", err.message)
        );
      }
    }

    const updated = await Student.findById(student._id).populate("user", "name email phone");
    return apiResponse(res, 200, "Student updated", { student: updated });
  } catch (error) {
    next(error);
  }
};

const deactivateStudent = async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) throw new ApiError(404, "Student not found");
    student.isActive = !student.isActive;
    await student.save();
    await User.findByIdAndUpdate(student.user, { isActive: student.isActive });
    return apiResponse(res, 200, student.isActive ? "Student activated" : "Student deactivated", { student });
  } catch (error) {
    next(error);
  }
};

const deleteStudent = async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) throw new ApiError(404, "Student not found");
    if (student.user) {
      await User.findByIdAndDelete(student.user);
    }
    await Student.findByIdAndDelete(req.params.id);
    return apiResponse(res, 200, "Student deleted successfully");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getStudents,
  getStudentById,
  getMyProfile,
  updateMyProfile,
  updateMyAvatar,
  updateStudent,
  deactivateStudent,
  deleteStudent,
};
