const Material = require("../models/Material");
const apiResponse = require("../utils/apiResponse");
const ApiError = require("../utils/apiError");

const getMaterials = async (req, res, next) => {
  try {
    const filter = { isActive: true };
    if (req.query.course) filter.course = req.query.course;
    if (req.query.subject) filter.subject = req.query.subject;
    if (req.query.chapter) filter.chapter = req.query.chapter;
    const materials = await Material.find(filter)
      .populate("subject", "name")
      .populate("chapter", "name")
      .populate("uploadedBy", "name")
      .sort({ createdAt: -1 });
    return apiResponse(res, 200, "Materials retrieved", { materials });
  } catch (error) {
    next(error);
  }
};

const createMaterial = async (req, res, next) => {
  try {
    const material = await Material.create({ ...req.body, uploadedBy: req.user._id });
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

module.exports = { getMaterials, createMaterial, deleteMaterial };
