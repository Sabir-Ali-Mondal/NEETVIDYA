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

  // =========================================================
  // COURSES + BATCHES
  // =========================================================
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

  const batchCourseId = (batch) =>
    (batch?.course && typeof batch.course === "object"
      ? batch.course._id
      : batch?.course) || "";

  const batchesForCourse = (courseId) =>
    batches.filter((b) => batchCourseId(b) === courseId);

  const toggleBatches = (courseId) =>
    setOpenBatches((cur) => (cur === courseId ? null : courseId));

  // =========================================================
  // METHODOLOGY
  // =========================================================
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
      <section className="relative overflow-hidden bg-[#071a12] text-white">

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

        <div className="absolute inset-0 bg-[#071a12]/90" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(34,197,94,0.18),_transparent_38%),radial-gradient(circle_at_bottom_left,_rgba(34,197,94,0.10),_transparent_32%)]" />

        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 animate-float-slow rounded-full bg-brand-green/20 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 animate-float-slow rounded-full bg-brand-green/10 blur-3xl" />

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

              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-green/30 bg-brand-green/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-brand-green backdrop-blur-sm">
                <Target className="h-3.5 w-3.5" />
                <span>
                  NEET-focused <span className="text-brand-lime">coaching</span>
                </span>
              </div>

              <h1 className="font-heading text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
                Learn{" "}
                <span className="text-brand-lime">Better.</span>

                <span className="mt-1 block text-brand-green">
                  Prepare <span className="text-brand-lime">Smarter.</span>
                </span>

                <span className="mt-1 block">
                  Achieve <span className="text-brand-lime">More.</span>
                </span>
              </h1>

              {/* Desktop Description */}
              <p className="mt-6 hidden max-w-xl text-base italic leading-7 text-gray-300 sm:block sm:text-lg">
                NEETVIDYA supports students with concept-based teaching,
                regular practice, and structured preparation for
                <span className="text-brand-lime"> NEET-focused</span> study goals.
              </p>

              {/* Mobile Description */}
              <p className="mt-5 font-heading text-sm font-bold italic tracking-wide text-white/80 sm:hidden">
                Your <span className="text-brand-lime">NEET journey</span> starts here.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">

                <Link
                  to="/register"
                  className="btn-lime group !bg-brand-green !px-7 !py-3 text-base !text-white shadow-lg shadow-brand-green/20 hover:!bg-brand-green/90"
                >
                  Enroll

                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </Link>

                <Link
                  to="/courses"
                  className="btn-secondary group hidden !border-white/20 !px-6 !py-3 !text-white hover:!border-brand-green/40 hover:!bg-brand-green/10 sm:inline-flex"
                >
                  View Programs

                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </Link>

              </div>

              <div className="mt-8 hidden flex-wrap items-center gap-x-6 gap-y-3 border-t border-white/10 pt-6 text-xs text-gray-400 sm:flex">

                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-brand-green" />
                  Regular Offline & Hybrid
                </div>

                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-brand-lime" />
                  Daily Practice Papers
                </div>

                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-brand-green" />
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

              <div className="overflow-hidden rounded-[2rem] border border-brand-green/20 bg-brand-green/5 p-2 shadow-[0_24px_70px_-25px_rgba(0,0,0,0.7)] backdrop-blur-sm">

                <div className="overflow-hidden rounded-[1.5rem] bg-white">
                  <img
                    src={images.aboutInstitute}
                    alt="NEETVIDYA Classroom"
                    className="block h-auto w-full object-contain"
                  />
                </div>

                <div className="mt-2 rounded-[1.5rem] border border-brand-green/20 bg-[#0b2418]/90 p-4 backdrop-blur-md sm:p-5">

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
                      className="w-full rounded-lg bg-brand-green px-4 py-2.5 text-center text-xs font-semibold text-white transition-colors hover:bg-brand-green/90 sm:w-auto"
                    />

                  </div>
                </div>

              </div>
            </motion.div>

          </div>
        </div>
      </section>


      {/* =========================================================
          COMPREHENSIVE TEST SERIES
      ========================================================= */}
      <section className="relative overflow-hidden bg-white/25 py-16 text-white sm:py-20 lg:py-24">

        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-brand-green/10 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-brand-green/10 blur-3xl" />

        <div className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-green/5 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <Reveal>

            <div className="relative overflow-hidden rounded-[2rem] border border-brand-green/20 bg-[#071a12] p-2.5 shadow-[0_30px_90px_-30px_rgba(7,26,18,0.55)] sm:p-3">

              <div className="relative grid items-center gap-8 overflow-hidden rounded-[1.5rem] border border-brand-green/10 bg-[#0b2418] p-6 sm:p-8 lg:grid-cols-12 lg:gap-12 lg:p-12">

                <div className="pointer-events-none absolute -right-24 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-brand-green/10 blur-3xl" />

                <div className="pointer-events-none absolute -left-32 -top-32 h-64 w-64 rounded-full bg-brand-green/5 blur-3xl" />


                {/* Test Series Content */}
                <div className="relative z-10 lg:col-span-7">

                  <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand-green/20 bg-brand-green/10 px-4 py-2">

                    <span className="h-2 w-2 animate-pulse rounded-full bg-brand-lime" />

                    <span className="text-xs font-bold uppercase tracking-[0.18em] text-brand-green">
                      <span className="hidden sm:inline">
                        Comprehensive{" "}
                      </span>
                      <span className="text-brand-lime">
                        Test Series
                      </span>
                    </span>

                  </div>

                  <h2 className="font-heading text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">

                    <span className="hidden sm:inline">
                      Practice Like the

                      <span className="block text-brand-green">
                        Real <span className="text-brand-lime">NEET Exam.</span>
                      </span>
                    </span>

                    <span className="sm:hidden">
                      Test Your

                      <span className="block text-brand-green">
                        <span className="text-brand-lime">NEET</span> Preparation.
                      </span>
                    </span>

                  </h2>

                  {/* Desktop Description */}
                  <p className="mt-5 hidden max-w-2xl text-sm leading-7 text-gray-300 sm:block sm:text-base">
                    Take structured, exam-focused computerised tests designed
                    to build speed, accuracy, time management, and confidence
                    before the actual <span className="text-brand-lime">NEET examination.</span>
                  </p>

                  {/* Mobile Description */}
                  <p className="mt-5 text-sm font-semibold italic leading-6 text-gray-300 sm:hidden">
                    Practice under <span className="text-brand-lime">real exam conditions.</span>
                  </p>

                  {/* Test Features */}
                  <div className="mt-7 hidden gap-3 sm:grid sm:grid-cols-2">

                    {[
                      "Full-screen CBT experience",
                      "Question navigation palette",
                      "Negative marking analysis",
                      "Detailed performance scorecard",
                    ].map((item, index) => (
                      <div
                        key={item}
                        className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-xs font-medium text-gray-300 transition-colors duration-300 hover:border-brand-green/20 hover:bg-brand-green/5"
                      >
                        <CheckCircle2
                          className={`h-4 w-4 shrink-0 ${
                            index === 1
                              ? "text-brand-lime"
                              : "text-brand-green"
                          }`}
                        />
                        {item}
                      </div>
                    ))}

                  </div>

                  {/* Actions */}
                  <div className="mt-7 flex flex-wrap gap-3 sm:mt-8">

