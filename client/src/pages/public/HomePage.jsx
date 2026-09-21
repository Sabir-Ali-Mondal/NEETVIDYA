import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Target,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Layers,
  Clock,
  Users,
  ChevronDown,
} from "lucide-react";
import { motion } from "framer-motion";

import api from "../../config/api";
import images from "../../config/images";
import WhatsAppLink from "../../components/shared/WhatsAppLink";
import useContactSettings from "../../hooks/useContactSettings";
import { Reveal, FadeInCard } from "../../components/shared/MotionReveal";
import homeBackgroundVideo from "../../assets/video/green_black_background.mp4";

// Fallback image when a course has no uploaded banner.
const COURSE_FALLBACK_IMAGE = images.courseNeetDropper;

export default function HomePage() {
  const { settings } = useContactSettings();

  // Live course catalogue + their batches (replaces the old hardcoded list).
  const [courses, setCourses] = useState([]);
  const [batches, setBatches] = useState([]);
  const [coursesLoading, setCoursesLoading] = useState(true);
  const [openBatches, setOpenBatches] = useState(null);

  useEffect(() => {
    Promise.all([
      api.get("/courses").catch(() => ({ data: {} })),
      api.get("/batches/public").catch(() => ({ data: {} })),
    ])
      .then(([cRes, bRes]) => {
        setCourses(cRes.data?.data?.courses || []);
        setBatches(bRes.data?.data?.batches || []);
      })
      .finally(() => setCoursesLoading(false));
  }, []);

  // A batch's `course` may be a populated object ({ _id, name }) or a raw id.
  const batchCourseId = (batch) =>
    (batch?.course && typeof batch.course === "object"
      ? batch.course._id
      : batch?.course) || "";

  const batchesForCourse = (courseId) =>
    batches.filter((b) => batchCourseId(b) === courseId);

  const toggleBatches = (courseId) =>
    setOpenBatches((cur) => (cur === courseId ? null : courseId));

  const methodology = [
    {
      step: "01",
      title: "NCERT Deep Dive",
      desc: "Line-by-line concept breakdown in Physics, Chemistry, and Biology.",
    },
    {
      step: "02",
      title: "Daily DPP Drills",
      desc: "Mandatory 30-minute practice papers every evening after classes.",
    },
    {
      step: "03",
      title: "CBT Examination",
      desc: "Simulated exam hall environment with instant negative mark analysis.",
    },
    {
      step: "04",
      title: "Personal Mentor Review",
      desc: "1-on-1 error notebook discussion to guarantee zero repeated mistakes.",
    },
  ];

  return (
    <main className="min-h-screen overflow-hidden bg-brand-soft">

      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="relative overflow-hidden bg-brand-black text-white">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover opacity-25"
          aria-label="Background video"
        >
          <source src={homeBackgroundVideo} type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-brand-black/80" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(34,197,94,0.18),_transparent_38%),radial-gradient(circle_at_bottom_left,_rgba(163,230,53,0.10),_transparent_32%)]" />

        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-brand-green/20 blur-3xl animate-float-slow" />

        <div className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-brand-lime/10 blur-3xl animate-float-slow" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">

            {/* Hero Content */}
            <motion.div
              className="lg:col-span-7"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-green/30 bg-brand-green/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-brand-lime backdrop-blur-sm">
                <Target className="h-3.5 w-3.5" />
                NEET-focused academic coaching
              </div>

              <h1 className="font-heading text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
                Learn Better.
                <span className="mt-1 block text-brand-lime">
                  Prepare Smarter.
                </span>
                <span className="mt-1 block">
                  Achieve More.
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-base leading-7 text-gray-300 sm:text-lg">
                NEETVIDYA supports students with concept-based teaching,
                regular practice, and structured preparation for NEET-focused
                study goals.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  to="/register"
                  className="btn-lime group !px-7 !py-3 text-base shadow-lg shadow-brand-lime/20"
                >
                  Enroll
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </Link>

                <Link
                  to="/courses"
                  className="btn-secondary group !border-white/20 !px-6 !py-3 !text-white hover:!border-white/40 hover:!bg-white/10"
                >
                  View Programs
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-white/10 pt-6 text-xs text-gray-400">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-brand-lime" />
                  Regular Offline & Hybrid
                </div>

                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-brand-lime" />
                  Daily Practice Papers
                </div>

                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-brand-lime" />
                  Strict Negative Marking
                </div>
              </div>
            </motion.div>

            {/* Hero Image */}
            <motion.div
              className="lg:col-span-5"
              initial={{ opacity: 0, y: 28, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="overflow-hidden rounded-[2rem] border border-white/15 bg-white/5 p-2 shadow-[0_24px_70px_-25px_rgba(0,0,0,0.7)] backdrop-blur-sm">

                <div className="overflow-hidden rounded-[1.5rem] bg-white">
                  <img
                    src={images.aboutInstitute}
                    alt="NEETVIDYA Classroom"
                    className="block h-auto w-full object-contain"
                  />
                </div>

                <div className="mt-2 rounded-[1.5rem] border border-white/10 bg-brand-black/80 p-4 backdrop-blur-md sm:p-5">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-lime">
                        Admissions Open
                      </p>

                      <p className="mt-1 text-sm font-bold text-white sm:text-base">
                        Dropper & Class 11, 12 Batches
                      </p>
                    </div>

                    <WhatsAppLink
                      number={settings.whatsappNumber}
                      message={settings.whatsappDefaultMessage}
                      label="Enquire Now"
                      className="w-full rounded-lg bg-emerald-600 px-4 py-2.5 text-center text-xs font-semibold text-white transition-colors hover:bg-emerald-700 sm:w-auto"
                    />
                  </div>
                </div>

              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* =========================================================
          COURSES
      ========================================================= */}
      <section className="relative overflow-hidden bg-brand-soft py-16 sm:py-20 lg:py-24">
        <div className="pointer-events-none absolute -right-32 top-20 h-80 w-80 rounded-full bg-brand-green/10 blur-3xl" />

        <div className="pointer-events-none absolute -left-32 bottom-0 h-72 w-72 rounded-full bg-emerald-200/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <Reveal className="mx-auto mb-14 max-w-3xl text-center sm:mb-16">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand-green/20 bg-white/80 px-4 py-2 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-brand-green" />

              <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-green">
                Our Courses
              </span>
            </div>

            <h2 className="font-heading text-3xl font-extrabold leading-tight tracking-tight text-brand-dark sm:text-4xl lg:text-5xl">
              Two focused programmes.
              <span className="block text-brand-green">
                One clear goal.
              </span>
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
              Choose the programme that matches where you are in your NEET
              preparation journey.
            </p>

            <div className="mx-auto mt-7 flex items-center justify-center gap-3">
              <span className="h-px w-10 bg-brand-green/40" />
              <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
              <span className="h-px w-10 bg-brand-green/40" />
            </div>
          </Reveal>

          {coursesLoading ? (
            <div className="flex items-center justify-center py-16">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-brand-green border-t-transparent" />
            </div>
          ) : courses.length === 0 ? (
            <div className="mx-auto max-w-2xl rounded-[2rem] border-dashed border-brand-green/30 bg-white/80 p-8 text-center shadow-sm">
              <p className="font-heading text-xl font-extrabold text-brand-dark">
                No courses published yet
              </p>
              <p className="mt-2 text-sm text-slate-500">
                Our programmes will appear here once published.
              </p>
            </div>
          ) : (
            <div className="mx-auto grid max-w-5xl items-start gap-8 md:grid-cols-2">
              {courses.map((course, i) => {
                const courseBatches = batchesForCourse(course._id);
                const isOpen = openBatches === course._id;

                return (
                  <FadeInCard
                    key={course._id}
                    delay={i * 0.1}
                    className="flex flex-col overflow-hidden rounded-[2rem] border-white/80 bg-white p-3 shadow-[0_12px_50px_-20px_rgba(15,23,42,0.18)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_24px_60px_-20px_rgba(15,23,42,0.25)]"
                  >
                    <div className="relative overflow-hidden rounded-[1.5rem] bg-brand-soft">
                      <img
                        src={course.coverImageUrl || COURSE_FALLBACK_IMAGE}
                        alt={course.name}
                        loading="lazy"
                        className="h-52 w-full object-cover transition-transform duration-700 group-hover:scale-[1.03] sm:h-56"
                      />

                      {course.targetClass && (
                        <div className="absolute left-4 top-4">
                          <span className="inline-flex rounded-full border-white/80 bg-white/90 px-3 py-1.5 text-xs font-bold text-brand-dark shadow-sm backdrop-blur">
                            {course.targetClass}
                          </span>
                        </div>
                      )}

                      {courseBatches.length > 0 && (
                        <div className="absolute right-4 top-4">
                          <span className="inline-flex items-center gap-1.5 rounded-full border-white/80 bg-brand-green px-3 py-1.5 text-xs font-bold text-white shadow-sm">
                            <Layers className="h-3.5 w-3.5" />
                            {courseBatches.length}{" "}
                            {courseBatches.length === 1 ? "batch" : "batches"}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-1 flex-col px-4 pb-4 pt-6 sm:px-5 sm:pb-5">
                      <h3 className="font-heading text-2xl font-extrabold text-brand-dark transition-colors duration-300 group-hover:text-brand-green">
                        {course.name}
                      </h3>

                      {course.description && (
                        <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
                          {course.description}
                        </p>
                      )}

                      {course.features?.length > 0 && (
                        <div className="mt-5 flex-wrap gap-2">
                          {course.features.slice(0, 4).map((feature) => (
                            <span
                              key={feature}
                              className="inline-flex items-center gap-1.5 rounded-full border-slate-200 bg-brand-soft px-3 py-1.5 text-xs font-semibold text-slate-700"
                            >
                              <CheckCircle2 className="h-3.5 w-3.5 text-brand-green" />
                              {feature}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Batches (revealed by the Show Batches button) */}
                      {isOpen && (
                        <div className="mt-5 space-y-2.5">
                          {courseBatches.length === 0 ? (
                            <div className="rounded-2xl border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-center">
                              <p className="text-sm font-bold text-slate-600">
                                No batches running yet
                              </p>
                            </div>
                          ) : (
                            courseBatches.map((batch) => (
                              <div
                                key={batch._id}
                                className="rounded-2xl border-slate-200 bg-slate-50/70 p-4"
                              >
                                <div className="flex flex-wrap items-center gap-2">
                                  <span className="rounded-lg bg-white px-2.5 py-1 font-mono text-[11px] font-black text-slate-600">
                                    {batch.code || "—"}
                                  </span>

                                  <span className="rounded-lg border-slate-200 bg-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-slate-500">
                                    {batch.batchType?.replace(/_/g, " ") ||
                                      "NEET UG"}
                                  </span>
                                </div>

                                <p className="mt-2 text-sm font-extrabold text-brand-dark">
                                  {batch.name}
                                </p>

                                {batch.schedule && (
                                  <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
                                    <Clock className="h-3.5 w-3.5 shrink-0" />
                                    {batch.schedule}
                                  </p>
                                )}

                                <p className="mt-1.5 flex items-center gap-1.5 text-[11px] text-slate-400">
                                  <Users className="h-3.5 w-3.5" />
                                  {batch.students?.length || 0} students
                                  {batch.capacity
                                    ? ` · ${batch.capacity} seats`
                                    : ""}
                                </p>
                              </div>
                            ))
                          )}
                        </div>
                      )}

                      {/* Fees + enroll */}
                      <div className="mt-auto pt-7">
                        <div className="flex items-end justify-between gap-4 border-t border-slate-100 pt-5">
                          <div>
                            <span className="block text-xs font-medium text-slate-500">
                              Fees
                            </span>

                            <span className="font-heading text-2xl font-extrabold text-brand-dark">
                              ₹
                              {(course.feeAmount || 0).toLocaleString("en-IN")}
                            </span>
                          </div>

                          <Link
                            to="/register"
                            className="btn-primary group/btn !px-5 !py-2.5 text-sm"
                          >
                            Enroll Now
                            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-0.5" />
                          </Link>
                        </div>

                        {/* Show Batches — full-width, at the bottom of the card */}
                        <button
                          type="button"
                          onClick={() => toggleBatches(course._id)}
                          aria-expanded={isOpen}
                          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border-brand-green/30 bg-white px-4 py-3 text-sm font-bold text-brand-green transition-all duration-300 hover:bg-brand-soft"
                        >
                          <Layers className="h-4 w-4" />
                          {isOpen ? "Hide Batches" : "Show Batches"}
                          <span className="rounded-full bg-brand-soft px-2 py-0.5 text-[11px] font-extrabold">
                            {courseBatches.length}
                          </span>
                          <ChevronDown
                            className={`h-4 w-4 transition-transform duration-300 ${
                              isOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  </FadeInCard>
                );
              })}
            </div>
          )}

          <Reveal className="mx-auto mt-12 max-w-2xl text-center sm:mt-14">
            <Link
              to="/courses"
              className="btn-primary group inline-flex items-center justify-center gap-2 !px-8 !py-3.5 text-base shadow-elevated hover:shadow-glow-green"
            >
              Enroll for Individual Batches
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            <p className="mt-3 text-sm text-slate-500">
              See the live batches and schedules running for each programme.
            </p>
          </Reveal>
        </div>
      </section>

      {/* =========================================================
          METHODOLOGY
      ========================================================= */}
      <section className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-24">
        <div className="pointer-events-none absolute -top-32 right-0 h-80 w-80 rounded-full bg-brand-green/10 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-32 left-0 h-72 w-72 rounded-full bg-emerald-100/30 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <Reveal className="mx-auto mb-14 max-w-3xl text-center sm:mb-16">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand-green/20 bg-brand-soft px-4 py-2">
              <Sparkles className="h-3.5 w-3.5 text-brand-green" />

              <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-green">
                Our Approach
              </span>
            </div>

            <h2 className="font-heading text-3xl font-extrabold leading-tight tracking-tight text-brand-dark sm:text-4xl lg:text-5xl">
              The NEETVIDYA
              <span className="block text-brand-green">
                Preparation Framework.
              </span>
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
              Concept learning, regular practice, and guided improvement
              working together throughout your preparation.
            </p>

            <div className="mx-auto mt-7 flex items-center justify-center gap-3">
              <span className="h-px w-10 bg-brand-green/40" />
              <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
              <span className="h-px w-10 bg-brand-green/40" />
            </div>
          </Reveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {methodology.map((item, i) => (
              <FadeInCard
                key={item.step}
                delay={i * 0.08}
                className="group relative overflow-hidden rounded-[1.75rem] border border-slate-100 bg-brand-soft p-6 transition-all duration-500 hover:-translate-y-2 hover:border-brand-green/20 hover:bg-white hover:shadow-[0_20px_50px_-20px_rgba(15,23,42,0.18)]"
              >
                <span className="pointer-events-none absolute -right-3 -top-5 select-none font-heading text-7xl font-extrabold text-brand-green/10 transition-colors duration-500 group-hover:text-brand-green/20">
                  {item.step}
                </span>

                <div className="relative">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-sm font-extrabold text-brand-green shadow-sm">
                    {item.step}
                  </div>

                  <h3 className="mt-6 font-heading text-xl font-extrabold leading-tight text-brand-dark">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {item.desc}
                  </p>

                  <div className="mt-6 h-px w-full bg-slate-200/80 transition-colors duration-300 group-hover:bg-brand-green/20" />

                  <div className="mt-4 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-green">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    NEETVIDYA
                  </div>
                </div>
              </FadeInCard>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================
          TEST SERIES
      ========================================================= */}
      <section className="relative overflow-hidden bg-brand-black py-16 text-white sm:py-20 lg:py-24">
        <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-brand-green/15 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-brand-lime/10 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <Reveal>
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-brand-dark via-brand-dark to-gray-950 p-3 shadow-[0_25px_70px_-30px_rgba(0,0,0,0.8)]">

              <div className="grid items-center gap-8 rounded-[1.5rem] border border-white/5 bg-white/[0.02] p-6 sm:p-8 lg:grid-cols-12 lg:gap-12 lg:p-10">

                <div className="lg:col-span-7">
                  <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand-lime/20 bg-brand-lime/10 px-4 py-2">
                    <span className="h-2 w-2 rounded-full bg-brand-lime" />

                    <span className="text-xs font-bold uppercase tracking-[0.18em] text-brand-lime">
                      Comprehensive Test Series
                    </span>
                  </div>

                  <h2 className="font-heading text-3xl font-extrabold leading-tight sm:text-4xl">
                    NEETVIDYA
                    <span className="block text-brand-lime">
                      Computerized Test Engine.
                    </span>
                  </h2>

                  <p className="mt-5 max-w-2xl text-sm leading-7 text-gray-300 sm:text-base">
                    Experience full-screen exam simulation, question
                    palettes, review tags, and comprehensive solution
                    scorecards designed around serious NEET preparation.
                  </p>

                  <div className="mt-7 flex flex-wrap gap-3">
                    <Link
                      to="/contact#contact-form"
                      className="btn-lime group !px-6 !py-3 text-sm"
                    >
                      Explore Test Series
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </Link>

                    <Link
                      to="/contact#contact-form"
                      className="btn-secondary !border-white/20 !px-6 !py-3 !text-white hover:!border-white/40 hover:!bg-white/10"
                    >
                      Request Sample Papers
                    </Link>
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <div className="group overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/5 p-2">
                    <img
                      src={images.testSeriesBanner}
                      alt="NEETVIDYA Test Series Preview"
                      loading="lazy"
                      className="h-auto max-h-72 w-full rounded-[1.25rem] object-contain transition-transform duration-700 group-hover:scale-[1.02]"
                    />
                  </div>
                </div>

              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* =========================================================
          FINAL CTA
      ========================================================= */}
      <section className="relative overflow-hidden bg-brand-soft py-20 sm:py-24">
        <div className="pointer-events-none absolute -top-24 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-brand-green/10 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-32 -right-32 h-72 w-72 rounded-full bg-emerald-100/30 blur-3xl" />

        <Reveal className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">

          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-green/20 bg-white/80 px-4 py-2 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-brand-green" />

            <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-green">
              Start Your Journey
            </span>
          </div>

          <h2 className="font-heading text-3xl font-extrabold leading-tight tracking-tight text-brand-dark sm:text-4xl lg:text-5xl">
            Ready to begin your
            <span className="block text-brand-green">
              NEET preparation?
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
            Book a counselling session or register for the next available
            admission cycle and get the batch details you need.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/register"
              className="btn-primary !px-8 !py-3.5 text-base shadow-elevated hover:shadow-glow-green"
            >
              Register for Admission
            </Link>

            <Link
              to="/contact#contact-form"
              className="btn-secondary !px-7 !py-3.5 text-base"
            >
              Contact Admissions
            </Link>
          </div>

          <div className="mx-auto mt-8 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-brand-green/30" />
            <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
            <span className="h-px w-10 bg-brand-green/30" />
          </div>

          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
            Learn with confidence. Prepare with purpose.
          </p>

        </Reveal>
      </section>

    </main>
  );
}