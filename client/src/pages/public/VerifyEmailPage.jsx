import { useState, useEffect, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import api from "../../config/api";
import {
  CheckCircle,
  XCircle,
  Loader2,
  MailCheck,
  RefreshCw,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
} from "lucide-react";

export default function VerifyEmailPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [status, setStatus] = useState("loading");
  const [resendEmail, setResendEmail] = useState("");
  const [resendLoading, setResendLoading] = useState(false);
  const [resendMsg, setResendMsg] = useState("");

  const requestedRef = useRef(false);

  useEffect(() => {
    if (!token) {
      setStatus("no-token");
      return;
    }

    if (requestedRef.current) return;
    requestedRef.current = true;

    const verify = async () => {
      try {
        await api.get(`/auth/verify-email?token=${token}`);
        setStatus("success");
      } catch (err) {
        if (
          err.response?.data?.message?.includes(
            "already verified"
          )
        ) {
          setStatus("already-verified");
        } else {
          setStatus("error");
        }
      }
    };

    verify();
  }, [token]);

  const handleResend = async (e) => {
    e.preventDefault();
    setResendLoading(true);
    setResendMsg("");

    try {
      await api.post("/auth/resend-verification", {
        email: resendEmail,
      });

      setResendMsg(
        "Verification email sent! Please check your inbox."
      );
    } catch (err) {
      setResendMsg(
        err.response?.data?.message ||
          "Failed to resend. Please try again."
      );
    } finally {
      setResendLoading(false);
    }
  };

  const isSuccess =
    status === "success" || status === "already-verified";

  const isError =
    status === "error" || status === "no-token";

  return (
    <main className="relative min-h-screen overflow-hidden bg-brand-soft px-4 py-6 sm:px-6">
      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-brand-green/10 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-emerald-200/20 blur-3xl"
      />

      <div className="relative flex min-h-[calc(100vh-3rem)] items-center justify-center">
        <div className="w-full max-w-md">

          {/* CARD */}
          <div className="overflow-hidden rounded-[1.75rem] border border-white bg-white shadow-[0_25px_80px_-30px_rgba(15,23,42,0.3)]">

            {/* TOP BRAND */}
            <div className="border-b border-slate-100 px-6 py-5 text-center sm:px-8">
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

            {/* CONTENT */}
            <div className="px-6 py-7 text-center sm:px-8 sm:py-8">

              {/* LOADING */}
              {status === "loading" && (
                <>
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-green/10">
                    <Loader2 className="h-8 w-8 animate-spin text-brand-green" />
                  </div>

                  <h1 className="mt-5 font-heading text-2xl font-extrabold tracking-tight text-brand-dark">
                    Verifying Your Email
                  </h1>

                  <p className="mt-2 text-sm text-slate-500">
                    Please wait while we verify your email address.
                  </p>

                  <div className="mx-auto mt-6 flex items-center justify-center gap-3">
                    <span className="h-px w-8 bg-brand-green/30" />
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
                    <span className="h-px w-8 bg-brand-green/30" />
                  </div>
                </>
              )}

              {/* SUCCESS */}
              {isSuccess && (
                <>
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-green/10">
                    <CheckCircle className="h-9 w-9 text-brand-green" />
                  </div>

                  <h1 className="mt-5 font-heading text-2xl font-extrabold tracking-tight text-brand-dark">
                    {status === "already-verified"
                      ? "Email Already Verified"
                      : "Email Verified"}
                  </h1>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {status === "already-verified"
                      ? "Your email address is already verified. You can sign in to your NEETVIDYA account."
                      : "Your email has been successfully verified. You can now sign in to your NEETVIDYA account."}
                  </p>

                  <div className="mt-6 rounded-xl border border-brand-green/15 bg-brand-green/5 p-4 text-left">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-green/10">
                        <ShieldCheck className="h-4 w-4 text-brand-green" />
                      </div>

                      <div>
                        <p className="text-xs font-bold text-brand-dark">
                          Account secured
                        </p>
                        <p className="mt-0.5 text-[11px] text-slate-500">
                          Your email verification is complete.
                        </p>
                      </div>
                    </div>
                  </div>

                  <Link
                    to="/login"
                    className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand-green px-5 py-3 text-sm font-bold text-white shadow-lg shadow-brand-green/20 transition-all hover:-translate-y-0.5 hover:bg-brand-dark"
                  >
                    Sign In to Portal
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </>
              )}

              {/* ERROR */}
              {isError && (
                <>
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
                    <XCircle className="h-9 w-9 text-red-400" />
                  </div>

                  <h1 className="mt-5 font-heading text-2xl font-extrabold tracking-tight text-brand-dark">
                    Verification Failed
                  </h1>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {status === "no-token"
                      ? "No verification token was found in the link."
                      : "This verification link is invalid or has expired. Verification links expire after 24 hours."}
                  </p>

                  {/* RESEND */}
                  <div className="mt-6 rounded-[1.25rem] border border-slate-200 bg-slate-50/70 p-4 text-left sm:p-5">
                    <div className="mb-4 flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-green/10">
                        <MailCheck className="h-4 w-4 text-brand-green" />
                      </div>

                      <div>
                        <p className="text-xs font-bold text-brand-dark">
                          Request a new email
                        </p>
                        <p className="text-[10px] text-slate-400">
                          Enter your registered email address.
                        </p>
                      </div>
                    </div>

                    <form
                      onSubmit={handleResend}
                      className="space-y-3"
                    >
                      <input
                        type="email"
                        required
                        value={resendEmail}
                        onChange={(e) =>
                          setResendEmail(e.target.value)
                        }
                        placeholder="Enter your registered email"
                        className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-brand-dark outline-none transition focus:border-brand-green focus:ring-4 focus:ring-brand-green/10"
                      />

                      <button
                        type="submit"
                        disabled={resendLoading}
                        className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand-green px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-brand-green/15 transition-all hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        <RefreshCw
                          className={`h-3.5 w-3.5 ${
                            resendLoading
                              ? "animate-spin"
                              : ""
                          }`}
                        />

                        {resendLoading
                          ? "Sending..."
                          : "Resend Verification Email"}
                      </button>
                    </form>

                    {resendMsg && (
                      <p className="mt-3 text-center text-[11px] leading-5 text-slate-500">
                        {resendMsg}
                      </p>
                    )}
                  </div>
                </>
              )}

              {/* HOME */}
              <Link
                to="/"
                className="group mt-6 inline-flex items-center gap-2 text-xs font-semibold text-slate-400 transition-colors hover:text-brand-dark"
              >
                <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
                Return to Homepage
              </Link>
            </div>
          </div>

          {/* BOTTOM */}
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