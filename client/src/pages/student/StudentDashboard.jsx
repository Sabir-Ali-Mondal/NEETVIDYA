import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BookOpen, ClipboardList, FileText, TrendingUp, ArrowRight, Clock, GraduationCap } from "lucide-react";
import api from "../../config/api";
import StudentBadge from "../../components/shared/StudentBadge";
import TelegramLink from "../../components/shared/TelegramLink";
import useContactSettings from "../../hooks/useContactSettings";

export default function StudentDashboard() {
  const [student, setStudent] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { settings } = useContactSettings();

  useEffect(() => {
    Promise.all([
      api.get("/students/my"),
      api.get("/dashboard/student"),
    ])
      .then(([studentRes, dashRes]) => {
        setStudent(studentRes.data.data.student);
        setDashboardData(dashRes.data.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const stats = [
    { icon: BookOpen, label: "My Batch", value: student?.batches?.[0]?.name || "Not Assigned", color: "text-blue-600", bg: "bg-blue-50" },
    { icon: ClipboardList, label: "Live Tests", value: `${dashboardData?.upcomingTests?.length || 0} Available`, color: "text-orange-600", bg: "bg-orange-50" },
    { icon: FileText, label: "Study Materials", value: `${dashboardData?.recentMaterials?.length || 0} New`, color: "text-emerald-600", bg: "bg-emerald-50" },
    { icon: TrendingUp, label: "Tests Taken", value: `${dashboardData?.recentResults?.length || 0}`, color: "text-purple-600", bg: "bg-purple-50" },
  ];

  return (
    <div className="space-y-8">
      {/* Batch banner - which batch am I in? */}
      <div className="bg-gradient-to-r from-brand-green to-brand-lime rounded-2xl p-5 text-brand-black shadow-sm flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-white/70 flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-brand-green" />
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider opacity-70">Your Batch / Course</p>
            <p className="font-heading font-extrabold text-lg leading-tight">
              {student?.batches?.[0]?.name || "No batch assigned"}
            </p>
            {student?.batches?.[0]?.code && (
              <p className="text-[11px] font-medium opacity-70">{student.batches[0].code}</p>
            )}
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <StudentBadge batchType={student?.studentType === "REGULAR_ONLINE" ? "ONLINE" : student?.studentType === "HYBRID" ? "HYBRID" : "OFFLINE"} />
        </div>
      </div>

      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-extrabold text-2xl text-brand-dark">
            Hello, {student?.user?.name || "Aspirant"}!
          </h1>
          <p className="text-xs text-gray-500 mt-1">Ready for today's practice?</p>
          <div className="flex flex-wrap items-center gap-3 mt-3">
            <StudentBadge batchType={student?.studentType === "REGULAR_ONLINE" ? "ONLINE" : student?.studentType === "HYBRID" ? "HYBRID" : "OFFLINE"} />
            {student?.batches?.[0] && (
              <span className="text-xs text-gray-500 font-medium">Batch: {student.batches[0].name}</span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <TelegramLink url={settings.telegramChannelLink} label="Doubt Desk" className="text-xs bg-sky-50 text-sky-700 px-3 py-2 rounded-lg border border-sky-200" />
          <Link to="/student/tests" className="btn-primary text-xs !py-2.5 !px-4">
            Start Live Exam <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, i) => (
          <div key={i} className="card p-5 border-gray-200/70">
            <div className="flex items-center gap-3.5">
              <div className={`w-12 h-12 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center shrink-0`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{stat.label}</p>
                <p className="font-heading font-bold text-base text-brand-dark truncate">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Live Tests */}
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="card space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <h3 className="font-heading font-bold text-lg text-brand-dark flex items-center gap-2">
              <ClipboardList className="w-5 h-5 text-brand-green" /> Live Tests
            </h3>
            <Link to="/student/tests" className="text-xs text-brand-green font-semibold hover:underline">View All</Link>
          </div>
          {dashboardData?.upcomingTests?.length > 0 ? (
            <div className="space-y-3">
              {dashboardData.upcomingTests.map((test) => (
                <div key={test._id} className="p-4 rounded-xl bg-brand-soft border border-gray-100 flex items-center justify-between gap-4">
                  <div>
                    <span className="badge bg-emerald-100 text-emerald-800 text-[10px] mb-1">{test.testType}</span>
                    <h4 className="font-semibold text-sm text-brand-dark">{test.title}</h4>
                    <p className="text-xs text-gray-500 mt-0.5">{test.totalQuestions} Questions • {test.duration} Min</p>
                  </div>
                  <Link to={`/exam/${test._id}/instructions`} className="btn-primary text-xs !py-1.5 !px-3 shrink-0">
                    Take Test
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400 text-sm">No live tests available right now.</div>
          )}
        </div>

        {/* Recent Materials */}
        <div className="card space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <h3 className="font-heading font-bold text-lg text-brand-dark flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-brand-green" /> Recent Materials
            </h3>
            <Link to="/student/learn" className="text-xs text-brand-green font-semibold hover:underline">Go to Learn</Link>
          </div>
          {dashboardData?.recentMaterials?.length > 0 ? (
            <div className="space-y-3">
              {dashboardData.recentMaterials.map((mat) => (
                <div key={mat._id} className="p-3.5 rounded-xl bg-brand-soft border border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
                      {mat.fileType || "PDF"}
                    </div>
                    <div>
                      <h5 className="font-semibold text-xs text-brand-dark">{mat.title}</h5>
                      <span className="text-[11px] text-gray-500">{mat.subject?.name || "General"}</span>
                    </div>
                  </div>
                  <a href={mat.fileUrl} target="_blank" rel="noreferrer" className="text-xs text-brand-green font-medium hover:underline">
                    Open
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400 text-sm">No materials uploaded yet.</div>
          )}
        </div>
      </div>
    </div>
  );
}
