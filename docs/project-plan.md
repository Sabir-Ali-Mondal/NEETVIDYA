# NEETVIDYA — Final Complete Project Plan

---

## 1. Project Overview

NEETVIDYA is a professional Medical Education, Coaching and Examination Management Platform for a newly established tutoring institute.

The platform serves two major purposes. First, it acts as the official promotional website of NEETVIDYA, helping the institute build its brand, present its courses and faculty, attract students and parents, and generate admission enquiries. Second, it provides a complete digital learning and test-series platform for enrolled students.

The platform is developed using the MERN Stack — MongoDB, Express.js, React.js and Node.js — with Cloudinary as the primary file and media storage solution. Small student avatar images are stored as base64 directly in MongoDB. All other media goes through Cloudinary.

The architecture is modular and future-ready so that Payment, AI features, Live Classes and Mobile Apps can be introduced later without rebuilding the core system.

---

## 2. Communication Strategy

**WhatsApp is not a feature.** There is no WhatsApp API integration. WhatsApp exists only as a simple external hyperlink on the contact page, the admission enquiry section, and optionally on course cards. The link opens wa.me with a prefilled message. Admin sets one phone number and one default message text from the website settings page. That is the entire extent of WhatsApp in this platform.

**Telegram Bot is the communication channel.** For student doubts, general consulting, admission queries, and basic consumer services, NEETVIDYA uses a Telegram Bot. This is not a full chat module built into the website. It is an external Telegram bot connected to the NEETVIDYA backend via webhook. Students and visitors message the bot on Telegram. Admin and teachers respond through Telegram. The bot can broadcast announcements. The admin panel has a configuration section for the bot token, auto-reply messages, and linked Telegram groups.

This approach means the website does not need a real-time chat system, WebSocket servers, or message storage. Telegram handles all of that externally. The platform provides the configuration interface and the link to the bot.

---

## 3. Authentication Strategy

**Students:** Email and password with email verification. Self-registration is available. Later, optionally, Google OAuth sign-in can be added to reduce friction. Google login is not included in the initial build.

**Teachers:** Email and password only. Admin creates teacher accounts from the Admin Panel. Teachers do not self-register. Admin sets their email and either assigns a temporary password or sends a setup link. No Google login for teachers.

**Admin:** Email and password only. No OAuth. No social login. Admin is the most sensitive role and must always use direct email and password authentication. A super admin creates additional admin accounts.

**Admin Quick-Create for Students:** Since admin initially enrolls most students manually into batches and courses, the Admin Panel includes a quick-create feature. Admin enters the student name, email, and batch. The system creates the account with a generated temporary password and sends it to the student email. The student logs in, changes their password, and gains access. This is faster than requiring every student to self-register.

**Google Login — Deferred:** Google OAuth for students is a later addition. It requires Google Cloud Console setup, OAuth credential configuration, redirect URI management, account linking logic, and additional backend routes. This adds development time before the core platform is stable. It becomes valuable when hundreds of students are self-registering. For initial launch, email and password is sufficient.

**Auth Summary:**

| Role | Login Method | Self-Register | Google Login |
|---|---|---|---|
| Student | Email + Password | Yes | Later, optional |
| Teacher | Email + Password | No, admin creates | Never |
| Admin | Email + Password | No, super admin creates | Never |

---

## 4. Main Objectives

The system provides:

- Professional NEETVIDYA institute website
- Institute branding and promotion
- Course and batch presentation
- Faculty presentation with professional photographs
- Batch and student classification system with visual badges
- Student registration and login with email verification
- Admin-created teacher and student accounts
- Student learning dashboard
- Study materials and PDFs
- Recorded classes
- Course resources and external links
- Central question bank
- Professional test-series system
- DPP, Chapter Tests, Unit Tests, Mock Tests
- NEET Previous Year Questions
- Automatic examination evaluation
- Results and performance analysis
- Teacher management with granular permissions
- Complete Admin Panel
- Admin-managed website content including hero banners, achievements, announcements
- Telegram Bot for communication and consulting
- Simple WhatsApp contact links only
- Notifications and announcements
- Responsive mobile-first design
- Secure role-based access
- Cloudinary-based media and file management
- Base64 student avatars in MongoDB
- Enrollment and access control ready for future payment
- Architecture ready for future AI and Mobile App
- Single placeholder image folder for development

---

## 5. Overall Platform Structure

The platform divides into two major areas.

The Public Website handles institute promotion. It contains the homepage with hero slider, announcement bar, trust indicators, about section, courses, teaching methodology, test series promotion, results and achievements, faculty, testimonials, contact, and admission enquiry.

The Digital Platform handles the authenticated experience. It contains three panels — Student, Teacher, and Admin — all built on React, communicating through REST APIs to a Node and Express backend, which connects to MongoDB for application data and Cloudinary for file storage.

A Telegram Bot sits alongside as an external communication channel, configured from the Admin Panel.

---

## 6. Technology Stack

**Frontend:** React.js with React Router, Tailwind CSS, shadcn/ui component library, Lucide React icons, Framer Motion for subtle animations, Recharts for performance charts, TanStack Table for admin data tables, Axios for API calls. Vite as the build tool.

**Backend:** Node.js and Express.js handling authentication, authorization, REST APIs, user management, academic content, question bank, test-series engine, exam evaluation, results, notifications, Cloudinary integration, Telegram Bot webhook, security, and activity logging.

**Database:** MongoDB storing all application data — users, students, teachers, batches, courses, subjects, units, chapters, materials, lectures, course resources, questions, test series, exams, attempts, answers, results, notifications, website content, achievements, enrollments, activity logs. Student avatar images stored as base64 strings in student documents.

