import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../../config/api";
import { Mail, ArrowLeft, SendHorizonal, CheckCircle } from "lucide-react";

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
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-100 p-10 space-y-8">
        {/* Logo */}
        <div className="text-center">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-400 to-lime-400 flex items-center justify-center font-extrabold text-slate-900 text-2xl mx-auto shadow-lg mb-4">
            NV
          </div>
          <span className="font-extrabold text-lg text-green-600">NEETVIDYA</span>
        </div>

        {!submitted ? (
          <>
            <div>
              <h1 className="font-extrabold text-2xl text-slate-900 text-center">Forgot Password?</h1>
              <p className="text-slate-500 text-sm text-center mt-2">
                Enter your registered email address and we'll send you a secure password reset link.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@example.com"
                    className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-500 transition bg-white shadow-sm"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 active:scale-[0.98] disabled:opacity-60 text-white font-bold py-3.5 rounded-xl transition shadow-md shadow-green-600/25 flex items-center justify-center gap-2"
              >
                <SendHorizonal className="w-4 h-4" />
                {loading ? "Sending Reset Link..." : "Send Reset Link"}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center space-y-5">
            <CheckCircle className="w-14 h-14 text-green-500 mx-auto" />
            <h1 className="font-extrabold text-2xl text-slate-900">Check Your Email</h1>
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-left">
              <p className="text-sm text-green-800">
                If an account exists for <strong>{email}</strong>, we've sent a password reset link.
                The link expires in <strong>1 hour</strong>.
              </p>
            </div>
            <p className="text-slate-500 text-xs">
              Didn't receive it? Check your spam folder or{" "}
              <button
                onClick={() => setSubmitted(false)}
                className="text-green-600 font-semibold hover:underline"
              >
                try again
              </button>
              .
            </p>
          </div>
        )}

        <div className="text-center">
          <Link
            to="/login"
            className="text-sm text-slate-500 hover:text-slate-700 transition inline-flex items-center gap-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
