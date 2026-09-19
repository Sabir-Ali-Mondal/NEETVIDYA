import { Link } from "react-router-dom";
import {
  Target,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";

import images from "../../config/images";
import WhatsAppLink from "../../components/shared/WhatsAppLink";
import useContactSettings from "../../hooks/useContactSettings";
import { Reveal, FadeInCard } from "../../components/shared/MotionReveal";
import { DEFAULT_COURSES } from "../../config/courses";
import homeBackgroundVideo from "../../assets/video/green_black_background.mp4";

export default function HomePage() {
  const { settings } = useContactSettings();

  const methodology = [
    {
      step: "01",
      title: "NCERT Deep Dive",
      desc: "Line-by-line concept breakdown in Physics, Chemistry, and Biology.",
    },
    {
      step: "02",
      title: "Daily DPP Drills",
      desc: "Mandatory 30-minute practice papers every evening after classes.",
    },
    {
      step: "03",
      title: "CBT Examination",
      desc: "Simulated exam hall environment with instant negative mark analysis.",
    },
    {
      step: "04",
      title: "Personal Mentor Review",
      desc: "1-on-1 error notebook discussion to guarantee zero repeated mistakes.",
    },
  ];

  return (
    <main className="min-h-screen overflow-hidden bg-brand-soft">

      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="relative overflow-hidden bg-brand-black text-white">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover opacity-25"
          aria-label="Background video"
        >
          <source src={homeBackgroundVideo} type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-brand-black/80" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(34,197,94,0.18),_transparent_38%),radial-gradient(circle_at_bottom_left,_rgba(163,230,53,0.10),_transparent_32%)]" />

        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-brand-green/20 blur-3xl animate-float-slow" />

        <div className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-brand-lime/10 blur-3xl animate-float-slow" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">

            {/* Hero Content */}
            <motion.div
              className="lg:col-span-7"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-green/30 bg-brand-green/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-brand-lime backdrop-blur-sm">
                <Target className="h-3.5 w-3.5" />
                NEET-focused academic coaching
              </div>

              <h1 className="font-heading text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
                Learn Better.
                <span className="mt-1 block text-brand-lime">
                  Prepare Smarter.
                </span>
                <span className="mt-1 block">
                  Achieve More.
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-base leading-7 text-gray-300 sm:text-lg">
                NEETVIDYA supports students with concept-based teaching,
                regular practice, and structured preparation for NEET-focused
                study goals.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  to="/register"
                  className="btn-lime group !px-7 !py-3 text-base shadow-lg shadow-brand-lime/20"
                >
                  Enroll
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </Link>

                <Link
                  to="/courses"
                  className="btn-secondary group !border-white/20 !px-6 !py-3 !text-white hover:!border-white/40 hover:!bg-white/10"
                >
                  View Programs
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-white/10 pt-6 text-xs text-gray-400">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-brand-lime" />
                  Regular Offline & Hybrid
                </div>

                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-brand-lime" />
                  Daily Practice Papers
                </div>

                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-brand-lime" />
                  Strict Negative Marking
                </div>
              </div>
            </motion.div>

            {/* Hero Image */}
            <motion.div
              className="lg:col-span-5"
              initial={{ opacity: 0, y: 28, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="overflow-hidden rounded-[2rem] border border-white/15 bg-white/5 p-2 shadow-[0_24px_70px_-25px_rgba(0,0,0,0.7)] backdrop-blur-sm">

                <div className="overflow-hidden rounded-[1.5rem] bg-white">
                  <img
                    src={images.aboutInstitute}
                    alt="NEETVIDYA Classroom"
                    className="block h-auto w-full object-contain"
                  />
                </div>

                <div className="mt-2 rounded-[1.5rem] border border-white/10 bg-brand-black/80 p-4 backdrop-blur-md sm:p-5">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-lime">
                        Admissions Open
                      </p>

                      <p className="mt-1 text-sm font-bold text-white sm:text-base">
                        Dropper & Class 11, 12 Batches
                      </p>
                    </div>

                    <WhatsAppLink
                      number={settings.whatsappNumber}
                      message={settings.whatsappDefaultMessage}
                      label="Enquire Now"
                      className="w-full rounded-lg bg-emerald-600 px-4 py-2.5 text-center text-xs font-semibold text-white transition-colors hover:bg-emerald-700 sm:w-auto"
                    />
                  </div>
                </div>

              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* =========================================================
          COURSES
      ========================================================= */}
      <section className="relative overflow-hidden bg-brand-soft py-16 sm:py-20 lg:py-24">
        <div className="pointer-events-none absolute -right-32 top-20 h-80 w-80 rounded-full bg-brand-green/10 blur-3xl" />

        <div className="pointer-events-none absolute -left-32 bottom-0 h-72 w-72 rounded-full bg-emerald-200/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <Reveal className="mx-auto mb-14 max-w-3xl text-center sm:mb-16">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand-green/20 bg-white/80 px-4 py-2 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-brand-green" />

              <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-green">
                Our Courses
              </span>
            </div>

            <h2 className="font-heading text-3xl font-extrabold leading-tight tracking-tight text-brand-dark sm:text-4xl lg:text-5xl">
              Two focused programmes.
              <span className="block text-brand-green">
                One clear goal.
              </span>
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
              Choose the programme that matches where you are in your NEET
              preparation journey.
            </p>

            <div className="mx-auto mt-7 flex items-center justify-center gap-3">
              <span className="h-px w-10 bg-brand-green/40" />
              <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
              <span className="h-px w-10 bg-brand-green/40" />
            </div>
          </Reveal>

          <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
            {DEFAULT_COURSES.map((course, i) => (
              <FadeInCard
                key={course.value}
                delay={i * 0.1}
                className="group flex flex-col overflow-hidden rounded-[2rem] border border-white/80 bg-white p-3 shadow-[0_12px_50px_-20px_rgba(15,23,42,0.18)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_24px_60px_-20px_rgba(15,23,42,0.25)]"
              >
                <div className="relative overflow-hidden rounded-[1.5rem] bg-brand-soft">
                  <img
                    src={course.image}
                    alt={course.name}
                    loading="lazy"
                    className="h-52 w-full object-cover transition-transform duration-700 group-hover:scale-[1.03] sm:h-56"
                  />

                  <div className="absolute left-4 top-4">
                    <span className="inline-flex rounded-full border border-white/80 bg-white/90 px-3 py-1.5 text-xs font-bold text-brand-dark shadow-sm backdrop-blur">
                      {course.targetClass}
                    </span>
                  </div>
                </div>

                <div className="flex flex-1 flex-col px-4 pb-4 pt-6 sm:px-5 sm:pb-5">
                  <h3 className="font-heading text-2xl font-extrabold text-brand-dark transition-colors duration-300 group-hover:text-brand-green">
                    {course.name}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {course.description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {course.features.map((feature) => (
                      <span
                        key={feature}
                        className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-brand-soft px-3 py-1.5 text-xs font-semibold text-slate-700"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5 text-brand-green" />
                        {feature}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto pt-7">
                    <div className="flex items-end justify-between gap-4 border-t border-slate-100 pt-5">
                      <div>
                        <span className="block text-xs font-medium text-slate-500">
                          Fees
                        </span>

                        <span className="font-heading text-2xl font-extrabold text-brand-dark">
                          ₹{course.feeAmount.toLocaleString("en-IN")}
                        </span>
                      </div>

                      <Link
                        to="/register"
                        className="btn-primary group/btn !px-5 !py-2.5 text-sm"
                      >
                        Enroll Now
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-0.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </FadeInCard>
            ))}
          </div>

          <Reveal className="mx-auto mt-12 max-w-2xl text-center sm:mt-14">
            <Link
              to="/courses"
              className="btn-primary group inline-flex items-center justify-center gap-2 !px-8 !py-3.5 text-base shadow-elevated hover:shadow-glow-green"
            >
              View Batches &amp; Timings
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            <p className="mt-3 text-sm text-slate-500">
              See the live batches and schedules running for each programme.
            </p>
          </Reveal>
        </div>
      </section>

      {/* =========================================================
          METHODOLOGY
      ========================================================= */}
      <section className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-24">
        <div className="pointer-events-none absolute -top-32 right-0 h-80 w-80 rounded-full bg-brand-green/10 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-32 left-0 h-72 w-72 rounded-full bg-emerald-100/30 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <Reveal className="mx-auto mb-14 max-w-3xl text-center sm:mb-16">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand-green/20 bg-brand-soft px-4 py-2">
              <Sparkles className="h-3.5 w-3.5 text-brand-green" />

              <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-green">
                Our Approach
              </span>
            </div>

            <h2 className="font-heading text-3xl font-extrabold leading-tight tracking-tight text-brand-dark sm:text-4xl lg:text-5xl">
              The NEETVIDYA
              <span className="block text-brand-green">
                Preparation Framework.
              </span>
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
              Concept learning, regular practice, and guided improvement
              working together throughout your preparation.
            </p>

            <div className="mx-auto mt-7 flex items-center justify-center gap-3">
              <span className="h-px w-10 bg-brand-green/40" />
              <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
              <span className="h-px w-10 bg-brand-green/40" />
            </div>
          </Reveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {methodology.map((item, i) => (
              <FadeInCard
                key={item.step}
                delay={i * 0.08}
                className="group relative overflow-hidden rounded-[1.75rem] border border-slate-100 bg-brand-soft p-6 transition-all duration-500 hover:-translate-y-2 hover:border-brand-green/20 hover:bg-white hover:shadow-[0_20px_50px_-20px_rgba(15,23,42,0.18)]"
              >
                <span className="pointer-events-none absolute -right-3 -top-5 select-none font-heading text-7xl font-extrabold text-brand-green/10 transition-colors duration-500 group-hover:text-brand-green/20">
                  {item.step}
                </span>

                <div className="relative">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-sm font-extrabold text-brand-green shadow-sm">
                    {item.step}
                  </div>

                  <h3 className="mt-6 font-heading text-xl font-extrabold leading-tight text-brand-dark">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {item.desc}
                  </p>

                  <div className="mt-6 h-px w-full bg-slate-200/80 transition-colors duration-300 group-hover:bg-brand-green/20" />

                  <div className="mt-4 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-green">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    NEETVIDYA
                  </div>
                </div>
              </FadeInCard>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================
          TEST SERIES
      ========================================================= */}
      <section className="relative overflow-hidden bg-brand-black py-16 text-white sm:py-20 lg:py-24">
        <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-brand-green/15 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-brand-lime/10 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <Reveal>
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-brand-dark via-brand-dark to-gray-950 p-3 shadow-[0_25px_70px_-30px_rgba(0,0,0,0.8)]">

              <div className="grid items-center gap-8 rounded-[1.5rem] border border-white/5 bg-white/[0.02] p-6 sm:p-8 lg:grid-cols-12 lg:gap-12 lg:p-10">

                <div className="lg:col-span-7">
                  <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand-lime/20 bg-brand-lime/10 px-4 py-2">
                    <span className="h-2 w-2 rounded-full bg-brand-lime" />

                    <span className="text-xs font-bold uppercase tracking-[0.18em] text-brand-lime">
                      Comprehensive Test Series
                    </span>
                  </div>

                  <h2 className="font-heading text-3xl font-extrabold leading-tight sm:text-4xl">
                    NEETVIDYA
                    <span className="block text-brand-lime">
                      Computerized Test Engine.
                    </span>
                  </h2>

                  <p className="mt-5 max-w-2xl text-sm leading-7 text-gray-300 sm:text-base">
                    Experience full-screen exam simulation, question
                    palettes, review tags, and comprehensive solution
                    scorecards designed around serious NEET preparation.
                  </p>

                  <div className="mt-7 flex flex-wrap gap-3">
                    <Link
                      to="/contact#contact-form"
                      className="btn-lime group !px-6 !py-3 text-sm"
                    >
                      Explore Test Series
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </Link>

                    <Link
                      to="/contact#contact-form"
                      className="btn-secondary !border-white/20 !px-6 !py-3 !text-white hover:!border-white/40 hover:!bg-white/10"
                    >
                      Request Sample Papers
                    </Link>
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <div className="group overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/5 p-2">
                    <img
                      src={images.testSeriesBanner}
                      alt="NEETVIDYA Test Series Preview"
                      loading="lazy"
                      className="h-auto max-h-72 w-full rounded-[1.25rem] object-contain transition-transform duration-700 group-hover:scale-[1.02]"
                    />
                  </div>
                </div>

              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* =========================================================
          FINAL CTA
      ========================================================= */}
      <section className="relative overflow-hidden bg-brand-soft py-20 sm:py-24">
        <div className="pointer-events-none absolute -top-24 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-brand-green/10 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-32 -right-32 h-72 w-72 rounded-full bg-emerald-100/30 blur-3xl" />

        <Reveal className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">

          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-green/20 bg-white/80 px-4 py-2 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-brand-green" />

            <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-green">
              Start Your Journey
            </span>
          </div>

          <h2 className="font-heading text-3xl font-extrabold leading-tight tracking-tight text-brand-dark sm:text-4xl lg:text-5xl">
            Ready to begin your
            <span className="block text-brand-green">
              NEET preparation?
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
            Book a counselling session or register for the next available
            admission cycle and get the batch details you need.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/register"
              className="btn-primary !px-8 !py-3.5 text-base shadow-elevated hover:shadow-glow-green"
            >
              Register for Admission
            </Link>

            <Link
              to="/contact#contact-form"
              className="btn-secondary !px-7 !py-3.5 text-base"
            >
              Contact Admissions
            </Link>
          </div>

          <div className="mx-auto mt-8 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-brand-green/30" />
            <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
            <span className="h-px w-10 bg-brand-green/30" />
          </div>

          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
            Learn with confidence. Prepare with purpose.
          </p>

        </Reveal>
      </section>

    </main>
  );
}