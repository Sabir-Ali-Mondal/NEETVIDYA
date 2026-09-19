import { useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import api from "../../config/api";
import {
  Eye,
  EyeOff,
  KeyRound,
  CheckCircle,
  XCircle,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  Sparkles,
} from "lucide-react";
import { alertSuccess } from "../../utils/alert";
import { motion } from "framer-motion";

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const requirements = [
    {
      label: "At least 8 characters",
      valid: password.length >= 8,
    },
    {
      label: "Passwords match",
      valid:
        password === confirmPassword &&
        confirmPassword.length > 0,
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      await api.post(`/auth/reset-password?token=${token}`, {
        password,
      });

      setSuccess(true);
      alertSuccess("Password reset successfully!");

      setTimeout(() => navigate("/login"), 3000);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Reset failed. The link may have expired."
      );
    } finally {
      setLoading(false);
    }
  };

  /* INVALID LINK */
  if (!token) {
    return (
      <main className="relative h-screen overflow-hidden bg-brand-soft">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-brand-green/10 blur-3xl"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-emerald-200/20 blur-3xl"
        />

        <div className="relative flex h-full items-center justify-center p-4">
          <div className="w-full max-w-md">
            <div className="overflow-hidden rounded-[1.75rem] border border-white bg-white shadow-[0_25px_80px_-30px_rgba(15,23,42,0.3)]">
              <div className="border-b border-slate-100 px-6 py-5 text-center">
                <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-brand-black shadow-md">
                  <span className="font-heading text-lg font-extrabold text-brand-lime">
                    NV
                  </span>
                </div>

                <div className="mt-3 flex items-center justify-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
                  <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-brand-green">
                    NEETVIDYA Account
                  </span>
                </div>
              </div>

              <div className="px-6 py-8 text-center sm:px-8">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
                  <XCircle className="h-9 w-9 text-red-400" />
                </div>

                <h1 className="mt-5 font-heading text-2xl font-extrabold tracking-tight text-brand-dark">
                  Invalid Reset Link
                </h1>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  This password reset link is invalid or incomplete.
                  Please request a new one.
                </p>

                <Link
                  to="/forgot-password"
                  className="group mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-brand-green px-5 py-3 text-sm font-bold text-white shadow-lg shadow-brand-green/20 transition-all hover:-translate-y-0.5 hover:bg-brand-dark"
                >
                  Request New Link
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>

                <Link
                  to="/login"
                  className="group mt-5 inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-brand-dark"
                >
                  <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
                  Back to Sign In
                </Link>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-brand-green/30" />
              <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
              <span className="h-px w-8 bg-brand-green/30" />
            </div>

            <p className="mt-3 text-center text-[9px] uppercase tracking-[0.16em] text-slate-400">
              NEET-focused learning environment
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="relative h-screen overflow-hidden bg-brand-soft">
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
                    Secure Account
                  </span>
                </div>

                <h2 className="font-heading text-4xl font-extrabold leading-[1.05] tracking-tight text-white xl:text-[3.2rem]">
                  Create a
                  <span className="block text-brand-lime">
                    New Password.
                  </span>
                </h2>

                <p className="mt-4 max-w-sm text-sm leading-6 text-gray-400">
                  Set a new secure password and get back to your
                  NEETVIDYA learning portal.
                </p>

                <div className="my-7 h-px w-14 bg-brand-green/50" />

                <div className="space-y-5">
                  {[
                    {
                      title: "Secure Password",
                      text: "Use a password with at least 8 characters.",
                    },
                    {
                      title: "Protected Access",
                      text: "Your new password replaces the previous one.",
                    },
                    {
                      title: "Continue Learning",
                      text: "Sign in again after your password is updated.",
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
              {!success ? (
                <>
                  {/* HEADER */}
                  <div className="mb-6">
                    <div className="inline-flex items-center gap-2 rounded-full border border-brand-green/15 bg-brand-green/5 px-3 py-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />

                      <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-brand-green">
                        Password Recovery
                      </span>
                    </div>

                    <h1 className="mt-4 font-heading text-3xl font-extrabold tracking-tight text-brand-dark sm:text-4xl">
                      Reset Password
                    </h1>

                    <p className="mt-2 max-w-sm text-xs leading-5 text-slate-500">
                      Choose a strong new password for your NEETVIDYA
                      account.
                    </p>
                  </div>

                  {/* FORM */}
                  <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                  >
                    <div>
                      <label
                        htmlFor="password"
                        className="mb-1.5 block text-[9px] font-bold uppercase tracking-[0.18em] text-slate-500"
                      >
                        New Password
                      </label>

                      <div className="relative">
                        <input
                          id="password"
                          type={
                            showPassword
                              ? "text"
                              : "password"
                          }
                          required
                          value={password}
                          onChange={(e) =>
                            setPassword(e.target.value)
                          }
                          placeholder="Enter new password"
                          autoComplete="new-password"
                          className="w-full rounded-lg border border-slate-200 bg-slate-50/70 px-3.5 py-3 pr-11 text-sm text-brand-dark outline-none transition-all placeholder:text-slate-400 focus:border-brand-green focus:bg-white focus:ring-4 focus:ring-brand-green/10"
                        />

                        <button
                          type="button"
                          onClick={() =>
                            setShowPassword((value) => !value)
                          }
                          className="absolute right-2.5 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-md text-slate-400 transition-colors hover:bg-slate-100 hover:text-brand-dark"
                          aria-label={
                            showPassword
                              ? "Hide password"
                              : "Show password"
                          }
                        >
                          {showPassword ? (
                            <EyeOff className="h-3.5 w-3.5" />
                          ) : (
                            <Eye className="h-3.5 w-3.5" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="confirmPassword"
                        className="mb-1.5 block text-[9px] font-bold uppercase tracking-[0.18em] text-slate-500"
                      >
                        Confirm Password
                      </label>

                      <input
                        id="confirmPassword"
                        type={
                          showPassword
                            ? "text"
                            : "password"
                        }
                        required
                        value={confirmPassword}
                        onChange={(e) =>
                          setConfirmPassword(e.target.value)
                        }
                        placeholder="Confirm new password"
                        autoComplete="new-password"
                        className="w-full rounded-lg border border-slate-200 bg-slate-50/70 px-3.5 py-3 text-sm text-brand-dark outline-none transition-all placeholder:text-slate-400 focus:border-brand-green focus:bg-white focus:ring-4 focus:ring-brand-green/10"
                      />
                    </div>

                    {/* REQUIREMENTS */}
                    <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
                      <p className="mb-3 text-[9px] font-bold uppercase tracking-[0.18em] text-slate-500">
                        Password Requirements
                      </p>

                      <div className="space-y-2">
                        {requirements.map((req) => (
                          <div
                            key={req.label}
                            className="flex items-center gap-2"
                          >
                            {req.valid ? (
                              <CheckCircle className="h-4 w-4 text-brand-green" />
                            ) : (
                              <span className="h-4 w-4 rounded-full border-2 border-slate-300" />
                            )}

                            <span
                              className={`text-xs ${
                                req.valid
                                  ? "font-medium text-brand-green"
                                  : "text-slate-500"
                              }`}
                            >
                              {req.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* ERROR */}
                    {error && (
                      <div className="rounded-lg border border-red-200 bg-red-50 px-3.5 py-3 text-xs leading-5 text-red-700">
                        {error}
                      </div>
                    )}

                    {/* SUBMIT */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="group flex w-full items-center justify-center gap-2 rounded-lg bg-brand-green px-4 py-3.5 text-sm font-bold text-white shadow-lg shadow-brand-green/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-dark hover:shadow-xl hover:shadow-brand-green/10 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <KeyRound className="h-4 w-4" />

                      {loading
                        ? "Resetting..."
                        : "Reset Password"}

                      {!loading && (
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                      )}
                    </button>
                  </form>

                  <div className="mt-6 text-center">
                    <Link
                      to="/login"
                      className="group inline-flex items-center gap-2 text-xs font-semibold text-slate-400 transition-colors hover:text-brand-dark"
                    >
                      <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
                      Back to Sign In
                    </Link>
                  </div>
                </>
              ) : (
                /* SUCCESS */
                <div className="text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-green/10">
                    <ShieldCheck className="h-9 w-9 text-brand-green" />
                  </div>

                  <h1 className="mt-5 font-heading text-2xl font-extrabold tracking-tight text-brand-dark sm:text-3xl">
                    Password Reset!
                  </h1>

                  <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
                    Your password has been updated successfully.
                    You can now sign in with your new password.
                  </p>

                  <div className="mt-6 rounded-[1.25rem] border border-brand-green/15 bg-brand-green/5 p-5 text-left">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-green/10">
                        <CheckCircle className="h-4 w-4 text-brand-green" />
                      </div>

                      <div>
                        <p className="text-xs font-bold text-brand-dark">
                          Password updated successfully
                        </p>

                        <p className="mt-0.5 text-[11px] leading-5 text-slate-500">
                          Redirecting you to the sign-in page...
                        </p>
                      </div>
                    </div>
                  </div>

                  <Link
                    to="/login"
                    className="group mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-brand-green px-5 py-3 text-sm font-bold text-white shadow-lg shadow-brand-green/20 transition-all hover:-translate-y-0.5 hover:bg-brand-dark"
                  >
                    Sign In
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              )}

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