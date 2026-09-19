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

const statusColors = {
  LIVE: "bg-green-100 text-green-700 border-green-200",
  PUBLISHED: "bg-emerald-100 text-emerald-700 border-emerald-200",
  SCHEDULED: "bg-blue-100 text-blue-700 border-blue-200",
  CLOSED: "bg-slate-100 text-slate-600 border-slate-200",
  ARCHIVED: "bg-purple-100 text-purple-700 border-purple-200",
  DRAFT: "bg-yellow-100 text-yellow-700 border-yellow-200",
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

  // Draft questions are held client-side, then saved to the exam after creation.
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
    resultPublishMode: "MANUAL",
    resultPublishAt: "",
    publishNow: false,
  });

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

  // ─── Wizard: create exam (Basic → Questions → Settings) ───
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
      resultPublishMode: "MANUAL",
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

      // 1) Create the exam shell (questions are linked next).
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

      // 2) Add each question to THIS exam (with images).
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

      // 3) Publish now if requested.
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
          // ignore cleanup failure; the exam shell is invalid and should be checked manually
        }
      }
      alertError(err.response?.data?.message || "Failed to create exam. No partial exam was kept.");
    } finally {
      setSavingExam(false);
    }
  };

  // ─── Exam actions ───
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-extrabold text-2xl text-slate-900">Exam Manager</h1>
          <p className="text-slate-500 text-sm mt-1">
            Create a unique exam with its own questions, conduct it, then archive it to the Question Bank.
          </p>
        </div>
        <button
          onClick={() => {
            resetWizard();
            setShowWizard(true);
          }}
          className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2.5 rounded-xl transition shadow-sm text-sm"
        >
          <Plus className="w-4 h-4" /> Create New Exam
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-slate-100 rounded-xl w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-2 rounded-lg text-sm font-semibold transition flex items-center gap-2 ${
              activeTab === tab.id ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* ─── EXAMS TAB ─── */}
      {activeTab === "exams" && (
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search exams..."
              className="w-full pl-10 pr-4 py-2.5 border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition bg-white"
            />
          </div>

          {loading ? (
            <div className="flex items-center justify-center h-40">
              <div className="w-8 h-8 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : exams.length === 0 ? (
            <div className="bg-white border-slate-100 rounded-2xl p-12 text-center shadow-sm">
              <ClipboardList className="w-12 h-12 text-slate-200 mx-auto mb-4" />
              <h3 className="font-bold text-slate-600 mb-1">No exams yet</h3>
              <p className="text-slate-400 text-sm">Create your first exam with its own questions.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {exams.map((exam) => (
                <div key={exam._id} className="bg-white border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${statusColors[exam.status] || statusColors.DRAFT}`}>
                          ● {exam.status}
                        </span>
                        <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-700 font-semibold">
                          {exam.testType?.replace(/_/g, " ")}
                        </span>
                        {exam.batch?.name && (
                          <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 font-semibold border-blue-200">
                            {exam.batch.name}
                          </span>
                        )}
                        {exam.resultPublishMode && (
                          <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 font-semibold border-amber-200">
                            Results: {exam.resultPublishMode}
                          </span>
                        )}
                      </div>
                      <h3 className="font-bold text-slate-800 text-base truncate">{exam.title}</h3>
                      <div className="flex flex-wrap gap-4 text-xs text-slate-500 mt-2">
                        <span>{exam.totalQuestions} questions</span>
                        <span>{exam.duration} min</span>
                        <span>{exam.totalMarks} marks</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <button
                        onClick={() => handleOpenResults(exam)}
                        className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200"
                      >
                        <BarChart3 className="w-3.5 h-3.5 inline mr-1" /> Results
                      </button>
                      {exam.status !== "LIVE" && exam.status !== "CLOSED" && (
                        <button
                          onClick={() => handlePublish(exam._id)}
                          className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-green-50 text-green-700 hover:bg-green-100 border-green-200"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 inline mr-1" /> Go Live
                        </button>
                      )}
                      {exam.status === "LIVE" && (
                        <button
                          onClick={() => handleClose(exam._id)}
                          className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-purple-50 text-purple-700 hover:bg-purple-100 border-purple-200"
                        >
                          <Archive className="w-3.5 h-3.5 inline mr-1" /> Close & Archive
                        </button>
                      )}
                      {!exam.resultsPublished && (
                        <button
                          onClick={() => handlePublishResults(exam._id)}
                          className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-amber-50 text-amber-700 hover:bg-amber-100 border-amber-200"
                        >
                          Publish Results
                        </button>
                      )}
                      <button
                        onClick={() => setExamToDelete(exam)}
                        className="p-1.5 text-slate-400 hover:text-red-500 rounded transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
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
          )}
        </div>
      )}

      {/* ─── QUESTION BANK (ARCHIVE) TAB ─── */}
      {activeTab === "bank" && (
        <div className="space-y-4">
          <div className="bg-blue-50 border-blue-100 rounded-xl p-4 text-xs text-blue-800">
            The Question Bank is the archive of completed exam papers. Open a paper to reconduct it,
            publish it for student study, or download it. Nothing here is created manually.
          </div>

          {archived.length === 0 ? (
            <div className="bg-white border-slate-100 rounded-2xl p-12 text-center shadow-sm">
              <Archive className="w-12 h-12 text-slate-200 mx-auto mb-4" />
              <h3 className="font-bold text-slate-600 mb-1">No archived exam papers</h3>
              <p className="text-slate-400 text-sm">Close a live exam to archive it here.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {archived.map((exam) => (
                <div key={exam._id} className="bg-white border-slate-100 rounded-2xl p-5 shadow-sm">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span className="text-xs font-bold px-2.5 py-0.5 rounded-full border bg-purple-100 text-purple-700 border-purple-200">
                          <Archive className="w-3 h-3 inline mr-1" /> Archived
                        </span>
                        {exam.batch?.name && (
                          <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 font-semibold border-blue-200">
                            {exam.batch.name}
                          </span>
                        )}
                        <span
                          className={`text-xs px-2.5 py-0.5 rounded-full font-semibold border ${
                            exam.studyVisible
                              ? "bg-green-50 text-green-700 border-green-200"
                              : "bg-slate-50 text-slate-500 border-slate-200"
                          }`}
                        >
                          {exam.studyVisible ? "Visible to students" : "Hidden from students"}
                        </span>
                      </div>
                      <h3 className="font-bold text-slate-800 text-base truncate">{exam.title}</h3>
                      <div className="flex flex-wrap gap-4 text-xs text-slate-500 mt-2">
                        <span>{exam.totalQuestions} questions</span>
                        <span>{exam.duration} min</span>
                        <span>{exam.totalMarks} marks</span>
                        {exam.archivedAt && (
                          <span>Archived {new Date(exam.archivedAt).toLocaleDateString()}</span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <button
                        onClick={() => handleReconduct(exam)}
                        className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-green-50 text-green-700 hover:bg-green-100 border-green-200"
                      >
                        <RefreshCw className="w-3.5 h-3.5 inline mr-1" /> Reconduct
                      </button>
                      <button
                        onClick={() => handleStudyToggle(exam)}
                        className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200"
                      >
                        {exam.studyVisible ? (
                          <><EyeOff className="w-3.5 h-3.5 inline mr-1" /> Hide</>
                        ) : (
                          <><Eye className="w-3.5 h-3.5 inline mr-1" /> Publish for Study</>
                        )}
                      </button>
                      <button
                        onClick={() => handleDownload(exam)}
                        className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200"
                      >
                        <Download className="w-3.5 h-3.5 inline mr-1" /> Download
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <Pagination
                page={bankPage}
                totalPages={bankMeta.pages}
                totalItems={bankMeta.total}
                pageSize={limit}
                onPageChange={setBankPage}
              />
            </div>
          )}
        </div>
      )}

      {/* ─── SUBMISSIONS TAB ─── */}
      {activeTab === "submissions" && (
        <div>
          {examResults ? (
            <div className="bg-white rounded-2xl border-slate-100 p-6 space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-green-700 bg-green-50 px-2.5 py-1 rounded-full">
                  Exam Submissions
                </span>
                <h2 className="font-extrabold text-xl text-slate-900 mt-2">{examResults.exam?.title}</h2>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-slate-50 rounded-xl border-slate-100 text-center">
                  <div className="text-2xl font-extrabold text-slate-900">{examResults.analytics?.totalSubmissions || examResults.results?.length || 0}</div>
                  <div className="text-xs text-slate-500 mt-1">Submissions</div>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border-slate-100 text-center">
                  <div className="text-2xl font-extrabold text-slate-900">{examResults.analytics?.avgScore || 0}</div>
                  <div className="text-xs text-slate-500 mt-1">Average Score</div>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border-slate-100 text-center">
                  <div className="text-2xl font-extrabold text-slate-900">{examResults.analytics?.highestScore || 0}</div>
                  <div className="text-xs text-slate-500 mt-1">Highest</div>
                </div>
              </div>

              {examResults.results?.length > 0 ? (
                <div className="border border-slate-100 rounded-xl overflow-x-auto">
                  <table className="w-full text-sm min-w-[600px]">
                    <thead className="bg-slate-50 text-xs font-bold text-slate-500 uppercase sticky top-0">
                      <tr>
                        <th className="py-3 px-4 text-left">Rank</th>
                        <th className="py-3 px-4 text-left">Student</th>
                        <th className="py-3 px-4 text-center">Score</th>
                        <th className="py-3 px-4 text-center">Status</th>
                        <th className="py-3 px-4 text-right">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {examResults.results.map((r, i) => (
                        <tr key={r._id || i} className="hover:bg-slate-50">
                          <td className="py-3 px-4 font-bold text-xs">#{r.rank || i + 1}</td>
                          <td className="py-3 px-4 font-semibold text-slate-800">{r.student?.name || "Student"}</td>
                          <td className="py-3 px-4 text-center font-bold">{r.obtainedMarks} / {r.totalMarks || examResults.exam?.totalMarks}</td>
                          <td className="py-3 px-4 text-center">
                            {r.isPublished ? (
                              <span className="text-xs font-semibold text-green-600">Published</span>
                            ) : (
                              <span className="text-xs font-semibold text-amber-600">Pending</span>
                            )}
                          </td>
                          <td className="py-3 px-4 text-right text-xs text-slate-400">{r.createdAt ? new Date(r.createdAt).toLocaleDateString() : "—"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-8 text-slate-400 text-sm">No submissions recorded yet.</div>
              )}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-400">
              <BarChart3 className="w-12 h-12 mx-auto mb-3 text-slate-200" />
              <p className="font-semibold text-slate-500">Select an exam from the Exams tab to view submissions.</p>
            </div>
          )}
        </div>
      )}

      {/* ─── CREATE EXAM WIZARD ─── */}
      {showWizard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[92vh] flex flex-col overflow-hidden">
            {/* Wizard header */}
            <div className="p-5 border-b border-slate-100 flex items-center justify-between shrink-0">
              <div>
                <h2 className="font-extrabold text-xl text-slate-900">Create New Exam</h2>
                <p className="text-slate-500 text-xs mt-0.5">
                  Step {wizardStep} of 3 · {["Basic Details", "Add Questions", "Settings"][wizardStep - 1]}
                </p>
              </div>
              <button
                onClick={() => setShowWizard(false)}
                className="p-2 rounded-lg hover:bg-slate-100 text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Steps indicator */}
            <div className="px-5 pt-4 flex items-center gap-2 shrink-0">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center gap-2 flex-1">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                      wizardStep >= s ? "bg-green-600 text-white" : "bg-slate-100 text-slate-400"
                    }`}
                  >
                    {s}
                  </div>
                  {s < 3 && (
                    <div className={`h-0.5 flex-1 ${wizardStep > s ? "bg-green-600" : "bg-slate-100"}`} />
                  )}
                </div>
              ))}
            </div>

            {/* Wizard body */}
            <div className="p-5 overflow-y-auto flex-1 space-y-4">
              {wizardStep === 1 && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Exam Title *</label>
                    <input
                      value={examForm.title}
                      onChange={(e) => setExamForm({ ...examForm, title: e.target.value })}
                      className="w-full px-3 py-2.5 border-slate-200 rounded-xl text-sm"
                      placeholder="e.g. NEET Mock Test #12 — Full Syllabus"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Batch / Course *</label>
                      <select
                        value={examForm.batch}
                        onChange={(e) => setExamForm({ ...examForm, batch: e.target.value })}
                        className="w-full px-3 py-2.5 border-slate-200 rounded-xl text-sm bg-white"
                      >
                        <option value="">Select batch</option>
                        {batches.map((b) => (
                          <option key={b._id} value={b._id}>{b.name}</option>
                        ))}
                      </select>
                      <p className="text-[11px] text-slate-400 mt-1">Every exam belongs to exactly one batch.</p>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Test Type</label>
                      <select
                        value={examForm.testType}
                        onChange={(e) => setExamForm({ ...examForm, testType: e.target.value })}
                        className="w-full px-3 py-2.5 border-slate-200 rounded-xl text-sm bg-white"
                      >
                        <option value="MOCK_TEST">Mock Test</option>
                        <option value="CHAPTER_TEST">Chapter Test</option>
                        <option value="DPP">DPP</option>
                        <option value="UNIT_TEST">Unit Test</option>
                        <option value="PYQ">PYQ</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1.5">Duration (min)</label>
                      <input type="number" value={examForm.duration}
                        onChange={(e) => setExamForm({ ...examForm, duration: e.target.value })}
                        className="w-full px-3 py-2.5 border-slate-200 rounded-xl text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1.5">Marks / Correct</label>
                      <input type="number" value={examForm.marksPerCorrect}
                        onChange={(e) => setExamForm({ ...examForm, marksPerCorrect: e.target.value })}
                        className="w-full px-3 py-2.5 border-slate-200 rounded-xl text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1.5">Negative / Wrong</label>
                      <input type="number" value={examForm.negativePerWrong}
                        onChange={(e) => setExamForm({ ...examForm, negativePerWrong: e.target.value })}
                        className="w-full px-3 py-2.5 border-slate-200 rounded-xl text-sm" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1.5">Start Time *</label>
                      <input type="datetime-local" value={examForm.startTime}
                        onChange={(e) => setExamForm({ ...examForm, startTime: e.target.value })}
                        className="w-full px-3 py-2.5 border-slate-200 rounded-xl text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1.5">End Time *</label>
                      <input type="datetime-local" value={examForm.endTime}
                        onChange={(e) => setExamForm({ ...examForm, endTime: e.target.value })}
                        className="w-full px-3 py-2.5 border-slate-200 rounded-xl text-sm" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Instructions</label>
                    <textarea rows={2} value={examForm.instructions}
                      onChange={(e) => setExamForm({ ...examForm, instructions: e.target.value })}
                      className="w-full px-3 py-2.5 border-slate-200 rounded-xl text-sm resize-none"
                      placeholder="Shown to students before they begin..." />
                  </div>
                </>
              )}

              {wizardStep === 2 && (
                <>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setShowQuestionForm(true)}
                      className="inline-flex items-center gap-2 bg-white border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold px-4 py-2.5 rounded-xl text-sm"
                    >
                      <Plus className="w-4 h-4 text-green-600" /> Create Question (UI)
                    </button>
                    <label className="inline-flex items-center gap-2 bg-white border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold px-4 py-2.5 rounded-xl text-sm cursor-pointer">
                      <FileSpreadsheet className="w-4 h-4 text-green-600" /> Import CSV
                      <input
                        type="file"
                        accept=".csv"
                        className="hidden"
                        onChange={(e) => handleCSV(e.target.files[0])}
                      />
                    </label>
                    <button
                      onClick={downloadCSVTemplate}
                      className="inline-flex items-center gap-2 text-xs text-slate-500 hover:text-slate-700 px-2"
                    >
                      <Download className="w-3.5 h-3.5" /> Download template
                    </button>
                  </div>

                  {csvPreview.length > 0 && (
                    <div className="bg-green-50 border-green-100 rounded-xl p-4 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-green-800">
                          {csvPreview.length} rows parsed from CSV
                        </span>
                        <button
                          onClick={commitCSVToDraft}
                          className="text-xs font-bold bg-green-600 text-white px-3 py-1.5 rounded-lg"
                        >
                          Add all to exam
                        </button>
                      </div>
                      <p className="text-xs text-green-700 mt-1">
                        After adding, you can edit each question and attach images.
                      </p>
                    </div>
                  )}

                  {draftQuestions.length === 0 ? (
                    <div className="border border-dashed border-slate-200 rounded-xl p-10 text-center">
                      <Layers className="w-10 h-10 text-slate-200 mx-auto mb-3" />
                      <p className="text-slate-500 text-sm">
                        No questions yet. Create one in the UI or import from CSV.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {draftQuestions.map((q, i) => (
                        <div key={i} className="bg-white border-slate-100 rounded-xl p-4 flex items-start gap-3">
                          <span className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500 shrink-0">
                            {i + 1}
                          </span>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-slate-800 font-medium">{q.questionText}</p>
                            <div className="flex flex-wrap gap-1.5 mt-2">
                              {q.options.map((o, oi) => (
                                <span
                                  key={oi}
                                  className={`text-[11px] px-2 py-0.5 rounded border ${
                                    oi === q.correctAnswer
                                      ? "bg-green-50 text-green-700 border-green-200 font-semibold"
                                      : "bg-slate-50 text-slate-500 border-slate-100"
                                  }`}
                                >
                                  {String.fromCharCode(65 + oi)}. {o.text || "—"}
                                </span>
                              ))}
                            </div>
                          </div>
                          <button
                            onClick={() => removeDraftQuestion(i)}
                            className="p-1.5 text-slate-300 hover:text-red-500 rounded transition shrink-0"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}

              {wizardStep === 3 && (
                <>
                  <div className="bg-slate-50 border-slate-100 rounded-xl p-4 space-y-3">
                    <h4 className="font-bold text-slate-700 text-sm">Result Publishing</h4>
                    <label className="flex items-center gap-3 text-sm text-slate-600 cursor-pointer">
                      <input
                        type="radio"
                        name="rpm"
                        checked={examForm.resultPublishMode === "IMMEDIATE"}
                        onChange={() => setExamForm({ ...examForm, resultPublishMode: "IMMEDIATE" })}
                        className="accent-green-600"
                      />
                      Publish result right after exam submission
                    </label>
                    <label className="flex items-center gap-3 text-sm text-slate-600 cursor-pointer">
                      <input
                        type="radio"
                        name="rpm"
                        checked={examForm.resultPublishMode === "MANUAL"}
                        onChange={() => setExamForm({ ...examForm, resultPublishMode: "MANUAL" })}
                        className="accent-green-600"
                      />
                      Publish manually later
                    </label>
                    <label className="flex items-center gap-3 text-sm text-slate-600 cursor-pointer">
                      <input
                        type="radio"
                        name="rpm"
                        checked={examForm.resultPublishMode === "SCHEDULED"}
                        onChange={() => setExamForm({ ...examForm, resultPublishMode: "SCHEDULED" })}
                        className="accent-green-600"
                      />
                      Publish at a scheduled time
                    </label>
                    {examForm.resultPublishMode === "SCHEDULED" && (
                      <input
                        type="datetime-local"
                        value={examForm.resultPublishAt}
                        onChange={(e) => setExamForm({ ...examForm, resultPublishAt: e.target.value })}
                        className="w-full px-3 py-2.5 border-slate-200 rounded-xl text-sm bg-white"
                      />
                    )}
                  </div>

                  <label className="flex items-center gap-3 text-sm text-slate-700 cursor-pointer bg-slate-50 border-slate-100 rounded-xl p-4">
                    <input
                      type="checkbox"
                      checked={examForm.publishNow}
                      onChange={(e) => setExamForm({ ...examForm, publishNow: e.target.checked })}
                      className="accent-green-600 w-4 h-4"
                    />
                    <div>
                      <div className="font-semibold">Publish exam immediately</div>
                      <div className="text-xs text-slate-500">
                        Otherwise it stays a secret draft until you publish it.
                      </div>
                    </div>
                  </label>

                  <div className="bg-amber-50 border-amber-100 rounded-xl p-4 text-xs text-amber-800 flex gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>
                      Draft exams are never visible to students, even those in the selected batch.
                      Only you and other admins/faculty can see them until published.
                    </span>
                  </div>
                </>
              )}
            </div>

            {/* Wizard footer */}
            <div className="p-5 border-t border-slate-100 flex items-center justify-between gap-3 shrink-0">
              <button
                onClick={() => (wizardStep === 1 ? setShowWizard(false) : setWizardStep(wizardStep - 1))}
                className="px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 transition inline-flex items-center gap-1"
              >
                <ChevronLeft className="w-4 h-4" />
                {wizardStep === 1 ? "Cancel" : "Back"}
              </button>

              {wizardStep < 3 ? (
                <button
                  onClick={() => {
                    if (wizardStep === 1 && (!examForm.title || !examForm.batch)) {
                      alertError("Title and batch are required");
                      return;
                    }
                    setWizardStep(wizardStep + 1);
                  }}
                  className="px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl text-sm inline-flex items-center gap-1"
                >
                  Next <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={createExamWithQuestions}
                  disabled={savingExam}
                  className="px-5 py-2.5 bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white font-bold rounded-xl text-sm inline-flex items-center gap-2"
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
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between shrink-0">
              <div>
                <h2 className="font-extrabold text-lg text-slate-900">Create Question</h2>
                <p className="text-slate-500 text-xs mt-0.5">Text + image questions and options</p>
              </div>
              <button onClick={() => setShowQuestionForm(false)} className="p-2 rounded-lg hover:bg-slate-100">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddQuestionToDraft} className="p-5 space-y-4 overflow-y-auto flex-1">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Question Text *</label>
                <textarea
                  required
                  rows={3}
                  value={qForm.questionText}
                  onChange={(e) => setQForm({ ...qForm, questionText: e.target.value })}
                  className="w-full px-3 py-2.5 border-slate-200 rounded-xl text-sm resize-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Question Image (optional)</label>
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 px-4 py-2.5 border-dashed border-slate-300 rounded-xl cursor-pointer hover:bg-slate-50 text-sm text-slate-600">
                    <ImageIcon className="w-4 h-4" /> Upload Image
                    <input type="file" accept="image/*" className="hidden"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) setQForm({ ...qForm, questionImage: file, questionImagePreview: URL.createObjectURL(file) });
                      }} />
                  </label>
                  {qForm.questionImagePreview && (
                    <img src={qForm.questionImagePreview} alt="Preview" className="h-16 rounded-lg border" />
                  )}
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-2">
                  Options (select correct, add optional images)
                </label>
                <div className="space-y-2.5">
                  {qForm.options.map((opt, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border-slate-200">
                      <input type="radio" name="correct" checked={qForm.correctAnswer === idx}
                        onChange={() => setQForm({ ...qForm, correctAnswer: idx })}
                        className="w-4 h-4 accent-green-600" />
                      <span className="w-6 text-xs font-bold text-slate-500">{String.fromCharCode(65 + idx)}.</span>
                      <input required value={opt.text}
                        onChange={(e) => {
                          const opts = [...qForm.options];
                          opts[idx] = { ...opts[idx], text: e.target.value };
                          setQForm({ ...qForm, options: opts });
                        }}
                        placeholder={`Option ${String.fromCharCode(65 + idx)}`}
                        className="flex-1 px-3 py-2 border-slate-200 rounded-lg text-sm" />
                      <label className="p-2 rounded-lg border-slate-200 cursor-pointer hover:bg-slate-100">
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
                      {opt.imagePreview && <img src={opt.imagePreview} className="h-8 rounded border" alt="" />}
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1.5">Marks</label>
                  <input type="number" value={qForm.marks}
                    onChange={(e) => setQForm({ ...qForm, marks: e.target.value })}
                    className="w-full px-3 py-2 border-slate-200 rounded-lg text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1.5">Negative</label>
                  <input type="number" value={qForm.negativeMarks}
                    onChange={(e) => setQForm({ ...qForm, negativeMarks: e.target.value })}
                    className="w-full px-3 py-2 border-slate-200 rounded-lg text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1.5">Difficulty</label>
                  <select value={qForm.difficulty}
                    onChange={(e) => setQForm({ ...qForm, difficulty: e.target.value })}
                    className="w-full px-3 py-2 border-slate-200 rounded-lg text-sm bg-white">
                    <option>Easy</option><option>Medium</option><option>Hard</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Explanation</label>
                <textarea rows={2} value={qForm.explanation}
                  onChange={(e) => setQForm({ ...qForm, explanation: e.target.value })}
                  className="w-full px-3 py-2.5 border-slate-200 rounded-xl text-sm resize-none" />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowQuestionForm(false)}
                  className="flex-1 py-2.5 border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50">Cancel</button>
                <button type="submit"
                  className="flex-1 py-2.5 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl">
                  Add to Exam
                </button>
              </div>
            </form>
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

