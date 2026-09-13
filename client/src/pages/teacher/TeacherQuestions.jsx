import { useState, useEffect } from "react";
import api from "../../config/api";
import { HelpCircle, Plus, Search, CheckCircle, XCircle, Filter, Pencil, Trash2 } from "lucide-react";

const difficultyColors = {
  Easy: "bg-green-100 text-green-700",
  Medium: "bg-yellow-100 text-yellow-700",
  Hard: "bg-red-100 text-red-700",
};

export default function TeacherQuestions() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await api.get("/questions?createdByMe=true");
        setQuestions(data.data?.questions || []);
      } catch {
        setQuestions([]);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const filtered = questions.filter((q) => {
    const matchSearch = q.questionText?.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" || q.difficulty === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-extrabold text-2xl text-slate-900">Question Bank</h1>
          <p className="text-slate-500 text-sm mt-1">Create and manage MCQ questions for exams and DPPs</p>
        </div>
        <button className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2.5 rounded-xl transition shadow-sm text-sm">
          <Plus className="w-4 h-4" /> Add Question
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search questions..."
            className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition bg-white"
          />
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 bg-white"
        >
          {["All", "Easy", "Medium", "Hard"].map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-40">
          <div className="w-8 h-8 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white border border-slate-100 rounded-2xl p-12 text-center shadow-sm">
          <HelpCircle className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h3 className="font-bold text-slate-600 mb-1">No questions found</h3>
          <p className="text-slate-400 text-sm">Create your first question using the button above.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((q, i) => (
            <div key={q._id} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition group">
              <div className="flex items-start gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500">
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    {q.difficulty && (
                      <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${difficultyColors[q.difficulty] || "bg-slate-100 text-slate-600"}`}>
                        {q.difficulty}
                      </span>
                    )}
                    {q.source && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 font-semibold">
                        {q.source}
                      </span>
                    )}
                    {q.year && (
                      <span className="text-xs text-slate-400">({q.year})</span>
                    )}
                  </div>
                  <p className="text-sm text-slate-800 font-medium line-clamp-2">{q.questionText}</p>
                  <div className="mt-3 grid grid-cols-2 gap-1.5">
                    {q.options?.map((opt, idx) => (
                      <div key={idx} className={`flex items-center gap-1.5 text-xs px-2 py-1 rounded-lg ${idx === q.correctAnswer ? "bg-green-50 text-green-700 font-semibold" : "bg-slate-50 text-slate-600"}`}>
                        {idx === q.correctAnswer ? <CheckCircle className="w-3 h-3 flex-shrink-0" /> : <div className="w-3 h-3 flex-shrink-0" />}
                        <span className="line-clamp-1">{opt.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex-shrink-0 flex gap-1 opacity-0 group-hover:opacity-100 transition">
                  <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 transition">
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-red-50 text-red-500 transition">
                    <Trash2 className="w-4 h-4" />
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
