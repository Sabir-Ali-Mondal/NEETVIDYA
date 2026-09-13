import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";
import { LogIn, Eye, EyeOff, BadgeCheck, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const [identifier, setIdentifier] = useState(""); // email or student ID
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
      toast.success(`Welcome back, ${user.name}!`);
      if (user.role === "admin") navigate("/admin");
      else if (user.role === "teacher") navigate("/teacher");
      else navigate("/student");
    } catch (err) {
      const msg = err.response?.data?.message || "Invalid credentials";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Left Banner */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#0f172a] items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#0f172a] via-[#1a2e1a] to-[#0f2d0f]" />
          <div className="absolute top-20 left-20 w-72 h-72 bg-green-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-56 h-56 bg-lime-400/10 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-md space-y-8 text-white">
          <div>
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-400 to-lime-400 flex items-center justify-center font-extrabold text-slate-900 text-2xl shadow-lg mb-6">
              NV
            </div>
            <h2 className="font-extrabold text-4xl leading-tight tracking-tight">
              Your NEET Journey<br />
              <span className="text-green-400">Starts Here</span>
            </h2>
            <p className="text-slate-400 mt-4 text-sm leading-relaxed">
              Access personalized study materials, take CBT exams, track your rank improvement, and connect with expert mentors — all in one platform.
            </p>
          </div>

          <div className="space-y-3">
            {[
              "Daily Practice Papers & Mock Tests",
              "AI-driven Performance Analytics",
              "Live Lecture Recordings",
              "Chapter-wise DPPs & Doubt Sessions",
            ].map((feat) => (
              <div key={feat} className="flex items-center gap-3">
                <BadgeCheck className="w-5 h-5 text-green-400 flex-shrink-0" />
                <span className="text-slate-300 text-sm">{feat}</span>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-800">
            <p className="text-slate-500 text-xs">
              500+ students cleared NEET in 2023–24 through NEETVIDYA
            </p>
          </div>
        </div>
      </div>

      {/* Right Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          <div>
            <span className="font-extrabold text-xl text-green-600 tracking-tight">NEETVIDYA</span>
            <h1 className="font-extrabold text-3xl text-slate-900 mt-2 tracking-tight">Sign In</h1>
            <p className="text-slate-500 text-sm mt-1">
              Use your registered email address or Student ID (e.g. NV-2026-0001)
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-2">
                Email Address or Student ID
              </label>
              <input
                type="text"
                required
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="name@example.com or NV-2026-0001"
                className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-500 transition-all bg-white shadow-sm"
                autoComplete="username"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-xs text-green-600 hover:text-green-700 font-semibold"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-500 transition-all bg-white shadow-sm pr-12"
                  autoComplete="current-password"
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

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 active:scale-[0.98] disabled:opacity-60 text-white font-bold py-3.5 rounded-xl transition-all shadow-md shadow-green-600/25 flex items-center justify-center gap-2"
            >
              <LogIn className="w-4 h-4" />
              {loading ? "Signing in..." : "Sign In to Portal"}
            </button>
          </form>

          <div className="pt-6 border-t border-slate-100 text-center">
            <p className="text-sm text-slate-500">
              New student?{" "}
              <Link
                to="/register"
                className="text-green-600 font-semibold hover:text-green-700 inline-flex items-center gap-1"
              >
                Create an account <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
