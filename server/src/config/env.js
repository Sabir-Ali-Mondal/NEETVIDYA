const requiredVars = [
  "JWT_SECRET",
];

const validateEnv = () => {
  const missing = requiredVars.filter((v) => !process.env[v]);
  if (missing.length > 0) {
    console.warn(`Missing recommended environment variables: ${missing.join(", ")}. Using default fallback values for dev.`);
  }
};

module.exports = { validateEnv };
