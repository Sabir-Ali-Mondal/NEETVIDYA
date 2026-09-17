import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../config/api";
import {
  Users, GraduationCap, ClipboardList, Layers, UserPlus,
  ShieldCheck, Mail, Phone, BadgeCheck, UserCheck, Building2,
  X, Save, Clock, ChevronRight, Eye, Calendar, BookOpen
} from "lucide-react";
import StudentBadge from "../../components/shared/StudentBadge";
import { alertSuccess, alertError } from "../../utils/alert";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateStudent, setShowCreateStudent] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [creating, setCreating] = useState(false);
  const [newStudent, setNewStudent] = useState({
    name: "",
    email: "",
    phone: "",
    studentType: "REGULAR_OFFLINE",
    currentClass: "DROPPER",
    parentName: "",
    parentPhone: "",
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      await Promise.all([
        api.get("/admin/dashboard").then(({ data }) => setData(data.data)),
        api.get("/students").then(({ data }) => setStudents(data.data.students || [])),
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateStudent = async (e) => {
    e.preventDefault();
    setCreating(true);
    try {
      const { data } = await api.post("/auth/admin/create-student", newStudent);
      alertSuccess(
        `Student created! ID: ${data.data.studentId} • Temp password copied to clipboard`
      );
      try {
        navigator.clipboard?.writeText(data.data.tempPassword);
      } catch {}
      setShowCreateStudent(false);
      setNewStudent({
        name: "",
        email: "",
        phone: "",
        studentType: "REGULAR_OFFLINE",
        currentClass: "DROPPER",
        parentName: "",
        parentPhone: "",
      });
      loadData();
    } catch (err) {
      alertError(err.response?.data?.message || "Failed to create student");
    } finally {
      setCreating(false);
    }
  };

  const statCards = [
    {
      label: "Total Enrolled",
      value: data?.studentCount ?? students.length ?? 0,
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
        <button
          onClick={() => setShowCreateStudent(true)}
          className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 active:scale-[0.98] text-white font-semibold px-5 py-2.5 rounded-xl transition shadow-sm text-sm"
        >
          <UserPlus className="w-4 h-4" /> Quick-Create Student
        </button>
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

      {/* Student Roster Table */}
      <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h2 className="font-bold text-lg text-slate-900">Student Roster</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {students.length} total students enrolled in the institute
            </p>
          </div>
          <button
            onClick={() => navigate("/admin/students")}
            className="text-xs font-semibold text-green-600 hover:text-green-700 inline-flex items-center gap-1"
          >
            View all students <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 text-[11px] font-bold uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Student</th>
                <th className="px-6 py-4">Contact</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Batch & Class</th>
                <th className="px-6 py-4">Guardian</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <tr key={i}>
                    {[1, 2, 3, 4, 5, 6].map((j) => (
                      <td key={j} className="px-6 py-4">
                        <div className="h-4 bg-slate-100 rounded w-full animate-pulse mb-2" />
                        <div className="h-3 bg-slate-100 rounded w-2/3 animate-pulse" />
                      </td>
                    ))}
                  </tr>
                ))
              ) : students.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-16 text-center">
                    <Users className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                    <h3 className="font-bold text-slate-600 mb-1">No students yet</h3>
                    <p className="text-sm text-slate-400">
                      Create your first student using the "Quick-Create Student" button.
                    </p>
                  </td>
                </tr>
              ) : (
                students.slice(0, 8).map((s) => (
                  <tr key={s._id} className="hover:bg-slate-50 transition">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-white text-xs font-extrabold shadow-sm flex-shrink-0">
                          {s.user?.name?.charAt(0)?.toUpperCase() || "S"}
                        </div>
                        <div>
                          <div className="font-bold text-slate-800">{s.user?.name}</div>
                          {s.studentId && (
                            <div className="text-[11px] font-mono text-slate-400 mt-0.5">
                              {s.studentId}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-slate-600 text-xs">
                          <Mail className="w-3 h-3 text-slate-400 flex-shrink-0" />
                          <span className="truncate max-w-[200px]">{s.user?.email || "—"}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-600 text-xs">
                          <Phone className="w-3 h-3 text-slate-400 flex-shrink-0" />
                          <span>{s.user?.phone || "—"}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg border ${
                          typeColors[s.studentType] || typeColors.GUEST
                        }`}
                      >
                        {s.studentType?.replace(/_/g, " ") || "GUEST"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-slate-700 text-xs">
                        {s.batches?.[0]?.name || "Unassigned"}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5 inline-flex items-center gap-1">
                        <BadgeCheck className="w-3 h-3" />
                        {s.currentClass || "—"}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-xs font-semibold text-slate-700">
                        {s.parentName || "—"}
                      </div>
                      {s.parentPhone && (
                        <div className="text-[11px] text-slate-400 mt-0.5">
                          {s.parentPhone}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => setSelectedStudent(s)}
                        className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-green-50 text-slate-600 hover:text-green-700 transition"
                      >
                        <Eye className="w-3.5 h-3.5" /> View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick-Create Student Modal */}
      {showCreateStudent && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white rounded-t-2xl">
              <div>
                <h3 className="font-extrabold text-xl text-slate-900">Admin Quick-Create Student</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Generates instant student ID, password, and welcome email.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowCreateStudent(false)}
                className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateStudent} className="p-6 space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                  Student Full Name
                </label>
                <input
                  type="text"
                  required
                  value={newStudent.name}
                  onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                  placeholder="e.g. Rahul Sen"
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={newStudent.email}
                    onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                    placeholder="rahul@gmail.com"
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    required
                    value={newStudent.phone}
                    onChange={(e) => setNewStudent({ ...newStudent, phone: e.target.value })}
                    placeholder="+91 98765 XXXXX"
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                    Student Type
                  </label>
                  <select
                    value={newStudent.studentType}
                    onChange={(e) => setNewStudent({ ...newStudent, studentType: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition bg-white"
                  >
                    <option value="REGULAR_OFFLINE">Regular Offline</option>
                    <option value="REGULAR_ONLINE">Regular Online</option>
                    <option value="HYBRID">Hybrid</option>
                    <option value="EXAM_ONLY">Exam Only</option>
                    <option value="GUEST">Guest</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                    Current Class
                  </label>
                  <select
                    value={newStudent.currentClass}
                    onChange={(e) => setNewStudent({ ...newStudent, currentClass: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition bg-white"
                  >
                    <option value="XI">Class XI</option>
                    <option value="XII">Class XII</option>
                    <option value="DROPPER">Dropper</option>
                    <option value="REPEATER">Repeater</option>
                  </select>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                    Guardian Name
                  </label>
                  <input
                    type="text"
                    value={newStudent.parentName}
                    onChange={(e) => setNewStudent({ ...newStudent, parentName: e.target.value })}
                    placeholder="Parent / Guardian name"
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                    Guardian Phone
                  </label>
                  <input
                    type="tel"
                    value={newStudent.parentPhone}
                    onChange={(e) => setNewStudent({ ...newStudent, parentPhone: e.target.value })}
                    placeholder="+91 98765 XXXXX"
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowCreateStudent(false)}
                  className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={creating}
                  className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white font-semibold px-5 py-2.5 rounded-xl transition shadow-sm text-sm"
                >
                  <Save className="w-4 h-4" />
                  {creating ? "Creating..." : "Generate Account"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Student Details Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white rounded-t-2xl">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-white font-extrabold text-xl shadow-md">
                  {selectedStudent.user?.name?.charAt(0)?.toUpperCase() || "S"}
                </div>
                <div>
                  <h3 className="font-extrabold text-lg text-slate-900">{selectedStudent.user?.name}</h3>
                  <p className="text-xs font-mono text-slate-400">ID: {selectedStudent.studentId || "—"}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedStudent(null)}
                className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <div className="text-xs text-slate-400 font-medium">Class / Category</div>
                  <div className="font-bold text-slate-800 mt-0.5">{selectedStudent.currentClass || "—"}</div>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <div className="text-xs text-slate-400 font-medium">Student Type</div>
                  <div className="font-bold text-slate-800 mt-0.5">{selectedStudent.studentType?.replace(/_/g, " ") || "—"}</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-slate-600">
                  <Mail className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  <span>{selectedStudent.user?.email || "No email"}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <Phone className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  <span>{selectedStudent.user?.phone || selectedStudent.phone || "No phone"}</span>
                </div>
                {selectedStudent.city && (
                  <div className="flex items-center gap-2 text-slate-600">
                    <Building2 className="w-4 h-4 text-slate-400 flex-shrink-0" />
                    <span>City: {selectedStudent.city}</span>
                  </div>
                )}
                {selectedStudent.school && (
                  <div className="flex items-center gap-2 text-slate-600">
                    <BookOpen className="w-4 h-4 text-slate-400 flex-shrink-0" />
                    <span>School/College: {selectedStudent.school}</span>
                  </div>
                )}
              </div>

              <div className="border-t border-slate-100 pt-3">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Guardian Information</div>
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 space-y-1">
                  <div className="text-slate-800 font-semibold">{selectedStudent.parentName || "Not specified"}</div>
                  {selectedStudent.parentPhone && (
                    <div className="text-xs text-slate-500 flex items-center gap-1.5">
                      <Phone className="w-3 h-3 text-slate-400" /> {selectedStudent.parentPhone}
                    </div>
                  )}
                </div>
              </div>

              <div className="border-t border-slate-100 pt-3">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Enrolled Batches</div>
                {selectedStudent.batches?.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {selectedStudent.batches.map((b) => (
                      <span key={b._id || b} className="px-3 py-1 bg-green-50 text-green-700 text-xs font-semibold rounded-lg border border-green-200">
                        {b.name || b.code || "Batch"}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-400">No batch assigned currently.</p>
                )}
              </div>
            </div>

            <div className="p-6 border-t border-slate-100 flex gap-3">
              <button
                onClick={() => setSelectedStudent(null)}
                className="flex-1 py-2.5 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setSelectedStudent(null);
                  navigate("/admin/students");
                }}
                className="flex-1 py-2.5 bg-green-600 hover:bg-green-700 text-white text-sm font-bold rounded-xl transition text-center shadow-sm"
              >
                Manage in Students
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
