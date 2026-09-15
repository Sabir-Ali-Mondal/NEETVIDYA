const apiResponse = require("../utils/apiResponse");
const {
  createCourse: createCourseService,
  getCourses: getCoursesService,
  getCourseById: getCourseByIdService,
  updateCourse: updateCourseService,
  deleteCourse: deleteCourseService,
} = require("../services/course.service");

const getCourses = async (req, res, next) => {
  try {
    const courses = await getCoursesService();
    return apiResponse(res, 200, "Courses retrieved", { courses });
  } catch (error) {
    next(error);
  }
};

const getCourseById = async (req, res, next) => {
  try {
    const course = await getCourseByIdService(req.params.id);
    return apiResponse(res, 200, "Course details", { course });
  } catch (error) {
    next(error);
  }
};

const createCourse = async (req, res, next) => {
  try {
    const course = await createCourseService(req.body, req.user._id);
    return apiResponse(res, 201, "Course created", { course });
  } catch (error) {
    next(error);
  }
};

const updateCourse = async (req, res, next) => {
  try {
    const course = await updateCourseService(req.params.id, req.body);
    return apiResponse(res, 200, "Course updated", { course });
  } catch (error) {
    next(error);
  }
};

const deleteCourse = async (req, res, next) => {
  try {
    const course = await deleteCourseService(req.params.id);
    return apiResponse(res, 200, "Course deactivated", { course });
  } catch (error) {
    next(error);
  }
};

module.exports = { getCourses, getCourseById, createCourse, updateCourse, deleteCourse };
