const rateLimit = require("express-rate-limit");

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { success: false, message: "Too many attempts. Please try again after 15 minutes." },
});

const examLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 300,
  message: { success: false, message: "Too many requests during exam." },
});

module.exports = { authLimiter, examLimiter };
