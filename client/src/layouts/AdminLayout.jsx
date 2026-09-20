import { Outlet, NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  Layers,
  ClipboardList,
  Trophy,
  Settings,
  Globe,
  LogOut,
  Menu,
  X,
  MessageSquare,
} from "lucide-react";
import { useState, useContext } from "react";
import { motion } from "framer-motion";
import { AuthContext } from "../context/AuthContext";
import NotificationBell from "../components/shared/NotificationBell";

const navItems = [
  { label: "Overview", path: "/admin", icon: LayoutDashboard, end: true },
  { label: "Students", path: "/admin/students", icon: Users },
  { label: "Faculty", path: "/admin/teachers", icon: GraduationCap },
  { label: "Batches & Courses", path: "/admin/batches", icon: Layers },
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
    <div className="h-screen overflow-hidden bg-brand-soft flex text-brand-dark">
      {/* =========================================================
          SIDEBAR
      ========================================================== */}
<aside
  className={`
    fixed inset-y-0 left-0 z-50
    w-[280px] sm:w-72
    h-[100dvh]
    bg-brand-black text-white
    flex flex-col
    overflow-hidden
    transform transition-transform duration-300 ease-out
    lg:static lg:translate-x-0
    ${
      sidebarOpen
        ? "translate-x-0 shadow-[20px_0_60px_rgba(0,0,0,0.3)]"
        : "-translate-x-full"
    }
  `}
>
  {/* Sidebar Header */}
  <div className="shrink-0 px-5 sm:px-6 pt-5 pb-4 border-b border-white/[0.08]">
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-10 h-10 rounded-[14px] bg-brand-lime flex items-center justify-center font-heading font-black text-brand-black text-sm shrink-0">
          NV
        </div>

        <div className="min-w-0">
          <h2 className="font-heading font-extrabold text-[15px] text-white leading-none">
            NEETVIDYA
          </h2>

          <div className="flex items-center gap-1.5 mt-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-lime shrink-0" />

            <p className="text-[10px] text-brand-lime font-semibold uppercase tracking-[0.12em]">
              Administration
            </p>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setSidebarOpen(false)}
        className="
          lg:hidden
          w-9 h-9
          rounded-xl
          flex items-center justify-center
          text-gray-400
          hover:text-white
          hover:bg-white/10
          active:scale-95
          transition
          shrink-0
        "
        aria-label="Close menu"
      >
        <X className="w-5 h-5" />
      </button>
    </div>

    {/* Logout directly under Administration */}
    <button
      type="button"
      onClick={handleLogout}
      className="
        group
        mt-4
        flex items-center gap-2.5
        w-full
        min-h-[42px]
        px-3
        rounded-xl
        text-[12px] font-semibold
        text-gray-400
        bg-white/[0.035]
        border border-white/[0.06]
        hover:text-rose-300
        hover:bg-rose-500/[0.08]
        hover:border-rose-500/10
        transition-all
      "
    >
      <span className="w-7 h-7 rounded-lg flex items-center justify-center bg-white/[0.04] group-hover:bg-rose-500/10 shrink-0">
        <LogOut className="w-4 h-4" />
      </span>

      <span>Admin Logout</span>
    </button>
  </div>

  {/* Scrollable Navigation */}
  <div
    className="
      flex-1
      min-h-0
      overflow-y-auto
      overscroll-contain
      touch-pan-y
      px-3
      py-4
    "
    style={{
      WebkitOverflowScrolling: "touch",
    }}
  >
    <p className="px-3 mb-2 text-[9px] uppercase tracking-[0.18em] font-bold text-gray-600">
      Management
    </p>

    <nav className="space-y-1">
      {navItems.map((item) => {
        const Icon = item.icon;

        return (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.end}
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `
              group relative
              flex items-center gap-3
              w-full
              min-h-[48px]
              px-3.5 py-2.5
              rounded-xl
              text-[12px] font-medium
              transition-all duration-200
              ${
                isActive
                  ? "bg-brand-green/15 text-brand-lime"
                  : "text-gray-400 hover:text-white hover:bg-white/[0.055]"
              }
              `
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <span className="absolute left-0 top-2.5 bottom-2.5 w-0.5 rounded-full bg-brand-lime" />
                )}

                <span
                  className={`
                    w-8 h-8
                    rounded-lg
                    flex items-center justify-center
                    shrink-0
                    ${
                      isActive
                        ? "bg-brand-green/20 text-brand-lime"
                        : "text-gray-500 group-hover:text-gray-200"
                    }
                  `}
                >
                  <Icon className="w-4 h-4" />
                </span>

                <span className="truncate">
                  {item.label}
                </span>

                {isActive && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-brand-lime shrink-0" />
                )}
              </>
            )}
          </NavLink>
        );
      })}

      <div className="h-5" />
    </nav>
  </div>
