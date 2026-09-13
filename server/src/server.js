const dotenv = require("dotenv");
dotenv.config();

const app = require("./app");
const connectDB = require("./config/db");
const { initTelegramBot } = require("./config/telegram");

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`NEETVIDYA Server running on port ${PORT}`);
    });

    try {
      initTelegramBot(app);
    } catch (err) {
      console.log("Telegram bot not configured, skipping.");
    }
  })
  .catch((err) => {
    console.error("Database connection failed:", err.message);
    app.listen(PORT, () => {
      console.log(`NEETVIDYA Server running in fallback mode on port ${PORT}`);
    });
  });

process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
});
