import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../config/api";
import {
  Users, GraduationCap, ClipboardList, Layers,
  ShieldCheck, ChevronRight
} from "lucide-react";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      await api.get("/admin/dashboard").then(({ data }) => setData(data.data));
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      label: "Total Enrolled",
      value: data?.studentCount ?? 0,
      icon: Users,
      color: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-100",
      path: "/admin/students",
    },
    {
      label: "Active Faculty",
      value: data?.teacherCount ?? 0,
      icon: GraduationCap,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      border: "border-emerald-100",
      path: "/admin/teachers",
    },
    {
      label: "Live Tests",
      value: data?.examCount ?? 0,
      icon: ClipboardList,
      color: "text-purple-600",
      bg: "bg-purple-50",
      border: "border-purple-100",
      path: "/admin/exams",
    },
    {
      label: "Test Submissions",
      value: data?.attemptCount ?? 0,
      icon: Layers,
      color: "text-amber-600",
      bg: "bg-amber-50",
      border: "border-amber-100",
      path: "/admin/exams",
    },
  ];

  const typeColors = {
    REGULAR_OFFLINE: "bg-green-100 text-green-700 border-green-200",
    REGULAR_ONLINE: "bg-blue-100 text-blue-700 border-blue-200",
    HYBRID: "bg-purple-100 text-purple-700 border-purple-200",
    EXAM_ONLY: "bg-orange-100 text-orange-700 border-orange-200",
    GUEST: "bg-slate-100 text-slate-700 border-slate-200",
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-green-600" />
            <span>Institute Administration</span>
          </div>
          <h1 className="font-extrabold text-2xl text-slate-900 tracking-tight">
            Admin Dashboard
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Supervise batch rosters, faculty permissions, admissions, and test analytics.
          </p>
        </div>
      </div>

      {/* KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm animate-pulse">
              <div className="h-11 w-11 bg-slate-100 rounded-xl mb-4" />
              <div className="h-3 bg-slate-100 rounded w-28 mb-3" />
              <div className="h-9 bg-slate-100 rounded w-20" />
            </div>
          ))
        ) : (
          statCards.map((s) => (
            <div
              key={s.label}
              onClick={() => navigate(s.path)}
              className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition cursor-pointer hover:border-slate-200 group"
            >
              <div className={`w-11 h-11 rounded-xl ${s.bg} ${s.border} border flex items-center justify-center mb-4 group-hover:scale-105 transition-transform`}>
                <s.icon className={`w-5 h-5 ${s.color}`} />
              </div>
              <div className="text-3xl font-extrabold text-slate-900 tracking-tight">
                {s.value}
              </div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1 flex items-center justify-between">
                <span>{s.label}</span>
                <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-slate-400 transition" />
              </div>
            </div>
          ))
        )}
      </div>


    </div>
  );
}