</aside>
      {/* =========================================================
          MOBILE OVERLAY
      ========================================================== */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/65 backdrop-blur-[1px] lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* =========================================================
          MAIN CONTENT
      ========================================================== */}
      <div className="flex-1 min-w-0 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header
          className="
            shrink-0
            h-[68px] sm:h-[72px]
            bg-white/95
            backdrop-blur-xl
            border-b border-slate-200/70
            flex items-center
            px-4 sm:px-5 lg:px-8
            z-30
          "
        >
          {/* Mobile Menu */}
          <div className="flex items-center min-w-0">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="
                lg:hidden
                w-10 h-10
                rounded-xl
                border border-slate-200
                bg-white
                text-slate-600
                flex items-center justify-center
                hover:bg-slate-50
                active:scale-95
                transition
              "
              aria-label="Open menu"
            >
              <Menu className="w-[19px] h-[19px]" />
            </button>

            {/* Mobile Brand */}
            <div className="lg:hidden ml-3 min-w-0">
              <p className="font-heading font-extrabold text-sm text-brand-dark leading-none">
                NEETVIDYA
              </p>

              <p className="text-[9px] text-brand-green font-bold uppercase tracking-wider mt-1">
                Admin Panel
              </p>
            </div>
          </div>

          {/* Header Right */}
          <div className="ml-auto flex items-center gap-2 sm:gap-3 min-w-0">
            <NotificationBell />

            {/* Status */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-green/[0.07] border border-brand-green/15">
              <span className="relative flex w-2 h-2">
                <span className="absolute inline-flex w-full h-full rounded-full bg-brand-green opacity-40 animate-ping" />

                <span className="relative inline-flex w-2 h-2 rounded-full bg-brand-green" />
              </span>

              <span className="text-[10px] font-bold text-brand-green uppercase tracking-wide">
                Super Admin
              </span>
            </div>

            {/* Admin Settings */}
            <button
              type="button"
              onClick={() => navigate("/admin/settings")}
              className="
                flex items-center gap-2
                min-w-0
                pl-1.5 pr-2
                sm:pl-2 sm:pr-2.5
                py-1.5
                rounded-xl
                hover:bg-slate-50
                active:bg-slate-100
                transition
              "
              title="Admin Settings"
            >
              <div className="hidden sm:flex w-8 h-8 rounded-lg bg-brand-black items-center justify-center text-brand-lime font-bold text-[11px] shrink-0">
                {(user?.name || "A").charAt(0).toUpperCase()}
              </div>

              <span className="max-w-[100px] sm:max-w-[150px] truncate text-xs sm:text-sm font-semibold text-brand-dark">
                {user?.name}
              </span>
            </button>
          </div>
        </header>

        {/* Page */}
        <main
          className="
            flex-1
            overflow-y-auto
            overflow-x-hidden
            overscroll-contain
            px-4
            pt-5
            pb-[calc(6rem+env(safe-area-inset-bottom))]
            sm:px-5
            sm:pt-6
            lg:px-8
            lg:pt-8
            lg:pb-8
            w-full
          "
        >
          <div className="max-w-7xl mx-auto w-full">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.35,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <Outlet />
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}