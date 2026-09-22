import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../config/api";
import { Reveal } from "../../components/shared/MotionReveal";
import images from "../../config/images";
import WhatsAppLink from "../../components/shared/WhatsAppLink";
import useContactSettings from "../../hooks/useContactSettings";
import {
  ClipboardList,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

export default function TestSeriesPage() {
  const { settings } = useContactSettings();
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);

  // Public, unauthenticated list of released (LIVE/PUBLISHED) exams. In NEETVIDYA
  // every published exam IS a test series offering, so this single list powers
  // the "Current test series" section.
  useEffect(() => {
    api
      .get("/exams/public")
      .then(({ data }) => setExams(data.data?.exams || []))
      .catch(() => setExams([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-brand-soft">
      {/* Decorative background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 right-0 h-96 w-96 rounded-full bg-brand-green/10 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[45%] -left-40 h-96 w-96 rounded-full bg-emerald-200/20 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-[-8rem] h-80 w-80 rounded-full bg-lime-200/20 blur-3xl"
      />

      {/* Hero */}
      <section className="relative mx-auto max-w-7xl px-4 pb-14 pt-16 sm:px-6 sm:pb-20 sm:pt-20 lg:px-8 lg:pb-24 lg:pt-24">
        <Reveal className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-green/20 bg-white/80 px-4 py-2 shadow-sm backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-brand-green" />

            <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-green">
              Assessment Support
            </span>
          </div>

          <h1 className="font-heading text-4xl font-extrabold leading-tight tracking-tight text-brand-dark sm:text-5xl lg:text-6xl">
            Practice With
            <span className="mt-1 block text-brand-green">
              Purpose.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            Build speed, accuracy, and confidence with structured NEET-style
            practice tests designed around important chapters and question
            patterns.
          </p>

          <div className="mx-auto mt-8 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-brand-green/40" />
            <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
            <span className="h-px w-10 bg-brand-green/40" />
          </div>
        </Reveal>
      </section>

      {/* Main content */}
      <section className="relative mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8 lg:pb-24">
        {/* Intro section */}
        <div className="mb-16 grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-green/20 bg-white px-4 py-2 text-xs font-semibold text-brand-green shadow-sm">
              <ClipboardList className="h-4 w-4" />
              Structured revision engine
            </div>

            <h2 className="mt-5 font-heading text-3xl font-extrabold leading-tight text-brand-dark sm:text-4xl">
              Turn practice into
              <span className="block text-brand-green">
                exam confidence.
              </span>
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
              Access realistic practice assessments and structured tests
              created and managed through the institute's academic system.
              Regular testing helps students understand their preparation and
              improve exam performance.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to="/register"
                className="inline-flex items-center gap-2 rounded-xl bg-brand-green px-6 py-3 text-sm font-bold text-white shadow-md shadow-brand-green/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brand-green/25"
              >
                Register for Access
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                to="/contact#contact-form"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-brand-dark shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-green/30 hover:text-brand-green"
              >
                Request Sample Papers
              </Link>
            </div>
          </div>

          {/* Banner */}
          <div className="group relative overflow-hidden rounded-[2rem] border border-white/80 bg-white p-3 shadow-[0_12px_50px_-20px_rgba(15,23,42,0.18)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_60px_-20px_rgba(15,23,42,0.22)]">
            <div className="overflow-hidden rounded-[1.5rem] bg-brand-soft">
              <img
                src={images.testSeriesBanner}
                alt="NEET Test Series Preview"
                className="block w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />
            </div>
          </div>
        </div>

        {/* Test heading */}
        <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-green">
              Available Tests
            </p>

            <h2 className="font-heading text-3xl font-extrabold leading-tight text-brand-dark sm:text-4xl">
              Current test series
            </h2>

            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
              Practice with assessments published by the NEETVIDYA academic
              team.
            </p>
          </div>

          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white bg-white px-4 py-2 text-xs font-semibold text-slate-600 shadow-sm">
            <ShieldCheck className="h-4 w-4 text-brand-green" />
            Admin-managed test library
          </div>
        </div>

        {/* Current test series — every published exam is a test-series offering */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-brand-green border-t-transparent" />
          </div>
        ) : exams.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
            {exams.map((exam) => (
              <article
                key={exam._id}
                  className="group relative flex flex-col overflow-hidden rounded-[2rem] border border-white/80 bg-white p-3 shadow-[0_12px_50px_-20px_rgba(15,23,42,0.18)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_24px_60px_-20px_rgba(15,23,42,0.25)]"
                >
                  {/* Accent */}
                  <div className="h-2 rounded-full bg-brand-green" />

                  <div className="flex flex-1 flex-col px-4 pb-4 pt-6 sm:px-5 sm:pb-5">
                    {/* Labels */}
                    <div className="mb-4 flex items-center justify-between gap-2">
                      <span className="max-w-[60%] truncate rounded-full border border-slate-200 bg-brand-soft px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-brand-dark">
                        {exam.testType?.replace(/_/g, " ") || "NEET Test"}
                      </span>

                      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-bold text-brand-green">
                        <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
                        {exam.status === "LIVE" ? "Live" : "Available"}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-heading text-2xl font-extrabold leading-tight text-brand-dark">
                      {exam.title}
                    </h3>

                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-500">
                      {exam.description ||
                        "Comprehensive test based on the NEET syllabus."}
                    </p>

                    {/* Exam information */}
                    <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-4 border-y border-slate-100 py-5">
                      <div>
                        <span className="mb-1 block text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
                          Questions
                        </span>

                        <span className="text-sm font-bold text-brand-dark">
                          {exam.totalQuestions} MCQs
                        </span>
                      </div>

                      <div>
                        <span className="mb-1 block text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
                          Duration
                        </span>

                        <span className="text-sm font-bold text-brand-dark">
                          {exam.duration} min
                        </span>
                      </div>

                      <div>
                        <span className="mb-1 block text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
                          Total Marks
                        </span>

                        <span className="text-sm font-bold text-brand-dark">
                          {exam.totalMarks}
                        </span>
                      </div>

                      <div>
                        <span className="mb-1 block text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
                          Marking
                        </span>

                        <span className="text-sm font-bold text-brand-dark">
                          +{exam.marksPerCorrect} / -{exam.negativePerWrong}
                        </span>
                      </div>
                    </div>

                    {/* Action */}
                    <div className="mt-auto space-y-2 pt-5">
                      <Link
                        to="/register"
                        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-green px-5 py-3 text-sm font-bold text-white shadow-md shadow-brand-green/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brand-green/25"
                      >
                        Register for Access
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </Link>

                      <WhatsAppLink
                        number={settings.whatsappNumber}
                        message={`Hello NEETVIDYA!\n\nI am interested in this test and would like to request access:\n- Test: ${exam.title}\n- Type: ${exam.testType?.replace(/_/g, " ") || "Exam"}\n\nPlease grant me permission to attempt it. Thank you!`}
                        label="Request access"
                        className="inline-flex w-full items-center justify-center gap-2 rounded-xl border-emerald-200 bg-emerald-50 px-5 py-2.5 text-xs font-bold text-emerald-700 transition hover:bg-emerald-100 hover:text-emerald-800"
                      />
                    </div>
                  </div>
                </article>
              ))}
          </div>
        ) : (
          <div className="mx-auto w-full max-w-2xl rounded-[2rem] border border-dashed border-brand-green/30 bg-white/80 p-8 text-center shadow-[0_12px_50px_-20px_rgba(15,23,42,0.15)] backdrop-blur-sm sm:p-12">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-green text-white shadow-lg shadow-brand-green/20">
              <CheckCircle2 className="h-8 w-8" />
            </div>

            <h3 className="font-heading text-2xl font-extrabold text-brand-dark sm:text-3xl">
              Tests are coming soon
            </h3>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
              New tests will appear here as they are published by the academic
              team.
            </p>
          </div>
        )}

        {/* Bottom message */}
        <div className="mx-auto mt-16 max-w-2xl text-center sm:mt-20">
          <p className="font-heading text-xl font-bold text-brand-dark sm:text-2xl">
            Every test is a step forward.
          </p>

          <p className="mt-3 text-sm leading-6 text-slate-500 sm:text-base">
            Practice regularly. Analyse your performance. Improve with purpose.
          </p>
        </div>
      </section>
    </main>
  );
}