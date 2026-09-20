import { Link } from "react-router-dom";
import { ArrowLeft, Home, SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-brand-soft px-4 py-10">
      {/* Decorative background */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-green-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-emerald-100/60 blur-3xl" />

      <div className="relative w-full max-w-xl text-center">
        {/* Icon */}
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-green-100 bg-white text-brand-green shadow-lg shadow-green-900/5">
          <SearchX className="h-7 w-7" />
        </div>

        {/* 404 */}
        <div className="mt-6">
          <h1 className="font-heading text-[6.5rem] font-extrabold leading-none tracking-[-0.06em] text-brand-dark sm:text-[8rem]">
            404
          </h1>

          <div className="mx-auto mt-2 h-1 w-12 rounded-full bg-brand-green" />
        </div>

        {/* Content */}
        <div className="mx-auto mt-6 max-w-md">
          <span className="inline-flex items-center gap-2 rounded-full border border-green-100 bg-white/80 px-3.5 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.16em] text-brand-green backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
            Page Not Found
          </span>

          <h2 className="mt-5 font-heading text-2xl font-extrabold tracking-tight text-brand-dark sm:text-3xl">
            This page has gone missing.
          </h2>

          <p className="mt-3 text-sm leading-6 text-slate-500 sm:text-base">
            The page or resource you requested could not be located.
            It may have been moved, removed, or the address may be
            incorrect.
          </p>
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            to="/"
            className="btn-primary inline-flex min-h-11 items-center justify-center gap-2 text-sm !px-6 !py-2.5"
          >
            <Home className="h-4 w-4" />
            Return to Home
          </Link>

          <button
            type="button"
            onClick={() => window.history.back()}
            className="btn-secondary inline-flex min-h-11 items-center justify-center gap-2 text-sm !px-6 !py-2.5"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}