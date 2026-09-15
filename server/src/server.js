const dotenv = require("dotenv");
dotenv.config();

const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`NEETVIDYA Server running on port ${PORT}`);
    });
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
