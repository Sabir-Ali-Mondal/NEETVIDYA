# NEETVIDYA — Implementation Plan (from `implimentation.md`)

> Batch = Course. Question Bank = Archive of finished exams. Every exam carries its own
> question set + batch + publishing rules. Materials flow Unit → Chapter → Material.

This document maps every requested change to concrete files and code. It is the single
source of truth while executing.

---

## 0. Diagnosis of reported bugs

| # | Symptom | Root cause (verified in code) |
|---|---|---|
| 1 | `/admin/settings` → **System Info** shows "Something went wrong" | `AdminSettings.jsx` line 277 uses `process.version` in the browser. `process` is undefined in Vite/browser → `ReferenceError` thrown during render → `ErrorBoundary` catches → generic error screen. |
| 2 | No pagination; long sidebar scrolls away; logout buttons far down; bad mobile scrolling | Layouts use `min-h-screen` + `lg:static` sidebar inside a page-level scroll container. Sidebar is not fixed/independently scrollable, content isn't its own scroll region, no mobile bottom safe-area padding. Lists (students, questions, exams) fetch everything at once. |
| 3 | Question Bank used as manual source | `Exam.questions` optional; `attempt.service.js` falls back to random pool when empty. `TeacherDashboard` has a manual "Author New MCQ". `AdminQuestions` is a manual bank. |
| 4 | Dummy material preview | `cloudinary.service.js` resolves a fake `images.unsplash.com` URL on error instead of failing/real upload. No Unit/Chapter wiring in material UI. |
| 5 | No batch on exam / no result-publish rule / no outsider permission | `Exam.batch` optional. No `resultPublishMode`. No per-student exam permission model. `getExams` for students only filters `status = LIVE` (fine) but no batch filtering on attempts. |

---

## 1. Data-model changes (server/src/models)

### 1.1 `Exam.js` — extend
- `batch` → **required** (batch-specific exams).
- `questions` → **required, min length 1** (own question set).
- Add `resultPublishMode`: `"IMMEDIATE" | "MANUAL" | "SCHEDULED"` (default `MANUAL`).
- Add `resultPublishAt`: `Date` (used when `SCHEDULED`), `resultsPublishedAt: Date`.
- Add `status` lifecycle with archive: `DRAFT | PUBLISHED | LIVE | CLOSED | ARCHIVED`.
- Add `visibility` for the Question Bank archive: `studyVisible: Boolean` (default false),
  `archivedAt: Date`, `isArchived: Boolean`.
- Add `permittedStudents: [ObjectId(User)]` — admin-granted outsider access to this one exam.
- Add `subject`, `totalMarks` stays; keep `eligibleBatches` for backward compat but batch is the primary.
- Index: `{ batch: 1, status: 1 }`, `{ isArchived: 1, studyVisible: 1 }`.

### 1.2 New model `ExamPermission.js` (explicit, auditable)
```
student: ObjectId(User) required
exam: ObjectId(Exam) required
grantedBy: ObjectId(User)
reason: String
isActive: Boolean default true
unique index { student, exam }
```
Used when a student is NOT in the exam's batch but admin allows them for that specific exam.

### 1.3 `Material.js` — enforce Unit → Chapter
- Add `unit` required, `chapter` required (already present but optional) → make them required in the
  create path; keep `batch` required. Keep `course` optional (legacy).

### 1.4 `Student.js`
- Permission surface is handled by `ExamPermission` (keeps Student lean). Add convenience:
  `examPermissions: [ObjectId(Exam)]` mirror for fast display on dashboards.

---

## 2. Backend logic

### 2.1 Exam lifecycle & archive — `exam.service.js` / `exam.controller.js`
- `createExam(data,user)`:
  - Validate `batch` present, `questions.length ≥ 1`, `startTime < endTime`.
  - `status = "PUBLISHED"` if `publishNow` else `"DRAFT"`.
  - Persist `resultPublishMode`, `resultPublishAt`.
