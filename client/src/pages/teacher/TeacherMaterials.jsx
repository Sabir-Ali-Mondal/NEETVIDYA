import { useState, useEffect } from "react";
import api from "../../config/api";
import {
  BookOpen, Plus, Search, Trash2, X, Save, Link as LinkIcon,
  FileText, ExternalLink, ChevronDown, ChevronRight, Layers, FolderOpen,
  AlertTriangle, Video,
} from "lucide-react";
import { alertSuccess, alertError } from "../../utils/alert";
import ConfirmModal from "../../components/shared/ConfirmModal";

export default function TeacherMaterials() {
  const [materials, setMaterials] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [batchFilter, setBatchFilter] = useState("All");
  const [materialToDelete, setMaterialToDelete] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [expanded, setExpanded] = useState({});

  // Upload flow state
  const [showUpload, setShowUpload] = useState(false);
  const [fileToUpload, setFileToUpload] = useState(null);
  const [units, setUnits] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [creatingUnit, setCreatingUnit] = useState(false);
  const [creatingChapter, setCreatingChapter] = useState(false);
  const [newUnitName, setNewUnitName] = useState("");
  const [newChapterName, setNewChapterName] = useState("");

  const [form, setForm] = useState({
    title: "",
    subject: "",
    batch: "",
    unit: "",
    chapter: "",
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

  const fetchDependencies = async () => {
    try {
      const [sRes, bRes] = await Promise.all([
        api.get("/academics/subjects"),
        api.get("/batches"),
      ]);
      setSubjects(sRes.data?.subjects || []);
      setBatches(bRes.data?.batches || []);
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    fetchMaterials();
    fetchDependencies();
  }, []);

  // Load units when the subject changes
  useEffect(() => {
    if (!form.subject) {
      setUnits([]);
      return;
    }
    api
      .get(`/academics/units?subject=${form.subject}`)
      .then(({ data }) => setUnits(data.data?.units || []))
      .catch(() => setUnits([]));
  }, [form.subject]);

  // Load chapters when the unit changes
  useEffect(() => {
    if (!form.unit) {
      setChapters([]);
      return;
    }
    api
      .get(`/academics/chapters?unit=${form.unit}`)
      .then(({ data }) => setChapters(data.data?.chapters || []))
      .catch(() => setChapters([]));
  }, [form.unit]);

  const handleCreateUnit = async () => {
    if (!newUnitName.trim() || !form.subject) {
      alertError("Enter a unit name and pick a subject first");
      return;
    }
    setCreatingUnit(true);
    try {
      const { data } = await api.post("/academics/units", {
        name: newUnitName.trim(),
        subject: form.subject,
      });
      const unit = data.data.unit;
      setUnits((prev) => (prev.find((u) => u._id === unit._id) ? prev : [...prev, unit]));
      setForm((f) => ({ ...f, unit: unit._id, chapter: "" }));
      setNewUnitName("");
      alertSuccess("Unit added");
    } catch (err) {
      alertError(err.response?.data?.message || "Failed to create unit");
    } finally {
      setCreatingUnit(false);
    }
  };

  const handleCreateChapter = async () => {
    if (!newChapterName.trim() || !form.unit) {
      alertError("Enter a chapter name and pick a unit first");
      return;
    }
    setCreatingChapter(true);
    try {
      const { data } = await api.post("/academics/chapters", {
        name: newChapterName.trim(),
        unit: form.unit,
        subject: form.subject,
      });
      const chapter = data.data.chapter;
      setChapters((prev) =>
        prev.find((c) => c._id === chapter._id) ? prev : [...prev, chapter]
      );
      setForm((f) => ({ ...f, chapter: chapter._id }));
      setNewChapterName("");
      alertSuccess("Chapter added");
    } catch (err) {
      alertError(err.response?.data?.message || "Failed to create chapter");
    } finally {
      setCreatingChapter(false);
    }
  };

  const handleCreateMaterial = async (e) => {
    e.preventDefault();
    if (!form.batch) return alertError("Please select a batch");
    if (!form.unit) return alertError("Please select or create a unit");
    if (!form.chapter) return alertError("Please select or create a chapter");
    if (!fileToUpload && !form.fileUrl.trim())
      return alertError("Provide either a file upload or an external URL");

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("title", form.title);
      if (form.subject) formData.append("subject", form.subject);
      formData.append("batch", form.batch);
      formData.append("unit", form.unit);
      formData.append("chapter", form.chapter);
      formData.append("type", form.type);
      formData.append("description", form.description);
      if (fileToUpload) formData.append("file", fileToUpload);
      else formData.append("fileUrl", form.fileUrl);

      await api.post("/materials", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alertSuccess("Material published to your batch");
      setShowUpload(false);
      setForm({ title: "", subject: "", batch: "", unit: "", chapter: "", type: "PDF", fileUrl: "", description: "" });
      setFileToUpload(null);
      fetchMaterials();
    } catch (err) {
      alertError(err.response?.data?.message || "Failed to upload material");
    } finally {
      setUploading(false);
    }
  };

  const confirmDeleteMaterial = async () => {
    if (!materialToDelete) return;
    try {
      await api.delete(`/materials/${materialToDelete._id}`);
      alertSuccess("Material deleted");
      setMaterialToDelete(null);
      fetchMaterials();
    } catch {
      alertError("Failed to delete material");
    }
  };

  // Group: Unit → Chapter → Materials
  const filtered = materials.filter((m) => {
    const matchSearch =
      m.title?.toLowerCase().includes(search.toLowerCase()) ||
      m.subject?.name?.toLowerCase().includes(search.toLowerCase());
    const matchBatch =
      batchFilter === "All" ||
      m.batch?._id === batchFilter ||
      m.batch === batchFilter;
    return matchSearch && matchBatch;
  });

  const grouped = filtered.reduce((acc, m) => {
    const unitName = m.unit?.name || "Unsorted Unit";
    const chapterName = m.chapter?.name || "Unsorted Chapter";
    acc[unitName] = acc[unitName] || {};
    acc[unitName][chapterName] = acc[unitName][chapterName] || [];
    acc[unitName][chapterName].push(m);
    return acc;
  }, {});

  const toggle = (key) => setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-extrabold text-2xl text-slate-900">Study Materials</h1>
          <p className="text-slate-500 text-sm mt-1">
            Publish notes and resources as Unit → Chapter → Material for your batches.
          </p>
        </div>
        <button
          onClick={() => setShowUpload(true)}
          className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2.5 rounded-xl transition shadow-sm text-sm"
        >
          <Plus className="w-4 h-4" /> Add Material
        </button>
      </div>

     <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title or subject..."
            className="w-full pl-10 pr-4 py-2.5 border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition bg-white"
          />
        </div>
        <select
          value={batchFilter}
          onChange={(e) => setBatchFilter(e.target.value)}
          className="px-4 py-2.5 border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 bg-white"
        >
          <option value="All">All Batches</option>
          {batches.map((b) => (
            <option key={b._id} value={b._id}>{b.name}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-40 text-slate-400">
          <div className="w-8 h-8 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white border-slate-100 rounded-2xl p-12 text-center shadow-sm">
          <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h3 className="font-bold text-slate-600 mb-1">No materials yet</h3>
          <p className="text-slate-400 text-sm">Add your first material using the button above.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {Object.entries(grouped).map(([unitName, chapters]) => (
            <div key={unitName} className="bg-white border-slate-100 rounded-2xl shadow-sm overflow-hidden">
              <button
                onClick={() => toggle(unitName)}
                className="w-full flex items-center gap-3 p-5 hover:bg-slate-50 transition text-left"
              >
                {expanded[unitName] ? (
                  <ChevronDown className="w-5 h-5 text-green-600 shrink-0" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-slate-400 shrink-0" />
                )}
                <Layers className="w-5 h-5 text-green-600 shrink-0" />
                <span className="font-bold text-slate-800">{unitName}</span>
                <span className="ml-auto text-xs text-slate-400">
                  {Object.values(chapters).flat().length} materials
                </span>
              </button>

              {expanded[unitName] && (
                <div className="border-t border-slate-50">
                  {Object.entries(chapters).map(([chapterName, items]) => (
                    <div key={chapterName} className="pl-6">
                      <div className="flex items-center gap-2 px-5 py-3 bg-slate-50/60">
                        <FolderOpen className="w-4 h-4 text-slate-400" />
                        <span className="font-semibold text-slate-600 text-sm">{chapterName}</span>
                        <span className="text-xs text-slate-400">({items.length})</span>
                      </div>
                      <div className="divide-y divide-slate-50">
                        {items.map((m) => (
                          <div key={m._id} className="flex items-center justify-between gap-4 px-5 py-3 hover:bg-slate-50 transition">
                            <div className="flex items-center gap-3 min-w-0">
                              <div className="w-9 h-9 rounded-lg bg-green-50 border-green-100 flex items-center justify-center shrink-0">
                                {m.type === "VIDEO" ? (
                                  <Video className="w-4 h-4 text-green-600" />
                                ) : (
                                  <FileText className="w-4 h-4 text-green-600" />
                                )}
                              </div>
                              <div className="min-w-0">
                                <p className="text-sm font-semibold text-slate-800 truncate">{m.title}</p>
                                <p className="text-xs text-slate-400 truncate">
                                  {m.batch?.name || "—"} · {m.type || "PDF"}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                              <a
                                href={m.fileUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-green-50 text-green-700 hover:bg-green-100 transition inline-flex items-center gap-1"
                              >
                                <ExternalLink className="w-3.5 h-3.5" /> View
                              </a>
                              <button
                                onClick={() => setMaterialToDelete(m)}
                                className="p-1.5 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Upload / add-material modal */}
      {showUpload && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="flex flex-col overflow-hidden bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[92vh]">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between shrink-0">
              <div>
                <h2 className="font-extrabold text-xl text-slate-900">Add Study Material</h2>
                <p className="text-slate-500 text-xs mt-0.5">Unit → Chapter → Material</p>
              </div>
              <button onClick={() => setShowUpload(false)} className="p-2 rounded-lg hover:bg-slate-100 text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateMaterial} className="p-6 space-y-4 overflow-y-auto flex-1">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Title *</label>
                <input
                  required
                  value={form.title}
                  onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
                  placeholder="e.g. Rotational Dynamics — Handwritten Notes"
                  className="w-full px-3 py-2.5 border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Batch / Course *</label>
                  <select
                    required
                    value={form.batch}
                    onChange={(e) => setForm((p) => ({ ...p, batch: e.target.value }))}
                    className="w-full px-3 py-2.5 border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 bg-white"
                  >
                    <option value="">Select batch</option>
                    {batches.map((b) => (
                      <option key={b._id} value={b._id}>{b.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Subject</label>
                  <select
                    value={form.subject}
                    onChange={(e) => setForm((p) => ({ ...p, subject: e.target.value, unit: "", chapter: "" }))}
                    className="w-full px-3 py-2.5 border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 bg-white"
                  >
                    <option value="">Select subject</option>
                    {subjects.map((s) => (
                      <option key={s._id} value={s._id}>{s.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Unit step */}
              <div className="border border-slate-100 rounded-xl p-4 bg-slate-50/60">
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-2">
                  1 · Unit * {!form.subject && <span className="text-slate-400 normal-case">(pick a subject first)</span>}
                </label>
                <div className="flex gap-2">
                  <select
                    value={form.unit}
                    onChange={(e) => setForm((p) => ({ ...p, unit: e.target.value, chapter: "" }))}
                    disabled={!form.subject}
                    className="flex-1 px-3 py-2.5 border-slate-200 rounded-xl text-sm bg-white disabled:bg-slate-100"
                  >
                    <option value="">Select existing unit</option>
                    {units.map((u) => (
                      <option key={u._id} value={u._id}>{u.name}</option>
                    ))}
                  </select>
                </div>
                <div className="flex gap-2 mt-2">
                  <input
                    value={newUnitName}
                    onChange={(e) => setNewUnitName(e.target.value)}
                    placeholder="Or type a new unit name"
                    disabled={!form.subject}
                    className="flex-1 px-3 py-2.5 border-slate-200 rounded-xl text-sm disabled:bg-slate-100"
                  />
                  <button
                    type="button"
                    onClick={handleCreateUnit}
                    disabled={creatingUnit || !form.subject || !newUnitName.trim()}
                    className="px-4 py-2.5 bg-white border-slate-200 hover:bg-slate-50 disabled:opacity-50 text-slate-700 text-sm font-semibold rounded-xl inline-flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Unit
                  </button>
                </div>
              </div>

              {/* Chapter step */}
              <div className="border border-slate-100 rounded-xl p-4 bg-slate-50/60">
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-2">
                  2 · Chapter * {!form.unit && <span className="text-slate-400 normal-case">(pick a unit first)</span>}
                </label>
                <select
                  value={form.chapter}
                  onChange={(e) => setForm((p) => ({ ...p, chapter: e.target.value }))}
                  disabled={!form.unit}
                  className="w-full px-3 py-2.5 border-slate-200 rounded-xl text-sm bg-white disabled:bg-slate-100"
                >
                  <option value="">Select existing chapter</option>
                  {chapters.map((c) => (
                    <option key={c._id} value={c._id}>{c.name}</option>
                  ))}
                </select>
                <div className="flex gap-2 mt-2">
                  <input
                    value={newChapterName}
                    onChange={(e) => setNewChapterName(e.target.value)}
                    placeholder="Or type a new chapter name"
                    disabled={!form.unit}
                    className="flex-1 px-3 py-2.5 border-slate-200 rounded-xl text-sm disabled:bg-slate-100"
                  />
                  <button
                    type="button"
                    onClick={handleCreateChapter}
                    disabled={creatingChapter || !form.unit || !newChapterName.trim()}
                    className="px-4 py-2.5 bg-white border-slate-200 hover:bg-slate-50 disabled:opacity-50 text-slate-700 text-sm font-semibold rounded-xl inline-flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Chapter
                  </button>
                </div>
              </div>

              {/* Material step */}
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">3 · Material Type</label>
                <select
                  value={form.type}
                  onChange={(e) => setForm((p) => ({ ...p, type: e.target.value }))}
                  className="w-full px-3 py-2.5 border-slate-200 rounded-xl text-sm bg-white"
                >
                  <option value="PDF">PDF Document</option>
                  <option value="DOC">Word Document</option>
                  <option value="PPT">Presentation (PPT)</option>
                  <option value="IMAGE">Image / Diagram</option>
                  <option value="VIDEO">Video Lecture</option>
                  <option value="LINK">External Link / Resource</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">
                  File Source (External link preferred, or upload to Cloudinary)
                </label>
                {/* Storage-conscious guidance: links cost the platform nothing. */}
                <div className="mb-2 flex gap-2 bg-amber-50 border-amber-100 rounded-xl p-3 text-xs text-amber-800">
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>
                    Please prefer a <strong>Google Drive / YouTube / external link</strong> over a direct upload.
                    Videos uploaded directly consume a lot of storage and bandwidth — use links whenever possible.
                  </span>
                </div>
                <div className="space-y-3">
                  <div className="border border-dashed border-slate-300 rounded-xl p-4 text-center hover:bg-slate-50 transition">
                    <input
                      type="file"
                      accept={form.type === "VIDEO" ? "video/*" : form.type === "IMAGE" ? "image/*" : undefined}
                      onChange={(e) => setFileToUpload(e.target.files[0] || null)}
                      className="text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100 cursor-pointer"
                    />
                    {fileToUpload && (
                      <div className="text-xs font-semibold text-green-600 mt-2">
                        Selected: {fileToUpload.name} ({(fileToUpload.size / (1024 * 1024)).toFixed(2)} MB)
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-400 font-semibold">
                    <LinkIcon className="w-3.5 h-3.5" /> OR paste an external URL (recommended)
                  </div>
                  <input
                    type="url"
                    value={form.fileUrl}
                    onChange={(e) => setForm((p) => ({ ...p, fileUrl: e.target.value }))}
                    placeholder={
                      form.type === "VIDEO"
                        ? "https://drive.google.com/file/... or https://youtu.be/..."
                        : "https://drive.google.com/... or https://example.com/notes.pdf"
                    }
                    className="w-full px-3 py-2.5 border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Description (optional)</label>
                <textarea
                  rows={2}
                  value={form.description}
                  onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
                  placeholder="Summary or chapter coverage..."
                  className="w-full px-3 py-2.5 border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition resize-none"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowUpload(false)}
                  className="flex-1 py-2.5 border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition"
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

