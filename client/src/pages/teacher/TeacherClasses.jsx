import { useState, useEffect } from "react";
import api from "../../config/api";
import { Video, Play, Plus, Search, Clock, Eye, Pencil, Trash2, X, Save, ExternalLink } from "lucide-react";
import toast from "react-hot-toast";
import ConfirmModal from "../../components/shared/ConfirmModal";

export default function TeacherClasses() {
  const [lectures, setLectures] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [subjectFilter, setSubjectFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [editingLecture, setEditingLecture] = useState(null);
  const [playingLecture, setPlayingLecture] = useState(null);
  const [lectureToDelete, setLectureToDelete] = useState(null);
  const [savingLecture, setSavingLecture] = useState(false);

  const [form, setForm] = useState({
    title: "",
    subject: "",
    videoUrl: "",
    thumbnailUrl: "",
    duration: 45,
    description: "",
  });

  const fetchLectures = async () => {
    try {
      const { data } = await api.get("/lectures");
      setLectures(data.data?.lectures || []);
    } catch {
      setLectures([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchSubjects = async () => {
    try {
      const { data } = await api.get("/academics/subjects");
      setSubjects(data.data?.subjects || []);
    } catch {
      setSubjects([]);
    }
  };

  useEffect(() => {
    fetchLectures();
    fetchSubjects();
  }, []);

  const getEmbedUrl = (url) => {
    if (!url) return "";
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length === 11) {
      return `https://www.youtube.com/embed/${match[2]}?autoplay=1`;
    }
    return url;
  };

  const handleCreateLecture = async (e) => {
    e.preventDefault();
    if (!form.subject) {
      toast.error("Please select a subject");
      return;
    }
    setSavingLecture(true);
    try {
      await api.post("/lectures", {
        ...form,
        duration: Number(form.duration || 45),
      });
      toast.success("Lecture published successfully");
      setShowAdd(false);
      setForm({
        title: "",
        subject: subjects[0]?._id || "",
        videoUrl: "",
        thumbnailUrl: "",
        duration: 45,
        description: "",
      });
      fetchLectures();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to publish lecture");
    } finally {
      setSavingLecture(false);
    }
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    if (!editingLecture) return;
    setSavingLecture(true);
    try {
      await api.put(`/lectures/${editingLecture._id}`, {
        title: editingLecture.title,
        subject: editingLecture.subject?._id || editingLecture.subject,
        videoUrl: editingLecture.videoUrl,
        thumbnailUrl: editingLecture.thumbnailUrl,
        duration: Number(editingLecture.duration || 45),
        description: editingLecture.description,
      });
      toast.success("Lecture updated successfully");
      setEditingLecture(null);
      fetchLectures();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update lecture");
    } finally {
      setSavingLecture(false);
    }
  };

  const confirmDeleteLecture = async () => {
    if (!lectureToDelete) return;
    try {
      await api.delete(`/lectures/${lectureToDelete._id}`);
      toast.success("Lecture removed");
      setLectureToDelete(null);
      fetchLectures();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete lecture");
    }
  };

  const filtered = lectures.filter((l) => {
    const matchSearch =
      l.title?.toLowerCase().includes(search.toLowerCase()) ||
      l.subject?.name?.toLowerCase().includes(search.toLowerCase()) ||
      (typeof l.subject === "string" && l.subject.toLowerCase().includes(search.toLowerCase()));
    const matchSubject =
      subjectFilter === "All" ||
      l.subject?._id === subjectFilter ||
      l.subject === subjectFilter;
    return matchSearch && matchSubject;
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-extrabold text-2xl text-slate-900">Classes & Lectures</h1>
          <p className="text-slate-500 text-sm mt-1">Add YouTube or Google Drive lecture links for students</p>
        </div>
        <button
          onClick={() => {
            if (!form.subject && subjects.length > 0) {
              setForm((prev) => ({ ...prev, subject: subjects[0]._id }));
            }
            setShowAdd(true);
          }}
          className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2.5 rounded-xl transition shadow-sm text-sm"
        >
          <Plus className="w-4 h-4" /> Add Lecture
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search lectures by title or topic..."
            className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition bg-white"
          />
        </div>
        <select
          value={subjectFilter}
          onChange={(e) => setSubjectFilter(e.target.value)}
          className="px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 bg-white"
        >
          <option value="All">All Subjects</option>
          {subjects.map((s) => (
            <option key={s._id} value={s._id}>{s.name}</option>
          ))}
        </select>
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
                <div
                  onClick={() => setPlayingLecture(l)}
                  className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/20 transition cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 text-slate-900 ml-0.5" />
                  </div>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="font-bold text-slate-800 text-base line-clamp-1">{l.title}</h3>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <button
                      onClick={() => setEditingLecture(l)}
                      className="p-1 text-slate-400 hover:text-indigo-600 rounded transition"
                      title="Edit Lecture"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setLectureToDelete(l)}
                      className="p-1 text-slate-400 hover:text-red-500 rounded transition"
                      title="Delete Lecture"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <p className="text-xs text-slate-500 mb-3">{l.subject?.name || l.subject || "General"}</p>
                <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-50">
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {l.duration ? `${l.duration} min` : "—"}</span>
                  <button
                    onClick={() => setPlayingLecture(l)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-green-600 hover:text-green-700"
                  >
                    Watch Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Lecture Modal */}
      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white rounded-t-2xl z-10">
              <div>
                <h2 className="font-extrabold text-xl text-slate-900">Add New Lecture</h2>
                <p className="text-slate-500 text-xs mt-0.5">Embed video lectures for your assigned subjects.</p>
              </div>
              <button
                onClick={() => setShowAdd(false)}
                className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreateLecture} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Lecture Title *</label>
                <input
                  required
                  value={form.title}
                  onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g. Chemical Bonding – Molecular Orbital Theory"
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Subject *</label>
                  <select
                    required
                    value={form.subject}
                    onChange={(e) => setForm((prev) => ({ ...prev, subject: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition bg-white"
                  >
                    <option value="">Select subject</option>
                    {subjects.map((s) => (
                      <option key={s._id} value={s._id}>{s.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Duration (Minutes)</label>
                  <input
                    type="number"
                    min="1"
                    value={form.duration}
                    onChange={(e) => setForm((prev) => ({ ...prev, duration: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Video URL (YouTube / Drive) *</label>
                <input
                  required
                  type="url"
                  value={form.videoUrl}
                  onChange={(e) => setForm((prev) => ({ ...prev, videoUrl: e.target.value }))}
                  placeholder="https://www.youtube.com/watch?v=... or Drive video link"
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Thumbnail Image URL (optional)</label>
                <input
                  type="url"
                  value={form.thumbnailUrl}
                  onChange={(e) => setForm((prev) => ({ ...prev, thumbnailUrl: e.target.value }))}
                  placeholder="https://images.unsplash.com/... or thumbnail URL"
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Description (optional)</label>
                <textarea
                  rows={2}
                  value={form.description}
                  onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Topics covered in this session..."
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition resize-none"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAdd(false)}
                  className="flex-1 py-2.5 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingLecture}
                  className="flex-1 py-2.5 bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white font-bold rounded-xl transition shadow-sm inline-flex items-center justify-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  {savingLecture ? "Publishing..." : "Add Lecture"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Lecture Modal */}
      {editingLecture && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white rounded-t-2xl z-10">
              <h2 className="font-extrabold text-xl text-slate-900">Edit Lecture</h2>
              <button
                onClick={() => setEditingLecture(null)}
                className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSaveEdit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Lecture Title *</label>
                <input
                  required
                  value={editingLecture.title}
                  onChange={(e) => setEditingLecture((prev) => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Subject</label>
                  <select
                    value={editingLecture.subject?._id || editingLecture.subject}
                    onChange={(e) => setEditingLecture((prev) => ({ ...prev, subject: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition bg-white"
                  >
                    {subjects.map((s) => (
                      <option key={s._id} value={s._id}>{s.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Duration (Minutes)</label>
                  <input
                    type="number"
                    value={editingLecture.duration}
                    onChange={(e) => setEditingLecture((prev) => ({ ...prev, duration: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Video URL *</label>
                <input
                  required
                  type="url"
                  value={editingLecture.videoUrl}
                  onChange={(e) => setEditingLecture((prev) => ({ ...prev, videoUrl: e.target.value }))}
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Thumbnail Image URL</label>
                <input
                  type="url"
                  value={editingLecture.thumbnailUrl || ""}
                  onChange={(e) => setEditingLecture((prev) => ({ ...prev, thumbnailUrl: e.target.value }))}
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingLecture(null)}
                  className="flex-1 py-2.5 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingLecture}
                  className="flex-1 py-2.5 bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white font-bold rounded-xl transition shadow-sm inline-flex items-center justify-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  {savingLecture ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Video Player Modal */}
      {playingLecture && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
          <div className="bg-black rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden border border-white/10">
            <div className="p-4 border-b border-white/10 flex items-center justify-between bg-zinc-900 text-white">
              <div>
                <h3 className="font-bold text-sm text-white line-clamp-1">{playingLecture.title}</h3>
                <p className="text-xs text-brand-lime mt-0.5">{playingLecture.subject?.name || "Video Lecture"}</p>
              </div>
              <button
                onClick={() => setPlayingLecture(null)}
                className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="aspect-video w-full bg-black">
              {playingLecture.videoUrl?.includes("youtube") || playingLecture.videoUrl?.includes("youtu.be") ? (
                <iframe
                  src={getEmbedUrl(playingLecture.videoUrl)}
                  title={playingLecture.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <video src={playingLecture.videoUrl} controls autoPlay className="w-full h-full" />
              )}
            </div>
            <div className="p-4 bg-zinc-900 text-xs text-gray-400 flex items-center justify-between">
              <span>Duration: {playingLecture.duration || 45} mins</span>
              <a
                href={playingLecture.videoUrl}
                target="_blank"
                rel="noreferrer"
                className="text-brand-lime hover:underline inline-flex items-center gap-1"
              >
                Open in external tab <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmModal
        isOpen={!!lectureToDelete}
        onClose={() => setLectureToDelete(null)}
        onConfirm={confirmDeleteLecture}
        title="Delete Lecture"
        message={`Are you sure you want to delete "${lectureToDelete?.title}"?`}
        confirmLabel="Delete Lecture"
        danger={true}
      />
    </div>
  );
}
