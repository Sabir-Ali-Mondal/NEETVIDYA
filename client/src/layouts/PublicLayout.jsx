import { Outlet, Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  Phone,
  ArrowRight,
  Instagram,
  Facebook,
  Youtube,
  Sparkles,
} from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

  useEffect(() => {
    const hash = location.hash;

    if (hash) {
      const element = document.getElementById(hash.replace("#", ""));

      if (element) {
        setTimeout(() => {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 50);

        return;
      }
    }

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  }, [location.pathname, location.hash]);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const socialLinks = [
    {
      label: "Facebook",
      href: settings.facebookLink,
      icon: Facebook,
    },
    {
      label: "Instagram",
      href: settings.instagramLink,
      icon: Instagram,
    },
    {
      label: "YouTube",
      href: settings.youtubeLink,
      icon: Youtube,
    },
  ].filter((link) => link.href);

  return (
    <div className="flex min-h-screen flex-col bg-brand-soft">

      {/* =========================================================
          TOP INFORMATION BAR
      ========================================================= */}
      <div className="hidden border-b border-white/10 bg-brand-black text-xs text-gray-300 sm:block">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-2 sm:px-6 lg:px-8">

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <Phone className="h-3.5 w-3.5 text-brand-lime" />
              +91 74396 85658
            </span>

            <span className="hidden text-white/15 sm:inline">
              |
            </span>

            <span className="hidden items-center gap-1.5 lg:inline-flex">
              <Sparkles className="h-3.5 w-3.5 text-brand-lime" />
              Admissions Open for NEET 2026 Batches
            </span>
          </div>

          <div className="flex items-center gap-4">
            <TelegramLink
              url={settings.telegramChannelLink}
              label="Telegram Channel"
              className="text-xs text-sky-400 transition-colors hover:text-sky-300"
            />

            <WhatsAppLink
              number={settings.whatsappNumber}
              message={settings.whatsappDefaultMessage}
              label="Admissions Desk"
              className="text-xs text-emerald-400 transition-colors hover:text-emerald-300"
            />
          </div>
        </div>
      </div>

      {/* =========================================================
          MAIN HEADER
      ========================================================= */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-brand-black/90 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.5)] backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between sm:h-[4.5rem]">

            {/* Logo */}
            <Link
              to="/"
              className="group flex items-center"
              aria-label="NEETVIDYA Home"
            >
              <img
                src={images.logo}
                alt="NEETVIDYA"
                className="h-8 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.04] sm:h-10"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden items-center gap-1 md:flex lg:gap-1.5">
              {navLinks.map((link) => {
                const active = location.pathname === link.path;

                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`relative rounded-xl px-3 py-2 text-sm transition-all duration-200 lg:px-3.5 ${
                      active
                        ? "font-semibold text-brand-lime"
                        : "font-medium text-gray-300 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    {link.label}

                    {active && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute bottom-0.5 left-3 right-3 h-0.5 rounded-full bg-brand-lime"
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 30,
                        }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden items-center gap-2.5 md:flex">
              <Link
                to="/login"
                className="rounded-xl px-3 py-2 text-sm font-medium text-gray-300 transition-colors hover:bg-white/5 hover:text-white"
              >
                Portal Login
              </Link>

              <Link
                to="/register"
                className="btn-primary group !rounded-xl !px-5 !py-2.5 text-sm shadow-glow-green"
              >
                Join NEETVIDYA
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              className="rounded-xl border border-white/10 bg-white/5 p-2.5 text-gray-300 transition-all hover:bg-white/10 hover:text-white md:hidden"
              onClick={() => setMobileOpen((open) => !open)}
              aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* =======================================================
            MOBILE NAVIGATION
        ======================================================= */}
        <AnimatePresence initial={false}>
          {mobileOpen && (
            <motion.div
              key="mobile-nav"
              initial={{
                opacity: 0,
                height: 0,
              }}
              animate={{
                opacity: 1,
                height: "auto",
              }}
              exit={{
                opacity: 0,
                height: 0,
              }}
              transition={{
                duration: 0.25,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="overflow-hidden border-t border-white/10 md:hidden"
            >
              <div className="px-4 pb-5 pt-3 sm:px-6">
                <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-3">

                  <nav className="space-y-1">
                    {navLinks.map((link) => {
                      const active = location.pathname === link.path;

                      return (
                        <Link
                          key={link.path}
                          to={link.path}
                          onClick={() => setMobileOpen(false)}
                          className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm transition-colors ${
                            active
                              ? "bg-brand-green/10 font-semibold text-brand-lime"
                              : "font-medium text-gray-300 hover:bg-white/5 hover:text-white"
                          }`}
                        >
                          <span>{link.label}</span>

                          {active && (
                            <span className="h-1.5 w-1.5 rounded-full bg-brand-lime" />
                          )}
                        </Link>
                      );
                    })}
                  </nav>

                  <div className="mt-3 grid gap-2 border-t border-white/10 pt-3">
                    <Link
                      to="/login"
                      onClick={() => setMobileOpen(false)}
                      className="rounded-xl border border-white/10 px-4 py-3 text-center text-sm font-semibold text-gray-200 transition-colors hover:bg-white/5"
                    >
                      Portal Login
                    </Link>

                    <Link
                      to="/register"
                      onClick={() => setMobileOpen(false)}
                      className="btn-primary w-full !rounded-xl !py-3 text-center"
                    >
                      Join NEETVIDYA
                    </Link>
                  </div>

                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* =========================================================
          PAGE CONTENT
      ========================================================= */}
      <main className="flex-1">
        <motion.div
          key={location.pathname}
          initial={{
            opacity: 0,
            y: 8,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.35,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <Outlet />
        </motion.div>
      </main>

      {/* =========================================================
          FOOTER
      ========================================================= */}
      <footer className="relative overflow-hidden border-t border-white/10 bg-brand-black py-16 text-gray-400">

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-brand-green/10 blur-3xl"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-32 -left-24 h-72 w-72 rounded-full bg-brand-lime/10 blur-3xl"
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="grid gap-10 md:grid-cols-12 lg:gap-16">

            {/* Brand */}
            <div className="md:col-span-5">
              <Link
                to="/"
                className="inline-flex items-center"
              >
                <img
                  src={images.logo}
                  alt="NEETVIDYA"
                  className="h-10 w-auto object-contain sm:h-11"
                />
              </Link>

              <p className="mt-5 max-w-md text-sm leading-7 text-gray-400">
                NEETVIDYA is a student-focused medical coaching institute
                built around concept-based learning, regular practice,
                NCERT mastery, and structured NEET preparation.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <TelegramLink
                  url={settings.telegramChannelLink}
                  label="Telegram Channel"
                  className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-sky-400 transition-colors hover:border-sky-400/30 hover:bg-white/10"
                />

                <WhatsAppLink
                  number={settings.whatsappNumber}
                  message={settings.whatsappDefaultMessage}
                  label="Admissions Helpline"
                  className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-emerald-400 transition-colors hover:border-emerald-400/30 hover:bg-white/10"
                />
              </div>

              {socialLinks.length > 0 && (
                <div className="mt-5 flex items-center gap-2.5">
                  {socialLinks.map(({ label, href, icon: Icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-400 transition-all duration-300 hover:border-brand-lime/40 hover:bg-brand-lime/10 hover:text-brand-lime"
                      aria-label={label}
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Explore */}
            <div className="md:col-span-3">
              <h4 className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-white">
                Explore
              </h4>

              <ul className="mt-5 space-y-3">
                {navLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="group/link inline-flex items-center gap-2 text-sm text-gray-400 transition-colors duration-200 hover:text-brand-lime"
                    >
                      <span className="h-px w-0 bg-brand-lime transition-all duration-300 group-hover/link:w-3" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Institute */}
            <div className="md:col-span-4">
              <h4 className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-white">
                Institute Desk
              </h4>

              <div className="mt-5 rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5">
                <p className="text-sm font-semibold text-white">
                  NEETVIDYA COACHING CENTER
                </p>

                <div className="mt-4 space-y-2.5 text-sm leading-6 text-gray-400">
                  <p>
                    Karimpur Main Road,
                    <br />
                    Karimpur, Nadia
                  </p>

                  <p>
                    <span className="text-gray-300">
                      Helpline:
                    </span>{" "}
                    +91 74396 85658
                    <br />
                    +91 83910 21878
                  </p>

                  <p>
                    <span className="text-gray-300">
                      Email:
                    </span>{" "}
                    neetvidya720@gmail.com
                  </p>
                </div>

                <Link
                  to="/contact"
                  className="group mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-lime"
                >
                  Contact Institute
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

          </div>

          {/* Bottom */}
          <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-7 text-xs text-gray-500 sm:flex-row sm:items-center sm:justify-between">

            <p>
              © {new Date().getFullYear()} NEETVIDYA Education Pvt Ltd.
              All rights reserved.
            </p>

            <p>
              Designed for Medical Aspirants across India.
            </p>

          </div>

        </div>
      </footer>
    </div>
  );
}