const Material = require("../models/Material");
const Student = require("../models/Student");
const apiResponse = require("../utils/apiResponse");
const ApiError = require("../utils/apiError");
const { uploadFile } = require("../services/cloudinary.service");
const FOLDERS = require("../constants/cloudinaryFolders");

const getMaterials = async (req, res, next) => {
  try {
    const filter = { isActive: true };
    if (req.query.batch) filter.batch = req.query.batch;
    if (req.query.course) filter.course = req.query.course;
    if (req.query.subject) filter.subject = req.query.subject;
    if (req.query.chapter) filter.chapter = req.query.chapter;

    // For students: only show materials from their batch
    if (req.user && req.user.role === "student") {
      const student = await Student.findOne({ user: req.user._id });
      if (student?.batches?.length > 0) {
        filter.$or = [{ batch: { $in: student.batches } }, { batch: { $exists: false } }];
      }
    }

    const materials = await Material.find(filter)
      .populate("subject", "name")
      .populate("batch", "name code")
      .populate("chapter", "name")
      .populate("uploadedBy", "name")
      .sort({ createdAt: -1 });
    return apiResponse(res, 200, "Materials retrieved", { materials });
  } catch (error) {
    next(error);
  }
};

const getMyBatchMaterials = async (req, res, next) => {
  try {
    const student = await Student.findOne({ user: req.user._id });
    const filter = { isActive: true };
    if (student?.batches?.length > 0) {
      filter.$or = [{ batch: { $in: student.batches } }, { batch: { $exists: false } }];
    }

    const materials = await Material.find(filter)
      .populate("subject", "name")
      .populate("batch", "name code")
      .populate("chapter", "name")
      .populate("uploadedBy", "name")
      .sort({ createdAt: -1 });
    return apiResponse(res, 200, "My batch materials", { materials });
  } catch (error) {
    next(error);
  }
};

const createMaterial = async (req, res, next) => {
  try {
    const { title, subject, batch, course, unit, chapter, type, fileUrl, description } = req.body;

    // Unit → Chapter → Material is mandatory so students see a course structure.
    if (!batch) throw new ApiError(400, "A batch is required");
    if (!unit) throw new ApiError(400, "A unit is required");
    if (!chapter) throw new ApiError(400, "A chapter is required");

    let finalUrl = fileUrl;
    let filePublicId = "external";
    let sourceType = "LINK";

    // If file was uploaded via multipart (multer) → real Cloudinary upload
    if (req.file) {
      sourceType = "UPLOAD";
      const mime = req.file.mimetype || "";
      const resourceType = mime.startsWith("image")
        ? "image"
        : mime.startsWith("video")
        ? "video"
        : "raw";
      const result = await uploadFile(req.file.buffer, FOLDERS.MATERIALS, resourceType);
      finalUrl = result.url;
      filePublicId = result.publicId;
    }

    if (!finalUrl) {
      throw new ApiError(400, "Either upload a file or provide an external URL");
    }

    const materialData = {
      title,
      type: type || "PDF",
      fileUrl: finalUrl,
      filePublicId,
      sourceType,
      description,
      batch,
      unit,
      chapter,
      uploadedBy: req.user._id,
    };
    if (subject) materialData.subject = subject;
    if (course) materialData.course = course;
    if (req.file) materialData.fileSize = req.file.size;

    const material = await Material.create(materialData);
    return apiResponse(res, 201, "Material created", { material });
  } catch (error) {
    next(error);
  }
};

const deleteMaterial = async (req, res, next) => {
  try {
    const material = await Material.findByIdAndUpdate(req.params.id, { isActive: false });
    if (!material) throw new ApiError(404, "Material not found");
    return apiResponse(res, 200, "Material deleted");
  } catch (error) {
    next(error);
  }
};

// Student course-like view: Unit → Chapter → Materials for the student's batch
const getMaterialTree = async (req, res, next) => {
  try {
    const Unit = require("../models/Unit");
    const Chapter = require("../models/Chapter");

    let batchIds = [];
    if (req.user.role === "student") {
      const student = await Student.findOne({ user: req.user._id });
      batchIds = (student?.batches || []).map((b) => b.toString());
    }
    const batchFilter = req.query.batch
      ? { batch: req.query.batch }
      : batchIds.length
      ? { batch: { $in: batchIds } }
      : {};

    const materials = await Material.find({ isActive: true, ...batchFilter })
      .populate("subject", "name")
      .sort({ createdAt: -1 });

    const unitIds = [...new Set(materials.map((m) => m.unit?.toString()).filter(Boolean))];
    const chapterIds = [...new Set(materials.map((m) => m.chapter?.toString()).filter(Boolean))];
    const units = await Unit.find({ _id: { $in: unitIds } }).sort({ displayOrder: 1 });
    const chapters = await Chapter.find({ _id: { $in: chapterIds } }).sort({ displayOrder: 1 });

    const tree = units.map((u) => ({
      _id: u._id,
      name: u.name,
      description: u.description,
      chapters: chapters
        .filter((c) => c.unit?.toString() === u._id.toString())
        .map((c) => ({
          _id: c._id,
          name: c.name,
          materials: materials.filter((m) => m.chapter?.toString() === c._id.toString()),
        })),
    }));

    return apiResponse(res, 200, "Material tree", { tree });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getMaterials,
  getMyBatchMaterials,
  createMaterial,
  deleteMaterial,
  getMaterialTree,
};
