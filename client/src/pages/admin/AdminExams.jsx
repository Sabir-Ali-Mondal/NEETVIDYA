import { useState, useEffect } from "react";
import api from "../../config/api";
import { ClipboardList, Plus, Search, Clock, Users, Calendar, PlayCircle, BarChart3 } from "lucide-react";

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
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

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

  useEffect(() => { fetchExams(); }, []);

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
        <button className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2.5 rounded-xl transition shadow-sm text-sm">
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
                <div className="flex gap-2 sm:flex-col sm:items-end">
                  <button className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-xl bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200 transition">
                    <BarChart3 className="w-3.5 h-3.5" /> Results
                  </button>
                  <button className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-xl bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200 transition">
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
