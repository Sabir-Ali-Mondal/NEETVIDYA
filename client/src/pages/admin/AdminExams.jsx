import { useState, useEffect } from "react";
import api from "../../config/api";
import {
  ClipboardList,
  Plus,
  Search,
  Clock,
  Users,
  Calendar,
  BarChart3,
  Pencil,
  Trash2,
  X,
  Save,
  CheckCircle2,
  AlertCircle,
  Trophy,
} from "lucide-react";
import { alertSuccess, alertError } from "../../utils/alert";
import ConfirmModal from "../../components/shared/ConfirmModal";

const statusColors = {
  LIVE: "bg-green-50 text-green-700 border-green-200",
  SCHEDULED: "bg-blue-50 text-blue-700 border-blue-200",
  CLOSED: "bg-slate-100 text-slate-600 border-slate-200",
  DRAFT: "bg-amber-50 text-amber-700 border-amber-200",
};

const statusDotColors = {
  LIVE: "bg-green-500",
  SCHEDULED: "bg-blue-500",
  CLOSED: "bg-slate-400",
  DRAFT: "bg-amber-500",
};

const typeColors = {
  MOCK_TEST: "bg-purple-50 text-purple-700 border-purple-100",
  CHAPTER_TEST: "bg-indigo-50 text-indigo-700 border-indigo-100",
  UNIT_TEST: "bg-cyan-50 text-cyan-700 border-cyan-100",
  DPP: "bg-rose-50 text-rose-700 border-rose-100",
  PYQ: "bg-orange-50 text-orange-700 border-orange-100",
};

const inputClass =
  "w-full min-h-11 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-green-500 focus:ring-4 focus:ring-green-500/10";

const labelClass =
  "mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-slate-500";

