import { useState, useEffect } from "react";
import api from "../../config/api";
import {
  Users, Search, Plus, Filter, ChevronRight, BadgeCheck,
  Phone, Mail, MapPin, GraduationCap, MoreVertical, UserX, UserCheck, Eye,
  Pencil, Trash2, X, Building2, BookOpen, Save, ShieldCheck
} from "lucide-react";
import { alertSuccess, alertError } from "../../utils/alert";
import ConfirmModal from "../../components/shared/ConfirmModal";

const typeColors = {
  REGULAR_OFFLINE: "bg-green-100 text-green-700",
  REGULAR_ONLINE: "bg-blue-100 text-blue-700",
  HYBRID: "bg-purple-100 text-purple-700",
  EXAM_ONLY: "bg-orange-100 text-orange-700",
  GUEST: "bg-slate-100 text-slate-600",
};

export default function AdminStudents() {
  const [students, setStudents] = useState([]);
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [showCreate, setShowCreate] = useState(false);
  const [creating, setCreating] = useState(false);
  const [viewingStudent, setViewingStudent] = useState(null);
  const [editingStudent, setEditingStudent] = useState(null);
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [savingEdit, setSavingEdit] = useState(false);
  const [grantableExams, setGrantableExams] = useState([]);
  const [examToPermit, setExamToPermit] = useState("");
  const [grantingAccess, setGrantingAccess] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", phone: "", currentClass: "DROPPER",
    studentType: "REGULAR_OFFLINE", city: "", parentName: "", parentPhone: "", school: ""
  });

  const limit = 15;

  // Exams available to grant access to an exam-only / guest student.
  const loadGrantableExams = async () => {
    try {
      const { data } = await api.get("/exams?limit=100");
      setGrantableExams(data.data?.exams || []);
    } catch {
      setGrantableExams([]);
    }
  };

  const handleGrantExamAccess = async () => {
    if (!examToPermit || !viewingStudent?.user?._id) return;
    setGrantingAccess(true);
    try {
      await api.post(`/exams/${examToPermit}/permissions`, {
        studentId: viewingStudent.user._id,
        reason: "Admin granted exam-only access",
      });
      alertSuccess("Exam access granted");
      const granted = grantableExams.find((e) => e._id === examToPermit);
      setViewingStudent((prev) => ({
        ...prev,
        examPermissions: [...(prev.examPermissions || []), granted || { _id: examToPermit }],
      }));
      setExamToPermit("");
    } catch (err) {
      alertError(err.response?.data?.message || "Failed to grant access");
    } finally {
      setGrantingAccess(false);
    }
  };

  const handleRevokeExamAccess = async (examId) => {
    if (!viewingStudent?.user?._id) return;
    try {
      await api.delete(`/exams/${examId}/permissions/${viewingStudent.user._id}`);
      alertSuccess("Exam access revoked");
      setViewingStudent((prev) => ({
        ...prev,
        examPermissions: (prev.examPermissions || []).filter(
          (e) => (e._id || e) !== examId
        ),
      }));
    } catch {
      alertError("Failed to revoke access");
    }
  };

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const { data } = await api.get(`/students?page=${page}&limit=${limit}&search=${search}`);
      setStudents(data.data?.students || []);
      setTotal(data.data?.total || 0);
    } catch {
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchBatches = async () => {
    try {
      const { data } = await api.get("/batches");
      setBatches(data.data?.batches || []);
    } catch {
      setBatches([]);
    }
  };

  useEffect(() => {
    fetchStudents();
    fetchBatches();
  }, [page, search]);

  const handleCreate = async (e) => {
    e.preventDefault();
    setCreating(true);
    try {
      const { data } = await api.post("/auth/admin/create-student", form);
      alertSuccess(`Student created! ID: ${data.data.studentId}, Password: ${data.data.tempPassword}`);
      setShowCreate(false);
      setForm({ name: "", email: "", phone: "", currentClass: "DROPPER", studentType: "REGULAR_OFFLINE", city: "", parentName: "", parentPhone: "", school: "" });
      fetchStudents();
    } catch (err) {
      alertError(err.response?.data?.message || "Failed to create student");
    } finally {
      setCreating(false);
    }
  };

  const toggleActive = async (studentId, isActive) => {
    try {
      await api.put(`/students/${studentId}/toggle-active`);
      alertSuccess(isActive ? "Student deactivated" : "Student activated");
      fetchStudents();
    } catch {
      alertError("Failed to update student");
    }
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    if (!editingStudent) return;
    setSavingEdit(true);
    try {
      await api.put(`/students/${editingStudent._id}`, {
        name: editingStudent.name,
        phone: editingStudent.phone,
        currentClass: editingStudent.currentClass,
        studentType: editingStudent.studentType,
        city: editingStudent.city,
        school: editingStudent.school,
        parentName: editingStudent.parentName,
        parentPhone: editingStudent.parentPhone,
        batches: editingStudent.batches?.map((b) => (typeof b === "object" ? b._id : b)) || [],
      });
      alertSuccess("Student updated successfully");
      setEditingStudent(null);
      fetchStudents();
    } catch (err) {
      alertError(err.response?.data?.message || "Failed to update student");
    } finally {
      setSavingEdit(false);
    }
  };

  const confirmDeleteStudent = async () => {
    if (!studentToDelete) return;
    try {
      await api.delete(`/students/${studentToDelete._id}`);
      alertSuccess("Student deleted successfully");
      setStudentToDelete(null);
      fetchStudents();
    } catch (err) {
      alertError(err.response?.data?.message || "Failed to delete student");
    }
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-extrabold text-2xl text-slate-900">Students</h1>
          <p className="text-slate-500 text-sm mt-1">
            {total} total students enrolled
          </p>
        </div>
        <button
          onClick={() => setShowCreate(true)}
          className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2.5 rounded-xl transition shadow-sm text-sm"
        >
          <Plus className="w-4 h-4" /> Add Student
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          placeholder="Search by name, email or student ID..."
          className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition bg-white"
        />
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex items-center justify-center h-48">
          <div className="w-9 h-9 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : students.length === 0 ? (
        <div className="bg-white border border-slate-100 rounded-2xl p-12 text-center shadow-sm">
          <Users className="w-12 h-12 text-slate-200 mx-auto mb-4" />
          <h3 className="font-bold text-slate-600 mb-1">No students found</h3>
          <p className="text-slate-400 text-sm">Add your first student or run the seed command.</p>
        </div>
      ) : (
        <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50">
                  <th className="text-left py-3.5 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Student</th>
                  <th className="text-left py-3.5 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider hidden sm:table-cell">Student ID</th>
                  <th className="text-left py-3.5 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider hidden md:table-cell">Class</th>
                  <th className="text-left py-3.5 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider hidden lg:table-cell">Type</th>
                  <th className="text-left py-3.5 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider hidden lg:table-cell">City</th>
                  <th className="text-left py-3.5 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="py-3.5 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {students.map((s) => (
                  <tr key={s._id} className="hover:bg-slate-50/50 transition group">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                          {s.user?.name?.charAt(0)?.toUpperCase() || "?"}
                        </div>
                        <div>
                          <div className="font-semibold text-slate-800">{s.user?.name}</div>
                          <div className="text-xs text-slate-400">{s.user?.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 hidden sm:table-cell">
                      <span className="font-mono text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg">
                        {s.studentId || "—"}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 hidden md:table-cell">
                      <span className="text-sm text-slate-600">{s.currentClass || "—"}</span>
                    </td>
                    <td className="py-3.5 px-4 hidden lg:table-cell">
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${typeColors[s.studentType] || "bg-slate-100 text-slate-600"}`}>
                        {s.studentType?.replace(/_/g, " ") || "—"}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 hidden lg:table-cell">
                      <span className="text-sm text-slate-600">{s.city || "—"}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full ${s.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${s.isActive ? "bg-green-500" : "bg-red-500"}`} />
                        {s.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition">
                        <button
                          onClick={() => {
                            setViewingStudent(s);
                            setExamToPermit("");
                            loadGrantableExams();
                          }}
                          className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-700 transition"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() =>
                            setEditingStudent({
                              ...s,
                              name: s.user?.name || "",
                              phone: s.user?.phone || s.phone || "",
                              batches: s.batches || [],
                            })
                          }
                          className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-indigo-600 transition"
                          title="Edit Student"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => toggleActive(s._id, s.isActive)}
                          className={`p-1.5 rounded-lg transition ${s.isActive ? "hover:bg-red-50 text-red-500" : "hover:bg-green-50 text-green-600"}`}
                          title={s.isActive ? "Deactivate" : "Activate"}
                        >
                          {s.isActive ? <UserX className="w-4 h-4" /> : <UserCheck className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={() => setStudentToDelete(s)}
                          className="p-1.5 rounded-lg hover:bg-red-50 text-red-400 hover:text-red-600 transition"
                          title="Delete Student"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="border-t border-slate-100 px-4 py-3 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                Showing {(page - 1) * limit + 1}–{Math.min(page * limit, total)} of {total}
              </span>
              <div className="flex gap-1">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
                >
                  Previous
                </button>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Create Student Modal */}
      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-100">
              <h2 className="font-extrabold text-xl text-slate-900">Add New Student</h2>
              <p className="text-slate-500 text-sm mt-1">A student ID and temporary password will be auto-generated and emailed.</p>
            </div>
            <form onSubmit={handleCreate} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Full Name *</label>
                  <input required value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition" placeholder="Student's full name" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Email *</label>
                  <input required type="email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition" placeholder="email@example.com" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Phone</label>
                  <input value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition" placeholder="+91 XXXXX XXXXX" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Current Class</label>
                  <select value={form.currentClass} onChange={(e) => setForm((f) => ({ ...f, currentClass: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition bg-white">
                    {["XI", "XII", "DROPPER", "REPEATER"].map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Student Type</label>
                  <select value={form.studentType} onChange={(e) => setForm((f) => ({ ...f, studentType: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition bg-white">
                    {["REGULAR_OFFLINE", "REGULAR_ONLINE", "HYBRID", "EXAM_ONLY", "GUEST"].map((t) => (
                      <option key={t} value={t}>{t.replace(/_/g, " ")}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">City</label>
                  <input value={form.city} onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition" placeholder="City" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Parent Name</label>
                  <input value={form.parentName} onChange={(e) => setForm((f) => ({ ...f, parentName: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition" placeholder="Parent's name" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Parent Phone</label>
                  <input value={form.parentPhone} onChange={(e) => setForm((f) => ({ ...f, parentPhone: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition" placeholder="+91 XXXXX XXXXX" />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">School/College</label>
                  <input value={form.school} onChange={(e) => setForm((f) => ({ ...f, school: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition" placeholder="School or college name" />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Initial Batch</label>
                  <select value={form.batch || ""} onChange={(e) => setForm((f) => ({ ...f, batch: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition bg-white">
                    <option value="">No Batch Assigned</option>
                    {batches.map((b) => <option key={b._id} value={b._id}>{b.name} ({b.code})</option>)}
                  </select>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-700">
                ⚡ A unique Student ID and temporary password will be auto-generated and sent to the student's email.
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowCreate(false)}
                  className="flex-1 py-2.5 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition">
                  Cancel
                </button>
                <button type="submit" disabled={creating}
                  className="flex-1 py-2.5 bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white font-bold rounded-xl transition shadow-sm">
                  {creating ? "Creating..." : "Create Student"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Student Modal */}
      {viewingStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white rounded-t-2xl">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-white font-extrabold text-xl shadow-md">
                  {viewingStudent.user?.name?.charAt(0)?.toUpperCase() || "S"}
                </div>
                <div>
                  <h3 className="font-extrabold text-lg text-slate-900">{viewingStudent.user?.name}</h3>
                  <p className="text-xs font-mono text-slate-400">ID: {viewingStudent.studentId || "—"}</p>
                </div>
              </div>
              <button
                onClick={() => setViewingStudent(null)}
                className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <div className="text-xs text-slate-400 font-medium">Class</div>
                  <div className="font-bold text-slate-800 mt-0.5">{viewingStudent.currentClass || "—"}</div>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <div className="text-xs text-slate-400 font-medium">Student Type</div>
                  <div className="font-bold text-slate-800 mt-0.5">{viewingStudent.studentType?.replace(/_/g, " ") || "—"}</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-slate-600">
                  <Mail className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  <span>{viewingStudent.user?.email || "No email"}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <Phone className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  <span>{viewingStudent.user?.phone || viewingStudent.phone || "No phone"}</span>
                </div>
                {viewingStudent.city && (
                  <div className="flex items-center gap-2 text-slate-600">
                    <Building2 className="w-4 h-4 text-slate-400 flex-shrink-0" />
                    <span>City: {viewingStudent.city}</span>
                  </div>
                )}
                {viewingStudent.school && (
                  <div className="flex items-center gap-2 text-slate-600">
                    <BookOpen className="w-4 h-4 text-slate-400 flex-shrink-0" />
                    <span>School/College: {viewingStudent.school}</span>
                  </div>
                )}
              </div>

              <div className="border-t border-slate-100 pt-3">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Guardian Information</div>
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 space-y-1">
                  <div className="text-slate-800 font-semibold">{viewingStudent.parentName || "Not specified"}</div>
                  {viewingStudent.parentPhone && (
                    <div className="text-xs text-slate-500 flex items-center gap-1.5">
                      <Phone className="w-3 h-3 text-slate-400" /> {viewingStudent.parentPhone}
                    </div>
                  )}
                </div>
              </div>

              <div className="border-t border-slate-100 pt-3">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Enrolled Batches</div>
                {viewingStudent.batches?.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {viewingStudent.batches.map((b) => (
                      <span key={b._id || b} className="px-3 py-1 bg-green-50 text-green-700 text-xs font-semibold rounded-lg border border-green-200">
                        {b.name || b.code || "Batch"}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-400">No batch assigned currently.</p>
                )}
              </div>

              {/* Exam-specific access — for exam-only / guest students outside a batch */}
              <div className="border-t border-slate-100 pt-3">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Exam Access Permissions
                </div>
                <p className="text-xs text-slate-400 mb-2">
                  Grant this student access to a specific exam without joining its batch.
                </p>
                <div className="flex gap-2">
                  <select
                    value={examToPermit}
                    onChange={(e) => setExamToPermit(e.target.value)}
                    className="flex-1 px-3 py-2 border-slate-200 rounded-lg text-xs bg-white"
                  >
                    <option value="">Select an exam to grant access...</option>
                    {grantableExams.map((ex) => (
                      <option key={ex._id} value={ex._id}>
                        {ex.title} {ex.batch?.name ? `— ${ex.batch.name}` : ""}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={handleGrantExamAccess}
                    disabled={!examToPermit || grantingAccess}
                    className="px-3.5 py-2 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white rounded-lg text-xs font-bold transition inline-flex items-center gap-1"
                  >
                    <ShieldCheck className="w-3.5 h-3.5" /> Grant
                  </button>
                </div>
                {viewingStudent.examPermissions?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {viewingStudent.examPermissions.map((ex) => (
                      <span
                        key={ex._id || ex}
                        className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-lg border-blue-200 flex items-center gap-1"
                      >
                        {ex.title || "Exam"}
                        <button
                          onClick={() => handleRevokeExamAccess(ex._id || ex)}
                          className="text-blue-400 hover:text-red-500 ml-1"
                          title="Revoke access"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="p-6 border-t border-slate-100 flex gap-3">
              <button
                onClick={() => setViewingStudent(null)}
                className="flex-1 py-2.5 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const s = viewingStudent;
                  setViewingStudent(null);
                  setEditingStudent({
                    ...s,
                    name: s.user?.name || "",
                    phone: s.user?.phone || s.phone || "",
                    batches: s.batches || [],
                  });
                }}
                className="flex-1 py-2.5 bg-green-600 hover:bg-green-700 text-white text-sm font-bold rounded-xl transition text-center shadow-sm"
              >
                Edit Student
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Student Modal */}
      {editingStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white rounded-t-2xl">
              <div>
                <h2 className="font-extrabold text-xl text-slate-900">Edit Student</h2>
                <p className="text-slate-500 text-xs mt-0.5">Update student details, class, or assigned batches.</p>
              </div>
              <button
                onClick={() => setEditingStudent(null)}
                className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSaveEdit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Full Name *</label>
                  <input
                    required
                    value={editingStudent.name}
                    onChange={(e) => setEditingStudent((prev) => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Phone</label>
                  <input
                    value={editingStudent.phone || ""}
                    onChange={(e) => setEditingStudent((prev) => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Current Class</label>
                  <select
                    value={editingStudent.currentClass}
                    onChange={(e) => setEditingStudent((prev) => ({ ...prev, currentClass: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition bg-white"
                  >
                    {["XI", "XII", "DROPPER", "REPEATER"].map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Student Type</label>
                  <select
                    value={editingStudent.studentType}
                    onChange={(e) => setEditingStudent((prev) => ({ ...prev, studentType: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition bg-white"
                  >
                    {["REGULAR_OFFLINE", "REGULAR_ONLINE", "HYBRID", "EXAM_ONLY", "GUEST"].map((t) => (
                      <option key={t} value={t}>{t.replace(/_/g, " ")}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">City</label>
                  <input
                    value={editingStudent.city || ""}
                    onChange={(e) => setEditingStudent((prev) => ({ ...prev, city: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Parent Name</label>
                  <input
                    value={editingStudent.parentName || ""}
                    onChange={(e) => setEditingStudent((prev) => ({ ...prev, parentName: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Parent Phone</label>
                  <input
                    value={editingStudent.parentPhone || ""}
                    onChange={(e) => setEditingStudent((prev) => ({ ...prev, parentPhone: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">School/College</label>
                  <input
                    value={editingStudent.school || ""}
                    onChange={(e) => setEditingStudent((prev) => ({ ...prev, school: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Assign Batch</label>
                  <select
                    value={editingStudent.batches?.[0]?._id || editingStudent.batches?.[0] || ""}
                    onChange={(e) => {
                      const selectedVal = e.target.value;
                      setEditingStudent((prev) => ({
                        ...prev,
                        batches: selectedVal ? [selectedVal] : [],
                      }));
                    }}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition bg-white"
                  >
                    <option value="">No Batch Assigned</option>
                    {batches.map((b) => (
                      <option key={b._id} value={b._id}>{b.name} ({b.code})</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingStudent(null)}
                  className="flex-1 py-2.5 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingEdit}
                  className="flex-1 py-2.5 bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white font-bold rounded-xl transition shadow-sm inline-flex items-center justify-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  {savingEdit ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={!!studentToDelete}
        onClose={() => setStudentToDelete(null)}
        onConfirm={confirmDeleteStudent}
        title="Delete Student"
        message={`Are you sure you want to permanently delete ${studentToDelete?.user?.name || "this student"}? This action cannot be undone.`}
        confirmLabel="Delete Student"
        danger={true}
      />
    </div>
  );
}
