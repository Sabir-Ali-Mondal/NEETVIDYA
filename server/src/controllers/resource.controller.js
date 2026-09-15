const CourseResource = require("../models/CourseResource");
const apiResponse = require("../utils/apiResponse");
const ApiError = require("../utils/apiError");

const getResources = async (req, res, next) => {
  try {
    const filter = { isActive: true };
    if (req.query.course) filter.course = req.query.course;
    if (req.query.isPublic === "true") filter.isPublic = true;
    const resources = await CourseResource.find(filter).sort({ displayOrder: 1 });
    return apiResponse(res, 200, "Resources", { resources });
  } catch (error) {
    next(error);
  }
};

const createResource = async (req, res, next) => {
  try {
    const resource = await CourseResource.create({ ...req.body, addedBy: req.user._id });
    return apiResponse(res, 201, "Resource created", { resource });
  } catch (error) {
    next(error);
  }
};

const deleteResource = async (req, res, next) => {
  try {
    const resource = await CourseResource.findByIdAndUpdate(req.params.id, { isActive: false });
    if (!resource) throw new ApiError(404, "Resource not found");
    return apiResponse(res, 200, "Resource deleted");
  } catch (error) {
    next(error);
  }
};

module.exports = { getResources, createResource, deleteResource };
