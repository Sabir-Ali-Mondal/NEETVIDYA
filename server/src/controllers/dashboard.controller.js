const {
  getAdminDashboard: getAdminDashboardData,
  getStudentDashboard: getStudentDashboardData,
  getTeacherDashboard: getTeacherDashboardData,
} = require("../services/dashboard.service");
const apiResponse = require("../utils/apiResponse");

const getAdminDashboard = async (req, res, next) => {
  try {
    const data = await getAdminDashboardData();
    return apiResponse(res, 200, "Admin dashboard", data);
  } catch (error) {
    next(error);
  }
};

const getStudentDashboard = async (req, res, next) => {
  try {
    const data = await getStudentDashboardData(req.user._id);
    return apiResponse(res, 200, "Student dashboard", data);
  } catch (error) {
    next(error);
  }
};

const getTeacherDashboard = async (req, res, next) => {
  try {
    const data = await getTeacherDashboardData(req.user._id);
    return apiResponse(res, 200, "Teacher dashboard", data);
  } catch (error) {
    next(error);
  }
};

module.exports = { getAdminDashboard, getStudentDashboard, getTeacherDashboard };
