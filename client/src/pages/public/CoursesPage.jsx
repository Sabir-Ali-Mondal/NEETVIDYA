import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../config/api";
import {
  CheckCircle,
  ArrowRight,
  Layers,
  Clock,
  Users,
  BookOpen,
  ChevronDown,
  IndianRupee,
} from "lucide-react";
import { FadeInCard } from "../../components/shared/MotionReveal";
import WhatsAppLink from "../../components/shared/WhatsAppLink";
import useContactSettings from "../../hooks/useContactSettings";

export default function CoursesPage() {
  const { settings } = useContactSettings();

  const [courses, setCourses] = useState([]);
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openCourse, setOpenCourse] = useState(null);

  useEffect(() => {
    Promise.all([
      api.get("/courses").catch(() => ({ data: {} })),
      api.get("/batches/public").catch(() => ({ data: {} })),
    ])
      .then(([cRes, bRes]) => {
        setCourses(cRes.data?.data?.courses || []);
        setBatches(bRes.data?.data?.batches || []);
      })
      .finally(() => setLoading(false));
  }, []);

  const batchCourseId = (batch) =>
    (batch?.course && typeof batch.course === "object"
      ? batch.course._id
      : batch?.course) || "";

  const batchesForCourse = (courseId) =>
    batches.filter((b) => batchCourseId(b) === courseId);

  const toggleCourse = (courseId) =>
    setOpenCourse((cur) => (cur === courseId ? null : courseId));

  const batchRequestMessage = (batch) =>
    `Hello NEETVIDYA!\n\nI am interested in joining this batch:\n- Batch: ${
      batch.name
    }${batch.code ? ` (${batch.code})` : ""}\n${
      batch.batchType
        ? `- Type: ${batch.batchType.replace(/_/g, " ")}\n`
        : ""
    }${batch.schedule ? `- Schedule: ${batch.schedule}\n` : ""}\nPlease share the batch access / admission details. Thank you!`;

  const courseRegisterSearch = (course) => {
    const params = new URLSearchParams({
      page: "/courses",
      course: course.name,
    });

    return params.toString();
  };

  const batchRegisterSearch = (batch) => {
    const params = new URLSearchParams({
      page: "/courses",
      course: batch.course?.name || "",
      batch: batch.name,
    });

    if (batch.code) {
      params.set("batchCode", batch.code);
    }

    return params.toString();
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-brand-soft">
      {/* Background decoration */}
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

      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="relative mx-auto max-w-7xl px-4 pb-12 pt-14 sm:px-6 sm:pb-16 sm:pt-20 lg:px-8 lg:pb-20 lg:pt-24">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-green/20 bg-white/80 px-4 py-2 shadow-sm backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-brand-green" />

            <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-green">
              Batches & Programs
            </span>
          </div>

          <h1 className="font-heading text-4xl font-extrabold leading-tight tracking-tight text-brand-dark sm:text-5xl lg:text-6xl">
            Choose Your
            <span className="mt-1 block text-brand-green">
              NEET Journey.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            Explore our structured NEET preparation programs designed to build
            strong concepts, consistent practice, and exam confidence.
          </p>

          <div className="mx-auto mt-8 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-brand-green/40" />
            <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
            <span className="h-px w-10 bg-brand-green/40" />
          </div>
        </div>
      </section>

      {/* =========================================================
          COURSES
      ========================================================= */}
      <section className="relative mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8 lg:pb-24">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-brand-green border-t-transparent" />
          </div>
        ) : courses.length === 0 ? (
          <div className="mx-auto max-w-2xl rounded-[2rem] border border-dashed border-brand-green/30 bg-white/80 p-8 text-center shadow-[0_12px_50px_-20px_rgba(15,23,42,0.15)] backdrop-blur-sm sm:p-12">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-green text-white shadow-lg shadow-brand-green/20">
              <BookOpen className="h-8 w-8" />
            </div>

            <h2 className="font-heading text-2xl font-extrabold text-brand-dark sm:text-3xl">
              No courses published yet
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
              Courses will appear here automatically once the institute
              publishes them.
            </p>
          </div>
        ) : (
          <div className="mx-auto max-w-4xl space-y-7">
            {courses.map((course, i) => {
              const courseBatches = batchesForCourse(course._id);
              const isOpen = openCourse === course._id;

              return (
                <FadeInCard
                  delay={(i % 3) * 0.06}
                  key={course._id}
                  className="group overflow-hidden rounded-[2rem] border border-white/80 bg-white p-2.5 shadow-[0_12px_50px_-20px_rgba(15,23,42,0.18)] transition-all duration-500 hover:border-brand-green/20 hover:shadow-[0_24px_70px_-25px_rgba(15,23,42,0.25)] sm:p-3"
                >
                  {/* =====================================================
                      COURSE BANNER
                  ===================================================== */}
                  {course.coverImageUrl && (
                    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[1.5rem] bg-slate-100 sm:aspect-[16/6]">
                      <img
                        src={course.coverImageUrl}
                        alt={`${course.name} banner`}
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      />

                      <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-gradient-to-t from-brand-dark/85 via-brand-dark/25 to-transparent"
                      />

                      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
                        <div className="flex flex-wrap items-center gap-2">
                          {course.targetClass && (
                            <span className="rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-brand-dark backdrop-blur-sm">
                              {course.targetClass}
                            </span>
                          )}

                          {course.duration && (
                            <span className="rounded-full bg-brand-green/90 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-white backdrop-blur-sm">
                              {course.duration}
                            </span>
                          )}
                        </div>

                        <h2 className="mt-2.5 font-heading text-2xl font-extrabold leading-tight text-white drop-shadow-sm sm:text-3xl lg:text-4xl">
                          {course.name}
                        </h2>
                      </div>
                    </div>
                  )}

                  {/* =====================================================
                      COURSE CONTENT
                  ===================================================== */}
                  <div className="flex flex-col p-4 sm:p-6">
                    {/* Header */}
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                      <div className="min-w-0 flex-1">
                        {!course.coverImageUrl && (
                          <>
                            <div className="flex flex-wrap items-center gap-2">
                              {course.targetClass && (
                                <span className="rounded-full bg-brand-soft px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-brand-dark">
                                  {course.targetClass}
                                </span>
                              )}

                              {course.duration && (
                                <span className="text-[11px] font-medium text-slate-400">
                                  {course.duration}
                                </span>
                              )}
                            </div>

                            <h2 className="mt-3 font-heading text-2xl font-extrabold leading-tight text-brand-dark sm:text-3xl">
                              {course.name}
                            </h2>
                          </>
                        )}

                        {course.description && (
                          <p
                            className={`max-w-2xl text-sm leading-6 text-slate-500 ${
                              course.coverImageUrl ? "" : "mt-3"
                            }`}
                          >
                            {course.description}
                          </p>
                        )}
                      </div>

                      {/* Fee */}
                      {course.feeAmount > 0 && (
                        <div className="w-full shrink-0 rounded-2xl border border-brand-green/15 bg-brand-soft px-4 py-3 sm:w-auto sm:min-w-[130px]">
                          <span className="flex items-center justify-center gap-0.5 text-xl font-extrabold text-brand-green">
                            <IndianRupee className="h-4 w-4" />
                            {course.feeAmount.toLocaleString("en-IN")}
                          </span>

                          <span className="mt-0.5 block text-center text-[10px] font-bold uppercase tracking-wider text-slate-400">
                            Course Fee
                          </span>
                        </div>
                      )}
                    </div>

                    {/* =====================================================
                        FEATURES
                    ===================================================== */}
                    {course.features?.length > 0 && (
                      <div className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
                        {course.features.slice(0, 6).map((feature) => (
                          <div
                            key={feature}
                            className="flex items-start gap-2 rounded-xl bg-slate-50/70 px-3 py-2.5 text-xs font-medium text-slate-600"
                          >
                            <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* =====================================================
                        BOTTOM ACTION BAR
                        Enroll Now first, Show Batches second
                    ===================================================== */}
                    <div className="mt-8 border-t border-slate-100 pt-5">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                        {/* Enroll */}
                        <Link
                          to={{
                            pathname: "/register",
                            search: courseRegisterSearch(course),
                          }}
                          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-green px-4 py-3 text-sm font-bold text-white shadow-md shadow-brand-green/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg sm:flex-1"
                        >
                          Enroll Now
                          <ArrowRight className="h-4 w-4" />
                        </Link>

                        {/* Show batches */}
                        <button
                          type="button"
                          onClick={() => toggleCourse(course._id)}
                          aria-expanded={isOpen}
                          className="group/button inline-flex w-full items-center justify-center gap-2 rounded-xl border border-brand-green/25 bg-brand-soft px-4 py-3 text-sm font-bold text-brand-green transition-all duration-300 hover:border-brand-green/40 hover:bg-brand-green hover:text-white sm:flex-1"
                        >
                          <Layers className="h-4 w-4" />

                          <span>
                            {isOpen ? "Hide Batches" : "Show Batches"}
                          </span>

                          <span className="rounded-full bg-white px-2 py-0.5 text-[11px] font-extrabold text-brand-green shadow-sm group-hover/button:bg-brand-green/10">
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

                    {/* =====================================================
                        BATCHES
                    ===================================================== */}
                    {isOpen && (
                      <div className="mt-5 border-t border-slate-100 pt-5">
                        {courseBatches.length === 0 ? (
                          <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-center">
                            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-white text-slate-400 shadow-sm">
                              <Layers className="h-5 w-5" />
                            </div>

                            <p className="mt-3 text-sm font-bold text-slate-600">
                              No batches running yet
                            </p>

                            <p className="mt-1 text-xs text-slate-400">
                              New batches for this course will appear here.
                            </p>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            {courseBatches.map((batch) => (
                              <div
                                key={batch._id}
                                className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 transition-colors hover:border-brand-green/20 hover:bg-brand-soft/50"
                              >
                                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                  {/* Batch information */}
                                  <div className="min-w-0">
                                    <div className="flex flex-wrap items-center gap-2">
                                      <span className="rounded-lg bg-white px-2.5 py-1 font-mono text-[11px] font-black text-slate-600 shadow-sm">
                                        {batch.code || "—"}
                                      </span>

                                      <span className="rounded-lg bg-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-slate-500">
                                        {batch.batchType?.replace(/_/g, " ") ||
                                          "NEET UG"}
                                      </span>

                                      {batch.academicYear && (
                                        <span className="text-[11px] font-medium text-slate-400">
                                          {batch.academicYear}
                                        </span>
                                      )}
                                    </div>

                                    <h3 className="mt-2 text-base font-extrabold text-brand-dark">
                                      {batch.name}
                                    </h3>

                                    {batch.schedule && (
                                      <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
                                        <Clock className="h-3.5 w-3.5 shrink-0" />
                                        {batch.schedule}
                                      </p>
                                    )}

                                    <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-slate-400">
                                      <span className="flex items-center gap-1.5">
                                        <Users className="h-3.5 w-3.5" />
                                        {batch.students?.length || 0} students
                                      </span>

                                      {batch.capacity ? (
                                        <span>
                                          Limited to {batch.capacity} seats
                                        </span>
                                      ) : null}
                                    </div>
                                  </div>

                                  {/* Batch actions */}
                                  <div className="flex shrink-0 flex-col gap-2 sm:min-w-[150px] sm:items-stretch">
                                    <Link
                                      to={{
                                        pathname: "/register",
                                        search: batchRegisterSearch(batch),
                                      }}
                                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-green px-4 py-2.5 text-sm font-bold text-white shadow-md shadow-brand-green/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                                    >
                                      Join Batch
                                      <ArrowRight className="h-4 w-4" />
                                    </Link>

                                    <WhatsAppLink
                                      number={settings.whatsappNumber}
                                      message={batchRequestMessage(batch)}
                                      label="Request batch access"
                                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-xs font-bold text-emerald-700 transition hover:bg-emerald-100 hover:text-emerald-800"
                                    />
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </FadeInCard>
              );
            })}
          </div>
        )}
      </section>

      {/* =========================================================
          BOTTOM MESSAGE
      ========================================================= */}
      <section className="relative mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8 lg:pb-24">
        <div className="mx-auto max-w-2xl text-center sm:mt-4">
          <p className="font-heading text-xl font-bold text-brand-dark sm:text-2xl">
            Prepare with the right plan.
          </p>

          <p className="mt-3 text-sm leading-6 text-slate-500 sm:text-base">
            Build strong concepts. Practice consistently. Move closer to your
            goal.
          </p>
        </div>
      </section>
    </main>
  );
}