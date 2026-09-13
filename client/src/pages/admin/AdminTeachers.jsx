import { useState, useEffect } from "react";
import api from "../../config/api";
import { GraduationCap, Plus, Search, Eye, UserX, UserCheck, Mail } from "lucide-react";
import toast from "react-hot-toast";

export default function AdminTeachers() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", phone: "", qualification: "",
    experience: "", specialisation: "", bio: ""
  });

  const fetchTeachers = async () => {
    setLoading(true);
    try {
      const { data } = await api.get(`/teachers?search=${search}`);
      setTeachers(data.data?.teachers || []);
    } catch {
      setTeachers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchTeachers(); }, [search]);

  const handleCreate = async (e) => {
    e.preventDefault();
    setCreating(true);
    try {
      const { data } = await api.post("/auth/admin/create-teacher", form);
      toast.success(`Teacher created! Temp password: ${data.data.tempPassword}`);
      setShowCreate(false);
      setForm({ name: "", email: "", phone: "", qualification: "", experience: "", specialisation: "", bio: "" });
      fetchTeachers();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create teacher");
    } finally {
      setCreating(false);
    }
  };

  const filtered = teachers.filter(
    (t) =>
      t.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
      t.user?.email?.toLowerCase().includes(search.toLowerCase()) ||
      t.specialisation?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-extrabold text-2xl text-slate-900">Teachers & Faculty</h1>
          <p className="text-slate-500 text-sm mt-1">{teachers.length} faculty members</p>
        </div>
        <button
          onClick={() => setShowCreate(true)}
          className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2.5 rounded-xl transition shadow-sm text-sm"
        >
          <Plus className="w-4 h-4" /> Add Teacher
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, email or specialisation..."
          className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition bg-white"
        />
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-48">
          <div className="w-9 h-9 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white border border-slate-100 rounded-2xl p-12 text-center shadow-sm">
          <GraduationCap className="w-12 h-12 text-slate-200 mx-auto mb-4" />
          <h3 className="font-bold text-slate-600 mb-1">No teachers found</h3>
          <p className="text-slate-400 text-sm">Add your first teacher using the button above.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((t) => (
            <div key={t._id} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition group">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-400 to-purple-600 flex items-center justify-center text-white font-extrabold text-xl flex-shrink-0 shadow-md">
                  {t.user?.name?.charAt(0)?.toUpperCase() || "T"}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-bold text-slate-800 text-base truncate">{t.user?.name}</h3>
                  <p className="text-xs text-slate-400 truncate">{t.user?.email}</p>
                </div>
              </div>

              <div className="space-y-2 text-xs text-slate-600 mb-4">
                {t.qualification && (
                  <div className="flex items-start gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-slate-400" />
                    <span>{t.qualification}</span>
                  </div>
                )}
                {t.experience && (
                  <div className="flex items-start gap-1.5">
                    <span className="text-slate-400 flex-shrink-0">⏱</span>
                    <span>{t.experience}</span>
                  </div>
                )}
                {t.specialisation && (
                  <div className="flex items-start gap-1.5">
                    <span className="text-slate-400 flex-shrink-0">🎯</span>
                    <span className="line-clamp-2">{t.specialisation}</span>
                  </div>
                )}
              </div>

              {t.bio && (
                <p className="text-xs text-slate-500 italic line-clamp-2 mb-4 border-l-2 border-slate-200 pl-2">{t.bio}</p>
              )}

              <div className="flex gap-2">
                <span className={`flex-1 text-center text-xs font-bold px-2.5 py-1.5 rounded-lg ${t.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
                  {t.isActive ? "Active" : "Inactive"}
                </span>
                <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 transition">
                  <Eye className="w-4 h-4" />
                </button>
                <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 transition">
                  <Mail className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Teacher Modal */}
      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-100">
              <h2 className="font-extrabold text-xl text-slate-900">Add New Teacher</h2>
              <p className="text-slate-500 text-sm mt-1">A temporary password will be generated and emailed.</p>
            </div>
            <form onSubmit={handleCreate} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Full Name *</label>
                  <input required value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition" placeholder="Teacher's full name (with Dr./Prof.)" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Email *</label>
                  <input required type="email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition" placeholder="teacher@neetvidya.com" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Phone</label>
                  <input value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition" placeholder="+91 XXXXX XXXXX" />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Qualification</label>
                  <input value={form.qualification} onChange={(e) => setForm((f) => ({ ...f, qualification: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition" placeholder="e.g. M.Sc Physics, B.Ed" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Experience</label>
                  <input value={form.experience} onChange={(e) => setForm((f) => ({ ...f, experience: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition" placeholder="e.g. 10+ Years in NEET Coaching" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Specialisation</label>
                  <input value={form.specialisation} onChange={(e) => setForm((f) => ({ ...f, specialisation: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition" placeholder="e.g. Mechanics & Electromagnetism" />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Short Bio</label>
                  <textarea value={form.bio} onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))} rows={3}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition resize-none" placeholder="Brief professional bio..." />
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowCreate(false)}
                  className="flex-1 py-2.5 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition">
                  Cancel
                </button>
                <button type="submit" disabled={creating}
                  className="flex-1 py-2.5 bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white font-bold rounded-xl transition shadow-sm">
                  {creating ? "Creating..." : "Add Teacher"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
