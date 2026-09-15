const Achievement = require("../models/Achievement");
const apiResponse = require("../utils/apiResponse");
const ApiError = require("../utils/apiError");

const getAchievements = async (req, res, next) => {
  try {
    const filter = { isActive: true };
    if (req.query.featured === "true") filter.featured = true;
    const achievements = await Achievement.find(filter).sort({ displayOrder: 1 });
    return apiResponse(res, 200, "Achievements", { achievements });
  } catch (error) {
    next(error);
  }
};

const createAchievement = async (req, res, next) => {
  try {
    const achievement = await Achievement.create({ ...req.body, createdBy: req.user._id });
    return apiResponse(res, 201, "Achievement created", { achievement });
  } catch (error) {
    next(error);
  }
};

const updateAchievement = async (req, res, next) => {
  try {
    const achievement = await Achievement.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!achievement) throw new ApiError(404, "Achievement not found");
    return apiResponse(res, 200, "Achievement updated", { achievement });
  } catch (error) {
    next(error);
  }
};

const deleteAchievement = async (req, res, next) => {
  try {
    const achievement = await Achievement.findByIdAndUpdate(req.params.id, { isActive: false });
    if (!achievement) throw new ApiError(404, "Achievement not found");
    return apiResponse(res, 200, "Achievement deleted");
  } catch (error) {
    next(error);
  }
};

module.exports = { getAchievements, createAchievement, updateAchievement, deleteAchievement };