export default function AdminExams() {
  const [exams, setExams] = useState([]);
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
    batch: "",
    totalQuestions: 180,
    totalMarks: 720,
    marksPerCorrect: 4,
    negativePerWrong: 1,
    duration: 180,
    startTime: "",
    endTime: "",
    maxAttempts: 1,
    instructions:
      "General NEET Examination Instructions: 4 marks for correct, -1 mark for wrong answer.",
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
      const { data: bRes } = await api.get("/batches");
      setBatches(bRes.data.data?.batches || []);
    } catch {}
  };

  useEffect(() => {
    fetchExams();
    fetchDependencies();
  }, []);

  const handleCreateExam = async (e) => {
    e.preventDefault();

    if (!form.batch) {
      alertError("Please select a batch — every exam belongs to one batch");
      return;
    }

    if (!form.startTime || !form.endTime) {
      alertError("Please provide both start and end times");
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
        batch: form.batch,
        questions: form.questions || [],
      });

      alertSuccess("Exam created in DRAFT status");
      setShowCreate(false);
      fetchExams();
    } catch (err) {
      alertError(err.response?.data?.message || "Failed to create exam");
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
        batch:
          typeof editingExam.batch === "object"
            ? editingExam.batch?._id
            : editingExam.batch,
        totalQuestions: Number(editingExam.totalQuestions || 10),
        totalMarks: Number(editingExam.totalMarks || 40),
        duration: Number(editingExam.duration || 60),
        startTime: editingExam.startTime,
        endTime: editingExam.endTime,
        maxAttempts: Number(editingExam.maxAttempts || 1),
        instructions: editingExam.instructions,
      });

      alertSuccess("Exam updated successfully");
      setEditingExam(null);
      fetchExams();
    } catch (err) {
      alertError(err.response?.data?.message || "Failed to update exam");
    } finally {
      setSavingExam(false);
    }
  };

  const handlePublish = async (examId) => {
    try {
      await api.put(`/exams/${examId}/publish`);
      alertSuccess("Exam is now LIVE for students");
      fetchExams();
    } catch (err) {
      alertError(err.response?.data?.message || "Failed to publish exam");
    }
  };

  const handleClose = async (examId) => {
    try {
      await api.put(`/exams/${examId}/close`);
      alertSuccess("Exam has been closed");
      fetchExams();
    } catch (err) {
      alertError(err.response?.data?.message || "Failed to close exam");
    }
  };

  const handleOpenResults = async (exam) => {
    setLoadingResults(true);
    setExamResults({
      exam,
      results: [],
      analytics: null,
    });

    try {
      const { data } = await api.get(`/exams/${exam._id}/results`);
      setExamResults(data.data);
    } catch (err) {
      alertError(err.response?.data?.message || "Failed to load results");
      setExamResults(null);
    } finally {
      setLoadingResults(false);
    }
  };

  const confirmDeleteExam = async () => {
    if (!examToDelete) return;

    try {
      await api.delete(`/exams/${examToDelete._id}`);
      alertSuccess("Exam deleted successfully");
      setExamToDelete(null);
      fetchExams();
    } catch (err) {
      alertError(err.response?.data?.message || "Failed to delete exam");
    }
  };

  const filtered = exams.filter((e) => {
    const matchSearch = e.title
      ?.toLowerCase()
      .includes(search.toLowerCase());

    const matchStatus =
      statusFilter === "All" || e.status === statusFilter;

    return matchSearch && matchStatus;
  });

  const summaryStats = [
    {
      label: "Live",
      count: exams.filter((e) => e.status === "LIVE").length,
      color: "bg-green-50 border-green-100 text-green-700",
      dot: "bg-green-500",
    },
    {
      label: "Scheduled",
      count: exams.filter((e) => e.status === "SCHEDULED").length,
      color: "bg-blue-50 border-blue-100 text-blue-700",
      dot: "bg-blue-500",
    },
    {
      label: "Draft",
      count: exams.filter((e) => e.status === "DRAFT").length,
      color: "bg-amber-50 border-amber-100 text-amber-700",
      dot: "bg-amber-500",
    },
    {
      label: "Closed",
      count: exams.filter((e) => e.status === "CLOSED").length,
      color: "bg-slate-50 border-slate-200 text-slate-600",
      dot: "bg-slate-400",
    },
  ];

  const formatDate = (date) =>
    date
      ? new Date(date).toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })
      : "—";

  const formatDateTime = (date) =>
    date
      ? new Date(date).toLocaleString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
          hour: "numeric",
          minute: "2-digit",
        })
      : "—";

  return (
    <div className="min-h-full space-y-5 p-3 sm:space-y-6 sm:p-5 lg:p-7">
      {/* Header */}
      <section className="relative overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-6 lg:p-7">
        <div className="absolute -right-20 -top-24 h-56 w-56 rounded-full bg-green-100/60 blur-3xl" />
        <div className="absolute -bottom-24 -left-20 h-56 w-56 rounded-full bg-emerald-100/50 blur-3xl" />

        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-brand-green sm:text-[11px]">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
              Examination Management
            </div>

            <h1 className="font-heading text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              Exams & Tests
            </h1>

            <p className="mt-1.5 max-w-2xl text-sm leading-6 text-slate-500">
              Create, schedule, publish and monitor NEET examinations from one
              place.
            </p>
          </div>

          <button
            onClick={() => setShowCreate(true)}
            className="inline-flex min-h-11 w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-green-700 hover:shadow-lg hover:shadow-green-600/10 sm:w-auto"
          >
            <Plus className="h-4 w-4" />
            Create Exam
          </button>
        </div>
      </section>

      {/* Filters */}
      <section className="rounded-[1.5rem] border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative min-w-0 flex-1">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search exams..."
              className={`${inputClass} bg-slate-50/50 pl-10`}
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className={`${inputClass} bg-slate-50/50 sm:w-44`}
          >
            {["All", "LIVE", "SCHEDULED", "DRAFT", "CLOSED"].map((s) => (
              <option key={s} value={s}>
                {s === "All" ? "All Statuses" : s}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-3 flex items-center justify-between px-1">
          <p className="text-[11px] text-slate-400">
            Showing{" "}
            <span className="font-bold text-slate-600">
              {filtered.length}
            </span>{" "}
            of{" "}
            <span className="font-bold text-slate-600">{exams.length}</span>{" "}
            exams
          </p>

          {(search || statusFilter !== "All") && (
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setStatusFilter("All");
              }}
              className="text-[11px] font-bold text-brand-green hover:underline"
            >
              Clear filters
            </button>
          )}
        </div>
      </section>

      {/* Summary */}
      <section className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
        {summaryStats.map((stat) => (
          <div
            key={stat.label}
            className={`rounded-[1.25rem] border p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${stat.color}`}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider">
                {stat.label}
              </span>

              <span className={`h-2 w-2 rounded-full ${stat.dot}`} />
            </div>

            <div className="mt-2 text-2xl font-extrabold tracking-tight">
              {stat.count}
            </div>
          </div>
        ))}
      </section>

      {/* Exams */}
      {loading ? (
        <div className="grid gap-3">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex gap-4">
                <div className="h-11 w-11 shrink-0 animate-pulse rounded-xl bg-slate-100" />

                <div className="min-w-0 flex-1">
                  <div className="h-4 w-40 animate-pulse rounded bg-slate-100" />
                  <div className="mt-3 h-6 w-2/3 animate-pulse rounded bg-slate-100" />

                  <div className="mt-4 flex gap-3">
                    <div className="h-3 w-24 animate-pulse rounded bg-slate-100" />
                    <div className="h-3 w-20 animate-pulse rounded bg-slate-100" />
                    <div className="h-3 w-20 animate-pulse rounded bg-slate-100" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white px-5 py-14 text-center shadow-sm sm:py-20">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-green-50 text-brand-green">
            <ClipboardList className="h-7 w-7" />
          </div>

          <h3 className="mt-5 text-base font-extrabold text-slate-700">
            No exams found
          </h3>

          <p className="mx-auto mt-1.5 max-w-sm text-sm leading-6 text-slate-400">
            Create an exam using the button above or adjust your filters.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((exam) => {
            const status = exam.status || "DRAFT";

            return (
              <article
                key={exam._id}
                className="group relative min-w-0 overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white p-4 shadow-sm transition duration-300 hover:border-slate-300 hover:shadow-lg hover:shadow-slate-900/5 sm:p-5"
              >
                <div
                  className={`absolute -right-12 -top-12 h-28 w-28 rounded-full opacity-40 blur-3xl ${
                    status === "LIVE"
                      ? "bg-green-100"
                      : status === "SCHEDULED"
                        ? "bg-blue-100"
                        : status === "DRAFT"
                          ? "bg-amber-100"
                          : "bg-slate-100"
                  }`}
                />

                <div className="relative flex min-w-0 flex-col gap-4 lg:flex-row lg:items-center">
                  <div className="flex min-w-0 flex-1 items-start gap-3">
                    <div className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-slate-500 sm:flex">
                      <ClipboardList className="h-5 w-5" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex min-w-0 flex-wrap items-center gap-2">
                        <span
                          className={`inline-flex max-w-full items-center gap-1.5 rounded-full border px-2.5 py-1 text-[9px] font-bold uppercase tracking-wide ${
                            statusColors[status] || statusColors.DRAFT
                          }`}
                        >
                          <span
                            className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                              statusDotColors[status] ||
                              statusDotColors.DRAFT
                            }`}
                          />
                          {status}
                        </span>

                        <span
                          className={`max-w-full truncate rounded-full border px-2.5 py-1 text-[9px] font-bold uppercase tracking-wide ${
                            typeColors[exam.testType] ||
                            "border-slate-200 bg-slate-50 text-slate-600"
                          }`}
                        >
                          {exam.testType?.replace(/_/g, " ")}
                        </span>
                      </div>

                      <h3 className="mt-2 truncate text-sm font-extrabold text-slate-800 sm:text-base">
                        {exam.title}
                      </h3>

                      <div className="mt-3 flex min-w-0 flex-wrap gap-x-4 gap-y-2 text-[11px] text-slate-500">
                        <span className="inline-flex items-center gap-1.5">
                          <ClipboardList className="h-3.5 w-3.5 shrink-0" />
                          {exam.totalQuestions} questions
                        </span>

                        <span className="inline-flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5 shrink-0" />
                          {exam.duration} min
                        </span>

                        <span className="inline-flex items-center gap-1.5">
                          <BarChart3 className="h-3.5 w-3.5 shrink-0" />
                          {exam.totalMarks} marks
                        </span>

                        {exam.startTime && (
                          <span className="inline-flex items-center gap-1.5">
                            <Calendar className="h-3.5 w-3.5 shrink-0" />
                            {formatDate(exam.startTime)}
                          </span>
                        )}

                        {exam.maxAttempts && (
                          <span className="inline-flex items-center gap-1.5">
                            <Users className="h-3.5 w-3.5 shrink-0" />
                            {exam.maxAttempts} attempts
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions — icon-only on mobile, icon+text on sm+ */}
                  <div className="grid min-w-0 grid-cols-3 gap-2 sm:flex sm:flex-wrap lg:w-auto lg:shrink-0 lg:flex-col lg:items-stretch">
                    <button
                      type="button"
                      onClick={() => handleOpenResults(exam)}
                      title="Submissions"
                      className="inline-flex min-h-10 min-w-0 items-center justify-center gap-1.5 rounded-xl border border-indigo-200 bg-indigo-50 px-3 text-[10px] font-bold text-indigo-700 transition hover:bg-indigo-100 sm:text-xs"
                    >
                      <BarChart3 className="h-3.5 w-3.5 shrink-0" />
                      <span className="hidden sm:inline truncate">Submissions</span>
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setEditingExam({
                          ...exam,
                          startTime: exam.startTime
                            ? new Date(exam.startTime)
                                .toISOString()
                                .slice(0, 16)
                            : "",
                          endTime: exam.endTime
                            ? new Date(exam.endTime)
                                .toISOString()
                                .slice(0, 16)
                            : "",
                        })
                      }
                      title="Edit"
                      className="inline-flex min-h-10 min-w-0 items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 text-[10px] font-bold text-slate-600 transition hover:bg-slate-100 sm:text-xs"
                    >
                      <Pencil className="h-3.5 w-3.5 shrink-0" />
                      <span className="hidden sm:inline truncate">Edit</span>
                    </button>

                    {exam.status !== "LIVE" && exam.status !== "CLOSED" && (
                      <button
                        type="button"
                        onClick={() => handlePublish(exam._id)}
                        title="Go Live"
                        className="inline-flex min-h-10 min-w-0 items-center justify-center gap-1.5 rounded-xl border border-green-200 bg-green-50 px-3 text-[10px] font-bold text-green-700 transition hover:bg-green-100 sm:text-xs"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                        <span className="hidden sm:inline truncate">Go Live</span>
                      </button>
                    )}

                    {exam.status === "LIVE" && (
                      <button
                        type="button"
                        onClick={() => handleClose(exam._id)}
                        title="Close Test"
                        className="inline-flex min-h-10 min-w-0 items-center justify-center gap-1.5 rounded-xl border border-amber-200 bg-amber-50 px-3 text-[10px] font-bold text-amber-700 transition hover:bg-amber-100 sm:text-xs"
                      >
                        <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                        <span className="hidden sm:inline truncate">Close Test</span>
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => setExamToDelete(exam)}
                      title="Delete"
                      className="inline-flex min-h-10 min-w-0 items-center justify-center gap-1.5 rounded-xl border border-red-100 bg-red-50 px-3 text-[10px] font-bold text-red-500 transition hover:bg-red-100 hover:text-red-600 sm:text-xs"
                    >
                      <Trash2 className="h-3.5 w-3.5 shrink-0" />
                      <span className="hidden sm:inline truncate">Delete</span>
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* Create Exam Modal */}
      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/40 p-0 backdrop-blur-sm sm:items-center sm:p-4">
          <div className="flex max-h-[94dvh] w-full max-w-2xl flex-col overflow-hidden rounded-t-[1.75rem] bg-white shadow-2xl sm:max-h-[90vh] sm:rounded-[1.75rem]">
            <div className="flex shrink-0 items-start justify-between border-b border-slate-100 bg-white p-5 sm:p-6">
              <div className="min-w-0">
                <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-green-50 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-brand-green">
                  <Plus className="h-3 w-3" />
                  New Examination
                </div>

                <h2 className="truncate text-lg font-extrabold text-slate-900 sm:text-xl">
                  Create New Exam
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Configure CBT test parameters and schedule.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowCreate(false)}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form
              onSubmit={handleCreateExam}
              className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-5 sm:p-6"
            >
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="md:col-span-2">
                  <label className={labelClass}>Exam Title *</label>
                  <input
                    required
                    value={form.title}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                    placeholder="e.g. All India Grand Mock Test – 01"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Test Type</label>
                  <select
                    value={form.testType}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        testType: e.target.value,
                      }))
                    }
                    className={inputClass}
                  >
                    <option value="MOCK_TEST">Mock Test</option>
                    <option value="CHAPTER_TEST">Chapter Test</option>
                    <option value="UNIT_TEST">Unit Test</option>
                    <option value="DPP">
                      Daily Practice Problem (DPP)
                    </option>
                    <option value="PYQ">
                      Previous Year Questions (PYQ)
                    </option>
                  </select>
                </div>

                <div>
                  <label className={labelClass}>Batch / Course *</label>
                  <select
                    required
                    value={form.batch}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        batch: e.target.value,
                      }))
                    }
                    className={inputClass}
                  >
                    <option value="">Select a batch</option>

                    {batches.map((b) => (
                      <option key={b._id} value={b._id}>
                        {b.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={labelClass}>Total Questions</label>
                  <input
                    type="number"
                    min="1"
                    value={form.totalQuestions}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        totalQuestions: e.target.value,
                      }))
                    }
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Total Marks</label>
                  <input
                    type="number"
                    min="1"
                    value={form.totalMarks}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        totalMarks: e.target.value,
                      }))
                    }
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Duration (Minutes)</label>
                  <input
                    type="number"
                    min="5"
                    value={form.duration}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        duration: e.target.value,
                      }))
                    }
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Max Attempts Allowed</label>
                  <input
                    type="number"
                    min="1"
                    value={form.maxAttempts}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        maxAttempts: e.target.value,
                      }))
                    }
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Start Time *</label>
                  <input
                    required
                    type="datetime-local"
                    value={form.startTime}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        startTime: e.target.value,
                      }))
                    }
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>End Time *</label>
                  <input
                    required
                    type="datetime-local"
                    value={form.endTime}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        endTime: e.target.value,
                      }))
                    }
                    className={inputClass}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className={labelClass}>Instructions</label>
                  <textarea
                    rows={4}
                    value={form.instructions}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        instructions: e.target.value,
                      }))
                    }
                    className={`${inputClass} resize-none`}
                  />
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-2 border-t border-slate-100 pt-4 sm:flex sm:justify-end sm:gap-3">
                <button
                  type="button"
                  onClick={() => setShowCreate(false)}
                  className="hidden min-h-11 rounded-xl border border-slate-200 px-5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 sm:block"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={savingExam}
                  className="col-span-2 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-green-600 px-5 text-sm font-bold text-white shadow-sm transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60 sm:col-span-1"
                >
                  <Save className="h-4 w-4" />
                  {savingExam ? "Creating..." : "Save Draft Exam"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Exam Modal */}
      {editingExam && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/40 p-0 backdrop-blur-sm sm:items-center sm:p-4">
          <div className="flex max-h-[94dvh] w-full max-w-2xl flex-col overflow-hidden rounded-t-[1.75rem] bg-white shadow-2xl sm:max-h-[90vh] sm:rounded-[1.75rem]">
            <div className="flex shrink-0 items-start justify-between border-b border-slate-100 bg-white p-5 sm:p-6">
              <div className="min-w-0">
                <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-slate-600">
                  <Pencil className="h-3 w-3" />
                  Examination Settings
                </div>

                <h2 className="truncate text-lg font-extrabold text-slate-900 sm:text-xl">
                  Edit Exam
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Update test configuration and schedule.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setEditingExam(null)}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form
              onSubmit={handleSaveEdit}
              className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-5 sm:p-6"
            >
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="md:col-span-2">
                  <label className={labelClass}>Exam Title *</label>
                  <input
                    required
                    value={editingExam.title}
                    onChange={(e) =>
                      setEditingExam((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Test Type</label>
                  <select
                    value={editingExam.testType}
                    onChange={(e) =>
                      setEditingExam((prev) => ({
                        ...prev,
                        testType: e.target.value,
                      }))
                    }
                    className={inputClass}
                  >
                    <option value="MOCK_TEST">Mock Test</option>
                    <option value="CHAPTER_TEST">Chapter Test</option>
                    <option value="UNIT_TEST">Unit Test</option>
                    <option value="DPP">
                      Daily Practice Problem (DPP)
                    </option>
                    <option value="PYQ">
                      Previous Year Questions (PYQ)
                    </option>
                  </select>
                </div>

                <div>
                  <label className={labelClass}>Batch / Course *</label>
                  <select
                    value={
                      editingExam.batch?._id ||
                      editingExam.batch ||
                      ""
                    }
                    onChange={(e) =>
                      setEditingExam((prev) => ({
                        ...prev,
                        batch: e.target.value,
                      }))
                    }
                    className={inputClass}
                  >
                    <option value="">Select a batch</option>

                    {batches.map((b) => (
                      <option key={b._id} value={b._id}>
                        {b.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={labelClass}>Duration (Minutes)</label>
                  <input
                    type="number"
                    value={editingExam.duration}
                    onChange={(e) =>
                      setEditingExam((prev) => ({
                        ...prev,
                        duration: e.target.value,
                      }))
                    }
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Total Questions</label>
                  <input
                    type="number"
                    value={editingExam.totalQuestions}
                    onChange={(e) =>
                      setEditingExam((prev) => ({
                        ...prev,
                        totalQuestions: e.target.value,
                      }))
                    }
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Start Time</label>
                  <input
                    type="datetime-local"
                    value={editingExam.startTime}
                    onChange={(e) =>
                      setEditingExam((prev) => ({
                        ...prev,
                        startTime: e.target.value,
                      }))
                    }
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>End Time</label>
                  <input
                    type="datetime-local"
                    value={editingExam.endTime}
                    onChange={(e) =>
                      setEditingExam((prev) => ({
                        ...prev,
                        endTime: e.target.value,
                      }))
                    }
                    className={inputClass}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className={labelClass}>Instructions</label>
                  <textarea
                    rows={4}
                    value={editingExam.instructions || ""}
                    onChange={(e) =>
                      setEditingExam((prev) => ({
                        ...prev,
                        instructions: e.target.value,
                      }))
                    }
                    className={`${inputClass} resize-none`}
                  />
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-2 border-t border-slate-100 pt-4 sm:flex sm:justify-end sm:gap-3">
                <button
                  type="button"
                  onClick={() => setEditingExam(null)}
                  className="hidden min-h-11 rounded-xl border border-slate-200 px-5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 sm:block"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={savingExam}
                  className="col-span-2 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-green-600 px-5 text-sm font-bold text-white shadow-sm transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60 sm:col-span-1"
                >
                  <Save className="h-4 w-4" />
                  {savingExam ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Exam Results Modal */}
      {examResults && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/40 p-0 backdrop-blur-sm sm:items-center sm:p-4">
          <div className="flex max-h-[94dvh] w-full max-w-4xl flex-col overflow-hidden rounded-t-[1.75rem] bg-white shadow-2xl sm:max-h-[90vh] sm:rounded-[1.75rem]">
            <div className="flex shrink-0 items-start justify-between border-b border-slate-100 bg-white p-5 sm:p-6">
              <div className="min-w-0">
                <span className="inline-flex max-w-full items-center gap-1.5 rounded-full bg-indigo-50 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-indigo-700">
                  <BarChart3 className="h-3 w-3" />
                  Submissions & Analytics
                </span>

                <h2 className="mt-2 truncate text-lg font-extrabold text-slate-900 sm:text-xl">
                  {examResults.exam?.title}
                </h2>

                {examResults.exam?.startTime && (
                  <p className="mt-1 text-xs text-slate-400">
                    Scheduled for{" "}
                    {formatDateTime(examResults.exam.startTime)}
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={() => setExamResults(null)}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-5 sm:p-6">
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                <div className="min-w-0 rounded-xl border border-slate-100 bg-slate-50 p-3 text-center sm:p-4">
                  <div className="truncate text-xl font-extrabold text-slate-900 sm:text-2xl">
                    {examResults.analytics?.totalSubmissions || 0}
                  </div>

                  <div className="mt-1 truncate text-[10px] font-medium text-slate-500 sm:text-xs">
                    Total Attempts
                  </div>
                </div>

                <div className="min-w-0 rounded-xl border border-slate-100 bg-slate-50 p-3 text-center sm:p-4">
                  <div className="truncate text-xl font-extrabold text-slate-900 sm:text-2xl">
                    {examResults.analytics?.avgScore || 0}
                  </div>

                  <div className="mt-1 truncate text-[10px] font-medium text-slate-500 sm:text-xs">
                    Average Score
                  </div>
                </div>

                <div className="min-w-0 rounded-xl border border-green-100 bg-green-50 p-3 text-center sm:p-4">
                  <div className="truncate text-xl font-extrabold text-green-700 sm:text-2xl">
                    {examResults.analytics?.highestScore || 0}
                  </div>

                  <div className="mt-1 truncate text-[10px] font-medium text-green-700/70 sm:text-xs">
                    Highest Score
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-800">
                      Student Rank List
                    </h3>

                    <p className="mt-0.5 text-[11px] text-slate-400">
                      Performance of students who attempted this test.
                    </p>
                  </div>

                  <Trophy className="h-5 w-5 shrink-0 text-amber-500" />
                </div>

                {loadingResults ? (
                  <div className="flex justify-center py-14">
                    <div className="h-8 w-8 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent" />
                  </div>
                ) : !examResults.results ||
                  examResults.results.length === 0 ? (
                  <div className="rounded-2xl border border-slate-100 bg-slate-50 px-5 py-12 text-center">
                    <Trophy className="mx-auto mb-3 h-10 w-10 text-slate-300" />

                    <p className="text-sm font-semibold text-slate-600">
                      No submissions recorded yet
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      Students who attempt this test will appear here.
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-2 lg:hidden">
                      {examResults.results.map((r, i) => (
                        <div
                          key={r._id || i}
                          className="min-w-0 overflow-hidden rounded-xl border border-slate-100 bg-white p-3 shadow-sm"
                        >
                          <div className="flex min-w-0 items-start gap-3">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-xs font-extrabold text-slate-700">
                              #{r.rank || i + 1}
                            </div>

                            <div className="min-w-0 flex-1">
                              <div className="truncate text-sm font-bold text-slate-800">
                                {r.student?.name || "Student"}
                              </div>

                              <div className="truncate text-[10px] text-slate-400">
                                {r.student?.email}
                              </div>

                              <div className="mt-2 flex flex-wrap items-center gap-2">
                                <span className="text-xs font-bold text-slate-700">
                                  {r.obtainedMarks} /{" "}
                                  {r.totalMarks ||
                                    examResults.exam?.totalMarks}
                                </span>

                                <span className="rounded-full border border-green-200 bg-green-50 px-2 py-0.5 text-[10px] font-bold text-green-700">
                                  {Math.round(r.accuracy || 0)}% accuracy
                                </span>
                              </div>
                            </div>

                            <div className="shrink-0 text-right text-[10px] text-slate-400">
                              {r.createdAt
                                ? new Date(
                                    r.createdAt
                                  ).toLocaleDateString("en-IN", {
                                    day: "numeric",
                                    month: "short",
                                  })
                                : "—"}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="hidden overflow-hidden rounded-xl border border-slate-100 lg:block">
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead className="bg-slate-50">
                            <tr className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                              <th className="px-4 py-3 text-left">Rank</th>
                              <th className="px-4 py-3 text-left">
                                Candidate
                              </th>
                              <th className="px-4 py-3 text-center">
                                Score
                              </th>
                              <th className="px-4 py-3 text-center">
                                Accuracy
                              </th>
                              <th className="px-4 py-3 text-right">
                                Submitted
                              </th>
                            </tr>
                          </thead>

                          <tbody className="divide-y divide-slate-100">
                            {examResults.results.map((r, i) => (
                              <tr
                                key={r._id || i}
                                className="transition hover:bg-slate-50"
                              >
                                <td className="px-4 py-3">
                                  <span className="rounded-lg bg-slate-100 px-2 py-1 text-xs font-extrabold text-slate-700">
                                    #{r.rank || i + 1}
                                  </span>
                                </td>

                                <td className="px-4 py-3">
                                  <div className="font-semibold text-slate-800">
                                    {r.student?.name || "Student"}
                                  </div>

                                  <div className="text-xs text-slate-400">
                                    {r.student?.email}
                                  </div>
                                </td>

                                <td className="px-4 py-3 text-center font-bold text-slate-800">
                                  {r.obtainedMarks} /{" "}
                                  {r.totalMarks ||
                                    examResults.exam?.totalMarks}
                                </td>

                                <td className="px-4 py-3 text-center">
                                  <span className="rounded-full border border-green-200 bg-green-50 px-2 py-1 text-xs font-semibold text-green-700">
                                    {Math.round(r.accuracy || 0)}%
                                  </span>
                                </td>

                                <td className="px-4 py-3 text-right text-xs text-slate-400">
                                  {r.createdAt
                                    ? new Date(
                                        r.createdAt
                                      ).toLocaleDateString("en-IN")
                                    : "—"}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="shrink-0 border-t border-slate-100 p-4 sm:p-5">
              <button
                type="button"
                onClick={() => setExamResults(null)}
                className="hidden min-h-11 rounded-xl border border-slate-200 px-5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 sm:ml-auto sm:block"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

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