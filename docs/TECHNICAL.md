# NEETVIDYA — Technical Documentation

> Complete technical reference for the NEETVIDYA medical-education platform.
> Covers architecture, the full system flow, the database model, the API surface,
> and an inventory of files that are now dead / redundant and safe to remove.
>
> **Audience:** developers joining or maintaining the project.
> **Scope:** as-built (matches the current code on disk), not the original plan.

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
12. [Files Kept for Review](#12-files-kept-for-review)

---

## 1. Project Overview

NEETVIDYA is a coaching + examination-management platform for a NEET tutoring
institute. It is split into a **public marketing website** and three
**authenticated portals** (Student, Teacher, Admin), all served by a single
Express REST API backed by MongoDB.

Core capabilities:

- **Public website** — homepage with admin-managed hero/announcement bar, courses
  (fixed two-programme catalogue), faculty, test-series promo, results/achievements,
  testimonials, admission enquiry form.
- **Student portal** — dashboard, study materials (Unit → Chapter → Material,
  including video lectures), test series, CBT exams, results, performance analytics,
  profile.
- **Teacher workspace** — dashboard, Faculty Library (materials), exam authoring
  (create exams, attach exam-specific questions, import via CSV), result publishing,
  exportable result sheets.
- **Admin panel** — students, teachers, batches, courses, exams, questions,
  enquiries, achievements, contact settings, website settings, system health.
- **CBT exam engine** — attempts with server-enforced timing, per-exam fixed
  question sets, randomisation, negative marking, auto-evaluation, rank/percentile,
  gated result publishing.
- **Shareable public exam links** (`/e/:slug`) for advertising / virality.
- **Batch-scoped notifications** — students only see notifications for their batches.

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
| Toasts/modals | sweetalert2 |
| State | React Context + hooks |
| Backend | Node.js + Express 4 |
| Database | MongoDB + Mongoose 8 |
| Auth | JWT (access + refresh), bcryptjs |
| File storage | Cloudinary (via multer memory upload) |
| Email | nodemailer (SMTP) |
| Validation | express-validator (installed; optional usage) |
| Security | helmet, express-rate-limit, CORS, compression |

---

## 3. Repository Layout

```
NEETVIDYA/
├── package.json                 # root scripts (dev / install-all / build / start)
├── HOWTORUN.md                  # how to install, seed and run
├── README.md                    # short service summary
├── TECHNICAL.md                 # ← this document
├── implimentation.md            # historical phase plan + completion status
├── codebase.py                  # (optional) utility: dumps source into codebase.md
├── client/                      # React + Vite frontend
│   ├── index.html
│   ├── vite.config.js           # dev proxy /api → :5000
│   ├── tailwind.config.js
│   └── src/
│       ├── App.jsx              # all routes
│       ├── main.jsx
│       ├── config/              # api.js, courses.js, images.js, constants.js
│       ├── context/             # AuthContext.jsx
│       ├── hooks/               # useContactSettings.js
│       ├── layouts/             # Public / Student / Teacher / Admin / Exam
│       ├── components/
│       │   └── shared/          # reusable widgets (bell, modals, badges…)
│       ├── pages/
│       │   ├── public/          # marketing + auth pages
│       │   ├── student/
│       │   ├── teacher/
│       │   ├── admin/
│       │   └── errors/
│       └── utils/               # alert.js, csv.js, examResultPdf.js
└── server/                      # Express + Mongoose backend
    ├── .env.example
    └── src/
        ├── server.js            # entry: connect DB, listen
        ├── app.js               # express app, middleware, mounts routes
        ├── seed.js              # bootstrap admin only
        ├── config/              # db.js, env.js, cloudinary.js, constants.js
        ├── constants/           # enum catalogues (batch/exam/test types…)
        ├── routes/              # one file per resource + index.js
        ├── controllers/         # request handlers
        ├── services/            # business logic
        ├── models/              # Mongoose schemas
        ├── middleware/          # auth, role, upload, rate-limit, error handler
        └── utils/               # apiResponse, apiError, jwt, shuffle, slug, pagination
```

> This tree reflects the cleaned repo (see §12 for the few files kept).

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
  │  protect  → verify JWT → req.user
  │  authorize("admin","teacher")  → role gate
  ▼
exam.controller.getExams → exam.service.getExams
  │  build role-aware filter (students: batch + permission; staff: all)
  ▼
Mongoose Exam.find(...).populate(...)
  ▼
MongoDB Atlas
  ▼
apiResponse(res, 200, "...", { exams })   →   JSON to browser
```

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
(unique, e.g. `NV-2026-0001`), `studentType`, `batches[]→Batch`, `enrollmentDate`,
parent/school/class/address/city/whatsapp fields, `tags[]`, `notes`,
`examPermissions[]→Exam` (mirror for dashboards), `avatarBase64`, `isActive`.

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
  subjects[]→Subject, duration, features[], cover, feeAmount/Currency, isActive,
  displayOrder, createdBy`. (Note: public site + batch creation actually use the
  **fixed** catalogue in `client/src/config/courses.js`.)
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
- **TestSeries** — `title, description, course, subjects[], cover, totalTests,
  exams[]→Exam, isActive, createdBy`.

### Exams & results

- **Exam** — `title, description, testType (DPP|CHAPTER_TEST|UNIT_TEST|MOCK_TEST|
  PYQ), testSeries, course, batch (req), questions[]→Question, subjects[],
  totalQuestions, totalMarks, marksPerCorrect, negativePerWrong, duration,
  startTime, endTime, maxAttempts, randomizeQuestions, randomizeOptions,
  status (DRAFT|SCHEDULED|PUBLISHED|LIVE|CLOSED|ARCHIVED), instructions,
  resultPublishMode (IMMEDIATE|MANUAL|SCHEDULED), resultPublishAt,
  resultsPublished, permittedStudents[]→User, shareSlug (unique), isPublic,
  isArchived, archivedAt, studyVisible, reconductedFrom→Exam,
  eligibleBatches[]/eligibleStudentTypes[] (legacy), createdBy`. Indexes:
  `(batch,status)`, `(isArchived,studyVisible)`.
- **Question** — `questionText, questionImageUrl/PublicId, options[]{text,imageUrl,
  order}, correctAnswer (index), explanation + image, subject, batch, unit,
  chapter, topic, difficulty, marks, negativeMarks, source, year, tags[],
  createdBy, isActive`. Indexes: `(subject,chapter)`, `difficulty`, `(source,year)`.
- **Attempt** — `exam→Exam, student→User, startedAt, serverEndTime, submittedAt,
  status (IN_PROGRESS|SUBMITTED|AUTO_SUBMITTED|ABANDONED),
  answers[]{question,selectedOption,markedForReview,timeSpent}, currentQuestion,
  questionOrder[], optionOrders[][], totalScore, correct/wrong/unattempted Count,
  accuracy, timeTaken, tabSwitchCount, isFullScreen`. Index `(exam,student)`.
- **Result** — `attempt→Attempt (unique), exam→Exam, student→User, totalMarks,
  obtainedMarks, counts, accuracy, timeTaken, percentage, rank, percentile,
  isPublished, publishedAt, subjectBreakdown[], chapterBreakdown[]`.

### Messaging & website

- **Notification** — `title, message, type (MATERIAL|LECTURE|TEST|RESULT|
  ANNOUNCEMENT|GENERAL), scope (BATCH|STUDENT|ROLE), targetRole, targetBatches[],
  targetStudents[], readBy[]→User, createdBy, isActive`. Visibility is batch-scoped
  by default (`scope: BATCH`).
- **WebsiteContent** — singleton-per-section CMS: `section (unique enum), slides[],
  blocks[], stats[], announcementBar, isVisible, meta`.
- **ContactSettings** — singleton: institute contact, socials, WhatsApp/Telegram,
  office hours, map embed.
- **Testimonial / Achievement / Enquiry / ActivityLog** — see diagram.

> The announcement bar is not a separate collection — it lives on
> `WebsiteContent` (`section: "ANNOUNCEMENT_BAR"`).

---

## 7. Authentication & Authorization

**Tokens.** Login returns an access token (default 7d) and refresh token (30d).
The client stores `neetvidya_token` / `neetvidya_refresh` in `localStorage`. The
axios request interceptor attaches the access token; on `401`, the response
interceptor calls `POST /auth/refresh` and retries once, else redirects to `/login`.

**Password model.**
- Self-registered users choose their own password.
- Admin-created teacher/student accounts get the **constant default password**
  `Neetvidya@123` (`server/src/config/constants.js`) and `mustChangePassword=true`.
- `ProtectedRoute.jsx` enforces a **first-login password-change gate** before the
  portal is usable; `changePassword()` clears the flag and stamps `passwordChangedAt`.
- **No credential emails are sent** for admin-created accounts (welcome email is
  deprecated).

**Roles.** `student | teacher | admin`, enforced server-side by
`middleware/role.middleware.js` (`authorize(...)`).

**First-login gate & profile.** Full `protectedRoute.jsx` blocks the portal and
forces password change when `mustChangePassword` is true. Students keep full
self-service profile/password. Teachers also self-manage password (decision A);
admins cannot edit a teacher's profile/password from the panel.

**Batch access (post-Phase-1).** `buildAccessibleBatchFilter()` returns the plain
active-batch filter for **all** roles — every teacher sees every batch. Teachers
are **not** restricted to their `assignedTeachers` list (retained only for
display/back-compat).

**Exam access rule.** `Student.batches[]` membership grants exam access directly.
A student outside the exam's batch needs an explicit `ExamPermission` grant
(outsiders / EXAM_ONLY / GUEST), requested via the prefilled WhatsApp button and
granted by an admin.

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
        →  evaluation.service computes score, counts, accuracy, subject/chapter breakdown
        →  Attempt.status = SUBMITTED, Result created (isPublished=false)
   →  Result visibility gated by Exam.resultPublishMode
   →  Once published → Rank/percentile computed → student sees ResultPage + solutions
```

### (c) Exam authoring (teacher/admin)
```
Create exam (DRAFT, batch required)
   →  attach questions to THIS exam (UI or CSV import)  →  set totalQ/Marks/duration
   →  publishExam (sets shareSlug)  →  students of the batch notified
   →  Copy Link button  →  /e/:slug public preview (no questions exposed)
   →  after closing → archiveExam (becomes part of the Question Bank)
```

### (d) Batch-scoped notifications
```
Emitter (material added / exam published / results published)
   →  notification.service.notifyBatch(batchId, …)
Students see:  targetStudents=me  OR  (scope=BATCH AND targetBatches ∈ my batches)
              OR  (scope=ROLE AND targetRole ∈ [all, myRole])
→  No global floods.
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
   →  admin sees it in AdminEnquiries (status PENDING → CONTACTED → RESOLVED)
   →  exportable to CSV
```

---

## 9. API Surface

All routes are mounted under `/api` (`routes/index.js`). `protect` = JWT required;
role column = `authorize(...)` gate; `—` = public.

| Base | Method & Path | Auth / Role | Purpose |
|---|---|
| health | GET `/api/health` | — | liveness |
| auth | POST `/auth/register` | — | self-register (rate-limited) |
| | GET `/auth/verify-email` | — | verify via token |
| | POST `/auth/resend-verification` | — | resend verify |
| | POST `/auth/login` | — | login (rate-limited) |
| | POST `/auth/refresh` | — | rotate access token |
| | POST `/auth/forgot-password` | — | send reset link |
| | POST `/auth/reset-password` | — | reset with token |
| | GET `/auth/me` | protect | current user |
| | PUT `/auth/profile` | protect | update own profile |
| | PUT `/auth/change-password` | protect | change own password |
| | POST `/auth/admin/create-student` | admin | create student |
| | POST `/auth/admin/create-teacher` | admin | create teacher |
| students | GET `/students` | admin,teacher | list |
| | GET `/students/my` | student | own profile (populated batches+groups) |
| | PUT `/students/my`, `/my/avatar` | student | update profile/avatar |
| | GET `/students/:id` | protect | one student |
| | PUT `/students/:id`, `/toggle-active` | admin | edit / toggle |
| | DELETE `/students/:id` | admin | remove |
| teachers | GET `/teachers/public` | — | public faculty list |
| | GET `/teachers` | admin | list |
| | GET `/teachers/my` | teacher | own profile |
| | PUT `/teachers/:id`, `/permissions`, `/toggle-active` | admin | manage |
| batches | GET `/batches` | protect | list (role-aware) |
| | POST/PUT/DELETE `/batches[/:id]` | admin | CRUD |
| | POST/DELETE `/batches/:id/students[/:studentId]` | admin | membership |
| | GET `/batches/:id/students` | protect | roster |
| enrollments | GET `/enrollments/my` | student | own enrollments |
| | POST `/enrollments` | admin | enroll student |
| courses | GET `/courses`, `/courses/:id` | — | list/one |
| | POST/PUT/DELETE `/courses[/:id]` | admin | CRUD |
| academics | GET `/academics/subjects` | — | list (lazy-seeds defaults) |
| | POST `/academics/subjects` | admin,teacher | create custom subject |
| | GET `/academics/units`, `/chapters` | — | taxonomy reads |
| | POST `/academics/units`, `/chapters` | admin,teacher | create |
| | GET `/academics/tree/:courseId` | — | tree |
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

### Server constants (`server/src/config/constants.js`)
- `DEFAULT_PASSWORD = "Neetvidya@123"` — constant password for admin-created accounts.
- `DEFAULT_SUBJECTS = ["Biology","Physics","Chemistry","Mathematics"]` (lazily seeded).
- `CUSTOM_SUBJECT_LABEL = "Other"`.

### Frontend constants (`client/src/config/constants.js`)
Enums (ROLES, TEST_TYPES, BATCH_TYPES, STUDENT_TYPES, EXAM_STATUS, RESOURCE_TYPES)
and `BATCH_BADGE_CONFIG`. Fixed programme catalogue lives in
`client/src/config/courses.js` (SANKALP, UDAAN).

---

## 11. Deployment

- **Frontend** → Vercel (build `client/`). Set `VITE_API_BASE_URL` in the Vercel
  dashboard (e.g. `https://neetvidya.onrender.com/api`) and redeploy (Vite inlines
  it at build time).