**Storage:** Cloudinary for all media except small student avatars. PDFs, teacher photographs, institute photographs, course images, recorded class videos, promotional videos, achievement images, question images, and all uploaded media go through Cloudinary. MongoDB stores metadata and Cloudinary references. Large files are never stored directly in MongoDB.

**External Communication:** Telegram Bot API for student-teacher interaction, doubt solving, consulting, and announcements. No WhatsApp API. WhatsApp is link-only.

---

## 7. Website Design Direction

The recommended visual style is Premium Modern Medical EdTech combined with SaaS Dashboard aesthetics.

The public website should feel professional, medical, academic, premium, trustworthy, and modern.

The Student, Teacher, and Admin panels should feel like a modern EdTech SaaS platform.

The examination interface should be minimal and serious, similar to a competitive examination environment. No distractions. No branding overload. Just the exam.

---

## 8. NEETVIDYA Brand Design

The existing logo is the primary source for visual identity.

Color usage follows the 80-15-5 rule. Eighty percent of the interface uses White and Soft backgrounds. Fifteen percent uses Dark and Deep Black for text, navigation, and strong sections. Five percent uses Lime Green and Medical Green for accents, buttons, active states, and small highlights. Green is never the dominant background color. It is an accent.

The specific palette:

- Deep Black #0B0F0D — Hero sections, navigation, strong sections
- Lime Green #A8C900 — Primary brand accent
- Medical Green #18A66A — Action buttons, highlights
- White #FFFFFF — Main background
- Soft #F6F8F7 — Dashboard backgrounds
- Dark #111714 — Text

---

## 9. Typography

Manrope for major headings. Inter for body text and UI elements. JetBrains Mono for the exam timer display. All loaded via Google Fonts. Typography must be clean and highly readable on mobile devices.

---

## 10. Visual Assets and Placeholder Image Strategy

The website should not be built with only code and CSS. The ideal combination is coded UI plus real institute photography plus professionally edited graphics plus limited high-quality video.

Use real NEETVIDYA assets wherever possible — teachers, classrooms, institute building, students, events, achievements, certificates, results. Avoid random stock photographs. Videos should be used strategically, not making the entire homepage video-heavy.

**Placeholder Image Folder:**

During development, all placeholder images live in a single flat folder:

client/src/assets/images/placeholders/

No subfolders. Every dummy image is in this one folder. Each file is named exactly after what it represents. When real images are ready, the developer replaces the file with the same name in the same folder. No code changes needed.

The placeholder files include:

- hero-slide-1.jpg, hero-slide-2.jpg, hero-slide-3.jpg
- about-institute.jpg
- methodology-flow.jpg
- course-neet-foundation.jpg, course-class-xi.jpg, course-class-xii.jpg, course-neet-dropper.jpg, course-test-series.jpg
- teacher-1.jpg through teacher-6.jpg
- testimonial-student-1.jpg, testimonial-student-2.jpg, testimonial-parent-1.jpg
- achievement-result-1.jpg, achievement-result-2.jpg, achievement-milestone-1.jpg
- test-series-banner.jpg
- contact-institute.jpg
- lecture-thumbnail-1.jpg, lecture-thumbnail-2.jpg, lecture-thumbnail-3.jpg
- student-avatar-default.jpg
- og-image.jpg
- login-side-image.jpg, register-side-image.jpg
- empty-state-materials.jpg, empty-state-tests.jpg, empty-state-results.jpg

All components reference these images through a single configuration file that exports every image path. Components import from there. If the folder path ever changes, one file is updated, not fifty components.

For development, use simple solid-color rectangles with text labels, or free placeholder images, or basic Canva exports. The point is that layout, sizing, cropping, and positioning are all visible during development.

For basic image and video editing: use Canva for simple graphics, banners, and course thumbnails. Use CapCut for short promotional clips. Export at proper sizes — hero images at 1920 by 1080, card images at 800 by 600, profile photos at 800 by 800.

---

## 11. Image Handling Rules

**Teacher Images:** Stored on Cloudinary in the neetvidya/teachers/ folder. Professional headshots or half-body photos. Minimum 800 by 800 pixels. Square or slightly portrait aspect ratio. Admin uploads and manages from the Admin Panel. Cloudinary handles resizing for different display sizes. These appear on the public faculty section, student dashboard, course pages, and potentially promotional materials. They represent institute credibility and must look professional and consistent.

**Student Images:** Small profile pictures. Resized to 120 by 120 pixels. Converted to base64. Stored directly in the student document in MongoDB. Not Cloudinary. Maximum file size before conversion: 200 KB. Format: JPEG or WebP. The base64 string is roughly 10 to 20 KB in the database, which is negligible. Student avatars appear in student dashboard, admin student lists, teacher performance views, exam result tables, and batch student lists. They never appear on the public website. If no image is uploaded, a default avatar from the placeholder folder is used.

**All Other Images:** Cloudinary. Hero slides, course covers, about images, achievement images, testimonial photos, lecture thumbnails, question images, material PDFs, lecture videos. Each goes to its designated Cloudinary folder.

**Image Handling Summary:**

| Image Type | Storage | Location | Size | Managed By |
|---|---|---|---|---|
| Hero slides | Cloudinary | neetvidya/website/ | 1920x1080 | Admin |
| About institute | Cloudinary | neetvidya/website/ | 1200x800 | Admin |
| Course covers | Cloudinary | neetvidya/courses/ | 800x600 | Admin |
| Teacher photos | Cloudinary | neetvidya/teachers/ | 800x800 | Admin |
| Achievement images | Cloudinary | neetvidya/achievements/ | 800x600 | Admin |
| Testimonial photos | Cloudinary | neetvidya/website/ | 400x400 | Admin |
| Lecture thumbnails | Cloudinary | neetvidya/lectures/ | 640x360 | Teacher |
| Lecture videos | Cloudinary | neetvidya/lectures/ | Original | Teacher |
| Material PDFs | Cloudinary | neetvidya/materials/ | Original | Teacher |
| Question images | Cloudinary | neetvidya/questions/ | 600x400 | Teacher/Admin |
| Student avatars | MongoDB base64 | Student document | 120x120 | Student/Admin |
| Dev placeholders | Local folder | client/src/assets/images/placeholders/ | Various | Developer |

