import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { alertError } from "../../utils/alert";
import {
  UserPlus,
  Eye,
  EyeOff,
  ArrowLeft,
  CheckCircle,
  MailCheck,
  BadgeCheck,
  ShieldCheck,
  Smartphone,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [registered, setRegistered] = useState(false);

  const { register } = useContext(AuthContext);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alertError("Passwords do not match");
      return;
    }

    if (form.password.length < 8) {
      alertError("Password must be at least 8 characters");
      return;
    }

    setLoading(true);

    try {
      await register(
        form.name,
        form.email,
        form.password,
        form.phone
      );
      setRegistered(true);
    } catch (err) {
      alertError(
        err.response?.data?.message ||
          "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (registered) {
    return (
      <main className="relative flex h-screen items-center justify-center overflow-hidden bg-brand-soft px-4">
        <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-brand-green/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-emerald-200/20 blur-3xl" />

        <div className="relative w-full max-w-md rounded-[1.75rem] border border-white bg-white p-7 text-center shadow-[0_25px_70px_-30px_rgba(15,23,42,0.3)] sm:p-9">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-brand-black">
            <span className="font-heading text-lg font-extrabold text-brand-lime">
              NV
            </span>
          </div>

          <div className="mx-auto mt-5 flex h-14 w-14 items-center justify-center rounded-full bg-brand-green/10">
            <MailCheck className="h-7 w-7 text-brand-green" />
          </div>

          <h1 className="mt-5 font-heading text-2xl font-extrabold text-brand-dark">
            Check Your Email
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Your account has been created. Verify your email to activate
            your NEETVIDYA account.
          </p>

          <div className="mt-5 rounded-xl border border-brand-green/15 bg-brand-green/5 p-4 text-left">
            <div className="flex items-start gap-3">
              <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-brand-green" />
              <p className="text-sm leading-5 text-slate-600">
                Verification email sent to{" "}
                <strong className="text-brand-dark">
                  {form.email}
                </strong>
              </p>
            </div>
          </div>

          <p className="mt-5 text-xs text-slate-400">
            Didn't receive it? Check your spam folder or{" "}
            <Link
              to="/login"
              className="font-semibold text-brand-green hover:text-brand-dark"
            >
              try logging in
            </Link>
            .
          </p>

          <Link
            to="/login"
            className="group mt-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-brand-dark"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            Back to Sign In
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="relative h-screen overflow-hidden bg-brand-soft">
      <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-brand-green/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-emerald-200/20 blur-3xl" />

      <div className="relative flex h-full items-center justify-center p-3 sm:p-5 lg:p-6">
        <div className="grid h-full max-h-[760px] w-full max-w-[1250px] overflow-hidden rounded-[1.75rem] border border-white bg-white shadow-[0_25px_80px_-30px_rgba(15,23,42,0.3)] lg:grid-cols-2">

          {/* LEFT */}
          <section className="relative hidden overflow-hidden bg-brand-black lg:flex">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(34,197,94,0.2),_transparent_40%),radial-gradient(circle_at_bottom_left,_rgba(163,230,53,0.1),_transparent_35%)]" />

            <div className="pointer-events-none absolute -right-28 -top-28 h-72 w-72 rounded-full bg-brand-green/15 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-28 -left-28 h-72 w-72 rounded-full bg-brand-lime/10 blur-3xl" />

            <div className="relative z-10 flex w-full items-center px-10 xl:px-14">
              <div className="w-full max-w-md">

                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand-green/25 bg-brand-green/10 px-3 py-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-lime" />
                  <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-brand-lime">
                    Student Registration
                  </span>
                </div>

                <h2 className="font-heading text-4xl font-extrabold leading-[1.05] tracking-tight text-white xl:text-[3.2rem]">
                  Start Your
                  <span className="block text-brand-lime">
                    NEET Journey.
                  </span>
                </h2>

                <p className="mt-4 max-w-sm text-sm leading-6 text-gray-400">
                  Create your NEETVIDYA student account and access your
                  learning portal after verification.
                </p>

                <div className="my-7 h-px w-14 bg-brand-green/50" />

                <div className="grid grid-cols-2 gap-x-6 gap-y-5">
                  {[
                    {
                      icon: BadgeCheck,
                      title: "Student Account",
                    },
                    {
                      icon: MailCheck,
                      title: "Email Verification",
                    },
                    {
                      icon: ShieldCheck,
                      title: "Secure Access",
                    },
                    {
                      icon: Smartphone,
                      title: "Any Device",
                    },
                  ].map((item) => {
                    const Icon = item.icon;

                    return (
                      <div
                        key={item.title}
                        className="flex items-center gap-3"
                      >
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-brand-green/20 bg-brand-green/10 text-brand-lime">
                          <Icon className="h-4 w-4" />
                        </div>

                        <span className="text-xs font-semibold text-gray-300">
                          {item.title}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-8 flex items-center gap-2 text-[10px] text-gray-500">
                  <Sparkles className="h-3.5 w-3.5 text-brand-lime" />
                  Structured preparation for medical aspirants.
                </div>
              </div>
            </div>
          </section>

          {/* RIGHT FORM */}
          <section className="flex min-h-0 items-center overflow-y-auto px-5 py-5 sm:px-8 lg:px-10 xl:px-14">
            <div className="mx-auto w-full max-w-md">

              {/* HEADER */}
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-brand-green/15 bg-brand-green/5 px-3 py-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
                    <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-brand-green">
                      Join NEETVIDYA
                    </span>
                  </div>

                  <h1 className="mt-3 font-heading text-2xl font-extrabold tracking-tight text-brand-dark sm:text-3xl">
                    Create Account
                  </h1>

                  <p className="mt-1 text-xs text-slate-500">
                    Already have an account?{" "}
                    <Link
                      to="/login"
                      className="font-semibold text-brand-green hover:text-brand-dark"
                    >
                      Sign In
                    </Link>
                  </p>
                </div>

                <Link
                  to="/login"
                  className="hidden items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-brand-dark sm:flex"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  Login
                </Link>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3">

                {/* NAME */}
                <div>
                  <label
                    htmlFor="name"
                    className="mb-1.5 block text-[9px] font-bold uppercase tracking-[0.18em] text-slate-500"
                  >
                    Full Name
                  </label>

                  <input
                    id="name"
                    type="text"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    className="w-full rounded-lg border border-slate-200 bg-slate-50/70 px-3.5 py-2.5 text-sm text-brand-dark outline-none transition focus:border-brand-green focus:bg-white focus:ring-4 focus:ring-brand-green/10"
                  />
                </div>

                {/* EMAIL */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-1.5 block text-[9px] font-bold uppercase tracking-[0.18em] text-slate-500"
                  >
                    Email Address
                  </label>

                  <input
                    id="email"
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    className="w-full rounded-lg border border-slate-200 bg-slate-50/70 px-3.5 py-2.5 text-sm text-brand-dark outline-none transition focus:border-brand-green focus:bg-white focus:ring-4 focus:ring-brand-green/10"
                  />
                </div>

                {/* PHONE */}
                <div>
                  <label
                    htmlFor="phone"
                    className="mb-1.5 block text-[9px] font-bold uppercase tracking-[0.18em] text-slate-500"
                  >
                    Phone Number
                  </label>

                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className="w-full rounded-lg border border-slate-200 bg-slate-50/70 px-3.5 py-2.5 text-sm text-brand-dark outline-none transition focus:border-brand-green focus:bg-white focus:ring-4 focus:ring-brand-green/10"
                  />
                </div>

                {/* PASSWORD */}
                <div>
                  <label
                    htmlFor="password"
                    className="mb-1.5 block text-[9px] font-bold uppercase tracking-[0.18em] text-slate-500"
                  >
                    Password
                  </label>

                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      required
                      value={form.password}
                      onChange={handleChange}
                      placeholder="Minimum 8 characters"
                      className="w-full rounded-lg border border-slate-200 bg-slate-50/70 px-3.5 py-2.5 pr-11 text-sm text-brand-dark outline-none transition focus:border-brand-green focus:bg-white focus:ring-4 focus:ring-brand-green/10"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword((value) => !value)
                      }
                      className="absolute right-2.5 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-md text-slate-400 hover:bg-slate-100 hover:text-brand-dark"
                    >
                      {showPassword ? (
                        <EyeOff className="h-3.5 w-3.5" />
                      ) : (
                        <Eye className="h-3.5 w-3.5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* CONFIRM */}
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="mb-1.5 block text-[9px] font-bold uppercase tracking-[0.18em] text-slate-500"
                  >
                    Confirm Password
                  </label>

                  <input
                    id="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    required
                    value={form.confirmPassword}
                    onChange={handleChange}
                    placeholder="Re-enter your password"
                    className="w-full rounded-lg border border-slate-200 bg-slate-50/70 px-3.5 py-2.5 text-sm text-brand-dark outline-none transition focus:border-brand-green focus:bg-white focus:ring-4 focus:ring-brand-green/10"
                  />
                </div>

                {/* TERMS */}
                <p className="pt-1 text-[10px] leading-4 text-slate-400">
                  By creating an account, you agree to our{" "}
                  <Link
                    to="/terms"
                    className="font-medium text-brand-green hover:underline"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    to="/terms"
                    className="font-medium text-brand-green hover:underline"
                  >
                    Privacy Policy
                  </Link>
                  .
                </p>

                {/* BUTTON */}
                <button
                  type="submit"
                  disabled={loading}
                  className="group flex w-full items-center justify-center gap-2 rounded-lg bg-brand-green px-4 py-3 text-sm font-bold text-white shadow-lg shadow-brand-green/20 transition-all hover:-translate-y-0.5 hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <UserPlus className="h-4 w-4" />

                  {loading
                    ? "Creating Account..."
                    : "Create Account"}

                  {!loading && (
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  )}
                </button>
              </form>

              <div className="mt-5 flex items-center justify-center gap-3">
                <span className="h-px w-8 bg-brand-green/30" />
                <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
                <span className="h-px w-8 bg-brand-green/30" />
              </div>

              <p className="mt-3 text-center text-[9px] uppercase tracking-[0.16em] text-slate-400">
                NEET-focused learning environment
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}