- **Backend** → Render (root `server/`). Set `MONGODB_URI`, JWT secrets, Cloudinary,
  SMTP, and `CLIENT_URL=https://neetvidya.vercel.app`.
- **Database** → MongoDB Atlas. **Files** → Cloudinary. **Email** → SMTP provider.

```
GitHub push
   ├── Vercel  → client/  → build → CDN
   ├── Render  → server/  → npm install → start (src/server.js)
   └── Render  ──► MongoDB Atlas + Cloudinary + SMTP
```

---

## 12. Files Kept for Review

The repo has already been cleaned of its redundant files — unused models,
unused middleware, unused utilities and unused frontend components have been
removed, and the component/middleware/utils folders now contain only what the
app actually imports. This section lists the small remainder that was retained
on purpose or that may still warrant a decision.

### Kept on purpose
| File | Reason |
|---|---|
| `codebase.py` | Optional dev utility that dumps the repo into `codebase.md` for AI context. Not part of the app; harmless to keep if useful. |
| `implimentation.md` | Historical phase plan (now fully delivered). Useful as a changelog. |
| `server/src/services/email.service.js` | Only the `sendWelcomeEmail()` helper inside it is unused (admin-created accounts send no mail). The rest of the file (verification + reset emails) is live, so the file stays. |

### Possibly redundant — decide case-by-case
| File | Notes |
|---|---|
| `client/src/pages/admin/AdminSettings.jsx` (`/admin/settings`) | Generic settings page; verify it isn't superseded by `AdminContactSettings` before removing. |
| `TeacherExams.jsx` + `AdminExams.jsx` | Both exist and are routed (`/teacher/exams`, `/admin/exams`). They overlap heavily — consider consolidating into one shared screen to cut maintenance. |
| `client/src/pages/public/TermsPage.jsx` | Minimal/static; keep only if you publish T&C. |

### Current state of the cleaned folders
| Location | Contents |
|---|---|
| `server/src/models/` | 25 collections (the full set used at runtime) |
| `server/src/middleware/` | `auth`, `role`, `upload`, `rateLimiter`, `errorHandler` |
| `server/src/utils/` | `apiResponse`, `apiError`, `jwt`, `shuffle`, `slug`, `pagination` |
| `client/src/components/` | only components that are actually imported |
| `client/src/assets/images/placeholders/` | `.jpg` / `.png` assets only (no duplicate `.svg`) |
