import { useState, useEffect } from "react";
import api from "../../config/api";
import {
  ClipboardList, Plus, Search, Clock, Users, Calendar, PlayCircle,
  BarChart3, Pencil, Trash2, X, Save, CheckCircle2, AlertCircle, Trophy, Eye
} from "lucide-react";
import toast from "react-hot-toast";
import ConfirmModal from "../../components/shared/ConfirmModal";

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
  const [courses, setCourses] = useState([]);
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [showCreate, setShowCreate] = useState(false);
  const [editingExam, setEditingExam] = useState(null);
  const [examResults, setExamResults] = useState(null);
  const [loadingResults, setLoadingResults] = useState(false);
  const [examToDelete, setExamToDelete] = useState(null);
  const [savingExam, setSavingExam] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    testType: "MOCK_TEST",
    course: "",
    totalQuestions: 180,
    totalMarks: 720,
    marksPerCorrect: 4,
    negativePerWrong: 1,
    duration: 180,
    startTime: "",
    endTime: "",
    maxAttempts: 1,
    instructions: "General NEET Examination Instructions: 4 marks for correct, -1 mark for wrong answer.",
  });

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

  const fetchDependencies = async () => {
    try {
      const [cRes, bRes] = await Promise.all([
        api.get("/courses"),
        api.get("/batches"),
      ]);
      setCourses(cRes.data.data?.courses || []);
      setBatches(bRes.data.data?.batches || []);
    } catch {}
  };

  useEffect(() => {
    fetchExams();
    fetchDependencies();
  }, []);

  const handleCreateExam = async (e) => {
    e.preventDefault();
    if (!form.startTime || !form.endTime) {
      toast.error("Please provide both start and end times");
      return;
    }
    setSavingExam(true);
    try {
      await api.post("/exams", {
        ...form,
        totalQuestions: Number(form.totalQuestions || 10),
        totalMarks: Number(form.totalMarks || 40),
        duration: Number(form.duration || 60),
        maxAttempts: Number(form.maxAttempts || 1),
        course: form.course || undefined,
      });
      toast.success("Exam created in DRAFT status");
      setShowCreate(false);
      fetchExams();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create exam");
    } finally {
      setSavingExam(false);
    }
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    if (!editingExam) return;
    setSavingExam(true);
    try {
      await api.put(`/exams/${editingExam._id}`, {
        title: editingExam.title,
        description: editingExam.description,
        testType: editingExam.testType,
        course: typeof editingExam.course === "object" ? editingExam.course?._id : editingExam.course,
        totalQuestions: Number(editingExam.totalQuestions || 10),
        totalMarks: Number(editingExam.totalMarks || 40),
        duration: Number(editingExam.duration || 60),
        startTime: editingExam.startTime,
        endTime: editingExam.endTime,
        maxAttempts: Number(editingExam.maxAttempts || 1),
        instructions: editingExam.instructions,
      });
      toast.success("Exam updated successfully");
      setEditingExam(null);
      fetchExams();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update exam");
    } finally {
      setSavingExam(false);
    }
  };

  const handlePublish = async (examId) => {
    try {
      await api.put(`/exams/${examId}/publish`);
      toast.success("Exam is now LIVE for students");
      fetchExams();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to publish exam");
    }
  };

  const handleClose = async (examId) => {
    try {
      await api.put(`/exams/${examId}/close`);
      toast.success("Exam has been closed");
      fetchExams();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to close exam");
    }
  };

  const handleOpenResults = async (exam) => {
    setLoadingResults(true);
    setExamResults({ exam, results: [], analytics: null });
    try {
      const { data } = await api.get(`/exams/${exam._id}/results`);
      setExamResults(data.data);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to load results");
      setExamResults(null);
    } finally {
      setLoadingResults(false);
    }
  };

  const confirmDeleteExam = async () => {
    if (!examToDelete) return;
    try {
      await api.delete(`/exams/${examToDelete._id}`);
      toast.success("Exam deleted successfully");
      setExamToDelete(null);
      fetchExams();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete exam");
    }
  };

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
        <button
          onClick={() => setShowCreate(true)}
          className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2.5 rounded-xl transition shadow-sm text-sm"
        >
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
                <div className="flex flex-wrap gap-2 sm:flex-col sm:items-end">
                  <button
                    onClick={() => handleOpenResults(exam)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-1.5 rounded-xl bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200 transition"
                  >
                    <BarChart3 className="w-3.5 h-3.5" /> Submissions
                  </button>
                  <button
                    onClick={() =>
                      setEditingExam({
                        ...exam,
                        startTime: exam.startTime ? new Date(exam.startTime).toISOString().slice(0, 16) : "",
                        endTime: exam.endTime ? new Date(exam.endTime).toISOString().slice(0, 16) : "",
                      })
                    }
                    className="inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-1.5 rounded-xl bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200 transition"
                  >
                    <Pencil className="w-3.5 h-3.5" /> Edit
                  </button>
                  {exam.status !== "LIVE" && exam.status !== "CLOSED" && (
                    <button
                      onClick={() => handlePublish(exam._id)}
                      className="inline-flex items-center gap-1 text-xs font-semibold px-3.5 py-1.5 rounded-xl bg-green-50 text-green-700 hover:bg-green-100 border border-green-200 transition"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" /> Go Live
                    </button>
                  )}
                  {exam.status === "LIVE" && (
                    <button
                      onClick={() => handleClose(exam._id)}
                      className="inline-flex items-center gap-1 text-xs font-semibold px-3.5 py-1.5 rounded-xl bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200 transition"
                    >
                      <AlertCircle className="w-3.5 h-3.5" /> Close Test
                    </button>
                  )}
                  <button
                    onClick={() => setExamToDelete(exam)}
                    className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded-xl text-red-500 hover:bg-red-50 transition"
                    title="Delete Exam"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Exam Modal */}
      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white rounded-t-2xl z-10">
              <div>
                <h2 className="font-extrabold text-xl text-slate-900">Create New Exam</h2>
                <p className="text-slate-500 text-xs mt-0.5">Configure CBT test parameters and schedule.</p>
              </div>
              <button
                onClick={() => setShowCreate(false)}
                className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreateExam} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Exam Title *</label>
                  <input
                    required
                    value={form.title}
                    onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
                    placeholder="e.g. All India Grand Mock Test – 01"
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Test Type</label>
                  <select
                    value={form.testType}
                    onChange={(e) => setForm((prev) => ({ ...prev, testType: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition bg-white"
                  >
                    <option value="MOCK_TEST">Mock Test</option>
                    <option value="CHAPTER_TEST">Chapter Test</option>
                    <option value="UNIT_TEST">Unit Test</option>
                    <option value="DPP">Daily Practice Problem (DPP)</option>
                    <option value="PYQ">Previous Year Questions (PYQ)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Associated Course</label>
                  <select
                    value={form.course}
                    onChange={(e) => setForm((prev) => ({ ...prev, course: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition bg-white"
                  >
                    <option value="">All Courses</option>
                    {courses.map((c) => (
                      <option key={c._id} value={c._id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Total Questions</label>
                  <input
                    type="number"
                    min="1"
                    value={form.totalQuestions}
                    onChange={(e) => setForm((prev) => ({ ...prev, totalQuestions: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Total Marks</label>
                  <input
                    type="number"
                    min="1"
                    value={form.totalMarks}
                    onChange={(e) => setForm((prev) => ({ ...prev, totalMarks: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Duration (Minutes)</label>
                  <input
                    type="number"
                    min="5"
                    value={form.duration}
                    onChange={(e) => setForm((prev) => ({ ...prev, duration: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Max Attempts Allowed</label>
                  <input
                    type="number"
                    min="1"
                    value={form.maxAttempts}
                    onChange={(e) => setForm((prev) => ({ ...prev, maxAttempts: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Start Time *</label>
                  <input
                    required
                    type="datetime-local"
                    value={form.startTime}
                    onChange={(e) => setForm((prev) => ({ ...prev, startTime: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">End Time *</label>
                  <input
                    required
                    type="datetime-local"
                    value={form.endTime}
                    onChange={(e) => setForm((prev) => ({ ...prev, endTime: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Instructions</label>
                  <textarea
                    rows={2}
                    value={form.instructions}
                    onChange={(e) => setForm((prev) => ({ ...prev, instructions: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition resize-none"
                  />
                </div>
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
                  disabled={savingExam}
                  className="flex-1 py-2.5 bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white font-bold rounded-xl transition shadow-sm inline-flex items-center justify-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  {savingExam ? "Creating..." : "Save Draft Exam"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Exam Modal */}
      {editingExam && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white rounded-t-2xl z-10">
              <div>
                <h2 className="font-extrabold text-xl text-slate-900">Edit Exam</h2>
                <p className="text-slate-500 text-xs mt-0.5">Update test configuration and schedule.</p>
              </div>
              <button
                onClick={() => setEditingExam(null)}
                className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSaveEdit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Exam Title *</label>
                  <input
                    required
                    value={editingExam.title}
                    onChange={(e) => setEditingExam((prev) => ({ ...prev, title: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Test Type</label>
                  <select
                    value={editingExam.testType}
                    onChange={(e) => setEditingExam((prev) => ({ ...prev, testType: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition bg-white"
                  >
                    <option value="MOCK_TEST">Mock Test</option>
                    <option value="CHAPTER_TEST">Chapter Test</option>
                    <option value="UNIT_TEST">Unit Test</option>
                    <option value="DPP">Daily Practice Problem (DPP)</option>
                    <option value="PYQ">Previous Year Questions (PYQ)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Course</label>
                  <select
                    value={editingExam.course?._id || editingExam.course || ""}
                    onChange={(e) => setEditingExam((prev) => ({ ...prev, course: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition bg-white"
                  >
                    <option value="">All Courses</option>
                    {courses.map((c) => (
                      <option key={c._id} value={c._id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Duration (Minutes)</label>
                  <input
                    type="number"
                    value={editingExam.duration}
                    onChange={(e) => setEditingExam((prev) => ({ ...prev, duration: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Total Questions</label>
                  <input
                    type="number"
                    value={editingExam.totalQuestions}
                    onChange={(e) => setEditingExam((prev) => ({ ...prev, totalQuestions: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Start Time</label>
                  <input
                    type="datetime-local"
                    value={editingExam.startTime}
                    onChange={(e) => setEditingExam((prev) => ({ ...prev, startTime: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">End Time</label>
                  <input
                    type="datetime-local"
                    value={editingExam.endTime}
                    onChange={(e) => setEditingExam((prev) => ({ ...prev, endTime: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Instructions</label>
                  <textarea
                    rows={2}
                    value={editingExam.instructions || ""}
                    onChange={(e) => setEditingExam((prev) => ({ ...prev, instructions: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition resize-none"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingExam(null)}
                  className="flex-1 py-2.5 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingExam}
                  className="flex-1 py-2.5 bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white font-bold rounded-xl transition shadow-sm inline-flex items-center justify-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  {savingExam ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Exam Results Modal */}
      {examResults && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white rounded-t-2xl z-10">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700">
                  Submissions & Analytics
                </span>
                <h2 className="font-extrabold text-xl text-slate-900 mt-1">{examResults.exam?.title}</h2>
              </div>
              <button
                onClick={() => setExamResults(null)}
                className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Analytics summary */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl text-center">
                  <div className="text-2xl font-extrabold text-slate-900">
                    {examResults.analytics?.totalSubmissions || 0}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">Total Attempts</div>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl text-center">
                  <div className="text-2xl font-extrabold text-slate-900">
                    {examResults.analytics?.avgScore || 0}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">Average Score</div>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl text-center">
                  <div className="text-2xl font-extrabold text-green-600">
                    {examResults.analytics?.highestScore || 0}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">Highest Score</div>
                </div>
              </div>

              {/* Candidates Table */}
              <div>
                <h3 className="font-bold text-slate-800 text-sm mb-3">Student Rank List</h3>
                {loadingResults ? (
                  <div className="py-12 flex justify-center">
                    <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                  </div>
                ) : !examResults.results || examResults.results.length === 0 ? (
                  <div className="text-center py-12 bg-slate-50 rounded-xl border border-slate-100">
                    <Trophy className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                    <p className="text-sm font-semibold text-slate-600">No submissions recorded yet</p>
                    <p className="text-xs text-slate-400 mt-0.5">Students who attempt this test will appear here.</p>
                  </div>
                ) : (
                  <div className="border border-slate-100 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                      <thead className="bg-slate-50 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                        <tr>
                          <th className="py-3 px-4 text-left">Rank</th>
                          <th className="py-3 px-4 text-left">Candidate</th>
                          <th className="py-3 px-4 text-center">Score</th>
                          <th className="py-3 px-4 text-center">Accuracy</th>
                          <th className="py-3 px-4 text-right">Submitted</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {examResults.results.map((r, i) => (
                          <tr key={r._id || i} className="hover:bg-slate-50">
                            <td className="py-3 px-4">
                              <span className="font-extrabold text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                                #{r.rank || i + 1}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <div className="font-semibold text-slate-800">{r.student?.name || "Student"}</div>
                              <div className="text-xs text-slate-400">{r.student?.email}</div>
                            </td>
                            <td className="py-3 px-4 text-center font-bold text-slate-800">
                              {r.obtainedMarks} / {r.totalMarks || examResults.exam?.totalMarks}
                            </td>
                            <td className="py-3 px-4 text-center">
                              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-green-50 text-green-700 border border-green-200">
                                {Math.round(r.accuracy || 0)}%
                              </span>
                            </td>
                            <td className="py-3 px-4 text-right text-xs text-slate-400">
                              {r.createdAt ? new Date(r.createdAt).toLocaleDateString("en-IN") : "—"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>

            <div className="p-6 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setExamResults(null)}
                className="px-5 py-2.5 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Exam Confirmation */}
      <ConfirmModal
        isOpen={!!examToDelete}
        onClose={() => setExamToDelete(null)}
        onConfirm={confirmDeleteExam}
        title="Delete Exam"
        message={`Are you sure you want to delete "${examToDelete?.title}"? All attempts and submissions will be affected.`}
        confirmLabel="Delete Exam"
        danger={true}
      />
    </div>
  );
}
