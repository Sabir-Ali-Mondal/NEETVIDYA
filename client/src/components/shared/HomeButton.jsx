import { Link } from "react-router-dom";
import { ArrowRight, Home } from "lucide-react";

/**
 * Reusable homepage navigation button for standalone pages.
 *
 * variant:
 * - "pill"  → dark / coloured backgrounds
 * - "light" → white / soft backgrounds
 */
export default function HomeButton({
  to = "/",
  label = "Back to Home",
  variant = "pill",
  className = "",
}) {
  const base =
    "group inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold transition-all duration-300";

  const variants = {
    pill:
      "border border-white/15 bg-white/[0.08] text-white shadow-[0_8px_30px_rgba(0,0,0,0.15)] backdrop-blur-xl hover:-translate-y-0.5 hover:border-brand-lime/40 hover:bg-white/[0.13] hover:text-brand-lime hover:shadow-[0_10px_35px_rgba(34,197,94,0.12)]",

    light:
      "border border-slate-200/80 bg-white/90 text-slate-600 shadow-sm backdrop-blur-md hover:-translate-y-0.5 hover:border-brand-green/30 hover:bg-brand-green/[0.04] hover:text-brand-green hover:shadow-md",
  };

  return (
    <Link
      to={to}
      aria-label={label}
      className={`${base} ${variants[variant] || variants.pill} ${className}`}
    >
      {/* Home icon */}
      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-current/5">
        <Home className="h-3.5 w-3.5 transition-transform duration-300 group-hover:scale-110" />
      </span>

      {/* Label */}
      <span>{label}</span>

      {/* Arrow */}
      <ArrowRight className="h-3.5 w-3.5 opacity-40 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100" />
    </Link>
  );
}