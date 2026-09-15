const Enquiry = require("../models/Enquiry");
const apiResponse = require("../utils/apiResponse");
const ApiError = require("../utils/apiError");

const submitEnquiry = async (req, res, next) => {
  try {
    const enquiry = await Enquiry.create({ ...req.body, source: "WEBSITE" });
    return apiResponse(res, 201, "Enquiry submitted", { enquiry });
  } catch (error) {
    next(error);
  }
};

const getEnquiries = async (req, res, next) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const filter = {};
    if (status && status !== "All") filter.status = status;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const enquiries = await Enquiry.find(filter)
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });
    const total = await Enquiry.countDocuments(filter);
    return apiResponse(res, 200, "Enquiries", { enquiries, total });
  } catch (error) {
    next(error);
  }
};

const updateEnquiry = async (req, res, next) => {
  try {
    const enquiry = await Enquiry.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!enquiry) throw new ApiError(404, "Enquiry not found");
    return apiResponse(res, 200, "Enquiry updated", { enquiry });
  } catch (error) {
    next(error);
  }
};

const deleteEnquiry = async (req, res, next) => {
  try {
    const enquiry = await Enquiry.findByIdAndDelete(req.params.id);
    if (!enquiry) throw new ApiError(404, "Enquiry not found");
    return apiResponse(res, 200, "Enquiry deleted");
  } catch (error) {
    next(error);
  }
};

module.exports = { submitEnquiry, getEnquiries, updateEnquiry, deleteEnquiry };
