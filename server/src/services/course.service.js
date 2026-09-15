const Course = require("../models/Course");
const Subject = require("../models/Subject");
const generateSlug = require("../utils/slug");
const ApiError = require("../utils/apiError");

const createCourse = async (data, userId) => {
  const slug = generateSlug(data.name);
  const existing = await Course.findOne({ slug });
  if (existing) throw new ApiError(400, "Course with this name already exists");
  const course = await Course.create({ ...data, slug, createdBy: userId });
  return course;
};

const getCourses = async (filter = {}) => {
  const courses = await Course.find({ isActive: true, ...filter })
    .populate("subjects", "name code")
    .sort({ displayOrder: 1 });
  return courses;
};

const getCourseById = async (id) => {
  const course = await Course.findById(id).populate("subjects");
  if (!course) throw new ApiError(404, "Course not found");
  return course;
};

const updateCourse = async (id, data) => {
  if (data.name) data.slug = generateSlug(data.name);
  const course = await Course.findByIdAndUpdate(id, data, { new: true });
  if (!course) throw new ApiError(404, "Course not found");
  return course;
};

const deleteCourse = async (id) => {
  await Course.findByIdAndUpdate(id, { isActive: false });
};

const addSubjectToCourse = async (courseId, subjectData) => {
  const subject = await Subject.create({ ...subjectData, course: courseId });
  await Course.findByIdAndUpdate(courseId, { $push: { subjects: subject._id } });
  return subject;
};

module.exports = {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  addSubjectToCourse,
};
