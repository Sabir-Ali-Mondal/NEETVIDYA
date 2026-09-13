import { useState, useEffect } from "react";
import api from "../../config/api";
import { Users, Plus, Search, BookOpen, Clock, Calendar } from "lucide-react";
import toast from "react-hot-toast";

const batchTypeColors = {
  OFFLINE: "bg-emerald-100 text-emerald-700",
  ONLINE: "bg-blue-100 text-blue-700",
  HYBRID: "bg-purple-100 text-purple-700",
  EXAM_ONLY: "bg-orange-100 text-orange-700",
};

export default function AdminBatches() {
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

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

  useEffect(() => { fetchBatches(); }, []);

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
        <button className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2.5 rounded-xl transition shadow-sm text-sm">
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
          <p className="text-slate-400 text-sm">Create your first batch using the button above.</p>
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
                  <button className="flex-1 text-xs font-semibold py-2 rounded-lg bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200 transition">
                    View Students
                  </button>
                  <button className="flex-1 text-xs font-semibold py-2 rounded-lg bg-green-50 text-green-700 hover:bg-green-100 border border-green-200 transition">
                    Edit Batch
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
