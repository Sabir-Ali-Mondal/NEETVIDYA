import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { alertSuccess, alertError } from "../../utils/alert";
import {
  LogIn,
  Eye,
  EyeOff,
  BadgeCheck,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const user = await login(identifier.trim(), password);

      alertSuccess(`Welcome back, ${user.name}!`);

      if (user.role === "admin") navigate("/admin");
      else if (user.role === "teacher") navigate("/teacher");
      else navigate("/student");
    } catch (err) {
      const msg =
        err.response?.data?.message || "Invalid credentials";

      alertError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative h-screen overflow-hidden bg-brand-soft">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-brand-green/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-emerald-200/20 blur-3xl" />

      <div className="relative flex h-full items-center justify-center p-3 sm:p-5 lg:p-6">
        <div className="grid h-full max-h-[760px] w-full max-w-[1250px] overflow-hidden rounded-[1.75rem] border border-white bg-white shadow-[0_25px_80px_-30px_rgba(15,23,42,0.3)] lg:grid-cols-2">

          {/* =========================
              LEFT PANEL
          ========================= */}
          <section className="relative hidden overflow-hidden bg-brand-black lg:flex">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(34,197,94,0.2),_transparent_40%),radial-gradient(circle_at_bottom_left,_rgba(163,230,53,0.1),_transparent_35%)]" />

            <div className="pointer-events-none absolute -right-28 -top-28 h-72 w-72 rounded-full bg-brand-green/15 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-28 -left-28 h-72 w-72 rounded-full bg-brand-lime/10 blur-3xl" />

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
                    Student Portal
                  </span>
                </div>

                <h2 className="font-heading text-4xl font-extrabold leading-[1.05] tracking-tight text-white xl:text-[3.2rem]">
                  Your NEET Journey
                  <span className="block text-brand-lime">
                    Starts Here.
                  </span>
                </h2>

                <p className="mt-4 max-w-sm text-sm leading-6 text-gray-400">
                  Access your study materials, practice tests, performance
                  insights, and learning resources from one place.
                </p>

                <div className="my-7 h-px w-14 bg-brand-green/50" />

                <div className="grid grid-cols-2 gap-x-6 gap-y-5">
                  {[
                    "Practice Papers",
                    "Mock Tests",
                    "Performance Analytics",
                    "Lecture Notes",
                    "Chapter-wise DPPs",
                    "Doubt Sessions",
                  ].map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-2.5"
                    >
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-green/10 text-brand-lime">
                        <BadgeCheck className="h-4 w-4" />
                      </div>

                      <span className="text-xs font-semibold text-gray-300">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex items-center gap-2 text-[10px] text-gray-500">
                  <Sparkles className="h-3.5 w-3.5 text-brand-lime" />
                  Structured preparation for medical aspirants.
                </div>
              </div>
            </motion.div>
          </section>

          {/* =========================
              RIGHT LOGIN FORM
          ========================= */}
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

              {/* HEADER */}
              <div className="mb-7">
                <div className="inline-flex items-center gap-2 rounded-full border border-brand-green/15 bg-brand-green/5 px-3 py-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
                  <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-brand-green">
                    Welcome Back
                  </span>
                </div>

                <h1 className="mt-4 font-heading text-3xl font-extrabold tracking-tight text-brand-dark sm:text-4xl">
                  Sign In
                </h1>

                <p className="mt-2 max-w-sm text-xs leading-5 text-slate-500">
                  Use your registered email address or Student ID to access
                  your NEETVIDYA portal.
                </p>
              </div>

              {/* FORM */}
              <form onSubmit={handleSubmit} className="space-y-4">

                {/* IDENTIFIER */}
                <div>
                  <label
                    htmlFor="identifier"
                    className="mb-1.5 block text-[9px] font-bold uppercase tracking-[0.18em] text-slate-500"
                  >
                    Email Address or Student ID
                  </label>

                  <input
                    id="identifier"
                    type="text"
                    required
                    value={identifier}
                    onChange={(e) =>
                      setIdentifier(e.target.value)
                    }
                    placeholder="name@example.com or NV-2026-0001"
                    autoComplete="username"
                    className="w-full rounded-lg border border-slate-200 bg-slate-50/70 px-3.5 py-3 text-sm text-brand-dark outline-none transition-all placeholder:text-slate-400 focus:border-brand-green focus:bg-white focus:ring-4 focus:ring-brand-green/10"
                  />
                </div>

                {/* PASSWORD */}
                <div>
                  <div className="mb-1.5 flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-[9px] font-bold uppercase tracking-[0.18em] text-slate-500"
                    >
                      Password
                    </label>

                    <Link
                      to="/forgot-password"
                      className="text-[10px] font-semibold text-brand-green transition-colors hover:text-brand-dark"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) =>
                        setPassword(e.target.value)
                      }
                      placeholder="Enter your password"
                      autoComplete="current-password"
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

                {/* LOGIN BUTTON */}
                <button
                  type="submit"
                  disabled={loading}
                  className="group mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-brand-green px-4 py-3.5 text-sm font-bold text-white shadow-lg shadow-brand-green/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-dark hover:shadow-xl hover:shadow-brand-green/10 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <LogIn className="h-4 w-4" />

                  {loading
                    ? "Signing in..."
                    : "Sign In to Portal"}

                  {!loading && (
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                  )}
                </button>
              </form>

              {/* REGISTER */}
              <div className="mt-7 border-t border-slate-100 pt-6 text-center">
                <p className="text-xs text-slate-500">
                  New student?{" "}
                  <Link
                    to="/register"
                    className="inline-flex items-center gap-1 font-semibold text-brand-green transition-colors hover:text-brand-dark"
                  >
                    Create an account
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </p>
              </div>

              {/* DECORATIVE LINE */}
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