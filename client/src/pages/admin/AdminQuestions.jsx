import { useState, useEffect } from "react";
import api from "../../config/api";
import { HelpCircle, Plus, Search, CheckCircle, Pencil, Trash2, Filter, X, Save, BookOpen, Upload, Download, FileSpreadsheet } from "lucide-react";
import { alertSuccess, alertError } from "../../utils/alert";
import ConfirmModal from "../../components/shared/ConfirmModal";

const difficultyColors = {
  Easy: "bg-green-100 text-green-700 border-green-200",
  Medium: "bg-amber-100 text-amber-700 border-amber-200",
  Hard: "bg-red-100 text-red-700 border-red-200",
};

export default function AdminQuestions() {
  const [questions, setQuestions] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [diffFilter, setDiffFilter] = useState("All");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [showCreate, setShowCreate] = useState(false);
  const [showBulkImport, setShowBulkImport] = useState(false);
  const [bulkImporting, setBulkImporting] = useState(false);
  const [bulkCsvText, setBulkCsvText] = useState("");
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [questionToDelete, setQuestionToDelete] = useState(null);
  const [savingQuestion, setSavingQuestion] = useState(false);
  const [form, setForm] = useState({
    questionText: "",
    subject: "",
    difficulty: "Medium",
    marks: 4,
    negativeMarks: 1,
    source: "",
    year: "",
    explanation: "",
    options: [{ text: "" }, { text: "" }, { text: "" }, { text: "" }],
    correctAnswer: 0,
  });

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

  const fetchSubjects = async () => {
    try {
      const { data } = await api.get("/academics/subjects");
      setSubjects(data.data?.subjects || []);
    } catch {
      setSubjects([]);
    }
  };

  useEffect(() => {
    fetchQuestions();
    fetchSubjects();
  }, [page, search, diffFilter]);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!form.subject) {
      alertError("Please select a subject");
      return;
    }
    setSavingQuestion(true);
    try {
      await api.post("/questions", {
        ...form,
        marks: Number(form.marks || 4),
        negativeMarks: Number(form.negativeMarks || 1),
        year: form.year ? Number(form.year) : undefined,
      });
      alertSuccess("Question authored and saved to bank");
      setShowCreate(false);
      setForm({
        questionText: "",
        subject: subjects[0]?._id || "",
        difficulty: "Medium",
        marks: 4,
        negativeMarks: 1,
        source: "",
        year: "",
        explanation: "",
        options: [{ text: "" }, { text: "" }, { text: "" }, { text: "" }],
        correctAnswer: 0,
      });
      fetchQuestions();
    } catch (err) {
      alertError(err.response?.data?.message || "Failed to author question");
    } finally {
      setSavingQuestion(false);
    }
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    if (!editingQuestion) return;
    setSavingQuestion(true);
    try {
      await api.put(`/questions/${editingQuestion._id}`, {
        questionText: editingQuestion.questionText,
        subject: editingQuestion.subject?._id || editingQuestion.subject,
        difficulty: editingQuestion.difficulty,
        marks: Number(editingQuestion.marks || 4),
        negativeMarks: Number(editingQuestion.negativeMarks || 1),
        source: editingQuestion.source,
        year: editingQuestion.year ? Number(editingQuestion.year) : undefined,
        explanation: editingQuestion.explanation,
        options: editingQuestion.options,
        correctAnswer: Number(editingQuestion.correctAnswer ?? 0),
      });
      alertSuccess("Question updated successfully");
      setEditingQuestion(null);
      fetchQuestions();
    } catch (err) {
      alertError(err.response?.data?.message || "Failed to update question");
    } finally {
      setSavingQuestion(false);
    }
  };

  const confirmDeleteQuestion = async () => {
    if (!questionToDelete) return;
    try {
      await api.delete(`/questions/${questionToDelete._id}`);
      alertSuccess("Question deleted");
      setQuestionToDelete(null);
      fetchQuestions();
    } catch {
      alertError("Failed to delete question");
    }
  };

  const downloadCsvTemplate = () => {
    const csvHeader = "QuestionText,OptionA,OptionB,OptionC,OptionD,CorrectOptionIndex(0-3),Difficulty(Easy/Medium/Hard),Marks,NegativeMarks,Explanation\n";
    const sampleRow = "\"Which organelle is called the powerhouse of the cell?\",\"Ribosome\",\"Mitochondria\",\"Nucleus\",\"Golgi apparatus\",1,Easy,4,1,\"Mitochondria produces cellular energy (ATP).\"\n";
    const blob = new Blob([csvHeader + sampleRow], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "neetvidya_questions_template.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    alertSuccess("CSV template downloaded");
  };

  const handleBulkImportSubmit = async (e) => {
    e.preventDefault();
    if (!bulkCsvText.trim()) {
      alertError("Please paste CSV data or choose a CSV file");
      return;
    }

    const lines = bulkCsvText.trim().split("\n");
    if (lines.length < 2) {
      alertError("CSV must contain at least a header and 1 question row");
      return;
    }

    setBulkImporting(true);
    try {
      const parsedQuestions = [];
      const defaultSubId = subjects[0]?._id;
      // Skip header row
      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;
        // Simple regex-based CSV splitter respecting quotes
        const match = line.match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g);
        if (!match || match.length < 6) continue;
        const clean = match.map((m) => m.replace(/^"|"$/g, "").trim());
        const [qText, optA, optB, optC, optD, corrIdx, diff, marks, negMarks, exp] = clean;
        parsedQuestions.push({
          questionText: qText,
          options: [{ text: optA }, { text: optB }, { text: optC }, { text: optD }],
          correctAnswer: parseInt(corrIdx) || 0,
          difficulty: ["Easy", "Medium", "Hard"].includes(diff) ? diff : "Medium",
          marks: parseInt(marks) || 4,
          negativeMarks: parseInt(negMarks) || 1,
          explanation: exp || "",
          subject: form.subject || defaultSubId,
        });
      }

      if (parsedQuestions.length === 0) {
        alertError("No valid questions parsed from CSV. Please check formatting.");
        setBulkImporting(false);
        return;
      }

      const { data } = await api.post("/questions/bulk-import", { questions: parsedQuestions });
      alertSuccess(`Successfully imported ${data.data?.imported || parsedQuestions.length} questions!`);
      setShowBulkImport(false);
      setBulkCsvText("");
      fetchQuestions();
    } catch (err) {
      alertError(err.response?.data?.message || "Bulk import failed");
    } finally {
      setBulkImporting(false);
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
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              if (!form.subject && subjects.length > 0) {
                setForm((prev) => ({ ...prev, subject: subjects[0]._id }));
              }
              setShowBulkImport(true);
            }}
            className="inline-flex items-center gap-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold px-4 py-2.5 rounded-xl transition shadow-sm text-sm"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" /> Bulk Import
          </button>
          <button
            onClick={() => {
              if (!form.subject && subjects.length > 0) {
                setForm((prev) => ({ ...prev, subject: subjects[0]._id }));
              }
              setShowCreate(true);
            }}
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2.5 rounded-xl transition shadow-sm text-sm"
          >
            <Plus className="w-4 h-4" /> Add Question
          </button>
        </div>
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
                  <div className="flex-shrink-0 flex gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition">
                    <button
                      onClick={() => setEditingQuestion(q)}
                      className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-indigo-600 transition"
                      title="Edit Question"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setQuestionToDelete(q)}
                      className="p-2 rounded-lg hover:bg-red-50 text-red-500 transition"
                      title="Delete Question"
                    >
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

      {/* Create Question Modal */}
      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white rounded-t-2xl z-10">
              <div>
                <h2 className="font-extrabold text-xl text-slate-900">Author New Question</h2>
                <p className="text-slate-500 text-xs mt-0.5">Create a 4-option NEET MCQ for the central question bank.</p>
              </div>
              <button
                onClick={() => setShowCreate(false)}
                className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreate} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Question Text *</label>
                <textarea
                  required
                  rows={3}
                  value={form.questionText}
                  onChange={(e) => setForm((prev) => ({ ...prev, questionText: e.target.value }))}
                  placeholder="Enter the question statement clearly..."
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Subject *</label>
                  <select
                    required
                    value={form.subject}
                    onChange={(e) => setForm((prev) => ({ ...prev, subject: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition bg-white"
                  >
                    <option value="">Select subject</option>
                    {subjects.map((s) => (
                      <option key={s._id} value={s._id}>{s.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Difficulty</label>
                  <select
                    value={form.difficulty}
                    onChange={(e) => setForm((prev) => ({ ...prev, difficulty: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition bg-white"
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Source / Year</label>
                  <input
                    value={form.source}
                    onChange={(e) => setForm((prev) => ({ ...prev, source: e.target.value }))}
                    placeholder="e.g. NEET UG 2023"
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-2">
                  Answer Options (select radio for correct answer)
                </label>
                <div className="space-y-2">
                  {form.options.map((opt, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="correctAnswer"
                        checked={form.correctAnswer === idx}
                        onChange={() => setForm((prev) => ({ ...prev, correctAnswer: idx }))}
                        className="w-4 h-4 text-green-600 focus:ring-green-500"
                        title="Mark as correct answer"
                      />
                      <span className="w-6 text-xs font-bold text-slate-500 text-center">
                        {String.fromCharCode(65 + idx)}.
                      </span>
                      <input
                        required
                        value={opt.text}
                        onChange={(e) => {
                          const newOpts = [...form.options];
                          newOpts[idx] = { ...newOpts[idx], text: e.target.value };
                          setForm((prev) => ({ ...prev, options: newOpts }));
                        }}
                        placeholder={`Option ${String.fromCharCode(65 + idx)} text`}
                        className="flex-1 px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Explanation</label>
                <textarea
                  rows={2}
                  value={form.explanation}
                  onChange={(e) => setForm((prev) => ({ ...prev, explanation: e.target.value }))}
                  placeholder="Explain why this option is correct and cite NCERT page reference..."
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition resize-none"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreate(false)}
                  className="flex-1 py-2.5 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingQuestion}
                  className="flex-1 py-2.5 bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white font-bold rounded-xl transition shadow-sm inline-flex items-center justify-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  {savingQuestion ? "Saving..." : "Save Question"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Question Modal */}
      {editingQuestion && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white rounded-t-2xl z-10">
              <div>
                <h2 className="font-extrabold text-xl text-slate-900">Edit Question</h2>
                <p className="text-slate-500 text-xs mt-0.5">Modify question text, options, or correct answer.</p>
              </div>
              <button
                onClick={() => setEditingQuestion(null)}
                className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSaveEdit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Question Text *</label>
                <textarea
                  required
                  rows={3}
                  value={editingQuestion.questionText}
                  onChange={(e) => setEditingQuestion((prev) => ({ ...prev, questionText: e.target.value }))}
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Subject</label>
                  <select
                    value={editingQuestion.subject?._id || editingQuestion.subject}
                    onChange={(e) => setEditingQuestion((prev) => ({ ...prev, subject: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition bg-white"
                  >
                    {subjects.map((s) => (
                      <option key={s._id} value={s._id}>{s.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Difficulty</label>
                  <select
                    value={editingQuestion.difficulty}
                    onChange={(e) => setEditingQuestion((prev) => ({ ...prev, difficulty: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition bg-white"
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Source</label>
                  <input
                    value={editingQuestion.source || ""}
                    onChange={(e) => setEditingQuestion((prev) => ({ ...prev, source: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-2">
                  Answer Options (select radio for correct answer)
                </label>
                <div className="space-y-2">
                  {editingQuestion.options?.map((opt, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="editCorrectAnswer"
                        checked={Number(editingQuestion.correctAnswer) === idx}
                        onChange={() => setEditingQuestion((prev) => ({ ...prev, correctAnswer: idx }))}
                        className="w-4 h-4 text-green-600 focus:ring-green-500"
                        title="Mark as correct answer"
                      />
                      <span className="w-6 text-xs font-bold text-slate-500 text-center">
                        {String.fromCharCode(65 + idx)}.
                      </span>
                      <input
                        required
                        value={opt.text}
                        onChange={(e) => {
                          const newOpts = [...editingQuestion.options];
                          newOpts[idx] = { ...newOpts[idx], text: e.target.value };
                          setEditingQuestion((prev) => ({ ...prev, options: newOpts }));
                        }}
                        className="flex-1 px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Explanation</label>
                <textarea
                  rows={2}
                  value={editingQuestion.explanation || ""}
                  onChange={(e) => setEditingQuestion((prev) => ({ ...prev, explanation: e.target.value }))}
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition resize-none"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingQuestion(null)}
                  className="flex-1 py-2.5 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingQuestion}
                  className="flex-1 py-2.5 bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white font-bold rounded-xl transition shadow-sm inline-flex items-center justify-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  {savingQuestion ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Bulk Import Modal */}
      {showBulkImport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white rounded-t-2xl z-10">
              <div>
                <h2 className="font-extrabold text-xl text-slate-900">Bulk Import Questions</h2>
                <p className="text-slate-500 text-xs mt-0.5">Upload multiple MCQs at once using CSV format.</p>
              </div>
              <button
                onClick={() => setShowBulkImport(false)}
                className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleBulkImportSubmit} className="p-6 space-y-4">
              <div className="flex items-center justify-between p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl">
                <div>
                  <h4 className="text-xs font-bold text-emerald-900">Need a CSV template?</h4>
                  <p className="text-xs text-emerald-700">Download our formatted template with sample MCQs.</p>
                </div>
                <button
                  type="button"
                  onClick={downloadCsvTemplate}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" /> Download Template
                </button>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Default Subject</label>
                <select
                  value={form.subject}
                  onChange={(e) => setForm((prev) => ({ ...prev, subject: e.target.value }))}
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition bg-white"
                >
                  {subjects.map((s) => (
                    <option key={s._id} value={s._id}>{s.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">
                  Choose CSV File
                </label>
                <input
                  type="file"
                  accept=".csv"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (event) => {
                        setBulkCsvText(event.target.result);
                      };
                      reader.readAsText(file);
                    }
                  }}
                  className="w-full text-xs text-slate-500 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100 cursor-pointer border border-slate-200 rounded-xl p-2"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">
                  Or Paste CSV Content
                </label>
                <textarea
                  rows={6}
                  value={bulkCsvText}
                  onChange={(e) => setBulkCsvText(e.target.value)}
                  placeholder="QuestionText,OptionA,OptionB,OptionC,OptionD,CorrectOptionIndex(0-3),Difficulty,Marks,NegativeMarks,Explanation"
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-xs font-mono focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowBulkImport(false)}
                  className="flex-1 py-2.5 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={bulkImporting}
                  className="flex-1 py-2.5 bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white font-bold rounded-xl transition shadow-sm inline-flex items-center justify-center gap-2"
                >
                  <Upload className="w-4 h-4" />
                  {bulkImporting ? "Importing..." : "Process Import"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmModal
        isOpen={!!questionToDelete}
        onClose={() => setQuestionToDelete(null)}
        onConfirm={confirmDeleteQuestion}
        title="Delete Question"
        message="Are you sure you want to delete this question? It will be deactivated from the Question Bank."
        confirmLabel="Delete Question"
        danger={true}
      />
    </div>
  );
}
