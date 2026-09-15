
import { useState, useEffect } from "react";
import api from "../../config/api";
import { Trophy, Star, Award, Target, BookOpen, GraduationCap } from "lucide-react";

export default function ResultsPage() {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/achievements")
      .then(({ data }) => {
        setAchievements(data.data.achievements || []);
      })
      .catch(() => {
        setAchievements([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-brand-soft">
      {/* Decorative background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 right-0 h-96 w-96 rounded-full bg-brand-green/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">

        {/* Hero section */}
        <section className="mx-auto mb-16 max-w-3xl text-center sm:mb-20">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-green/20 bg-white/80 px-4 py-2 shadow-sm">
            <Trophy className="h-4 w-4 text-brand-green" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-green">
              Student Progress
            </span>
          </div>

          <h1 className="font-heading text-4xl font-extrabold leading-tight tracking-tight text-brand-dark sm:text-5xl lg:text-6xl">
            Progress.
            <span className="mt-1 block text-brand-green">
              Practice. Results.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg">
            NEETVIDYA supports disciplined preparation through structured guidance,
            regular assessment, and continued student improvement over time.
          </p>

          <div className="mx-auto mt-8 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-brand-green/40" />
            <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
            <span className="h-px w-10 bg-brand-green/40" />
          </div>
        </section>

        {/* Achievement section */}
        <section className="mx-auto max-w-6xl">
          <div className="mb-8 flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-green">
                Our Achievements
              </span>

              <h2 className="mt-2 font-heading text-2xl font-extrabold text-brand-dark sm:text-3xl">
                Highlights & Achievements
              </h2>
            </div>

            <div className="inline-flex items-center gap-2 rounded-full border border-brand-green/20 bg-white px-4 py-2 text-xs font-semibold text-brand-green">
              <Star className="h-4 w-4" />
              Every success story matters
            </div>
          </div>

          {loading ? (
            <div className="rounded-3xl border border-gray-200 bg-white p-12 text-center">
              <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-brand-green/20 border-t-brand-green" />
              <p className="mt-4 text-sm text-gray-500">
                Loading achievements...
              </p>
            </div>
          ) : achievements.length > 0 ? (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {achievements.map((item) => (
                <article
                  key={item._id}
                  className="group rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="mb-5 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
                      <Trophy className="h-6 w-6" />
                    </div>

                    <div>
                      <span className="text-xs font-bold text-brand-green">
                        {item.category}
                      </span>
                      <p className="text-xs text-gray-500">
                        Year {item.year}
                      </p>
                    </div>
                  </div>

                  <h3 className="font-heading text-2xl font-extrabold text-brand-dark">
                    {item.title}
                  </h3>

                  {item.score && (
                    <p className="mt-2 text-sm font-semibold text-brand-green">
                      Score / Rank: {item.score}
                    </p>
                  )}

                  <p className="mt-3 text-sm leading-6 text-gray-600">
                    {item.description}
                  </p>

                  {item.studentName && (
                    <div className="mt-5 flex items-center justify-between gap-3 border-t border-gray-100 pt-4 text-xs text-gray-500">
                      <span>
                        Student:{" "}
                        <strong className="text-gray-800">
                          {item.studentName}
                        </strong>
                      </span>
                      <span>{item.studentBatch}</span>
                    </div>
                  )}
                </article>
              ))}
            </div>
          ) : (
            /* Honest empty state */
            <div className="relative overflow-hidden rounded-[2rem] border border-gray-200 bg-white px-6 py-12 text-center shadow-sm sm:px-12 sm:py-16">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-brand-green/5 blur-2xl"
              />

              <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-brand-soft text-brand-green">
                <Award className="h-10 w-10" />
              </div>

              <span className="relative mt-6 inline-block text-xs font-bold uppercase tracking-[0.2em] text-brand-green">
                A New Beginning
              </span>

              <h3 className="relative mt-3 font-heading text-2xl font-extrabold text-brand-dark sm:text-3xl">
                Achievement updates will appear here
              </h3>

              <p className="relative mx-auto mt-4 max-w-xl text-sm leading-7 text-gray-600 sm:text-base">
                As NEETVIDYA adds verified student results and milestone updates, they will be published here in a clear and factual format.
              </p>

              <div className="relative mx-auto mt-8 flex max-w-md flex-wrap justify-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full bg-brand-soft px-4 py-2 text-xs font-semibold text-brand-dark">
                  <BookOpen className="h-4 w-4 text-brand-green" />
                  Learn
                </span>

                <span className="inline-flex items-center gap-2 rounded-full bg-brand-soft px-4 py-2 text-xs font-semibold text-brand-dark">
                  <Target className="h-4 w-4 text-brand-green" />
                  Prepare
                </span>

                <span className="inline-flex items-center gap-2 rounded-full bg-brand-soft px-4 py-2 text-xs font-semibold text-brand-dark">
                  <GraduationCap className="h-4 w-4 text-brand-green" />
                  Achieve
                </span>
              </div>
            </div>
          )}
        </section>

        {/* Closing message */}
        <section className="mx-auto mt-16 max-w-3xl text-center sm:mt-20">
          <h2 className="font-heading text-2xl font-extrabold text-brand-dark sm:text-3xl">
            The next success story could be yours.
          </h2>

          <p className="mt-3 text-sm leading-6 text-gray-600 sm:text-base">
            Start your preparation with dedication, consistency,
            and the right guidance.
          </p>
        </section>

      </div>
    </main>
  );
}