import { useState, useEffect } from "react";
import api from "../../config/api";
import { TrendingUp, Award, Target, Zap } from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export default function PerformancePage() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    api.get("/results/my").then(({ data }) => setResults(data.data.results || [])).catch(() => {});
  }, []);

  const chartData = results.length > 0
    ? results.slice().reverse().map((r, i) => ({
        name: `Test ${i + 1}`,
        score: r.obtainedMarks,
        accuracy: r.accuracy,
      }))
    : [];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading font-extrabold text-2xl text-brand-dark">Student Performance & Accuracy Trend</h1>
        <p className="text-xs text-gray-500 mt-1">Track your scores over time and visualize accuracy improvements across testing cycles.</p>
      </div>

      <div className="grid sm:grid-cols-3 gap-6">
        <div className="card p-6 border-gray-200">
          <div className="flex items-center gap-3 mb-2 text-emerald-600">
            <TrendingUp className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider">Overall Accuracy</span>
          </div>
          <p className="font-heading font-extrabold text-3xl text-brand-dark">84.2%</p>
          <p className="text-xs text-gray-400 mt-1">Across all completed CBT exams</p>
        </div>

        <div className="card p-6 border-gray-200">
          <div className="flex items-center gap-3 mb-2 text-blue-600">
            <Target className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider">Accuracy in Biology</span>
          </div>
          <p className="font-heading font-extrabold text-3xl text-brand-dark">91.0%</p>
          <p className="text-xs text-gray-400 mt-1">Strongest subject area</p>
        </div>

        <div className="card p-6 border-gray-200">
          <div className="flex items-center gap-3 mb-2 text-purple-600">
            <Zap className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider">Avg Speed / MCQ</span>
          </div>
          <p className="font-heading font-extrabold text-3xl text-brand-dark">48 Sec</p>
          <p className="text-xs text-gray-400 mt-1">Target is below 55 sec for NEET</p>
        </div>
      </div>

      <div className="card p-6 sm:p-8 space-y-4">
        <h3 className="font-heading font-bold text-lg text-brand-dark">Score Progression Chart</h3>
        {chartData.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <p className="font-semibold text-gray-500">No test results yet</p>
            <p className="text-xs mt-1">Take tests to see your performance chart here.</p>
          </div>
        ) : (
          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} />
                <Tooltip />
                <Line type="monotone" dataKey="score" stroke="#18A66A" strokeWidth={3} dot={{ r: 5 }} name="Obtained Score" />
                <Line type="monotone" dataKey="accuracy" stroke="#A8C900" strokeWidth={2} dot={{ r: 4 }} name="Accuracy %" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}
