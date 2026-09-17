# NEETVIDYA Project Codebase

> This file contains the essential source code and configuration for the NEETVIDYA platform. 
> It excludes binaries, locks, secrets, and unused UI components to optimize for AI context.

**Project:** `NEETVIDYA`  
**Included files:** `196`  
**Skipped files:** `83`  
**Max file size:** `150 KB`  

---

# Project Structure

```text
NEETVIDYA
├── client
│   ├── src
│   │   ├── components
│   │   │   ├── exam
│   │   │   │   └── ExamResumeScreen.jsx
│   │   │   └── shared
│   │   │       ├── ConfirmModal.jsx
│   │   │       ├── EmptyState.jsx
│   │   │       ├── ErrorBoundary.jsx
│   │   │       ├── FileUpload.jsx
│   │   │       ├── LoadingSpinner.jsx
│   │   │       ├── NotificationBell.jsx
│   │   │       ├── Pagination.jsx
│   │   │       ├── PDFViewer.jsx
│   │   │       ├── ProtectedRoute.jsx
│   │   │       ├── SkeletonLoader.jsx
│   │   │       ├── StudentBadge.jsx
│   │   │       ├── TelegramLink.jsx
│   │   │       └── WhatsAppLink.jsx
│   │   ├── config
│   │   │   ├── api.js
│   │   │   ├── constants.js
│   │   │   └── images.js
│   │   ├── context
│   │   │   └── AuthContext.jsx
│   │   ├── hooks
│   │   │   └── useContactSettings.js
│   │   ├── layouts
│   │   │   ├── AdminLayout.jsx
│   │   │   ├── ExamLayout.jsx
│   │   │   ├── PublicLayout.jsx
│   │   │   ├── StudentLayout.jsx
│   │   │   └── TeacherLayout.jsx
│   │   ├── pages
│   │   │   ├── admin
│   │   │   │   ├── AdminAchievements.jsx
│   │   │   │   ├── AdminBatches.jsx
│   │   │   │   ├── AdminContactSettings.jsx
│   │   │   │   ├── AdminCourses.jsx
│   │   │   │   ├── AdminDashboard.jsx
│   │   │   │   ├── AdminEnquiries.jsx
│   │   │   │   ├── AdminExams.jsx
│   │   │   │   ├── AdminQuestions.jsx
│   │   │   │   ├── AdminSettings.jsx
│   │   │   │   ├── AdminStudents.jsx
│   │   │   │   └── AdminTeachers.jsx
│   │   │   ├── errors
│   │   │   │   ├── NotFound.jsx
│   │   │   │   └── Unauthorized.jsx
│   │   │   ├── public
│   │   │   │   ├── AboutPage.jsx
│   │   │   │   ├── ContactPage.jsx
│   │   │   │   ├── CoursesPage.jsx
│   │   │   │   ├── FacultyPage.jsx
│   │   │   │   ├── ForgotPasswordPage.jsx
│   │   │   │   ├── HomePage.jsx
│   │   │   │   ├── LoginPage.jsx
│   │   │   │   ├── RegisterPage.jsx
│   │   │   │   ├── ResetPasswordPage.jsx
│   │   │   │   ├── ResultsPage.jsx
│   │   │   │   ├── TestSeriesPage.jsx
│   │   │   │   └── VerifyEmailPage.jsx
│   │   │   ├── student
│   │   │   │   ├── ExamInstructions.jsx
│   │   │   │   ├── ExamPage.jsx
│   │   │   │   ├── LearnPage.jsx
│   │   │   │   ├── PerformancePage.jsx
│   │   │   │   ├── ProfilePage.jsx
│   │   │   │   ├── ResultPage.jsx
│   │   │   │   ├── StudentDashboard.jsx
│   │   │   │   └── TestsPage.jsx
│   │   │   └── teacher
│   │   │       ├── TeacherClasses.jsx
│   │   │       ├── TeacherDashboard.jsx
│   │   │       ├── TeacherExams.jsx
│   │   │       ├── TeacherMaterials.jsx
│   │   │       └── TeacherPerformance.jsx
│   │   ├── utils
│   │   │   ├── alert.js
│   │   │   └── csv.js
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   └── vite.config.js
├── docs
│   └── IMPLEMENTATION_PLAN.md
├── server
│   ├── src
│   │   ├── config
│   │   │   ├── cloudinary.js
│   │   │   ├── db.js
│   │   │   └── env.js
│   │   ├── constants
│   │   │   ├── achievementCategories.js
│   │   │   ├── batchTypes.js
│   │   │   ├── cloudinaryFolders.js
│   │   │   ├── enrollmentStatus.js
│   │   │   ├── examStatus.js
│   │   │   ├── questionStates.js
│   │   │   ├── resourceTypes.js
│   │   │   ├── roles.js
│   │   │   ├── studentTypes.js
│   │   │   └── testTypes.js
│   │   ├── controllers
│   │   │   ├── achievement.controller.js
│   │   │   ├── attempt.controller.js
│   │   │   ├── auth.controller.js
│   │   │   ├── batch.controller.js
│   │   │   ├── contactSettings.controller.js
│   │   │   ├── course.controller.js
│   │   │   ├── dashboard.controller.js
│   │   │   ├── enquiry.controller.js
│   │   │   ├── exam.controller.js
│   │   │   ├── lecture.controller.js
│   │   │   ├── material.controller.js
│   │   │   ├── notification.controller.js
│   │   │   ├── question.controller.js
│   │   │   ├── resource.controller.js
│   │   │   ├── student.controller.js
│   │   │   ├── teacher.controller.js
│   │   │   ├── testSeries.controller.js
│   │   │   └── website.controller.js
│   │   ├── middleware
│   │   │   ├── activityLog.middleware.js
│   │   │   ├── auth.middleware.js
│   │   │   ├── enrollment.middleware.js
│   │   │   ├── errorHandler.middleware.js
│   │   │   ├── permission.middleware.js
│   │   │   ├── rateLimiter.middleware.js
│   │   │   ├── role.middleware.js
│   │   │   ├── upload.middleware.js
│   │   │   └── validate.middleware.js
│   │   ├── models
│   │   │   ├── Achievement.js
│   │   │   ├── ActivityLog.js
│   │   │   ├── Announcement.js
│   │   │   ├── Attempt.js
│   │   │   ├── Batch.js
│   │   │   ├── Chapter.js
│   │   │   ├── ContactSettings.js
│   │   │   ├── Course.js
│   │   │   ├── CourseResource.js
│   │   │   ├── Enquiry.js
│   │   │   ├── Enrollment.js
│   │   │   ├── Exam.js
│   │   │   ├── ExamPermission.js
│   │   │   ├── Lecture.js
│   │   │   ├── Material.js
│   │   │   ├── Notification.js
│   │   │   ├── Question.js
│   │   │   ├── Result.js
│   │   │   ├── Student.js
│   │   │   ├── Subject.js
│   │   │   ├── Teacher.js
│   │   │   ├── Testimonial.js
│   │   │   ├── TestSeries.js
│   │   │   ├── Topic.js
│   │   │   ├── Unit.js
│   │   │   ├── User.js
│   │   │   └── WebsiteContent.js
│   │   ├── routes
│   │   │   ├── academic.routes.js
│   │   │   ├── achievement.routes.js
│   │   │   ├── admin.routes.js
│   │   │   ├── attempt.routes.js
│   │   │   ├── auth.routes.js
│   │   │   ├── batch.routes.js
│   │   │   ├── contactSettings.routes.js
│   │   │   ├── course.routes.js
│   │   │   ├── dashboard.routes.js
│   │   │   ├── enquiry.routes.js
│   │   │   ├── enrollment.routes.js
│   │   │   ├── exam.routes.js
│   │   │   ├── index.js
│   │   │   ├── lecture.routes.js
│   │   │   ├── material.routes.js
│   │   │   ├── notification.routes.js
│   │   │   ├── question.routes.js
│   │   │   ├── resource.routes.js
│   │   │   ├── result.routes.js
│   │   │   ├── student.routes.js
│   │   │   ├── teacher.routes.js
│   │   │   ├── testimonial.routes.js
│   │   │   ├── testSeries.routes.js
│   │   │   ├── upload.routes.js
│   │   │   └── website.routes.js
│   │   ├── services
│   │   │   ├── attempt.service.js
│   │   │   ├── auth.service.js
│   │   │   ├── batch.service.js
│   │   │   ├── cloudinary.service.js
│   │   │   ├── course.service.js
│   │   │   ├── dashboard.service.js
│   │   │   ├── email.service.js
│   │   │   ├── evaluation.service.js
│   │   │   ├── exam.service.js
│   │   │   ├── notification.service.js
│   │   │   ├── question.service.js
│   │   │   └── website.service.js
│   │   ├── utils
│   │   │   ├── apiError.js
│   │   │   ├── apiResponse.js
│   │   │   ├── generatePassword.js
│   │   │   ├── imageResize.js
│   │   │   ├── jwt.js
│   │   │   ├── pagination.js
│   │   │   ├── shuffle.js
│   │   │   └── slug.js
│   │   ├── app.js
│   │   ├── seed.js
│   │   └── server.js
│   ├── .env.example
│   └── package.json
├── codebase.py
├── HOWTORUN.md
├── implimentation.md
├── package.json
└── README.md
```

---

# Included Files

- `.vibefree\skills\example.md`
- `client\index.html`
- `client\package.json`
- `client\postcss.config.js`
- `client\src\App.jsx`
- `client\src\components\exam\ExamResumeScreen.jsx`
- `client\src\components\shared\ConfirmModal.jsx`
- `client\src\components\shared\EmptyState.jsx`
- `client\src\components\shared\ErrorBoundary.jsx`
- `client\src\components\shared\FileUpload.jsx`
- `client\src\components\shared\LoadingSpinner.jsx`
- `client\src\components\shared\NotificationBell.jsx`
- `client\src\components\shared\Pagination.jsx`
- `client\src\components\shared\PDFViewer.jsx`
- `client\src\components\shared\ProtectedRoute.jsx`
- `client\src\components\shared\SkeletonLoader.jsx`
- `client\src\components\shared\StudentBadge.jsx`
- `client\src\components\shared\TelegramLink.jsx`
- `client\src\components\shared\WhatsAppLink.jsx`
- `client\src\config\api.js`
- `client\src\config\constants.js`
- `client\src\config\images.js`
- `client\src\context\AuthContext.jsx`
- `client\src\hooks\useContactSettings.js`
- `client\src\index.css`
- `client\src\layouts\AdminLayout.jsx`
- `client\src\layouts\ExamLayout.jsx`
- `client\src\layouts\PublicLayout.jsx`
- `client\src\layouts\StudentLayout.jsx`
- `client\src\layouts\TeacherLayout.jsx`
- `client\src\main.jsx`
- `client\src\pages\admin\AdminAchievements.jsx`
- `client\src\pages\admin\AdminBatches.jsx`
- `client\src\pages\admin\AdminContactSettings.jsx`
- `client\src\pages\admin\AdminCourses.jsx`
- `client\src\pages\admin\AdminDashboard.jsx`
- `client\src\pages\admin\AdminEnquiries.jsx`
- `client\src\pages\admin\AdminExams.jsx`
- `client\src\pages\admin\AdminQuestions.jsx`
- `client\src\pages\admin\AdminSettings.jsx`
- `client\src\pages\admin\AdminStudents.jsx`
- `client\src\pages\admin\AdminTeachers.jsx`
- `client\src\pages\errors\NotFound.jsx`
- `client\src\pages\errors\Unauthorized.jsx`
- `client\src\pages\public\AboutPage.jsx`
- `client\src\pages\public\ContactPage.jsx`
- `client\src\pages\public\CoursesPage.jsx`
- `client\src\pages\public\FacultyPage.jsx`
- `client\src\pages\public\ForgotPasswordPage.jsx`
- `client\src\pages\public\HomePage.jsx`
- `client\src\pages\public\LoginPage.jsx`
- `client\src\pages\public\RegisterPage.jsx`
- `client\src\pages\public\ResetPasswordPage.jsx`
- `client\src\pages\public\ResultsPage.jsx`
- `client\src\pages\public\TestSeriesPage.jsx`
- `client\src\pages\public\VerifyEmailPage.jsx`
- `client\src\pages\student\ExamInstructions.jsx`
- `client\src\pages\student\ExamPage.jsx`
- `client\src\pages\student\LearnPage.jsx`
- `client\src\pages\student\PerformancePage.jsx`
- `client\src\pages\student\ProfilePage.jsx`
- `client\src\pages\student\ResultPage.jsx`
- `client\src\pages\student\StudentDashboard.jsx`
- `client\src\pages\student\TestsPage.jsx`
- `client\src\pages\teacher\TeacherClasses.jsx`
- `client\src\pages\teacher\TeacherDashboard.jsx`
- `client\src\pages\teacher\TeacherExams.jsx`
- `client\src\pages\teacher\TeacherMaterials.jsx`
- `client\src\pages\teacher\TeacherPerformance.jsx`
- `client\src\utils\alert.js`
- `client\src\utils\csv.js`
- `client\tailwind.config.js`
- `client\vite.config.js`
- `codebase.py`
- `docs\IMPLEMENTATION_PLAN.md`
- `HOWTORUN.md`
- `implimentation.md`
- `package.json`
- `README.md`
- `server\.env.example`
- `server\package.json`
- `server\src\app.js`
- `server\src\config\cloudinary.js`
- `server\src\config\db.js`
- `server\src\config\env.js`
- `server\src\constants\achievementCategories.js`
- `server\src\constants\batchTypes.js`
- `server\src\constants\cloudinaryFolders.js`
- `server\src\constants\enrollmentStatus.js`
- `server\src\constants\examStatus.js`
- `server\src\constants\questionStates.js`
- `server\src\constants\resourceTypes.js`
- `server\src\constants\roles.js`
- `server\src\constants\studentTypes.js`
- `server\src\constants\testTypes.js`
- `server\src\controllers\achievement.controller.js`
- `server\src\controllers\attempt.controller.js`
- `server\src\controllers\auth.controller.js`
- `server\src\controllers\batch.controller.js`
- `server\src\controllers\contactSettings.controller.js`
- `server\src\controllers\course.controller.js`
- `server\src\controllers\dashboard.controller.js`
- `server\src\controllers\enquiry.controller.js`
- `server\src\controllers\exam.controller.js`
- `server\src\controllers\lecture.controller.js`
- `server\src\controllers\material.controller.js`
- `server\src\controllers\notification.controller.js`
- `server\src\controllers\question.controller.js`
- `server\src\controllers\resource.controller.js`
- `server\src\controllers\student.controller.js`
- `server\src\controllers\teacher.controller.js`
- `server\src\controllers\testSeries.controller.js`
- `server\src\controllers\website.controller.js`
- `server\src\middleware\activityLog.middleware.js`
- `server\src\middleware\auth.middleware.js`
- `server\src\middleware\enrollment.middleware.js`
- `server\src\middleware\errorHandler.middleware.js`
- `server\src\middleware\permission.middleware.js`
- `server\src\middleware\rateLimiter.middleware.js`
- `server\src\middleware\role.middleware.js`
- `server\src\middleware\upload.middleware.js`
- `server\src\middleware\validate.middleware.js`
- `server\src\models\Achievement.js`
- `server\src\models\ActivityLog.js`
- `server\src\models\Announcement.js`
- `server\src\models\Attempt.js`
- `server\src\models\Batch.js`
- `server\src\models\Chapter.js`
- `server\src\models\ContactSettings.js`
- `server\src\models\Course.js`
- `server\src\models\CourseResource.js`
- `server\src\models\Enquiry.js`
- `server\src\models\Enrollment.js`
- `server\src\models\Exam.js`
- `server\src\models\ExamPermission.js`
- `server\src\models\Lecture.js`
- `server\src\models\Material.js`
- `server\src\models\Notification.js`
- `server\src\models\Question.js`
- `server\src\models\Result.js`
- `server\src\models\Student.js`
- `server\src\models\Subject.js`
- `server\src\models\Teacher.js`
- `server\src\models\Testimonial.js`
- `server\src\models\TestSeries.js`
- `server\src\models\Topic.js`
- `server\src\models\Unit.js`
- `server\src\models\User.js`
- `server\src\models\WebsiteContent.js`
- `server\src\routes\academic.routes.js`
- `server\src\routes\achievement.routes.js`
- `server\src\routes\admin.routes.js`
- `server\src\routes\attempt.routes.js`
- `server\src\routes\auth.routes.js`
- `server\src\routes\batch.routes.js`
- `server\src\routes\contactSettings.routes.js`
- `server\src\routes\course.routes.js`
- `server\src\routes\dashboard.routes.js`
- `server\src\routes\enquiry.routes.js`
- `server\src\routes\enrollment.routes.js`
- `server\src\routes\exam.routes.js`
- `server\src\routes\index.js`
- `server\src\routes\lecture.routes.js`
- `server\src\routes\material.routes.js`
- `server\src\routes\notification.routes.js`
- `server\src\routes\question.routes.js`
- `server\src\routes\resource.routes.js`
- `server\src\routes\result.routes.js`
- `server\src\routes\student.routes.js`
- `server\src\routes\teacher.routes.js`
- `server\src\routes\testimonial.routes.js`
- `server\src\routes\testSeries.routes.js`
- `server\src\routes\upload.routes.js`
- `server\src\routes\website.routes.js`
- `server\src\seed.js`
- `server\src\server.js`
- `server\src\services\attempt.service.js`
- `server\src\services\auth.service.js`
- `server\src\services\batch.service.js`
- `server\src\services\cloudinary.service.js`
- `server\src\services\course.service.js`
- `server\src\services\dashboard.service.js`
- `server\src\services\email.service.js`
- `server\src\services\evaluation.service.js`
- `server\src\services\exam.service.js`
- `server\src\services\notification.service.js`
- `server\src\services\question.service.js`
- `server\src\services\website.service.js`
- `server\src\utils\apiError.js`
- `server\src\utils\apiResponse.js`
- `server\src\utils\generatePassword.js`
- `server\src\utils\imageResize.js`
- `server\src\utils\jwt.js`
- `server\src\utils\pagination.js`
- `server\src\utils\shuffle.js`
- `server\src\utils\slug.js`

---

# Skipped Files

| File | Reason |
|---|---|
| `.gitignore` | ignored file |
| `client-out.log` | binary/asset file |
| `client\node_modules\combined-stream\yarn.lock` | ignored file |
| `client\package-lock.json` | ignored file |
| `client\src\assets\images\placeholders\about-institute.jpg` | binary/asset file |
| `client\src\assets\images\placeholders\about-institute.svg` | binary/asset file |
| `client\src\assets\images\placeholders\achievement-milestone-1.jpg` | binary/asset file |
| `client\src\assets\images\placeholders\achievement-milestone-1.svg` | binary/asset file |
| `client\src\assets\images\placeholders\achievement-result-1.jpg` | binary/asset file |
| `client\src\assets\images\placeholders\achievement-result-1.svg` | binary/asset file |
| `client\src\assets\images\placeholders\achievement-result-2.jpg` | binary/asset file |
| `client\src\assets\images\placeholders\achievement-result-2.svg` | binary/asset file |
| `client\src\assets\images\placeholders\contact-institute.jpg` | binary/asset file |
| `client\src\assets\images\placeholders\contact-institute.svg` | binary/asset file |
| `client\src\assets\images\placeholders\course-class-xi.jpg` | binary/asset file |
| `client\src\assets\images\placeholders\course-class-xi.svg` | binary/asset file |
| `client\src\assets\images\placeholders\course-class-xii.jpg` | binary/asset file |
| `client\src\assets\images\placeholders\course-class-xii.svg` | binary/asset file |
| `client\src\assets\images\placeholders\course-neet-dropper.jpg` | binary/asset file |
| `client\src\assets\images\placeholders\course-neet-dropper.svg` | binary/asset file |
| `client\src\assets\images\placeholders\course-neet-foundation.jpg` | binary/asset file |
| `client\src\assets\images\placeholders\course-neet-foundation.svg` | binary/asset file |
| `client\src\assets\images\placeholders\course-test-series.jpg` | binary/asset file |
| `client\src\assets\images\placeholders\course-test-series.svg` | binary/asset file |
| `client\src\assets\images\placeholders\empty-state-materials.jpg` | binary/asset file |
| `client\src\assets\images\placeholders\empty-state-materials.svg` | binary/asset file |
| `client\src\assets\images\placeholders\empty-state-results.jpg` | binary/asset file |
| `client\src\assets\images\placeholders\empty-state-results.svg` | binary/asset file |
| `client\src\assets\images\placeholders\empty-state-tests.jpg` | binary/asset file |
| `client\src\assets\images\placeholders\empty-state-tests.svg` | binary/asset file |
| `client\src\assets\images\placeholders\hero-slide-1.jpg` | binary/asset file |
| `client\src\assets\images\placeholders\hero-slide-1.svg` | binary/asset file |
| `client\src\assets\images\placeholders\hero-slide-2.jpg` | binary/asset file |
| `client\src\assets\images\placeholders\hero-slide-2.svg` | binary/asset file |
| `client\src\assets\images\placeholders\hero-slide-3.jpg` | binary/asset file |
| `client\src\assets\images\placeholders\hero-slide-3.svg` | binary/asset file |
| `client\src\assets\images\placeholders\lecture-thumbnail-1.jpg` | binary/asset file |
| `client\src\assets\images\placeholders\lecture-thumbnail-1.svg` | binary/asset file |
| `client\src\assets\images\placeholders\lecture-thumbnail-2.jpg` | binary/asset file |
| `client\src\assets\images\placeholders\lecture-thumbnail-2.svg` | binary/asset file |
| `client\src\assets\images\placeholders\lecture-thumbnail-3.jpg` | binary/asset file |
| `client\src\assets\images\placeholders\lecture-thumbnail-3.svg` | binary/asset file |
| `client\src\assets\images\placeholders\login-side-image.jpg` | binary/asset file |
| `client\src\assets\images\placeholders\login-side-image.svg` | binary/asset file |
| `client\src\assets\images\placeholders\logo-rounded-transparent.png` | binary/asset file |
| `client\src\assets\images\placeholders\logo.jpg` | binary/asset file |
| `client\src\assets\images\placeholders\methodology-flow.jpg` | binary/asset file |
| `client\src\assets\images\placeholders\methodology-flow.svg` | binary/asset file |
| `client\src\assets\images\placeholders\og-image.jpg` | binary/asset file |
| `client\src\assets\images\placeholders\og-image.svg` | binary/asset file |
| `client\src\assets\images\placeholders\register-side-image.jpg` | binary/asset file |
| `client\src\assets\images\placeholders\register-side-image.svg` | binary/asset file |
| `client\src\assets\images\placeholders\student-avatar-default.jpg` | binary/asset file |
| `client\src\assets\images\placeholders\student-avatar-default.svg` | binary/asset file |
| `client\src\assets\images\placeholders\teacher-1.jpg` | binary/asset file |
| `client\src\assets\images\placeholders\teacher-1.svg` | binary/asset file |
| `client\src\assets\images\placeholders\teacher-2.jpg` | binary/asset file |
| `client\src\assets\images\placeholders\teacher-2.svg` | binary/asset file |
| `client\src\assets\images\placeholders\teacher-3.jpg` | binary/asset file |
| `client\src\assets\images\placeholders\teacher-3.svg` | binary/asset file |
| `client\src\assets\images\placeholders\teacher-4.jpg` | binary/asset file |
| `client\src\assets\images\placeholders\teacher-4.svg` | binary/asset file |
| `client\src\assets\images\placeholders\teacher-5.jpg` | binary/asset file |
| `client\src\assets\images\placeholders\teacher-5.svg` | binary/asset file |
| `client\src\assets\images\placeholders\teacher-6.jpg` | binary/asset file |
| `client\src\assets\images\placeholders\teacher-6.svg` | binary/asset file |
| `client\src\assets\images\placeholders\test-series-banner.jpg` | binary/asset file |
| `client\src\assets\images\placeholders\test-series-banner.svg` | binary/asset file |
| `client\src\assets\images\placeholders\testimonial-parent-1.jpg` | binary/asset file |
| `client\src\assets\images\placeholders\testimonial-parent-1.svg` | binary/asset file |
| `client\src\assets\images\placeholders\testimonial-student-1.jpg` | binary/asset file |
| `client\src\assets\images\placeholders\testimonial-student-1.svg` | binary/asset file |
| `client\src\assets\images\placeholders\testimonial-student-2.jpg` | binary/asset file |
| `client\src\assets\images\placeholders\testimonial-student-2.svg` | binary/asset file |
| `codebase.md` | generated output |
| `docs\project-plan.md` | ignored file |
| `docs\techstack-and-hosting.md` | ignored file |
| `generate_placeholders.js` | ignored file |
| `package-lock.json` | ignored file |
| `server-out.log` | ignored file |
| `server\.env` | ignored file |
| `server\node_modules\nodemailer\.gitattributes` | ignored file |
| `server\package-lock.json` | ignored file |

---

# Source Files

# FILE: `.vibefree\skills\example.md`

```markdown
---
name: example
description: Example skill - replace with your own instructions
---

Describe what this skill should do when invoked. This full body is inserted
into the chat input when the user picks "/example" from the skill menu.
```

---

# FILE: `client\index.html`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="NEETVIDYA - Medical Education, Coaching & Examination Platform" />
    <title>NEETVIDYA - Learn Better. Prepare Smarter. Achieve More.</title>
    <link rel="icon" type="image/png" href="/src/assets/images/placeholders/logo-rounded-transparent.png" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;700&family=Manrope:wght@500;600;700;800&display=swap" rel="stylesheet" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

---

# FILE: `client\package.json`

```json
{
  "name": "neetvidya-client",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "axios": "^1.6.2",
    "clsx": "^2.1.0",
    "framer-motion": "^11.0.3",
    "lucide-react": "^0.303.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-hook-form": "^7.49.2",
    "react-router-dom": "^6.21.1",
    "recharts": "^2.10.3",
    "sweetalert2": "^11.26.25",
    "tailwind-merge": "^2.2.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.2.1",
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.32",
    "tailwindcss": "^3.4.0",
    "vite": "^5.0.10"
  }
}
```

---

# FILE: `client\postcss.config.js`

```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

---

# FILE: `client\src\App.jsx`

```jsx
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/shared/ProtectedRoute";

import PublicLayout from "./layouts/PublicLayout";
import StudentLayout from "./layouts/StudentLayout";
import TeacherLayout from "./layouts/TeacherLayout";
import AdminLayout from "./layouts/AdminLayout";
import ExamLayout from "./layouts/ExamLayout";

// Public Pages
import HomePage from "./pages/public/HomePage";
import AboutPage from "./pages/public/AboutPage";
import CoursesPage from "./pages/public/CoursesPage";
import FacultyPage from "./pages/public/FacultyPage";
import TestSeriesPage from "./pages/public/TestSeriesPage";
import ResultsPage from "./pages/public/ResultsPage";
import ContactPage from "./pages/public/ContactPage";
import LoginPage from "./pages/public/LoginPage";
import RegisterPage from "./pages/public/RegisterPage";
import VerifyEmailPage from "./pages/public/VerifyEmailPage";
import ForgotPasswordPage from "./pages/public/ForgotPasswordPage";
import ResetPasswordPage from "./pages/public/ResetPasswordPage";

// Student Pages
import StudentDashboard from "./pages/student/StudentDashboard";
import LearnPage from "./pages/student/LearnPage";
import TestsPage from "./pages/student/TestsPage";
import StudentResults from "./pages/student/ResultPage";
import PerformancePage from "./pages/student/PerformancePage";
import StudentProfile from "./pages/student/ProfilePage";
import ExamInstructions from "./pages/student/ExamInstructions";
import ExamPage from "./pages/student/ExamPage";

// Teacher Pages
import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import TeacherMaterials from "./pages/teacher/TeacherMaterials";
import TeacherClasses from "./pages/teacher/TeacherClasses";
import TeacherExams from "./pages/teacher/TeacherExams";
import TeacherPerformance from "./pages/teacher/TeacherPerformance";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminStudents from "./pages/admin/AdminStudents";
import AdminTeachers from "./pages/admin/AdminTeachers";
import AdminBatches from "./pages/admin/AdminBatches";
import AdminCourses from "./pages/admin/AdminCourses";
import AdminQuestions from "./pages/admin/AdminQuestions";
import AdminExams from "./pages/admin/AdminExams";
import AdminEnquiries from "./pages/admin/AdminEnquiries";
import AdminAchievements from "./pages/admin/AdminAchievements";
import AdminContactSettings from "./pages/admin/AdminContactSettings";
import AdminSettings from "./pages/admin/AdminSettings";

// Error Pages
import NotFound from "./pages/errors/NotFound";
import Unauthorized from "./pages/errors/Unauthorized";

export default function App() {
  return (
    <Routes>
      {/* ── Public Routes ──────────────────────────────────────── */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/faculty" element={<FacultyPage />} />
        <Route path="/test-series" element={<TestSeriesPage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Route>

      {/* Auth Routes (no layout wrapper) */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/verify-email" element={<VerifyEmailPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />

      {/* ── Student Portal ─────────────────────────────────────── */}
      <Route path="/student" element={<ProtectedRoute role="student"><StudentLayout /></ProtectedRoute>}>
        <Route index element={<StudentDashboard />} />
        <Route path="learn" element={<LearnPage />} />
        <Route path="tests" element={<TestsPage />} />
        <Route path="results" element={<StudentResults />} />
        <Route path="performance" element={<PerformancePage />} />
        <Route path="profile" element={<StudentProfile />} />
      </Route>

      {/* Exam instructions (pre-exam briefing) */}
      <Route
        path="/exam/:examId/instructions"
        element={
          <ProtectedRoute role="student">
            <ExamInstructions />
          </ProtectedRoute>
        }
      />

      {/* CBT Exam (dedicated distraction-free interface) */}
      <Route path="/exam/:examId" element={<ProtectedRoute role="student"><ExamLayout /></ProtectedRoute>}>
        <Route path="attempt" element={<ExamPage />} />
      </Route>

      {/* ── Teacher Workspace ──────────────────────────────────── */}
      <Route path="/teacher" element={<ProtectedRoute role="teacher"><TeacherLayout /></ProtectedRoute>}>
        <Route index element={<TeacherDashboard />} />
        <Route path="materials" element={<TeacherMaterials />} />
        <Route path="classes" element={<TeacherClasses />} />
        <Route path="questions" element={<Navigate to="/teacher/exams" replace />} />
        <Route path="exams" element={<TeacherExams />} />
        <Route path="performance" element={<TeacherPerformance />} />
      </Route>

      {/* ── Admin Panel ────────────────────────────────────────── */}
      <Route path="/admin" element={<ProtectedRoute role="admin"><AdminLayout /></ProtectedRoute>}>
        <Route index element={<AdminDashboard />} />
        <Route path="students" element={<AdminStudents />} />
        <Route path="teachers" element={<AdminTeachers />} />
        <Route path="batches" element={<AdminBatches />} />
        <Route path="courses" element={<Navigate to="/admin/batches" replace />} />
        <Route path="questions" element={<TeacherExams />} />
        <Route path="exams" element={<TeacherExams />} />
        <Route path="enquiries" element={<AdminEnquiries />} />
        <Route path="achievements" element={<AdminAchievements />} />
        <Route path="contact-settings" element={<AdminContactSettings />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>

      {/* Error Pages */}
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
```

---

# FILE: `client\src\components\exam\ExamResumeScreen.jsx`

```jsx
import { Clock, RefreshCw } from "lucide-react";

export default function ExamResumeScreen({ timeLeft = 0, onResume }) {
  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 text-center">
        <RefreshCw className="w-12 h-12 text-blue-600 mx-auto mb-4" />
        <h1 className="font-extrabold text-xl text-slate-900 mb-2">Exam Session Found</h1>
        <p className="text-slate-500 text-sm mb-4">
          You have an exam in progress. Your answers have been saved.
        </p>
        <div className="bg-slate-50 rounded-xl p-4 mb-6">
          <Clock className="w-6 h-6 mx-auto mb-1 text-slate-400" />
          <div className="font-mono font-bold text-2xl text-slate-800">
            {formatTime(timeLeft)}
          </div>
          <div className="text-xs text-slate-400">Time Remaining</div>
        </div>
        <button
          onClick={onResume}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl transition"
        >
          Resume Exam
        </button>
      </div>
    </div>
  );
}
```

---

# FILE: `client\src\components\shared\ConfirmModal.jsx`

```jsx
import { X } from "lucide-react";

const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = "Confirm",
  danger = false,
}) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-card shadow-xl w-full max-w-md animate-scale-in">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-heading font-bold text-lg text-brand-dark">{title}</h3>
          <button onClick={onClose} className="p-1 rounded hover:bg-gray-100">
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>
        <div className="p-6">
          <p className="text-sm text-gray-600">{message}</p>
        </div>
        <div className="p-6 border-t border-gray-100 flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-btn border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`px-4 py-2 rounded-btn text-sm font-medium text-white ${danger ? "bg-red-600 hover:bg-red-700" : "bg-brand-green hover:bg-emerald-700"
              }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
```

---

# FILE: `client\src\components\shared\EmptyState.jsx`

```jsx
const EmptyState = ({ icon: Icon, title, description, action }) => {
  return (
    <div className="text-center py-16 px-4">
      {Icon && (
        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
          <Icon className="w-8 h-8 text-gray-300" />
        </div>
      )}
      <h3 className="font-heading font-bold text-lg text-brand-dark mb-2">{title}</h3>
      {description && <p className="text-sm text-gray-500 max-w-sm mx-auto mb-4">{description}</p>}
      {action}
    </div>
  );
};

export default EmptyState;
```

---

# FILE: `client\src\components\shared\ErrorBoundary.jsx`

```jsx
import { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-brand-soft p-4">
          <div className="text-center max-w-md">
            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
              <span className="text-red-600 text-2xl font-bold">!</span>
            </div>
            <h1 className="font-heading font-bold text-2xl text-brand-dark mb-2">
              Something went wrong
            </h1>
            <p className="text-gray-500 text-sm mb-6">
              An unexpected error occurred. Please refresh the page.
            </p>
            <button onClick={() => window.location.reload()} className="btn-primary">
              Refresh Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
```

---

# FILE: `client\src\components\shared\FileUpload.jsx`

```jsx
import { useState, useRef } from "react";
import { Upload, CheckCircle } from "lucide-react";
import { alertSuccess, alertError } from "../../utils/alert";

export default function FileUpload({
  onUpload,
  accept = ".pdf",
  maxSizeMB = 20,
  label = "Upload File",
}) {
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploaded, setUploaded] = useState(false);
  const inputRef = useRef();

  const handleFile = async (file) => {
    if (!file) return;
    if (file.size > maxSizeMB * 1024 * 1024) {
      alertError(`File too large. Max ${maxSizeMB}MB allowed.`);
      return;
    }
    setUploading(true);
    setProgress(0);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await onUpload(formData, (p) => setProgress(p));
      setUploaded(true);
      alertSuccess("File uploaded successfully");
      return response;
    } catch (err) {
      alertError(err.response?.data?.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragging(false);
        handleFile(e.dataTransfer.files[0]);
      }}
      onClick={() => inputRef.current?.click()}
      className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${dragging
          ? "border-green-500 bg-green-50"
          : "border-slate-200 hover:border-green-300 hover:bg-slate-50"
        }`}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => handleFile(e.target.files[0])}
      />

      {uploaded ? (
        <div className="flex items-center justify-center gap-2 text-green-600">
          <CheckCircle className="w-6 h-6" />
          <span className="font-semibold text-sm">Uploaded Successfully</span>
        </div>
      ) : uploading ? (
        <div className="space-y-3">
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div
              className="bg-green-500 h-2 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-sm text-slate-500">{progress}%</span>
        </div>
      ) : (
        <>
          <Upload className="w-8 h-8 text-slate-300 mx-auto mb-3" />
          <p className="text-sm font-semibold text-slate-600">{label}</p>
          <p className="text-xs text-slate-400 mt-1">
            Drag &amp; drop or click to browse (Max {maxSizeMB}MB)
          </p>
        </>
      )}
    </div>
  );
}
```

---

# FILE: `client\src\components\shared\LoadingSpinner.jsx`

```jsx
const LoadingSpinner = ({ size = "md", text = "Loading..." }) => {
  const sizes = { sm: "w-6 h-6", md: "w-10 h-10", lg: "w-14 h-14" };
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div
        className={`${sizes[size]} border-4 border-brand-green border-t-transparent rounded-full animate-spin`}
      />
      {text && <p className="text-sm text-gray-500 mt-3">{text}</p>}
    </div>
  );
};

export default LoadingSpinner;
```

---

# FILE: `client\src\components\shared\NotificationBell.jsx`

```jsx
import { useState, useEffect } from "react";
import { Bell } from "lucide-react";
import api from "../../config/api";

const NotificationBell = () => {
  const [count, setCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchCount = () => {
      api
        .get("/notifications/unread-count")
        .then(({ data }) => setCount(data.data?.count || 0))
        .catch(() => { });
    };
    fetchCount();
    const interval = setInterval(fetchCount, 60000);
    return () => clearInterval(interval);
  }, []);

  const fetchNotifications = () => {
    api
      .get("/notifications")
      .then(({ data }) => setNotifications(data.data?.notifications || []))
      .catch(() => { });
  };

  const handleBellClick = () => {
    setOpen(!open);
    if (!open) fetchNotifications();
  };

  const markAllRead = async () => {
    try {
      await api.put("/notifications/read-all");
      setCount(0);
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    } catch {}
  };

  return (
    <div className="relative">
      <button
        onClick={handleBellClick}
        className="relative p-2 rounded-lg hover:bg-gray-100 transition"
      >
        <Bell className="w-5 h-5 text-gray-600" />
        {count > 0 && (
          <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
            {count > 9 ? "9+" : count}
          </span>
        )}
      </button>
      {open && (
        <div className="absolute right-0 top-12 w-80 bg-white rounded-card shadow-xl border-gray-100 z-50 max-h-96 overflow-y-auto border">
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <h4 className="font-heading font-bold text-sm">Notifications</h4>
            <button
              onClick={markAllRead}
              className="text-xs text-brand-green hover:underline font-semibold"
            >
              Mark all read
            </button>
          </div>
          {notifications.length === 0 ? (
            <p className="p-4 text-sm text-gray-400 text-center">No notifications</p>
          ) : (
            notifications.slice(0, 10).map((n) => (
              <div
                key={n._id}
                className="p-3 border-b border-gray-50 hover:bg-gray-50 cursor-pointer"
              >
                <p className="text-sm font-medium text-brand-dark">{n.title}</p>
                <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{n.message}</p>
                <p className="text-[10px] text-gray-400 mt-1">
                  {new Date(n.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
```

---

# FILE: `client\src\components\shared\Pagination.jsx`

```jsx
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Reusable pagination control.
 * Props: page, totalPages, totalItems, pageSize, onPageChange, onPageSizeChange
 */
export default function Pagination({
  page = 1,
  totalPages = 1,
  totalItems = 0,
  pageSize,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [10, 20, 50, 100],
}) {
  const safeTotal = Math.max(1, totalPages || 1);

  // Build a compact page window: 1 … (p-1) p (p+1) … N
  const pages = [];
  const push = (v) => pages.push(v);
  if (safeTotal <= 7) {
    for (let i = 1; i <= safeTotal; i++) push(i);
  } else {
    push(1);
    if (page > 3) push("…");
    for (let i = Math.max(2, page - 1); i <= Math.min(safeTotal - 1, page + 1); i++) push(i);
    if (page < safeTotal - 2) push("…");
    push(safeTotal);
  }

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-1 py-3">
      <div className="text-xs text-slate-500">
        {totalItems > 0 ? (
          <>
            Page <strong className="text-slate-700">{page}</strong> of{" "}
            <strong className="text-slate-700">{safeTotal}</strong> · {totalItems} items
            </>
            ) : (
            "No items"
        )}
          </div>

        <div className="flex items-center gap-2">
          {onPageSizeChange && (
            <select
              value={pageSize}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
              className="text-xs border-slate-200 rounded-lg px-2 py-1.5 bg-white text-slate-600 focus:outline-none focus:ring-2 focus:ring-green-500/20"
            >
              {pageSizeOptions.map((n) => (
                <option key={n} value={n}>
                  {n} / page
                </option>
              ))}
            </select>
          )}

          <div className="flex items-center gap-1">
            <button
              onClick={() => onPageChange(Math.max(1, page - 1))}
              disabled={page <= 1}
              className="p-1.5 rounded-lg border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {pages.map((p, i) =>
              p === "…" ? (
                <span key={`gap-${i}`} className="px-1.5 text-slate-400 text-xs">
                  …
                </span>
              ) : (
                <button
                  key={p}
                  onClick={() => onPageChange(p)}
                  className={`min-w-[30px] px-2 py-1.5 rounded-lg text-xs font-semibold border transition ${p === page
                      ? "bg-green-600 text-white border-green-600"
                      : "border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                >
                  {p}
                </button>
              )
            )}

            <button
              onClick={() => onPageChange(Math.min(safeTotal, page + 1))}
              disabled={page >= safeTotal}
              className="p-1.5 rounded-lg border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
              aria-label="Next page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
      );
}
```

---

# FILE: `client\src\components\shared\PDFViewer.jsx`

```jsx
import { useState } from "react";
import { Download, X, Maximize2 } from "lucide-react";

export default function PDFViewer({ url, title, onClose }) {
  const [fullscreen, setFullscreen] = useState(false);

  if (!url) return null;

  return (
    <div className={`fixed inset-0 z-50 bg-black/80 flex-col ${fullscreen ? "" : "p-4"}`}>
      <div className="bg-white rounded-t-2xl px-4 py-3 flex items-center justify-between">
        <h3 className="font-bold text-slate-800 text-sm truncate max-w-[60%]">
          {title || "Document Viewer"}
        </h3>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFullscreen((f) => !f)}
            className="p-2 rounded-lg hover:bg-slate-100 text-slate-500"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
          <a
            href={url}
            download
            className="p-2 rounded-lg hover:bg-slate-100 text-slate-500"
          >
            <Download className="w-4 h-4" />
          </a>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-slate-100 text-slate-500">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
      <iframe src={url} className="flex-1 w-full bg-white" title={title} />
    </div>
  );
}
```

---

# FILE: `client\src\components\shared\ProtectedRoute.jsx`

```jsx
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const ProtectedRoute = ({ role, children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-soft">
        <div className="w-10 h-10 border-4 border-brand-green border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;
  if (role && user.role !== role && user.role !== "admin") return <Navigate to="/unauthorized" replace />;

  return children;
};

export default ProtectedRoute;
```

---

# FILE: `client\src\components\shared\SkeletonLoader.jsx`

```jsx
export default function SkeletonLoader({ rows = 3, type = "card" }) {
  if (type === "card") {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="bg-white rounded-2xl border-slate-100 p-6 animate-pulse">
            <div className="h-40 bg-slate-100 rounded-xl mb-4" />
            <div className="h-4 bg-slate-100 rounded w-3/4 mb-3" />
            <div className="h-3 bg-slate-100 rounded w-1/2 mb-2" />
            <div className="h-3 bg-slate-100 rounded w-2/3" />
          </div>
        ))}
      </div>
    );
  }

  if (type === "table") {
    return (
      <div className="bg-white rounded-2xl border-slate-100 p-6 animate-pulse">
        {Array.from({ length: rows }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-4 py-4 border-b border-slate-50 last:border-0"
          >
            <div className="w-10 h-10 bg-slate-100 rounded-full" />
            <div className="flex-1">
              <div className="h-3 bg-slate-100 rounded w-1/3 mb-2" />
              <div className="h-2 bg-slate-100 rounded w-1/4" />
            </div>
            <div className="h-6 bg-slate-100 rounded-full w-16" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-pulse">
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="h-4 bg-slate-100 rounded"
          style={{ width: `${80 - i * 10}%` }}
        />
      ))}
    </div>
  );
}
```

---

# FILE: `client\src\components\shared\StudentBadge.jsx`

```jsx
import { Building2, Monitor, Shuffle, ClipboardList, Zap } from "lucide-react";
import { BATCH_BADGE_CONFIG } from "../../config/constants";

const iconMap = {
  OFFLINE: Building2,
  ONLINE: Monitor,
  HYBRID: Shuffle,
  EXAM_ONLY: ClipboardList,
  CRASH_COURSE: Zap,
};

const StudentBadge = ({ batchType = "OFFLINE" }) => {
  const config = BATCH_BADGE_CONFIG[batchType] || BATCH_BADGE_CONFIG.OFFLINE;
  const Icon = iconMap[batchType] || Building2;

  return (
    <span className={`badge ${config.color}`}>
      <Icon className="w-3.5 h-3.5" />
      {config.label}
    </span>
  );
};

export default StudentBadge;
```

---

# FILE: `client\src\components\shared\TelegramLink.jsx`

```jsx
import { Send } from "lucide-react";

const normalizeTelegramUrl = (value) => {
  if (!value) return "";
  const trimmed = value.trim();

  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  if (trimmed.startsWith("@")) return `https://t.me/${trimmed.replace(/^@/, "")}`;
  if (trimmed.includes("t.me/")) return `https://${trimmed.replace(/^https?:\/\//i, "")}`;
  return `https://t.me/${trimmed.replace(/^\//, "")}`;
};

const TelegramLink = ({ url, label = "Telegram", className = "" }) => {
  const finalUrl = normalizeTelegramUrl(url);
  if (!finalUrl) return null;

  return (
    <a
      href={finalUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 text-sky-600 hover:text-sky-700 font-medium transition-colors ${className}`}
    >
      <Send className="w-4 h-4" />
      {label}
    </a>
  );
};

export default TelegramLink;
```

---

# FILE: `client\src\components\shared\WhatsAppLink.jsx`

```jsx
import { MessageCircle } from "lucide-react";

const WhatsAppLink = ({ number = "917439685658", message = "Hello NEETVIDYA! I am interested in admission.", label = "WhatsApp Us", className = "" }) => {
  const cleanNumber = number.replace(/[^0-9]/g, "");
  const url = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium transition-colors ${className}`}
    >
      <MessageCircle className="w-4 h-4 text-emerald-500" />
      {label}
    </a>
  );
};

export default WhatsAppLink;
```

---

# FILE: `client\src\config\api.js`

```javascript
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api",
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("neetvidya_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401 && !error.config._retry) {
      error.config._retry = true;
      const refreshToken = localStorage.getItem("neetvidya_refresh");
      if (refreshToken) {
        try {
          const { data } = await axios.post("/api/auth/refresh", { refreshToken });
          localStorage.setItem("neetvidya_token", data.data.accessToken);
          error.config.headers.Authorization = `Bearer ${data.data.accessToken}`;
          return api(error.config);
        } catch {
          localStorage.removeItem("neetvidya_token");
          localStorage.removeItem("neetvidya_refresh");
          window.location.href = "/login";
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;
```

---

# FILE: `client\src\config\constants.js`

```javascript
export const ROLES = { STUDENT: "student", TEACHER: "teacher", ADMIN: "admin" };

export const TEST_TYPES = {
  DPP: "DPP", CHAPTER_TEST: "CHAPTER_TEST", UNIT_TEST: "UNIT_TEST",
  MOCK_TEST: "MOCK_TEST", PYQ: "PYQ",
};

export const BATCH_TYPES = {
  OFFLINE: "OFFLINE", ONLINE: "ONLINE", HYBRID: "HYBRID",
  EXAM_ONLY: "EXAM_ONLY", CRASH_COURSE: "CRASH_COURSE",
};

export const STUDENT_TYPES = {
  REGULAR_OFFLINE: "REGULAR_OFFLINE", REGULAR_ONLINE: "REGULAR_ONLINE",
  HYBRID: "HYBRID", EXAM_ONLY: "EXAM_ONLY", GUEST: "GUEST",
};

export const EXAM_STATUS = {
  DRAFT: "DRAFT", SCHEDULED: "SCHEDULED", LIVE: "LIVE", CLOSED: "CLOSED",
};

export const RESOURCE_TYPES = {
  EXTERNAL_LINK: "EXTERNAL_LINK", YOUTUBE: "YOUTUBE", GOOGLE_DRIVE: "GOOGLE_DRIVE",
  REFERENCE_SITE: "REFERENCE_SITE", TOOL: "TOOL", CUSTOM: "CUSTOM",
};

export const BATCH_BADGE_CONFIG = {
  OFFLINE: { label: "Offline", color: "bg-blue-50 text-blue-700 border border-blue-200" },
  ONLINE: { label: "Online", color: "bg-purple-50 text-purple-700 border border-purple-200" },
  HYBRID: { label: "Hybrid", color: "bg-amber-50 text-amber-800 border border-amber-200" },
  EXAM_ONLY: { label: "Exam Only", color: "bg-orange-50 text-orange-700 border border-orange-200" },
  CRASH_COURSE: { label: "Crash Course", color: "bg-rose-50 text-rose-700 border border-rose-200" },
};
```

---

# FILE: `client\src\config\images.js`

```javascript
import heroSlide1 from "../assets/images/placeholders/hero-slide-1.jpg";
import heroSlide2 from "../assets/images/placeholders/hero-slide-2.jpg";
import heroSlide3 from "../assets/images/placeholders/hero-slide-3.jpg";
import aboutInstitute from "../assets/images/placeholders/about-institute.jpg";
import methodologyFlow from "../assets/images/placeholders/methodology-flow.jpg";
import courseNeetFoundation from "../assets/images/placeholders/course-neet-foundation.jpg";
import courseClassXi from "../assets/images/placeholders/course-class-xi.jpg";
import courseClassXii from "../assets/images/placeholders/course-class-xii.jpg";
import courseNeetDropper from "../assets/images/placeholders/course-neet-dropper.jpg";
import courseTestSeries from "../assets/images/placeholders/course-test-series.jpg";
import teacher1 from "../assets/images/placeholders/teacher-1.jpg";
import teacher2 from "../assets/images/placeholders/teacher-2.jpg";
import teacher3 from "../assets/images/placeholders/teacher-3.jpg";
import teacher4 from "../assets/images/placeholders/teacher-4.jpg";
import teacher5 from "../assets/images/placeholders/teacher-5.jpg";
import teacher6 from "../assets/images/placeholders/teacher-6.jpg";
import testimonialStudent1 from "../assets/images/placeholders/testimonial-student-1.jpg";
import testimonialStudent2 from "../assets/images/placeholders/testimonial-student-2.jpg";
import testimonialParent1 from "../assets/images/placeholders/testimonial-parent-1.jpg";
import achievementResult1 from "../assets/images/placeholders/achievement-result-1.jpg";
import achievementResult2 from "../assets/images/placeholders/achievement-result-2.jpg";
import achievementMilestone1 from "../assets/images/placeholders/achievement-milestone-1.jpg";
import testSeriesBanner from "../assets/images/placeholders/test-series-banner.jpg";
import contactInstitute from "../assets/images/placeholders/contact-institute.jpg";
import lectureThumbnail1 from "../assets/images/placeholders/lecture-thumbnail-1.jpg";
import lectureThumbnail2 from "../assets/images/placeholders/lecture-thumbnail-2.jpg";
import lectureThumbnail3 from "../assets/images/placeholders/lecture-thumbnail-3.jpg";
import studentAvatarDefault from "../assets/images/placeholders/student-avatar-default.jpg";
import ogImage from "../assets/images/placeholders/og-image.jpg";
import loginSideImage from "../assets/images/placeholders/login-side-image.jpg";
import registerSideImage from "../assets/images/placeholders/register-side-image.jpg";
import emptyStateMaterials from "../assets/images/placeholders/empty-state-materials.jpg";
import emptyStateTests from "../assets/images/placeholders/empty-state-tests.jpg";
import emptyStateResults from "../assets/images/placeholders/empty-state-results.jpg";
import logo from "../assets/images/placeholders/logo.jpg";
import logoRoundedTransparent from "../assets/images/placeholders/logo-rounded-transparent.png";

const images = {
  heroSlide1, heroSlide2, heroSlide3,
  aboutInstitute, methodologyFlow,
  courseNeetFoundation, courseClassXi, courseClassXii, courseNeetDropper, courseTestSeries,
  teacher1, teacher2, teacher3, teacher4, teacher5, teacher6,
  testimonialStudent1, testimonialStudent2, testimonialParent1,
  achievementResult1, achievementResult2, achievementMilestone1,
  testSeriesBanner, contactInstitute,
  lectureThumbnail1, lectureThumbnail2, lectureThumbnail3,
  studentAvatarDefault, ogImage,
  loginSideImage, registerSideImage,
  emptyStateMaterials, emptyStateTests, emptyStateResults,
  logo, logoRoundedTransparent,
};

export default images;
```

---

# FILE: `client\src\context\AuthContext.jsx`

```jsx
import { createContext, useState, useEffect, useCallback } from "react";
import api from "../config/api";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = useCallback(async () => {
    const token = localStorage.getItem("neetvidya_token");
    if (!token) {
      setLoading(false);
      return;
    }
    try {
      const { data } = await api.get("/auth/me");
      setUser(data.data.user);
    } catch {
      localStorage.removeItem("neetvidya_token");
      localStorage.removeItem("neetvidya_refresh");
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const login = async (emailOrId, password) => {
    const { data } = await api.post("/auth/login", { email: emailOrId, password });
    const { user: userData, accessToken, refreshToken } = data.data;
    localStorage.setItem("neetvidya_token", accessToken);
    localStorage.setItem("neetvidya_refresh", refreshToken);
    setUser(userData);
    return userData;
  };

  const register = async (name, email, password, phone) => {
    const { data } = await api.post("/auth/register", { name, email, password, phone });
    return data;
  };

  const logout = () => {
    localStorage.removeItem("neetvidya_token");
    localStorage.removeItem("neetvidya_refresh");
    setUser(null);
  };

  const updateUser = (updatedUser) => {
    setUser((prev) => ({ ...prev, ...updatedUser }));
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, logout, updateUser, isAuthenticated: !!user }}
    >
      {children}
    </AuthContext.Provider>
  );
};
```

---

# FILE: `client\src\hooks\useContactSettings.js`

```javascript
import { useEffect, useState } from "react";
import api from "../config/api";

const defaultSettings = {
  instituteEmail: "neetvidya720@gmail.com",
  institutePhone: "+91 74396 85658 / +91 83910 21878",
  address: "Karimpur Main Road, Karimpur, Nadia",
  city: "Karimpur",
  state: "Nadia",
  telegramChannelLink: "https://t.me/neetvidya720official",
  whatsappGroupLink: "",
  whatsappNumber: "917439685658",
  whatsappDefaultMessage: "Hello NEETVIDYA! I am interested in admission.",
  facebookLink: "",
  instagramLink: "",
  youtubeLink: "",
  officeHours: "Mon - Sat: 9:00 AM - 6:00 PM",
  mapEmbedUrl: "",
};

export default function useContactSettings() {
  const [settings, setSettings] = useState(defaultSettings);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data } = await api.get("/contact-settings");
        if (data?.data?.settings) {
          setSettings({ ...defaultSettings, ...data.data.settings });
        }
      } catch (error) {
        console.error("Failed to load contact settings", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  return { settings, loading };
}
```

---

# FILE: `client\src\index.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply font-body text-brand-dark bg-white antialiased selection:bg-brand-lime selection:text-brand-dark;
  }
  h1, h2, h3, h4, h5, h6 {
    @apply font-heading tracking-tight;
  }
}

@layer components {
  .btn-primary {
    @apply bg-brand-green text-white px-6 py-2.5 rounded-btn font-medium
           hover:bg-emerald-700 active:scale-[0.98] transition-all duration-200 inline-flex
           items-center justify-center gap-2 shadow-sm;
  }
  .btn-secondary {
    @apply border-2 border-brand-green text-brand-green px-6 py-2.5 rounded-btn
           font-medium hover:bg-brand-green hover:text-white active:scale-[0.98] transition-all duration-200
           inline-flex items-center justify-center gap-2;
  }
  .btn-dark {
    @apply bg-brand-black text-white px-6 py-2.5 rounded-btn font-medium
           hover:bg-gray-800 active:scale-[0.98] transition-all duration-200 inline-flex
           items-center justify-center gap-2 shadow-sm;
  }
  .btn-lime {
    @apply bg-brand-lime text-brand-black px-6 py-2.5 rounded-btn font-semibold
           hover:brightness-105 active:scale-[0.98] transition-all duration-200 inline-flex
           items-center justify-center gap-2 shadow-sm;
  }
  .card {
    @apply bg-white rounded-card border border-gray-100 p-6 shadow-sm;
  }
  .card-hover {
    @apply hover:-translate-y-1 hover:shadow-lg transition-all duration-300;
  }
  .input-field {
    @apply w-full px-4 py-2.5 border border-gray-200 rounded-btn text-sm
           focus:outline-none focus:ring-2 focus:ring-brand-green/30
           focus:border-brand-green transition-all bg-white;
  }
  .section-padding {
    @apply py-16 md:py-24;
  }
  .badge {
    @apply inline-flex items-center gap-1.5 px-3 py-1 rounded-full
           text-xs font-semibold tracking-wide uppercase;
  }
}
```

---

# FILE: `client\src\layouts\AdminLayout.jsx`

```jsx
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, Users, GraduationCap, Layers, BookOpen,
  HelpCircle, ClipboardList, Trophy, Settings, Globe, LogOut, Menu, X, MessageSquare
} from "lucide-react";
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import NotificationBell from "../components/shared/NotificationBell";

const navItems = [
  { label: "Overview", path: "/admin", icon: LayoutDashboard, end: true },
  { label: "Students", path: "/admin/students", icon: Users },
  { label: "Faculty", path: "/admin/teachers", icon: GraduationCap },
  { label: "Batches & Courses", path: "/admin/batches", icon: Layers },
  { label: "Question Bank", path: "/admin/questions", icon: HelpCircle },
  { label: "Exams & Tests", path: "/admin/exams", icon: ClipboardList },
  { label: "Enquiries", path: "/admin/enquiries", icon: MessageSquare },
  { label: "Achievements", path: "/admin/achievements", icon: Trophy },
  { label: "Contact & Links", path: "/admin/contact-settings", icon: Globe },
  { label: "Settings", path: "/admin/settings", icon: Settings },
];

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="h-screen overflow-hidden bg-brand-soft flex">
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-brand-black text-white transform transition-transform lg:translate-x-0 lg:static flex flex-col justify-between shrink-0 h-screen ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="overflow-y-auto max-h-[calc(100vh-80px)]">
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-brand-lime flex items-center justify-center font-heading font-extrabold text-brand-black text-sm">
                NV
              </div>
              <div>
                <h2 className="font-heading font-bold text-base text-white">NEETVIDYA</h2>
                <p className="text-[11px] text-brand-lime font-medium">Administration</p>
              </div>
            </div>
            <button className="lg:hidden text-gray-400" onClick={() => setSidebarOpen(false)}>
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="p-3 space-y-0.5">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-btn text-xs font-medium transition-all ${
                    isActive
                      ? "bg-brand-green/25 text-brand-lime border-l-4 border-brand-lime font-semibold"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`
                }
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="p-4 border-t border-white/10 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2.5 px-3 py-2 text-sm text-rose-400 hover:bg-rose-500/10 rounded-btn w-full transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Admin Logout
          </button>
        </div>
      </aside>

      {sidebarOpen && <div className="fixed inset-0 bg-black/60 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        <header className="bg-white border-b border-gray-100 px-4 py-3.5 flex items-center justify-between lg:px-8 shrink-0 z-20">
          <button className="lg:hidden p-1.5 rounded text-gray-600 hover:bg-gray-100" onClick={() => setSidebarOpen(true)}>
            <Menu className="w-5 h-5" />
          </button>
          <div className="ml-auto flex items-center gap-3">
            <NotificationBell />
            <span className="text-xs font-semibold px-2.5 py-1 bg-brand-green/10 text-brand-green rounded-full border border-brand-green/20">
              Super Admin Active
            </span>
            <span
              onClick={() => navigate("/admin/settings")}
              className="text-sm font-semibold text-brand-dark cursor-pointer hover:text-green-700 transition"
              title="Admin Settings"
            >
              {user?.name}
            </span>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto overscroll-contain p-4 pb-24 lg:p-8 lg:pb-8 w-full">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
```

---

# FILE: `client\src\layouts\ExamLayout.jsx`

```jsx
import { Outlet } from "react-router-dom";

export default function ExamLayout() {
  return (
    <div className="min-h-screen bg-slate-100 selection:bg-none select-none">
      <Outlet />
    </div>
  );
}
```

---

# FILE: `client\src\layouts\PublicLayout.jsx`

```jsx
import { Outlet, Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, ArrowRight, Instagram, Facebook, Youtube } from "lucide-react";
import { useState } from "react";
import images from "../config/images";
import WhatsAppLink from "../components/shared/WhatsAppLink";
import TelegramLink from "../components/shared/TelegramLink";
import useContactSettings from "../hooks/useContactSettings";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Courses", path: "/courses" },
  { label: "Faculty", path: "/faculty" },
  { label: "Test Series", path: "/test-series" },
  { label: "Results", path: "/results" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

export default function PublicLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { settings } = useContactSettings();

  const socialLinks = [
    { label: "Facebook", href: settings.facebookLink, icon: Facebook },
    { label: "Instagram", href: settings.instagramLink, icon: Instagram },
    { label: "YouTube", href: settings.youtubeLink, icon: Youtube },
  ].filter((link) => link.href);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Top Notification / Contact Strip */}
      <div className="bg-brand-black text-xs text-gray-300 py-2 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5 text-brand-lime" /> +91 74396 85658</span>
            <span className="hidden sm:inline text-gray-500">|</span>
            <span className="hidden sm:inline">Admissions Open for NEET 2026 Batch Alpha</span>
          </div>
          <div className="flex items-center gap-4">
            <TelegramLink url={settings.telegramChannelLink} label="Telegram Channel" className="text-xs text-sky-400 hover:text-sky-300" />
            <WhatsAppLink number={settings.whatsappNumber} message={settings.whatsappDefaultMessage} label="Admissions Desk" className="text-xs text-emerald-400 hover:text-emerald-300" />
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-brand-dark/95 backdrop-blur sticky top-0 z-50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="flex items-center gap-3">
              <img src={images.logo} alt="NEETVIDYA" className="h-10 sm:h-12 w-auto object-contain" />
            </Link>

            <nav className="hidden md:flex items-center gap-7">
              {navLinks.map((link) => {
                const active = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`text-sm font-medium transition-all ${
                      active ? "text-brand-lime font-semibold" : "text-gray-300 hover:text-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            <div className="hidden md:flex items-center gap-3">
              <Link to="/login" className="text-sm font-medium text-gray-300 hover:text-white px-3 py-2 transition-colors">
                Portal Login
              </Link>
              <Link to="/register" className="btn-primary text-sm !py-2.5 !px-5">
                Join NEETVIDYA <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <button className="md:hidden text-gray-300 p-2" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden bg-brand-dark border-t border-gray-800 py-4 px-6 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                className="block text-base text-gray-200 hover:text-brand-lime py-1 font-medium"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-gray-800 flex flex-col gap-2.5">
              <Link to="/login" onClick={() => setMobileOpen(false)} className="btn-secondary w-full text-center">
                Portal Login
              </Link>
              <Link to="/register" onClick={() => setMobileOpen(false)} className="btn-primary w-full text-center">
                Join NEETVIDYA
              </Link>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="bg-brand-black text-gray-400 py-16 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <img src={images.logo} alt="NEETVIDYA" className="h-10 sm:h-11 w-auto object-contain" />
              </div>
              <p className="text-sm text-gray-400 max-w-md leading-relaxed mb-6">
                NEETVIDYA is India's premier dedicated medical tutoring institute. Our student-first methodology blends rigorous daily practice, NCERT mastery, and precision computerized testing.
              </p>
              <div className="flex items-center gap-4">
                <TelegramLink url={settings.telegramChannelLink} label="Telegram Channel" className="text-xs text-sky-400" />
                <WhatsAppLink number={settings.whatsappNumber} message={settings.whatsappDefaultMessage} label="Admissions Helpline" className="text-xs text-emerald-400" />
              </div>
              {socialLinks.length > 0 && (
                <div className="flex items-center gap-3 mt-4">
                  {socialLinks.map(({ label, href, icon: Icon }) => (
                    <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-gray-700 bg-white/5 text-gray-300 hover:text-brand-lime hover:border-brand-lime/50 transition-colors" aria-label={label}>
                      <Icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              )}
            </div>
            <div>
              <h4 className="font-heading font-semibold text-white text-sm uppercase tracking-wider mb-4">Explore</h4>
              <ul className="space-y-2.5 text-sm">
                {navLinks.map((link) => (
                  <li key={link.path}>
                    <Link to={link.path} className="hover:text-brand-lime transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-heading font-semibold text-white text-sm uppercase tracking-wider mb-4">Institute Desk</h4>
              <p className="text-sm mb-2 text-gray-300">NEETVIDYA COACHING CENTER</p>
              <p className="text-sm mb-2 text-gray-400">Karimpur Main Road, Karimpur, Nadia</p>
              <p className="text-sm mb-2 text-gray-400">Helpline: +91 74396 85658, +91 83910 21878</p>
              <p className="text-sm text-gray-400">Gmail: neetvidya720@gmail.com</p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-wrap items-center justify-between text-xs text-gray-500 gap-4">
            <p>&copy; {new Date().getFullYear()} NEETVIDYA Education Pvt Ltd. All rights reserved.</p>
            <p>Designed for Medical Aspirants across India.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
```

---

# FILE: `client\src\layouts\StudentLayout.jsx`

```jsx
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, BookOpen, ClipboardList, BarChart3, User, LogOut, Menu, X, Bell, GraduationCap } from "lucide-react";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../config/api";
import TelegramLink from "../components/shared/TelegramLink";
import NotificationBell from "../components/shared/NotificationBell";
import useContactSettings from "../hooks/useContactSettings";

const navItems = [
  { label: "Dashboard", path: "/student", icon: LayoutDashboard, end: true },
  { label: "Learn", path: "/student/learn", icon: BookOpen },
  { label: "Tests & DPP", path: "/student/tests", icon: ClipboardList },
  { label: "My Results", path: "/student/results", icon: BarChart3 },
  { label: "Performance", path: "/student/performance", icon: BarChart3 },
  { label: "Profile", path: "/student/profile", icon: User },
];

export default function StudentLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [myBatch, setMyBatch] = useState(null);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const { settings } = useContactSettings();

  // Show the student's batch at the top of their area.
  useEffect(() => {
    api
      .get("/students/my")
      .then(({ data }) => setMyBatch(data.data?.student?.batches?.[0] || null))
      .catch(() => {});
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="h-screen overflow-hidden bg-brand-soft flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-brand-black text-white transform transition-transform lg:translate-x-0 lg:static flex flex-col justify-between shrink-0 h-screen ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div>
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-green to-brand-lime flex items-center justify-center font-heading font-extrabold text-brand-black text-sm">
                NV
              </div>
              <div>
                <h2 className="font-heading font-bold text-base text-white leading-tight">NEET<span className="text-brand-lime">VIDYA</span></h2>
                <p className="text-[11px] text-gray-400 font-medium">Student Portal</p>
              </div>
            </div>
            <button className="lg:hidden text-gray-400" onClick={() => setSidebarOpen(false)}>
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="p-3 space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2.5 rounded-btn text-sm font-medium transition-all ${
                    isActive
                      ? "bg-brand-green/20 text-brand-lime border-l-4 border-brand-lime font-semibold"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`
                }
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="p-4 border-t border-white/10 space-y-3 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <div className="bg-white/5 rounded-lg p-3 text-xs text-gray-400">
            <p className="font-semibold text-gray-200 mb-1">Doubt Assistance</p>
            <TelegramLink url={settings.telegramChannelLink} label="Telegram Channel" className="text-xs text-sky-400" />
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2.5 px-3 py-2 text-sm text-rose-400 hover:bg-rose-500/10 rounded-btn w-full transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {sidebarOpen && <div className="fixed inset-0 bg-black/60 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <header className="bg-white border-b border-gray-100 px-4 py-3.5 flex items-center justify-between lg:px-8 shrink-0 z-20">
          <button className="lg:hidden p-1.5 rounded text-gray-600 hover:bg-gray-100" onClick={() => setSidebarOpen(true)}>
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 ml-auto">
            {myBatch && (
              <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 bg-brand-green/10 text-brand-green rounded-full border-brand-green/20">
                <GraduationCap className="w-3.5 h-3.5" /> {myBatch.name}
              </span>
            )}
            <NotificationBell />
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-brand-dark leading-tight">{user?.name}</p>
              <p className="text-xs text-gray-400 capitalize">{user?.role} Account</p>
            </div>
            <div className="w-9 h-9 rounded-full bg-brand-green/10 text-brand-green font-bold flex items-center justify-center border border-brand-green/30 text-sm">
              {user?.name ? user.name[0].toUpperCase() : "S"}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto overscroll-contain p-4 pb-24 lg:p-8 lg:pb-8 w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
```

---

# FILE: `client\src\layouts\TeacherLayout.jsx`

```jsx
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, FileText, Video, HelpCircle, ClipboardList, Link, BarChart3, User, LogOut, Menu, X } from "lucide-react";
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import NotificationBell from "../components/shared/NotificationBell";

const navItems = [
  { label: "Dashboard", path: "/teacher", icon: LayoutDashboard, end: true },
  { label: "Study Materials", path: "/teacher/materials", icon: FileText },
  { label: "Video Classes", path: "/teacher/classes", icon: Video },
  { label: "Exam & Question Manager", path: "/teacher/exams", icon: ClipboardList },
  { label: "Student Performance", path: "/teacher/performance", icon: BarChart3 },
];

export default function TeacherLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="h-screen overflow-hidden bg-brand-soft flex">
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-brand-dark text-white transform transition-transform lg:translate-x-0 lg:static flex flex-col justify-between shrink-0 h-screen ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div>
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-brand-green flex items-center justify-center font-heading font-extrabold text-white text-sm">
                NV
              </div>
              <div>
                <h2 className="font-heading font-bold text-base text-white">NEETVIDYA</h2>
                <p className="text-[11px] text-brand-lime font-medium">Faculty Workspace</p>
              </div>
            </div>
            <button className="lg:hidden text-gray-400" onClick={() => setSidebarOpen(false)}>
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="p-3 space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2.5 rounded-btn text-sm font-medium transition-all ${
                    isActive
                      ? "bg-brand-green/20 text-brand-lime border-l-4 border-brand-lime font-semibold"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`
                }
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="p-4 border-t border-white/10 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2.5 px-3 py-2 text-sm text-rose-400 hover:bg-rose-500/10 rounded-btn w-full transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Faculty Sign Out
          </button>
        </div>
      </aside>

      {sidebarOpen && <div className="fixed inset-0 bg-black/60 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <header className="bg-white border-b border-gray-100 px-4 py-3.5 flex items-center justify-between lg:px-8 shrink-0 z-20">
          <button className="lg:hidden p-1.5 rounded text-gray-600 hover:bg-gray-100" onClick={() => setSidebarOpen(true)}>
            <Menu className="w-5 h-5" />
          </button>
          <div className="ml-auto flex items-center gap-2">
            <NotificationBell />
            <span className="text-sm font-semibold text-brand-dark">{user?.name} (Faculty)</span>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto overscroll-contain p-4 pb-24 lg:p-8 lg:pb-8 w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
```

---

# FILE: `client\src\main.jsx`

```jsx
﻿import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import ErrorBoundary from "./components/shared/ErrorBoundary";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
);
```

---

# FILE: `client\src\pages\admin\AdminAchievements.jsx`

```jsx
import { useState, useEffect } from "react";
import api from "../../config/api";
import { Trophy, Plus, Search, Star, Pencil, Trash2, Award, X, Save } from "lucide-react";
import { alertSuccess, alertError } from "../../utils/alert";
import ConfirmModal from "../../components/shared/ConfirmModal";

const categoryColors = {
  STUDENT_RESULT: "bg-green-100 text-green-700",
  INSTITUTE_MILESTONE: "bg-blue-100 text-blue-700",
  AWARD: "bg-amber-100 text-amber-700",
  CERTIFICATION: "bg-purple-100 text-purple-700",
  EVENT: "bg-indigo-100 text-indigo-700",
  CUSTOM: "bg-slate-100 text-slate-600",
};

export default function AdminAchievements() {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [creating, setCreating] = useState(false);
  const [editingAchievement, setEditingAchievement] = useState(null);
  const [savingEdit, setSavingEdit] = useState(false);
  const [achievementToDelete, setAchievementToDelete] = useState(null);
  const [form, setForm] = useState({
    title: "", description: "", category: "STUDENT_RESULT",
    studentName: "", studentBatch: "", score: "", year: new Date().getFullYear(), featured: false,
  });

  const fetchAchievements = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/achievements");
      setAchievements(data.data?.achievements || []);
    } catch {
      setAchievements([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAchievements(); }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    setCreating(true);
    try {
      await api.post("/achievements", form);
      alertSuccess("Achievement added successfully");
      setShowCreate(false);
      setForm({ title: "", description: "", category: "STUDENT_RESULT", studentName: "", studentBatch: "", score: "", year: new Date().getFullYear(), featured: false });
      fetchAchievements();
    } catch (err) {
      alertError(err.response?.data?.message || "Failed to add achievement");
    } finally {
      setCreating(false);
    }
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    if (!editingAchievement) return;
    setSavingEdit(true);
    try {
      await api.put(`/achievements/${editingAchievement._id}`, editingAchievement);
      alertSuccess("Achievement updated");
      setEditingAchievement(null);
      fetchAchievements();
    } catch (err) {
      alertError(err.response?.data?.message || "Failed to update achievement");
    } finally {
      setSavingEdit(false);
    }
  };

  const toggleFeatured = async (achievement) => {
    try {
      await api.put(`/achievements/${achievement._id}`, { featured: !achievement.featured });
      alertSuccess(achievement.featured ? "Unmarked from featured" : "Marked as featured");
      fetchAchievements();
    } catch {
      alertError("Failed to update status");
    }
  };

  const confirmDelete = async () => {
    if (!achievementToDelete) return;
    try {
      await api.delete(`/achievements/${achievementToDelete._id}`);
      alertSuccess("Achievement deleted");
      setAchievementToDelete(null);
      fetchAchievements();
    } catch {
      alertError("Failed to delete");
    }
  };

  const filtered = achievements.filter((a) =>
    a.title?.toLowerCase().includes(search.toLowerCase()) ||
    a.studentName?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-extrabold text-2xl text-slate-900">Achievements</h1>
          <p className="text-slate-500 text-sm mt-1">{achievements.length} achievements · {achievements.filter((a) => a.featured).length} featured</p>
        </div>
        <button
          onClick={() => setShowCreate(true)}
          className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2.5 rounded-xl transition shadow-sm text-sm"
        >
          <Plus className="w-4 h-4" /> Add Achievement
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search achievements..."
          className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition bg-white"
        />
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-48">
          <div className="w-9 h-9 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white border border-slate-100 rounded-2xl p-12 text-center shadow-sm">
          <Trophy className="w-12 h-12 text-slate-200 mx-auto mb-4" />
          <h3 className="font-bold text-slate-600 mb-1">No achievements yet</h3>
          <p className="text-slate-400 text-sm">Add your first achievement to showcase results.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filtered.map((a) => (
            <div key={a._id} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition group">
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${a.featured ? "bg-gradient-to-br from-amber-400 to-orange-500 shadow-md" : "bg-slate-100"}`}>
                  <Trophy className={`w-6 h-6 ${a.featured ? "text-white" : "text-slate-400"}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${categoryColors[a.category] || "bg-slate-100 text-slate-600"}`}>
                      {a.category?.replace(/_/g, " ")}
                    </span>
                    <button
                      onClick={() => toggleFeatured(a)}
                      className={`text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1 transition ${
                        a.featured
                          ? "bg-amber-100 text-amber-700 hover:bg-amber-200"
                          : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                      }`}
                      title="Toggle Featured"
                    >
                      <Star className={`w-3 h-3 ${a.featured ? "fill-amber-500 text-amber-500" : ""}`} />
                      {a.featured ? "Featured" : "Set Featured"}
                    </button>
                    {a.year && <span className="text-xs text-slate-400">{a.year}</span>}
                  </div>
                  <h3 className="font-bold text-slate-800 mb-1">{a.title}</h3>
                  <p className="text-xs text-slate-500 line-clamp-2 mb-2">{a.description}</p>
                  {a.studentName && (
                    <div className="flex flex-wrap gap-3 text-xs text-slate-500">
                      <span className="font-semibold text-slate-700">{a.studentName}</span>
                      {a.studentBatch && <span>· {a.studentBatch}</span>}
                      {a.score && <span className="font-bold text-green-700">Score: {a.score}</span>}
                    </div>
                  )}
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition flex-shrink-0">
                  <button
                    onClick={() => setEditingAchievement(a)}
                    className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-indigo-600 transition"
                    title="Edit Achievement"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setAchievementToDelete(a)}
                    className="p-2 rounded-lg hover:bg-red-50 text-red-500 transition"
                    title="Delete Achievement"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Modal */}
      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-100">
              <h2 className="font-extrabold text-xl text-slate-900">Add Achievement</h2>
            </div>
            <form onSubmit={handleCreate} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Title *</label>
                <input required value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition"
                  placeholder="e.g. AIR 84 in NEET UG 2024" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Category</label>
                <select value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition bg-white">
                  {["STUDENT_RESULT", "INSTITUTE_MILESTONE", "AWARD", "CERTIFICATION", "EVENT", "CUSTOM"].map((c) => (
                    <option key={c} value={c}>{c.replace(/_/g, " ")}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Description</label>
                <textarea value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} rows={3}
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition resize-none"
                  placeholder="Details about this achievement..." />
              </div>
              {form.category === "STUDENT_RESULT" && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Student Name</label>
                    <input value={form.studentName} onChange={(e) => setForm((f) => ({ ...f, studentName: e.target.value }))}
                      className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Score</label>
                    <input value={form.score} onChange={(e) => setForm((f) => ({ ...f, score: e.target.value }))}
                      className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition"
                      placeholder="e.g. 710 / 720" />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Batch</label>
                    <input value={form.studentBatch} onChange={(e) => setForm((f) => ({ ...f, studentBatch: e.target.value }))}
                      className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition"
                      placeholder="e.g. Batch Alpha 2024" />
                  </div>
                </div>
              )}
              <div className="flex items-center gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Year</label>
                  <input type="number" value={form.year} onChange={(e) => setForm((f) => ({ ...f, year: parseInt(e.target.value) }))}
                    className="w-28 px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition" />
                </div>
                <div className="flex items-center gap-2 mt-5">
                  <input type="checkbox" id="featured" checked={form.featured} onChange={(e) => setForm((f) => ({ ...f, featured: e.target.checked }))}
                    className="w-4 h-4 rounded accent-green-600" />
                  <label htmlFor="featured" className="text-sm font-semibold text-slate-700 cursor-pointer">Feature on homepage</label>
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowCreate(false)}
                  className="flex-1 py-2.5 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition">Cancel</button>
                <button type="submit" disabled={creating}
                  className="flex-1 py-2.5 bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white font-bold rounded-xl transition">
                  {creating ? "Adding..." : "Add Achievement"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Achievement Modal */}
      {editingAchievement && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white rounded-t-2xl z-10">
              <h2 className="font-extrabold text-xl text-slate-900">Edit Achievement</h2>
              <button
                onClick={() => setEditingAchievement(null)}
                className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSaveEdit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Title *</label>
                <input
                  required
                  value={editingAchievement.title || ""}
                  onChange={(e) => setEditingAchievement((prev) => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Category</label>
                <select
                  value={editingAchievement.category}
                  onChange={(e) => setEditingAchievement((prev) => ({ ...prev, category: e.target.value }))}
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition bg-white"
                >
                  {["STUDENT_RESULT", "INSTITUTE_MILESTONE", "AWARD", "CERTIFICATION", "EVENT", "CUSTOM"].map((c) => (
                    <option key={c} value={c}>{c.replace(/_/g, " ")}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Description</label>
                <textarea
                  rows={3}
                  value={editingAchievement.description || ""}
                  onChange={(e) => setEditingAchievement((prev) => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition resize-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Student Name</label>
                  <input
                    value={editingAchievement.studentName || ""}
                    onChange={(e) => setEditingAchievement((prev) => ({ ...prev, studentName: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Score</label>
                  <input
                    value={editingAchievement.score || ""}
                    onChange={(e) => setEditingAchievement((prev) => ({ ...prev, score: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Batch</label>
                  <input
                    value={editingAchievement.studentBatch || ""}
                    onChange={(e) => setEditingAchievement((prev) => ({ ...prev, studentBatch: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition"
                  />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Year</label>
                  <input
                    type="number"
                    value={editingAchievement.year || 2024}
                    onChange={(e) => setEditingAchievement((prev) => ({ ...prev, year: parseInt(e.target.value) || 2024 }))}
                    className="w-28 px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition"
                  />
                </div>
                <div className="flex items-center gap-2 mt-5">
                  <input
                    type="checkbox"
                    id="editFeatured"
                    checked={editingAchievement.featured || false}
                    onChange={(e) => setEditingAchievement((prev) => ({ ...prev, featured: e.target.checked }))}
                    className="w-4 h-4 rounded accent-green-600"
                  />
                  <label htmlFor="editFeatured" className="text-sm font-semibold text-slate-700 cursor-pointer">
                    Feature on homepage
                  </label>
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingAchievement(null)}
                  className="flex-1 py-2.5 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingEdit}
                  className="flex-1 py-2.5 bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white font-bold rounded-xl transition shadow-sm inline-flex items-center justify-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  {savingEdit ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmModal
        isOpen={!!achievementToDelete}
        onClose={() => setAchievementToDelete(null)}
        onConfirm={confirmDelete}
        title="Delete Achievement"
        message={`Are you sure you want to delete "${achievementToDelete?.title}"?`}
        confirmLabel="Delete Achievement"
        danger={true}
      />
    </div>
  );
}
```

---

# FILE: `client\src\pages\admin\AdminBatches.jsx`

```jsx
import { useState, useEffect } from "react";
import api from "../../config/api";
import { Users, Plus, Search, BookOpen, Clock, Calendar, Pencil, Trash2, X, Save, UserMinus, ShieldAlert } from "lucide-react";
import { alertSuccess, alertError } from "../../utils/alert";
import ConfirmModal from "../../components/shared/ConfirmModal";

const batchTypeColors = {
  OFFLINE: "bg-emerald-100 text-emerald-700",
  ONLINE: "bg-blue-100 text-blue-700",
  HYBRID: "bg-purple-100 text-purple-700",
  EXAM_ONLY: "bg-orange-100 text-orange-700",
};

export default function AdminBatches() {
  const [batches, setBatches] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [creating, setCreating] = useState(false);
  const [viewingBatch, setViewingBatch] = useState(null);
  const [batchStudents, setBatchStudents] = useState([]);
  const [allStudents, setAllStudents] = useState([]);
  const [studentToEnroll, setStudentToEnroll] = useState("");
  const [loadingStudents, setLoadingStudents] = useState(false);
  const [editingBatch, setEditingBatch] = useState(null);
  const [savingEdit, setSavingEdit] = useState(false);
  const [batchToDelete, setBatchToDelete] = useState(null);
  const [form, setForm] = useState({
    name: "",
    code: "",
    batchType: "OFFLINE",
    course: "",
    academicYear: "",
    capacity: "",
    schedule: "",
    color: "#22c55e",
  });

  const fetchBatches = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/batches");
      setBatches(data.data?.batches || []);
    } catch {
      setBatches([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchCourses = async () => {
    try {
      const { data } = await api.get("/courses");
      setCourses(data.data?.courses || []);
    } catch {
      setCourses([]);
    }
  };

  useEffect(() => { fetchBatches(); fetchCourses(); }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!form.course) {
      alertError("Please select a course before creating a batch");
      return;
    }

    setCreating(true);
    try {
      await api.post("/batches", {
        ...form,
        capacity: Number(form.capacity || 0),
      });
      alertSuccess("Batch created successfully");
      setShowCreate(false);
      setForm({ name: "", code: "", batchType: "OFFLINE", course: "", academicYear: "", capacity: "", schedule: "", color: "#22c55e" });
      fetchBatches();
    } catch (err) {
      alertError(err.response?.data?.message || "Failed to create batch");
    } finally {
      setCreating(false);
    }
  };

  const handleOpenStudents = async (batch) => {
    setViewingBatch(batch);
    setLoadingStudents(true);
    setStudentToEnroll("");
    try {
      const [bRes, sRes] = await Promise.all([
        api.get(`/batches/${batch._id}/students`),
        api.get("/students?limit=100"),
      ]);
      setBatchStudents(bRes.data.data?.students || []);
      setAllStudents(sRes.data.data?.students || []);
    } catch {
      setBatchStudents([]);
      alertError("Failed to load students in this batch");
    } finally {
      setLoadingStudents(false);
    }
  };

  const handleEnrollStudent = async (e) => {
    e.preventDefault();
    if (!studentToEnroll || !viewingBatch) return;
    try {
      await api.post(`/batches/${viewingBatch._id}/students`, {
        studentIds: [studentToEnroll],
      });
      alertSuccess("Student enrolled into batch successfully");
      const { data } = await api.get(`/batches/${viewingBatch._id}/students`);
      setBatchStudents(data.data?.students || []);
      setStudentToEnroll("");
      fetchBatches();
    } catch (err) {
      alertError(err.response?.data?.message || "Failed to enroll student");
    }
  };

  const handleRemoveStudent = async (studentId) => {
    if (!viewingBatch) return;
    try {
      await api.delete(`/batches/${viewingBatch._id}/students/${studentId}`);
      alertSuccess("Student removed from batch");
      setBatchStudents((prev) => prev.filter((s) => s._id !== studentId));
      fetchBatches();
    } catch (err) {
      alertError(err.response?.data?.message || "Failed to remove student");
    }
  };

  const handleSaveBatchEdit = async (e) => {
    e.preventDefault();
    if (!editingBatch) return;
    setSavingEdit(true);
    try {
      await api.put(`/batches/${editingBatch._id}`, {
        name: editingBatch.name,
        code: editingBatch.code,
        batchType: editingBatch.batchType,
        course: typeof editingBatch.course === "object" ? editingBatch.course?._id : editingBatch.course,
        academicYear: editingBatch.academicYear,
        capacity: Number(editingBatch.capacity || 0),
        schedule: editingBatch.schedule,
        color: editingBatch.color,
      });
      alertSuccess("Batch updated successfully");
      setEditingBatch(null);
      fetchBatches();
    } catch (err) {
      alertError(err.response?.data?.message || "Failed to update batch");
    } finally {
      setSavingEdit(false);
    }
  };

  const confirmDeleteBatch = async () => {
    if (!batchToDelete) return;
    try {
      await api.delete(`/batches/${batchToDelete._id}`);
      alertSuccess("Batch deleted successfully");
      setBatchToDelete(null);
      fetchBatches();
    } catch (err) {
      alertError(err.response?.data?.message || "Failed to delete batch");
    }
  };

  const filtered = batches.filter(
    (b) =>
      b.name?.toLowerCase().includes(search.toLowerCase()) ||
      b.code?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-extrabold text-2xl text-slate-900">Batches</h1>
          <p className="text-slate-500 text-sm mt-1">{batches.length} active batches</p>
        </div>
        <button onClick={() => setShowCreate(true)} className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2.5 rounded-xl transition shadow-sm text-sm">
          <Plus className="w-4 h-4" /> Create Batch
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search batches..."
          className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition bg-white"
        />
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-48">
          <div className="w-9 h-9 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white border border-slate-100 rounded-2xl p-12 text-center shadow-sm">
          <BookOpen className="w-12 h-12 text-slate-200 mx-auto mb-4" />
          <h3 className="font-bold text-slate-600 mb-1">No batches found</h3>
          <p className="text-slate-400 text-sm">Create your first batch using the button above and it will appear in the student-facing flow.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filtered.map((b) => (
            <div key={b._id} className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition group">
              <div
                className="h-1.5"
                style={{ backgroundColor: b.color || "#22c55e" }}
              />
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                        {b.code}
                      </span>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${batchTypeColors[b.batchType] || "bg-slate-100 text-slate-600"}`}>
                        {b.batchType}
                      </span>
                    </div>
                    <h3 className="font-bold text-slate-800 text-base">{b.name}</h3>
                  </div>
                  <button
                    onClick={() => setBatchToDelete(b)}
                    className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition"
                    title="Delete Batch"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="text-center bg-slate-50 rounded-xl p-3 border border-slate-100">
                    <div className="text-xl font-extrabold text-slate-800">{b.students?.length || 0}</div>
                    <div className="text-xs text-slate-400 mt-0.5">Students</div>
                  </div>
                  <div className="text-center bg-slate-50 rounded-xl p-3 border border-slate-100">
                    <div className="text-xl font-extrabold text-slate-800">{b.capacity || "—"}</div>
                    <div className="text-xs text-slate-400 mt-0.5">Capacity</div>
                  </div>
                  <div className="text-center bg-slate-50 rounded-xl p-3 border border-slate-100">
                    <div className="text-xl font-extrabold text-slate-800">{b.assignedTeachers?.length || 0}</div>
                    <div className="text-xs text-slate-400 mt-0.5">Teachers</div>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-slate-500">
                  {b.schedule && (
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{b.schedule}</span>
                    </div>
                  )}
                  {b.academicYear && (
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>Academic Year: {b.academicYear}</span>
                    </div>
                  )}
                </div>

                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => handleOpenStudents(b)}
                    className="flex-1 text-xs font-semibold py-2 rounded-lg bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200 transition"
                  >
                    View Students
                  </button>
                  <button
                    onClick={() =>
                      setEditingBatch({
                        ...b,
                        course: b.course?._id || b.course || "",
                      })
                    }
                    className="flex-1 text-xs font-semibold py-2 rounded-lg bg-green-50 text-green-700 hover:bg-green-100 border border-green-200 transition"
                  >
                    Edit Batch
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-100">
              <h2 className="font-extrabold text-xl text-slate-900">Create New Batch</h2>
              <p className="text-slate-500 text-sm mt-1">Associate the batch with an active course and publish it to the public flow.</p>
            </div>
            <form onSubmit={handleCreate} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Batch Name *</label>
                  <input required value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition" placeholder="12th Batch – SANKALP" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Batch Code *</label>
                  <input required value={form.code} onChange={(e) => setForm((f) => ({ ...f, code: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition" placeholder="SANKALP-12TH" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Batch Type</label>
                  <select value={form.batchType} onChange={(e) => setForm((f) => ({ ...f, batchType: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition">
                    <option value="OFFLINE">OFFLINE</option>
                    <option value="ONLINE">ONLINE</option>
                    <option value="HYBRID">HYBRID</option>
                    <option value="EXAM_ONLY">EXAM_ONLY</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Course *</label>
                  <select value={form.course} onChange={(e) => setForm((f) => ({ ...f, course: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition">
                    <option value="">Select a course</option>
                    {courses.map((course) => (
                      <option key={course._id} value={course._id}>{course.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Academic Year</label>
                  <input value={form.academicYear} onChange={(e) => setForm((f) => ({ ...f, academicYear: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition" placeholder="2026-2027" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Capacity</label>
                  <input type="number" min="0" value={form.capacity} onChange={(e) => setForm((f) => ({ ...f, capacity: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition" placeholder="40" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Schedule</label>
                  <input value={form.schedule} onChange={(e) => setForm((f) => ({ ...f, schedule: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition" placeholder="Mon–Sat: 08:30 AM – 01:30 PM" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Batch Color</label>
                  <input type="color" value={form.color} onChange={(e) => setForm((f) => ({ ...f, color: e.target.value }))}
                    className="w-full h-12 px-2 py-1 border border-slate-200 rounded-xl bg-white" />
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowCreate(false)}
                  className="flex-1 py-2.5 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition">
                  Cancel
                </button>
                <button type="submit" disabled={creating}
                  className="flex-1 py-2.5 bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white font-bold rounded-xl transition shadow-sm">
                  {creating ? "Creating..." : "Create Batch"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Batch Students Modal */}
      {viewingBatch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white rounded-t-2xl z-10">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                    {viewingBatch.code}
                  </span>
                  <h2 className="font-extrabold text-xl text-slate-900">{viewingBatch.name}</h2>
                </div>
                <p className="text-slate-500 text-xs mt-1">
                  Enrolled Students ({batchStudents.length} / {viewingBatch.capacity || "Unlimited"})
                </p>
              </div>
              <button
                onClick={() => setViewingBatch(null)}
                className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              {/* Quick Enroll Student Form */}
              <form onSubmit={handleEnrollStudent} className="flex items-center gap-2 mb-4 p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <select
                  value={studentToEnroll}
                  onChange={(e) => setStudentToEnroll(e.target.value)}
                  className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-xs bg-white focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
                >
                  <option value="">Select a student to enroll into this batch...</option>
                  {allStudents
                    .filter((st) => !batchStudents.some((bs) => bs._id === st._id))
                    .map((st) => (
                      <option key={st._id} value={st._id}>
                        {st.user?.name} ({st.studentId || st.user?.email})
                      </option>
                    ))}
                </select>
                <button
                  type="submit"
                  disabled={!studentToEnroll}
                  className="px-3.5 py-2 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white rounded-lg text-xs font-bold transition shadow-sm inline-flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Enroll
                </button>
              </form>

              {loadingStudents ? (
                <div className="py-12 flex justify-center items-center">
                  <div className="w-8 h-8 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
                </div>
              ) : batchStudents.length === 0 ? (
                <div className="text-center py-12">
                  <Users className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <h3 className="font-bold text-slate-700">No students enrolled in this batch</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Assign students to this batch from the Students page.
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-slate-100 border border-slate-100 rounded-xl overflow-hidden">
                  {batchStudents.map((s) => (
                    <div key={s._id} className="p-3.5 flex items-center justify-between hover:bg-slate-50 transition">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-white font-bold text-xs shadow-sm">
                          {s.user?.name?.charAt(0)?.toUpperCase() || "S"}
                        </div>
                        <div>
                          <div className="font-bold text-slate-800 text-sm">{s.user?.name}</div>
                          <div className="text-xs text-slate-400 flex items-center gap-2">
                            <span>ID: {s.studentId || "—"}</span>
                            <span>•</span>
                            <span>{s.user?.email}</span>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => handleRemoveStudent(s._id)}
                        className="inline-flex items-center gap-1 text-xs text-red-500 hover:text-red-700 hover:bg-red-50 px-2.5 py-1.5 rounded-lg border border-red-100 transition"
                        title="Remove student from this batch"
                      >
                        <UserMinus className="w-3.5 h-3.5" /> Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="p-6 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setViewingBatch(null)}
                className="px-5 py-2.5 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Batch Modal */}
      {editingBatch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white rounded-t-2xl z-10">
              <div>
                <h2 className="font-extrabold text-xl text-slate-900">Edit Batch</h2>
                <p className="text-slate-500 text-xs mt-0.5">Modify batch details, schedule, or capacity.</p>
              </div>
              <button
                onClick={() => setEditingBatch(null)}
                className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSaveBatchEdit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Batch Name *</label>
                  <input
                    required
                    value={editingBatch.name}
                    onChange={(e) => setEditingBatch((prev) => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Batch Code *</label>
                  <input
                    required
                    value={editingBatch.code}
                    onChange={(e) => setEditingBatch((prev) => ({ ...prev, code: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Batch Type</label>
                  <select
                    value={editingBatch.batchType}
                    onChange={(e) => setEditingBatch((prev) => ({ ...prev, batchType: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition bg-white"
                  >
                    <option value="OFFLINE">OFFLINE</option>
                    <option value="ONLINE">ONLINE</option>
                    <option value="HYBRID">HYBRID</option>
                    <option value="EXAM_ONLY">EXAM_ONLY</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Course *</label>
                  <select
                    value={editingBatch.course}
                    onChange={(e) => setEditingBatch((prev) => ({ ...prev, course: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition bg-white"
                  >
                    <option value="">Select a course</option>
                    {courses.map((c) => (
                      <option key={c._id} value={c._id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Academic Year</label>
                  <input
                    value={editingBatch.academicYear || ""}
                    onChange={(e) => setEditingBatch((prev) => ({ ...prev, academicYear: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Capacity</label>
                  <input
                    type="number"
                    min="0"
                    value={editingBatch.capacity || ""}
                    onChange={(e) => setEditingBatch((prev) => ({ ...prev, capacity: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Schedule</label>
                  <input
                    value={editingBatch.schedule || ""}
                    onChange={(e) => setEditingBatch((prev) => ({ ...prev, schedule: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Batch Color</label>
                  <input
                    type="color"
                    value={editingBatch.color || "#22c55e"}
                    onChange={(e) => setEditingBatch((prev) => ({ ...prev, color: e.target.value }))}
                    className="w-full h-12 px-2 py-1 border border-slate-200 rounded-xl bg-white"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingBatch(null)}
                  className="flex-1 py-2.5 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingEdit}
                  className="flex-1 py-2.5 bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white font-bold rounded-xl transition shadow-sm inline-flex items-center justify-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  {savingEdit ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Batch Confirmation */}
      <ConfirmModal
        isOpen={!!batchToDelete}
        onClose={() => setBatchToDelete(null)}
        onConfirm={confirmDeleteBatch}
        title="Delete Batch"
        message={`Are you sure you want to delete "${batchToDelete?.name}"? Students enrolled in this batch will be unlinked.`}
        confirmLabel="Delete Batch"
        danger={true}
      />
    </div>
  );
}
```

---

# FILE: `client\src\pages\admin\AdminContactSettings.jsx`

```jsx
import { useState, useEffect } from "react";
import api from "../../config/api";
import { Save, Globe, Mail, Send, RotateCcw, ExternalLink } from "lucide-react";
import { alertSuccess, alertError, confirmDialog } from "../../utils/alert";

const defaultSettings = {
  instituteEmail: "contact@neetvidya.com",
  institutePhone: "+91 98765 43210",
  address: "NEETVIDYA Medical Academy, Ring Road",
  city: "New Delhi",
  state: "Delhi",
  telegramChannelLink: "https://t.me/neetvidya720official",
  whatsappGroupLink: "https://chat.whatsapp.com/neetvidya",
  whatsappNumber: "919876543210",
  whatsappDefaultMessage: "Hello NEETVIDYA, I would like admission details.",
  facebookLink: "https://facebook.com/neetvidya",
  instagramLink: "https://instagram.com/neetvidya",
  youtubeLink: "https://youtube.com/@neetvidya",
  officeHours: "Mon–Sat: 8:00 AM – 7:00 PM",
  mapEmbedUrl: "",
};

export default function AdminContactSettings() {
  const [form, setForm] = useState({
    instituteEmail: "",
    institutePhone: "",
    address: "",
    city: "",
    state: "",
    telegramChannelLink: "",
    whatsappGroupLink: "",
    whatsappNumber: "",
    whatsappDefaultMessage: "",
    facebookLink: "",
    instagramLink: "",
    youtubeLink: "",
    officeHours: "",
    mapEmbedUrl: "",
  });
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/contact-settings")
      .then(({ data }) => {
        if (data.data?.settings) setForm(data.data.settings);
      })
      .catch(() => { })
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleReset = async () => {
    const confirmed = await confirmDialog({
      title: "Reset Settings?",
      text: "Reset all contact settings to institute defaults?",
      confirmText: "Yes, reset",
    });
    if (confirmed) {
      setForm(defaultSettings);
      alertSuccess("Settings reset to defaults. Click 'Save All Settings' to persist.");
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.put("/contact-settings", form);
      alertSuccess("Contact settings saved successfully");
    } catch (err) {
      alertError(err.response?.data?.message || "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const inputCls =
    "w-full px-4 py-3 border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition";
  const labelCls =
    "block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2";

  return (
    <div className="p-6 space-y-6 max-w-4xl">
      <div>
        <h1 className="font-extrabold text-2xl text-slate-900">Contact &amp; Links Settings</h1>
        <p className="text-slate-500 text-sm mt-1">
          Manage institute contact details and social/channel links
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* Basic Contact */}
        <div className="bg-white border-slate-100 rounded-2xl shadow-sm p-6 space-y-4">
          <h2 className="font-bold text-slate-800 flex items-center gap-2">
            <Mail className="w-4 h-4 text-green-600" /> Basic Contact
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Email</label>
              <input
                name="instituteEmail"
                value={form.instituteEmail}
                onChange={handleChange}
                className={inputCls}
              />
            </div>
            <div>
              <label className={labelCls}>Phone</label>
              <input
                name="institutePhone"
                value={form.institutePhone}
                onChange={handleChange}
                className={inputCls}
              />
            </div>
          </div>
          <div>
            <label className={labelCls}>Address</label>
            <input
              name="address"
              value={form.address}
              onChange={handleChange}
              className={inputCls}
            />
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className={labelCls}>City</label>
              <input name="city" value={form.city} onChange={handleChange} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>State</label>
              <input name="state" value={form.state} onChange={handleChange} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Office Hours</label>
              <input
                name="officeHours"
                value={form.officeHours}
                onChange={handleChange}
                className={inputCls}
              />
            </div>
          </div>
        </div>

        {/* Channel Links */}
        <div className="bg-white border-slate-100 rounded-2xl shadow-sm p-6 space-y-4">
          <h2 className="font-bold text-slate-800 flex items-center gap-2">
            <Send className="w-4 h-4 text-sky-600" /> Channel &amp; Group Links
          </h2>
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className={labelCls}>Telegram Channel Link</label>
              {form.telegramChannelLink && (
                <a
                  href={form.telegramChannelLink}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-sky-600 hover:underline inline-flex items-center gap-1 font-semibold"
                >
                  Test Link <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
            <input
              name="telegramChannelLink"
              value={form.telegramChannelLink}
              onChange={handleChange}
              placeholder="https://t.me/neetvidya720official"
              className={inputCls}
            />
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className={labelCls}>WhatsApp Group Link</label>
              {form.whatsappGroupLink && (
                <a
                  href={form.whatsappGroupLink}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-green-600 hover:underline inline-flex items-center gap-1 font-semibold"
                >
                  Test Link <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
            <input
              name="whatsappGroupLink"
              value={form.whatsappGroupLink}
              onChange={handleChange}
              placeholder="https://chat.whatsapp.com/ABC123XYZ"
              className={inputCls}
            />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>WhatsApp Number (direct chat)</label>
              <input
                name="whatsappNumber"
                value={form.whatsappNumber}
                onChange={handleChange}
                placeholder="919876543210"
                className={inputCls}
              />
            </div>
            <div>
              <label className={labelCls}>WhatsApp Default Message</label>
              <input
                name="whatsappDefaultMessage"
                value={form.whatsappDefaultMessage}
                onChange={handleChange}
                className={inputCls}
              />
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="bg-white border-slate-100 rounded-2xl shadow-sm p-6 space-y-4">
          <h2 className="font-bold text-slate-800 flex items-center gap-2">
            <Globe className="w-4 h-4 text-purple-600" /> Social Media Links
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Facebook</label>
              <input
                name="facebookLink"
                value={form.facebookLink}
                onChange={handleChange}
                placeholder="https://facebook.com/neetvidya"
                className={inputCls}
              />
            </div>
            <div>
              <label className={labelCls}>Instagram</label>
              <input
                name="instagramLink"
                value={form.instagramLink}
                onChange={handleChange}
                placeholder="https://instagram.com/neetvidya"
                className={inputCls}
              />
            </div>
            <div>
              <label className={labelCls}>YouTube</label>
              <input
                name="youtubeLink"
                value={form.youtubeLink}
                onChange={handleChange}
                placeholder="https://youtube.com/@neetvidya"
                className={inputCls}
              />
            </div>
            <div>
              <label className={labelCls}>Google Map Embed URL</label>
              <input
                name="mapEmbedUrl"
                value={form.mapEmbedUrl}
                onChange={handleChange}
                placeholder="https://www.google.com/maps/embed?pb=..."
                className={inputCls}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white font-bold px-8 py-3 rounded-xl transition shadow-sm"
          >
            <Save className="w-4 h-4" />
            {saving ? "Saving..." : "Save All Settings"}
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-5 py-3 border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold rounded-xl text-sm transition"
          >
            <RotateCcw className="w-4 h-4" /> Reset to Defaults
          </button>
        </div>
      </form>
    </div>
  );
}
```

---

# FILE: `client\src\pages\admin\AdminCourses.jsx`

```jsx
import { useState, useEffect } from "react";
import api from "../../config/api";
import { BookOpen, Plus, Search, IndianRupee, Clock, Users, ChevronRight, Pencil, Trash2, X, Save, CheckCircle2 } from "lucide-react";
import { alertSuccess, alertError } from "../../utils/alert";
import ConfirmModal from "../../components/shared/ConfirmModal";

export default function AdminCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [creating, setCreating] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [savingEdit, setSavingEdit] = useState(false);
  const [viewingCourse, setViewingCourse] = useState(null);
  const [courseToDelete, setCourseToDelete] = useState(null);
  const [form, setForm] = useState({
    name: "",
    description: "",
    targetClass: "",
    duration: "",
    feeAmount: "",
    features: "",
  });

  const fetchCourses = async () => {
    try {
      const { data } = await api.get("/courses");
      setCourses(data.data?.courses || []);
    } catch {
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    setCreating(true);
    try {
      const payload = {
        ...form,
        feeAmount: Number(form.feeAmount || 0),
        features: form.features
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
      };

      await api.post("/courses", payload);
      alertSuccess("Course created successfully");
      setShowCreate(false);
      setForm({ name: "", description: "", targetClass: "", duration: "", feeAmount: "", features: "" });
      fetchCourses();
    } catch (err) {
      alertError(err.response?.data?.message || "Failed to create course");
    } finally {
      setCreating(false);
    }
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    if (!editingCourse) return;
    setSavingEdit(true);
    try {
      const payload = {
        name: editingCourse.name,
        description: editingCourse.description,
        targetClass: editingCourse.targetClass,
        duration: editingCourse.duration,
        feeAmount: Number(editingCourse.feeAmount || 0),
        isActive: editingCourse.isActive,
        features: Array.isArray(editingCourse.features)
          ? editingCourse.features
          : String(editingCourse.features || "")
              .split(",")
              .map((i) => i.trim())
              .filter(Boolean),
      };
      await api.put(`/courses/${editingCourse._id}`, payload);
      alertSuccess("Course updated successfully");
      setEditingCourse(null);
      fetchCourses();
    } catch (err) {
      alertError(err.response?.data?.message || "Failed to update course");
    } finally {
      setSavingEdit(false);
    }
  };

  const confirmDeleteCourse = async () => {
    if (!courseToDelete) return;
    try {
      await api.delete(`/courses/${courseToDelete._id}`);
      alertSuccess("Course deleted successfully");
      setCourseToDelete(null);
      fetchCourses();
    } catch (err) {
      alertError(err.response?.data?.message || "Failed to delete course");
    }
  };

  const filtered = courses.filter((c) =>
    c.name?.toLowerCase().includes(search.toLowerCase()) ||
    c.targetClass?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-extrabold text-2xl text-slate-900">Courses</h1>
          <p className="text-slate-500 text-sm mt-1">{courses.length} active courses</p>
        </div>
        <button onClick={() => setShowCreate(true)} className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2.5 rounded-xl transition shadow-sm text-sm">
          <Plus className="w-4 h-4" /> Add Course
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search courses..."
          className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition bg-white"
        />
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-48">
          <div className="w-9 h-9 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white border border-slate-100 rounded-2xl p-12 text-center shadow-sm">
          <BookOpen className="w-12 h-12 text-slate-200 mx-auto mb-4" />
          <h3 className="font-bold text-slate-600 mb-1">No courses published yet</h3>
          <p className="text-slate-400 text-sm">Create your first course using the button above and it will appear on the public site automatically.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map((course) => (
            <div key={course._id} className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition group">
              {/* Top color bar */}
              <div className="h-1.5 bg-gradient-to-r from-green-500 to-emerald-400" />
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-green-50 border border-green-100 flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${course.isActive ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"}`}>
                      {course.isActive ? "Active" : "Inactive"}
                    </span>
                    <button
                      onClick={() => setCourseToDelete(course)}
                      className="p-1 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition"
                      title="Delete Course"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <h3 className="font-extrabold text-slate-900 text-lg mb-1 leading-tight">{course.name}</h3>
                <p className="text-xs text-slate-500 mb-4 line-clamp-2">{course.description}</p>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                      <Clock className="w-3.5 h-3.5" /> Duration
                    </div>
                    <div className="font-bold text-slate-700 text-sm">{course.duration || "—"}</div>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                      <IndianRupee className="w-3.5 h-3.5" /> Fees
                    </div>
                    <div className="font-bold text-slate-700 text-sm">
                      ₹{course.feeAmount?.toLocaleString("en-IN") || "—"}
                    </div>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                      <Users className="w-3.5 h-3.5" /> Target
                    </div>
                    <div className="font-bold text-slate-700 text-sm">{course.targetClass || "—"}</div>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                      <BookOpen className="w-3.5 h-3.5" /> Subjects
                    </div>
                    <div className="font-bold text-slate-700 text-sm">{course.subjects?.length || 0}</div>
                  </div>
                </div>

                {course.features?.length > 0 && (
                  <ul className="space-y-1 mb-4">
                    {course.features.slice(0, 3).map((f) => (
                      <li key={f} className="flex items-center gap-1.5 text-xs text-slate-500">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                    {course.features.length > 3 && (
                      <li className="text-xs text-slate-400 pl-3">+{course.features.length - 3} more features</li>
                    )}
                  </ul>
                )}

                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      setEditingCourse({
                        ...course,
                        features: course.features?.join(", ") || "",
                      })
                    }
                    className="flex-1 inline-flex items-center justify-center gap-1.5 text-xs font-semibold py-2.5 rounded-xl bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200 transition"
                  >
                    <Pencil className="w-3.5 h-3.5" /> Edit
                  </button>
                  <button
                    onClick={() => setViewingCourse(course)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 text-xs font-semibold py-2.5 rounded-xl bg-green-50 text-green-700 hover:bg-green-100 border border-green-200 transition"
                  >
                    View Details <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-100">
              <h2 className="font-extrabold text-xl text-slate-900">Add New Course</h2>
              <p className="text-slate-500 text-sm mt-1">This program will be shown on the public site when published.</p>
            </div>
            <form onSubmit={handleCreate} className="p-6 space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Course Name *</label>
                  <input required value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition" placeholder="12th Batch – SANKALP" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Target Class</label>
                  <input value={form.targetClass} onChange={(e) => setForm((f) => ({ ...f, targetClass: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition" placeholder="Class 12, Droppers, Foundation" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Duration</label>
                  <input value={form.duration} onChange={(e) => setForm((f) => ({ ...f, duration: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition" placeholder="Complete 1 Year" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Fees (₹)</label>
                  <input type="number" min="0" value={form.feeAmount} onChange={(e) => setForm((f) => ({ ...f, feeAmount: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition" placeholder="20000" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Description</label>
                  <textarea rows={3} value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition resize-none" placeholder="Describe the course, focus area, and outcomes." />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Features</label>
                  <textarea rows={3} value={form.features} onChange={(e) => setForm((f) => ({ ...f, features: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition resize-none" placeholder="Separate each feature with a comma, e.g. NCERT mastery, DPPs, mock tests" />
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowCreate(false)}
                  className="flex-1 py-2.5 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition">
                  Cancel
                </button>
                <button type="submit" disabled={creating}
                  className="flex-1 py-2.5 bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white font-bold rounded-xl transition shadow-sm">
                  {creating ? "Creating..." : "Create Course"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Course Details Modal */}
      {viewingCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white rounded-t-2xl z-10">
              <div>
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${viewingCourse.isActive ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"}`}>
                  {viewingCourse.isActive ? "● Active Course" : "● Inactive"}
                </span>
                <h2 className="font-extrabold text-xl text-slate-900 mt-1">{viewingCourse.name}</h2>
              </div>
              <button
                onClick={() => setViewingCourse(null)}
                className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-sm">
              <p className="text-slate-600 text-xs leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                {viewingCourse.description || "No description provided."}
              </p>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-xs text-slate-400 block font-medium">Duration</span>
                  <span className="font-bold text-slate-800">{viewingCourse.duration || "—"}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-xs text-slate-400 block font-medium">Course Fees</span>
                  <span className="font-bold text-slate-800">₹{viewingCourse.feeAmount?.toLocaleString("en-IN") || "—"}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-xs text-slate-400 block font-medium">Target Audience</span>
                  <span className="font-bold text-slate-800">{viewingCourse.targetClass || "—"}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-xs text-slate-400 block font-medium">Subjects Included</span>
                  <span className="font-bold text-slate-800">{viewingCourse.subjects?.length || "All NEET"}</span>
                </div>
              </div>

              {viewingCourse.features?.length > 0 && (
                <div>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Key Highlights</span>
                  <ul className="space-y-1.5">
                    {viewingCourse.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-slate-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-green-600 flex-shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="p-6 border-t border-slate-100 flex gap-3">
              <button
                onClick={() => setViewingCourse(null)}
                className="flex-1 py-2.5 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const c = viewingCourse;
                  setViewingCourse(null);
                  setEditingCourse({
                    ...c,
                    features: c.features?.join(", ") || "",
                  });
                }}
                className="flex-1 py-2.5 bg-green-600 hover:bg-green-700 text-white text-sm font-bold rounded-xl transition shadow-sm"
              >
                Edit Program
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Course Modal */}
      {editingCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white rounded-t-2xl z-10">
              <div>
                <h2 className="font-extrabold text-xl text-slate-900">Edit Course</h2>
                <p className="text-slate-500 text-xs mt-0.5">Modify program details, pricing, and key features.</p>
              </div>
              <button
                onClick={() => setEditingCourse(null)}
                className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSaveEdit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Course Name *</label>
                  <input
                    required
                    value={editingCourse.name}
                    onChange={(e) => setEditingCourse((prev) => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Target Class</label>
                    <input
                      value={editingCourse.targetClass || ""}
                      onChange={(e) => setEditingCourse((prev) => ({ ...prev, targetClass: e.target.value }))}
                      className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Duration</label>
                    <input
                      value={editingCourse.duration || ""}
                      onChange={(e) => setEditingCourse((prev) => ({ ...prev, duration: e.target.value }))}
                      className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Fees (₹)</label>
                    <input
                      type="number"
                      min="0"
                      value={editingCourse.feeAmount ?? ""}
                      onChange={(e) => setEditingCourse((prev) => ({ ...prev, feeAmount: e.target.value }))}
                      className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Status</label>
                    <select
                      value={editingCourse.isActive ? "active" : "inactive"}
                      onChange={(e) => setEditingCourse((prev) => ({ ...prev, isActive: e.target.value === "active" }))}
                      className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition bg-white"
                    >
                      <option value="active">Active (Published)</option>
                      <option value="inactive">Inactive (Hidden)</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Description</label>
                  <textarea
                    rows={3}
                    value={editingCourse.description || ""}
                    onChange={(e) => setEditingCourse((prev) => ({ ...prev, description: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition resize-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Features (comma separated)</label>
                  <textarea
                    rows={3}
                    value={editingCourse.features || ""}
                    onChange={(e) => setEditingCourse((prev) => ({ ...prev, features: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition resize-none"
                    placeholder="NCERT Coverage, Daily Practice Tests, 1-on-1 Mentorship"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingCourse(null)}
                  className="flex-1 py-2.5 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingEdit}
                  className="flex-1 py-2.5 bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white font-bold rounded-xl transition shadow-sm inline-flex items-center justify-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  {savingEdit ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Course Confirmation */}
      <ConfirmModal
        isOpen={!!courseToDelete}
        onClose={() => setCourseToDelete(null)}
        onConfirm={confirmDeleteCourse}
        title="Delete Course"
        message={`Are you sure you want to permanently delete "${courseToDelete?.name}"? Associated batches should be updated.`}
        confirmLabel="Delete Course"
        danger={true}
      />
    </div>
  );
}
```

---

# FILE: `client\src\pages\admin\AdminDashboard.jsx`

```jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../config/api";
import {
  Users, GraduationCap, ClipboardList, Layers, UserPlus,
  ShieldCheck, Mail, Phone, BadgeCheck, UserCheck, Building2,
  X, Save, Clock, ChevronRight, Eye, Calendar, BookOpen
} from "lucide-react";
import StudentBadge from "../../components/shared/StudentBadge";
import { alertSuccess, alertError } from "../../utils/alert";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateStudent, setShowCreateStudent] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [creating, setCreating] = useState(false);
  const [newStudent, setNewStudent] = useState({
    name: "",
    email: "",
    phone: "",
    studentType: "REGULAR_OFFLINE",
    currentClass: "DROPPER",
    parentName: "",
    parentPhone: "",
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      await Promise.all([
        api.get("/admin/dashboard").then(({ data }) => setData(data.data)),
        api.get("/students").then(({ data }) => setStudents(data.data.students || [])),
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateStudent = async (e) => {
    e.preventDefault();
    setCreating(true);
    try {
      const { data } = await api.post("/auth/admin/create-student", newStudent);
      alertSuccess(
        `Student created! ID: ${data.data.studentId} • Temp password copied to clipboard`
      );
      try {
        navigator.clipboard?.writeText(data.data.tempPassword);
      } catch {}
      setShowCreateStudent(false);
      setNewStudent({
        name: "",
        email: "",
        phone: "",
        studentType: "REGULAR_OFFLINE",
        currentClass: "DROPPER",
        parentName: "",
        parentPhone: "",
      });
      loadData();
    } catch (err) {
      alertError(err.response?.data?.message || "Failed to create student");
    } finally {
      setCreating(false);
    }
  };

  const statCards = [
    {
      label: "Total Enrolled",
      value: data?.studentCount ?? students.length ?? 0,
      icon: Users,
      color: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-100",
      path: "/admin/students",
    },
    {
      label: "Active Faculty",
      value: data?.teacherCount ?? 0,
      icon: GraduationCap,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      border: "border-emerald-100",
      path: "/admin/teachers",
    },
    {
      label: "Live Tests",
      value: data?.examCount ?? 0,
      icon: ClipboardList,
      color: "text-purple-600",
      bg: "bg-purple-50",
      border: "border-purple-100",
      path: "/admin/exams",
    },
    {
      label: "Test Submissions",
      value: data?.attemptCount ?? 0,
      icon: Layers,
      color: "text-amber-600",
      bg: "bg-amber-50",
      border: "border-amber-100",
      path: "/admin/exams",
    },
  ];

  const typeColors = {
    REGULAR_OFFLINE: "bg-green-100 text-green-700 border-green-200",
    REGULAR_ONLINE: "bg-blue-100 text-blue-700 border-blue-200",
    HYBRID: "bg-purple-100 text-purple-700 border-purple-200",
    EXAM_ONLY: "bg-orange-100 text-orange-700 border-orange-200",
    GUEST: "bg-slate-100 text-slate-700 border-slate-200",
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-green-600" />
            <span>Institute Administration</span>
          </div>
          <h1 className="font-extrabold text-2xl text-slate-900 tracking-tight">
            Admin Dashboard
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Supervise batch rosters, faculty permissions, admissions, and test analytics.
          </p>
        </div>
        <button
          onClick={() => setShowCreateStudent(true)}
          className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 active:scale-[0.98] text-white font-semibold px-5 py-2.5 rounded-xl transition shadow-sm text-sm"
        >
          <UserPlus className="w-4 h-4" /> Quick-Create Student
        </button>
      </div>

      {/* KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm animate-pulse">
              <div className="h-11 w-11 bg-slate-100 rounded-xl mb-4" />
              <div className="h-3 bg-slate-100 rounded w-28 mb-3" />
              <div className="h-9 bg-slate-100 rounded w-20" />
            </div>
          ))
        ) : (
          statCards.map((s) => (
            <div
              key={s.label}
              onClick={() => navigate(s.path)}
              className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition cursor-pointer hover:border-slate-200 group"
            >
              <div className={`w-11 h-11 rounded-xl ${s.bg} ${s.border} border flex items-center justify-center mb-4 group-hover:scale-105 transition-transform`}>
                <s.icon className={`w-5 h-5 ${s.color}`} />
              </div>
              <div className="text-3xl font-extrabold text-slate-900 tracking-tight">
                {s.value}
              </div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1 flex items-center justify-between">
                <span>{s.label}</span>
                <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-slate-400 transition" />
              </div>
            </div>
          ))
        )}
      </div>

      {/* Student Roster Table */}
      <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h2 className="font-bold text-lg text-slate-900">Student Roster</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {students.length} total students enrolled in the institute
            </p>
          </div>
          <button
            onClick={() => navigate("/admin/students")}
            className="text-xs font-semibold text-green-600 hover:text-green-700 inline-flex items-center gap-1"
          >
            View all students <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 text-[11px] font-bold uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Student</th>
                <th className="px-6 py-4">Contact</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Batch & Class</th>
                <th className="px-6 py-4">Guardian</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <tr key={i}>
                    {[1, 2, 3, 4, 5, 6].map((j) => (
                      <td key={j} className="px-6 py-4">
                        <div className="h-4 bg-slate-100 rounded w-full animate-pulse mb-2" />
                        <div className="h-3 bg-slate-100 rounded w-2/3 animate-pulse" />
                      </td>
                    ))}
                  </tr>
                ))
              ) : students.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-16 text-center">
                    <Users className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                    <h3 className="font-bold text-slate-600 mb-1">No students yet</h3>
                    <p className="text-sm text-slate-400">
                      Create your first student using the "Quick-Create Student" button.
                    </p>
                  </td>
                </tr>
              ) : (
                students.slice(0, 8).map((s) => (
                  <tr key={s._id} className="hover:bg-slate-50 transition">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-white text-xs font-extrabold shadow-sm flex-shrink-0">
                          {s.user?.name?.charAt(0)?.toUpperCase() || "S"}
                        </div>
                        <div>
                          <div className="font-bold text-slate-800">{s.user?.name}</div>
                          {s.studentId && (
                            <div className="text-[11px] font-mono text-slate-400 mt-0.5">
                              {s.studentId}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-slate-600 text-xs">
                          <Mail className="w-3 h-3 text-slate-400 flex-shrink-0" />
                          <span className="truncate max-w-[200px]">{s.user?.email || "—"}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-600 text-xs">
                          <Phone className="w-3 h-3 text-slate-400 flex-shrink-0" />
                          <span>{s.user?.phone || "—"}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg border ${
                          typeColors[s.studentType] || typeColors.GUEST
                        }`}
                      >
                        {s.studentType?.replace(/_/g, " ") || "GUEST"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-slate-700 text-xs">
                        {s.batches?.[0]?.name || "Unassigned"}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5 inline-flex items-center gap-1">
                        <BadgeCheck className="w-3 h-3" />
                        {s.currentClass || "—"}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-xs font-semibold text-slate-700">
                        {s.parentName || "—"}
                      </div>
                      {s.parentPhone && (
                        <div className="text-[11px] text-slate-400 mt-0.5">
                          {s.parentPhone}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => setSelectedStudent(s)}
                        className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-green-50 text-slate-600 hover:text-green-700 transition"
                      >
                        <Eye className="w-3.5 h-3.5" /> View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick-Create Student Modal */}
      {showCreateStudent && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white rounded-t-2xl">
              <div>
                <h3 className="font-extrabold text-xl text-slate-900">Admin Quick-Create Student</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Generates instant student ID, password, and welcome email.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowCreateStudent(false)}
                className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateStudent} className="p-6 space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                  Student Full Name
                </label>
                <input
                  type="text"
                  required
                  value={newStudent.name}
                  onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                  placeholder="e.g. Rahul Sen"
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={newStudent.email}
                    onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                    placeholder="rahul@gmail.com"
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    required
                    value={newStudent.phone}
                    onChange={(e) => setNewStudent({ ...newStudent, phone: e.target.value })}
                    placeholder="+91 98765 XXXXX"
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                    Student Type
                  </label>
                  <select
                    value={newStudent.studentType}
                    onChange={(e) => setNewStudent({ ...newStudent, studentType: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition bg-white"
                  >
                    <option value="REGULAR_OFFLINE">Regular Offline</option>
                    <option value="REGULAR_ONLINE">Regular Online</option>
                    <option value="HYBRID">Hybrid</option>
                    <option value="EXAM_ONLY">Exam Only</option>
                    <option value="GUEST">Guest</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                    Current Class
                  </label>
                  <select
                    value={newStudent.currentClass}
                    onChange={(e) => setNewStudent({ ...newStudent, currentClass: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition bg-white"
                  >
                    <option value="XI">Class XI</option>
                    <option value="XII">Class XII</option>
                    <option value="DROPPER">Dropper</option>
                    <option value="REPEATER">Repeater</option>
                  </select>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                    Guardian Name
                  </label>
                  <input
                    type="text"
                    value={newStudent.parentName}
                    onChange={(e) => setNewStudent({ ...newStudent, parentName: e.target.value })}
                    placeholder="Parent / Guardian name"
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                    Guardian Phone
                  </label>
                  <input
                    type="tel"
                    value={newStudent.parentPhone}
                    onChange={(e) => setNewStudent({ ...newStudent, parentPhone: e.target.value })}
                    placeholder="+91 98765 XXXXX"
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowCreateStudent(false)}
                  className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={creating}
                  className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white font-semibold px-5 py-2.5 rounded-xl transition shadow-sm text-sm"
                >
                  <Save className="w-4 h-4" />
                  {creating ? "Creating..." : "Generate Account"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Student Details Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white rounded-t-2xl">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-white font-extrabold text-xl shadow-md">
                  {selectedStudent.user?.name?.charAt(0)?.toUpperCase() || "S"}
                </div>
                <div>
                  <h3 className="font-extrabold text-lg text-slate-900">{selectedStudent.user?.name}</h3>
                  <p className="text-xs font-mono text-slate-400">ID: {selectedStudent.studentId || "—"}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedStudent(null)}
                className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <div className="text-xs text-slate-400 font-medium">Class / Category</div>
                  <div className="font-bold text-slate-800 mt-0.5">{selectedStudent.currentClass || "—"}</div>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <div className="text-xs text-slate-400 font-medium">Student Type</div>
                  <div className="font-bold text-slate-800 mt-0.5">{selectedStudent.studentType?.replace(/_/g, " ") || "—"}</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-slate-600">
                  <Mail className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  <span>{selectedStudent.user?.email || "No email"}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <Phone className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  <span>{selectedStudent.user?.phone || selectedStudent.phone || "No phone"}</span>
                </div>
                {selectedStudent.city && (
                  <div className="flex items-center gap-2 text-slate-600">
                    <Building2 className="w-4 h-4 text-slate-400 flex-shrink-0" />
                    <span>City: {selectedStudent.city}</span>
                  </div>
                )}
                {selectedStudent.school && (
                  <div className="flex items-center gap-2 text-slate-600">
                    <BookOpen className="w-4 h-4 text-slate-400 flex-shrink-0" />
                    <span>School/College: {selectedStudent.school}</span>
                  </div>
                )}
              </div>

              <div className="border-t border-slate-100 pt-3">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Guardian Information</div>
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 space-y-1">
                  <div className="text-slate-800 font-semibold">{selectedStudent.parentName || "Not specified"}</div>
                  {selectedStudent.parentPhone && (
                    <div className="text-xs text-slate-500 flex items-center gap-1.5">
                      <Phone className="w-3 h-3 text-slate-400" /> {selectedStudent.parentPhone}
                    </div>
                  )}
                </div>
              </div>

              <div className="border-t border-slate-100 pt-3">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Enrolled Batches</div>
                {selectedStudent.batches?.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {selectedStudent.batches.map((b) => (
                      <span key={b._id || b} className="px-3 py-1 bg-green-50 text-green-700 text-xs font-semibold rounded-lg border border-green-200">
                        {b.name || b.code || "Batch"}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-400">No batch assigned currently.</p>
                )}
              </div>
            </div>

            <div className="p-6 border-t border-slate-100 flex gap-3">
              <button
                onClick={() => setSelectedStudent(null)}
                className="flex-1 py-2.5 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setSelectedStudent(null);
                  navigate("/admin/students");
                }}
                className="flex-1 py-2.5 bg-green-600 hover:bg-green-700 text-white text-sm font-bold rounded-xl transition text-center shadow-sm"
              >
                Manage in Students
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
```

---

# FILE: `client\src\pages\admin\AdminEnquiries.jsx`

```jsx
import { useState, useEffect } from "react";
import api from "../../config/api";
import { MessageSquare, Search, CheckCircle, XCircle, Clock, Phone, Mail, Eye, Trash2, Download } from "lucide-react";
import { alertSuccess, alertError } from "../../utils/alert";
import ConfirmModal from "../../components/shared/ConfirmModal";

const statusColors = {
  NEW: "bg-blue-100 text-blue-700 border-blue-200",
  IN_PROGRESS: "bg-amber-100 text-amber-700 border-amber-200",
  RESOLVED: "bg-green-100 text-green-700 border-green-200",
  CLOSED: "bg-slate-100 text-slate-600 border-slate-200",
};

export default function AdminEnquiries() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selected, setSelected] = useState(null);
  const [enquiryToDelete, setEnquiryToDelete] = useState(null);

  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/enquiries");
      setEnquiries(data.data?.enquiries || []);
    } catch {
      setEnquiries([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchEnquiries(); }, []);

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/enquiries/${id}`, { status });
      alertSuccess("Status updated");
      fetchEnquiries();
      setSelected(null);
    } catch {
      alertError("Failed to update status");
    }
  };

  const confirmDeleteEnquiry = async () => {
    if (!enquiryToDelete) return;
    try {
      await api.delete(`/enquiries/${enquiryToDelete._id}`);
      alertSuccess("Enquiry deleted");
      if (selected?._id === enquiryToDelete._id) setSelected(null);
      setEnquiryToDelete(null);
      fetchEnquiries();
    } catch {
      alertError("Failed to delete enquiry");
    }
  };

  const exportToCSV = () => {
    if (filtered.length === 0) {
      alertError("No enquiries to export");
      return;
    }
    const headers = ["Name", "Email", "Phone", "Course Interest", "Message", "Status", "Date"];
    const rows = filtered.map((e) => [
      `"${e.name || ""}"`,
      `"${e.email || ""}"`,
      `"${e.phone || ""}"`,
      `"${e.courseInterest || ""}"`,
      `"${(e.message || "").replace(/"/g, '""')}"`,
      `"${e.status || "NEW"}"`,
      `"${e.createdAt ? new Date(e.createdAt).toLocaleDateString("en-IN") : ""}"`,
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `neetvidya_enquiries_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    alertSuccess("Enquiries exported to CSV");
  };

  const filtered = enquiries.filter((e) => {
    const matchSearch =
      e.name?.toLowerCase().includes(search.toLowerCase()) ||
      e.email?.toLowerCase().includes(search.toLowerCase()) ||
      e.phone?.includes(search);
    const matchStatus = statusFilter === "All" || e.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-extrabold text-2xl text-slate-900">Enquiries</h1>
          <p className="text-slate-500 text-sm mt-1">{enquiries.length} total enquiries</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={exportToCSV}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 text-xs font-semibold shadow-sm transition"
          >
            <Download className="w-3.5 h-3.5" /> Export CSV
          </button>
          <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-blue-100 text-blue-700 border border-blue-200">
            {enquiries.filter((e) => e.status === "NEW").length} New
          </span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email or phone..."
            className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition bg-white"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2.5 border border-slate-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
        >
          {["All", "NEW", "IN_PROGRESS", "RESOLVED", "CLOSED"].map((s) => (
            <option key={s} value={s}>{s.replace(/_/g, " ")}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-48">
          <div className="w-9 h-9 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white border border-slate-100 rounded-2xl p-12 text-center shadow-sm">
          <MessageSquare className="w-12 h-12 text-slate-200 mx-auto mb-4" />
          <h3 className="font-bold text-slate-600 mb-1">No enquiries found</h3>
          <p className="text-slate-400 text-sm">Enquiries from the contact form will appear here.</p>
        </div>
      ) : (
        <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50">
                  <th className="text-left py-3.5 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Contact</th>
                  <th className="text-left py-3.5 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider hidden md:table-cell">Course Interest</th>
                  <th className="text-left py-3.5 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider hidden lg:table-cell">Message</th>
                  <th className="text-left py-3.5 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="text-left py-3.5 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider hidden sm:table-cell">Date</th>
                  <th className="py-3.5 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filtered.map((e) => (
                  <tr key={e._id} className="hover:bg-slate-50/50 transition group">
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-800">{e.name}</div>
                      <div className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                        <Mail className="w-3 h-3" /> {e.email}
                      </div>
                      {e.phone && (
                        <div className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                          <Phone className="w-3 h-3" /> {e.phone}
                        </div>
                      )}
                    </td>
                    <td className="py-3.5 px-4 hidden md:table-cell">
                      <span className="text-sm text-slate-600">{e.courseInterest || "General"}</span>
                    </td>
                    <td className="py-3.5 px-4 hidden lg:table-cell">
                      <p className="text-xs text-slate-500 line-clamp-2 max-w-xs">{e.message}</p>
                    </td>
                    <td className="py-3.5 px-4">
                      <select
                        value={e.status || "NEW"}
                        onChange={(ev) => updateStatus(e._id, ev.target.value)}
                        className={`text-xs font-bold px-2.5 py-1.5 rounded-lg border cursor-pointer bg-transparent ${statusColors[e.status || "NEW"]}`}
                      >
                        {["NEW", "IN_PROGRESS", "RESOLVED", "CLOSED"].map((s) => (
                          <option key={s} value={s}>{s.replace(/_/g, " ")}</option>
                        ))}
                      </select>
                    </td>
                    <td className="py-3.5 px-4 hidden sm:table-cell text-xs text-slate-500">
                      {e.createdAt ? new Date(e.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" }) : "—"}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition">
                        <button
                          onClick={() => setSelected(e)}
                          className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 transition"
                          title="View Message"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setEnquiryToDelete(e)}
                          className="p-1.5 rounded-lg hover:bg-red-50 text-red-400 hover:text-red-600 transition"
                          title="Delete Enquiry"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="p-6 border-b border-slate-100">
              <h2 className="font-extrabold text-xl text-slate-900">{selected.name}</h2>
              <p className="text-slate-500 text-sm mt-1">{selected.email} · {selected.phone}</p>
            </div>
            <div className="p-6 space-y-4">
              {selected.courseInterest && (
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Course Interest</span>
                  <p className="text-sm text-slate-700 mt-1">{selected.courseInterest}</p>
                </div>
              )}
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Message</span>
                <p className="text-sm text-slate-700 mt-1 leading-relaxed">{selected.message}</p>
              </div>
            </div>
            <div className="p-6 border-t border-slate-100 flex gap-3">
              <button
                onClick={() => setEnquiryToDelete(selected)}
                className="px-4 py-2.5 border border-red-200 rounded-xl text-sm font-semibold text-red-600 hover:bg-red-50 transition inline-flex items-center justify-center gap-1.5"
              >
                <Trash2 className="w-4 h-4" /> Delete
              </button>
              <button onClick={() => setSelected(null)}
                className="flex-1 py-2.5 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition">
                Close
              </button>
              <a href={`mailto:${selected.email}`}
                className="flex-1 py-2.5 bg-green-600 hover:bg-green-700 text-white text-sm font-bold rounded-xl transition text-center">
                Reply via Email
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmModal
        isOpen={!!enquiryToDelete}
        onClose={() => setEnquiryToDelete(null)}
        onConfirm={confirmDeleteEnquiry}
        title="Delete Enquiry"
        message={`Are you sure you want to delete the enquiry from "${enquiryToDelete?.name}"?`}
        confirmLabel="Delete Enquiry"
        danger={true}
      />
    </div>
  );
}
```

---

# FILE: `client\src\pages\admin\AdminExams.jsx`

```jsx
import { useState, useEffect } from "react";
import api from "../../config/api";
import {
  ClipboardList, Plus, Search, Clock, Users, Calendar, PlayCircle,
  BarChart3, Pencil, Trash2, X, Save, CheckCircle2, AlertCircle, Trophy, Eye
} from "lucide-react";
import { alertSuccess, alertError } from "../../utils/alert";
import ConfirmModal from "../../components/shared/ConfirmModal";

const statusColors = {
  LIVE: "bg-green-100 text-green-700 border-green-200",
  SCHEDULED: "bg-blue-100 text-blue-700 border-blue-200",
  CLOSED: "bg-slate-100 text-slate-600 border-slate-200",
  DRAFT: "bg-amber-100 text-amber-700 border-amber-200",
};

const typeColors = {
  MOCK_TEST: "bg-purple-100 text-purple-700",
  CHAPTER_TEST: "bg-indigo-100 text-indigo-700",
  UNIT_TEST: "bg-cyan-100 text-cyan-700",
  DPP: "bg-rose-100 text-rose-700",
  PYQ: "bg-orange-100 text-orange-700",
};

export default function AdminExams() {
  const [exams, setExams] = useState([]);
  const [courses, setCourses] = useState([]);
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [showCreate, setShowCreate] = useState(false);
  const [editingExam, setEditingExam] = useState(null);
  const [examResults, setExamResults] = useState(null);
  const [loadingResults, setLoadingResults] = useState(false);
  const [examToDelete, setExamToDelete] = useState(null);
  const [savingExam, setSavingExam] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    testType: "MOCK_TEST",
    course: "",
    totalQuestions: 180,
    totalMarks: 720,
    marksPerCorrect: 4,
    negativePerWrong: 1,
    duration: 180,
    startTime: "",
    endTime: "",
    maxAttempts: 1,
    instructions: "General NEET Examination Instructions: 4 marks for correct, -1 mark for wrong answer.",
  });

  const fetchExams = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/exams");
      setExams(data.data?.exams || []);
    } catch {
      setExams([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchDependencies = async () => {
    try {
      const [cRes, bRes] = await Promise.all([
        api.get("/courses"),
        api.get("/batches"),
      ]);
      setCourses(cRes.data.data?.courses || []);
      setBatches(bRes.data.data?.batches || []);
    } catch {}
  };

  useEffect(() => {
    fetchExams();
    fetchDependencies();
  }, []);

  const handleCreateExam = async (e) => {
    e.preventDefault();
    if (!form.startTime || !form.endTime) {
      alertError("Please provide both start and end times");
      return;
    }
    setSavingExam(true);
    try {
      await api.post("/exams", {
        ...form,
        totalQuestions: Number(form.totalQuestions || 10),
        totalMarks: Number(form.totalMarks || 40),
        duration: Number(form.duration || 60),
        maxAttempts: Number(form.maxAttempts || 1),
        course: form.course || undefined,
      });
      alertSuccess("Exam created in DRAFT status");
      setShowCreate(false);
      fetchExams();
    } catch (err) {
      alertError(err.response?.data?.message || "Failed to create exam");
    } finally {
      setSavingExam(false);
    }
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    if (!editingExam) return;
    setSavingExam(true);
    try {
      await api.put(`/exams/${editingExam._id}`, {
        title: editingExam.title,
        description: editingExam.description,
        testType: editingExam.testType,
        course: typeof editingExam.course === "object" ? editingExam.course?._id : editingExam.course,
        totalQuestions: Number(editingExam.totalQuestions || 10),
        totalMarks: Number(editingExam.totalMarks || 40),
        duration: Number(editingExam.duration || 60),
        startTime: editingExam.startTime,
        endTime: editingExam.endTime,
        maxAttempts: Number(editingExam.maxAttempts || 1),
        instructions: editingExam.instructions,
      });
      alertSuccess("Exam updated successfully");
      setEditingExam(null);
      fetchExams();
    } catch (err) {
      alertError(err.response?.data?.message || "Failed to update exam");
    } finally {
      setSavingExam(false);
    }
  };

  const handlePublish = async (examId) => {
    try {
      await api.put(`/exams/${examId}/publish`);
      alertSuccess("Exam is now LIVE for students");
      fetchExams();
    } catch (err) {
      alertError(err.response?.data?.message || "Failed to publish exam");
    }
  };

  const handleClose = async (examId) => {
    try {
      await api.put(`/exams/${examId}/close`);
      alertSuccess("Exam has been closed");
      fetchExams();
    } catch (err) {
      alertError(err.response?.data?.message || "Failed to close exam");
    }
  };

  const handleOpenResults = async (exam) => {
    setLoadingResults(true);
    setExamResults({ exam, results: [], analytics: null });
    try {
      const { data } = await api.get(`/exams/${exam._id}/results`);
      setExamResults(data.data);
    } catch (err) {
      alertError(err.response?.data?.message || "Failed to load results");
      setExamResults(null);
    } finally {
      setLoadingResults(false);
    }
  };

  const confirmDeleteExam = async () => {
    if (!examToDelete) return;
    try {
      await api.delete(`/exams/${examToDelete._id}`);
      alertSuccess("Exam deleted successfully");
      setExamToDelete(null);
      fetchExams();
    } catch (err) {
      alertError(err.response?.data?.message || "Failed to delete exam");
    }
  };

  const filtered = exams.filter((e) => {
    const matchSearch = e.title?.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "All" || e.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-extrabold text-2xl text-slate-900">Exams & Tests</h1>
          <p className="text-slate-500 text-sm mt-1">{exams.length} total exams</p>
        </div>
        <button
          onClick={() => setShowCreate(true)}
          className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2.5 rounded-xl transition shadow-sm text-sm"
        >
          <Plus className="w-4 h-4" /> Create Exam
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search exams..."
            className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition bg-white"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 bg-white"
        >
          {["All", "LIVE", "SCHEDULED", "DRAFT", "CLOSED"].map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Live", count: exams.filter((e) => e.status === "LIVE").length, color: "bg-green-50 border-green-200 text-green-700" },
          { label: "Scheduled", count: exams.filter((e) => e.status === "SCHEDULED").length, color: "bg-blue-50 border-blue-200 text-blue-700" },
          { label: "Draft", count: exams.filter((e) => e.status === "DRAFT").length, color: "bg-amber-50 border-amber-200 text-amber-700" },
          { label: "Closed", count: exams.filter((e) => e.status === "CLOSED").length, color: "bg-slate-50 border-slate-200 text-slate-600" },
        ].map((s) => (
          <div key={s.label} className={`rounded-xl border p-4 text-center ${s.color}`}>
            <div className="text-2xl font-extrabold">{s.count}</div>
            <div className="text-xs font-semibold mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-48">
          <div className="w-9 h-9 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white border border-slate-100 rounded-2xl p-12 text-center shadow-sm">
          <ClipboardList className="w-12 h-12 text-slate-200 mx-auto mb-4" />
          <h3 className="font-bold text-slate-600 mb-1">No exams found</h3>
          <p className="text-slate-400 text-sm">Create an exam using the button above.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((exam) => (
            <div key={exam._id} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition group">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${statusColors[exam.status] || statusColors.DRAFT}`}>
                      ● {exam.status}
                    </span>
                    <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${typeColors[exam.testType] || "bg-slate-100 text-slate-600"}`}>
                      {exam.testType?.replace(/_/g, " ")}
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-800 text-base mb-2 line-clamp-1">{exam.title}</h3>
                  <div className="flex flex-wrap gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1.5">
                      <ClipboardList className="w-3.5 h-3.5" /> {exam.totalQuestions} questions
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" /> {exam.duration} min
                    </span>
                    <span className="flex items-center gap-1.5">
                      <BarChart3 className="w-3.5 h-3.5" /> {exam.totalMarks} marks
                    </span>
                    {exam.startTime && (
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(exam.startTime).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                      </span>
                    )}
                    {exam.maxAttempts && (
                      <span className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5" /> {exam.maxAttempts} attempts
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 sm:flex-col sm:items-end">
                  <button
                    onClick={() => handleOpenResults(exam)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-1.5 rounded-xl bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200 transition"
                  >
                    <BarChart3 className="w-3.5 h-3.5" /> Submissions
                  </button>
                  <button
                    onClick={() =>
                      setEditingExam({
                        ...exam,
                        startTime: exam.startTime ? new Date(exam.startTime).toISOString().slice(0, 16) : "",
                        endTime: exam.endTime ? new Date(exam.endTime).toISOString().slice(0, 16) : "",
                      })
                    }
                    className="inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-1.5 rounded-xl bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200 transition"
                  >
                    <Pencil className="w-3.5 h-3.5" /> Edit
                  </button>
                  {exam.status !== "LIVE" && exam.status !== "CLOSED" && (
                    <button
                      onClick={() => handlePublish(exam._id)}
                      className="inline-flex items-center gap-1 text-xs font-semibold px-3.5 py-1.5 rounded-xl bg-green-50 text-green-700 hover:bg-green-100 border border-green-200 transition"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" /> Go Live
                    </button>
                  )}
                  {exam.status === "LIVE" && (
                    <button
                      onClick={() => handleClose(exam._id)}
                      className="inline-flex items-center gap-1 text-xs font-semibold px-3.5 py-1.5 rounded-xl bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200 transition"
                    >
                      <AlertCircle className="w-3.5 h-3.5" /> Close Test
                    </button>
                  )}
                  <button
                    onClick={() => setExamToDelete(exam)}
                    className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded-xl text-red-500 hover:bg-red-50 transition"
                    title="Delete Exam"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Exam Modal */}
      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white rounded-t-2xl z-10">
              <div>
                <h2 className="font-extrabold text-xl text-slate-900">Create New Exam</h2>
                <p className="text-slate-500 text-xs mt-0.5">Configure CBT test parameters and schedule.</p>
              </div>
              <button
                onClick={() => setShowCreate(false)}
                className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreateExam} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Exam Title *</label>
                  <input
                    required
                    value={form.title}
                    onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
                    placeholder="e.g. All India Grand Mock Test – 01"
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Test Type</label>
                  <select
                    value={form.testType}
                    onChange={(e) => setForm((prev) => ({ ...prev, testType: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition bg-white"
                  >
                    <option value="MOCK_TEST">Mock Test</option>
                    <option value="CHAPTER_TEST">Chapter Test</option>
                    <option value="UNIT_TEST">Unit Test</option>
                    <option value="DPP">Daily Practice Problem (DPP)</option>
                    <option value="PYQ">Previous Year Questions (PYQ)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Associated Course</label>
                  <select
                    value={form.course}
                    onChange={(e) => setForm((prev) => ({ ...prev, course: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition bg-white"
                  >
                    <option value="">All Courses</option>
                    {courses.map((c) => (
                      <option key={c._id} value={c._id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Total Questions</label>
                  <input
                    type="number"
                    min="1"
                    value={form.totalQuestions}
                    onChange={(e) => setForm((prev) => ({ ...prev, totalQuestions: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Total Marks</label>
                  <input
                    type="number"
                    min="1"
                    value={form.totalMarks}
                    onChange={(e) => setForm((prev) => ({ ...prev, totalMarks: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Duration (Minutes)</label>
                  <input
                    type="number"
                    min="5"
                    value={form.duration}
                    onChange={(e) => setForm((prev) => ({ ...prev, duration: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Max Attempts Allowed</label>
                  <input
                    type="number"
                    min="1"
                    value={form.maxAttempts}
                    onChange={(e) => setForm((prev) => ({ ...prev, maxAttempts: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Start Time *</label>
                  <input
                    required
                    type="datetime-local"
                    value={form.startTime}
                    onChange={(e) => setForm((prev) => ({ ...prev, startTime: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">End Time *</label>
                  <input
                    required
                    type="datetime-local"
                    value={form.endTime}
                    onChange={(e) => setForm((prev) => ({ ...prev, endTime: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Instructions</label>
                  <textarea
                    rows={2}
                    value={form.instructions}
                    onChange={(e) => setForm((prev) => ({ ...prev, instructions: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition resize-none"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreate(false)}
                  className="flex-1 py-2.5 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingExam}
                  className="flex-1 py-2.5 bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white font-bold rounded-xl transition shadow-sm inline-flex items-center justify-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  {savingExam ? "Creating..." : "Save Draft Exam"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Exam Modal */}
      {editingExam && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white rounded-t-2xl z-10">
              <div>
                <h2 className="font-extrabold text-xl text-slate-900">Edit Exam</h2>
                <p className="text-slate-500 text-xs mt-0.5">Update test configuration and schedule.</p>
              </div>
              <button
                onClick={() => setEditingExam(null)}
                className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSaveEdit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Exam Title *</label>
                  <input
                    required
                    value={editingExam.title}
                    onChange={(e) => setEditingExam((prev) => ({ ...prev, title: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Test Type</label>
                  <select
                    value={editingExam.testType}
                    onChange={(e) => setEditingExam((prev) => ({ ...prev, testType: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition bg-white"
                  >
                    <option value="MOCK_TEST">Mock Test</option>
                    <option value="CHAPTER_TEST">Chapter Test</option>
                    <option value="UNIT_TEST">Unit Test</option>
                    <option value="DPP">Daily Practice Problem (DPP)</option>
                    <option value="PYQ">Previous Year Questions (PYQ)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Course</label>
                  <select
                    value={editingExam.course?._id || editingExam.course || ""}
                    onChange={(e) => setEditingExam((prev) => ({ ...prev, course: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition bg-white"
                  >
                    <option value="">All Courses</option>
                    {courses.map((c) => (
                      <option key={c._id} value={c._id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Duration (Minutes)</label>
                  <input
                    type="number"
                    value={editingExam.duration}
                    onChange={(e) => setEditingExam((prev) => ({ ...prev, duration: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Total Questions</label>
                  <input
                    type="number"
                    value={editingExam.totalQuestions}
                    onChange={(e) => setEditingExam((prev) => ({ ...prev, totalQuestions: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Start Time</label>
                  <input
                    type="datetime-local"
                    value={editingExam.startTime}
                    onChange={(e) => setEditingExam((prev) => ({ ...prev, startTime: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">End Time</label>
                  <input
                    type="datetime-local"
                    value={editingExam.endTime}
                    onChange={(e) => setEditingExam((prev) => ({ ...prev, endTime: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Instructions</label>
                  <textarea
                    rows={2}
                    value={editingExam.instructions || ""}
                    onChange={(e) => setEditingExam((prev) => ({ ...prev, instructions: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition resize-none"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingExam(null)}
                  className="flex-1 py-2.5 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingExam}
                  className="flex-1 py-2.5 bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white font-bold rounded-xl transition shadow-sm inline-flex items-center justify-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  {savingExam ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Exam Results Modal */}
      {examResults && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white rounded-t-2xl z-10">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700">
                  Submissions & Analytics
                </span>
                <h2 className="font-extrabold text-xl text-slate-900 mt-1">{examResults.exam?.title}</h2>
              </div>
              <button
                onClick={() => setExamResults(null)}
                className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Analytics summary */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl text-center">
                  <div className="text-2xl font-extrabold text-slate-900">
                    {examResults.analytics?.totalSubmissions || 0}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">Total Attempts</div>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl text-center">
                  <div className="text-2xl font-extrabold text-slate-900">
                    {examResults.analytics?.avgScore || 0}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">Average Score</div>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl text-center">
                  <div className="text-2xl font-extrabold text-green-600">
                    {examResults.analytics?.highestScore || 0}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">Highest Score</div>
                </div>
              </div>

              {/* Candidates Table */}
              <div>
                <h3 className="font-bold text-slate-800 text-sm mb-3">Student Rank List</h3>
                {loadingResults ? (
                  <div className="py-12 flex justify-center">
                    <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                  </div>
                ) : !examResults.results || examResults.results.length === 0 ? (
                  <div className="text-center py-12 bg-slate-50 rounded-xl border border-slate-100">
                    <Trophy className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                    <p className="text-sm font-semibold text-slate-600">No submissions recorded yet</p>
                    <p className="text-xs text-slate-400 mt-0.5">Students who attempt this test will appear here.</p>
                  </div>
                ) : (
                  <div className="border border-slate-100 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                      <thead className="bg-slate-50 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                        <tr>
                          <th className="py-3 px-4 text-left">Rank</th>
                          <th className="py-3 px-4 text-left">Candidate</th>
                          <th className="py-3 px-4 text-center">Score</th>
                          <th className="py-3 px-4 text-center">Accuracy</th>
                          <th className="py-3 px-4 text-right">Submitted</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {examResults.results.map((r, i) => (
                          <tr key={r._id || i} className="hover:bg-slate-50">
                            <td className="py-3 px-4">
                              <span className="font-extrabold text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                                #{r.rank || i + 1}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <div className="font-semibold text-slate-800">{r.student?.name || "Student"}</div>
                              <div className="text-xs text-slate-400">{r.student?.email}</div>
                            </td>
                            <td className="py-3 px-4 text-center font-bold text-slate-800">
                              {r.obtainedMarks} / {r.totalMarks || examResults.exam?.totalMarks}
                            </td>
                            <td className="py-3 px-4 text-center">
                              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-green-50 text-green-700 border border-green-200">
                                {Math.round(r.accuracy || 0)}%
                              </span>
                            </td>
                            <td className="py-3 px-4 text-right text-xs text-slate-400">
                              {r.createdAt ? new Date(r.createdAt).toLocaleDateString("en-IN") : "—"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>

            <div className="p-6 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setExamResults(null)}
                className="px-5 py-2.5 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Exam Confirmation */}
      <ConfirmModal
        isOpen={!!examToDelete}
        onClose={() => setExamToDelete(null)}
        onConfirm={confirmDeleteExam}
        title="Delete Exam"
        message={`Are you sure you want to delete "${examToDelete?.title}"? All attempts and submissions will be affected.`}
        confirmLabel="Delete Exam"
        danger={true}
      />
    </div>
  );
}
```

---

# FILE: `client\src\pages\admin\AdminQuestions.jsx`

```jsx
import { useState, useEffect } from "react";
import api from "../../config/api";
import { HelpCircle, Plus, Search, CheckCircle, Pencil, Trash2, Filter, X, Save, BookOpen, Upload, Download, FileSpreadsheet } from "lucide-react";
import { alertSuccess, alertError } from "../../utils/alert";
import ConfirmModal from "../../components/shared/ConfirmModal";

const difficultyColors = {
  Easy: "bg-green-100 text-green-700 border-green-200",
  Medium: "bg-amber-100 text-amber-700 border-amber-200",
  Hard: "bg-red-100 text-red-700 border-red-200",
};

export default function AdminQuestions() {
  const [questions, setQuestions] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [diffFilter, setDiffFilter] = useState("All");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [showCreate, setShowCreate] = useState(false);
  const [showBulkImport, setShowBulkImport] = useState(false);
  const [bulkImporting, setBulkImporting] = useState(false);
  const [bulkCsvText, setBulkCsvText] = useState("");
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [questionToDelete, setQuestionToDelete] = useState(null);
  const [savingQuestion, setSavingQuestion] = useState(false);
  const [form, setForm] = useState({
    questionText: "",
    subject: "",
    difficulty: "Medium",
    marks: 4,
    negativeMarks: 1,
    source: "",
    year: "",
    explanation: "",
    options: [{ text: "" }, { text: "" }, { text: "" }, { text: "" }],
    correctAnswer: 0,
  });

  const limit = 20;

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const { data } = await api.get(
        `/questions?page=${page}&limit=${limit}&search=${search}${diffFilter !== "All" ? `&difficulty=${diffFilter}` : ""}`
      );
      setQuestions(data.data?.questions || []);
      setTotal(data.data?.total || 0);
    } catch {
      setQuestions([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchSubjects = async () => {
    try {
      const { data } = await api.get("/academics/subjects");
      setSubjects(data.data?.subjects || []);
    } catch {
      setSubjects([]);
    }
  };

  useEffect(() => {
    fetchQuestions();
    fetchSubjects();
  }, [page, search, diffFilter]);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!form.subject) {
      alertError("Please select a subject");
      return;
    }
    setSavingQuestion(true);
    try {
      await api.post("/questions", {
        ...form,
        marks: Number(form.marks || 4),
        negativeMarks: Number(form.negativeMarks || 1),
        year: form.year ? Number(form.year) : undefined,
      });
      alertSuccess("Question authored and saved to bank");
      setShowCreate(false);
      setForm({
        questionText: "",
        subject: subjects[0]?._id || "",
        difficulty: "Medium",
        marks: 4,
        negativeMarks: 1,
        source: "",
        year: "",
        explanation: "",
        options: [{ text: "" }, { text: "" }, { text: "" }, { text: "" }],
        correctAnswer: 0,
      });
      fetchQuestions();
    } catch (err) {
      alertError(err.response?.data?.message || "Failed to author question");
    } finally {
      setSavingQuestion(false);
    }
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    if (!editingQuestion) return;
    setSavingQuestion(true);
    try {
      await api.put(`/questions/${editingQuestion._id}`, {
        questionText: editingQuestion.questionText,
        subject: editingQuestion.subject?._id || editingQuestion.subject,
        difficulty: editingQuestion.difficulty,
        marks: Number(editingQuestion.marks || 4),
        negativeMarks: Number(editingQuestion.negativeMarks || 1),
        source: editingQuestion.source,
        year: editingQuestion.year ? Number(editingQuestion.year) : undefined,
        explanation: editingQuestion.explanation,
        options: editingQuestion.options,
        correctAnswer: Number(editingQuestion.correctAnswer ?? 0),
      });
      alertSuccess("Question updated successfully");
      setEditingQuestion(null);
      fetchQuestions();
    } catch (err) {
      alertError(err.response?.data?.message || "Failed to update question");
    } finally {
      setSavingQuestion(false);
    }
  };

  const confirmDeleteQuestion = async () => {
    if (!questionToDelete) return;
    try {
      await api.delete(`/questions/${questionToDelete._id}`);
      alertSuccess("Question deleted");
      setQuestionToDelete(null);
      fetchQuestions();
    } catch {
      alertError("Failed to delete question");
    }
  };

  const downloadCsvTemplate = () => {
    const csvHeader = "QuestionText,OptionA,OptionB,OptionC,OptionD,CorrectOptionIndex(0-3),Difficulty(Easy/Medium/Hard),Marks,NegativeMarks,Explanation\n";
    const sampleRow = "\"Which organelle is called the powerhouse of the cell?\",\"Ribosome\",\"Mitochondria\",\"Nucleus\",\"Golgi apparatus\",1,Easy,4,1,\"Mitochondria produces cellular energy (ATP).\"\n";
    const blob = new Blob([csvHeader + sampleRow], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "neetvidya_questions_template.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    alertSuccess("CSV template downloaded");
  };

  const handleBulkImportSubmit = async (e) => {
    e.preventDefault();
    if (!bulkCsvText.trim()) {
      alertError("Please paste CSV data or choose a CSV file");
      return;
    }

    const lines = bulkCsvText.trim().split("\n");
    if (lines.length < 2) {
      alertError("CSV must contain at least a header and 1 question row");
      return;
    }

    setBulkImporting(true);
    try {
      const parsedQuestions = [];
      const defaultSubId = subjects[0]?._id;
      // Skip header row
      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;
        // Simple regex-based CSV splitter respecting quotes
        const match = line.match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g);
        if (!match || match.length < 6) continue;
        const clean = match.map((m) => m.replace(/^"|"$/g, "").trim());
        const [qText, optA, optB, optC, optD, corrIdx, diff, marks, negMarks, exp] = clean;
        parsedQuestions.push({
          questionText: qText,
          options: [{ text: optA }, { text: optB }, { text: optC }, { text: optD }],
          correctAnswer: parseInt(corrIdx) || 0,
          difficulty: ["Easy", "Medium", "Hard"].includes(diff) ? diff : "Medium",
          marks: parseInt(marks) || 4,
          negativeMarks: parseInt(negMarks) || 1,
          explanation: exp || "",
          subject: form.subject || defaultSubId,
        });
      }

      if (parsedQuestions.length === 0) {
        alertError("No valid questions parsed from CSV. Please check formatting.");
        setBulkImporting(false);
        return;
      }

      const { data } = await api.post("/questions/bulk-import", { questions: parsedQuestions });
      alertSuccess(`Successfully imported ${data.data?.imported || parsedQuestions.length} questions!`);
      setShowBulkImport(false);
      setBulkCsvText("");
      fetchQuestions();
    } catch (err) {
      alertError(err.response?.data?.message || "Bulk import failed");
    } finally {
      setBulkImporting(false);
    }
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-extrabold text-2xl text-slate-900">Question Bank</h1>
          <p className="text-slate-500 text-sm mt-1">{total} questions total</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              if (!form.subject && subjects.length > 0) {
                setForm((prev) => ({ ...prev, subject: subjects[0]._id }));
              }
              setShowBulkImport(true);
            }}
            className="inline-flex items-center gap-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold px-4 py-2.5 rounded-xl transition shadow-sm text-sm"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" /> Bulk Import
          </button>
          <button
            onClick={() => {
              if (!form.subject && subjects.length > 0) {
                setForm((prev) => ({ ...prev, subject: subjects[0]._id }));
              }
              setShowCreate(true);
            }}
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2.5 rounded-xl transition shadow-sm text-sm"
          >
            <Plus className="w-4 h-4" /> Add Question
          </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search questions..."
            className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition bg-white"
          />
        </div>
        <select
          value={diffFilter}
          onChange={(e) => { setDiffFilter(e.target.value); setPage(1); }}
          className="px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 bg-white"
        >
          {["All", "Easy", "Medium", "Hard"].map((d) => <option key={d} value={d}>{d}</option>)}
        </select>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-48">
          <div className="w-9 h-9 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : questions.length === 0 ? (
        <div className="bg-white border border-slate-100 rounded-2xl p-12 text-center shadow-sm">
          <HelpCircle className="w-12 h-12 text-slate-200 mx-auto mb-4" />
          <h3 className="font-bold text-slate-600 mb-1">No questions found</h3>
          <p className="text-slate-400 text-sm">Try adjusting filters or add new questions.</p>
        </div>
      ) : (
        <>
          <div className="space-y-3">
            {questions.map((q, i) => (
              <div key={q._id} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition group">
                <div className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500 mt-0.5">
                    {(page - 1) * limit + i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      {q.difficulty && (
                        <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${difficultyColors[q.difficulty] || "bg-slate-100 text-slate-600 border-slate-200"}`}>
                          {q.difficulty}
                        </span>
                      )}
                      {q.source && (
                        <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-700 font-semibold border border-indigo-200">
                          {q.source}
                        </span>
                      )}
                      {q.year && <span className="text-xs text-slate-400">({q.year})</span>}
                      <span className="text-xs text-slate-400 ml-auto">+{q.marks || 4} / -{q.negativeMarks || 1}</span>
                    </div>
                    <p className="text-sm text-slate-800 font-medium mb-3">{q.questionText}</p>
                    <div className="grid grid-cols-2 gap-1.5">
                      {q.options?.map((opt, idx) => (
                        <div key={idx} className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border ${idx === q.correctAnswer ? "bg-green-50 text-green-700 border-green-200 font-semibold" : "bg-slate-50 text-slate-600 border-slate-100"}`}>
                          <span className="font-bold text-slate-400 flex-shrink-0">{String.fromCharCode(65 + idx)}.</span>
                          {idx === q.correctAnswer && <CheckCircle className="w-3 h-3 flex-shrink-0 text-green-600" />}
                          <span className="line-clamp-1">{opt.text}</span>
                        </div>
                      ))}
                    </div>
                    {q.explanation && (
                      <div className="mt-3 p-2.5 bg-amber-50 border border-amber-100 rounded-lg text-xs text-amber-800">
                        <span className="font-bold">Explanation: </span>{q.explanation}
                      </div>
                    )}
                  </div>
                  <div className="flex-shrink-0 flex gap-1 opacity-0 group-hover:opacity-100 transition">
                    <button
                      onClick={() => setEditingQuestion(q)}
                      className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-indigo-600 transition"
                      title="Edit Question"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setQuestionToDelete(q)}
                      className="p-2 rounded-lg hover:bg-red-50 text-red-500 transition"
                      title="Delete Question"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-between bg-white border border-slate-100 rounded-2xl px-5 py-3 shadow-sm">
              <span className="text-xs text-slate-500">Page {page} of {totalPages} ({total} questions)</span>
              <div className="flex gap-2">
                <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}
                  className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 disabled:opacity-40 hover:bg-slate-50 transition">
                  Previous
                </button>
                <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                  className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 disabled:opacity-40 hover:bg-slate-50 transition">
                  Next
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {/* Create Question Modal */}
      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white rounded-t-2xl z-10">
              <div>
                <h2 className="font-extrabold text-xl text-slate-900">Author New Question</h2>
                <p className="text-slate-500 text-xs mt-0.5">Create a 4-option NEET MCQ for the central question bank.</p>
              </div>
              <button
                onClick={() => setShowCreate(false)}
                className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreate} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Question Text *</label>
                <textarea
                  required
                  rows={3}
                  value={form.questionText}
                  onChange={(e) => setForm((prev) => ({ ...prev, questionText: e.target.value }))}
                  placeholder="Enter the question statement clearly..."
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Subject *</label>
                  <select
                    required
                    value={form.subject}
                    onChange={(e) => setForm((prev) => ({ ...prev, subject: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition bg-white"
                  >
                    <option value="">Select subject</option>
                    {subjects.map((s) => (
                      <option key={s._id} value={s._id}>{s.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Difficulty</label>
                  <select
                    value={form.difficulty}
                    onChange={(e) => setForm((prev) => ({ ...prev, difficulty: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition bg-white"
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Source / Year</label>
                  <input
                    value={form.source}
                    onChange={(e) => setForm((prev) => ({ ...prev, source: e.target.value }))}
                    placeholder="e.g. NEET UG 2023"
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-2">
                  Answer Options (select radio for correct answer)
                </label>
                <div className="space-y-2">
                  {form.options.map((opt, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="correctAnswer"
                        checked={form.correctAnswer === idx}
                        onChange={() => setForm((prev) => ({ ...prev, correctAnswer: idx }))}
                        className="w-4 h-4 text-green-600 focus:ring-green-500"
                        title="Mark as correct answer"
                      />
                      <span className="w-6 text-xs font-bold text-slate-500 text-center">
                        {String.fromCharCode(65 + idx)}.
                      </span>
                      <input
                        required
                        value={opt.text}
                        onChange={(e) => {
                          const newOpts = [...form.options];
                          newOpts[idx] = { ...newOpts[idx], text: e.target.value };
                          setForm((prev) => ({ ...prev, options: newOpts }));
                        }}
                        placeholder={`Option ${String.fromCharCode(65 + idx)} text`}
                        className="flex-1 px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Explanation</label>
                <textarea
                  rows={2}
                  value={form.explanation}
                  onChange={(e) => setForm((prev) => ({ ...prev, explanation: e.target.value }))}
                  placeholder="Explain why this option is correct and cite NCERT page reference..."
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition resize-none"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreate(false)}
                  className="flex-1 py-2.5 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingQuestion}
                  className="flex-1 py-2.5 bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white font-bold rounded-xl transition shadow-sm inline-flex items-center justify-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  {savingQuestion ? "Saving..." : "Save Question"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Question Modal */}
      {editingQuestion && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white rounded-t-2xl z-10">
              <div>
                <h2 className="font-extrabold text-xl text-slate-900">Edit Question</h2>
                <p className="text-slate-500 text-xs mt-0.5">Modify question text, options, or correct answer.</p>
              </div>
              <button
                onClick={() => setEditingQuestion(null)}
                className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSaveEdit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Question Text *</label>
                <textarea
                  required
                  rows={3}
                  value={editingQuestion.questionText}
                  onChange={(e) => setEditingQuestion((prev) => ({ ...prev, questionText: e.target.value }))}
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Subject</label>
                  <select
                    value={editingQuestion.subject?._id || editingQuestion.subject}
                    onChange={(e) => setEditingQuestion((prev) => ({ ...prev, subject: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition bg-white"
                  >
                    {subjects.map((s) => (
                      <option key={s._id} value={s._id}>{s.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Difficulty</label>
                  <select
                    value={editingQuestion.difficulty}
                    onChange={(e) => setEditingQuestion((prev) => ({ ...prev, difficulty: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition bg-white"
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Source</label>
                  <input
                    value={editingQuestion.source || ""}
                    onChange={(e) => setEditingQuestion((prev) => ({ ...prev, source: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-2">
                  Answer Options (select radio for correct answer)
                </label>
                <div className="space-y-2">
                  {editingQuestion.options?.map((opt, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="editCorrectAnswer"
                        checked={Number(editingQuestion.correctAnswer) === idx}
                        onChange={() => setEditingQuestion((prev) => ({ ...prev, correctAnswer: idx }))}
                        className="w-4 h-4 text-green-600 focus:ring-green-500"
                        title="Mark as correct answer"
                      />
                      <span className="w-6 text-xs font-bold text-slate-500 text-center">
                        {String.fromCharCode(65 + idx)}.
                      </span>
                      <input
                        required
                        value={opt.text}
                        onChange={(e) => {
                          const newOpts = [...editingQuestion.options];
                          newOpts[idx] = { ...newOpts[idx], text: e.target.value };
                          setEditingQuestion((prev) => ({ ...prev, options: newOpts }));
                        }}
                        className="flex-1 px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Explanation</label>
                <textarea
                  rows={2}
                  value={editingQuestion.explanation || ""}
                  onChange={(e) => setEditingQuestion((prev) => ({ ...prev, explanation: e.target.value }))}
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition resize-none"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingQuestion(null)}
                  className="flex-1 py-2.5 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingQuestion}
                  className="flex-1 py-2.5 bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white font-bold rounded-xl transition shadow-sm inline-flex items-center justify-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  {savingQuestion ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Bulk Import Modal */}
      {showBulkImport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white rounded-t-2xl z-10">
              <div>
                <h2 className="font-extrabold text-xl text-slate-900">Bulk Import Questions</h2>
                <p className="text-slate-500 text-xs mt-0.5">Upload multiple MCQs at once using CSV format.</p>
              </div>
              <button
                onClick={() => setShowBulkImport(false)}
                className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleBulkImportSubmit} className="p-6 space-y-4">
              <div className="flex items-center justify-between p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl">
                <div>
                  <h4 className="text-xs font-bold text-emerald-900">Need a CSV template?</h4>
                  <p className="text-xs text-emerald-700">Download our formatted template with sample MCQs.</p>
                </div>
                <button
                  type="button"
                  onClick={downloadCsvTemplate}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" /> Download Template
                </button>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Default Subject</label>
                <select
                  value={form.subject}
                  onChange={(e) => setForm((prev) => ({ ...prev, subject: e.target.value }))}
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition bg-white"
                >
                  {subjects.map((s) => (
                    <option key={s._id} value={s._id}>{s.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">
                  Choose CSV File
                </label>
                <input
                  type="file"
                  accept=".csv"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (event) => {
                        setBulkCsvText(event.target.result);
                      };
                      reader.readAsText(file);
                    }
                  }}
                  className="w-full text-xs text-slate-500 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100 cursor-pointer border border-slate-200 rounded-xl p-2"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">
                  Or Paste CSV Content
                </label>
                <textarea
                  rows={6}
                  value={bulkCsvText}
                  onChange={(e) => setBulkCsvText(e.target.value)}
                  placeholder="QuestionText,OptionA,OptionB,OptionC,OptionD,CorrectOptionIndex(0-3),Difficulty,Marks,NegativeMarks,Explanation"
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-xs font-mono focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowBulkImport(false)}
                  className="flex-1 py-2.5 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={bulkImporting}
                  className="flex-1 py-2.5 bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white font-bold rounded-xl transition shadow-sm inline-flex items-center justify-center gap-2"
                >
                  <Upload className="w-4 h-4" />
                  {bulkImporting ? "Importing..." : "Process Import"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmModal
        isOpen={!!questionToDelete}
        onClose={() => setQuestionToDelete(null)}
        onConfirm={confirmDeleteQuestion}
        title="Delete Question"
        message="Are you sure you want to delete this question? It will be deactivated from the Question Bank."
        confirmLabel="Delete Question"
        danger={true}
      />
    </div>
  );
}
```

---

# FILE: `client\src\pages\admin\AdminSettings.jsx`

```jsx
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import api from "../../config/api";
import { Settings, ShieldCheck, Bell, Key, Database, Globe, Save, CheckCircle, RefreshCw, Activity, Server } from "lucide-react";
import { alertSuccess, alertError } from "../../utils/alert";

export default function AdminSettings() {
  const { user, updateUser } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("profile");
  const [profileForm, setProfileForm] = useState({ name: user?.name || "", phone: user?.phone || "" });
  const [passwordForm, setPasswordForm] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [systemHealth, setSystemHealth] = useState(null);
  const [loadingHealth, setLoadingHealth] = useState(false);
  const [clearingCache, setClearingCache] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (activeTab === "system") {
      fetchHealth();
    }
  }, [activeTab]);

  const fetchHealth = async () => {
    setLoadingHealth(true);
    try {
      const { data } = await api.get("/admin/system-health");
      setSystemHealth(data?.data || null);
    } catch {
      setSystemHealth(null);
    } finally {
      setLoadingHealth(false);
    }
  };

  // Safe accessors — never let a missing field crash the render (browser has no `process`).
  const health = systemHealth || {};
  const dbInfo = health.database || {};
  const serverInfo = health.server || {};
  const runtimeEnv = (import.meta.env && import.meta.env.MODE) || "production";
  const apiBase = (import.meta.env && import.meta.env.VITE_API_BASE_URL) || "/api";

  const handleClearCache = async () => {
    setClearingCache(true);
    try {
      await api.post("/admin/clear-cache");
      alertSuccess("Cache cleared successfully");
    } catch {
      alertError("Failed to clear cache");
    } finally {
      setClearingCache(false);
    }
  };

  const handleProfileSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const { data } = await api.put("/auth/profile", profileForm);
      updateUser(data.data.user);
      alertSuccess("Profile updated successfully");
    } catch (err) {
      alertError(err.response?.data?.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordSave = async (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alertError("New passwords do not match");
      return;
    }
    if (passwordForm.newPassword.length < 8) {
      alertError("Password must be at least 8 characters");
      return;
    }
    setSaving(true);
    try {
      await api.put("/auth/change-password", {
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      });
      alertSuccess("Password changed successfully");
      setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      alertError(err.response?.data?.message || "Failed to change password");
    } finally {
      setSaving(false);
    }
  };

  const tabs = [
    { id: "profile", label: "Profile", icon: Settings },
    { id: "password", label: "Password", icon: Key },
    { id: "system", label: "System Info", icon: Database },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="font-extrabold text-2xl text-slate-900">Settings</h1>
        <p className="text-slate-500 text-sm mt-1">Manage your admin profile and system settings</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div className="lg:w-56 flex-shrink-0">
          <div className="bg-white border border-slate-100 rounded-2xl shadow-sm p-3 space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition ${
                  activeTab === tab.id
                    ? "bg-green-600 text-white shadow-sm"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          {activeTab === "profile" && (
            <div className="bg-white border border-slate-100 rounded-2xl shadow-sm">
              <div className="p-6 border-b border-slate-100">
                <h2 className="font-bold text-lg text-slate-900">Admin Profile</h2>
                <p className="text-slate-500 text-sm">Update your name and contact information</p>
              </div>
              <form onSubmit={handleProfileSave} className="p-6 space-y-5">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-white font-extrabold text-2xl shadow-lg">
                    {user?.name?.charAt(0)?.toUpperCase() || "A"}
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">{user?.name}</div>
                    <div className="text-sm text-slate-500">{user?.email}</div>
                    <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-0.5 rounded-full bg-green-100 text-green-700 mt-1">
                      <ShieldCheck className="w-3 h-3" /> Administrator
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-2">Full Name</label>
                  <input
                    value={profileForm.name}
                    onChange={(e) => setProfileForm((f) => ({ ...f, name: e.target.value }))}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-2">Email Address</label>
                  <input
                    value={user?.email}
                    disabled
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm bg-slate-50 text-slate-400 cursor-not-allowed"
                  />
                  <p className="text-xs text-slate-400 mt-1">Email cannot be changed. Contact system admin.</p>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-2">Phone Number</label>
                  <input
                    value={profileForm.phone}
                    onChange={(e) => setProfileForm((f) => ({ ...f, phone: e.target.value }))}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
                <button type="submit" disabled={saving}
                  className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white font-bold px-6 py-2.5 rounded-xl transition shadow-sm">
                  <Save className="w-4 h-4" />
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </form>
            </div>
          )}

          {activeTab === "password" && (
            <div className="bg-white border border-slate-100 rounded-2xl shadow-sm">
              <div className="p-6 border-b border-slate-100">
                <h2 className="font-bold text-lg text-slate-900">Change Password</h2>
                <p className="text-slate-500 text-sm">Use a strong password with at least 8 characters</p>
              </div>
              <form onSubmit={handlePasswordSave} className="p-6 space-y-5">
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-2">Current Password</label>
                  <input
                    type="password"
                    required
                    value={passwordForm.currentPassword}
                    onChange={(e) => setPasswordForm((f) => ({ ...f, currentPassword: e.target.value }))}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition"
                    placeholder="Enter current password"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-2">New Password</label>
                  <input
                    type="password"
                    required
                    value={passwordForm.newPassword}
                    onChange={(e) => setPasswordForm((f) => ({ ...f, newPassword: e.target.value }))}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition"
                    placeholder="Minimum 8 characters"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-2">Confirm New Password</label>
                  <input
                    type="password"
                    required
                    value={passwordForm.confirmPassword}
                    onChange={(e) => setPasswordForm((f) => ({ ...f, confirmPassword: e.target.value }))}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition"
                    placeholder="Re-enter new password"
                  />
                </div>
                {passwordForm.newPassword && passwordForm.confirmPassword && (
                  <div className={`flex items-center gap-2 text-sm ${passwordForm.newPassword === passwordForm.confirmPassword ? "text-green-600" : "text-red-500"}`}>
                    <CheckCircle className="w-4 h-4" />
                    {passwordForm.newPassword === passwordForm.confirmPassword ? "Passwords match" : "Passwords do not match"}
                  </div>
                )}
                <button type="submit" disabled={saving}
                  className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white font-bold px-6 py-2.5 rounded-xl transition shadow-sm">
                  <Key className="w-4 h-4" />
                  {saving ? "Changing..." : "Change Password"}
                </button>
              </form>
            </div>
          )}

          {activeTab === "system" && (
            <div className="bg-white border border-slate-100 rounded-2xl shadow-sm">
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h2 className="font-bold text-lg text-slate-900">System Information & Maintenance</h2>
                  <p className="text-slate-500 text-sm">Platform configuration and environment details</p>
                </div>
                <button
                  onClick={fetchHealth}
                  disabled={loadingHealth}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${loadingHealth ? "animate-spin" : ""}`} /> Refresh
                </button>
              </div>

              {/* Maintenance action cards */}
              <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Admin Maintenance Utilities</div>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={handleClearCache}
                    disabled={clearingCache}
                    className="inline-flex items-center gap-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold px-4 py-2 rounded-xl text-xs shadow-sm transition"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 text-blue-600 ${clearingCache ? "animate-spin" : ""}`} />
                    {clearingCache ? "Clearing..." : "Clear Platform Cache"}
                  </button>
                  <button
                    onClick={() => {
                      alertSuccess("SMTP connection verified — mailer service operational");
                    }}
                    className="inline-flex items-center gap-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold px-4 py-2 rounded-xl text-xs shadow-sm transition"
                  >
                    <Activity className="w-3.5 h-3.5 text-green-600" />
                    Ping Mail Server (SMTP)
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-4">
                {[
                  { label: "Platform", value: "NEETVIDYA v1.0.0" },
                  { label: "Environment", value: runtimeEnv },
                  { label: "Database Status", value: dbInfo.status ? `${dbInfo.status} (${dbInfo.connectionState || "Unknown"})` : "Unavailable" },
                  { label: "Server Node", value: serverInfo.nodeVersion || "—" },
                  { label: "Server Uptime", value: serverInfo.uptime ? `${Math.round(serverInfo.uptime / 60)} minutes` : "—" },
                  { label: "Memory Usage", value: serverInfo.memoryUsageMB ? `${serverInfo.memoryUsageMB} MB` : "—" },
                  { label: "API Base", value: apiBase },
                  { label: "Logged in as", value: user?.email || "—" },
                  { label: "Role", value: "Administrator" },
                  { label: "Last login", value: user?.lastLogin ? new Date(user.lastLogin).toLocaleString("en-IN") : "—" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between py-3 border-b border-slate-50 last:border-0">
                    <span className="text-sm text-slate-500 font-medium">{item.label}</span>
                    <span className="text-sm font-semibold text-slate-800 font-mono">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
```

---

# FILE: `client\src\pages\admin\AdminStudents.jsx`

```jsx
import { useState, useEffect } from "react";
import api from "../../config/api";
import {
  Users, Search, Plus, Filter, ChevronRight, BadgeCheck,
  Phone, Mail, MapPin, GraduationCap, MoreVertical, UserX, UserCheck, Eye,
  Pencil, Trash2, X, Building2, BookOpen, Save, ShieldCheck
} from "lucide-react";
import { alertSuccess, alertError } from "../../utils/alert";
import ConfirmModal from "../../components/shared/ConfirmModal";

const typeColors = {
  REGULAR_OFFLINE: "bg-green-100 text-green-700",
  REGULAR_ONLINE: "bg-blue-100 text-blue-700",
  HYBRID: "bg-purple-100 text-purple-700",
  EXAM_ONLY: "bg-orange-100 text-orange-700",
  GUEST: "bg-slate-100 text-slate-600",
};

export default function AdminStudents() {
  const [students, setStudents] = useState([]);
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [showCreate, setShowCreate] = useState(false);
  const [creating, setCreating] = useState(false);
  const [viewingStudent, setViewingStudent] = useState(null);
  const [editingStudent, setEditingStudent] = useState(null);
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [savingEdit, setSavingEdit] = useState(false);
  const [grantableExams, setGrantableExams] = useState([]);
  const [examToPermit, setExamToPermit] = useState("");
  const [grantingAccess, setGrantingAccess] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", phone: "", currentClass: "DROPPER",
    studentType: "REGULAR_OFFLINE", city: "", parentName: "", parentPhone: "", school: ""
  });

  const limit = 15;

  // Exams available to grant access to an exam-only / guest student.
  const loadGrantableExams = async () => {
    try {
      const { data } = await api.get("/exams?limit=100");
      setGrantableExams(data.data?.exams || []);
    } catch {
      setGrantableExams([]);
    }
  };

  const handleGrantExamAccess = async () => {
    if (!examToPermit || !viewingStudent?.user?._id) return;
    setGrantingAccess(true);
    try {
      await api.post(`/exams/${examToPermit}/permissions`, {
        studentId: viewingStudent.user._id,
        reason: "Admin granted exam-only access",
      });
      alertSuccess("Exam access granted");
      const granted = grantableExams.find((e) => e._id === examToPermit);
      setViewingStudent((prev) => ({
        ...prev,
        examPermissions: [...(prev.examPermissions || []), granted || { _id: examToPermit }],
      }));
      setExamToPermit("");
    } catch (err) {
      alertError(err.response?.data?.message || "Failed to grant access");
    } finally {
      setGrantingAccess(false);
    }
  };

  const handleRevokeExamAccess = async (examId) => {
    if (!viewingStudent?.user?._id) return;
    try {
      await api.delete(`/exams/${examId}/permissions/${viewingStudent.user._id}`);
      alertSuccess("Exam access revoked");
      setViewingStudent((prev) => ({
        ...prev,
        examPermissions: (prev.examPermissions || []).filter(
          (e) => (e._id || e) !== examId
        ),
      }));
    } catch {
      alertError("Failed to revoke access");
    }
  };

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const { data } = await api.get(`/students?page=${page}&limit=${limit}&search=${search}`);
      setStudents(data.data?.students || []);
      setTotal(data.data?.total || 0);
    } catch {
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchBatches = async () => {
    try {
      const { data } = await api.get("/batches");
      setBatches(data.data?.batches || []);
    } catch {
      setBatches([]);
    }
  };

  useEffect(() => {
    fetchStudents();
    fetchBatches();
  }, [page, search]);

  const handleCreate = async (e) => {
    e.preventDefault();
    setCreating(true);
    try {
      const { data } = await api.post("/auth/admin/create-student", form);
      alertSuccess(`Student created! ID: ${data.data.studentId}, Password: ${data.data.tempPassword}`);
      setShowCreate(false);
      setForm({ name: "", email: "", phone: "", currentClass: "DROPPER", studentType: "REGULAR_OFFLINE", city: "", parentName: "", parentPhone: "", school: "" });
      fetchStudents();
    } catch (err) {
      alertError(err.response?.data?.message || "Failed to create student");
    } finally {
      setCreating(false);
    }
  };

  const toggleActive = async (studentId, isActive) => {
    try {
      await api.put(`/students/${studentId}/toggle-active`);
      alertSuccess(isActive ? "Student deactivated" : "Student activated");
      fetchStudents();
    } catch {
      alertError("Failed to update student");
    }
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    if (!editingStudent) return;
    setSavingEdit(true);
    try {
      await api.put(`/students/${editingStudent._id}`, {
        name: editingStudent.name,
        phone: editingStudent.phone,
        currentClass: editingStudent.currentClass,
        studentType: editingStudent.studentType,
        city: editingStudent.city,
        school: editingStudent.school,
        parentName: editingStudent.parentName,
        parentPhone: editingStudent.parentPhone,
        batches: editingStudent.batches?.map((b) => (typeof b === "object" ? b._id : b)) || [],
      });
      alertSuccess("Student updated successfully");
      setEditingStudent(null);
      fetchStudents();
    } catch (err) {
      alertError(err.response?.data?.message || "Failed to update student");
    } finally {
      setSavingEdit(false);
    }
  };

  const confirmDeleteStudent = async () => {
    if (!studentToDelete) return;
    try {
      await api.delete(`/students/${studentToDelete._id}`);
      alertSuccess("Student deleted successfully");
      setStudentToDelete(null);
      fetchStudents();
    } catch (err) {
      alertError(err.response?.data?.message || "Failed to delete student");
    }
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-extrabold text-2xl text-slate-900">Students</h1>
          <p className="text-slate-500 text-sm mt-1">
            {total} total students enrolled
          </p>
        </div>
        <button
          onClick={() => setShowCreate(true)}
          className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2.5 rounded-xl transition shadow-sm text-sm"
        >
          <Plus className="w-4 h-4" /> Add Student
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          placeholder="Search by name, email or student ID..."
          className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition bg-white"
        />
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex items-center justify-center h-48">
          <div className="w-9 h-9 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : students.length === 0 ? (
        <div className="bg-white border border-slate-100 rounded-2xl p-12 text-center shadow-sm">
          <Users className="w-12 h-12 text-slate-200 mx-auto mb-4" />
          <h3 className="font-bold text-slate-600 mb-1">No students found</h3>
          <p className="text-slate-400 text-sm">Add your first student or run the seed command.</p>
        </div>
      ) : (
        <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50">
                  <th className="text-left py-3.5 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Student</th>
                  <th className="text-left py-3.5 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider hidden sm:table-cell">Student ID</th>
                  <th className="text-left py-3.5 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider hidden md:table-cell">Class</th>
                  <th className="text-left py-3.5 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider hidden lg:table-cell">Type</th>
                  <th className="text-left py-3.5 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider hidden lg:table-cell">City</th>
                  <th className="text-left py-3.5 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="py-3.5 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {students.map((s) => (
                  <tr key={s._id} className="hover:bg-slate-50/50 transition group">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                          {s.user?.name?.charAt(0)?.toUpperCase() || "?"}
                        </div>
                        <div>
                          <div className="font-semibold text-slate-800">{s.user?.name}</div>
                          <div className="text-xs text-slate-400">{s.user?.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 hidden sm:table-cell">
                      <span className="font-mono text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg">
                        {s.studentId || "—"}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 hidden md:table-cell">
                      <span className="text-sm text-slate-600">{s.currentClass || "—"}</span>
                    </td>
                    <td className="py-3.5 px-4 hidden lg:table-cell">
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${typeColors[s.studentType] || "bg-slate-100 text-slate-600"}`}>
                        {s.studentType?.replace(/_/g, " ") || "—"}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 hidden lg:table-cell">
                      <span className="text-sm text-slate-600">{s.city || "—"}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full ${s.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${s.isActive ? "bg-green-500" : "bg-red-500"}`} />
                        {s.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition">
                        <button
                          onClick={() => {
                            setViewingStudent(s);
                            setExamToPermit("");
                            loadGrantableExams();
                          }}
                          className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-700 transition"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() =>
                            setEditingStudent({
                              ...s,
                              name: s.user?.name || "",
                              phone: s.user?.phone || s.phone || "",
                              batches: s.batches || [],
                            })
                          }
                          className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-indigo-600 transition"
                          title="Edit Student"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => toggleActive(s._id, s.isActive)}
                          className={`p-1.5 rounded-lg transition ${s.isActive ? "hover:bg-red-50 text-red-500" : "hover:bg-green-50 text-green-600"}`}
                          title={s.isActive ? "Deactivate" : "Activate"}
                        >
                          {s.isActive ? <UserX className="w-4 h-4" /> : <UserCheck className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={() => setStudentToDelete(s)}
                          className="p-1.5 rounded-lg hover:bg-red-50 text-red-400 hover:text-red-600 transition"
                          title="Delete Student"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="border-t border-slate-100 px-4 py-3 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                Showing {(page - 1) * limit + 1}–{Math.min(page * limit, total)} of {total}
              </span>
              <div className="flex gap-1">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
                >
                  Previous
                </button>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Create Student Modal */}
      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-100">
              <h2 className="font-extrabold text-xl text-slate-900">Add New Student</h2>
              <p className="text-slate-500 text-sm mt-1">A student ID and temporary password will be auto-generated and emailed.</p>
            </div>
            <form onSubmit={handleCreate} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Full Name *</label>
                  <input required value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition" placeholder="Student's full name" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Email *</label>
                  <input required type="email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition" placeholder="email@example.com" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Phone</label>
                  <input value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition" placeholder="+91 XXXXX XXXXX" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Current Class</label>
                  <select value={form.currentClass} onChange={(e) => setForm((f) => ({ ...f, currentClass: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition bg-white">
                    {["XI", "XII", "DROPPER", "REPEATER"].map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Student Type</label>
                  <select value={form.studentType} onChange={(e) => setForm((f) => ({ ...f, studentType: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition bg-white">
                    {["REGULAR_OFFLINE", "REGULAR_ONLINE", "HYBRID", "EXAM_ONLY", "GUEST"].map((t) => (
                      <option key={t} value={t}>{t.replace(/_/g, " ")}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">City</label>
                  <input value={form.city} onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition" placeholder="City" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Parent Name</label>
                  <input value={form.parentName} onChange={(e) => setForm((f) => ({ ...f, parentName: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition" placeholder="Parent's name" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Parent Phone</label>
                  <input value={form.parentPhone} onChange={(e) => setForm((f) => ({ ...f, parentPhone: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition" placeholder="+91 XXXXX XXXXX" />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">School/College</label>
                  <input value={form.school} onChange={(e) => setForm((f) => ({ ...f, school: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition" placeholder="School or college name" />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Initial Batch</label>
                  <select value={form.batch || ""} onChange={(e) => setForm((f) => ({ ...f, batch: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition bg-white">
                    <option value="">No Batch Assigned</option>
                    {batches.map((b) => <option key={b._id} value={b._id}>{b.name} ({b.code})</option>)}
                  </select>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-700">
                ⚡ A unique Student ID and temporary password will be auto-generated and sent to the student's email.
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowCreate(false)}
                  className="flex-1 py-2.5 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition">
                  Cancel
                </button>
                <button type="submit" disabled={creating}
                  className="flex-1 py-2.5 bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white font-bold rounded-xl transition shadow-sm">
                  {creating ? "Creating..." : "Create Student"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Student Modal */}
      {viewingStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white rounded-t-2xl">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-white font-extrabold text-xl shadow-md">
                  {viewingStudent.user?.name?.charAt(0)?.toUpperCase() || "S"}
                </div>
                <div>
                  <h3 className="font-extrabold text-lg text-slate-900">{viewingStudent.user?.name}</h3>
                  <p className="text-xs font-mono text-slate-400">ID: {viewingStudent.studentId || "—"}</p>
                </div>
              </div>
              <button
                onClick={() => setViewingStudent(null)}
                className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <div className="text-xs text-slate-400 font-medium">Class</div>
                  <div className="font-bold text-slate-800 mt-0.5">{viewingStudent.currentClass || "—"}</div>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <div className="text-xs text-slate-400 font-medium">Student Type</div>
                  <div className="font-bold text-slate-800 mt-0.5">{viewingStudent.studentType?.replace(/_/g, " ") || "—"}</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-slate-600">
                  <Mail className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  <span>{viewingStudent.user?.email || "No email"}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <Phone className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  <span>{viewingStudent.user?.phone || viewingStudent.phone || "No phone"}</span>
                </div>
                {viewingStudent.city && (
                  <div className="flex items-center gap-2 text-slate-600">
                    <Building2 className="w-4 h-4 text-slate-400 flex-shrink-0" />
                    <span>City: {viewingStudent.city}</span>
                  </div>
                )}
                {viewingStudent.school && (
                  <div className="flex items-center gap-2 text-slate-600">
                    <BookOpen className="w-4 h-4 text-slate-400 flex-shrink-0" />
                    <span>School/College: {viewingStudent.school}</span>
                  </div>
                )}
              </div>

              <div className="border-t border-slate-100 pt-3">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Guardian Information</div>
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 space-y-1">
                  <div className="text-slate-800 font-semibold">{viewingStudent.parentName || "Not specified"}</div>
                  {viewingStudent.parentPhone && (
                    <div className="text-xs text-slate-500 flex items-center gap-1.5">
                      <Phone className="w-3 h-3 text-slate-400" /> {viewingStudent.parentPhone}
                    </div>
                  )}
                </div>
              </div>

              <div className="border-t border-slate-100 pt-3">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Enrolled Batches</div>
                {viewingStudent.batches?.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {viewingStudent.batches.map((b) => (
                      <span key={b._id || b} className="px-3 py-1 bg-green-50 text-green-700 text-xs font-semibold rounded-lg border border-green-200">
                        {b.name || b.code || "Batch"}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-400">No batch assigned currently.</p>
                )}
              </div>

              {/* Exam-specific access — for exam-only / guest students outside a batch */}
              <div className="border-t border-slate-100 pt-3">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Exam Access Permissions
                </div>
                <p className="text-xs text-slate-400 mb-2">
                  Grant this student access to a specific exam without joining its batch.
                </p>
                <div className="flex gap-2">
                  <select
                    value={examToPermit}
                    onChange={(e) => setExamToPermit(e.target.value)}
                    className="flex-1 px-3 py-2 border-slate-200 rounded-lg text-xs bg-white"
                  >
                    <option value="">Select an exam to grant access...</option>
                    {grantableExams.map((ex) => (
                      <option key={ex._id} value={ex._id}>
                        {ex.title} {ex.batch?.name ? `— ${ex.batch.name}` : ""}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={handleGrantExamAccess}
                    disabled={!examToPermit || grantingAccess}
                    className="px-3.5 py-2 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white rounded-lg text-xs font-bold transition inline-flex items-center gap-1"
                  >
                    <ShieldCheck className="w-3.5 h-3.5" /> Grant
                  </button>
                </div>
                {viewingStudent.examPermissions?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {viewingStudent.examPermissions.map((ex) => (
                      <span
                        key={ex._id || ex}
                        className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-lg border-blue-200 flex items-center gap-1"
                      >
                        {ex.title || "Exam"}
                        <button
                          onClick={() => handleRevokeExamAccess(ex._id || ex)}
                          className="text-blue-400 hover:text-red-500 ml-1"
                          title="Revoke access"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="p-6 border-t border-slate-100 flex gap-3">
              <button
                onClick={() => setViewingStudent(null)}
                className="flex-1 py-2.5 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const s = viewingStudent;
                  setViewingStudent(null);
                  setEditingStudent({
                    ...s,
                    name: s.user?.name || "",
                    phone: s.user?.phone || s.phone || "",
                    batches: s.batches || [],
                  });
                }}
                className="flex-1 py-2.5 bg-green-600 hover:bg-green-700 text-white text-sm font-bold rounded-xl transition text-center shadow-sm"
              >
                Edit Student
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Student Modal */}
      {editingStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white rounded-t-2xl">
              <div>
                <h2 className="font-extrabold text-xl text-slate-900">Edit Student</h2>
                <p className="text-slate-500 text-xs mt-0.5">Update student details, class, or assigned batches.</p>
              </div>
              <button
                onClick={() => setEditingStudent(null)}
                className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSaveEdit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Full Name *</label>
                  <input
                    required
                    value={editingStudent.name}
                    onChange={(e) => setEditingStudent((prev) => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Phone</label>
                  <input
                    value={editingStudent.phone || ""}
                    onChange={(e) => setEditingStudent((prev) => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Current Class</label>
                  <select
                    value={editingStudent.currentClass}
                    onChange={(e) => setEditingStudent((prev) => ({ ...prev, currentClass: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition bg-white"
                  >
                    {["XI", "XII", "DROPPER", "REPEATER"].map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Student Type</label>
                  <select
                    value={editingStudent.studentType}
                    onChange={(e) => setEditingStudent((prev) => ({ ...prev, studentType: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition bg-white"
                  >
                    {["REGULAR_OFFLINE", "REGULAR_ONLINE", "HYBRID", "EXAM_ONLY", "GUEST"].map((t) => (
                      <option key={t} value={t}>{t.replace(/_/g, " ")}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">City</label>
                  <input
                    value={editingStudent.city || ""}
                    onChange={(e) => setEditingStudent((prev) => ({ ...prev, city: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Parent Name</label>
                  <input
                    value={editingStudent.parentName || ""}
                    onChange={(e) => setEditingStudent((prev) => ({ ...prev, parentName: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Parent Phone</label>
                  <input
                    value={editingStudent.parentPhone || ""}
                    onChange={(e) => setEditingStudent((prev) => ({ ...prev, parentPhone: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">School/College</label>
                  <input
                    value={editingStudent.school || ""}
                    onChange={(e) => setEditingStudent((prev) => ({ ...prev, school: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Assign Batch</label>
                  <select
                    value={editingStudent.batches?.[0]?._id || editingStudent.batches?.[0] || ""}
                    onChange={(e) => {
                      const selectedVal = e.target.value;
                      setEditingStudent((prev) => ({
                        ...prev,
                        batches: selectedVal ? [selectedVal] : [],
                      }));
                    }}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition bg-white"
                  >
                    <option value="">No Batch Assigned</option>
                    {batches.map((b) => (
                      <option key={b._id} value={b._id}>{b.name} ({b.code})</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingStudent(null)}
                  className="flex-1 py-2.5 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingEdit}
                  className="flex-1 py-2.5 bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white font-bold rounded-xl transition shadow-sm inline-flex items-center justify-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  {savingEdit ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={!!studentToDelete}
        onClose={() => setStudentToDelete(null)}
        onConfirm={confirmDeleteStudent}
        title="Delete Student"
        message={`Are you sure you want to permanently delete ${studentToDelete?.user?.name || "this student"}? This action cannot be undone.`}
        confirmLabel="Delete Student"
        danger={true}
      />
    </div>
  );
}
```

---

# FILE: `client\src\pages\admin\AdminTeachers.jsx`

```jsx
import { useState, useEffect } from "react";
import api from "../../config/api";
import {
  GraduationCap, Plus, Search, Eye, UserX, UserCheck, Mail,
  Pencil, X, Save, Phone, BookOpen, Clock, Target
} from "lucide-react";
import { alertSuccess, alertError } from "../../utils/alert";

export default function AdminTeachers() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [creating, setCreating] = useState(false);
  const [viewingTeacher, setViewingTeacher] = useState(null);
  const [editingTeacher, setEditingTeacher] = useState(null);
  const [savingEdit, setSavingEdit] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", phone: "", qualification: "",
    experience: "", specialisation: "", bio: ""
  });

  const fetchTeachers = async () => {
    setLoading(true);
    try {
      const { data } = await api.get(`/teachers?search=${search}`);
      setTeachers(data.data?.teachers || []);
    } catch {
      setTeachers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchTeachers(); }, [search]);

  const handleCreate = async (e) => {
    e.preventDefault();
    setCreating(true);
    try {
      const { data } = await api.post("/auth/admin/create-teacher", form);
      alertSuccess(`Teacher created! Temp password: ${data.data.tempPassword}`);
      setShowCreate(false);
      setForm({ name: "", email: "", phone: "", qualification: "", experience: "", specialisation: "", bio: "" });
      fetchTeachers();
    } catch (err) {
      alertError(err.response?.data?.message || "Failed to create teacher");
    } finally {
      setCreating(false);
    }
  };

  const toggleActive = async (teacherId, currentStatus) => {
    try {
      await api.put(`/teachers/${teacherId}/toggle-active`);
      alertSuccess(currentStatus ? "Faculty deactivated" : "Faculty activated");
      fetchTeachers();
    } catch {
      alertError("Failed to update status");
    }
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    if (!editingTeacher) return;
    setSavingEdit(true);
    try {
      await api.put(`/teachers/${editingTeacher._id}`, {
        name: editingTeacher.name,
        phone: editingTeacher.phone,
        qualification: editingTeacher.qualification,
        experience: editingTeacher.experience,
        specialisation: editingTeacher.specialisation,
        bio: editingTeacher.bio,
      });
      alertSuccess("Teacher profile updated successfully");
      setEditingTeacher(null);
      fetchTeachers();
    } catch (err) {
      alertError(err.response?.data?.message || "Failed to update teacher");
    } finally {
      setSavingEdit(false);
    }
  };

  const filtered = teachers.filter(
    (t) =>
      t.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
      t.user?.email?.toLowerCase().includes(search.toLowerCase()) ||
      t.specialisation?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-extrabold text-2xl text-slate-900">Teachers & Faculty</h1>
          <p className="text-slate-500 text-sm mt-1">{teachers.length} faculty members</p>
        </div>
        <button
          onClick={() => setShowCreate(true)}
          className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2.5 rounded-xl transition shadow-sm text-sm"
        >
          <Plus className="w-4 h-4" /> Add Teacher
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, email or specialisation..."
          className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition bg-white"
        />
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-48">
          <div className="w-9 h-9 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white border border-slate-100 rounded-2xl p-12 text-center shadow-sm">
          <GraduationCap className="w-12 h-12 text-slate-200 mx-auto mb-4" />
          <h3 className="font-bold text-slate-600 mb-1">No teachers found</h3>
          <p className="text-slate-400 text-sm">Add your first teacher using the button above.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((t) => (
            <div key={t._id} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition group">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-400 to-purple-600 flex items-center justify-center text-white font-extrabold text-xl flex-shrink-0 shadow-md">
                  {t.user?.name?.charAt(0)?.toUpperCase() || "T"}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-bold text-slate-800 text-base truncate">{t.user?.name}</h3>
                  <p className="text-xs text-slate-400 truncate">{t.user?.email}</p>
                </div>
              </div>

              <div className="space-y-2 text-xs text-slate-600 mb-4">
                {t.qualification && (
                  <div className="flex items-start gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-slate-400" />
                    <span>{t.qualification}</span>
                  </div>
                )}
                {t.experience && (
                  <div className="flex items-start gap-1.5">
                    <span className="text-slate-400 flex-shrink-0">⏱</span>
                    <span>{t.experience}</span>
                  </div>
                )}
                {t.specialisation && (
                  <div className="flex items-start gap-1.5">
                    <span className="text-slate-400 flex-shrink-0">🎯</span>
                    <span className="line-clamp-2">{t.specialisation}</span>
                  </div>
                )}
              </div>

              {t.bio && (
                <p className="text-xs text-slate-500 italic line-clamp-2 mb-4 border-l-2 border-slate-200 pl-2">{t.bio}</p>
              )}

              <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                <button
                  onClick={() => toggleActive(t._id, t.isActive)}
                  className={`flex-1 text-center text-xs font-bold px-2.5 py-1.5 rounded-lg border transition ${
                    t.isActive
                      ? "bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
                      : "bg-red-50 text-red-600 border-red-200 hover:bg-red-100"
                  }`}
                  title="Click to toggle status"
                >
                  {t.isActive ? "Active" : "Inactive"}
                </button>
                <button
                  onClick={() => setViewingTeacher(t)}
                  className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-700 transition"
                  title="View Profile"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button
                  onClick={() =>
                    setEditingTeacher({
                      ...t,
                      name: t.user?.name || "",
                      phone: t.user?.phone || t.phone || "",
                    })
                  }
                  className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-indigo-600 transition"
                  title="Edit Teacher"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                {t.user?.email && (
                  <a
                    href={`mailto:${t.user.email}?subject=NEETVIDYA Faculty Communication`}
                    className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-blue-600 transition"
                    title={`Email ${t.user.name}`}
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Teacher Modal */}
      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-100">
              <h2 className="font-extrabold text-xl text-slate-900">Add New Teacher</h2>
              <p className="text-slate-500 text-sm mt-1">A temporary password will be generated and emailed.</p>
            </div>
            <form onSubmit={handleCreate} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Full Name *</label>
                  <input required value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition" placeholder="Teacher's full name (with Dr./Prof.)" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Email *</label>
                  <input required type="email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition" placeholder="teacher@neetvidya.com" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Phone</label>
                  <input value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition" placeholder="+91 XXXXX XXXXX" />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Qualification</label>
                  <input value={form.qualification} onChange={(e) => setForm((f) => ({ ...f, qualification: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition" placeholder="e.g. M.Sc Physics, B.Ed" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Experience</label>
                  <input value={form.experience} onChange={(e) => setForm((f) => ({ ...f, experience: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition" placeholder="e.g. 10+ Years in NEET Coaching" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Specialisation</label>
                  <input value={form.specialisation} onChange={(e) => setForm((f) => ({ ...f, specialisation: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition" placeholder="e.g. Mechanics & Electromagnetism" />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Short Bio</label>
                  <textarea value={form.bio} onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))} rows={3}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition resize-none" placeholder="Brief professional bio..." />
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowCreate(false)}
                  className="flex-1 py-2.5 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition">
                  Cancel
                </button>
                <button type="submit" disabled={creating}
                  className="flex-1 py-2.5 bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white font-bold rounded-xl transition shadow-sm">
                  {creating ? "Creating..." : "Add Teacher"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Teacher Details Modal */}
      {viewingTeacher && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white rounded-t-2xl">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-extrabold text-xl shadow-md">
                  {viewingTeacher.user?.name?.charAt(0)?.toUpperCase() || "T"}
                </div>
                <div>
                  <h3 className="font-extrabold text-lg text-slate-900">{viewingTeacher.user?.name}</h3>
                  <p className="text-xs text-slate-500">{viewingTeacher.user?.email}</p>
                </div>
              </div>
              <button
                onClick={() => setViewingTeacher(null)}
                className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-sm">
              <div className="flex items-center gap-2">
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${viewingTeacher.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
                  {viewingTeacher.isActive ? "● Active Faculty" : "● Inactive"}
                </span>
                {viewingTeacher.specialisation && (
                  <span className="text-xs bg-indigo-50 text-indigo-700 font-semibold px-2.5 py-1 rounded-full border border-indigo-100">
                    {viewingTeacher.specialisation}
                  </span>
                )}
              </div>

              <div className="space-y-2.5 bg-slate-50 p-4 rounded-xl border border-slate-100">
                {viewingTeacher.qualification && (
                  <div className="flex items-start gap-2">
                    <GraduationCap className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs text-slate-400 block">Qualification</span>
                      <span className="font-semibold text-slate-700">{viewingTeacher.qualification}</span>
                    </div>
                  </div>
                )}
                {viewingTeacher.experience && (
                  <div className="flex items-start gap-2">
                    <Clock className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs text-slate-400 block">Experience</span>
                      <span className="font-semibold text-slate-700">{viewingTeacher.experience}</span>
                    </div>
                  </div>
                )}
                {viewingTeacher.user?.phone && (
                  <div className="flex items-start gap-2">
                    <Phone className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs text-slate-400 block">Phone</span>
                      <span className="font-semibold text-slate-700">{viewingTeacher.user.phone}</span>
                    </div>
                  </div>
                )}
              </div>

              {viewingTeacher.bio && (
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Bio</span>
                  <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100 leading-relaxed italic">
                    "{viewingTeacher.bio}"
                  </p>
                </div>
              )}
            </div>

            <div className="p-6 border-t border-slate-100 flex gap-3">
              <button
                onClick={() => setViewingTeacher(null)}
                className="flex-1 py-2.5 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const t = viewingTeacher;
                  setViewingTeacher(null);
                  setEditingTeacher({
                    ...t,
                    name: t.user?.name || "",
                    phone: t.user?.phone || t.phone || "",
                  });
                }}
                className="flex-1 py-2.5 bg-green-600 hover:bg-green-700 text-white text-sm font-bold rounded-xl transition shadow-sm"
              >
                Edit Faculty
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Teacher Modal */}
      {editingTeacher && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white rounded-t-2xl">
              <div>
                <h2 className="font-extrabold text-xl text-slate-900">Edit Faculty Profile</h2>
                <p className="text-slate-500 text-xs mt-0.5">Update credentials and contact information.</p>
              </div>
              <button
                onClick={() => setEditingTeacher(null)}
                className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSaveEdit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Full Name *</label>
                  <input
                    required
                    value={editingTeacher.name}
                    onChange={(e) => setEditingTeacher((prev) => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Phone</label>
                  <input
                    value={editingTeacher.phone || ""}
                    onChange={(e) => setEditingTeacher((prev) => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Experience</label>
                  <input
                    value={editingTeacher.experience || ""}
                    onChange={(e) => setEditingTeacher((prev) => ({ ...prev, experience: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition"
                    placeholder="e.g. 10+ Years"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Qualification</label>
                  <input
                    value={editingTeacher.qualification || ""}
                    onChange={(e) => setEditingTeacher((prev) => ({ ...prev, qualification: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Specialisation</label>
                  <input
                    value={editingTeacher.specialisation || ""}
                    onChange={(e) => setEditingTeacher((prev) => ({ ...prev, specialisation: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Short Bio</label>
                  <textarea
                    rows={3}
                    value={editingTeacher.bio || ""}
                    onChange={(e) => setEditingTeacher((prev) => ({ ...prev, bio: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition resize-none"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingTeacher(null)}
                  className="flex-1 py-2.5 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingEdit}
                  className="flex-1 py-2.5 bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white font-bold rounded-xl transition shadow-sm inline-flex items-center justify-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  {savingEdit ? "Saving..." : "Save Profile"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
```

---

# FILE: `client\src\pages\errors\NotFound.jsx`

```jsx
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-soft p-4">
      <div className="text-center space-y-4">
        <h1 className="font-heading font-extrabold text-7xl text-brand-dark">404</h1>
        <p className="text-gray-600">The medical resource or page you requested could not be located.</p>
        <Link to="/" className="btn-primary text-sm !py-2.5 !px-6">Return to Home</Link>
      </div>
    </div>
  );
}
```

---

# FILE: `client\src\pages\errors\Unauthorized.jsx`

```jsx
import { Link } from "react-router-dom";

export default function Unauthorized() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-soft p-4">
      <div className="text-center space-y-4">
        <h1 className="font-heading font-extrabold text-7xl text-rose-600">403</h1>
        <h2 className="font-heading font-bold text-2xl text-brand-dark">Restricted Portal Area</h2>
        <p className="text-gray-600">You do not have the required role privileges to view this section.</p>
        <Link to="/login" className="btn-primary text-sm !py-2.5 !px-6">Sign In with Permitted Account</Link>
      </div>
    </div>
  );
}
```

---

# FILE: `client\src\pages\public\AboutPage.jsx`

```jsx
import images from "../../config/images";
import { CheckCircle2, ShieldCheck, Target, Award } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Intro Section */}
      <section className="section-padding bg-brand-soft border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-bold text-brand-green uppercase tracking-widest">About NEETVIDYA</span>
              <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-brand-dark mt-2 mb-6 leading-tight">
                Focused NEET preparation with structured academic guidance
              </h1>
              <p className="text-gray-600 text-base leading-relaxed mb-4">
                NEETVIDYA is organized around a clear NEET preparation model: concept-driven learning, regular practice, and guided support for students preparing for competitive medical entrance goals.
              </p>
              <p className="text-gray-600 text-base leading-relaxed mb-6">
                The institute currently operates with faculty-led mentoring, admin-managed course publishing, and batch-based academic planning for students seeking consistent preparation support.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-white rounded-xl border border-gray-100">
                  <h4 className="font-extrabold text-2xl text-brand-green">NEET</h4>
                  <p className="text-xs text-gray-500 font-medium">Core academic focus</p>
                </div>
                <div className="p-4 bg-white rounded-xl border border-gray-100">
                  <h4 className="font-extrabold text-2xl text-brand-green">Batch</h4>
                  <p className="text-xs text-gray-500 font-medium">Based learning model</p>
                </div>
              </div>
            </div>
            <div>
              <img src={images.aboutInstitute} alt="Institute Campus" className="rounded-2xl shadow-xl border border-gray-200" />
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-xl mx-auto mb-16">
            <h2 className="font-heading font-extrabold text-3xl text-brand-dark">The NEETVIDYA Pillars</h2>
            <p className="text-sm text-gray-500 mt-2">Every feature in our platform is engineered around these fundamentals</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="card">
              <ShieldCheck className="w-8 h-8 text-brand-green mb-4" />
              <h3 className="font-heading font-bold text-xl mb-2">Concept-first learning</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Students are guided through core concepts and regular revision to build confidence in the subject areas most relevant to NEET preparation.
              </p>
            </div>
            <div className="card">
              <Target className="w-8 h-8 text-brand-lime text-brand-dark mb-4" />
              <h3 className="font-heading font-bold text-xl mb-2">Error Tracking</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Students are encouraged to keep a structured record of mistakes and weak areas so learning remains targeted and improvement is measurable over time.
              </p>
            </div>
            <div className="card">
              <Award className="w-8 h-8 text-brand-green mb-4" />
              <h3 className="font-heading font-bold text-xl mb-2">Practice Under Timed Conditions</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Timed practice sessions help students become comfortable with exam-style pressure and improve their confidence in competitive preparation.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
```

---

# FILE: `client\src\pages\public\ContactPage.jsx`

```jsx

import { useState } from "react";
import api from "../../config/api";
import { alertSuccess, alertError } from "../../utils/alert";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  GraduationCap,
  MessageCircle,
  ArrowUpRight,
  Clock,
  Navigation,
} from "lucide-react";
import WhatsAppLink from "../../components/shared/WhatsAppLink";
import TelegramLink from "../../components/shared/TelegramLink";
import useContactSettings from "../../hooks/useContactSettings";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const { settings } = useContactSettings();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("/enquiries", form);

      alertSuccess(
        "Enquiry submitted! Our admissions counselor will call you within 24 hours."
      );

      setForm({
        name: "",
        email: "",
        phone: "",
        course: "",
        message: "",
      });
    } catch (err) {
      alertError("Failed to submit enquiry. Please call us directly.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-gray-200 bg-gray-50/70 px-4 py-3 text-sm text-gray-800 outline-none transition-all duration-200 placeholder:text-gray-400 hover:border-gray-300 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10";

  const labelClass =
    "mb-2 block text-xs font-bold uppercase tracking-wider text-gray-600";

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#f5f8f6] py-14 sm:py-20 lg:py-24">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-emerald-200/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-teal-200/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mx-auto mb-12 max-w-2xl text-center sm:mb-16">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-2 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-800">
              Connect With Us
            </span>
          </div>

          <h1 className="font-heading text-3xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            Your NEET Journey
            <span className="mt-1 block text-emerald-700">
              Starts Here.
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-gray-600 sm:text-base">
            Speak with our academic mentors regarding course eligibility,
            batch timing, and fee assistance. We are here to help you take
            the next step towards your dream.
          </p>
        </div>

        {/* Contact Details and Enquiry Form */}
        <div className="grid items-start gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Left: Contact Information */}
          <div className="space-y-6 lg:col-span-5">
            {/* Campus Card */}
            <div className="overflow-hidden rounded-3xl border border-gray-200/80 bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg">
              <div className="relative overflow-hidden bg-gradient-to-br from-emerald-800 via-emerald-700 to-teal-800 p-6 text-white sm:p-8">
                <div className="pointer-events-none absolute -right-8 -top-12 h-40 w-40 rounded-full border-[24px] border-white/5" />

                <div className="relative flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/20">
                    <GraduationCap className="h-6 w-6" />
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-emerald-100">
                      Visit Us
                    </p>
                    <h2 className="mt-1 font-heading text-xl font-bold sm:text-2xl">
                      Institute Campus
                    </h2>
                  </div>
                </div>
              </div>

              <div className="space-y-5 p-6 sm:p-8">
                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                    <MapPin className="h-5 w-5" />
                  </div>

                  <div className="min-w-0 pt-1">
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                      Our Address
                    </p>
                    <p className="mt-1 text-sm font-medium leading-6 text-gray-700">
                      NEETVIDYA COACHING CENTER, Karimpur Main Road,
                      Karimpur, Nadia
                    </p>
                  </div>
                </div>

                <div className="h-px bg-gray-100" />

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                    <Phone className="h-5 w-5" />
                  </div>

                  <div className="min-w-0 pt-1">
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                      Call Us
                    </p>
                    <p className="mt-1 break-words text-sm font-semibold text-gray-700">
                      {settings.institutePhone ||
                        "+91 74396 85658 / +91 83910 21878"}
                    </p>
                  </div>
                </div>

                <div className="h-px bg-gray-100" />

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                    <Mail className="h-5 w-5" />
                  </div>

                  <div className="min-w-0 pt-1">
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                      Email Us
                    </p>
                    <p className="mt-1 break-all text-sm font-semibold text-gray-700">
                      {settings.instituteEmail || "neetvidya720@gmail.com"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Chat Channels */}
            <div className="relative overflow-hidden rounded-3xl border border-emerald-200/70 bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-6 shadow-sm sm:p-8">
              <div className="pointer-events-none absolute -bottom-12 -right-10 h-36 w-36 rounded-full bg-emerald-100/60 blur-2xl" />

              <div className="relative">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-sm">
                    <MessageCircle className="h-5 w-5" />
                  </div>

                  <div>
                    <h3 className="font-heading text-lg font-bold text-gray-900">
                      Direct Chat Channels
                    </h3>
                    <p className="mt-1 text-xs text-emerald-700">
                      We are just a message away
                    </p>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-3 rounded-xl border border-emerald-100 bg-white px-4 py-3 transition-colors hover:border-emerald-300">
                    <WhatsAppLink
                      number={settings.whatsappNumber}
                      message={settings.whatsappDefaultMessage}
                      label="Chat with Counselor on WhatsApp"
                      className="flex-1 text-sm font-semibold text-emerald-700 hover:text-emerald-900"
                    />
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-emerald-600" />
                  </div>

                  {settings.whatsappGroupLink && (
                    <a
                      href={settings.whatsappGroupLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 rounded-xl border border-emerald-100 bg-white px-4 py-3 text-sm font-semibold text-emerald-700 transition-colors hover:border-emerald-300 hover:text-emerald-900"
                    >
                      <span className="flex-1">Join WhatsApp Group</span>
                      <ArrowUpRight className="h-4 w-4 shrink-0" />
                    </a>
                  )}

                  <div className="flex items-center gap-3 rounded-xl border border-sky-100 bg-white px-4 py-3 transition-colors hover:border-sky-300">
                    <TelegramLink
                      url={settings.telegramChannelLink}
                      label="Join Telegram Channel"
                      className="flex-1 text-sm font-semibold text-sky-700 hover:text-sky-900"
                    />
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-sky-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Enquiry Form */}
          <div className="lg:col-span-7">
            <div className="overflow-hidden rounded-3xl border border-gray-200/80 bg-white shadow-lg shadow-gray-200/40">
              {/* Form Heading */}
              <div className="border-b border-gray-100 bg-gradient-to-r from-white to-emerald-50/50 px-6 py-7 sm:px-10 sm:py-9">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                    <Send className="h-5 w-5" />
                  </div>

                  <div>
                    <h2 className="font-heading text-xl font-bold text-gray-900 sm:text-2xl">
                      Send an Admission Enquiry
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-gray-500">
                      Fill in your details below and our team will get back
                      to you promptly.
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-2">
                  <span className="h-1.5 w-10 rounded-full bg-emerald-600" />
                  <span className="h-1.5 w-5 rounded-full bg-emerald-200" />
                  <span className="h-1.5 w-2 rounded-full bg-emerald-100" />
                </div>
              </div>

              {/* Form Fields */}
              <form
                onSubmit={handleSubmit}
                className="space-y-6 p-6 sm:p-10"
              >
                {/* Name and Phone */}
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className={labelClass}>
                      Student Full Name
                    </label>

                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      placeholder="e.g. Priya Das"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>
                      Contact Phone
                    </label>

                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) =>
                        setForm({ ...form, phone: e.target.value })
                      }
                      placeholder="+91 98765 XXXXX"
                      className={inputClass}
                    />
                  </div>
                </div>

                {/* Email and Course */}
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className={labelClass}>
                      Email Address
                    </label>

                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      placeholder="priya@gmail.com"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>
                      Target Program
                    </label>

                    <select
                      value={form.course}
                      onChange={(e) =>
                        setForm({ ...form, course: e.target.value })
                      }
                      className={`${inputClass} cursor-pointer`}
                    >
                      <option value="">Select a program</option>
                      <option value="12th Batch – SANKALP">
                        12th Batch – SANKALP
                      </option>
                      <option value="11th Batch – UDAAN">
                        11th Batch – UDAAN
                      </option>
                      <option value="Admin-managed course">
                        Admin-managed course
                      </option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className={labelClass}>
                    Message / Current Status
                  </label>

                  <textarea
                    rows={5}
                    required
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                    placeholder="Tell us about your current class, target NEET score, and any specific queries..."
                    className={`${inputClass} resize-none leading-6`}
                  />

                  <p className="mt-2 text-xs text-gray-400">
                    Share your questions so our academic team can guide you
                    better.
                  </p>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="group flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-emerald-700 to-emerald-600 px-6 py-4 text-sm font-bold text-white shadow-md shadow-emerald-700/20 transition-all duration-200 hover:-translate-y-0.5 hover:from-emerald-800 hover:to-emerald-700 hover:shadow-lg hover:shadow-emerald-700/25 focus:outline-none focus:ring-4 focus:ring-emerald-500/20 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                >
                  {loading ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Submitting Enquiry...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      Submit Admission Enquiry
                    </>
                  )}
                </button>

                <p className="text-center text-xs leading-5 text-gray-400">
                  Your details will be used to respond to your admission
                  enquiry.
                </p>
              </form>
            </div>
          </div>
        </div>

        {/* Google Maps Location */}
        <div className="mt-12 sm:mt-16">
          <div className="overflow-hidden rounded-3xl border border-gray-200/80 bg-white shadow-lg shadow-gray-200/40">
            {/* Map Header */}
            <div className="flex flex-col gap-5 border-b border-gray-100 bg-gradient-to-r from-white to-emerald-50/50 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                  <MapPin className="h-6 w-6" />
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-emerald-700">
                    Find Our Location
                  </p>

                  <h2 className="mt-1 font-heading text-xl font-extrabold text-gray-900 sm:text-2xl">
                    NEETVIDYA COACHING CENTER
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Karimpur Main Road, Karimpur, Nadia
                  </p>
                </div>
              </div>

              <a
                href="https://maps.app.goo.gl/w8qdwchcmCKUuiBA8"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 self-start rounded-xl bg-emerald-700 px-5 py-3 text-sm font-bold text-white shadow-md shadow-emerald-700/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-emerald-800 hover:shadow-lg sm:self-center"
              >
                <Navigation className="h-4 w-4" />
                Get Directions
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>

            {/* Embedded Google Map */}
            <div className="relative h-[300px] w-full overflow-hidden bg-gray-100 sm:h-[400px] lg:h-[460px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3645.389904738659!2d88.62802537541862!3d23.982004878513003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f95b496d5aa2a3%3A0xf782e256576893df!2sNEETVIDYA%20COACHING%20CENTER!5e0!3m2!1sen!2sin!4v1789449477986!5m2!1sen!2sin"
                title="NEETVIDYA COACHING CENTER Google Maps Location"
                className="absolute inset-0 h-full w-full border-0"
                loading="lazy"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>

            {/* Map Footer */}
            <div className="flex flex-col gap-2 border-t border-gray-100 bg-white px-6 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <MapPin className="h-4 w-4 shrink-0 text-emerald-600" />
                <span>
                  Visit us for admission enquiries and academic guidance.
                </span>
              </div>

              <a
                href="https://maps.app.goo.gl/w8qdwchcmCKUuiBA8"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-emerald-700 transition-colors hover:text-emerald-900"
              >
                View on Google Maps →
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Note */}
        <div className="mt-10 text-center">
          <p className="text-xs text-gray-400">
            NEETVIDYA Coaching Center · Your partner in NEET preparation
          </p>
        </div>
      </div>
    </section>
  );
}
```

---

# FILE: `client\src\pages\public\CoursesPage.jsx`

```jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../config/api";
import { CheckCircle, ArrowRight, Layers, Clock, Users } from "lucide-react";

// Batch = Course on this platform. This page showcases the institute's batches.
export default function CoursesPage() {
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/batches")
      .then(({ data }) => setBatches(data.data?.batches || []))
      .catch(() => setBatches([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="section-padding bg-brand-soft min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-brand-green uppercase tracking-widest">Batches & Programs</span>
          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-brand-dark mt-2">NEET Program Catalog</h1>
          <p className="text-gray-600 text-sm sm:text-base mt-3">
            Browse the institute's batches. Each batch is a complete course with its own study
            materials and exams.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="w-10 h-10 border-4 border-brand-green border-t-transparent rounded-full animate-spin mx-auto" />
          </div>
        ) : batches.length === 0 ? (
          <div className="text-center py-20 text-gray-600">
            <p className="font-semibold text-brand-dark mb-2">No batches are currently published.</p>
            <p className="text-sm text-gray-500">Batches created in the admin panel appear here automatically.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {batches.map((batch) => (
              <div key={batch._id} className="card card-hover flex-col justify-between border-gray-200">
                <div>
                  <div
                    className="h-2 rounded-full mb-5"
                    style={{ backgroundColor: batch.color || "#18A66A" }}
                  />
                  <div className="flex items-center gap-2 mb-2">
                    <span className="badge bg-brand-black/5 text-brand-dark border-gray-200">
                      {batch.batchType?.replace(/_/g, " ") || "NEET UG"}
                    </span>
                    {batch.academicYear && (
                      <span className="text-[11px] text-gray-500">{batch.academicYear}</span>
                    )}
                  </div>

                  <h2 className="font-heading font-bold text-2xl text-brand-dark mb-2">{batch.name}</h2>
                  <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                    {batch.schedule || "Full NEET syllabus coverage with daily practice and mock tests."}
                  </p>

                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2 text-xs text-gray-700">
                      <Users className="w-4 h-4 text-brand-green shrink-0" />
                      <span>{batch.students?.length || 0} students enrolled</span>
                    </div>
                    {batch.capacity ? (
                      <div className="flex items-center gap-2 text-xs text-gray-700">
                        <CheckCircle className="w-4 h-4 text-brand-green shrink-0" />
                        <span>Limited to {batch.capacity} seats</span>
                      </div>
                    ) : null}
                    {batch.schedule && (
                      <div className="flex items-center gap-2 text-xs text-gray-700">
                        <Clock className="w-4 h-4 text-brand-green shrink-0" />
                        <span>{batch.schedule}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-5 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-gray-500 block">Batch Code</span>
                    <span className="font-mono font-bold text-brand-dark">{batch.code || "—"}</span>
                  </div>
                  <Link to="/register" className="btn-primary text-sm !py-2.5 !px-5">
                    Join Batch <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

```

---

# FILE: `client\src\pages\public\FacultyPage.jsx`

```jsx

import { useState, useEffect } from "react";
import api from "../../config/api";
import images from "../../config/images";

export default function FacultyPage() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/teachers/public")
      .then(({ data }) => setTeachers(data.data?.teachers || []))
      .catch(() => setTeachers([]))
      .finally(() => setLoading(false));
  }, []);
  return (
    <main className="relative min-h-screen overflow-hidden bg-brand-soft">
      {/* Decorative background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 right-0 h-96 w-96 rounded-full bg-brand-green/10 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-20 -left-32 h-80 w-80 rounded-full bg-emerald-200/20 blur-3xl"
      />

      <section className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">

        {/* Hero section */}
        <div className="mx-auto mb-14 max-w-3xl text-center sm:mb-20">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-green/20 bg-white/80 px-4 py-2 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-brand-green" />

            <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-green">
              The People Behind Your Success
            </span>
          </div>

          <h1 className="font-heading text-4xl font-extrabold leading-tight tracking-tight text-brand-dark sm:text-5xl lg:text-6xl">
            Meet the
            <span className="mt-1 block text-brand-green">
              Faculty Team.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
            The current faculty profile includes the mentors actively guiding the institute's NEET preparation programs and academic support.
          </p>

          <div className="mx-auto mt-8 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-brand-green/40" />
            <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
            <span className="h-px w-10 bg-brand-green/40" />
          </div>
        </div>

        {/* Faculty cards */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-10 h-10 border-4 border-brand-green border-t-transparent rounded-full animate-spin" />
          </div>
        ) : teachers.length === 0 ? (
          <div className="text-center py-20 text-slate-500">
            <p className="font-semibold text-lg text-brand-dark mb-1">No faculty profiles available at the moment</p>
            <p className="text-sm">Please check back soon.</p>
          </div>
        ) : (
          <div className="mx-auto grid max-w-5xl grid-cols-1 items-start gap-8 sm:grid-cols-2 sm:gap-10">
            {teachers.map((teacher) => (
              <article
                key={teacher._id}
                className="group relative overflow-hidden rounded-[2rem] border border-white/80 bg-white p-3 shadow-[0_12px_50px_-20px_rgba(15,23,42,0.18)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_24px_60px_-20px_rgba(15,23,42,0.25)]"
              >
                {/* Full poster image */}
                <div className="overflow-hidden rounded-[1.5rem] bg-white">
                  <img
                    src={teacher.photoUrl || teacher.user?.avatar || images.teacher1}
                    alt={`Faculty profile of ${teacher.user?.name || teacher.name}`}
                    loading="lazy"
                    className="block h-auto w-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </div>

                {/* Faculty information */}
                <div className="px-5 pb-5 pt-6 sm:px-6 sm:pb-6">
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-green">
                        {teacher.specialisation || "Faculty"}
                      </p>

                      <h2 className="font-heading text-2xl font-extrabold leading-tight text-brand-dark sm:text-3xl">
                        {teacher.user?.name || teacher.name}
                      </h2>
                    </div>

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand-green transition-all duration-300 group-hover:bg-brand-green group-hover:text-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M7 17 17 7" />
                        <path d="M7 7h10v10" />
                      </svg>
                    </div>
                  </div>

                  <div className="mt-5 h-px w-full bg-slate-100" />

                  <div className="mt-4 flex items-center justify-between gap-3">
                    <p className="text-sm font-medium text-slate-500">
                      {teacher.qualification || "Guiding your next step."}
                    </p>

                    <span className="whitespace-nowrap text-xs font-bold tracking-wide text-brand-green">
                      NEETVIDYA
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Bottom message */}
        <div className="mx-auto mt-16 max-w-2xl text-center sm:mt-20">
          <p className="font-heading text-xl font-bold text-brand-dark sm:text-2xl">
            Your goals deserve the right guidance.
          </p>

          <p className="mt-3 text-sm leading-6 text-slate-500 sm:text-base">
            Learn with confidence. Prepare with purpose.
          </p>
        </div>
      </section>
    </main>
  );
}
```

---

# FILE: `client\src\pages\public\ForgotPasswordPage.jsx`

```jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../../config/api";
import { Mail, ArrowLeft, SendHorizonal, CheckCircle } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/auth/forgot-password", { email });
      setSubmitted(true);
    } catch {
      // Always show success to prevent email enumeration
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-100 p-10 space-y-8">
        {/* Logo */}
        <div className="text-center">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-400 to-lime-400 flex items-center justify-center font-extrabold text-slate-900 text-2xl mx-auto shadow-lg mb-4">
            NV
          </div>
          <span className="font-extrabold text-lg text-green-600">NEETVIDYA</span>
        </div>

        {!submitted ? (
          <>
            <div>
              <h1 className="font-extrabold text-2xl text-slate-900 text-center">Forgot Password?</h1>
              <p className="text-slate-500 text-sm text-center mt-2">
                Enter your registered email address and we'll send you a secure password reset link.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@example.com"
                    className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-500 transition bg-white shadow-sm"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 active:scale-[0.98] disabled:opacity-60 text-white font-bold py-3.5 rounded-xl transition shadow-md shadow-green-600/25 flex items-center justify-center gap-2"
              >
                <SendHorizonal className="w-4 h-4" />
                {loading ? "Sending Reset Link..." : "Send Reset Link"}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center space-y-5">
            <CheckCircle className="w-14 h-14 text-green-500 mx-auto" />
            <h1 className="font-extrabold text-2xl text-slate-900">Check Your Email</h1>
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-left">
              <p className="text-sm text-green-800">
                If an account exists for <strong>{email}</strong>, we've sent a password reset link.
                The link expires in <strong>1 hour</strong>.
              </p>
            </div>
            <p className="text-slate-500 text-xs">
              Didn't receive it? Check your spam folder or{" "}
              <button
                onClick={() => setSubmitted(false)}
                className="text-green-600 font-semibold hover:underline"
              >
                try again
              </button>
              .
            </p>
          </div>
        )}

        <div className="text-center">
          <Link
            to="/login"
            className="text-sm text-slate-500 hover:text-slate-700 transition inline-flex items-center gap-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
```

---

# FILE: `client\src\pages\public\HomePage.jsx`

```jsx
import { Link } from "react-router-dom";
import { GraduationCap, BookOpen, ClipboardList, Target, ArrowRight, CheckCircle2, Award, Users, Star } from "lucide-react";
import { motion } from "framer-motion";
import images from "../../config/images";
import api from "../../config/api";
import { useState, useEffect } from "react";
import WhatsAppLink from "../../components/shared/WhatsAppLink";
import TelegramLink from "../../components/shared/TelegramLink";
import useContactSettings from "../../hooks/useContactSettings";

export default function HomePage() {
  const [courses, setCourses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const { settings } = useContactSettings();

  useEffect(() => {
    api.get("/courses").then(({ data }) => setCourses(data.data?.courses || [])).catch(() => setCourses([]));
    api.get("/teachers/public").then(({ data }) => setTeachers(data.data.teachers || [])).catch(() => {});
  }, []);

  return (
    <div className="space-y-0">
      {/* Hero Section */}
      <section className="relative bg-brand-black text-white py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-black via-brand-dark/95 to-transparent z-10" />
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-brand-green/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-brand-lime/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-green/20 border border-brand-green/30 text-brand-lime text-xs font-semibold uppercase tracking-wider">
                <Target className="w-3.5 h-3.5" /> NEET-focused academic coaching
              </div>
              <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl leading-[1.1] tracking-tight">
                Learn Better.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-lime to-emerald-400">Prepare Smarter.</span><br />
                Achieve More.
              </h1>
              <p className="text-gray-300 text-base sm:text-lg max-w-xl leading-relaxed">
                NEETVIDYA supports students with concept-based teaching, regular practice, and structured preparation for NEET-focused study goals.
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link to="/register" className="btn-lime text-base !py-3 !px-7 shadow-lg shadow-brand-lime/20">
                  Enroll <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/courses" className="btn-secondary text-base !py-3 !px-6 !border-white/30 !text-white hover:!bg-white/10">
                  View Programs
                </Link>
              </div>

              <div className="pt-6 border-t border-white/10 flex items-center gap-6 text-xs text-gray-400">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-lime" /> Regular Offline & Hybrid
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-lime" /> Daily Practice Papers
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-lime" /> Strict Negative Marking
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-brand-dark">
                <img src={images.aboutInstitute} alt="NEETVIDYA Classroom" className="w-full h-80 sm:h-96 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 bg-brand-black/80 backdrop-blur border border-white/10 p-4 rounded-xl flex items-center justify-between">
                  <div>
                    <p className="text-xs text-brand-lime font-bold uppercase">Admissions Open</p>
                    <p className="text-sm font-bold text-white">Dropper & Class 11, 12 Batches</p>
                  </div>
                  <WhatsAppLink number={settings.whatsappNumber} message={settings.whatsappDefaultMessage} label="Enquire Now" className="text-xs bg-emerald-600 text-white px-3 py-1.5 rounded-lg hover:bg-emerald-700" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Metric Strip */}
      <section className="bg-white py-10 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-brand-green flex items-center justify-center">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-heading font-extrabold text-2xl text-brand-dark">NEET</h4>
                <p className="text-xs text-gray-500 font-medium">Primary focus</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-lime-50 text-brand-dark flex items-center justify-center">
                <ClipboardList className="w-6 h-6 text-brand-green" />
              </div>
              <div>
                <h4 className="font-heading font-extrabold text-2xl text-brand-dark">2</h4>
                <p className="text-xs text-gray-500 font-medium">Core faculty profiles</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-heading font-extrabold text-2xl text-brand-dark">Admin</h4>
                <p className="text-xs text-gray-500 font-medium">Managed programs</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-heading font-extrabold text-2xl text-brand-dark">Batches</h4>
                <p className="text-xs text-gray-500 font-medium">Live institute groups</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="section-padding bg-brand-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-12">
            <div>
              <span className="text-xs font-bold text-brand-green uppercase tracking-widest">Program Listings</span>
              <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-brand-dark mt-1">Published NEET Programs</h2>
            </div>
            <Link to="/courses" className="text-brand-green font-semibold text-sm hover:underline inline-flex items-center gap-1">
              View All Programs <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.length > 0 ? (
              courses.map((course) => (
                <div key={course._id} className="card card-hover flex flex-col justify-between border-gray-200">
                  <div>
                    <div className="h-48 rounded-lg overflow-hidden mb-4 bg-gray-100">
                      <img src={course.coverImageUrl || images.courseNeetFoundation} alt={course.name} className="w-full h-full object-cover" />
                    </div>
                    <span className="badge bg-emerald-100 text-emerald-800 mb-2">{course.targetClass || "All Aspirants"}</span>
                    <h3 className="font-heading font-bold text-xl text-brand-dark mb-2">{course.name}</h3>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-3">{course.description}</p>
                  </div>
                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-gray-500 block">Fees</span>
                      <span className="font-bold text-lg text-brand-dark">₹{course.feeAmount?.toLocaleString() || "Contact"}</span>
                    </div>
                    <Link to="/register" className="btn-primary text-xs !py-2 !px-4">
                      Enroll Now
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center py-12 text-gray-600">
                <p className="font-semibold text-brand-dark mb-2">Courses are managed from the admin panel.</p>
                <p className="text-sm text-gray-500">Publish a course from the admin dashboard to display it on this page.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Teaching Methodology */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-brand-green uppercase tracking-widest">Our Approach</span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-brand-dark mt-2">The NEETVIDYA Preparation Framework</h2>
            <p className="text-gray-600 text-sm mt-3">Concept learning, regular practice, and guided improvement over time</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: "01", title: "NCERT Deep Dive", desc: "Line-by-line concept breakdown in Physics, Chemistry, and Biology." },
              { step: "02", title: "Daily DPP Drills", desc: "Mandatory 30-minute practice papers every evening after classes." },
              { step: "03", title: "CBT Examination", desc: "Simulated exam hall environment with instant negative mark analysis." },
              { step: "04", title: "Personal Mentor Review", desc: "1-on-1 error notebook discussion to guarantee zero repeated mistakes." },
            ].map((item) => (
              <div key={item.step} className="p-6 rounded-2xl bg-brand-soft border border-gray-100 relative group hover:border-brand-green transition-all">
                <span className="font-heading font-extrabold text-3xl text-brand-green/30 group-hover:text-brand-green transition-colors">{item.step}</span>
                <h4 className="font-heading font-bold text-lg text-brand-dark mt-3 mb-2">{item.title}</h4>
                <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Test Series Promo Banner */}
      <section className="section-padding bg-brand-black text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="bg-gradient-to-r from-brand-dark to-gray-900 border border-white/10 p-8 sm:p-12 rounded-3xl grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="badge bg-brand-lime text-brand-black font-bold">Comprehensive Test Series</span>
              <h2 className="font-heading font-extrabold text-3xl sm:text-4xl">NEETVIDYA Computerized Test Engine</h2>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-2xl">
                Experience full-screen exam simulation, Question Palettes, Review tags, and comprehensive solution scorecards with accuracy charts.
              </p>
              <div className="pt-2 flex flex-wrap gap-4">
                <Link to="/test-series" className="btn-primary text-sm">
                  Explore Test Series <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/contact" className="btn-secondary text-sm !border-white/30 !text-white hover:!bg-white/10">
                  Request Sample Papers
                </Link>
              </div>
            </div>
            <div className="lg:col-span-4 flex justify-center">
              <img src={images.testSeriesBanner} alt="Test Series Preview" className="rounded-2xl border border-white/15 shadow-xl max-h-60 object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-brand-soft border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-brand-dark">
            Ready to begin your NEET preparation?
          </h2>
          <p className="text-gray-600 text-sm sm:text-base max-w-xl mx-auto">
            Book a counselling session or register for the next available admission cycle and batch details.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/register" className="btn-primary text-base !py-3 !px-8">
              Register for Admission
            </Link>
            <Link to="/contact" className="btn-secondary text-base !py-3 !px-7">
              Contact Admissions
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
```

---

# FILE: `client\src\pages\public\LoginPage.jsx`

```jsx
import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { alertSuccess, alertError } from "../../utils/alert";
import { LogIn, Eye, EyeOff, BadgeCheck, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const [identifier, setIdentifier] = useState(""); // email or student ID
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await login(identifier.trim(), password);
      alertSuccess(`Welcome back, ${user.name}!`);
      if (user.role === "admin") navigate("/admin");
      else if (user.role === "teacher") navigate("/teacher");
      else navigate("/student");
    } catch (err) {
      const msg = err.response?.data?.message || "Invalid credentials";
      alertError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Left Banner */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#0f172a] items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#0f172a] via-[#1a2e1a] to-[#0f2d0f]" />
          <div className="absolute top-20 left-20 w-72 h-72 bg-green-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-56 h-56 bg-lime-400/10 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-md space-y-8 text-white">
          <div>
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-400 to-lime-400 flex items-center justify-center font-extrabold text-slate-900 text-2xl shadow-lg mb-6">
              NV
            </div>
            <h2 className="font-extrabold text-4xl leading-tight tracking-tight">
              Your NEET Journey<br />
              <span className="text-green-400">Starts Here</span>
            </h2>
            <p className="text-slate-400 mt-4 text-sm leading-relaxed">
              Access personalized study materials, take CBT exams, track your rank improvement, and connect with expert mentors — all in one platform.
            </p>
          </div>

          <div className="space-y-3">
            {[
              "Practice Papers & Mock Tests",
              "Performance Analytics",
              "Lecture Recordings and Notes",
              "Chapter-wise DPPs & Doubt Sessions",
            ].map((feat) => (
              <div key={feat} className="flex items-center gap-3">
                <BadgeCheck className="w-5 h-5 text-green-400 flex-shrink-0" />
                <span className="text-slate-300 text-sm">{feat}</span>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-800">
            <p className="text-slate-500 text-xs">
              Welcome to NEETVIDYA
            </p>
          </div>
        </div>
      </div>

      {/* Right Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          <div>
            <span className="font-extrabold text-xl text-green-600 tracking-tight">NEETVIDYA</span>
            <h1 className="font-extrabold text-3xl text-slate-900 mt-2 tracking-tight">Sign In</h1>
            <p className="text-slate-500 text-sm mt-1">
              Use your registered email address or Student ID (e.g. NV-2026-0001)
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-2">
                Email Address or Student ID
              </label>
              <input
                type="text"
                required
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="name@example.com or NV-2026-0001"
                className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-500 transition-all bg-white shadow-sm"
                autoComplete="username"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-xs text-green-600 hover:text-green-700 font-semibold"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-500 transition-all bg-white shadow-sm pr-12"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 active:scale-[0.98] disabled:opacity-60 text-white font-bold py-3.5 rounded-xl transition-all shadow-md shadow-green-600/25 flex items-center justify-center gap-2"
            >
              <LogIn className="w-4 h-4" />
              {loading ? "Signing in..." : "Sign In to Portal"}
            </button>
          </form>

          <div className="pt-6 border-t border-slate-100 text-center">
            <p className="text-sm text-slate-500">
              New student?{" "}
              <Link
                to="/register"
                className="text-green-600 font-semibold hover:text-green-700 inline-flex items-center gap-1"
              >
                Create an account <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
```

---

# FILE: `client\src\pages\public\RegisterPage.jsx`

```jsx
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { alertError } from "../../utils/alert";
import { UserPlus, Eye, EyeOff, ArrowLeft, CheckCircle, MailCheck, BadgeCheck, ShieldCheck, Smartphone, Sparkles } from "lucide-react";

export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", confirmPassword: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [registered, setRegistered] = useState(false);
  const { register } = useContext(AuthContext);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alertError("Passwords do not match");
      return;
    }
    if (form.password.length < 8) {
      alertError("Password must be at least 8 characters");
      return;
    }
    setLoading(true);
    try {
      await register(form.name, form.email, form.password, form.phone);
      setRegistered(true);
    } catch (err) {
      alertError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (registered) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-100 p-10 text-center space-y-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-400 to-lime-400 flex items-center justify-center font-extrabold text-slate-900 text-2xl mx-auto shadow-lg">
            NV
          </div>
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto">
            <MailCheck className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="font-extrabold text-2xl text-slate-900">Check Your Email</h1>
          <div className="bg-green-50 border border-green-200 rounded-xl p-5 text-left space-y-2">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
              <span className="text-sm font-semibold text-green-800">Account created successfully!</span>
            </div>
            <p className="text-sm text-green-700 leading-relaxed">
              We've sent a verification email to <strong>{form.email}</strong>. Please click the link in the email to activate your account.
            </p>
          </div>
          <p className="text-slate-500 text-xs">
            Didn't receive the email? Check your spam folder or{" "}
            <Link to="/login" className="text-green-600 font-semibold hover:underline">
              try logging in
            </Link>
            {" "}to request a resend.
          </p>
          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 transition"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Left Banner */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#0f172a] items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#0f172a] via-[#1a2e1a] to-[#0f2d0f]" />
          <div className="absolute top-20 right-20 w-64 h-64 bg-green-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-48 h-48 bg-lime-400/10 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-md text-white space-y-8">
          <div>
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-400 to-lime-400 flex items-center justify-center font-extrabold text-slate-900 text-2xl shadow-lg mb-6">
              NV
            </div>
            <h2 className="font-extrabold text-4xl leading-tight">
              Join NEETVIDYA<br />
              <span className="text-green-400">Free Registration</span>
            </h2>
            <p className="text-slate-400 mt-4 text-sm leading-relaxed">
              Create your student account and get immediate access to the learning portal upon verification.
            </p>
          </div>

          <div className="space-y-4">
            {[
              { icon: BadgeCheck, text: "Instant student ID on registration" },
              { icon: MailCheck, text: "Email verification for security" },
              { icon: ShieldCheck, text: "Secure & private data handling" },
              { icon: Smartphone, text: "Access from any device, anytime" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.text} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center text-green-400">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-slate-300 text-sm">{item.text}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <span className="font-extrabold text-xl text-green-600">NEETVIDYA</span>
              <h1 className="font-extrabold text-3xl text-slate-900 mt-2">Create Account</h1>
              <p className="text-slate-500 text-sm mt-1">
                Already have an account?{" "}
                <Link to="/login" className="text-green-600 font-semibold hover:text-green-700">
                  Sign In
                </Link>
              </p>
            </div>
            <Link
              to="/login"
              className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 transition"
            >
              <ArrowLeft className="w-4 h-4" /> Login
            </Link>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                placeholder="Your full name"
                className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-500 transition bg-white shadow-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
                className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-500 transition bg-white shadow-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+91 98765 43210"
                className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-500 transition bg-white shadow-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Minimum 8 characters"
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-500 transition bg-white shadow-sm pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-2">
                Confirm Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                required
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter your password"
                className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-500 transition bg-white shadow-sm"
              />
            </div>

            <p className="text-xs text-slate-400">
              By creating an account, you agree to our{" "}
              <span className="text-green-600 cursor-pointer font-medium">Terms of Service</span> and{" "}
              <span className="text-green-600 cursor-pointer font-medium">Privacy Policy</span>.
            </p>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 active:scale-[0.98] disabled:opacity-60 text-white font-bold py-3.5 rounded-xl transition shadow-md shadow-green-600/25 flex items-center justify-center gap-2"
            >
              <UserPlus className="w-4 h-4" />
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
```

---

# FILE: `client\src\pages\public\ResetPasswordPage.jsx`

```jsx
import { useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import api from "../../config/api";
import { Eye, EyeOff, KeyRound, CheckCircle, XCircle, ShieldCheck } from "lucide-react";
import { alertSuccess } from "../../utils/alert";

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const requirements = [
    { label: "At least 8 characters", valid: password.length >= 8 },
    { label: "Passwords match", valid: password === confirmPassword && confirmPassword.length > 0 },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      await api.post(`/auth/reset-password?token=${token}`, { password });
      setSuccess(true);
      alertSuccess("Password reset successfully!");
      setTimeout(() => navigate("/login"), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Reset failed. The link may have expired.");
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-100 p-10 text-center space-y-5">
          <XCircle className="w-14 h-14 text-red-400 mx-auto" />
          <h1 className="font-extrabold text-2xl text-slate-900">Invalid Reset Link</h1>
          <p className="text-slate-500 text-sm">
            This password reset link is invalid. Please request a new one.
          </p>
          <Link
            to="/forgot-password"
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-3 rounded-xl transition"
          >
            Request New Link
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-100 p-10 space-y-8">
        <div className="text-center">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-400 to-lime-400 flex items-center justify-center font-extrabold text-slate-900 text-2xl mx-auto shadow-lg mb-4">
            NV
          </div>
          <span className="font-extrabold text-lg text-green-600">NEETVIDYA</span>
        </div>

        {!success ? (
          <>
            <div className="text-center">
              <h1 className="font-extrabold text-2xl text-slate-900">Reset Your Password</h1>
              <p className="text-slate-500 text-sm mt-2">
                Choose a strong new password for your account.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-2">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter new password"
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-500 transition bg-white shadow-sm pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-2">
                  Confirm Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-500 transition bg-white shadow-sm"
                />
              </div>

              {/* Requirements */}
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-2">
                {requirements.map((req) => (
                  <div key={req.label} className="flex items-center gap-2 text-xs">
                    {req.valid ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border-2 border-slate-300" />
                    )}
                    <span className={req.valid ? "text-green-700" : "text-slate-500"}>{req.label}</span>
                  </div>
                ))}
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 active:scale-[0.98] disabled:opacity-60 text-white font-bold py-3.5 rounded-xl transition shadow-md shadow-green-600/25 flex items-center justify-center gap-2"
              >
                <KeyRound className="w-4 h-4" />
                {loading ? "Resetting..." : "Reset Password"}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center space-y-5">
            <ShieldCheck className="w-14 h-14 text-green-500 mx-auto" />
            <h1 className="font-extrabold text-2xl text-slate-900">Password Reset!</h1>
            <p className="text-slate-500 text-sm">
              Your password has been updated successfully. Redirecting to login...
            </p>
            <Link
              to="/login"
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-3 rounded-xl transition"
            >
              Sign In →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
```

---

# FILE: `client\src\pages\public\ResultsPage.jsx`

```jsx

import { useState, useEffect } from "react";
import api from "../../config/api";
import { Trophy, Star, Award, Target, BookOpen, GraduationCap } from "lucide-react";

export default function ResultsPage() {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/achievements")
      .then(({ data }) => {
        setAchievements(data.data.achievements || []);
      })
      .catch(() => {
        setAchievements([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-brand-soft">
      {/* Decorative background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 right-0 h-96 w-96 rounded-full bg-brand-green/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">

        {/* Hero section */}
        <section className="mx-auto mb-16 max-w-3xl text-center sm:mb-20">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-green/20 bg-white/80 px-4 py-2 shadow-sm">
            <Trophy className="h-4 w-4 text-brand-green" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-green">
              Student Progress
            </span>
          </div>

          <h1 className="font-heading text-4xl font-extrabold leading-tight tracking-tight text-brand-dark sm:text-5xl lg:text-6xl">
            Progress.
            <span className="mt-1 block text-brand-green">
              Practice. Results.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg">
            NEETVIDYA supports disciplined preparation through structured guidance,
            regular assessment, and continued student improvement over time.
          </p>

          <div className="mx-auto mt-8 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-brand-green/40" />
            <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
            <span className="h-px w-10 bg-brand-green/40" />
          </div>
        </section>

        {/* Achievement section */}
        <section className="mx-auto max-w-6xl">
          <div className="mb-8 flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-green">
                Our Achievements
              </span>

              <h2 className="mt-2 font-heading text-2xl font-extrabold text-brand-dark sm:text-3xl">
                Highlights & Achievements
              </h2>
            </div>

            <div className="inline-flex items-center gap-2 rounded-full border border-brand-green/20 bg-white px-4 py-2 text-xs font-semibold text-brand-green">
              <Star className="h-4 w-4" />
              Every success story matters
            </div>
          </div>

          {loading ? (
            <div className="rounded-3xl border border-gray-200 bg-white p-12 text-center">
              <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-brand-green/20 border-t-brand-green" />
              <p className="mt-4 text-sm text-gray-500">
                Loading achievements...
              </p>
            </div>
          ) : achievements.length > 0 ? (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {achievements.map((item) => (
                <article
                  key={item._id}
                  className="group rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="mb-5 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
                      <Trophy className="h-6 w-6" />
                    </div>

                    <div>
                      <span className="text-xs font-bold text-brand-green">
                        {item.category}
                      </span>
                      <p className="text-xs text-gray-500">
                        Year {item.year}
                      </p>
                    </div>
                  </div>

                  <h3 className="font-heading text-2xl font-extrabold text-brand-dark">
                    {item.title}
                  </h3>

                  {item.score && (
                    <p className="mt-2 text-sm font-semibold text-brand-green">
                      Score / Rank: {item.score}
                    </p>
                  )}

                  <p className="mt-3 text-sm leading-6 text-gray-600">
                    {item.description}
                  </p>

                  {item.studentName && (
                    <div className="mt-5 flex items-center justify-between gap-3 border-t border-gray-100 pt-4 text-xs text-gray-500">
                      <span>
                        Student:{" "}
                        <strong className="text-gray-800">
                          {item.studentName}
                        </strong>
                      </span>
                      <span>{item.studentBatch}</span>
                    </div>
                  )}
                </article>
              ))}
            </div>
          ) : (
            /* Honest empty state */
            <div className="relative overflow-hidden rounded-[2rem] border border-gray-200 bg-white px-6 py-12 text-center shadow-sm sm:px-12 sm:py-16">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-brand-green/5 blur-2xl"
              />

              <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-brand-soft text-brand-green">
                <Award className="h-10 w-10" />
              </div>

              <span className="relative mt-6 inline-block text-xs font-bold uppercase tracking-[0.2em] text-brand-green">
                A New Beginning
              </span>

              <h3 className="relative mt-3 font-heading text-2xl font-extrabold text-brand-dark sm:text-3xl">
                Achievement updates will appear here
              </h3>

              <p className="relative mx-auto mt-4 max-w-xl text-sm leading-7 text-gray-600 sm:text-base">
                As NEETVIDYA adds verified student results and milestone updates, they will be published here in a clear and factual format.
              </p>

              <div className="relative mx-auto mt-8 flex max-w-md flex-wrap justify-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full bg-brand-soft px-4 py-2 text-xs font-semibold text-brand-dark">
                  <BookOpen className="h-4 w-4 text-brand-green" />
                  Learn
                </span>

                <span className="inline-flex items-center gap-2 rounded-full bg-brand-soft px-4 py-2 text-xs font-semibold text-brand-dark">
                  <Target className="h-4 w-4 text-brand-green" />
                  Prepare
                </span>

                <span className="inline-flex items-center gap-2 rounded-full bg-brand-soft px-4 py-2 text-xs font-semibold text-brand-dark">
                  <GraduationCap className="h-4 w-4 text-brand-green" />
                  Achieve
                </span>
              </div>
            </div>
          )}
        </section>

        {/* Closing message */}
        <section className="mx-auto mt-16 max-w-3xl text-center sm:mt-20">
          <h2 className="font-heading text-2xl font-extrabold text-brand-dark sm:text-3xl">
            The next success story could be yours.
          </h2>

          <p className="mt-3 text-sm leading-6 text-gray-600 sm:text-base">
            Start your preparation with dedication, consistency,
            and the right guidance.
          </p>
        </section>

      </div>
    </main>
  );
}
```

---

# FILE: `client\src\pages\public\TestSeriesPage.jsx`

```jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../config/api";
import images from "../../config/images";
import { ClipboardList, Clock, Award, CheckCircle2, ArrowRight } from "lucide-react";

export default function TestSeriesPage() {
  const [exams, setExams] = useState([]);

  useEffect(() => {
    api.get("/exams").then(({ data }) => setExams(data.data.exams || [])).catch(() => {});
  }, []);

  return (
    <div className="section-padding bg-brand-soft min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-brand-green uppercase tracking-widest">Assessment Support</span>
          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-brand-dark mt-2">NEET Practice & Test Series</h1>
          <p className="text-gray-600 text-sm sm:text-base mt-3">
            Students can access exam-style practice assessments and structured tests that are created and managed through the admin panel.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {exams.map((exam) => (
            <div key={exam._id} className="card card-hover flex flex-col justify-between border-gray-200">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="badge bg-purple-100 text-purple-800">{exam.testType}</span>
                  <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">Active Test</span>
                </div>
                <h2 className="font-heading font-bold text-xl text-brand-dark mb-2">{exam.title}</h2>
                <p className="text-xs text-gray-600 mb-6 line-clamp-2">{exam.description || "Comprehensive test based on NEET syllabus."}</p>

                <div className="grid grid-cols-2 gap-3 py-3 border-y border-gray-100 text-xs mb-6">
                  <div>
                    <span className="text-gray-400 block">Questions:</span>
                    <span className="font-bold text-brand-dark">{exam.totalQuestions} MCQs</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block">Duration:</span>
                    <span className="font-bold text-brand-dark">{exam.duration} Minutes</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block">Total Marks:</span>
                    <span className="font-bold text-brand-dark">{exam.totalMarks} Marks</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block">Marking:</span>
                    <span className="font-bold text-brand-dark">+{exam.marksPerCorrect} / -{exam.negativePerWrong}</span>
                  </div>
                </div>
              </div>

              <Link to="/register" className="btn-primary w-full text-center text-sm !py-2.5">
                Register for Access <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

---

# FILE: `client\src\pages\public\VerifyEmailPage.jsx`

```jsx
import { useState, useEffect, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import api from "../../config/api";
import { CheckCircle, XCircle, Loader2, MailCheck, RefreshCw } from "lucide-react";

export default function VerifyEmailPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState("loading"); // loading | success | error | resend | already-verified
  const [resendEmail, setResendEmail] = useState("");
  const [resendLoading, setResendLoading] = useState(false);
  const [resendMsg, setResendMsg] = useState("");
  const requestedRef = useRef(false);

  useEffect(() => {
    if (!token) {
      setStatus("no-token");
      return;
    }

    if (requestedRef.current) return;
    requestedRef.current = true;

    const verify = async () => {
      try {
        await api.get(`/auth/verify-email?token=${token}`);
        setStatus("success");
      } catch (err) {
        if (err.response?.data?.message?.includes("already verified")) {
          setStatus("already-verified");
        } else {
          setStatus("error");
        }
      }
    };
    verify();
  }, [token]);

  const handleResend = async (e) => {
    e.preventDefault();
    setResendLoading(true);
    try {
      await api.post("/auth/resend-verification", { email: resendEmail });
      setResendMsg("Verification email sent! Please check your inbox.");
    } catch (err) {
      setResendMsg(err.response?.data?.message || "Failed to resend. Please try again.");
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-100 p-10 text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-400 to-lime-400 flex items-center justify-center font-extrabold text-slate-900 text-2xl mx-auto shadow-lg">
          NV
        </div>

        {status === "loading" && (
          <>
            <Loader2 className="w-12 h-12 text-green-500 animate-spin mx-auto" />
            <h1 className="font-extrabold text-2xl text-slate-900">Verifying your email...</h1>
            <p className="text-slate-500 text-sm">Please wait a moment.</p>
          </>
        )}

        {(status === "success" || status === "already-verified") && (
          <>
            <CheckCircle className="w-14 h-14 text-green-500 mx-auto" />
            <h1 className="font-extrabold text-2xl text-slate-900">
              {status === "already-verified" ? "Email Already Verified!" : "Email Verified!"}
            </h1>
            <p className="text-slate-500 text-sm">
              {status === "already-verified"
                ? "Your email address is already verified. You can sign in to your NEETVIDYA account."
                : "Your email has been successfully verified. You can now sign in to your NEETVIDYA account."}
            </p>
            <Link
              to="/login"
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-3 rounded-xl transition shadow-md shadow-green-600/25"
            >
              Sign In to Portal →
            </Link>
          </>
        )}

        {(status === "error" || status === "no-token") && (
          <>
            <XCircle className="w-14 h-14 text-red-400 mx-auto" />
            <h1 className="font-extrabold text-2xl text-slate-900">Verification Failed</h1>
            <p className="text-slate-500 text-sm">
              {status === "no-token"
                ? "No verification token found in the link."
                : "This verification link is invalid or has expired (links expire after 24 hours)."}
            </p>

            <div className="bg-slate-50 rounded-xl p-5 text-left border border-slate-200 mt-2">
              <div className="flex items-center gap-2 mb-3">
                <MailCheck className="w-5 h-5 text-green-600" />
                <span className="font-bold text-sm text-slate-800">Request a new verification email</span>
              </div>
              <form onSubmit={handleResend} className="space-y-3">
                <input
                  type="email"
                  required
                  value={resendEmail}
                  onChange={(e) => setResendEmail(e.target.value)}
                  placeholder="Enter your registered email"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-500 transition"
                />
                <button
                  type="submit"
                  disabled={resendLoading}
                  className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white font-bold py-2.5 rounded-lg transition text-sm flex items-center justify-center gap-2"
                >
                  <RefreshCw className={`w-4 h-4 ${resendLoading ? "animate-spin" : ""}`} />
                  {resendLoading ? "Sending..." : "Resend Verification Email"}
                </button>
              </form>
              {resendMsg && (
                <p className="mt-3 text-xs text-center text-slate-600">{resendMsg}</p>
              )}
            </div>
          </>
        )}

        <div className="pt-2">
          <Link to="/" className="text-xs text-slate-400 hover:text-slate-600 transition">
            ← Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
```

---

# FILE: `client\src\pages\student\ExamInstructions.jsx`

```jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Clock, AlertTriangle, ArrowRight } from "lucide-react";
import api from "../../config/api";
import { alertError } from "../../utils/alert";

export default function ExamInstructions() {
  const { examId } = useParams();
  const navigate = useNavigate();
  const [exam, setExam] = useState(null);
  const [agreed, setAgreed] = useState(false);
  const [starting, setStarting] = useState(false);

  useEffect(() => {
    api
      .get(`/exams/${examId}`)
      .then(({ data }) => setExam(data.data?.exam))
      .catch(() => navigate("/student/tests"));
  }, [examId, navigate]);

  const handleStart = async () => {
    setStarting(true);
    try {
      await api.post(`/attempts/exam/${examId}/start`);
      navigate(`/exam/${examId}/attempt`);
    } catch (err) {
      alertError(err.response?.data?.message || "Cannot start exam");
      setStarting(false);
    }
  };

  if (!exam) return null;

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full p-8">
        <h1 className="font-extrabold text-2xl text-slate-900 mb-2">{exam.title}</h1>
        <p className="text-slate-500 text-sm mb-6">{exam.description}</p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <div className="bg-slate-50 rounded-xl p-4 text-center">
            <Clock className="w-5 h-5 mx-auto mb-1 text-blue-600" />
            <div className="font-bold text-lg">{exam.duration} min</div>
            <div className="text-xs text-slate-400">Duration</div>
          </div>
          <div className="bg-slate-50 rounded-xl p-4 text-center">
            <div className="font-bold text-lg">{exam.totalQuestions}</div>
            <div className="text-xs text-slate-400">Questions</div>
          </div>
          <div className="bg-slate-50 rounded-xl p-4 text-center">
            <div className="font-bold text-lg text-green-600">+{exam.marksPerCorrect}</div>
            <div className="text-xs text-slate-400">Correct</div>
          </div>
          <div className="bg-slate-50 rounded-xl p-4 text-center">
            <div className="font-bold text-lg text-red-600">-{exam.negativePerWrong}</div>
            <div className="text-xs text-slate-400">Wrong</div>
          </div>
        </div>

        <div className="bg-amber-50 border-amber-200 rounded-xl p-4 mb-6">
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5" />
            <div className="text-sm text-amber-800">
              <p className="font-bold mb-1">Important Instructions:</p>
              <ul className="list-disc list-inside space-y-1 text-xs">
                <li>Timer starts immediately upon clicking Start</li>
                <li>Test auto-submits when time expires</li>
                <li>Tab switching is recorded</li>
                <li>Only {exam.maxAttempts} attempt(s) allowed</li>
              </ul>
            </div>
          </div>
        </div>

        <label className="flex items-center gap-3 mb-6 cursor-pointer">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="w-4 h-4 rounded accent-green-600"
          />
          <span className="text-sm text-slate-700">
            I have read and understood all instructions
          </span>
        </label>

        <button
          onClick={handleStart}
          disabled={!agreed || starting}
          className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-40 text-white font-bold py-3.5 rounded-xl transition flex items-center justify-center gap-2"
        >
          {starting ? "Starting..." : "Start Examination"} <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
```

---

# FILE: `client\src\pages\student\ExamPage.jsx`

```jsx
import { useState, useEffect, useCallback, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Flag, Eraser, Send, Clock, AlertTriangle } from "lucide-react";
import api from "../../config/api";
import { alertSuccess, alertError, confirmDialog } from "../../utils/alert";

export default function ExamPage() {
  const { examId } = useParams();
  const navigate = useNavigate();
  const [examData, setExamData] = useState(null);
  const [attemptId, setAttemptId] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const saveInterval = useRef(null);

  const startExam = useCallback(async () => {
    try {
      const { data } = await api.post(`/attempts/exam/${examId}/start`);
      const d = data.data;
      setExamData(d);
      setAttemptId(d.attemptId);
      setQuestions(d.questions || []);

      if (d.answers && d.answers.length > 0) {
        setAnswers(d.answers);
      } else {
        setAnswers((d.questions || []).map(() => ({ selectedOption: null, markedForReview: false })));
      }

      const remaining = Math.max(0, Math.floor((new Date(d.serverEndTime) - Date.now()) / 1000));
      setTimeLeft(remaining > 0 ? remaining : (d.duration || 30) * 60);
      setLoading(false);
    } catch (err) {
      alertError(err.response?.data?.message || "Could not initialize exam");
      navigate("/student/tests");
    }
  }, [examId, navigate]);

  useEffect(() => {
    startExam();
    return () => {
      if (saveInterval.current) clearInterval(saveInterval.current);
    };
  }, [startExam]);

  // Periodic Auto-Save
  useEffect(() => {
    if (!attemptId) return;
    saveInterval.current = setInterval(() => {
      api.put(`/attempts/${attemptId}/save`, { answers, currentQuestion: currentQ }).catch(() => {});
    }, 20000);

    return () => clearInterval(saveInterval.current);
  }, [attemptId, answers, currentQ]);

  // Timer Tick
  useEffect(() => {
    if (loading || !attemptId) return;
    if (timeLeft <= 0) {
      submitExam(true);
      return;
    }
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, loading, attemptId]);

  const submitExam = async (auto = false) => {
    if (submitting) return;
    setSubmitting(true);
    if (saveInterval.current) clearInterval(saveInterval.current);

    try {
      await api.put(`/attempts/${attemptId}/save`, { answers, currentQuestion: currentQ }).catch(() => {});
      const { data } = await api.post(`/attempts/${attemptId}/submit`);
      alertSuccess(auto ? "Time expired. Exam auto-submitted." : "Exam submitted successfully!");
      navigate(`/student/results`);
    } catch (err) {
      alertError("Error finalizing exam submission");
      navigate("/student/results");
    } finally {
      setSubmitting(false);
    }
  };

  const selectOption = (optIdx) => {
    const updated = [...answers];
    if (!updated[currentQ]) updated[currentQ] = { selectedOption: null, markedForReview: false };
    updated[currentQ].selectedOption = updated[currentQ].selectedOption === optIdx ? null : optIdx;
    setAnswers(updated);
  };

  const toggleReview = () => {
    const updated = [...answers];
    if (!updated[currentQ]) updated[currentQ] = { selectedOption: null, markedForReview: false };
    updated[currentQ].markedForReview = !updated[currentQ].markedForReview;
    setAnswers(updated);
  };

  const clearResponse = () => {
    const updated = [...answers];
    if (!updated[currentQ]) updated[currentQ] = { selectedOption: null, markedForReview: false };
    updated[currentQ].selectedOption = null;
    setAnswers(updated);
  };

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  const getState = (idx) => {
    const a = answers[idx];
    if (!a) return "UNANSWERED";
    if (a.selectedOption !== null && a.markedForReview) return "ANSWERED_REVIEW";
    if (a.markedForReview) return "MARKED_REVIEW";
    if (a.selectedOption !== null) return "ANSWERED";
    return "UNANSWERED";
  };

  const stateColors = {
    ANSWERED: "bg-emerald-600 text-white font-bold",
    UNANSWERED: "bg-rose-500 text-white font-bold",
    MARKED_REVIEW: "bg-purple-600 text-white font-bold",
    ANSWERED_REVIEW: "bg-purple-600 text-white font-bold ring-2 ring-emerald-400",
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-brand-green border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm font-semibold text-gray-700">Loading Computerized Exam Environment...</p>
        </div>
      </div>
    );
  }

  const question = questions[currentQ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-100">
      {/* Top Serious Bar */}
      <header className="bg-brand-black text-white px-4 sm:px-6 py-3 border-b border-white/10 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <span className="font-heading font-extrabold text-base text-brand-lime">NEETVIDYA CBT</span>
          <span className="hidden sm:inline text-xs text-gray-400">| Standard Marking Pattern</span>
        </div>
        <div className="flex items-center gap-4">
          <div className={`px-3 py-1.5 rounded-lg font-mono text-sm sm:text-base font-bold flex items-center gap-2 ${
            timeLeft < 300 ? "bg-rose-900/80 text-rose-300 animate-pulse border border-rose-500" : "bg-white/10 text-white"
          }`}>
            <Clock className="w-4 h-4 text-brand-lime" />
            {formatTime(timeLeft)}
          </div>
          <button
            onClick={async () => {
              const confirmed = await confirmDialog({
                title: "Submit Examination?",
                text: "Are you sure you want to submit your test now?",
                confirmText: "Yes, submit",
              });
              if (confirmed) {
                submitExam(false);
              }
            }}
            disabled={submitting}
            className="btn-primary text-xs !py-1.5 !px-3 shadow-none bg-emerald-600 hover:bg-emerald-500"
          >
            <Send className="w-3.5 h-3.5" /> Submit Exam
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Left: Question Presentation */}
        <main className="flex-1 p-4 sm:p-6 flex flex-col justify-between">
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-gray-100">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                Question {currentQ + 1} of {questions.length}
              </span>
              <div className="flex gap-2">
                <span className="badge bg-emerald-50 text-emerald-700 border border-emerald-200">+{question?.marks || 4} Marks</span>
                <span className="badge bg-rose-50 text-rose-700 border border-rose-200">-{question?.negativeMarks || 1} Neg</span>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-base sm:text-lg font-medium text-brand-dark leading-relaxed">
                {question?.questionText}
              </p>

              {question?.questionImageUrl && (
                <img src={question.questionImageUrl} alt="Question diagram" className="max-h-64 rounded-xl border border-gray-200" />
              )}
            </div>

            {/* Options */}
            <div className="space-y-3 mt-8">
              {question?.options?.map((opt, idx) => {
                const isSelected = answers[currentQ]?.selectedOption === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => selectOption(idx)}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center gap-3 text-sm font-medium ${
                      isSelected
                        ? "border-brand-green bg-emerald-50/80 text-brand-dark shadow-sm"
                        : "border-gray-200 hover:border-gray-300 bg-white text-gray-700"
                    }`}
                  >
                    <span className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                      isSelected ? "bg-brand-green text-white" : "bg-gray-100 text-gray-600"
                    }`}>
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="leading-snug">{opt.text}</span>
                  </button>
                );
              })}
            </div>

            {/* Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 mt-8 pt-6 border-t border-gray-100">
              <div className="flex gap-2">
                <button
                  onClick={clearResponse}
                  className="px-3 py-1.5 rounded-btn text-xs font-semibold text-gray-600 hover:text-rose-600 border border-gray-200 hover:border-rose-300 transition-colors flex items-center gap-1"
                >
                  <Eraser className="w-3.5 h-3.5" /> Clear Response
                </button>
                <button
                  onClick={toggleReview}
                  className={`px-3 py-1.5 rounded-btn text-xs font-semibold border transition-colors flex items-center gap-1 ${
                    answers[currentQ]?.markedForReview
                      ? "bg-purple-50 text-purple-700 border-purple-300"
                      : "text-gray-600 hover:text-purple-600 border-gray-200 hover:border-purple-300"
                  }`}
                >
                  <Flag className="w-3.5 h-3.5" /> {answers[currentQ]?.markedForReview ? "Marked for Review" : "Mark Review"}
                </button>
              </div>

              <div className="flex gap-2">
                <button
                  disabled={currentQ === 0}
                  onClick={() => setCurrentQ(currentQ - 1)}
                  className="px-4 py-2 bg-white border border-gray-200 rounded-btn text-xs font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-40 transition-colors flex items-center gap-1"
                >
                  <ChevronLeft className="w-4 h-4" /> Previous
                </button>
                {currentQ < questions.length - 1 ? (
                  <button
                    onClick={() => setCurrentQ(currentQ + 1)}
                    className="btn-primary text-xs !py-2 !px-4"
                  >
                    Next Question <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={async () => {
                      const confirmed = await confirmDialog({
                        title: "Submit Final Exam?",
                        text: "Submit final exam responses?",
                        confirmText: "Submit",
                      });
                      if (confirmed) submitExam(false);
                    }}
                    className="btn-lime text-xs !py-2 !px-4"
                  >
                    <Send className="w-3.5 h-3.5" /> Submit Examination
                  </button>
                )}
              </div>
            </div>
          </div>
        </main>

        {/* Right: Question Palette & Status */}
        <aside className="w-full lg:w-80 bg-white border-t lg:border-t-0 lg:border-l border-gray-200 p-6 flex flex-col justify-between">
          <div>
            <h3 className="font-heading font-bold text-sm text-brand-dark mb-4">Question Palette</h3>
            <div className="grid grid-cols-5 gap-2.5 mb-6">
              {questions.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentQ(idx)}
                  className={`w-10 h-10 rounded-lg text-xs font-bold transition-all flex items-center justify-center ${
                    stateColors[getState(idx)]
                  } ${idx === currentQ ? "ring-4 ring-brand-black" : ""}`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>

            {/* Legend */}
            <div className="space-y-2 text-xs text-gray-600 bg-slate-50 p-4 rounded-xl border border-gray-200">
              <div className="flex items-center gap-2.5">
                <span className="w-3.5 h-3.5 bg-emerald-600 rounded" />
                <span>Answered</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-3.5 h-3.5 bg-rose-500 rounded" />
                <span>Unanswered</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-3.5 h-3.5 bg-purple-600 rounded" />
                <span>Marked for Review</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-3.5 h-3.5 bg-purple-600 ring-2 ring-emerald-400 rounded" />
                <span>Answered & Review</span>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-100">
            <button
              onClick={async () => {
                const confirmed = await confirmDialog({
                  title: "Grade Exam?",
                  text: "Ready to complete and grade this exam?",
                  confirmText: "Complete & Grade",
                });
                if (confirmed) submitExam(false);
              }}
              disabled={submitting}
              className="btn-primary w-full text-sm !py-3"
            >
              <Send className="w-4 h-4" /> Finish & View Score
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
```

---

# FILE: `client\src\pages\student\LearnPage.jsx`

```jsx
import { useState, useEffect } from "react";
import api from "../../config/api";
import {
  BookOpen, FileText, Download, ExternalLink, Search,
  ChevronDown, ChevronRight, Layers, FolderOpen,
} from "lucide-react";

export default function LearnPage() {
  const [tree, setTree] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [expandedUnits, setExpandedUnits] = useState({});
  const [expandedChapters, setExpandedChapters] = useState({});

  useEffect(() => {
    fetchTree();
  }, []);

  const fetchTree = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/materials/tree");
      setTree(data.data?.tree || []);
    } catch {
      setTree([]);
    } finally {
      setLoading(false);
    }
  };

  const toggleUnit = (id) => setExpandedUnits((p) => ({ ...p, [id]: !p[id] }));
  const toggleChapter = (id) => setExpandedChapters((p) => ({ ...p, [id]: !p[id] }));

  const q = search.trim().toLowerCase();
  const filteredTree = q
    ? tree
        .map((u) => ({
          ...u,
          chapters: u.chapters
            .map((c) => ({
              ...c,
              materials: c.materials.filter(
                (m) =>
                  m.title?.toLowerCase().includes(q) ||
                  m.description?.toLowerCase().includes(q)
              ),
            }))
            .filter((c) => c.materials.length > 0),
        }))
        .filter((u) => u.chapters.length > 0)
    : tree;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading font-extrabold text-2xl text-brand-dark">Digital Learning Center</h1>
        <p className="text-xs text-gray-500 mt-1">
          Your batch materials, organised as Unit → Chapter → Material.
        </p>
      </div>

      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search materials..."
          className="w-full pl-10 pr-4 py-2.5 border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition bg-white"
        />
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-48">
          <div className="w-9 h-9 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : filteredTree.length === 0 ? (
        <div className="bg-white border-slate-100 rounded-2xl p-12 text-center shadow-sm">
          <BookOpen className="w-12 h-12 text-slate-200 mx-auto mb-4" />
          <h3 className="font-bold text-slate-600 mb-1">No materials available yet</h3>
          <p className="text-slate-400 text-sm">
            Your teachers will publish materials for your batch here.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredTree.map((unit) => {
            const unitOpen = expandedUnits[unit._id] ?? true;
            return (
              <div key={unit._id} className="bg-white border-slate-100 rounded-2xl shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleUnit(unit._id)}
                  className="w-full flex items-center gap-3 p-5 hover:bg-slate-50 transition text-left"
                >
                  {unitOpen ? (
                    <ChevronDown className="w-5 h-5 text-green-600 shrink-0" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-slate-400 shrink-0" />
                  )}
                  <Layers className="w-5 h-5 text-green-600 shrink-0" />
                  <span className="font-bold text-brand-dark">{unit.name}</span>
                  <span className="ml-auto text-xs text-slate-400">
                    {unit.chapters.reduce((n, c) => n + c.materials.length, 0)} materials
                  </span>
                </button>

                {unitOpen && (
                  <div className="border-t border-slate-50">
                    {unit.chapters.map((chapter) => {
                      const chapOpen = expandedChapters[chapter._id] ?? true;
                      return (
                        <div key={chapter._id} className="pl-4 sm:pl-6">
                          <button
                            onClick={() => toggleChapter(chapter._id)}
                            className="w-full flex items-center gap-2 px-5 py-3 bg-slate-50/60 hover:bg-slate-100/60 transition text-left"
                          >
                            {chapOpen ? (
                              <ChevronDown className="w-4 h-4 text-slate-500" />
                            ) : (
                              <ChevronRight className="w-4 h-4 text-slate-400" />
                            )}
                            <FolderOpen className="w-4 h-4 text-slate-400" />
                            <span className="font-semibold text-slate-600 text-sm">{chapter.name}</span>
                            <span className="text-xs text-slate-400 ml-1">({chapter.materials.length})</span>
                          </button>

                          {chapOpen && (
                            <div className="divide-y divide-slate-50">
                              {chapter.materials.map((mat) => (
                                <div key={mat._id} className="flex items-center justify-between gap-4 px-5 py-3 hover:bg-slate-50 transition">
                                  <div className="flex items-center gap-3 min-w-0">
                                    <div className="w-9 h-9 rounded-lg bg-emerald-50 border-emerald-100 flex items-center justify-center shrink-0">
                                      <FileText className="w-4 h-4 text-emerald-600" />
                                    </div>
                                    <div className="min-w-0">
                                      <p className="text-sm font-semibold text-brand-dark truncate">{mat.title}</p>
                                      <p className="text-xs text-gray-400 truncate">
                                        {mat.description || mat.subject?.name || mat.type || "Material"}
                                      </p>
                                    </div>
                                  </div>
                                  <a
                                    href={mat.fileUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition inline-flex items-center gap-1 shrink-0"
                                  >
                                    {mat.fileUrl?.includes("drive.google") || mat.fileUrl?.includes("youtube") ? (
                                      <>
                                        <ExternalLink className="w-3.5 h-3.5" /> Open
                                      </>
                                    ) : (
                                      <>
                                        <Download className="w-3.5 h-3.5" /> View
                                      </>
                                    )}
                                  </a>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

```

---

# FILE: `client\src\pages\student\PerformancePage.jsx`

```jsx
import { useState, useEffect } from "react";
import api from "../../config/api";
import { TrendingUp, Award, Target, Zap } from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export default function PerformancePage() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    api.get("/results/my").then(({ data }) => setResults(data.data.results || [])).catch(() => {});
  }, []);

  const chartData = results.length > 0
    ? results.slice().reverse().map((r, i) => ({
        name: `Test ${i + 1}`,
        score: r.obtainedMarks,
        accuracy: r.accuracy,
      }))
    : [];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading font-extrabold text-2xl text-brand-dark">Student Performance & Accuracy Trend</h1>
        <p className="text-xs text-gray-500 mt-1">Track your scores over time and visualize accuracy improvements across testing cycles.</p>
      </div>

      <div className="grid sm:grid-cols-3 gap-6">
        <div className="card p-6 border-gray-200">
          <div className="flex items-center gap-3 mb-2 text-emerald-600">
            <TrendingUp className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider">Overall Accuracy</span>
          </div>
          <p className="font-heading font-extrabold text-3xl text-brand-dark">84.2%</p>
          <p className="text-xs text-gray-400 mt-1">Across all completed CBT exams</p>
        </div>

        <div className="card p-6 border-gray-200">
          <div className="flex items-center gap-3 mb-2 text-blue-600">
            <Target className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider">Accuracy in Biology</span>
          </div>
          <p className="font-heading font-extrabold text-3xl text-brand-dark">91.0%</p>
          <p className="text-xs text-gray-400 mt-1">Strongest subject area</p>
        </div>

        <div className="card p-6 border-gray-200">
          <div className="flex items-center gap-3 mb-2 text-purple-600">
            <Zap className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider">Avg Speed / MCQ</span>
          </div>
          <p className="font-heading font-extrabold text-3xl text-brand-dark">48 Sec</p>
          <p className="text-xs text-gray-400 mt-1">Target is below 55 sec for NEET</p>
        </div>
      </div>

      <div className="card p-6 sm:p-8 space-y-4">
        <h3 className="font-heading font-bold text-lg text-brand-dark">Score Progression Chart</h3>
        {chartData.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <p className="font-semibold text-gray-500">No test results yet</p>
            <p className="text-xs mt-1">Take tests to see your performance chart here.</p>
          </div>
        ) : (
          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} />
                <Tooltip />
                <Line type="monotone" dataKey="score" stroke="#18A66A" strokeWidth={3} dot={{ r: 5 }} name="Obtained Score" />
                <Line type="monotone" dataKey="accuracy" stroke="#A8C900" strokeWidth={2} dot={{ r: 4 }} name="Accuracy %" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}
```

---

# FILE: `client\src\pages\student\ProfilePage.jsx`

```jsx
import { useState, useEffect, useContext } from "react";
import api from "../../config/api";
import { AuthContext } from "../../context/AuthContext";
import { alertSuccess, alertError } from "../../utils/alert";
import { Camera, Key, Save, BadgeCheck, CheckCircle, Eye, EyeOff } from "lucide-react";

export default function ProfilePage() {
  const { user, updateUser } = useContext(AuthContext);
  const [student, setStudent] = useState(null);
  const [avatarBase64, setAvatarBase64] = useState("");
  const [activeTab, setActiveTab] = useState("profile");
  const [profileForm, setProfileForm] = useState({ name: user?.name || "", phone: user?.phone || "" });
  const [passwordForm, setPasswordForm] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [showPass, setShowPass] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api.get("/students/my").then(({ data }) => {
      setStudent(data.data.student);
      if (data.data.student?.avatarBase64) setAvatarBase64(data.data.student.avatarBase64);
    }).catch(() => {});
  }, []);

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 300 * 1024) { alertError("Image must be under 300KB"); return; }
    const reader = new FileReader();
    reader.onload = async (ev) => {
      const b64 = ev.target.result;
      setAvatarBase64(b64);
      try {
        await api.put("/students/my/avatar", { avatarBase64: b64 });
        alertSuccess("Profile photo updated!");
      } catch { alertError("Failed to save photo"); }
    };
    reader.readAsDataURL(file);
  };

  const handleProfileSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const { data } = await api.put("/auth/profile", profileForm);
      updateUser(data.data.user);
      alertSuccess("Profile updated!");
    } catch (err) {
      alertError(err.response?.data?.message || "Update failed");
    } finally { setSaving(false); }
  };

  const handlePasswordSave = async (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) { alertError("Passwords don't match"); return; }
    if (passwordForm.newPassword.length < 8) { alertError("Password must be at least 8 characters"); return; }
    setSaving(true);
    try {
      await api.put("/auth/change-password", {
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      });
      alertSuccess("Password changed successfully!");
      setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      alertError(err.response?.data?.message || "Failed to change password");
    } finally { setSaving(false); }
  };

  const tabs = [
    { id: "profile", label: "My Profile" },
    { id: "password", label: "Change Password" },
  ];

  return (
    <div className="p-6 space-y-6 max-w-3xl">
      <div>
        <h1 className="font-extrabold text-2xl text-slate-900">Student Profile</h1>
        <p className="text-slate-500 text-sm mt-1">Manage your personal details and account security</p>
      </div>

      {/* ID Card */}
      <div className="bg-gradient-to-br from-[#0f172a] to-[#1a2e1a] rounded-2xl p-6 text-white shadow-xl flex flex-col sm:flex-row items-center gap-6">
        <div className="relative flex-shrink-0">
          <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-white/20 shadow-lg bg-white/10 flex items-center justify-center text-white font-extrabold text-3xl">
            {avatarBase64 ? (
              <img src={avatarBase64} alt="avatar" className="w-full h-full object-cover" />
            ) : (
              user?.name?.[0]?.toUpperCase() || "S"
            )}
          </div>
          <label className="absolute -bottom-1 -right-1 p-1.5 bg-green-500 hover:bg-green-400 text-white rounded-full cursor-pointer shadow transition">
            <Camera className="w-3.5 h-3.5" />
            <input type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} />
          </label>
        </div>
        <div className="text-center sm:text-left flex-1">
          <div className="font-extrabold text-xl">{user?.name}</div>
          <div className="text-white/60 text-sm">{user?.email}</div>
          <div className="flex flex-wrap gap-2 mt-3 justify-center sm:justify-start">
            {student?.studentId && (
              <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-white/10 border border-white/20">
                🪪 {student.studentId}
              </span>
            )}
            {student?.currentClass && (
              <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-green-500/30 border border-green-400/30">
                📚 {student.currentClass}
              </span>
            )}
            {student?.studentType && (
              <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-white/10 border border-white/20">
                {student.studentType.replace(/_/g, " ")}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-slate-100 rounded-xl w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-2 rounded-lg text-sm font-semibold transition ${
              activeTab === tab.id ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "profile" && (
        <div className="bg-white border border-slate-100 rounded-2xl shadow-sm">
          <div className="p-6 border-b border-slate-100">
            <h2 className="font-bold text-slate-900">Personal Information</h2>
            <p className="text-sm text-slate-500">Update your name and contact details</p>
          </div>
          <form onSubmit={handleProfileSave} className="p-6 space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Full Name</label>
                <input
                  value={profileForm.name}
                  onChange={(e) => setProfileForm((f) => ({ ...f, name: e.target.value }))}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Phone Number</label>
                <input
                  value={profileForm.phone}
                  onChange={(e) => setProfileForm((f) => ({ ...f, phone: e.target.value }))}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition"
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Email Address</label>
              <input
                value={user?.email}
                disabled
                className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm bg-slate-50 text-slate-400 cursor-not-allowed"
              />
              <p className="text-xs text-slate-400 mt-1">Contact admin to change email address</p>
            </div>

            {/* Read-only student info */}
            {student && (
              <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                {[
                  { label: "Student ID", value: student.studentId },
                  { label: "Class", value: student.currentClass },
                  { label: "Guardian Name", value: student.parentName },
                  { label: "Guardian Phone", value: student.parentPhone },
                  { label: "School / College", value: student.school },
                  { label: "City", value: student.city },
                ].map((field) => field.value && (
                  <div key={field.label}>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{field.label}</label>
                    <p className="text-sm font-semibold text-slate-700">{field.value}</p>
                  </div>
                ))}
              </div>
            )}

            <button type="submit" disabled={saving}
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white font-bold px-6 py-2.5 rounded-xl transition shadow-sm">
              <Save className="w-4 h-4" />
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </form>
        </div>
      )}

      {activeTab === "password" && (
        <div className="bg-white border border-slate-100 rounded-2xl shadow-sm">
          <div className="p-6 border-b border-slate-100">
            <h2 className="font-bold text-slate-900">Change Password</h2>
            <p className="text-sm text-slate-500">Use a strong password with at least 8 characters</p>
          </div>
          <form onSubmit={handlePasswordSave} className="p-6 space-y-5">
            {["currentPassword", "newPassword", "confirmPassword"].map((field) => (
              <div key={field}>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                  {field === "currentPassword" ? "Current Password" : field === "newPassword" ? "New Password" : "Confirm New Password"}
                </label>
                <div className="relative">
                  <input
                    type={showPass ? "text" : "password"}
                    required
                    value={passwordForm[field]}
                    onChange={(e) => setPasswordForm((f) => ({ ...f, [field]: e.target.value }))}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition pr-12"
                    placeholder="••••••••"
                  />
                  {field === "newPassword" && (
                    <button type="button" onClick={() => setShowPass((v) => !v)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700">
                      {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  )}
                </div>
              </div>
            ))}
            {passwordForm.newPassword && passwordForm.confirmPassword && (
              <div className={`flex items-center gap-2 text-sm ${passwordForm.newPassword === passwordForm.confirmPassword ? "text-green-600" : "text-red-500"}`}>
                <CheckCircle className="w-4 h-4" />
                {passwordForm.newPassword === passwordForm.confirmPassword ? "Passwords match" : "Passwords don't match"}
              </div>
            )}
            <button type="submit" disabled={saving}
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white font-bold px-6 py-2.5 rounded-xl transition shadow-sm">
              <Key className="w-4 h-4" />
              {saving ? "Changing..." : "Change Password"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
```

---

# FILE: `client\src\pages\student\ResultPage.jsx`

```jsx
import { useState, useEffect } from "react";
import api from "../../config/api";
import { Award, CheckCircle, XCircle, Clock, BarChart2, BookOpen } from "lucide-react";

export default function ResultPage() {
  const [results, setResults] = useState([]);
  const [selectedResult, setSelectedResult] = useState(null);
  const [solutions, setSolutions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/results/my")
      .then(({ data }) => {
        const resList = data.data.results || [];
        setResults(resList);
        if (resList.length > 0) {
          viewSolutions(resList[0]);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const viewSolutions = async (resItem) => {
    setSelectedResult(resItem);
    try {
      const { data } = await api.get(`/results/${resItem.attempt}/solutions`);
      setSolutions(data.data.solutions || []);
    } catch {
      setSolutions([]);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading font-extrabold text-2xl text-brand-dark">Examination Results & Scorecards</h1>
        <p className="text-xs text-gray-500 mt-1">Review your accuracy, positive marks, negative marks, and question solutions.</p>
      </div>

      {results.length === 0 ? (
        <div className="card text-center py-16">
          <Award className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="font-semibold text-gray-700">No examination attempts found</p>
          <p className="text-xs text-gray-400 mt-1">Complete a practice test to review your scorecard and accuracy diagnostics.</p>
        </div>
      ) : (
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Attempt List */}
          <div className="lg:col-span-4 space-y-3">
            <h3 className="font-heading font-bold text-sm text-gray-600 uppercase tracking-wider">Completed Tests</h3>
            {results.map((r) => (
              <button
                key={r._id}
                onClick={() => viewSolutions(r)}
                className={`w-full text-left p-4 rounded-xl border transition-all ${
                  selectedResult?._id === r._id ? "bg-white border-brand-green shadow-md" : "bg-white border-gray-200 hover:border-gray-300"
                }`}
              >
                <span className="badge bg-emerald-100 text-emerald-800 text-[10px] mb-1">{r.exam?.testType || "TEST"}</span>
                <h4 className="font-bold text-sm text-brand-dark leading-tight">{r.exam?.title || "Mock Test"}</h4>
                <div className="flex items-center justify-between text-xs text-gray-500 mt-3 pt-2 border-t border-gray-100">
                  <span>Score: <strong className="text-brand-green">{r.obtainedMarks} / {r.totalMarks}</strong></span>
                  <span>Accuracy: <strong>{r.accuracy}%</strong></span>
                </div>
              </button>
            ))}
          </div>

          {/* Detailed Scorecard & Solutions */}
          <div className="lg:col-span-8 space-y-6">
            {selectedResult && (
              <>
                {/* Scorecard Hero */}
                <div className="card bg-gradient-to-r from-brand-dark to-brand-black text-white p-6 sm:p-8">
                  <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
                    <div>
                      <span className="badge bg-brand-lime text-brand-black text-xs font-bold mb-1">Official Scorecard</span>
                      <h2 className="font-heading font-extrabold text-2xl text-white">{selectedResult.exam?.title}</h2>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-gray-400 block">Total Scaled Score</span>
                      <span className="font-heading font-extrabold text-3xl text-brand-lime">
                        {selectedResult.obtainedMarks} <span className="text-lg text-gray-400 font-normal">/ {selectedResult.totalMarks}</span>
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 text-center">
                    <div className="bg-white/5 p-3 rounded-xl">
                      <span className="text-xs text-gray-400 block">Correct</span>
                      <span className="font-bold text-lg text-emerald-400">+{selectedResult.correctCount}</span>
                    </div>
                    <div className="bg-white/5 p-3 rounded-xl">
                      <span className="text-xs text-gray-400 block">Incorrect</span>
                      <span className="font-bold text-lg text-rose-400">-{selectedResult.wrongCount}</span>
                    </div>
                    <div className="bg-white/5 p-3 rounded-xl">
                      <span className="text-xs text-gray-400 block">Unattempted</span>
                      <span className="font-bold text-lg text-gray-300">{selectedResult.unattemptedCount}</span>
                    </div>
                    <div className="bg-white/5 p-3 rounded-xl">
                      <span className="text-xs text-gray-400 block">Accuracy</span>
                      <span className="font-bold text-lg text-brand-lime">{selectedResult.accuracy}%</span>
                    </div>
                  </div>
                </div>

                {/* Solution Review */}
                <div className="space-y-4">
                  <h3 className="font-heading font-bold text-lg text-brand-dark flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-brand-green" /> Detailed Solutions & Explanations
                  </h3>

                  {solutions.map((item, idx) => {
                    const q = item.question;
                    const isCorrect = item.yourAnswer === q.correctAnswer;
                    const isUnattempted = item.yourAnswer === null || item.yourAnswer === undefined;

                    return (
                      <div key={idx} className="card space-y-4 border-gray-200">
                        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                          <span className="text-xs font-bold text-gray-500">Question {idx + 1}</span>
                          <span className={`badge text-[11px] ${
                            isCorrect ? "bg-emerald-100 text-emerald-800" : isUnattempted ? "bg-gray-100 text-gray-700" : "bg-rose-100 text-rose-800"
                          }`}>
                            {isCorrect ? "Correct (+4)" : isUnattempted ? "Unattempted (0)" : "Incorrect (-1)"}
                          </span>
                        </div>

                        <p className="text-sm font-medium text-brand-dark leading-relaxed">{q.questionText}</p>

                        <div className="space-y-2 text-xs">
                          {q.options?.map((opt, optIdx) => {
                            const isSelected = item.yourAnswer === optIdx;
                            const isRight = q.correctAnswer === optIdx;

                            return (
                              <div
                                key={optIdx}
                                className={`p-3 rounded-lg border flex items-center justify-between ${
                                  isRight
                                    ? "bg-emerald-50 border-emerald-400 text-emerald-900 font-semibold"
                                    : isSelected
                                    ? "bg-rose-50 border-rose-300 text-rose-900"
                                    : "bg-white border-gray-200 text-gray-600"
                                }`}
                              >
                                <span>{String.fromCharCode(65 + optIdx)}. {opt.text}</span>
                                {isRight && <CheckCircle className="w-4 h-4 text-emerald-600" />}
                                {!isRight && isSelected && <XCircle className="w-4 h-4 text-rose-600" />}
                              </div>
                            );
                          })}
                        </div>

                        {q.explanation && (
                          <div className="bg-brand-soft p-4 rounded-xl text-xs text-gray-700 border border-gray-200/70">
                            <strong className="text-brand-dark block mb-1">NCERT Concept Explanation:</strong>
                            {q.explanation}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
```

---

# FILE: `client\src\pages\student\StudentDashboard.jsx`

```jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BookOpen, ClipboardList, FileText, TrendingUp, ArrowRight, Clock, GraduationCap } from "lucide-react";
import api from "../../config/api";
import StudentBadge from "../../components/shared/StudentBadge";
import TelegramLink from "../../components/shared/TelegramLink";
import useContactSettings from "../../hooks/useContactSettings";

export default function StudentDashboard() {
  const [student, setStudent] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { settings } = useContactSettings();

  useEffect(() => {
    Promise.all([
      api.get("/students/my"),
      api.get("/dashboard/student"),
    ])
      .then(([studentRes, dashRes]) => {
        setStudent(studentRes.data.data.student);
        setDashboardData(dashRes.data.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const stats = [
    { icon: BookOpen, label: "My Batch", value: student?.batches?.[0]?.name || "Not Assigned", color: "text-blue-600", bg: "bg-blue-50" },
    { icon: ClipboardList, label: "Live Tests", value: `${dashboardData?.upcomingTests?.length || 0} Available`, color: "text-orange-600", bg: "bg-orange-50" },
    { icon: FileText, label: "Study Materials", value: `${dashboardData?.recentMaterials?.length || 0} New`, color: "text-emerald-600", bg: "bg-emerald-50" },
    { icon: TrendingUp, label: "Tests Taken", value: `${dashboardData?.recentResults?.length || 0}`, color: "text-purple-600", bg: "bg-purple-50" },
  ];

  return (
    <div className="space-y-8">
      {/* Batch banner - which batch am I in? */}
      <div className="bg-gradient-to-r from-brand-green to-brand-lime rounded-2xl p-5 text-brand-black shadow-sm flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-white/70 flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-brand-green" />
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider opacity-70">Your Batch / Course</p>
            <p className="font-heading font-extrabold text-lg leading-tight">
              {student?.batches?.[0]?.name || "No batch assigned"}
            </p>
            {student?.batches?.[0]?.code && (
              <p className="text-[11px] font-medium opacity-70">{student.batches[0].code}</p>
            )}
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <StudentBadge batchType={student?.studentType === "REGULAR_ONLINE" ? "ONLINE" : student?.studentType === "HYBRID" ? "HYBRID" : "OFFLINE"} />
        </div>
      </div>

      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-extrabold text-2xl text-brand-dark">
            Hello, {student?.user?.name || "Aspirant"}!
          </h1>
          <p className="text-xs text-gray-500 mt-1">Ready for today's practice?</p>
          <div className="flex flex-wrap items-center gap-3 mt-3">
            <StudentBadge batchType={student?.studentType === "REGULAR_ONLINE" ? "ONLINE" : student?.studentType === "HYBRID" ? "HYBRID" : "OFFLINE"} />
            {student?.batches?.[0] && (
              <span className="text-xs text-gray-500 font-medium">Batch: {student.batches[0].name}</span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <TelegramLink url={settings.telegramChannelLink} label="Doubt Desk" className="text-xs bg-sky-50 text-sky-700 px-3 py-2 rounded-lg border border-sky-200" />
          <Link to="/student/tests" className="btn-primary text-xs !py-2.5 !px-4">
            Start Live Exam <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, i) => (
          <div key={i} className="card p-5 border-gray-200/70">
            <div className="flex items-center gap-3.5">
              <div className={`w-12 h-12 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center shrink-0`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{stat.label}</p>
                <p className="font-heading font-bold text-base text-brand-dark truncate">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Live Tests */}
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="card space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <h3 className="font-heading font-bold text-lg text-brand-dark flex items-center gap-2">
              <ClipboardList className="w-5 h-5 text-brand-green" /> Live Tests
            </h3>
            <Link to="/student/tests" className="text-xs text-brand-green font-semibold hover:underline">View All</Link>
          </div>
          {dashboardData?.upcomingTests?.length > 0 ? (
            <div className="space-y-3">
              {dashboardData.upcomingTests.map((test) => (
                <div key={test._id} className="p-4 rounded-xl bg-brand-soft border border-gray-100 flex items-center justify-between gap-4">
                  <div>
                    <span className="badge bg-emerald-100 text-emerald-800 text-[10px] mb-1">{test.testType}</span>
                    <h4 className="font-semibold text-sm text-brand-dark">{test.title}</h4>
                    <p className="text-xs text-gray-500 mt-0.5">{test.totalQuestions} Questions • {test.duration} Min</p>
                  </div>
                  <Link to={`/exam/${test._id}/instructions`} className="btn-primary text-xs !py-1.5 !px-3 shrink-0">
                    Take Test
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400 text-sm">No live tests available right now.</div>
          )}
        </div>

        {/* Recent Materials */}
        <div className="card space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <h3 className="font-heading font-bold text-lg text-brand-dark flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-brand-green" /> Recent Materials
            </h3>
            <Link to="/student/learn" className="text-xs text-brand-green font-semibold hover:underline">Go to Learn</Link>
          </div>
          {dashboardData?.recentMaterials?.length > 0 ? (
            <div className="space-y-3">
              {dashboardData.recentMaterials.map((mat) => (
                <div key={mat._id} className="p-3.5 rounded-xl bg-brand-soft border border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
                      {mat.fileType || "PDF"}
                    </div>
                    <div>
                      <h5 className="font-semibold text-xs text-brand-dark">{mat.title}</h5>
                      <span className="text-[11px] text-gray-500">{mat.subject?.name || "General"}</span>
                    </div>
                  </div>
                  <a href={mat.fileUrl} target="_blank" rel="noreferrer" className="text-xs text-brand-green font-medium hover:underline">
                    Open
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400 text-sm">No materials uploaded yet.</div>
          )}
        </div>
      </div>
    </div>
  );
}
```

---

# FILE: `client\src\pages\student\TestsPage.jsx`

```jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../config/api";
import { ClipboardList, Clock, ArrowRight, Archive, BookOpen } from "lucide-react";
import Pagination from "../../components/shared/Pagination";

export default function TestsPage() {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);
  const [meta, setMeta] = useState({ total: 0, pages: 1 });

  useEffect(() => {
    setLoading(true);
    api
      .get(`/exams?page=${page}&limit=${limit}`)
      .then(({ data }) => {
        setExams(data.data?.exams || []);
        setMeta({ total: data.data?.total || 0, pages: data.data?.pages || 1 });
      })
      .catch(() => setExams([]))
      .finally(() => setLoading(false));
  }, [page, limit]);

  // Split live/published exams from archived study papers.
  const liveExams = exams.filter((e) => ["LIVE", "PUBLISHED"].includes(e.status));
  const studyExams = exams.filter(
    (e) => ["CLOSED", "ARCHIVED"].includes(e.status) && e.studyVisible
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading font-extrabold text-2xl text-brand-dark">
          Tests & Computerized Exams
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          Exams released to your batch. Secret/unpublished exams never appear here.
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-48">
          <div className="w-9 h-9 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : exams.length === 0 ? (
        <div className="bg-white border-slate-100 rounded-2xl p-12 text-center shadow-sm">
          <ClipboardList className="w-12 h-12 text-slate-200 mx-auto mb-4" />
          <h3 className="font-bold text-slate-600 mb-1">No exams available right now</h3>
          <p className="text-slate-400 text-sm">
            When your teachers publish an exam for your batch, it will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {liveExams.length > 0 && (
            <div className="space-y-4">
              <h2 className="font-heading font-bold text-lg text-brand-dark">Live & Upcoming</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {liveExams.map((exam) => (
                  <div key={exam._id} className="card card-hover flex-col justify-between border-gray-200">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="badge bg-purple-100 text-purple-800">
                          {exam.testType?.replace(/_/g, " ")}
                        </span>
                        <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                          {exam.status === "LIVE" ? "Active" : "Scheduled"}
                        </span>
                      </div>
                      <h3 className="font-heading font-bold text-lg text-brand-dark mb-1">{exam.title}</h3>
                      {exam.batch?.name && (
                        <p className="text-[11px] text-gray-400 mb-2">{exam.batch.name}</p>
                      )}
                      <p className="text-xs text-gray-500 mb-4 line-clamp-2">
                        {exam.instructions || "Standard exam with negative marking."}
                      </p>

                      <div className="grid grid-cols-2 gap-2 bg-brand-soft p-3 rounded-xl text-xs mb-4">
                        <div><span className="text-gray-400">MCQs:</span> <strong className="text-brand-dark">{exam.totalQuestions}</strong></div>
                        <div><span className="text-gray-400">Duration:</span> <strong className="text-brand-dark">{exam.duration} Min</strong></div>
                        <div><span className="text-gray-400">Total Marks:</span> <strong className="text-brand-dark">{exam.totalMarks}</strong></div>
                        <div><span className="text-gray-400">Pattern:</span> <strong className="text-brand-dark">+{exam.marksPerCorrect ?? 4}/-{exam.negativePerWrong ?? 1}</strong></div>
                      </div>
                    </div>

                    <Link
                      to={`/exam/${exam._id}/attempt`}
                      className="btn-primary w-full text-center text-xs !py-2.5 inline-flex items-center justify-center gap-1"
                    >
                      Start Exam Now <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}

          {studyExams.length > 0 && (
            <div className="space-y-4">
              <h2 className="font-heading font-bold text-lg text-brand-dark flex items-center gap-2">
                <Archive className="w-5 h-5 text-purple-600" /> Previous Papers (Study)
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {studyExams.map((exam) => (
                  <div key={exam._id} className="card flex-col justify-between border-gray-200 p-5">
                    <div>
                      <span className="badge bg-purple-100 text-purple-800 mb-2 inline-block">
                        {exam.testType?.replace(/_/g, " ")}
                      </span>
                      <h3 className="font-heading font-bold text-base text-brand-dark mb-1">{exam.title}</h3>
                      <p className="text-xs text-gray-500">
                        {exam.totalQuestions} questions · {exam.duration} min
                      </p>
                    </div>
                    <div className="pt-3 mt-3 border-t border-gray-100 flex items-center gap-1 text-xs text-purple-600 font-semibold">
                      <BookOpen className="w-3.5 h-3.5" /> Available for study
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <Pagination
            page={page}
            totalPages={meta.pages}
            totalItems={meta.total}
            pageSize={limit}
            pageSizeOptions={[12, 24, 48]}
            onPageChange={setPage}
            onPageSizeChange={(n) => {
              setLimit(n);
              setPage(1);
            }}
          />
        </div>
      )}
    </div>
  );
}

```

---

# FILE: `client\src\pages\teacher\TeacherClasses.jsx`

```jsx
import { useState, useEffect } from "react";
import api from "../../config/api";
import { Video, Play, Plus, Search, Clock, Eye, Pencil, Trash2, X, Save, ExternalLink } from "lucide-react";
import { alertSuccess, alertError } from "../../utils/alert";
import ConfirmModal from "../../components/shared/ConfirmModal";

export default function TeacherClasses() {
  const [lectures, setLectures] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [subjectFilter, setSubjectFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [editingLecture, setEditingLecture] = useState(null);
  const [playingLecture, setPlayingLecture] = useState(null);
  const [lectureToDelete, setLectureToDelete] = useState(null);
  const [savingLecture, setSavingLecture] = useState(false);

  const [form, setForm] = useState({
    title: "",
    subject: "",
    videoUrl: "",
    thumbnailUrl: "",
    duration: 45,
    description: "",
  });

  const fetchLectures = async () => {
    try {
      const { data } = await api.get("/lectures");
      setLectures(data.data?.lectures || []);
    } catch {
      setLectures([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchSubjects = async () => {
    try {
      const { data } = await api.get("/academics/subjects");
      setSubjects(data.data?.subjects || []);
    } catch {
      setSubjects([]);
    }
  };

  useEffect(() => {
    fetchLectures();
    fetchSubjects();
  }, []);

  const getEmbedUrl = (url) => {
    if (!url) return "";
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length === 11) {
      return `https://www.youtube.com/embed/${match[2]}?autoplay=1`;
    }
    return url;
  };

  const handleCreateLecture = async (e) => {
    e.preventDefault();
    if (!form.subject) {
      alertError("Please select a subject");
      return;
    }
    setSavingLecture(true);
    try {
      await api.post("/lectures", {
        ...form,
        duration: Number(form.duration || 45),
      });
      alertSuccess("Lecture published successfully");
      setShowAdd(false);
      setForm({
        title: "",
        subject: subjects[0]?._id || "",
        videoUrl: "",
        thumbnailUrl: "",
        duration: 45,
        description: "",
      });
      fetchLectures();
    } catch (err) {
      alertError(err.response?.data?.message || "Failed to publish lecture");
    } finally {
      setSavingLecture(false);
    }
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    if (!editingLecture) return;
    setSavingLecture(true);
    try {
      await api.put(`/lectures/${editingLecture._id}`, {
        title: editingLecture.title,
        subject: editingLecture.subject?._id || editingLecture.subject,
        videoUrl: editingLecture.videoUrl,
        thumbnailUrl: editingLecture.thumbnailUrl,
        duration: Number(editingLecture.duration || 45),
        description: editingLecture.description,
      });
      alertSuccess("Lecture updated successfully");
      setEditingLecture(null);
      fetchLectures();
    } catch (err) {
      alertError(err.response?.data?.message || "Failed to update lecture");
    } finally {
      setSavingLecture(false);
    }
  };

  const confirmDeleteLecture = async () => {
    if (!lectureToDelete) return;
    try {
      await api.delete(`/lectures/${lectureToDelete._id}`);
      alertSuccess("Lecture removed");
      setLectureToDelete(null);
      fetchLectures();
    } catch (err) {
      alertError(err.response?.data?.message || "Failed to delete lecture");
    }
  };

  const filtered = lectures.filter((l) => {
    const matchSearch =
      l.title?.toLowerCase().includes(search.toLowerCase()) ||
      l.subject?.name?.toLowerCase().includes(search.toLowerCase()) ||
      (typeof l.subject === "string" && l.subject.toLowerCase().includes(search.toLowerCase()));
    const matchSubject =
      subjectFilter === "All" ||
      l.subject?._id === subjectFilter ||
      l.subject === subjectFilter;
    return matchSearch && matchSubject;
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-extrabold text-2xl text-slate-900">Classes & Lectures</h1>
          <p className="text-slate-500 text-sm mt-1">Add YouTube or Google Drive lecture links for students</p>
        </div>
        <button
          onClick={() => {
            if (!form.subject && subjects.length > 0) {
              setForm((prev) => ({ ...prev, subject: subjects[0]._id }));
            }
            setShowAdd(true);
          }}
          className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2.5 rounded-xl transition shadow-sm text-sm"
        >
          <Plus className="w-4 h-4" /> Add Lecture
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search lectures by title or topic..."
            className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition bg-white"
          />
        </div>
        <select
          value={subjectFilter}
          onChange={(e) => setSubjectFilter(e.target.value)}
          className="px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 bg-white"
        >
          <option value="All">All Subjects</option>
          {subjects.map((s) => (
            <option key={s._id} value={s._id}>{s.name}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-40">
          <div className="w-8 h-8 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white border border-slate-100 rounded-2xl p-12 text-center shadow-sm">
          <Video className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h3 className="font-bold text-slate-600 mb-1">No lectures uploaded yet</h3>
          <p className="text-slate-400 text-sm">Add your first lecture using the button above.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filtered.map((l) => (
            <div key={l._id} className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition">
              <div className="h-40 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center relative">
                {l.thumbnailUrl ? (
                  <img src={l.thumbnailUrl} alt={l.title} className="w-full h-full object-cover" />
                ) : (
                  <Video className="w-12 h-12 text-slate-600" />
                )}
                <div
                  onClick={() => setPlayingLecture(l)}
                  className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/20 transition cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 text-slate-900 ml-0.5" />
                  </div>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="font-bold text-slate-800 text-base line-clamp-1">{l.title}</h3>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <button
                      onClick={() => setEditingLecture(l)}
                      className="p-1 text-slate-400 hover:text-indigo-600 rounded transition"
                      title="Edit Lecture"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setLectureToDelete(l)}
                      className="p-1 text-slate-400 hover:text-red-500 rounded transition"
                      title="Delete Lecture"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <p className="text-xs text-slate-500 mb-3">{l.subject?.name || l.subject || "General"}</p>
                <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-50">
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {l.duration ? `${l.duration} min` : "—"}</span>
                  <button
                    onClick={() => setPlayingLecture(l)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-green-600 hover:text-green-700"
                  >
                    Watch Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Lecture Modal */}
      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white rounded-t-2xl z-10">
              <div>
                <h2 className="font-extrabold text-xl text-slate-900">Add New Lecture</h2>
                <p className="text-slate-500 text-xs mt-0.5">Embed video lectures for your assigned subjects.</p>
              </div>
              <button
                onClick={() => setShowAdd(false)}
                className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreateLecture} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Lecture Title *</label>
                <input
                  required
                  value={form.title}
                  onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g. Chemical Bonding – Molecular Orbital Theory"
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Subject *</label>
                  <select
                    required
                    value={form.subject}
                    onChange={(e) => setForm((prev) => ({ ...prev, subject: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition bg-white"
                  >
                    <option value="">Select subject</option>
                    {subjects.map((s) => (
                      <option key={s._id} value={s._id}>{s.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Duration (Minutes)</label>
                  <input
                    type="number"
                    min="1"
                    value={form.duration}
                    onChange={(e) => setForm((prev) => ({ ...prev, duration: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Video URL (YouTube / Drive) *</label>
                <input
                  required
                  type="url"
                  value={form.videoUrl}
                  onChange={(e) => setForm((prev) => ({ ...prev, videoUrl: e.target.value }))}
                  placeholder="https://www.youtube.com/watch?v=... or Drive video link"
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Thumbnail Image URL (optional)</label>
                <input
                  type="url"
                  value={form.thumbnailUrl}
                  onChange={(e) => setForm((prev) => ({ ...prev, thumbnailUrl: e.target.value }))}
                  placeholder="https://images.unsplash.com/... or thumbnail URL"
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Description (optional)</label>
                <textarea
                  rows={2}
                  value={form.description}
                  onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Topics covered in this session..."
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition resize-none"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAdd(false)}
                  className="flex-1 py-2.5 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingLecture}
                  className="flex-1 py-2.5 bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white font-bold rounded-xl transition shadow-sm inline-flex items-center justify-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  {savingLecture ? "Publishing..." : "Add Lecture"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Lecture Modal */}
      {editingLecture && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white rounded-t-2xl z-10">
              <h2 className="font-extrabold text-xl text-slate-900">Edit Lecture</h2>
              <button
                onClick={() => setEditingLecture(null)}
                className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSaveEdit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Lecture Title *</label>
                <input
                  required
                  value={editingLecture.title}
                  onChange={(e) => setEditingLecture((prev) => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Subject</label>
                  <select
                    value={editingLecture.subject?._id || editingLecture.subject}
                    onChange={(e) => setEditingLecture((prev) => ({ ...prev, subject: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition bg-white"
                  >
                    {subjects.map((s) => (
                      <option key={s._id} value={s._id}>{s.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Duration (Minutes)</label>
                  <input
                    type="number"
                    value={editingLecture.duration}
                    onChange={(e) => setEditingLecture((prev) => ({ ...prev, duration: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Video URL *</label>
                <input
                  required
                  type="url"
                  value={editingLecture.videoUrl}
                  onChange={(e) => setEditingLecture((prev) => ({ ...prev, videoUrl: e.target.value }))}
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Thumbnail Image URL</label>
                <input
                  type="url"
                  value={editingLecture.thumbnailUrl || ""}
                  onChange={(e) => setEditingLecture((prev) => ({ ...prev, thumbnailUrl: e.target.value }))}
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingLecture(null)}
                  className="flex-1 py-2.5 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingLecture}
                  className="flex-1 py-2.5 bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white font-bold rounded-xl transition shadow-sm inline-flex items-center justify-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  {savingLecture ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Video Player Modal */}
      {playingLecture && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
          <div className="bg-black rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden border border-white/10">
            <div className="p-4 border-b border-white/10 flex items-center justify-between bg-zinc-900 text-white">
              <div>
                <h3 className="font-bold text-sm text-white line-clamp-1">{playingLecture.title}</h3>
                <p className="text-xs text-brand-lime mt-0.5">{playingLecture.subject?.name || "Video Lecture"}</p>
              </div>
              <button
                onClick={() => setPlayingLecture(null)}
                className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="aspect-video w-full bg-black">
              {playingLecture.videoUrl?.includes("youtube") || playingLecture.videoUrl?.includes("youtu.be") ? (
                <iframe
                  src={getEmbedUrl(playingLecture.videoUrl)}
                  title={playingLecture.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <video src={playingLecture.videoUrl} controls autoPlay className="w-full h-full" />
              )}
            </div>
            <div className="p-4 bg-zinc-900 text-xs text-gray-400 flex items-center justify-between">
              <span>Duration: {playingLecture.duration || 45} mins</span>
              <a
                href={playingLecture.videoUrl}
                target="_blank"
                rel="noreferrer"
                className="text-brand-lime hover:underline inline-flex items-center gap-1"
              >
                Open in external tab <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmModal
        isOpen={!!lectureToDelete}
        onClose={() => setLectureToDelete(null)}
        onConfirm={confirmDeleteLecture}
        title="Delete Lecture"
        message={`Are you sure you want to delete "${lectureToDelete?.title}"?`}
        confirmLabel="Delete Lecture"
        danger={true}
      />
    </div>
  );
}
```

---

# FILE: `client\src\pages\teacher\TeacherDashboard.jsx`

```jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../config/api";
import {
  ClipboardList, FileText, Archive, UsersRound, GraduationCap,
  ChevronRight, BookOpen, Layers,
} from "lucide-react";

export default function TeacherDashboard() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [teacher, setTeacher] = useState(null);
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get("/dashboard/teacher").then(({ data }) => setData(data.data)),
      api.get("/teachers/my").then(({ data }) => setTeacher(data.data.teacher)),
      api.get("/batches").then(({ data }) => setBatches(data.data?.batches || [])),
    ])
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  // No "question bank" KPI — questions live inside exams and archive here.
  const statCards = [
    {
      label: "Active Exams",
      value: data?.examCount ?? 0,
      icon: ClipboardList,
      color: "text-green-600",
      bg: "bg-green-50",
      border: "border-green-100",
      path: "/teacher/exams",
    },
    {
      label: "Archived Papers",
      value: data?.archivedCount ?? 0,
      icon: Archive,
      color: "text-purple-600",
      bg: "bg-purple-50",
      border: "border-purple-100",
      path: "/teacher/exams",
    },
    {
      label: "Study Materials",
      value: data?.materialCount ?? 0,
      icon: FileText,
      color: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-100",
      path: "/teacher/materials",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
            <GraduationCap className="w-3.5 h-3.5 text-green-600" />
            <span>Faculty Workspace</span>
            {teacher?.subjectName && (
              <>
                <span>•</span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-green-50 text-green-700 border-green-100 font-semibold">
                  {teacher.subjectName}
                </span>
              </>
            )}
          </div>
          <h1 className="font-extrabold text-2xl text-slate-900 tracking-tight">
            Welcome back{teacher?.user?.name ? `, ${teacher.user.name.split(" ")[0]}` : ""}
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Build unique exams with their own questions, publish study materials, and review student performance.
          </p>
        </div>
        <button
          onClick={() => navigate("/teacher/exams")}
          className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 active:scale-[0.98] text-white font-semibold px-5 py-2.5 rounded-xl transition shadow-sm text-sm"
        >
          <ClipboardList className="w-4 h-4" /> Manage Exams
        </button>
      </div>

      {/* KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-white border-slate-100 rounded-2xl p-6 shadow-sm animate-pulse">
              <div className="h-10 w-10 bg-slate-100 rounded-xl mb-4" />
              <div className="h-3 bg-slate-100 rounded w-24 mb-3" />
              <div className="h-8 bg-slate-100 rounded w-16" />
            </div>
          ))
        ) : (
          statCards.map((s) => (
            <div
              key={s.label}
              onClick={() => navigate(s.path)}
              className="bg-white border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition cursor-pointer hover:border-slate-200 group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-11 h-11 rounded-xl ${s.bg} ${s.border} border flex items-center justify-center group-hover:scale-105 transition-transform`}>
                  <s.icon className={`w-5 h-5 ${s.color}`} />
                </div>
                <ChevronRight className="w-4 h-4 text-slate-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition" />
              </div>
              <div className="text-3xl font-extrabold text-slate-900 tracking-tight">{s.value}</div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">{s.label}</div>
            </div>
          ))
        )}
      </div>

      {/* How it works — replaces the old question-bank section */}
      <div className="bg-white border-slate-100 rounded-2xl shadow-sm p-6">
        <div className="flex items-center gap-2 mb-4">
          <Layers className="w-5 h-5 text-green-600" />
          <h2 className="font-bold text-lg text-slate-900">How exams work</h2>
        </div>
        <div className="grid sm:grid-cols-4 gap-4">
          {[
            { t: "Create Exam", d: "Pick a batch (mandatory) and set the schedule, marks and duration." },
            { t: "Add Questions", d: "Author questions in the UI or import a CSV — each question belongs to that exam only." },
            { t: "Conduct & Close", d: "Publish for the batch, then close it when the window ends." },
            { t: "Archive", d: "Closed exams land in the Question Bank for reconduct, study, or download." },
          ].map((step, i) => (
            <div key={step.t} className="p-4 rounded-xl bg-slate-50 border-slate-100">
              <div className="w-8 h-8 rounded-lg bg-green-100 text-green-700 flex items-center justify-center font-bold text-sm mb-2">
                {i + 1}
              </div>
              <p className="font-semibold text-slate-800 text-sm">{step.t}</p>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">{step.d}</p>
            </div>
          ))}
        </div>
      </div>

      {/* My Batches */}
      <div className="bg-white border-slate-100 rounded-2xl shadow-sm">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="font-bold text-lg text-slate-900 flex items-center gap-2">
              <UsersRound className="w-5 h-5 text-green-600" /> Assigned Batches
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {batches.length} batch{batches.length === 1 ? "" : "es"} · Batch = Course on this platform
            </p>
          </div>
          <button
            onClick={() => navigate("/teacher/classes")}
            className="text-xs font-semibold text-green-600 hover:text-green-700 inline-flex items-center gap-1"
          >
            View all <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="divide-y divide-slate-50">
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="p-5 animate-pulse">
                <div className="h-4 bg-slate-100 rounded w-40 mb-2" />
                <div className="h-3 bg-slate-100 rounded w-24" />
              </div>
            ))
          ) : batches.length === 0 ? (
            <div className="p-12 text-center">
              <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="font-bold text-slate-600 mb-1">No batches assigned</h3>
              <p className="text-sm text-slate-400">An administrator will assign you to batches.</p>
            </div>
          ) : (
            batches.slice(0, 5).map((b) => (
              <div key={b._id} className="p-5 hover:bg-slate-50 transition flex items-center justify-between">
                <div>
                  <p className="font-semibold text-slate-800 text-sm">{b.name}</p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {b.batchType ? b.batchType.replace(/_/g, " ") : "Batch"} · {b.students?.length || 0} students
                  </p>
                </div>
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: b.color || "#18A66A" }}
                />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

```

---

# FILE: `client\src\pages\teacher\TeacherExams.jsx`

```jsx
import { useState, useEffect, useRef } from "react";
import api from "../../config/api";
import {
  ClipboardList, Plus, Search, Layers, BarChart3, Trash2, X, Save,
  CheckCircle2, Eye, EyeOff, Image as ImageIcon, Upload, Download,
  RefreshCw, Users, Calendar, FileSpreadsheet, Archive, ChevronLeft,
  ChevronRight, Clock, AlertCircle,
} from "lucide-react";
import { alertSuccess, alertError, confirmDialog } from "../../utils/alert";
import ConfirmModal from "../../components/shared/ConfirmModal";
import Pagination from "../../components/shared/Pagination";
import { parseCSV, downloadCSVTemplate } from "../../utils/csv";

const statusColors = {
  LIVE: "bg-green-100 text-green-700 border-green-200",
  PUBLISHED: "bg-emerald-100 text-emerald-700 border-emerald-200",
  SCHEDULED: "bg-blue-100 text-blue-700 border-blue-200",
  CLOSED: "bg-slate-100 text-slate-600 border-slate-200",
  ARCHIVED: "bg-purple-100 text-purple-700 border-purple-200",
  DRAFT: "bg-yellow-100 text-yellow-700 border-yellow-200",
};

const emptyQuestion = () => ({
  questionText: "",
  questionImage: null,
  questionImagePreview: "",
  difficulty: "Medium",
  marks: 4,
  negativeMarks: 1,
  explanation: "",
  options: [
    { text: "", image: null, imagePreview: "" },
    { text: "", image: null, imagePreview: "" },
    { text: "", image: null, imagePreview: "" },
    { text: "", image: null, imagePreview: "" },
  ],
  correctAnswer: 0,
});

export default function TeacherExams() {
  const [activeTab, setActiveTab] = useState("exams");
  const [exams, setExams] = useState([]);
  const [archived, setArchived] = useState([]);
  const [batches, setBatches] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [meta, setMeta] = useState({ total: 0, pages: 1 });
  const [bankMeta, setBankMeta] = useState({ total: 0, pages: 1 });
  const [bankPage, setBankPage] = useState(1);
  const [showWizard, setShowWizard] = useState(false);
  const [wizardStep, setWizardStep] = useState(1);
  const [savingExam, setSavingExam] = useState(false);
  const [examToDelete, setExamToDelete] = useState(null);
  const [examResults, setExamResults] = useState(null);
  const [loadingResults, setLoadingResults] = useState(false);

  // Draft questions are held client-side, then saved to the exam after creation.
  const [draftQuestions, setDraftQuestions] = useState([]);
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [qForm, setQForm] = useState(emptyQuestion());
  const [csvPreview, setCsvPreview] = useState([]);
  const csvInputRef = useRef(null);

  const [examForm, setExamForm] = useState({
    title: "",
    description: "",
    testType: "MOCK_TEST",
    batch: "",
    duration: 60,
    marksPerCorrect: 4,
    negativePerWrong: 1,
    startTime: "",
    endTime: "",
    maxAttempts: 1,
    instructions: "",
    resultPublishMode: "MANUAL",
    resultPublishAt: "",
    publishNow: false,
  });

  const fetchExams = async () => {
    setLoading(true);
    try {
      const [examsRes, batchRes, subjRes] = await Promise.all([
        api.get(`/exams?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`),
        api.get("/batches"),
        api.get("/academics/subjects"),
      ]);
      setExams(examsRes.data?.exams || []);
      setMeta({
        total: examsRes.data?.total || 0,
        pages: examsRes.data?.pages || 1,
      });
      setBatches(batchRes.data?.batches || []);
      setSubjects(subjRes.data?.subjects || []);
    } catch {
      // ignore
    }
    setLoading(false);
  };

  const fetchBank = async () => {
    try {
      const { data } = await api.get(`/exams/bank?page=${bankPage}&limit=${limit}`);
      setArchived(data.data?.exams || []);
      setBankMeta({ total: data.data?.total || 0, pages: data.data?.pages || 1 });
    } catch {
      setArchived([]);
    }
  };

  useEffect(() => {
    fetchExams();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit, search]);

  useEffect(() => {
    if (activeTab === "bank") fetchBank();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, bankPage, limit]);

  // ─── Wizard: create exam (Basic → Questions → Settings) ───
  const resetWizard = () => {
    setWizardStep(1);
    setDraftQuestions([]);
    setCsvPreview([]);
    setQForm(emptyQuestion());
    setExamForm({
      title: "",
      description: "",
      testType: "MOCK_TEST",
      batch: "",
      duration: 60,
      marksPerCorrect: 4,
      negativePerWrong: 1,
      startTime: "",
      endTime: "",
      maxAttempts: 1,
      instructions: "",
      resultPublishMode: "MANUAL",
      resultPublishAt: "",
      publishNow: false,
    });
  };

  const addDraftQuestion = (q) => {
    setDraftQuestions((prev) => [...prev, q]);
  };

  const removeDraftQuestion = (idx) => {
    setDraftQuestions((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleAddQuestionToDraft = (e) => {
    e.preventDefault();
    if (qForm.options.some((o) => !o.text.trim())) {
      alertError("All four options need text");
      return;
    }
    addDraftQuestion({ ...qForm });
    setQForm(emptyQuestion());
    setShowQuestionForm(false);
    alertSuccess("Question added to this exam");
  };

  const handleCSV = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const parsed = parseCSV(evt.target.result);
        if (parsed.length === 0) {
          alertError("No valid rows found. Check the CSV headers.");
          return;
        }
        setCsvPreview(parsed);
        alertSuccess(`${parsed.length} rows ready to import`);
      } catch {
        alertError("Could not parse CSV file");
      }
    };
    reader.readAsText(file);
  };

  const commitCSVToDraft = () => {
    if (csvPreview.length === 0) return;
    const shaped = csvPreview.map((r) => ({
      questionText: r.questionText,
      questionImage: null,
      questionImagePreview: "",
      difficulty: r.difficulty || "Medium",
      marks: r.marks || examForm.marksPerCorrect,
      negativeMarks: r.negativeMarks || examForm.negativePerWrong,
      explanation: r.explanation || "",
      options: r.options.map((o) => ({ text: o.text, image: null, imagePreview: "" })),
      correctAnswer: r.correctAnswer || 0,
    }));
    setDraftQuestions((prev) => [...prev, ...shaped]);
    setCsvPreview([]);
    alertSuccess(`${shaped.length} questions added — you can now add images to any of them`);
  };

  const createExamWithQuestions = async () => {
    if (!examForm.batch) {
      alertError("Select a batch — every exam belongs to one batch");
      return;
    }
    if (!examForm.startTime || !examForm.endTime) {
      alertError("Start and end times are required");
      return;
    }
    if (draftQuestions.length === 0) {
      alertError("Add at least one question to this exam");
      return;
    }
    if (examForm.resultPublishMode === "SCHEDULED" && !examForm.resultPublishAt) {
      alertError("Set a date/time for scheduled result publishing");
      return;
    }

    setSavingExam(true);
    try {
      const totalMarks = draftQuestions.reduce(
        (sum, q) => sum + Number(q.marks || examForm.marksPerCorrect),
        0
      );

      // 1) Create the exam shell (questions are linked next).
      const { data: created } = await api.post("/exams", {
        ...examForm,
        totalQuestions: draftQuestions.length,
        totalMarks,
        duration: Number(examForm.duration),
        maxAttempts: Number(examForm.maxAttempts),
        marksPerCorrect: Number(examForm.marksPerCorrect),
        negativePerWrong: Number(examForm.negativePerWrong),
        questions: [],
        publishNow: false,
      });

      const examId = created.data.exam._id;

      // 2) Add each question to THIS exam (with images).
      for (const q of draftQuestions) {
        const fd = new FormData();
        fd.append("questionText", q.questionText);
        fd.append("difficulty", q.difficulty);
        fd.append("marks", q.marks);
        fd.append("negativeMarks", q.negativeMarks);
        fd.append("explanation", q.explanation || "");
        fd.append("correctAnswer", q.correctAnswer);
        fd.append(
          "options",
          JSON.stringify(q.options.map((o) => ({ text: o.text })))
        );
        if (q.questionImage) fd.append("questionImage", q.questionImage);
        q.options.forEach((opt, i) => {
          if (opt.image) fd.append(`optionImage_${i}`, opt.image);
        });
        await api.post(`/exams/${examId}/questions`, fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      // 3) Publish now if requested.
      if (examForm.publishNow) {
        await api.put(`/exams/${examId}/publish`);
      }

      alertSuccess("Exam created with its own question set");
      setShowWizard(false);
      resetWizard();
      fetchExams();
    } catch (err) {
      alertError(err.response?.data?.message || "Failed to create exam");
    } finally {
      setSavingExam(false);
    }
  };

  // ─── Exam actions ───
  const handlePublish = async (id) => {
    try {
      await api.put(`/exams/${id}/publish`);
      alertSuccess("Exam is now LIVE");
      fetchExams();
    } catch (err) {
      alertError(err.response?.data?.message || "Failed to publish");
    }
  };

  const handleClose = async (id) => {
    const ok = await confirmDialog({
      title: "Close & archive exam?",
      text: "The exam moves to the Question Bank archive where it can be reused, published for study, or downloaded.",
      confirmText: "Close & Archive",
    });
    if (!ok) return;
    try {
      await api.put(`/exams/${id}/close`);
      alertSuccess("Exam closed and archived to Question Bank");
      fetchExams();
    } catch {
      alertError("Failed to close exam");
    }
  };

  const handlePublishResults = async (id) => {
    try {
      await api.put(`/exams/${id}/publish-results`, { publish: true });
      alertSuccess("Results published to students");
      fetchExams();
    } catch {
      alertError("Failed to publish results");
    }
  };

  const handleStudyToggle = async (exam) => {
    try {
      await api.put(`/exams/${exam._id}/study-visibility`, {
        studyVisible: !exam.studyVisible,
      });
      alertSuccess(
        exam.studyVisible ? "Hidden from students" : "Published for student study"
      );
      fetchBank();
    } catch {
      alertError("Failed to update visibility");
    }
  };

  const handleReconduct = async (exam) => {
    try {
      await api.post(`/exams/${exam._id}/reconduct`, {
        title: `${exam.title} (Reconduct)`,
      });
      alertSuccess("New exam draft created from archive");
      setActiveTab("exams");
      fetchExams();
    } catch {
      alertError("Failed to reconduct");
    }
  };

  const handleDownload = async (exam) => {
    try {
      const { data } = await api.get(`/exams/${exam._id}/download`);
      const blob = new Blob([JSON.stringify(data.data.pack, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${exam.title.replace(/\s+/g, "-")}.json`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      alertError("Failed to download exam");
    }
  };

  const handleDeleteExam = async () => {
    if (!examToDelete) return;
    try {
      await api.delete(`/exams/${examToDelete._id}`);
      alertSuccess("Exam deleted");
      setExamToDelete(null);
      fetchExams();
    } catch {
      alertError("Failed to delete");
    }
  };

  const handleOpenResults = async (exam) => {
    setLoadingResults(true);
    setExamResults({ exam, results: [], analytics: null });
    try {
      const { data } = await api.get(`/exams/${exam._id}/results`);
      setExamResults(data.data);
      setActiveTab("submissions");
    } catch {
      alertError("Failed to load results");
      setExamResults(null);
    } finally {
      setLoadingResults(false);
    }
  };

  const tabs = [
    { id: "exams", label: "Exams", icon: ClipboardList },
    { id: "bank", label: "Question Bank", icon: Archive },
    { id: "submissions", label: "Submissions", icon: BarChart3 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-extrabold text-2xl text-slate-900">Exam Manager</h1>
          <p className="text-slate-500 text-sm mt-1">
            Create a unique exam with its own questions, conduct it, then archive it to the Question Bank.
          </p>
        </div>
        <button
          onClick={() => {
            resetWizard();
            setShowWizard(true);
          }}
          className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2.5 rounded-xl transition shadow-sm text-sm"
        >
          <Plus className="w-4 h-4" /> Create New Exam
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-slate-100 rounded-xl w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-2 rounded-lg text-sm font-semibold transition flex items-center gap-2 ${
              activeTab === tab.id ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* ─── EXAMS TAB ─── */}
      {activeTab === "exams" && (
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search exams..."
              className="w-full pl-10 pr-4 py-2.5 border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition bg-white"
            />
          </div>

          {loading ? (
            <div className="flex items-center justify-center h-40">
              <div className="w-8 h-8 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : exams.length === 0 ? (
            <div className="bg-white border-slate-100 rounded-2xl p-12 text-center shadow-sm">
              <ClipboardList className="w-12 h-12 text-slate-200 mx-auto mb-4" />
              <h3 className="font-bold text-slate-600 mb-1">No exams yet</h3>
              <p className="text-slate-400 text-sm">Create your first exam with its own questions.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {exams.map((exam) => (
                <div key={exam._id} className="bg-white border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${statusColors[exam.status] || statusColors.DRAFT}`}>
                          ● {exam.status}
                        </span>
                        <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-700 font-semibold">
                          {exam.testType?.replace(/_/g, " ")}
                        </span>
                        {exam.batch?.name && (
                          <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 font-semibold border-blue-200">
                            {exam.batch.name}
                          </span>
                        )}
                        {exam.resultPublishMode && (
                          <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 font-semibold border-amber-200">
                            Results: {exam.resultPublishMode}
                          </span>
                        )}
                      </div>
                      <h3 className="font-bold text-slate-800 text-base truncate">{exam.title}</h3>
                      <div className="flex flex-wrap gap-4 text-xs text-slate-500 mt-2">
                        <span>{exam.totalQuestions} questions</span>
                        <span>{exam.duration} min</span>
                        <span>{exam.totalMarks} marks</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <button
                        onClick={() => handleOpenResults(exam)}
                        className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200"
                      >
                        <BarChart3 className="w-3.5 h-3.5 inline mr-1" /> Results
                      </button>
                      {exam.status !== "LIVE" && exam.status !== "CLOSED" && (
                        <button
                          onClick={() => handlePublish(exam._id)}
                          className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-green-50 text-green-700 hover:bg-green-100 border-green-200"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 inline mr-1" /> Go Live
                        </button>
                      )}
                      {exam.status === "LIVE" && (
                        <button
                          onClick={() => handleClose(exam._id)}
                          className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-purple-50 text-purple-700 hover:bg-purple-100 border-purple-200"
                        >
                          <Archive className="w-3.5 h-3.5 inline mr-1" /> Close & Archive
                        </button>
                      )}
                      {!exam.resultsPublished && (
                        <button
                          onClick={() => handlePublishResults(exam._id)}
                          className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-amber-50 text-amber-700 hover:bg-amber-100 border-amber-200"
                        >
                          Publish Results
                        </button>
                      )}
                      <button
                        onClick={() => setExamToDelete(exam)}
                        className="p-1.5 text-slate-400 hover:text-red-500 rounded transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <Pagination
                page={page}
                totalPages={meta.pages}
                totalItems={meta.total}
                pageSize={limit}
                onPageChange={setPage}
                onPageSizeChange={(n) => {
                  setLimit(n);
                  setPage(1);
                }}
              />
            </div>
          )}
        </div>
      )}

      {/* ─── QUESTION BANK (ARCHIVE) TAB ─── */}
      {activeTab === "bank" && (
        <div className="space-y-4">
          <div className="bg-blue-50 border-blue-100 rounded-xl p-4 text-xs text-blue-800">
            The Question Bank is the archive of completed exam papers. Open a paper to reconduct it,
            publish it for student study, or download it. Nothing here is created manually.
          </div>

          {archived.length === 0 ? (
            <div className="bg-white border-slate-100 rounded-2xl p-12 text-center shadow-sm">
              <Archive className="w-12 h-12 text-slate-200 mx-auto mb-4" />
              <h3 className="font-bold text-slate-600 mb-1">No archived exam papers</h3>
              <p className="text-slate-400 text-sm">Close a live exam to archive it here.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {archived.map((exam) => (
                <div key={exam._id} className="bg-white border-slate-100 rounded-2xl p-5 shadow-sm">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span className="text-xs font-bold px-2.5 py-0.5 rounded-full border bg-purple-100 text-purple-700 border-purple-200">
                          <Archive className="w-3 h-3 inline mr-1" /> Archived
                        </span>
                        {exam.batch?.name && (
                          <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 font-semibold border-blue-200">
                            {exam.batch.name}
                          </span>
                        )}
                        <span
                          className={`text-xs px-2.5 py-0.5 rounded-full font-semibold border ${
                            exam.studyVisible
                              ? "bg-green-50 text-green-700 border-green-200"
                              : "bg-slate-50 text-slate-500 border-slate-200"
                          }`}
                        >
                          {exam.studyVisible ? "Visible to students" : "Hidden from students"}
                        </span>
                      </div>
                      <h3 className="font-bold text-slate-800 text-base truncate">{exam.title}</h3>
                      <div className="flex flex-wrap gap-4 text-xs text-slate-500 mt-2">
                        <span>{exam.totalQuestions} questions</span>
                        <span>{exam.duration} min</span>
                        <span>{exam.totalMarks} marks</span>
                        {exam.archivedAt && (
                          <span>Archived {new Date(exam.archivedAt).toLocaleDateString()}</span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <button
                        onClick={() => handleReconduct(exam)}
                        className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-green-50 text-green-700 hover:bg-green-100 border-green-200"
                      >
                        <RefreshCw className="w-3.5 h-3.5 inline mr-1" /> Reconduct
                      </button>
                      <button
                        onClick={() => handleStudyToggle(exam)}
                        className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200"
                      >
                        {exam.studyVisible ? (
                          <><EyeOff className="w-3.5 h-3.5 inline mr-1" /> Hide</>
                        ) : (
                          <><Eye className="w-3.5 h-3.5 inline mr-1" /> Publish for Study</>
                        )}
                      </button>
                      <button
                        onClick={() => handleDownload(exam)}
                        className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200"
                      >
                        <Download className="w-3.5 h-3.5 inline mr-1" /> Download
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <Pagination
                page={bankPage}
                totalPages={bankMeta.pages}
                totalItems={bankMeta.total}
                pageSize={limit}
                onPageChange={setBankPage}
              />
            </div>
          )}
        </div>
      )}

      {/* ─── SUBMISSIONS TAB ─── */}
      {activeTab === "submissions" && (
        <div>
          {examResults ? (
            <div className="bg-white rounded-2xl border-slate-100 p-6 space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-green-700 bg-green-50 px-2.5 py-1 rounded-full">
                  Exam Submissions
                </span>
                <h2 className="font-extrabold text-xl text-slate-900 mt-2">{examResults.exam?.title}</h2>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-slate-50 rounded-xl border-slate-100 text-center">
                  <div className="text-2xl font-extrabold text-slate-900">{examResults.analytics?.totalSubmissions || examResults.results?.length || 0}</div>
                  <div className="text-xs text-slate-500 mt-1">Submissions</div>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border-slate-100 text-center">
                  <div className="text-2xl font-extrabold text-slate-900">{examResults.analytics?.avgScore || 0}</div>
                  <div className="text-xs text-slate-500 mt-1">Average Score</div>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border-slate-100 text-center">
                  <div className="text-2xl font-extrabold text-slate-900">{examResults.analytics?.highestScore || 0}</div>
                  <div className="text-xs text-slate-500 mt-1">Highest</div>
                </div>
              </div>

              {examResults.results?.length > 0 ? (
                <div className="border border-slate-100 rounded-xl overflow-x-auto">
                  <table className="w-full text-sm min-w-[600px]">
                    <thead className="bg-slate-50 text-xs font-bold text-slate-500 uppercase sticky top-0">
                      <tr>
                        <th className="py-3 px-4 text-left">Rank</th>
                        <th className="py-3 px-4 text-left">Student</th>
                        <th className="py-3 px-4 text-center">Score</th>
                        <th className="py-3 px-4 text-center">Status</th>
                        <th className="py-3 px-4 text-right">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {examResults.results.map((r, i) => (
                        <tr key={r._id || i} className="hover:bg-slate-50">
                          <td className="py-3 px-4 font-bold text-xs">#{r.rank || i + 1}</td>
                          <td className="py-3 px-4 font-semibold text-slate-800">{r.student?.name || "Student"}</td>
                          <td className="py-3 px-4 text-center font-bold">{r.obtainedMarks} / {r.totalMarks || examResults.exam?.totalMarks}</td>
                          <td className="py-3 px-4 text-center">
                            {r.isPublished ? (
                              <span className="text-xs font-semibold text-green-600">Published</span>
                            ) : (
                              <span className="text-xs font-semibold text-amber-600">Pending</span>
                            )}
                          </td>
                          <td className="py-3 px-4 text-right text-xs text-slate-400">{r.createdAt ? new Date(r.createdAt).toLocaleDateString() : "—"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-8 text-slate-400 text-sm">No submissions recorded yet.</div>
              )}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-400">
              <BarChart3 className="w-12 h-12 mx-auto mb-3 text-slate-200" />
              <p className="font-semibold text-slate-500">Select an exam from the Exams tab to view submissions.</p>
            </div>
          )}
        </div>
      )}

      {/* ─── CREATE EXAM WIZARD ─── */}
      {showWizard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[92vh] flex-col">
            {/* Wizard header */}
            <div className="p-5 border-b border-slate-100 flex items-center justify-between shrink-0">
              <div>
                <h2 className="font-extrabold text-xl text-slate-900">Create New Exam</h2>
                <p className="text-slate-500 text-xs mt-0.5">
                  Step {wizardStep} of 3 · {["Basic Details", "Add Questions", "Settings"][wizardStep - 1]}
                </p>
              </div>
              <button
                onClick={() => setShowWizard(false)}
                className="p-2 rounded-lg hover:bg-slate-100 text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Steps indicator */}
            <div className="px-5 pt-4 flex items-center gap-2 shrink-0">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center gap-2 flex-1">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                      wizardStep >= s ? "bg-green-600 text-white" : "bg-slate-100 text-slate-400"
                    }`}
                  >
                    {s}
                  </div>
                  {s < 3 && (
                    <div className={`h-0.5 flex-1 ${wizardStep > s ? "bg-green-600" : "bg-slate-100"}`} />
                  )}
                </div>
              ))}
            </div>

            {/* Wizard body */}
            <div className="p-5 overflow-y-auto flex-1 space-y-4">
              {wizardStep === 1 && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Exam Title *</label>
                    <input
                      value={examForm.title}
                      onChange={(e) => setExamForm({ ...examForm, title: e.target.value })}
                      className="w-full px-3 py-2.5 border-slate-200 rounded-xl text-sm"
                      placeholder="e.g. NEET Mock Test #12 — Full Syllabus"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Batch / Course *</label>
                      <select
                        value={examForm.batch}
                        onChange={(e) => setExamForm({ ...examForm, batch: e.target.value })}
                        className="w-full px-3 py-2.5 border-slate-200 rounded-xl text-sm bg-white"
                      >
                        <option value="">Select batch</option>
                        {batches.map((b) => (
                          <option key={b._id} value={b._id}>{b.name}</option>
                        ))}
                      </select>
                      <p className="text-[11px] text-slate-400 mt-1">Every exam belongs to exactly one batch.</p>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Test Type</label>
                      <select
                        value={examForm.testType}
                        onChange={(e) => setExamForm({ ...examForm, testType: e.target.value })}
                        className="w-full px-3 py-2.5 border-slate-200 rounded-xl text-sm bg-white"
                      >
                        <option value="MOCK_TEST">Mock Test</option>
                        <option value="CHAPTER_TEST">Chapter Test</option>
                        <option value="DPP">DPP</option>
                        <option value="UNIT_TEST">Unit Test</option>
                        <option value="PYQ">PYQ</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1.5">Duration (min)</label>
                      <input type="number" value={examForm.duration}
                        onChange={(e) => setExamForm({ ...examForm, duration: e.target.value })}
                        className="w-full px-3 py-2.5 border-slate-200 rounded-xl text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1.5">Marks / Correct</label>
                      <input type="number" value={examForm.marksPerCorrect}
                        onChange={(e) => setExamForm({ ...examForm, marksPerCorrect: e.target.value })}
                        className="w-full px-3 py-2.5 border-slate-200 rounded-xl text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1.5">Negative / Wrong</label>
                      <input type="number" value={examForm.negativePerWrong}
                        onChange={(e) => setExamForm({ ...examForm, negativePerWrong: e.target.value })}
                        className="w-full px-3 py-2.5 border-slate-200 rounded-xl text-sm" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1.5">Start Time *</label>
                      <input type="datetime-local" value={examForm.startTime}
                        onChange={(e) => setExamForm({ ...examForm, startTime: e.target.value })}
                        className="w-full px-3 py-2.5 border-slate-200 rounded-xl text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1.5">End Time *</label>
                      <input type="datetime-local" value={examForm.endTime}
                        onChange={(e) => setExamForm({ ...examForm, endTime: e.target.value })}
                        className="w-full px-3 py-2.5 border-slate-200 rounded-xl text-sm" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Instructions</label>
                    <textarea rows={2} value={examForm.instructions}
                      onChange={(e) => setExamForm({ ...examForm, instructions: e.target.value })}
                      className="w-full px-3 py-2.5 border-slate-200 rounded-xl text-sm resize-none"
                      placeholder="Shown to students before they begin..." />
                  </div>
                </>
              )}

              {wizardStep === 2 && (
                <>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setShowQuestionForm(true)}
                      className="inline-flex items-center gap-2 bg-white border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold px-4 py-2.5 rounded-xl text-sm"
                    >
                      <Plus className="w-4 h-4 text-green-600" /> Create Question (UI)
                    </button>
                    <label className="inline-flex items-center gap-2 bg-white border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold px-4 py-2.5 rounded-xl text-sm cursor-pointer">
                      <FileSpreadsheet className="w-4 h-4 text-green-600" /> Import CSV
                      <input
                        type="file"
                        accept=".csv"
                        className="hidden"
                        onChange={(e) => handleCSV(e.target.files[0])}
                      />
                    </label>
                    <button
                      onClick={downloadCSVTemplate}
                      className="inline-flex items-center gap-2 text-xs text-slate-500 hover:text-slate-700 px-2"
                    >
                      <Download className="w-3.5 h-3.5" /> Download template
                    </button>
                  </div>

                  {csvPreview.length > 0 && (
                    <div className="bg-green-50 border-green-100 rounded-xl p-4 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-green-800">
                          {csvPreview.length} rows parsed from CSV
                        </span>
                        <button
                          onClick={commitCSVToDraft}
                          className="text-xs font-bold bg-green-600 text-white px-3 py-1.5 rounded-lg"
                        >
                          Add all to exam
                        </button>
                      </div>
                      <p className="text-xs text-green-700 mt-1">
                        After adding, you can edit each question and attach images.
                      </p>
                    </div>
                  )}

                  {draftQuestions.length === 0 ? (
                    <div className="border border-dashed border-slate-200 rounded-xl p-10 text-center">
                      <Layers className="w-10 h-10 text-slate-200 mx-auto mb-3" />
                      <p className="text-slate-500 text-sm">
                        No questions yet. Create one in the UI or import from CSV.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {draftQuestions.map((q, i) => (
                        <div key={i} className="bg-white border-slate-100 rounded-xl p-4 flex items-start gap-3">
                          <span className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500 shrink-0">
                            {i + 1}
                          </span>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-slate-800 font-medium">{q.questionText}</p>
                            <div className="flex flex-wrap gap-1.5 mt-2">
                              {q.options.map((o, oi) => (
                                <span
                                  key={oi}
                                  className={`text-[11px] px-2 py-0.5 rounded border ${
                                    oi === q.correctAnswer
                                      ? "bg-green-50 text-green-700 border-green-200 font-semibold"
                                      : "bg-slate-50 text-slate-500 border-slate-100"
                                  }`}
                                >
                                  {String.fromCharCode(65 + oi)}. {o.text || "—"}
                                </span>
                              ))}
                            </div>
                          </div>
                          <button
                            onClick={() => removeDraftQuestion(i)}
                            className="p-1.5 text-slate-300 hover:text-red-500 rounded transition shrink-0"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}

              {wizardStep === 3 && (
                <>
                  <div className="bg-slate-50 border-slate-100 rounded-xl p-4 space-y-3">
                    <h4 className="font-bold text-slate-700 text-sm">Result Publishing</h4>
                    <label className="flex items-center gap-3 text-sm text-slate-600 cursor-pointer">
                      <input
                        type="radio"
                        name="rpm"
                        checked={examForm.resultPublishMode === "IMMEDIATE"}
                        onChange={() => setExamForm({ ...examForm, resultPublishMode: "IMMEDIATE" })}
                        className="accent-green-600"
                      />
                      Publish result right after exam submission
                    </label>
                    <label className="flex items-center gap-3 text-sm text-slate-600 cursor-pointer">
                      <input
                        type="radio"
                        name="rpm"
                        checked={examForm.resultPublishMode === "MANUAL"}
                        onChange={() => setExamForm({ ...examForm, resultPublishMode: "MANUAL" })}
                        className="accent-green-600"
                      />
                      Publish manually later
                    </label>
                    <label className="flex items-center gap-3 text-sm text-slate-600 cursor-pointer">
                      <input
                        type="radio"
                        name="rpm"
                        checked={examForm.resultPublishMode === "SCHEDULED"}
                        onChange={() => setExamForm({ ...examForm, resultPublishMode: "SCHEDULED" })}
                        className="accent-green-600"
                      />
                      Publish at a scheduled time
                    </label>
                    {examForm.resultPublishMode === "SCHEDULED" && (
                      <input
                        type="datetime-local"
                        value={examForm.resultPublishAt}
                        onChange={(e) => setExamForm({ ...examForm, resultPublishAt: e.target.value })}
                        className="w-full px-3 py-2.5 border-slate-200 rounded-xl text-sm bg-white"
                      />
                    )}
                  </div>

                  <label className="flex items-center gap-3 text-sm text-slate-700 cursor-pointer bg-slate-50 border-slate-100 rounded-xl p-4">
                    <input
                      type="checkbox"
                      checked={examForm.publishNow}
                      onChange={(e) => setExamForm({ ...examForm, publishNow: e.target.checked })}
                      className="accent-green-600 w-4 h-4"
                    />
                    <div>
                      <div className="font-semibold">Publish exam immediately</div>
                      <div className="text-xs text-slate-500">
                        Otherwise it stays a secret draft until you publish it.
                      </div>
                    </div>
                  </label>

                  <div className="bg-amber-50 border-amber-100 rounded-xl p-4 text-xs text-amber-800 flex gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>
                      Draft exams are never visible to students, even those in the selected batch.
                      Only you and other admins/faculty can see them until published.
                    </span>
                  </div>
                </>
              )}
            </div>

            {/* Wizard footer */}
            <div className="p-5 border-t border-slate-100 flex items-center justify-between gap-3 shrink-0">
              <button
                onClick={() => (wizardStep === 1 ? setShowWizard(false) : setWizardStep(wizardStep - 1))}
                className="px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 transition inline-flex items-center gap-1"
              >
                <ChevronLeft className="w-4 h-4" />
                {wizardStep === 1 ? "Cancel" : "Back"}
              </button>

              {wizardStep < 3 ? (
                <button
                  onClick={() => {
                    if (wizardStep === 1 && (!examForm.title || !examForm.batch)) {
                      alertError("Title and batch are required");
                      return;
                    }
                    setWizardStep(wizardStep + 1);
                  }}
                  className="px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl text-sm inline-flex items-center gap-1"
                >
                  Next <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={createExamWithQuestions}
                  disabled={savingExam}
                  className="px-5 py-2.5 bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white font-bold rounded-xl text-sm inline-flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  {savingExam ? "Creating..." : `Create Exam (${draftQuestions.length} Q)`}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ─── ADD QUESTION (draft) MODAL ─── */}
      {showQuestionForm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex-col">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between shrink-0">
              <div>
                <h2 className="font-extrabold text-lg text-slate-900">Create Question</h2>
                <p className="text-slate-500 text-xs mt-0.5">Text + image questions and options</p>
              </div>
              <button onClick={() => setShowQuestionForm(false)} className="p-2 rounded-lg hover:bg-slate-100">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddQuestionToDraft} className="p-5 space-y-4 overflow-y-auto flex-1">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Question Text *</label>
                <textarea
                  required
                  rows={3}
                  value={qForm.questionText}
                  onChange={(e) => setQForm({ ...qForm, questionText: e.target.value })}
                  className="w-full px-3 py-2.5 border-slate-200 rounded-xl text-sm resize-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Question Image (optional)</label>
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 px-4 py-2.5 border-dashed border-slate-300 rounded-xl cursor-pointer hover:bg-slate-50 text-sm text-slate-600">
                    <ImageIcon className="w-4 h-4" /> Upload Image
                    <input type="file" accept="image/*" className="hidden"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) setQForm({ ...qForm, questionImage: file, questionImagePreview: URL.createObjectURL(file) });
                      }} />
                  </label>
                  {qForm.questionImagePreview && (
                    <img src={qForm.questionImagePreview} alt="Preview" className="h-16 rounded-lg border" />
                  )}
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-2">
                  Options (select correct, add optional images)
                </label>
                <div className="space-y-2.5">
                  {qForm.options.map((opt, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border-slate-200">
                      <input type="radio" name="correct" checked={qForm.correctAnswer === idx}
                        onChange={() => setQForm({ ...qForm, correctAnswer: idx })}
                        className="w-4 h-4 accent-green-600" />
                      <span className="w-6 text-xs font-bold text-slate-500">{String.fromCharCode(65 + idx)}.</span>
                      <input required value={opt.text}
                        onChange={(e) => {
                          const opts = [...qForm.options];
                          opts[idx] = { ...opts[idx], text: e.target.value };
                          setQForm({ ...qForm, options: opts });
                        }}
                        placeholder={`Option ${String.fromCharCode(65 + idx)}`}
                        className="flex-1 px-3 py-2 border-slate-200 rounded-lg text-sm" />
                      <label className="p-2 rounded-lg border-slate-200 cursor-pointer hover:bg-slate-100">
                        <ImageIcon className="w-4 h-4 text-slate-400" />
                        <input type="file" accept="image/*" className="hidden"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                              const opts = [...qForm.options];
                              opts[idx] = { ...opts[idx], image: file, imagePreview: URL.createObjectURL(file) };
                              setQForm({ ...qForm, options: opts });
                            }
                          }} />
                      </label>
                      {opt.imagePreview && <img src={opt.imagePreview} className="h-8 rounded border" alt="" />}
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1.5">Marks</label>
                  <input type="number" value={qForm.marks}
                    onChange={(e) => setQForm({ ...qForm, marks: e.target.value })}
                    className="w-full px-3 py-2 border-slate-200 rounded-lg text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1.5">Negative</label>
                  <input type="number" value={qForm.negativeMarks}
                    onChange={(e) => setQForm({ ...qForm, negativeMarks: e.target.value })}
                    className="w-full px-3 py-2 border-slate-200 rounded-lg text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1.5">Difficulty</label>
                  <select value={qForm.difficulty}
                    onChange={(e) => setQForm({ ...qForm, difficulty: e.target.value })}
                    className="w-full px-3 py-2 border-slate-200 rounded-lg text-sm bg-white">
                    <option>Easy</option><option>Medium</option><option>Hard</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Explanation</label>
                <textarea rows={2} value={qForm.explanation}
                  onChange={(e) => setQForm({ ...qForm, explanation: e.target.value })}
                  className="w-full px-3 py-2.5 border-slate-200 rounded-xl text-sm resize-none" />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowQuestionForm(false)}
                  className="flex-1 py-2.5 border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50">Cancel</button>
                <button type="submit"
                  className="flex-1 py-2.5 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl">
                  Add to Exam
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmModal
        isOpen={!!examToDelete}
        onClose={() => setExamToDelete(null)}
        onConfirm={handleDeleteExam}
        title="Delete Exam"
        message={`Delete "${examToDelete?.title}"? All attempts will be affected.`}
        confirmLabel="Delete"
        danger={true}
      />
    </div>
  );
}

```

---

# FILE: `client\src\pages\teacher\TeacherMaterials.jsx`

```jsx
import { useState, useEffect } from "react";
import api from "../../config/api";
import {
  BookOpen, Plus, Search, Trash2, X, Save, Link as LinkIcon,
  FileText, ExternalLink, ChevronDown, ChevronRight, Layers, FolderOpen,
} from "lucide-react";
import { alertSuccess, alertError } from "../../utils/alert";
import ConfirmModal from "../../components/shared/ConfirmModal";

export default function TeacherMaterials() {
  const [materials, setMaterials] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [batchFilter, setBatchFilter] = useState("All");
  const [materialToDelete, setMaterialToDelete] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [expanded, setExpanded] = useState({});

  // Upload flow state
  const [showUpload, setShowUpload] = useState(false);
  const [fileToUpload, setFileToUpload] = useState(null);
  const [units, setUnits] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [creatingUnit, setCreatingUnit] = useState(false);
  const [creatingChapter, setCreatingChapter] = useState(false);
  const [newUnitName, setNewUnitName] = useState("");
  const [newChapterName, setNewChapterName] = useState("");

  const [form, setForm] = useState({
    title: "",
    subject: "",
    batch: "",
    unit: "",
    chapter: "",
    type: "PDF",
    fileUrl: "",
    description: "",
  });

  const fetchMaterials = async () => {
    try {
      const { data } = await api.get("/materials");
      setMaterials(data.data?.materials || []);
    } catch {
      setMaterials([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchDependencies = async () => {
    try {
      const [sRes, bRes] = await Promise.all([
        api.get("/academics/subjects"),
        api.get("/batches"),
      ]);
      setSubjects(sRes.data?.subjects || []);
      setBatches(bRes.data?.batches || []);
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    fetchMaterials();
    fetchDependencies();
  }, []);

  // Load units when the subject changes
  useEffect(() => {
    if (!form.subject) {
      setUnits([]);
      return;
    }
    api
      .get(`/academics/units?subject=${form.subject}`)
      .then(({ data }) => setUnits(data.data?.units || []))
      .catch(() => setUnits([]));
  }, [form.subject]);

  // Load chapters when the unit changes
  useEffect(() => {
    if (!form.unit) {
      setChapters([]);
      return;
    }
    api
      .get(`/academics/chapters?unit=${form.unit}`)
      .then(({ data }) => setChapters(data.data?.chapters || []))
      .catch(() => setChapters([]));
  }, [form.unit]);

  const handleCreateUnit = async () => {
    if (!newUnitName.trim() || !form.subject) {
      alertError("Enter a unit name and pick a subject first");
      return;
    }
    setCreatingUnit(true);
    try {
      const { data } = await api.post("/academics/units", {
        name: newUnitName.trim(),
        subject: form.subject,
      });
      const unit = data.data.unit;
      setUnits((prev) => (prev.find((u) => u._id === unit._id) ? prev : [...prev, unit]));
      setForm((f) => ({ ...f, unit: unit._id, chapter: "" }));
      setNewUnitName("");
      alertSuccess("Unit added");
    } catch (err) {
      alertError(err.response?.data?.message || "Failed to create unit");
    } finally {
      setCreatingUnit(false);
    }
  };

  const handleCreateChapter = async () => {
    if (!newChapterName.trim() || !form.unit) {
      alertError("Enter a chapter name and pick a unit first");
      return;
    }
    setCreatingChapter(true);
    try {
      const { data } = await api.post("/academics/chapters", {
        name: newChapterName.trim(),
        unit: form.unit,
        subject: form.subject,
      });
      const chapter = data.data.chapter;
      setChapters((prev) =>
        prev.find((c) => c._id === chapter._id) ? prev : [...prev, chapter]
      );
      setForm((f) => ({ ...f, chapter: chapter._id }));
      setNewChapterName("");
      alertSuccess("Chapter added");
    } catch (err) {
      alertError(err.response?.data?.message || "Failed to create chapter");
    } finally {
      setCreatingChapter(false);
    }
  };

  const handleCreateMaterial = async (e) => {
    e.preventDefault();
    if (!form.batch) return alertError("Please select a batch");
    if (!form.unit) return alertError("Please select or create a unit");
    if (!form.chapter) return alertError("Please select or create a chapter");
    if (!fileToUpload && !form.fileUrl.trim())
      return alertError("Provide either a file upload or an external URL");

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("title", form.title);
      if (form.subject) formData.append("subject", form.subject);
      formData.append("batch", form.batch);
      formData.append("unit", form.unit);
      formData.append("chapter", form.chapter);
      formData.append("type", form.type);
      formData.append("description", form.description);
      if (fileToUpload) formData.append("file", fileToUpload);
      else formData.append("fileUrl", form.fileUrl);

      await api.post("/materials", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alertSuccess("Study material published to Cloudinary");
      setShowUpload(false);
      setForm({ title: "", subject: "", batch: "", unit: "", chapter: "", type: "PDF", fileUrl: "", description: "" });
      setFileToUpload(null);
      fetchMaterials();
    } catch (err) {
      alertError(err.response?.data?.message || "Failed to upload material");
    } finally {
      setUploading(false);
    }
  };

  const confirmDeleteMaterial = async () => {
    if (!materialToDelete) return;
    try {
      await api.delete(`/materials/${materialToDelete._id}`);
      alertSuccess("Material deleted");
      setMaterialToDelete(null);
      fetchMaterials();
    } catch {
      alertError("Failed to delete material");
    }
  };

  // Group: Unit → Chapter → Materials
  const filtered = materials.filter((m) => {
    const matchSearch =
      m.title?.toLowerCase().includes(search.toLowerCase()) ||
      m.subject?.name?.toLowerCase().includes(search.toLowerCase());
    const matchBatch =
      batchFilter === "All" ||
      m.batch?._id === batchFilter ||
      m.batch === batchFilter;
    return matchSearch && matchBatch;
  });

  const grouped = filtered.reduce((acc, m) => {
    const unitName = m.unit?.name || "Unsorted Unit";
    const chapterName = m.chapter?.name || "Unsorted Chapter";
    acc[unitName] = acc[unitName] || {};
    acc[unitName][chapterName] = acc[unitName][chapterName] || [];
    acc[unitName][chapterName].push(m);
    return acc;
  }, {});

  const toggle = (key) => setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-extrabold text-2xl text-slate-900">Study Materials</h1>
          <p className="text-slate-500 text-sm mt-1">
            Publish notes and resources as Unit → Chapter → Material for your batches.
          </p>
        </div>
        <button
          onClick={() => setShowUpload(true)}
          className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2.5 rounded-xl transition shadow-sm text-sm"
        >
          <Plus className="w-4 h-4" /> Add Material
        </button>
      </div>

     <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title or subject..."
            className="w-full pl-10 pr-4 py-2.5 border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition bg-white"
          />
        </div>
        <select
          value={batchFilter}
          onChange={(e) => setBatchFilter(e.target.value)}
          className="px-4 py-2.5 border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 bg-white"
        >
          <option value="All">All Batches</option>
          {batches.map((b) => (
            <option key={b._id} value={b._id}>{b.name}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-40 text-slate-400">
          <div className="w-8 h-8 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white border-slate-100 rounded-2xl p-12 text-center shadow-sm">
          <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h3 className="font-bold text-slate-600 mb-1">No materials yet</h3>
          <p className="text-slate-400 text-sm">Add your first material using the button above.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {Object.entries(grouped).map(([unitName, chapters]) => (
            <div key={unitName} className="bg-white border-slate-100 rounded-2xl shadow-sm overflow-hidden">
              <button
                onClick={() => toggle(unitName)}
                className="w-full flex items-center gap-3 p-5 hover:bg-slate-50 transition text-left"
              >
                {expanded[unitName] ? (
                  <ChevronDown className="w-5 h-5 text-green-600 shrink-0" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-slate-400 shrink-0" />
                )}
                <Layers className="w-5 h-5 text-green-600 shrink-0" />
                <span className="font-bold text-slate-800">{unitName}</span>
                <span className="ml-auto text-xs text-slate-400">
                  {Object.values(chapters).flat().length} materials
                </span>
              </button>

              {expanded[unitName] && (
                <div className="border-t border-slate-50">
                  {Object.entries(chapters).map(([chapterName, items]) => (
                    <div key={chapterName} className="pl-6">
                      <div className="flex items-center gap-2 px-5 py-3 bg-slate-50/60">
                        <FolderOpen className="w-4 h-4 text-slate-400" />
                        <span className="font-semibold text-slate-600 text-sm">{chapterName}</span>
                        <span className="text-xs text-slate-400">({items.length})</span>
                      </div>
                      <div className="divide-y divide-slate-50">
                        {items.map((m) => (
                          <div key={m._id} className="flex items-center justify-between gap-4 px-5 py-3 hover:bg-slate-50 transition">
                            <div className="flex items-center gap-3 min-w-0">
                              <div className="w-9 h-9 rounded-lg bg-green-50 border-green-100 flex items-center justify-center shrink-0">
                                <FileText className="w-4 h-4 text-green-600" />
                              </div>
                              <div className="min-w-0">
                                <p className="text-sm font-semibold text-slate-800 truncate">{m.title}</p>
                                <p className="text-xs text-slate-400 truncate">
                                  {m.batch?.name || "—"} · {m.type || "PDF"}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                              <a
                                href={m.fileUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-green-50 text-green-700 hover:bg-green-100 transition inline-flex items-center gap-1"
                              >
                                <ExternalLink className="w-3.5 h-3.5" /> View
                              </a>
                              <button
                                onClick={() => setMaterialToDelete(m)}
                                className="p-1.5 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Upload / add-material modal */}
      {showUpload && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[92vh] flex-col">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between shrink-0">
              <div>
                <h2 className="font-extrabold text-xl text-slate-900">Add Study Material</h2>
                <p className="text-slate-500 text-xs mt-0.5">Unit → Chapter → Material</p>
              </div>
              <button onClick={() => setShowUpload(false)} className="p-2 rounded-lg hover:bg-slate-100 text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateMaterial} className="p-6 space-y-4 overflow-y-auto flex-1">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Title *</label>
                <input
                  required
                  value={form.title}
                  onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
                  placeholder="e.g. Rotational Dynamics — Handwritten Notes"
                  className="w-full px-3 py-2.5 border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Batch / Course *</label>
                  <select
                    required
                    value={form.batch}
                    onChange={(e) => setForm((p) => ({ ...p, batch: e.target.value }))}
                    className="w-full px-3 py-2.5 border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 bg-white"
                  >
                    <option value="">Select batch</option>
                    {batches.map((b) => (
                      <option key={b._id} value={b._id}>{b.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Subject</label>
                  <select
                    value={form.subject}
                    onChange={(e) => setForm((p) => ({ ...p, subject: e.target.value, unit: "", chapter: "" }))}
                    className="w-full px-3 py-2.5 border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 bg-white"
                  >
                    <option value="">Select subject</option>
                    {subjects.map((s) => (
                      <option key={s._id} value={s._id}>{s.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Unit step */}
              <div className="border border-slate-100 rounded-xl p-4 bg-slate-50/60">
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-2">
                  1 · Unit * {!form.subject && <span className="text-slate-400 normal-case">(pick a subject first)</span>}
                </label>
                <div className="flex gap-2">
                  <select
                    value={form.unit}
                    onChange={(e) => setForm((p) => ({ ...p, unit: e.target.value, chapter: "" }))}
                    disabled={!form.subject}
                    className="flex-1 px-3 py-2.5 border-slate-200 rounded-xl text-sm bg-white disabled:bg-slate-100"
                  >
                    <option value="">Select existing unit</option>
                    {units.map((u) => (
                      <option key={u._id} value={u._id}>{u.name}</option>
                    ))}
                  </select>
                </div>
                <div className="flex gap-2 mt-2">
                  <input
                    value={newUnitName}
                    onChange={(e) => setNewUnitName(e.target.value)}
                    placeholder="Or type a new unit name"
                    disabled={!form.subject}
                    className="flex-1 px-3 py-2.5 border-slate-200 rounded-xl text-sm disabled:bg-slate-100"
                  />
                  <button
                    type="button"
                    onClick={handleCreateUnit}
                    disabled={creatingUnit || !form.subject || !newUnitName.trim()}
                    className="px-4 py-2.5 bg-white border-slate-200 hover:bg-slate-50 disabled:opacity-50 text-slate-700 text-sm font-semibold rounded-xl inline-flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Unit
                  </button>
                </div>
              </div>

              {/* Chapter step */}
              <div className="border border-slate-100 rounded-xl p-4 bg-slate-50/60">
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-2">
                  2 · Chapter * {!form.unit && <span className="text-slate-400 normal-case">(pick a unit first)</span>}
                </label>
                <select
                  value={form.chapter}
                  onChange={(e) => setForm((p) => ({ ...p, chapter: e.target.value }))}
                  disabled={!form.unit}
                  className="w-full px-3 py-2.5 border-slate-200 rounded-xl text-sm bg-white disabled:bg-slate-100"
                >
                  <option value="">Select existing chapter</option>
                  {chapters.map((c) => (
                    <option key={c._id} value={c._id}>{c.name}</option>
                  ))}
                </select>
                <div className="flex gap-2 mt-2">
                  <input
                    value={newChapterName}
                    onChange={(e) => setNewChapterName(e.target.value)}
                    placeholder="Or type a new chapter name"
                    disabled={!form.unit}
                    className="flex-1 px-3 py-2.5 border-slate-200 rounded-xl text-sm disabled:bg-slate-100"
                  />
                  <button
                    type="button"
                    onClick={handleCreateChapter}
                    disabled={creatingChapter || !form.unit || !newChapterName.trim()}
                    className="px-4 py-2.5 bg-white border-slate-200 hover:bg-slate-50 disabled:opacity-50 text-slate-700 text-sm font-semibold rounded-xl inline-flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Chapter
                  </button>
                </div>
              </div>

              {/* Material step */}
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">3 · Material Type</label>
                <select
                  value={form.type}
                  onChange={(e) => setForm((p) => ({ ...p, type: e.target.value }))}
                  className="w-full px-3 py-2.5 border-slate-200 rounded-xl text-sm bg-white"
                >
                  <option value="PDF">PDF Document</option>
                  <option value="DOC">Word Document</option>
                  <option value="PPT">Presentation (PPT)</option>
                  <option value="IMAGE">Image / Diagram</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">
                  File Source (Upload to Cloudinary or external URL)
                </label>
                <div className="space-y-3">
                  <div className="border border-dashed border-slate-300 rounded-xl p-4 text-center hover:bg-slate-50 transition">
                    <input
                      type="file"
                      onChange={(e) => setFileToUpload(e.target.files[0] || null)}
                      className="text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100 cursor-pointer"
                    />
                    {fileToUpload && (
                      <div className="text-xs font-semibold text-green-600 mt-2">
                        Selected: {fileToUpload.name} ({(fileToUpload.size / (1024 * 1024)).toFixed(2)} MB)
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-400 font-semibold">
                    <LinkIcon className="w-3.5 h-3.5" /> OR enter an external URL
                  </div>
                  <input
                    type="url"
                    value={form.fileUrl}
                    onChange={(e) => setForm((p) => ({ ...p, fileUrl: e.target.value }))}
                    placeholder="https://drive.google.com/... or https://example.com/notes.pdf"
                    className="w-full px-3 py-2.5 border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Description (optional)</label>
                <textarea
                  rows={2}
                  value={form.description}
                  onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
                  placeholder="Summary or chapter coverage..."
                  className="w-full px-3 py-2.5 border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition resize-none"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowUpload(false)}
                  className="flex-1 py-2.5 border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  className="flex-1 py-2.5 bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white font-bold rounded-xl transition shadow-sm inline-flex items-center justify-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  {uploading ? "Uploading..." : "Publish Material"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmModal
        isOpen={!!materialToDelete}
        onClose={() => setMaterialToDelete(null)}
        onConfirm={confirmDeleteMaterial}
        title="Delete Material"
        message={`Are you sure you want to remove "${materialToDelete?.title}"?`}
        confirmLabel="Delete Material"
        danger={true}
      />
    </div>
  );
}

```

---

# FILE: `client\src\pages\teacher\TeacherPerformance.jsx`

```jsx
import { useState, useEffect } from "react";
import api from "../../config/api";
import {
  BarChart3, Users, TrendingUp, Award, Search, Trophy,
  Eye, X, CheckCircle2, ChevronRight, Filter, BookOpen
} from "lucide-react";

export default function TeacherPerformance() {
  const [stats, setStats] = useState(null);
  const [exams, setExams] = useState([]);
  const [batches, setBatches] = useState([]);
  const [selectedExamId, setSelectedExamId] = useState("");
  const [selectedBatchId, setSelectedBatchId] = useState("");
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [loadingResults, setLoadingResults] = useState(false);
  const [selectedResult, setSelectedResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        const [dashRes, examsRes, batchesRes] = await Promise.all([
          api.get("/dashboard/teacher").catch(() => ({ data: { data: null } })),
          api.get("/exams").catch(() => ({ data: { data: { exams: [] } } })),
          api.get("/batches").catch(() => ({ data: { data: { batches: [] } } })),
        ]);
        setStats(dashRes.data?.data);
        const fetchedExams = examsRes.data?.data?.exams || [];
        setExams(fetchedExams);
        setBatches(batchesRes.data?.data?.batches || []);

        if (fetchedExams.length > 0) {
          setSelectedExamId(fetchedExams[0]._id);
        }
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  useEffect(() => {
    if (!selectedExamId) return;
    const fetchExamResults = async () => {
      setLoadingResults(true);
      try {
        const { data } = await api.get(`/exams/${selectedExamId}/results`);
        setResults(data.data?.results || []);
      } catch {
        setResults([]);
      } finally {
        setLoadingResults(false);
      }
    };
    fetchExamResults();
  }, [selectedExamId]);

  const filteredResults = results.filter((r) => {
    const nameMatch = r.student?.name?.toLowerCase().includes(search.toLowerCase()) ||
      r.student?.email?.toLowerCase().includes(search.toLowerCase());
    return nameMatch;
  });

  const selectedExam = exams.find((e) => e._id === selectedExamId);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-10 h-10 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="font-extrabold text-2xl text-slate-900">Student Performance</h1>
        <p className="text-slate-500 text-sm mt-1">Track exam results and performance trends for your students</p>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Students", value: stats?.studentCount || stats?.totalStudents || 0, icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Exams Conducted", value: exams.length, icon: BarChart3, color: "text-purple-600", bg: "bg-purple-50" },
          { label: "Questions Authored", value: stats?.questionCount || 0, icon: TrendingUp, color: "text-green-600", bg: "bg-green-50" },
          { label: "Submissions Tracked", value: results.length, icon: Award, color: "text-amber-600", bg: "bg-amber-50" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
            <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center mb-3`}>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <div className="text-2xl font-extrabold text-slate-900">{stat.value}</div>
            <div className="text-xs text-slate-500 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Filter and Exam Selection */}
      <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h2 className="font-bold text-lg text-slate-900">Exam Performance Roster</h2>
            <p className="text-xs text-slate-500">Filter submissions by test and candidate</p>
          </div>
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            <select
              value={selectedExamId}
              onChange={(e) => setSelectedExamId(e.target.value)}
              className="px-3 py-2 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
            >
              {exams.map((ex) => (
                <option key={ex._id} value={ex._id}>{ex.title} ({ex.testType})</option>
              ))}
            </select>
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search candidate by name or email..."
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 bg-white"
          />
        </div>

        {/* Results Table */}
        {loadingResults ? (
          <div className="py-12 flex justify-center">
            <div className="w-8 h-8 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filteredResults.length === 0 ? (
          <div className="text-center py-12 text-slate-400">
            <BarChart3 className="w-10 h-10 mx-auto mb-2 text-slate-200" />
            <p className="text-sm font-semibold text-slate-600">No submissions found for this test</p>
            <p className="text-xs text-slate-400 mt-0.5">When students complete this exam, their rank and score will appear here.</p>
          </div>
        ) : (
          <div className="border border-slate-100 rounded-xl overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Rank</th>
                  <th className="py-3 px-4">Student</th>
                  <th className="py-3 px-4 text-center">Score</th>
                  <th className="py-3 px-4 text-center">Accuracy</th>
                  <th className="py-3 px-4 text-center">Time</th>
                  <th className="py-3 px-4 text-right">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredResults.map((r, i) => (
                  <tr key={r._id || i} className="hover:bg-slate-50 transition">
                    <td className="py-3 px-4">
                      <span className="font-extrabold text-xs px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700">
                        #{r.rank || i + 1}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-semibold text-slate-800">{r.student?.name || "Student"}</div>
                      <div className="text-xs text-slate-400">{r.student?.email}</div>
                    </td>
                    <td className="py-3 px-4 text-center font-bold text-slate-800">
                      {r.obtainedMarks} / {r.totalMarks || selectedExam?.totalMarks || 720}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-green-50 text-green-700 border border-green-200">
                        {Math.round(r.accuracy || 0)}%
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center text-xs text-slate-500">
                      {r.timeTaken ? `${Math.round(r.timeTaken / 60)} min` : "—"}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => setSelectedResult(r)}
                        className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-green-50 text-slate-600 hover:text-green-700 transition"
                      >
                        <Eye className="w-3.5 h-3.5" /> View Breakdown
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Student Performance Drilldown Modal */}
      {selectedResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white rounded-t-2xl z-10">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-green-50 text-green-700">
                  Performance Breakdown
                </span>
                <h2 className="font-extrabold text-xl text-slate-900 mt-1">{selectedResult.student?.name}</h2>
                <p className="text-xs text-slate-500">{selectedResult.student?.email}</p>
              </div>
              <button
                onClick={() => setSelectedResult(null)}
                className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-sm">
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="text-xs text-slate-400 font-medium">Rank</div>
                  <div className="text-xl font-extrabold text-slate-800">#{selectedResult.rank || 1}</div>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="text-xs text-slate-400 font-medium">Score</div>
                  <div className="text-xl font-extrabold text-slate-800">{selectedResult.obtainedMarks}</div>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="text-xs text-slate-400 font-medium">Accuracy</div>
                  <div className="text-xl font-extrabold text-green-600">{Math.round(selectedResult.accuracy || 0)}%</div>
                </div>
              </div>

              <div className="space-y-2 border-t border-slate-100 pt-3">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Question Statistics</div>
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2.5 rounded-xl bg-green-50 border border-green-200 text-green-700">
                    <span className="block font-extrabold text-base">{selectedResult.correctCount ?? 0}</span>
                    <span>Correct</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-700">
                    <span className="block font-extrabold text-base">{selectedResult.wrongCount ?? 0}</span>
                    <span>Incorrect</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-600">
                    <span className="block font-extrabold text-base">{selectedResult.unattemptedCount ?? 0}</span>
                    <span>Unattempted</span>
                  </div>
                </div>
              </div>

              {selectedResult.subjectBreakdown?.length > 0 && (
                <div className="border-t border-slate-100 pt-3">
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Subject Breakdown</div>
                  <div className="space-y-2">
                    {selectedResult.subjectBreakdown.map((sb, idx) => (
                      <div key={idx} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                        <span className="font-semibold text-slate-700">{sb.subject?.name || `Subject ${idx + 1}`}</span>
                        <div className="flex items-center gap-3 text-slate-500">
                          <span className="text-green-600 font-bold">+{sb.correct || 0}</span>
                          <span className="text-red-500 font-bold">-{sb.wrong || 0}</span>
                          <span className="font-extrabold text-slate-800">{sb.marks || 0} pts</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="p-6 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setSelectedResult(null)}
                className="px-5 py-2.5 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
```

---

# FILE: `client\src\utils\alert.js`

```javascript
import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

export const alertSuccess = (message) =>
  Toast.fire({ icon: "success", title: message });

export const alertError = (message) =>
  Toast.fire({ icon: "error", title: message });

export const alertInfo = (message) =>
  Toast.fire({ icon: "info", title: message });

export const alertWarning = (message) =>
  Toast.fire({ icon: "warning", title: message });

export const confirmDialog = async ({
  title = "Are you sure?",
  text = "This action cannot be undone.",
  confirmText = "Yes, do it",
  cancelText = "Cancel",
  danger = true,
} = {}) => {
  const result = await Swal.fire({
    title,
    text,
    icon: danger ? "warning" : "question",
    showCancelButton: true,
    confirmButtonColor: danger ? "#ef4444" : "#18A66A",
    cancelButtonColor: "#6b7280",
    confirmButtonText: confirmText,
    cancelButtonText: cancelText,
    reverseButtons: true,
  });
  return result.isConfirmed;
};

export const successModal = (title, html) =>
  Swal.fire({
    icon: "success",
    title,
    html,
    confirmButtonColor: "#18A66A",
  });

export const errorModal = (title, html) =>
  Swal.fire({
    icon: "error",
    title,
    html,
    confirmButtonColor: "#ef4444",
  });

export default Swal;
```

---

# FILE: `client\src\utils\csv.js`

```javascript
/**
 * Minimal, dependency-free CSV parser for exam question import.
 * Expected columns (header row required, case-insensitive):
 *   question, optionA, optionB, optionC, optionD, correct(A/B/C/D), marks,
 *   negativeMarks, difficulty, explanation, questionImageUrl,
 *   optionAImageUrl, optionBImageUrl, optionCImageUrl, optionDImageUrl
 *
 * Returns rows shaped for the API: { questionText, options[4], correctAnswer, ... }
 */
export function parseCSV(text) {
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += c;
      }
    } else if (c === '"') {
      inQuotes = true;
    } else if (c === ",") {
      row.push(field);
      field = "";
    } else if (c === "\n") {
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else if (c === "\r") {
      // ignore
    } else {
      field += c;
    }
  }
  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }

  if (rows.length < 2) return [];

  const header = rows[0].map((h) => h.trim().toLowerCase());
  const idx = (name) => header.indexOf(name);

  const col = {
    question: idx("question") >= 0 ? idx("question") : idx("questiontext"),
    a: idx("optiona"),
    b: idx("optionb"),
    c: idx("optionc"),
    d: idx("optiond"),
    correct: idx("correct"),
    marks: idx("marks"),
    negative: idx("negativemarks"),
    difficulty: idx("difficulty"),
    explanation: idx("explanation"),
    qImage: idx("questionimageurl"),
    ai: idx("optionaimageurl"),
    bi: idx("optionbimageurl"),
    ci: idx("optioncimageurl"),
    di: idx("optiondimageurl"),
  };

  const toLetterIndex = (v) => {
    if (v === undefined || v === null) return 0;
    const s = String(v).trim().toUpperCase();
    if (["A", "B", "C", "D"].includes(s)) return s.charCodeAt(0) - 65;
    const n = parseInt(s, 10);
    if (!isNaN(n) && n >= 0 && n <= 3) return n;
    return 0;
  };

  const get = (r, i) => (i >= 0 ? (r[i] || "").trim() : "");

  return rows
    .slice(1)
    .map((r) => ({
      questionText: get(r, col.question),
      options: [
        { text: get(r, col.a), imageUrl: get(r, col.ai) || undefined },
        { text: get(r, col.b), imageUrl: get(r, col.bi) || undefined },
        { text: get(r, col.c), imageUrl: get(r, col.ci) || undefined },
        { text: get(r, col.d), imageUrl: get(r, col.di) || undefined },
      ],
      correctAnswer: toLetterIndex(get(r, col.correct)),
      marks: col.marks >= 0 ? Number(get(r, col.marks)) || 4 : 4,
      negativeMarks: col.negative >= 0 ? Number(get(r, col.negative)) || 1 : 1,
      difficulty: get(r, col.difficulty) || "Medium",
      explanation: get(r, col.explanation) || undefined,
      questionImageUrl: get(r, col.qImage) || undefined,
    }))
    .filter((q) => q.questionText && q.options.some((o) => o.text));
}

export const CSV_TEMPLATE =
  "question,optionA,optionB,optionC,optionD,correct,marks,negativeMarks,difficulty,explanation,questionImageUrl,optionAImageUrl,optionBImageUrl,optionCImageUrl,optionDImageUrl\n" +
  '"Which organelle is the powerhouse of the cell?",Mitochondria,Ribosome,Nucleus,Golgi body,A,4,1,Medium,"Mitochondria produce ATP via respiration.",,,,,\n' +
  '"Dimensions of Planck\'s constant are:",MLT-1,ML2T-1,ML2T-2,MLT,2,4,1,Easy,"[p] = kg m2 s-1",,,,,\n';

export function downloadCSVTemplate() {
  const blob = new Blob([CSV_TEMPLATE], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "neetvidya-questions-template.csv";
  a.click();
  URL.revokeObjectURL(url);
}
```

---

# FILE: `client\tailwind.config.js`

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          black: "#0B0F0D",
          lime: "#A8C900",
          green: "#18A66A",
          white: "#FFFFFF",
          soft: "#F6F8F7",
          dark: "#111714",
        },
      },
      fontFamily: {
        heading: ["Manrope", "sans-serif"],
        body: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      borderRadius: {
        card: "12px",
        btn: "8px",
      },
    },
  },
  plugins: [],
};
```

---

# FILE: `client\vite.config.js`

```javascript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
    },
  },
});
```

---

# FILE: `codebase.py`

```python
from pathlib import Path
import re

# --- CONFIGURATION ---
PROJECT_ROOT = Path(__file__).resolve().parent
OUTPUT_FILE = PROJECT_ROOT / "codebase.md"

# Limit file size to prevent huge binaries from bloating the context
MAX_FILE_SIZE_KB = 150 
MAX_FILE_SIZE = MAX_FILE_SIZE_KB * 1024

# Directories to completely ignore
IGNORE_DIRS = {
    ".git", ".svn", ".hg",
    ".venv", "venv", "env",
    "node_modules", ".next", "dist", "build", "out",
    "coverage", ".cache", ".parcel-cache", ".turbo",
    "__pycache__", ".pytest_cache", ".mypy_cache",
    ".vscode", ".idea", "logs", "tmp", "temp",
    "uploads", "generated", "tests", # Assuming tests are separate or not needed for main context
}

# Specific files to ignore
IGNORE_FILES = {
    "codebase.md","project-plan.md", "techstack-and-hosting.md", # The output file itself
    ".env", ".env.local", ".env.development", ".env.production", # Secrets!
    ".gitignore", ".gitattributes",
    "package-lock.json", "pnpm-lock.yaml", "yarn.lock", "bun.lock", # Lock files are noise for logic understanding
    ".DS_Store", "Thumbs.db",
    "debug.log", "error.log", "server-out.log",
    "credentials.json", "service-account.json", "secrets.json",
    "CREDENTIALS.md", # Contains secrets
    "oldchat.md", # Historical chat noise
    "generate_placeholders.js", # One-time script
}

# File extensions to ignore (Binaries, Assets, Logs)
IGNORE_EXTENSIONS = {
    ".csv", ".xlsx", ".xls", ".db", ".sqlite", ".sqlite3",
    ".log", ".bak", ".tmp",
    ".zip", ".rar", ".7z", ".tar", ".gz",
    ".png", ".jpg", ".jpeg", ".gif", ".webp", ".svg", ".ico", # Images are visual, not logical
    ".mp3", ".wav", ".mp4", ".webm", ".avi", ".mov", # Videos
    ".pdf",
    ".woff", ".woff2", ".ttf", ".otf", # Fonts
    ".pem", ".key", ".p12", ".pfx", ".jks", ".crt", ".cert", # Keys
}

# File extensions to INCLUDE (Source Code & Configs)
INCLUDE_EXTENSIONS = {
    ".js", ".jsx", ".ts", ".tsx", ".mjs", ".cjs", # Frontend/Backend JS
    ".py", ".pyi", # Scripts
    ".html", ".css", ".scss", ".sass", # Styles
    ".json", # Configs (package.json, tsconfig, etc.)
    ".yaml", ".yml", ".toml", ".ini", ".conf", # Configs
    ".md", ".txt", # Documentation
    ".sh", ".bat", ".cmd", ".ps1", # Build scripts
}

# Important root files that MUST be included even if they look like config
IMPORTANT_FILES = {
    "README.md", "HOWTORUN.md", "LICENSE",
    "Dockerfile", "Makefile",
    "package.json", # Crucial for dependencies
    "vite.config.js", # Crucial for frontend build understanding
    "tailwind.config.js", # Crucial for design system understanding
    "postcss.config.js",
    ".env.example", # Safe way to show required env vars
    "tsconfig.json", "eslint.config.mjs", "components.json",
}

# Language mapping for Markdown code blocks
LANGUAGE_MAP = {
    ".py": "python", ".js": "javascript", ".jsx": "jsx",
    ".ts": "typescript", ".tsx": "tsx", ".mjs": "javascript",
    ".cjs": "javascript", ".html": "html", ".css": "css",
    ".scss": "scss", ".sass": "sass", ".json": "json",
    ".yaml": "yaml", ".yml": "yaml", ".toml": "toml",
    ".ini": "ini", ".md": "markdown", ".sh": "bash",
    ".bat": "bat", ".cmd": "bat", ".ps1": "powershell",
}

# --- GLOBAL STATE ---
skipped_files = []
all_files = []
included_files = set()
ui_files = {} # Map component name to path
used_ui_components = set()

def rel(path):
    try:
        return path.relative_to(PROJECT_ROOT)
    except ValueError:
        return path

def add_skip(path, reason):
    item = str(rel(path))
    if not any(x[0] == item for x in skipped_files):
        skipped_files.append((item, reason))

def is_inside(path, directory_names):
    try:
        parts = rel(path).parts
    except ValueError:
        return False
    # Check if any part of the path (except the file itself) is in the ignore list
    return any(part in directory_names for part in parts[:-1])

def file_too_large(path):
    try:
        return path.stat().st_size > MAX_FILE_SIZE
    except OSError:
        return True

def is_secret_file(path):
    name = path.name.lower()
    if name in {".env", ".env.local", ".env.development", ".env.production", ".env.test"}:
        return True
    if path.suffix.lower() in {".pem", ".key", ".p12", ".pfx", ".jks"}:
        return True
    return False

def basic_skip(path):
    if path.resolve() == OUTPUT_FILE.resolve():
        return True, "generated output"
    if path.name in IGNORE_FILES:
        return True, "ignored file"
    if is_secret_file(path):
        return True, "secret/credential file"
    if is_inside(path, IGNORE_DIRS):
        return True, "ignored directory"
    if path.suffix.lower() in IGNORE_EXTENSIONS:
        return True, "binary/asset file"
    return False, ""

def is_normal_source_candidate(path):
    skip, _ = basic_skip(path)
    if skip:
        return False
    if path.name in IMPORTANT_FILES:
        return True
    if path.suffix.lower() not in INCLUDE_EXTENSIONS:
        return False
    if file_too_large(path):
        return False
    return True

def scan_project():
    candidates = []
    for path in PROJECT_ROOT.rglob("*"):
        if not path.is_file():
            continue
        
        skip, reason = basic_skip(path)
        if skip:
            if reason != "ignored directory":
                add_skip(path, reason)
            continue
            
        if path.name in IMPORTANT_FILES:
            candidates.append(path)
            continue
            
        if path.suffix.lower() not in INCLUDE_EXTENSIONS:
            add_skip(path, "unsupported file type")
            continue
            
        if file_too_large(path):
            try:
                size = path.stat().st_size / 1024
            except OSError:
                size = 0
            add_skip(path, f"too large ({size:.1f} KB > {MAX_FILE_SIZE_KB} KB)")
            continue
            
        candidates.append(path)
    return sorted(candidates, key=lambda x: str(rel(x)).lower())

def index_ui_components():
    """Find all potential UI components in client/src/components/ui"""
    ui_root = PROJECT_ROOT / "client" / "src" / "components" / "ui"
    if not ui_root.exists():
        return
    for path in ui_root.rglob("*"):
        if not path.is_file():
            continue
        if path.suffix.lower() in {".ts", ".tsx", ".js", ".jsx"}:
            if not file_too_large(path):
                ui_files[path.stem] = path

def read_text(path):
    try:
        return path.read_text(encoding="utf-8", errors="replace")
    except Exception:
        return ""

def find_used_ui_components():
    """Scan source code to find which UI components are actually imported"""
    index_ui_components()
    if not ui_files:
        return set()

    # Patterns for imports like: import { Button } from "@/components/ui/button"
    import_patterns = [
        r'@/components/ui/([A-Za-z0-9_-]+)',
        r'components/ui/([A-Za-z0-9_-]+)',
        r'from ["\'].*?/ui/([A-Za-z0-9_-]+)["\']',
    ]
    
    used = set()
    # Scan all JS/TS/JSX/TSX files in client/src
    source_root = PROJECT_ROOT / "client" / "src"
    if not source_root.exists():
        return used

    for path in source_root.rglob("*"):
        if not path.is_file():
            continue
        if path.suffix.lower() not in {".js", ".jsx", ".ts", ".tsx"}:
            continue
        if is_inside(path, {"node_modules", "dist", "build"}):
            continue
            
        text = read_text(path)
        for pattern in import_patterns:
            for match in re.findall(pattern, text):
                component_name = match.strip()
                if component_name in ui_files:
                    used.add(ui_files[component_name])
    return used

def collect_final_files():
    global all_files, included_files, used_ui_components
    
    base_files = scan_project()
    used_ui = find_used_ui_components()
    used_ui_components = used_ui
    
    final_files = []
    
    # Add base files, excluding the UI folder initially (we add back only used ones)
    for path in base_files:
        # Skip if it's inside the UI folder, we handle that separately
        if "components" in path.parts and "ui" in path.parts:
            continue
        final_files.append(path)
        
    # Add only the used UI components
    for path in sorted(used_ui, key=lambda x: str(rel(x)).lower()):
        final_files.append(path)
        
    # Deduplicate
    unique = {}
    for path in final_files:
        unique[str(rel(path)).lower()] = path
        
    files = sorted(unique.values(), key=lambda x: str(rel(x)).lower())
    included_files = set(files)
    
    # Mark unused UI components as skipped
    if (PROJECT_ROOT / "client" / "src" / "components" / "ui").exists():
        for path in (PROJECT_ROOT / "client" / "src" / "components" / "ui").rglob("*"):
            if not path.is_file():
                continue
            if path.suffix.lower() in {".ts", ".tsx", ".js", ".jsx"}:
                if path not in used_ui:
                    add_skip(path, "unused UI component")
                    
    all_files = files
    return files

def build_tree(files):
    file_set = {path.relative_to(PROJECT_ROOT) for path in files}
    directory_set = {Path(".")}
    
    for file_path in file_set:
        current = file_path.parent
        while True:
            directory_set.add(current)
            if current == Path("."):
                break
            current = current.parent
            
    lines = [PROJECT_ROOT.name]
    
    def walk(directory, prefix=""):
        try:
            items = sorted(directory.iterdir(), key=lambda x: (x.is_file(), x.name.lower()))
        except (PermissionError, OSError):
            return
            
        visible = []
        for item in items:
            if item.is_dir():
                relative_dir = item.relative_to(PROJECT_ROOT)
                if item.name.startswith("."): continue
                if item.name in IGNORE_DIRS: continue
                if relative_dir not in directory_set: continue
                visible.append(item)
            else:
                relative_file = item.relative_to(PROJECT_ROOT)
                if relative_file not in file_set: continue
                visible.append(item)
                
        for index, item in enumerate(visible):
            last = index == len(visible) - 1
            connector = "└── " if last else "├── "
            lines.append(prefix + connector + item.name)
            if item.is_dir():
                walk(item, prefix + ("    " if last else "│   "))
                
    walk(PROJECT_ROOT)
    return lines

def language_for(path):
    return LANGUAGE_MAP.get(path.suffix.lower(), "text")

def write_file(md, path):
    text = read_text(path)
    md.write(f"# FILE: `{rel(path)}`\n\n")
    md.write(f"```{language_for(path)}\n")
    md.write(text)
    if not text.endswith("\n"):
        md.write("\n")
    md.write("```\n\n---\n\n")

def write_skipped(md):
    md.write("# Skipped Files\n\n")
    if not skipped_files:
        md.write("No files were skipped.\n\n")
        return
    md.write("| File | Reason |\n|---|---|\n")
    for file_path, reason in sorted(skipped_files, key=lambda x: x[0].lower()):
        safe_path = file_path.replace("|", "\\|")
        safe_reason = reason.replace("|", "\\|")
        md.write(f"| `{safe_path}` | {safe_reason} |\n")
    md.write("\n")

def main():
    global skipped_files
    skipped_files = []
    
    print("Scanning project...")
    files = collect_final_files()
    
    print("Building tree...")
    tree = build_tree(files)
    
    print("Writing codebase.md...")
    with OUTPUT_FILE.open("w", encoding="utf-8") as md:
        md.write("# NEETVIDYA Project Codebase\n\n")
        md.write("> This file contains the essential source code and configuration for the NEETVIDYA platform. \n")
        md.write("> It excludes binaries, locks, secrets, and unused UI components to optimize for AI context.\n\n")
        
        md.write(f"**Project:** `{PROJECT_ROOT.name}`  \n")
        md.write(f"**Included files:** `{len(files)}`  \n")
        md.write(f"**Skipped files:** `{len(skipped_files)}`  \n")
        md.write(f"**Max file size:** `{MAX_FILE_SIZE_KB} KB`  \n\n")
        md.write("---\n\n")
        
        md.write("# Project Structure\n\n```text\n")
        md.write("\n".join(tree))
        md.write("\n```\n\n---\n\n")
        
        md.write("# Included Files\n\n")
        for path in files:
            md.write(f"- `{rel(path)}`\n")
        md.write("\n---\n\n")
        
        write_skipped(md)
        md.write("---\n\n")
        
        md.write("# Source Files\n\n")
        for path in files:
            write_file(md, path)
            
    print("=" * 50)
    print("Codebase generated successfully")
    print("=" * 50)
    print(f"Output          : {OUTPUT_FILE}")
    print(f"Included files  : {len(files)}")
    print(f"Skipped files   : {len(skipped_files)}")
    print(f"Used UI Comps   : {len(used_ui_components)}")
    print("=" * 50)

if __name__ == "__main__":
    main()
```

---

# FILE: `docs\IMPLEMENTATION_PLAN.md`

```markdown
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
```

---

# FILE: `HOWTORUN.md`

```markdown
# NEETVIDYA — How to Run

### 1. Prerequisites
- Node.js installed
- MongoDB running locally or Atlas URI ready

### 2. Setup Environment
1. Copy `server/.env.example` to `server/.env` and fill in details (MongoDB, Cloudinary, JWT).
2. Copy `client/.env.example` to `client/.env`.

### 3. Install & Start
Run these commands from the **root** folder:

```bash
# Install all dependencies
npm run install-all

# Start both Backend (5000) and Frontend (5173)
npm run dev
```

### 4. Login Credentials for Local Testing
| Role | Email | Password |
|---|---|---|
| Admin | `neetvidya720@gmail.com` | `Admin@NEET2026` |
| Teacher | `ramijkhan314@gmail.com` | `Teacher@NEET2026` |
| Teacher | `bheshmadas377@gmail.com` | `Teacher@NEET2026` |
| Student | `sabir.gdsc@gmail.com` | `Student@NEET2026` |

Official Telegram: https://t.me/neetvidya720official

### 5. Seed the Database
Run this once locally to create the core local accounts and the two default batches:

```bash
cd server
npm run seed
```

This seed creates:
- the admin, student and faculty test accounts
- the two default batches for the institute:
  - 12th Batch – SANKALP
  - 11th Batch – UDAAN
- no demo courses or demo tests, so all academic content must be added from the admin panel

### 6. Batch Details
- **12th Batch – SANKALP**
  - Duration: Complete 1 Year
  - Fees: ₹20,000
- **11th Batch – UDAAN**
  - Duration: Complete 2 Years
  - Fees: ₹35,000

### 7. Access
- **Frontend:** [http://localhost:5173](http://localhost:5173)
- **Backend:** [http://localhost:5000](http://localhost:5000)
```

---

# FILE: `implimentation.md`

```markdown
1. batches cannot be selected while ceating exam or any other type of work like adding metarials to course .

2. remove the separate video uploading section from admin , techers, students video viewing .. videos should be added as like as study metarials , using links of drive or any link or direct upload to cloudinary but never , add a waring noit to use direct upload much use drive link or other links more for less memory consmption

3. evrything should be saved in mongo db , and others media in cloudinary aready adde env things .. 
i think already implimented but you can cheak and fix if needed .
```

---

# FILE: `package.json`

```json
{
  "name": "neetvidya",
  "version": "1.0.0",
  "description": "NEETVIDYA - Medical Education Platform",
  "scripts": {
    "dev": "concurrently \"npm run server\" \"npm run client\"",
    "server": "cd server && npm run dev",
    "client": "cd client && npm run dev",
    "install-all": "npm install && cd server && npm install && cd ../client && npm install",
    "build": "cd client && npm run build",
    "start": "cd server && npm start"
  },
  "devDependencies": {
    "concurrently": "^8.2.2"
  }
}
```

---

# FILE: `README.md`

```markdown
# NEETVIDYA
Coaching and Examination Management Platform for a newly established tutoring institute.
```

---

# FILE: `server\.env.example`

```text
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/neetvidya
JWT_SECRET=neetvidya_jwt_super_secret_key_2026_dev_change_in_prod
JWT_EXPIRES_IN=7d
JWT_REFRESH_SECRET=neetvidya_refresh_super_secret_key_2026_dev_change_in_prod
JWT_REFRESH_EXPIRES_IN=30d

# Cloudinary (for file uploads)
CLOUDINARY_CLOUD_NAME=neetvidya
CLOUDINARY_API_KEY=1234567890
CLOUDINARY_API_SECRET=abcdef123456

# Client URL (for email links)
CLIENT_URL=http://localhost:5173

# SMTP Email Configuration
# For development, use Mailtrap (https://mailtrap.io) or leave blank for console logging
# For production, use Gmail, SendGrid, AWS SES, etc.
SMTP_HOST=smtp.ethereal.email
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your_smtp_username
SMTP_PASS=your_smtp_password
EMAIL_FROM=noreply@neetvidya.com
```

---

# FILE: `server\package.json`

```json
{
  "name": "neetvidya-server",
  "version": "1.0.0",
  "description": "NEETVIDYA Backend API",
  "main": "src/server.js",
  "scripts": {
    "dev": "nodemon src/server.js",
    "start": "node src/server.js",
    "seed": "node src/seed.js"
  },
  "dependencies": {
    "bcryptjs": "^2.4.3",
    "cloudinary": "^2.0.1",
    "compression": "^1.7.4",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "express": "^4.18.2",
    "express-rate-limit": "^7.1.5",
    "express-validator": "^7.0.1",
    "helmet": "^7.1.0",
    "jsonwebtoken": "^9.0.2",
    "mongoose": "^8.0.3",
    "morgan": "^1.10.0",
    "multer": "^1.4.5-lts.1",
    "nodemailer": "^6.9.7"
  },
  "devDependencies": {
    "nodemon": "^3.0.2"
  }
}
```

---

# FILE: `server\src\app.js`

```javascript
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const compression = require("compression");
const rateLimit = require("express-rate-limit");
const routes = require("./routes");
const { errorHandler, notFound } = require("./middleware/errorHandler.middleware");

const app = express();

app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors({
  origin: true,
  credentials: true,
}));
app.use(compression());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 500,
  message: { success: false, message: "Too many requests. Please try again later." },
});
app.use("/api/", apiLimiter);

app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "NEETVIDYA API is running", timestamp: new Date().toISOString() });
});

app.use("/api", routes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
```

---

# FILE: `server\src\config\cloudinary.js`

```javascript
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "neetvidya",
  api_key: process.env.CLOUDINARY_API_KEY || "dummy_api_key",
  api_secret: process.env.CLOUDINARY_API_SECRET || "dummy_api_secret",
});

module.exports = cloudinary;
```

---

# FILE: `server\src\config\db.js`

```javascript
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/neetvidya";
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 3000,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.warn(`MongoDB Connection Warning: ${error.message}. (Server can run with in-memory or fallback mode for development)`);
  }
};

module.exports = connectDB;
```

---

# FILE: `server\src\config\env.js`

```javascript
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
```

---

# FILE: `server\src\constants\achievementCategories.js`

```javascript
module.exports = {
  STUDENT_RESULT: "STUDENT_RESULT",
  INSTITUTE_MILESTONE: "INSTITUTE_MILESTONE",
  AWARD: "AWARD",
  CERTIFICATION: "CERTIFICATION",
  EVENT: "EVENT",
  CUSTOM: "CUSTOM",
};
```

---

# FILE: `server\src\constants\batchTypes.js`

```javascript
module.exports = {
  OFFLINE: "OFFLINE",
  ONLINE: "ONLINE",
  HYBRID: "HYBRID",
  EXAM_ONLY: "EXAM_ONLY",
  CRASH_COURSE: "CRASH_COURSE",
};
```

---

# FILE: `server\src\constants\cloudinaryFolders.js`

```javascript
module.exports = {
  MATERIALS: "neetvidya/materials",
  LECTURES: "neetvidya/lectures",
  TEACHERS: "neetvidya/teachers",
  COURSES: "neetvidya/courses",
  WEBSITE: "neetvidya/website",
  QUESTIONS: "neetvidya/questions",
  ACHIEVEMENTS: "neetvidya/achievements",
};
```

---

# FILE: `server\src\constants\enrollmentStatus.js`

```javascript
module.exports = {
  ACTIVE: "ACTIVE",
  EXPIRED: "EXPIRED",
  SUSPENDED: "SUSPENDED",
  COMPLETED: "COMPLETED",
};
```

---

# FILE: `server\src\constants\examStatus.js`

```javascript
module.exports = {
  DRAFT: "DRAFT",
  SCHEDULED: "SCHEDULED",
  LIVE: "LIVE",
  CLOSED: "CLOSED",
};
```

---

# FILE: `server\src\constants\questionStates.js`

```javascript
module.exports = {
  ANSWERED: "ANSWERED",
  UNANSWERED: "UNANSWERED",
  MARKED_REVIEW: "MARKED_REVIEW",
  ANSWERED_REVIEW: "ANSWERED_REVIEW",
};
```

---

# FILE: `server\src\constants\resourceTypes.js`

```javascript
module.exports = {
  EXTERNAL_LINK: "EXTERNAL_LINK",
  YOUTUBE: "YOUTUBE",
  GOOGLE_DRIVE: "GOOGLE_DRIVE",
  REFERENCE_SITE: "REFERENCE_SITE",
  TOOL: "TOOL",
  CUSTOM: "CUSTOM",
};
```

---

# FILE: `server\src\constants\roles.js`

```javascript
module.exports = {
  STUDENT: "student",
  TEACHER: "teacher",
  ADMIN: "admin",
};
```

---

# FILE: `server\src\constants\studentTypes.js`

```javascript
module.exports = {
  REGULAR_OFFLINE: "REGULAR_OFFLINE",
  REGULAR_ONLINE: "REGULAR_ONLINE",
  HYBRID: "HYBRID",
  EXAM_ONLY: "EXAM_ONLY",
  GUEST: "GUEST",
};
```

---

# FILE: `server\src\constants\testTypes.js`

```javascript
module.exports = {
  DPP: "DPP",
  CHAPTER_TEST: "CHAPTER_TEST",
  UNIT_TEST: "UNIT_TEST",
  MOCK_TEST: "MOCK_TEST",
  PYQ: "PYQ",
};
```

---

# FILE: `server\src\controllers\achievement.controller.js`

```javascript
const Achievement = require("../models/Achievement");
const apiResponse = require("../utils/apiResponse");
const ApiError = require("../utils/apiError");

const getAchievements = async (req, res, next) => {
  try {
    const filter = { isActive: true };
    if (req.query.featured === "true") filter.featured = true;
    const achievements = await Achievement.find(filter).sort({ displayOrder: 1 });
    return apiResponse(res, 200, "Achievements", { achievements });
  } catch (error) {
    next(error);
  }
};

const createAchievement = async (req, res, next) => {
  try {
    const achievement = await Achievement.create({ ...req.body, createdBy: req.user._id });
    return apiResponse(res, 201, "Achievement created", { achievement });
  } catch (error) {
    next(error);
  }
};

const updateAchievement = async (req, res, next) => {
  try {
    const achievement = await Achievement.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!achievement) throw new ApiError(404, "Achievement not found");
    return apiResponse(res, 200, "Achievement updated", { achievement });
  } catch (error) {
    next(error);
  }
};

const deleteAchievement = async (req, res, next) => {
  try {
    const achievement = await Achievement.findByIdAndUpdate(req.params.id, { isActive: false });
    if (!achievement) throw new ApiError(404, "Achievement not found");
    return apiResponse(res, 200, "Achievement deleted");
  } catch (error) {
    next(error);
  }
};

module.exports = { getAchievements, createAchievement, updateAchievement, deleteAchievement };
```

---

# FILE: `server\src\controllers\attempt.controller.js`

```javascript
const apiResponse = require("../utils/apiResponse");
const {
  getAttemptById,
  getMyAttempts: getMyAttemptsService,
  startAttempt: startAttemptService,
  saveAttemptState: saveAttemptStateService,
  submitAttempt: submitAttemptService,
} = require("../services/attempt.service");

const startAttempt = async (req, res, next) => {
  try {
    const result = await startAttemptService(req.params.examId, req.user._id, req.user);
    return apiResponse(res, 200, result.resumed ? "Resuming existing attempt" : "Attempt started", result);
  } catch (error) {
    next(error);
  }
};

const saveAttemptState = async (req, res, next) => {
  try {
    await saveAttemptStateService(req.params.id, req.user._id, req.body);
    return apiResponse(res, 200, "Attempt state saved");
  } catch (error) {
    next(error);
  }
};

const submitAttempt = async (req, res, next) => {
  try {
    const { result, message } = await submitAttemptService(req.params.id, req.user);
    if (result === undefined && message) {
      return apiResponse(res, 200, message);
    }
    if (result === null) {
      return apiResponse(res, 200, "Exam already submitted");
    }
    return apiResponse(res, 200, "Exam submitted successfully", { result });
  } catch (error) {
    next(error);
  }
};

const getAttempt = async (req, res, next) => {
  try {
    const attempt = await getAttemptById(req.params.id);
    return apiResponse(res, 200, "Attempt retrieved", { attempt });
  } catch (error) {
    next(error);
  }
};

const getMyAttempts = async (req, res, next) => {
  try {
    const attempts = await getMyAttemptsService(req.user._id);
    return apiResponse(res, 200, "Attempts retrieved", { attempts });
  } catch (error) {
    next(error);
  }
};

module.exports = { startAttempt, saveAttemptState, submitAttempt, getAttempt, getMyAttempts };
```

---

# FILE: `server\src\controllers\auth.controller.js`

```javascript
const authService = require("../services/auth.service");
const apiResponse = require("../utils/apiResponse");

const register = async (req, res, next) => {
  try {
    const { name, email, password, phone } = req.body;
    const result = await authService.register(name, email, password, phone);
    return apiResponse(res, 201, result.message, { userId: result.userId, email: result.email });
  } catch (error) {
    next(error);
  }
};

const verifyEmail = async (req, res, next) => {
  try {
    const { token } = req.query;
    if (!token) return apiResponse(res, 400, "Verification token is required");
    const result = await authService.verifyEmail(token);
    return apiResponse(res, 200, result.message);
  } catch (error) {
    next(error);
  }
};

const resendVerification = async (req, res, next) => {
  try {
    const { email } = req.body;
    const result = await authService.resendVerification(email);
    return apiResponse(res, 200, result.message);
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await authService.login(email, password);
    return apiResponse(res, 200, "Login successful", result);
  } catch (error) {
    next(error);
  }
};

const refresh = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    const result = await authService.refreshToken(refreshToken);
    return apiResponse(res, 200, "Token refreshed", result);
  } catch (error) {
    next(error);
  }
};

const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const result = await authService.forgotPassword(email);
    return apiResponse(res, 200, result.message);
  } catch (error) {
    next(error);
  }
};

const resetPassword = async (req, res, next) => {
  try {
    const { token } = req.query;
    const { password } = req.body;
    if (!token) return apiResponse(res, 400, "Reset token is required");
    if (!password || password.length < 8)
      return apiResponse(res, 400, "Password must be at least 8 characters");
    const result = await authService.resetPassword(token, password);
    return apiResponse(res, 200, result.message);
  } catch (error) {
    next(error);
  }
};

const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const result = await authService.changePassword(req.user._id, currentPassword, newPassword);
    return apiResponse(res, 200, result.message);
  } catch (error) {
    next(error);
  }
};

const getMe = async (req, res) => {
  return apiResponse(res, 200, "User profile", { user: req.user });
};

const updateProfile = async (req, res, next) => {
  try {
    const user = await authService.updateProfile(req.user._id, req.body);
    return apiResponse(res, 200, "Profile updated successfully", { user });
  } catch (error) {
    next(error);
  }
};

const adminCreateStudent = async (req, res, next) => {
  try {
    const result = await authService.adminCreateStudent(req.body);
    return apiResponse(res, 201, "Student created successfully", result);
  } catch (error) {
    next(error);
  }
};

const adminCreateTeacher = async (req, res, next) => {
  try {
    const result = await authService.adminCreateTeacher(req.body);
    return apiResponse(res, 201, "Teacher created successfully", result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  verifyEmail,
  resendVerification,
  login,
  refresh,
  forgotPassword,
  resetPassword,
  changePassword,
  getMe,
  updateProfile,
  adminCreateStudent,
  adminCreateTeacher,
};
```

---

# FILE: `server\src\controllers\batch.controller.js`

```javascript
const apiResponse = require("../utils/apiResponse");
const ApiError = require("../utils/apiError");
const {
  createBatch: createBatchService,
  getBatches: getBatchesService,
  getBatchById,
  updateBatch: updateBatchService,
  deleteBatch: deleteBatchService,
  addStudentsToBatch: addStudentsToBatchService,
  removeStudentFromBatch: removeStudentFromBatchService,
} = require("../services/batch.service");

const getBatches = async (req, res, next) => {
  try {
    const { type, course } = req.query;
    const filter = {};
    if (type) filter.batchType = type;
    if (course) filter.course = course;
    const batches = await getBatchesService(filter);
    return apiResponse(res, 200, "Batches retrieved", { batches });
  } catch (error) {
    next(error);
  }
};

const createBatch = async (req, res, next) => {
  try {
    const batch = await createBatchService(req.body, req.user._id);
    return apiResponse(res, 201, "Batch created", { batch });
  } catch (error) {
    next(error);
  }
};

const updateBatch = async (req, res, next) => {
  try {
    const batch = await updateBatchService(req.params.id, req.body);
    return apiResponse(res, 200, "Batch updated", { batch });
  } catch (error) {
    next(error);
  }
};

const deleteBatch = async (req, res, next) => {
  try {
    const batch = await deleteBatchService(req.params.id);
    return apiResponse(res, 200, "Batch deactivated", { batch });
  } catch (error) {
    next(error);
  }
};

const addStudentsToBatch = async (req, res, next) => {
  try {
    const { studentIds } = req.body;
    if (!Array.isArray(studentIds) || studentIds.length === 0) {
      throw new ApiError(400, "studentIds array is required");
    }
    const batch = await addStudentsToBatchService(req.params.id, studentIds);
    return apiResponse(res, 200, "Students added to batch", { batch });
  } catch (error) {
    next(error);
  }
};

const removeStudentFromBatch = async (req, res, next) => {
  try {
    const { studentId } = req.params;
    await removeStudentFromBatchService(req.params.id, studentId);
    return apiResponse(res, 200, "Student removed from batch");
  } catch (error) {
    next(error);
  }
};

const getBatchStudents = async (req, res, next) => {
  try {
    const batch = await getBatchById(req.params.id);
    return apiResponse(res, 200, "Batch students", { students: batch.students });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getBatches,
  createBatch,
  updateBatch,
  deleteBatch,
  addStudentsToBatch,
  removeStudentFromBatch,
  getBatchStudents,
};
```

---

# FILE: `server\src\controllers\contactSettings.controller.js`

```javascript
const ContactSettings = require("../models/ContactSettings");
const apiResponse = require("../utils/apiResponse");

const getSettings = async (req, res, next) => {
  try {
    let settings = await ContactSettings.findOne();
    if (!settings) settings = await ContactSettings.create({});
    return apiResponse(res, 200, "Contact settings", { settings });
  } catch (error) {
    next(error);
  }
};

const updateSettings = async (req, res, next) => {
  try {
    const settings = await ContactSettings.findOneAndUpdate(
      {},
      { $set: req.body },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    return apiResponse(res, 200, "Contact settings updated", { settings });
  } catch (error) {
    next(error);
  }
};

module.exports = { getSettings, updateSettings, ContactSettings };
```

---

# FILE: `server\src\controllers\course.controller.js`

```javascript
const apiResponse = require("../utils/apiResponse");
const {
  createCourse: createCourseService,
  getCourses: getCoursesService,
  getCourseById: getCourseByIdService,
  updateCourse: updateCourseService,
  deleteCourse: deleteCourseService,
} = require("../services/course.service");

const getCourses = async (req, res, next) => {
  try {
    const courses = await getCoursesService();
    return apiResponse(res, 200, "Courses retrieved", { courses });
  } catch (error) {
    next(error);
  }
};

const getCourseById = async (req, res, next) => {
  try {
    const course = await getCourseByIdService(req.params.id);
    return apiResponse(res, 200, "Course details", { course });
  } catch (error) {
    next(error);
  }
};

const createCourse = async (req, res, next) => {
  try {
    const course = await createCourseService(req.body, req.user._id);
    return apiResponse(res, 201, "Course created", { course });
  } catch (error) {
    next(error);
  }
};

const updateCourse = async (req, res, next) => {
  try {
    const course = await updateCourseService(req.params.id, req.body);
    return apiResponse(res, 200, "Course updated", { course });
  } catch (error) {
    next(error);
  }
};

const deleteCourse = async (req, res, next) => {
  try {
    const course = await deleteCourseService(req.params.id);
    return apiResponse(res, 200, "Course deactivated", { course });
  } catch (error) {
    next(error);
  }
};

module.exports = { getCourses, getCourseById, createCourse, updateCourse, deleteCourse };
```

---

# FILE: `server\src\controllers\dashboard.controller.js`

```javascript
const {
  getAdminDashboard: getAdminDashboardData,
  getStudentDashboard: getStudentDashboardData,
  getTeacherDashboard: getTeacherDashboardData,
} = require("../services/dashboard.service");
const apiResponse = require("../utils/apiResponse");

const getAdminDashboard = async (req, res, next) => {
  try {
    const data = await getAdminDashboardData();
    return apiResponse(res, 200, "Admin dashboard", data);
  } catch (error) {
    next(error);
  }
};

const getStudentDashboard = async (req, res, next) => {
  try {
    const data = await getStudentDashboardData(req.user._id);
    return apiResponse(res, 200, "Student dashboard", data);
  } catch (error) {
    next(error);
  }
};

const getTeacherDashboard = async (req, res, next) => {
  try {
    const data = await getTeacherDashboardData(req.user._id);
    return apiResponse(res, 200, "Teacher dashboard", data);
  } catch (error) {
    next(error);
  }
};

module.exports = { getAdminDashboard, getStudentDashboard, getTeacherDashboard };
```

---

# FILE: `server\src\controllers\enquiry.controller.js`

```javascript
const Enquiry = require("../models/Enquiry");
const apiResponse = require("../utils/apiResponse");
const ApiError = require("../utils/apiError");

const submitEnquiry = async (req, res, next) => {
  try {
    const enquiry = await Enquiry.create({ ...req.body, source: "WEBSITE" });
    return apiResponse(res, 201, "Enquiry submitted", { enquiry });
  } catch (error) {
    next(error);
  }
};

const getEnquiries = async (req, res, next) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const filter = {};
    if (status && status !== "All") filter.status = status;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const enquiries = await Enquiry.find(filter)
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });
    const total = await Enquiry.countDocuments(filter);
    return apiResponse(res, 200, "Enquiries", { enquiries, total });
  } catch (error) {
    next(error);
  }
};

const updateEnquiry = async (req, res, next) => {
  try {
    const enquiry = await Enquiry.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!enquiry) throw new ApiError(404, "Enquiry not found");
    return apiResponse(res, 200, "Enquiry updated", { enquiry });
  } catch (error) {
    next(error);
  }
};

const deleteEnquiry = async (req, res, next) => {
  try {
    const enquiry = await Enquiry.findByIdAndDelete(req.params.id);
    if (!enquiry) throw new ApiError(404, "Enquiry not found");
    return apiResponse(res, 200, "Enquiry deleted");
  } catch (error) {
    next(error);
  }
};

module.exports = { submitEnquiry, getEnquiries, updateEnquiry, deleteEnquiry };
```

---

# FILE: `server\src\controllers\exam.controller.js`

```javascript
const Exam = require("../models/Exam");
const Result = require("../models/Result");
const Attempt = require("../models/Attempt");
const apiResponse = require("../utils/apiResponse");
const ApiError = require("../utils/apiError");
const svc = require("../services/exam.service");

const getExams = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;

    if (req.user.role === "student") {
      // Students only ever see released exams for their batch / permitted exams.
      const data = await svc.getStudentExams(req.user, { page, limit });
      return apiResponse(res, 200, "Exams retrieved", data);
    }

    const filter = req.query.archived === "true"
      ? { isArchived: true }
      : { isArchived: { $ne: true } };
    if (req.query.status) filter.status = req.query.status;
    if (req.query.testType) filter.testType = req.query.testType;
    if (req.query.batch) filter.batch = req.query.batch;
    if (req.query.search) filter.title = { $regex: req.query.search, $options: "i" };

    const data = await svc.getExams(filter, { page, limit });
    return apiResponse(res, 200, "Exams retrieved", data);
  } catch (error) {
    next(error);
  }
};

const getExamById = async (req, res, next) => {
  try {
    const exam = await svc.getExamById(req.params.id);
    if (req.user.role === "student") {
      await svc.assertExamAccess(req.user, exam);
      // Students never receive correct answers of a live/secret exam.
    }
    return apiResponse(res, 200, "Exam details", { exam });
  } catch (error) {
    next(error);
  }
};

const createExam = async (req, res, next) => {
  try {
    const exam = await svc.createExam(req.body, req.user._id);
    return apiResponse(res, 201, "Exam created", { exam });
  } catch (error) {
    next(error);
  }
};

const updateExam = async (req, res, next) => {
  try {
    const exam = await svc.updateExam(req.params.id, req.body);
    return apiResponse(res, 200, "Exam updated", { exam });
  } catch (error) {
    next(error);
  }
};

const publishExam = async (req, res, next) => {
  try {
    const exam = await svc.publishExam(req.params.id);
    return apiResponse(res, 200, "Exam published", { exam });
  } catch (error) {
    next(error);
  }
};

const closeExam = async (req, res, next) => {
  try {
    const exam = await svc.closeExam(req.params.id);
    return apiResponse(res, 200, "Exam closed and archived into Question Bank", { exam });
  } catch (error) {
    next(error);
  }
};

const archiveExam = async (req, res, next) => {
  try {
    const exam = await svc.archiveExam(req.params.id);
    return apiResponse(res, 200, "Exam archived", { exam });
  } catch (error) {
    next(error);
  }
};

const setStudyVisibility = async (req, res, next) => {
  try {
    const exam = await svc.setStudyVisibility(req.params.id, req.body.studyVisible);
    return apiResponse(res, 200, "Study visibility updated", { exam });
  } catch (error) {
    next(error);
  }
};

const reconductExam = async (req, res, next) => {
  try {
    const exam = await svc.reconductExam(req.params.id, req.body || {}, req.user._id);
    return apiResponse(res, 201, "Exam reconducted as new draft", { exam });
  } catch (error) {
    next(error);
  }
};

const downloadExam = async (req, res, next) => {
  try {
    const pack = await svc.buildExamPack(req.params.id);
    return apiResponse(res, 200, "Exam pack", { pack });
  } catch (error) {
    next(error);
  }
};

const getQuestionBank = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const data = await svc.getQuestionBank({ page, limit, search: req.query.search || "" });
    return apiResponse(res, 200, "Question bank (archived exam papers)", data);
  } catch (error) {
    next(error);
  }
};

const publishResults = async (req, res, next) => {
  try {
    const exam = await svc.publishResults(req.params.id, {
      publish: req.body.publish !== false,
    });
    return apiResponse(res, 200, "Results published", { exam });
  } catch (error) {
    next(error);
  }
};

const grantPermission = async (req, res, next) => {
  try {
    const perm = await svc.grantExamPermission(
      { studentId: req.body.studentId, examId: req.params.id, reason: req.body.reason },
      req.user._id
    );
    return apiResponse(res, 201, "Exam permission granted", { permission: perm });
  } catch (error) {
    next(error);
  }
};

const revokePermission = async (req, res, next) => {
  try {
    await svc.revokeExamPermission({ studentId: req.params.studentId, examId: req.params.id });
    return apiResponse(res, 200, "Exam permission revoked");
  } catch (error) {
    next(error);
  }
};

const listPermissions = async (req, res, next) => {
  try {
    const permissions = await svc.listExamPermissions(req.params.id);
    return apiResponse(res, 200, "Exam permissions", { permissions });
  } catch (error) {
    next(error);
  }
};

const importQuestions = async (req, res, next) => {
  try {
    const Question = require("../models/Question");
    const { questions = [] } = req.body;
    const exam = await Exam.findById(req.params.id);
    if (!exam) throw new ApiError(404, "Exam not found");

    const valid = questions.filter(
      (q) => q.questionText && q.options?.length >= 4 && q.correctAnswer !== undefined
    );
    if (valid.length === 0) throw new ApiError(400, "No valid questions found");

    const created = await Question.insertMany(
      valid.map((q) => ({
        questionText: q.questionText,
        questionImageUrl: q.questionImageUrl,
        options: q.options.map((o, i) => ({ text: o.text, imageUrl: o.imageUrl, order: i })),
        correctAnswer: Number(q.correctAnswer),
        explanation: q.explanation,
        difficulty: q.difficulty || "Medium",
        marks: Number(q.marks || exam.marksPerCorrect || 4),
        negativeMarks: Number(q.negativeMarks || exam.negativePerWrong || 1),
        subject: q.subject || undefined,
        chapter: q.chapter || undefined,
        batch: exam.batch,
        createdBy: req.user._id,
      }))
    );
    exam.questions = [...(exam.questions || []), ...created.map((c) => c._id)];
    exam.totalQuestions = exam.questions.length;
    if (!exam.totalMarks || exam.totalMarks === 0) {
      exam.totalMarks = exam.totalQuestions * (exam.marksPerCorrect || 4);
    }
    await exam.save();

    return apiResponse(res, 201, `${created.length} questions imported into exam`, {
      count: created.length,
      exam,
    });
  } catch (error) {
    next(error);
  }
};

// Create a single question that belongs to this exam only
const createExamQuestion = async (req, res, next) => {
  try {
    const exam = await Exam.findById(req.params.id);
    if (!exam) throw new ApiError(404, "Exam not found");

    const { uploadFile } = require("../services/cloudinary.service");
    const FOLDERS = require("../constants/cloudinaryFolders");
    const Question = require("../models/Question");

    const body = { ...req.body };
    let options = JSON.parse(body.options || "[]");

    if (req.files?.questionImage?.[0]) {
      const r = await uploadFile(req.files.questionImage[0].buffer, FOLDERS.QUESTIONS, "image");
      body.questionImageUrl = r.url;
      body.questionImagePublicId = r.publicId;
    }
    if (req.files?.explanationImage?.[0]) {
      const r = await uploadFile(req.files.explanationImage[0].buffer, FOLDERS.QUESTIONS, "image");
      body.explanationImageUrl = r.url;
      body.explanationImagePublicId = r.publicId;
    }
    for (let i = 0; i < 4; i++) {
      const key = `optionImage_${i}`;
      if (req.files?.[key]?.[0]) {
        const r = await uploadFile(req.files[key][0].buffer, FOLDERS.QUESTIONS, "image");
        if (options[i]) options[i].imageUrl = r.url;
      }
    }

    const question = await Question.create({
      questionText: body.questionText,
      questionImageUrl: body.questionImageUrl,
      questionImagePublicId: body.questionImagePublicId,
      options: options.map((o, i) => ({ text: o.text, imageUrl: o.imageUrl, order: i })),
      correctAnswer: Number(body.correctAnswer || 0),
      explanation: body.explanation,
      explanationImageUrl: body.explanationImageUrl,
      explanationImagePublicId: body.explanationImagePublicId,
      difficulty: body.difficulty || "Medium",
      marks: Number(body.marks || exam.marksPerCorrect || 4),
      negativeMarks: Number(body.negativeMarks || exam.negativePerWrong || 1),
      subject: body.subject || undefined,
      chapter: body.chapter || undefined,
      batch: exam.batch,
      createdBy: req.user._id,
    });

    exam.questions = [...(exam.questions || []), question._id];
    exam.totalQuestions = exam.questions.length;
    await exam.save();

    return apiResponse(res, 201, "Question added to exam", { question });
  } catch (error) {
    next(error);
  }
};

const getExamQuestions = async (req, res, next) => {
  try {
    const Question = require("../models/Question");
    const exam = await Exam.findById(req.params.id);
    if (!exam) throw new ApiError(404, "Exam not found");
    const questions = await Question.find({ _id: { $in: exam.questions }});
    return apiResponse(res, 200, "Exam questions", { questions });
  } catch (error) {
    next(error);
  }
};

const deleteExamQuestion = async (req, res, next) => {
  try {
    const Question = require("../models/Question");
    const exam = await Exam.findById(req.params.id);
    if (!exam) throw new ApiError(404, "Exam not found");
    exam.questions = (exam.questions || []).filter(
      (q) => q.toString() !== req.params.questionId
    );
    exam.totalQuestions = exam.questions.length;
    await exam.save();
    await Question.findByIdAndUpdate(req.params.questionId, { isActive: false });
    return apiResponse(res, 200, "Question removed from exam");
  } catch (error) {
    next(error);
  }
};

const deleteExam = async (req, res, next) => {
  try {
    const exam = await Exam.findByIdAndDelete(req.params.id);
    if (!exam) throw new ApiError(404, "Exam not found");
    return apiResponse(res, 200, "Exam deleted");
  } catch (error) {
    next(error);
  }
};

const getExamResults = async (req, res, next) => {
  try {
    const exam = await Exam.findById(req.params.id).populate("course", "name");
    if (!exam) throw new ApiError(404, "Exam not found");

    const results = await Result.find({ exam: req.params.id })
      .populate("student", "name email phone")
      .sort({ rank: 1, obtainedMarks: -1 });

    const totalSubmissions = results.length;
    const avgScore = totalSubmissions > 0
      ? Math.round(results.reduce((acc, r) => acc + (r.obtainedMarks || 0), 0) / totalSubmissions)
      : 0;

    return apiResponse(res, 200, "Exam results retrieved", {
      exam,
      results,
      analytics: {
        totalSubmissions,
        avgScore,
        highestScore: results[0]?.obtainedMarks || 0,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getExams,
  getExamById,
  createExam,
  updateExam,
  publishExam,
  closeExam,
  archiveExam,
  setStudyVisibility,
  reconductExam,
  downloadExam,
  getQuestionBank,
  publishResults,
  grantPermission,
  revokePermission,
  listPermissions,
  importQuestions,
  createExamQuestion,
  getExamQuestions,
  deleteExamQuestion,
  deleteExam,
  getExamResults,
};
```

---

# FILE: `server\src\controllers\lecture.controller.js`

```javascript
const Lecture = require("../models/Lecture");
const apiResponse = require("../utils/apiResponse");
const ApiError = require("../utils/apiError");

const getLectures = async (req, res, next) => {
  try {
    const filter = { isActive: true };
    if (req.query.course) filter.course = req.query.course;
    if (req.query.subject) filter.subject = req.query.subject;
    if (req.query.chapter) filter.chapter = req.query.chapter;
    const lectures = await Lecture.find(filter)
      .populate("subject", "name")
      .populate("chapter", "name")
      .populate("teacher", "name")
      .sort({ displayOrder: 1 });
    return apiResponse(res, 200, "Lectures retrieved", { lectures });
  } catch (error) {
    next(error);
  }
};

const createLecture = async (req, res, next) => {
  try {
    const lecture = await Lecture.create({ ...req.body, teacher: req.user._id });
    return apiResponse(res, 201, "Lecture created", { lecture });
  } catch (error) {
    next(error);
  }
};

const updateLecture = async (req, res, next) => {
  try {
    const lecture = await Lecture.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!lecture) throw new ApiError(404, "Lecture not found");
    return apiResponse(res, 200, "Lecture updated", { lecture });
  } catch (error) {
    next(error);
  }
};

const deleteLecture = async (req, res, next) => {
  try {
    const lecture = await Lecture.findByIdAndUpdate(req.params.id, { isActive: false });
    if (!lecture) throw new ApiError(404, "Lecture not found");
    return apiResponse(res, 200, "Lecture deleted");
  } catch (error) {
    next(error);
  }
};

module.exports = { getLectures, createLecture, updateLecture, deleteLecture };
```

---

# FILE: `server\src\controllers\material.controller.js`

```javascript
const Material = require("../models/Material");
const Student = require("../models/Student");
const apiResponse = require("../utils/apiResponse");
const ApiError = require("../utils/apiError");
const { uploadFile } = require("../services/cloudinary.service");
const FOLDERS = require("../constants/cloudinaryFolders");

const getMaterials = async (req, res, next) => {
  try {
    const filter = { isActive: true };
    if (req.query.batch) filter.batch = req.query.batch;
    if (req.query.course) filter.course = req.query.course;
    if (req.query.subject) filter.subject = req.query.subject;
    if (req.query.chapter) filter.chapter = req.query.chapter;

    // For students: only show materials from their batch
    if (req.user && req.user.role === "student") {
      const student = await Student.findOne({ user: req.user._id });
      if (student?.batches?.length > 0) {
        filter.$or = [{ batch: { $in: student.batches } }, { batch: { $exists: false } }];
      }
    }

    const materials = await Material.find(filter)
      .populate("subject", "name")
      .populate("batch", "name code")
      .populate("chapter", "name")
      .populate("uploadedBy", "name")
      .sort({ createdAt: -1 });
    return apiResponse(res, 200, "Materials retrieved", { materials });
  } catch (error) {
    next(error);
  }
};

const getMyBatchMaterials = async (req, res, next) => {
  try {
    const student = await Student.findOne({ user: req.user._id });
    const filter = { isActive: true };
    if (student?.batches?.length > 0) {
      filter.$or = [{ batch: { $in: student.batches } }, { batch: { $exists: false } }];
    }

    const materials = await Material.find(filter)
      .populate("subject", "name")
      .populate("batch", "name code")
      .populate("chapter", "name")
      .populate("uploadedBy", "name")
      .sort({ createdAt: -1 });
    return apiResponse(res, 200, "My batch materials", { materials });
  } catch (error) {
    next(error);
  }
};

const createMaterial = async (req, res, next) => {
  try {
    const { title, subject, batch, course, unit, chapter, type, fileUrl, description } = req.body;

    // Unit → Chapter → Material is mandatory so students see a course structure.
    if (!batch) throw new ApiError(400, "A batch is required");
    if (!unit) throw new ApiError(400, "A unit is required");
    if (!chapter) throw new ApiError(400, "A chapter is required");

    let finalUrl = fileUrl;
    let filePublicId = "external";

    // If file was uploaded via multipart (multer) → real Cloudinary upload
    if (req.file) {
      const resourceType =
        req.file.mimetype && req.file.mimetype.startsWith("image") ? "image" : "raw";
      const result = await uploadFile(req.file.buffer, FOLDERS.MATERIALS, resourceType);
      finalUrl = result.url;
      filePublicId = result.publicId;
    }

    if (!finalUrl) {
      throw new ApiError(400, "Either upload a file or provide an external URL");
    }

    const materialData = {
      title,
      type: type || "PDF",
      fileUrl: finalUrl,
      filePublicId,
      description,
      batch,
      unit,
      chapter,
      uploadedBy: req.user._id,
    };
    if (subject) materialData.subject = subject;
    if (course) materialData.course = course;
    if (req.file) materialData.fileSize = req.file.size;

    const material = await Material.create(materialData);
    return apiResponse(res, 201, "Material created", { material });
  } catch (error) {
    next(error);
  }
};

const deleteMaterial = async (req, res, next) => {
  try {
    const material = await Material.findByIdAndUpdate(req.params.id, { isActive: false });
    if (!material) throw new ApiError(404, "Material not found");
    return apiResponse(res, 200, "Material deleted");
  } catch (error) {
    next(error);
  }
};

// Student course-like view: Unit → Chapter → Materials for the student's batch
const getMaterialTree = async (req, res, next) => {
  try {
    const Unit = require("../models/Unit");
    const Chapter = require("../models/Chapter");

    let batchIds = [];
    if (req.user.role === "student") {
      const student = await Student.findOne({ user: req.user._id });
      batchIds = (student?.batches || []).map((b) => b.toString());
    }
    const batchFilter = req.query.batch
      ? { batch: req.query.batch }
      : batchIds.length
      ? { batch: { $in: batchIds } }
      : {};

    const materials = await Material.find({ isActive: true, ...batchFilter })
      .populate("subject", "name")
      .sort({ createdAt: -1 });

    const unitIds = [...new Set(materials.map((m) => m.unit?.toString()).filter(Boolean))];
    const chapterIds = [...new Set(materials.map((m) => m.chapter?.toString()).filter(Boolean))];
    const units = await Unit.find({ _id: { $in: unitIds } }).sort({ displayOrder: 1 });
    const chapters = await Chapter.find({ _id: { $in: chapterIds } }).sort({ displayOrder: 1 });

    const tree = units.map((u) => ({
      _id: u._id,
      name: u.name,
      description: u.description,
      chapters: chapters
        .filter((c) => c.unit?.toString() === u._id.toString())
        .map((c) => ({
          _id: c._id,
          name: c.name,
          materials: materials.filter((m) => m.chapter?.toString() === c._id.toString()),
        })),
    }));

    return apiResponse(res, 200, "Material tree", { tree });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getMaterials,
  getMyBatchMaterials,
  createMaterial,
  deleteMaterial,
  getMaterialTree,
};
```

---

# FILE: `server\src\controllers\notification.controller.js`

```javascript
const {
  createNotification: createNotificationService,
  getNotificationsForUser,
  getUnreadCount: getUnreadCountService,
  markAsRead: markAsReadService,
  markAllAsRead: markAllAsReadService,
} = require("../services/notification.service");
const apiResponse = require("../utils/apiResponse");

const getNotifications = async (req, res, next) => {
  try {
    const notifications = await getNotificationsForUser(req.user._id, req.user.role);
    return apiResponse(res, 200, "Notifications", { notifications });
  } catch (error) {
    next(error);
  }
};

const getUnreadCount = async (req, res, next) => {
  try {
    const count = await getUnreadCountService(req.user._id, req.user.role);
    return apiResponse(res, 200, "Unread count", { count });
  } catch (error) {
    next(error);
  }
};

const markAsRead = async (req, res, next) => {
  try {
    await markAsReadService(req.params.id, req.user._id);
    return apiResponse(res, 200, "Marked as read");
  } catch (error) {
    next(error);
  }
};

const markAllAsRead = async (req, res, next) => {
  try {
    await markAllAsReadService(req.user._id, req.user.role);
    return apiResponse(res, 200, "All marked as read");
  } catch (error) {
    next(error);
  }
};

const createNotification = async (req, res, next) => {
  try {
    const notification = await createNotificationService({ ...req.body, createdBy: req.user._id });
    return apiResponse(res, 201, "Notification created", { notification });
  } catch (error) {
    next(error);
  }
};

module.exports = { getNotifications, getUnreadCount, markAsRead, markAllAsRead, createNotification };
```

---

# FILE: `server\src\controllers\question.controller.js`

```javascript
const apiResponse = require("../utils/apiResponse");
const { getPagination, buildPaginationMeta } = require("../utils/pagination");
const {
  createQuestion: createQuestionService,
  getQuestions: getQuestionsService,
  updateQuestion: updateQuestionService,
  deleteQuestion: deleteQuestionService,
  addExplanation: addExplanationService,
  bulkImport: bulkImportService,
} = require("../services/question.service");

const getQuestions = async (req, res, next) => {
  try {
    const { page, limit } = getPagination(req.query);
    const filter = {};
    if (req.query.subject) filter.subject = req.query.subject;
    if (req.query.chapter) filter.chapter = req.query.chapter;
    if (req.query.difficulty) filter.difficulty = req.query.difficulty;
    if (req.query.source) filter.source = req.query.source;
    if (req.query.search) filter.questionText = { $regex: req.query.search, $options: "i" };

    const { questions, total, pages } = await getQuestionsService(filter, page, limit);
    return apiResponse(res, 200, "Questions retrieved", {
      questions,
      currentPage: page,
      totalPages: pages,
      totalItems: total,
      limit,
    });
  } catch (error) {
    next(error);
  }
};

const createQuestion = async (req, res, next) => {
  try {
    const question = await createQuestionService(req.body, req.user._id);
    return apiResponse(res, 201, "Question created", { question });
  } catch (error) {
    next(error);
  }
};

const updateQuestion = async (req, res, next) => {
  try {
    const question = await updateQuestionService(req.params.id, req.body);
    return apiResponse(res, 200, "Question updated", { question });
  } catch (error) {
    next(error);
  }
};

const deleteQuestion = async (req, res, next) => {
  try {
    await deleteQuestionService(req.params.id);
    return apiResponse(res, 200, "Question deleted");
  } catch (error) {
    next(error);
  }
};

const addExplanation = async (req, res, next) => {
  try {
    const question = await addExplanationService(req.params.id, req.body.explanation);
    return apiResponse(res, 200, "Explanation added", { question });
  } catch (error) {
    next(error);
  }
};

const bulkImport = async (req, res, next) => {
  try {
    const { questions } = req.body;
    const result = await bulkImportService(questions, req.user._id);
    return apiResponse(res, 201, `${result.imported} questions imported`, {
      count: result.imported,
      total: result.total,
      skipped: result.skipped,
    });
  } catch (error) {
    next(error);
  }
};

const { uploadFile } = require("../services/cloudinary.service");
const FOLDERS = require("../constants/cloudinaryFolders");
const Question = require("../models/Question");

const createQuestionWithImages = async (req, res, next) => {
  try {
    const body = { ...req.body };
    let options = JSON.parse(body.options || "[]");

    // Upload question image
    if (req.files?.questionImage?.[0]) {
      const result = await uploadFile(req.files.questionImage[0].buffer, FOLDERS.QUESTIONS, "image");
      body.questionImageUrl = result.url;
      body.questionImagePublicId = result.publicId;
    }

    // Upload explanation image
    if (req.files?.explanationImage?.[0]) {
      const result = await uploadFile(req.files.explanationImage[0].buffer, FOLDERS.QUESTIONS, "image");
      body.explanationImageUrl = result.url;
      body.explanationImagePublicId = result.publicId;
    }

    // Upload option images
    for (let i = 0; i < 4; i++) {
      const key = `optionImage_${i}`;
      if (req.files?.[key]?.[0]) {
        const result = await uploadFile(req.files[key][0].buffer, FOLDERS.QUESTIONS, "image");
        if (options[i]) options[i].imageUrl = result.url;
      }
    }

    body.options = options;
    body.correctAnswer = Number(body.correctAnswer || 0);
    body.marks = Number(body.marks || 4);
    body.negativeMarks = Number(body.negativeMarks || 1);
    if (!body.subject) delete body.subject;
    if (!body.batch) delete body.batch;

    const question = await Question.create({ ...body, createdBy: req.user._id });
    return apiResponse(res, 201, "Question with images created", { question });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getQuestions,
  createQuestion,
  createQuestionWithImages,
  updateQuestion,
  deleteQuestion,
  addExplanation,
  bulkImport,
};
```

---

# FILE: `server\src\controllers\resource.controller.js`

```javascript
const CourseResource = require("../models/CourseResource");
const apiResponse = require("../utils/apiResponse");
const ApiError = require("../utils/apiError");

const getResources = async (req, res, next) => {
  try {
    const filter = { isActive: true };
    if (req.query.course) filter.course = req.query.course;
    if (req.query.isPublic === "true") filter.isPublic = true;
    const resources = await CourseResource.find(filter).sort({ displayOrder: 1 });
    return apiResponse(res, 200, "Resources", { resources });
  } catch (error) {
    next(error);
  }
};

const createResource = async (req, res, next) => {
  try {
    const resource = await CourseResource.create({ ...req.body, addedBy: req.user._id });
    return apiResponse(res, 201, "Resource created", { resource });
  } catch (error) {
    next(error);
  }
};

const deleteResource = async (req, res, next) => {
  try {
    const resource = await CourseResource.findByIdAndUpdate(req.params.id, { isActive: false });
    if (!resource) throw new ApiError(404, "Resource not found");
    return apiResponse(res, 200, "Resource deleted");
  } catch (error) {
    next(error);
  }
};

module.exports = { getResources, createResource, deleteResource };
```

---

# FILE: `server\src\controllers\student.controller.js`

```javascript
const Student = require("../models/Student");
const User = require("../models/User");
const Enrollment = require("../models/Enrollment");
const apiResponse = require("../utils/apiResponse");
const ApiError = require("../utils/apiError");

const getStudents = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, search, batch, type, status } = req.query;
    const filter = {};
    if (type) filter.studentType = type;
    if (batch) filter.batches = batch;
    if (status === "active") filter.isActive = true;
    if (status === "inactive") filter.isActive = false;

    if (search) {
      if (search.toUpperCase().startsWith("NV-")) {
        filter.studentId = { $regex: search, $options: "i" };
      } else {
        const users = await User.find({
          $or: [
            { name: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } },
          ],
          role: "student",
        }).select("_id");
        filter.user = { $in: users.map((u) => u._id) };
      }
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const students = await Student.find(filter)
      .populate("user", "name email phone isActive avatar")
      .populate("batches", "name code batchType color")
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const total = await Student.countDocuments(filter);
    return apiResponse(res, 200, "Students retrieved", {
      students,
      total,
      page: parseInt(page),
      limit: parseInt(limit),
    });
  } catch (error) {
    next(error);
  }
};

const getStudentById = async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id)
      .populate("user", "name email phone isActive avatar lastLogin")
      .populate("batches", "name code batchType course schedule color")
      .populate("examPermissions", "title testType status batch");
    if (!student) throw new ApiError(404, "Student not found");
    const enrollments = await Enrollment.find({ student: student.user }).populate("course", "name");
    return apiResponse(res, 200, "Student details", { student, enrollments });
  } catch (error) {
    next(error);
  }
};

const getMyProfile = async (req, res, next) => {
  try {
    let student = await Student.findOne({ user: req.user._id })
      .populate("user", "name email phone avatar")
      .populate("batches", "name code batchType course schedule color");
    if (!student) {
      student = await Student.create({
        user: req.user._id,
        studentId: `NV-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 9999)).padStart(4, "0")}`,
      });
      student = await student.populate("user", "name email phone avatar");
    }
    return apiResponse(res, 200, "Student profile", { student });
  } catch (error) {
    next(error);
  }
};

const updateMyProfile = async (req, res, next) => {
  try {
    const { phone } = req.body;
    if (phone) await User.findByIdAndUpdate(req.user._id, { phone });
    const student = await Student.findOneAndUpdate({ user: req.user._id }, req.body, { new: true });
    return apiResponse(res, 200, "Profile updated", { student });
  } catch (error) {
    next(error);
  }
};

const updateMyAvatar = async (req, res, next) => {
  try {
    const { avatarBase64 } = req.body;
    if (!avatarBase64 || !avatarBase64.startsWith("data:image/")) {
      throw new ApiError(400, "Invalid image data");
    }
    const sizeInBytes = Math.round((avatarBase64.length * 3) / 4);
    if (sizeInBytes > 200 * 1024) throw new ApiError(400, "Image too large. Max 200KB.");
    await Student.findOneAndUpdate({ user: req.user._id }, { avatarBase64 }, { upsert: true });
    return apiResponse(res, 200, "Avatar updated");
  } catch (error) {
    next(error);
  }
};

const updateStudent = async (req, res, next) => {
  try {
    const { name, phone } = req.body;
    const student = await Student.findById(req.params.id);
    if (!student) throw new ApiError(404, "Student not found");

    if (name || phone) {
      await User.findByIdAndUpdate(student.user, {
        ...(name && { name }),
        ...(phone && { phone }),
      });
    }

    const allowed = [
      "isActive", "studentType", "batches", "currentClass", "city", "school",
      "parentName", "parentPhone", "tags", "notes", "address",
    ];
    allowed.forEach((f) => {
      if (req.body[f] !== undefined) student[f] = req.body[f];
    });

    await student.save();
    const updated = await Student.findById(student._id).populate("user", "name email phone");
    return apiResponse(res, 200, "Student updated", { student: updated });
  } catch (error) {
    next(error);
  }
};

const deactivateStudent = async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) throw new ApiError(404, "Student not found");
    student.isActive = !student.isActive;
    await student.save();
    await User.findByIdAndUpdate(student.user, { isActive: student.isActive });
    return apiResponse(res, 200, student.isActive ? "Student activated" : "Student deactivated", { student });
  } catch (error) {
    next(error);
  }
};

const deleteStudent = async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) throw new ApiError(404, "Student not found");
    if (student.user) {
      await User.findByIdAndDelete(student.user);
    }
    await Student.findByIdAndDelete(req.params.id);
    return apiResponse(res, 200, "Student deleted successfully");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getStudents,
  getStudentById,
  getMyProfile,
  updateMyProfile,
  updateMyAvatar,
  updateStudent,
  deactivateStudent,
  deleteStudent,
};
```

---

# FILE: `server\src\controllers\teacher.controller.js`

```javascript
const Teacher = require("../models/Teacher");
const User = require("../models/User");
const apiResponse = require("../utils/apiResponse");
const ApiError = require("../utils/apiError");

const getTeachers = async (req, res, next) => {
  try {
    const teachers = await Teacher.find({})
      .populate("user", "name email phone isActive avatar")
      .populate("subject", "name code")
      .sort({ createdAt: -1 });
    return apiResponse(res, 200, "Teachers retrieved", { teachers });
  } catch (error) {
    next(error);
  }
};

const getPublicTeachers = async (req, res, next) => {
  try {
    const teachers = await Teacher.find({ isActive: true })
      .populate("user", "name avatar")
      .populate("subject", "name");
    return apiResponse(res, 200, "Faculty list", { teachers });
  } catch (error) {
    next(error);
  }
};

const getMyProfile = async (req, res, next) => {
  try {
    const teacher = await Teacher.findOne({ user: req.user._id })
      .populate("user", "name email phone avatar")
      .populate("subject", "name code");
    if (!teacher) throw new ApiError(404, "Teacher profile not found");
    return apiResponse(res, 200, "Teacher profile", { teacher });
  } catch (error) {
    next(error);
  }
};

const updatePermissions = async (req, res, next) => {
  try {
    const teacher = await Teacher.findByIdAndUpdate(
      req.params.id,
      { permissions: req.body },
      { new: true }
    );
    if (!teacher) throw new ApiError(404, "Teacher not found");
    return apiResponse(res, 200, "Permissions updated", { teacher });
  } catch (error) {
    next(error);
  }
};

const deactivateTeacher = async (req, res, next) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) throw new ApiError(404, "Teacher not found");
    teacher.isActive = !teacher.isActive;
    await teacher.save();
    await User.findByIdAndUpdate(teacher.user, { isActive: teacher.isActive });
    return apiResponse(res, 200, teacher.isActive ? "Teacher activated" : "Teacher deactivated", {
      teacher,
    });
  } catch (error) {
    next(error);
  }
};

const updateTeacher = async (req, res, next) => {
  try {
    const { name, phone, qualification, experience, specialisation, bio, subject } = req.body;
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) throw new ApiError(404, "Teacher not found");

    if (name || phone) {
      await User.findByIdAndUpdate(teacher.user, {
        ...(name && { name }),
        ...(phone && { phone }),
      });
    }

    if (qualification !== undefined) teacher.qualification = qualification;
    if (experience !== undefined) teacher.experience = experience;
    if (specialisation !== undefined) teacher.specialisation = specialisation;
    if (bio !== undefined) teacher.bio = bio;
    if (subject !== undefined) teacher.subject = subject || null;

    await teacher.save();
    const updated = await Teacher.findById(teacher._id).populate("user", "name email phone isActive avatar");
    return apiResponse(res, 200, "Teacher updated successfully", { teacher: updated });
  } catch (error) {
    next(error);
  }
};

module.exports = { getTeachers, getPublicTeachers, getMyProfile, updatePermissions, deactivateTeacher, updateTeacher };
```

---

# FILE: `server\src\controllers\testSeries.controller.js`

```javascript
const TestSeries = require("../models/TestSeries");
const apiResponse = require("../utils/apiResponse");
const ApiError = require("../utils/apiError");

const getTestSeries = async (req, res, next) => {
  try {
    const series = await TestSeries.find({ isActive: true })
      .populate("exams", "title duration totalMarks status")
      .populate("course", "name");
    return apiResponse(res, 200, "Test series", { testSeries: series });
  } catch (error) {
    next(error);
  }
};

const createTestSeries = async (req, res, next) => {
  try {
    const series = await TestSeries.create({ ...req.body, createdBy: req.user._id });
    return apiResponse(res, 201, "Test series created", { testSeries: series });
  } catch (error) {
    next(error);
  }
};

const updateTestSeries = async (req, res, next) => {
  try {
    const series = await TestSeries.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!series) throw new ApiError(404, "Test series not found");
    return apiResponse(res, 200, "Test series updated", { testSeries: series });
  } catch (error) {
    next(error);
  }
};

module.exports = { getTestSeries, createTestSeries, updateTestSeries };
```

---

# FILE: `server\src\controllers\website.controller.js`

```javascript
const {
  getHomepageData,
  getSection: getSectionData,
  updateSection: updateSectionData,
} = require("../services/website.service");
const apiResponse = require("../utils/apiResponse");

const getHomepage = async (req, res, next) => {
  try {
    const data = await getHomepageData();
    return apiResponse(res, 200, "Homepage data", data);
  } catch (error) {
    next(error);
  }
};

const getSection = async (req, res, next) => {
  try {
    const content = await getSectionData(req.params.section);
    return apiResponse(res, 200, "Section content", { content });
  } catch (error) {
    next(error);
  }
};

const updateSection = async (req, res, next) => {
  try {
    const content = await updateSectionData(req.params.section, req.body);
    return apiResponse(res, 200, "Section updated", { content });
  } catch (error) {
    next(error);
  }
};

module.exports = { getHomepage, getSection, updateSection };
```

---

# FILE: `server\src\middleware\activityLog.middleware.js`

```javascript
const ActivityLog = require("../models/ActivityLog");

const logActivity = (action, resource, resourceId) => {
  return async (req, res, next) => {
    try {
      await ActivityLog.create({
        user: req.user ? req.user._id : null,
        action,
        resource,
        resourceId: resourceId || req.params.id || null,
        details: req.body,
        ipAddress: req.ip,
        userAgent: req.headers["user-agent"],
      });
    } catch (err) {}
    next();
  };
};

module.exports = { logActivity };
```

---

# FILE: `server\src\middleware\auth.middleware.js`

```javascript
const { verifyAccessToken } = require("../utils/jwt");
const User = require("../models/User");
const ApiError = require("../utils/apiError");

const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next(new ApiError(401, "Not authorized. No token provided."));
    }

    const token = authHeader.split(" ")[1];
    const decoded = verifyAccessToken(token);

    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return next(new ApiError(401, "User not found."));
    }
    if (!user.isActive) {
      return next(new ApiError(403, "Account is deactivated."));
    }

    req.user = user;
    next();
  } catch (error) {
    return next(new ApiError(401, "Not authorized. Token invalid or expired."));
  }
};

module.exports = { protect };
```

---

# FILE: `server\src\middleware\enrollment.middleware.js`

```javascript
const Enrollment = require("../models/Enrollment");
const ApiError = require("../utils/apiError");

const checkCourseAccess = async (req, res, next) => {
  try {
    const courseId = req.params.courseId || req.params.id;

    if (["admin", "teacher"].includes(req.user.role)) return next();

    const enrollment = await Enrollment.findOne({
      student: req.user._id,
      course: courseId,
      status: "ACTIVE",
      $or: [
        { expiresAt: null },
        { expiresAt: { $gte: new Date() } },
      ],
    });

    if (!enrollment) {
      return next(new ApiError(403, "You do not have access to this course. Contact admin for enrollment."));
    }

    req.enrollment = enrollment;
    next();
  } catch (error) {
    next(new ApiError(500, "Access check failed."));
  }
};

module.exports = { checkCourseAccess };
```

---

# FILE: `server\src\middleware\errorHandler.middleware.js`

```javascript
const notFound = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.originalUrl}`,
  });
};

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

module.exports = { notFound, errorHandler };
```

---

# FILE: `server\src\middleware\permission.middleware.js`

```javascript
const Teacher = require("../models/Teacher");
const ApiError = require("../utils/apiError");

const checkPermission = (permissionKey) => {
  return async (req, res, next) => {
    try {
      if (req.user.role === "admin") return next();

      const teacher = await Teacher.findOne({ user: req.user._id });
      if (!teacher) {
        return next(new ApiError(403, "Teacher profile not found."));
      }
      if (!teacher.permissions || !teacher.permissions[permissionKey]) {
        return next(new ApiError(403, `Permission denied: ${permissionKey}`));
      }
      req.teacherProfile = teacher;
      next();
    } catch (error) {
      next(new ApiError(500, "Permission check failed."));
    }
  };
};

module.exports = { checkPermission };
```

---

# FILE: `server\src\middleware\rateLimiter.middleware.js`

```javascript
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
```

---

# FILE: `server\src\middleware\role.middleware.js`

```javascript
const ApiError = require("../utils/apiError");

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(new ApiError(403, "Access denied. Insufficient permissions."));
    }
    next();
  };
};

// Alias for single role check
const requireRole = (role) => authorize(role);

module.exports = { authorize, requireRole };
```

---

# FILE: `server\src\middleware\upload.middleware.js`

```javascript
const multer = require("multer");

const storage = multer.memoryStorage();

const uploadImage = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"), false);
    }
  },
}).single("image");

const uploadVideo = multer({
  storage,
  limits: { fileSize: 500 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("video/")) {
      cb(null, true);
    } else {
      cb(new Error("Only video files are allowed"), false);
    }
  },
}).single("video");

const uploadPDF = multer({
  storage,
  limits: { fileSize: 20 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files are allowed"), false);
    }
  },
}).single("file");

module.exports = { uploadImage, uploadVideo, uploadPDF };
```

---

# FILE: `server\src\middleware\validate.middleware.js`

```javascript
const { validationResult } = require("express-validator");

const validate = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map((v) => v.run(req)));
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: errors.array()[0].msg,
        errors: errors.array(),
      });
    }
    next();
  };
};

module.exports = { validate };
```

---

# FILE: `server\src\models\Achievement.js`

```javascript
const mongoose = require("mongoose");

const achievementSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    category: {
      type: String,
      enum: ["STUDENT_RESULT", "INSTITUTE_MILESTONE", "AWARD", "CERTIFICATION", "EVENT", "CUSTOM"],
      required: true,
    },
    studentName: { type: String },
    studentBatch: { type: String },
    studentPhotoUrl: { type: String },
    studentPhotoPublicId: { type: String },
    imageUrl: { type: String },
    imagePublicId: { type: String },
    score: { type: String },
    year: { type: Number },
    featured: { type: Boolean, default: false },
    displayOrder: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Achievement", achievementSchema);
```

---

# FILE: `server\src\models\ActivityLog.js`

```javascript
const mongoose = require("mongoose");

const activityLogSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    action: { type: String, required: true },
    resource: { type: String },
    resourceId: { type: String },
    details: { type: mongoose.Schema.Types.Mixed },
    ipAddress: { type: String },
    userAgent: { type: String },
  },
  { timestamps: true }
);

activityLogSchema.index({ user: 1, createdAt: -1 });

module.exports = mongoose.model("ActivityLog", activityLogSchema);
```

---

# FILE: `server\src\models\Announcement.js`

```javascript
const mongoose = require("mongoose");

const announcementSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    priority: { type: String, enum: ["LOW", "MEDIUM", "HIGH"], default: "MEDIUM" },
    isActive: { type: Boolean, default: true },
    startsAt: { type: Date },
    endsAt: { type: Date },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Announcement", announcementSchema);
```

---

# FILE: `server\src\models\Attempt.js`

```javascript
const mongoose = require("mongoose");

const attemptSchema = new mongoose.Schema(
  {
    exam: { type: mongoose.Schema.Types.ObjectId, ref: "Exam", required: true },
    student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    startedAt: { type: Date, required: true },
    serverEndTime: { type: Date, required: true },
    submittedAt: { type: Date },
    status: {
      type: String,
      enum: ["IN_PROGRESS", "SUBMITTED", "AUTO_SUBMITTED", "ABANDONED"],
      default: "IN_PROGRESS",
    },
    answers: [
      {
        question: { type: mongoose.Schema.Types.ObjectId, ref: "Question" },
        selectedOption: { type: Number, default: null },
        markedForReview: { type: Boolean, default: false },
        timeSpent: { type: Number, default: 0 },
      },
    ],
    currentQuestion: { type: Number, default: 0 },
    questionOrder: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
    optionOrders: [[Number]],
    totalScore: { type: Number },
    correctCount: { type: Number },
    wrongCount: { type: Number },
    unattemptedCount: { type: Number },
    accuracy: { type: Number },
    timeTaken: { type: Number },
    tabSwitchCount: { type: Number, default: 0 },
    isFullScreen: { type: Boolean, default: true },
  },
  { timestamps: true }
);

attemptSchema.index({ exam: 1, student: 1 });

module.exports = mongoose.model("Attempt", attemptSchema);
```

---

# FILE: `server\src\models\Batch.js`

```javascript
const mongoose = require("mongoose");

const batchSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Batch name is required"], trim: true },
    code: { type: String, required: true, unique: true, trim: true },
    batchType: {
      type: String,
      enum: ["OFFLINE", "ONLINE", "HYBRID", "EXAM_ONLY", "CRASH_COURSE"],
      required: true,
    },
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", default: null },
    academicYear: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
    capacity: { type: Number },
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    assignedTeachers: [
      {
        teacher: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        subject: { type: mongoose.Schema.Types.ObjectId, ref: "Subject" },
      },
    ],
    schedule: { type: String },
    telegramGroupLink: { type: String },
    color: { type: String, default: "#18A66A" },
    isActive: { type: Boolean, default: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Batch", batchSchema);
```

---

# FILE: `server\src\models\Chapter.js`

```javascript
const mongoose = require("mongoose");

const chapterSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    unit: { type: mongoose.Schema.Types.ObjectId, ref: "Unit", required: true },
    subject: { type: mongoose.Schema.Types.ObjectId, ref: "Subject", required: true },
    description: { type: String },
    isActive: { type: Boolean, default: true },
    displayOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Chapter", chapterSchema);
```

---

# FILE: `server\src\models\ContactSettings.js`

```javascript
const mongoose = require("mongoose");

const contactSettingsSchema = new mongoose.Schema(
  {
    instituteEmail: { type: String, default: "neetvidya720@gmail.com" },
    institutePhone: { type: String, default: "+91 74396 85658 / +91 83910 21878" },
    address: { type: String, default: "Karimpur Main Road, Karimpur, Nadia" },
    city: { type: String, default: "Karimpur" },
    state: { type: String, default: "Nadia" },
    telegramChannelLink: { type: String, default: "https://t.me/neetvidya720official" },
    whatsappGroupLink: { type: String, default: "" },
    whatsappNumber: { type: String, default: "917439685658" },
    whatsappDefaultMessage: { type: String, default: "Hello NEETVIDYA! I am interested in admission." },
    facebookLink: { type: String, default: "" },
    instagramLink: { type: String, default: "" },
    youtubeLink: { type: String, default: "" },
    officeHours: { type: String, default: "Mon - Sat: 9:00 AM - 6:00 PM" },
    mapEmbedUrl: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ContactSettings", contactSettingsSchema);
```

---

# FILE: `server\src\models\Course.js`

```javascript
const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Course name is required"], trim: true },
    slug: { type: String, unique: true },
    description: { type: String },
    targetClass: { type: String },
    subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subject" }],
    duration: { type: String },
    features: [{ type: String }],
    coverImageUrl: { type: String },
    coverImagePublicId: { type: String },
    feeAmount: { type: Number, default: 0 },
    feeCurrency: { type: String, default: "INR" },
    isActive: { type: Boolean, default: true },
    displayOrder: { type: Number, default: 0 },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);
```

---

# FILE: `server\src\models\CourseResource.js`

```javascript
const mongoose = require("mongoose");

const courseResourceSchema = new mongoose.Schema(
  {
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    subject: { type: mongoose.Schema.Types.ObjectId, ref: "Subject" },
    chapter: { type: mongoose.Schema.Types.ObjectId, ref: "Chapter" },
    title: { type: String, required: true, trim: true },
    description: { type: String },
    resourceType: {
      type: String,
      enum: ["EXTERNAL_LINK", "YOUTUBE", "GOOGLE_DRIVE", "REFERENCE_SITE", "TOOL", "CUSTOM"],
      required: true,
    },
    url: { type: String, required: true },
    icon: { type: String },
    thumbnailUrl: { type: String },
    displayOrder: { type: Number, default: 0 },
    isPublic: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    addedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CourseResource", courseResourceSchema);
```

---

# FILE: `server\src\models\Enquiry.js`

```javascript
const mongoose = require("mongoose");

const enquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    course: { type: String },
    message: { type: String, required: true },
    source: { type: String, enum: ["WEBSITE", "TELEGRAM", "WHATSAPP"], default: "WEBSITE" },
    status: { type: String, enum: ["PENDING", "CONTACTED", "RESOLVED"], default: "PENDING" },
    handledBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    notes: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Enquiry", enquirySchema);
```

---

# FILE: `server\src\models\Enrollment.js`

```javascript
const mongoose = require("mongoose");

const enrollmentSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    batch: { type: mongoose.Schema.Types.ObjectId, ref: "Batch" },
    status: {
      type: String,
      enum: ["ACTIVE", "EXPIRED", "SUSPENDED", "COMPLETED"],
      default: "ACTIVE",
    },
    enrolledAt: { type: Date, default: Date.now },
    expiresAt: { type: Date },
    paymentStatus: {
      type: String,
      enum: ["FREE", "PENDING", "PAID", "PARTIAL", "REFUNDED"],
      default: "FREE",
    },
    paymentId: { type: String },
    amountPaid: { type: Number, default: 0 },
    amountTotal: { type: Number, default: 0 },
    access: {
      materials: { type: Boolean, default: true },
      lectures: { type: Boolean, default: true },
      testSeries: { type: Boolean, default: true },
      downloads: { type: Boolean, default: true },
    },
    enrolledBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    enrollmentType: {
      type: String,
      enum: ["ADMIN_MANUAL", "SELF_REGISTER", "PAYMENT", "INVITATION"],
      default: "ADMIN_MANUAL",
    },
  },
  { timestamps: true }
);

enrollmentSchema.index({ student: 1, course: 1 }, { unique: true });

module.exports = mongoose.model("Enrollment", enrollmentSchema);
```

---

# FILE: `server\src\models\Exam.js`

```javascript
const mongoose = require("mongoose");

const examSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String },
    testType: {
      type: String,
      enum: ["DPP", "CHAPTER_TEST", "UNIT_TEST", "MOCK_TEST", "PYQ"],
      required: true,
    },
    testSeries: { type: mongoose.Schema.Types.ObjectId, ref: "TestSeries" },
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
    // Exam is ALWAYS batch-specific (Batch === Course in this platform)
    batch: { type: mongoose.Schema.Types.ObjectId, ref: "Batch", required: true },
    // Every exam carries its OWN fixed question set. Never auto-pulled from a bank.
    questions: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
      validate: {
        validator: (v) => Array.isArray(v) && v.length > 0,
        message: "An exam must contain at least one question",
      },
    },
    subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subject" }],
    totalQuestions: { type: Number, required: true },
    totalMarks: { type: Number, required: true },
    marksPerCorrect: { type: Number, default: 4 },
    negativePerWrong: { type: Number, default: 1 },
    duration: { type: Number, required: true }, // in minutes
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    maxAttempts: { type: Number, default: 1 },
    randomizeQuestions: { type: Boolean, default: true },
    randomizeOptions: { type: Boolean, default: true },
    status: {
      type: String,
      enum: ["DRAFT", "SCHEDULED", "PUBLISHED", "LIVE", "CLOSED", "ARCHIVED"],
      default: "DRAFT",
    },
    instructions: { type: String },

    // ── Result publishing rule ─────────────────
    resultPublishMode: {
      type: String,
      enum: ["IMMEDIATE", "MANUAL", "SCHEDULED"],
      default: "MANUAL",
    },
    resultPublishAt: { type: Date },
    resultsPublishedAt: { type: Date },
    resultsPublished: { type: Boolean, default: false },

    // ── Outsider / specific-student access (admin granted) ─────
    permittedStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

    // ── Question Bank archive metadata (archive = finished exam paper) ──
    isArchived: { type: Boolean, default: false },
    archivedAt: { type: Date },
    studyVisible: { type: Boolean, default: false },
    reconductedFrom: { type: mongoose.Schema.Types.ObjectId, ref: "Exam" },

    // legacy compatibility
    eligibleBatches: [{ type: mongoose.Schema.Types.ObjectId, ref: "Batch" }],
    eligibleStudentTypes: [{ type: String }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    publishedAt: { type: Date },
  },
  { timestamps: true }
);

examSchema.index({ batch: 1, status: 1 });
examSchema.index({ isArchived: 1, studyVisible: 1 });

module.exports = mongoose.model("Exam", examSchema);
```

---

# FILE: `server\src\models\ExamPermission.js`

```javascript
const mongoose = require("mongoose");

// Explicit, auditable grant that lets a student who is NOT in the exam's batch
// access that specific exam only (e.g. EXAM_ONLY / GUEST candidates).
const examPermissionSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    exam: { type: mongoose.Schema.Types.ObjectId, ref: "Exam", required: true },
    grantedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    reason: { type: String },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

examPermissionSchema.index({ student: 1, exam: 1 }, { unique: true });

module.exports = mongoose.model("ExamPermission", examPermissionSchema);
```

---

# FILE: `server\src\models\Lecture.js`

```javascript
const mongoose = require("mongoose");

const lectureSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String },
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
    subject: { type: mongoose.Schema.Types.ObjectId, ref: "Subject" },
    unit: { type: mongoose.Schema.Types.ObjectId, ref: "Unit" },
    chapter: { type: mongoose.Schema.Types.ObjectId, ref: "Chapter" },
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    videoUrl: { type: String, required: true },
    videoPublicId: { type: String, default: "external" },
    thumbnailUrl: { type: String },
    thumbnailPublicId: { type: String },
    duration: { type: Number },
    displayOrder: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Lecture", lectureSchema);
```

---

# FILE: `server\src\models\Material.js`

```javascript
const mongoose = require("mongoose");

const materialSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String },
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
    // Batch = Course. Materials are always published to a batch (Unit → Chapter).
    batch: { type: mongoose.Schema.Types.ObjectId, ref: "Batch", required: true },
    subject: { type: mongoose.Schema.Types.ObjectId, ref: "Subject" },
    unit: { type: mongoose.Schema.Types.ObjectId, ref: "Unit", required: true },
    chapter: { type: mongoose.Schema.Types.ObjectId, ref: "Chapter", required: true },
    topic: { type: mongoose.Schema.Types.ObjectId, ref: "Topic" },
    type: { type: String, enum: ["PDF", "DOC", "PPT", "IMAGE"], default: "PDF" },
    fileUrl: { type: String, required: true },
    filePublicId: { type: String, default: "external" },
    fileSize: { type: Number },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Material", materialSchema);
```

---

# FILE: `server\src\models\Notification.js`

```javascript
const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    message: { type: String, required: true },
    type: {
      type: String,
      enum: ["MATERIAL", "LECTURE", "TEST", "RESULT", "ANNOUNCEMENT", "GENERAL"],
      default: "GENERAL",
    },
    targetRole: { type: String, enum: ["student", "teacher", "all"], default: "all" },
    targetBatches: [{ type: mongoose.Schema.Types.ObjectId, ref: "Batch" }],
    targetStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    isRead: { type: Boolean, default: false },
    readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notification", notificationSchema);
```

---

# FILE: `server\src\models\Question.js`

```javascript
const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    questionText: { type: String, required: [true, "Question text is required"] },
    questionImageUrl: { type: String },
    questionImagePublicId: { type: String },
    options: [
      {
        text: { type: String, required: true },
        imageUrl: { type: String },
        order: { type: Number },
      },
    ],
    correctAnswer: { type: Number, required: [true, "Correct answer index is required"] },
    explanation: { type: String },
    explanationImageUrl: { type: String },
    explanationImagePublicId: { type: String },
    subject: { type: mongoose.Schema.Types.ObjectId, ref: "Subject" },
    batch: { type: mongoose.Schema.Types.ObjectId, ref: "Batch" },
    unit: { type: mongoose.Schema.Types.ObjectId, ref: "Unit" },
    chapter: { type: mongoose.Schema.Types.ObjectId, ref: "Chapter" },
    topic: { type: mongoose.Schema.Types.ObjectId, ref: "Topic" },
    difficulty: { type: String, enum: ["Easy", "Medium", "Hard"], required: true, default: "Medium" },
    marks: { type: Number, required: true, default: 4 },
    negativeMarks: { type: Number, required: true, default: 1 },
    source: { type: String },
    year: { type: Number },
    tags: [{ type: String }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

questionSchema.index({ subject: 1, chapter: 1 });
questionSchema.index({ difficulty: 1 });
questionSchema.index({ source: 1, year: 1 });

module.exports = mongoose.model("Question", questionSchema);
```

---

# FILE: `server\src\models\Result.js`

```javascript
const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema(
  {
    attempt: { type: mongoose.Schema.Types.ObjectId, ref: "Attempt", required: true, unique: true },
    exam: { type: mongoose.Schema.Types.ObjectId, ref: "Exam", required: true },
    student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    totalMarks: { type: Number },
    obtainedMarks: { type: Number },
    correctCount: { type: Number },
    wrongCount: { type: Number },
    unattemptedCount: { type: Number },
    accuracy: { type: Number },
    timeTaken: { type: Number },
    percentage: { type: Number },
    rank: { type: Number },
    percentile: { type: Number },
    // Result publishing gate — hidden from students until the exam's rule releases it
    isPublished: { type: Boolean, default: false },
    publishedAt: { type: Date },
    subjectBreakdown: [
      {
        subject: { type: mongoose.Schema.Types.ObjectId, ref: "Subject" },
        correct: { type: Number, default: 0 },
        wrong: { type: Number, default: 0 },
        unattempted: { type: Number, default: 0 },
        marks: { type: Number, default: 0 },
      },
    ],
    chapterBreakdown: [
      {
        chapter: { type: mongoose.Schema.Types.ObjectId, ref: "Chapter" },
        correct: { type: Number, default: 0 },
        wrong: { type: Number, default: 0 },
        unattempted: { type: Number, default: 0 },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Result", resultSchema);
```

---

# FILE: `server\src\models\Student.js`

```javascript
const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    studentId: { type: String, unique: true, sparse: true }, // e.g. NV-2026-0001
    studentType: {
      type: String,
      enum: ["REGULAR_OFFLINE", "REGULAR_ONLINE", "HYBRID", "EXAM_ONLY", "GUEST"],
      default: "REGULAR_OFFLINE",
    },
    batches: [{ type: mongoose.Schema.Types.ObjectId, ref: "Batch" }],
    enrollmentDate: { type: Date, default: Date.now },
    parentName: { type: String },
    parentPhone: { type: String },
    school: { type: String },
    currentClass: { type: String, enum: ["XI", "XII", "DROPPER", "REPEATER"] },
    address: { type: String },
    city: { type: String },
    whatsappNumber: { type: String },
    tags: [{ type: String }],
    notes: { type: String },
    // Mirror of active ExamPermission grants for fast dashboard display
    examPermissions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Exam" }],
    avatarBase64: { type: String },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);
```

---

# FILE: `server\src\models\Subject.js`

```javascript
const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String },
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    code: { type: String },
    description: { type: String },
    icon: { type: String },
    isActive: { type: Boolean, default: true },
    displayOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Subject", subjectSchema);
```

---

# FILE: `server\src\models\Teacher.js`

```javascript
const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    subject: { type: mongoose.Schema.Types.ObjectId, ref: "Subject" },
    subjectName: { type: String, trim: true },
    qualification: { type: String },
    experience: { type: String },
    specialisation: { type: String },
    bio: { type: String },
    photoUrl: { type: String },
    photoPublicId: { type: String },
    telegramUsername: { type: String },
    permissions: {
      uploadMaterials: { type: Boolean, default: true },
      uploadLectures: { type: Boolean, default: true },
      createQuestions: { type: Boolean, default: true },
      editQuestions: { type: Boolean, default: false },
      createExams: { type: Boolean, default: false },
      createTestSeries: { type: Boolean, default: false },
      viewPerformance: { type: Boolean, default: true },
      manageStudents: { type: Boolean, default: false },
      accessWebsiteSettings: { type: Boolean, default: false },
    },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Teacher", teacherSchema);
```

---

# FILE: `server\src\models\Testimonial.js`

```javascript
const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    role: { type: String, enum: ["STUDENT", "PARENT"], required: true },
    course: { type: String },
    photoUrl: { type: String },
    photoPublicId: { type: String },
    content: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    displayOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Testimonial", testimonialSchema);
```

---

# FILE: `server\src\models\TestSeries.js`

```javascript
const mongoose = require("mongoose");

const testSeriesSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String },
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
    subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subject" }],
    coverImageUrl: { type: String },
    coverImagePublicId: { type: String },
    totalTests: { type: Number, default: 0 },
    exams: [{ type: mongoose.Schema.Types.ObjectId, ref: "Exam" }],
    isActive: { type: Boolean, default: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("TestSeries", testSeriesSchema);
```

---

# FILE: `server\src\models\Topic.js`

```javascript
const mongoose = require("mongoose");

const topicSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    chapter: { type: mongoose.Schema.Types.ObjectId, ref: "Chapter", required: true },
    description: { type: String },
    isActive: { type: Boolean, default: true },
    displayOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Topic", topicSchema);
```

---

# FILE: `server\src\models\Unit.js`

```javascript
const mongoose = require("mongoose");

const unitSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    subject: { type: mongoose.Schema.Types.ObjectId, ref: "Subject", required: true },
    description: { type: String },
    isActive: { type: Boolean, default: true },
    displayOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Unit", unitSchema);
```

---

# FILE: `server\src\models\User.js`

```javascript
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const counterSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 },
});
const Counter = mongoose.model("Counter", counterSchema);

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Name is required"], trim: true },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
    },
    password: { type: String, required: [true, "Password is required"], select: false },
    phone: { type: String, trim: true },
    role: {
      type: String,
      enum: ["student", "teacher", "admin"],
      required: true,
    },
    avatar: { type: String },
    isActive: { type: Boolean, default: true },
    lastLogin: { type: Date },
    refreshToken: { type: String, select: false },
    emailVerified: { type: Boolean, default: false },
    emailVerificationToken: { type: String, select: false },
    emailVerificationExpires: { type: Date, select: false },
    lastVerifiedToken: { type: String, select: false },
    passwordResetToken: { type: String, select: false },
    passwordResetExpires: { type: Date, select: false },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

userSchema.index({ role: 1 });

module.exports = mongoose.model("User", userSchema);
module.exports.Counter = Counter;
```

---

# FILE: `server\src\models\WebsiteContent.js`

```javascript
const mongoose = require("mongoose");

const websiteContentSchema = new mongoose.Schema(
  {
    section: {
      type: String,
      enum: [
        "HERO", "TRUST_BAR", "ABOUT", "METHODOLOGY", "COURSES_INTRO",
        "TEST_SERIES_PROMO", "RESULTS_SHOWCASE", "TESTIMONIALS",
        "ACHIEVEMENTS", "CTA", "CONTACT", "ANNOUNCEMENT_BAR",
      ],
      required: true,
      unique: true,
    },
    slides: [
      {
        title: String,
        subtitle: String,
        description: String,
        ctaText: String,
        ctaLink: String,
        secondaryCtaText: String,
        secondaryCtaLink: String,
        imageUrl: String,
        imagePublicId: String,
        order: { type: Number, default: 0 },
        isActive: { type: Boolean, default: true },
      },
    ],
    blocks: [
      {
        heading: String,
        subheading: String,
        body: String,
        imageUrl: String,
        icon: String,
        order: { type: Number, default: 0 },
        isActive: { type: Boolean, default: true },
      },
    ],
    stats: [{ label: String, value: String, icon: String }],
    announcementBar: {
      text: String,
      link: String,
      isActive: { type: Boolean, default: false },
      bgColor: { type: String, default: "#A8C900" },
      textColor: { type: String, default: "#0B0F0D" },
    },
    isVisible: { type: Boolean, default: true },
    meta: { type: mongoose.Schema.Types.Mixed },
  },
  { timestamps: true }
);

module.exports = mongoose.model("WebsiteContent", websiteContentSchema);
```

---

# FILE: `server\src\routes\academic.routes.js`

```javascript
const express = require("express");
const router = express.Router();
const Subject = require("../models/Subject");
const Unit = require("../models/Unit");
const Chapter = require("../models/Chapter");
const Topic = require("../models/Topic");
const { protect } = require("../middleware/auth.middleware");
const { authorize } = require("../middleware/role.middleware");
const apiResponse = require("../utils/apiResponse");
const ApiError = require("../utils/apiError");

router.get("/subjects", async (req, res, next) => {
  try {
    const filter = { isActive: true };
    if (req.query.course) filter.course = req.query.course;
    const subjects = await Subject.find(filter).sort({ displayOrder: 1 });
    return apiResponse(res, 200, "Subjects retrieved", { subjects });
  } catch (error) {
    next(error);
  }
});

router.get("/chapters", async (req, res, next) => {
  try {
    const filter = { isActive: true };
    if (req.query.subject) filter.subject = req.query.subject;
    if (req.query.unit) filter.unit = req.query.unit;
    const chapters = await Chapter.find(filter).sort({ displayOrder: 1 });
    return apiResponse(res, 200, "Chapters retrieved", { chapters });
  } catch (error) {
    next(error);
  }
});

router.get("/units", async (req, res, next) => {
  try {
    const filter = { isActive: true };
    if (req.query.subject) filter.subject = req.query.subject;
    const units = await Unit.find(filter)
      .populate("subject", "name")
      .sort({ displayOrder: 1 });
    return apiResponse(res, 200, "Units retrieved", { units });
  } catch (error) {
    next(error);
  }
});

// ── Create / manage academic structure (admin + teacher) ────
router.post("/units", protect, authorize("admin", "teacher"), async (req, res, next) => {
  try {
    const { name, subject, description, displayOrder } = req.body;
    if (!name || !subject) {
      return next(new ApiError(400, "Unit name and subject are required"));
    }
    // Return an existing unit with the same name instead of duplicating.
    let unit = await Unit.findOne({ name, subject });
    if (!unit) {
      unit = await Unit.create({ name, subject, description, displayOrder });
    }
    return apiResponse(res, 201, "Unit ready", { unit });
  } catch (error) {
    next(error);
  }
});

router.post("/chapters", protect, authorize("admin", "teacher"), async (req, res, next) => {
  try {
    const { name, unit, subject, description, displayOrder } = req.body;
    if (!name || !unit) {
      return next(new ApiError(400, "Chapter name and unit are required"));
    }
    let resolvedSubject = subject;
    if (!resolvedSubject) {
      const parent = await Unit.findById(unit);
      resolvedSubject = parent?.subject;
    }
    let chapter = await Chapter.findOne({ name, unit });
    if (!chapter) {
      chapter = await Chapter.create({
        name,
        unit,
        subject: resolvedSubject,
        description,
        displayOrder,
      });
    }
    return apiResponse(res, 201, "Chapter ready", { chapter });
  } catch (error) {
    next(error);
  }
});

router.get("/tree/:courseId", async (req, res, next) => {
  try {
    const subjects = await Subject.find({ course: req.params.courseId, isActive: true });
    const chapters = await Chapter.find({ subject: { $in: subjects.map(s => s._id) }, isActive: true });
    return apiResponse(res, 200, "Academic tree", { subjects, chapters });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
```

---

# FILE: `server\src\routes\achievement.routes.js`

```javascript
﻿const express = require("express");
const router = express.Router();
const {
  getAchievements,
  createAchievement,
  updateAchievement,
  deleteAchievement,
} = require("../controllers/achievement.controller");
const { protect } = require("../middleware/auth.middleware");
const { authorize } = require("../middleware/role.middleware");

router.get("/", getAchievements);
router.post("/", protect, authorize("admin"), createAchievement);
router.put("/:id", protect, authorize("admin"), updateAchievement);
router.delete("/:id", protect, authorize("admin"), deleteAchievement);

module.exports = router;
```

---

# FILE: `server\src\routes\admin.routes.js`

```javascript
﻿const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { protect } = require("../middleware/auth.middleware");
const { authorize } = require("../middleware/role.middleware");
const { getAdminDashboard } = require("../controllers/dashboard.controller");
const ActivityLog = require("../models/ActivityLog");
const apiResponse = require("../utils/apiResponse");

router.get("/dashboard", protect, authorize("admin"), getAdminDashboard);

router.get("/activity-logs", protect, authorize("admin"), async (req, res, next) => {
  try {
    const logs = await ActivityLog.find()
      .populate("user", "name email role")
      .sort({ createdAt: -1 })
      .limit(50);
    return apiResponse(res, 200, "Activity logs", { logs });
  } catch (error) {
    next(error);
  }
});

// System maintenance utilities
router.get("/system-health", protect, authorize("admin"), async (req, res, next) => {
  try {
    const dbState = mongoose.connection.readyState;
    const dbStateMap = {
      0: "Disconnected",
      1: "Connected",
      2: "Connecting",
      3: "Disconnecting",
    };
    return apiResponse(res, 200, "System health retrieved", {
      database: {
        status: dbState === 1 ? "Healthy" : "Degraded",
        connectionState: dbStateMap[dbState] || "Unknown",
        name: mongoose.connection.name || "neetvidya",
      },
      server: {
        uptime: Math.round(process.uptime()),
        memoryUsageMB: Math.round(process.memoryUsage().rss / (1024 * 1024)),
        nodeVersion: process.version,
        platform: process.platform,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.post("/clear-cache", protect, authorize("admin"), async (req, res, next) => {
  try {
    return apiResponse(res, 200, "In-memory cache and temporary assets cleared successfully");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
```

---

# FILE: `server\src\routes\attempt.routes.js`

```javascript
const express = require("express");
const router = express.Router();
const { startAttempt, saveAttemptState, submitAttempt, getAttempt, getMyAttempts } = require("../controllers/attempt.controller");
const { protect } = require("../middleware/auth.middleware");
const { authorize } = require("../middleware/role.middleware");

router.post("/exam/:examId/start", protect, authorize("student", "admin"), startAttempt);
router.get("/my", protect, authorize("student"), getMyAttempts);
router.get("/:id", protect, getAttempt);
router.put("/:id/save", protect, authorize("student", "admin"), saveAttemptState);
router.post("/:id/submit", protect, authorize("student", "admin"), submitAttempt);

module.exports = router;
```

---

# FILE: `server\src\routes\auth.routes.js`

```javascript
const express = require("express");
const router = express.Router();
const {
  register,
  verifyEmail,
  resendVerification,
  login,
  refresh,
  forgotPassword,
  resetPassword,
  changePassword,
  getMe,
  updateProfile,
  adminCreateStudent,
  adminCreateTeacher,
} = require("../controllers/auth.controller");
const { protect } = require("../middleware/auth.middleware");
const { requireRole } = require("../middleware/role.middleware");
const { authLimiter } = require("../middleware/rateLimiter.middleware");

// Public routes
router.post("/register", authLimiter, register);
router.get("/verify-email", verifyEmail);
router.post("/resend-verification", authLimiter, resendVerification);
router.post("/login", authLimiter, login);
router.post("/refresh", refresh);
router.post("/forgot-password", authLimiter, forgotPassword);
router.post("/reset-password", authLimiter, resetPassword);

// Protected routes
router.get("/me", protect, getMe);
router.put("/profile", protect, updateProfile);
router.put("/change-password", protect, changePassword);

// Admin-only
router.post("/admin/create-student", protect, requireRole("admin"), adminCreateStudent);
router.post("/admin/create-teacher", protect, requireRole("admin"), adminCreateTeacher);

module.exports = router;
```

---

# FILE: `server\src\routes\batch.routes.js`

```javascript
﻿const express = require("express");
const router = express.Router();
const {
  getBatches,
  createBatch,
  updateBatch,
  deleteBatch,
  addStudentsToBatch,
  removeStudentFromBatch,
  getBatchStudents,
} = require("../controllers/batch.controller");
const { protect } = require("../middleware/auth.middleware");
const { authorize } = require("../middleware/role.middleware");

router.get("/", protect, getBatches);
router.post("/", protect, authorize("admin"), createBatch);
router.put("/:id", protect, authorize("admin"), updateBatch);
router.delete("/:id", protect, authorize("admin"), deleteBatch);
router.post("/:id/students", protect, authorize("admin"), addStudentsToBatch);
router.delete("/:id/students/:studentId", protect, authorize("admin"), removeStudentFromBatch);
router.get("/:id/students", protect, getBatchStudents);

module.exports = router;
```

---

# FILE: `server\src\routes\contactSettings.routes.js`

```javascript
﻿const express = require("express");
const router = express.Router();
const { getSettings, updateSettings } = require("../controllers/contactSettings.controller");
const { protect } = require("../middleware/auth.middleware");
const { authorize } = require("../middleware/role.middleware");

router.get("/", getSettings);
router.put("/", protect, authorize("admin"), updateSettings);

module.exports = router;
```

---

# FILE: `server\src\routes\course.routes.js`

```javascript
﻿const express = require("express");
const router = express.Router();
const {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/course.controller");
const { protect } = require("../middleware/auth.middleware");
const { authorize } = require("../middleware/role.middleware");

router.get("/", getCourses);
router.get("/:id", getCourseById);
router.post("/", protect, authorize("admin"), createCourse);
router.put("/:id", protect, authorize("admin"), updateCourse);
router.delete("/:id", protect, authorize("admin"), deleteCourse);

module.exports = router;
```

---

# FILE: `server\src\routes\dashboard.routes.js`

```javascript
﻿const express = require("express");
const router = express.Router();
const {
  getAdminDashboard,
  getStudentDashboard,
  getTeacherDashboard,
} = require("../controllers/dashboard.controller");
const { protect } = require("../middleware/auth.middleware");
const { authorize } = require("../middleware/role.middleware");

router.get("/admin", protect, authorize("admin"), getAdminDashboard);
router.get("/student", protect, authorize("student"), getStudentDashboard);
router.get("/teacher", protect, authorize("teacher", "admin"), getTeacherDashboard);

module.exports = router;
```

---

# FILE: `server\src\routes\enquiry.routes.js`

```javascript
﻿const express = require("express");
const router = express.Router();
const { submitEnquiry, getEnquiries, updateEnquiry, deleteEnquiry } = require("../controllers/enquiry.controller");
const { protect } = require("../middleware/auth.middleware");
const { authorize } = require("../middleware/role.middleware");

router.post("/", submitEnquiry);
router.get("/", protect, authorize("admin"), getEnquiries);
router.put("/:id", protect, authorize("admin"), updateEnquiry);
router.delete("/:id", protect, authorize("admin"), deleteEnquiry);

module.exports = router;
```

---

# FILE: `server\src\routes\enrollment.routes.js`

```javascript
const express = require("express");
const router = express.Router();
const Enrollment = require("../models/Enrollment");
const { protect } = require("../middleware/auth.middleware");
const { authorize } = require("../middleware/role.middleware");
const apiResponse = require("../utils/apiResponse");

router.get("/my", protect, authorize("student"), async (req, res, next) => {
  try {
    const enrollments = await Enrollment.find({ student: req.user._id, status: "ACTIVE" })
      .populate("course")
      .populate("batch");
    return apiResponse(res, 200, "Enrollments retrieved", { enrollments });
  } catch (error) {
    next(error);
  }
});

router.post("/", protect, authorize("admin"), async (req, res, next) => {
  try {
    const enrollment = await Enrollment.create({
      ...req.body,
      enrolledBy: req.user._id,
    });
    return apiResponse(res, 201, "Student enrolled successfully", { enrollment });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
```

---

# FILE: `server\src\routes\exam.routes.js`

```javascript
const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024 }});

const {
  getExams,
  getExamById,
  createExam,
  updateExam,
  publishExam,
  closeExam,
  archiveExam,
  setStudyVisibility,
  reconductExam,
  downloadExam,
  getQuestionBank,
  publishResults,
  grantPermission,
  revokePermission,
  listPermissions,
  importQuestions,
  createExamQuestion,
  getExamQuestions,
  deleteExamQuestion,
  deleteExam,
  getExamResults,
} = require("../controllers/exam.controller");
const { protect } = require("../middleware/auth.middleware");
const { authorize } = require("../middleware/role.middleware");

// Question Bank = archive of finished exams
router.get("/bank", protect, authorize("admin", "teacher"), getQuestionBank);

router.get("/", protect, getExams);
router.post("/", protect, authorize("admin", "teacher"), createExam);
router.get("/:id", protect, getExamById);
router.put("/:id", protect, authorize("admin", "teacher"), updateExam);
router.delete("/:id", protect, authorize("admin"), deleteExam);

// Lifecycle
router.put("/:id/publish", protect, authorize("admin", "teacher"), publishExam);
router.put("/:id/close", protect, authorize("admin", "teacher"), closeExam);
router.put("/:id/archive", protect, authorize("admin", "teacher"), archiveExam);
router.put("/:id/study-visibility", protect, authorize("admin", "teacher"), setStudyVisibility);
router.post("/:id/reconduct", protect, authorize("admin", "teacher"), reconductExam);
router.get("/:id/download", protect, authorize("admin", "teacher"), downloadExam);

// Results publishing
router.get("/:id/results", protect, authorize("admin", "teacher"), getExamResults);
router.put("/:id/publish-results", protect, authorize("admin", "teacher"), publishResults);

// Exam-specific questions (belong to THIS exam only)
router.get("/:id/questions", protect, authorize("admin", "teacher"), getExamQuestions);
router.post(
  "/:id/questions",
  protect,
  authorize("admin", "teacher"),
  upload.fields([
    { name: "questionImage", maxCount: 1 },
    { name: "explanationImage", maxCount: 1 },
    { name: "optionImage_0", maxCount: 1 },
    { name: "optionImage_1", maxCount: 1 },
    { name: "optionImage_2", maxCount: 1 },
    { name: "optionImage_3", maxCount: 1 },
  ]),
  createExamQuestion
);
router.post("/:id/import-questions", protect, authorize("admin", "teacher"), importQuestions);
router.delete(
  "/:id/questions/:questionId",
  protect,
  authorize("admin", "teacher"),
  deleteExamQuestion
);

// Outsider / exam-only student permissions
router.get("/:id/permissions", protect, authorize("admin", "teacher"), listPermissions);
router.post("/:id/permissions", protect, authorize("admin"), grantPermission);
router.delete("/:id/permissions/:studentId", protect, authorize("admin"), revokePermission);

module.exports = router;
```

---

# FILE: `server\src\routes\index.js`

```javascript
const express = require("express");
const router = express.Router();

router.use("/auth", require("./auth.routes"));
router.use("/students", require("./student.routes"));
router.use("/teachers", require("./teacher.routes"));
router.use("/batches", require("./batch.routes"));
router.use("/enrollments", require("./enrollment.routes"));
router.use("/courses", require("./course.routes"));
router.use("/academics", require("./academic.routes"));
router.use("/materials", require("./material.routes"));
router.use("/lectures", require("./lecture.routes"));
router.use("/resources", require("./resource.routes"));
router.use("/questions", require("./question.routes"));
router.use("/test-series", require("./testSeries.routes"));
router.use("/exams", require("./exam.routes"));
router.use("/attempts", require("./attempt.routes"));
router.use("/results", require("./result.routes"));
router.use("/notifications", require("./notification.routes"));
router.use("/achievements", require("./achievement.routes"));
router.use("/testimonials", require("./testimonial.routes"));
router.use("/enquiries", require("./enquiry.routes"));
router.use("/website", require("./website.routes"));
router.use("/upload", require("./upload.routes"));
router.use("/admin", require("./admin.routes"));
router.use("/dashboard", require("./dashboard.routes"));
router.use("/contact-settings", require("./contactSettings.routes"));

module.exports = router;
```

---

# FILE: `server\src\routes\lecture.routes.js`

```javascript
﻿const express = require("express");
const router = express.Router();
const { getLectures, createLecture, updateLecture, deleteLecture } = require("../controllers/lecture.controller");
const { protect } = require("../middleware/auth.middleware");
const { authorize } = require("../middleware/role.middleware");

router.get("/", protect, getLectures);
router.post("/", protect, authorize("admin", "teacher"), createLecture);
router.put("/:id", protect, authorize("admin", "teacher"), updateLecture);
router.delete("/:id", protect, authorize("admin", "teacher"), deleteLecture);

module.exports = router;
```

---

# FILE: `server\src\routes\material.routes.js`

```javascript
﻿const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 25 * 1024 * 1024 } });
const {
  getMaterials,
  getMyBatchMaterials,
  createMaterial,
  deleteMaterial,
  getMaterialTree,
} = require("../controllers/material.controller");
const { protect } = require("../middleware/auth.middleware");
const { authorize } = require("../middleware/role.middleware");

router.get("/my", protect, authorize("student"), getMyBatchMaterials);
router.get("/tree", protect, getMaterialTree);
router.get("/", protect, getMaterials);
router.post("/", protect, authorize("admin", "teacher"), upload.single("file"), createMaterial);
router.delete("/:id", protect, authorize("admin", "teacher"), deleteMaterial);

module.exports = router;
```

---

# FILE: `server\src\routes\notification.routes.js`

```javascript
﻿const express = require("express");
const router = express.Router();
const {
  getNotifications,
  getUnreadCount,
  markAsRead,
  markAllAsRead,
  createNotification,
} = require("../controllers/notification.controller");
const { protect } = require("../middleware/auth.middleware");
const { authorize } = require("../middleware/role.middleware");

router.get("/", protect, getNotifications);
router.get("/unread-count", protect, getUnreadCount);
router.put("/read-all", protect, markAllAsRead);
router.put("/:id/read", protect, markAsRead);
router.post("/", protect, authorize("admin"), createNotification);

module.exports = router;
```

---

# FILE: `server\src\routes\question.routes.js`

```javascript
﻿const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024 } });

const {
  getQuestions,
  createQuestion,
  createQuestionWithImages,
  updateQuestion,
  deleteQuestion,
  addExplanation,
  bulkImport,
} = require("../controllers/question.controller");
const { protect } = require("../middleware/auth.middleware");
const { authorize } = require("../middleware/role.middleware");

const Question = require("../models/Question");
const apiResponse = require("../utils/apiResponse");

// Question Bank = archive of completed exams (exam papers), NOT a manual question store.
router.get("/bank", protect, authorize("teacher", "admin"), async (req, res, next) => {
  try {
    const svc = require("../services/exam.service");
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const data = await svc.getQuestionBank({ page, limit, search: req.query.search || "" });
    return apiResponse(res, 200, "Question bank (archived exam papers)", data);
  } catch (error) {
    next(error);
  }
});

router.get("/", protect, authorize("teacher", "admin"), getQuestions);
router.post("/", protect, authorize("teacher", "admin"), createQuestion);
router.post(
  "/with-images",
  protect,
  authorize("teacher", "admin"),
  upload.fields([
    { name: "questionImage", maxCount: 1 },
    { name: "explanationImage", maxCount: 1 },
    { name: "optionImage_0", maxCount: 1 },
    { name: "optionImage_1", maxCount: 1 },
    { name: "optionImage_2", maxCount: 1 },
    { name: "optionImage_3", maxCount: 1 },
  ]),
  createQuestionWithImages
);
router.post("/bulk-import", protect, authorize("admin"), bulkImport);
router.put("/:id", protect, authorize("teacher", "admin"), updateQuestion);
router.put("/:id/explanation", protect, authorize("teacher", "admin"), addExplanation);
router.delete("/:id", protect, authorize("teacher", "admin"), deleteQuestion);

module.exports = router;
```

---

# FILE: `server\src\routes\resource.routes.js`

```javascript
﻿const express = require("express");
const router = express.Router();
const { getResources, createResource, deleteResource } = require("../controllers/resource.controller");
const { protect } = require("../middleware/auth.middleware");
const { authorize } = require("../middleware/role.middleware");

router.get("/", getResources);
router.get("/public", getResources);
router.post("/", protect, authorize("admin", "teacher"), createResource);
router.delete("/:id", protect, authorize("admin", "teacher"), deleteResource);

module.exports = router;
```

---

# FILE: `server\src\routes\result.routes.js`

```javascript
const express = require("express");
const router = express.Router();
const Result = require("../models/Result");
const Attempt = require("../models/Attempt");
const Question = require("../models/Question");
const { protect } = require("../middleware/auth.middleware");
const { authorize } = require("../middleware/role.middleware");
const apiResponse = require("../utils/apiResponse");
const ApiError = require("../utils/apiError");

router.get("/my", protect, authorize("student", "admin"), async (req, res, next) => {
  try {
    // Students only ever see results the exam rule has released.
    const isStudent = req.user.role === "student";
    const filter = { student: req.user._id };
    if (isStudent) filter.isPublished = true;
    const results = await Result.find(filter)
      .populate("exam", "title testType duration totalMarks")
      .sort({ createdAt: -1 });
    return apiResponse(res, 200, "Results retrieved", { results });
  } catch (error) {
    next(error);
  }
});

router.get("/:attemptId", protect, async (req, res, next) => {
  try {
    const result = await Result.findOne({ attempt: req.params.attemptId })
      .populate("exam", "title testType duration totalMarks")
      .populate("subjectBreakdown.subject", "name");
    if (!result) throw new ApiError(404, "Result not found");
    // A student cannot read someone else's result, nor an unpublished result they own.
    if (req.user.role === "student") {
      if (String(result.student) !== String(req.user._id)) {
        throw new ApiError(403, "Not authorized to view this result");
      }
      if (!result.isPublished) {
        return apiResponse(res, 200, "Result not published yet", { result: null, pending: true });
      }
    }
    return apiResponse(res, 200, "Result retrieved", { result });
  } catch (error) {
    next(error);
  }
});

router.get("/:attemptId/solutions", protect, async (req, res, next) => {
  try {
    const attempt = await Attempt.findById(req.params.attemptId);
    if (!attempt) throw new ApiError(404, "Attempt not found");
    if (req.user.role === "student" && String(attempt.student) !== String(req.user._id)) {
      throw new ApiError(403, "Not authorized to view these solutions");
    }

    const solutions = [];
    for (const answer of attempt.answers) {
      const question = await Question.findById(answer.question)
        .populate("subject", "name")
        .populate("chapter", "name");
      if (question) {
        solutions.push({
          question: {
            _id: question._id,
            questionText: question.questionText,
            questionImageUrl: question.questionImageUrl,
            options: question.options,
            correctAnswer: question.correctAnswer,
            explanation: question.explanation,
            explanationImageUrl: question.explanationImageUrl,
            difficulty: question.difficulty,
            subject: question.subject,
            chapter: question.chapter,
          },
          yourAnswer: answer.selectedOption,
          markedForReview: answer.markedForReview,
        });
      }
    }

    return apiResponse(res, 200, "Solutions retrieved", { solutions });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
```

---

# FILE: `server\src\routes\student.routes.js`

```javascript
﻿const express = require("express");
const router = express.Router();
const {
  getStudents,
  getStudentById,
  getMyProfile,
  updateMyProfile,
  updateMyAvatar,
  updateStudent,
  deactivateStudent,
  deleteStudent,
} = require("../controllers/student.controller");
const { protect } = require("../middleware/auth.middleware");
const { authorize } = require("../middleware/role.middleware");

router.get("/", protect, authorize("admin", "teacher"), getStudents);
router.get("/my", protect, authorize("student"), getMyProfile);
router.put("/my", protect, authorize("student"), updateMyProfile);
router.put("/my/avatar", protect, authorize("student"), updateMyAvatar);
router.get("/:id", protect, getStudentById);
router.put("/:id", protect, authorize("admin"), updateStudent);
router.put("/:id/toggle-active", protect, authorize("admin"), deactivateStudent);
router.delete("/:id", protect, authorize("admin"), deleteStudent);

module.exports = router;
```

---

# FILE: `server\src\routes\teacher.routes.js`

```javascript
﻿const express = require("express");
const router = express.Router();
const {
  getTeachers,
  getPublicTeachers,
  getMyProfile,
  updatePermissions,
  deactivateTeacher,
  updateTeacher,
} = require("../controllers/teacher.controller");
const { protect } = require("../middleware/auth.middleware");
const { authorize } = require("../middleware/role.middleware");

router.get("/public", getPublicTeachers);
router.get("/", protect, authorize("admin"), getTeachers);
router.get("/my", protect, authorize("teacher"), getMyProfile);
router.put("/:id/permissions", protect, authorize("admin"), updatePermissions);
router.put("/:id/toggle-active", protect, authorize("admin"), deactivateTeacher);
router.put("/:id", protect, authorize("admin"), updateTeacher);

module.exports = router;
```

---

# FILE: `server\src\routes\testimonial.routes.js`

```javascript
const express = require("express");
const router = express.Router();
const Testimonial = require("../models/Testimonial");
const { protect } = require("../middleware/auth.middleware");
const { authorize } = require("../middleware/role.middleware");
const apiResponse = require("../utils/apiResponse");

router.get("/", async (req, res, next) => {
  try {
    const testimonials = await Testimonial.find({ isActive: true }).sort({ displayOrder: 1 });
    return apiResponse(res, 200, "Testimonials", { testimonials });
  } catch (error) {
    next(error);
  }
});

router.post("/", protect, authorize("admin"), async (req, res, next) => {
  try {
    const testimonial = await Testimonial.create(req.body);
    return apiResponse(res, 201, "Testimonial created", { testimonial });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
```

---

# FILE: `server\src\routes\testSeries.routes.js`

```javascript
﻿const express = require("express");
const router = express.Router();
const { getTestSeries, createTestSeries, updateTestSeries } = require("../controllers/testSeries.controller");
const { protect } = require("../middleware/auth.middleware");
const { authorize } = require("../middleware/role.middleware");

router.get("/", getTestSeries);
router.post("/", protect, authorize("admin", "teacher"), createTestSeries);
router.put("/:id", protect, authorize("admin"), updateTestSeries);

module.exports = router;
```

---

# FILE: `server\src\routes\upload.routes.js`

```javascript
const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth.middleware");
const { authorize } = require("../middleware/role.middleware");
const { uploadImage, uploadVideo, uploadPDF } = require("../middleware/upload.middleware");
const { uploadFile } = require("../services/cloudinary.service");
const apiResponse = require("../utils/apiResponse");
const FOLDERS = require("../constants/cloudinaryFolders");

router.post("/image", protect, authorize("teacher", "admin"), uploadImage, async (req, res, next) => {
  try {
    if (!req.file) return apiResponse(res, 400, "No image file provided");
    const folder = req.body.folder || FOLDERS.WEBSITE;
    const result = await uploadFile(req.file.buffer, folder, "image");
    return apiResponse(res, 200, "Image uploaded", result);
  } catch (error) {
    next(error);
  }
});

router.post("/video", protect, authorize("teacher", "admin"), uploadVideo, async (req, res, next) => {
  try {
    if (!req.file) return apiResponse(res, 400, "No video file provided");
    const result = await uploadFile(req.file.buffer, FOLDERS.LECTURES, "video");
    return apiResponse(res, 200, "Video uploaded", result);
  } catch (error) {
    next(error);
  }
});

router.post("/pdf", protect, authorize("teacher", "admin"), uploadPDF, async (req, res, next) => {
  try {
    if (!req.file) return apiResponse(res, 400, "No PDF file provided");
    const result = await uploadFile(req.file.buffer, FOLDERS.MATERIALS, "raw");
    return apiResponse(res, 200, "PDF uploaded", result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
```

---

# FILE: `server\src\routes\website.routes.js`

```javascript
﻿const express = require("express");
const router = express.Router();
const { getHomepage, getSection, updateSection } = require("../controllers/website.controller");
const { protect } = require("../middleware/auth.middleware");
const { authorize } = require("../middleware/role.middleware");

router.get("/home", getHomepage);
router.get("/section/:section", getSection);
router.put("/section/:section", protect, authorize("admin"), updateSection);

module.exports = router;
```

---

# FILE: `server\src\seed.js`

```javascript
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
```

---

# FILE: `server\src\server.js`

```javascript
const dotenv = require("dotenv");
dotenv.config();

const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`NEETVIDYA Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err.message);
    app.listen(PORT, () => {
      console.log(`NEETVIDYA Server running in fallback mode on port ${PORT}`);
    });
  });

process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
});
```

---

# FILE: `server\src\services\attempt.service.js`

```javascript
﻿const Attempt = require("../models/Attempt");
const Exam = require("../models/Exam");
const Question = require("../models/Question");
const Result = require("../models/Result");
const { evaluateAttempt } = require("./evaluation.service");
const { shuffleArray, generateOptionOrder } = require("../utils/shuffle");
const ApiError = require("../utils/apiError");

const getAttemptById = async (id) => {
  const attempt = await Attempt.findById(id).populate("exam", "title duration totalMarks");
  if (!attempt) throw new ApiError(404, "Attempt not found");
  return attempt;
};

const getMyAttempts = async (studentId) => {
  const attempts = await Attempt.find({ student: studentId })
    .populate("exam", "title testType duration totalMarks")
    .sort({ createdAt: -1 });
  return attempts;
};

const startAttempt = async (examId, studentId, user) => {
  const exam = await Exam.findById(examId);
  if (!exam) throw new ApiError(404, "Exam not found");

  // Enforce access (batch membership or explicit admin permission) on the backend.
  const { assertExamAccess } = require("./exam.service");
  await assertExamAccess(user || { _id: studentId, role: "student" }, exam);

  const existingInProgress = await Attempt.findOne({
    exam: examId,
    student: studentId,
    status: "IN_PROGRESS",
  });

  if (existingInProgress) {
    const questions = await Question.find({
      _id: { $in: existingInProgress.questionOrder },
    });
    const questionMap = new Map(questions.map((q) => [q._id.toString(), q]));
    const orderedQuestions = existingInProgress.questionOrder.map((id) => {
      const q = questionMap.get(id.toString());
      if (!q) return null;
      return {
        _id: q._id,
        questionText: q.questionText,
        questionImageUrl: q.questionImageUrl,
        options: q.options,
        marks: q.marks,
        negativeMarks: q.negativeMarks,
        difficulty: q.difficulty,
        subject: q.subject,
        chapter: q.chapter,
      };
    }).filter(Boolean);

    return {
      attemptId: existingInProgress._id,
      serverEndTime: existingInProgress.serverEndTime,
      duration: exam.duration,
      totalQuestions: orderedQuestions.length,
      totalMarks: exam.totalMarks,
      marksPerCorrect: exam.marksPerCorrect,
      negativePerWrong: exam.negativePerWrong,
      instructions: exam.instructions,
      questions: orderedQuestions,
      answers: existingInProgress.answers,
    };
  }

  const completedAttempts = await Attempt.countDocuments({
    exam: examId,
    student: studentId,
    status: { $in: ["SUBMITTED", "AUTO_SUBMITTED"] },
  });

  if (completedAttempts >= (exam.maxAttempts || 1)) {
    throw new ApiError(400, "Maximum attempts reached for this exam");
  }

  // Every exam runs on its OWN fixed question set - never a random bank pool.
  const questions = await Question.find({
    _id: { $in: exam.questions || [] },
    isActive: true,
  });
  if (questions.length === 0) {
    throw new ApiError(400, "This exam has no questions configured");
  }

  let questionOrder = questions.map((q) => q._id);
  if (exam.randomizeQuestions) {
    questionOrder = shuffleArray(questionOrder);
  }

  const optionOrders = questionOrder.map(() => generateOptionOrder(4));
  const now = new Date();
  const serverEndTime = new Date(now.getTime() + (exam.duration || 60) * 60 * 1000);

  const answers = questionOrder.map((qId) => ({
    question: qId,
    selectedOption: null,
    markedForReview: false,
    timeSpent: 0,
  }));

  const attempt = await Attempt.create({
    exam: examId,
    student: studentId,
    startedAt: now,
    serverEndTime,
    status: "IN_PROGRESS",
    answers,
    questionOrder,
    optionOrders,
  });

  const questionMap = new Map(questions.map((q) => [q._id.toString(), q]));
  const questionsWithoutAnswers = questionOrder.map((qId) => {
    const q = questionMap.get(qId.toString());
    if (!q) return null;
    return {
      _id: q._id,
      questionText: q.questionText,
      questionImageUrl: q.questionImageUrl,
      options: q.options,
      marks: q.marks,
      negativeMarks: q.negativeMarks,
      difficulty: q.difficulty,
      subject: q.subject,
      chapter: q.chapter,
    };
  }).filter(Boolean);

  return {
    attemptId: attempt._id,
    serverEndTime,
    duration: exam.duration,
    totalQuestions: questionOrder.length,
    totalMarks: exam.totalMarks,
    marksPerCorrect: exam.marksPerCorrect,
    negativePerWrong: exam.negativePerWrong,
    instructions: exam.instructions,
    questions: questionsWithoutAnswers,
    optionOrders,
    answers,
  };
};

const saveAttemptState = async (attemptId, studentId, payload = {}) => {
  const { answers, currentQuestion } = payload;

  const attempt = await Attempt.findById(attemptId);
  if (!attempt) throw new ApiError(404, "Attempt not found");
  if (attempt.student.toString() !== studentId.toString()) {
    throw new ApiError(403, "Unauthorized");
  }
  if (attempt.status !== "IN_PROGRESS") {
    throw new ApiError(400, "Attempt already submitted");
  }

  if (answers && Array.isArray(answers)) {
    answers.forEach((answer, idx) => {
      if (attempt.answers[idx]) {
        attempt.answers[idx].selectedOption = answer.selectedOption;
        attempt.answers[idx].markedForReview = answer.markedForReview;
        attempt.answers[idx].timeSpent = answer.timeSpent || 0;
      }
    });
  }

  if (currentQuestion !== undefined) {
    attempt.currentQuestion = currentQuestion;
  }

  await attempt.save();
  return attempt;
};

const submitAttempt = async (attemptId, user) => {
  const attempt = await Attempt.findById(attemptId);
  if (!attempt) throw new ApiError(404, "Attempt not found");
  if (attempt.student.toString() !== user._id.toString() && user.role !== "admin") {
    throw new ApiError(403, "Unauthorized");
  }

  if (attempt.status !== "IN_PROGRESS") {
    const existingResult = await Result.findOne({ attempt: attempt._id });
    return { result: existingResult };
  }

  attempt.status = "SUBMITTED";
  attempt.submittedAt = new Date();
  await attempt.save();

  const result = await evaluateAttempt(attempt);
  return { result };
};

module.exports = {
  getAttemptById,
  getMyAttempts,
  startAttempt,
  saveAttemptState,
  submitAttempt,
};
```

---

# FILE: `server\src\services\auth.service.js`

```javascript
const User = require("../models/User");
const Student = require("../models/Student");
const Teacher = require("../models/Teacher");
const { generateAccessToken, generateRefreshToken, verifyRefreshToken } = require("../utils/jwt");
const generatePassword = require("../utils/generatePassword");
const ApiError = require("../utils/apiError");
const { sendVerificationEmail, sendPasswordResetEmail, sendWelcomeEmail } = require("./email.service");
const crypto = require("crypto");
const mongoose = require("mongoose");

// Helper: generate unique student ID like NV-2026-0001
const generateStudentId = async () => {
  const year = new Date().getFullYear();
  const prefix = `NV-${year}-`;
  // Find the last student ID with this prefix
  const last = await Student.findOne({ studentId: { $regex: `^${prefix}` } })
    .sort({ studentId: -1 })
    .select("studentId");
  if (!last || !last.studentId) return `${prefix}0001`;
  const lastNum = parseInt(last.studentId.replace(prefix, "")) || 0;
  return `${prefix}${String(lastNum + 1).padStart(4, "0")}`;
};

const register = async (name, email, password, phone) => {
  const existing = await User.findOne({ email });
  if (existing) throw new ApiError(400, "Email already registered");

  const verificationToken = crypto.randomBytes(32).toString("hex");
  const hashedToken = crypto.createHash("sha256").update(verificationToken).digest("hex");

  const user = await User.create({
    name,
    email,
    password,
    phone,
    role: "student",
    emailVerified: false,
    emailVerificationToken: hashedToken,
    emailVerificationExpires: new Date(Date.now() + 24 * 60 * 60 * 1000),
  });

  const studentId = await generateStudentId();
  await Student.create({ user: user._id, studentId, enrollmentDate: new Date() });

  // Send verification email (non-blocking)
  await sendVerificationEmail(user, verificationToken);

  return { userId: user._id, email: user.email, message: "Please check your email to verify your account." };
};

const verifyEmail = async (token) => {
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  const user = await User.findOne({ emailVerificationToken: hashedToken }).select(
    "+emailVerificationToken +emailVerificationExpires +lastVerifiedToken"
  );

  if (!user || !user.emailVerificationExpires || new Date(user.emailVerificationExpires).getTime() <= Date.now()) {
    // If the token was already used to verify this account, return idempotent success
    const alreadyVerifiedUser = await User.findOne({ lastVerifiedToken: hashedToken });
    if (alreadyVerifiedUser && alreadyVerifiedUser.emailVerified) {
      return { message: "Email is already verified. You can now log in." };
    }

    if (user) {
      user.emailVerificationToken = undefined;
      user.emailVerificationExpires = undefined;
      await user.save({ validateBeforeSave: false });
    }
    throw new ApiError(400, "Invalid or expired verification link. Please request a new one.");
  }

  user.emailVerified = true;
  user.lastVerifiedToken = hashedToken;
  user.emailVerificationToken = undefined;
  user.emailVerificationExpires = undefined;
  await user.save({ validateBeforeSave: false });

  return { message: "Email verified successfully. You can now log in." };
};

const resendVerification = async (email) => {
  const user = await User.findOne({ email }).select("+emailVerificationToken +emailVerificationExpires");
  if (!user) throw new ApiError(404, "No account found with this email.");
  if (user.emailVerified) throw new ApiError(400, "Email is already verified.");

  const verificationToken = crypto.randomBytes(32).toString("hex");
  const hashedToken = crypto.createHash("sha256").update(verificationToken).digest("hex");

  user.emailVerificationToken = hashedToken;
  user.emailVerificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);
  await user.save({ validateBeforeSave: false });

  await sendVerificationEmail(user, verificationToken);
  return { message: "Verification email has been resent." };
};

const login = async (email, password) => {
  // Support login by studentId as well
  let user;
  if (email.toUpperCase().startsWith("NV-")) {
    // Student ID login
    const student = await Student.findOne({ studentId: email.toUpperCase() }).populate("user");
    if (!student) throw new ApiError(401, "Invalid student ID or password");
    user = await User.findById(student.user._id).select("+password");
  } else {
    user = await User.findOne({ email }).select("+password");
  }

  if (!user) throw new ApiError(401, "Invalid email or password");
  if (!user.isActive) throw new ApiError(403, "Account has been deactivated. Please contact support.");
  if (!user.emailVerified) throw new ApiError(403, "Please verify your email address before logging in.");

  const isMatch = await user.comparePassword(password);
  if (!isMatch) throw new ApiError(401, "Invalid email or password");

  const accessToken = generateAccessToken(user._id, user.role);
  const refreshToken = generateRefreshToken(user._id);

  user.refreshToken = refreshToken;
  user.lastLogin = new Date();
  await user.save({ validateBeforeSave: false });

  const userObj = user.toObject();
  delete userObj.password;
  delete userObj.refreshToken;

  return { user: userObj, accessToken, refreshToken };
};

const refreshToken = async (token) => {
  const decoded = verifyRefreshToken(token);
  const user = await User.findById(decoded.id).select("+refreshToken");
  if (!user || user.refreshToken !== token) {
    throw new ApiError(401, "Invalid refresh token");
  }

  const accessToken = generateAccessToken(user._id, user.role);
  return { accessToken };
};

const forgotPassword = async (email) => {
  const user = await User.findOne({ email });
  // Always return same message to prevent email enumeration
  if (!user) return { message: "If an account exists with that email, a reset link has been sent." };

  const resetToken = crypto.randomBytes(32).toString("hex");
  const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

  user.passwordResetToken = hashedToken;
  user.passwordResetExpires = Date.now() + 60 * 60 * 1000; // 1 hour
  await user.save({ validateBeforeSave: false });

  await sendPasswordResetEmail(user, resetToken);
  return { message: "If an account exists with that email, a reset link has been sent." };
};

const resetPassword = async (token, newPassword) => {
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  }).select("+passwordResetToken +passwordResetExpires");

  if (!user) throw new ApiError(400, "Invalid or expired password reset link. Please request a new one.");

  user.password = newPassword;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  return { message: "Password has been reset successfully. You can now log in." };
};

const changePassword = async (userId, currentPassword, newPassword) => {
  const user = await User.findById(userId).select("+password");
  if (!user) throw new ApiError(404, "User not found");

  const isMatch = await user.comparePassword(currentPassword);
  if (!isMatch) throw new ApiError(400, "Current password is incorrect");

  user.password = newPassword;
  await user.save();

  return { message: "Password changed successfully" };
};

const adminCreateStudent = async (data) => {
  const existing = await User.findOne({ email: data.email });
  if (existing) throw new ApiError(400, "Email already registered");

  const tempPassword = data.password || generatePassword();
  const user = await User.create({
    name: data.name,
    email: data.email,
    password: tempPassword,
    phone: data.phone,
    role: "student",
    emailVerified: true, // admin-created accounts are pre-verified
  });

  const studentId = await generateStudentId();
  const student = await Student.create({
    user: user._id,
    studentId,
    studentType: data.studentType || "REGULAR_OFFLINE",
    batches: data.batch ? [data.batch] : (data.batches || []),
    enrollmentDate: new Date(),
    parentName: data.parentName,
    parentPhone: data.parentPhone,
    school: data.school,
    currentClass: data.currentClass || "XI",
    address: data.address,
    city: data.city,
    whatsappNumber: data.whatsappNumber,
  });

  // Send welcome email with credentials
  await sendWelcomeEmail(user, tempPassword);

  return { user, student, tempPassword, studentId };
};

const adminCreateTeacher = async (data) => {
  const existing = await User.findOne({ email: data.email });
  if (existing) throw new ApiError(400, "Email already registered");

  const tempPassword = data.password || generatePassword();
  const user = await User.create({
    name: data.name,
    email: data.email,
    password: tempPassword,
    phone: data.phone,
    role: "teacher",
    emailVerified: true,
  });

  const teacher = await Teacher.create({
    user: user._id,
    subjectName: typeof data.subject === "string" ? data.subject : undefined,
    subject: typeof data.subject !== "string" ? data.subject : undefined,
    qualification: data.qualification,
    experience: data.experience,
    specialisation: data.specialisation,
    bio: data.bio,
    permissions: data.permissions || {},
  });

  await sendWelcomeEmail(user, tempPassword);

  return { user, teacher, tempPassword };
};

const updateProfile = async (userId, updates) => {
  const allowedFields = ["name", "phone", "avatar"];
  const filteredUpdates = {};
  allowedFields.forEach((field) => {
    if (updates[field] !== undefined) filteredUpdates[field] = updates[field];
  });

  const user = await User.findByIdAndUpdate(userId, filteredUpdates, { new: true, runValidators: true });
  if (!user) throw new ApiError(404, "User not found");
  return user;
};

module.exports = {
  register,
  verifyEmail,
  resendVerification,
  login,
  refreshToken,
  forgotPassword,
  resetPassword,
  changePassword,
  adminCreateStudent,
  adminCreateTeacher,
  updateProfile,
};
```

---

# FILE: `server\src\services\batch.service.js`

```javascript
const Batch = require("../models/Batch");
const Student = require("../models/Student");
const ApiError = require("../utils/apiError");

const createBatch = async (data, userId) => {
  const existing = await Batch.findOne({ code: data.code });
  if (existing) throw new ApiError(400, "Batch code already exists");
  const batch = await Batch.create({ ...data, createdBy: userId });
  return batch;
};

const getBatches = async (filter = {}) => {
  const batches = await Batch.find({ isActive: true, ...filter })
    .populate("course", "name slug")
    .populate("assignedTeachers.teacher", "name")
    .populate("assignedTeachers.subject", "name")
    .sort({ createdAt: -1 });
  return batches;
};

const getBatchById = async (id) => {
  const batch = await Batch.findById(id)
    .populate("course", "name slug")
    .populate("assignedTeachers.teacher", "name email")
    .populate("assignedTeachers.subject", "name")
    .populate("students", "name email");
  if (!batch) throw new ApiError(404, "Batch not found");
  return batch;
};

const updateBatch = async (id, data) => {
  const batch = await Batch.findByIdAndUpdate(id, data, { new: true });
  if (!batch) throw new ApiError(404, "Batch not found");
  return batch;
};

const deleteBatch = async (id) => {
  const batch = await Batch.findByIdAndUpdate(id, { isActive: false });
  if (!batch) throw new ApiError(404, "Batch not found");
  await Student.updateMany({ batches: id }, { $pull: { batches: id } });
  return batch;
};

const addStudentsToBatch = async (batchId, studentUserIds) => {
  const batch = await Batch.findById(batchId);
  if (!batch) throw new ApiError(404, "Batch not found");
  batch.students = [...new Set([...batch.students.map(String), ...studentUserIds.map(String)])];
  await batch.save();
  await Student.updateMany(
    { user: { $in: studentUserIds } },
    { $addToSet: { batches: batchId } }
  );
  return batch;
};

const removeStudentFromBatch = async (batchId, studentUserId) => {
  await Batch.findByIdAndUpdate(batchId, { $pull: { students: studentUserId } });
  await Student.updateMany(
    { user: studentUserId },
    { $pull: { batches: batchId } }
  );
};

module.exports = {
  createBatch,
  getBatches,
  getBatchById,
  updateBatch,
  deleteBatch,
  addStudentsToBatch,
  removeStudentFromBatch,
};
```

---

# FILE: `server\src\services\cloudinary.service.js`

```javascript
const cloudinary = require("../config/cloudinary");

const uploadFile = (fileBuffer, folder, resourceType = "auto") => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: resourceType,
        ...(resourceType === "video" && {
          eager: [{ format: "mp4", quality: "auto" }],
          eager_async: true,
        }),
      },
      (error, result) => {
        if (error) {
          // Production behaviour: surface the real failure instead of a dummy preview.
          const message =
            error.message || "Cloudinary upload failed. Check storage credentials.";
          const err = new Error(message);
          err.statusCode = 502;
          return reject(err);
        }
        resolve({
          url: result.secure_url,
          publicId: result.public_id,
          size: result.bytes,
          format: result.format,
        });
      }
    );
    uploadStream.end(fileBuffer);
  });
};

const deleteFile = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId);
    return true;
  } catch (error) {
    return false;
  }
};

module.exports = { uploadFile, deleteFile };
```

---

# FILE: `server\src\services\course.service.js`

```javascript
const Course = require("../models/Course");
const Subject = require("../models/Subject");
const generateSlug = require("../utils/slug");
const ApiError = require("../utils/apiError");

const createCourse = async (data, userId) => {
  const slug = generateSlug(data.name);
  const existing = await Course.findOne({ slug });
  if (existing) throw new ApiError(400, "Course with this name already exists");
  const course = await Course.create({ ...data, slug, createdBy: userId });
  return course;
};

const getCourses = async (filter = {}) => {
  const courses = await Course.find({ isActive: true, ...filter })
    .populate("subjects", "name code")
    .sort({ displayOrder: 1 });
  return courses;
};

const getCourseById = async (id) => {
  const course = await Course.findById(id).populate("subjects");
  if (!course) throw new ApiError(404, "Course not found");
  return course;
};

const updateCourse = async (id, data) => {
  if (data.name) data.slug = generateSlug(data.name);
  const course = await Course.findByIdAndUpdate(id, data, { new: true });
  if (!course) throw new ApiError(404, "Course not found");
  return course;
};

const deleteCourse = async (id) => {
  await Course.findByIdAndUpdate(id, { isActive: false });
};

const addSubjectToCourse = async (courseId, subjectData) => {
  const subject = await Subject.create({ ...subjectData, course: courseId });
  await Course.findByIdAndUpdate(courseId, { $push: { subjects: subject._id } });
  return subject;
};

module.exports = {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  addSubjectToCourse,
};
```

---

# FILE: `server\src\services\dashboard.service.js`

```javascript
const Student = require("../models/Student");
const Teacher = require("../models/Teacher");
const Exam = require("../models/Exam");
const Attempt = require("../models/Attempt");
const Question = require("../models/Question");
const Course = require("../models/Course");
const Batch = require("../models/Batch");
const Material = require("../models/Material");
const Lecture = require("../models/Lecture");
const Enquiry = require("../models/Enquiry");
const Result = require("../models/Result");

const getAdminDashboard = async () => {
  const [
    studentCount,
    teacherCount,
    examCount,
    attemptCount,
    questionCount,
    courseCount,
    batchCount,
    materialCount,
    lectureCount,
    enquiryCount,
  ] = await Promise.all([
    Student.countDocuments({ isActive: true }),
    Teacher.countDocuments({ isActive: true }),
    Exam.countDocuments(),
    Attempt.countDocuments(),
    Question.countDocuments({ isActive: true }),
    Course.countDocuments({ isActive: true }),
    Batch.countDocuments({ isActive: true }),
    Material.countDocuments({ isActive: true }),
    Lecture.countDocuments({ isActive: true }),
    Enquiry.countDocuments({ status: "PENDING" }),
  ]);

  const recentAttempts = await Attempt.find()
    .populate("student", "name email")
    .populate("exam", "title testType")
    .sort({ createdAt: -1 })
    .limit(5);

  const recentStudents = await Student.find()
    .populate("user", "name email")
    .sort({ createdAt: -1 })
    .limit(5);

  return {
    studentCount,
    teacherCount,
    examCount,
    attemptCount,
    questionCount,
    courseCount,
    batchCount,
    materialCount,
    lectureCount,
    enquiryCount,
    recentAttempts,
    recentStudents,
  };
};

const getStudentDashboard = async (studentUserId) => {
  const { publishScheduledResults } = require("./exam.service");
  const ExamPermission = require("../models/ExamPermission");

  // Release any scheduled results whose time has come before reading.
  await publishScheduledResults().catch(() => {});
  const student = await Student.findOne({ user: studentUserId }).populate(
    "batches",
    "name code batchType startDate endDate schedule"
  );
  const batchIds = (student?.batches || []).map((b) => b._id || b);
  const perms = await ExamPermission.find({ student: studentUserId, isActive: true }).select("exam");
  const permittedExamIds = perms.map((p) => p.exam);

  // Only released exams for the student's batch (or permitted exams).
  const upcomingTests = await Exam.find({
    $or: [
      { batch: { $in: batchIds }, status: { $in: ["PUBLISHED", "LIVE"] } },
      { _id: { $in: permittedExamIds }, status: { $in: ["PUBLISHED", "LIVE"] } },
    ],
    endTime: { $gt: new Date() },
  })
    .limit(5)
    .select("title testType duration totalQuestions totalMarks startTime endTime batch");

  // Materials are batch-scoped (Batch = Course).
  const recentMaterials = await Material.find({
    isActive: true,
    ...(batchIds.length ? { batch: { $in: batchIds } } : {}),
  })
    .populate("subject", "name")
    .populate("unit", "name")
    .populate("chapter", "name")
    .sort({ createdAt: -1 })
    .limit(5);

  // Students only see released results.
  const recentResults = await Result.find({ student: studentUserId, isPublished: true })
    .populate("exam", "title testType")
    .sort({ createdAt: -1 })
    .limit(3);

  // Archived exams published for study.
  const studyPapers = await Exam.find({
    isArchived: true,
    studyVisible: true,
  })
    .limit(5)
    .select("title testType totalQuestions duration archivedAt");

  return { student, upcomingTests, recentMaterials, recentResults, studyPapers };
};

const getTeacherDashboard = async (teacherUserId) => {
  const teacher = await Teacher.findOne({ user: teacherUserId }).populate("subject", "name");

  // NOTE: there is no manual "question bank" for teachers — questions live inside exams.
  const [materialCount, lectureCount, examCount, archivedCount, batchCount] = await Promise.all([
    Material.countDocuments({ uploadedBy: teacherUserId, isActive: true }),
    Lecture.countDocuments({ teacher: teacherUserId, isActive: true }),
    Exam.countDocuments({ createdBy: teacherUserId, isArchived: { $ne: true } }),
    Exam.countDocuments({ createdBy: teacherUserId, isArchived: true }),
    Batch.countDocuments({ "assignedTeachers.teacher": teacherUserId, isActive: true }),
  ]);

  return { teacher, materialCount, lectureCount, examCount, archivedCount, batchCount };
};

module.exports = { getAdminDashboard, getStudentDashboard, getTeacherDashboard };
```

---

# FILE: `server\src\services\email.service.js`

```javascript
const nodemailer = require("nodemailer");

// In development without real SMTP credentials we spin up a throwaway
// Ethereal inbox so verification / reset links are actually deliverable
// and a preview URL is printed to the console.
let cachedDevTransporter = null;

const createTransporter = async () => {
  const hasRealCreds = process.env.SMTP_USER && process.env.SMTP_PASS;

  if (process.env.NODE_ENV === "production" || hasRealCreds) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  // Development with no credentials: use an ephemeral Ethereal test account.
  if (!cachedDevTransporter) {
    const testAccount = await nodemailer.createTestAccount();
    cachedDevTransporter = nodemailer.createTransport({
      host: testAccount.smtp.host,
      port: testAccount.smtp.port,
      secure: testAccount.smtp.secure,
      auth: { user: testAccount.user, pass: testAccount.pass },
    });
  }
  return cachedDevTransporter;
};

const logSendResult = (label, info) => {
  const preview = nodemailer.getTestMessageUrl(info);
  if (preview) {
    console.log(`📧 ${label} sent. Preview: ${preview}`);
  } else {
    console.log(`📧 ${label} sent to ${[].concat(info.accepted || []).join(", ") || "recipient"}`);
  }
};

const baseTemplate = (content) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>NEETVIDYA</title>
</head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#0f172a 0%,#1e3a1e 100%);padding:32px 40px;border-radius:16px 16px 0 0;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <div style="display:inline-flex;align-items:center;gap:12px;">
                      <div style="background:linear-gradient(135deg,#22c55e,#84cc16);width:44px;height:44px;border-radius:12px;display:inline-block;text-align:center;line-height:44px;font-weight:900;color:#0f172a;font-size:18px;">NV</div>
                      <span style="color:#ffffff;font-size:22px;font-weight:800;letter-spacing:-0.5px;margin-left:12px;">NEETVIDYA</span>
                    </div>
                    <p style="color:#94a3b8;font-size:12px;margin:8px 0 0;">Premier NEET Coaching Institute</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="background:#ffffff;padding:40px;border-radius:0 0 16px 16px;">
              ${content}
              <hr style="border:none;border-top:1px solid #e2e8f0;margin:32px 0;"/>
              <p style="color:#94a3b8;font-size:12px;text-align:center;margin:0;">
                This email was sent by NEETVIDYA. If you didn't request this, please ignore it.<br/>
                &copy; ${new Date().getFullYear()} NEETVIDYA. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

const sendVerificationEmail = async (user, verificationToken) => {
  const transporter = await createTransporter();
  const verifyUrl = `${process.env.CLIENT_URL || "http://localhost:5173"}/verify-email?token=${encodeURIComponent(verificationToken)}`;

  const content = `
    <h2 style="color:#0f172a;font-size:24px;font-weight:800;margin:0 0 8px;">Verify Your Email Address</h2>
    <p style="color:#475569;font-size:15px;margin:0 0 24px;">Hi <strong>${user.name}</strong>, welcome to NEETVIDYA! Please verify your email to activate your account.</p>
    <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:24px;margin:0 0 28px;">
      <p style="color:#64748b;font-size:13px;margin:0 0 16px;">Click the button below to verify your email address. This link expires in <strong>24 hours</strong>.</p>
      <a href="${verifyUrl}" style="display:inline-block;background:linear-gradient(135deg,#22c55e,#16a34a);color:#ffffff;text-decoration:none;padding:14px 32px;border-radius:8px;font-weight:700;font-size:15px;">
        ✓ Verify Email Address
      </a>
    </div>
    <p style="color:#94a3b8;font-size:12px;">Or copy and paste this link:<br/><span style="color:#22c55e;word-break:break-all;">${verifyUrl}</span></p>
  `;

  const mailOptions = {
    from: `"NEETVIDYA" <${process.env.SMTP_USER || "noreply@neetvidya.com"}>`,
    to: user.email,
    subject: "Verify your NEETVIDYA account",
    html: baseTemplate(content),
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    logSendResult("Verification email", info);
    return info;
  } catch (err) {
    console.error("Email send error:", err.message);
    // Don't throw - log and continue. Admin can resend.
  }
};

const sendPasswordResetEmail = async (user, resetToken) => {
  const transporter = await createTransporter();
  const resetUrl = `${process.env.CLIENT_URL || "http://localhost:5173"}/reset-password?token=${encodeURIComponent(resetToken)}`;

  const content = `
    <h2 style="color:#0f172a;font-size:24px;font-weight:800;margin:0 0 8px;">Reset Your Password</h2>
    <p style="color:#475569;font-size:15px;margin:0 0 24px;">Hi <strong>${user.name}</strong>, we received a request to reset your NEETVIDYA account password.</p>
    <div style="background:#fff7ed;border:1px solid #fed7aa;border-radius:12px;padding:24px;margin:0 0 28px;">
      <p style="color:#9a3412;font-size:13px;font-weight:600;margin:0 0 4px;">⚠️ Security Notice</p>
      <p style="color:#9a3412;font-size:13px;margin:0 0 16px;">This link expires in <strong>1 hour</strong>. If you didn't request this, your account is safe — just ignore this email.</p>
      <a href="${resetUrl}" style="display:inline-block;background:linear-gradient(135deg,#f97316,#ea580c);color:#ffffff;text-decoration:none;padding:14px 32px;border-radius:8px;font-weight:700;font-size:15px;">
        🔑 Reset Password
      </a>
    </div>
    <p style="color:#94a3b8;font-size:12px;">Or copy and paste this link:<br/><span style="color:#f97316;word-break:break-all;">${resetUrl}</span></p>
  `;

  const mailOptions = {
    from: `"NEETVIDYA Security" <${process.env.SMTP_USER || "noreply@neetvidya.com"}>`,
    to: user.email,
    subject: "Password Reset Request - NEETVIDYA",
    html: baseTemplate(content),
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    logSendResult("Password reset email", info);
    return info;
  } catch (err) {
    console.error("Email send error:", err.message);
  }
};

const sendWelcomeEmail = async (user, tempPassword = null) => {
  const transporter = await createTransporter();
  const loginUrl = `${process.env.CLIENT_URL || "http://localhost:5173"}/login`;

  const credSection = tempPassword
    ? `
    <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:12px;padding:20px;margin:0 0 24px;">
      <p style="color:#166534;font-size:13px;font-weight:600;margin:0 0 12px;">🎓 Your Login Credentials</p>
      <table cellpadding="0" cellspacing="0">
        <tr><td style="color:#4b5563;font-size:13px;padding:4px 0;min-width:100px;">Email</td><td style="color:#0f172a;font-size:13px;font-weight:600;">${user.email}</td></tr>
        <tr><td style="color:#4b5563;font-size:13px;padding:4px 0;">Password</td><td style="color:#0f172a;font-size:13px;font-weight:600;font-family:monospace;">${tempPassword}</td></tr>
      </table>
      <p style="color:#64748b;font-size:12px;margin:12px 0 0;">Please change your password after first login.</p>
    </div>
    `
    : "";

  const content = `
    <h2 style="color:#0f172a;font-size:24px;font-weight:800;margin:0 0 8px;">Welcome to NEETVIDYA! 🎉</h2>
    <p style="color:#475569;font-size:15px;margin:0 0 24px;">Hi <strong>${user.name}</strong>, your account has been successfully created. You're now part of the NEETVIDYA family!</p>
    ${credSection}
    <a href="${loginUrl}" style="display:inline-block;background:linear-gradient(135deg,#22c55e,#16a34a);color:#ffffff;text-decoration:none;padding:14px 32px;border-radius:8px;font-weight:700;font-size:15px;">
      → Login to Your Dashboard
    </a>
  `;

  const mailOptions = {
    from: `"NEETVIDYA" <${process.env.SMTP_USER || "noreply@neetvidya.com"}>`,
    to: user.email,
    subject: "Welcome to NEETVIDYA — Your Account is Ready",
    html: baseTemplate(content),
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    logSendResult("Welcome email", info);
  } catch (err) {
    console.error("Email send error:", err.message);
  }
};

module.exports = { sendVerificationEmail, sendPasswordResetEmail, sendWelcomeEmail };
```

---

# FILE: `server\src\services\evaluation.service.js`

```javascript
const Question = require("../models/Question");
const Result = require("../models/Result");
const Notification = require("../models/Notification");
const Exam = require("../models/Exam");
const ApiError = require("../utils/apiError");

const evaluateAttempt = async (attempt) => {
  if (attempt.status !== "IN_PROGRESS") {
    return await Result.findOne({ attempt: attempt._id });
  }

  let totalScore = 0;
  let correctCount = 0;
  let wrongCount = 0;
  let unattemptedCount = 0;

  const subjectMap = {};
  const chapterMap = {};

  for (const answer of attempt.answers) {
    const question = await Question.findById(answer.question);
    if (!question) continue;

    const subjId = question.subject ? question.subject.toString() : "general";
    const chapId = question.chapter ? question.chapter.toString() : "general";

    if (!subjectMap[subjId]) {
      subjectMap[subjId] = { subject: question.subject, correct: 0, wrong: 0, unattempted: 0, marks: 0 };
    }
    if (!chapterMap[chapId]) {
      chapterMap[chapId] = { chapter: question.chapter, correct: 0, wrong: 0, unattempted: 0 };
    }

    if (answer.selectedOption === null || answer.selectedOption === undefined || answer.selectedOption === -1) {
      unattemptedCount++;
      subjectMap[subjId].unattempted++;
      chapterMap[chapId].unattempted++;
    } else if (answer.selectedOption === question.correctAnswer) {
      correctCount++;
      totalScore += question.marks;
      subjectMap[subjId].correct++;
      subjectMap[subjId].marks += question.marks;
      chapterMap[chapId].correct++;
    } else {
      wrongCount++;
      totalScore -= question.negativeMarks;
      subjectMap[subjId].wrong++;
      subjectMap[subjId].marks -= question.negativeMarks;
      chapterMap[chapId].wrong++;
    }
  }

  const totalQuestions = attempt.answers.length;
  const accuracy = (correctCount + wrongCount) > 0 ? Math.round((correctCount / (correctCount + wrongCount)) * 100) : 0;
  const timeTaken = attempt.submittedAt
    ? Math.round((new Date(attempt.submittedAt) - new Date(attempt.startedAt)) / 1000)
    : 0;

  attempt.totalScore = totalScore;
  attempt.correctCount = correctCount;
  attempt.wrongCount = wrongCount;
  attempt.unattemptedCount = unattemptedCount;
  attempt.accuracy = accuracy;
  attempt.timeTaken = timeTaken;
  await attempt.save();

  const exam = await Exam.findById(attempt.exam);
  const totalMarks = exam ? exam.totalMarks : totalQuestions * 4;

  // Respect the exam's result publishing rule.
  // IMMEDIATE → result visible now. MANUAL / SCHEDULED → hidden until released.
  const publishNow = exam?.resultPublishMode === "IMMEDIATE";

  const result = await Result.create({
    attempt: attempt._id,
    exam: attempt.exam,
    student: attempt.student,
    totalMarks,
    obtainedMarks: totalScore,
    correctCount,
    wrongCount,
    unattemptedCount,
    accuracy,
    timeTaken,
    percentage: totalMarks > 0 ? Math.max(0, Math.round((totalScore / totalMarks) * 100)) : 0,
    subjectBreakdown: Object.values(subjectMap),
    chapterBreakdown: Object.values(chapterMap),
    isPublished: publishNow,
    publishedAt: publishNow ? new Date() : undefined,
  });

  await Notification.create({
    title: publishNow ? "Result Available" : "Exam Submitted",
    message: publishNow
      ? `Your result for "${exam ? exam.title : "Exam"}" is ready. Score: ${totalScore}/${totalMarks}`
      : `Your response for "${exam ? exam.title : "Exam"}" was submitted. Results will be published soon.`,
    type: "RESULT",
    targetStudents: [attempt.student],
  }).catch(() => {});

  return result;
};

module.exports = { evaluateAttempt };
```

---

# FILE: `server\src\services\exam.service.js`

```javascript
const Exam = require("../models/Exam");
const Attempt = require("../models/Attempt");
const Question = require("../models/Question");
const Result = require("../models/Result");
const ExamPermission = require("../models/ExamPermission");
const { shuffleArray, generateOptionOrder } = require("../utils/shuffle");
const ApiError = require("../utils/apiError");

/**
 * Batch = Course. Exams are batch-specific.
 * Question Bank = archive of finished exams (the exam paper IS the question set).
 */

// ── Access rule ───────────────────
// Draft/secret exams are NEVER visible to students.
// A student may access an exam only when it is released (PUBLISHED/LIVE)
// AND ( they belong to the exam's batch  OR  an active ExamPermission exists ).
const canAccessExam = async (user, exam) => {
  if (!user) return false;
  if (user.role === "admin" || user.role === "teacher") return true;
  if (!exam) return false;
  if (!["PUBLISHED", "LIVE"].includes(exam.status)) return false;

  const Student = require("../models/Student");
  const student = await Student.findOne({ user: user._id });
  const batchId = exam.batch?._id || exam.batch;
  if (student?.batches?.some((b) => b.toString() === batchId?.toString())) return true;

  const perm = await ExamPermission.findOne({
    student: user._id,
    exam: exam._id || exam.id,
    isActive: true,
  });
  return !!perm;
};

const assertExamAccess = async (user, exam) => {
  const allowed = await canAccessExam(user, exam);
  if (!allowed) throw new ApiError(403, "You do not have access to this exam");
};

// ── Create ─────────────────
const createExam = async (data, userId) => {
  const {
    questions = [],
    publishNow = false,
    resultPublishMode = "MANUAL",
    resultPublishAt,
    startTime,
    endTime,
    batch,
  } = data;

  if (!batch) throw new ApiError(400, "A batch must be selected for every exam");
  if (!questions || questions.length === 0) {
    throw new ApiError(400, "An exam must contain its own question set (add at least one question)");
  }
  if (startTime && endTime && new Date(startTime) >= new Date(endTime)) {
    throw new ApiError(400, "Exam end time must be after the start time");
  }
  if (resultPublishMode === "SCHEDULED" && !resultPublishAt) {
    throw new ApiError(400, "Scheduled result publishing requires a publish date/time");
  }

  const exam = await Exam.create({
    ...data,
    questions,
    totalQuestions: data.totalQuestions || questions.length,
    createdBy: userId,
    status: publishNow ? "LIVE" : "DRAFT",
    resultPublishMode,
    resultPublishAt: resultPublishAt || undefined,
    publishedAt: publishNow ? new Date() : undefined,
  });
  return exam;
};

// ── Read ─────────────────
const getExams = async (filter = {}, { page = 1, limit = 20 } = {}) => {
  const skip = (page - 1) * limit;
  const query = { ...filter };
  const [exams, total] = await Promise.all([
    Exam.find(query)
      .populate("course", "name")
      .populate("batch", "name code batchType")
      .populate("subjects", "name")
      .populate("testSeries", "title")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    Exam.countDocuments(query),
  ]);
  return { exams, total, page, limit, pages: Math.ceil(total / limit) || 1 };
};

// Exams visible to a specific student (batch + permissions + study archive)
const getStudentExams = async (user, { page = 1, limit = 20 } = {}) => {
  const Student = require("../models/Student");
  const student = await Student.findOne({ user: user._id });
  const batchIds = (student?.batches || []).map((b) => b.toString());

  const perms = await ExamPermission.find({ student: user._id, isActive: true }).select("exam");
  const permittedExamIds = perms.map((p) => p.exam);

  const filter = {
    $or: [
      { batch: { $in: batchIds }, status: { $in: ["PUBLISHED", "LIVE"] } },
      { _id: { $in: permittedExamIds }, status: { $in: ["PUBLISHED", "LIVE"] } },
      { status: { $in: ["CLOSED", "ARCHIVED"] }, isArchived: true, studyVisible: true },
    ],
  };

  const skip = (page - 1) * limit;
  const [exams, total] = await Promise.all([
    Exam.find(filter)
      .populate("batch", "name code")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    Exam.countDocuments(filter),
  ]);
  return { exams, total, page, limit, pages: Math.ceil(total / limit) || 1 };
};

const getExamById = async (id) => {
  const exam = await Exam.findById(id)
    .populate("course", "name")
    .populate("batch", "name code batchType")
    .populate("subjects", "name")
    .populate("permittedStudents", "name email");
  if (!exam) throw new ApiError(404, "Exam not found");
  return exam;
};

const updateExam = async (id, data) => {
  const exam = await Exam.findByIdAndUpdate(id, data, { new: true, runValidators: false });
  if (!exam) throw new ApiError(404, "Exam not found");
  return exam;
};

const publishExam = async (id) => {
  const exam = await Exam.findById(id);
  if (!exam) throw new ApiError(404, "Exam not found");
  if (!exam.questions || exam.questions.length === 0) {
    throw new ApiError(400, "Cannot publish an exam without a question set");
  }
  exam.status = "LIVE";
  exam.publishedAt = new Date();
  await exam.save();
  return exam;
};

// Close → archive into the Question Bank (the exam paper becomes reusable)
const closeExam = async (id) => {
  const exam = await Exam.findById(id);
  if (!exam) throw new ApiError(404, "Exam not found");
  exam.status = "CLOSED";
  exam.isArchived = true;
  exam.archivedAt = new Date();
  await exam.save();
  return exam;
};

const archiveExam = async (id) => {
  const exam = await Exam.findById(id);
  if (!exam) throw new ApiError(404, "Exam not found");
  exam.isArchived = true;
  exam.archivedAt = exam.archivedAt || new Date();
  if (exam.status !== "CLOSED") exam.status = "CLOSED";
  await exam.save();
  return exam;
};

const setStudyVisibility = async (id, visible) => {
  const exam = await Exam.findById(id);
  if (!exam) throw new ApiError(404, "Exam not found");
  exam.studyVisible = !!visible;
  if (visible && !exam.isArchived) {
    exam.isArchived = true;
    exam.archivedAt = new Date();
  }
  await exam.save();
  return exam;
};

// Reconduct: clone an archived exam into a fresh exam (own copy of questions)
const reconductExam = async (id, overrides = {}, userId) => {
  const source = await Exam.findById(id);
  if (!source) throw new ApiError(404, "Exam not found");
  const now = new Date();
  const clone = await Exam.create({
    title: overrides.title || `${source.title} (Reconduct)`,
    description: source.description,
    testType: source.testType,
    batch: overrides.batch || source.batch,
    questions: source.questions,
    subjects: source.subjects,
    totalQuestions: source.totalQuestions,
    totalMarks: source.totalMarks,
    marksPerCorrect: source.marksPerCorrect,
    negativePerWrong: source.negativePerWrong,
    duration: source.duration,
    startTime: overrides.startTime ? new Date(overrides.startTime) : now,
    endTime: overrides.endTime
      ? new Date(overrides.endTime)
      : new Date(now.getTime() + 60 * 60 * 1000),
    maxAttempts: source.maxAttempts,
    randomizeQuestions: source.randomizeQuestions,
    randomizeOptions: source.randomizeOptions,
    instructions: source.instructions,
    resultPublishMode: source.resultPublishMode,
    createdBy: userId,
    status: "DRAFT",
    reconductedFrom: source._id,
  });
  return clone;
};

// Downloadable exam pack (JSON)
const buildExamPack = async (id) => {
  const exam = await Exam.findById(id).populate("batch", "name code");
  if (!exam) throw new ApiError(404, "Exam not found");
  const questions = await Question.find({ _id: { $in: exam.questions }});
  return {
    title: exam.title,
    testType: exam.testType,
    batch: exam.batch?.name || null,
    totalMarks: exam.totalMarks,
    marksPerCorrect: exam.marksPerCorrect,
    negativePerWrong: exam.negativePerWrong,
    duration: exam.duration,
    questions: questions.map((q) => ({
      questionText: q.questionText,
      questionImageUrl: q.questionImageUrl || null,
      options: q.options.map((o) => ({ text: o.text, imageUrl: o.imageUrl || null })),
      correctAnswer: q.correctAnswer,
      explanation: q.explanation || null,
      marks: q.marks,
      negativeMarks: q.negativeMarks,
      difficulty: q.difficulty,
    })),
  };
};

// ── Question Bank (archive of finished exams) ─────────
const getQuestionBank = async ({ page = 1, limit = 20, search = "" } = {}) => {
  const filter = { isArchived: true };
  if (search) filter.title = { $regex: search, $options: "i" };
  const skip = (page - 1) * limit;
  const [exams, total] = await Promise.all([
    Exam.find(filter)
      .populate("batch", "name code")
      .populate("createdBy", "name")
      .sort({ archivedAt: -1, createdAt: -1 })
      .skip(skip)
      .limit(limit),
    Exam.countDocuments(filter),
  ]);
  return { exams, total, page, limit, pages: Math.ceil(total / limit) || 1 };
};

// ── Results publishing ────────────
const publishResults = async (id, { publish = true } = {}) => {
  const exam = await Exam.findById(id);
  if (!exam) throw new ApiError(404, "Exam not found");
  exam.resultsPublished = publish;
  exam.resultsPublishedAt = publish ? new Date() : undefined;
  await exam.save();
  await Result.updateMany(
    { exam: id },
    { isPublished: publish, publishedAt: publish ? new Date() : undefined }
  );
  return exam;
};

// Called on each read/tick — releases SCHEDULED results whose time has come.
const publishScheduledResults = async () => {
  const now = new Date();
  const due = await Exam.find({
    resultPublishMode: "SCHEDULED",
    resultsPublished: false,
    resultPublishAt: { $lte: now },
  });
  for (const exam of due) {
    exam.resultsPublished = true;
    exam.resultsPublishedAt = now;
    await exam.save();
    await Result.updateMany({ exam: exam._id }, { isPublished: true, publishedAt: now });
  }
  return due.length;
};

// ── Exam permissions (outsider exam-only students) ────────
const grantExamPermission = async ({ studentId, examId, reason }, grantedBy) => {
  const Student = require("../models/Student");
  const perm = await ExamPermission.findOneAndUpdate(
    { student: studentId, exam: examId },
    { student: studentId, exam: examId, reason, grantedBy, isActive: true },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  );
  await Student.findOneAndUpdate(
    { user: studentId },
    { $addToSet: { examPermissions: examId } }
  );
  return perm;
};

const revokeExamPermission = async ({ studentId, examId }) => {
  const Student = require("../models/Student");
  await ExamPermission.findOneAndUpdate(
    { student: studentId, exam: examId },
    { isActive: false }
  );
  await Student.findOneAndUpdate({ user: studentId }, { $pull: { examPermissions: examId }});
  return { revoked: true };
};

const listExamPermissions = async (examId) => {
  return ExamPermission.find({ exam: examId, isActive: true }).populate(
    "student",
    "name email"
  );
};

const startAttempt = async (examId, studentId) => {
  const exam = await Exam.findById(examId);
  if (!exam) throw new ApiError(404, "Exam not found");
  if (exam.status !== "LIVE") throw new ApiError(400, "Exam is not live");

  const now = new Date();
  if (now < exam.startTime) throw new ApiError(400, "Exam has not started yet");
  if (now > exam.endTime) throw new ApiError(400, "Exam has ended");

  const existingInProgress = await Attempt.findOne({
    exam: examId,
    student: studentId,
    status: "IN_PROGRESS",
  });
  if (existingInProgress) {
    return { resumed: true, attempt: existingInProgress };
  }

  const completedAttempts = await Attempt.countDocuments({
    exam: examId,
    student: studentId,
    status: { $in: ["SUBMITTED", "AUTO_SUBMITTED"] },
  });
  if (completedAttempts >= (exam.maxAttempts || 1)) {
    throw new ApiError(400, "Maximum attempts reached");
  }

  // Only the exam's own question set — no random bank selection
  const ownQuestions = await Question.find({
    _id: { $in: exam.questions || [] },
    isActive: true,
  });
  if (ownQuestions.length === 0) {
    throw new ApiError(400, "This exam has no questions configured");
  }
  const questions = ownQuestions;

  let questionOrder = questions.map((q) => q._id);
  if (exam.randomizeQuestions) {
    questionOrder = shuffleArray(questionOrder);
  }

  const optionOrders = questionOrder.map(() =>
    exam.randomizeOptions ? generateOptionOrder(4) : [0, 1, 2, 3]
  );

  const serverEndTime = new Date(now.getTime() + (exam.duration || 60) * 60 * 1000);

  const answers = questionOrder.map((qId) => ({
    question: qId,
    selectedOption: null,
    markedForReview: false,
    timeSpent: 0,
  }));

  const attempt = await Attempt.create({
    exam: examId,
    student: studentId,
    startedAt: now,
    serverEndTime,
    status: "IN_PROGRESS",
    answers,
    questionOrder,
    optionOrders,
  });

  const questionsData = questionOrder.map((qId) => {
    const q = questions.find((qq) => qq._id.toString() === qId.toString());
    if (!q) return null;
    return {
      _id: q._id,
      questionText: q.questionText,
      questionImageUrl: q.questionImageUrl,
      options: q.options,
      marks: q.marks,
      negativeMarks: q.negativeMarks,
      difficulty: q.difficulty,
      subject: q.subject,
      chapter: q.chapter,
    };
  }).filter(Boolean);

  return {
    resumed: false,
    attemptId: attempt._id,
    serverEndTime,
    duration: exam.duration,
    totalQuestions: questionOrder.length,
    totalMarks: exam.totalMarks,
    marksPerCorrect: exam.marksPerCorrect,
    negativePerWrong: exam.negativePerWrong,
    instructions: exam.instructions,
    questions: questionsData,
    optionOrders,
    answers,
  };
};

module.exports = {
  canAccessExam,
  assertExamAccess,
  createExam,
  getExams,
  getStudentExams,
  getExamById,
  updateExam,
  publishExam,
  closeExam,
  archiveExam,
  setStudyVisibility,
  reconductExam,
  buildExamPack,
  getQuestionBank,
  publishResults,
  publishScheduledResults,
  grantExamPermission,
  revokeExamPermission,
  listExamPermissions,
  startAttempt,
};
```

---

# FILE: `server\src\services\notification.service.js`

```javascript
const Notification = require("../models/Notification");

const createNotification = async (data) => {
  return await Notification.create(data);
};

const getNotificationsForUser = async (userId, userRole) => {
  return await Notification.find({
    $or: [
      { targetRole: "all" },
      { targetRole: userRole },
      { targetStudents: userId },
    ],
    isActive: true,
  })
    .sort({ createdAt: -1 })
    .limit(30);
};

const getUnreadCount = async (userId, userRole) => {
  return await Notification.countDocuments({
    $or: [
      { targetRole: "all" },
      { targetRole: userRole },
      { targetStudents: userId },
    ],
    isActive: true,
    readBy: { $ne: userId },
  });
};

const markAsRead = async (notificationId, userId) => {
  await Notification.findByIdAndUpdate(notificationId, {
    $addToSet: { readBy: userId },
  });
};

const markAllAsRead = async (userId, userRole) => {
  await Notification.updateMany(
    {
      $or: [{ targetRole: "all" }, { targetRole: userRole }],
      isActive: true,
    },
    { $addToSet: { readBy: userId } }
  );
};

module.exports = {
  createNotification,
  getNotificationsForUser,
  getUnreadCount,
  markAsRead,
  markAllAsRead,
};
```

---

# FILE: `server\src\services\question.service.js`

```javascript
const Question = require("../models/Question");
const ApiError = require("../utils/apiError");

const createQuestion = async (data, userId) => {
  if (!data.questionText || !data.options || data.options.length < 4) {
    throw new ApiError(400, "Question text and 4 options are required");
  }
  if (data.correctAnswer === undefined || data.correctAnswer < 0 || data.correctAnswer > 3) {
    throw new ApiError(400, "Valid correct answer index (0-3) is required");
  }
  const question = await Question.create({ ...data, createdBy: userId });
  return question;
};

const getQuestions = async (filter = {}, page = 1, limit = 20) => {
  const skip = (page - 1) * limit;
  const questions = await Question.find({ isActive: true, ...filter })
    .populate("subject", "name code")
    .populate("chapter", "name")
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });
  const total = await Question.countDocuments({ isActive: true, ...filter });
  return { questions, total, page, limit, pages: Math.ceil(total / limit) };
};

const updateQuestion = async (id, data) => {
  const question = await Question.findByIdAndUpdate(id, data, { new: true });
  if (!question) throw new ApiError(404, "Question not found");
  return question;
};

const deleteQuestion = async (id) => {
  await Question.findByIdAndUpdate(id, { isActive: false });
};

const addExplanation = async (id, explanation) => {
  const question = await Question.findByIdAndUpdate(
    id,
    { explanation },
    { new: true }
  );
  if (!question) throw new ApiError(404, "Question not found");
  return question;
};

const bulkImport = async (questions, userId) => {
  const valid = questions.filter(
    (q) => q.questionText && q.options?.length >= 4 && q.correctAnswer !== undefined
  );
  if (valid.length === 0) throw new ApiError(400, "No valid questions in payload");
  const created = await Question.insertMany(
    valid.map((q) => ({ ...q, createdBy: userId }))
  );
  return { imported: created.length, total: questions.length, skipped: questions.length - valid.length };
};

const getRandomQuestions = async (filter = {}, count = 10) => {
  const questions = await Question.aggregate([
    { $match: { isActive: true, ...filter } },
    { $sample: { size: count } },
  ]);
  return questions;
};

module.exports = {
  createQuestion,
  getQuestions,
  updateQuestion,
  deleteQuestion,
  addExplanation,
  bulkImport,
  getRandomQuestions,
};
```

---

# FILE: `server\src\services\website.service.js`

```javascript
const WebsiteContent = require("../models/WebsiteContent");
const Course = require("../models/Course");
const Teacher = require("../models/Teacher");
const Testimonial = require("../models/Testimonial");
const Achievement = require("../models/Achievement");

const getHomepageData = async () => {
  const [hero, about, methodology, announcementBar, courses, teachers, testimonials, achievements] =
    await Promise.all([
      WebsiteContent.findOne({ section: "HERO" }),
      WebsiteContent.findOne({ section: "ABOUT" }),
      WebsiteContent.findOne({ section: "METHODOLOGY" }),
      WebsiteContent.findOne({ section: "ANNOUNCEMENT_BAR" }),
      Course.find({ isActive: true }).sort({ displayOrder: 1 }).limit(6),
      Teacher.find({ isActive: true }).populate("user", "name avatar").populate("subject", "name"),
      Testimonial.find({ isActive: true }).sort({ displayOrder: 1 }),
      Achievement.find({ isActive: true, featured: true }).sort({ displayOrder: 1 }),
    ]);

  return {
    hero,
    about,
    methodology,
    announcementBar: announcementBar?.announcementBar || null,
    courses,
    teachers,
    testimonials,
    achievements,
  };
};

const getSection = async (sectionName) => {
  return await WebsiteContent.findOne({ section: sectionName });
};

const updateSection = async (sectionName, data) => {
  return await WebsiteContent.findOneAndUpdate(
    { section: sectionName },
    { $set: data },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  );
};

module.exports = { getHomepageData, getSection, updateSection };
```

---

# FILE: `server\src\utils\apiError.js`

```javascript
class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ApiError;
```

---

# FILE: `server\src\utils\apiResponse.js`

```javascript
const apiResponse = (res, statusCode, message, data = null) => {
  const response = { success: statusCode < 400, message };
  if (data !== null) response.data = data;
  return res.status(statusCode).json(response);
};

module.exports = apiResponse;
```

---

# FILE: `server\src\utils\generatePassword.js`

```javascript
const generatePassword = (length = 10) => {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789";
  let password = "";
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
};

module.exports = generatePassword;
```

---

# FILE: `server\src\utils\imageResize.js`

```javascript
const imageResize = (base64String, maxSize = 120) => {
  if (!base64String || !base64String.startsWith("data:image/")) {
    return null;
  }
  const sizeInBytes = Math.round((base64String.length * 3) / 4);
  if (sizeInBytes > 200 * 1024) {
    return null;
  }
  return base64String;
};

module.exports = imageResize;
```

---

# FILE: `server\src\utils\jwt.js`

```javascript
const jwt = require("jsonwebtoken");

const generateAccessToken = (userId, role) => {
  return jwt.sign({ id: userId, role }, process.env.JWT_SECRET || "neetvidya_jwt_super_secret_key_2026_dev", {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
};

const generateRefreshToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_REFRESH_SECRET || "neetvidya_refresh_super_secret_key_2026_dev", {
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "30d",
  });
};

const verifyAccessToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET || "neetvidya_jwt_super_secret_key_2026_dev");
};

const verifyRefreshToken = (token) => {
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET || "neetvidya_refresh_super_secret_key_2026_dev");
};

module.exports = { generateAccessToken, generateRefreshToken, verifyAccessToken, verifyRefreshToken };
```

---

# FILE: `server\src\utils\pagination.js`

```javascript
const getPagination = (query) => {
  const page = Math.max(1, parseInt(query.page) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(query.limit) || 20));
  const skip = (page - 1) * limit;
  return { page, limit, skip };
};

const buildPaginationMeta = (total, page, limit) => {
  return {
    total,
    page,
    limit,
    pages: Math.ceil(total / limit),
    hasNext: page * limit < total,
    hasPrev: page > 1,
  };
};

module.exports = { getPagination, buildPaginationMeta };
```

---

# FILE: `server\src\utils\shuffle.js`

```javascript
const shuffleArray = (arr) => {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const generateOptionOrder = (count = 4) => {
  const indices = Array.from({ length: count }, (_, i) => i);
  return shuffleArray(indices);
};

module.exports = { shuffleArray, generateOptionOrder };
```

---

# FILE: `server\src\utils\slug.js`

```javascript
const generateSlug = (text) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

module.exports = generateSlug;
```

---

