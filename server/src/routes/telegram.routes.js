const express = require("express");
const router = express.Router();
const TelegramConfig = require("../models/TelegramConfig");
const { protect } = require("../middleware/auth.middleware");
const { authorize } = require("../middleware/role.middleware");
const apiResponse = require("../utils/apiResponse");
const { broadcastMessage } = require("../services/telegram.service");

router.get("/config", protect, authorize("admin"), async (req, res, next) => {
  try {
    let config = await TelegramConfig.findOne();
    if (!config) config = await TelegramConfig.create({});
    const safeConfig = { ...config.toObject() };
    if (safeConfig.botToken) {
      safeConfig.botToken = safeConfig.botToken.substring(0, 8) + "...";
    }
    return apiResponse(res, 200, "Telegram config", { config: safeConfig });
  } catch (error) {
    next(error);
  }
});

router.put("/config", protect, authorize("admin"), async (req, res, next) => {
  try {
    const config = await TelegramConfig.findOneAndUpdate(
      {},
      { $set: req.body },
      { new: true, upsert: true }
    );
    return apiResponse(res, 200, "Telegram config updated", { config });
  } catch (error) {
    next(error);
  }
});

router.post("/broadcast", protect, authorize("admin"), async (req, res, next) => {
  try {
    const { message } = req.body;
    await broadcastMessage(message);
    return apiResponse(res, 200, "Message broadcasted");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