---

## 12. Course and Subject Management

Both Course and Subject exist. They serve different purposes and are not alternatives.

**Course is the enrollment and branding unit.** A course is what NEETVIDYA sells, advertises, and what a student joins. Examples: NEET Foundation, Class XI NEET Prep, Class XII NEET Prep, NEET Dropper, NEET Crash Course, NEET Test Series Only. A course has a name, description, target audience, duration, cover image, a list of subjects it includes, and a fee structure field for future payment. Students enroll in a course. Batches belong to a course. The public website displays courses. Admin creates and manages courses.

**Subject is the academic content unit.** A subject is Physics, Chemistry, or Biology. Subjects exist inside courses. Content — materials, lectures, questions, chapters, units — is organized under subjects. A subject does not exist independently in the student view. A student sees Physics inside NEET Dropper Course, not Physics floating alone.

**The academic hierarchy is:**

Course contains Subjects. Subject contains Units. Unit contains Chapters. Chapter contains Topics. Topic contains Materials and Lectures. Questions are tagged to Subject, Unit, Chapter, and Topic.

**In the Admin Panel**, both have management pages. Course management handles creating courses, setting descriptions, assigning subjects, managing batches under courses, and controlling public display. Subject management handles creating subjects within a course, organizing units and chapters, and linking teachers to subjects.

**In the Student Panel**, the student sees their enrolled course first, then subjects within it, then units, chapters, and materials.

**In the Teacher Panel**, a teacher is assigned to a subject within a course. They manage content for their assigned subject.

---

## 13. Batch and Student Classification System

A coaching institute always has mixed student types. The system handles this clearly.

**Batch Types:**

- OFFLINE — Student attends the institute physically for regular classes.
- ONLINE — Student learns remotely through recorded lectures and digital materials.
- HYBRID — Student sometimes attends physically and sometimes learns online.
- EXAM ONLY — Student does not attend classes. They only appear for tests and test series.
- CRASH COURSE — Short intensive batch with a compressed timeline.

**Each Batch contains:** a name, a short code, the batch type, the linked course, academic year, start and end dates, capacity, list of enrolled students, assigned teachers with their subjects, schedule description, optional Telegram group link, a color for visual identification, and an active status.

**Each Student has:** a primary student type classification set by admin, a list of batches they belong to, enrollment date, parent contact information, school name, current class level (XI, XII, Dropper, Repeater), address, city, tags for custom labels, and private admin notes.

**Visual Identification:** Every student displays a badge or tag throughout the system showing their type. In admin student lists, in teacher performance views, in exam result tables, and on the student's own profile, a small colored tag indicates whether they are Offline, Online, Hybrid, Exam Only, or Crash Course. These use text labels and Lucide React icons. For example, an Offline student shows a building icon with the text "Offline" in a blue-tinted badge. An Online student shows a monitor icon with the text "Online" in a purple-tinted badge. An Exam Only student shows a clipboard icon with "Exam Only" in an orange-tinted badge. No emoji is used anywhere.

**Batch-Based Exam Eligibility:** When creating an exam, admin can restrict it to specific batches or specific student types. For example, a DPP might only be for the Offline Dropper batch. A mock test might be open to all batches. An exam-only student might only see test series exams, not chapter tests.

**Batch Management:** Admin creates and manages batches from the Admin Panel. Admin assigns students to batches. Teachers can view students in their assigned batches. The batch system feeds into enrollment and access control.

---

## 14. Enrollment and Access Control

Even though payment is a future module, the enrollment system exists now.

**Each Enrollment records:** the student, the course, the optional batch, the status (Active, Expired, Suspended, Completed), the enrollment date, an optional expiry date, the payment status (initially always Free, later Paid or Partial), the payment ID and amounts (null for now), specific access flags for materials, lectures, test series, and downloads, who enrolled the student, and the enrollment type (Admin Manual, Self Register, Payment, or Invitation).

**Today, enrollment is manual.** Admin goes to the student profile and enrolls them in a course. The enrollment is created with payment status Free and full access. The student immediately sees the course content.

**Later, when payment is added,** the flow becomes: student clicks Buy Now, payment gateway processes, enrollment is created with payment status Paid. The access control middleware already works. No rebuild is needed.

**Access Middleware:** Every protected content route checks whether the requesting student has an active, non-expired enrollment for that course. Admins and teachers bypass this check. This middleware is written once and works for both free and paid access.

---

## 15. Course Resources

Teachers can attach external resource links to courses, subjects, or chapters. These are not uploaded files. They are links to external content.

**Resource Types:** External Link (any URL), YouTube (video or playlist link), Google Drive (folder or file link), Reference Site (NCERT, Khan Academy, official sites), Tool (calculators, periodic tables, formula sheets), Custom (anything else).

**Each Resource contains:** the linked course, optional subject and chapter, title, description, resource type, URL, optional thumbnail image, display order, a public flag (true means visible on the public course page for marketing, false means only enrolled students see it), active status, and who added it.

**Where resources appear:** On the public website, only public resources show under a "Free Resources" section on course pages. On the student dashboard, all resources for enrolled courses appear under the Learn section, grouped by subject and chapter. On the teacher panel, teachers manage resources for their assigned courses.

---

## 16. Telegram Bot Integration

The Telegram Bot serves as the communication layer for the institute. It replaces the need for a built-in chat module.

**What the bot handles:**

