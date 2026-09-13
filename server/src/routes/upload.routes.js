const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth.middleware");
const { authorize } = require("../middleware/role.middleware");
const { uploadImage, uploadVideo, uploadPDF } = require("../middleware/upload.middleware");
const { uploadFile } = require("../services/cloudinary.service");
const apiResponse = require("../utils/apiResponse");
const FOLDERS = require("../constants/cloudinaryFolders");

router.post("/image", protect, authorize("teacher", "admin"), uploadImage, async (req, res, next) => {
  try {
    if (!req.file) return apiResponse(res, 400, "No image file provided");
    const folder = req.body.folder || FOLDERS.WEBSITE;
    const result = await uploadFile(req.file.buffer, folder, "image");
    return apiResponse(res, 200, "Image uploaded", result);
  } catch (error) {
    next(error);
  }
});

router.post("/video", protect, authorize("teacher", "admin"), uploadVideo, async (req, res, next) => {
  try {
    if (!req.file) return apiResponse(res, 400, "No video file provided");
    const result = await uploadFile(req.file.buffer, FOLDERS.LECTURES, "video");
    return apiResponse(res, 200, "Video uploaded", result);
  } catch (error) {
    next(error);
  }
});

router.post("/pdf", protect, authorize("teacher", "admin"), uploadPDF, async (req, res, next) => {
  try {
    if (!req.file) return apiResponse(res, 400, "No PDF file provided");
    const result = await uploadFile(req.file.buffer, FOLDERS.MATERIALS, "raw");
    return apiResponse(res, 200, "PDF uploaded", result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
