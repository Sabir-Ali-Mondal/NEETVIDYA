import { Routes, Route } from "react-router-dom";
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
import TeacherQuestions from "./pages/teacher/TeacherQuestions";
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
        <Route path="questions" element={<TeacherQuestions />} />
        <Route path="exams" element={<TeacherExams />} />
        <Route path="performance" element={<TeacherPerformance />} />
      </Route>

      {/* ── Admin Panel ────────────────────────────────────────── */}
      <Route path="/admin" element={<ProtectedRoute role="admin"><AdminLayout /></ProtectedRoute>}>
        <Route index element={<AdminDashboard />} />
        <Route path="students" element={<AdminStudents />} />
        <Route path="teachers" element={<AdminTeachers />} />
        <Route path="batches" element={<AdminBatches />} />
        <Route path="courses" element={<AdminCourses />} />
        <Route path="questions" element={<AdminQuestions />} />
        <Route path="exams" element={<AdminExams />} />
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