- Student doubt solving — students message the bot, teachers or admin respond on Telegram.
- Admission enquiry follow-up — enquiries from the website can be forwarded to a Telegram group.
- General consulting — prospective students and parents can ask questions.
- Consumer services — existing students can raise issues.
- Announcement broadcasting — admin sends a message from the panel, bot broadcasts to a Telegram channel or group.

**How it works architecturally:**

The backend has a Telegram Bot service. It uses the Telegram Bot API through a simple HTTP library. The bot token is stored in environment variables and configurable from the Admin Panel settings. The backend sets a webhook URL pointing to the NEETVIDYA server. When someone messages the bot, Telegram sends a POST to the webhook. The server processes it and can auto-reply or log it.

The Admin Panel has a Telegram settings section where admin can: set or update the bot token, set the webhook URL, configure an auto-reply message for new messages, link the bot to a Telegram group for teacher responses, enable or disable the bot, and view recent messages or enquiries received.

**What the bot does NOT do:** It does not store chat history in MongoDB. It does not provide a chat UI inside the website. It does not replace Telegram. It is a bridge. Students chat on Telegram. Teachers respond on Telegram. The NEETVIDYA panel configures and monitors.

**On the website:** The contact page and admission enquiry section display a link or button saying "Message us on Telegram" that opens the bot Telegram link. The student dashboard shows a "Contact on Telegram" link for general support. This is just a hyperlink, similar to how WhatsApp links work.

---

## 17. WhatsApp — Links Only

WhatsApp is not a feature. It is not a module. There is no API integration. There is no configuration panel beyond a single phone number field and a default message field.

On the contact page, there is a "Chat on WhatsApp" link that opens wa.me with a prefilled message. On the admission enquiry form, below the submit button, there is a secondary link saying "Or reach us on WhatsApp." Optionally, each course card on the public website can have a small WhatsApp enquiry link.

Admin sets the institute WhatsApp number and the default prefilled message from the Website Settings page. Two input fields and a save button. Nothing more.

No floating WhatsApp button unless admin explicitly enables it. No WhatsApp groups. No WhatsApp API. Just hyperlinks.

---

## 18. Admin-Managed Website Content

The public website content is not hardcoded. Admin manages it from the Admin Panel.

**Hero Section:** Admin creates multiple hero slides. Each slide has a title, subtitle, description, primary CTA text and link, secondary CTA text and link, a background image uploaded to Cloudinary, a display order, and an active flag. The public website cycles through active slides.

**Announcement Bar:** A thin bar at the very top of the website. Admin sets the text, an optional link, background color, text color, and toggles it on or off. Used for admission announcements, exam reminders, or institute news.

**Achievements:** Admin adds individual achievement entries. Each has a title, description, category (Student Result, Institute Milestone, Award, Certification, Event, Custom), optional student name and batch, optional photo or certificate image uploaded to Cloudinary, optional score text, year, a featured flag (featured items appear on the homepage), display order, and active status. For a newly established institute, only real data should be published. No artificial statistics.

**Results Showcase:** A dedicated section showing student NEET results. Each entry shows student name, photo, score, batch, and year. Admin manages these.

**Testimonials:** Admin manages testimonials from students and parents. Each has a name, role (Student or Parent), course, optional photo, and the testimonial text.

**About, Methodology, Contact Info:** All editable from the Website section of the Admin Panel.

**SEO Meta:** Admin sets page titles and meta descriptions for public pages.

---

## 19. Public Institute Website — Sections

The public website homepage flows in this order from top to bottom.

**Announcement Bar.** Thin, dismissible, admin-controlled. Appears only when active.

**Navigation Bar.** NEETVIDYA logo on the left. Links: Home, Courses, Faculty, Test Series, Results, About, Contact. Right side: Login button and Join NEETVIDYA button.

**Hero Slider.** Admin-managed slides with background images, headings, descriptions, and CTA buttons. Subtle auto-rotation with manual navigation dots.

**Trust Bar.** Four items in a horizontal row: Expert Faculty, Structured Learning, Regular Tests, NEET Focused. Uses Lucide icons and short text. Clean and minimal.

**About NEETVIDYA.** Brief introduction with institute vision, mission, and teaching philosophy. Written for both students and parents. Includes an image of the institute or classroom.

**Courses Section.** Course cards showing course name, target class, subjects, duration, key features, short description, and a CTA button. Each card can optionally show a Telegram enquiry link and a WhatsApp enquiry link. Admin manages courses.

**Teaching Methodology.** A visual flow showing the academic process: Concept Building, Classroom Learning, Study Material, Daily Practice, Chapter Tests, Mock Tests, Performance Analysis. Presented as a step-by-step visual. Important for parents to understand the approach.

**Test Series Promotion.** A dedicated marketing section for the NEETVIDYA Test Series. Shows available test types (DPP, Chapter Test, Unit Test, Mock Test, PYQ). CTA to explore or register.

**Results and Achievements.** Student result cards with photos and scores. Institute milestones. Awards. All real data, managed by admin. For a new institute, this section starts small and grows.

**Faculty Section.** Teacher cards with professional photograph, name, subject, qualification, experience, specialisation, and a short introduction. Only genuine information.

**Testimonials.** A carousel or grid of student and parent testimonials managed by admin.

**Contact and Admission Enquiry.** Institute address, phone, email, location map, Telegram bot link, WhatsApp link, and an enquiry form. Strong CTA: "Start Your NEET Preparation With NEETVIDYA."

**Footer.** Quick links, social media links, Telegram link, copyright, and institute registration details if applicable.

---

## 20. Student Platform

Students get a separate authenticated dashboard after login.

**Main Navigation:** Dashboard, Learn, Tests, Results, Performance, Profile.

