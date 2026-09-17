const Student = require("../models/Student");
const User = require("../models/User");
const Enrollment = require("../models/Enrollment");
const apiResponse = require("../utils/apiResponse");
const ApiError = require("../utils/apiError");

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
      .populate("user", "name email phone isActive avatar")
      .populate("batches", "name code batchType color")
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const total = await Student.countDocuments(filter);
    return apiResponse(res, 200, "Students retrieved", {
      students,
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
      .populate("user", "name email phone isActive avatar lastLogin")
      .populate("batches", "name code batchType course schedule color")
      .populate("examPermissions", "title testType status batch");
    if (!student) throw new ApiError(404, "Student not found");
    const enrollments = await Enrollment.find({ student: student.user }).populate("course", "name");
    return apiResponse(res, 200, "Student details", { student, enrollments });
  } catch (error) {
    next(error);
  }
};

const getMyProfile = async (req, res, next) => {
  try {
    let student = await Student.findOne({ user: req.user._id })
      .populate("user", "name email phone avatar")
      .populate("batches", "name code batchType course schedule color");
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
