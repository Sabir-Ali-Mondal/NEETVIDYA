import { useState, useEffect } from "react";
import api from "../../config/api";
import { Video, Play, Plus, Search, Clock, Eye } from "lucide-react";

export default function TeacherClasses() {
  const [lectures, setLectures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await api.get("/lectures");
        setLectures(data.data?.lectures || []);
      } catch {
        setLectures([]);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const filtered = lectures.filter(
    (l) =>
      l.title?.toLowerCase().includes(search.toLowerCase()) ||
      l.subject?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-extrabold text-2xl text-slate-900">Classes & Lectures</h1>
          <p className="text-slate-500 text-sm mt-1">Add YouTube or Google Drive lecture links for students</p>
        </div>
        <button className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2.5 rounded-xl transition shadow-sm text-sm">
          <Plus className="w-4 h-4" /> Add Lecture
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search lectures..."
          className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition bg-white"
        />
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-40">
          <div className="w-8 h-8 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white border border-slate-100 rounded-2xl p-12 text-center shadow-sm">
          <Video className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h3 className="font-bold text-slate-600 mb-1">No lectures uploaded yet</h3>
          <p className="text-slate-400 text-sm">Add your first lecture using the button above.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filtered.map((l) => (
            <div key={l._id} className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition">
              <div className="h-40 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center relative">
                {l.thumbnailUrl ? (
                  <img src={l.thumbnailUrl} alt={l.title} className="w-full h-full object-cover" />
                ) : (
                  <Video className="w-12 h-12 text-slate-600" />
                )}
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/20 transition cursor-pointer">
                  <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                    <Play className="w-5 h-5 text-slate-900 ml-0.5" />
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-slate-800 mb-1 line-clamp-1">{l.title}</h3>
                <p className="text-xs text-slate-500 mb-3">{l.subject || "General"}</p>
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {l.duration || "—"}</span>
                  <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" /> {l.views || 0} views</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
