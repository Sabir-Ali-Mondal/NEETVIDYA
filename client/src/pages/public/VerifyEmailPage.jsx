import { useState, useEffect, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import api from "../../config/api";
import { CheckCircle, XCircle, Loader2, MailCheck, RefreshCw } from "lucide-react";

export default function VerifyEmailPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState("loading"); // loading | success | error | resend | already-verified
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
        if (err.response?.data?.message?.includes("already verified")) {
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
    try {
      await api.post("/auth/resend-verification", { email: resendEmail });
      setResendMsg("Verification email sent! Please check your inbox.");
    } catch (err) {
      setResendMsg(err.response?.data?.message || "Failed to resend. Please try again.");
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-100 p-10 text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-400 to-lime-400 flex items-center justify-center font-extrabold text-slate-900 text-2xl mx-auto shadow-lg">
          NV
        </div>

        {status === "loading" && (
          <>
            <Loader2 className="w-12 h-12 text-green-500 animate-spin mx-auto" />
            <h1 className="font-extrabold text-2xl text-slate-900">Verifying your email...</h1>
            <p className="text-slate-500 text-sm">Please wait a moment.</p>
          </>
        )}

        {(status === "success" || status === "already-verified") && (
          <>
            <CheckCircle className="w-14 h-14 text-green-500 mx-auto" />
            <h1 className="font-extrabold text-2xl text-slate-900">
              {status === "already-verified" ? "Email Already Verified!" : "Email Verified!"}
            </h1>
            <p className="text-slate-500 text-sm">
              {status === "already-verified"
                ? "Your email address is already verified. You can sign in to your NEETVIDYA account."
                : "Your email has been successfully verified. You can now sign in to your NEETVIDYA account."}
            </p>
            <Link
              to="/login"
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-3 rounded-xl transition shadow-md shadow-green-600/25"
            >
              Sign In to Portal →
            </Link>
          </>
        )}

        {(status === "error" || status === "no-token") && (
          <>
            <XCircle className="w-14 h-14 text-red-400 mx-auto" />
            <h1 className="font-extrabold text-2xl text-slate-900">Verification Failed</h1>
            <p className="text-slate-500 text-sm">
              {status === "no-token"
                ? "No verification token found in the link."
                : "This verification link is invalid or has expired (links expire after 24 hours)."}
            </p>

            <div className="bg-slate-50 rounded-xl p-5 text-left border border-slate-200 mt-2">
              <div className="flex items-center gap-2 mb-3">
                <MailCheck className="w-5 h-5 text-green-600" />
                <span className="font-bold text-sm text-slate-800">Request a new verification email</span>
              </div>
              <form onSubmit={handleResend} className="space-y-3">
                <input
                  type="email"
                  required
                  value={resendEmail}
                  onChange={(e) => setResendEmail(e.target.value)}
                  placeholder="Enter your registered email"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-500 transition"
                />
                <button
                  type="submit"
                  disabled={resendLoading}
                  className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white font-bold py-2.5 rounded-lg transition text-sm flex items-center justify-center gap-2"
                >
                  <RefreshCw className={`w-4 h-4 ${resendLoading ? "animate-spin" : ""}`} />
                  {resendLoading ? "Sending..." : "Resend Verification Email"}
                </button>
              </form>
              {resendMsg && (
                <p className="mt-3 text-xs text-center text-slate-600">{resendMsg}</p>
              )}
            </div>
          </>
        )}

        <div className="pt-2">
          <Link to="/" className="text-xs text-slate-400 hover:text-slate-600 transition">
            ← Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
