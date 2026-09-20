import { useState, useEffect, useRef } from "react";
import api from "../../config/api";
import {
  ClipboardList, Plus, Search, Layers, BarChart3, Trash2, X, Save,
  CheckCircle2, Eye, EyeOff, Image as ImageIcon, Upload, Download,
  RefreshCw, Users, Calendar, FileSpreadsheet, Archive, ChevronLeft,
  ChevronRight, Clock, AlertCircle,
} from "lucide-react";
import { alertSuccess, alertError, confirmDialog } from "../../utils/alert";
import ConfirmModal from "../../components/shared/ConfirmModal";
import Pagination from "../../components/shared/Pagination";
import { parseCSV, downloadCSVTemplate } from "../../utils/csv";
import { downloadExamResultSheet } from "../../utils/examResultPdf";

const statusColors = {
  LIVE: "bg-emerald-50 text-emerald-700 border-emerald-200",
  PUBLISHED: "bg-emerald-50 text-emerald-700 border-emerald-200",
  SCHEDULED: "bg-blue-50 text-blue-700 border-blue-200",
  CLOSED: "bg-slate-100 text-slate-600 border-slate-200",
  ARCHIVED: "bg-purple-50 text-purple-700 border-purple-200",
  DRAFT: "bg-amber-50 text-amber-700 border-amber-200",
};

const statusDotColors = {
  LIVE: "bg-emerald-500",
  PUBLISHED: "bg-emerald-500",
  SCHEDULED: "bg-blue-500",
  CLOSED: "bg-slate-400",
  ARCHIVED: "bg-purple-500",
  DRAFT: "bg-amber-500",
};

const emptyQuestion = () => ({
  questionText: "",
  questionImage: null,
  questionImagePreview: "",
  difficulty: "Medium",
  marks: 4,
  negativeMarks: 1,
  explanation: "",
  options: [
    { text: "", image: null, imagePreview: "" },
    { text: "", image: null, imagePreview: "" },
    { text: "", image: null, imagePreview: "" },
    { text: "", image: null, imagePreview: "" },
  ],
  correctAnswer: 0,
});

const inputClass =
  "w-full min-h-11 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-green-500 focus:ring-4 focus:ring-green-500/10";

const labelClass =
  "mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-slate-500";

