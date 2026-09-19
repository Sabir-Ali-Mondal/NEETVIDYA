import { useState, useEffect } from "react";
import api from "../../config/api";
import {
  Award,
  CheckCircle,
  XCircle,
  Clock,
  BarChart2,
  BookOpen,
  ChevronRight,
  FileText,
  Target,
  AlertCircle,
} from "lucide-react";

export default function ResultPage() {
  const [results, setResults] = useState([]);
  const [selectedResult, setSelectedResult] = useState(null);
  const [solutions, setSolutions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/results/my")
      .then(({ data }) => {
        const resList = data.data.results || [];
        setResults(resList);

        if (resList.length > 0) {
          viewSolutions(resList[0]);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const viewSolutions = async (resItem) => {
    setSelectedResult(resItem);

    try {
      const { data } = await api.get(
        `/results/${resItem.attempt}/solutions`
      );

      setSolutions(data.data.solutions || []);
    } catch {
      setSolutions([]);
    }
  };

  const getPerformanceLabel = (accuracy = 0) => {
    if (accuracy >= 90) return "Excellent Performance";
    if (accuracy >= 75) return "Strong Performance";
    if (accuracy >= 60) return "Good Performance";
    if (accuracy >= 40) return "Needs Improvement";
    return "Keep Practising";
  };

  const getPercentage = (value, total) => {
    if (!total) return 0;
    return Math.round((value / total) * 100);
  };

  return (
    <>
      <div className="space-y-8 pb-10">
        {/* ================= SCREEN HEADER ================= */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-brand-green/15 bg-brand-green/5 px-3 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand-green">
                Performance Center
              </span>
            </div>

            <h1 className="font-heading text-2xl font-extrabold tracking-tight text-brand-dark sm:text-3xl">
              Examination Results
              <span className="text-brand-green"> & Scorecards</span>
            </h1>

            <p className="mt-2 max-w-2xl text-xs leading-5 text-slate-500 sm:text-sm">
              Review your marks, accuracy, attempt analysis, and detailed
              question-wise solutions.
            </p>
          </div>

        </div>

        {loading ? (
          <div className="flex min-h-[400px] items-center justify-center">
            <div className="text-center">
              <div className="mx-auto h-9 w-9 animate-spin rounded-full border-2 border-slate-200 border-t-brand-green" />
              <p className="mt-3 text-xs text-slate-400">
                Loading your results...
              </p>
            </div>
          </div>
        ) : results.length === 0 ? (
          <div className="rounded-[2rem] border border-white bg-white px-6 py-20 text-center shadow-[0_20px_60px_-35px_rgba(15,23,42,0.25)]">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-green/10">
              <Award className="h-7 w-7 text-brand-green" />
            </div>

            <h3 className="mt-5 font-heading text-lg font-extrabold text-brand-dark">
              No examination attempts found
            </h3>

            <p className="mx-auto mt-2 max-w-md text-xs leading-5 text-slate-400">
              Complete a practice test to review your scorecard, accuracy,
              performance diagnostics, and detailed solutions.
            </p>
          </div>
        ) : (
          <div className="grid gap-7 lg:grid-cols-12">
            {/* ================= ATTEMPT LIST ================= */}
            <aside className="print-hidden lg:col-span-4">
              <div className="sticky top-24">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand-green">
                      History
                    </p>

                    <h2 className="mt-1 font-heading text-lg font-extrabold text-brand-dark">
                      Completed Tests
                    </h2>
                  </div>

                  <div className="flex h-8 min-w-8 items-center justify-center rounded-lg bg-slate-100 px-2 text-xs font-bold text-slate-500">
                    {results.length}
                  </div>
                </div>

                <div className="space-y-3">
                  {results.map((r) => {
                    const active = selectedResult?._id === r._id;

                    return (
                      <button
                        key={r._id}
                        type="button"
                        onClick={() => viewSolutions(r)}
                        className={`group w-full rounded-2xl border p-4 text-left transition-all duration-200 ${
                          active
                            ? "border-brand-green/30 bg-white shadow-[0_12px_35px_-20px_rgba(16,185,129,0.55)]"
                            : "border-slate-200 bg-white hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-lg"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <span className="rounded-md bg-emerald-50 px-2 py-1 text-[9px] font-extrabold uppercase tracking-wider text-emerald-700">
                            {r.exam?.testType || "TEST"}
                          </span>

                          <ChevronRight
                            className={`h-4 w-4 transition ${
                              active
                                ? "text-brand-green"
                                : "text-slate-300 group-hover:text-slate-500"
                            }`}
                          />
                        </div>

                        <h3 className="mt-3 line-clamp-2 text-sm font-bold leading-5 text-brand-dark">
                          {r.exam?.title || "Mock Test"}
                        </h3>

                        <div className="mt-4 grid grid-cols-2 gap-2 border-t border-slate-100 pt-3">
                          <div>
                            <p className="text-[9px] font-medium uppercase tracking-wider text-slate-400">
                              Score
                            </p>
                            <p className="mt-1 text-sm font-extrabold text-brand-green">
                              {r.obtainedMarks}
                              <span className="font-medium text-slate-400">
                                {" "}
                                / {r.totalMarks}
                              </span>
                            </p>
                          </div>

                          <div>
                            <p className="text-[9px] font-medium uppercase tracking-wider text-slate-400">
                              Accuracy
                            </p>
                            <p className="mt-1 text-sm font-extrabold text-brand-dark">
                              {r.accuracy}%
                            </p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </aside>

            {/* ================= REPORT ================= */}
            <main className="print-full lg:col-span-8">
              {selectedResult && (
                <div className="space-y-7">
                  {/* ================= SCORECARD HERO ================= */}
                  <section className="print-card print-no-break overflow-hidden rounded-[2rem] bg-brand-black text-white shadow-[0_25px_70px_-35px_rgba(15,23,42,0.6)]">
                    <div className="relative overflow-hidden px-5 py-6 sm:px-8 sm:py-8">
                      <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-brand-green/20 blur-3xl" />
                      <div className="pointer-events-none absolute -bottom-32 left-20 h-56 w-56 rounded-full bg-lime-400/10 blur-3xl" />

                      <div className="relative">
                        <div className="flex flex-col gap-6 border-b border-white/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
                          <div>
                            <div className="mb-3 flex flex-wrap items-center gap-2">
                              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-lime px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-wider text-brand-black">
                                <Award className="h-3 w-3" />
                                Official Scorecard
                              </span>

                              <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-slate-300">
                                {selectedResult.exam?.testType || "TEST"}
                              </span>
                            </div>

                            <h2 className="max-w-xl font-heading text-2xl font-extrabold leading-tight sm:text-3xl">
                              {selectedResult.exam?.title || "Mock Test"}
                            </h2>

                            <p className="mt-2 text-xs text-slate-400">
                              {getPerformanceLabel(selectedResult.accuracy)}
                            </p>
                          </div>

                          <div className="sm:text-right">
                            <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-slate-400">
                              Total Score
                            </p>

                            <div className="mt-1 font-heading text-4xl font-black text-brand-lime">
                              {selectedResult.obtainedMarks}
                              <span className="text-lg font-medium text-slate-500">
                                {" "}
                                / {selectedResult.totalMarks}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Score Metrics */}
                        <div className="grid grid-cols-2 gap-3 pt-6 sm:grid-cols-4">
                          <ScoreMetric
                            icon={CheckCircle}
                            label="Correct"
                            value={`+${selectedResult.correctCount}`}
                            tone="green"
                          />

                          <ScoreMetric
                            icon={XCircle}
                            label="Incorrect"
                            value={`-${selectedResult.wrongCount}`}
                            tone="red"
                          />

                          <ScoreMetric
                            icon={Clock}
                            label="Unattempted"
                            value={selectedResult.unattemptedCount}
                            tone="gray"
                          />

                          <ScoreMetric
                            icon={Target}
                            label="Accuracy"
                            value={`${selectedResult.accuracy}%`}
                            tone="lime"
                          />
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* ================= PRINT META ================= */}
                  <div className="print-header print-no-break grid grid-cols-3 gap-4 border-b border-slate-200 pb-5">
                    <div>
                      <p className="text-[8px] font-bold uppercase tracking-wider text-slate-400">
                        Score
                      </p>
                      <p className="mt-1 text-sm font-bold text-slate-900">
                        {selectedResult.obtainedMarks} /{" "}
                        {selectedResult.totalMarks}
                      </p>
                    </div>

                    <div>
                      <p className="text-[8px] font-bold uppercase tracking-wider text-slate-400">
                        Accuracy
                      </p>
                      <p className="mt-1 text-sm font-bold text-slate-900">
                        {selectedResult.accuracy}%
                      </p>
                    </div>

                    <div>
                      <p className="text-[8px] font-bold uppercase tracking-wider text-slate-400">
                        Performance
                      </p>
                      <p className="mt-1 text-sm font-bold text-slate-900">
                        {getPerformanceLabel(selectedResult.accuracy)}
                      </p>
                    </div>
                  </div>

                  {/* ================= PERFORMANCE BREAKDOWN ================= */}
                  <section className="print-card print-no-break rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-[0_15px_45px_-30px_rgba(15,23,42,0.25)] sm:p-6">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-green/10">
                            <BarChart2 className="h-4 w-4 text-brand-green" />
                          </div>

                          <h3 className="font-heading text-base font-extrabold text-brand-dark">
                            Performance Breakdown
                          </h3>
                        </div>

                        <p className="mt-1 pl-10 text-[10px] text-slate-400">
                          Question attempt distribution
                        </p>
                      </div>
                    </div>

                    <div className="mt-6">
                      <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                        <div className="flex h-full">
                          <div
                            className="bg-emerald-500"
                            style={{
                              width: `${getPercentage(
                                selectedResult.correctCount,
                                selectedResult.correctCount +
                                  selectedResult.wrongCount +
                                  selectedResult.unattemptedCount
                              )}%`,
                            }}
                          />

                          <div
                            className="bg-rose-400"
                            style={{
                              width: `${getPercentage(
                                selectedResult.wrongCount,
                                selectedResult.correctCount +
                                  selectedResult.wrongCount +
                                  selectedResult.unattemptedCount
                              )}%`,
                            }}
                          />

                          <div className="flex-1 bg-slate-200" />
                        </div>
                      </div>

                      <div className="mt-4 grid grid-cols-3 gap-3">
                        <BreakdownItem
                          label="Correct"
                          value={selectedResult.correctCount}
                          percentage={getPercentage(
                            selectedResult.correctCount,
                            selectedResult.correctCount +
                              selectedResult.wrongCount +
                              selectedResult.unattemptedCount
                          )}
                          className="text-emerald-600"
                        />

                        <BreakdownItem
                          label="Incorrect"
                          value={selectedResult.wrongCount}
                          percentage={getPercentage(
                            selectedResult.wrongCount,
                            selectedResult.correctCount +
                              selectedResult.wrongCount +
                              selectedResult.unattemptedCount
                          )}
                          className="text-rose-500"
                        />

                        <BreakdownItem
                          label="Unattempted"
                          value={selectedResult.unattemptedCount}
                          percentage={getPercentage(
                            selectedResult.unattemptedCount,
                            selectedResult.correctCount +
                              selectedResult.wrongCount +
                              selectedResult.unattemptedCount
                          )}
                          className="text-slate-500"
                        />
                      </div>
                    </div>
                  </section>

                  {/* ================= SOLUTIONS ================= */}
                  <section className="space-y-4">
                    <div className="flex items-end justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <BookOpen className="h-5 w-5 text-brand-green" />

                          <h3 className="font-heading text-lg font-extrabold text-brand-dark">
                            Detailed Solutions
                          </h3>
                        </div>

                        <p className="mt-1 text-[10px] text-slate-400">
                          Question-wise answer review and NCERT concept
                          explanations
                        </p>
                      </div>

                      <span className="hidden rounded-lg bg-slate-100 px-2.5 py-1.5 text-[9px] font-bold text-slate-500 sm:inline-flex">
                        {solutions.length} Questions
                      </span>
                    </div>

                    {solutions.map((item, idx) => {
                      const q = item.question;

                      const isCorrect =
                        item.yourAnswer === q.correctAnswer;

                      const isUnattempted =
                        item.yourAnswer === null ||
                        item.yourAnswer === undefined;

                      return (
                        <article
                          key={idx}
                          className="solution-card print-card overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-[0_12px_35px_-25px_rgba(15,23,42,0.3)]"
                        >
                          {/* Question Header */}
                          <div className="flex items-center justify-between gap-3 border-b border-slate-100 bg-slate-50/70 px-4 py-3.5 sm:px-5">
                            <div className="flex items-center gap-3">
                              <span className="flex h-7 min-w-7 items-center justify-center rounded-lg bg-brand-dark px-2 text-[10px] font-extrabold text-white">
                                {String(idx + 1).padStart(2, "0")}
                              </span>

                              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                                Question {idx + 1}
                              </span>
                            </div>

                            <span
                              className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[9px] font-extrabold ${
                                isCorrect
                                  ? "bg-emerald-50 text-emerald-700"
                                  : isUnattempted
                                  ? "bg-slate-100 text-slate-600"
                                  : "bg-rose-50 text-rose-700"
                              }`}
                            >
                              {isCorrect ? (
                                <CheckCircle className="h-3 w-3" />
                              ) : isUnattempted ? (
                                <CircleAlert className="h-3 w-3" />
                              ) : (
                                <XCircle className="h-3 w-3" />
                              )}

                              {isCorrect
                                ? "Correct · +4"
                                : isUnattempted
                                ? "Unattempted · 0"
                                : "Incorrect · −1"}
                            </span>
                          </div>

                          <div className="space-y-5 p-4 sm:p-5">
                            {/* Question */}
                            <p className="text-sm font-semibold leading-6 text-brand-dark">
                              {q.questionText}
                            </p>

                            {/* Question Image */}
                            {q.questionImageUrl && (
                              <div className="rounded-xl border border-slate-200 bg-slate-50 p-2">
                                <img
                                  src={q.questionImageUrl}
                                  alt="Question illustration"
                                  className="question-image mx-auto max-h-64 rounded-lg object-contain"
                                />
                              </div>
                            )}

                            {/* Options */}
                            <div className="space-y-2">
                              {q.options?.map((opt, optIdx) => {
                                const isSelected =
                                  item.yourAnswer === optIdx;

                                const isRight =
                                  q.correctAnswer === optIdx;

                                return (
                                  <div
                                    key={optIdx}
                                    className={`flex items-center justify-between gap-3 rounded-xl border px-3.5 py-3 text-xs transition ${
                                      isRight
                                        ? "border-emerald-300 bg-emerald-50 text-emerald-900"
                                        : isSelected
                                        ? "border-rose-300 bg-rose-50 text-rose-900"
                                        : "border-slate-200 bg-white text-slate-600"
                                    }`}
                                  >
                                    <div className="flex min-w-0 items-center gap-3">
                                      <span
                                        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-[9px] font-extrabold ${
                                          isRight
                                            ? "bg-emerald-200 text-emerald-800"
                                            : isSelected
                                            ? "bg-rose-200 text-rose-800"
                                            : "bg-slate-100 text-slate-500"
                                        }`}
                                      >
                                        {String.fromCharCode(
                                          65 + optIdx
                                        )}
                                      </span>

                                      <span className="leading-5">
                                        {opt.text}
                                      </span>
                                    </div>

                                    <div className="flex shrink-0 items-center gap-2">
                                      {isRight && (
                                        <span className="hidden text-[8px] font-extrabold uppercase tracking-wider text-emerald-600 sm:inline">
                                          Correct Answer
                                        </span>
                                      )}

                                      {isRight && (
                                        <CheckCircle className="h-4 w-4 text-emerald-600" />
                                      )}

                                      {!isRight && isSelected && (
                                        <XCircle className="h-4 w-4 text-rose-600" />
                                      )}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>

                            {/* Explanation */}
                            {q.explanation && (
                              <div className="rounded-2xl border border-brand-green/10 bg-brand-soft/60 p-4">
                                <div className="flex items-center gap-2">
                                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-green/10">
                                    <FileText className="h-3.5 w-3.5 text-brand-green" />
                                  </div>

                                  <div>
                                    <p className="text-[9px] font-extrabold uppercase tracking-[0.16em] text-brand-green">
                                      Concept Explanation
                                    </p>

                                    <p className="text-xs font-bold text-brand-dark">
                                      NCERT-based explanation
                                    </p>
                                  </div>
                                </div>

                                <p className="mt-3 text-xs leading-6 text-slate-600">
                                  {q.explanation}
                                </p>

                                {q.explanationImageUrl && (
                                  <div className="mt-4 rounded-xl border border-slate-200 bg-white p-2">
                                    <img
                                      src={q.explanationImageUrl}
                                      alt="Explanation illustration"
                                      className="explanation-image max-h-64 rounded-lg object-contain"
                                    />
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </article>
                      );
                    })}

                    {solutions.length === 0 && (
                      <div className="print-hidden rounded-2xl border border-dashed border-slate-200 bg-white px-6 py-12 text-center">
                        <BookOpen className="mx-auto h-7 w-7 text-slate-300" />
                        <p className="mt-3 text-sm font-bold text-slate-600">
                          Solutions unavailable
                        </p>
                        <p className="mt-1 text-xs text-slate-400">
                          Detailed solutions could not be loaded for this
                          attempt.
                        </p>
                      </div>
                    )}
                  </section>

                  {/* ================= PRINT FOOTER ================= */}
                  <div className="print-header mt-8 border-t border-slate-200 pt-4 text-center">
                    <p className="text-[8px] font-medium text-slate-400">
                      NEETVIDYA · Examination Performance Report
                    </p>

                    <p className="mt-1 text-[8px] text-slate-300">
                      This report is generated from the student's recorded
                      examination attempt.
                    </p>
                  </div>
                </div>
              )}
            </main>
          </div>
        )}
      </div>
    </>
  );
}

/* ================= SCORE METRIC ================= */

function ScoreMetric({ icon: Icon, label, value, tone }) {
  const tones = {
    green: {
      box: "bg-emerald-500/10",
      icon: "text-emerald-400",
      value: "text-emerald-400",
    },
    red: {
      box: "bg-rose-500/10",
      icon: "text-rose-400",
      value: "text-rose-400",
    },
    gray: {
      box: "bg-white/5",
      icon: "text-slate-400",
      value: "text-slate-200",
    },
    lime: {
      box: "bg-lime-400/10",
      icon: "text-brand-lime",
      value: "text-brand-lime",
    },
  };

  const style = tones[tone];

  return (
    <div className="rounded-xl border border-white/5 bg-white/[0.045] p-3.5">
      <div className="flex items-center justify-center gap-2">
        <div
          className={`flex h-7 w-7 items-center justify-center rounded-lg ${style.box}`}
        >
          <Icon className={`h-3.5 w-3.5 ${style.icon}`} />
        </div>

        <span className="text-[9px] font-semibold uppercase tracking-wider text-slate-400">
          {label}
        </span>
      </div>

      <p
        className={`mt-2 text-center font-heading text-lg font-extrabold ${style.value}`}
      >
        {value}
      </p>
    </div>
  );
}

/* ================= BREAKDOWN ITEM ================= */

function BreakdownItem({
  label,
  value,
  percentage,
  className,
}) {
  return (
    <div className="rounded-xl bg-slate-50 p-3 text-center">
      <p className={`text-lg font-extrabold ${className}`}>
        {value}
      </p>

      <p className="mt-0.5 text-[9px] font-bold uppercase tracking-wider text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-[9px] font-medium text-slate-400">
        {percentage}%
      </p>
    </div>
  );
}