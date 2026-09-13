import { useState, useEffect } from "react";
import api from "../../config/api";
import { BarChart3, Users, TrendingUp, Award, Search } from "lucide-react";

export default function TeacherPerformance() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await api.get("/dashboard/teacher");
        setStats(data.data);
      } catch {
        setStats(null);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-10 h-10 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="font-extrabold text-2xl text-slate-900">Student Performance</h1>
        <p className="text-slate-500 text-sm mt-1">Track exam results and performance trends for your students</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Students", value: stats?.totalStudents || 0, icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Exams Conducted", value: stats?.totalExams || 0, icon: BarChart3, color: "text-purple-600", bg: "bg-purple-50" },
          { label: "Avg. Score", value: `${stats?.avgScore || 0}%`, icon: TrendingUp, color: "text-green-600", bg: "bg-green-50" },
          { label: "Top Performer", value: stats?.topPerformer || "—", icon: Award, color: "text-amber-600", bg: "bg-amber-50" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
            <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center mb-3`}>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <div className="text-2xl font-extrabold text-slate-900">{stat.value}</div>
            <div className="text-xs text-slate-500 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
        <h2 className="font-bold text-lg text-slate-800 mb-4">Recent Exam Results</h2>
        {stats?.recentResults?.length > 0 ? (
          <div className="space-y-3">
            {stats.recentResults.map((r) => (
              <div key={r._id} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div>
                  <p className="font-semibold text-sm text-slate-800">{r.examTitle}</p>
                  <p className="text-xs text-slate-500">
                    {new Date(r.createdAt).toLocaleDateString("en-IN")}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-slate-800">{r.score}/{r.totalMarks}</p>
                  <p className="text-xs text-slate-500">{Math.round((r.score / r.totalMarks) * 100)}%</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-slate-400">
            <BarChart3 className="w-10 h-10 mx-auto mb-3 text-slate-200" />
            <p className="text-sm">No results available yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
