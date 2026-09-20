import { useState, useEffect } from "react";
import api from "../../config/api";
import {
  TrendingUp,
  Award,
  Target,
  Zap,
  BarChart3,
} from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function PerformancePage() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    api
      .get("/results/my")
      .then(({ data }) => setResults(data.data.results || []))
      .catch(() => {});
  }, []);

  const chartData =
    results.length > 0
      ? results
          .slice()
          .reverse()
          .map((r, i) => ({
            name: `Test ${i + 1}`,
            score: r.obtainedMarks,
            accuracy: r.accuracy,
          }))
      : [];

  return (
    <div className="relative min-h-full overflow-hidden bg-brand-soft">
      {/* Decorative background */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-green-200/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-emerald-100/50 blur-3xl" />

      <div className="relative space-y-5 p-3 sm:space-y-6 sm:p-5 lg:p-7">
        {/* Header */}
        <div className="relative overflow-hidden rounded-[1.75rem] bg-brand-black p-5 text-white shadow-xl shadow-slate-900/10 sm:p-7 lg:p-8">
          <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-brand-green/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 left-1/3 h-40 w-40 rounded-full bg-brand-lime/10 blur-3xl" />

          <div className="relative flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="min-w-0">
              <span className="inline-flex items-center gap-2 rounded-full border border-brand-lime/20 bg-brand-lime/10 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.16em] text-brand-lime">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-lime" />
                Performance Analytics
              </span>

              <h1 className="mt-4 font-heading text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl">
                Student Performance
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400 sm:text-[15px]">
                Track your scores over time and visualize accuracy
                improvements across testing cycles.
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-2 self-start rounded-2xl border border-white/10 bg-white/5 px-4 py-3 sm:self-auto">
              <BarChart3 className="h-4 w-4 text-brand-lime" />

              <div>
                <div className="text-sm font-extrabold text-white">
                  {results.length}
                </div>
                <div className="text-[9px] font-bold uppercase tracking-wider text-slate-500">
                  Tests Completed
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Cards */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
          {/* Overall Accuracy */}
          <div className="group min-w-0 overflow-hidden rounded-[1.5rem] border border-slate-200/80 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-900/5 sm:p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 transition group-hover:scale-105">
                <TrendingUp className="h-5 w-5" />
              </div>

              <span className="min-w-0 truncate text-[10px] font-extrabold uppercase tracking-[0.12em] text-emerald-600">
                Overall Accuracy
              </span>
            </div>

            <p className="mt-5 font-heading text-3xl font-extrabold tracking-tight text-brand-dark">
              84.2%
            </p>

            <p className="mt-1 text-xs leading-5 text-slate-400">
              Across all completed CBT exams
            </p>
          </div>

          {/* Biology */}
          <div className="group min-w-0 overflow-hidden rounded-[1.5rem] border border-slate-200/80 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-900/5 sm:p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition group-hover:scale-105">
                <Target className="h-5 w-5" />
              </div>

              <span className="min-w-0 truncate text-[10px] font-extrabold uppercase tracking-[0.12em] text-blue-600">
                Accuracy in Biology
              </span>
            </div>

            <p className="mt-5 font-heading text-3xl font-extrabold tracking-tight text-brand-dark">
              91.0%
            </p>

            <p className="mt-1 text-xs leading-5 text-slate-400">
              Strongest subject area
            </p>
          </div>

          {/* Speed */}
          <div className="group min-w-0 overflow-hidden rounded-[1.5rem] border border-slate-200/80 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-900/5 sm:p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-600 transition group-hover:scale-105">
                <Zap className="h-5 w-5" />
              </div>

              <span className="min-w-0 truncate text-[10px] font-extrabold uppercase tracking-[0.12em] text-purple-600">
                Avg Speed / MCQ
              </span>
            </div>

            <p className="mt-5 font-heading text-3xl font-extrabold tracking-tight text-brand-dark">
              48 Sec
            </p>

            <p className="mt-1 text-xs leading-5 text-slate-400">
              Target is below 55 sec for NEET
            </p>
          </div>
        </div>

        {/* Chart */}
        <div className="overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white shadow-sm">
          <div className="flex flex-col gap-3 border-b border-slate-100 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-50 text-brand-green">
                <BarChart3 className="h-5 w-5" />
              </div>

              <div className="min-w-0">
                <h3 className="font-heading text-base font-extrabold text-brand-dark sm:text-lg">
                  Score Progression
                </h3>

                <p className="mt-0.5 text-[11px] text-slate-400">
                  Your score and accuracy across completed tests
                </p>
              </div>
            </div>

            {chartData.length > 0 && (
              <div className="flex items-center gap-4 text-[10px] font-bold text-slate-500">
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-brand-green" />
                  Score
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-brand-lime" />
                  Accuracy
                </div>
              </div>
            )}
          </div>

          <div className="p-4 sm:p-6 lg:p-7">
            {chartData.length === 0 ? (
              <div className="flex min-h-[280px] flex-col items-center justify-center text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50 text-slate-300">
                  <Award className="h-7 w-7" />
                </div>

                <p className="mt-4 text-sm font-bold text-slate-600">
                  No test results yet
                </p>

                <p className="mt-1 max-w-sm text-xs leading-5 text-slate-400">
                  Take tests to see your performance chart and track
                  your progress here.
                </p>
              </div>
            ) : (
              <div className="h-[280px] w-full sm:h-[340px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={chartData}
                    margin={{
                      top: 10,
                      right: 10,
                      left: -15,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#f1f5f9"
                    />

                    <XAxis
                      dataKey="name"
                      stroke="#94a3b8"
                      fontSize={11}
                      tickLine={false}
                      axisLine={false}
                    />

                    <YAxis
                      stroke="#94a3b8"
                      fontSize={11}
                      tickLine={false}
                      axisLine={false}
                    />

                    <Tooltip
                      contentStyle={{
                        borderRadius: "12px",
                        border: "1px solid #e2e8f0",
                        boxShadow:
                          "0 10px 30px rgba(15, 23, 42, 0.08)",
                        fontSize: "12px",
                      }}
                    />

                    <Line
                      type="monotone"
                      dataKey="score"
                      stroke="#18A66A"
                      strokeWidth={3}
                      dot={{
                        r: 4,
                        strokeWidth: 2,
                      }}
                      activeDot={{
                        r: 6,
                      }}
                      name="Obtained Score"
                    />

                    <Line
                      type="monotone"
                      dataKey="accuracy"
                      stroke="#A8C900"
                      strokeWidth={2}
                      dot={{
                        r: 3,
                        strokeWidth: 2,
                      }}
                      activeDot={{
                        r: 5,
                      }}
                      name="Accuracy %"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}