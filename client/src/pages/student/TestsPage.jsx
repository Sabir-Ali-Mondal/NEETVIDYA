import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../config/api";
import {
  ClipboardList,
  Clock,
  ArrowRight,
  Archive,
  BookOpen,
  Sparkles,
  FileQuestion,
  Timer,
} from "lucide-react";
import Pagination from "../../components/shared/Pagination";

export default function TestsPage() {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);
  const [meta, setMeta] = useState({ total: 0, pages: 1 });

  useEffect(() => {
    setLoading(true);

    api
      .get(`/exams?page=${page}&limit=${limit}`)
      .then(({ data }) => {
        setExams(data.data?.exams || []);
        setMeta({
          total: data.data?.total || 0,
          pages: data.data?.pages || 1,
        });
      })
      .catch(() => setExams([]))
      .finally(() => setLoading(false));
  }, [page, limit]);

  const liveExams = exams.filter((e) =>
    ["LIVE", "PUBLISHED"].includes(e.status)
  );

  const studyExams = exams.filter(
    (e) => ["CLOSED", "ARCHIVED"].includes(e.status) && e.studyVisible
  );

  return (
    <div className="relative min-h-full overflow-hidden bg-brand-soft">
      {/* Decorative background */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-green-200/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-emerald-100/40 blur-3xl" />

      <div className="relative space-y-6 p-3 sm:space-y-7 sm:p-5 lg:space-y-8 lg:p-7">
        {/* Header */}
        <section className="overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white p-5 shadow-sm shadow-slate-900/5 sm:p-6 lg:p-7">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-green-100 bg-green-50 px-3 py-1.5 text-[9px] font-extrabold uppercase tracking-[0.15em] text-brand-green">
                <Sparkles className="h-3 w-3" />
                Examination Center
              </div>

              <h1 className="font-heading text-2xl font-extrabold tracking-tight text-brand-dark sm:text-3xl">
                Tests & Computerized Exams
              </h1>

              <p className="mt-2 max-w-2xl text-xs leading-5 text-slate-500 sm:text-sm">
                Exams released to your batch. Secret and unpublished exams never
                appear here.
              </p>
            </div>

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-brand-green sm:h-14 sm:w-14">
              <ClipboardList className="h-6 w-6 sm:h-7 sm:w-7" />
            </div>
          </div>
        </section>

        {loading ? (
          <div className="flex min-h-[45vh] flex-col items-center justify-center rounded-[1.75rem] border border-slate-200/80 bg-white shadow-sm">
            <div className="h-11 w-11 animate-spin rounded-full border-4 border-brand-green/20 border-t-brand-green" />
            <p className="mt-4 text-xs font-semibold text-slate-400">
              Loading available exams...
            </p>
          </div>
        ) : exams.length === 0 ? (
          <div className="overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white px-5 py-14 text-center shadow-sm sm:px-10">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-50 text-slate-300">
              <ClipboardList className="h-7 w-7" />
            </div>

            <h3 className="mt-5 font-heading text-lg font-extrabold text-slate-700">
              No exams available right now
            </h3>

            <p className="mx-auto mt-2 max-w-md text-xs leading-5 text-slate-400 sm:text-sm">
              When your teachers publish an exam for your batch, it will appear
              here.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Live / Upcoming */}
            {liveExams.length > 0 && (
              <section className="space-y-4">
                <div className="flex items-end justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-50 text-brand-green">
                        <ClipboardList className="h-4.5 w-4.5" />
                      </div>

                      <h2 className="font-heading text-lg font-extrabold text-brand-dark sm:text-xl">
                        Live & Upcoming
                      </h2>
                    </div>

                    <p className="ml-[46px] mt-1 text-[10px] text-slate-400">
                      Exams currently released to you
                    </p>
                  </div>

                  <span className="shrink-0 rounded-full border border-green-100 bg-green-50 px-2.5 py-1 text-[9px] font-extrabold text-brand-green">
                    {liveExams.length}{" "}
                    {liveExams.length === 1 ? "Exam" : "Exams"}
                  </span>
                </div>

                <div className="grid min-w-0 gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {liveExams.map((exam) => (
                    <div
                      key={exam._id}
                      className="group flex min-w-0 w-full flex-col overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white p-4 shadow-sm shadow-slate-900/5 transition duration-300 hover:-translate-y-1 hover:border-green-200 hover:shadow-xl hover:shadow-green-900/5 sm:p-5"
                    >
                      <div className="flex min-w-0 items-center justify-between gap-2">
                        <span className="inline-flex max-w-[65%] rounded-full border border-purple-100 bg-purple-50 px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-wide text-purple-700">
                          <span className="truncate">
                            {exam.testType?.replace(/_/g, " ")}
                          </span>
                        </span>

                        <span
                          className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-[9px] font-extrabold ${
                            exam.status === "LIVE"
                              ? "border border-emerald-100 bg-emerald-50 text-emerald-700"
                              : "border border-blue-100 bg-blue-50 text-blue-700"
                          }`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              exam.status === "LIVE"
                                ? "bg-emerald-500"
                                : "bg-blue-500"
                            }`}
                          />
                          {exam.status === "LIVE" ? "Active" : "Scheduled"}
                        </span>
                      </div>

                      <div className="mt-4 min-w-0">
                        <h3 className="break-words font-heading text-base font-extrabold leading-6 text-brand-dark sm:text-lg">
                          {exam.title}
                        </h3>

                        {exam.batch?.name && (
                          <p className="mt-1 truncate text-[10px] font-semibold text-slate-400">
                            {exam.batch.name}
                          </p>
                        )}

                        <p className="mt-3 line-clamp-2 min-h-[2.5rem] text-xs leading-5 text-slate-500">
                          {exam.instructions ||
                            "Standard exam with negative marking."}
                        </p>
                      </div>

                      {/* Exam stats */}
                      <div className="mt-4 grid grid-cols-2 gap-2">
                        <div className="min-w-0 rounded-xl border border-slate-100 bg-brand-soft p-3">
                          <div className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wide text-slate-400">
                            <FileQuestion className="h-3 w-3 shrink-0" />
                            MCQs
                          </div>
                          <p className="mt-1 truncate text-sm font-extrabold text-brand-dark">
                            {exam.totalQuestions}
                          </p>
                        </div>

                        <div className="min-w-0 rounded-xl border border-slate-100 bg-brand-soft p-3">
                          <div className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wide text-slate-400">
                            <Timer className="h-3 w-3 shrink-0" />
                            Duration
                          </div>
                          <p className="mt-1 truncate text-sm font-extrabold text-brand-dark">
                            {exam.duration} Min
                          </p>
                        </div>

                        <div className="min-w-0 rounded-xl border border-slate-100 bg-brand-soft p-3">
                          <p className="text-[9px] font-bold uppercase tracking-wide text-slate-400">
                            Total Marks
                          </p>
                          <p className="mt-1 truncate text-sm font-extrabold text-brand-dark">
                            {exam.totalMarks}
                          </p>
                        </div>

                        <div className="min-w-0 rounded-xl border border-slate-100 bg-brand-soft p-3">
                          <p className="text-[9px] font-bold uppercase tracking-wide text-slate-400">
                            Pattern
                          </p>
                          <p className="mt-1 truncate text-sm font-extrabold text-brand-dark">
                            +{exam.marksPerCorrect ?? 4}/-
                            {exam.negativePerWrong ?? 1}
                          </p>
                        </div>
                      </div>

                      <Link
                        to={`/exam/${exam._id}/attempt`}
                        className="btn-primary mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 text-xs !px-4 !py-2.5"
                      >
                        Start Exam Now
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                      </Link>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Previous Papers */}
            {studyExams.length > 0 && (
              <section className="space-y-4">
                <div className="flex items-end justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                        <Archive className="h-4.5 w-4.5" />
                      </div>

                      <h2 className="font-heading text-lg font-extrabold text-brand-dark sm:text-xl">
                        Previous Papers
                      </h2>
                    </div>

                    <p className="ml-[46px] mt-1 text-[10px] text-slate-400">
                      Archived exams available for study
                    </p>
                  </div>

                  <span className="shrink-0 rounded-full border border-purple-100 bg-purple-50 px-2.5 py-1 text-[9px] font-extrabold text-purple-600">
                    Study Mode
                  </span>
                </div>

                <div className="grid min-w-0 gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {studyExams.map((exam) => (
                    <Link
                      key={exam._id}
                      to={`/student/tests/study/${exam._id}`}
                      className="group flex min-w-0 w-full flex-col justify-between overflow-hidden rounded-[1.5rem] border border-slate-200/80 bg-white p-4 shadow-sm shadow-slate-900/5 transition duration-300 hover:-translate-y-1 hover:border-purple-200 hover:shadow-lg hover:shadow-purple-900/5 sm:p-5"
                    >
                      <div className="min-w-0">
                        <div className="flex min-w-0 items-center justify-between gap-2">
                          <span className="inline-flex max-w-[70%] rounded-full border border-purple-100 bg-purple-50 px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-wide text-purple-700">
                            <span className="truncate">
                              {exam.testType?.replace(/_/g, " ")}
                            </span>
                          </span>

                          <BookOpen className="h-4 w-4 shrink-0 text-purple-300 transition group-hover:text-purple-500" />
                        </div>

                        <h3 className="mt-4 break-words font-heading text-base font-extrabold leading-5 text-brand-dark">
                          {exam.title}
                        </h3>

                        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] font-medium text-slate-400">
                          <span>{exam.totalQuestions} questions</span>
                          <span className="h-1 w-1 rounded-full bg-slate-300" />
                          <span>{exam.duration} min</span>
                        </div>
                      </div>

                      <div className="mt-5 flex items-center justify-between gap-2 border-t border-slate-100 pt-3">
                        <span className="flex min-w-0 items-center gap-1.5 text-[10px] font-bold text-purple-600">
                          <BookOpen className="h-3.5 w-3.5 shrink-0" />
                          <span className="truncate">Available for study</span>
                        </span>

                        <ArrowRight className="h-3.5 w-3.5 shrink-0 text-purple-300 transition group-hover:translate-x-0.5 group-hover:text-purple-600" />
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Pagination */}
            <div className="overflow-hidden rounded-[1.5rem] border border-slate-200/80 bg-white p-3 shadow-sm sm:p-4">
              <Pagination
                page={page}
                totalPages={meta.pages}
                totalItems={meta.total}
                pageSize={limit}
                pageSizeOptions={[12, 24, 48]}
                onPageChange={setPage}
                onPageSizeChange={(n) => {
                  setLimit(n);
                  setPage(1);
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}