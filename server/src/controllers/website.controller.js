const {
  getHomepageData,
  getSection: getSectionData,
  updateSection: updateSectionData,
} = require("../services/website.service");
const apiResponse = require("../utils/apiResponse");

const getHomepage = async (req, res, next) => {
  try {
    const data = await getHomepageData();
    return apiResponse(res, 200, "Homepage data", data);
  } catch (error) {
    next(error);
  }
};

const getSection = async (req, res, next) => {
  try {
    const content = await getSectionData(req.params.section);
    return apiResponse(res, 200, "Section content", { content });
  } catch (error) {
    next(error);
  }
};

const updateSection = async (req, res, next) => {
  try {
    const content = await updateSectionData(req.params.section, req.body);
    return apiResponse(res, 200, "Section updated", { content });
  } catch (error) {
    next(error);
  }
};

module.exports = { getHomepage, getSection, updateSection };
