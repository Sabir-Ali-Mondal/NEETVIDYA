import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Clock,
  AlertTriangle,
  ArrowRight,
  FileText,
  CheckCircle2,
} from "lucide-react";
import api from "../../config/api";
import { alertError } from "../../utils/alert";

export default function ExamInstructions() {
  const { examId } = useParams();
  const navigate = useNavigate();
  const [exam, setExam] = useState(null);
  const [agreed, setAgreed] = useState(false);
  const [starting, setStarting] = useState(false);

  useEffect(() => {
    api
      .get(`/exams/${examId}`)
      .then(({ data }) => setExam(data.data?.exam))
      .catch(() => navigate("/student/tests"));
  }, [examId, navigate]);

  const handleStart = async () => {
    setStarting(true);
    try {
      await api.post(`/attempts/exam/${examId}/start`);
      navigate(`/exam/${examId}/attempt`);
    } catch (err) {
      alertError(err.response?.data?.message || "Cannot start exam");
      setStarting(false);
    }
  };

  if (!exam) return null;

  return (
    <div className="relative min-h-screen overflow-hidden bg-brand-soft px-3 py-6 sm:px-5 sm:py-10">
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-green-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-24 h-80 w-80 rounded-full bg-emerald-100/60 blur-3xl" />

      <div className="relative mx-auto w-full max-w-3xl">
        {/* Header */}
        <div className="mb-5 text-center sm:mb-7">
          <div className="inline-flex items-center gap-2 rounded-full border border-green-100 bg-white/80 px-3.5 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.16em] text-brand-green shadow-sm backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
            Examination Instructions
          </div>
        </div>

        <div className="overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white shadow-xl shadow-slate-900/5 sm:rounded-[2rem]">
          {/* Exam Header */}
          <div className="border-b border-slate-100 p-5 sm:p-7 lg:p-8">
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-brand-green sm:h-12 sm:w-12">
                <FileText className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>

              <div className="min-w-0 flex-1">
                <h1 className="font-heading text-xl font-extrabold leading-tight tracking-tight text-brand-dark sm:text-2xl lg:text-3xl">
                  {exam.title}
                </h1>

                {exam.description && (
                  <p className="mt-2 text-sm leading-6 text-slate-500 sm:text-[15px]">
                    {exam.description}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Exam Stats */}
          <div className="p-5 sm:p-7 lg:p-8">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
              <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4 text-center transition hover:border-green-100 hover:bg-green-50/40">
                <Clock className="mx-auto mb-2 h-5 w-5 text-brand-green" />
                <div className="text-lg font-extrabold text-slate-800 sm:text-xl">
                  {exam.duration}
                </div>
                <div className="mt-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Minutes
                </div>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4 text-center transition hover:border-green-100 hover:bg-green-50/40">
                <div className="mb-2 flex h-5 items-center justify-center">
                  <span className="text-lg font-extrabold text-slate-500">
                    #
                  </span>
                </div>
                <div className="text-lg font-extrabold text-slate-800 sm:text-xl">
                  {exam.totalQuestions}
                </div>
                <div className="mt-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Questions
                </div>
              </div>

              <div className="rounded-2xl border border-green-100 bg-green-50/60 p-4 text-center">
                <CheckCircle2 className="mx-auto mb-2 h-5 w-5 text-green-600" />
                <div className="text-lg font-extrabold text-green-600 sm:text-xl">
                  +{exam.marksPerCorrect}
                </div>
                <div className="mt-0.5 text-[10px] font-bold uppercase tracking-wider text-green-600/60">
                  Correct
                </div>
              </div>

              <div className="rounded-2xl border border-rose-100 bg-rose-50/60 p-4 text-center">
                <AlertTriangle className="mx-auto mb-2 h-5 w-5 text-rose-500" />
                <div className="text-lg font-extrabold text-rose-500 sm:text-xl">
                  -{exam.negativePerWrong}
                </div>
                <div className="mt-0.5 text-[10px] font-bold uppercase tracking-wider text-rose-500/60">
                  Wrong
                </div>
              </div>
            </div>

            {/* Important Instructions */}
            <div className="mt-5 rounded-2xl border border-amber-200/80 bg-amber-50/70 p-4 sm:mt-6 sm:p-5">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
                  <AlertTriangle className="h-4 w-4" />
                </div>

                <div className="min-w-0">
                  <h2 className="text-sm font-extrabold text-amber-900">
                    Important Instructions
                  </h2>

                  <ul className="mt-2 space-y-2 text-xs leading-5 text-amber-800 sm:text-sm">
                    <li className="flex gap-2">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-amber-500" />
                      <span>
                        Timer starts immediately upon clicking Start.
                      </span>
                    </li>

                    <li className="flex gap-2">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-amber-500" />
                      <span>
                        Test auto-submits when time expires.
                      </span>
                    </li>

                    <li className="flex gap-2">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-amber-500" />
                      <span>
                        Tab switching is recorded.
                      </span>
                    </li>

                    <li className="flex gap-2">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-amber-500" />
                      <span>
                        Only {exam.maxAttempts} attempt
                        {exam.maxAttempts !== 1 ? "s" : ""} allowed.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Agreement */}
            <label className="mt-5 flex cursor-pointer items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50/70 p-4 transition hover:border-green-200 hover:bg-green-50/30 sm:mt-6">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5 h-4 w-4 shrink-0 rounded accent-green-600"
              />

              <span className="text-sm font-medium leading-5 text-slate-700">
                I have read and understood all instructions
              </span>
            </label>

            {/* Start */}
            <button
              onClick={handleStart}
              disabled={!agreed || starting}
              className="mt-4 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand-green px-5 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-green-900/10 transition duration-300 hover:-translate-y-0.5 hover:bg-green-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0 sm:mt-5"
            >
              {starting ? "Starting..." : "Start Examination"}
              <ArrowRight className="h-4 w-4" />
            </button>

            <p className="mt-3 text-center text-[10px] leading-4 text-slate-400 sm:text-xs">
              Make sure you are ready before starting. The timer cannot be
              paused once the examination begins.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}