
import { useState, useEffect } from "react";
import api from "../../config/api";
import { Reveal, FadeInCard } from "../../components/shared/MotionReveal";

// Faculty images are uploaded by the admin per teacher (Teacher.photoUrl).
// There is no automatic image taken from src/assets, so a teacher whose image
// is replaced or removed never shows a stale placeholder. When no image has
// been uploaded we render a neutral inline placeholder instead.
const getTeacherImage = (teacher) =>
  teacher?.photoUrl || teacher?.user?.avatar || "";

const FacultyPlaceholder = ({ name }) => (
 <div className="flex aspect-[4/5] w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-emerald-50 via-white to-slate-100">
    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-2xl font-extrabold text-brand-green shadow-sm">
      {name?.charAt(0)?.toUpperCase() || "N"}
    </div>
    <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
      NEETVIDYA
    </span>
 </div>
);

export default function FacultyPage() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/teachers/public")
      .then(({ data }) => setTeachers(data.data?.teachers || []))
      .catch(() => setTeachers([]))
      .finally(() => setLoading(false));
  }, []);
  return (
    <main className="relative min-h-screen overflow-hidden bg-brand-soft">
      {/* Decorative background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 right-0 h-96 w-96 rounded-full bg-brand-green/10 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-20 -left-32 h-80 w-80 rounded-full bg-emerald-200/20 blur-3xl"
      />

      <section className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">

        {/* Hero section */}
        <Reveal className="mx-auto mb-14 max-w-3xl text-center sm:mb-20">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-green/20 bg-white/80 px-4 py-2 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-brand-green" />

            <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-green">
              The People Behind Your Success
            </span>
          </div>

          <h1 className="font-heading text-4xl font-extrabold leading-tight tracking-tight text-brand-dark sm:text-5xl lg:text-6xl">
            Meet the
            <span className="mt-1 block text-brand-green">
              Faculty Team.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
            The current faculty profile includes the mentors actively guiding the institute's NEET preparation programs and academic support.
          </p>

          <div className="mx-auto mt-8 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-brand-green/40" />
            <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
            <span className="h-px w-10 bg-brand-green/40" />
          </div>
        </Reveal>

        {/* Faculty cards */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-10 h-10 border-4 border-brand-green border-t-transparent rounded-full animate-spin" />
          </div>
        ) : teachers.length === 0 ? (
          <div className="text-center py-20 text-slate-500">
            <p className="font-semibold text-lg text-brand-dark mb-1">No faculty profiles available at the moment</p>
            <p className="text-sm">Please check back soon.</p>
          </div>
        ) : (
          <div className="mx-auto grid max-w-5xl grid-cols-1 items-start gap-8 sm:grid-cols-2 sm:gap-10">
            {teachers.map((teacher, i) => (
              <FadeInCard
                delay={(i % 2) * 0.1}
                key={teacher._id}
                className="group relative overflow-hidden rounded-[2rem] border border-white/80 bg-white p-3 shadow-[0_12px_50px_-20px_rgba(15,23,42,0.18)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_24px_60px_-20px_rgba(15,23,42,0.25)]"
              >
                {/* Faculty image — admin-uploaded only, no src/assets fallback */}
                <div className="overflow-hidden rounded-[1.5rem] bg-white">
                  {getTeacherImage(teacher) ? (
                    <img
                      src={getTeacherImage(teacher)}
                      alt={`Faculty profile of ${teacher.user?.name || teacher.name}`}
                      loading="lazy"
                      className="block h-auto w-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  ) : (
                    <FacultyPlaceholder name={teacher.user?.name || teacher.name} />
                  )}
                </div>

                {/* Faculty information */}
                <div className="px-5 pb-5 pt-6 sm:px-6 sm:pb-6">
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-green">
                        {teacher.specialisation || "Faculty"}
                      </p>

                      <h2 className="font-heading text-2xl font-extrabold leading-tight text-brand-dark sm:text-3xl">
                        {teacher.user?.name || teacher.name}
                      </h2>
                    </div>

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand-green transition-all duration-300 group-hover:bg-brand-green group-hover:text-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M7 17 17 7" />
                        <path d="M7 7h10v10" />
                      </svg>
                    </div>
                  </div>

                  <div className="mt-5 h-px w-full bg-slate-100" />

                  <div className="mt-4 flex items-center justify-between gap-3">
                    <p className="text-sm font-medium text-slate-500">
                      {teacher.qualification || "Guiding your next step."}
                    </p>

                    <span className="whitespace-nowrap text-xs font-bold tracking-wide text-brand-green">
                      NEETVIDYA
                    </span>
                  </div>
                </div>
              </FadeInCard>
            ))}
          </div>
        )}

        {/* Bottom message */}
        <Reveal className="mx-auto mt-16 max-w-2xl text-center sm:mt-20">
          <p className="font-heading text-xl font-bold text-brand-dark sm:text-2xl">
            Your goals deserve the right guidance.
          </p>

          <p className="mt-3 text-sm leading-6 text-slate-500 sm:text-base">
            Learn with confidence. Prepare with purpose.
          </p>
        </Reveal>
      </section>
    </main>
  );
}