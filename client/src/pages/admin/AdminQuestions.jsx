import { useState, useEffect } from "react";
import api from "../../config/api";
import {
  HelpCircle,
  Plus,
  Search,
  CheckCircle,
  Pencil,
  Trash2,
  X,
  Save,
  Upload,
  Download,
  FileSpreadsheet,
  BookOpen,
} from "lucide-react";
import { alertSuccess, alertError } from "../../utils/alert";
import ConfirmModal from "../../components/shared/ConfirmModal";

const difficultyColors = {
  Easy: "bg-green-50 text-green-700 border-green-200",
  Medium: "bg-amber-50 text-amber-700 border-amber-200",
  Hard: "bg-red-50 text-red-700 border-red-200",
};

const emptyForm = {
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
};

const inputClass =
  "w-full min-h-11 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-green-500 focus:ring-4 focus:ring-green-500/10";

const labelClass =
  "mb-1.5 block text-[10px] font-extrabold uppercase tracking-[0.12em] text-slate-500";

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

  const [form, setForm] = useState(emptyForm);

  const limit = 20;

  const fetchQuestions = async () => {
    setLoading(true);

    try {
      const { data } = await api.get(
        `/questions?page=${page}&limit=${limit}&search=${search}${
          diffFilter !== "All" ? `&difficulty=${diffFilter}` : ""
        }`
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
        ...emptyForm,
        subject: subjects[0]?._id || "",
      });

      fetchQuestions();
    } catch (err) {
      alertError(
        err.response?.data?.message || "Failed to author question"
      );
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
        subject:
          editingQuestion.subject?._id || editingQuestion.subject,
        difficulty: editingQuestion.difficulty,
        marks: Number(editingQuestion.marks || 4),
        negativeMarks: Number(editingQuestion.negativeMarks || 1),
        source: editingQuestion.source,
        year: editingQuestion.year
          ? Number(editingQuestion.year)
          : undefined,
        explanation: editingQuestion.explanation,
        options: editingQuestion.options,
        correctAnswer: Number(
          editingQuestion.correctAnswer ?? 0
        ),
      });

      alertSuccess("Question updated successfully");
      setEditingQuestion(null);
      fetchQuestions();
    } catch (err) {
      alertError(
        err.response?.data?.message ||
          "Failed to update question"
      );
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
    const csvHeader =
      "QuestionText,OptionA,OptionB,OptionC,OptionD,CorrectOptionIndex(0-3),Difficulty(Easy/Medium/Hard),Marks,NegativeMarks,Explanation\n";

    const sampleRow =
      '"Which organelle is called the powerhouse of the cell?","Ribosome","Mitochondria","Nucleus","Golgi apparatus",1,Easy,4,1,"Mitochondria produces cellular energy (ATP)."\n';

    const blob = new Blob([csvHeader + sampleRow], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.setAttribute(
      "download",
      "neetvidya_questions_template.csv"
    );

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);

    alertSuccess("CSV template downloaded");
  };

  const handleBulkImportSubmit = async (e) => {
    e.preventDefault();

    if (!bulkCsvText.trim()) {
      alertError(
        "Please paste CSV data or choose a CSV file"
      );
      return;
    }

    const lines = bulkCsvText.trim().split("\n");

    if (lines.length < 2) {
      alertError(
        "CSV must contain at least a header and 1 question row"
      );
      return;
    }

    setBulkImporting(true);

    try {
      const parsedQuestions = [];
      const defaultSubId = subjects[0]?._id;

      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();

        if (!line) continue;

        const match = line.match(
          /(".*?"|[^",]+)(?=\s*,|\s*$)/g
        );

        if (!match || match.length < 6) continue;

        const clean = match.map((m) =>
          m.replace(/^"|"$/g, "").trim()
        );

        const [
          qText,
          optA,
          optB,
          optC,
          optD,
          corrIdx,
          diff,
          marks,
          negMarks,
          exp,
        ] = clean;

        parsedQuestions.push({
          questionText: qText,
          options: [
            { text: optA },
            { text: optB },
            { text: optC },
            { text: optD },
          ],
          correctAnswer: parseInt(corrIdx) || 0,
          difficulty: [
            "Easy",
            "Medium",
            "Hard",
          ].includes(diff)
            ? diff
            : "Medium",
          marks: parseInt(marks) || 4,
          negativeMarks: parseInt(negMarks) || 1,
          explanation: exp || "",
          subject: form.subject || defaultSubId,
        });
      }

      if (parsedQuestions.length === 0) {
        alertError(
          "No valid questions parsed from CSV. Please check formatting."
        );
        setBulkImporting(false);
        return;
      }

      const { data } = await api.post(
        "/questions/bulk-import",
        {
          questions: parsedQuestions,
        }
      );

      alertSuccess(
        `Successfully imported ${
          data.data?.imported || parsedQuestions.length
        } questions!`
      );

      setShowBulkImport(false);
      setBulkCsvText("");
      fetchQuestions();
    } catch (err) {
      alertError(
        err.response?.data?.message ||
          "Bulk import failed"
      );
    } finally {
      setBulkImporting(false);
    }
  };

  const totalPages = Math.ceil(total / limit);

  const openCreate = () => {
    if (!form.subject && subjects.length > 0) {
      setForm((prev) => ({
        ...prev,
        subject: subjects[0]._id,
      }));
    }

    setShowCreate(true);
  };

  const openBulkImport = () => {
    if (!form.subject && subjects.length > 0) {
      setForm((prev) => ({
        ...prev,
        subject: subjects[0]._id,
      }));
    }

    setShowBulkImport(true);
  };

  return (
    <div className="min-h-full overflow-hidden bg-slate-50/40 p-3 sm:p-5 lg:p-7">
      <div className="mx-auto w-full max-w-[1500px] space-y-5 sm:space-y-6">

        {/* Header */}
        <section className="relative overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white px-4 py-5 shadow-sm sm:px-6 sm:py-6 lg:px-7">
          <div className="pointer-events-none absolute -right-16 -top-20 h-48 w-48 rounded-full bg-green-100/60 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 left-1/3 h-40 w-40 rounded-full bg-emerald-100/40 blur-3xl" />

          <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="min-w-0">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.14em] text-green-700">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                Question Bank
              </div>

              <h1 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
                Manage Questions
              </h1>

              <p className="mt-1.5 max-w-2xl text-sm leading-6 text-slate-500">
                Author, organize and maintain the NEET question
                bank for your exam series.
              </p>

              <div className="mt-4 inline-flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2 text-xs font-bold text-slate-500">
                <BookOpen className="h-4 w-4 text-green-600" />
                {total} questions in question bank
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:justify-end">
              <button
                onClick={openBulkImport}
                className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 text-xs font-bold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50 hover:shadow-md sm:px-4 sm:text-sm"
              >
                <FileSpreadsheet className="h-4 w-4 shrink-0 text-emerald-600" />
                <span className="truncate">Bulk Import</span>
              </button>

              <button
                onClick={openCreate}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-green-600 px-3 text-xs font-bold text-white shadow-sm shadow-green-600/20 transition hover:-translate-y-0.5 hover:bg-green-700 hover:shadow-lg sm:px-5 sm:text-sm"
              >
                <Plus className="h-4 w-4 shrink-0" />
                <span className="truncate">Add Question</span>
              </button>
            </div>
          </div>
        </section>

        {/* Filters */}
        <section className="rounded-[1.5rem] border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative min-w-0 flex-1">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

              <input
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                placeholder="Search questions..."
                className={`${inputClass} pl-10`}
              />
            </div>

            <div className="relative sm:w-44">
              <select
                value={diffFilter}
                onChange={(e) => {
                  setDiffFilter(e.target.value);
                  setPage(1);
                }}
                className={`${inputClass} appearance-none pr-9`}
              >
                {[
                  "All",
                  "Easy",
                  "Medium",
                  "Hard",
                ].map((d) => (
                  <option key={d} value={d}>
                    {d === "All"
                      ? "All Difficulties"
                      : d}
                  </option>
                ))}
              </select>

              <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.51a.75.75 0 01-1.08 0l-4.25-4.51a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* Loading */}
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="animate-pulse rounded-[1.5rem] border border-slate-200 bg-white p-4 sm:p-5"
              >
                <div className="flex gap-3">
                  <div className="h-9 w-9 shrink-0 rounded-xl bg-slate-100" />

                  <div className="min-w-0 flex-1 space-y-3">
                    <div className="h-4 w-2/3 rounded bg-slate-100" />
                    <div className="h-3 w-full rounded bg-slate-100" />
                    <div className="h-3 w-4/5 rounded bg-slate-100" />

                    <div className="grid grid-cols-2 gap-2">
                      <div className="h-8 rounded-lg bg-slate-100" />
                      <div className="h-8 rounded-lg bg-slate-100" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : questions.length === 0 ? (
          /* Empty */
          <div className="rounded-[1.75rem] border border-slate-200 bg-white px-5 py-14 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-50">
              <HelpCircle className="h-8 w-8 text-slate-300" />
            </div>

            <h3 className="mt-4 font-bold text-slate-700">
              No questions found
            </h3>

            <p className="mx-auto mt-1 max-w-md text-sm leading-6 text-slate-400">
              Try adjusting your search or difficulty
              filter, or add a new question to the bank.
            </p>
          </div>
        ) : (
          <>
            {/* Question List */}
            <div className="space-y-3">
              {questions.map((q, i) => (
                <article
                  key={q._id}
                  className="group min-w-0 w-full overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-lg hover:shadow-slate-900/5 sm:p-5"
                >
                  <div className="flex min-w-0 items-start gap-3 sm:gap-4">

                    {/* Number */}
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-xs font-black text-slate-500 sm:h-10 sm:w-10">
                      {(page - 1) * limit + i + 1}
                    </div>

                    <div className="min-w-0 flex-1">

                      {/* Meta + Actions */}
                      <div className="flex min-w-0 items-start gap-2">
                        <div className="flex min-w-0 flex-1 flex-wrap items-center gap-1.5">
                          {q.difficulty && (
                            <span
                              className={`inline-flex shrink-0 items-center rounded-full border px-2.5 py-1 text-[10px] font-extrabold ${difficultyColors[q.difficulty] || "bg-slate-100 text-slate-600 border-slate-200"}`}
                            >
                              {q.difficulty}
                            </span>
                          )}

                          {q.source && (
                            <span className="inline-flex max-w-[150px] min-w-0 items-center rounded-full border border-indigo-200 bg-indigo-50 px-2.5 py-1 text-[10px] font-bold text-indigo-700">
                              <span className="truncate">
                                {q.source}
                              </span>
                            </span>
                          )}

                          {q.year && (
                            <span className="shrink-0 text-[10px] font-medium text-slate-400">
                              ({q.year})
                            </span>
                          )}

                          <span className="ml-auto shrink-0 text-[10px] font-bold text-slate-400">
                            +{q.marks || 4} / -{q.negativeMarks || 1}
                          </span>
                        </div>

                        {/* Desktop hover actions */}
                        <div className="hidden shrink-0 gap-1 sm:flex sm:opacity-0 sm:transition sm:group-hover:opacity-100">
                          <button
                            onClick={() =>
                              setEditingQuestion(q)
                            }
                            className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition hover:bg-indigo-50 hover:text-indigo-600"
                            title="Edit Question"
                          >
                            <Pencil className="h-4 w-4" />
                          </button>

                          <button
                            onClick={() =>
                              setQuestionToDelete(q)
                            }
                            className="flex h-9 w-9 items-center justify-center rounded-xl text-red-400 transition hover:bg-red-50 hover:text-red-600"
                            title="Delete Question"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      {/* Question */}
                      <p className="mt-3 break-words text-sm font-semibold leading-6 text-slate-800 sm:text-[15px]">
                        {q.questionText}
                      </p>

                      {/* Options */}
                      <div className="mt-3 grid min-w-0 grid-cols-1 gap-2 sm:grid-cols-2">
                        {q.options?.map((opt, idx) => (
                          <div
                            key={idx}
                            className={`flex min-w-0 items-center gap-2 overflow-hidden rounded-xl border px-3 py-2 ${
                              idx === q.correctAnswer
                                ? "border-green-200 bg-green-50 text-green-700"
                                : "border-slate-100 bg-slate-50 text-slate-600"
                            }`}
                          >
                            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-white text-[10px] font-black text-slate-400 shadow-sm">
                              {String.fromCharCode(
                                65 + idx
                              )}
                            </span>

                            {idx === q.correctAnswer && (
                              <CheckCircle className="h-3.5 w-3.5 shrink-0 text-green-600" />
                            )}

                            <span className="min-w-0 flex-1 truncate text-xs font-medium">
                              {opt.text}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Explanation */}
                      {q.explanation && (
                        <div className="mt-3 overflow-hidden rounded-xl border border-amber-100 bg-amber-50 p-3 text-xs leading-5 text-amber-800">
                          <span className="font-extrabold">
                            Explanation:
                          </span>{" "}
                          <span className="break-words">
                            {q.explanation}
                          </span>
                        </div>
                      )}

                      {/* Mobile actions */}
                      <div className="mt-3 grid grid-cols-2 gap-2 sm:hidden">
                        <button
                          onClick={() =>
                            setEditingQuestion(q)
                          }
                          className="flex min-h-10 min-w-0 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-xs font-bold text-slate-600 transition hover:bg-slate-50"
                        >
                          <Pencil className="h-3.5 w-3.5 shrink-0" />
                          <span>Edit</span>
                        </button>

                        <button
                          onClick={() =>
                            setQuestionToDelete(q)
                          }
                          className="flex min-h-10 min-w-0 items-center justify-center gap-2 rounded-xl border border-red-100 bg-red-50 px-3 text-xs font-bold text-red-600 transition hover:bg-red-100"
                        >
                          <Trash2 className="h-3.5 w-3.5 shrink-0" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex flex-col gap-3 rounded-[1.5rem] border border-slate-200 bg-white p-3 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:px-5 sm:py-3">
                <span className="text-center text-[11px] font-semibold text-slate-500 sm:text-left">
                  Page {page} of {totalPages} · {total} questions
                </span>

                <div className="grid grid-cols-2 gap-2 sm:flex">
                  <button
                    onClick={() =>
                      setPage((p) => Math.max(1, p - 1))
                    }
                    disabled={page === 1}
                    className="min-h-10 rounded-xl border border-slate-200 px-4 text-xs font-bold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Previous
                  </button>

                  <button
                    onClick={() =>
                      setPage((p) =>
                        Math.min(totalPages, p + 1)
                      )
                    }
                    disabled={page === totalPages}
                    className="min-h-10 rounded-xl border border-slate-200 px-4 text-xs font-bold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* ================= CREATE MODAL ================= */}
      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/50 p-0 backdrop-blur-sm sm:items-center sm:p-4">
          <div className="flex max-h-[94dvh] w-full max-w-3xl flex-col overflow-hidden rounded-t-[1.75rem] bg-white shadow-2xl sm:max-h-[92dvh] sm:rounded-[1.75rem]">

            {/* Header */}
            <div className="flex shrink-0 items-center justify-between border-b border-slate-100 bg-white px-4 py-4 sm:px-6 sm:py-5">
              <div className="min-w-0 pr-3">
                <div className="mb-1 inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wider text-green-600">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                  Question Authoring
                </div>

                <h2 className="truncate text-lg font-black text-slate-900 sm:text-xl">
                  Author New Question
                </h2>

                <p className="mt-0.5 hidden text-xs text-slate-500 sm:block">
                  Create a 4-option NEET MCQ for the central question bank.
                </p>
              </div>

              <button
                onClick={() => setShowCreate(false)}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Body */}
            <form
              onSubmit={handleCreate}
              className="min-h-0 flex-1 overflow-y-auto overscroll-contain"
            >
              <div className="space-y-5 p-4 sm:p-6">

                <div>
                  <label className={labelClass}>
                    Question Text *
                  </label>

                  <textarea
                    required
                    rows={4}
                    value={form.questionText}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        questionText: e.target.value,
                      }))
                    }
                    placeholder="Enter the question statement clearly..."
                    className={`${inputClass} resize-none`}
                  />
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <div>
                    <label className={labelClass}>
                      Subject *
                    </label>

                    <select
                      required
                      value={form.subject}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          subject: e.target.value,
                        }))
                      }
                      className={inputClass}
                    >
                      <option value="">
                        Select subject
                      </option>

                      {subjects.map((s) => (
                        <option key={s._id} value={s._id}>
                          {s.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className={labelClass}>
                      Difficulty
                    </label>

                    <select
                      value={form.difficulty}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          difficulty: e.target.value,
                        }))
                      }
                      className={inputClass}
                    >
                      <option value="Easy">Easy</option>
                      <option value="Medium">Medium</option>
                      <option value="Hard">Hard</option>
                    </select>
                  </div>

                  <div>
                    <label className={labelClass}>
                      Source / Year
                    </label>

                    <input
                      value={form.source}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          source: e.target.value,
                        }))
                      }
                      placeholder="e.g. NEET UG 2023"
                      className={inputClass}
                    />
                  </div>
                </div>

                {/* Options */}
                <div>
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <label className={labelClass}>
                      Answer Options
                    </label>

                    <span className="text-[10px] font-semibold text-slate-400">
                      Select the radio button for correct answer
                    </span>
                  </div>

                  <div className="space-y-2">
                    {form.options.map((opt, idx) => (
                      <div
                        key={idx}
                        className="flex min-w-0 items-center gap-2 rounded-xl border border-slate-100 bg-slate-50/70 p-2"
                      >
                        <input
                          type="radio"
                          name="correctAnswer"
                          checked={
                            form.correctAnswer === idx
                          }
                          onChange={() =>
                            setForm((prev) => ({
                              ...prev,
                              correctAnswer: idx,
                            }))
                          }
                          className="ml-1 h-4 w-4 shrink-0 accent-green-600"
                          title="Mark as correct answer"
                        />

                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white text-[10px] font-black text-slate-500 shadow-sm">
                          {String.fromCharCode(65 + idx)}
                        </span>

                        <input
                          required
                          value={opt.text}
                          onChange={(e) => {
                            const newOpts = [
                              ...form.options,
                            ];

                            newOpts[idx] = {
                              ...newOpts[idx],
                              text: e.target.value,
                            };

                            setForm((prev) => ({
                              ...prev,
                              options: newOpts,
                            }));
                          }}
                          placeholder={`Option ${String.fromCharCode(
                            65 + idx
                          )} text`}
                          className="min-w-0 flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-green-500 focus:ring-4 focus:ring-green-500/10"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className={labelClass}>
                    Explanation
                  </label>

                  <textarea
                    rows={3}
                    value={form.explanation}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        explanation: e.target.value,
                      }))
                    }
                    placeholder="Explain why this option is correct and cite NCERT page reference..."
                    className={`${inputClass} resize-none`}
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="border-t border-slate-100 bg-white p-4 sm:px-6">
                <div className="grid grid-cols-2 gap-2 sm:flex sm:justify-end">
                  <button
                    type="button"
                    onClick={() => setShowCreate(false)}
                    className="min-h-11 rounded-xl border border-slate-200 px-5 text-sm font-bold text-slate-600 transition hover:bg-slate-50"
                  >
                    <span className="sm:inline">Cancel</span>
                  </button>

                  <button
                    type="submit"
                    disabled={savingQuestion}
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-green-600 px-5 text-sm font-bold text-white shadow-sm transition hover:bg-green-700 disabled:opacity-60"
                  >
                    <Save className="h-4 w-4" />
                    {savingQuestion
                      ? "Saving..."
                      : "Save Question"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= EDIT MODAL ================= */}
      {editingQuestion && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/50 p-0 backdrop-blur-sm sm:items-center sm:p-4">
          <div className="flex max-h-[94dvh] w-full max-w-3xl flex-col overflow-hidden rounded-t-[1.75rem] bg-white shadow-2xl sm:max-h-[92dvh] sm:rounded-[1.75rem]">

            <div className="flex shrink-0 items-center justify-between border-b border-slate-100 bg-white px-4 py-4 sm:px-6 sm:py-5">
              <div className="min-w-0 pr-3">
                <div className="mb-1 inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wider text-indigo-600">
                  <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                  Question Editor
                </div>

                <h2 className="truncate text-lg font-black text-slate-900 sm:text-xl">
                  Edit Question
                </h2>

                <p className="mt-0.5 hidden text-xs text-slate-500 sm:block">
                  Modify question text, options, or correct answer.
                </p>
              </div>

              <button
                onClick={() =>
                  setEditingQuestion(null)
                }
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form
              onSubmit={handleSaveEdit}
              className="min-h-0 flex-1 overflow-y-auto overscroll-contain"
            >
              <div className="space-y-5 p-4 sm:p-6">

                <div>
                  <label className={labelClass}>
                    Question Text *
                  </label>

                  <textarea
                    required
                    rows={4}
                    value={editingQuestion.questionText}
                    onChange={(e) =>
                      setEditingQuestion((prev) => ({
                        ...prev,
                        questionText: e.target.value,
                      }))
                    }
                    className={`${inputClass} resize-none`}
                  />
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <div>
                    <label className={labelClass}>
                      Subject
                    </label>

                    <select
                      value={
                        editingQuestion.subject?._id ||
                        editingQuestion.subject
                      }
                      onChange={(e) =>
                        setEditingQuestion((prev) => ({
                          ...prev,
                          subject: e.target.value,
                        }))
                      }
                      className={inputClass}
                    >
                      {subjects.map((s) => (
                        <option
                          key={s._id}
                          value={s._id}
                        >
                          {s.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className={labelClass}>
                      Difficulty
                    </label>

                    <select
                      value={editingQuestion.difficulty}
                      onChange={(e) =>
                        setEditingQuestion((prev) => ({
                          ...prev,
                          difficulty: e.target.value,
                        }))
                      }
                      className={inputClass}
                    >
                      <option value="Easy">Easy</option>
                      <option value="Medium">Medium</option>
                      <option value="Hard">Hard</option>
                    </select>
                  </div>

                  <div>
                    <label className={labelClass}>
                      Source
                    </label>

                    <input
                      value={
                        editingQuestion.source || ""
                      }
                      onChange={(e) =>
                        setEditingQuestion((prev) => ({
                          ...prev,
                          source: e.target.value,
                        }))
                      }
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <label className={labelClass}>
                      Answer Options
                    </label>

                    <span className="text-[10px] font-semibold text-slate-400">
                      Select correct answer
                    </span>
                  </div>

                  <div className="space-y-2">
                    {editingQuestion.options?.map(
                      (opt, idx) => (
                        <div
                          key={idx}
                          className="flex min-w-0 items-center gap-2 rounded-xl border border-slate-100 bg-slate-50/70 p-2"
                        >
                          <input
                            type="radio"
                            name="editCorrectAnswer"
                            checked={
                              Number(
                                editingQuestion.correctAnswer
                              ) === idx
                            }
                            onChange={() =>
                              setEditingQuestion(
                                (prev) => ({
                                  ...prev,
                                  correctAnswer: idx,
                                })
                              )
                            }
                            className="ml-1 h-4 w-4 shrink-0 accent-green-600"
                          />

                          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white text-[10px] font-black text-slate-500 shadow-sm">
                            {String.fromCharCode(
                              65 + idx
                            )}
                          </span>

                          <input
                            required
                            value={opt.text}
                            onChange={(e) => {
                              const newOpts = [
                                ...editingQuestion.options,
                              ];

                              newOpts[idx] = {
                                ...newOpts[idx],
                                text: e.target.value,
                              };

                              setEditingQuestion(
                                (prev) => ({
                                  ...prev,
                                  options: newOpts,
                                })
                              );
                            }}
                            className="min-w-0 flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-green-500 focus:ring-4 focus:ring-green-500/10"
                          />
                        </div>
                      )
                    )}
                  </div>
                </div>

                <div>
                  <label className={labelClass}>
                    Explanation
                  </label>

                  <textarea
                    rows={3}
                    value={
                      editingQuestion.explanation || ""
                    }
                    onChange={(e) =>
                      setEditingQuestion((prev) => ({
                        ...prev,
                        explanation: e.target.value,
                      }))
                    }
                    className={`${inputClass} resize-none`}
                  />
                </div>
              </div>

              <div className="border-t border-slate-100 bg-white p-4 sm:px-6">
                <div className="grid grid-cols-2 gap-2 sm:flex sm:justify-end">
                  <button
                    type="button"
                    onClick={() =>
                      setEditingQuestion(null)
                    }
                    className="min-h-11 rounded-xl border border-slate-200 px-5 text-sm font-bold text-slate-600 transition hover:bg-slate-50"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={savingQuestion}
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-green-600 px-5 text-sm font-bold text-white shadow-sm transition hover:bg-green-700 disabled:opacity-60"
                  >
                    <Save className="h-4 w-4" />
                    {savingQuestion
                      ? "Saving..."
                      : "Save Changes"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= BULK IMPORT MODAL ================= */}
      {showBulkImport && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/50 p-0 backdrop-blur-sm sm:items-center sm:p-4">
          <div className="flex max-h-[94dvh] w-full max-w-3xl flex-col overflow-hidden rounded-t-[1.75rem] bg-white shadow-2xl sm:max-h-[92dvh] sm:rounded-[1.75rem]">

            <div className="flex shrink-0 items-center justify-between border-b border-slate-100 bg-white px-4 py-4 sm:px-6 sm:py-5">
              <div className="min-w-0 pr-3">
                <div className="mb-1 inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wider text-emerald-600">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  CSV Import
                </div>

                <h2 className="truncate text-lg font-black text-slate-900 sm:text-xl">
                  Bulk Import Questions
                </h2>

                <p className="mt-0.5 hidden text-xs text-slate-500 sm:block">
                  Upload multiple MCQs at once using CSV format.
                </p>
              </div>

              <button
                onClick={() =>
                  setShowBulkImport(false)
                }
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form
              onSubmit={handleBulkImportSubmit}
              className="min-h-0 flex-1 overflow-y-auto overscroll-contain"
            >
              <div className="space-y-5 p-4 sm:p-6">

                {/* Template */}
                <div className="flex flex-col gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0">
                    <h4 className="text-sm font-extrabold text-emerald-900">
                      Need a CSV template?
                    </h4>

                    <p className="mt-1 text-xs leading-5 text-emerald-700">
                      Download the formatted template with
                      sample MCQs.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={downloadCsvTemplate}
                    className="inline-flex min-h-10 shrink-0 items-center justify-center gap-1.5 rounded-xl bg-emerald-600 px-3.5 text-xs font-bold text-white shadow-sm transition hover:bg-emerald-700"
                  >
                    <Download className="h-3.5 w-3.5" />
                    Download Template
                  </button>
                </div>

                {/* Subject */}
                <div>
                  <label className={labelClass}>
                    Default Subject
                  </label>

                  <select
                    value={form.subject}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        subject: e.target.value,
                      }))
                    }
                    className={inputClass}
                  >
                    {subjects.map((s) => (
                      <option
                        key={s._id}
                        value={s._id}
                      >
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* File */}
                <div>
                  <label className={labelClass}>
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
                          setBulkCsvText(
                            event.target.result
                          );
                        };

                        reader.readAsText(file);
                      }
                    }}
                    className="block w-full rounded-xl border border-slate-200 bg-white p-2 text-xs text-slate-500 file:mr-3 file:rounded-lg file:border-0 file:bg-green-50 file:px-3 file:py-2 file:text-xs file:font-bold file:text-green-700 hover:file:bg-green-100"
                  />
                </div>

                {/* CSV */}
                <div>
                  <label className={labelClass}>
                    Or Paste CSV Content
                  </label>

                  <textarea
                    rows={8}
                    value={bulkCsvText}
                    onChange={(e) =>
                      setBulkCsvText(e.target.value)
                    }
                    placeholder="QuestionText,OptionA,OptionB,OptionC,OptionD,CorrectOptionIndex(0-3),Difficulty,Marks,NegativeMarks,Explanation"
                    className="min-h-40 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 font-mono text-xs leading-5 text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-500/10"
                  />
                </div>
              </div>

              <div className="border-t border-slate-100 bg-white p-4 sm:px-6">
                <div className="grid grid-cols-2 gap-2 sm:flex sm:justify-end">
                  <button
                    type="button"
                    onClick={() =>
                      setShowBulkImport(false)
                    }
                    className="min-h-11 rounded-xl border border-slate-200 px-5 text-sm font-bold text-slate-600 transition hover:bg-slate-50"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={bulkImporting}
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-green-600 px-5 text-sm font-bold text-white shadow-sm transition hover:bg-green-700 disabled:opacity-60"
                  >
                    <Upload className="h-4 w-4" />
                    {bulkImporting
                      ? "Importing..."
                      : "Process Import"}
                  </button>
                </div>
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