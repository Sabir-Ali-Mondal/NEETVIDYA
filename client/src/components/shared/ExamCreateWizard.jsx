import { useState, useRef } from "react";
import {
  Plus,
  Layers,
  X,
  Save,
  Image as ImageIcon,
  Download,
  FileSpreadsheet,
  ChevronLeft,
  ChevronRight,
  Trash2,
  AlertCircle,
} from "lucide-react";
import api from "../../config/api";
import { alertSuccess, alertError } from "../../utils/alert";
import { parseCSV, downloadCSVTemplate } from "../../utils/csv";

/**
 * The single, full-featured "Create New Exam" modal shared by the admin and
 * faculty exam workspaces.
 *
 * It manages the whole exam lifecycle in one place: basic details, an entire
 * question set (typed in the UI or imported from CSV, with optional images),
 * and result-publishing settings. On save it creates the exam, attaches every
 * draft question, and optionally publishes it — rolling back a partial exam if
 * anything fails.
 *
 * Props:
 *   - isOpen:     boolean, controls visibility
 *   - onClose:    () => void, called when the modal should close
 *   - batches:    array of { _id, name } the exam can be assigned to
 *   - onCreated:  (exam) => void, called after a successful create
 *   - defaultScope: "BATCH" | "COURSE" (optional, defaults to "BATCH")
 *   - courses:    array of { _id, name } (required when scope can be COURSE)
 */

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