**Dashboard:** Shows continue learning section with the current chapter in progress. Upcoming tests with dates. Recent materials and newly added notes. Recent classes. Announcements from admin. Quick performance snapshot showing accuracy, tests attempted, and progress. Batch information with badge. Telegram contact link for support.

**Learn Section:** Browse by Course, then Subject, then Unit, then Chapter, then Topic. Each level shows available materials (PDFs), recorded lectures, and resource links. Students can view PDFs in-browser, watch recorded videos, and open external resource links.

**Tests Section:** View available test series, upcoming exams, DPPs. Filter by subject, test type, and status. Start exam from here.

**Results Section:** View all past test results. Score summary, correct-wrong-unattempted breakdown, accuracy percentage, time taken. Drill down to question-by-question review with correct answers and explanations.

**Performance Section:** Test history. Accuracy trend chart. Subject-wise performance breakdown. Chapter-wise performance. Comparison over time.

**Profile Section:** Personal information. Profile picture (small base64 in MongoDB). Batch and enrollment details. Student type badge. Password change. Telegram contact for support.

---

## 21. Study Material System

Academic content follows a strict hierarchy: Course, then Subject, then Unit, then Chapter, then Topic, then Material.

Materials include PDF notes, study material, practice sheets, and reference documents. Each material has a title, description, subject, unit, chapter, topic, assigned teacher, Cloudinary file URL and public ID, file size, upload date, and active status.

Students access materials through the Learn section. Materials can be viewed in-browser using a PDF viewer component or downloaded.

---

## 22. Recorded Classes

Students access recorded lectures through the Learn section. Each lecture has a title, teacher, subject, chapter, duration, thumbnail image, video URL from Cloudinary, description, and display order within the chapter.

Videos are stored on Cloudinary. The frontend uses a clean video player. Lectures are organized under Subject, then Unit, then Chapter, showing the sequence of classes.

---

## 23. Question Bank

NEETVIDYA maintains a central question bank. This is the foundation of the entire test system.

Each question contains: the question text, optional question image, four options with text and optional images, the correct answer index (required), an explanation (optional, can be added later), optional explanation image, subject, unit, chapter, topic, difficulty level (Easy, Medium, Hard), marks for correct answer, negative marks for wrong answer, source (NEET, NEETVIDYA, Reference), year for PYQ, tags, created-by reference, and active status.

The critical design decision: correct answer is required for automatic evaluation. Explanation is optional. This means NEETVIDYA can launch a test even if detailed written solutions are not ready yet. Explanations can be added later, and students reviewing their results will see the newly added explanations automatically.

Teachers with the createQuestions permission can add questions. Admin can bulk-import questions via spreadsheet upload for NEET PYQs.

---

## 24. Test Series System

Test Series is a proper module, not just another exam type. A Test Series is a named collection of tests organized under a theme.

Example structure: NEETVIDYA Biology Test Series 2026 contains Test 01 for Cell Biology, Test 02 for Biomolecules, Test 03 for Genetics, Test 04 for Human Physiology, Test 05 for Ecology.

Each Test Series has a title, description, linked course, linked subjects, cover image, list of exams, total test count, active status, and created-by reference.

Admin or authorized teachers create and manage test series. Students see test series in their Tests section and can view all tests within a series.

---

## 25. Test Types

The platform supports: DPP (Daily Practice Problems), Chapter Test (questions from one chapter), Unit Test (questions from a complete unit), Mock Test (full NEET-style examination), and NEET PYQ (previous year questions). The architecture allows additional test types to be added later through configuration.

---

## 26. Professional Exam Engine

The examination system is one of the two core features of the platform, alongside the learning system.

**Exam Flow:** Student sees exam in the Tests section. Clicks to start. Reads exam instructions page. Confirms and starts. Enters the question interface. Navigates between questions. Selects answers. Marks for review. Clears responses. Submits or auto-submits when time expires. Server evaluates automatically. Student sees result. Student can review solutions.

**Exam Interface:** The interface is minimal and serious. It contains: a countdown timer at the top using a monospace font, the question number, the question text and optional image, four options to select, Previous and Next navigation buttons, a Clear Response button, a Mark for Review toggle, a question palette showing all question numbers as colored boxes indicating their state, and a Submit button.

**Question States:** Answered (selected an option), Unanswered (no selection), Marked for Review (flagged for later), Answered and Marked for Review (selected an option and flagged). Each state has a distinct color in the question palette.

**Timer:** The backend is the authority for exam timing. When the student starts the exam, the server records the start time and calculates the end time. The frontend timer counts down from the server-provided end time. If the timer reaches zero, the test auto-submits. The frontend timer is not trusted as the sole timer. The server validates timing on submission.

**Negative Marking:** Configurable per exam. Example: plus four for correct, minus one for wrong, zero for unattempted. Different tests can use different values.

**Question Randomisation:** Support for random question order and random option order. This reduces basic answer sharing between students. The randomised order is stored in the attempt document so it is consistent for that student throughout the attempt.

**Exam Scheduling:** Admin or authorized teachers configure exam date, start time, end time, duration, attempt limit, eligible students or batches, linked course, test type, and linked subjects.

**Exam Status Lifecycle:** Draft, Scheduled, Live, Closed. Students can only attempt Live exams. Admin controls the transitions.

**Attempt Recovery:** The system periodically saves the student's attempt state to the server. This allows reasonable handling of page refresh, temporary network interruption, and browser issues. When a student returns, they see a resume screen. The server validates attempt status, exam timing, student eligibility, and submission state before allowing resume.

---

## 27. Basic Exam Security

Server-side timer validation. Attempt restrictions. Activity logging. Full-screen detection using the browser Fullscreen API. Tab-switch detection that increments a counter. Question randomisation. Option randomisation. Multiple-attempt restrictions. These are basic anti-cheating measures, not full AI proctoring. The tab switch count and full-screen status are recorded in the attempt document and visible to admin.

