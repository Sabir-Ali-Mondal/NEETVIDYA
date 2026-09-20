import { Link } from "react-router-dom";
import { ArrowLeft, LockKeyhole, LogIn } from "lucide-react";

export default function Unauthorized() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-brand-soft px-4 py-10">
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-rose-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-green-100/60 blur-3xl" />

      <div className="relative w-full max-w-xl text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-rose-100 bg-white text-rose-500 shadow-lg shadow-slate-900/5">
          <LockKeyhole className="h-7 w-7" />
        </div>

        <div className="mt-6">
          <h1 className="font-heading text-[6.5rem] font-extrabold leading-none tracking-[-0.06em] text-rose-500 sm:text-[8rem]">
            403
          </h1>
          <div className="mx-auto mt-3 h-1 w-12 rounded-full bg-rose-400" />
        </div>

        <div className="mx-auto mt-6 max-w-md">
          <span className="inline-flex items-center gap-2 rounded-full border border-rose-100 bg-white/80 px-3.5 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.16em] text-rose-500 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
            Access Restricted
          </span>

          <h2 className="mt-5 font-heading text-2xl font-extrabold tracking-tight text-brand-dark sm:text-3xl">
            Restricted Portal Area
          </h2>

          <p className="mt-3 text-sm leading-6 text-slate-500 sm:text-base">
            You do not have the required role privileges to view this section.
          </p>
        </div>

        <div className="mt-8">
          <Link
            to="/login"
            className="btn-primary inline-flex min-h-11 w-full items-center justify-center gap-2 text-sm !px-6 !py-2.5 sm:w-auto"
          >
            <LogIn className="h-4 w-4" />
            Sign In with Permitted Account
          </Link>
        </div>
      </div>
    </div>
  );
}