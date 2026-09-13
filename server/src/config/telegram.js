const TelegramBot = require("node-telegram-bot-api");

let botInstance = null;

const initTelegramBot = async (app) => {
  try {
    let TelegramConfig;
    try {
      TelegramConfig = require("../models/TelegramConfig");
    } catch {
      return null;
    }
    
    const config = await TelegramConfig.findOne().catch(() => null);
    const token = config?.botToken || process.env.TELEGRAM_BOT_TOKEN;
    if (!token) {
      return null;
    }

    botInstance = new TelegramBot(token, { polling: false });

    if (config?.webhookUrl) {
      await botInstance.setWebHook(config.webhookUrl).catch(() => {});
      config.lastWebhookSet = new Date();
      await config.save().catch(() => {});
    }

    if (app) {
      app.post("/api/telegram/webhook", (req, res) => {
        if (botInstance) {
          botInstance.processUpdate(req.body);
        }
        res.sendStatus(200);
      });
    }

    console.log("Telegram Bot initialized");
    return botInstance;
  } catch (error) {
    console.log("Telegram Bot init error:", error.message);
    return null;
  }
};

const getBot = () => botInstance;

module.exports = { initTelegramBot, getBot };
