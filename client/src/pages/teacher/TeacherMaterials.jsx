import { useState, useEffect } from "react";
import api from "../../config/api";
import { BookOpen, Upload, FileText, Trash2, Plus, Search, Download, ExternalLink } from "lucide-react";
import toast from "react-hot-toast";

export default function TeacherMaterials() {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await api.get("/materials");
        setMaterials(data.data?.materials || []);
      } catch {
        setMaterials([]);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const filtered = materials.filter(
    (m) =>
      m.title?.toLowerCase().includes(search.toLowerCase()) ||
      m.subject?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-extrabold text-2xl text-slate-900">Study Materials</h1>
          <p className="text-slate-500 text-sm mt-1">Upload and manage PDF notes, handouts and resources</p>
        </div>
        <button className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2.5 rounded-xl transition shadow-sm text-sm">
          <Plus className="w-4 h-4" /> Upload Material
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by title or subject..."
          className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition bg-white"
        />
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-40 text-slate-400">
          <div className="w-8 h-8 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white border border-slate-100 rounded-2xl p-12 text-center shadow-sm">
          <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h3 className="font-bold text-slate-600 mb-1">No materials yet</h3>
          <p className="text-slate-400 text-sm">Upload your first study material using the button above.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((m) => (
            <div key={m._id} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition group">
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-green-50 border border-green-100 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-green-600" />
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                  {m.fileType || "PDF"}
                </span>
              </div>
              <h3 className="font-bold text-slate-800 text-sm mb-1 line-clamp-2">{m.title}</h3>
              <p className="text-xs text-slate-500 mb-4">{m.subject || "General"}</p>
              <div className="flex gap-2">
                <a
                  href={m.fileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 text-center text-xs font-semibold py-2 rounded-lg bg-green-50 text-green-700 hover:bg-green-100 transition flex items-center justify-center gap-1"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> View
                </a>
                <button className="text-xs font-semibold px-3 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
