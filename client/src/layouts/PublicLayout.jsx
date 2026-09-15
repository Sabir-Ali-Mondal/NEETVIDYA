import { Outlet, Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, ArrowRight, Instagram, Facebook, Youtube } from "lucide-react";
import { useState } from "react";
import images from "../config/images";
import WhatsAppLink from "../components/shared/WhatsAppLink";
import TelegramLink from "../components/shared/TelegramLink";
import useContactSettings from "../hooks/useContactSettings";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Courses", path: "/courses" },
  { label: "Faculty", path: "/faculty" },
  { label: "Test Series", path: "/test-series" },
  { label: "Results", path: "/results" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

export default function PublicLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { settings } = useContactSettings();

  const socialLinks = [
    { label: "Facebook", href: settings.facebookLink, icon: Facebook },
    { label: "Instagram", href: settings.instagramLink, icon: Instagram },
    { label: "YouTube", href: settings.youtubeLink, icon: Youtube },
  ].filter((link) => link.href);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Top Notification / Contact Strip */}
      <div className="bg-brand-black text-xs text-gray-300 py-2 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5 text-brand-lime" /> +91 74396 85658</span>
            <span className="hidden sm:inline text-gray-500">|</span>
            <span className="hidden sm:inline">Admissions Open for NEET 2026 Batch Alpha</span>
          </div>
          <div className="flex items-center gap-4">
            <TelegramLink url={settings.telegramChannelLink} label="Telegram Channel" className="text-xs text-sky-400 hover:text-sky-300" />
            <WhatsAppLink number={settings.whatsappNumber} message={settings.whatsappDefaultMessage} label="Admissions Desk" className="text-xs text-emerald-400 hover:text-emerald-300" />
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-brand-dark/95 backdrop-blur sticky top-0 z-50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="flex items-center gap-3">
              <img src={images.logo} alt="NEETVIDYA" className="h-10 sm:h-12 w-auto object-contain" />
            </Link>

            <nav className="hidden md:flex items-center gap-7">
              {navLinks.map((link) => {
                const active = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`text-sm font-medium transition-all ${
                      active ? "text-brand-lime font-semibold" : "text-gray-300 hover:text-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            <div className="hidden md:flex items-center gap-3">
              <Link to="/login" className="text-sm font-medium text-gray-300 hover:text-white px-3 py-2 transition-colors">
                Portal Login
              </Link>
              <Link to="/register" className="btn-primary text-sm !py-2.5 !px-5">
                Join NEETVIDYA <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <button className="md:hidden text-gray-300 p-2" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden bg-brand-dark border-t border-gray-800 py-4 px-6 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                className="block text-base text-gray-200 hover:text-brand-lime py-1 font-medium"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-gray-800 flex flex-col gap-2.5">
              <Link to="/login" onClick={() => setMobileOpen(false)} className="btn-secondary w-full text-center">
                Portal Login
              </Link>
              <Link to="/register" onClick={() => setMobileOpen(false)} className="btn-primary w-full text-center">
                Join NEETVIDYA
              </Link>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="bg-brand-black text-gray-400 py-16 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <img src={images.logo} alt="NEETVIDYA" className="h-10 sm:h-11 w-auto object-contain" />
              </div>
              <p className="text-sm text-gray-400 max-w-md leading-relaxed mb-6">
                NEETVIDYA is India's premier dedicated medical tutoring institute. Our student-first methodology blends rigorous daily practice, NCERT mastery, and precision computerized testing.
              </p>
              <div className="flex items-center gap-4">
                <TelegramLink url={settings.telegramChannelLink} label="Telegram Channel" className="text-xs text-sky-400" />
                <WhatsAppLink number={settings.whatsappNumber} message={settings.whatsappDefaultMessage} label="Admissions Helpline" className="text-xs text-emerald-400" />
              </div>
              {socialLinks.length > 0 && (
                <div className="flex items-center gap-3 mt-4">
                  {socialLinks.map(({ label, href, icon: Icon }) => (
                    <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-gray-700 bg-white/5 text-gray-300 hover:text-brand-lime hover:border-brand-lime/50 transition-colors" aria-label={label}>
                      <Icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              )}
            </div>
            <div>
              <h4 className="font-heading font-semibold text-white text-sm uppercase tracking-wider mb-4">Explore</h4>
              <ul className="space-y-2.5 text-sm">
                {navLinks.map((link) => (
                  <li key={link.path}>
                    <Link to={link.path} className="hover:text-brand-lime transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-heading font-semibold text-white text-sm uppercase tracking-wider mb-4">Institute Desk</h4>
              <p className="text-sm mb-2 text-gray-300">NEETVIDYA COACHING CENTER</p>
              <p className="text-sm mb-2 text-gray-400">Karimpur Main Road, Karimpur, Nadia</p>
              <p className="text-sm mb-2 text-gray-400">Helpline: +91 74396 85658, +91 83910 21878</p>
              <p className="text-sm text-gray-400">Gmail: neetvidya720@gmail.com</p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-wrap items-center justify-between text-xs text-gray-500 gap-4">
            <p>&copy; {new Date().getFullYear()} NEETVIDYA Education Pvt Ltd. All rights reserved.</p>
            <p>Designed for Medical Aspirants across India.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
