# NEETVIDYA — Technical Documentation
> **Version:** 1.0.0 (first release)
> Complete technical reference for the NEETVIDYA medical-education platform.
> Covers architecture, the full system flow, the database model, the API surface,
> deployment, and a complete inventory of every file that is dead / redundant.
>
> **Audience:** developers joining or maintaining the project.
> **Scope:** as-built — written by reading every file currently on disk (not the
> original plan). Every path, model field and endpoint below is verified against
> the code.

---

## Table of Contents
1. [Project Overview](#1-project-overview)
2. [Tech Stack](#2-tech-stack)
3. [Repository Layout](#3-repository-layout)
4. [System Diagram (text)](#4-system-diagram-text)
5. [Database Management Diagram (text)](#5-database-management-diagram-text)
6. [Data Model Reference](#6-data-model-reference)
7. [Authentication & Authorization](#7-authentication--authorization)
8. [Core Business Flows](#8-core-business-flows)
9. [API Surface](#9-api-surface)
10. [Environment & Configuration](#10-environment--configuration)
11. [Deployment](#11-deployment)
12. [Files Kept for Review & Dead-Code Inventory](#12-files-kept-for-review--dead-code-inventory)
13. [Roadmap / Not Yet Built](#13-roadmap--not-yet-built)

---

## 1. Project Overview
NEETVIDYA is a coaching + examination-management platform for a NEET tutoring
institute. It is split into a **public marketing website** and three
**authenticated portals** (Student, Teacher, Admin), all served by a single
Express REST API backed by MongoDB.

Core capabilities:

- **Public website** — homepage with admin-managed hero / announcement bar, the
  fixed two-programme course catalogue, public batch listing, faculty, test-series
  promo, results / achievements showcase, testimonials, and an admission enquiry form.
- **Student portal** — dashboard, study materials (Unit → Chapter → Material,
  including video lectures), test series, CBT exams, results, performance analytics,
  profile (self-service + avatar).
- **Teacher workspace** — dashboard, Faculty Library (materials), exam authoring
  (create exams, attach exam-specific questions, import via CSV), result publishing,
  exportable result sheets (PDF).
- **Admin panel** — students, teachers, batches, courses, exams, questions,
  enquiries, achievements, testimonials, contact settings, website settings,
  system health, admin profile/password.
- **CBT exam engine** — attempts with server-enforced timing, per-exam fixed
  question sets, question/option randomisation, negative marking, auto-evaluation,
  result publishing gate, solutions review.
- **Shareable public exam links** (`/e/:slug`) for advertising / virality.
- **Batch-scoped notifications** — students only see notifications for their batches.
- **Question Bank** — an archive of finished exam papers, reusable via exam reconduct.

---

## 2. Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + Vite 5 |
| Routing | React Router v6 |
| Styling | Tailwind CSS + `clsx` / `tailwind-merge` |
| Icons | lucide-react |
| Animations | framer-motion |
| Charts | recharts |
| HTTP | axios (interceptors for JWT + refresh) |
| PDF | jspdf + jspdf-autotable |
| Forms | react-hook-form (installed; most forms use local state) |
| Toasts/modals | sweetalert2 |
| State | React Context (`AuthContext`) + local hooks |
| Backend | Node.js + Express 4 |
| Database | MongoDB + Mongoose 8 |
| Auth | JWT (access + refresh), bcryptjs |
| File storage | Cloudinary (via multer memory upload) |
| Email | nodemailer (SMTP; Ethereal fallback in dev) |
| Validation | express-validator (installed; not wired into routes) |
| Security | helmet, express-rate-limit, CORS, compression, morgan (dev) |

---

## 3. Repository Layout

```
NEETVIDYA/
├── package.json                 # root scripts (dev / install-all / build / start)
├── .gitignore
├── README.md                    # short service summary
├── implimentation.md            # historical phase plan + completion status
├── codebase.py                  # (optional) utility: dumps source into codebase.md
├── .vscode/settings.json
├── docs/
│   ├── HOWTORUN.md              # how to install, seed and run
│   ├── project-plan.md          # original full project plan
│   └── TECHNICAL.md             # ← this document
├── client/                      # React + Vite frontend
│   ├── index.html
│   ├── vite.config.js           # dev proxy /api → :5000
│   ├── vercel.json              # SPA rewrites for Vercel
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── .env / .env.example      # VITE_API_BASE_URL
│   └── src/
│       ├── App.jsx              # all routes
│       ├── main.jsx
│       ├── index.css
│       ├── config/              # api.js, courses.js, images.js, constants.js
│       ├── context/             # AuthContext.jsx
│       ├── hooks/               # useContactSettings.js
│       ├── layouts/             # Public / Student / Teacher / Admin / Exam
│       ├── components/shared/   # reusable widgets (bell, modals, badges…)
│       ├── pages/
│       │   ├── public/          # marketing + auth pages (14)
│       │   ├── student/         # (9)
│       │   ├── teacher/         # (3)
│       │   ├── admin/           # (11)
│       │   └── errors/          # NotFound, Unauthorized (2)
│       ├── utils/               # alert.js, csv.js, examResultPdf.js, studentFollowUp.js
│       ├── assets/images/placeholders/   # .jpg / .png assets (36)
│       └── assets/video/        # background mp4s (2)
└── server/                      # Express + Mongoose backend
    ├── .env / .env.example
    ├── package.json
    └── src/
        ├── server.js            # entry: load env, connect DB, listen
        ├── app.js               # express app, middleware, mounts routes
        ├── seed.js              # bootstrap admin only (idempotent)
        ├── config/              # db.js, env.js, cloudinary.js, constants.js
        ├── constants/           # enum catalogues (batch/exam/test types…)
        ├── routes/              # one file per resource + index.js (23)
        ├── controllers/         # request handlers (16 resources / 17 files)
        ├── services/            # business logic (12 modules)
        ├── models/              # 25 Mongoose schemas
        ├── middleware/          # auth, role, upload, rateLimit, errorHandler
        └── utils/               # apiResponse, apiError, jwt, shuffle, slug, pagination
```

> This tree reflects the repo exactly as it is on disk. Every folder listed here
> contains only files that the running app imports (see §12 for the full audit).

---

## 4. System Diagram (text)

End-to-end view: clients → CDN/hosting → API → data stores → external services.

```
                                ┌──────────────────────────┐
                                │                        USERS                              │
                                │   Visitors / Students / Teachers / Admin (browsers)       │
                                └───────────────┬──────────────────────────┘
                                                │ HTTPS
                                                ▼
┌──────────────────────────┐
│                              FRONTEND  (React SPA + Vite)                                   │
│                              hosted on Vercel                                               │
│                                                                                             │
│  PublicLayout            StudentLayout        TeacherLayout        AdminLayout   ExamLayout  │
│   ├ HomePage              ├ Dashboard          ├ Dashboard         ├ Dashboard    (CBT UI)   │
│   ├ CoursesPage           ├ LearnPage          ├ Materials         ├ Students                │
│   ├ FacultyPage           ├ TestsPage          ├ Exams             ├ Teachers                │
│   ├ TestSeriesPage        ├ ExamInstructions     (Author/CSV/       ├ Batches                 │
│   ├ ResultsPage           ├ ExamPage  ──┐        publish/export)    ├ Courses                 │
│   ├ ContactPage           ├ ResultPage  │                          ├ Exams/Questions          │
│   ├ Login/Register        ├ Performance │                          ├ Enquiries/Achievements   │
│   ├ Forgot/Reset/Verify   └ Profile     │                          └ Contact/Website settings  │
│   └ /e/:slug (public exam landing)      │                                                    │
│                                         │                                                    │
│  ── axios api.js ──  baseURL = VITE_API_BASE_URL || "/api"                                   │
│      • request interceptor: attaches Bearer <accessToken> from localStorage                  │
│      • response interceptor: on 401 → POST /auth/refresh → retry (else redirect /login)       │
└─────────────────┬───────────────────────────┘
                                   │ REST /api   (JSON, multipart for uploads)
                                   ▼
┌──────────────────────────┐
│                        BACKEND API  (Express) — hosted on Render                            │
│                                                                                             │
│  GLOBAL MIDDLEWARE: helmet → cors → compression → json/urlencoded → rate-limit → morgan     │
│                                                                                             │
│  ┌── /api/health ────────────────────────┐  │
│  │                                                                                       │  │
│  │  ROUTE LAYER (routes/index.js)                                                        │  │
│  │  /auth        /students   /teachers   /batches     /enrollments   /courses            │  │
│  │  /academics   /materials  /resources  /questions   /test-series   /exams              │  │
│  │  /attempts    /results    /notifications /achievements /testimonials /enquiries       │  │
│  │  /website     /upload     /admin      /dashboard   /contact-settings                   │  │
│  │        │                                                                              │  │
│  │        ▼                                                                              │  │
│  │  MIDDLEWARE CHAIN: protect (JWT) → authorize(role) → [upload] → controller            │  │
│  │        │                                                                              │  │
│  │        ▼                                                                              │  │
│  │  CONTROLLERS  (parse req/res, delegate)                                               │  │
│  │        │                                                                              │  │
│  │        ▼                                                                              │  │
│  │  SERVICES  (auth, exam, attempt, evaluation, notification, batch, dashboard,          │  │
│  │             course, website, question, cloudinary, email)                             │  │
│  │        │                                                                              │  │
│  │        ▼                                                                              │  │
│  │  MODELS (Mongoose) ──► MongoDB                                                         │  │
│  └───────────────────────┘  │
│                                                                                             │
│  EXTERNAL INTEGRATIONS                                                                      │
│   • Cloudinary  ← upload.service (images/PDFs), profile photos, covers                      │
│   • SMTP mail   ← email.service (verification, password reset)  [welcome email deprecated]  │
│   • WhatsApp    ← link/deep-link only (no API): permission requests, contact CTAs           │
│   • Telegram    ← link only (channel / batch group links)                                    │
└──────────────────────────┘
                                   │
                                   ▼
┌──────────────────────────┐
│                          DATA + MEDIA STORES                                                │
│                                                                                             │
│   MongoDB Atlas  ── 25 collections (see Database Diagram)                                   │
│   Cloudinary     ── images / material PDFs (public URLs persisted in Mongo)                 │
└──────────────────────────┘
```

### Request lifecycle (typical authenticated call)

```
Browser
  │  api.get("/exams")  (Bearer token attached by interceptor)
  ▼
Express app.js
  │  helmet/cors/compression/rate-limit/morgan
  ▼
routes/index.js → routes/exam.routes.js  (GET "/")
  │  protect            → verify JWT → req.user
  │  (no authorize gate — every logged-in role may read /exams)
  ▼
exam.controller.getExams → exam.service.getExams / getStudentExams
  │  role-aware filter (students: batch + permission + study archive; staff: all)
  ▼
Mongoose Exam.find(...).populate(course / batch / subjects / testSeries)
  ▼
MongoDB Atlas
  ▼
apiResponse(res, 200, "...", { exams })   →   JSON to browser
```

### Request lifecycle (typical write / exam start)
```
Browser
  │  POST /api/attempts/exam/:examId/start  (Bearer token)
  ▼
protect → authorize("student","admin") → attempt.controller.startAttempt
  │
  ▼
attempt.service.startAttempt(examId, userId, user)
  │  exam.service.assertExamAccess(user, exam)   ← 403 if no batch / permission
  │  reject unless exam.status === "LIVE" and now ∈ [startTime, endTime]
  │  resume existing IN_PROGRESS attempt, else enforce maxAttempts
  │  serverEndTime = now + duration (server-authoritative clock)
  │  shuffle questionOrder + optionOrders
  ▼
Attempt.create(...)  →  Mongo  →  apiResponse(200, { attemptId, questions, … })
```

### Frontend route map (`client/src/App.jsx`)
| Layout | Path | Page |
|---|---|---|
| PublicLayout | `/` · `/about` · `/courses` · `/faculty` · `/test-series` · `/results` · `/contact` | marketing pages |
| (none) | `/e/:slug` | PublicExamLanding (shareable exam link) |
| (none) | `/login` · `/register` · `/terms` · `/verify-email` · `/forgot-password` · `/reset-password` | auth pages |
| StudentLayout (role: student) | `/student` · `/student/learn` · `/student/tests` · `/student/tests/study/:examId` · `/student/results` · `/student/performance` · `/student/profile` | student portal |
| (none) | `/exam/:examId/instructions` | ExamInstructions |
| ExamLayout (role: student) | `/exam/:examId/attempt` | ExamPage (CBT) |
| TeacherLayout (role: teacher) | `/teacher` · `/teacher/materials` · `/teacher/exams` (**`/teacher/classes` → redirect to materials**, `/teacher/questions` → redirect to exams) | teacher workspace |
| AdminLayout (role: admin) | `/admin` · `/admin/students` · `/admin/teachers` · `/admin/batches` · `/admin/courses` · `/admin/questions` · `/admin/exams` · `/admin/enquiries` · `/admin/achievements` · `/admin/contact-settings` · `/admin/settings` | admin panel |
| (none) | `/unauthorized` · `*` | Unauthorized · NotFound |

---

## 5. Database Management Diagram (text)

Entity/relationship view of all Mongoose collections. `1` = one, `N` = many.
`User` is the identity root; `Student`/`Teacher` are role profiles that extend it.

```
                                   ┌───────────────────────────┐
                                   │           USER            │
                                   │───────────────────────────│
                                   │ name, email(unique),      │
                                   │ password(hashed), role    │
                                   │ (student|teacher|admin),  │
                                   │ phone, avatar, isActive,  │
                                   │ mustChangePassword,       │
                                   │ emailVerified,            │
                                   │ lastLogin, lastVerifiedToken│
                                   │ + reset/verify tokens     │
                                   └────────────┬──────────────┘
                     ┌──────────────────────────┼──────────────────────────┐
                     │ 1                        │ 1                        │ 1 (creator)
                     ▼                          ▼                          ▼
             ┌───────────────┐          ┌───────────────┐          (createdBy refs
             │   STUDENT     │          │   TEACHER     │           across many
             │───────────────│          │───────────────│           collections)
             │ user 1──1     │          │ user 1──1     │
             │ studentId     │          │ subject N──1  │
             │ studentType   │          │ subjectName   │
             │ batches N──N  │          │ qualification │
             │ parentName…   │          │ permissions{} │
             │ currentClass  │          │ telegramUser  │
             │ examPermissions N(N──1 Exam, mirror)     │
             │ avatarBase64  │          └───────────────┘
             └───────┬───────┘
                     │ N
                     │ (student belongs to many batches)
                     ▼
             ┌──────────────────────────┐
             │                          BATCH                            │
             │──────────────────────────│
             │ name, code(unique), batchType, course(SANKALP|UDAAN),     │
             │ academicYear, start/endDate, capacity, schedule,          │
             │ students[] → User,                                        │
             │ assignedTeachers[] { teacher→User, subject→Subject },     │
             │ telegramGroupLink,                                        │
             │ groups[] { label, type(TELEGRAM|WHATSAPP|LINK), url, desc}│
             │ color, isActive, createdBy→User                           │
             └───┬───────────┬───────────────┬───────────────┬──────────┘
                 │ N         │ N             │ N             │ N
                 │           │               │               │
                 ▼           ▼               ▼               ▼
        ┌────────────┐ ┌───────────┐ ┌────────────┐ ┌──────────────────┐
        │ MATERIAL   │   EXAM    │ NOTIFICATION│ │ EXAM_PERMISSION  │
        │────────────│ │───────────│ │────────────│ │──────────────────│
        │ batch 1───N│ │ batch 1──N│ │ targetBatches│ │ student→User     │
        │ course→Crs │ testSeries│ │ scope(BATCH/│ │ exam→Exam        │
        │ subject→Sub│ │ course→Crs│ │  STUDENT/   │ grantedBy→User   │
        │ unit→Unit  │ questions │  ROLE)      │ reason,isActive  │
        │ chapter    │  []→Quest │ targetStudents│  UNIQUE(student,exam)
        │ topic      │ subjects[]│ │ readBy[]→User│ └──────────────────┘
        │ type(PDF/  │ totalQ/Mark│ │ createdBy    │
        │  VIDEO…)   │ duration  │ └─────────────┘
        │ sourceType │ start/end │
        │ fileUrl    │ status    │
        │ uploadedBy │ shareSlug │
        └──┬─────────┘ │ isPublic  │
           │           │ resultPublishMode
           │           │ permittedStudents[]→User
           │           │ isArchived, studyVisible
           │           │ reconductedFrom→Exam
           │           └─────┬─────────┬─────────────────────┐
           │                 │ N       │ N                   │ N
           │                 ▼         ▼                     ▼
           │          ┌───────────┐ ┌───────────┐    ┌────────────────┐
           │          │ QUESTION  │  ATTEMPT  │    │    RESULT      │
           │          │───────────│ │───────────│    │────────────────│
           │          │ text,img  │ exam→Exam │    │ attempt→Attempt│
           │          │ options[] │ student→  │    │  (1──1, unique)│
           │          │ correctIdx│ │   User    │    │ exam→Exam      │
           │          │ explain   │ startedAt │    │ student→User   │
           │          │ subject→S │ serverEnd │    │ marks,accuracy │
           │          │ batch→B   │ answers[] │    │ rank,percentile│
           │          │ unit→Unit │  {question│    │ isPublished ←  │
           │          │ chapter   │  ,selOpt, │    │  gate          │
           │          │ topic     │  marked,  │    │ subjectBreakdown[]
           │          │ difficulty│ │  timeSpent│    │ chapterBreakdown[]
           │          │ marks,neg │ questionOrder[]
           │          │ source,year│ │ optionOrders
           │          │ createdBy │ tabSwitchC│
           │          └─────┬─────┘ └───────────┘    └────────────────┘
           │                │ N
           │                │ referencing (via Question.subject)
           │                ▼
           │    ┌──────────────────────────┐
           │    │                ACADEMIC TAXONOMY                           │
           │    │  SUBJECT ──1:N── UNIT ──1:N── CHAPTER ──1:N── TOPIC        │
           │    │  (Subject.course optional; isCustom for "Other")           │
           │    └──────────────────────────┘
           │
           ▼ N           MATERIAL also references Unit/Chapter/Topic/Subject
   ┌──────────────────────────────┐
   │ COURSE (admin-managed catalogue)                              │
   │ name, slug, description, targetClass, subjects[]→Subject,     │
   │ duration, features[], coverImage, feeAmount/Currency,         │
   │ isActive, displayOrder, createdBy→User                        │
   └───┬────────────────────┬───────────────────────┬─────────────┘
       │ N                  │ N                     │ N
       ▼                    ▼                       ▼
┌──────────────┐   ┌────────────────┐      ┌──────────────────┐
│ ENROLLMENT   │   │ TEST_SERIES    │      │ COURSE_RESOURCE  │
│──────────────│   │────────────────│      │──────────────────│
│ student→User │   │ title,desc     │      │ course→Course    │
│ course→Course│   │ course→Course  │      │ subject→Subject  │
│ batch→Batch  │   │ subjects[]→Sub │      │ chapter→Chapter  │
│ status,      │   │ coverImage     │      │ title,desc       │
│ expiresAt,   │   │ totalTests     │      │ resourceType     │
│ paymentStatus│   │ exams[]→Exam   │      │ url,icon,thumb   │
│ amountPaid/  │   │ isActive,      │      │ isPublic,isActive│
│ total,       │   │ createdBy      │      │ addedBy→User     │
│ access{},    │   └────────────────┘      └──────────────────┘
│ enrollmentType│      (EXAM.testSeries → TestSeries)
│ UNIQUE(student, course)
└──────────────┘

                     ┌───────────────────────────────┐
                     │        STANDALONE / SINGLETON COLLECTIONS      │
                     │───────────────────────────────│
                     │ WEBSITE_CONTENT  (section unique: HERO, ABOUT, │
                     │   METHODOLOGY, ANNOUNCEMENT_BAR, CTA … ;       │
                     │   slides[], blocks[], stats[], meta)           │
                     │ CONTACT_SETTINGS (singleton: email, phone,     │
                     │   whatsapp, telegram, social, mapEmbed)        │
                     │ TESTIMONIAL      (name, role, content, order)  │
                     │ ACHIEVEMENT      (title, category, student…,   │
                     │   year, featured, order)                       │
                     │ ENQUIRY          (name,email,phone,message,    │
                     │   source, status, handledBy→User, notes)       │
                     │ ACTIVITY_LOG     (user→User, action, resource, │
                     │   resourceId, details, ip, userAgent)          │
                     │ COUNTER          (_id, seq) — studentId seq    │
                     └───────────────────────────────┘
```

### Key relationship rules

| Relationship | Cardinality | Notes |
|---|---|---|
| User → Student / Teacher | 1 → 0..1 | Role profile; `unique: true` on `user` |
| Student ↔ Batch | N ↔ N | `Student.batches[]`, `Batch.students[]` (User ids) |
| Batch → Material | 1 → N | required `batch` on Material |
| Batch → Exam | 1 → N | required `batch` on Exam |
| Exam → Question | 1 → N | fixed per-exam set (`Exam.questions[]`) |
| Exam → Attempt | 1 → N | one per student per attempt; `maxAttempts` |
| Attempt → Result | 1 → 1 | `Result.attempt` unique |
| Course → Subject → Unit → Chapter → Topic | 1 → N each | taxonomy depth 5 |
| Subject.course | optional | `isCustom` subjects have no course |
| Enrollment | — | `UNIQUE(student, course)` |
| ExamPermission | — | `UNIQUE(student, exam)` — outsider grants |

---

## 6. Data Model Reference

### Identity & people

**User** — identity root for every account.
`name, email (unique, validated), password (bcrypt, `select:false`),
mustChangePassword, passwordChangedAt, phone, role (student|teacher|admin),
avatar, isActive, lastLogin, refreshToken, emailVerified,
emailVerificationToken/Expires, lastVerifiedToken, passwordResetToken/Expires`.
Index: `role`. Hooks: `pre('save')` hashes password; `comparePassword()`.
Also exports a `Counter` model used for student-ID sequencing.

**Student** — profile for `role=student`. `user→User (unique)`, `studentId`
(unique, **sparse**, e.g. `NV-2026-0001`), `studentType`, `batches[]→Batch`,
`enrollmentDate`, parent/school/class/address/city/whatsapp fields, `tags[]`,
`notes`, `examPermissions[]→Exam` (mirror for dashboards), `avatarBase64`,
`registrationSource{ type, label, page, referrer, campaign, course, courseName,
 batch, batchName, utm }` (how/where the student signed up, captured from the
public site), `isActive`.

**Teacher** — profile for `role=teacher`. `user→User (unique)`, `subject→Subject`,
`subjectName`, qualification/experience/specialisation/bio, photo fields,
`telegramUsername`, `permissions{}` (uploadMaterials, uploadLectures,
createQuestions, editQuestions, createExams, createTestSeries, viewPerformance,
manageStudents, accessWebsiteSettings), `isActive`.

### Academic structure

- **Batch** — `name, code (unique), batchType, course (enum SANKALP|UDAAN),
  academicYear, startDate, endDate, capacity, students[]→User,
  assignedTeachers[] {teacher,subject}, schedule, telegramGroupLink,
  groups[] {label,type,url,description}, color, isActive, createdBy`.
- **Course** — admin catalogue: `name, slug, description, targetClass,
  subjects[]→Subject, duration, features[], coverImageUrl/coverImagePublicId,
  feeAmount/feeCurrency, isActive, displayOrder, createdBy`. (Note: public site +
  batch creation actually use the **fixed** catalogue in `client/src/config/courses.js`.)
- **Subject** → **Unit** → **Chapter** → **Topic** — the 5-level taxonomy.
  `Subject.course` optional; `isCustom` marks teacher-created subjects.
  Unit/Chapter/Topic carry `isActive` + `displayOrder`.
- **Enrollment** — `student→User, course→Course, batch→Batch, status,
  enrolledAt/expiresAt, paymentStatus, amountPaid/Total, access{materials,
  lectures,testSeries,downloads}, enrolledBy, enrollmentType`. Unique
  `(student, course)`.

### Content

- **Material** — study content. `title, description, course, batch (req),
  subject, unit (req), chapter (req), topic, type (PDF|DOC|PPT|IMAGE|VIDEO|LINK),
  sourceType (LINK|UPLOAD), fileUrl, filePublicId, fileSize, uploadedBy,
  isActive`. **Video lectures are now Materials with `type: VIDEO`** (the old
  separate lecture system is retired).
- **CourseResource** — external reference links for a course: `course, subject,
  chapter, title, description, resourceType, url, icon, thumbnail, displayOrder,
  isPublic, isActive, addedBy`.
- **TestSeries** — `title, description, course, subjects[],
  coverImageUrl/coverImagePublicId, totalTests, exams[]→Exam, isActive, createdBy`.

### Exams & results

- **Exam** — `title, description, testType (DPP|CHAPTER_TEST|UNIT_TEST|MOCK_TEST|
  PYQ), testSeries, course, examScope (BATCH|COURSE, default BATCH), batch,
  questions[]→Question, subjects[]→Subject, totalQuestions (required),
  totalMarks (required), marksPerCorrect (default 4), negativePerWrong (default 1),
  duration (min, required), startTime (required), endTime (required),
  maxAttempts (default 1), randomizeQuestions (default true), randomizeOptions
  (default true), status (DRAFT|SCHEDULED|PUBLISHED|LIVE|CLOSED|ARCHIVED),
  instructions, resultPublishMode (IMMEDIATE|MANUAL|SCHEDULED, default MANUAL),
  resultPublishAt, resultsPublishedAt, resultsPublished, permittedStudents[]→User,
  shareSlug (unique, sparse), isPublic (default false), isArchived, archivedAt,
  studyVisible, reconductedFrom→Exam, eligibleBatches[]/eligibleStudentTypes[]
  (legacy), createdBy, publishedAt`. Indexes: `(batch,status)`, `(course,status)`,
  `(isArchived,studyVisible)`.
- **Question** — `questionText, questionImageUrl/PublicId, options[]{text,imageUrl,
  order}, correctAnswer (index), explanation + image, subject, batch, unit,
  chapter, topic, difficulty, marks, negativeMarks, source, year, tags[],
  createdBy, isActive`. Indexes: `(subject,chapter)`, `difficulty`, `(source,year)`.
- **Attempt** — `exam→Exam (required), student→User (required), startedAt
  (required), serverEndTime (required), submittedAt,
  status (IN_PROGRESS|SUBMITTED|AUTO_SUBMITTED|ABANDONED),
  answers[]{question,selectedOption (Number|null),markedForReview,timeSpent},
  currentQuestion, questionOrder[]→Question, optionOrders[][] (Number),
  totalScore, correctCount, wrongCount, unattemptedCount, accuracy, timeTaken,
  tabSwitchCount, isFullScreen`. Index `(exam,student)`.
- **Result** — `attempt→Attempt (unique), exam→Exam, student→User, totalMarks,
  obtainedMarks, correctCount, wrongCount, unattemptedCount, accuracy, timeTaken,
  percentage, rank, percentile, isPublished (default false), publishedAt,
  subjectBreakdown[]{subject,correct,wrong,unattempted,marks},
  chapterBreakdown[]{chapter,correct,wrong,unattempted}`.
- **ExamPermission** — `student→User, exam→Exam, grantedBy→User, reason, isActive`.
  Unique `(student, exam)`. Grants exam access to students outside the exam's batch.

### Messaging & website
- **Notification** — `title, message, type (MATERIAL|LECTURE|TEST|RESULT|
  ANNOUNCEMENT|GENERAL), scope (BATCH|STUDENT|ROLE, default BATCH), targetRole
  (student|teacher|all), targetBatches[]→Batch, targetStudents[]→User, isRead,
  readBy[]→User, createdBy, isActive`. Visibility is batch-scoped by default.
- **WebsiteContent** — singleton-per-section CMS: `section (unique enum of 12
  sections), slides[], blocks[], stats[], announcementBar{…}, isVisible, meta(Mixed)`.
- **ContactSettings** — singleton: institute email/phone, address/city/state,
  telegramChannelLink, whatsappGroupLink/Number/DefaultMessage, socials,
  officeHours, mapEmbedUrl. Ships with sensible defaults for the institute.
- **Testimonial / Achievement / Enquiry / ActivityLog** — see diagram; fields
there mirror the schemas exactly.
  - **Achievement** also carries `description`, `studentName`, `studentBatch`,
    `studentPhotoUrl/PublicId`, `imageUrl/PublicId`, `score`, and `year`.
  - **Enquiry** carries `name, email, phone, course, message,
    source (WEBSITE|TELEGRAM|WHATSAPP), status (PENDING|CONTACTED|RESOLVED),
    handledBy→User, notes`.

> The announcement bar is not a separate collection — it lives on
> `WebsiteContent` (`section: "ANNOUNCEMENT_BAR"`).

---

## 7. Authentication & Authorization

**Tokens.** Login returns an access token (default `7d`) and a refresh token
(`30d`). The client stores `neetvidya_token` / `neetvidya_refresh` in
`localStorage`. The axios request interceptor attaches the access token; on `401`,
the response interceptor calls `POST /auth/refresh` and retries once, else clears
tokens and redirects to `/login`. `GET /auth/me` rehydrates the session on load
(`AuthContext`).

**Login identifiers.** `POST /auth/login` accepts an **email OR a student ID**
(any value starting with `NV-` is looked up via the `Student` profile).

**Password model.**
- Self-registered users choose their own password.
- Admin-created teacher/student accounts get the **constant default password**
  `Neetvidya@123` (`server/src/config/constants.js`) and `mustChangePassword=true`.
- `ProtectedRoute.jsx` enforces a **first-login password-change gate** before the
  portal is usable; `changePassword()` clears the flag and stamps `passwordChangedAt`.
- **No credential emails are sent** for admin-created accounts (welcome email is
  deprecated).

**Roles.** `student | teacher | admin`, enforced server-side by
`middleware/role.middleware.js` (`authorize(...)`, aliased `requireRole(...)`).
`protect` (`middleware/auth.middleware.js`) verifies the JWT, loads the user
(`select("-password")`), rejects inactive accounts, and sets `req.user`.

**Client-side guard.** `ProtectedRoute` also treats `admin` as a super-role: an
admin passes any `role="…"` gate (`user.role !== role && user.role !== "admin"`).

**Self-service.** Every logged-in role can `PUT /auth/profile` and
`PUT /auth/change-password`. Students additionally manage profile + avatar
(`/students/my`, `/students/my/avatar`).

**Batch access.** `buildAccessibleBatchFilter()` in `services/batch.service.js`
returns the plain `{ isActive: true, ...extra }` filter for **every** role — every
teacher sees every batch. `assignedTeachers` is retained on the model for
display/back-compat (and still powers a teacher-dashboard counter) but does **not**
restrict access.

**Exam access rule.** `services/exam.service.js → canAccessExam()`:
- Staff (admin/teacher) always pass.
- Draft/secret exams are never visible to students.
- A student may access an exam only when it is released (`PUBLISHED`/`LIVE`) **or**
  it is a study-visible archive (`CLOSED`/`ARCHIVED` + `studyVisible`), **and**
  they belong to one of the exam's target batches (batch membership, or for a
  course-scoped exam, any batch of that course) **or** hold an active
  `ExamPermission`.
- `GET /exams/:id/access-check` returns `{ hasBatchAccess, needsPermission }` so
  the UI can show **Start Exam** vs a prefilled **“Request permission on WhatsApp”** CTA.
- **Auto-permission sync.** On `publishExam` (and when students are added to a
  batch) `syncBatchExamPermissions()` upserts an active `ExamPermission` for every
  student already enrolled in a targeted batch — so batch members always start
  directly, and the manual grant path is only needed for true outsiders.

---

## 8. Core Business Flows

### (a) Admin bootstraps the platform
```
npm run seed  →  creates ONLY the admin  →  admin logs in (must change password)
   →  creates teachers/students (constant password)  →  creates batches
   →  creates courses / subjects / units / chapters
   →  uploads materials, authors questions, builds exams  →  students see only their batch content
```

### (b) Student takes an exam
```
Student → /student/tests  →  GET /exams (batch-filtered)
   →  ExamInstructions  →  GET /exams/:id/access-check
        ├─ hasBatchAccess=true  →  Start Exam  →  POST /attempts/exam/:examId/start
        │                                          (server computes serverEndTime)
        └─ needsPermission=true →  "Request permission on WhatsApp" (prefilled)
   →  ExamPage (CBT): autosave PUT /attempts/:id/save (answers, marks-for-review,
        currentQuestion, tabSwitchCount)
   →  POST /attempts/:id/submit  (or auto-submit at serverEndTime)
        →  evaluation.service.evaluateAttempt():
             computes totalScore, correct/wrong/unattempted, accuracy,
             subjectBreakdown, chapterBreakdown, percentage
        →  Attempt.status = SUBMITTED ; Result created
   →  Result.isPublished = (Exam.resultPublishMode === "IMMEDIATE")
   →  When released (immediate / manual publish / scheduled due) → student sees
        ResultPage; GET /results/:attemptId/solutions returns the answer key
```

### (c) Exam authoring (teacher/admin)
```
Create exam  (DRAFT; scope = single BATCH, or whole COURSE for admin)
   →  attach questions to THIS exam (UI or CSV import)  →  set totalQ / marks / duration
   →  publishExam → status LIVE, shareSlug generated, target-batch students notified
   →  "Copy Link" →  /e/:slug public preview (NO questions exposed)
   →  closeExam  →  status CLOSED + isArchived (paper becomes Question Bank entry)
   →  reconductExam clones an archived paper into a fresh DRAFT (own question copy)
```

### (d) Batch-scoped notifications
```
Emitter (material added / exam published / results published)
   →  notification.service.notifyBatch(batchId, { title, message, type })
Students see a notification when:
   targetStudents = me   OR   (scope=BATCH AND targetBatches ∈ my batches)
   OR (scope=ROLE AND targetRole ∈ [all, myRole])
→  No global floods. getUnreadCount uses readBy[] (per-user read tracking).
```

### (e) Faculty Library material publish (Unit → Chapter → Material)
```
Teacher picks Batch + Subject (defaults: Biology, Physics, Chemistry, Mathematics,
   + "Other…" which creates a custom Subject persisted for next time)
   →  creates/selects Unit  →  Chapter  →  uploads file or external link
   →  Material created (type PDF/VIDEO/…, sourceType UPLOAD/LINK)
   →  batch students notified + see it in Learn page
```

### (f) Public enquiry
```
Visitor submits /contact form  →  POST /enquiries
   →  admin sees it in AdminEnquiries (PENDING → CONTACTED → RESOLVED)
   →  exportable to CSV (client/src/utils/csv.js)
```

### (g) Results publishing & scheduled release
```
Exam.resultPublishMode:
   IMMEDIATE → Result.isPublished=true at evaluation time
   MANUAL    → hidden until admin/teacher hits PUT /exams/:id/publish-results
   SCHEDULED → released when now ≥ resultPublishAt
               (services/exam.service.publishScheduledResults() is called on each
                student-dashboard read, releasing anything due)
Publishing sets Result.isPublished/publishedAt for the whole exam and
notifies the target batches.
```

---

## 9. API Surface

All routes are mounted under `/api` (`routes/index.js`). `protect` = JWT required;
role column = `authorize(...)` gate; `—` = public.

| Base | Method & Path | Auth / Role | Purpose |
|---|---|
| health | GET `/api/health` | — | liveness |
| auth | POST `/auth/register` | — (rate-limited) | self-register (student) |
| | GET `/auth/verify-email` | — | verify via token |
| | POST `/auth/resend-verification` | — (rate-limited) | resend verify email |
| | POST `/auth/login` | — (rate-limited) | login by email **or** studentId |
| | POST `/auth/refresh` | — | rotate access token |
| | POST `/auth/forgot-password` | — (rate-limited) | send reset link |
| | POST `/auth/reset-password` | — (rate-limited) | reset with token |
| | GET `/auth/me` | protect | current user |
| | PUT `/auth/profile` | protect | update own profile |
| | PUT `/auth/change-password` | protect | change own password |
| | POST `/auth/admin/create-student` | admin | create student (default pw) |
| | POST `/auth/admin/create-teacher` | admin | create teacher (default pw) |
| students | GET `/students` | admin, teacher | list |
| | GET `/students/my` | student | own profile (batches + groups) |
| | PUT `/students/my` , `/students/my/avatar` | student | update profile / avatar |
| | GET `/students/:id` | protect | one student |
| | PUT `/students/:id` | admin | edit student |
| | PUT `/students/:id/toggle-active` | admin | activate / deactivate |
| | DELETE `/students/:id` | admin | remove |
| teachers | GET `/teachers/public` | — | public faculty list |
| | GET `/teachers` | admin | list |
| | GET `/teachers/my` | teacher | own profile |
| | PUT `/teachers/:id` | admin | edit teacher |
| | PUT `/teachers/:id/permissions` | admin | update permissions map |
| | PUT `/teachers/:id/toggle-active` | admin | activate / deactivate |
| | DELETE `/teachers/:id` | admin | remove |
| batches | GET `/batches/public` | — | public catalogue |
| | GET `/batches` | protect | list |
| | POST `/batches` | admin | create |
| | PUT `/batches/:id` , DELETE `/batches/:id` | admin | edit / soft-delete |
| | POST `/batches/:id/students` | admin | add students |
| | DELETE `/batches/:id/students/:studentId` | admin | remove student |
| | GET `/batches/:id/students` | protect | roster |
| enrollments | GET `/enrollments/my` | student | own enrollments |
| | POST `/enrollments` | admin | enroll student |
| courses | GET `/courses` , GET `/courses/:id` | — | list / one |
| | POST `/courses` | admin | create |
| | PUT `/courses/:id` , DELETE `/courses/:id` | admin | edit / soft-delete |
| academics | GET `/academics/subjects` | — | list (lazy-seeds defaults) |
| | POST `/academics/subjects` | admin, teacher | create custom subject |
| | GET `/academics/units` , `/academics/chapters` | — | taxonomy reads |
| | POST `/academics/units` , `/academics/chapters` | admin, teacher | create |
| | PUT/DELETE `/academics/units/:id` | admin, teacher | rename / delete (cascades chapters) |
| | PUT/DELETE `/academics/chapters/:id` | admin, teacher | rename / delete |
| | GET `/academics/tree/:courseId` | — | subjects + chapters for a course |
| materials | GET `/materials`, `/materials/tree` | protect | list/tree |
| | GET `/materials/my` | student | my batch materials |
| | POST `/materials` | admin,teacher | upload (multipart) |
| | DELETE `/materials/:id` | admin,teacher | remove |
| resources | GET `/resources`, `/resources/public` | — | list |
| | POST `/resources` | admin,teacher | create |
| | DELETE `/resources/:id` | admin,teacher | delete |
| questions | GET `/questions`, `/questions/bank` | teacher,admin | list / archived bank |
| | POST `/questions`, `/with-images`, `/bulk-import` | teacher,admin (bulk: admin) | create |
| | PUT `/questions/:id`, `/:id/explanation` | teacher,admin | edit |
| | DELETE `/questions/:id` | teacher,admin | delete |
| test-series | GET `/test-series` | — | list |
| | POST `/test-series` | admin,teacher | create |
| | PUT `/test-series/:id` | admin | edit |
| exams | GET `/exams` | protect | list (role-aware) |
| | GET `/exams/public` | — | public list of released exams (no questions/students) |
| | GET `/exams/public/:slug` | — | public preview (no questions) |
| | GET `/exams/bank` | admin,teacher | archived papers |
| | GET `/exams/:id`, `/:id/access-check` | protect | detail / access |
| | POST `/exams` | admin,teacher | create |
| | PUT/DELETE `/exams/:id` | admin,teacher | edit/delete |
| | PUT `/exams/:id/publish`, `/close`, `/archive`, `/study-visibility` | admin,teacher | lifecycle |
| | POST `/exams/:id/reconduct` | admin,teacher | clone for reconduct |
| | GET `/exams/:id/download` | admin,teacher | export paper |
| | GET/PUT `/exams/:id/results`, `/publish-results` | admin,teacher | results |
| | GET/POST/DELETE `/exams/:id/questions[/:questionId]` | protect (writes: admin,teacher) | exam questions |
| | POST `/exams/:id/import-questions` | admin,teacher | CSV import |
| | GET/POST/DELETE `/exams/:id/permissions[/:studentId]` | admin (list: +teacher) | outsider grants |
| attempts | POST `/attempts/exam/:examId/start` | student,admin | start |
| | GET `/attempts/my`, `/:id` | student / protect | list / one |
| | PUT `/attempts/:id/save` | student,admin | autosave |
| | POST `/attempts/:id/submit` | student,admin | submit |
| results | GET `/results/my` | student,admin | my results (published-only for students) |
| | GET `/results/:attemptId`, `/:attemptId/solutions` | protect (owner) | result / solutions |
| notifications | GET `/notifications`, `/unread-count` | protect | list / count |
| | PUT `/notifications/:id/read`, `/read-all` | protect | mark read |
| | POST `/notifications` | admin | create |
| achievements | GET `/achievements` | — | list |
| | POST/PUT/DELETE `/achievements[/:id]` | admin | CRUD |
| testimonials | GET `/testimonials` | — | list |
| | POST `/testimonials` | admin | create |
| enquiries | POST `/enquiries` | — | submit |
| | GET/PUT/DELETE `/enquiries[/:id]` | admin | manage |
| website | GET `/website/home`, `/section/:section` | — | public content |
| | PUT `/website/section/:section` | admin | edit section |
| upload | POST `/upload/image`, `/upload/pdf` | teacher,admin | Cloudinary upload |
| admin | GET `/admin/dashboard`, `/activity-logs`, `/system-health` | admin | ops |
| | POST `/admin/clear-cache` | admin | no-op stub |
| dashboard | GET `/dashboard/admin`, `/student`, `/teacher` | role-gated | dashboards |
| contact-settings | GET `/contact-settings` | — | public settings |
| | PUT `/contact-settings` | admin | edit |

---

## 10. Environment & Configuration

### `server/.env` (copy from `server/.env.example`)
```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/neetvidya
JWT_SECRET=...
JWT_EXPIRES_IN=7d
JWT_REFRESH_SECRET=...
JWT_REFRESH_EXPIRES_IN=30d
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
CLIENT_URL=http://localhost:5173
SMTP_HOST=... SMTP_PORT=587 SMTP_SECURE=false
SMTP_USER=... SMTP_PASS=... EMAIL_FROM=noreply@neetvidya.com

# Optional seed overrides (used by `npm run seed`)
ADMIN_NAME=NEETVIDYA Admin
ADMIN_EMAIL=neetvidya720@gmail.com
ADMIN_PASSWORD=Admin@NEET2026
ADMIN_PHONE=+91 74396 85658
```

### `client/.env` (optional locally)
```
VITE_API_BASE_URL=http://localhost:5000/api
```
Without it, the client uses the `/api` dev proxy from `client/vite.config.js`.
**The variable name is `VITE_API_BASE_URL` — not `VITE_API_URL`.**

> `config/env.js` only *warns* if `JWT_SECRET` is missing (dev fallbacks live in
> `utils/jwt.js`). `config/cloudinary.js` uses dummy credentials when the env vars
> are absent. `email.service.js` falls back to an **Ethereal test inbox** when
> `NODE_ENV !== production` and no SMTP creds are set, printing a preview URL.

### Server constants (`server/src/config/constants.js`)
- `DEFAULT_PASSWORD = "Neetvidya@123"` — constant password for admin-created accounts.
- `DEFAULT_SUBJECTS = ["Biology","Physics","Chemistry","Mathematics"]` (lazily seeded on first `GET /academics/subjects`).
- `CUSTOM_SUBJECT_LABEL = "Other"`.

### Server enum catalogues (`server/src/constants/`)
`roles.js` (STUDENT/TEACHER/ADMIN), `batchTypes.js`, `studentTypes.js`,
`testTypes.js`, `examStatus.js`, `resourceTypes.js`, `enrollmentStatus.js`,
`achievementCategories.js`, `questionStates.js`, `cloudinaryFolders.js`
(MATERIALS, LECTURES, TEACHERS, COURSES, WEBSITE, QUESTIONS, ACHIEVEMENTS).

### Frontend config
- `client/src/config/constants.js` — `ROLES`, `TEST_TYPES`, `BATCH_TYPES`,
  `STUDENT_TYPES`, `EXAM_STATUS`, `RESOURCE_TYPES`, `BATCH_BADGE_CONFIG`.
  **Only `BATCH_BADGE_CONFIG` is imported today** (`StudentBadge.jsx`); the other
  exports are currently unused (see §12).
- `client/src/config/courses.js` — the **fixed** SANKALP / UDAAN programme
  catalogue (fees, duration, images) + `getCourseByValue()`.
- `client/src/config/images.js` — imports and maps all placeholder assets.
- `client/src/hooks/useContactSettings.js` — fetches `/contact-settings` with a
  hard-coded default object as fallback.

---

## 11. Deployment

- **Frontend → Vercel** (build `client/`). Set `VITE_API_BASE_URL` in the Vercel
  dashboard (e.g. `https://neetvidya.onrender.com/api`) and redeploy — Vite inlines
  it at build time. `client/vercel.json` rewrites all non-`assets/` paths to
  `index.html` so client-side routing works.
- **Backend → Render** (root `server/`). Set `MONGODB_URI`, `JWT_SECRET`,
  `JWT_REFRESH_SECRET`, Cloudinary vars, SMTP vars, and
  `CLIENT_URL=https://neetvidya.vercel.app`.
- **Database → MongoDB Atlas. Files → Cloudinary. Email → SMTP provider.**

```
GitHub push
   ├── Vercel  → client/  → vite build → CDN
   ├── Render  → server/  → npm install → start (src/server.js)
   └── Render  ──► MongoDB Atlas + Cloudinary + SMTP
```

Root scripts (`package.json`):
`npm run dev` (server + client via concurrently) · `npm run server` · `npm run client`
· `npm run install-all` · `npm run build` · `npm start`.

---

## 12. Files Kept for Review & Dead-Code Inventory
This section is the outcome of a full audit. **Nothing here is left implicit.**

### 12.1 Not part of the runtime app, kept on purpose
| File | Reason |
|---|---|
| `codebase.py` | Optional dev utility that dumps the repo into `codebase.md` for AI context. Not imported by the app. |
| `implimentation.md` | Historical phase plan (now fully delivered); useful as a changelog. |
| `docs/project-plan.md` | Original full project plan (reference only). |
| `client/src/pages/public/TermsPage.jsx` | Static Terms & Privacy page — **live, routed** at `/terms`. Keep as long as you publish T&C. |

### 12.2 Dead / unused code that still exists (safe to remove or wire up)
| File / symbol | Status | Notes |
|---|---|---|
| `email.service.js → sendWelcomeEmail()` | **Unused** | Defined and exported but never called (admin-created accounts intentionally send no mail). The rest of the file (verification + reset) is live, so the file stays; only this one function is dead. |
| `rateLimiter.middleware.js → examLimiter` | **Unused** | Exported but never applied to any route. Only `authLimiter` is used (`auth.routes.js`). |
| `question.service.js → getRandomQuestions()` | **Unused** | Exported, never called — exams use their own fixed question sets. |
| `course.service.js → addSubjectToCourse()` | **Unused** | Exported, never called (subjects are created via `/academics/subjects`). |
| `constants/cloudinaryFolders.js → LECTURES` | **Unused key** | The "lectures" system is retired; no folder key references remain. |
| `constants/questionStates.js` | **Unused file** | Not imported anywhere (answer states are computed inline). |
| `constants/examStatus.js`, `roles.js`, `batchTypes.js`, `studentTypes.js`, `testTypes.js`, `resourceTypes.js`, `enrollmentStatus.js`, `achievementCategories.js` | **Unused files** | The running code relies on inline enums in the Mongoose schemas / controllers, not these catalogues. Kept as documentation of the enum values. |
| `config/env.js → validateEnv()` | **Unused** | Exported but never called from `server.js`/`app.js`. |
| `middleware/upload.middleware.js` | **Used** | `uploadImage` / `uploadPDF` are used by `upload.routes.js`. Keep. |
| `client/src/config/constants.js → ROLES, TEST_TYPES, BATCH_TYPES, STUDENT_TYPES, EXAM_STATUS, RESOURCE_TYPES` | **Unused exports** | Only `BATCH_BADGE_CONFIG` is imported (by `StudentBadge.jsx`). The other enums are declared but not referenced. |
| `client/src/config/images.js` | **Used** | Central map of placeholder assets, imported by the public pages + `courses.js`. Keep. |
| `models/Notification.js → isRead` (field) | **Legacy** | Kept for back-compat; read tracking now uses `readBy[]`. |
| `models/Attempt.js → isFullScreen` (field) | **Legacy** | Stored but not enforced server-side. |
| `Exam → eligibleBatches[]`, `eligibleStudentTypes[]` | **Legacy fields** | Marked "legacy compatibility" in the model; superseded by `examScope` + `permittedStudents`. |
| `client/src/utils/alert.js`, `csv.js`, `examResultPdf.js`, `studentFollowUp.js` | **Used** | alert = sweetalert2 wrappers; csv = enquiry/export; examResultPdf = PDF result sheet; studentFollowUp = builds the prefilled WhatsApp follow-up message + link used by `AdminStudents.jsx`. Keep. |

### 12.3 Overlap worth consolidating (not dead — both routed)
| Item | Notes |
|---|---|
| `client/src/pages/admin/AdminExams.jsx` (`/admin/exams`) **and** `client/src/pages/teacher/TeacherExams.jsx` (`/teacher/exams`) | Both live and routed; they overlap heavily (both consume `ExamCreateWizard`, question authoring and result screens). Consider extracting shared screens to cut maintenance. |
| `client/src/pages/admin/AdminSettings.jsx` (`/admin/settings`) **and** `AdminContactSettings.jsx` (`/admin/contact-settings`) | Distinct purposes: `AdminSettings` = admin profile / password / system info; `AdminContactSettings` = public contact & links. No redundancy — both are needed. |
| `services/exam.service.js` **and** `services/attempt.service.js` | Both implement `startAttempt` (service-level `exam.service.startAttempt` and the routed `attempt.service.startAttempt`). The routed path is `attempt.service`; `exam.service.startAttempt` is currently not reached from a route. Worth unifying. |

### 12.4 Current state of every folder (exact file counts)
| Location | Count | Contents |
|---|---|---|
| `server/src/models/` | 25 | The full runtime schema set (see §5). |
| `server/src/routes/` | 24 | One file per resource (23) + the `index.js` aggregator. |
| `server/src/controllers/` | 17 | One per resource (`achievement` … `website`). |
| `server/src/services/` | 12 | `attempt, auth, batch, cloudinary, course, dashboard, email, evaluation, exam, notification, question, website`. |
| `server/src/middleware/` | 5 | `auth, role, upload, rateLimiter, errorHandler`. |
| `server/src/utils/` | 6 | `apiError, apiResponse, jwt, pagination, shuffle, slug`. |
| `server/src/config/` | 4 | `db, env, cloudinary, constants`. |
| `server/src/constants/` | 10 | Enum catalogues + cloudinary folders (some unused — §12.2). |
| `client/src/components/shared/` | 12 | `ChangePasswordModal, ConfirmModal, ErrorBoundary, ExamCreateWizard, HomeButton, MotionReveal, NotificationBell, Pagination, ProtectedRoute, StudentBadge, TelegramLink, WhatsAppLink`. |
| `client/src/pages/` | 39 | public(14) · student(9) · teacher(3) · admin(11) · errors(2). |
| `client/src/assets/images/placeholders/` | 36 | `.jpg` / `.png` only (no duplicate `.svg`). |
| `client/src/assets/video/` | 2 | background `.mp4` clips. |

---

## 13. Roadmap / Not Yet Built

The following are **outside the current first release** (present in the original
plan, not implemented on disk): payment-gateway enrolment and fees collection,
Google OAuth, a real-time chat / messaging service, live-class module, AI
assistant, and a mobile app. `Enrollment` already carries payment-shaped fields
(`paymentStatus`, `amountPaid/Total`, `paymentId`) to make those features additive
later without a schema rebuild.

---

*End of document. Every path and field above was verified against the source tree
at the time of writing: 25 models · 24 route files (23 resources + `index.js`) ·
17 controllers · 12 services · 5 middleware · 10 enum catalogues · 39 client pages ·
12 shared components · 5 layouts · 4 client utils.*
