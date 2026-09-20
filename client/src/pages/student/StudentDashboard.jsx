import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  BookOpen,
  ClipboardList,
  FileText,
  TrendingUp,
  ArrowRight,
  GraduationCap,
  ExternalLink,
  Sparkles,
  Users,
} from "lucide-react";
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
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-11 w-11 animate-spin rounded-full border-4 border-brand-green/20 border-t-brand-green" />
          <p className="text-xs font-semibold text-slate-400">
            Loading your dashboard...
          </p>
        </div>
      </div>
    );
  }

  const batch = student?.batches?.[0];

  // Flatten groups from every batch the student belongs to.
  const batchGroups = (student?.batches || []).flatMap(
    (b) => b.groups || []
  );

  const studentType =
    student?.studentType === "REGULAR_ONLINE"
      ? "ONLINE"
      : student?.studentType === "HYBRID"
        ? "HYBRID"
        : "OFFLINE";

  const stats = [
    {
      icon: BookOpen,
      label: "My Batch",
      value: batch?.name || "Not Assigned",
      color: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-100",
    },
    {
      icon: ClipboardList,
      label: "Live Tests",
      value: `${dashboardData?.upcomingTests?.length || 0} Available`,
      color: "text-orange-600",
      bg: "bg-orange-50",
      border: "border-orange-100",
    },
    {
      icon: FileText,
      label: "Study Materials",
      value: `${dashboardData?.recentMaterials?.length || 0} New`,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      border: "border-emerald-100",
    },
    {
      icon: TrendingUp,
      label: "Tests Taken",
      value: `${dashboardData?.recentResults?.length || 0}`,
      color: "text-purple-600",
      bg: "bg-purple-50",
      border: "border-purple-100",
    },
  ];

  return (
    <div className="relative min-h-full overflow-hidden bg-brand-soft">
      {/* Decorative background */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-green-200/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-emerald-100/40 blur-3xl" />

      <div className="relative space-y-5 p-3 sm:space-y-6 sm:p-5 lg:space-y-7 lg:p-7">
        {/* Batch Banner */}
        <section className="relative overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-brand-green via-brand-green to-brand-lime p-5 text-brand-black shadow-xl shadow-green-900/10 sm:p-6 lg:p-7">
          <div className="pointer-events-none absolute -right-12 -top-16 h-48 w-48 rounded-full bg-white/15 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-20 right-24 h-40 w-40 rounded-full bg-white/10 blur-2xl" />

          <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-center gap-3.5 sm:gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/75 shadow-sm sm:h-14 sm:w-14">
                <GraduationCap className="h-6 w-6 text-brand-green sm:h-7 sm:w-7" />
              </div>

              <div className="min-w-0">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] opacity-65">
                  Your Batch / Course
                </p>

                <p className="mt-1 truncate font-heading text-lg font-extrabold leading-tight sm:text-xl">
                  {batch?.name || "No batch assigned"}
                </p>

                {batch?.code && (
                  <p className="mt-1 text-[11px] font-semibold opacity-65">
                    {batch.code}
                  </p>
                )}
              </div>
            </div>

            <div className="shrink-0">
              <StudentBadge batchType={studentType} />
            </div>
          </div>
        </section>

        {/* Batch Groups / Community Links (per-batch, admin-managed) */}
        {batchGroups.length > 0 && (
          <section className="overflow-hidden rounded-[1.75rem] border-slate-200/80 bg-white p-5 shadow-sm shadow-slate-900/5 sm:p-6">
            <div className="mb-4 flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
                <Users className="h-4 w-4" />
              </div>
              <div>
                <h2 className="font-heading text-base font-extrabold text-brand-dark sm:text-lg">
                  Your Batch Groups
                </h2>
                <p className="mt-0.5 text-[11px] text-slate-400">
                  Doubt, help and community groups for your batch
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {batchGroups.map((g, i) => (
                <a
                  key={i}
                  href={g.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-3 rounded-2xl border-slate-200 bg-slate-50/70 p-3.5 transition hover:border-sky-200 hover:bg-sky-50/60"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-sky-600 shadow-sm">
                    <Users className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-extrabold text-slate-800">
                      {g.label}
                    </p>
                    <p className="mt-0.5 truncate text-[11px] text-slate-400">
                      {g.description || g.type}
                    </p>
                  </div>
                  <ExternalLink className="h-4 w-4 shrink-0 text-slate-300 transition group-hover:text-sky-500" />
                </a>
              ))}
            </div>
          </section>
        )}

        {/* Welcome Header */}
        <section className="overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white p-5 shadow-sm shadow-slate-900/5 sm:p-6 lg:p-7">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="min-w-0">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-green-100 bg-green-50 px-3 py-1.5 text-[9px] font-extrabold uppercase tracking-[0.15em] text-brand-green">
                <Sparkles className="h-3 w-3" />
                Student Dashboard
              </div>

              <h1 className="font-heading text-2xl font-extrabold tracking-tight text-brand-dark sm:text-3xl">
                Hello, {student?.user?.name || "Aspirant"}!
              </h1>

              <p className="mt-1.5 text-xs leading-5 text-slate-500 sm:text-sm">
                Ready for today's practice?
              </p>

              <div className="mt-4 flex min-w-0 flex-wrap items-center gap-2.5">
                <StudentBadge batchType={studentType} />

                {batch && (
                  <span className="max-w-full truncate rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[10px] font-semibold text-slate-500">
                    Batch: {batch.name}
                  </span>
                )}
              </div>
            </div>

            <div className="flex w-full flex-col gap-2.5 sm:flex-row sm:flex-wrap lg:w-auto lg:justify-end">
              <TelegramLink
                url={settings.telegramChannelLink}
                label="Doubt Desk"
                className="inline-flex min-h-11 w-full items-center justify-center rounded-xl border border-sky-200 bg-sky-50 px-4 py-2.5 text-xs font-semibold text-sky-700 transition hover:border-sky-300 hover:bg-sky-100 sm:w-auto"
              />

              <Link
                to="/student/tests"
                className="btn-primary inline-flex min-h-11 w-full items-center justify-center gap-2 text-xs !px-4 !py-2.5 sm:w-auto"
              >
                Start Live Exam
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* KPI Cards */}
        <section className="grid min-w-0 grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
          {stats.map((stat, i) => {
            const Icon = stat.icon;

            return (
              <div
                key={i}
                className="group min-w-0 overflow-hidden rounded-[1.5rem] border border-slate-200/80 bg-white p-4 shadow-sm shadow-slate-900/5 transition duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-900/5 sm:p-5"
              >
                <div className="flex min-w-0 items-center gap-3 sm:gap-3.5">
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${stat.bg} ${stat.color} ${stat.border}`}
                  >
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[9px] font-extrabold uppercase tracking-wider text-slate-400 sm:text-[10px]">
                      {stat.label}
                    </p>

                    <p className="mt-1 truncate font-heading text-sm font-extrabold text-brand-dark sm:text-base">
                      {stat.value}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </section>

        {/* Main Dashboard Content */}
        <div className="grid min-w-0 gap-5 lg:grid-cols-2 lg:gap-6">
          {/* Live Tests */}
          <section className="min-w-0 overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white p-4 shadow-sm shadow-slate-900/5 sm:p-5 lg:p-6">
            <div className="flex min-w-0 items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div className="flex min-w-0 items-center gap-2.5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-green-50 text-brand-green">
                  <ClipboardList className="h-4.5 w-4.5" />
                </div>

                <div className="min-w-0">
                  <h3 className="truncate font-heading text-base font-extrabold text-brand-dark sm:text-lg">
                    Live Tests
                  </h3>
                  <p className="mt-0.5 text-[10px] text-slate-400">
                    Upcoming examinations
                  </p>
                </div>
              </div>

              <Link
                to="/student/tests"
                className="shrink-0 text-[11px] font-bold text-brand-green transition hover:text-green-700 hover:underline"
              >
                View All
              </Link>
            </div>

            {dashboardData?.upcomingTests?.length > 0 ? (
              <div className="mt-4 space-y-3">
                {dashboardData.upcomingTests.map((test) => (
                  <div
                    key={test._id}
                    className="min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-brand-soft p-3.5 transition duration-300 hover:border-green-200 hover:bg-green-50/40 sm:p-4"
                  >
                    <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div className="min-w-0">
                        <span className="inline-flex max-w-full rounded-full border border-emerald-100 bg-emerald-100 px-2 py-1 text-[9px] font-extrabold uppercase tracking-wide text-emerald-800">
                          <span className="truncate">{test.testType}</span>
                        </span>

                        <h4 className="mt-2 break-words font-heading text-sm font-extrabold leading-5 text-brand-dark">
                          {test.title}
                        </h4>

                        <p className="mt-1 text-[11px] font-medium text-slate-500">
                          {test.totalQuestions} Questions
                          <span className="mx-1.5 text-slate-300">•</span>
                          {test.duration} Min
                        </p>
                      </div>

                      <Link
                        to={`/exam/${test._id}/instructions`}
                        className="inline-flex min-h-10 w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-brand-green px-4 py-2 text-[11px] font-bold text-white shadow-sm transition hover:bg-green-700 sm:w-auto"
                      >
                        Take Test
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex min-h-40 flex-col items-center justify-center px-4 text-center">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-50 text-slate-300">
                  <ClipboardList className="h-5 w-5" />
                </div>

                <p className="mt-3 text-sm font-semibold text-slate-400">
                  No live tests available right now.
                </p>
              </div>
            )}
          </section>

          {/* Recent Materials */}
          <section className="min-w-0 overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white p-4 shadow-sm shadow-slate-900/5 sm:p-5 lg:p-6">
            <div className="flex min-w-0 items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div className="flex min-w-0 items-center gap-2.5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <BookOpen className="h-4.5 w-4.5" />
                </div>

                <div className="min-w-0">
                  <h3 className="truncate font-heading text-base font-extrabold text-brand-dark sm:text-lg">
                    Recent Materials
                  </h3>
                  <p className="mt-0.5 text-[10px] text-slate-400">
                    Your latest study resources
                  </p>
                </div>
              </div>

              <Link
                to="/student/learn"
                className="shrink-0 text-[11px] font-bold text-brand-green transition hover:text-green-700 hover:underline"
              >
                Go to Learn
              </Link>
            </div>

            {dashboardData?.recentMaterials?.length > 0 ? (
              <div className="mt-4 space-y-3">
                {dashboardData.recentMaterials.map((mat) => (
                  <div
                    key={mat._id}
                    className="min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-brand-soft p-3.5 transition duration-300 hover:border-emerald-200 hover:bg-emerald-50/40"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-emerald-100 bg-emerald-100 px-1.5 text-[9px] font-extrabold uppercase text-emerald-700">
                        <span className="max-w-full truncate">
                          {mat.fileType || "PDF"}
                        </span>
                      </div>

                      <div className="min-w-0 flex-1">
                        <h5 className="truncate text-xs font-extrabold text-brand-dark">
                          {mat.title}
                        </h5>

                        <span className="mt-1 block truncate text-[10px] font-medium text-slate-500">
                          {mat.subject?.name || "General"}
                        </span>
                      </div>

                      <a
                        href={mat.fileUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-green-100 bg-white text-brand-green transition hover:border-green-200 hover:bg-green-50"
                        aria-label={`Open ${mat.title}`}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex min-h-40 flex-col items-center justify-center px-4 text-center">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-50 text-slate-300">
                  <BookOpen className="h-5 w-5" />
                </div>

                <p className="mt-3 text-sm font-semibold text-slate-400">
                  No materials uploaded yet.
                </p>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}