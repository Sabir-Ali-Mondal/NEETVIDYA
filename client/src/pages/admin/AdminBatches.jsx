import { useState, useEffect } from "react";
import api from "../../config/api";
import { Users, Plus, Search, BookOpen, Clock, Calendar, Pencil, Trash2, X, Save, UserMinus, ShieldAlert } from "lucide-react";
import { alertSuccess, alertError } from "../../utils/alert";
import ConfirmModal from "../../components/shared/ConfirmModal";

const batchTypeColors = {
  OFFLINE: "bg-emerald-100 text-emerald-700",
  ONLINE: "bg-blue-100 text-blue-700",
  HYBRID: "bg-purple-100 text-purple-700",
  EXAM_ONLY: "bg-orange-100 text-orange-700",
};

export default function AdminBatches() {
  const [batches, setBatches] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [creating, setCreating] = useState(false);
  const [viewingBatch, setViewingBatch] = useState(null);
  const [batchStudents, setBatchStudents] = useState([]);
  const [allStudents, setAllStudents] = useState([]);
  const [studentToEnroll, setStudentToEnroll] = useState("");
  const [loadingStudents, setLoadingStudents] = useState(false);
  const [editingBatch, setEditingBatch] = useState(null);
  const [savingEdit, setSavingEdit] = useState(false);
  const [batchToDelete, setBatchToDelete] = useState(null);
  const [form, setForm] = useState({
    name: "",
    code: "",
    batchType: "OFFLINE",
    course: "",
    academicYear: "",
    capacity: "",
    schedule: "",
    color: "#22c55e",
  });

  const fetchBatches = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/batches");
      setBatches(data.data?.batches || []);
    } catch {
      setBatches([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchCourses = async () => {
    try {
      const { data } = await api.get("/courses");
      setCourses(data.data?.courses || []);
    } catch {
      setCourses([]);
    }
  };

  useEffect(() => { fetchBatches(); fetchCourses(); }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!form.course) {
      alertError("Please select a course before creating a batch");
      return;
    }

    setCreating(true);
    try {
      await api.post("/batches", {
        ...form,
        capacity: Number(form.capacity || 0),
      });
      alertSuccess("Batch created successfully");
      setShowCreate(false);
      setForm({ name: "", code: "", batchType: "OFFLINE", course: "", academicYear: "", capacity: "", schedule: "", color: "#22c55e" });
      fetchBatches();
    } catch (err) {
      alertError(err.response?.data?.message || "Failed to create batch");
    } finally {
      setCreating(false);
    }
  };

  const handleOpenStudents = async (batch) => {
    setViewingBatch(batch);
    setLoadingStudents(true);
    setStudentToEnroll("");
    try {
      const [bRes, sRes] = await Promise.all([
        api.get(`/batches/${batch._id}/students`),
        api.get("/students?limit=100"),
      ]);
      setBatchStudents(bRes.data.data?.students || []);
      setAllStudents(sRes.data.data?.students || []);
    } catch {
      setBatchStudents([]);
      alertError("Failed to load students in this batch");
    } finally {
      setLoadingStudents(false);
    }
  };

  const handleEnrollStudent = async (e) => {
    e.preventDefault();
    if (!studentToEnroll || !viewingBatch) return;
    try {
      await api.post(`/batches/${viewingBatch._id}/students`, {
        studentIds: [studentToEnroll],
      });
      alertSuccess("Student enrolled into batch successfully");
      const { data } = await api.get(`/batches/${viewingBatch._id}/students`);
      setBatchStudents(data.data?.students || []);
      setStudentToEnroll("");
      fetchBatches();
    } catch (err) {
      alertError(err.response?.data?.message || "Failed to enroll student");
    }
  };

  const handleRemoveStudent = async (studentId) => {
    if (!viewingBatch) return;
    try {
      await api.delete(`/batches/${viewingBatch._id}/students/${studentId}`);
      alertSuccess("Student removed from batch");
      setBatchStudents((prev) => prev.filter((s) => s._id !== studentId));
      fetchBatches();
    } catch (err) {
      alertError(err.response?.data?.message || "Failed to remove student");
    }
  };

  const handleSaveBatchEdit = async (e) => {
    e.preventDefault();
    if (!editingBatch) return;
    setSavingEdit(true);
    try {
      await api.put(`/batches/${editingBatch._id}`, {
        name: editingBatch.name,
        code: editingBatch.code,
        batchType: editingBatch.batchType,
        course: typeof editingBatch.course === "object" ? editingBatch.course?._id : editingBatch.course,
        academicYear: editingBatch.academicYear,
        capacity: Number(editingBatch.capacity || 0),
        schedule: editingBatch.schedule,
        color: editingBatch.color,
      });
      alertSuccess("Batch updated successfully");
      setEditingBatch(null);
      fetchBatches();
    } catch (err) {
      alertError(err.response?.data?.message || "Failed to update batch");
    } finally {
      setSavingEdit(false);
    }
  };

  const confirmDeleteBatch = async () => {
    if (!batchToDelete) return;
    try {
      await api.delete(`/batches/${batchToDelete._id}`);
      alertSuccess("Batch deleted successfully");
      setBatchToDelete(null);
      fetchBatches();
    } catch (err) {
      alertError(err.response?.data?.message || "Failed to delete batch");
    }
  };

  const filtered = batches.filter(
    (b) =>
      b.name?.toLowerCase().includes(search.toLowerCase()) ||
      b.code?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-extrabold text-2xl text-slate-900">Batches</h1>
          <p className="text-slate-500 text-sm mt-1">{batches.length} active batches</p>
        </div>
        <button onClick={() => setShowCreate(true)} className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2.5 rounded-xl transition shadow-sm text-sm">
          <Plus className="w-4 h-4" /> Create Batch
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search batches..."
          className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition bg-white"
        />
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-48">
          <div className="w-9 h-9 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white border border-slate-100 rounded-2xl p-12 text-center shadow-sm">
          <BookOpen className="w-12 h-12 text-slate-200 mx-auto mb-4" />
          <h3 className="font-bold text-slate-600 mb-1">No batches found</h3>
          <p className="text-slate-400 text-sm">Create your first batch using the button above and it will appear in the student-facing flow.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filtered.map((b) => (
            <div key={b._id} className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition group">
              <div
                className="h-1.5"
                style={{ backgroundColor: b.color || "#22c55e" }}
              />
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                        {b.code}
                      </span>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${batchTypeColors[b.batchType] || "bg-slate-100 text-slate-600"}`}>
                        {b.batchType}
                      </span>
                    </div>
                    <h3 className="font-bold text-slate-800 text-base">{b.name}</h3>
                  </div>
                  <button
                    onClick={() => setBatchToDelete(b)}
                    className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition"
                    title="Delete Batch"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="text-center bg-slate-50 rounded-xl p-3 border border-slate-100">
                    <div className="text-xl font-extrabold text-slate-800">{b.students?.length || 0}</div>
                    <div className="text-xs text-slate-400 mt-0.5">Students</div>
                  </div>
                  <div className="text-center bg-slate-50 rounded-xl p-3 border border-slate-100">
                    <div className="text-xl font-extrabold text-slate-800">{b.capacity || "—"}</div>
                    <div className="text-xs text-slate-400 mt-0.5">Capacity</div>
                  </div>
                  <div className="text-center bg-slate-50 rounded-xl p-3 border border-slate-100">
                    <div className="text-xl font-extrabold text-slate-800">{b.assignedTeachers?.length || 0}</div>
                    <div className="text-xs text-slate-400 mt-0.5">Teachers</div>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-slate-500">
                  {b.schedule && (
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{b.schedule}</span>
                    </div>
                  )}
                  {b.academicYear && (
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>Academic Year: {b.academicYear}</span>
                    </div>
                  )}
                </div>

                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => handleOpenStudents(b)}
                    className="flex-1 text-xs font-semibold py-2 rounded-lg bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200 transition"
                  >
                    View Students
                  </button>
                  <button
                    onClick={() =>
                      setEditingBatch({
                        ...b,
                        course: b.course?._id || b.course || "",
                      })
                    }
                    className="flex-1 text-xs font-semibold py-2 rounded-lg bg-green-50 text-green-700 hover:bg-green-100 border border-green-200 transition"
                  >
                    Edit Batch
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-100">
              <h2 className="font-extrabold text-xl text-slate-900">Create New Batch</h2>
              <p className="text-slate-500 text-sm mt-1">Associate the batch with an active course and publish it to the public flow.</p>
            </div>
            <form onSubmit={handleCreate} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Batch Name *</label>
                  <input required value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition" placeholder="12th Batch – SANKALP" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Batch Code *</label>
                  <input required value={form.code} onChange={(e) => setForm((f) => ({ ...f, code: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition" placeholder="SANKALP-12TH" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Batch Type</label>
                  <select value={form.batchType} onChange={(e) => setForm((f) => ({ ...f, batchType: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition">
                    <option value="OFFLINE">OFFLINE</option>
                    <option value="ONLINE">ONLINE</option>
                    <option value="HYBRID">HYBRID</option>
                    <option value="EXAM_ONLY">EXAM_ONLY</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Course *</label>
                  <select value={form.course} onChange={(e) => setForm((f) => ({ ...f, course: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition">
                    <option value="">Select a course</option>
                    {courses.map((course) => (
                      <option key={course._id} value={course._id}>{course.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Academic Year</label>
                  <input value={form.academicYear} onChange={(e) => setForm((f) => ({ ...f, academicYear: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition" placeholder="2026-2027" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Capacity</label>
                  <input type="number" min="0" value={form.capacity} onChange={(e) => setForm((f) => ({ ...f, capacity: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition" placeholder="40" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Schedule</label>
                  <input value={form.schedule} onChange={(e) => setForm((f) => ({ ...f, schedule: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition" placeholder="Mon–Sat: 08:30 AM – 01:30 PM" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Batch Color</label>
                  <input type="color" value={form.color} onChange={(e) => setForm((f) => ({ ...f, color: e.target.value }))}
                    className="w-full h-12 px-2 py-1 border border-slate-200 rounded-xl bg-white" />
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowCreate(false)}
                  className="flex-1 py-2.5 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition">
                  Cancel
                </button>
                <button type="submit" disabled={creating}
                  className="flex-1 py-2.5 bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white font-bold rounded-xl transition shadow-sm">
                  {creating ? "Creating..." : "Create Batch"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Batch Students Modal */}
      {viewingBatch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white rounded-t-2xl z-10">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                    {viewingBatch.code}
                  </span>
                  <h2 className="font-extrabold text-xl text-slate-900">{viewingBatch.name}</h2>
                </div>
                <p className="text-slate-500 text-xs mt-1">
                  Enrolled Students ({batchStudents.length} / {viewingBatch.capacity || "Unlimited"})
                </p>
              </div>
              <button
                onClick={() => setViewingBatch(null)}
                className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              {/* Quick Enroll Student Form */}
              <form onSubmit={handleEnrollStudent} className="flex items-center gap-2 mb-4 p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <select
                  value={studentToEnroll}
                  onChange={(e) => setStudentToEnroll(e.target.value)}
                  className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-xs bg-white focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
                >
                  <option value="">Select a student to enroll into this batch...</option>
                  {allStudents
                    .filter((st) => !batchStudents.some((bs) => bs._id === st._id))
                    .map((st) => (
                      <option key={st._id} value={st._id}>
                        {st.user?.name} ({st.studentId || st.user?.email})
                      </option>
                    ))}
                </select>
                <button
                  type="submit"
                  disabled={!studentToEnroll}
                  className="px-3.5 py-2 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white rounded-lg text-xs font-bold transition shadow-sm inline-flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Enroll
                </button>
              </form>

              {loadingStudents ? (
                <div className="py-12 flex justify-center items-center">
                  <div className="w-8 h-8 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
                </div>
              ) : batchStudents.length === 0 ? (
                <div className="text-center py-12">
                  <Users className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <h3 className="font-bold text-slate-700">No students enrolled in this batch</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Assign students to this batch from the Students page.
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-slate-100 border border-slate-100 rounded-xl overflow-hidden">
                  {batchStudents.map((s) => (
                    <div key={s._id} className="p-3.5 flex items-center justify-between hover:bg-slate-50 transition">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-white font-bold text-xs shadow-sm">
                          {s.user?.name?.charAt(0)?.toUpperCase() || "S"}
                        </div>
                        <div>
                          <div className="font-bold text-slate-800 text-sm">{s.user?.name}</div>
                          <div className="text-xs text-slate-400 flex items-center gap-2">
                            <span>ID: {s.studentId || "—"}</span>
                            <span>•</span>
                            <span>{s.user?.email}</span>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => handleRemoveStudent(s._id)}
                        className="inline-flex items-center gap-1 text-xs text-red-500 hover:text-red-700 hover:bg-red-50 px-2.5 py-1.5 rounded-lg border border-red-100 transition"
                        title="Remove student from this batch"
                      >
                        <UserMinus className="w-3.5 h-3.5" /> Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="p-6 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setViewingBatch(null)}
                className="px-5 py-2.5 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Batch Modal */}
      {editingBatch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white rounded-t-2xl z-10">
              <div>
                <h2 className="font-extrabold text-xl text-slate-900">Edit Batch</h2>
                <p className="text-slate-500 text-xs mt-0.5">Modify batch details, schedule, or capacity.</p>
              </div>
              <button
                onClick={() => setEditingBatch(null)}
                className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSaveBatchEdit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Batch Name *</label>
                  <input
                    required
                    value={editingBatch.name}
                    onChange={(e) => setEditingBatch((prev) => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Batch Code *</label>
                  <input
                    required
                    value={editingBatch.code}
                    onChange={(e) => setEditingBatch((prev) => ({ ...prev, code: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Batch Type</label>
                  <select
                    value={editingBatch.batchType}
                    onChange={(e) => setEditingBatch((prev) => ({ ...prev, batchType: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition bg-white"
                  >
                    <option value="OFFLINE">OFFLINE</option>
                    <option value="ONLINE">ONLINE</option>
                    <option value="HYBRID">HYBRID</option>
                    <option value="EXAM_ONLY">EXAM_ONLY</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Course *</label>
                  <select
                    value={editingBatch.course}
                    onChange={(e) => setEditingBatch((prev) => ({ ...prev, course: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition bg-white"
                  >
                    <option value="">Select a course</option>
                    {courses.map((c) => (
                      <option key={c._id} value={c._id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Academic Year</label>
                  <input
                    value={editingBatch.academicYear || ""}
                    onChange={(e) => setEditingBatch((prev) => ({ ...prev, academicYear: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Capacity</label>
                  <input
                    type="number"
                    min="0"
                    value={editingBatch.capacity || ""}
                    onChange={(e) => setEditingBatch((prev) => ({ ...prev, capacity: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Schedule</label>
                  <input
                    value={editingBatch.schedule || ""}
                    onChange={(e) => setEditingBatch((prev) => ({ ...prev, schedule: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Batch Color</label>
                  <input
                    type="color"
                    value={editingBatch.color || "#22c55e"}
                    onChange={(e) => setEditingBatch((prev) => ({ ...prev, color: e.target.value }))}
                    className="w-full h-12 px-2 py-1 border border-slate-200 rounded-xl bg-white"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingBatch(null)}
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

      {/* Delete Batch Confirmation */}
      <ConfirmModal
        isOpen={!!batchToDelete}
        onClose={() => setBatchToDelete(null)}
        onConfirm={confirmDeleteBatch}
        title="Delete Batch"
        message={`Are you sure you want to delete "${batchToDelete?.name}"? Students enrolled in this batch will be unlinked.`}
        confirmLabel="Delete Batch"
        danger={true}
      />
    </div>
  );
}