---

## 28. Results

After submission, the student sees: total marks, obtained marks, number correct, number wrong, number unattempted, accuracy percentage, and time taken.

Students can review individual questions. For each question they see: the question text, their selected answer, the correct answer, and the explanation if available. If the explanation was not available when the test was launched but was added later, the student sees it when they review. This is automatic because the explanation is fetched from the question document at review time, not stored in the attempt.

---

## 29. Performance Analysis

Initial analytics include: test history with scores, accuracy over time as a line chart, correct-wrong-unattempted breakdown per test, subject-wise performance as a bar chart, chapter-wise performance, and attempt history. Advanced AI-powered analytics can be introduced later.

---

## 30. Teacher Panel

Teacher navigation: Dashboard, Materials, Classes, Questions, Exams, Resources, Performance, Profile.

**Teacher Dashboard:** Shows quick stats — materials uploaded, lectures uploaded, questions created, exams created. Shows recent activity. Shows assigned batches.

**Materials:** Upload and manage PDFs and study materials for assigned courses and subjects. Upload goes through Cloudinary.

**Classes:** Upload and manage recorded video lectures. Upload goes through Cloudinary. Set title, subject, chapter, duration, thumbnail.

**Questions:** Create and edit questions within permission scope. Add correct answers. Add or update explanations. View existing questions filtered by subject and chapter.

**Exams:** Create tests and test series if permitted. Select questions from the question bank. Configure timing, marking, randomisation.

**Resources:** Add and manage external resource links for assigned courses. YouTube links, Google Drive links, reference sites, tools.

**Performance:** View student performance for assigned subjects and batches. See accuracy trends, common wrong answers, chapter-wise weak areas.

**Profile:** Update personal information, professional photograph (Cloudinary), Telegram username, and opt in or out of student contact display.

---

## 31. Teacher Permission System

Admin controls teacher permissions granularly. Each teacher has a set of boolean permission flags: upload materials, upload lectures, create questions, edit questions, create exams, create test series, view student performance, manage students, access website settings.

This prevents teachers from accidentally accessing administrative functionality. The permission middleware on the backend enforces these checks. Frontend hiding alone is not security.

---

## 32. Admin Panel

The Admin Panel provides complete control over the entire platform.

**Dashboard:** Statistics showing total students, teachers, courses, batches, materials, videos, questions, test series, tests, attempts. Recent activity feed. Recent registrations. Recent tests. Latest uploads.

**User Management:** Manage students — view, search, filter by batch, filter by type, activate, deactivate, reset password, enroll in courses, assign to batches, add tags, add notes, quick-create student accounts. Manage teachers — view, create, edit, set permissions, set professional photo, activate, deactivate. Manage admins.

**Batch Management:** Create batches. Set type, course, schedule, capacity. Assign teachers to batches. Add or remove students. Set batch color for visual identification. Set Telegram group link. View batch details and student list.

**Enrollment Management:** Enroll students in courses. Set access flags. Set expiry dates. View all enrollments. Filter by course, status, student type.

**Academic Management:** Manage courses, subjects, units, chapters, topics. Full CRUD. Organise the academic hierarchy.

**Content Management:** View all materials and lectures. Upload if needed. Delete. Organise by course and subject.

**Resource Management:** View all course resources. Add, edit, delete. Toggle public visibility.

**Question Bank Management:** View all questions. Filter by subject, chapter, difficulty, source, year. Add, edit, delete. Bulk import from spreadsheet. Add or update explanations.

**Test Series Management:** Create and manage test series. Add or remove tests from a series.

**Exam Management:** Create exams. Configure all settings. Add questions. Schedule. Publish. Close. View attempts.

**Results Management:** View all results. Filter by exam, batch, student.

**Achievement Management:** Add, edit, delete achievements. Set featured flag. Upload images. Categorise.

**Notification Management:** Create notifications for students. Announcements. Test reminders. New content alerts.

**Website Management:** Manage hero slides. Edit announcement bar. Update about section. Manage methodology content. Update contact information. Set WhatsApp contact number. Configure Telegram bot. Manage testimonials. Manage faculty display. Manage course display. Set SEO meta.

**Telegram Settings:** Set bot token. Configure webhook. Set auto-reply message. Link to Telegram group. Enable or disable. View recent enquiries.

**Settings:** General institute settings. Admin account settings. Security settings. Activity logs.

---

## 33. Admin Navigation Structure

Dashboard. Students. Teachers. Batches. Enrollments. Courses. Academics (Subjects, Units, Chapters). Materials. Lectures. Resources. Questions. Test Series. Exams. Results. Achievements. Notifications. Website (Hero, About, Methodology, Faculty Display, Testimonials, Contact, WhatsApp, Telegram, SEO). Settings.

---

## 34. Notifications

Notifications cover: new materials uploaded, new lectures uploaded, new tests scheduled, upcoming test reminders, test results available, new announcements, institute updates.

Notifications appear in the student dashboard and as a bell icon in the navigation. Admin creates notifications from the panel. Future support can include email and push notifications.

---

## 35. Search and Filtering

The platform supports search and filter across materials, questions, tests, teachers, students, and batches.

Filters include: subject, unit, chapter, difficulty, source, year, test type, batch type, student type, course, status.

---

## 36. Authentication and Roles

Three primary roles: Student, Teacher, Admin. The backend enforces role-based access on every route. Frontend hiding alone is not security. JWT-based authentication with token refresh. Password hashing with bcrypt. Protected routes on both frontend and backend. Email verification for student self-registration. Admin-created accounts for teachers.

---

## 37. Security

