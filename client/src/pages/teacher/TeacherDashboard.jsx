import { useState, useEffect } from "react";
import api from "../../config/api";
import {
  Users, BookOpen, ClipboardList, PlusCircle, CheckCircle,
  UsersRound, GraduationCap, HelpCircle, X, Save
} from "lucide-react";
import toast from "react-hot-toast";

export default function TeacherDashboard() {
  const [data, setData] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [newQ, setNewQ] = useState({
    questionText: "",
    options: [{ text: "" }, { text: "" }, { text: "" }, { text: "" }],
    correctAnswer: 0,
    difficulty: "Medium",
    explanation: "",
  });
  const [savingQuestion, setSavingQuestion] = useState(false);

  useEffect(() => {
    Promise.all([
      api.get("/dashboard/teacher").then(({ data }) => setData(data.data)),
      api.get("/questions").then(({ data }) => setQuestions(data.data.questions || [])),
      api.get("/teachers/my").then(({ data }) => setTeacher(data.data.teacher)),
    ]).finally(() => setLoading(false));
  }, []);

  const handleCreateQuestion = async (e) => {
    e.preventDefault();
    setSavingQuestion(true);
    try {
      await api.post("/questions", newQ);
      toast.success("Question added to central question bank!");
      setShowQuestionModal(false);
      setNewQ({
        questionText: "",
        options: [{ text: "" }, { text: "" }, { text: "" }, { text: "" }],
        correctAnswer: 0,
        difficulty: "Medium",
        explanation: "",
      });
      const { data } = await api.get("/questions");
      setQuestions(data.data.questions || []);
    } catch {
      toast.error("Failed to save question");
    } finally {
      setSavingQuestion(false);
    }
  };

  const statCards = [
    {
      label: "Assigned Batches",
      value: data?.batchCount ?? 0,
      icon: UsersRound,
      color: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-100",
    },
    {
      label: "Questions Authored",
      value: questions.length,
      icon: HelpCircle,
      color: "text-purple-600",
      bg: "bg-purple-50",
      border: "border-purple-100",
    },
    {
      label: "Active Tests",
      value: data?.examCount ?? 0,
      icon: ClipboardList,
      color: "text-green-600",
      bg: "bg-green-50",
      border: "border-green-100",
    },
  ];

  const difficultyColors = {
    Easy: "bg-green-100 text-green-700 border-green-200",
    Medium: "bg-yellow-100 text-yellow-700 border-yellow-200",
    Hard: "bg-red-100 text-red-700 border-red-200",
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
            <GraduationCap className="w-3.5 h-3.5 text-green-600" />
            <span>Faculty Workspace</span>
            {teacher?.subjectName && (
              <>
                <span>•</span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-green-50 text-green-700 border border-green-100 font-semibold">
                  {teacher.subjectName}
                </span>
              </>
            )}
          </div>
          <h1 className="font-extrabold text-2xl text-slate-900 tracking-tight">
            Welcome back{teacher?.user?.name ? `, ${teacher.user.name.split(" ")[0]}` : ""}
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage assigned batches, author NCERT-aligned questions, and review student performance.
          </p>
        </div>
        <button
          onClick={() => setShowQuestionModal(true)}
          className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 active:scale-[0.98] text-white font-semibold px-5 py-2.5 rounded-xl transition shadow-sm text-sm"
        >
          <PlusCircle className="w-4 h-4" /> Author New MCQ
        </button>
      </div>

      {/* KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm animate-pulse">
              <div className="h-10 w-10 bg-slate-100 rounded-xl mb-4" />
              <div className="h-3 bg-slate-100 rounded w-24 mb-3" />
              <div className="h-8 bg-slate-100 rounded w-16" />
            </div>
          ))
        ) : (
          statCards.map((s) => (
            <div
              key={s.label}
              className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-11 h-11 rounded-xl ${s.bg} ${s.border} border flex items-center justify-center`}>
                  <s.icon className={`w-5 h-5 ${s.color}`} />
                </div>
              </div>
              <div className="text-3xl font-extrabold text-slate-900 tracking-tight">
                {s.value}
              </div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">
                {s.label}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Recently Authored MCQs */}
      <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="font-bold text-lg text-slate-900">Recently Authored MCQs</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {questions.length} total questions in your question bank
            </p>
          </div>
          <div className="text-xs font-semibold text-slate-500">
            Last 5 questions
          </div>
        </div>
        <div className="divide-y divide-slate-50">
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="p-5 animate-pulse">
                <div className="h-3 bg-slate-100 rounded w-32 mb-3" />
                <div className="h-4 bg-slate-100 rounded w-full mb-2" />
                <div className="h-4 bg-slate-100 rounded w-3/4" />
              </div>
            ))
          ) : questions.length === 0 ? (
            <div className="p-12 text-center">
              <HelpCircle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="font-bold text-slate-600 mb-1">No questions yet</h3>
              <p className="text-sm text-slate-400">
                Author your first MCQ using the button above.
              </p>
            </div>
          ) : (
            questions.slice(0, 5).map((q, idx) => (
              <div key={q._id || idx} className="p-5 hover:bg-slate-50 transition">
                <div className="flex items-start gap-3 mb-2">
                  <span
                    className={`inline-flex items-center text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg border ${
                      difficultyColors[q.difficulty] || difficultyColors.Medium
                    } flex-shrink-0`}
                  >
                    {q.difficulty}
                  </span>
                  <span className="text-xs font-semibold text-green-600 inline-flex items-center gap-1 ml-auto">
                    <CheckCircle className="w-3.5 h-3.5" />
                    Correct: {String.fromCharCode(65 + (q.correctAnswer ?? 0))}
                  </span>
                </div>
                <p className="text-sm font-semibold text-slate-800 leading-relaxed">
                  {q.questionText}
                </p>
                {q.subject && (
                  <div className="mt-2 text-[11px] text-slate-500">
                    Subject: {typeof q.subject === "string" ? q.subject : q.subject?.name || "—"}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Create Question Modal */}
      {showQuestionModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white rounded-t-2xl">
              <div>
                <h3 className="font-extrabold text-xl text-slate-900">Author New MCQ Question</h3>
                <p className="text-xs text-slate-500 mt-0.5">Create a 4-option NEET-aligned question</p>
              </div>
              <button
                type="button"
                onClick={() => setShowQuestionModal(false)}
                className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateQuestion} className="p-6 space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                  Question Text
                </label>
                <textarea
                  required
                  rows={3}
                  value={newQ.questionText}
                  onChange={(e) => setNewQ({ ...newQ, questionText: e.target.value })}
                  placeholder="E.g. The dimensions of Planck's constant match which of the following?"
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                  4 Options <span className="text-green-600 normal-case font-semibold tracking-normal">(select the correct one)</span>
                </label>
                <div className="space-y-2.5">
                  {newQ.options.map((opt, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <label className="flex-shrink-0 cursor-pointer">
                        <input
                          type="radio"
                          name="correct"
                          checked={newQ.correctAnswer === i}
                          onChange={() => setNewQ({ ...newQ, correctAnswer: i })}
                          className="w-4 h-4 accent-green-600"
                        />
                      </label>
                      <div
                        className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-xs font-extrabold border ${
                          newQ.correctAnswer === i
                            ? "bg-green-600 text-white border-green-600 shadow-sm"
                            : "bg-slate-50 text-slate-500 border-slate-200"
                        }`}
                      >
                        {String.fromCharCode(65 + i)}
                      </div>
                      <input
                        type="text"
                        required
                        placeholder={`Option ${String.fromCharCode(65 + i)} text`}
                        value={opt.text}
                        onChange={(e) => {
                          const opts = [...newQ.options];
                          opts[i].text = e.target.value;
                          setNewQ({ ...newQ, options: opts });
                        }}
                        className="flex-1 px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                    Difficulty
                  </label>
                  <select
                    value={newQ.difficulty}
                    onChange={(e) => setNewQ({ ...newQ, difficulty: e.target.value })}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition bg-white"
                  >
                    <option>Easy</option>
                    <option>Medium</option>
                    <option>Hard</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                  NCERT Explanation
                </label>
                <textarea
                  rows={2}
                  value={newQ.explanation}
                  onChange={(e) => setNewQ({ ...newQ, explanation: e.target.value })}
                  placeholder="Step-by-step explanation shown to students after submission..."
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition resize-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowQuestionModal(false)}
                  className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingQuestion}
                  className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white font-semibold px-5 py-2.5 rounded-xl transition shadow-sm text-sm"
                >
                  <Save className="w-4 h-4" />
                  {savingQuestion ? "Saving..." : "Save MCQ"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
