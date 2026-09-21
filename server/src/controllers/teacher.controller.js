const Teacher = require("../models/Teacher");
const User = require("../models/User");
const apiResponse = require("../utils/apiResponse");
const ApiError = require("../utils/apiError");
const { deleteFile } = require("../services/cloudinary.service");

const getTeachers = async (req, res, next) => {
  try {
    const teachers = await Teacher.find({})
      .populate("user", "name email phone isActive avatar")
      .populate("subject", "name code")
      .sort({ createdAt: -1 });
    return apiResponse(res, 200, "Teachers retrieved", { teachers });
  } catch (error) {
    next(error);
  }
};

const getPublicTeachers = async (req, res, next) => {
  try {
    const teachers = await Teacher.find({ isActive: true })
      .populate("user", "name avatar")
      .populate("subject", "name");
    return apiResponse(res, 200, "Faculty list", { teachers });
  } catch (error) {
    next(error);
  }
};

const getMyProfile = async (req, res, next) => {
  try {
    const teacher = await Teacher.findOne({ user: req.user._id })
      .populate("user", "name email phone avatar")
      .populate("subject", "name code");
    if (!teacher) throw new ApiError(404, "Teacher profile not found");
    return apiResponse(res, 200, "Teacher profile", { teacher });
  } catch (error) {
    next(error);
  }
};

const updatePermissions = async (req, res, next) => {
  try {
    const teacher = await Teacher.findByIdAndUpdate(
      req.params.id,
      { permissions: req.body },
      { new: true }
    );
    if (!teacher) throw new ApiError(404, "Teacher not found");
    return apiResponse(res, 200, "Permissions updated", { teacher });
  } catch (error) {
    next(error);
  }
};

const deactivateTeacher = async (req, res, next) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) throw new ApiError(404, "Teacher not found");
    teacher.isActive = !teacher.isActive;
    await teacher.save();
    await User.findByIdAndUpdate(teacher.user, { isActive: teacher.isActive });
    return apiResponse(res, 200, teacher.isActive ? "Teacher activated" : "Teacher deactivated", {
      teacher,
    });
  } catch (error) {
    next(error);
  }
};

const updateTeacher = async (req, res, next) => {
  try {
    const { name, phone, qualification, experience, specialisation, bio, subject } = req.body;
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) throw new ApiError(404, "Teacher not found");

    if (name || phone) {
      await User.findByIdAndUpdate(teacher.user, {
        ...(name && { name }),
        ...(phone && { phone }),
      });
    }

    if (qualification !== undefined) teacher.qualification = qualification;
    if (experience !== undefined) teacher.experience = experience;
    if (specialisation !== undefined) teacher.specialisation = specialisation;
    if (bio !== undefined) teacher.bio = bio;
    if (subject !== undefined) teacher.subject = subject || null;

    // Faculty image shown in the public faculty area. The admin uploads a
    // Cloudinary image and sends back its URL + public id, or an empty string
    // to clear the image and fall back to the default placeholder.
    if (req.body.photoUrl !== undefined) {
      const nextUrl = req.body.photoUrl || undefined;
      const nextPublicId = req.body.photoPublicId || undefined;

      // Drop the previously uploaded asset so replaced images don't pile up.
      if (teacher.photoPublicId && teacher.photoPublicId !== nextPublicId) {
        await deleteFile(teacher.photoPublicId);
      }

      teacher.photoUrl = nextUrl;
      teacher.photoPublicId = nextPublicId;
    }

    await teacher.save();
    const updated = await Teacher.findById(teacher._id).populate("user", "name email phone isActive avatar");
    return apiResponse(res, 200, "Teacher updated successfully", { teacher: updated });
  } catch (error) {
    next(error);
  }
};

const deleteTeacher = async (req, res, next) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) throw new ApiError(404, "Teacher not found");

    // Remove the uploaded faculty image from Cloudinary (best-effort).
    if (teacher.photoPublicId) {
      await deleteFile(teacher.photoPublicId);
    }

    // Cascade: the login account is owned by the faculty profile.
    if (teacher.user) {
      await User.findByIdAndDelete(teacher.user);
    }

    await Teacher.findByIdAndDelete(req.params.id);
    return apiResponse(res, 200, "Teacher deleted successfully");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTeachers,
  getPublicTeachers,
  getMyProfile,
  updatePermissions,
  deactivateTeacher,
  updateTeacher,
  deleteTeacher,
};
