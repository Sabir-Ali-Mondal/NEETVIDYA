import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, FileText, HelpCircle, ClipboardList, Link, BarChart3, User, LogOut, Menu, X } from "lucide-react";
import { useState, useContext } from "react";
import { motion } from "framer-motion";
import { AuthContext } from "../context/AuthContext";
import NotificationBell from "../components/shared/NotificationBell";

const navItems = [
  { label: "Dashboard", path: "/teacher", icon: LayoutDashboard, end: true },
  { label: "Study Materials", path: "/teacher/materials", icon: FileText },
  { label: "Exam & Question Manager", path: "/teacher/exams", icon: ClipboardList },
];

export default function TeacherLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="h-screen overflow-hidden bg-brand-soft flex">
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-brand-dark text-white transform transition-transform lg:translate-x-0 lg:static flex flex-col justify-between shrink-0 h-screen ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div>
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-brand-green flex items-center justify-center font-heading font-extrabold text-white text-sm">
                NV
              </div>
              <div>
                <h2 className="font-heading font-bold text-base text-white">NEETVIDYA</h2>
                <p className="text-[11px] text-brand-lime font-medium">Faculty Workspace</p>
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

        <div className="p-4 border-t border-white/10 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2.5 px-3 py-2 text-sm text-rose-400 hover:bg-rose-500/10 rounded-btn w-full transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Faculty Sign Out
          </button>
        </div>
      </aside>

      {sidebarOpen && <div className="fixed inset-0 bg-black/60 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <header className="bg-white border-b border-gray-100 px-4 py-3.5 flex items-center justify-between lg:px-8 shrink-0 z-20">
          <button className="lg:hidden p-1.5 rounded text-gray-600 hover:bg-gray-100" onClick={() => setSidebarOpen(true)}>
            <Menu className="w-5 h-5" />
          </button>
          <div className="ml-auto flex items-center gap-2 min-w-0">
            <NotificationBell />
            <span className="max-w-[140px] sm:max-w-none truncate text-xs sm:text-sm font-semibold text-brand-dark">{user?.name} (Faculty)</span>
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
