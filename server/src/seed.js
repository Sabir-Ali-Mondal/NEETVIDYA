/**
 * NEETVIDYA Database Seeder
 * Usage: cd server && npm run seed
 *
 * This seeds the database with:
 * - 1 Admin
 * - 5 Teachers (Physics, Biology, Chemistry x2, Zoology)
 * - 10 Students with generated IDs
 * - Courses, Subjects, Chapters, Batches
 * - Sample Questions, Exams, Achievements, Testimonials
 */

const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const User = require("./models/User");
const Student = require("./models/Student");
const Teacher = require("./models/Teacher");
const Batch = require("./models/Batch");
const WebsiteContent = require("./models/WebsiteContent");

const generateStudentId = (index) => {
  const year = new Date().getFullYear();
  return `NV-${year}-${String(index).padStart(4, "0")}`;
};

const seedData = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/neetvidya";
    await mongoose.connect(mongoUri);
    console.log("✅ Connected to MongoDB...\n");

    // Clear all collections
    await Promise.all([
      User.deleteMany({}),
      Student.deleteMany({}),
      Teacher.deleteMany({}),
      Batch.deleteMany({}),
      WebsiteContent.deleteMany({}),
    ]);
    console.log("🗑️  Cleared all collections.\n");

    // ─────────────────────────────────────────────────────────
    // 1. TEST ACCOUNTS ONLY
    // Note: the app requires unique email addresses for each user.
    // Therefore the admin and teacher accounts are kept to unique
    // test emails, while the rest of the seed data is minimized.
    // ─────────────────────────────────────────────────────────
    const adminUser = await User.create({
      name: "NEETVIDYA Admin",
      email: "neetvidya720@gmail.com",
      password: "Admin@NEET2026",
      phone: "+91 74396 85658",
      role: "admin",
      emailVerified: true,
    });
    console.log("👤 Admin created:", adminUser.email);

    const teacherData = [
      {
        name: "Ramij Khan",
        email: "Ramijkhan314@gmail.com",
        phone: "+91 98765 43211",
        subject: "Physics",
        qualification: "M.Sc Physics, B.Ed",
        experience: "10+ Years in NEET Coaching",
        specialisation: "Mechanics, Modern Physics",
        bio: "Experienced mentor guiding students through core NEET physics concepts and problem-solving strategy.",
      },
      {
        name: "Bheshma Das",
        email: "bheshmadas377@gmail.com",
        phone: "+91 98765 43212",
        subject: "Chemistry",
        qualification: "M.Sc Chemistry, B.Ed",
        experience: "8+ Years in NEET Coaching",
        specialisation: "Physical Chemistry, Organic Chemistry",
        bio: "Focused on building strong fundamentals, high-yield revision and exam temperament for NEET aspirants.",
      },
    ];

    const teacherUsers = [];
    const teacherProfiles = [];

    for (const t of teacherData) {
      const user = await User.create({
        name: t.name,
        email: t.email,
        password: "Teacher@NEET2026",
        phone: t.phone,
        role: "teacher",
        emailVerified: true,
      });
      teacherUsers.push(user);

      const teacher = await Teacher.create({
        user: user._id,
        subjectName: t.subject,
        qualification: t.qualification,
        experience: t.experience,
        specialisation: t.specialisation,
        bio: t.bio,
      });
      teacherProfiles.push(teacher);
      console.log("👨‍🏫 Teacher created:", user.email, `(${t.subject})`);
    }

    // Course, subject, and chapter data are intentionally left empty so admin users can add
    // programs from the admin panel only. The seed now creates only the core accounts and batches.

    // Teacher subject references are skipped here because there are no seeded courses or subjects.

    // ─────────────────────────────────────────────────────────
    // 2. ONLY TEST STUDENT
    // ─────────────────────────────────────────────────────────
    const studentUser = await User.create({
      name: "Sabir Mondal",
      email: "sabir.gdsc@gmail.com",
      password: "Student@NEET2026",
      phone: "+91 70012 34567",
      role: "student",
      emailVerified: true,
    });

    const studentId = generateStudentId(1);
    const studentProfile = await Student.create({
      user: studentUser._id,
      studentId,
      studentType: "REGULAR_OFFLINE",
      currentClass: "DROPPER",
      parentName: "Parent Name",
      parentPhone: "+91 70012 34567",
      school: "Test Center",
      city: "Karimpur",
      enrollmentDate: new Date(),
    });
    console.log(`👨‍🎓 Student created: ${studentUser.email} [${studentId}]`);

    // ─────────────────────────────────────────────────────────
    // 6. BATCHES
    // ─────────────────────────────────────────────────────────
    const batch1 = await Batch.create({
      name: "12th Batch – SANKALP",
      code: "SANKALP-12TH",
      batchType: "OFFLINE",
      academicYear: "2026-2027",
      capacity: 40,
      students: [studentUser._id],
      schedule: "Mon–Sat: 08:30 AM – 01:30 PM",
      color: "#22c55e",
      createdBy: adminUser._id,
    });

    const batch2 = await Batch.create({
      name: "11th Batch – UDAAN",
      code: "UDAAN-11TH",
      batchType: "OFFLINE",
      academicYear: "2026-2027",
      capacity: 45,
      students: [],
      schedule: "Mon–Sat: 09:00 AM – 02:00 PM",
      color: "#3b82f6",
      createdBy: adminUser._id,
    });

    await Student.findByIdAndUpdate(studentProfile._id, { batches: [batch1._id] });
    console.log("🏫 Seed batches created:", batch1.name, "|", batch2.name);

    // Demo assessments are intentionally omitted so the admin panel remains the single source
    // for course, subject, question-bank, and test creation.

    console.log("ℹ️  Achievement and testimonial seed data intentionally omitted.");

    // ─────────────────────────────────────────────────────────
    // SUMMARY
    // ─────────────────────────────────────────────────────────
    console.log("\n" + "=".repeat(60));
    console.log("✅ NEETVIDYA Database Seeded Successfully!");
    console.log("=".repeat(60));
    console.log("\n📋 TEST LOGIN CREDENTIALS:");
    console.log("-".repeat(45));
    console.log("  ADMIN");
    console.log("  Email:    neetvidya720@gmail.com");
    console.log("  Password: Admin@NEET2026\n");
    console.log("  TEACHER 1");
    console.log("  Email:    ramijkhan314@gmail.com");
    console.log("  Password: Teacher@NEET2026\n");
    console.log("  TEACHER 2");
    console.log("  Email:    bheshmadas377@gmail.com");
    console.log("  Password: Teacher@NEET2026\n");
    console.log("  STUDENT");
    console.log("  Email:    sabir.gdsc@gmail.com [NV-" + new Date().getFullYear() + "-0001]");
    console.log("  Password: Student@NEET2026");
    console.log("=".repeat(60));

    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding error:", error);
    process.exit(1);
  }
};

seedData();
