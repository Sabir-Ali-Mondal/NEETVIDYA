import images from "../../config/images";
import {
  CheckCircle2,
  ShieldCheck,
  Target,
  Award,
  Users,
  GraduationCap,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function AboutPage() {
  const stats = [
    { value: "NEET", label: "Core academic focus" },
    { value: "Batch", label: "Structured learning model" },
    { value: "Mentor", label: "Guided academic review" },
  ];

  const pillars = [
    {
      icon: ShieldCheck,
      title: "Concept-first learning",
      text: "Students build a strong foundation through simplified explanations, NCERT alignment, and consistent revision cycles.",
    },
    {
      icon: Target,
      title: "Performance tracking",
      text: "Mistakes are reviewed systematically so every practice session turns into measurable improvement.",
    },
    {
      icon: Award,
      title: "Exam readiness",
      text: "Timed practice and mock exam discipline help learners develop calm, high-confidence performance under pressure.",
    },
  ];

  const approach = [
    {
      icon: GraduationCap,
      title: "Outcome-first learning",
      text: "Each stage of preparation is designed to move students closer to NEET clarity, confidence, and consistency.",
    },
    {
      icon: Sparkles,
      title: "Academic discipline",
      text: "Daily revision, targeted practice, and performance review keep students disciplined throughout their preparation.",
    },
    {
      icon: CheckCircle2,
      title: "Student confidence",
      text: "Our structure helps students build confidence through repetition, feedback, and a clear progression path.",
    },
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-brand-soft">
      {/* Decorative background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 right-0 h-96 w-96 rounded-full bg-brand-green/10 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[40%] -left-40 h-96 w-96 rounded-full bg-emerald-200/20 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-20 right-[-8rem] h-80 w-80 rounded-full bg-lime-200/20 blur-3xl"
      />

      {/* Hero */}
      <section className="relative mx-auto max-w-7xl px-4 pb-16 pt-16 sm:px-6 sm:pb-20 sm:pt-20 lg:px-8 lg:pb-24 lg:pt-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
          {/* Content */}
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-green/20 bg-white/80 px-4 py-2 shadow-sm backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-brand-green" />

              <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-green">
                About NEETVIDYA
              </span>
            </div>

            <h1 className="font-heading text-4xl font-extrabold leading-tight tracking-tight text-brand-dark sm:text-5xl lg:text-6xl">
              A structured path to
              <span className="mt-1 block text-brand-green">
                NEET preparation.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
              NEETVIDYA is built around a disciplined academic system focused
              on concept clarity, regular practice, evaluation, and guided
              mentorship for students preparing for competitive medical
              entrance goals.
            </p>

            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-500 sm:text-base">
              Our faculty-focused and batch-based model helps students stay
              consistent, identify areas for improvement, and progress from
              preparation to performance with greater confidence.
            </p>

            {/* Stats */}
            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-white/80 bg-white p-4 shadow-[0_10px_35px_-20px_rgba(15,23,42,0.2)]"
                >
                  <h4 className="font-heading text-2xl font-extrabold text-brand-green">
                    {stat.value}
                  </h4>

                  <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="group overflow-hidden rounded-[2rem] border border-white/80 bg-white p-3 shadow-[0_20px_60px_-25px_rgba(15,23,42,0.25)]">
              <div className="overflow-hidden rounded-[1.5rem] bg-brand-soft">
                <img
                  src={images.aboutInstitute}
                  alt="NEETVIDYA Institute"
                  className="block w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>
            </div>

            {/* Floating support card */}
            <div className="absolute -bottom-6 left-5 right-5 rounded-[1.5rem] border border-brand-green/10 bg-white/95 p-4 shadow-[0_15px_45px_-20px_rgba(15,23,42,0.25)] backdrop-blur-sm sm:left-8 sm:right-8">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
                    Student support
                  </p>

                  <p className="mt-1 font-heading text-lg font-bold text-brand-dark sm:text-xl">
                    Focused mentoring
                  </p>
                </div>

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-green text-white">
                  <Users className="h-5 w-5" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hero divider */}
        <div className="mx-auto mt-20 flex items-center justify-center gap-3 sm:mt-24">
          <span className="h-px w-10 bg-brand-green/30" />
          <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
          <span className="h-px w-10 bg-brand-green/30" />
        </div>
      </section>

      {/* Pillars */}
      <section className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="mx-auto mb-12 max-w-2xl text-center sm:mb-14">
          <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-green">
            The NEETVIDYA approach
          </p>

          <h2 className="font-heading text-3xl font-extrabold leading-tight text-brand-dark sm:text-4xl">
            How we help students improve
          </h2>

          <p className="mt-3 text-sm leading-6 text-slate-500 sm:text-base">
            Every academic feature is built around clarity, consistency, and
            measurable growth.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {pillars.map(({ icon: Icon, title, text }) => (
            <article
              key={title}
              className="group rounded-[2rem] border border-white/80 bg-white p-6 shadow-[0_12px_50px_-20px_rgba(15,23,42,0.18)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_24px_60px_-20px_rgba(15,23,42,0.24)] sm:p-7"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-soft text-brand-green transition-colors duration-300 group-hover:bg-brand-green group-hover:text-white">
                <Icon className="h-6 w-6" />
              </div>

              <h3 className="font-heading text-xl font-extrabold text-brand-dark">
                {title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                {text}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Academic philosophy */}
      <section className="relative overflow-hidden bg-brand-black py-16 text-white sm:py-20 lg:py-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 right-[-5rem] h-80 w-80 rounded-full bg-brand-green/10 blur-3xl"
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-lime">
              Our academic philosophy
            </p>

            <h2 className="font-heading text-3xl font-extrabold leading-tight sm:text-4xl">
              Preparation built around
              <span className="block text-brand-lime">
                consistency and progress.
              </span>
            </h2>

            <p className="mt-4 text-sm leading-6 text-slate-300 sm:text-base">
              A clear academic structure gives students a practical way to
              learn, practise, review, and improve.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {approach.map(({ icon: Icon, title, text }, index) => (
              <article
                key={title}
                className="group rounded-[2rem] border border-white/10 bg-white/[0.05] p-6 transition-all duration-500 hover:-translate-y-1 hover:bg-white/[0.08] sm:p-7"
              >
                <div
                  className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl ${
                    index === 0
                      ? "bg-brand-lime text-brand-black"
                      : index === 1
                        ? "bg-emerald-500/15 text-emerald-300"
                        : "bg-brand-green text-white"
                  }`}
                >
                  <Icon className="h-6 w-6" />
                </div>

                <h3 className="font-heading text-xl font-extrabold">
                  {title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-300">
                  {text}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/contact#contact-form"
              className="inline-flex items-center justify-center rounded-xl bg-brand-green px-7 py-3 text-sm font-bold text-white shadow-lg shadow-brand-green/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand-green/25 sm:text-base"
            >
              Book a counselling call
            </Link>
          </div>
        </div>
      </section>

      {/* Bottom message */}
      <section className="relative px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-heading text-xl font-bold text-brand-dark sm:text-2xl">
            Your preparation deserves a clear direction.
          </p>

          <p className="mt-3 text-sm leading-6 text-slate-500 sm:text-base">
            Learn with clarity. Practise with discipline. Prepare with purpose.
          </p>
        </div>
      </section>
    </main>
  );
}