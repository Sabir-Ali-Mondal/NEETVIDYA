import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../config/api";
import {
  Users,
  GraduationCap,
  ClipboardList,
  Layers,
  ShieldCheck,
  ChevronRight,
  ArrowUpRight,
} from "lucide-react";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);

    try {
      await api
        .get("/admin/dashboard")
        .then(({ data }) => setData(data.data));
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      label: "Total Enrolled",
      value: data?.studentCount ?? 0,
      icon: Users,
      color: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-100",
      path: "/admin/students",
      description: "Registered students",
    },
    {
      label: "Active Faculty",
      value: data?.teacherCount ?? 0,
      icon: GraduationCap,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      border: "border-emerald-100",
      path: "/admin/teachers",
      description: "Teaching staff",
    },
    {
      label: "Live Tests",
      value: data?.examCount ?? 0,
      icon: ClipboardList,
      color: "text-purple-600",
      bg: "bg-purple-50",
      border: "border-purple-100",
      path: "/admin/exams",
      description: "Published examinations",
    },
    {
      label: "Test Submissions",
      value: data?.attemptCount ?? 0,
      icon: Layers,
      color: "text-amber-600",
      bg: "bg-amber-50",
      border: "border-amber-100",
      path: "/admin/exams",
      description: "Student attempts",
    },
  ];

  return (
    <div className="min-h-full space-y-5 p-3 sm:space-y-6 sm:p-5 lg:p-7">
      {/* HERO HEADER */}
      <section className="relative overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-6 lg:p-7">
        <div className="absolute -right-20 -top-24 h-56 w-56 rounded-full bg-green-100/60 blur-3xl" />
        <div className="absolute -bottom-24 -left-20 h-56 w-56 rounded-full bg-emerald-100/50 blur-3xl" />

        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-brand-green">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
              Institute Administration
            </div>

            <h1 className="font-heading text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              Admin Dashboard
            </h1>

            <p className="mt-1.5 max-w-2xl text-sm leading-6 text-slate-500">
              Monitor students, faculty, examinations and overall
              academic activity from one place.
            </p>
          </div>

          <div className="hidden shrink-0 items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 sm:flex">
            <ShieldCheck className="h-4 w-4 text-brand-green" />

            <span className="text-xs font-bold text-slate-600">
              Administrator Access
            </span>
          </div>
        </div>
      </section>

      {/* KPI SECTION */}
      <section>
        <div className="mb-3 flex items-end justify-between gap-3 px-1">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
              Overview
            </p>

            <h2 className="mt-1 text-base font-extrabold text-slate-800">
              Institute Statistics
            </h2>
          </div>

          {!loading && (
            <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-bold text-slate-500">
              Live data
            </span>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
          {loading
            ? Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="rounded-[1.5rem] border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
                >
                  <div className="h-10 w-10 animate-pulse rounded-xl bg-slate-100 sm:h-11 sm:w-11" />

                  <div className="mt-5 h-8 w-16 animate-pulse rounded-lg bg-slate-100" />

                  <div className="mt-3 h-3 w-24 animate-pulse rounded bg-slate-100" />

                  <div className="mt-2 h-2.5 w-20 animate-pulse rounded bg-slate-100" />
                </div>
              ))
            : statCards.map((stat) => {
                const Icon = stat.icon;

                return (
                  <button
                    key={stat.label}
                    type="button"
                    onClick={() => navigate(stat.path)}
                    className="group relative overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white p-4 text-left shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-900/5 sm:p-5"
                  >
                    <div
                      className={`absolute -right-8 -top-8 h-24 w-24 rounded-full ${stat.bg} opacity-50 blur-2xl transition group-hover:opacity-80`}
                    />

                    <div className="relative">
                      <div className="flex items-start justify-between gap-2">
                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-xl border ${stat.bg} ${stat.border} transition duration-300 group-hover:scale-105 sm:h-11 sm:w-11`}
                        >
                          <Icon
                            className={`h-5 w-5 ${stat.color}`}
                          />
                        </div>

                        <div className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-300 transition group-hover:bg-slate-50 group-hover:text-slate-500">
                          <ArrowUpRight className="h-4 w-4" />
                        </div>
                      </div>

                      <div className="mt-5 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                        {stat.value}
                      </div>

                      <div className="mt-1 text-[10px] font-bold uppercase tracking-wider text-slate-500 sm:text-xs">
                        {stat.label}
                      </div>

                      <div className="mt-1.5 hidden text-[11px] text-slate-400 sm:block">
                        {stat.description}
                      </div>

                      <div className="mt-3 flex items-center gap-1 text-[10px] font-bold text-slate-400 transition group-hover:text-brand-green sm:text-[11px]">
                        Open section
                        <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                      </div>
                    </div>
                  </button>
                );
              })}
        </div>
      </section>

      {/* QUICK ADMIN AREA */}
      {!loading && (
        <section className="relative overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-green-50 blur-3xl" />

          <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-50 text-brand-green">
                <ShieldCheck className="h-4 w-4" />
              </div>

              <div>
                <h2 className="text-sm font-extrabold text-slate-800 sm:text-base">
                  Administration Overview
                </h2>

                <p className="mt-1 max-w-xl text-xs leading-5 text-slate-500">
                  Use the navigation panel to manage students,
                  faculty, courses, batches and examination
                  activity.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => navigate("/admin/students")}
              className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-bold text-slate-600 transition hover:bg-slate-100"
            >
              Manage Students
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </section>
      )}
    </div>
  );
}