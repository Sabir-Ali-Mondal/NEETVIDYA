import { useState, useEffect } from "react";
import api from "../../config/api";
import { Trophy, Plus, Search, Star, Pencil, Trash2, Award } from "lucide-react";
import toast from "react-hot-toast";

const categoryColors = {
  STUDENT_RESULT: "bg-green-100 text-green-700",
  INSTITUTE_MILESTONE: "bg-blue-100 text-blue-700",
  AWARD: "bg-amber-100 text-amber-700",
  CERTIFICATION: "bg-purple-100 text-purple-700",
  EVENT: "bg-indigo-100 text-indigo-700",
  CUSTOM: "bg-slate-100 text-slate-600",
};

export default function AdminAchievements() {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({
    title: "", description: "", category: "STUDENT_RESULT",
    studentName: "", studentBatch: "", score: "", year: new Date().getFullYear(), featured: false,
  });

  const fetchAchievements = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/achievements");
      setAchievements(data.data?.achievements || []);
    } catch {
      setAchievements([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAchievements(); }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    setCreating(true);
    try {
      await api.post("/achievements", form);
      toast.success("Achievement added successfully");
      setShowCreate(false);
      setForm({ title: "", description: "", category: "STUDENT_RESULT", studentName: "", studentBatch: "", score: "", year: new Date().getFullYear(), featured: false });
      fetchAchievements();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add achievement");
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this achievement?")) return;
    try {
      await api.delete(`/achievements/${id}`);
      toast.success("Achievement deleted");
      fetchAchievements();
    } catch {
      toast.error("Failed to delete");
    }
  };

  const filtered = achievements.filter((a) =>
    a.title?.toLowerCase().includes(search.toLowerCase()) ||
    a.studentName?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-extrabold text-2xl text-slate-900">Achievements</h1>
          <p className="text-slate-500 text-sm mt-1">{achievements.length} achievements · {achievements.filter((a) => a.featured).length} featured</p>
        </div>
        <button
          onClick={() => setShowCreate(true)}
          className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2.5 rounded-xl transition shadow-sm text-sm"
        >
          <Plus className="w-4 h-4" /> Add Achievement
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search achievements..."
          className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition bg-white"
        />
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-48">
          <div className="w-9 h-9 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white border border-slate-100 rounded-2xl p-12 text-center shadow-sm">
          <Trophy className="w-12 h-12 text-slate-200 mx-auto mb-4" />
          <h3 className="font-bold text-slate-600 mb-1">No achievements yet</h3>
          <p className="text-slate-400 text-sm">Add your first achievement to showcase results.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filtered.map((a) => (
            <div key={a._id} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition group">
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${a.featured ? "bg-gradient-to-br from-amber-400 to-orange-500 shadow-md" : "bg-slate-100"}`}>
                  <Trophy className={`w-6 h-6 ${a.featured ? "text-white" : "text-slate-400"}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${categoryColors[a.category] || "bg-slate-100 text-slate-600"}`}>
                      {a.category?.replace(/_/g, " ")}
                    </span>
                    {a.featured && (
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 flex items-center gap-1">
                        <Star className="w-3 h-3" /> Featured
                      </span>
                    )}
                    {a.year && <span className="text-xs text-slate-400">{a.year}</span>}
                  </div>
                  <h3 className="font-bold text-slate-800 mb-1">{a.title}</h3>
                  <p className="text-xs text-slate-500 line-clamp-2 mb-2">{a.description}</p>
                  {a.studentName && (
                    <div className="flex flex-wrap gap-3 text-xs text-slate-500">
                      <span className="font-semibold text-slate-700">{a.studentName}</span>
                      {a.studentBatch && <span>· {a.studentBatch}</span>}
                      {a.score && <span className="font-bold text-green-700">Score: {a.score}</span>}
                    </div>
                  )}
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition flex-shrink-0">
                  <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 transition">
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(a._id)} className="p-2 rounded-lg hover:bg-red-50 text-red-500 transition">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Modal */}
      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-100">
              <h2 className="font-extrabold text-xl text-slate-900">Add Achievement</h2>
            </div>
            <form onSubmit={handleCreate} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Title *</label>
                <input required value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition"
                  placeholder="e.g. AIR 84 in NEET UG 2024" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Category</label>
                <select value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition bg-white">
                  {["STUDENT_RESULT", "INSTITUTE_MILESTONE", "AWARD", "CERTIFICATION", "EVENT", "CUSTOM"].map((c) => (
                    <option key={c} value={c}>{c.replace(/_/g, " ")}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Description</label>
                <textarea value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} rows={3}
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition resize-none"
                  placeholder="Details about this achievement..." />
              </div>
              {form.category === "STUDENT_RESULT" && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Student Name</label>
                    <input value={form.studentName} onChange={(e) => setForm((f) => ({ ...f, studentName: e.target.value }))}
                      className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Score</label>
                    <input value={form.score} onChange={(e) => setForm((f) => ({ ...f, score: e.target.value }))}
                      className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition"
                      placeholder="e.g. 710 / 720" />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Batch</label>
                    <input value={form.studentBatch} onChange={(e) => setForm((f) => ({ ...f, studentBatch: e.target.value }))}
                      className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition"
                      placeholder="e.g. Batch Alpha 2024" />
                  </div>
                </div>
              )}
              <div className="flex items-center gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Year</label>
                  <input type="number" value={form.year} onChange={(e) => setForm((f) => ({ ...f, year: parseInt(e.target.value) }))}
                    className="w-28 px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition" />
                </div>
                <div className="flex items-center gap-2 mt-5">
                  <input type="checkbox" id="featured" checked={form.featured} onChange={(e) => setForm((f) => ({ ...f, featured: e.target.checked }))}
                    className="w-4 h-4 rounded accent-green-600" />
                  <label htmlFor="featured" className="text-sm font-semibold text-slate-700 cursor-pointer">Feature on homepage</label>
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowCreate(false)}
                  className="flex-1 py-2.5 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition">Cancel</button>
                <button type="submit" disabled={creating}
                  className="flex-1 py-2.5 bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white font-bold rounded-xl transition">
                  {creating ? "Adding..." : "Add Achievement"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
