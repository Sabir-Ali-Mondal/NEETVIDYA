import { useState, useEffect } from "react";
import api from "../../config/api";
import {
  BarChart3, Users, TrendingUp, Award, Search, Trophy,
  Eye, X, CheckCircle2, ChevronRight, Filter, BookOpen
} from "lucide-react";

export default function TeacherPerformance() {
  const [stats, setStats] = useState(null);
  const [exams, setExams] = useState([]);
  const [batches, setBatches] = useState([]);
  const [selectedExamId, setSelectedExamId] = useState("");
  const [selectedBatchId, setSelectedBatchId] = useState("");
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [loadingResults, setLoadingResults] = useState(false);
  const [selectedResult, setSelectedResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        const [dashRes, examsRes, batchesRes] = await Promise.all([
          api.get("/dashboard/teacher").catch(() => ({ data: { data: null } })),
          api.get("/exams").catch(() => ({ data: { data: { exams: [] } } })),
          api.get("/batches").catch(() => ({ data: { data: { batches: [] } } })),
        ]);
        setStats(dashRes.data?.data);
        const fetchedExams = examsRes.data?.data?.exams || [];
        setExams(fetchedExams);
        setBatches(batchesRes.data?.data?.batches || []);

        if (fetchedExams.length > 0) {
          setSelectedExamId(fetchedExams[0]._id);
        }
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  useEffect(() => {
    if (!selectedExamId) return;
    const fetchExamResults = async () => {
      setLoadingResults(true);
      try {
        const { data } = await api.get(`/exams/${selectedExamId}/results`);
        setResults(data.data?.results || []);
      } catch {
        setResults([]);
      } finally {
        setLoadingResults(false);
      }
    };
    fetchExamResults();
  }, [selectedExamId]);

  const filteredResults = results.filter((r) => {
    const nameMatch = r.student?.name?.toLowerCase().includes(search.toLowerCase()) ||
      r.student?.email?.toLowerCase().includes(search.toLowerCase());
    return nameMatch;
  });

  const selectedExam = exams.find((e) => e._id === selectedExamId);

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

      {/* KPI Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Students", value: stats?.studentCount || stats?.totalStudents || 0, icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Exams Conducted", value: exams.length, icon: BarChart3, color: "text-purple-600", bg: "bg-purple-50" },
          { label: "Questions Authored", value: stats?.questionCount || 0, icon: TrendingUp, color: "text-green-600", bg: "bg-green-50" },
          { label: "Submissions Tracked", value: results.length, icon: Award, color: "text-amber-600", bg: "bg-amber-50" },
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

      {/* Filter and Exam Selection */}
      <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h2 className="font-bold text-lg text-slate-900">Exam Performance Roster</h2>
            <p className="text-xs text-slate-500">Filter submissions by test and candidate</p>
          </div>
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            <select
              value={selectedExamId}
              onChange={(e) => setSelectedExamId(e.target.value)}
              className="px-3 py-2 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
            >
              {exams.map((ex) => (
                <option key={ex._id} value={ex._id}>{ex.title} ({ex.testType})</option>
              ))}
            </select>
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search candidate by name or email..."
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 bg-white"
          />
        </div>

        {/* Results Table */}
        {loadingResults ? (
          <div className="py-12 flex justify-center">
            <div className="w-8 h-8 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filteredResults.length === 0 ? (
          <div className="text-center py-12 text-slate-400">
            <BarChart3 className="w-10 h-10 mx-auto mb-2 text-slate-200" />
            <p className="text-sm font-semibold text-slate-600">No submissions found for this test</p>
            <p className="text-xs text-slate-400 mt-0.5">When students complete this exam, their rank and score will appear here.</p>
          </div>
        ) : (
          <div className="border border-slate-100 rounded-xl overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Rank</th>
                  <th className="py-3 px-4">Student</th>
                  <th className="py-3 px-4 text-center">Score</th>
                  <th className="py-3 px-4 text-center">Accuracy</th>
                  <th className="py-3 px-4 text-center">Time</th>
                  <th className="py-3 px-4 text-right">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredResults.map((r, i) => (
                  <tr key={r._id || i} className="hover:bg-slate-50 transition">
                    <td className="py-3 px-4">
                      <span className="font-extrabold text-xs px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700">
                        #{r.rank || i + 1}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-semibold text-slate-800">{r.student?.name || "Student"}</div>
                      <div className="text-xs text-slate-400">{r.student?.email}</div>
                    </td>
                    <td className="py-3 px-4 text-center font-bold text-slate-800">
                      {r.obtainedMarks} / {r.totalMarks || selectedExam?.totalMarks || 720}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-green-50 text-green-700 border border-green-200">
                        {Math.round(r.accuracy || 0)}%
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center text-xs text-slate-500">
                      {r.timeTaken ? `${Math.round(r.timeTaken / 60)} min` : "—"}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => setSelectedResult(r)}
                        className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-green-50 text-slate-600 hover:text-green-700 transition"
                      >
                        <Eye className="w-3.5 h-3.5" /> View Breakdown
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Student Performance Drilldown Modal */}
      {selectedResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white rounded-t-2xl z-10">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-green-50 text-green-700">
                  Performance Breakdown
                </span>
                <h2 className="font-extrabold text-xl text-slate-900 mt-1">{selectedResult.student?.name}</h2>
                <p className="text-xs text-slate-500">{selectedResult.student?.email}</p>
              </div>
              <button
                onClick={() => setSelectedResult(null)}
                className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-sm">
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="text-xs text-slate-400 font-medium">Rank</div>
                  <div className="text-xl font-extrabold text-slate-800">#{selectedResult.rank || 1}</div>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="text-xs text-slate-400 font-medium">Score</div>
                  <div className="text-xl font-extrabold text-slate-800">{selectedResult.obtainedMarks}</div>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="text-xs text-slate-400 font-medium">Accuracy</div>
                  <div className="text-xl font-extrabold text-green-600">{Math.round(selectedResult.accuracy || 0)}%</div>
                </div>
              </div>

              <div className="space-y-2 border-t border-slate-100 pt-3">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Question Statistics</div>
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2.5 rounded-xl bg-green-50 border border-green-200 text-green-700">
                    <span className="block font-extrabold text-base">{selectedResult.correctCount ?? 0}</span>
                    <span>Correct</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-700">
                    <span className="block font-extrabold text-base">{selectedResult.wrongCount ?? 0}</span>
                    <span>Incorrect</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-600">
                    <span className="block font-extrabold text-base">{selectedResult.unattemptedCount ?? 0}</span>
                    <span>Unattempted</span>
                  </div>
                </div>
              </div>

              {selectedResult.subjectBreakdown?.length > 0 && (
                <div className="border-t border-slate-100 pt-3">
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Subject Breakdown</div>
                  <div className="space-y-2">
                    {selectedResult.subjectBreakdown.map((sb, idx) => (
                      <div key={idx} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                        <span className="font-semibold text-slate-700">{sb.subject?.name || `Subject ${idx + 1}`}</span>
                        <div className="flex items-center gap-3 text-slate-500">
                          <span className="text-green-600 font-bold">+{sb.correct || 0}</span>
                          <span className="text-red-500 font-bold">-{sb.wrong || 0}</span>
                          <span className="font-extrabold text-slate-800">{sb.marks || 0} pts</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="p-6 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setSelectedResult(null)}
                className="px-5 py-2.5 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