<Link
  to="/test-series"
  className="btn-lime group !bg-brand-green !px-6 !py-3 text-sm !text-white shadow-lg shadow-brand-green/20 hover:!bg-brand-green/90"
>
  <span className="hidden sm:inline">
    Explore Test Series
  </span>

  <span className="sm:hidden">
    Explore Tests
  </span>

  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
</Link>
                  </div>
                </div>


                {/* Test Series Preview */}
                <div className="relative z-10 lg:col-span-5">

                  <div className="group overflow-hidden rounded-[1.5rem] border border-brand-green/15 bg-brand-green/5 p-2 shadow-2xl">

                    <div className="overflow-hidden rounded-[1.25rem] bg-[#06140d]">
                      <img
                        src={images.testSeriesBanner}
                        alt="NEETVIDYA Computerized Test Series"
                        loading="lazy"
                        className="h-auto max-h-[360px] w-full object-contain transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                    </div>

                  </div>

                  <div className="mt-3 flex items-center justify-between rounded-2xl border border-brand-green/10 bg-brand-green/5 px-4 py-3">

                    <div>

                      <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-brand-lime/70">
                        NEET Preparation
                      </p>

                      <p className="mt-1 text-sm font-bold text-white">

                        <span className="hidden sm:inline">
                          Computer-Based <span className="text-brand-lime">Testing</span>
                        </span>

                        <span className="sm:hidden">
                          Online <span className="text-brand-lime">Test Series</span>
                        </span>

                      </p>

                    </div>

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-green/15">
                      <Target className="h-5 w-5 text-brand-lime" />
                    </div>

                  </div>
                </div>

              </div>
            </div>

          </Reveal>
        </div>
      </section>


      {/* =========================================================
          COURSES
      ========================================================= */}
      <section className="relative overflow-hidden bg-white/25 py-16 sm:py-20 lg:py-24">

        <div className="pointer-events-none absolute -right-32 top-20 h-80 w-80 rounded-full bg-brand-green/10 blur-3xl" />

        <div className="pointer-events-none absolute -left-32 bottom-0 h-72 w-72 rounded-full bg-brand-green/10 blur-3xl" />

        <div className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-green/5 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* Section Header */}
          <Reveal className="mx-auto mb-14 max-w-3xl text-center sm:mb-16">

            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand-green/20 bg-brand-green/10 px-4 py-2">

              <span className="h-2 w-2 rounded-full bg-brand-lime" />

              <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-green">
                Our <span className="text-brand-lime">Courses</span>
              </span>

            </div>

            <h2 className="font-heading text-3xl font-extrabold leading-tight tracking-tight text-brand-dark sm:text-4xl lg:text-5xl">

              Two focused programmes.

              <span className="block text-brand-green">
                One <span className="text-brand-lime">clear goal.</span>
              </span>

            </h2>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
              Choose the programme that matches where you are in your NEET
              preparation journey.
            </p>

            <div className="mx-auto mt-7 flex items-center justify-center gap-3">
              <span className="h-px w-10 bg-brand-green/40" />
              <span className="h-1.5 w-1.5 rounded-full bg-brand-lime" />
              <span className="h-px w-10 bg-brand-green/40" />
            </div>

          </Reveal>


          {/* Loading */}
          {coursesLoading ? (

            <div className="flex items-center justify-center py-16">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-brand-green border-t-transparent" />
            </div>

          ) : courses.length === 0 ? (

            /* Empty State */
            <div className="mx-auto max-w-2xl rounded-[2rem] border border-brand-green/20 bg-[#0b2418] p-8 text-center shadow-[0_20px_60px_-30px_rgba(7,26,18,0.45)]">

              <p className="font-heading text-xl font-extrabold text-white">
                No courses published yet
              </p>

              <p className="mt-2 text-sm text-white/60">
                Our programmes will appear here once published.
              </p>

            </div>

          ) : (

            /* Course Grid */
            <div className="mx-auto grid max-w-5xl items-start gap-8 md:grid-cols-2">

              {courses.map((course, i) => {

                const courseBatches = batchesForCourse(course._id);
                const isOpen = openBatches === course._id;

                return (
                  <FadeInCard
                    key={course._id}
                    delay={i * 0.1}
                    className="group flex flex-col overflow-hidden rounded-[2rem] border border-brand-green/10 bg-[#0b2418] p-3 shadow-[0_20px_60px_-25px_rgba(7,26,18,0.35)] transition-all duration-500 hover:-translate-y-2 hover:border-brand-green/30 hover:bg-[#0e2d1d] hover:shadow-[0_28px_70px_-25px_rgba(7,26,18,0.5)]"
                  >

                    {/* Course Image */}
                    <div className="relative overflow-hidden rounded-[1.5rem] bg-[#06140d]">

                      <img
                        src={course.coverImageUrl || COURSE_FALLBACK_IMAGE}
                        alt={course.name}
                        loading="lazy"
                        className="h-52 w-full object-cover transition-transform duration-700 group-hover:scale-[1.03] sm:h-56"
                      />

                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#06140d]/50 via-transparent to-transparent" />

                      {course.targetClass && (
                        <div className="absolute left-4 top-4">

                          <span className="inline-flex rounded-full border border-white/20 bg-[#071a12]/75 px-3 py-1.5 text-xs font-bold text-white shadow-lg backdrop-blur-md">
                            {course.targetClass}
                          </span>

                        </div>
                      )}

                      {courseBatches.length > 0 && (
                        <div className="absolute right-4 top-4">

                          <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-green/30 bg-brand-green px-3 py-1.5 text-xs font-bold text-white shadow-lg">
                            <Layers className="h-3.5 w-3.5" />

                            {courseBatches.length}{" "}
                            {courseBatches.length === 1
                              ? "batch"
                              : "batches"}
                          </span>

                        </div>
                      )}

                    </div>


                    {/* Course Content */}
                    <div className="flex flex-1 flex-col px-4 pb-4 pt-6 sm:px-5 sm:pb-5">

                      <h3 className="font-heading text-2xl font-extrabold text-white transition-colors duration-300 group-hover:text-brand-green">
                        {course.name}
                      </h3>

                      {course.description && (
                        <p className="mt-3 line-clamp-3 text-sm leading-6 text-white/60">
                          {course.description}
                        </p>
                      )}


                      {/* Features */}
                      {course.features?.length > 0 && (
                        <div className="mt-5 flex flex-wrap gap-2">

                          {course.features.slice(0, 4).map((feature, index) => (

                            <span
                              key={feature}
                              className="inline-flex items-center gap-1.5 rounded-full border border-brand-green/10 bg-brand-green/5 px-3 py-1.5 text-xs font-semibold text-white/70"
                            >
                              <CheckCircle2
                                className={`h-3.5 w-3.5 ${
                                  index === 0
                                    ? "text-brand-lime"
                                    : "text-brand-green"
                                }`}
                              />
                              {feature}
                            </span>

                          ))}

                        </div>
                      )}


                      {/* Batches */}
                      {isOpen && (
                        <div className="mt-5 space-y-2.5">

                          {courseBatches.length === 0 ? (

                            <div className="rounded-2xl border border-dashed border-brand-green/20 bg-brand-green/5 px-4 py-6 text-center">

                              <p className="text-sm font-bold text-white/60">
                                No batches running yet
                              </p>

                            </div>

                          ) : (

                            courseBatches.map((batch) => (

                              <div
                                key={batch._id}
                                className="rounded-2xl border border-brand-green/10 bg-brand-green/5 p-4 transition-colors duration-300 hover:border-brand-green/20 hover:bg-brand-green/10"
                              >

                                <div className="flex flex-wrap items-center gap-2">

                                  <span className="rounded-lg border border-brand-green/10 bg-[#071a12] px-2.5 py-1 font-mono text-[11px] font-black text-white/70">
                                    {batch.code || "—"}
                                  </span>

                                  <span className="rounded-lg border border-brand-green/10 bg-[#071a12] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white/50">
                                    {batch.batchType?.replace(/_/g, " ") ||
                                      "NEET UG"}
                                  </span>

                                </div>

                                <p className="mt-2 text-sm font-extrabold text-white">
                                  {batch.name}
                                </p>

                                {batch.schedule && (
                                  <p className="mt-1 flex items-center gap-1.5 text-xs text-white/50">
                                    <Clock className="h-3.5 w-3.5 shrink-0 text-brand-lime" />
                                    {batch.schedule}
                                  </p>
                                )}

                                <p className="mt-1.5 flex items-center gap-1.5 text-[11px] text-white/40">
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


                      {/* Bottom Actions */}
                      <div className="mt-auto pt-7">

                        <div className="flex items-end justify-between gap-4 border-t border-brand-green/10 pt-5">

                          <div>

                            <span className="block text-xs font-medium text-white/40">
                              Fees
                            </span>

                            <span className="font-heading text-2xl font-extrabold text-white">
                              ₹
                              {(course.feeAmount || 0).toLocaleString("en-IN")}
                            </span>

                          </div>

                          <Link
                            to="/register"
                            className="btn-primary group/btn !bg-brand-green !px-5 !py-2.5 text-sm !text-white hover:!bg-brand-green/90"
                          >
                            Enroll Now

                            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-0.5" />
                          </Link>

                        </div>


                        {/* Show Batches */}
                        <button
                          type="button"
                          onClick={() => toggleBatches(course._id)}
                          aria-expanded={isOpen}
                          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-brand-green/30 bg-brand-green/5 px-4 py-3 text-sm font-bold text-brand-green transition-all duration-300 hover:border-brand-green/50 hover:bg-brand-green/10"
                        >

                          <Layers className="h-4 w-4" />

                          {isOpen ? "Hide Batches" : "Show Batches"}

                          <span className="rounded-full bg-brand-green/10 px-2 py-0.5 text-[11px] font-extrabold">
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


          {/* Bottom CTA */}
          <Reveal className="mx-auto mt-12 max-w-2xl text-center sm:mt-14">

            <Link
              to="/courses"
              className="btn-primary group inline-flex items-center justify-center gap-2 !bg-brand-green !px-8 !py-3.5 text-base !text-white shadow-elevated hover:!bg-brand-green/90 hover:shadow-glow-green"
            >
              Explore All <span className="text-brand-lime">Programs</span>

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
      <section className="relative overflow-hidden bg-white/25 py-16 sm:py-20 lg:py-24">

        <div className="pointer-events-none absolute -top-40 right-0 h-[28rem] w-[28rem] rounded-full bg-brand-green/10 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-40 left-0 h-[26rem] w-[26rem] rounded-full bg-brand-green/10 blur-3xl" />

        <div className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-green/5 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <Reveal className="mx-auto mb-14 max-w-3xl text-center sm:mb-16">

            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand-green/20 bg-brand-green/10 px-4 py-2">

              <Sparkles className="h-3.5 w-3.5 text-brand-lime" />

              <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-green">
                Our <span className="text-brand-lime">Approach</span>
              </span>

            </div>

            <h2 className="font-heading text-3xl font-extrabold leading-tight tracking-tight text-brand-dark sm:text-4xl lg:text-5xl">

              The NEETVIDYA

              <span className="block text-brand-green">
                Preparation <span className="text-brand-lime">Framework.</span>
              </span>

            </h2>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
              Concept learning, regular practice, and guided improvement
              working together throughout your preparation.
            </p>

            <div className="mx-auto mt-7 flex items-center justify-center gap-3">
              <span className="h-px w-10 bg-brand-green/40" />
              <span className="h-1.5 w-1.5 rounded-full bg-brand-lime" />
              <span className="h-px w-10 bg-brand-green/40" />
            </div>

          </Reveal>


          {/* Framework Cards */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

            {methodology.map((item, i) => (

              <FadeInCard
                key={item.step}
                delay={i * 0.08}
                className="group relative overflow-hidden rounded-[1.75rem] border border-brand-green/10 bg-[#0b2418] p-6 shadow-[0_20px_60px_-30px_rgba(7,26,18,0.4)] transition-all duration-500 hover:-translate-y-2 hover:border-brand-green/30 hover:bg-[#0e2d1d] hover:shadow-[0_25px_70px_-25px_rgba(7,26,18,0.5)]"
              >

                {/* Large Background Number */}
                <span className="pointer-events-none absolute -right-3 -top-5 select-none font-heading text-7xl font-extrabold text-brand-green/10 transition-colors duration-500 group-hover:text-brand-green/20">
                  {item.step}
                </span>

                <div className="relative">

                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-full border ${
                      item.step === "02"
                        ? "border-brand-lime/30 bg-brand-lime/10 text-brand-lime"
                        : "border-brand-green/20 bg-brand-green/10 text-brand-green"
                    } text-sm font-extrabold`}
                  >
                    {item.step}
                  </div>

                  <h3 className="mt-6 font-heading text-xl font-extrabold leading-tight text-white">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-white/60">
                    {item.desc}
                  </p>

                  <div className="mt-6 h-px w-full bg-brand-green/10 transition-colors duration-300 group-hover:bg-brand-green/20" />

                  <div className="mt-4 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-green">
                    <CheckCircle2
                      className={`h-3.5 w-3.5 ${
                        item.step === "02"
                          ? "text-brand-lime"
                          : "text-brand-green"
                      }`}
                    />
                    NEET<span className="text-brand-lime">VIDYA</span>
                  </div>

                </div>
              </FadeInCard>

            ))}

          </div>
        </div>
      </section>


      {/* =========================================================
          FINAL CTA
      ========================================================= */}
      <section className="relative overflow-hidden bg-white/25 py-20 sm:py-24">

        <div className="pointer-events-none absolute -top-24 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-brand-green/10 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-32 -right-32 h-72 w-72 rounded-full bg-brand-green/10 blur-3xl" />

        <Reveal className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">

          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-green/20 bg-brand-green/10 px-4 py-2">

            <span className="h-2 w-2 rounded-full bg-brand-lime" />

            <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-green">
              Start Your <span className="text-brand-lime">Journey</span>
            </span>

          </div>

          <h2 className="font-heading text-3xl font-extrabold leading-tight tracking-tight text-brand-dark sm:text-4xl lg:text-5xl">

            Ready to begin your

            <span className="block text-brand-green">
              <span className="text-brand-lime">NEET</span> preparation?
            </span>

          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
            Book a counselling session or register for the next available
            admission cycle and get the batch details you need.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">

            <Link
              to="/register"
              className="btn-primary !bg-brand-green !px-8 !py-3.5 text-base !text-white shadow-elevated hover:!bg-brand-green/90 hover:shadow-glow-green"
            >
              Register for <span className="ml-1 text-brand-lime">Admission</span>
            </Link>

            <Link
              to="/contact#contact-form"
              className="btn-secondary !border-brand-green/30 !px-7 !py-3.5 text-base !text-brand-green hover:!bg-brand-green/5"
            >
              Contact Admissions
            </Link>

          </div>

          <div className="mx-auto mt-8 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-brand-green/30" />
            <span className="h-1.5 w-1.5 rounded-full bg-brand-lime" />
            <span className="h-px w-10 bg-brand-green/30" />
          </div>

          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
            Learn with <span className="text-brand-lime">confidence.</span>{" "}
            Prepare with <span className="text-brand-green">purpose.</span>
          </p>

        </Reveal>
      </section>

    </main>
  );
}