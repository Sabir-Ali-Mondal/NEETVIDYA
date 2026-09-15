import { useState, useEffect } from "react";
import api from "../../config/api";
import {
  ClipboardList, Plus, Search, Clock, Users, Calendar, PlayCircle,
  BarChart3, Pencil, Trash2, X, Save, CheckCircle2, AlertCircle, Trophy
} from "lucide-react";
import toast from "react-hot-toast";
import ConfirmModal from "../../components/shared/ConfirmModal";

const statusColors = {
  LIVE: "bg-green-100 text-green-700 border-green-200",
  SCHEDULED: "bg-blue-100 text-blue-700 border-blue-200",
  CLOSED: "bg-slate-100 text-slate-600 border-slate-200",
  DRAFT: "bg-yellow-100 text-yellow-700 border-yellow-200",
};

export default function TeacherExams() {
  const [exams, setExams] = useState([]);
  const [courses, setCourses] = useState([]);
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [showCreate, setShowCreate] = useState(false);
  const [editingExam, setEditingExam] = useState(null);
  const [examResults, setExamResults] = useState(null);
  const [loadingResults, setLoadingResults] = useState(false);
  const [examToDelete, setExamToDelete] = useState(null);
  const [savingExam, setSavingExam] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    testType: "CHAPTER_TEST",
    course: "",
    totalQuestions: 45,
    totalMarks: 180,
    marksPerCorrect: 4,
    negativePerWrong: 1,
    duration: 60,
    startTime: "",
    endTime: "",
    maxAttempts: 1,
    instructions: "General CBT Test Instructions: Select one best option per MCQ. Marking: +4 / -1.",
  });

  const fetchExams = async () => {
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
      toast.success("Exam published and live for students");
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
      toast.success("Exam deleted");
      setExamToDelete(null);
      fetchExams();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete exam");
    }
  };

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
        <button
          onClick={() => setShowCreate(true)}
          className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2.5 rounded-xl transition shadow-sm text-sm"
        >
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
                <div className="flex flex-wrap gap-2 sm:flex-col sm:items-end">
                  <button
                    onClick={() => handleOpenResults(exam)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-green-50 text-green-700 hover:bg-green-100 transition border border-green-200"
                  >
                    <BarChart3 className="w-3.5 h-3.5" /> View Results
                  </button>
                  <button
                    onClick={() =>
                      setEditingExam({
                        ...exam,
                        startTime: exam.startTime ? new Date(exam.startTime).toISOString().slice(0, 16) : "",
                        endTime: exam.endTime ? new Date(exam.endTime).toISOString().slice(0, 16) : "",
                      })
                    }
                    className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200 transition"
                  >
                    <Pencil className="w-3.5 h-3.5" /> Edit
                  </button>
                  {exam.status !== "LIVE" && exam.status !== "CLOSED" && (
                    <button
                      onClick={() => handlePublish(exam._id)}
                      className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 transition"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" /> Publish
                    </button>
                  )}
                  {exam.status === "LIVE" && (
                    <button
                      onClick={() => handleClose(exam._id)}
                      className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200 transition"
                    >
                      <AlertCircle className="w-3.5 h-3.5" /> Close
                    </button>
                  )}
                  <button
                    onClick={() => setExamToDelete(exam)}
                    className="p-1.5 text-slate-400 hover:text-red-500 rounded transition"
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
                <h2 className="font-extrabold text-xl text-slate-900">Create New Exam / DPP</h2>
                <p className="text-slate-500 text-xs mt-0.5">Setup a CBT test for your classes and batches.</p>
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
                    placeholder="e.g. Physics Weekly Practice Test – Mechanics"
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
                    <option value="CHAPTER_TEST">Chapter Test</option>
                    <option value="UNIT_TEST">Unit Test</option>
                    <option value="DPP">Daily Practice Problem (DPP)</option>
                    <option value="MOCK_TEST">Mock Test</option>
                    <option value="PYQ">PYQ Test</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Course</label>
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
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Max Attempts</label>
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
                  {savingExam ? "Creating..." : "Save Exam"}
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
                <p className="text-slate-500 text-xs mt-0.5">Modify test details and availability window.</p>
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
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-green-50 text-green-700">
                  Student Results
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
              <div className="grid grid-cols-3 gap-3">
                <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl text-center">
                  <div className="text-2xl font-extrabold text-slate-900">
                    {examResults.analytics?.totalSubmissions || 0}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">Submissions</div>
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

              <div>
                <h3 className="font-bold text-slate-800 text-sm mb-3">Submissions List</h3>
                {loadingResults ? (
                  <div className="py-12 flex justify-center">
                    <div className="w-8 h-8 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
                  </div>
                ) : !examResults.results || examResults.results.length === 0 ? (
                  <div className="text-center py-12 bg-slate-50 rounded-xl border border-slate-100">
                    <Trophy className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                    <p className="text-sm font-semibold text-slate-600">No submissions recorded yet</p>
                    <p className="text-xs text-slate-400 mt-0.5">Students who take this exam will appear here.</p>
                  </div>
                ) : (
                  <div className="border border-slate-100 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                      <thead className="bg-slate-50 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                        <tr>
                          <th className="py-3 px-4 text-left">Rank</th>
                          <th className="py-3 px-4 text-left">Student</th>
                          <th className="py-3 px-4 text-center">Score</th>
                          <th className="py-3 px-4 text-center">Accuracy</th>
                          <th className="py-3 px-4 text-right">Date</th>
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
        message={`Are you sure you want to delete "${examToDelete?.title}"?`}
        confirmLabel="Delete Exam"
        danger={true}
      />
    </div>
  );
}
