import { useState, useEffect, useCallback, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  Flag,
  Eraser,
  Send,
  Clock,
  AlertTriangle,
  Menu,
  X,
} from "lucide-react";
import api from "../../config/api";
import { alertSuccess, alertError, confirmDialog } from "../../utils/alert";

export default function ExamPage() {
  const { examId } = useParams();
  const navigate = useNavigate();

  const [examData, setExamData] = useState(null);
  const [attemptId, setAttemptId] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showPalette, setShowPalette] = useState(false);

  const saveInterval = useRef(null);

  const startExam = useCallback(async () => {
    try {
      const { data } = await api.post(`/attempts/exam/${examId}/start`);
      const d = data.data;

      setExamData(d);
      setAttemptId(d.attemptId);
      setQuestions(d.questions || []);

      if (d.answers && d.answers.length > 0) {
        setAnswers(d.answers);
      } else {
        setAnswers(
          (d.questions || []).map(() => ({
            selectedOption: null,
            markedForReview: false,
          }))
        );
      }

      const remaining = Math.max(
        0,
        Math.floor((new Date(d.serverEndTime) - Date.now()) / 1000)
      );

      setTimeLeft(
        remaining > 0 ? remaining : (d.duration || 30) * 60
      );

      setLoading(false);
    } catch (err) {
      alertError(
        err.response?.data?.message || "Could not initialize exam"
      );
      navigate("/student/tests");
    }
  }, [examId, navigate]);

  useEffect(() => {
    startExam();

    return () => {
      if (saveInterval.current) {
        clearInterval(saveInterval.current);
      }
    };
  }, [startExam]);

  // Periodic Auto-Save
  useEffect(() => {
    if (!attemptId) return;

    saveInterval.current = setInterval(() => {
      api
        .put(`/attempts/${attemptId}/save`, {
          answers,
          currentQuestion: currentQ,
        })
        .catch(() => {});
    }, 20000);

    return () => clearInterval(saveInterval.current);
  }, [attemptId, answers, currentQ]);

  // Timer Tick
  useEffect(() => {
    if (loading || !attemptId) return;

    if (timeLeft <= 0) {
      submitExam(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, loading, attemptId]);

  const submitExam = async (auto = false) => {
    if (submitting) return;

    setSubmitting(true);

    if (saveInterval.current) {
      clearInterval(saveInterval.current);
    }

    try {
      await api
        .put(`/attempts/${attemptId}/save`, {
          answers,
          currentQuestion: currentQ,
        })
        .catch(() => {});

      await api.post(`/attempts/${attemptId}/submit`);

      alertSuccess(
        auto
          ? "Time expired. Exam auto-submitted."
          : "Exam submitted successfully!"
      );

      navigate(`/student/results`);
    } catch (err) {
      alertError("Error finalizing exam submission");
      navigate("/student/results");
    } finally {
      setSubmitting(false);
    }
  };

  const selectOption = (optIdx) => {
    const updated = [...answers];

    if (!updated[currentQ]) {
      updated[currentQ] = {
        selectedOption: null,
        markedForReview: false,
      };
    }

    updated[currentQ].selectedOption =
      updated[currentQ].selectedOption === optIdx ? null : optIdx;

    setAnswers(updated);
  };

  const toggleReview = () => {
    const updated = [...answers];

    if (!updated[currentQ]) {
      updated[currentQ] = {
        selectedOption: null,
        markedForReview: false,
      };
    }

    updated[currentQ].markedForReview =
      !updated[currentQ].markedForReview;

    setAnswers(updated);
  };

  const clearResponse = () => {
    const updated = [...answers];

    if (!updated[currentQ]) {
      updated[currentQ] = {
        selectedOption: null,
        markedForReview: false,
      };
    }

    updated[currentQ].selectedOption = null;
    setAnswers(updated);
  };

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;

    return `${String(h).padStart(2, "0")}:${String(m).padStart(
      2,
      "0"
    )}:${String(s).padStart(2, "0")}`;
  };

  const getState = (idx) => {
    const a = answers[idx];

    if (!a) return "UNANSWERED";
    if (a.selectedOption !== null && a.markedForReview) {
      return "ANSWERED_REVIEW";
    }
    if (a.markedForReview) return "MARKED_REVIEW";
    if (a.selectedOption !== null) return "ANSWERED";

    return "UNANSWERED";
  };

  const stateColors = {
    ANSWERED: "bg-emerald-600 text-white font-bold",
    UNANSWERED: "bg-rose-500 text-white font-bold",
    MARKED_REVIEW: "bg-purple-600 text-white font-bold",
    ANSWERED_REVIEW:
      "bg-purple-600 text-white font-bold ring-2 ring-emerald-400",
  };

  const answeredCount = answers.filter(
    (a) => a?.selectedOption !== null && a?.selectedOption !== undefined
  ).length;

  const reviewCount = answers.filter(
    (a) => a?.markedForReview
  ).length;

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-brand-soft px-4">
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-lg">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-green border-t-transparent" />
          </div>

          <p className="mt-4 text-sm font-semibold text-slate-600">
            Loading Computerized Exam Environment...
          </p>

          <p className="mt-1 text-xs text-slate-400">
            Please wait while your examination is prepared.
          </p>
        </div>
      </div>
    );
  }

  const question = questions[currentQ];

  return (
    <div className="flex min-h-screen flex-col bg-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-brand-black text-white shadow-lg">
        <div className="flex min-h-[60px] items-center justify-between gap-3 px-3 sm:px-5 lg:px-6">
          <div className="min-w-0">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-lime/10">
                <span className="text-[10px] font-black text-brand-lime">
                  NV
                </span>
              </div>

              <div className="min-w-0">
                <div className="truncate text-sm font-extrabold text-brand-lime sm:text-base">
                  NEETVIDYA CBT
                </div>

                <div className="hidden text-[10px] text-slate-400 sm:block">
                  Standard Marking Pattern
                </div>
              </div>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <div
              className={`flex items-center gap-1.5 rounded-xl border px-2.5 py-2 font-mono text-xs font-bold sm:px-3 sm:text-sm ${
                timeLeft < 300
                  ? "animate-pulse border-rose-500 bg-rose-950 text-rose-300"
                  : "border-white/10 bg-white/10 text-white"
              }`}
            >
              <Clock
                className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${
                  timeLeft < 300
                    ? "text-rose-400"
                    : "text-brand-lime"
                }`}
              />

              <span>{formatTime(timeLeft)}</span>
            </div>

            <button
              onClick={async () => {
                const confirmed = await confirmDialog({
                  title: "Submit Examination?",
                  text: "Are you sure you want to submit your test now?",
                  confirmText: "Yes, submit",
                });

                if (confirmed) {
                  submitExam(false);
                }
              }}
              disabled={submitting}
              className="hidden min-h-9 items-center justify-center gap-1.5 rounded-lg bg-emerald-600 px-3 text-xs font-bold text-white transition hover:bg-emerald-500 disabled:opacity-50 sm:flex"
            >
              <Send className="h-3.5 w-3.5" />
              Submit Exam
            </button>

            <button
              type="button"
              onClick={() => setShowPalette((v) => !v)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/10 text-white lg:hidden"
              aria-label="Question palette"
            >
              {showPalette ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Palette */}
      {showPalette && (
        <div className="fixed inset-0 z-30 bg-black/30 lg:hidden">
          <div className="absolute right-0 top-[60px] h-[calc(100dvh-60px)] w-[min(90vw,360px)] overflow-y-auto border-l border-slate-200 bg-white p-5 shadow-2xl">
            <QuestionPalette
              questions={questions}
              currentQ={currentQ}
              setCurrentQ={(idx) => {
                setCurrentQ(idx);
                setShowPalette(false);
              }}
              getState={getState}
              stateColors={stateColors}
              answeredCount={answeredCount}
              reviewCount={reviewCount}
            />
          </div>
        </div>
      )}

      {/* Main */}
      <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
        {/* Question Area */}
        <main className="min-w-0 flex-1 p-3 sm:p-5 lg:p-6">
          <div className="mx-auto flex min-h-full max-w-5xl flex-col">
            <div className="flex-1 overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-sm sm:rounded-[1.75rem]">
              {/* Question Header */}
              <div className="border-b border-slate-100 px-4 py-4 sm:px-6 sm:py-5 lg:px-8">
                <div className="flex min-w-0 items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-slate-400 sm:text-xs">
                      Question {currentQ + 1} of {questions.length}
                    </div>

                    <div className="mt-1 text-xs text-slate-400">
                      {answeredCount} answered
                      {reviewCount > 0 && ` · ${reviewCount} review`}
                    </div>
                  </div>

                  <div className="flex shrink-0 gap-1.5 sm:gap-2">
                    <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[9px] font-extrabold text-emerald-700 sm:px-3 sm:text-[10px]">
                      +{question?.marks || 4}
                    </span>

                    <span className="rounded-full border border-rose-200 bg-rose-50 px-2.5 py-1 text-[9px] font-extrabold text-rose-700 sm:px-3 sm:text-[10px]">
                      -{question?.negativeMarks || 1}
                    </span>
                  </div>
                </div>
              </div>

              {/* Question Body */}
              <div className="p-4 sm:p-6 lg:p-8">
                <div className="space-y-5">
                  <p className="break-words text-[15px] font-medium leading-7 text-brand-dark sm:text-base sm:leading-7 lg:text-lg lg:leading-8">
                    {question?.questionText}
                  </p>

                  {question?.questionImageUrl && (
                    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-2 sm:p-3">
                      <img
                        src={question.questionImageUrl}
                        alt="Question diagram"
                        className="mx-auto max-h-[300px] max-w-full rounded-xl object-contain"
                      />
                    </div>
                  )}
                </div>

                {/* Options */}
                <div className="mt-7 space-y-2.5 sm:mt-8 sm:space-y-3">
                  {question?.options?.map((opt, idx) => {
                    const isSelected =
                      answers[currentQ]?.selectedOption === idx;

                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => selectOption(idx)}
                        className={`flex w-full min-w-0 items-center gap-3 rounded-2xl border-2 p-3.5 text-left text-sm font-medium transition-all sm:p-4 ${
                          isSelected
                            ? "border-brand-green bg-emerald-50/80 text-brand-dark shadow-sm"
                            : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                        }`}
                      >
                        <span
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-extrabold ${
                            isSelected
                              ? "bg-brand-green text-white"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {String.fromCharCode(65 + idx)}
                        </span>

                        <span className="min-w-0 flex-1 break-words leading-6">
                          {opt.text}
                          {opt.imageUrl && (
                            <img
                              src={opt.imageUrl}
                              alt={`Option ${String.fromCharCode(65 + idx)}`}
                              className="mt-2 max-h-40 rounded-lg border-slate-200 bg-white object-contain"
                            />
                          )}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Actions */}
                <div className="mt-7 border-t border-slate-100 pt-5 sm:mt-8 sm:pt-6">
                  <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={clearResponse}
                        className="flex min-h-10 items-center justify-center gap-1.5 rounded-xl border border-slate-200 px-3 text-[11px] font-bold text-slate-600 transition hover:border-rose-300 hover:text-rose-600 sm:text-xs"
                      >
                        <Eraser className="h-3.5 w-3.5" />
                        Clear
                      </button>

                      <button
                        type="button"
                        onClick={toggleReview}
                        className={`flex min-h-10 items-center justify-center gap-1.5 rounded-xl border px-3 text-[11px] font-bold transition sm:text-xs ${
                          answers[currentQ]?.markedForReview
                            ? "border-purple-300 bg-purple-50 text-purple-700"
                            : "border-slate-200 text-slate-600 hover:border-purple-300 hover:text-purple-600"
                        }`}
                      >
                        <Flag className="h-3.5 w-3.5" />

                        <span className="hidden sm:inline">
                          {answers[currentQ]?.markedForReview
                            ? "Marked for Review"
                            : "Mark Review"}
                        </span>

                        <span className="sm:hidden">
                          {answers[currentQ]?.markedForReview
                            ? "Reviewed"
                            : "Review"}
                        </span>
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        disabled={currentQ === 0}
                        onClick={() => setCurrentQ(currentQ - 1)}
                        className="flex min-h-10 items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 text-xs font-bold text-slate-700 transition hover:bg-slate-50 disabled:opacity-40"
                      >
                        <ChevronLeft className="h-4 w-4" />
                        Previous
                      </button>

                      {currentQ < questions.length - 1 ? (
                        <button
                          type="button"
                          onClick={() => setCurrentQ(currentQ + 1)}
                          className="flex min-h-10 items-center justify-center gap-1.5 rounded-xl bg-brand-green px-4 text-xs font-bold text-white shadow-sm transition hover:bg-green-700"
                        >
                          Next
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={async () => {
                            const confirmed = await confirmDialog({
                              title: "Submit Final Exam?",
                              text: "Submit final exam responses?",
                              confirmText: "Submit",
                            });

                            if (confirmed) {
                              submitExam(false);
                            }
                          }}
                          disabled={submitting}
                          className="flex min-h-10 items-center justify-center gap-1.5 rounded-xl bg-brand-green px-4 text-xs font-bold text-white transition hover:bg-green-700 disabled:opacity-50"
                        >
                          <Send className="h-3.5 w-3.5" />
                          Submit
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Desktop Palette */}
        <aside className="hidden w-80 shrink-0 border-l border-slate-200 bg-white lg:flex lg:flex-col">
          <div className="flex-1 overflow-y-auto p-5 xl:p-6">
            <QuestionPalette
              questions={questions}
              currentQ={currentQ}
              setCurrentQ={setCurrentQ}
              getState={getState}
              stateColors={stateColors}
              answeredCount={answeredCount}
              reviewCount={reviewCount}
            />
          </div>

          <div className="border-t border-slate-100 p-5">
            <button
              type="button"
              onClick={async () => {
                const confirmed = await confirmDialog({
                  title: "Grade Exam?",
                  text: "Ready to complete and grade this exam?",
                  confirmText: "Complete & Grade",
                });

                if (confirmed) {
                  submitExam(false);
                }
              }}
              disabled={submitting}
              className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand-green px-4 text-sm font-extrabold text-white shadow-sm transition hover:bg-green-700 disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
              Finish & View Score
            </button>
          </div>
        </aside>
      </div>

      {/* Mobile Bottom Submit */}
      <div className="border-t border-slate-200 bg-white p-3 lg:hidden">
        <button
          type="button"
          onClick={async () => {
            const confirmed = await confirmDialog({
              title: "Grade Exam?",
              text: "Ready to complete and grade this exam?",
              confirmText: "Complete & Grade",
            });

            if (confirmed) {
              submitExam(false);
            }
          }}
          disabled={submitting}
          className="flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-brand-green px-4 text-sm font-extrabold text-white shadow-sm transition hover:bg-green-700 disabled:opacity-50"
        >
          <Send className="h-4 w-4" />
          Finish & View Score
        </button>
      </div>
    </div>
  );
}

function QuestionPalette({
  questions,
  currentQ,
  setCurrentQ,
  getState,
  stateColors,
  answeredCount,
  reviewCount,
}) {
  return (
    <div>
      <div className="mb-5">
        <h3 className="font-heading text-sm font-extrabold text-brand-dark">
          Question Palette
        </h3>

        <div className="mt-1 text-[11px] text-slate-400">
          {answeredCount} of {questions.length} answered
          {reviewCount > 0 && ` · ${reviewCount} marked for review`}
        </div>
      </div>

      <div className="grid grid-cols-5 gap-2 sm:grid-cols-6 lg:grid-cols-5">
        {questions.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setCurrentQ(idx)}
            className={`flex h-10 w-full items-center justify-center rounded-xl text-xs font-extrabold transition-all ${
              stateColors[getState(idx)]
            } ${
              idx === currentQ
                ? "ring-4 ring-brand-black/20"
                : "hover:-translate-y-0.5"
            }`}
          >
            {idx + 1}
          </button>
        ))}
      </div>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <div className="mb-3 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
          Status
        </div>

        <div className="space-y-2.5 text-xs text-slate-600">
          <LegendItem
            className="bg-emerald-600"
            label="Answered"
          />

          <LegendItem
            className="bg-rose-500"
            label="Unanswered"
          />

          <LegendItem
            className="bg-purple-600"
            label="Marked for Review"
          />

          <LegendItem
            className="bg-purple-600 ring-2 ring-emerald-400"
            label="Answered & Review"
          />
        </div>
      </div>
    </div>
  );
}

function LegendItem({ className, label }) {
  return (
    <div className="flex items-center gap-2.5">
      <span
        className={`h-3.5 w-3.5 shrink-0 rounded ${className}`}
      />
      <span>{label}</span>
    </div>
  );
}