/**
 * NEETVIDYA Production Seeder
 * Usage: cd server && npm run seed
 *
 * Creates ONLY the initial admin account so the project can be bootstrapped
 * for production. Every other account (teachers, students) and all academic
 * content (courses, subjects, questions, exams, materials) is added later
 * from the admin panel, which stays the single source of truth.
 *
 * Credentials are read from the environment so they never have to live in
 * source control:
 *   ADMIN_NAME      (default: NEETVIDYA Admin)
 *   ADMIN_EMAIL     (default: neetvidya720@gmail.com)
 *   ADMIN_PASSWORD  (default: Admin@NEET2026)
 *   ADMIN_PHONE     (default: +91 74396 85658)
 *
 * This script is safe to run against an existing database: if an admin with
 * the given email already exists it is left untouched, and no other data is
 * ever deleted.
 */

const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const User = require("./models/User");

const ADMIN_NAME = process.env.ADMIN_NAME || "NEETVIDYA Admin";
const ADMIN_EMAIL = (process.env.ADMIN_EMAIL || "neetvidya720@gmail.com").toLowerCase();
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "Admin@NEET2026";
const ADMIN_PHONE = process.env.ADMIN_PHONE || "+91 74396 85658";

const seedData = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/neetvidya";
    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB...\n");

    // ADMIN BOOTSTRAP
    // Idempotent: never deletes or overwrites existing data. If an admin
    // with this email already exists we report it and stop.
    const existingAdmin = await User.findOne({ email: ADMIN_EMAIL });
    if (existingAdmin) {
      console.log("Admin already exists, nothing to do:", existingAdmin.email);
      console.log("Set ADMIN_EMAIL in server/.env to seed a different admin.");
      await mongoose.disconnect();
      process.exit(0);
    }

    await User.create({
      name: ADMIN_NAME,
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
      phone: ADMIN_PHONE,
      role: "admin",
      emailVerified: true,
      mustChangePassword: true,
    });
    console.log("Admin created:", ADMIN_EMAIL);

    // Teachers, students, batches, courses, subjects, materials, questions and
    // exams are intentionally NOT seeded. Create them from the admin panel once
    // you have logged in with the account above.

    // SUMMARY
    console.log("\n" + "=".repeat(60));
    console.log("NEETVIDYA admin seeded successfully!");
    console.log("=".repeat(60));
    console.log("\nLOGIN CREDENTIALS:");
    console.log("-".repeat(45));
    console.log("  ADMIN");
    console.log("  Email:    " + ADMIN_EMAIL);
    console.log("  Password: " + ADMIN_PASSWORD);
    console.log("\n  You must change this password on first login.");
    console.log("  All other accounts and content are added from the admin panel.");
    console.log("=".repeat(60));

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
};

seedData();
