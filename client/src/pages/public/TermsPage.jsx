import { Link } from "react-router-dom";
import { ArrowLeft, ShieldCheck, FileText } from "lucide-react";

export default function TermsPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-brand-soft px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-brand-green/10 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-emerald-200/25 blur-3xl"
      />

      <div className="relative mx-auto max-w-4xl">
        <div className="overflow-hidden rounded-[2rem] border border-white bg-white shadow-[0_25px_80px_-30px_rgba(15,23,42,0.25)]">

          {/* HEADER */}
          <div className="border-b border-slate-100 px-6 py-6 sm:px-10 sm:py-7">
            <div className="flex items-start justify-between gap-5">
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-black shadow-md">
                  <FileText className="h-5 w-5 text-brand-lime" />
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-green">
                      NEETVIDYA
                    </p>
                  </div>

                  <h1 className="mt-1 font-heading text-xl font-extrabold tracking-tight text-brand-dark sm:text-2xl">
                    Terms & Privacy
                  </h1>

                  <p className="mt-1 text-xs text-slate-400">
                    Terms of Service & Privacy Policy
                  </p>
                </div>
              </div>

              <Link
                to="/register"
                className="group inline-flex shrink-0 items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-500 transition-all hover:border-brand-green/30 hover:bg-brand-green/5 hover:text-brand-dark"
              >
                <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
                <span className="hidden sm:inline">Back</span>
              </Link>
            </div>
          </div>

          {/* CONTENT */}
          <div className="px-6 py-7 sm:px-10 sm:py-10">
            <div className="space-y-8 text-sm leading-7 text-slate-600">

              {/* TERMS */}
              <section>
                <div className="mb-3 flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-green/10 text-xs font-bold text-brand-green">
                    01
                  </span>

                  <h2 className="font-heading text-lg font-bold text-brand-dark">
                    Terms of Service
                  </h2>
                </div>

                <p>
                  By creating an account on NEETVIDYA, you agree to use the
                  platform responsibly and for lawful educational purposes
                  only. You are responsible for keeping your login details
                  secure and for all activity that occurs under your account.
                </p>
              </section>

              {/* PRIVACY */}
              <section>
                <div className="mb-3 flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-green/10 text-xs font-bold text-brand-green">
                    02
                  </span>

                  <h2 className="font-heading text-lg font-bold text-brand-dark">
                    Privacy Policy
                  </h2>
                </div>

                <p>
                  We collect your name, email, phone number, and other
                  necessary registration details to provide access to the
                  learning portal, communicate important updates, and support
                  your preparation journey. This information is kept secure
                  and used only for the intended academic and administrative
                  purposes.
                </p>
              </section>

              {/* DATA USE */}
              <section>
                <div className="mb-3 flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-green/10 text-xs font-bold text-brand-green">
                    03
                  </span>

                  <h2 className="font-heading text-lg font-bold text-brand-dark">
                    Data Use
                  </h2>
                </div>

                <p>
                  Your data may be used to manage admissions, verify your
                  account, send course-related updates, and provide support
                  through the platform. We do not sell or share personal
                  information with third parties for marketing purposes.
                </p>
              </section>

              {/* RESPONSIBILITY */}
              <section>
                <div className="mb-3 flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-green/10 text-xs font-bold text-brand-green">
                    04
                  </span>

                  <h2 className="font-heading text-lg font-bold text-brand-dark">
                    Student Responsibility
                  </h2>
                </div>

                <p>
                  Students are expected to provide accurate information and
                  comply with the platform's rules and academic policies.
                  NEETVIDYA may update these terms from time to time, and
                  continued use of the platform indicates acceptance of any
                  changes.
                </p>
              </section>

              {/* PRIVACY NOTICE */}
              <div className="rounded-[1.5rem] border border-brand-green/15 bg-brand-green/5 p-5 sm:p-6">
                <div className="flex items-start gap-3.5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-green/10 text-brand-green">
                    <ShieldCheck className="h-4.5 w-4.5" />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-brand-dark">
                      Your Privacy Matters
                    </p>

                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      We value your privacy and aim to protect your personal
                      information while providing a safe and useful learning
                      experience.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FOOTER */}
          <div className="border-t border-slate-100 bg-slate-50/60 px-6 py-4 sm:px-10">
            <div className="flex flex-col gap-2 text-[10px] text-slate-400 sm:flex-row sm:items-center sm:justify-between">
              <span>
                NEETVIDYA Education Pvt Ltd.
              </span>

              <Link
                to="/register"
                className="font-semibold text-brand-green transition-colors hover:text-brand-dark"
              >
                Back to Registration
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom decoration */}
        <div className="mx-auto mt-6 flex items-center justify-center gap-3">
          <span className="h-px w-8 bg-brand-green/30" />
          <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
          <span className="h-px w-8 bg-brand-green/30" />
        </div>
      </div>
    </main>
  );
}