- `publishExam` → sets `PUBLISHED`/`LIVE`, `publishedAt`.
- `closeExam` → `CLOSED`, then **auto-archive**: set `isArchived=true`, `archivedAt=now`.
  (Archive = Question Bank entry. No separate Question docs created — the exam *is* the
  question set.)
- `archiveExam(id)` / `unarchiveExam(id)` explicit endpoints.
- `setStudyVisibility(id, bool)` — hide/unhide archive from students.
- `reconductExam(id, {startTime,endTime,batch})` — clone exam + questions into a new DRAFT/LIVE exam.
- `downloadExam(id)` — returns JSON exam pack (questions+options+correct answers) for export.
- `getQuestionBank()` — list archived exams.
- `grantExamPermission({studentId, examId, reason})` / `revokeExamPermission`.

### 2.2 Access enforcement — new `middleware/examAccess.middleware.js`
`canAccessExam(user, exam)`:
- admin/teacher → allow.
- student: `exam.status ∈ {PUBLISHED, LIVE}` **AND**
  ( student's `batches` includes `exam.batch` **OR** active `ExamPermission` exists ).
- **Draft/secret exams: never visible to students** regardless of batch.
Applied in `attempt.service.startAttempt`, `exam.controller.getExamById/getExams`,
`result.routes` result/solutions endpoints.

### 2.3 Result publishing — `result.routes.js` + `evaluation.service.js`
- On evaluation, `Result.isPublished` derived from exam rule:
  - `IMMEDIATE` → `isPublished = true`.
  - else → `false` until published.
- Add fields `isPublished: Boolean`, `publishedAt: Date` to `Result.js`.
- Student result endpoints return only `isPublished` results (or masked "result pending").
- New endpoints: `PUT /exams/:id/publish-results`, `PUT /exams/:id/publish-results` (bulk), and a
  scheduler helper `publishScheduledResults()` invoked on server tick / on request.

### 2.4 Question Bank = archive — `question.routes.js`
- `/questions/bank` re-implemented to return **archived exams** (exam papers), not loose questions.
- Remove manual bank creation emphasis; keep `POST /questions/with` **scoped to an exam**
  (`examId` required) → questions belong to that exam only.
- CSV import: `POST /exams/:id/import-questions` (JSON rows) and CSV parsing on client → same endpoint.

### 2.5 Materials
- `material.controller.js`: require `unit`,`chapter`,`batch`; real Cloudinary upload.
- `cloudinary.service.js`: **remove dummy unsplash fallback** — reject on failure (502) so UI shows real error.
- `academic.routes.js`: add authenticated CRUD `POST /academics/units`, `POST /academics/chapters`,
  `GET /academics/units?subject=`, `GET /academics/chapters?unit=`.
- New `GET /materials/tree?batch=` returns Unit→Chapter→Materials nested for the student course view.

### 2.6 Dashboards — `dashboard.service.js`
- `getStudentDashboard`: include `batch` clearly, scope `upcomingTests` to student's batch and LIVE/PUBLISHED,
  scope `recentMaterials` to student's batch + unit/chapter, `recentResults` only published.
- `getTeacherDashboard`: replace `questionCount` (manual bank) with `examCount`/`materialCount`.

### 2.7 System Info fix (server)
- Harden `/admin/system-health` with try/catch returning safe defaults (already has try/catch, keep).
- Frontend fix is the actual fix (see §3.1).

---

## 3. Frontend

### 3.1 `AdminSettings.jsx` — fix System Info crash
- Replace `process.version` → `systemHealth?.server?.nodeVersion || "—"`.
- Replace API base label → use `import.meta.env.VITE_API_BASE_URL || "/api"`.
- Wrap every `systemHealth` access in optional chaining + fallbacks (already partly done).
- Add a small `ErrorBoundary` around the tab content so one bad field can't blank the page.

### 3.2 Layouts (Admin/Teacher/Student) — scroll + sidebar + mobile
- Restructure to: `h-screen overflow-hidden flex` root; `<aside className="... lg:sticky top-0 h-screen overflow-y-auto">`;
  content column `flex-1 flex-col min-w-0 overflow-hidden`; header sticky; `<main className="flex-1 overflow-y-auto p-4 pb-24 lg:pb-8">`.
- Logout + user block move to a **fixed bottom of sidebar** (always visible).
- Add `env(safe-area-inset-bottom)` padding + `pb-24` on mobile so nothing hides behind browser bars.
- Add a reusable `ScrollableTable`/`Pagination` shared component.

### 3.3 Shared components (new)
- `client/src/components/shared/Pagination.jsx` — page controls + page-size.
- `client/src/components/shared/DataTable.jsx` — sticky header, horizontal scroll wrapper, empty state.
- `client/src/components/shared/Toast` (already have `utils/alert.js`, reuse).

### 3.4 Teacher/Admin Exam workflow — `TeacherExams.jsx` (+ `AdminExams.jsx`)
- **Create Exam** wizard: Basic details (batch required, subject, duration, marks, negative marking,
  start/end) → **Add Questions** (two modes: *Create in UI* with text+image for question & options, or
  *Import CSV*) → **Settings** (result publish rule: immediate / manual / scheduled; visibility).
- Remove “Select Questions from Bank”. Questions are created for **this exam** (`examId`).
- CSV column spec + client-side parse; then editable rows (add images after import).
- Exam cards: Results, Publish, Close→Archive, Reconduct, Download.
- Question Bank tab becomes **Archived Exam Papers** with Study-visibility toggle + Download.

### 3.5 `TeacherDashboard.jsx`
- Remove "Recently Authored MCQs" section and "Author New MCQ" modal + `questionCount` KPI.
- Autosave/duration/negative marking rules config (also surfaced in exam wizard).

### 3.6 Materials authoring — `TeacherMaterials.jsx`
- Add flow: Subject → select/create **Unit** → select/create **Chapter** → Add Material (upload to Cloudinary).
- Real preview (thumbnail for images, icon for PDF) — no dummy image.
- Tree/accordion listing grouped Unit → Chapter → Materials.

### 3.7 Student
- `StudentDashboard.jsx`: prominent **batch banner** at top.
- `LearnPage.jsx`: render **Unit → Chapter → Material** accordion course view with view.
- `TestsPage.jsx`: list only accessible (batch/permitted) PUBLISHED/LIVE exams; respect pagination.

### 3.8 Public `/courses` + admin courses
- Public `CoursesPage.jsx` shows **batches** (Batch = Course showcase).
- Remove "Courses" nav item + route from `AdminLayout.jsx` / `App.jsx`; fold into Batches.
- `AdminBatches.jsx` gains the showcase fields (title/description/features/fee/duration) from courses.

### 3.9 Pagination everywhere
- Students, Teachers, Exams, Materials, Enquiries, Questions, Results: server accepts `page/limit`,
  returns meta; UI uses `Pagination`.

### 3.10 Digital Learning Center
- `LearnPage.jsx` becomes the redesigned Batch → Unit → Chapter → Material experience (no subject-only grid).

---

## 4. Execution order

1. Server models (Exam, ExamPermission, Result, Material).
2. Server exam service/controller/routes + access middleware + archive + permissions.
3. Server question archive endpoints + CSV import.
4. Server materials/academic tree + Cloudinary hardening + dashboards.
5. Client shared components (Pagination, DataTable).
6. Client layouts (scroll/mobile).
7. Client AdminSettings fix.
8. Client exam workflow (Teacher + Admin).
9. Client Teacher dashboard cleanup.
10. Client materials authoring + student Learn/Tests/Dashboard.
11. Client courses/batches consolidation + remove admin Courses.
12. Pagination sweep.
13. Build + verify.

---

## 5. Non-goals / compatibility
- Keep legacy `course` refs working (nullable) to avoid breaking existing data.
- Existing seeded exams without `batch`/`questions` still load for admin/teacher (read-only) but
  cannot be published until fixed (validation on publish).
---

## 6. EXECUTION STATUS (completed)

All changes below were implemented and verified (`client` production build passes;
`server` all modules load and boot against MongoDB; 0 syntax errors).

### Backend
- `models/Exam.js` — batch required, own `questions` required, `resultPublishMode`
  (IMMEDIATE/MANUAL/SCHEDULED), `resultPublishAt`, `resultsPublished`, `permittedStudents`,
  archive fields (`isArchived`, `archivedAt`, `studyVisible`, `reconductedFrom`).
- `models/ExamPermission.js` — NEW. Explicit per-student, per-exam access grants.
- `models/Result.js` — `isPublished`, `publishedAt`.
- `models/Material.js` — `batch`, `unit`, `chapter` required.
- `models/Student.js` — `examPermissions` mirror.
- `services/exam.service.js` — full lifecycle: create (validation), publish, close→**archive**,
  archive/unarchive, study visibility, reconduct, download pack, Question Bank listing,
  result publishing (immediate/manual/scheduled sweep), grant/revoke/list permissions,
  `canAccessExam`/`assertExamAccess` (draft never visible; batch OR permission), attempt bootstrap
  uses only the exam's own questions.
- `services/attempt.service.js` — access enforced, own-question-set only, no random bank pool.
- `services/evaluation.service.js` — result visibility set from the exam's publishing rule.
- `services/dashboard.service.js` — student dashboard batch-scoped; teacher dashboard no longer
  exposes a question-bank count.
- `services/cloudinary.service.js` — dummy Unsplash fallback removed; real uploads or a 502 error.
- `controllers/exam.controller.js` + `routes/exam.routes.js` — all new endpoints wired
  (`/bank`, `/archive`, `/study-visibility`, `/reconduct`, `/download`, `/publish-results`,
  `/:id/questions` (UI+image), `/:id/import-questions` (CSV payload), `/:id/permissions`).
- `controllers/material.controller.js` + `routes/material.routes.js` — Unit/Chapter required,
  new `GET /materials/tree` (Unit → Chapter → Materials).
- `routes/academic.routes.js` — `GET/POST /units`, `GET/POST /chapters`.
- `routes/question.routes.js` — `/bank` now returns archived exam papers.
- `routes/result.routes.js` — students only see published results and their own.
- `controllers/student.controller.js` — student detail includes `examPermissions`.

### Frontend
- `AdminSettings.jsx` — **System Info fixed** (removed browser-unsafe `process.version`/`process.env`).
- `layouts/Admin|Teacher|Student` — `h-screen` fixed sidebar, independent content scroll,
  always-visible logout, mobile safe-area bottom padding (`pb-24`).
- `components/shared/Pagination.jsx` — NEW reusable pagination.
- `utils/csv.js` — NEW CSV parser + template downloader.
- `pages/teacher/TeacherExams.jsx` — 3-step Create-Exam wizard (Basic → Add Questions (UI + CSV) →
  Settings incl. result publishing rule), Exam Manager with Publish/Close&Archive/Publish Results,
  and a **Question Bank** tab (archived papers: reconduct / publish-for-study / download).
- `pages/teacher/TeacherDashboard.jsx` — “Recently Authored MCQs” and the manual MCQ modal removed;
  KPIs now Active Exams / Archived Papers / Study Materials + “How exams work” + assigned batches.
- `pages/teacher/TeacherMaterials.jsx` — Subject → Unit → Chapter → Material authoring (create or pick),
  real Cloudinary upload, tree listing.
- `pages/student/StudentDashboard.jsx` — prominent **batch banner**.
- `pages/student/LearnPage.jsx` — redesigned Digital Learning Center: Unit → Chapter → Material.
- `pages/student/TestsPage.jsx` — shows only accessible exams + archived study papers, paginated.
- `pages/public/CoursesPage.jsx` — now a **batch/course showcase** (Batch = Course).
- `App.jsx` / `AdminLayout.jsx` — separate “Courses” removed from admin (folded into Batches);
  admin Exam/Question-Bank routes use the unified Exam Manager.
- `pages/admin/AdminStudents.jsx` — grant/revoke **per-exam access** for exam-only/guest students.

### Not changed (intentionally)
- `pages/admin/AdminExams.jsx` and `AdminQuestions.jsx`/`AdminCourses.jsx` files remain on disk but
  their routes are redirected to the unified pages, so no duplicate system is reachable.
