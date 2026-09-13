const TelegramConfig = require("../models/TelegramConfig");
const Enquiry = require("../models/Enquiry");
const { getBot } = require("../config/telegram");

const handleIncomingMessage = async (msg) => {
  try {
    const config = await TelegramConfig.findOne();
    const chatId = msg.chat.id;
    const text = msg.text || "";
    const senderName = msg.from ? `${msg.from.first_name || ""} ${msg.from.last_name || ""}`.trim() : "Unknown";

    await Enquiry.create({
      name: senderName,
      email: "telegram@neetvidya.com",
      message: text,
      source: "TELEGRAM",
      status: "PENDING",
    });

    const bot = getBot();
    if (!bot) return;

    if (config?.autoReplyMessage) {
      await bot.sendMessage(chatId, config.autoReplyMessage).catch(() => {});
    }

    if (config?.linkedGroupId) {
      await bot.sendMessage(
        config.linkedGroupId,
        `New Telegram Enquiry\nFrom: ${senderName}\nMessage: ${text}`
      ).catch(() => {});
    }
  } catch (error) {
    console.error("Telegram message handling error:", error.message);
  }
};

const broadcastMessage = async (text) => {
  const bot = getBot();
  const config = await TelegramConfig.findOne();
  if (!bot || !config || !config.linkedGroupId) {
    return false;
  }
  await bot.sendMessage(config.linkedGroupId, text);
  return true;
};

module.exports = { handleIncomingMessage, broadcastMessage };
