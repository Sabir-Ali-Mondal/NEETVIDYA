import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../../config/api";
import {
  Mail,
  ArrowLeft,
  SendHorizonal,
  CheckCircle,
  ShieldCheck,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("/auth/forgot-password", { email });
      setSubmitted(true);
    } catch {
      // Always show success to prevent email enumeration
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative h-screen overflow-hidden bg-brand-soft">
      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-brand-green/10 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-emerald-200/20 blur-3xl"
      />

      <div className="relative flex h-full items-center justify-center p-3 sm:p-5 lg:p-6">
        <div className="grid h-full max-h-[760px] w-full max-w-[1250px] overflow-hidden rounded-[1.75rem] border border-white bg-white shadow-[0_25px_80px_-30px_rgba(15,23,42,0.3)] lg:grid-cols-2">

          {/* LEFT PANEL */}
          <section className="relative hidden overflow-hidden bg-brand-black lg:flex">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(34,197,94,0.2),_transparent_40%),radial-gradient(circle_at_bottom_left,_rgba(163,230,53,0.1),_transparent_35%)]" />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-28 -top-28 h-72 w-72 rounded-full bg-brand-green/15 blur-3xl"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-28 -left-28 h-72 w-72 rounded-full bg-brand-lime/10 blur-3xl"
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative z-10 flex w-full items-center px-10 xl:px-14"
            >
              <div className="w-full max-w-md">
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand-green/25 bg-brand-green/10 px-3 py-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-lime" />

                  <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-brand-lime">
                    Account Recovery
                  </span>
                </div>

                <h2 className="font-heading text-4xl font-extrabold leading-[1.05] tracking-tight text-white xl:text-[3.2rem]">
                  Get Back to
                  <span className="block text-brand-lime">
                    Your Journey.
                  </span>
                </h2>

                <p className="mt-4 max-w-sm text-sm leading-6 text-gray-400">
                  Forgot your password? We'll help you securely recover
                  access to your NEETVIDYA student portal.
                </p>

                <div className="my-7 h-px w-14 bg-brand-green/50" />

                <div className="space-y-5">
                  {[
                    {
                      title: "Secure Reset",
                      text: "Receive a protected password reset link.",
                    },
                    {
                      title: "Email Verification",
                      text: "Only your registered email can request access.",
                    },
                    {
                      title: "Quick Recovery",
                      text: "Reset your password and continue learning.",
                    },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className="flex items-start gap-3"
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-brand-green/20 bg-brand-green/10 text-brand-lime">
                        <ShieldCheck className="h-4 w-4" />
                      </div>

                      <div>
                        <p className="text-xs font-bold text-gray-200">
                          {item.title}
                        </p>

                        <p className="mt-0.5 text-[11px] leading-5 text-gray-500">
                          {item.text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex items-center gap-2 text-[10px] text-gray-500">
                  <Sparkles className="h-3.5 w-3.5 text-brand-lime" />
                  Your preparation continues with NEETVIDYA.
                </div>
              </div>
            </motion.div>
          </section>

          {/* RIGHT PANEL */}
          <section className="flex min-h-0 items-center overflow-y-auto px-5 py-5 sm:px-8 lg:px-10 xl:px-14">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.55,
                delay: 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mx-auto w-full max-w-md"
            >
              {!submitted ? (
                <>
                  {/* HEADER */}
                  <div className="mb-7">
                    <div className="inline-flex items-center gap-2 rounded-full border border-brand-green/15 bg-brand-green/5 px-3 py-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />

                      <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-brand-green">
                        Password Recovery
                      </span>
                    </div>

                    <h1 className="mt-4 font-heading text-3xl font-extrabold tracking-tight text-brand-dark sm:text-4xl">
                      Forgot Password?
                    </h1>

                    <p className="mt-2 max-w-sm text-xs leading-5 text-slate-500">
                      Enter your registered email address and we'll send
                      you a secure password reset link.
                    </p>
                  </div>

                  {/* FORM */}
                  <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                  >
                    <div>
                      <label
                        htmlFor="email"
                        className="mb-1.5 block text-[9px] font-bold uppercase tracking-[0.18em] text-slate-500"
                      >
                        Email Address
                      </label>

                      <div className="relative">
                        <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                        <input
                          id="email"
                          type="email"
                          required
                          value={email}
                          onChange={(e) =>
                            setEmail(e.target.value)
                          }
                          placeholder="your.email@example.com"
                          autoComplete="email"
                          className="w-full rounded-lg border border-slate-200 bg-slate-50/70 py-3 pl-10 pr-3.5 text-sm text-brand-dark outline-none transition-all placeholder:text-slate-400 focus:border-brand-green focus:bg-white focus:ring-4 focus:ring-brand-green/10"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="group flex w-full items-center justify-center gap-2 rounded-lg bg-brand-green px-4 py-3.5 text-sm font-bold text-white shadow-lg shadow-brand-green/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-dark hover:shadow-xl hover:shadow-brand-green/10 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <SendHorizonal className="h-4 w-4" />

                      {loading
                        ? "Sending Reset Link..."
                        : "Send Reset Link"}

                      {!loading && (
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                      )}
                    </button>
                  </form>

                  {/* BACK */}
                  <div className="mt-7 border-t border-slate-100 pt-6 text-center">
                    <Link
                      to="/login"
                      className="group inline-flex items-center gap-2 text-xs font-semibold text-slate-500 transition-colors hover:text-brand-dark"
                    >
                      <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
                      Back to Sign In
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  {/* SUCCESS */}
                  <div className="text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-green/10">
                      <CheckCircle className="h-9 w-9 text-brand-green" />
                    </div>

                    <h1 className="mt-5 font-heading text-2xl font-extrabold tracking-tight text-brand-dark sm:text-3xl">
                      Check Your Email
                    </h1>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      We've processed your password reset request.
                    </p>
                  </div>

                  <div className="mt-6 rounded-[1.25rem] border border-brand-green/15 bg-brand-green/5 p-5">
                    <div className="flex items-start gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-green/10">
                        <Mail className="h-4 w-4 text-brand-green" />
                      </div>

                      <p className="text-left text-sm leading-6 text-slate-600">
                        If an account exists for{" "}
                        <strong className="text-brand-dark">
                          {email}
                        </strong>
                        , we've sent a password reset link.
                        The link expires in{" "}
                        <strong className="text-brand-dark">
                          1 hour
                        </strong>
                        .
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 text-center">
                    <p className="text-xs leading-5 text-slate-500">
                      Didn't receive it? Check your spam folder or{" "}
                      <button
                        type="button"
                        onClick={() => setSubmitted(false)}
                        className="font-semibold text-brand-green transition-colors hover:text-brand-dark hover:underline"
                      >
                        try again
                      </button>
                      .
                    </p>
                  </div>

                  <Link
                    to="/login"
                    className="group mt-6 flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-600 transition-all hover:border-brand-green/30 hover:bg-brand-green/5 hover:text-brand-dark"
                  >
                    <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
                    Back to Sign In
                  </Link>
                </>
              )}

              {/* FOOTER */}
              <div className="mt-6 flex items-center justify-center gap-3">
                <span className="h-px w-8 bg-brand-green/30" />
                <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
                <span className="h-px w-8 bg-brand-green/30" />
              </div>

              <p className="mt-3 text-center text-[9px] uppercase tracking-[0.16em] text-slate-400">
                NEET-focused learning environment
              </p>
            </motion.div>
          </section>
        </div>
      </div>
    </main>
  );
}