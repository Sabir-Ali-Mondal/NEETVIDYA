const Lecture = require("../models/Lecture");
const apiResponse = require("../utils/apiResponse");
const ApiError = require("../utils/apiError");

const getLectures = async (req, res, next) => {
  try {
    const filter = { isActive: true };
    if (req.query.course) filter.course = req.query.course;
    if (req.query.subject) filter.subject = req.query.subject;
    if (req.query.chapter) filter.chapter = req.query.chapter;
    const lectures = await Lecture.find(filter)
      .populate("subject", "name")
      .populate("chapter", "name")
      .populate("teacher", "name")
      .sort({ displayOrder: 1 });
    return apiResponse(res, 200, "Lectures retrieved", { lectures });
  } catch (error) {
    next(error);
  }
};

const createLecture = async (req, res, next) => {
  try {
    const lecture = await Lecture.create({ ...req.body, teacher: req.user._id });
    return apiResponse(res, 201, "Lecture created", { lecture });
  } catch (error) {
    next(error);
  }
};

const updateLecture = async (req, res, next) => {
  try {
    const lecture = await Lecture.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!lecture) throw new ApiError(404, "Lecture not found");
    return apiResponse(res, 200, "Lecture updated", { lecture });
  } catch (error) {
    next(error);
  }
};

const deleteLecture = async (req, res, next) => {
  try {
    const lecture = await Lecture.findByIdAndUpdate(req.params.id, { isActive: false });
    if (!lecture) throw new ApiError(404, "Lecture not found");
    return apiResponse(res, 200, "Lecture deleted");
  } catch (error) {
    next(error);
  }
};

module.exports = { getLectures, createLecture, updateLecture, deleteLecture };