Password hashing. Protected routes. Role-based authorization. Permission-based teacher access. Input validation. API validation. Rate limiting. Secure session and token management. Protected resources. Exam attempt validation. Activity logs. Secure environment variables. Cloudinary access control. Full-screen and tab-switch detection for exams. Server-side timer authority. No social login for admin or teachers.

---

## 38. Database Collections

Users, Students, Teachers, Batches, Enrollments, Courses, Subjects, Units, Chapters, Topics, Materials, Lectures, CourseResources, Questions, TestSeries, Exams, ExamQuestions, Attempts, Answers, Results, Notifications, Announcements, Achievements, Testimonials, Faculty, Enquiries, WebsiteContent, TelegramConfig, ActivityLogs.

---

## 39. Cloudinary Flow

Admin or Teacher uploads a file through the React frontend. The frontend sends it to the Express API. The API uploads it to Cloudinary. Cloudinary returns a secure URL and a public ID. The server stores the metadata and the Cloudinary URL and public ID in MongoDB. MongoDB never stores the actual file.

Cloudinary folders: neetvidya/materials, neetvidya/lectures, neetvidya/teachers, neetvidya/courses, neetvidya/website, neetvidya/questions, neetvidya/achievements.

Student avatars do not go through Cloudinary. They are base64 in MongoDB.

---

## 40. Backend Architecture

The server follows a layered structure. Routes receive requests and pass them to Controllers. Controllers handle HTTP concerns and call Services. Services contain business logic and interact with the Database and Cloudinary. Models define data schemas. Middleware handles authentication, authorization, permissions, validation, file uploads, rate limiting, error handling, and activity logging. Validators define input validation rules. Utils provide helpers for API responses, errors, JWT, pagination, shuffling, exam timer logic, slug generation, and constants.

All logic lives in controllers and services, not in route files.

**Server folder structure:**

Root contains package.json, .env, .env.example.

Inside src: app.js (Express app setup), server.js (entry point, DB connect, listen).

config folder: db.js, cloudinary.js, cors.js, env.js, telegram.js.

models folder: User.js, Student.js, Teacher.js, Admin.js, Batch.js, Enrollment.js, Course.js, Subject.js, Unit.js, Chapter.js, Topic.js, Material.js, Lecture.js, CourseResource.js, Question.js, TestSeries.js, Exam.js, ExamQuestion.js, Attempt.js, Answer.js, Result.js, Notification.js, Announcement.js, Achievement.js, Testimonial.js, Faculty.js, Enquiry.js, WebsiteContent.js, TelegramConfig.js, ActivityLog.js.

controllers folder: one controller per resource area.

routes folder: index.js mounting all routes, plus individual route files.

services folder: one service per business logic area, including telegram.service.js.

middleware folder: auth.middleware.js, role.middleware.js, permission.middleware.js, enrollment.middleware.js, upload.middleware.js, validate.middleware.js, errorHandler.middleware.js, rateLimiter.middleware.js, activityLog.middleware.js.

validators folder: input validation schemas per resource.

utils folder: apiResponse.js, apiError.js, jwt.js, pagination.js, shuffle.js, examTimer.js, slug.js, constants.js.

constants folder: roles.js, testTypes.js, questionStates.js, examStatus.js, cloudinaryFolders.js, batchTypes.js, studentTypes.js, resourceTypes.js.

---

## 41. Frontend Architecture

The client follows a component-based structure.

Root contains package.json, index.html, tailwind.config.js, postcss.config.js, vite.config.js.

Inside src: main.jsx, App.jsx, index.css.

config folder: api.js (Axios instance), routes.js (all route paths), constants.js (roles, test types, batch types, student types), images.js (all placeholder and asset image paths exported from one file).

context folder: AuthContext.jsx, ThemeContext.jsx, NotificationContext.jsx.

hooks folder: useAuth.js, useFetch.js, useExam.js, useTimer.js, usePagination.js, useDebounce.js.

services folder: one service file per API area.

components folder organised as: ui (shadcn primitives), layout (navbars, sidebars, layouts), shared (reusable components), public (website components), student (student panel components), exam (exam interface components), results (result and solution components), teacher (teacher panel components), admin (admin panel components).

pages folder organised as: public, student, teacher, admin, errors.

layouts folder: PublicLayout.jsx, StudentLayout.jsx, TeacherLayout.jsx, AdminLayout.jsx, ExamLayout.jsx.

utils folder: formatDate.js, formatDuration.js, calculateAccuracy.js, cn.js (Tailwind class merge), validators.js.

assets folder: images/placeholders/ (single flat folder with all dummy images).

---

## 42. Responsive Design

The system is mobile-first. Students are likely to use phones heavily, so the Student Platform must be especially mobile-friendly. The public website must be fully responsive. Admin and Teacher dashboards can use more information-dense desktop layouts but must still function on tablets.

---

## 43. Navigation Structure

**Public Website:** Home, Courses, Faculty, Test Series, Results, About, Contact. Login. Join NEETVIDYA.

**Student Panel:** Dashboard, Learn, Tests, Results, Performance, Profile.

**Teacher Panel:** Dashboard, Materials, Classes, Questions, Exams, Resources, Performance, Profile.

**Admin Panel:** Dashboard, Students, Teachers, Batches, Enrollments, Courses, Academics, Materials, Lectures, Resources, Questions, Test Series, Exams, Results, Achievements, Notifications, Website, Telegram Settings, Settings.

---

## 44. Future-Ready Modules

These are not part of the initial implementation but the architecture supports them.

**Chat Module:** If in-app chat is needed later, the notification and messaging foundation exists. Telegram can continue alongside or be replaced.

**Payment Module:** The enrollment model already has payment fields. The access control middleware already checks enrollment status. When payment is added, the flow becomes: student pays, payment gateway confirms, enrollment is created or updated with payment status Paid. No rebuild needed.

