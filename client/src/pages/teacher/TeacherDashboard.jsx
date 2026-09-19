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
              className="bg-white border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition cursor-pointer hover:border-slate-200 active:scale-[0.99] touch-manipulation"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-11 h-11 rounded-xl ${s.bg} ${s.border} border flex items-center justify-center transition-transform`}>
                  <s.icon className={`w-5 h-5 ${s.color}`} />
                </div>
                <ChevronRight className="w-4 h-4 text-slate-300" />
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
            onClick={() => navigate("/teacher/materials")}
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

