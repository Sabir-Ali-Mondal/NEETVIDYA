const mongoose = require("mongoose");

const telegramConfigSchema = new mongoose.Schema(
  {
    botToken: { type: String },
    webhookUrl: { type: String },
    autoReplyMessage: {
      type: String,
      default: "Thank you for contacting NEETVIDYA. Our team will respond shortly.",
    },
    linkedGroupId: { type: String },
    isEnabled: { type: Boolean, default: true },
    lastWebhookSet: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model("TelegramConfig", telegramConfigSchema);
