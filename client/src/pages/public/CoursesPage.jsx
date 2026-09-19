import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../config/api";
import {
  CheckCircle,
  ArrowRight,
  Layers,
  Clock,
  Users,
} from "lucide-react";

export default function CoursesPage() {
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/batches")
      .then(({ data }) => setBatches(data.data?.batches || []))
      .catch(() => setBatches([]))
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

      {/* Programs */}
      <section className="relative mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8 lg:pb-24">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-brand-green border-t-transparent" />
          </div>
        ) : batches.length === 0 ? (
          <div className="mx-auto max-w-2xl rounded-[2rem] border border-dashed border-brand-green/30 bg-white/80 p-8 text-center shadow-[0_12px_50px_-20px_rgba(15,23,42,0.15)] backdrop-blur-sm sm:p-12">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-green text-white shadow-lg shadow-brand-green/20">
              <Layers className="h-8 w-8" />
            </div>

            <h2 className="font-heading text-2xl font-extrabold text-brand-dark sm:text-3xl">
              No batches published yet
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
              New batches will appear here automatically once they are
              published by the institute.
            </p>
          </div>
        ) : (
          <>
            {/* Section heading */}
            <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-green">
                  Program Catalog
                </p>

                <h2 className="font-heading text-3xl font-extrabold leading-tight text-brand-dark sm:text-4xl">
                  Find the right batch
                </h2>

                <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
                  Structured programs for different stages of your NEET
                  preparation.
                </p>
              </div>

              <Link
                to="/contact#contact-form"
                className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-brand-green transition-colors hover:text-brand-dark"
              >
                Need guidance?
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Batch cards */}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
              {batches.map((batch) => (
                <article
                  key={batch._id}
                  className="group relative flex flex-col overflow-hidden rounded-[2rem] border border-white/80 bg-white p-3 shadow-[0_12px_50px_-20px_rgba(15,23,42,0.18)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_24px_60px_-20px_rgba(15,23,42,0.25)]"
                >
                  {/* Accent */}
                  <div
                    className="h-2 rounded-full"
                    style={{
                      backgroundColor: batch.color || "#18A66A",
                    }}
                  />

                  <div className="flex flex-1 flex-col px-4 pb-4 pt-6 sm:px-5 sm:pb-5">
                    {/* Batch type */}
                    <div className="mb-4 flex flex-wrap items-center gap-2">
                      <span className="rounded-full border border-slate-200 bg-brand-soft px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-brand-dark">
                        {batch.batchType?.replace(/_/g, " ") || "NEET UG"}
                      </span>

                      {batch.academicYear && (
                        <span className="text-[11px] font-medium text-slate-400">
                          {batch.academicYear}
                        </span>
                      )}
                    </div>

                    {/* Name */}
                    <h3 className="font-heading text-2xl font-extrabold leading-tight text-brand-dark sm:text-3xl">
                      {batch.name}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-slate-500">
                      {batch.schedule ||
                        "Full NEET syllabus coverage with regular practice and mock tests."}
                    </p>

                    {/* Details */}
                    <div className="mt-6 space-y-3">
                      <div className="flex items-center gap-3 text-xs font-medium text-slate-600">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-brand-soft">
                          <Users className="h-4 w-4 text-brand-green" />
                        </span>

                        <span>
                          {batch.students?.length || 0} students enrolled
                        </span>
                      </div>

                      {batch.capacity ? (
                        <div className="flex items-center gap-3 text-xs font-medium text-slate-600">
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-brand-soft">
                            <CheckCircle className="h-4 w-4 text-brand-green" />
                          </span>

                          <span>Limited to {batch.capacity} seats</span>
                        </div>
                      ) : null}

                      {batch.schedule && (
                        <div className="flex items-center gap-3 text-xs font-medium text-slate-600">
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-brand-soft">
                            <Clock className="h-4 w-4 text-brand-green" />
                          </span>

                          <span>{batch.schedule}</span>
                        </div>
                      )}
                    </div>

                    {/* Footer */}
                    <div className="mt-7 border-t border-slate-100 pt-5">
                      <div className="flex items-center justify-between gap-4">
                        <div className="min-w-0">
                          <span className="mb-1 block text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">
                            Batch Code
                          </span>

                          <span className="font-mono text-sm font-bold text-brand-dark">
                            {batch.code || "—"}
                          </span>
                        </div>

                        <Link
                          to="/register"
                          className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-brand-green px-4 py-2.5 text-sm font-bold text-white shadow-md shadow-brand-green/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brand-green/25"
                        >
                          Join Batch
                          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}

        {/* Bottom message */}
        <div className="mx-auto mt-16 max-w-2xl text-center sm:mt-20">
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