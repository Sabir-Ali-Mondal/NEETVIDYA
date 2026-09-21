const Material = require("../models/Material");
const Student = require("../models/Student");
const apiResponse = require("../utils/apiResponse");
const ApiError = require("../utils/apiError");
const { notifyBatch } = require("../services/notification.service");
const { uploadFile } = require("../services/cloudinary.service");
const FOLDERS = require("../constants/cloudinaryFolders");

// Batch ids a user may see materials for. Students → their enrolled batches
// only; staff → null (no restriction).
const scopedBatchIds = async (user) => {
  if (!user || user.role !== "student") return null;
  const student = await Student.findOne({ user: user._id });
  return (student?.batches || []).map((b) => b.toString());
};

const populateMaterials = (query) =>
  query
    .populate("subject", "name")
    .populate("batch", "name code")
    .populate("unit", "name")
    .populate("chapter", "name")
    .populate("uploadedBy", "name")
    .sort({ createdAt: -1 });

/**
 * GET /materials
 * Students are strictly limited to their own batches — a `batch` query param
 * is ignored for them so they can never read another batch's library.
 * Staff may filter freely by batch/course/subject/chapter.
 */
const getMaterials = async (req, res, next) => {
  try {
    const batchIds = await scopedBatchIds(req.user);

    if (batchIds) {
      const filter = {
        isActive: true,
        batch: { $in: batchIds },
        ...(req.query.subject ? { subject: req.query.subject } : {}),
        ...(req.query.chapter ? { chapter: req.query.chapter } : {}),
      };
      const materials = await populateMaterials(Material.find(filter));
      return apiResponse(res, 200, "Materials retrieved", { materials });
    }

    const filter = { isActive: true };
    if (req.query.batch) filter.batch = req.query.batch;
    if (req.query.course) filter.course = req.query.course;
    if (req.query.subject) filter.subject = req.query.subject;
    if (req.query.chapter) filter.chapter = req.query.chapter;

    const materials = await populateMaterials(Material.find(filter));
    return apiResponse(res, 200, "Materials retrieved", { materials });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /materials/my — always the caller's own batches (students only).
 */
const getMyBatchMaterials = async (req, res, next) => {
  try {
    const batchIds = await scopedBatchIds(req.user);
    const filter = { isActive: true, batch: { $in: batchIds || [] } };

    const materials = await populateMaterials(Material.find(filter));
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
      const originalName = (req.file.originalname || "").toLowerCase();

      // PDFs must be uploaded as `image` so Cloudinary streams them inline and
      // honours the account's "allow PDF/ZIP delivery" setting. Uploading them
      // as `raw` forces a download and breaks in-browser preview.
      const isPdf = mime === "application/pdf" || originalName.endsWith(".pdf");

      let resourceType = "raw";
      if (mime.startsWith("image") || isPdf) {
        resourceType = "image";
      } else if (mime.startsWith("video")) {
        resourceType = "video";
      }

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

    // Batch-scoped notification — only students in this batch are notified.
    await notifyBatch(batch, {
      title: "New study material",
      message: `${title} has been added to your batch library.`,
      type: "MATERIAL",
      createdBy: req.user._id,
    });

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

/**
 * GET /materials/tree — Unit → Chapter → Materials.
 * Students are always forced to their own batches; a `batch` query param is
 * ignored for them so they cannot browse another batch's library.
 */
const getMaterialTree = async (req, res, next) => {
  try {
    const Unit = require("../models/Unit");
    const Chapter = require("../models/Chapter");

    const batchIds = await scopedBatchIds(req.user);

    let batchFilter;
    if (batchIds) {
      // Student: own batches only — ignore any requested batch.
      batchFilter = { batch: { $in: batchIds } };
    } else if (req.query.batch) {
      batchFilter = { batch: req.query.batch };
    } else {
      batchFilter = {};
    }

    const materials = await Material.find({ isActive: true, ...batchFilter })
      .populate("subject", "name")
      .populate("batch", "name code")
      .sort({ createdAt: -1 });

    const unitIds = [...new Set(materials.map((m) => m.unit?.toString()).filter(Boolean))];
    const chapterIds = [...new Set(materials.map((m) => m.chapter?.toString()).filter(Boolean))];
    const units = await Unit.find({ _id: { $in: unitIds } }).sort({ displayOrder: 1 });
    const chapters = await Chapter.find({ _id: { $in: chapterIds } }).sort({ displayOrder: 1 });

    // Nested tree keyed by id at every level so identically-named units or
    // chapters in different batches never merge: batch → subject → unit → chapter.
    const batchMap = new Map();

    for (const m of materials) {
      const bKey = m.batch?._id ? String(m.batch._id) : "unassigned";
      if (!batchMap.has(bKey)) {
        batchMap.set(bKey, {
          _id: m.batch?._id || null,
          name: m.batch?.name || "Unassigned batch",
          code: m.batch?.code || "",
          subjects: new Map(),
        });
      }
      const batch = batchMap.get(bKey);

      const subjKey = m.subject?._id ? String(m.subject._id) : "unassigned";
      if (!batch.subjects.has(subjKey)) {
        batch.subjects.set(subjKey, {
          _id: m.subject?._id || null,
          name: m.subject?.name || "No subject",
          units: new Map(),
        });
      }
      const subject = batch.subjects.get(subjKey);

      const unit = units.find((u) => String(u._id) === String(m.unit));
      const unitKey = unit ? String(unit._id) : "unassigned";
      if (!subject.units.has(unitKey)) {
        subject.units.set(unitKey, {
          _id: unit?._id || null,
          name: unit?.name || "Unsorted unit",
          description: unit?.description,
          chapters: new Map(),
        });
      }
      const unitNode = subject.units.get(unitKey);

      const chapter = chapters.find((c) => String(c._id) === String(m.chapter));
      const chapterKey = chapter ? String(chapter._id) : "unassigned";
      if (!unitNode.chapters.has(chapterKey)) {
        unitNode.chapters.set(chapterKey, {
          _id: chapter?._id || null,
          name: chapter?.name || "Unsorted chapter",
          materials: [],
        });
      }
      unitNode.chapters.get(chapterKey).materials.push(m);
    }

    // Convert Maps → arrays for JSON serialisation.
    const tree = [...batchMap.values()].map((batch) => ({
      ...batch,
      subjects: [...batch.subjects.values()].map((subject) => ({
        ...subject,
        units: [...subject.units.values()].map((unit) => ({
          ...unit,
          chapters: [...unit.chapters.values()],
        })),
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
