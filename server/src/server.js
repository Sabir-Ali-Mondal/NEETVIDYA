const dotenv = require("dotenv");
dotenv.config();

const app = require("./app");
const connectDB = require("./config/db");
const { isEmailConfigured } = require("./services/email.service");

const PORT = process.env.PORT || 5000;

// Make a dead mailer visible at boot instead of only after a student registers.
const warnIfMailerUnusable = () => {
  if (isEmailConfigured()) {
    console.log("Mailer ready (Resend API key configured)");
  } else {
    console.warn(
      "Mailer NOT configured - verification and password-reset emails will not be delivered. Set RESEND_API_KEY (and EMAIL_FROM once your domain is verified)."
    );
  }
};

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`NEETVIDYA Server running on port ${PORT}`);
      warnIfMailerUnusable();
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err.message);
    app.listen(PORT, () => {
      console.log(`NEETVIDYA Server running in fallback mode on port ${PORT}`);
      warnIfMailerUnusable();
    });
  });

process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
});
