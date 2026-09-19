import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, BookOpen, ClipboardList, BarChart3, User, LogOut, Menu, X, Bell, GraduationCap } from "lucide-react";
import { useState, useContext, useEffect } from "react";
import { motion } from "framer-motion";
import { AuthContext } from "../context/AuthContext";
import api from "../config/api";
import TelegramLink from "../components/shared/TelegramLink";
import NotificationBell from "../components/shared/NotificationBell";
import useContactSettings from "../hooks/useContactSettings";

const navItems = [
  { label: "Dashboard", path: "/student", icon: LayoutDashboard, end: true },
  { label: "Learn", path: "/student/learn", icon: BookOpen },
  { label: "Tests & DPP", path: "/student/tests", icon: ClipboardList },
  { label: "My Results", path: "/student/results", icon: BarChart3 },
  { label: "Performance", path: "/student/performance", icon: BarChart3 },
  { label: "Profile", path: "/student/profile", icon: User },
];

export default function StudentLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [myBatch, setMyBatch] = useState(null);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const { settings } = useContactSettings();

  // Show the student's batch at the top of their area.
  useEffect(() => {
    api
      .get("/students/my")
      .then(({ data }) => setMyBatch(data.data?.student?.batches?.[0] || null))
      .catch(() => {});
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="h-screen overflow-hidden bg-brand-soft flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-brand-black text-white transform transition-transform lg:translate-x-0 lg:static flex flex-col justify-between shrink-0 h-screen ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div>
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-green to-brand-lime flex items-center justify-center font-heading font-extrabold text-brand-black text-sm">
                NV
              </div>
              <div>
                <h2 className="font-heading font-bold text-base text-white leading-tight">NEET<span className="text-brand-lime">VIDYA</span></h2>
                <p className="text-[11px] text-gray-400 font-medium">Student Portal</p>
              </div>
            </div>
            <button className="lg:hidden text-gray-400" onClick={() => setSidebarOpen(false)}>
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="p-3 space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2.5 rounded-btn text-sm font-medium transition-all ${
                    isActive
                      ? "bg-brand-green/20 text-brand-lime border-l-4 border-brand-lime font-semibold"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`
                }
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="p-4 border-t border-white/10 space-y-3 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <div className="bg-white/5 rounded-lg p-3 text-xs text-gray-400">
            <p className="font-semibold text-gray-200 mb-1">Doubt Assistance</p>
            <TelegramLink url={settings.telegramChannelLink} label="Telegram Channel" className="text-xs text-sky-400" />
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2.5 px-3 py-2 text-sm text-rose-400 hover:bg-rose-500/10 rounded-btn w-full transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {sidebarOpen && <div className="fixed inset-0 bg-black/60 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <header className="bg-white border-b border-gray-100 px-4 py-3.5 flex items-center justify-between lg:px-8 shrink-0 z-20">
          <button className="lg:hidden p-1.5 rounded text-gray-600 hover:bg-gray-100" onClick={() => setSidebarOpen(true)}>
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 ml-auto">
            {myBatch && (
              <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 bg-brand-green/10 text-brand-green rounded-full border-brand-green/20">
                <GraduationCap className="w-3.5 h-3.5" /> {myBatch.name}
              </span>
            )}
            <NotificationBell />
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-brand-dark leading-tight">{user?.name}</p>
              <p className="text-xs text-gray-400 capitalize">{user?.role} Account</p>
            </div>
            <div className="w-9 h-9 rounded-full bg-brand-green/10 text-brand-green font-bold flex items-center justify-center border border-brand-green/30 text-sm">
              {user?.name ? user.name[0].toUpperCase() : "S"}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto overscroll-contain p-4 pb-24 lg:p-8 lg:pb-8 w-full">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
    </div>
  );
}
