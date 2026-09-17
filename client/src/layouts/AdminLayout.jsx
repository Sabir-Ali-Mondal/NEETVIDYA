import { Outlet, NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, Users, GraduationCap, Layers, BookOpen,
  HelpCircle, ClipboardList, Trophy, Settings, Globe, LogOut, Menu, X, MessageSquare
} from "lucide-react";
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import NotificationBell from "../components/shared/NotificationBell";

const navItems = [
  { label: "Overview", path: "/admin", icon: LayoutDashboard, end: true },
  { label: "Students", path: "/admin/students", icon: Users },
  { label: "Faculty", path: "/admin/teachers", icon: GraduationCap },
  { label: "Batches & Courses", path: "/admin/batches", icon: Layers },
  { label: "Question Bank", path: "/admin/questions", icon: HelpCircle },
  { label: "Exams & Tests", path: "/admin/exams", icon: ClipboardList },
  { label: "Enquiries", path: "/admin/enquiries", icon: MessageSquare },
  { label: "Achievements", path: "/admin/achievements", icon: Trophy },
  { label: "Contact & Links", path: "/admin/contact-settings", icon: Globe },
  { label: "Settings", path: "/admin/settings", icon: Settings },
];

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="h-screen overflow-hidden bg-brand-soft flex">
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-brand-black text-white transform transition-transform lg:translate-x-0 lg:static flex flex-col justify-between shrink-0 h-screen ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="overflow-y-auto max-h-[calc(100vh-80px)]">
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-brand-lime flex items-center justify-center font-heading font-extrabold text-brand-black text-sm">
                NV
              </div>
              <div>
                <h2 className="font-heading font-bold text-base text-white">NEETVIDYA</h2>
                <p className="text-[11px] text-brand-lime font-medium">Administration</p>
              </div>
            </div>
            <button className="lg:hidden text-gray-400" onClick={() => setSidebarOpen(false)}>
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="p-3 space-y-0.5">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-btn text-xs font-medium transition-all ${
                    isActive
                      ? "bg-brand-green/25 text-brand-lime border-l-4 border-brand-lime font-semibold"
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
            Admin Logout
          </button>
        </div>
      </aside>

      {sidebarOpen && <div className="fixed inset-0 bg-black/60 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        <header className="bg-white border-b border-gray-100 px-4 py-3.5 flex items-center justify-between lg:px-8 shrink-0 z-20">
          <button className="lg:hidden p-1.5 rounded text-gray-600 hover:bg-gray-100" onClick={() => setSidebarOpen(true)}>
            <Menu className="w-5 h-5" />
          </button>
          <div className="ml-auto flex items-center gap-3">
            <NotificationBell />
            <span className="text-xs font-semibold px-2.5 py-1 bg-brand-green/10 text-brand-green rounded-full border border-brand-green/20">
              Super Admin Active
            </span>
            <span
              onClick={() => navigate("/admin/settings")}
              className="text-sm font-semibold text-brand-dark cursor-pointer hover:text-green-700 transition"
              title="Admin Settings"
            >
              {user?.name}
            </span>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto overscroll-contain p-4 pb-24 lg:p-8 lg:pb-8 w-full">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
