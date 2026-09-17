import { useState, useEffect, useCallback, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Flag, Eraser, Send, Clock, AlertTriangle } from "lucide-react";
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
        setAnswers((d.questions || []).map(() => ({ selectedOption: null, markedForReview: false })));
      }

      const remaining = Math.max(0, Math.floor((new Date(d.serverEndTime) - Date.now()) / 1000));
      setTimeLeft(remaining > 0 ? remaining : (d.duration || 30) * 60);
      setLoading(false);
    } catch (err) {
      alertError(err.response?.data?.message || "Could not initialize exam");
      navigate("/student/tests");
    }
  }, [examId, navigate]);

  useEffect(() => {
    startExam();
    return () => {
      if (saveInterval.current) clearInterval(saveInterval.current);
    };
  }, [startExam]);

  // Periodic Auto-Save
  useEffect(() => {
    if (!attemptId) return;
    saveInterval.current = setInterval(() => {
      api.put(`/attempts/${attemptId}/save`, { answers, currentQuestion: currentQ }).catch(() => {});
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
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, loading, attemptId]);

  const submitExam = async (auto = false) => {
    if (submitting) return;
    setSubmitting(true);
    if (saveInterval.current) clearInterval(saveInterval.current);

    try {
      await api.put(`/attempts/${attemptId}/save`, { answers, currentQuestion: currentQ }).catch(() => {});
      const { data } = await api.post(`/attempts/${attemptId}/submit`);
      alertSuccess(auto ? "Time expired. Exam auto-submitted." : "Exam submitted successfully!");
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
    if (!updated[currentQ]) updated[currentQ] = { selectedOption: null, markedForReview: false };
    updated[currentQ].selectedOption = updated[currentQ].selectedOption === optIdx ? null : optIdx;
    setAnswers(updated);
  };

  const toggleReview = () => {
    const updated = [...answers];
    if (!updated[currentQ]) updated[currentQ] = { selectedOption: null, markedForReview: false };
    updated[currentQ].markedForReview = !updated[currentQ].markedForReview;
    setAnswers(updated);
  };

  const clearResponse = () => {
    const updated = [...answers];
    if (!updated[currentQ]) updated[currentQ] = { selectedOption: null, markedForReview: false };
    updated[currentQ].selectedOption = null;
    setAnswers(updated);
  };

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  const getState = (idx) => {
    const a = answers[idx];
    if (!a) return "UNANSWERED";
    if (a.selectedOption !== null && a.markedForReview) return "ANSWERED_REVIEW";
    if (a.markedForReview) return "MARKED_REVIEW";
    if (a.selectedOption !== null) return "ANSWERED";
    return "UNANSWERED";
  };

  const stateColors = {
    ANSWERED: "bg-emerald-600 text-white font-bold",
    UNANSWERED: "bg-rose-500 text-white font-bold",
    MARKED_REVIEW: "bg-purple-600 text-white font-bold",
    ANSWERED_REVIEW: "bg-purple-600 text-white font-bold ring-2 ring-emerald-400",
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-brand-green border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm font-semibold text-gray-700">Loading Computerized Exam Environment...</p>
        </div>
      </div>
    );
  }

  const question = questions[currentQ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-100">
      {/* Top Serious Bar */}
      <header className="bg-brand-black text-white px-4 sm:px-6 py-3 border-b border-white/10 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <span className="font-heading font-extrabold text-base text-brand-lime">NEETVIDYA CBT</span>
          <span className="hidden sm:inline text-xs text-gray-400">| Standard Marking Pattern</span>
        </div>
        <div className="flex items-center gap-4">
          <div className={`px-3 py-1.5 rounded-lg font-mono text-sm sm:text-base font-bold flex items-center gap-2 ${
            timeLeft < 300 ? "bg-rose-900/80 text-rose-300 animate-pulse border border-rose-500" : "bg-white/10 text-white"
          }`}>
            <Clock className="w-4 h-4 text-brand-lime" />
            {formatTime(timeLeft)}
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
            className="btn-primary text-xs !py-1.5 !px-3 shadow-none bg-emerald-600 hover:bg-emerald-500"
          >
            <Send className="w-3.5 h-3.5" /> Submit Exam
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Left: Question Presentation */}
        <main className="flex-1 p-4 sm:p-6 flex flex-col justify-between">
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-gray-100">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                Question {currentQ + 1} of {questions.length}
              </span>
              <div className="flex gap-2">
                <span className="badge bg-emerald-50 text-emerald-700 border border-emerald-200">+{question?.marks || 4} Marks</span>
                <span className="badge bg-rose-50 text-rose-700 border border-rose-200">-{question?.negativeMarks || 1} Neg</span>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-base sm:text-lg font-medium text-brand-dark leading-relaxed">
                {question?.questionText}
              </p>

              {question?.questionImageUrl && (
                <img src={question.questionImageUrl} alt="Question diagram" className="max-h-64 rounded-xl border border-gray-200" />
              )}
            </div>

            {/* Options */}
            <div className="space-y-3 mt-8">
              {question?.options?.map((opt, idx) => {
                const isSelected = answers[currentQ]?.selectedOption === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => selectOption(idx)}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center gap-3 text-sm font-medium ${
                      isSelected
                        ? "border-brand-green bg-emerald-50/80 text-brand-dark shadow-sm"
                        : "border-gray-200 hover:border-gray-300 bg-white text-gray-700"
                    }`}
                  >
                    <span className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                      isSelected ? "bg-brand-green text-white" : "bg-gray-100 text-gray-600"
                    }`}>
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="leading-snug">{opt.text}</span>
                  </button>
                );
              })}
            </div>

            {/* Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 mt-8 pt-6 border-t border-gray-100">
              <div className="flex gap-2">
                <button
                  onClick={clearResponse}
                  className="px-3 py-1.5 rounded-btn text-xs font-semibold text-gray-600 hover:text-rose-600 border border-gray-200 hover:border-rose-300 transition-colors flex items-center gap-1"
                >
                  <Eraser className="w-3.5 h-3.5" /> Clear Response
                </button>
                <button
                  onClick={toggleReview}
                  className={`px-3 py-1.5 rounded-btn text-xs font-semibold border transition-colors flex items-center gap-1 ${
                    answers[currentQ]?.markedForReview
                      ? "bg-purple-50 text-purple-700 border-purple-300"
                      : "text-gray-600 hover:text-purple-600 border-gray-200 hover:border-purple-300"
                  }`}
                >
                  <Flag className="w-3.5 h-3.5" /> {answers[currentQ]?.markedForReview ? "Marked for Review" : "Mark Review"}
                </button>
              </div>

              <div className="flex gap-2">
                <button
                  disabled={currentQ === 0}
                  onClick={() => setCurrentQ(currentQ - 1)}
                  className="px-4 py-2 bg-white border border-gray-200 rounded-btn text-xs font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-40 transition-colors flex items-center gap-1"
                >
                  <ChevronLeft className="w-4 h-4" /> Previous
                </button>
                {currentQ < questions.length - 1 ? (
                  <button
                    onClick={() => setCurrentQ(currentQ + 1)}
                    className="btn-primary text-xs !py-2 !px-4"
                  >
                    Next Question <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={async () => {
                      const confirmed = await confirmDialog({
                        title: "Submit Final Exam?",
                        text: "Submit final exam responses?",
                        confirmText: "Submit",
                      });
                      if (confirmed) submitExam(false);
                    }}
                    className="btn-lime text-xs !py-2 !px-4"
                  >
                    <Send className="w-3.5 h-3.5" /> Submit Examination
                  </button>
                )}
              </div>
            </div>
          </div>
        </main>

        {/* Right: Question Palette & Status */}
        <aside className="w-full lg:w-80 bg-white border-t lg:border-t-0 lg:border-l border-gray-200 p-6 flex flex-col justify-between">
          <div>
            <h3 className="font-heading font-bold text-sm text-brand-dark mb-4">Question Palette</h3>
            <div className="grid grid-cols-5 gap-2.5 mb-6">
              {questions.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentQ(idx)}
                  className={`w-10 h-10 rounded-lg text-xs font-bold transition-all flex items-center justify-center ${
                    stateColors[getState(idx)]
                  } ${idx === currentQ ? "ring-4 ring-brand-black" : ""}`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>

            {/* Legend */}
            <div className="space-y-2 text-xs text-gray-600 bg-slate-50 p-4 rounded-xl border border-gray-200">
              <div className="flex items-center gap-2.5">
                <span className="w-3.5 h-3.5 bg-emerald-600 rounded" />
                <span>Answered</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-3.5 h-3.5 bg-rose-500 rounded" />
                <span>Unanswered</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-3.5 h-3.5 bg-purple-600 rounded" />
                <span>Marked for Review</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-3.5 h-3.5 bg-purple-600 ring-2 ring-emerald-400 rounded" />
                <span>Answered & Review</span>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-100">
            <button
              onClick={async () => {
                const confirmed = await confirmDialog({
                  title: "Grade Exam?",
                  text: "Ready to complete and grade this exam?",
                  confirmText: "Complete & Grade",
                });
                if (confirmed) submitExam(false);
              }}
              disabled={submitting}
              className="btn-primary w-full text-sm !py-3"
            >
              <Send className="w-4 h-4" /> Finish & View Score
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
