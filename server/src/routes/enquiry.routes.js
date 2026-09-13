const express = require("express");
const router = express.Router();
const Enquiry = require("../models/Enquiry");
const { protect } = require("../middleware/auth.middleware");
const { authorize } = require("../middleware/role.middleware");
const apiResponse = require("../utils/apiResponse");

router.post("/", async (req, res, next) => {
  try {
    const { name, email, phone, course, message } = req.body;
    const enquiry = await Enquiry.create({ name, email, phone, course, message, source: "WEBSITE" });
    return apiResponse(res, 201, "Enquiry submitted successfully", { enquiry });
  } catch (error) {
    next(error);
  }
});

router.get("/", protect, authorize("admin"), async (req, res, next) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const filter = {};
    if (status) filter.status = status;
    const skip = (page - 1) * limit;
    const enquiries = await Enquiry.find(filter).skip(skip).limit(parseInt(limit)).sort({ createdAt: -1 });
    const total = await Enquiry.countDocuments(filter);
    return apiResponse(res, 200, "Enquiries retrieved", { enquiries, total });
  } catch (error) {
    next(error);
  }
});

router.put("/:id", protect, authorize("admin"), async (req, res, next) => {
  try {
    const enquiry = await Enquiry.findByIdAndUpdate(req.params.id, req.body, { new: true });
    return apiResponse(res, 200, "Enquiry updated", { enquiry });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
