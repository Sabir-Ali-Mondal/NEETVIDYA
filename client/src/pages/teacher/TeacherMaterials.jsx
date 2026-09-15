import { useState, useEffect } from "react";
import api from "../../config/api";
import { BookOpen, Upload, FileText, Trash2, Plus, Search, Download, ExternalLink, X, Save, Link as LinkIcon } from "lucide-react";
import toast from "react-hot-toast";
import ConfirmModal from "../../components/shared/ConfirmModal";

export default function TeacherMaterials() {
  const [materials, setMaterials] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [subjectFilter, setSubjectFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showUpload, setShowUpload] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [materialToDelete, setMaterialToDelete] = useState(null);
  const [fileToUpload, setFileToUpload] = useState(null);

  const [form, setForm] = useState({
    title: "",
    subject: "",
    type: "PDF",
    fileUrl: "",
    description: "",
  });

  const fetchMaterials = async () => {
    try {
      const { data } = await api.get("/materials");
      setMaterials(data.data?.materials || []);
    } catch {
      setMaterials([]);
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
    fetchMaterials();
    fetchSubjects();
  }, []);

  const handleCreateMaterial = async (e) => {
    e.preventDefault();
    if (!form.subject) {
      toast.error("Please select a subject");
      return;
    }

    setUploading(true);
    let finalUrl = form.fileUrl;

    try {
      // If a local file was selected, upload it first
      if (fileToUpload) {
        const formData = new FormData();
        formData.append("file", fileToUpload);
        const { data: uploadRes } = await api.post("/upload/pdf", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        finalUrl = uploadRes.data?.url || uploadRes.data?.secure_url;
      }

      if (!finalUrl) {
        toast.error("Please provide a file or file URL");
        setUploading(false);
        return;
      }

      await api.post("/materials", {
        title: form.title,
        subject: form.subject,
        type: form.type,
        fileUrl: finalUrl,
        description: form.description,
      });

      toast.success("Study material uploaded successfully");
      setShowUpload(false);
      setForm({ title: "", subject: subjects[0]?._id || "", type: "PDF", fileUrl: "", description: "" });
      setFileToUpload(null);
      fetchMaterials();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to upload material");
    } finally {
      setUploading(false);
    }
  };

  const confirmDeleteMaterial = async () => {
    if (!materialToDelete) return;
    try {
      await api.delete(`/materials/${materialToDelete._id}`);
      toast.success("Material deleted");
      setMaterialToDelete(null);
      fetchMaterials();
    } catch {
      toast.error("Failed to delete material");
    }
  };

  const filtered = materials.filter((m) => {
    const matchSearch =
      m.title?.toLowerCase().includes(search.toLowerCase()) ||
      m.subject?.name?.toLowerCase().includes(search.toLowerCase()) ||
      (typeof m.subject === "string" && m.subject.toLowerCase().includes(search.toLowerCase()));
    const matchSubject =
      subjectFilter === "All" ||
      m.subject?._id === subjectFilter ||
      m.subject === subjectFilter;
    return matchSearch && matchSubject;
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-extrabold text-2xl text-slate-900">Study Materials</h1>
          <p className="text-slate-500 text-sm mt-1">Upload and manage PDF notes, handouts and resources</p>
        </div>
        <button
          onClick={() => {
            if (!form.subject && subjects.length > 0) {
              setForm((prev) => ({ ...prev, subject: subjects[0]._id }));
            }
            setShowUpload(true);
          }}
          className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2.5 rounded-xl transition shadow-sm text-sm"
        >
          <Plus className="w-4 h-4" /> Upload Material
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title or subject..."
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
              <p className="text-xs text-slate-500 mb-4">{m.subject?.name || m.subject || "General"}</p>
              <div className="flex gap-2">
                <a
                  href={m.fileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 text-center text-xs font-semibold py-2 rounded-lg bg-green-50 text-green-700 hover:bg-green-100 transition flex items-center justify-center gap-1"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> View
                </a>
                <button
                  onClick={() => setMaterialToDelete(m)}
                  className="text-xs font-semibold px-3 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition"
                  title="Delete Material"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload Material Modal */}
      {showUpload && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white rounded-t-2xl z-10">
              <div>
                <h2 className="font-extrabold text-xl text-slate-900">Upload Study Material</h2>
                <p className="text-slate-500 text-xs mt-0.5">Share notes, handouts, formula sheets, or DPPs with students.</p>
              </div>
              <button
                onClick={() => setShowUpload(false)}
                className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateMaterial} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Material Title *</label>
                <input
                  required
                  value={form.title}
                  onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g. Physics – Rotational Dynamics Handwritten Notes"
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
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Material Type</label>
                  <select
                    value={form.type}
                    onChange={(e) => setForm((prev) => ({ ...prev, type: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition bg-white"
                  >
                    <option value="PDF">PDF Document</option>
                    <option value="DOC">Word Document</option>
                    <option value="PPT">Presentation (PPT)</option>
                    <option value="IMAGE">Image / Diagram</option>
                  </select>
                </div>
              </div>

              {/* Upload file or enter link */}
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">
                  File Source (Upload or Enter URL)
                </label>
                <div className="space-y-3">
                  <div className="border border-dashed border-slate-300 rounded-xl p-4 text-center hover:bg-slate-50 transition">
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx,.ppt,.pptx"
                      onChange={(e) => setFileToUpload(e.target.files[0] || null)}
                      className="text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100 cursor-pointer"
                    />
                    {fileToUpload && (
                      <div className="text-xs font-semibold text-green-600 mt-2">
                        Selected: {fileToUpload.name} ({(fileToUpload.size / (1024 * 1024)).toFixed(2)} MB)
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400 font-semibold">OR Enter External URL:</span>
                  </div>
                  <input
                    type="url"
                    value={form.fileUrl}
                    onChange={(e) => setForm((prev) => ({ ...prev, fileUrl: e.target.value }))}
                    placeholder="https://drive.google.com/... or https://example.com/notes.pdf"
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Description (optional)</label>
                <textarea
                  rows={2}
                  value={form.description}
                  onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Summary or chapter coverage..."
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition resize-none"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowUpload(false)}
                  className="flex-1 py-2.5 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  className="flex-1 py-2.5 bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white font-bold rounded-xl transition shadow-sm inline-flex items-center justify-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  {uploading ? "Uploading..." : "Publish Material"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmModal
        isOpen={!!materialToDelete}
        onClose={() => setMaterialToDelete(null)}
        onConfirm={confirmDeleteMaterial}
        title="Delete Material"
        message={`Are you sure you want to remove "${materialToDelete?.title}"?`}
        confirmLabel="Delete Material"
        danger={true}
      />
    </div>
  );
}
