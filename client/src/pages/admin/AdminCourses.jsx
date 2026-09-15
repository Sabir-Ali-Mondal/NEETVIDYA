import { useState, useEffect } from "react";
import api from "../../config/api";
import { BookOpen, Plus, Search, IndianRupee, Clock, Users, ChevronRight, Pencil, Trash2, X, Save, CheckCircle2 } from "lucide-react";
import toast from "react-hot-toast";
import ConfirmModal from "../../components/shared/ConfirmModal";

export default function AdminCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [creating, setCreating] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [savingEdit, setSavingEdit] = useState(false);
  const [viewingCourse, setViewingCourse] = useState(null);
  const [courseToDelete, setCourseToDelete] = useState(null);
  const [form, setForm] = useState({
    name: "",
    description: "",
    targetClass: "",
    duration: "",
    feeAmount: "",
    features: "",
  });

  const fetchCourses = async () => {
    try {
      const { data } = await api.get("/courses");
      setCourses(data.data?.courses || []);
    } catch {
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    setCreating(true);
    try {
      const payload = {
        ...form,
        feeAmount: Number(form.feeAmount || 0),
        features: form.features
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
      };

      await api.post("/courses", payload);
      toast.success("Course created successfully");
      setShowCreate(false);
      setForm({ name: "", description: "", targetClass: "", duration: "", feeAmount: "", features: "" });
      fetchCourses();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create course");
    } finally {
      setCreating(false);
    }
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    if (!editingCourse) return;
    setSavingEdit(true);
    try {
      const payload = {
        name: editingCourse.name,
        description: editingCourse.description,
        targetClass: editingCourse.targetClass,
        duration: editingCourse.duration,
        feeAmount: Number(editingCourse.feeAmount || 0),
        isActive: editingCourse.isActive,
        features: Array.isArray(editingCourse.features)
          ? editingCourse.features
          : String(editingCourse.features || "")
              .split(",")
              .map((i) => i.trim())
              .filter(Boolean),
      };
      await api.put(`/courses/${editingCourse._id}`, payload);
      toast.success("Course updated successfully");
      setEditingCourse(null);
      fetchCourses();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update course");
    } finally {
      setSavingEdit(false);
    }
  };

  const confirmDeleteCourse = async () => {
    if (!courseToDelete) return;
    try {
      await api.delete(`/courses/${courseToDelete._id}`);
      toast.success("Course deleted successfully");
      setCourseToDelete(null);
      fetchCourses();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete course");
    }
  };

  const filtered = courses.filter((c) =>
    c.name?.toLowerCase().includes(search.toLowerCase()) ||
    c.targetClass?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-extrabold text-2xl text-slate-900">Courses</h1>
          <p className="text-slate-500 text-sm mt-1">{courses.length} active courses</p>
        </div>
        <button onClick={() => setShowCreate(true)} className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2.5 rounded-xl transition shadow-sm text-sm">
          <Plus className="w-4 h-4" /> Add Course
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search courses..."
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
          <h3 className="font-bold text-slate-600 mb-1">No courses published yet</h3>
          <p className="text-slate-400 text-sm">Create your first course using the button above and it will appear on the public site automatically.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map((course) => (
            <div key={course._id} className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition group">
              {/* Top color bar */}
              <div className="h-1.5 bg-gradient-to-r from-green-500 to-emerald-400" />
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-green-50 border border-green-100 flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${course.isActive ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"}`}>
                      {course.isActive ? "Active" : "Inactive"}
                    </span>
                    <button
                      onClick={() => setCourseToDelete(course)}
                      className="p-1 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition"
                      title="Delete Course"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <h3 className="font-extrabold text-slate-900 text-lg mb-1 leading-tight">{course.name}</h3>
                <p className="text-xs text-slate-500 mb-4 line-clamp-2">{course.description}</p>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                      <Clock className="w-3.5 h-3.5" /> Duration
                    </div>
                    <div className="font-bold text-slate-700 text-sm">{course.duration || "—"}</div>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                      <IndianRupee className="w-3.5 h-3.5" /> Fees
                    </div>
                    <div className="font-bold text-slate-700 text-sm">
                      ₹{course.feeAmount?.toLocaleString("en-IN") || "—"}
                    </div>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                      <Users className="w-3.5 h-3.5" /> Target
                    </div>
                    <div className="font-bold text-slate-700 text-sm">{course.targetClass || "—"}</div>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                      <BookOpen className="w-3.5 h-3.5" /> Subjects
                    </div>
                    <div className="font-bold text-slate-700 text-sm">{course.subjects?.length || 0}</div>
                  </div>
                </div>

                {course.features?.length > 0 && (
                  <ul className="space-y-1 mb-4">
                    {course.features.slice(0, 3).map((f) => (
                      <li key={f} className="flex items-center gap-1.5 text-xs text-slate-500">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                    {course.features.length > 3 && (
                      <li className="text-xs text-slate-400 pl-3">+{course.features.length - 3} more features</li>
                    )}
                  </ul>
                )}

                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      setEditingCourse({
                        ...course,
                        features: course.features?.join(", ") || "",
                      })
                    }
                    className="flex-1 inline-flex items-center justify-center gap-1.5 text-xs font-semibold py-2.5 rounded-xl bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200 transition"
                  >
                    <Pencil className="w-3.5 h-3.5" /> Edit
                  </button>
                  <button
                    onClick={() => setViewingCourse(course)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 text-xs font-semibold py-2.5 rounded-xl bg-green-50 text-green-700 hover:bg-green-100 border border-green-200 transition"
                  >
                    View Details <ChevronRight className="w-3.5 h-3.5" />
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
              <h2 className="font-extrabold text-xl text-slate-900">Add New Course</h2>
              <p className="text-slate-500 text-sm mt-1">This program will be shown on the public site when published.</p>
            </div>
            <form onSubmit={handleCreate} className="p-6 space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Course Name *</label>
                  <input required value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition" placeholder="12th Batch – SANKALP" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Target Class</label>
                  <input value={form.targetClass} onChange={(e) => setForm((f) => ({ ...f, targetClass: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition" placeholder="Class 12, Droppers, Foundation" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Duration</label>
                  <input value={form.duration} onChange={(e) => setForm((f) => ({ ...f, duration: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition" placeholder="Complete 1 Year" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Fees (₹)</label>
                  <input type="number" min="0" value={form.feeAmount} onChange={(e) => setForm((f) => ({ ...f, feeAmount: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition" placeholder="20000" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Description</label>
                  <textarea rows={3} value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition resize-none" placeholder="Describe the course, focus area, and outcomes." />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Features</label>
                  <textarea rows={3} value={form.features} onChange={(e) => setForm((f) => ({ ...f, features: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition resize-none" placeholder="Separate each feature with a comma, e.g. NCERT mastery, DPPs, mock tests" />
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowCreate(false)}
                  className="flex-1 py-2.5 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition">
                  Cancel
                </button>
                <button type="submit" disabled={creating}
                  className="flex-1 py-2.5 bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white font-bold rounded-xl transition shadow-sm">
                  {creating ? "Creating..." : "Create Course"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Course Details Modal */}
      {viewingCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white rounded-t-2xl z-10">
              <div>
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${viewingCourse.isActive ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"}`}>
                  {viewingCourse.isActive ? "● Active Course" : "● Inactive"}
                </span>
                <h2 className="font-extrabold text-xl text-slate-900 mt-1">{viewingCourse.name}</h2>
              </div>
              <button
                onClick={() => setViewingCourse(null)}
                className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-sm">
              <p className="text-slate-600 text-xs leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                {viewingCourse.description || "No description provided."}
              </p>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-xs text-slate-400 block font-medium">Duration</span>
                  <span className="font-bold text-slate-800">{viewingCourse.duration || "—"}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-xs text-slate-400 block font-medium">Course Fees</span>
                  <span className="font-bold text-slate-800">₹{viewingCourse.feeAmount?.toLocaleString("en-IN") || "—"}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-xs text-slate-400 block font-medium">Target Audience</span>
                  <span className="font-bold text-slate-800">{viewingCourse.targetClass || "—"}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-xs text-slate-400 block font-medium">Subjects Included</span>
                  <span className="font-bold text-slate-800">{viewingCourse.subjects?.length || "All NEET"}</span>
                </div>
              </div>

              {viewingCourse.features?.length > 0 && (
                <div>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Key Highlights</span>
                  <ul className="space-y-1.5">
                    {viewingCourse.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-slate-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-green-600 flex-shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="p-6 border-t border-slate-100 flex gap-3">
              <button
                onClick={() => setViewingCourse(null)}
                className="flex-1 py-2.5 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const c = viewingCourse;
                  setViewingCourse(null);
                  setEditingCourse({
                    ...c,
                    features: c.features?.join(", ") || "",
                  });
                }}
                className="flex-1 py-2.5 bg-green-600 hover:bg-green-700 text-white text-sm font-bold rounded-xl transition shadow-sm"
              >
                Edit Program
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Course Modal */}
      {editingCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white rounded-t-2xl z-10">
              <div>
                <h2 className="font-extrabold text-xl text-slate-900">Edit Course</h2>
                <p className="text-slate-500 text-xs mt-0.5">Modify program details, pricing, and key features.</p>
              </div>
              <button
                onClick={() => setEditingCourse(null)}
                className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSaveEdit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Course Name *</label>
                  <input
                    required
                    value={editingCourse.name}
                    onChange={(e) => setEditingCourse((prev) => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Target Class</label>
                    <input
                      value={editingCourse.targetClass || ""}
                      onChange={(e) => setEditingCourse((prev) => ({ ...prev, targetClass: e.target.value }))}
                      className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Duration</label>
                    <input
                      value={editingCourse.duration || ""}
                      onChange={(e) => setEditingCourse((prev) => ({ ...prev, duration: e.target.value }))}
                      className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Fees (₹)</label>
                    <input
                      type="number"
                      min="0"
                      value={editingCourse.feeAmount ?? ""}
                      onChange={(e) => setEditingCourse((prev) => ({ ...prev, feeAmount: e.target.value }))}
                      className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Status</label>
                    <select
                      value={editingCourse.isActive ? "active" : "inactive"}
                      onChange={(e) => setEditingCourse((prev) => ({ ...prev, isActive: e.target.value === "active" }))}
                      className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition bg-white"
                    >
                      <option value="active">Active (Published)</option>
                      <option value="inactive">Inactive (Hidden)</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Description</label>
                  <textarea
                    rows={3}
                    value={editingCourse.description || ""}
                    onChange={(e) => setEditingCourse((prev) => ({ ...prev, description: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition resize-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Features (comma separated)</label>
                  <textarea
                    rows={3}
                    value={editingCourse.features || ""}
                    onChange={(e) => setEditingCourse((prev) => ({ ...prev, features: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition resize-none"
                    placeholder="NCERT Coverage, Daily Practice Tests, 1-on-1 Mentorship"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingCourse(null)}
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

      {/* Delete Course Confirmation */}
      <ConfirmModal
        isOpen={!!courseToDelete}
        onClose={() => setCourseToDelete(null)}
        onConfirm={confirmDeleteCourse}
        title="Delete Course"
        message={`Are you sure you want to permanently delete "${courseToDelete?.name}"? Associated batches should be updated.`}
        confirmLabel="Delete Course"
        danger={true}
      />
    </div>
  );
}
