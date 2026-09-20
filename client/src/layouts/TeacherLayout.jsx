import { Outlet, NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  ClipboardList,
  LogOut,
  Menu,
  X,
  KeyRound,
} from "lucide-react";
import { useState, useContext } from "react";
import { motion } from "framer-motion";
import { AuthContext } from "../context/AuthContext";
import NotificationBell from "../components/shared/NotificationBell";
import ChangePasswordModal from "../components/shared/ChangePasswordModal";

const navItems = [
  {
    label: "Dashboard",
    path: "/teacher",
    icon: LayoutDashboard,
    end: true,
  },
  {
    label: "Study Materials",
    path: "/teacher/materials",
    icon: FileText,
  },
  {
    label: "Exam & Question Manager",
    path: "/teacher/exams",
    icon: ClipboardList,
  },
];

export default function TeacherLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
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
          overflow-y-auto
          overflow-x-hidden
          overscroll-contain
          transform transition-transform duration-300 ease-out
          lg:static lg:translate-x-0
          ${
            sidebarOpen
              ? "translate-x-0 shadow-[20px_0_60px_rgba(0,0,0,0.35)]"
              : "-translate-x-full"
          }
        `}
        style={{
          WebkitOverflowScrolling: "touch",
        }}
      >
        {/* =====================================================
            BRAND HEADER
        ====================================================== */}
        <div className="px-5 sm:px-6 pt-5 pb-4 border-b border-white/[0.08]">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-[14px] bg-gradient-to-tr from-brand-green to-brand-lime flex items-center justify-center font-heading font-black text-brand-black text-sm shrink-0 shadow-[0_8px_25px_rgba(190,255,0,0.12)]">
                NV
              </div>

              <div className="min-w-0">
                <h2 className="font-heading font-extrabold text-[15px] text-white leading-none">
                  NEET
                  <span className="text-brand-lime">VIDYA</span>
                </h2>

                <div className="flex items-center gap-1.5 mt-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-lime shrink-0" />

                  <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-[0.12em]">
                    Faculty Workspace
                  </p>
                </div>
              </div>
            </div>

            {/* Mobile Close */}
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
        </div>

        {/* =====================================================
            NAVIGATION
            Entire sidebar scrolls — no artificial flex gap.
        ====================================================== */}
        <div className="px-3 py-4">
          <p className="px-3 mb-2 text-[9px] uppercase tracking-[0.18em] font-bold text-gray-600">
            Faculty Area
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
                          transition-all
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
          </nav>
        </div>

        {/* =====================================================
            SIGN OUT
            Naturally follows navigation.
        ====================================================== */}
        <div
          className="
            border-t border-white/[0.08]
            bg-brand-black
            px-3
            pt-2
            pb-[max(0.75rem,env(safe-area-inset-bottom))]
          "
        >
          <button
            type="button"
            onClick={() => {
              setSidebarOpen(false);
              setShowPasswordModal(true);
            }}
            className="
              group
              flex items-center gap-3
              w-full
              min-h-[44px]
              px-3
              rounded-xl
              text-[12px]
              font-semibold
              text-gray-400
              hover:text-brand-lime
              hover:bg-brand-green/[0.08]
              transition-all
              mb-1
            "
          >
            <span className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/[0.05] group-hover:bg-brand-green/10 shrink-0">
              <KeyRound className="w-4 h-4" />
            </span>

            <span>Change Password</span>
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className="
              group
              flex items-center gap-3
              w-full
              min-h-[44px]
              px-3
              rounded-xl
              text-[12px]
              font-semibold
              text-gray-400
              hover:text-rose-300
              hover:bg-rose-500/[0.08]
              active:bg-rose-500/[0.12]
              transition-all
            "
          >
            <span
              className="
                w-8 h-8
                rounded-lg
                flex items-center justify-center
                bg-white/[0.035]
                group-hover:bg-rose-500/10
                shrink-0
              "
            >
              <LogOut className="w-4 h-4" />
            </span>

            <span>Faculty Sign Out</span>
          </button>
        </div>
      </aside>

      {/* =========================================================
          MOBILE OVERLAY
      ========================================================== */}
      {sidebarOpen && (
        <div
          className="
            fixed inset-0
            z-40
            bg-black/65
            backdrop-blur-[1px]
            lg:hidden
          "
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* =========================================================
          MAIN AREA
      ========================================================== */}
      <div className="flex-1 min-w-0 flex flex-col h-screen overflow-hidden">
        {/* =====================================================
            HEADER
        ====================================================== */}
        <header
          className="
            shrink-0
            min-h-[68px] sm:h-[72px]
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
                shrink-0
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
                Faculty Workspace
              </p>
            </div>
          </div>

          {/* Header Right */}
          <div className="ml-auto flex items-center gap-2 sm:gap-3 min-w-0">
            <NotificationBell />

            {/* Faculty name */}
            <div className="hidden sm:block text-right min-w-0">
              <p className="text-sm font-semibold text-brand-dark leading-tight truncate max-w-[180px]">
                {user?.name}
              </p>

              <p className="text-[10px] text-gray-400 mt-0.5">
                Faculty Account
              </p>
            </div>

            {/* Avatar */}
            <button
              type="button"
              onClick={() => navigate("/teacher")}
              className="
                w-9 h-9 sm:w-10 sm:h-10
                rounded-xl
                bg-brand-green/10
                text-brand-green
                font-bold
                flex items-center justify-center
                border border-brand-green/20
                text-sm
                shrink-0
                hover:bg-brand-green/15
                active:scale-95
                transition
              "
              title="Faculty Dashboard"
            >
              {user?.name ? user.name[0].toUpperCase() : "F"}
            </button>
          </div>
        </header>

        {/* =====================================================
            PAGE CONTENT
        ====================================================== */}
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

      <ChangePasswordModal
        open={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
      />
    </div>
  );
}