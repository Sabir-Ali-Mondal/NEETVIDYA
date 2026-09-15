const ContactSettings = require("../models/ContactSettings");
const apiResponse = require("../utils/apiResponse");

const getSettings = async (req, res, next) => {
  try {
    let settings = await ContactSettings.findOne();
    if (!settings) settings = await ContactSettings.create({});
    return apiResponse(res, 200, "Contact settings", { settings });
  } catch (error) {
    next(error);
  }
};

const updateSettings = async (req, res, next) => {
  try {
    const settings = await ContactSettings.findOneAndUpdate(
      {},
      { $set: req.body },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    return apiResponse(res, 200, "Contact settings updated", { settings });
  } catch (error) {
    next(error);
  }
};

module.exports = { getSettings, updateSettings, ContactSettings };
