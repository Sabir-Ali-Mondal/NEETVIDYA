import { useState, useEffect } from "react";
import api from "../../config/api";
import { HelpCircle, Plus, Search, CheckCircle, Pencil, Trash2, Filter } from "lucide-react";
import toast from "react-hot-toast";

const difficultyColors = {
  Easy: "bg-green-100 text-green-700 border-green-200",
  Medium: "bg-amber-100 text-amber-700 border-amber-200",
  Hard: "bg-red-100 text-red-700 border-red-200",
};

export default function AdminQuestions() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [diffFilter, setDiffFilter] = useState("All");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
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

  useEffect(() => { fetchQuestions(); }, [page, search, diffFilter]);

  const handleDelete = async (id) => {
    if (!confirm("Delete this question?")) return;
    try {
      await api.delete(`/questions/${id}`);
      toast.success("Question deleted");
      fetchQuestions();
    } catch {
      toast.error("Failed to delete");
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
        <button className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2.5 rounded-xl transition shadow-sm text-sm">
          <Plus className="w-4 h-4" /> Add Question
        </button>
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
                    <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 transition">
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(q._id)} className="p-2 rounded-lg hover:bg-red-50 text-red-500 transition">
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
    </div>
  );
}
