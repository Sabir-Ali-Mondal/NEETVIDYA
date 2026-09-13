const express = require("express");
const router = express.Router();
const Student = require("../models/Student");
const User = require("../models/User");
const { protect } = require("../middleware/auth.middleware");
const { authorize } = require("../middleware/role.middleware");
const apiResponse = require("../utils/apiResponse");
const ApiError = require("../utils/apiError");

// GET all students (admin/teacher)
router.get("/", protect, authorize("admin", "teacher"), async (req, res, next) => {
  try {
    const { batch, type, page = 1, limit = 20, search } = req.query;
    const filter = {};
    if (type) filter.studentType = type;
    if (batch) filter.batches = batch;

    // Handle search (by name, email, student ID)
    let userIds;
    if (search) {
      // Search by studentId directly
      if (search.toUpperCase().startsWith("NV-")) {
        filter.studentId = { $regex: search, $options: "i" };
      } else {
        // Search users by name or email
        const users = await User.find({
          $or: [
            { name: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } },
          ],
          role: "student",
        }).select("_id");
        userIds = users.map((u) => u._id);
        filter.user = { $in: userIds };
      }
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const students = await Student.find(filter)
      .populate("user", "name email phone isActive avatar")
      .populate("batches", "name code batchType")
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
});

// GET my profile (student self)
router.get("/my", protect, authorize("student"), async (req, res, next) => {
  try {
    let student = await Student.findOne({ user: req.user._id })
      .populate("user", "name email phone avatar")
      .populate("batches", "name code batchType course schedule");
    if (!student) {
      student = await Student.create({ user: req.user._id });
    }
    return apiResponse(res, 200, "Student profile", { student });
  } catch (error) {
    next(error);
  }
});

// PUT my avatar (student self)
router.put("/my/avatar", protect, authorize("student"), async (req, res, next) => {
  try {
    const { avatarBase64 } = req.body;
    if (!avatarBase64 || !avatarBase64.startsWith("data:image/")) {
      throw new ApiError(400, "Invalid image data");
    }
    await Student.findOneAndUpdate({ user: req.user._id }, { avatarBase64 });
    return apiResponse(res, 200, "Avatar updated");
  } catch (error) {
    next(error);
  }
});

// GET student by ID
router.get("/:id", protect, async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id)
      .populate("user", "name email phone isActive avatar")
      .populate("batches", "name code batchType");
    if (!student) throw new ApiError(404, "Student not found");
    return apiResponse(res, 200, "Student details", { student });
  } catch (error) {
    next(error);
  }
});

// PUT update student (admin)
router.put("/:id", protect, authorize("admin"), async (req, res, next) => {
  try {
    const allowed = ["isActive", "studentType", "batches", "currentClass", "city", "school", "parentName", "parentPhone", "tags", "notes"];
    const updates = {};
    allowed.forEach((f) => { if (req.body[f] !== undefined) updates[f] = req.body[f]; });

    const student = await Student.findByIdAndUpdate(req.params.id, updates, { new: true })
      .populate("user", "name email phone");
    if (!student) throw new ApiError(404, "Student not found");
    return apiResponse(res, 200, "Student updated", { student });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
