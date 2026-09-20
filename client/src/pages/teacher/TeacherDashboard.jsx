import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../config/api";
import {
  ClipboardList,
  FileText,
  Archive,
  UsersRound,
  GraduationCap,
  ChevronRight,
  BookOpen,
  Layers,
  Sparkles,
  CalendarDays,
  Upload,
  BarChart3,
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
      api
        .get("/batches")
        .then(({ data }) => setBatches(data.data?.batches || [])),
    ])
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

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

  const workflowSteps = [
    {
      icon: ClipboardList,
      t: "Create Exam",
      d: "Pick a batch (mandatory) and set the schedule, marks and duration.",
    },
    {
      icon: Upload,
      t: "Add Questions",
      d: "Author questions in the UI or import a CSV — each question belongs to that exam only.",
    },
    {
      icon: CalendarDays,
      t: "Conduct & Close",
      d: "Publish for the batch, then close it when the examination window ends.",
    },
    {
      icon: Archive,
      t: "Archive",
      d: "Closed exams land in the Question Bank for reconduct, study, or download.",
    },
  ];

  return (
    <div className="relative min-h-full overflow-hidden bg-brand-soft">
      {/* Decorative background */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-green-200/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-emerald-100/40 blur-3xl" />

      <div className="relative space-y-5 p-3 sm:space-y-6 sm:p-5 lg:space-y-7 lg:p-7">
        {/* Header */}
        <section className="overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white p-5 shadow-sm shadow-slate-900/5 sm:p-6 lg:p-7">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="min-w-0">
              <div className="mb-3 flex flex-wrap items-center gap-2 text-[10px] font-bold text-slate-500">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-green-100 bg-green-50 px-3 py-1.5 uppercase tracking-[0.14em] text-brand-green">
                  <GraduationCap className="h-3.5 w-3.5" />
                  Faculty Workspace
                </span>

                {teacher?.subjectName && (
                  <span className="inline-flex max-w-full items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 font-semibold text-slate-600">
                    <span className="truncate">{teacher.subjectName}</span>
                  </span>
                )}
              </div>

              <h1 className="font-heading text-2xl font-extrabold tracking-tight text-brand-dark sm:text-3xl">
                Welcome back
                {teacher?.user?.name
                  ? `, ${teacher.user.name.split(" ")[0]}`
                  : ""}
              </h1>

              <p className="mt-2 max-w-2xl text-xs leading-5 text-slate-500 sm:text-sm">
                Build unique exams with their own questions, publish study
                materials, and review student performance.
              </p>
            </div>

            <button
              onClick={() => navigate("/teacher/exams")}
              className="inline-flex min-h-11 w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-brand-green px-5 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-green-700 active:scale-[0.98] sm:w-auto"
            >
              <ClipboardList className="h-4 w-4" />
              Manage Exams
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </section>

        {/* KPI Cards */}
        <section className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-5">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse rounded-[1.5rem] border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6"
                >
                  <div className="mb-5 h-11 w-11 rounded-xl bg-slate-100" />
                  <div className="mb-3 h-3 w-24 rounded bg-slate-100" />
                  <div className="h-8 w-16 rounded bg-slate-100" />
                </div>
              ))
            : statCards.map((s) => {
                const Icon = s.icon;

                return (
                  <button
                    key={s.label}
                    type="button"
                    onClick={() => navigate(s.path)}
                    className="group min-w-0 overflow-hidden rounded-[1.5rem] border border-slate-200/80 bg-white p-5 text-left shadow-sm shadow-slate-900/5 transition duration-300 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-lg hover:shadow-slate-900/5 active:scale-[0.99] sm:p-6"
                  >
                    <div className="mb-5 flex items-center justify-between gap-3">
                      <div
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${s.bg} ${s.border}`}
                      >
                        <Icon className={`h-5 w-5 ${s.color}`} />
                      </div>

                      <ChevronRight className="h-4 w-4 shrink-0 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-slate-500" />
                    </div>

                    <div className="font-heading text-3xl font-extrabold tracking-tight text-slate-900">
                      {s.value}
                    </div>

                    <div className="mt-1 text-[10px] font-extrabold uppercase tracking-[0.12em] text-slate-400">
                      {s.label}
                    </div>
                  </button>
                );
              })}
        </section>

        {/* How Exams Work */}
        <section className="overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white shadow-sm shadow-slate-900/5">
          <div className="border-b border-slate-100 p-5 sm:p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-50 text-brand-green">
                <Layers className="h-5 w-5" />
              </div>

              <div className="min-w-0">
                <h2 className="font-heading text-lg font-extrabold text-slate-900">
                  How exams work
                </h2>
                <p className="mt-0.5 text-[10px] text-slate-400">
                  From creation to archived study material
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-3 p-4 sm:grid-cols-2 sm:p-5 lg:grid-cols-4 lg:gap-4">
            {workflowSteps.map((step, i) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.t}
                  className="group min-w-0 rounded-2xl border border-slate-200 bg-slate-50/70 p-4 transition duration-300 hover:border-green-200 hover:bg-green-50/40"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-100 text-green-700">
                      <Icon className="h-4 w-4" />
                    </div>

                    <span className="text-[10px] font-extrabold text-slate-300">
                      0{i + 1}
                    </span>
                  </div>

                  <p className="mt-4 font-heading text-sm font-extrabold text-slate-800">
                    {step.t}
                  </p>

                  <p className="mt-1.5 text-xs leading-5 text-slate-500">
                    {step.d}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Assigned Batches */}
        <section className="overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white shadow-sm shadow-slate-900/5">
          <div className="flex flex-col gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <UsersRound className="h-5 w-5" />
              </div>

              <div className="min-w-0">
                <h2 className="font-heading text-lg font-extrabold text-slate-900">
                  Assigned Batches
                </h2>

                <p className="mt-0.5 text-[10px] leading-4 text-slate-400">
                  {batches.length} batch{batches.length === 1 ? "" : "es"} ·
                  Batch = Course on this platform
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => navigate("/teacher/materials")}
              className="inline-flex w-fit items-center gap-1 text-[11px] font-bold text-green-600 transition hover:text-green-700"
            >
              View all
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {loading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse p-5 sm:p-6"
                >
                  <div className="h-4 w-40 rounded bg-slate-100" />
                  <div className="mt-2 h-3 w-28 rounded bg-slate-100" />
                </div>
              ))
            ) : batches.length === 0 ? (
              <div className="px-5 py-14 text-center sm:px-10">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50 text-slate-300">
                  <BookOpen className="h-6 w-6" />
                </div>

                <h3 className="mt-4 font-heading text-base font-extrabold text-slate-600">
                  No batches assigned
                </h3>

                <p className="mx-auto mt-1.5 max-w-sm text-xs leading-5 text-slate-400">
                  An administrator will assign you to batches.
                </p>
              </div>
            ) : (
              batches.slice(0, 5).map((b) => (
                <div
                  key={b._id}
                  className="group flex min-w-0 items-center justify-between gap-4 p-4 transition hover:bg-slate-50 sm:p-5"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-slate-400 transition group-hover:bg-green-50 group-hover:text-brand-green">
                      <BookOpen className="h-4.5 w-4.5" />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-extrabold text-slate-800">
                        {b.name}
                      </p>

                      <p className="mt-1 truncate text-[10px] font-medium text-slate-500">
                        {b.batchType
                          ? b.batchType.replace(/_/g, " ")
                          : "Batch"}
                        <span className="mx-1.5 text-slate-300">·</span>
                        {b.students?.length || 0} students
                      </p>
                    </div>
                  </div>

                  <span
                    className="h-3 w-3 shrink-0 rounded-full ring-4 ring-slate-50"
                    style={{
                      backgroundColor: b.color || "#18A66A",
                    }}
                  />
                </div>
              ))
            )}
          </div>
        </section>

        {/* Small workspace footer */}
        {!loading && (
          <div className="flex items-center justify-center gap-2 pb-1 text-[10px] font-semibold text-slate-400">
            <BarChart3 className="h-3.5 w-3.5" />
            Faculty workspace · NEETVIDYA
          </div>
        )}
      </div>
    </div>
  );
}