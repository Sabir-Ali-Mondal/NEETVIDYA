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
const Course = require("./models/Course");
const Subject = require("./models/Subject");
const Unit = require("./models/Unit");
const Chapter = require("./models/Chapter");
const Batch = require("./models/Batch");
const Question = require("./models/Question");
const Exam = require("./models/Exam");
const WebsiteContent = require("./models/WebsiteContent");
const Achievement = require("./models/Achievement");
const Testimonial = require("./models/Testimonial");

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
      Course.deleteMany({}),
      Subject.deleteMany({}),
      Chapter.deleteMany({}),
      Batch.deleteMany({}),
      Question.deleteMany({}),
      Exam.deleteMany({}),
      WebsiteContent.deleteMany({}),
      Achievement.deleteMany({}),
      Testimonial.deleteMany({}),
    ]);
    console.log("🗑️  Cleared all collections.\n");

    // ─────────────────────────────────────────────────────────
    // 1. ADMIN
    // ─────────────────────────────────────────────────────────
    const adminUser = await User.create({
      name: "Dr. Alok Verma",
      email: "admin@neetvidya.com",
      password: "Admin@NEET2026",
      phone: "+91 98765 43210",
      role: "admin",
      emailVerified: true,
    });
    console.log("👤 Admin created:", adminUser.email);

    // ─────────────────────────────────────────────────────────
    // 2. TEACHERS (5 teachers)
    // ─────────────────────────────────────────────────────────
    const teacherData = [
      {
        name: "Dr. Rajesh Sharma",
        email: "rajesh.sharma@neetvidya.com",
        phone: "+91 98765 43211",
        subject: "Physics",
        qualification: "M.Sc Physics, B.Ed",
        experience: "14+ Years in NEET Coaching",
        specialisation: "Mechanics, Electromagnetism & Modern Physics",
        bio: "Former Allen Senior Faculty with mentored AIR 47 & AIR 112 in NEET 2024.",
      },
      {
        name: "Prof. Sunita Roy",
        email: "sunita.roy@neetvidya.com",
        phone: "+91 98765 43212",
        subject: "Biology",
        qualification: "Ph.D in Botany, M.Sc Life Sciences",
        experience: "11+ Years Teaching NEET Aspirants",
        specialisation: "Plant Physiology, Genetics & Ecology",
        bio: "Renowned author of NEET Biology rapid revision guides, 700+ students cleared NEET.",
      },
      {
        name: "Dr. Amir Khan",
        email: "amir.khan@neetvidya.com",
        phone: "+91 98765 43213",
        subject: "Chemistry",
        qualification: "Ph.D in Organic Chemistry, IIT Delhi",
        experience: "9+ Years NEET Chemistry Specialist",
        specialisation: "Organic & Physical Chemistry",
        bio: "IIT Delhi alumnus, passionate about making chemistry intuitive for NEET aspirants.",
      },
      {
        name: "Ms. Priya Nair",
        email: "priya.nair@neetvidya.com",
        phone: "+91 98765 43214",
        subject: "Zoology",
        qualification: "M.Sc Zoology, B.Ed",
        experience: "7+ Years in Biology Education",
        specialisation: "Human Physiology, Animal Kingdom & Genetics",
        bio: "Specialises in human body systems and genetics — top NEET scoring domains.",
      },
      {
        name: "Prof. Suresh Patel",
        email: "suresh.patel@neetvidya.com",
        phone: "+91 98765 43215",
        subject: "Physics",
        qualification: "M.Tech Physics, NIT Trichy",
        experience: "12+ Years in Competitive Exam Coaching",
        specialisation: "Thermodynamics, Optics & Waves",
        bio: "Expert in numerical problem-solving strategies for NEET Physics.",
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

    // ─────────────────────────────────────────────────────────
    // 3. COURSES
    // ─────────────────────────────────────────────────────────
    const course1 = await Course.create({
      name: "NEET Dropper Pinnacle",
      slug: "neet-dropper-pinnacle",
      description:
        "Intensive 1-year rank-boosting curriculum with daily testing, comprehensive concept drill, and top mentor guidance for droppers & repeaters.",
      targetClass: "Dropper / 12th Pass",
      duration: "1 Year",
      feeAmount: 45000,
      features: [
        "Daily Practice Papers (DPP)",
        "Full Syllabus Mock Tests",
        "Printed NEET Question Bank",
        "Doubt Clearing Sessions",
        "Personalized Performance Analysis",
        "Telegram Study Group Access",
      ],
      displayOrder: 1,
      isActive: true,
      createdBy: adminUser._id,
    });

    const course2 = await Course.create({
      name: "Class XI Foundation Master",
      slug: "class-11-foundation",
      description:
        "2-year complete program covering Class 11 & 12 CBSE syllabus aligned with rigorous NEET fundamentals.",
      targetClass: "Class 11",
      duration: "2 Years",
      feeAmount: 65000,
      features: [
        "NCERT Line-by-Line Coverage",
        "Bi-weekly Unit Tests",
        "Animated Conceptual Lectures",
        "Previous Year Question Analysis",
        "Parent-Teacher Meetings",
      ],
      displayOrder: 2,
      isActive: true,
      createdBy: adminUser._id,
    });

    const course3 = await Course.create({
      name: "NEET Exam Warriors",
      slug: "neet-exam-warriors",
      description:
        "Exam-only test series with 50+ full-length NEET mock tests, detailed analytics, and rank predictions.",
      targetClass: "Class 12 / Dropper",
      duration: "6 Months",
      feeAmount: 8000,
      features: [
        "50+ Full-Length Mock Tests",
        "Chapter-wise DPPs",
        "All India Rank Simulation",
        "Solution Videos",
        "Performance Leaderboard",
      ],
      displayOrder: 3,
      isActive: true,
      createdBy: adminUser._id,
    });

    console.log("📚 Courses created");

    // ─────────────────────────────────────────────────────────
    // 4. SUBJECTS & CHAPTERS
    // ─────────────────────────────────────────────────────────
    const physics = await Subject.create({
      name: "Physics",
      code: "PHY",
      course: course1._id,
      description: "Mechanics, Thermodynamics, Electrodynamics & Modern Physics",
      displayOrder: 1,
    });

    const biology = await Subject.create({
      name: "Biology (Botany)",
      code: "BOT",
      course: course1._id,
      description: "Plant Kingdom, Cell Biology, Genetics & Ecology",
      displayOrder: 2,
    });

    const zoology = await Subject.create({
      name: "Biology (Zoology)",
      code: "ZOO",
      course: course1._id,
      description: "Animal Kingdom, Human Physiology & Reproduction",
      displayOrder: 3,
    });

    const chemistry = await Subject.create({
      name: "Chemistry",
      code: "CHEM",
      course: course1._id,
      description: "Physical, Organic & Inorganic Chemistry",
      displayOrder: 4,
    });

    course1.subjects = [physics._id, biology._id, zoology._id, chemistry._id];
    await course1.save();

    // ── Units for each subject ──
    const phyUnit1 = await Unit.create({ name: "Mechanics & General Physics", subject: physics._id, displayOrder: 1 });
    const phyUnit2 = await Unit.create({ name: "Thermal Physics", subject: physics._id, displayOrder: 2 });

    const bioUnit1 = await Unit.create({ name: "Cell Biology & Biomolecules", subject: biology._id, displayOrder: 1 });
    const bioUnit2 = await Unit.create({ name: "Plant Physiology & Diversity", subject: biology._id, displayOrder: 2 });

    const zooUnit1 = await Unit.create({ name: "Animal Diversity & Physiology", subject: zoology._id, displayOrder: 1 });

    const chemUnit1 = await Unit.create({ name: "Physical & Organic Fundamentals", subject: chemistry._id, displayOrder: 1 });

    const physicsChapters = await Chapter.insertMany([
      { name: "Units, Dimensions & Kinematics", subject: physics._id, unit: phyUnit1._id, displayOrder: 1 },
      { name: "Laws of Motion", subject: physics._id, unit: phyUnit1._id, displayOrder: 2 },
      { name: "Work, Energy & Power", subject: physics._id, unit: phyUnit1._id, displayOrder: 3 },
      { name: "Gravitation", subject: physics._id, unit: phyUnit1._id, displayOrder: 4 },
      { name: "Thermodynamics", subject: physics._id, unit: phyUnit2._id, displayOrder: 5 },
    ]);

    const biologyChapters = await Chapter.insertMany([
      { name: "Cell: The Unit of Life", subject: biology._id, unit: bioUnit1._id, displayOrder: 1 },
      { name: "Biomolecules", subject: biology._id, unit: bioUnit1._id, displayOrder: 2 },
      { name: "Photosynthesis in Higher Plants", subject: biology._id, unit: bioUnit2._id, displayOrder: 3 },
      { name: "Plant Kingdom", subject: biology._id, unit: bioUnit2._id, displayOrder: 4 },
    ]);

    const chemChapters = await Chapter.insertMany([
      { name: "Some Basic Concepts of Chemistry", subject: chemistry._id, unit: chemUnit1._id, displayOrder: 1 },
      { name: "Chemical Bonding", subject: chemistry._id, unit: chemUnit1._id, displayOrder: 2 },
      { name: "Organic Chemistry Basics", subject: chemistry._id, unit: chemUnit1._id, displayOrder: 3 },
    ]);

    console.log("📖 Subjects & Chapters created");

    // Backfill teacher subject ObjectIds from subjectName
    const subjectMapById = { Physics: physics, Biology: biology, Chemistry: chemistry, Zoology: zoology };
    for (let i = 0; i < teacherProfiles.length; i++) {
      const subj = subjectMapById[teacherData[i].subject];
      if (subj) {
        await Teacher.findByIdAndUpdate(teacherProfiles[i]._id, { subject: subj._id });
      }
    }
    console.log("📎 Teachers linked with subject references");

    // ─────────────────────────────────────────────────────────
    // 5. STUDENTS (10 students with IDs)
    // ─────────────────────────────────────────────────────────
    const studentData = [
      { name: "Aman Gupta", email: "aman.gupta@student.neetvidya.com", city: "Kolkata", class: "DROPPER", parent: "Suresh Gupta", parentPhone: "+91 98765 43220", school: "Delhi Public School" },
      { name: "Priya Sharma", email: "priya.sharma@student.neetvidya.com", city: "Delhi", class: "XII", parent: "Mohan Sharma", parentPhone: "+91 98765 43221", school: "Kendriya Vidyalaya" },
      { name: "Rahul Singh", email: "rahul.singh@student.neetvidya.com", city: "Mumbai", class: "DROPPER", parent: "Rajendra Singh", parentPhone: "+91 98765 43222", school: "Ryan International" },
      { name: "Anjali Patel", email: "anjali.patel@student.neetvidya.com", city: "Ahmedabad", class: "XI", parent: "Vijay Patel", parentPhone: "+91 98765 43223", school: "Navrachana School" },
      { name: "Karan Mehta", email: "karan.mehta@student.neetvidya.com", city: "Pune", class: "XII", parent: "Ashok Mehta", parentPhone: "+91 98765 43224", school: "Symbiosis School" },
      { name: "Neha Reddy", email: "neha.reddy@student.neetvidya.com", city: "Hyderabad", class: "DROPPER", parent: "Srinivas Reddy", parentPhone: "+91 98765 43225", school: "Narayana School" },
      { name: "Vikram Kumar", email: "vikram.kumar@student.neetvidya.com", city: "Patna", class: "XII", parent: "Rakesh Kumar", parentPhone: "+91 98765 43226", school: "ND College" },
      { name: "Sneha Roy", email: "sneha.roy@student.neetvidya.com", city: "Kolkata", class: "DROPPER", parent: "Debashish Roy", parentPhone: "+91 98765 43227", school: "La Martiniere" },
      { name: "Arjun Nair", email: "arjun.nair@student.neetvidya.com", city: "Chennai", class: "XI", parent: "Sunil Nair", parentPhone: "+91 98765 43228", school: "DAV School" },
      { name: "Riya Joshi", email: "riya.joshi@student.neetvidya.com", city: "Jaipur", class: "XII", parent: "Mahesh Joshi", parentPhone: "+91 98765 43229", school: "Maharaja School" },
    ];

    const studentUsers = [];
    const studentProfiles = [];

    for (let i = 0; i < studentData.length; i++) {
      const s = studentData[i];
      const user = await User.create({
        name: s.name,
        email: s.email,
        password: "Student@NEET2026",
        phone: s.parentPhone,
        role: "student",
        emailVerified: true,
      });
      studentUsers.push(user);

      const studentId = generateStudentId(i + 1);
      const student = await Student.create({
        user: user._id,
        studentId,
        studentType: s.class === "XI" ? "REGULAR_OFFLINE" : "REGULAR_OFFLINE",
        currentClass: s.class,
        parentName: s.parent,
        parentPhone: s.parentPhone,
        school: s.school,
        city: s.city,
        enrollmentDate: new Date(),
      });
      studentProfiles.push(student);
      console.log(`👨‍🎓 Student created: ${user.email} [${studentId}]`);
    }

    // ─────────────────────────────────────────────────────────
    // 6. BATCHES
    // ─────────────────────────────────────────────────────────
    const batch1 = await Batch.create({
      name: "Target NEET 2027 — Batch Alpha",
      code: "TGT-27-A",
      batchType: "OFFLINE",
      course: course1._id,
      academicYear: "2026-2027",
      capacity: 40,
      students: studentUsers.slice(0, 5).map((u) => u._id),
      assignedTeachers: [
        { teacher: teacherUsers[0]._id, subject: physics._id },
        { teacher: teacherUsers[1]._id, subject: biology._id },
        { teacher: teacherUsers[2]._id, subject: chemistry._id },
      ],
      schedule: "Mon–Sat: 08:30 AM – 01:30 PM",
      color: "#22c55e",
      createdBy: adminUser._id,
    });

    const batch2 = await Batch.create({
      name: "Target NEET 2027 — Batch Beta",
      code: "TGT-27-B",
      batchType: "OFFLINE",
      course: course1._id,
      academicYear: "2026-2027",
      capacity: 35,
      students: studentUsers.slice(5, 10).map((u) => u._id),
      assignedTeachers: [
        { teacher: teacherUsers[4]._id, subject: physics._id },
        { teacher: teacherUsers[3]._id, subject: zoology._id },
        { teacher: teacherUsers[2]._id, subject: chemistry._id },
      ],
      schedule: "Mon–Sat: 02:00 PM – 07:00 PM",
      color: "#6366f1",
      createdBy: adminUser._id,
    });

    const batch3 = await Batch.create({
      name: "NEET Exam Warriors — Online",
      code: "EXW-27-O",
      batchType: "ONLINE",
      course: course3._id,
      academicYear: "2026-2027",
      capacity: 200,
      students: studentUsers.map((u) => u._id),
      schedule: "24/7 Self-Paced",
      color: "#f59e0b",
      createdBy: adminUser._id,
    });

    // Update student batch assignments
    for (let i = 0; i < 5; i++) {
      await Student.findOneAndUpdate(
        { user: studentUsers[i]._id },
        { batches: [batch1._id, batch3._id] }
      );
    }
    for (let i = 5; i < 10; i++) {
      await Student.findOneAndUpdate(
        { user: studentUsers[i]._id },
        { batches: [batch2._id, batch3._id] }
      );
    }

    console.log("🏫 Batches created");

    // ─────────────────────────────────────────────────────────
    // 7. QUESTIONS (10 quality NEET questions)
    // ─────────────────────────────────────────────────────────
    const questions = await Question.insertMany([
      {
        questionText: "The dimensions of Planck's constant are the same as that of:",
        options: [{ text: "Linear momentum" }, { text: "Angular momentum" }, { text: "Energy" }, { text: "Power" }],
        correctAnswer: 1,
        explanation: "Planck's constant h has dimensions [M L² T⁻¹], identical to angular momentum (L = mvr).",
        subject: physics._id,
        chapter: physicsChapters[0]._id,
        difficulty: "Easy",
        marks: 4,
        negativeMarks: 1,
        source: "NEET PYQ",
        year: 2021,
        createdBy: teacherUsers[0]._id,
      },
      {
        questionText: "A projectile is thrown with velocity 20 m/s at 30° to the horizontal. Maximum height reached (g = 10 m/s²):",
        options: [{ text: "5 m" }, { text: "10 m" }, { text: "15 m" }, { text: "20 m" }],
        correctAnswer: 0,
        explanation: "H = u²sin²θ / 2g = (400 × 0.25) / 20 = 5 m",
        subject: physics._id,
        chapter: physicsChapters[0]._id,
        difficulty: "Medium",
        marks: 4,
        negativeMarks: 1,
        source: "NEET Practice",
        createdBy: teacherUsers[0]._id,
      },
      {
        questionText: "Which organelle is known as the powerhouse of the cell and possesses its own circular DNA?",
        options: [{ text: "Endoplasmic Reticulum" }, { text: "Golgi Apparatus" }, { text: "Mitochondria" }, { text: "Lysosome" }],
        correctAnswer: 2,
        explanation: "Mitochondria generate ATP and have their own 70S ribosomes and circular DNA.",
        subject: biology._id,
        chapter: biologyChapters[0]._id,
        difficulty: "Easy",
        marks: 4,
        negativeMarks: 1,
        source: "NEET PYQ",
        year: 2023,
        createdBy: teacherUsers[1]._id,
      },
      {
        questionText: "Which phase of mitosis is characterized by chromosomes aligning along the equatorial plate?",
        options: [{ text: "Prophase" }, { text: "Metaphase" }, { text: "Anaphase" }, { text: "Telophase" }],
        correctAnswer: 1,
        explanation: "During metaphase, spindle fibers align chromosomes at the metaphase plate.",
        subject: biology._id,
        chapter: biologyChapters[0]._id,
        difficulty: "Easy",
        marks: 4,
        negativeMarks: 1,
        source: "NEET PYQ",
        year: 2022,
        createdBy: teacherUsers[1]._id,
      },
      {
        questionText: "The number of moles of solute in 1 litre of 0.5 M solution is:",
        options: [{ text: "0.25 mol" }, { text: "0.5 mol" }, { text: "1.0 mol" }, { text: "2.0 mol" }],
        correctAnswer: 1,
        explanation: "Molarity = moles/volume(L). 0.5 M in 1 L = 0.5 mol",
        subject: chemistry._id,
        chapter: chemChapters[0]._id,
        difficulty: "Easy",
        marks: 4,
        negativeMarks: 1,
        source: "NEET PYQ",
        year: 2020,
        createdBy: teacherUsers[2]._id,
      },
      {
        questionText: "Which of the following is the correct electronic configuration of Fe²⁺?",
        options: [
          { text: "[Ar] 3d⁶ 4s²" },
          { text: "[Ar] 3d⁶ 4s⁰" },
          { text: "[Ar] 3d⁴ 4s²" },
          { text: "[Ar] 3d⁵ 4s¹" },
        ],
        correctAnswer: 1,
        explanation: "Fe is [Ar] 3d⁶ 4s². Fe²⁺ loses two 4s electrons: [Ar] 3d⁶",
        subject: chemistry._id,
        chapter: chemChapters[1]._id,
        difficulty: "Medium",
        marks: 4,
        negativeMarks: 1,
        source: "NEET PYQ",
        year: 2024,
        createdBy: teacherUsers[2]._id,
      },
      {
        questionText: "A body of mass 5 kg is moving with velocity 20 m/s. Its kinetic energy is:",
        options: [{ text: "200 J" }, { text: "500 J" }, { text: "1000 J" }, { text: "2000 J" }],
        correctAnswer: 2,
        explanation: "KE = ½mv² = ½ × 5 × 400 = 1000 J",
        subject: physics._id,
        chapter: physicsChapters[2]._id,
        difficulty: "Easy",
        marks: 4,
        negativeMarks: 1,
        source: "NEET Practice",
        createdBy: teacherUsers[0]._id,
      },
      {
        questionText: "In a balanced diet, the ratio of carbohydrates, proteins and fats should be approximately:",
        options: [{ text: "4:2:1" }, { text: "5:1:1" }, { text: "3:2:1" }, { text: "2:1:1" }],
        correctAnswer: 0,
        explanation: "The ideal dietary ratio is 4:2:1 (Carbs:Protein:Fat) for energy, growth and health.",
        subject: zoology._id,
        chapter: null,
        difficulty: "Easy",
        marks: 4,
        negativeMarks: 1,
        source: "NEET PYQ",
        year: 2019,
        createdBy: teacherUsers[3]._id,
      },
      {
        questionText: "The work done by a gas when it expands against a constant external pressure of 2 atm from 2 L to 8 L is:",
        options: [{ text: "-1215 J" }, { text: "-1012 J" }, { text: "-1216 J" }, { text: "1216 J" }],
        correctAnswer: 0,
        explanation: "W = -PΔV = -2 × (8-2) = -12 L·atm = -12 × 101.325 J ≈ -1215 J",
        subject: chemistry._id,
        chapter: chemChapters[0]._id,
        difficulty: "Hard",
        marks: 4,
        negativeMarks: 1,
        source: "NEET PYQ",
        year: 2023,
        createdBy: teacherUsers[2]._id,
      },
      {
        questionText: "The respiratory quotient (RQ) for carbohydrate is:",
        options: [{ text: "0.7" }, { text: "0.8" }, { text: "1.0" }, { text: "1.2" }],
        correctAnswer: 2,
        explanation: "For carbohydrates: CO₂ produced = O₂ consumed, so RQ = 1.0",
        subject: biology._id,
        chapter: biologyChapters[2]._id,
        difficulty: "Medium",
        marks: 4,
        negativeMarks: 1,
        source: "NEET PYQ",
        year: 2022,
        createdBy: teacherUsers[1]._id,
      },
    ]);

    console.log("❓ Questions created:", questions.length);

    // ─────────────────────────────────────────────────────────
    // 8. EXAM
    // ─────────────────────────────────────────────────────────
    const exam = await Exam.create({
      title: "All-India NEET Diagnostic Mock Test 01",
      description:
        "Full-length diagnostic assessment with exact NEET marking scheme. Covers Physics, Biology & Chemistry.",
      testType: "MOCK_TEST",
      course: course1._id,
      subjects: [physics._id, biology._id, chemistry._id],
      totalQuestions: 10,
      totalMarks: 40,
      marksPerCorrect: 4,
      negativePerWrong: 1,
      duration: 30,
      startTime: new Date(Date.now() - 24 * 3600 * 1000),
      endTime: new Date(Date.now() + 30 * 24 * 3600 * 1000),
      maxAttempts: 3,
      status: "LIVE",
      instructions:
        "Each correct answer: +4 marks. Each wrong answer: -1 mark. Unanswered: 0 marks. Timer is server-enforced.",
      createdBy: adminUser._id,
    });

    console.log("📝 Sample exam created");

    // ─────────────────────────────────────────────────────────
    // 9. ACHIEVEMENTS
    // ─────────────────────────────────────────────────────────
    await Achievement.insertMany([
      {
        title: "AIR 84 in NEET UG 2024",
        description: "Pooja Roy achieved 710/720 in NEET UG 2024, securing admission to Maulana Azad Medical College, New Delhi.",
        category: "STUDENT_RESULT",
        studentName: "Pooja Roy",
        studentBatch: "Batch Alpha 2024",
        score: "710 / 720",
        year: 2024,
        featured: true,
        displayOrder: 1,
      },
      {
        title: "AIR 210 in NEET UG 2024",
        description: "Aryan Khanna scored 697/720 in NEET 2024, securing Government Medical College, Pune.",
        category: "STUDENT_RESULT",
        studentName: "Aryan Khanna",
        studentBatch: "Dropper Batch 2024",
        score: "697 / 720",
        year: 2024,
        featured: true,
        displayOrder: 2,
      },
      {
        title: "Best NEET Coaching Institute 2023",
        description: "NEETVIDYA was awarded Best NEET Coaching Institute in West Bengal by Education Today Magazine.",
        category: "INSTITUTE_MILESTONE",
        year: 2023,
        featured: true,
        displayOrder: 3,
      },
      {
        title: "500+ Students Cleared NEET in 2023",
        description: "Milestone achieved — 500+ students from NEETVIDYA cleared NEET UG 2023 with qualifying scores.",
        category: "INSTITUTE_MILESTONE",
        year: 2023,
        featured: false,
        displayOrder: 4,
      },
    ]);

    // ─────────────────────────────────────────────────────────
    // 10. TESTIMONIALS
    // ─────────────────────────────────────────────────────────
    await Testimonial.insertMany([
      {
        name: "Sneha Mukherjee",
        role: "STUDENT",
        course: "NEET Dropper Pinnacle",
        batch: "Batch Alpha 2023",
        institute: "AIIMS Kalyani",
        content:
          "NEETVIDYA gave me the exact discipline I lacked. The rigorous chapter-wise test series and instant error diagnostics helped me jump from 520 to 684 marks!",
        rating: 5,
        isApproved: true,
        featured: true,
      },
      {
        name: "Mr. B. K. Sengupta",
        role: "PARENT",
        course: "Class XI Foundation",
        content:
          "The transparency of regular student performance reports and the dedicated Telegram consulting group gave us complete confidence in our son's preparation.",
        rating: 5,
        isApproved: true,
        featured: true,
      },
      {
        name: "Arjun Das",
        role: "STUDENT",
        course: "NEET Exam Warriors",
        batch: "Exam Only 2024",
        institute: "Grant Medical College, Mumbai",
        content:
          "The All India Mock Test series with instant solutions was a game changer. I improved 80 marks in just 3 months of consistent practice.",
        rating: 5,
        isApproved: true,
        featured: true,
      },
      {
        name: "Mrs. Rekha Rao",
        role: "PARENT",
        course: "NEET Dropper Pinnacle",
        content:
          "My daughter was a dropper who lost confidence. The teachers here personally tracked her weak areas. She cleared NEET with 650+ marks. Eternally grateful.",
        rating: 5,
        isApproved: true,
        featured: false,
      },
    ]);

    console.log("🏆 Achievements & Testimonials created");

    // ─────────────────────────────────────────────────────────
    // SUMMARY
    // ─────────────────────────────────────────────────────────
    console.log("\n" + "=".repeat(60));
    console.log("✅ NEETVIDYA Database Seeded Successfully!");
    console.log("=".repeat(60));
    console.log("\n📋 LOGIN CREDENTIALS:");
    console.log("-".repeat(45));
    console.log("  ADMIN");
    console.log("  Email:    admin@neetvidya.com");
    console.log("  Password: Admin@NEET2026\n");
    console.log("  TEACHERS (all use same password)");
    console.log("  Email:    rajesh.sharma@neetvidya.com");
    console.log("  Email:    sunita.roy@neetvidya.com");
    console.log("  Email:    amir.khan@neetvidya.com");
    console.log("  Email:    priya.nair@neetvidya.com");
    console.log("  Email:    suresh.patel@neetvidya.com");
    console.log("  Password: Teacher@NEET2026\n");
    console.log("  STUDENTS (all use same password)");
    console.log("  Email:    aman.gupta@student.neetvidya.com [NV-" + new Date().getFullYear() + "-0001]");
    console.log("  Email:    priya.sharma@student.neetvidya.com [NV-" + new Date().getFullYear() + "-0002]");
    console.log("  ... (10 students total)");
    console.log("  Password: Student@NEET2026");
    console.log("\n  (Students can also login with their Student ID)");
    console.log("=".repeat(60));

    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding error:", error);
    process.exit(1);
  }
};

seedData();
