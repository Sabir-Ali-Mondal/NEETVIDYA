import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ClipboardList,
  Clock,
  Target,
  Award,
  Calendar,
  AlertTriangle,
  LogIn,
} from "lucide-react";
import api from "../../config/api";
import WhatsAppLink from "../../components/shared/WhatsAppLink";
import HomeButton from "../../components/shared/HomeButton";
import useContactSettings from "../../hooks/useContactSettings";

export default function PublicExamLanding() {
  const { slug } = useParams();
  const { settings } = useContactSettings();
  const [exam, setExam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await api.get(`/exams/public/${slug}`);
        setExam(data.data?.exam || null);
      } catch {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [slug]);

  // Ready-made request message. The student simply sends it — the team knows
  // exactly which exam (and which batch) they want access to.
  const waMessage = exam
    ? `Hello NEETVIDYA!\n\nI am interested in this exam and would like to request access:\n- Exam: ${exam.title}\n${exam.batchName ? `- Batch: ${exam.batchName}${exam.batchCode ? ` (${exam.batchCode})` : ""}\n` : ""}- Type: ${exam.testType?.replace(/_/g, " ") || "Exam"}\n\nPlease grant me permission to attempt this exam. Thank you!`
    : settings.whatsappDefaultMessage;

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-brand-soft">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-brand-green border-t-transparent" />
      </div>
    );
  }

  if (notFound || !exam) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-brand-soft px-5">
        <div className="max-w-md rounded-3xl border-slate-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
            <AlertTriangle className="h-7 w-7" />
          </div>
          <h1 className="mt-4 font-heading text-xl font-extrabold text-slate-900">
            Exam link not found
          </h1>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            This exam link is invalid or has been removed. Please check the link
            or contact NEETVIDYA.
          </p>
          <Link
            to="/"
            className="mt-5 inline-flex min-h-11 items-center justify-center rounded-xl bg-brand-green px-5 text-sm font-bold text-white transition hover:bg-green-700"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-brand-soft">
      <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-green-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-32 h-96 w-96 rounded-full bg-lime-200/40 blur-3xl" />

      <div className="relative mx-auto max-w-3xl px-4 py-10 sm:py-14">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="overflow-hidden rounded-[2rem] border-white/70 bg-white/90 shadow-xl shadow-slate-900/5 backdrop-blur-xl"
        >
          <div className="bg-brand-black px-6 py-7 text-white sm:px-8 sm:py-9">
            <div className="flex items-start justify-between gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border-brand-lime/20 bg-brand-lime/10 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.16em] text-brand-lime">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-lime" />
                NEETVIDYA Exam
              </span>

              <HomeButton label="Visit NEETVIDYA" />
            </div>

            <h1 className="mt-4 font-heading text-2xl font-extrabold tracking-tight sm:text-3xl">
              {exam.title}
            </h1>

            {exam.description && (
              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-400">
                {exam.description}
              </p>
            )}

            <div className="mt-4 flex-wrap items-center gap-2">
              <span className="rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
                {exam.testType?.replace(/_/g, " ")}
              </span>
              {exam.batchName && (
                <span className="rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-slate-300">
                  {exam.batchName}
                </span>
              )}
              <span
                className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wide ${exam.isOpen
                    ? "bg-green-500/20 text-green-300"
                    : "bg-amber-500/20 text-amber-300"
                  }`}
              >
                {exam.isOpen ? "Open" : "Not Open Yet"}
              </span>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <Stat
                icon={ClipboardList}
                label="Questions"
                value={exam.totalQuestions}
              />
              <Stat icon={Award} label="Total Marks" value={exam.totalMarks} />
              <Stat
                icon={Clock}
                label="Duration"
                value={`${exam.duration} min`}
              />
              <Stat
                icon={Target}
                label="Marking"
                value={`+${exam.marksPerCorrect} / -${exam.negativePerWrong}`}
              />
            </div>

            {(exam.startTime || exam.endTime) && (
              <div className="mt-4 flex items-center gap-2 rounded-xl bg-slate-50 px-3.5 py-3 text-xs text-slate-500">
                <Calendar className="h-4 w-4 shrink-0 text-slate-400" />
                <span>
                  {exam.startTime
                    ? new Date(exam.startTime).toLocaleString("en-IN")
                    : "—"}
                  {" → "}
                  {exam.endTime
                    ? new Date(exam.endTime).toLocaleString("en-IN")
                    : "—"}
                </span>
              </div>
            )}

            <div className="mt-6 space-y-2.5">
              <Link
                to="/login"
                className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand-green px-5 text-sm font-bold text-white shadow-sm transition hover:bg-green-700"
              >
                <LogIn className="h-4 w-4" />
                Log in to take this exam
              </Link>

              <div className="rounded-xl border-green-100 bg-green-50/70 p-4">
                <p className="text-xs font-semibold text-green-900">
                  {exam.batchName
                    ? `Not in the "${exam.batchName}" batch yet?`
                    : "Not enrolled yet?"}
                </p>
                <p className="mt-1 text-xs leading-5 text-green-800/90">
                  Send us a ready-made request on WhatsApp for this exact exam
                  and our team will grant you access.
                </p>
                <div className="mt-2.5">
                  <WhatsAppLink
                    number={settings.whatsappNumber}
                    message={waMessage}
                    label="Request exam access on WhatsApp"
                    className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-700 hover:text-white"
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function Stat({ icon: Icon, label, value }) {
  return (
    <div className="rounded-xl border-slate-100 bg-slate-50 p-3">
      <div className="mb-1 flex items-center gap-1.5 text-[10px] font-medium text-slate-400">
        <Icon className="h-3.5 w-3.5" />
        {label}
      </div>
      <div className="truncate text-sm font-extrabold text-slate-700">
        {value ?? "—"}
      </div>
    </div>
  );
}