const blankForm = () => ({
  title: "",
  description: "",
  testType: "MOCK_TEST",
  // Scope: "BATCH" (one batch) or "COURSE" (every batch of a course).
  examScope: "BATCH",
  batch: "",
  course: "",
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

const inputClass =
  "w-full min-h-11 rounded-xl border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-green-500 focus:ring-4 focus:ring-green-500/10";

const labelClass =
  "mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-slate-500";

export default function ExamCreateWizard({
  isOpen,
  onClose,
  batches = [],
  courses = [],
  // Roles that may assign an exam to a whole course (admin) vs a single batch.
  allowCourseScope = true,
  onCreated,
}) {
  const [step, setStep] = useState(1);
  const [saving, setSaving] = useState(false);
  const [draftQuestions, setDraftQuestions] = useState([]);
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [qForm, setQForm] = useState(emptyQuestion());
  const [csvPreview, setCsvPreview] = useState([]);
  const csvInputRef = useRef(null);

  const [form, setForm] = useState(blankForm());

  const resetAll = () => {
    setStep(1);
    setDraftQuestions([]);
    setCsvPreview([]);
    setQForm(emptyQuestion());
    setForm(blankForm());
    setShowQuestionForm(false);
  };

  const handleClose = () => {
    resetAll();
    onClose?.();
  };

  const handleAddQuestion = (e) => {
    e.preventDefault();
    if (qForm.options.some((o) => !o.text.trim())) {
      alertError("All four options need text");
      return;
    }
    setDraftQuestions((prev) => [...prev, { ...qForm }]);
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
      marks: r.marks || form.marksPerCorrect,
      negativeMarks: r.negativeMarks || form.negativePerWrong,
      explanation: r.explanation || "",
      options: r.options.map((o) => ({
        text: o.text,
        image: null,
        imagePreview: "",
      })),
      correctAnswer: r.correctAnswer || 0,
    }));
    setDraftQuestions((prev) => [...prev, ...shaped]);
    setCsvPreview([]);
    alertSuccess(
      `${shaped.length} questions added — you can now add images to any of them`
    );
  };

  const createExamWithQuestions = async () => {
    if (form.examScope === "COURSE") {
      if (!form.course) {
        alertError("Select a course for a course-wide exam");
        return;
      }
    } else if (!form.batch) {
      alertError("Select a batch, or switch the scope to a whole course");
      return;
    }
    if (!form.startTime || !form.endTime) {
      alertError("Start and end times are required");
      return;
    }
    if (draftQuestions.length === 0) {
      alertError("Add at least one question to this exam");
      return;
    }
    if (form.resultPublishMode === "SCHEDULED" && !form.resultPublishAt) {
      alertError("Set a date/time for scheduled result publishing");
      return;
    }

    let createdExamId = null;
    setSaving(true);
    try {
      const totalMarks = draftQuestions.reduce(
        (sum, q) => sum + Number(q.marks || form.marksPerCorrect),
        0
      );

      const { data: created } = await api.post("/exams", {
        ...form,
        totalQuestions: draftQuestions.length,
        totalMarks,
        duration: Number(form.duration),
        maxAttempts: Number(form.maxAttempts),
        marksPerCorrect: Number(form.marksPerCorrect),
        negativePerWrong: Number(form.negativePerWrong),
        // A course-wide exam is not tied to a single batch.
        batch: form.examScope === "BATCH" ? form.batch : undefined,
        course: form.examScope === "COURSE" ? form.course : undefined,
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

      if (form.publishNow) {
        await api.put(`/exams/${createdExamId}/publish`);
      }

      alertSuccess("Exam created with its own question set");
      onCreated?.(created.data.exam);
      handleClose();
    } catch (err) {
      if (createdExamId) {
        try {
          await api.delete(`/exams/${createdExamId}`);
        } catch {
          // ignore cleanup failure
        }
      }
      alertError(
        err.response?.data?.message ||
        "Failed to create exam. No partial exam was kept."
      );
    } finally {
      setSaving(false);
    }
  };

  if (!isOpen) return null;

  const stepTitles = ["Basic Details", "Add Questions", "Settings"];

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/40 p-0 backdrop-blur-sm sm:items-center sm:p-4">
        <div className="flex max-h-[94dvh] w-full max-w-3xl flex-col overflow-hidden rounded-t-[1.75rem] bg-white shadow-2xl sm:max-h-[90vh] sm:rounded-[1.75rem]">
          {/* Header */}
          <div className="flex shrink-0 items-start justify-between gap-4 border-b border-slate-100 bg-white p-5 sm:p-6">
            <div className="min-w-0">
              <div className="mb-2 inline-flex items-center gap-1.5 rounded-full border-green-100 bg-green-50 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-brand-green">
                <Plus className="h-3 w-3" /> New Examination
              </div>
              <h2 className="truncate text-lg font-extrabold text-slate-900 sm:text-xl">
                Create New Exam
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                Step {step} of 3 · {stepTitles[step - 1]}
              </p>
            </div>

            <button
              type="button"
              onClick={handleClose}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Steps indicator */}
        <div className="flex shrink-0 items-center gap-2 px-5 pt-5">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex flex-1 items-center gap-2">
              <div
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors ${step >= s
                    ? "bg-green-600 text-white shadow-sm"
                    : "bg-slate-100 text-slate-400"
                  }`}
              >
                {s}
              </div>
              {s < 3 && (
                <div
                  className={`h-0.5 flex-1 rounded transition-colors ${step > s ? "bg-green-600" : "bg-slate-100"
                    }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Body */}
        <div className="min-h-0 flex-1 space-y-5 overflow-y-auto overscroll-contain p-5 sm:p-6">
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className={labelClass}>Exam Title *</label>
                <input
                  value={form.title}
                  onChange={(e) =>
                    setForm({ ...form, title: e.target.value })
                  }
                  className={inputClass}
                  placeholder="e.g. NEET Mock Test #12 — Full Syllabus"
                />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>Assign Exam To *</label>
                  <select
                    value={form.examScope}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        examScope: e.target.value,
                        // Clear the other target when the scope switches.
                        batch: e.target.value === "COURSE" ? "" : form.batch,
                        course: e.target.value === "BATCH" ? "" : form.course,
                      })
                    }
                    className={inputClass}
                  >
                    <option value="BATCH">A specific batch</option>
                    {allowCourseScope && (
                      <option value="COURSE">
                        Entire course (all its batches)
                      </option>
                    )}
                  </select>
                </div>

                {form.examScope === "COURSE" ? (
                  <div>
                    <label className={labelClass}>Course *</label>
                    <select
                      value={form.course}
                      onChange={(e) =>
                        setForm({ ...form, course: e.target.value })
                      }
                      className={inputClass}
                    >
                      <option value="">Select a course</option>
                      {courses.map((c) => (
                        <option key={c._id} value={c._id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                    <p className="mt-1.5 text-[11px] text-slate-400">
                      Every student in this course's batches will receive the
                      exam.
                    </p>
                  </div>
                ) : (
                  <div>
                    <label className={labelClass}>Batch *</label>
                    <select
                      value={form.batch}
                      onChange={(e) =>
                        setForm({ ...form, batch: e.target.value })
                      }
                      className={inputClass}
                    >
                      <option value="">
                        {batches.length === 0
                          ? "No batches available"
                          : "Select a batch"}
                      </option>
                      {batches.map((b) => (
                        <option key={b._id} value={b._id}>
                          {b.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>Test Type</label>
                  <select
                    value={form.testType}
                    onChange={(e) =>
                      setForm({ ...form, testType: e.target.value })
                    }
                    className={inputClass}
                  >
                    <option value="MOCK_TEST">Mock Test</option>
                    <option value="CHAPTER_TEST">Chapter Test</option>
                    <option value="DPP">DPP</option>
                    <option value="UNIT_TEST">Unit Test</option>
                    <option value="PYQ">PYQ</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <p className="rounded-xl bg-slate-50 px-3.5 py-2.5 text-[11px] leading-5 text-slate-500">
                    {form.examScope === "COURSE"
                      ? "Course-wide: every active batch of the selected course gets this exam."
                      : "Single-batch: only students in the selected batch get this exam."}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                  <label className={labelClass}>Duration (min)</label>
                  <input
                    type="number"
                    value={form.duration}
                    onChange={(e) =>
                      setForm({ ...form, duration: e.target.value })
                    }
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Marks / Correct</label>
                  <input
                    type="number"
                    value={form.marksPerCorrect}
                    onChange={(e) =>
                      setForm({ ...form, marksPerCorrect: e.target.value })
                    }
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Negative / Wrong</label>
                  <input
                    type="number"
                    value={form.negativePerWrong}
                    onChange={(e) =>
                      setForm({ ...form, negativePerWrong: e.target.value })
                    }
                    className={inputClass}
                  />
                </div>
              </div>
              <div>
                <label className={labelClass}>Max Attempts Allowed</label>
                <input
                  type="number"
                  min="1"
                  value={form.maxAttempts}
                  onChange={(e) =>
                    setForm({ ...form, maxAttempts: e.target.value })
                  }
                  className={inputClass}
                />
                <p className="mt-1.5 text-[11px] text-slate-400">
                  Default is 1. Increase this to allow more than one attempt
                  per learner.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>Start Time *</label>
                  <input
                    type="datetime-local"
                    value={form.startTime}
                    onChange={(e) =>
                      setForm({ ...form, startTime: e.target.value })
                    }
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>End Time *</label>
                  <input
                    type="datetime-local"
                    value={form.endTime}
                    onChange={(e) =>
                      setForm({ ...form, endTime: e.target.value })
                    }
                    className={inputClass}
                  />
                </div>
              </div>
              <div>
                <label className={labelClass}>Instructions</label>
                <textarea
                  rows={3}
                  value={form.instructions}
                  onChange={(e) =>
                    setForm({ ...form, instructions: e.target.value })
                  }
                  className={`${inputClass} resize-none`}
                  placeholder="Shown to students before they begin..."
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setShowQuestionForm(true)}
                  className="inline-flex min-h-10 items-center gap-2 rounded-xl border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-sm transition hover:bg-slate-50"
                >
                  <Plus className="h-4 w-4 text-green-600" /> Create Question
                  (UI)
                </button>
                <label className="inline-flex min-h-10 cursor-pointer items-center gap-2 rounded-xl border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-sm transition hover:bg-slate-50">
                  <FileSpreadsheet className="h-4 w-4 text-green-600" /> Import
                  CSV
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
                  className="inline-flex min-h-10 items-center gap-2 rounded-xl border-transparent px-3 text-xs font-bold text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
                >
                  <Download className="h-3.5 w-3.5" /> Template
                </button>
              </div>

              {csvPreview.length > 0 && (
                <div className="rounded-xl border-green-200 bg-green-50 p-4 text-sm">
                  <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                    <span className="font-bold text-green-800">
                      {csvPreview.length} rows parsed from CSV
                    </span>
                    <button
                      type="button"
                      onClick={commitCSVToDraft}
                      className="inline-flex items-center justify-center rounded-lg bg-green-600 px-4 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-green-700"
                    >
                      Add all to exam
                    </button>
                  </div>
                  <p className="mt-1.5 text-xs font-medium text-green-700">
                    After adding, you can edit each question and attach
                    images.
                  </p>
                </div>
              )}

              {draftQuestions.length === 0 ? (
                <div className="rounded-2xl border-dashed border-slate-200 bg-slate-50/50 p-10 text-center">
                  <Layers className="mx-auto mb-3 h-10 w-10 text-slate-300" />
                  <p className="text-sm font-medium text-slate-500">
                    No questions yet. Create one in the UI or import from CSV.
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {draftQuestions.map((q, i) => (
                    <div
                      key={i}
                      className="flex min-w-0 items-start gap-3 rounded-xl border-slate-200 bg-white p-4 shadow-sm"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border-slate-200 bg-slate-100 text-xs font-extrabold text-slate-600">
                        {i + 1}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="line-clamp-2 break-words text-sm font-semibold text-slate-800">
                          {q.questionText}
                        </p>
                        <div className="mt-2 flex-wrap gap-1.5">
                          {q.options.map((o, oi) => (
                            <span
                              key={oi}
                              className={`rounded-md border px-2 py-0.5 text-[11px] font-medium ${oi === q.correctAnswer
                                  ? "border-green-200 bg-green-50 font-bold text-green-700"
                                  : "border-slate-100 bg-slate-50 text-slate-500"
                                }`}
                            >
                              {String.fromCharCode(65 + oi)}. {o.text || "—"}
                            </span>
                          ))}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          setDraftQuestions((prev) =>
                            prev.filter((_, idx) => idx !== i)
                          )
                        }
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-300 transition hover:bg-red-50 hover:text-red-500"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="space-y-4 rounded-2xl border-slate-200 bg-slate-50 p-5">
                <h4 className="text-sm font-extrabold uppercase tracking-wider text-slate-800">
                  Result Publishing
                </h4>
                <label className="flex cursor-pointer items-center gap-3 text-sm font-medium text-slate-600">
                  <input
                    type="radio"
                    name="rpm"
                    checked={form.resultPublishMode === "IMMEDIATE"}
                    onChange={() =>
                      setForm({ ...form, resultPublishMode: "IMMEDIATE" })
                    }
                    className="h-4 w-4 accent-green-600"
                  />
                  Publish result right after exam submission
                </label>
                <label className="flex cursor-pointer items-center gap-3 text-sm font-medium text-slate-600">
                  <input
                    type="radio"
                    name="rpm"
                    checked={form.resultPublishMode === "MANUAL"}
                    onChange={() =>
                      setForm({ ...form, resultPublishMode: "MANUAL" })
                    }
                    className="h-4 w-4 accent-green-600"
                  />
                  Publish manually later
                </label>
                <label className="flex cursor-pointer items-center gap-3 text-sm font-medium text-slate-600">
                  <input
                    type="radio"
                    name="rpm"
                    checked={form.resultPublishMode === "SCHEDULED"}
                    onChange={() =>
                      setForm({ ...form, resultPublishMode: "SCHEDULED" })
                    }
                    className="h-4 w-4 accent-green-600"
                  />
                  Publish at a scheduled time
                </label>
                {form.resultPublishMode === "SCHEDULED" && (
                  <input
                    type="datetime-local"
                    value={form.resultPublishAt}
                    onChange={(e) =>
                      setForm({ ...form, resultPublishAt: e.target.value })
                    }
                    className={inputClass}
                  />
                )}
              </div>

              <label className="flex cursor-pointer items-start gap-4 rounded-2xl border-slate-200 bg-white p-5 text-sm text-slate-700 transition hover:border-green-200 hover:bg-green-50/30">
                <input
                  type="checkbox"
                  checked={form.publishNow}
                  onChange={(e) =>
                    setForm({ ...form, publishNow: e.target.checked })
                  }
                  className="mt-0.5 h-4 w-4 rounded accent-green-600"
                />
                <div>
                  <div className="font-bold text-slate-800">
                    Publish exam immediately
                  </div>
                  <div className="mt-1 text-xs leading-relaxed text-slate-500">
                    Otherwise it stays a secret draft until you publish it
                    manually.
                  </div>
                </div>
              </label>

              <div className="flex gap-3 rounded-2xl border-amber-200 bg-amber-50 p-4 text-xs font-medium leading-relaxed text-amber-800">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                <span>
                  Draft exams are never visible to students, even those in the
                  selected batch. Only you and other admins/faculty can see
                  them until published.
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex shrink-0 items-center justify-between gap-3 rounded-b-[1.75rem] border-t border-slate-100 bg-slate-50/50 p-4 sm:p-5">
          <button
            type="button"
            onClick={() => (step === 1 ? handleClose() : setStep(step - 1))}
            className="inline-flex min-h-11 items-center gap-1.5 rounded-xl px-4 text-sm font-bold text-slate-600 transition hover:bg-slate-100"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="hidden sm:inline">
              {step === 1 ? "Cancel" : "Back"}
            </span>
          </button>

          {step < 3 ? (
            <button
              type="button"
              onClick={() => {
                if (step === 1) {
                  if (!form.title) {
                    alertError("Exam title is required");
                    return;
                  }
                  if (form.examScope === "COURSE") {
                    if (!form.course) {
                      alertError("Select a course for a course-wide exam");
                      return;
                    }
                  } else if (!form.batch) {
                    alertError("Select a batch, or switch to a whole course");
                    return;
                  }
                }
                setStep(step + 1);
              }}
              className="inline-flex min-h-11 items-center gap-1.5 rounded-xl bg-green-600 px-5 text-sm font-bold text-white shadow-sm transition hover:bg-green-700 hover:shadow-lg hover:shadow-green-600/10"
            >
              Next <ChevronRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={createExamWithQuestions}
              disabled={saving}
              className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-green-600 px-5 text-sm font-bold text-white shadow-sm transition hover:bg-green-700 hover:shadow-lg hover:shadow-green-600/10 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Save className="h-4 w-4" />
              {saving
                ? "Creating..."
                : `Create Exam (${draftQuestions.length} Q)`}
            </button>
          )}
        </div>
      </div>
    </div>

      {/* Nested question composer */}
      {showQuestionForm && (
      <div className="fixed inset-0 z-[60] flex items-end justify-center bg-slate-950/40 p-0 backdrop-blur-sm sm:items-center sm:p-4">
        <div className="flex max-h-[94dvh] w-full max-w-3xl flex-col overflow-hidden rounded-t-[1.75rem] bg-white shadow-2xl sm:max-h-[90vh] sm:rounded-[1.75rem]">
          <div className="flex shrink-0 items-start justify-between border-b border-slate-100 bg-white p-5 sm:p-6">
            <div className="min-w-0 pr-4">
              <h2 className="truncate text-lg font-extrabold text-slate-900 sm:text-xl">
                Create Question
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                Text + image questions and options
              </p>
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

          <form
            onSubmit={handleAddQuestion}
            className="min-h-0 flex-1 space-y-5 overflow-y-auto overscroll-contain p-5 sm:p-6"
          >
            <div>
              <label className={labelClass}>Question Text *</label>
              <textarea
                required
                rows={3}
                value={qForm.questionText}
                onChange={(e) =>
                  setQForm({ ...qForm, questionText: e.target.value })
                }
                className={`${inputClass} resize-none`}
              />
            </div>

            <div>
              <label className={labelClass}>Question Image (optional)</label>
              <div className="flex flex-wrap items-center gap-3">
                <label className="inline-flex min-h-10 cursor-pointer items-center gap-2 rounded-xl border-dashed border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-green-400 hover:bg-green-50">
                  <ImageIcon className="h-4 w-4 text-slate-400" /> Upload Image
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file)
                        setQForm({
                          ...qForm,
                          questionImage: file,
                          questionImagePreview: URL.createObjectURL(file),
                        });
                    }}
                  />
                </label>
                {qForm.questionImagePreview && (
                  <img
                    src={qForm.questionImagePreview}
                    alt="Preview"
                    className="h-16 rounded-xl border-slate-200 object-cover shadow-sm"
                  />
                )}
              </div>
            </div>

            <div>
              <label className={labelClass}>
                Options (select correct, add optional images)
              </label>
              <div className="space-y-3">
                {qForm.options.map((opt, idx) => (
                  <div
                    key={idx}
                    className={`flex min-w-0 items-center gap-2 rounded-xl border p-3 transition ${qForm.correctAnswer === idx
                        ? "border-green-300 bg-green-50/50"
                        : "border-slate-200 bg-slate-50/50"
                      }`}
                  >
                    <input
                      type="radio"
                      name="correct"
                      checked={qForm.correctAnswer === idx}
                      onChange={() =>
                        setQForm({ ...qForm, correctAnswer: idx })
                      }
                      className="h-4 w-4 shrink-0 accent-green-600"
                    />
                    <span className="w-5 shrink-0 text-xs font-extrabold text-slate-500">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <input
                      required
                      value={opt.text}
                      onChange={(e) => {
                        const opts = [...qForm.options];
                        opts[idx] = { ...opts[idx], text: e.target.value };
                        setQForm({ ...qForm, options: opts });
                      }}
                      placeholder={`Option ${String.fromCharCode(65 + idx)}`}
                      className="min-w-0 flex-1 rounded-lg border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/10"
                    />
                    <label className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-lg border-slate-200 bg-white transition hover:bg-slate-50">
                      <ImageIcon className="h-4 w-4 text-slate-400" />
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            const opts = [...qForm.options];
                            opts[idx] = {
                              ...opts[idx],
                              image: file,
                              imagePreview: URL.createObjectURL(file),
                            };
                            setQForm({ ...qForm, options: opts });
                          }
                        }}
                      />
                    </label>
                    {opt.imagePreview && (
                      <img
                        src={opt.imagePreview}
                        className="h-9 w-9 shrink-0 rounded-lg border-slate-200 object-cover"
                        alt=""
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div>
                <label className={labelClass}>Marks</label>
                <input
                  type="number"
                  value={qForm.marks}
                  onChange={(e) =>
                    setQForm({ ...qForm, marks: e.target.value })
                  }
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Negative</label>
                <input
                  type="number"
                  value={qForm.negativeMarks}
                  onChange={(e) =>
                    setQForm({ ...qForm, negativeMarks: e.target.value })
                  }
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Difficulty</label>
                <select
                  value={qForm.difficulty}
                  onChange={(e) =>
                    setQForm({ ...qForm, difficulty: e.target.value })
                  }
                  className={inputClass}
                >
                  <option>Easy</option>
                  <option>Medium</option>
                  <option>Hard</option>
                </select>
              </div>
            </div>

            <div>
              <label className={labelClass}>Explanation</label>
              <textarea
                rows={2}
                value={qForm.explanation}
                onChange={(e) =>
                  setQForm({ ...qForm, explanation: e.target.value })
                }
                className={`${inputClass} resize-none`}
              />
            </div>
          </form>

          <div className="flex shrink-0 gap-3 rounded-b-[1.75rem] border-t border-slate-100 bg-slate-50/50 p-4 sm:p-5">
            <button
              type="button"
              onClick={() => setShowQuestionForm(false)}
              className="min-h-11 flex-1 rounded-xl border-slate-200 bg-white text-sm font-bold text-slate-600 shadow-sm transition hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={handleAddQuestion}
              className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-green-600 text-sm font-bold text-white shadow-sm transition hover:bg-green-700"
            >
              <Save className="h-4 w-4" /> Add to Exam
            </button>
          </div>
        </div>
      </div>
    )
  }
    </>
  );
}
