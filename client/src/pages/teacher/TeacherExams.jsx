import { useState, useEffect } from "react";
import api from "../../config/api";
import { ClipboardList, Plus, Search, Clock, Users, Calendar, PlayCircle } from "lucide-react";

const statusColors = {
  LIVE: "bg-green-100 text-green-700 border-green-200",
  SCHEDULED: "bg-blue-100 text-blue-700 border-blue-200",
  CLOSED: "bg-slate-100 text-slate-600 border-slate-200",
  DRAFT: "bg-yellow-100 text-yellow-700 border-yellow-200",
};

export default function TeacherExams() {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await api.get("/exams?createdByMe=true");
        setExams(data.data?.exams || []);
      } catch {
        setExams([]);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const filtered = exams.filter((e) =>
    e.title?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-extrabold text-2xl text-slate-900">Exams & Tests</h1>
          <p className="text-slate-500 text-sm mt-1">Create and schedule CBT exams for your batches</p>
        </div>
        <button className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2.5 rounded-xl transition shadow-sm text-sm">
          <Plus className="w-4 h-4" /> Create Exam
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search exams..."
          className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition bg-white"
        />
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-40">
          <div className="w-8 h-8 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white border border-slate-100 rounded-2xl p-12 text-center shadow-sm">
          <ClipboardList className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h3 className="font-bold text-slate-600 mb-1">No exams yet</h3>
          <p className="text-slate-400 text-sm">Create your first exam using the button above.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((exam) => (
            <div key={exam._id} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${statusColors[exam.status] || statusColors.DRAFT}`}>
                      {exam.status}
                    </span>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-700 font-semibold border border-indigo-200">
                      {exam.testType?.replace(/_/g, " ")}
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-800 text-base mb-2">{exam.title}</h3>
                  <div className="flex flex-wrap gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <ClipboardList className="w-3.5 h-3.5" /> {exam.totalQuestions} questions
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {exam.duration} min
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5" /> {exam.totalMarks} marks
                    </span>
                    {exam.startTime && (
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(exam.startTime).toLocaleDateString("en-IN")}
                      </span>
                    )}
                  </div>
                </div>
                <button className="flex-shrink-0 inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg bg-green-50 text-green-700 hover:bg-green-100 transition border border-green-200">
                  <PlayCircle className="w-4 h-4" /> View Results
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