**AI Module:** AI should be an independent service. Possible future features include AI doubt solving, AI tutor, question generation, personalised study plans, performance recommendations, question explanations, AI-based student analysis. The main website and examination system continue working even when AI is unavailable.

**Mobile App:** The same backend APIs can serve a mobile application. No separate backend needed.

**Live Classes:** Can be integrated through external tools or custom implementation later.

**Advanced Analytics:** Beyond the initial charts, deeper analytics can be added.

**Certificates:** Auto-generated certificates for course completion or test performance.

**Google Login:** OAuth for students only. Added when self-registration volume justifies the configuration effort.

---

## 45. Development Phases

**Phase 1 — Core Platform.** MERN project setup. Placeholder image folder and image config file. Authentication with email and password. Email verification for students. Admin quick-create for students. Role-based access. User, Student, Teacher, Admin models. Batch model. Enrollment model. Course, Subject, Unit, Chapter, Topic models. Dashboards. Admin user management. Batch management. Enrollment management.

**Phase 2 — Learning Platform.** Study materials. PDF management. Cloudinary integration. Recorded classes. Course resources. Student learning interface. Teacher uploads. Teacher resource management.

**Phase 3 — Question Bank and Test Series.** Question bank. Question creation. Answer management. Explanation management. DPP. Chapter Tests. Unit Tests. Mock Tests. NEET PYQs. Test Series. Bulk question import.

**Phase 4 — Professional Exam Engine.** Exam instructions. Timer. Question navigation. Question palette. Mark for review. Clear answer. Negative marking. Randomisation. Auto-submit. Attempt recovery. Exam scheduling. Attempt limits. Full-screen and tab-switch detection.

**Phase 5 — Results and Performance.** Automatic evaluation. Result generation. Correct, wrong, unattempted counts. Accuracy. Solutions review. Subject analysis. Chapter analysis. Test history. Performance tracking. Notifications.

**Phase 6 — Promotional Website.** Premium homepage. Hero slider. Announcement bar. Courses. Faculty. About. Teaching methodology. Test series promotion. Results and achievements. Testimonials. Institute photographs. Promotional graphics. Contact and admission enquiry. Telegram bot link. WhatsApp link. Mobile optimisation. Admin website content management. Achievement management.

**Phase 7 — Telegram and Communication.** Telegram bot configuration. Webhook setup. Auto-reply. Admin Telegram settings. Enquiry forwarding. Student contact links.

**Phase 8 — Production and Security.** Security hardening. API validation. Rate limiting. Database indexing. Cloudinary optimisation. Error handling. Logging. Backup strategy. Performance optimisation. Mobile testing. Browser testing. Production deployment. Replace placeholder images with real assets.

---

## 46. Initial Launch Capability

The first production version can:

Promote the institute through the public website showing courses, faculty, teaching method, institute information, achievements, test series, and contact details, leading to admission enquiries.

Run test series by having admin create a test series, add tests, add questions with correct answers, publish the test, students attempt, automatic evaluation generates results, and teachers or admin add detailed solutions later which students can then review.

Manage students through batches, classify them as offline, online, hybrid, or exam-only, enroll them in courses, and control their access.

Create student accounts quickly from admin panel with temporary passwords.

Communicate through Telegram bot for doubts and enquiries, and simple WhatsApp links for contact.

Manage the entire website content from the admin panel without touching code.

---

## 47. What Is NOT in This Platform

No WhatsApp API integration. WhatsApp is link-only.

No built-in chat module. Telegram Bot handles communication.

No payment processing. Enrollment is manual. Payment fields exist for future.

No AI features. Architecture is ready for future.

No live classes. Can be added later.

No mobile app. APIs are app-ready.

No Google login initially. Email and password only. Google OAuth for students deferred.

No social login for admin. No social login for teachers. Ever.

No emoji in any code, UI label, badge, component, or data. All visual indicators use text labels and Lucide React icons.

---

## 48. Key Design Principles

Green is an accent, not a dominant color. Use the 80-15-5 rule.

Real data only. No fake statistics, no artificial achievements, no stock photos pretending to be institute photos.

Mobile-first for students. Desktop-optimised for admin and teachers.

Exam interface is minimal and serious. No branding clutter during exams.

Explanations can be added after test launch. Do not block test publishing waiting for solutions.

Batch classification is visual and immediate. Anyone looking at a student list should instantly know their type.

Admin controls all website content. No developer needed for content updates after launch.

Telegram handles communication. The website does not try to be a messaging platform.

Teacher images are professional and Cloudinary-managed. Student images are small base64 in MongoDB.

All placeholder images are in one folder with descriptive names. Replace by name when real assets arrive.

Email and password authentication first. Google login later for students only if needed. Admin creates teacher accounts. Admin quick-creates student accounts.

The system is one unified platform — institute website plus learning platform plus examination platform — not three separate things stitched together.

---

## 49. Final Product Vision

NEETVIDYA functions as three integrated pillars under one admin panel.

The Institute Website handles promotion, courses, faculty, about, methodology, results, achievements, test series marketing, and contact.

The Learning Platform handles materials, recorded classes, resources, student dashboard, progress tracking, and batch-based access.

The Examination Platform handles question bank, test series, DPP, chapter tests, unit tests, mock tests, PYQs, professional exam engine, automatic evaluation, results, solutions, and performance analysis.

The Admin Panel sits above all three and provides complete management. The Telegram Bot sits alongside as the communication channel. WhatsApp exists only as a contact link. Authentication is email and password. Admin creates accounts for teachers and can quick-create accounts for students.

The first launch promotes the newly established institute and starts running its test series, while Chat, Payment, AI, and Google Login remain future modules that can be added without rebuilding.

---

This is the final, complete, consolidated NEETVIDYA project plan. Every decision, every feature, every constraint, every architectural choice is documented here. Ready for implementation.