export default function TeacherExams() {
  const [activeTab, setActiveTab] = useState("exams");
  const [exams, setExams] = useState([]);
  const [archived, setArchived] = useState([]);
  const [batches, setBatches] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [meta, setMeta] = useState({ total: 0, pages: 1 });
  const [bankMeta, setBankMeta] = useState({ total: 0, pages: 1 });
  const [bankPage, setBankPage] = useState(1);
  const [showWizard, setShowWizard] = useState(false);
  const [wizardStep, setWizardStep] = useState(1);
  const [savingExam, setSavingExam] = useState(false);
  const [examToDelete, setExamToDelete] = useState(null);
  const [examResults, setExamResults] = useState(null);
  const [loadingResults, setLoadingResults] = useState(false);

  const [draftQuestions, setDraftQuestions] = useState([]);
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [qForm, setQForm] = useState(emptyQuestion());
  const [csvPreview, setCsvPreview] = useState([]);
  const csvInputRef = useRef(null);

  const [examForm, setExamForm] = useState({
    title: "",
    description: "",
    testType: "MOCK_TEST",
    batch: "",
    duration: 60,
    marksPerCorrect: 4,
    negativePerWrong: 1,
    startTime: "",
    endTime: "",
    maxAttempts: 1,
    instructions: "",
    resultPublishMode: "IMMEDIATE",
    resultPublishAt: "",
    publishNow: false,
  });

  const rankedSubmissionRows = (examResults?.results || []).slice().sort((a, b) => {
    const scoreDiff = (b.obtainedMarks || 0) - (a.obtainedMarks || 0);
    if (scoreDiff !== 0) return scoreDiff;
    return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
  }).map((row, index) => ({ ...row, rank: index + 1 }));

  const fetchExams = async () => {
    setLoading(true);
    try {
      const [examsRes, batchRes, subjRes] = await Promise.all([
        api.get(`/exams?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`),
        api.get("/batches"),
        api.get("/academics/subjects"),
      ]);
      setExams(examsRes.data?.data?.exams || []);
      setMeta({
        total: examsRes.data?.data?.total || 0,
        pages: examsRes.data?.data?.pages || 1,
      });
      setBatches(batchRes.data?.data?.batches || []);
      setSubjects(subjRes.data?.data?.subjects || []);
    } catch {
      // ignore
    }
    setLoading(false);
  };

  const fetchBank = async () => {
    try {
      const { data } = await api.get(`/exams/bank?page=${bankPage}&limit=${limit}`);
      setArchived(data.data?.exams || []);
      setBankMeta({ total: data.data?.total || 0, pages: data.data?.pages || 1 });
    } catch {
      setArchived([]);
    }
  };

  useEffect(() => {
    fetchExams();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit, search]);

  useEffect(() => {
    if (activeTab === "bank") fetchBank();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, bankPage, limit]);

  const resetWizard = () => {
    setWizardStep(1);
    setDraftQuestions([]);
    setCsvPreview([]);
    setQForm(emptyQuestion());
    setExamForm({
      title: "",
      description: "",
      testType: "MOCK_TEST",
      batch: "",
      duration: 60,
      marksPerCorrect: 4,
      negativePerWrong: 1,
      startTime: "",
      endTime: "",
      maxAttempts: 1,
      instructions: "",
      resultPublishMode: "IMMEDIATE",
      resultPublishAt: "",
      publishNow: false,
    });
  };

  const addDraftQuestion = (q) => {
    setDraftQuestions((prev) => [...prev, q]);
  };

  const removeDraftQuestion = (idx) => {
    setDraftQuestions((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleAddQuestionToDraft = (e) => {
    e.preventDefault();
    if (qForm.options.some((o) => !o.text.trim())) {
      alertError("All four options need text");
      return;
    }
    addDraftQuestion({ ...qForm });
    setQForm(emptyQuestion());
    setShowQuestionForm(false);
    alertSuccess("Question added to this exam");
  };

  const handleCSV = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const parsed = parseCSV(evt.target.result);
        if (parsed.length === 0) {
          alertError("No valid rows found. Check the CSV headers.");
          return;
        }
        setCsvPreview(parsed);
        alertSuccess(`${parsed.length} rows ready to import`);
      } catch {
        alertError("Could not parse CSV file");
      }
    };
    reader.readAsText(file);
  };

  const commitCSVToDraft = () => {
    if (csvPreview.length === 0) return;
    const shaped = csvPreview.map((r) => ({
      questionText: r.questionText,
      questionImage: null,
      questionImagePreview: "",
      difficulty: r.difficulty || "Medium",
      marks: r.marks || examForm.marksPerCorrect,
      negativeMarks: r.negativeMarks || examForm.negativePerWrong,
      explanation: r.explanation || "",
      options: r.options.map((o) => ({ text: o.text, image: null, imagePreview: "" })),
      correctAnswer: r.correctAnswer || 0,
    }));
    setDraftQuestions((prev) => [...prev, ...shaped]);
    setCsvPreview([]);
    alertSuccess(`${shaped.length} questions added — you can now add images to any of them`);
  };

  const createExamWithQuestions = async () => {
    if (!examForm.batch) {
      alertError("Select a batch — every exam belongs to one batch");
      return;
    }
    if (!examForm.startTime || !examForm.endTime) {
      alertError("Start and end times are required");
      return;
    }
    if (draftQuestions.length === 0) {
      alertError("Add at least one question to this exam");
      return;
    }
    if (examForm.resultPublishMode === "SCHEDULED" && !examForm.resultPublishAt) {
      alertError("Set a date/time for scheduled result publishing");
      return;
    }

    let createdExamId = null;
    setSavingExam(true);
    try {
      const totalMarks = draftQuestions.reduce(
        (sum, q) => sum + Number(q.marks || examForm.marksPerCorrect),
        0
      );

      const { data: created } = await api.post("/exams", {
        ...examForm,
        totalQuestions: draftQuestions.length,
        totalMarks,
        duration: Number(examForm.duration),
        maxAttempts: Number(examForm.maxAttempts),
        marksPerCorrect: Number(examForm.marksPerCorrect),
        negativePerWrong: Number(examForm.negativePerWrong),
        questions: [],
        publishNow: false,
      });

      createdExamId = created.data.exam._id;

      for (const q of draftQuestions) {
        const fd = new FormData();
        fd.append("questionText", q.questionText);
        fd.append("difficulty", q.difficulty);
        fd.append("marks", q.marks);
        fd.append("negativeMarks", q.negativeMarks);
        fd.append("explanation", q.explanation || "");
        fd.append("correctAnswer", q.correctAnswer);
        fd.append(
          "options",
          JSON.stringify(q.options.map((o) => ({ text: o.text })))
        );
        if (q.questionImage) fd.append("questionImage", q.questionImage);
        q.options.forEach((opt, i) => {
          if (opt.image) fd.append(`optionImage_${i}`, opt.image);
        });
        await api.post(`/exams/${createdExamId}/questions`, fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      if (examForm.publishNow) {
        await api.put(`/exams/${createdExamId}/publish`);
      }

      alertSuccess("Exam created with its own question set");
      setShowWizard(false);
      resetWizard();
      fetchExams();
    } catch (err) {
      if (createdExamId) {
        try {
          await api.delete(`/exams/${createdExamId}`);
        } catch {
          // ignore cleanup failure
        }
      }
      alertError(err.response?.data?.message || "Failed to create exam. No partial exam was kept.");
    } finally {
      setSavingExam(false);
    }
  };

  const handlePublish = async (id) => {
    try {
      await api.put(`/exams/${id}/publish`);
      alertSuccess("Exam is now LIVE");
      fetchExams();
    } catch (err) {
      alertError(err.response?.data?.message || "Failed to publish");
    }
  };

  const handleClose = async (id) => {
    const ok = await confirmDialog({
      title: "Close & archive exam?",
      text: "The exam moves to the Question Bank archive where it can be reused, published for study, or downloaded.",
      confirmText: "Close & Archive",
    });
    if (!ok) return;
    try {
      await api.put(`/exams/${id}/close`);
      alertSuccess("Exam closed and archived to Question Bank");
      fetchExams();
    } catch {
      alertError("Failed to close exam");
    }
  };

  const handlePublishResults = async (id) => {
    try {
      await api.put(`/exams/${id}/publish-results`, { publish: true });
      alertSuccess("Results published to students");
      fetchExams();
    } catch {
      alertError("Failed to publish results");
    }
  };

  const handleStudyToggle = async (exam) => {
    try {
      await api.put(`/exams/${exam._id}/study-visibility`, {
        studyVisible: !exam.studyVisible,
      });
      alertSuccess(
        exam.studyVisible ? "Hidden from students" : "Published for student study"
      );
      fetchBank();
    } catch {
      alertError("Failed to update visibility");
    }
  };

  const showManualResultPublishButton = (exam) => {
    return exam.resultPublishMode !== "IMMEDIATE" && !exam.resultsPublished;
  };

  const handleReconduct = async (exam) => {
    try {
      await api.post(`/exams/${exam._id}/reconduct`, {
        title: `${exam.title} (Reconduct)`,
      });
      alertSuccess("New exam draft created from archive");
      setActiveTab("exams");
      fetchExams();
    } catch {
      alertError("Failed to reconduct");
    }
  };

  const handleDownload = async (exam) => {
    try {
      const { data } = await api.get(`/exams/${exam._id}/download`);
      const blob = new Blob([JSON.stringify(data.data.pack, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${exam.title.replace(/\s+/g, "-")}.json`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      alertError("Failed to download exam");
    }
  };

  const handleDeleteExam = async () => {
    if (!examToDelete) return;
    try {
      await api.delete(`/exams/${examToDelete._id}`);
      alertSuccess("Exam deleted");
      setExamToDelete(null);
      fetchExams();
      if (activeTab === "bank") fetchBank();
    } catch {
      alertError("Failed to delete");
    }
  };

  const handleOpenResults = async (exam) => {
    setLoadingResults(true);
    setExamResults({ exam, results: [], analytics: null });
    try {
      const { data } = await api.get(`/exams/${exam._id}/results`);
      setExamResults(data.data);
      setActiveTab("submissions");
    } catch {
      alertError("Failed to load results");
      setExamResults(null);
    } finally {
      setLoadingResults(false);
    }
  };

  const tabs = [
    { id: "exams", label: "Exams", icon: ClipboardList },
    { id: "bank", label: "Question Bank", icon: Archive },
    { id: "submissions", label: "Submissions", icon: BarChart3 },
  ];

  return (
    <div className="min-h-full space-y-6 p-3 sm:p-5 lg:p-7 bg-slate-50">
      
      {/* Header */}
      <section className="relative overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-6 lg:p-8">
        <div className="absolute -right-20 -top-24 h-56 w-56 rounded-full bg-green-100/60 blur-3xl" />
        <div className="absolute -bottom-24 -left-20 h-56 w-56 rounded-full bg-emerald-100/50 blur-3xl" />

        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-brand-green sm:text-[11px]">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
              Examination Management
            </div>
            <h1 className="font-heading text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              Exam Manager
            </h1>
            <p className="mt-1.5 max-w-2xl text-sm leading-6 text-slate-500">
              Create unique exams, conduct them, and archive papers to the Question Bank.
            </p>
          </div>

          <button
            onClick={() => {
              resetWizard();
              setShowWizard(true);
            }}
            className="inline-flex min-h-11 w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-green-700 hover:shadow-lg hover:shadow-green-600/10 sm:w-auto"
          >
            <Plus className="h-4 w-4" />
            Create New Exam
          </button>
        </div>
      </section>

      {/* Tabs - Mobile Icon Only, Desktop Text */}
      <div className="grid grid-cols-3 gap-2 rounded-2xl bg-slate-100/80 p-1.5 sm:inline-flex sm:w-auto sm:gap-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`flex min-h-12 items-center justify-center gap-2 rounded-xl px-3 text-sm font-semibold transition sm:justify-start sm:px-5 ${
              activeTab === tab.id
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500 hover:bg-white/70 hover:text-slate-700"
            }`}
          >
            <tab.icon className="h-5 w-5 shrink-0" />
            <span className="hidden sm:inline truncate">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* ─── EXAMS TAB ─── */}
      {activeTab === "exams" && (
        <div className="space-y-4">
          <section className="rounded-[1.5rem] border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
            <div className="relative min-w-0">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                placeholder="Search exams..."
                className={`${inputClass} bg-slate-50/50 pl-10`}
              />
            </div>
          </section>

          {loading ? (
            <div className="grid gap-3">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex gap-4">
                    <div className="h-11 w-11 shrink-0 animate-pulse rounded-xl bg-slate-100" />
                    <div className="min-w-0 flex-1">
                      <div className="h-4 w-40 animate-pulse rounded bg-slate-100" />
                      <div className="mt-3 h-6 w-2/3 animate-pulse rounded bg-slate-100" />
                      <div className="mt-4 flex gap-3">
                        <div className="h-3 w-24 animate-pulse rounded bg-slate-100" />
                        <div className="h-3 w-20 animate-pulse rounded bg-slate-100" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : exams.length === 0 ? (
            <div className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white px-5 py-14 text-center shadow-sm sm:py-20">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-green-50 text-brand-green">
                <ClipboardList className="h-7 w-7" />
              </div>
              <h3 className="mt-5 text-base font-extrabold text-slate-700">No exams yet</h3>
              <p className="mx-auto mt-1.5 max-w-sm text-sm leading-6 text-slate-400">
                Create your first exam with its own questions using the button above.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {exams.map((exam) => {
                const status = exam.status || "DRAFT";
                return (
                  <article
                    key={exam._id}
                    className="group relative min-w-0 overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white p-4 shadow-sm transition duration-300 hover:border-slate-300 hover:shadow-lg hover:shadow-slate-900/5 sm:p-5"
                  >
                    <div className={`absolute -right-12 -top-12 h-28 w-28 rounded-full opacity-40 blur-3xl ${
                      status === "LIVE" || status === "PUBLISHED" ? "bg-emerald-100" : status === "SCHEDULED" ? "bg-blue-100" : status === "DRAFT" ? "bg-amber-100" : "bg-slate-100"
                    }`} />

                    <div className="relative flex min-w-0 flex-col gap-4 lg:flex-row lg:items-center">
                      <div className="flex min-w-0 flex-1 items-start gap-3">
                        <div className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-slate-500 sm:flex">
                          <ClipboardList className="h-5 w-5" />
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex min-w-0 flex-wrap items-center gap-2">
                            <span className={`inline-flex max-w-full items-center gap-1.5 rounded-full border px-2.5 py-1 text-[9px] font-bold uppercase tracking-wide ${statusColors[status] || statusColors.DRAFT}`}>
                              <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${statusDotColors[status] || statusDotColors.DRAFT}`} />
                              {status}
                            </span>
                            <span className="max-w-full truncate rounded-full border border-indigo-100 bg-indigo-50 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wide text-indigo-700">
                              {exam.testType?.replace(/_/g, " ")}
                            </span>
                            {exam.batch?.name && (
                              <span className="max-w-full truncate rounded-full border border-blue-100 bg-blue-50 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wide text-blue-700">
                                {exam.batch.name}
                              </span>
                            )}
                            {exam.resultPublishMode && (
                              <span className="max-w-full truncate rounded-full border border-amber-100 bg-amber-50 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wide text-amber-700">
                                Results: {exam.resultPublishMode}
                              </span>
                            )}
                          </div>

                          <h3 className="mt-2 truncate text-sm font-extrabold text-slate-800 sm:text-base">
                            {exam.title}
                          </h3>

                          <div className="mt-3 flex min-w-0 flex-wrap gap-x-4 gap-y-2 text-[11px] font-medium text-slate-500">
                            <span className="inline-flex items-center gap-1.5">
                              <ClipboardList className="h-3.5 w-3.5 shrink-0 text-slate-400" /> {exam.totalQuestions} Qs
                            </span>
                            <span className="inline-flex items-center gap-1.5">
                              <Clock className="h-3.5 w-3.5 shrink-0 text-slate-400" /> {exam.duration} min
                            </span>
                            <span className="inline-flex items-center gap-1.5">
                              <BarChart3 className="h-3.5 w-3.5 shrink-0 text-slate-400" /> {exam.totalMarks} Marks
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Actions Grid */}
                      <div className="grid min-w-0 grid-cols-3 gap-2 sm:flex sm:flex-wrap lg:w-auto lg:shrink-0 lg:flex-col lg:items-stretch">
                        <button
                          type="button"
                          onClick={() => handleOpenResults(exam)}
                          className="inline-flex min-h-10 min-w-0 items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 text-[10px] font-bold text-slate-600 transition hover:bg-slate-100 sm:text-xs"
                          title="Results"
                        >
                          <BarChart3 className="h-3.5 w-3.5 shrink-0" />
                          <span className="hidden sm:inline truncate">Results</span>
                        </button>

                        {exam.status !== "LIVE" && exam.status !== "CLOSED" && exam.status !== "PUBLISHED" && (
                          <button
                            type="button"
                            onClick={() => handlePublish(exam._id)}
                            className="inline-flex min-h-10 min-w-0 items-center justify-center gap-1.5 rounded-xl border border-green-200 bg-green-50 px-3 text-[10px] font-bold text-green-700 transition hover:bg-green-100 sm:text-xs"
                            title="Go Live"
                          >
                            <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                            <span className="hidden sm:inline truncate">Go Live</span>
                          </button>
                        )}

                        {(exam.status === "LIVE" || exam.status === "PUBLISHED") && (
                          <button
                            type="button"
                            onClick={() => handleClose(exam._id)}
                            className="inline-flex min-h-10 min-w-0 items-center justify-center gap-1.5 rounded-xl border border-purple-200 bg-purple-50 px-3 text-[10px] font-bold text-purple-700 transition hover:bg-purple-100 sm:text-xs"
                            title="Close & Archive"
                          >
                            <Archive className="h-3.5 w-3.5 shrink-0" />
                            <span className="hidden sm:inline truncate">Close & Archive</span>
                          </button>
                        )}

                        {showManualResultPublishButton(exam) && (
                          <button
                            type="button"
                            onClick={() => handlePublishResults(exam._id)}
                            className="inline-flex min-h-10 min-w-0 items-center justify-center gap-1.5 rounded-xl border border-amber-200 bg-amber-50 px-3 text-[10px] font-bold text-amber-700 transition hover:bg-amber-100 sm:text-xs col-span-2 sm:col-span-1"
                            title="Publish Results"
                          >
                            <Eye className="h-3.5 w-3.5 shrink-0" />
                            <span className="hidden sm:inline truncate">Publish Results</span>
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() => setExamToDelete(exam)}
                          className="inline-flex min-h-10 min-w-0 items-center justify-center gap-1.5 rounded-xl border border-red-100 bg-red-50 px-3 text-[10px] font-bold text-red-500 transition hover:bg-red-100 hover:text-red-600 sm:text-xs"
                          title="Delete"
                        >
                          <Trash2 className="h-3.5 w-3.5 shrink-0" />
                          <span className="hidden sm:inline truncate">Delete</span>
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
              
              <div className="pt-2">
                <Pagination
                  page={page}
                  totalPages={meta.pages}
                  totalItems={meta.total}
                  pageSize={limit}
                  onPageChange={setPage}
                  onPageSizeChange={(n) => {
                    setLimit(n);
                    setPage(1);
                  }}
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* ─── QUESTION BANK (ARCHIVE) TAB ─── */}
      {activeTab === "bank" && (
        <div className="space-y-4">
          <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4 text-xs font-medium leading-relaxed text-blue-800">
            The Question Bank is the archive of completed exam papers. Open a paper to reconduct it, publish it for student study, or download it. Nothing here is created manually.
          </div>

          {archived.length === 0 ? (
            <div className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white px-5 py-14 text-center shadow-sm sm:py-20">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-50 text-slate-400">
                <Archive className="h-7 w-7" />
              </div>
              <h3 className="mt-5 text-base font-extrabold text-slate-700">No archived exam papers</h3>
              <p className="mx-auto mt-1.5 max-w-sm text-sm leading-6 text-slate-400">
                Close a live exam to archive it here.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {archived.map((exam) => (
                <article
                  key={exam._id}
                  className="group relative min-w-0 overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white p-4 shadow-sm transition duration-300 hover:border-slate-300 hover:shadow-lg hover:shadow-slate-900/5 sm:p-5"
                >
                  <div className="relative flex min-w-0 flex-col gap-4 lg:flex-row lg:items-center">
                    <div className="flex min-w-0 flex-1 items-start gap-3">
                      <div className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-500 sm:flex">
                        <Archive className="h-5 w-5" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex min-w-0 flex-wrap items-center gap-2">
                          <span className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-purple-200 bg-purple-50 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wide text-purple-700">
                            <Archive className="h-3 w-3 shrink-0" /> Archived
                          </span>
                          {exam.batch?.name && (
                            <span className="max-w-full truncate rounded-full border border-blue-100 bg-blue-50 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wide text-blue-700">
                              {exam.batch.name}
                            </span>
                          )}
                          <span className={`max-w-full truncate rounded-full border px-2.5 py-1 text-[9px] font-bold uppercase tracking-wide ${
                            exam.studyVisible
                              ? "border-green-200 bg-green-50 text-green-700"
                              : "border-slate-200 bg-slate-50 text-slate-500"
                          }`}>
                            {exam.studyVisible ? "Visible to students" : "Hidden"}
                          </span>
                        </div>

                        <h3 className="mt-2 truncate text-sm font-extrabold text-slate-800 sm:text-base">
                          {exam.title}
                        </h3>

                        <div className="mt-3 flex min-w-0 flex-wrap gap-x-4 gap-y-2 text-[11px] font-medium text-slate-500">
                          <span className="inline-flex items-center gap-1.5">
                            <ClipboardList className="h-3.5 w-3.5 shrink-0 text-slate-400" /> {exam.totalQuestions} Qs
                          </span>
                          <span className="inline-flex items-center gap-1.5">
                            <Clock className="h-3.5 w-3.5 shrink-0 text-slate-400" /> {exam.duration} min
                          </span>
                          <span className="inline-flex items-center gap-1.5">
                            <BarChart3 className="h-3.5 w-3.5 shrink-0 text-slate-400" /> {exam.totalMarks} Marks
                          </span>
                          {exam.archivedAt && (
                            <span className="inline-flex items-center gap-1.5">
                              <Calendar className="h-3.5 w-3.5 shrink-0 text-slate-400" /> Archived {new Date(exam.archivedAt).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Actions Grid */}
                    <div className="grid min-w-0 grid-cols-2 gap-2 sm:flex sm:flex-wrap lg:w-auto lg:shrink-0 lg:flex-col lg:items-stretch">
                      <button
                        type="button"
                        onClick={() => handleReconduct(exam)}
                        className="inline-flex min-h-10 min-w-0 items-center justify-center gap-1.5 rounded-xl border border-green-200 bg-green-50 px-3 text-[10px] font-bold text-green-700 transition hover:bg-green-100 sm:text-xs"
                        title="Reconduct"
                      >
                        <RefreshCw className="h-3.5 w-3.5 shrink-0" />
                        <span className="hidden sm:inline truncate">Reconduct</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleStudyToggle(exam)}
                        className="inline-flex min-h-10 min-w-0 items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 text-[10px] font-bold text-slate-600 transition hover:bg-slate-100 sm:text-xs"
                        title={exam.studyVisible ? "Hide" : "Publish for Study"}
                      >
                        {exam.studyVisible ? (
                          <>
                            <EyeOff className="h-3.5 w-3.5 shrink-0" />
                            <span className="hidden sm:inline truncate">Hide</span>
                          </>
                        ) : (
                          <>
                            <Eye className="h-3.5 w-3.5 shrink-0" />
                            <span className="hidden sm:inline truncate">Publish for Study</span>
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDownload(exam)}
                        className="inline-flex min-h-10 min-w-0 items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 text-[10px] font-bold text-slate-600 transition hover:bg-slate-100 sm:text-xs"
                        title="Download"
                      >
                        <Download className="h-3.5 w-3.5 shrink-0" />
                        <span className="hidden sm:inline truncate">Download</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setExamToDelete(exam)}
                        className="inline-flex min-h-10 min-w-0 items-center justify-center gap-1.5 rounded-xl border border-red-100 bg-red-50 px-3 text-[10px] font-bold text-red-500 transition hover:bg-red-100 hover:text-red-600 sm:text-xs"
                        title="Delete"
                      >
                        <Trash2 className="h-3.5 w-3.5 shrink-0" />
                        <span className="hidden sm:inline truncate">Delete</span>
                      </button>
                    </div>
                  </div>
                </article>
              ))}
              
              <div className="pt-2">
                <Pagination
                  page={bankPage}
                  totalPages={bankMeta.pages}
                  totalItems={bankMeta.total}
                  pageSize={limit}
                  onPageChange={setBankPage}
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* ─── SUBMISSIONS TAB ─── */}
      {activeTab === "submissions" && (
        <div>
          {examResults ? (
            <div className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-100 p-5 sm:p-6">
                <span className="inline-flex max-w-full items-center gap-1.5 rounded-full bg-indigo-50 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-indigo-700 border border-indigo-100">
                  <BarChart3 className="h-3 w-3" /> Exam Submissions
                </span>
                <h2 className="mt-2 truncate text-lg font-extrabold text-slate-900 sm:text-xl">
                  {examResults.exam?.title}
                </h2>
              </div>

              <div className="p-5 sm:p-6 space-y-6">
                <div className="grid grid-cols-3 gap-3">
                  <div className="min-w-0 rounded-xl border border-slate-100 bg-slate-50 p-4 text-center">
                    <div className="truncate text-2xl font-extrabold text-slate-900">
                      {examResults.analytics?.totalSubmissions || examResults.results?.length || 0}
                    </div>
                    <div className="mt-1 truncate text-[10px] font-bold text-slate-500 uppercase tracking-wider">Submissions</div>
                  </div>
                  <div className="min-w-0 rounded-xl border border-slate-100 bg-slate-50 p-4 text-center">
                    <div className="truncate text-2xl font-extrabold text-slate-900">
                      {examResults.analytics?.avgScore || 0}
                    </div>
                    <div className="mt-1 truncate text-[10px] font-bold text-slate-500 uppercase tracking-wider">Avg Score</div>
                  </div>
                  <div className="min-w-0 rounded-xl border border-emerald-100 bg-emerald-50 p-4 text-center">
                    <div className="truncate text-2xl font-extrabold text-emerald-700">
                      {examResults.analytics?.highestScore || 0}
                    </div>
                    <div className="mt-1 truncate text-[10px] font-bold text-emerald-600 uppercase tracking-wider">Highest</div>
                  </div>
                </div>

                {rankedSubmissionRows.length > 0 ? (
                  <>
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => downloadExamResultSheet({
                          examTitle: examResults.exam?.title || "Exam Results",
                          rows: rankedSubmissionRows,
                          batchName: examResults.exam?.batch?.name || "General",
                          instituteName: "NEETVIDYA",
                        })}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 text-xs font-bold hover:bg-slate-50 transition shadow-sm"
                      >
                        <Download className="w-3.5 h-3.5" /> Download Result Sheet
                      </button>
                    </div>

                    <div className="space-y-4">
                      {rankedSubmissionRows.map((group) => (
                        <div key={group.userId || group.studentId || group.studentName} className="min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/50 p-4 shadow-sm">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 pb-3 border-b border-slate-200">
                            <div className="flex items-center gap-3 flex-wrap min-w-0">
                              <span className="shrink-0 text-xs font-extrabold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                                #{group.rank}
                              </span>
                              <div className="min-w-0">
                                <div className="font-bold text-slate-800 truncate">{group.studentName || "Student"}</div>
                                <div className="text-xs text-slate-500 truncate">ID: {group.studentId || "—"}</div>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 text-xs text-slate-600 flex-wrap">
                              <span className="px-2.5 py-1 rounded-full bg-white border border-slate-200 font-semibold">Attempts: {group.totalAttempts}</span>
                              <span className="px-2.5 py-1 rounded-full bg-white border border-slate-200 font-semibold">Latest: {group.obtainedMarks} / {group.totalMarks}</span>
                              <span className={`px-2.5 py-1 rounded-full font-bold border ${group.isPublished ? "bg-green-50 text-green-700 border-green-200" : "bg-amber-50 text-amber-700 border-amber-200"}`}>
                                {group.isPublished ? "Published" : "Pending"}
                              </span>
                            </div>
                          </div>

                          <div className="mt-3 space-y-2">
                            {group.attempts?.slice().sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)).map((attempt, idx) => (
                              <div key={attempt._id || idx} className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm">
                                <div className="flex items-center gap-3 flex-wrap">
                                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-1 rounded">Attempt {group.attempts.length - idx}</span>
                                  <span className="text-xs text-slate-400 font-medium">
                                    {attempt.createdAt ? new Date(attempt.createdAt).toLocaleString("en-IN", { dateStyle: "short", timeStyle: "short" }) : "—"}
                                  </span>
                                </div>

                                <div className="flex items-center gap-3 flex-wrap">
                                  <span className="font-bold text-slate-800">{attempt.obtainedMarks} / {attempt.totalMarks}</span>
                                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full ${attempt.isPublished ? "bg-green-50 text-green-700 border border-green-200" : "bg-amber-50 text-amber-700 border border-amber-200"}`}>
                                    {attempt.isPublished ? "Published" : "Pending"}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                    <Trophy className="h-10 w-10 mx-auto mb-3 text-slate-300" />
                    <p className="text-sm font-bold text-slate-600">No submissions recorded yet.</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white px-5 py-14 text-center shadow-sm sm:py-20">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-50 text-slate-400">
                <BarChart3 className="h-7 w-7" />
              </div>
              <h3 className="mt-5 text-base font-extrabold text-slate-700">No exam selected</h3>
              <p className="mx-auto mt-1.5 max-w-sm text-sm leading-6 text-slate-400">
                Select an exam from the Exams tab to view its submissions.
              </p>
            </div>
          )}
        </div>
      )}

      {/* ─── CREATE EXAM WIZARD MODAL ─── */}
      {showWizard && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/40 p-0 backdrop-blur-sm sm:items-center sm:p-4">
          <div className="flex max-h-[94dvh] w-full max-w-3xl flex-col overflow-hidden rounded-t-[1.75rem] bg-white shadow-2xl sm:max-h-[90vh] sm:rounded-[1.75rem]">
            
            {/* Wizard header */}
            <div className="flex shrink-0 items-start justify-between border-b border-slate-100 bg-white p-5 sm:p-6">
              <div className="min-w-0 pr-4">
                <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-green-50 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-brand-green border border-green-100">
                  <Plus className="h-3 w-3" /> New Examination
                </div>
                <h2 className="truncate text-lg font-extrabold text-slate-900 sm:text-xl">Create New Exam</h2>
                <p className="mt-1 text-xs text-slate-500">
                  Step {wizardStep} of 3 · {["Basic Details", "Add Questions", "Settings"][wizardStep - 1]}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowWizard(false)}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Steps indicator */}
            <div className="px-5 pt-5 flex items-center gap-2 shrink-0">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center gap-2 flex-1">
                  <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                    wizardStep >= s ? "bg-green-600 text-white shadow-sm" : "bg-slate-100 text-slate-400"
                  }`}>
                    {s}
                  </div>
                  {s < 3 && (
                    <div className={`h-0.5 flex-1 rounded transition-colors ${wizardStep > s ? "bg-green-600" : "bg-slate-100"}`} />
                  )}
                </div>
              ))}
            </div>

            {/* Wizard body */}
            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-5 sm:p-6 space-y-5">
              {wizardStep === 1 && (
                <div className="space-y-4">
                  <div>
                    <label className={labelClass}>Exam Title *</label>
                    <input
                      value={examForm.title}
                      onChange={(e) => setExamForm({ ...examForm, title: e.target.value })}
                      className={inputClass}
                      placeholder="e.g. NEET Mock Test #12 — Full Syllabus"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>Batch / Course *</label>
                      <select
                        value={examForm.batch}
                        onChange={(e) => setExamForm({ ...examForm, batch: e.target.value })}
                        className={inputClass}
                      >
                        <option value="">Select batch</option>
                        {batches.map((b) => (
                          <option key={b._id} value={b._id}>{b.name}</option>
                        ))}
                      </select>
                      <p className="text-[11px] text-slate-400 mt-1.5">Every exam belongs to exactly one batch.</p>
                    </div>
                    <div>
                      <label className={labelClass}>Test Type</label>
                      <select
                        value={examForm.testType}
                        onChange={(e) => setExamForm({ ...examForm, testType: e.target.value })}
                        className={inputClass}
                      >
                        <option value="MOCK_TEST">Mock Test</option>
                        <option value="CHAPTER_TEST">Chapter Test</option>
                        <option value="DPP">DPP</option>
                        <option value="UNIT_TEST">Unit Test</option>
                        <option value="PYQ">PYQ</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className={labelClass}>Duration (min)</label>
                      <input type="number" value={examForm.duration}
                        onChange={(e) => setExamForm({ ...examForm, duration: e.target.value })}
                        className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>Marks / Correct</label>
                      <input type="number" value={examForm.marksPerCorrect}
                        onChange={(e) => setExamForm({ ...examForm, marksPerCorrect: e.target.value })}
                        className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>Negative / Wrong</label>
                      <input type="number" value={examForm.negativePerWrong}
                        onChange={(e) => setExamForm({ ...examForm, negativePerWrong: e.target.value })}
                        className={inputClass} />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Max Attempts Allowed</label>
                    <input type="number" min="1" value={examForm.maxAttempts}
                      onChange={(e) => setExamForm({ ...examForm, maxAttempts: e.target.value })}
                      className={inputClass} />
                    <p className="text-[11px] text-slate-400 mt-1.5">Default is 1. Increase this to allow more than one attempt per learner.</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>Start Time *</label>
                      <input type="datetime-local" value={examForm.startTime}
                        onChange={(e) => setExamForm({ ...examForm, startTime: e.target.value })}
                        className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>End Time *</label>
                      <input type="datetime-local" value={examForm.endTime}
                        onChange={(e) => setExamForm({ ...examForm, endTime: e.target.value })}
                        className={inputClass} />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Instructions</label>
                    <textarea rows={3} value={examForm.instructions}
                      onChange={(e) => setExamForm({ ...examForm, instructions: e.target.value })}
                      className={`${inputClass} resize-none`}
                      placeholder="Shown to students before they begin..." />
                  </div>
                </div>
              )}

              {wizardStep === 2 && (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => setShowQuestionForm(true)}
                      className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-50 shadow-sm"
                    >
                      <Plus className="w-4 h-4 text-green-600" /> Create Question (UI)
                    </button>
                    <label className="inline-flex min-h-10 cursor-pointer items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-50 shadow-sm">
                      <FileSpreadsheet className="w-4 h-4 text-green-600" /> Import CSV
                      <input
                        ref={csvInputRef}
                        type="file"
                        accept=".csv"
                        className="hidden"
                        onChange={(e) => handleCSV(e.target.files[0])}
                      />
                    </label>
                    <button
                      type="button"
                      onClick={downloadCSVTemplate}
                      className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-transparent px-3 text-xs font-bold text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
                    >
                      <Download className="w-3.5 h-3.5" /> Template
                    </button>
                  </div>

                  {csvPreview.length > 0 && (
                    <div className="rounded-xl border border-green-200 bg-green-50 p-4 text-sm">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <span className="font-bold text-green-800">
                          {csvPreview.length} rows parsed from CSV
                        </span>
                        <button
                          type="button"
                          onClick={commitCSVToDraft}
                          className="inline-flex items-center justify-center text-xs font-bold bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition shadow-sm"
                        >
                          Add all to exam
                        </button>
                      </div>
                      <p className="text-xs text-green-700 mt-1.5 font-medium">
                        After adding, you can edit each question and attach images.
                      </p>
                    </div>
                  )}

                  {draftQuestions.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 p-10 text-center">
                      <Layers className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                      <p className="text-slate-500 text-sm font-medium">
                        No questions yet. Create one in the UI or import from CSV.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {draftQuestions.map((q, i) => (
                        <div key={i} className="flex min-w-0 items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-xs font-extrabold text-slate-600 border border-slate-200">
                            {i + 1}
                          </span>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-semibold text-slate-800 break-words line-clamp-2">{q.questionText}</p>
                            <div className="flex flex-wrap gap-1.5 mt-2">
                              {q.options.map((o, oi) => (
                                <span
                                  key={oi}
                                  className={`text-[11px] px-2 py-0.5 rounded-md border font-medium ${
                                    oi === q.correctAnswer
                                      ? "bg-green-50 text-green-700 border-green-200 font-bold"
                                      : "bg-slate-50 text-slate-500 border-slate-100"
                                  }`}
                                >
                                  {String.fromCharCode(65 + oi)}. {o.text || "—"}
                                </span>
                              ))}
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeDraftQuestion(i)}
                            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-300 transition hover:bg-red-50 hover:text-red-500"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {wizardStep === 3 && (
                <div className="space-y-4">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 space-y-4">
                    <h4 className="font-extrabold text-slate-800 text-sm uppercase tracking-wider">Result Publishing</h4>
                    <label className="flex items-center gap-3 text-sm text-slate-600 cursor-pointer font-medium">
                      <input
                        type="radio"
                        name="rpm"
                        checked={examForm.resultPublishMode === "IMMEDIATE"}
                        onChange={() => setExamForm({ ...examForm, resultPublishMode: "IMMEDIATE" })}
                        className="h-4 w-4 accent-green-600"
                      />
                      Publish result right after exam submission
                    </label>
                    <label className="flex items-center gap-3 text-sm text-slate-600 cursor-pointer font-medium">
                      <input
                        type="radio"
                        name="rpm"
                        checked={examForm.resultPublishMode === "MANUAL"}
                        onChange={() => setExamForm({ ...examForm, resultPublishMode: "MANUAL" })}
                        className="h-4 w-4 accent-green-600"
                      />
                      Publish manually later
                    </label>
                    <label className="flex items-center gap-3 text-sm text-slate-600 cursor-pointer font-medium">
                      <input
                        type="radio"
                        name="rpm"
                        checked={examForm.resultPublishMode === "SCHEDULED"}
                        onChange={() => setExamForm({ ...examForm, resultPublishMode: "SCHEDULED" })}
                        className="h-4 w-4 accent-green-600"
                      />
                      Publish at a scheduled time
                    </label>
                    {examForm.resultPublishMode === "SCHEDULED" && (
                      <input
                        type="datetime-local"
                        value={examForm.resultPublishAt}
                        onChange={(e) => setExamForm({ ...examForm, resultPublishAt: e.target.value })}
                        className={inputClass}
                      />
                    )}
                  </div>

                  <label className="flex items-start gap-4 text-sm text-slate-700 cursor-pointer rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-green-200 hover:bg-green-50/30">
                    <input
                      type="checkbox"
                      checked={examForm.publishNow}
                      onChange={(e) => setExamForm({ ...examForm, publishNow: e.target.checked })}
                      className="mt-0.5 h-4 w-4 accent-green-600 rounded"
                    />
                    <div>
                      <div className="font-bold text-slate-800">Publish exam immediately</div>
                      <div className="text-xs text-slate-500 mt-1 leading-relaxed">
                        Otherwise it stays a secret draft until you publish it manually.
                      </div>
                    </div>
                  </label>

                  <div className="flex gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-xs font-medium text-amber-800 leading-relaxed">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-amber-600" />
                    <span>
                      Draft exams are never visible to students, even those in the selected batch.
                      Only you and other admins/faculty can see them until published.
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Wizard footer */}
            <div className="shrink-0 border-t border-slate-100 bg-slate-50/50 p-4 sm:p-5 flex items-center justify-between gap-3 rounded-b-[1.75rem]">
              <button
                type="button"
                onClick={() => (wizardStep === 1 ? setShowWizard(false) : setWizardStep(wizardStep - 1))}
                className="inline-flex min-h-11 items-center gap-1.5 rounded-xl px-4 text-sm font-bold text-slate-600 transition hover:bg-slate-100"
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">{wizardStep === 1 ? "Cancel" : "Back"}</span>
              </button>

              {wizardStep < 3 ? (
                <button
                  type="button"
                  onClick={() => {
                    if (wizardStep === 1 && (!examForm.title || !examForm.batch)) {
                      alertError("Title and batch are required");
                      return;
                    }
                    setWizardStep(wizardStep + 1);
                  }}
                  className="inline-flex min-h-11 items-center gap-1.5 rounded-xl bg-green-600 px-5 text-sm font-bold text-white shadow-sm transition hover:bg-green-700 hover:shadow-lg hover:shadow-green-600/10"
                >
                  Next <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={createExamWithQuestions}
                  disabled={savingExam}
                  className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-green-600 px-5 text-sm font-bold text-white shadow-sm transition hover:bg-green-700 hover:shadow-lg hover:shadow-green-600/10 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Save className="w-4 h-4" />
                  {savingExam ? "Creating..." : `Create Exam (${draftQuestions.length} Q)`}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ─── ADD QUESTION (draft) MODAL ─── */}
      {showQuestionForm && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center bg-slate-950/40 p-0 backdrop-blur-sm sm:items-center sm:p-4">
          <div className="flex max-h-[94dvh] w-full max-w-3xl flex-col overflow-hidden rounded-t-[1.75rem] bg-white shadow-2xl sm:max-h-[90vh] sm:rounded-[1.75rem]">
            <div className="flex shrink-0 items-start justify-between border-b border-slate-100 bg-white p-5 sm:p-6">
              <div className="min-w-0 pr-4">
                <h2 className="truncate text-lg font-extrabold text-slate-900 sm:text-xl">Create Question</h2>
                <p className="mt-1 text-xs text-slate-500">Text + image questions and options</p>
              </div>
              <button
                type="button"
                onClick={() => setShowQuestionForm(false)}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleAddQuestionToDraft} className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-5 sm:p-6 space-y-5">
              <div>
                <label className={labelClass}>Question Text *</label>
                <textarea
                  required
                  rows={3}
                  value={qForm.questionText}
                  onChange={(e) => setQForm({ ...qForm, questionText: e.target.value })}
                  className={`${inputClass} resize-none`}
                />
              </div>

              <div>
                <label className={labelClass}>Question Image (optional)</label>
                <div className="flex items-center gap-3 flex-wrap">
                  <label className="inline-flex min-h-10 cursor-pointer items-center gap-2 rounded-xl border border-dashed border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-green-400 hover:bg-green-50">
                    <ImageIcon className="w-4 h-4 text-slate-400" /> Upload Image
                    <input type="file" accept="image/*" className="hidden"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) setQForm({ ...qForm, questionImage: file, questionImagePreview: URL.createObjectURL(file) });
                      }} />
                  </label>
                  {qForm.questionImagePreview && (
                    <img src={qForm.questionImagePreview} alt="Preview" className="h-16 rounded-xl border border-slate-200 object-cover shadow-sm" />
                  )}
                </div>
              </div>

              <div>
                <label className={labelClass}>Options (select correct, add optional images)</label>
                <div className="space-y-3">
                  {qForm.options.map((opt, idx) => (
                    <div key={idx} className={`flex min-w-0 items-center gap-2 rounded-xl border p-3 transition ${qForm.correctAnswer === idx ? "border-green-300 bg-green-50/50" : "border-slate-200 bg-slate-50/50"}`}>
                      <input type="radio" name="correct" checked={qForm.correctAnswer === idx}
                        onChange={() => setQForm({ ...qForm, correctAnswer: idx })}
                        className="h-4 w-4 shrink-0 accent-green-600" />
                      <span className="w-5 shrink-0 text-xs font-extrabold text-slate-500">{String.fromCharCode(65 + idx)}</span>
                      <input required value={opt.text}
                        onChange={(e) => {
                          const opts = [...qForm.options];
                          opts[idx] = { ...opts[idx], text: e.target.value };
                          setQForm({ ...qForm, options: opts });
                        }}
                        placeholder={`Option ${String.fromCharCode(65 + idx)}`}
                        className="min-w-0 flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/10" />
                      <label className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-slate-200 bg-white transition hover:bg-slate-50">
                        <ImageIcon className="w-4 h-4 text-slate-400" />
                        <input type="file" accept="image/*" className="hidden"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                              const opts = [...qForm.options];
                              opts[idx] = { ...opts[idx], image: file, imagePreview: URL.createObjectURL(file) };
                              setQForm({ ...qForm, options: opts });
                            }
                          }} />
                      </label>
                      {opt.imagePreview && <img src={opt.imagePreview} className="h-9 w-9 shrink-0 rounded-lg border border-slate-200 object-cover" alt="" />}
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className={labelClass}>Marks</label>
                  <input type="number" value={qForm.marks}
                    onChange={(e) => setQForm({ ...qForm, marks: e.target.value })}
                    className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Negative</label>
                  <input type="number" value={qForm.negativeMarks}
                    onChange={(e) => setQForm({ ...qForm, negativeMarks: e.target.value })}
                    className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Difficulty</label>
                  <select value={qForm.difficulty}
                    onChange={(e) => setQForm({ ...qForm, difficulty: e.target.value })}
                    className={inputClass}>
                    <option>Easy</option><option>Medium</option><option>Hard</option>
                  </select>
                </div>
              </div>

              <div>
                <label className={labelClass}>Explanation</label>
                <textarea rows={2} value={qForm.explanation}
                  onChange={(e) => setQForm({ ...qForm, explanation: e.target.value })}
                  className={`${inputClass} resize-none`} />
              </div>
            </form>

            <div className="shrink-0 border-t border-slate-100 bg-slate-50/50 p-4 sm:p-5 flex gap-3 rounded-b-[1.75rem]">
              <button type="button" onClick={() => setShowQuestionForm(false)}
                className="flex-1 min-h-11 rounded-xl border border-slate-200 bg-white text-sm font-bold text-slate-600 transition hover:bg-slate-50 shadow-sm">
                Cancel
              </button>
              <button type="submit" onClick={handleAddQuestionToDraft}
                className="flex-1 min-h-11 rounded-xl bg-green-600 text-sm font-bold text-white transition hover:bg-green-700 shadow-sm inline-flex items-center justify-center gap-2">
                <Save className="w-4 h-4" /> Add to Exam
              </button>
            </div>
          </div>
        </div>
      )}

      <ConfirmModal
        isOpen={!!examToDelete}
        onClose={() => setExamToDelete(null)}
        onConfirm={handleDeleteExam}
        title="Delete Exam"
        message={`Delete "${examToDelete?.title}"? All attempts will be affected.`}
        confirmLabel="Delete"
        danger={true}
      />
    </div>
  );
}