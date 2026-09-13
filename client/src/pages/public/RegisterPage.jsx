import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";
import { UserPlus, Eye, EyeOff, ArrowLeft, CheckCircle, MailCheck } from "lucide-react";

export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", confirmPassword: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [registered, setRegistered] = useState(false);
  const { register } = useContext(AuthContext);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (form.password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }
    setLoading(true);
    try {
      await register(form.name, form.email, form.password, form.phone);
      setRegistered(true);
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (registered) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-100 p-10 text-center space-y-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-400 to-lime-400 flex items-center justify-center font-extrabold text-slate-900 text-2xl mx-auto shadow-lg">
            NV
          </div>
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto">
            <MailCheck className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="font-extrabold text-2xl text-slate-900">Check Your Email</h1>
          <div className="bg-green-50 border border-green-200 rounded-xl p-5 text-left space-y-2">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
              <span className="text-sm font-semibold text-green-800">Account created successfully!</span>
            </div>
            <p className="text-sm text-green-700 leading-relaxed">
              We've sent a verification email to <strong>{form.email}</strong>. Please click the link in the email to activate your account.
            </p>
          </div>
          <p className="text-slate-500 text-xs">
            Didn't receive the email? Check your spam folder or{" "}
            <Link to="/login" className="text-green-600 font-semibold hover:underline">
              try logging in
            </Link>
            {" "}to request a resend.
          </p>
          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 transition"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Left Banner */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#0f172a] items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#0f172a] via-[#1a2e1a] to-[#0f2d0f]" />
          <div className="absolute top-20 right-20 w-64 h-64 bg-green-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-48 h-48 bg-lime-400/10 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-md text-white space-y-8">
          <div>
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-400 to-lime-400 flex items-center justify-center font-extrabold text-slate-900 text-2xl shadow-lg mb-6">
              NV
            </div>
            <h2 className="font-extrabold text-4xl leading-tight">
              Join NEETVIDYA<br />
              <span className="text-green-400">Free Registration</span>
            </h2>
            <p className="text-slate-400 mt-4 text-sm leading-relaxed">
              Create your student account and get immediate access to the learning portal upon verification.
            </p>
          </div>

          <div className="space-y-4">
            {[
              { icon: "✅", text: "Instant student ID on registration" },
              { icon: "📧", text: "Email verification for security" },
              { icon: "🔒", text: "Secure & private data handling" },
              { icon: "📱", text: "Access from any device, anytime" },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-3">
                <span className="text-lg">{item.icon}</span>
                <span className="text-slate-300 text-sm">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-6">
          <div>
            <span className="font-extrabold text-xl text-green-600">NEETVIDYA</span>
            <h1 className="font-extrabold text-3xl text-slate-900 mt-2">Create Account</h1>
            <p className="text-slate-500 text-sm mt-1">
              Already have an account?{" "}
              <Link to="/login" className="text-green-600 font-semibold hover:text-green-700">
                Sign In
              </Link>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                placeholder="Your full name"
                className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-500 transition bg-white shadow-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
                className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-500 transition bg-white shadow-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+91 98765 43210"
                className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-500 transition bg-white shadow-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Minimum 8 characters"
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-500 transition bg-white shadow-sm pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-2">
                Confirm Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                required
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter your password"
                className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-500 transition bg-white shadow-sm"
              />
            </div>

            <p className="text-xs text-slate-400">
              By creating an account, you agree to our{" "}
              <span className="text-green-600 cursor-pointer font-medium">Terms of Service</span> and{" "}
              <span className="text-green-600 cursor-pointer font-medium">Privacy Policy</span>.
            </p>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 active:scale-[0.98] disabled:opacity-60 text-white font-bold py-3.5 rounded-xl transition shadow-md shadow-green-600/25 flex items-center justify-center gap-2"
            >
              <UserPlus className="w-4 h-4" />
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
