const express = require("express");
const router = express.Router();
const Batch = require("../models/Batch");
const { protect } = require("../middleware/auth.middleware");
const { authorize } = require("../middleware/role.middleware");
const apiResponse = require("../utils/apiResponse");

router.get("/", protect, async (req, res, next) => {
  try {
    const batches = await Batch.find({ isActive: true })
      .populate("course", "name")
      .populate("assignedTeachers.teacher", "name")
      .sort({ createdAt: -1 });
    return apiResponse(res, 200, "Batches retrieved", { batches });
  } catch (error) {
    next(error);
  }
});

router.post("/", protect, authorize("admin"), async (req, res, next) => {
  try {
    const batch = await Batch.create({ ...req.body, createdBy: req.user._id });
    return apiResponse(res, 201, "Batch created", { batch });
  } catch (error) {
    next(error);
  }
});

router.put("/:id", protect, authorize("admin"), async (req, res, next) => {
  try {
    const batch = await Batch.findByIdAndUpdate(req.params.id, req.body, { new: true });
    return apiResponse(res, 200, "Batch updated", { batch });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
