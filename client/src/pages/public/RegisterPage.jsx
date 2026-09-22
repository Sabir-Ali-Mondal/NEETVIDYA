import { useState, useContext, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
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
import HomeButton from "../../components/shared/HomeButton";

export default function RegisterPage() {
  const location = useLocation();

  // Capture where this signup came from so the admin can later see it.
  // Priority: explicit query params (course/batch/campaign/utm) → referrer.
  const registrationSource = useMemo(() => {
    const params = new URLSearchParams(location.search);
    const get = (k) => params.get(k) || undefined;

    const referrer =
      get("ref") ||
      get("source") ||
      (typeof document !== "undefined" && document.referrer) ||
      undefined;

    const utm = {};
    ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"].forEach((k) => {
      const v = params.get(k);
      if (v) utm[k] = v;
    });

    const courseName = get("courseName") || get("course");
    const batchName = get("batchName") || get("batch");
    const campaign = get("campaign") || utm.utm_campaign || undefined;

    // Human-readable label describing the entry point.
    const parts = [];
    if (courseName) parts.push(`Course: ${courseName}`);
    if (batchName) parts.push(`Batch: ${batchName}`);
    if (campaign) parts.push(`Campaign: ${campaign}`);

    const label =
      parts.length > 0
        ? parts.join(" • ")
        : referrer
          ? `Direct link • ${referrer}`
          : get("page") || location.pathname;

    return {
      type: campaign ? "CAMPAIGN" : "WEBSITE",
      label,
      page: get("page") || location.pathname + location.search,
      referrer: typeof referrer === "string" ? referrer.slice(0, 300) : undefined,
      campaign,
      courseName,
      batchName,
      utm,
    };
  }, [location.pathname, location.search]);

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
    setForm((f) => ({
      ...f,
      [e.target.name]: e.target.value,
    }));

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
        form.phone,
        registrationSource
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

  /* =========================================================
     REGISTRATION SUCCESS
  ========================================================= */
  if (registered) {
    return (
      <main className="relative flex h-screen items-center justify-center overflow-hidden bg-brand-soft px-4">

        {/* Background decoration */}
        <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-brand-green/10 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-emerald-200/20 blur-3xl" />

        <div className="relative w-full max-w-md rounded-[1.75rem] border border-white bg-white p-7 text-center shadow-[0_25px_70px_-30px_rgba(15,23,42,0.3)] sm:p-9">

          {/* Home button */}
          <div className="absolute right-5 top-5 sm:right-7 sm:top-7">
            <HomeButton variant="light" />
          </div>

          {/* Logo */}
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-brand-black">
            <span className="font-heading text-lg font-extrabold text-brand-lime">
              NV
            </span>
          </div>

          {/* Success icon */}
          <div className="mx-auto mt-5 flex h-14 w-14 items-center justify-center rounded-full bg-brand-green/10">
            <MailCheck className="h-7 w-7 text-brand-green" />
          </div>

          {/* Heading */}
          <h1 className="mt-5 font-heading text-2xl font-extrabold text-brand-dark">
            Check Your Email
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Your account has been created. Verify your email to activate
            your NEETVIDYA account.
          </p>

          {/* Email information */}
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

          {/* Help text */}
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

          {/* Login */}
          <Link
            to="/login"
            className="group mt-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-brand-dark"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            Back to Sign In
          </Link>

          {/* Decorative line */}
          <div className="mt-6 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-brand-green/30" />

            <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />

            <span className="h-px w-8 bg-brand-green/30" />
          </div>

          <p className="mt-3 text-[9px] uppercase tracking-[0.16em] text-slate-400">
            NEET-focused learning environment
          </p>
        </div>
      </main>
    );
  }

  /* =========================================================
     REGISTRATION PAGE
  ========================================================= */
  return (
    <main className="relative h-screen overflow-hidden bg-brand-soft">

      {/* Background decoration */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-brand-green/10 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-emerald-200/20 blur-3xl" />

      <div className="relative flex h-full items-center justify-center p-3 sm:p-5 lg:p-6">

        <div className="grid h-full max-h-[760px] w-full max-w-[1250px] overflow-hidden rounded-[1.75rem] border border-white bg-white shadow-[0_25px_80px_-30px_rgba(15,23,42,0.3)] lg:grid-cols-2">

          {/* =================================================
              LEFT PANEL — DESKTOP
          ================================================= */}
          <section className="relative hidden overflow-hidden bg-brand-black lg:flex">

            {/* Background gradients */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(34,197,94,0.2),_transparent_40%),radial-gradient(circle_at_bottom_left,_rgba(163,230,53,0.1),_transparent_35%)]" />

            {/* Decorative glow */}
            <div className="pointer-events-none absolute -right-28 -top-28 h-72 w-72 rounded-full bg-brand-green/15 blur-3xl" />

            <div className="pointer-events-none absolute -bottom-28 -left-28 h-72 w-72 rounded-full bg-brand-lime/10 blur-3xl" />

            {/* =================================================
                BACK TO HOME — DESKTOP
            ================================================= */}
            <div className="absolute left-7 top-7 z-20 xl:left-9 xl:top-9">
              <HomeButton />
            </div>

            {/* LEFT CONTENT */}
            <div className="relative z-10 flex w-full items-center px-10 xl:px-14">

              <div className="w-full max-w-md">

                {/* Badge */}
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand-green/25 bg-brand-green/10 px-3 py-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-lime" />

                  <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-brand-lime">
                    Student Registration
                  </span>
                </div>

                {/* Heading */}
                <h2 className="font-heading text-4xl font-extrabold leading-[1.05] tracking-tight text-white xl:text-[3.2rem]">
                  Start Your
                  <span className="block text-brand-lime">
                    NEET Journey.
                  </span>
                </h2>

                {/* Description */}
                <p className="mt-4 max-w-sm text-sm leading-6 text-gray-400">
                  Create your NEETVIDYA student account and access your
                  learning portal after verification.
                </p>

                {/* Divider */}
                <div className="my-7 h-px w-14 bg-brand-green/50" />

                {/* Features */}
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

                {/* Bottom message */}
                <div className="mt-8 flex items-center gap-2 text-[10px] text-gray-500">
                  <Sparkles className="h-3.5 w-3.5 text-brand-lime" />

                  Structured preparation for medical aspirants.
                </div>
              </div>
            </div>
          </section>

          {/* =================================================
              RIGHT PANEL — FORM
          ================================================= */}
          <section className="flex min-h-0 items-center overflow-y-auto px-5 py-5 sm:px-8 lg:px-10 xl:px-14">

            <div className="mx-auto w-full max-w-md">

              {/* =================================================
                  BACK TO HOME — MOBILE
              ================================================= */}
              <div className="mb-3 flex justify-end lg:hidden">
                <HomeButton variant="light" />
              </div>

              {/* =================================================
                  HEADER
              ================================================= */}
              <div className="mb-5 flex items-start justify-between gap-4">

                <div>
                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 rounded-full border border-brand-green/15 bg-brand-green/5 px-3 py-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />

                    <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-brand-green">
                      Join NEETVIDYA
                    </span>
                  </div>

                  {/* Heading */}
                  <h1 className="mt-3 font-heading text-2xl font-extrabold tracking-tight text-brand-dark sm:text-3xl">
                    Create Account
                  </h1>

                  {/* Login link */}
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

                {/* Desktop login shortcut */}
                <Link
                  to="/login"
                  className="hidden items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-brand-dark sm:flex"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  Login
                </Link>
              </div>

              {/* =================================================
                  FORM
              ================================================= */}
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
                    autoComplete="name"
                    className="w-full rounded-lg border border-slate-200 bg-slate-50/70 px-3.5 py-2.5 text-sm text-brand-dark outline-none transition-all placeholder:text-slate-400 focus:border-brand-green focus:bg-white focus:ring-4 focus:ring-brand-green/10"
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
                    autoComplete="email"
                    className="w-full rounded-lg border border-slate-200 bg-slate-50/70 px-3.5 py-2.5 text-sm text-brand-dark outline-none transition-all placeholder:text-slate-400 focus:border-brand-green focus:bg-white focus:ring-4 focus:ring-brand-green/10"
                  />
                </div>

                {/* PHONE */}
                <div>
                  <label
                    htmlFor="phone"
                    className="mb-1.5 block text-[9px] font-bold uppercase tracking-[0.18em] text-slate-500"
                  >
                    WhatsApp Number
                  </label>

                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    autoComplete="tel"
                    className="w-full rounded-lg border border-slate-200 bg-slate-50/70 px-3.5 py-2.5 text-sm text-brand-dark outline-none transition-all placeholder:text-slate-400 focus:border-brand-green focus:bg-white focus:ring-4 focus:ring-brand-green/10"
                  />

                  <p className="mt-1.5 text-[10px] leading-4 text-slate-400">
                    Please enter a number that is on WhatsApp — we use it to send
                    you important updates and admission details.
                  </p>
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
                      autoComplete="new-password"
                      className="w-full rounded-lg border border-slate-200 bg-slate-50/70 px-3.5 py-2.5 pr-11 text-sm text-brand-dark outline-none transition-all placeholder:text-slate-400 focus:border-brand-green focus:bg-white focus:ring-4 focus:ring-brand-green/10"
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

                {/* CONFIRM PASSWORD */}
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
                    autoComplete="new-password"
                    className="w-full rounded-lg border border-slate-200 bg-slate-50/70 px-3.5 py-2.5 text-sm text-brand-dark outline-none transition-all placeholder:text-slate-400 focus:border-brand-green focus:bg-white focus:ring-4 focus:ring-brand-green/10"
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

                {/* CREATE ACCOUNT */}
                <button
                  type="submit"
                  disabled={loading}
                  className="group flex w-full items-center justify-center gap-2 rounded-lg bg-brand-green px-4 py-3 text-sm font-bold text-white shadow-lg shadow-brand-green/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-dark hover:shadow-xl hover:shadow-brand-green/10 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <UserPlus className="h-4 w-4" />

                  {loading
                    ? "Creating Account..."
                    : "Create Account"}

                  {!loading && (
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                  )}
                </button>
              </form>

              {/* Decorative line */}
              <div className="mt-5 flex items-center justify-center gap-3">
                <span className="h-px w-8 bg-brand-green/30" />

                <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />

                <span className="h-px w-8 bg-brand-green/30" />
              </div>

              {/* Footer */}
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