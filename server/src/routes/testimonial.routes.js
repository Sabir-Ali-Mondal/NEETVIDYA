const express = require("express");
const router = express.Router();
const Testimonial = require("../models/Testimonial");
const { protect } = require("../middleware/auth.middleware");
const { authorize } = require("../middleware/role.middleware");
const apiResponse = require("../utils/apiResponse");

router.get("/", async (req, res, next) => {
  try {
    const testimonials = await Testimonial.find({ isActive: true }).sort({ displayOrder: 1 });
    return apiResponse(res, 200, "Testimonials", { testimonials });
  } catch (error) {
    next(error);
  }
});

router.post("/", protect, authorize("admin"), async (req, res, next) => {
  try {
    const testimonial = await Testimonial.create(req.body);
    return apiResponse(res, 201, "Testimonial created", { testimonial });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
