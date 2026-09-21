import { useState, useEffect } from "react";
import api from "../../config/api";
import {
  BookOpen,
  Plus,
  Search,
  Trash2,
  X,
  Save,
  Link as LinkIcon,
  FileText,
  ExternalLink,
  ChevronDown,
  ChevronRight,
  Layers,
  FolderOpen,
  Pencil,
  Check,
  Users,
  AlertTriangle,
  Video,
  FileImage,
  Presentation,
  File,
  Upload,
  Sparkles,
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

  const [showUpload, setShowUpload] = useState(false);
  const [fileToUpload, setFileToUpload] = useState(null);
  const [units, setUnits] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [creatingUnit, setCreatingUnit] = useState(false);
  const [creatingChapter, setCreatingChapter] = useState(false);
  const [newUnitName, setNewUnitName] = useState("");
  const [newChapterName, setNewChapterName] = useState("");

  // Inline rename + delete for the academic structure (fix typos, remove wrong nodes).
  const [editingUnitId, setEditingUnitId] = useState(null);
  const [editingUnitName, setEditingUnitName] = useState("");
  const [editingChapterId, setEditingChapterId] = useState(null);
  const [editingChapterName, setEditingChapterName] = useState("");
  const [unitToDelete, setUnitToDelete] = useState(null);
  const [chapterToDelete, setChapterToDelete] = useState(null);

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

  // "Other" → teacher types a custom subject that is persisted for next time.
  const [customSubjectMode, setCustomSubjectMode] = useState(false);
  const [customSubjectName, setCustomSubjectName] = useState("");

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

      setSubjects(sRes.data?.data?.subjects || []);
      setBatches(bRes.data?.data?.batches || []);
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    fetchMaterials();
    fetchDependencies();
  }, []);

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

      setUnits((prev) =>
        prev.find((u) => u._id === unit._id) ? prev : [...prev, unit]
      );

      setForm((f) => ({
        ...f,
        unit: unit._id,
        chapter: "",
      }));

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
        prev.find((c) => c._id === chapter._id)
          ? prev
          : [...prev, chapter]
      );

      setForm((f) => ({
        ...f,
        chapter: chapter._id,
      }));

      setNewChapterName("");
      alertSuccess("Chapter added");
    } catch (err) {
      alertError(
        err.response?.data?.message || "Failed to create chapter"
      );
    } finally {
      setCreatingChapter(false);
    }
  };

  // ── Rename / delete academic nodes ─────────────────────────
  const handleRenameUnit = async (unit) => {
    if (!editingUnitName.trim()) {
      alertError("Unit name cannot be empty");
      return;
    }
    try {
      const { data } = await api.put(`/academics/units/${unit._id}`, {
        name: editingUnitName.trim(),
      });
      const updated = data.data.unit;
      setUnits((prev) =>
        prev.map((u) => (u._id === unit._id ? { ...u, name: updated.name } : u))
      );
      setEditingUnitId(null);
      setEditingUnitName("");
      alertSuccess("Unit renamed");
    } catch (err) {
      alertError(err.response?.data?.message || "Failed to rename unit");
    }
  };

  const handleDeleteUnit = async () => {
    if (!unitToDelete) return;
    try {
      await api.delete(`/academics/units/${unitToDelete._id}`);
      setUnits((prev) => prev.filter((u) => u._id !== unitToDelete._id));
      if (form.unit === unitToDelete._id) {
        setForm((f) => ({ ...f, unit: "", chapter: "" }));
      }
      alertSuccess("Unit deleted");
    } catch (err) {
      alertError(err.response?.data?.message || "Failed to delete unit");
    } finally {
      setUnitToDelete(null);
    }
  };

  const handleRenameChapter = async (chapter) => {
    if (!editingChapterName.trim()) {
      alertError("Chapter name cannot be empty");
      return;
    }
    try {
      const { data } = await api.put(`/academics/chapters/${chapter._id}`, {
        name: editingChapterName.trim(),
      });
      const updated = data.data.chapter;
      setChapters((prev) =>
        prev.map((c) =>
          c._id === chapter._id ? { ...c, name: updated.name } : c
        )
      );
      setEditingChapterId(null);
      setEditingChapterName("");
      alertSuccess("Chapter renamed");
    } catch (err) {
      alertError(err.response?.data?.message || "Failed to rename chapter");
    }
  };

  const handleDeleteChapter = async () => {
    if (!chapterToDelete) return;
    try {
      await api.delete(`/academics/chapters/${chapterToDelete._id}`);
      setChapters((prev) => prev.filter((c) => c._id !== chapterToDelete._id));
      if (form.chapter === chapterToDelete._id) {
        setForm((f) => ({ ...f, chapter: "" }));
      }
      alertSuccess("Chapter deleted");
    } catch (err) {
      alertError(err.response?.data?.message || "Failed to delete chapter");
    } finally {
      setChapterToDelete(null);
    }
  };

  const handleCreateMaterial = async (e) => {
    e.preventDefault();

    if (!form.batch) return alertError("Please select a batch");
    if (!form.unit) return alertError("Please select or create a unit");
    if (!form.chapter)
      return alertError("Please select or create a chapter");

    if (customSubjectMode && !customSubjectName.trim()) {
      return alertError("Enter the custom subject name");
    }

    if (!fileToUpload && !form.fileUrl.trim()) {
      return alertError(
        "Provide either a file upload or an external URL"
      );
    }

    setUploading(true);

    try {
      // "Other" → create the custom subject first so it is saved for next time.
      let subjectId = form.subject;
      if (customSubjectMode && customSubjectName.trim()) {
        const { data: subjectData } = await api.post("/academics/subjects", {
          name: customSubjectName.trim(),
        });
        const created = subjectData.data.subject;
        subjectId = created._id;
        setSubjects((prev) =>
          prev.find((s) => s._id === created._id) ? prev : [...prev, created]
        );
      }

      const formData = new FormData();

      formData.append("title", form.title);
      if (subjectId) formData.append("subject", subjectId);
      formData.append("batch", form.batch);
      formData.append("unit", form.unit);
      formData.append("chapter", form.chapter);
      formData.append("type", form.type);
      formData.append("description", form.description);

      if (fileToUpload) {
        formData.append("file", fileToUpload);
      } else {
        formData.append("fileUrl", form.fileUrl);
      }

      await api.post("/materials", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alertSuccess("Material published to your batch");

      setShowUpload(false);

      setForm({
        title: "",
        subject: "",
        batch: "",
        unit: "",
        chapter: "",
        type: "PDF",
        fileUrl: "",
        description: "",
      });

      setFileToUpload(null);
      setCustomSubjectMode(false);
      setCustomSubjectName("");
      fetchMaterials();
    } catch (err) {
      alertError(
        err.response?.data?.message || "Failed to upload material"
      );
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

  const filtered = materials.filter((m) => {
    const query = search.toLowerCase();

    const matchSearch =
      m.title?.toLowerCase().includes(query) ||
      m.subject?.name?.toLowerCase().includes(query);

    const matchBatch =
      batchFilter === "All" ||
      m.batch?._id === batchFilter ||
      m.batch === batchFilter;

    return matchSearch && matchBatch;
  });

  // Nested grouping: batch → subject → unit → chapter → materials.
  // Keyed by id at every level so identically-named nodes from different
  // batches never merge together.
  const grouped = filtered.reduce((batches, m) => {
    const bKey = m.batch?._id || "unassigned";
    if (!batches[bKey]) {
      batches[bKey] = {
        batch: m.batch || null,
        subjects: {},
      };
    }
    const batchNode = batches[bKey];

    const sKey = m.subject?._id || "unassigned";
    if (!batchNode.subjects[sKey]) {
      batchNode.subjects[sKey] = {
        subject: m.subject || null,
        units: {},
      };
    }
    const subjectNode = batchNode.subjects[sKey];

    const unit = m.unit || {};
    const uKey = unit._id || `name:${unit.name || "Unsorted Unit"}`;
    if (!subjectNode.units[uKey]) {
      subjectNode.units[uKey] = {
        unit,
        chapters: {},
      };
    }
    const unitNode = subjectNode.units[uKey];

    const chapter = m.chapter || {};
    const cKey = chapter._id || `name:${chapter.name || "Unsorted Chapter"}`;
    if (!unitNode.chapters[cKey]) {
      unitNode.chapters[cKey] = {
        chapter,
        materials: [],
      };
    }
    unitNode.chapters[cKey].materials.push(m);

    return batches;
  }, {});

  const toggle = (key) => {
    setExpanded((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const getTypeIcon = (type) => {
    if (type === "VIDEO") return Video;
    if (type === "IMAGE") return FileImage;
    if (type === "PPT") return Presentation;
    if (type === "LINK") return LinkIcon;
    if (type === "DOC") return File;
    return FileText;
  };

  const getTypeLabel = (type) => {
    const labels = {
      PDF: "PDF",
      DOC: "DOC",
      PPT: "PPT",
      IMAGE: "IMAGE",
      VIDEO: "VIDEO",
      LINK: "LINK",
    };

    return labels[type] || "PDF";
  };

  const totalMaterials = filtered.length;
  const totalUnits = Object.keys(grouped).length;
  const totalChapters = Object.values(grouped).reduce(
    (sum, chapters) => sum + Object.keys(chapters).length,
    0
  );

  return (
    <div className="relative min-h-full overflow-hidden bg-brand-soft">
      {/* Decorative background */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-green-200/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-32 h-96 w-96 rounded-full bg-lime-200/30 blur-3xl" />

      <div className="relative space-y-5 p-3 sm:space-y-6 sm:p-5 lg:p-7">
        {/* Header */}
        <section className="overflow-hidden rounded-[2rem] border border-white/70 bg-white/80 p-5 shadow-xl shadow-slate-900/5 backdrop-blur-xl sm:p-7">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="min-w-0">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-green-100 bg-green-50/80 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.16em] text-brand-green">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
                Faculty Resources
              </div>

              <h1 className="font-heading text-2xl font-extrabold tracking-tight text-brand-dark sm:text-3xl">
                Study Materials
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                Publish notes and resources for your batches through a
                structured Unit → Chapter → Material library.
              </p>
            </div>

            <button
              onClick={() => setShowUpload(true)}
              className="inline-flex min-h-11 w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-brand-green px-5 py-3 text-sm font-bold text-white shadow-lg shadow-green-900/10 transition hover:-translate-y-0.5 hover:bg-green-700 sm:w-auto"
            >
              <Plus className="h-4 w-4" />
              Add Material
            </button>
          </div>

          {/* Quick stats */}
          <div className="mt-6 grid grid-cols-3 gap-2 sm:max-w-xl sm:gap-3">
            <div className="min-w-0 rounded-2xl border border-slate-100 bg-slate-50/80 p-3 sm:p-4">
              <div className="flex items-center gap-2 text-slate-400">
                <FileText className="h-4 w-4 shrink-0" />
                <span className="truncate text-[10px] font-bold uppercase tracking-wider">
                  Materials
                </span>
              </div>
              <p className="mt-2 text-xl font-extrabold text-slate-800 sm:text-2xl">
                {totalMaterials}
              </p>
            </div>

            <div className="min-w-0 rounded-2xl border border-slate-100 bg-slate-50/80 p-3 sm:p-4">
              <div className="flex items-center gap-2 text-slate-400">
                <Layers className="h-4 w-4 shrink-0" />
                <span className="truncate text-[10px] font-bold uppercase tracking-wider">
                  Units
                </span>
              </div>
              <p className="mt-2 text-xl font-extrabold text-slate-800 sm:text-2xl">
                {totalUnits}
              </p>
            </div>

            <div className="min-w-0 rounded-2xl border border-slate-100 bg-slate-50/80 p-3 sm:p-4">
              <div className="flex items-center gap-2 text-slate-400">
                <FolderOpen className="h-4 w-4 shrink-0" />
                <span className="truncate text-[10px] font-bold uppercase tracking-wider">
                  Chapters
                </span>
              </div>
              <p className="mt-2 text-xl font-extrabold text-slate-800 sm:text-2xl">
                {totalChapters}
              </p>
            </div>
          </div>
        </section>

        {/* Filters */}
        <section className="rounded-[1.5rem] border border-slate-100 bg-white p-3 shadow-sm sm:p-4">
          <div className="flex min-w-0 flex-col gap-3 sm:flex-row">
            <div className="relative min-w-0 flex-1">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by title or subject..."
                className="min-h-11 w-full rounded-xl border border-slate-200 bg-slate-50/60 pl-10 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-500/10"
              />
            </div>

            <select
              value={batchFilter}
              onChange={(e) => setBatchFilter(e.target.value)}
              className="min-h-11 w-full min-w-0 rounded-xl border border-slate-200 bg-slate-50/60 px-4 text-sm text-slate-700 outline-none transition focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-500/10 sm:w-auto sm:min-w-[190px]"
            >
              <option value="All">All Batches</option>

              {batches.map((b) => (
                <option key={b._id} value={b._id}>
                  {b.name}
                </option>
              ))}
            </select>
          </div>
        </section>

        {/* Content */}
        {loading ? (
          <div className="rounded-[1.75rem] border border-slate-100 bg-white p-10 shadow-sm sm:p-14">
            <div className="mx-auto flex max-w-sm flex-col items-center text-center">
              <div className="h-10 w-10 animate-spin rounded-full border-2 border-green-500 border-t-transparent" />
              <p className="mt-4 text-sm font-semibold text-slate-500">
                Loading study materials...
              </p>
            </div>
          </div>
        ) : filtered.length === 0 ? (
          <div className="rounded-[1.75rem] border border-slate-100 bg-white p-8 text-center shadow-sm sm:p-14">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-green-50 text-green-600">
              <BookOpen className="h-7 w-7" />
            </div>

            <h3 className="mt-5 font-heading text-lg font-extrabold text-slate-700">
              No materials found
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-400">
              {search || batchFilter !== "All"
                ? "Try changing your search or batch filter."
                : "Add your first study material using the button above."}
            </p>
          </div>
        ) : (
          <div className="min-w-0 space-y-5">
            {Object.entries(grouped).map(([batchKey, batchNode]) => {
              const batchName = batchNode.batch?.name || "Unassigned batch";
              const batchCode = batchNode.batch?.code || "";
              const subjectEntries = Object.entries(batchNode.subjects);
              const batchMaterialCount = subjectEntries.reduce(
                (sum, [, s]) =>
                  sum +
                  Object.values(s.units).reduce(
                    (uSum, u) =>
                      uSum +
                      Object.values(u.chapters).reduce(
                        (cSum, c) => cSum + c.materials.length,
                        0
                      ),
                    0
                  ),
                0
              );
              const batchExpanded = expanded[`batch:${batchKey}`] !== false;

              return (
                <section
                  key={batchKey}
                  className="min-w-0 overflow-hidden rounded-[1.75rem] border-slate-200 bg-white shadow-sm"
                >
                  {/* Batch header */}
                  <button
                    onClick={() => toggle(`batch:${batchKey}`)}
                    className="flex min-h-[72px] w-full min-w-0 items-center gap-3 bg-slate-900/95 px-4 py-4 text-left transition hover:bg-slate-900 sm:px-6"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-brand-lime">
                      {batchExpanded ? (
                        <ChevronDown className="h-5 w-5" />
                      ) : (
                        <ChevronRight className="h-5 w-5" />
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex min-w-0 flex-wrap items-center gap-2">
                        <Users className="h-4 w-4 shrink-0 text-brand-lime" />
                        <h2 className="min-w-0 truncate text-sm font-extrabold text-white sm:text-base">
                          {batchName}
                        </h2>
                        {batchCode && (
                          <span className="shrink-0 rounded-md bg-white/10 px-2 py-0.5 font-mono text-[10px] font-bold text-slate-300">
                            {batchCode}
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-[11px] text-slate-400">
                        {subjectEntries.length}{" "}
                        {subjectEntries.length === 1 ? "subject" : "subjects"} ·{" "}
                        {batchMaterialCount}{" "}
                        {batchMaterialCount === 1 ? "material" : "materials"}
                      </p>
                    </div>
                  </button>

                  {batchExpanded && (
                    <div className="space-y-4 border-t border-slate-100 bg-slate-50/40 p-3 sm:p-4">
                      {subjectEntries.map(([subjectKey, subjectNode]) => {
                        const subjectName =
                          subjectNode.subject?.name || "No subject";
                        const unitEntries = Object.entries(subjectNode.units);
                        const subjectExpanded =
                          expanded[`subj:${batchKey}:${subjectKey}`] !== false;

                        return (
                          <div
                            key={subjectKey}
                            className="min-w-0 overflow-hidden rounded-[1.25rem] border-slate-200 bg-white shadow-sm"
                          >
                            {/* Subject header */}
                            <button
                              onClick={() =>
                                toggle(`subj:${batchKey}:${subjectKey}`)
                              }
                              className="flex min-h-[52px] w-full min-w-0 items-center gap-3 px-4 py-3 text-left transition hover:bg-slate-50"
                            >
                              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                                {subjectExpanded ? (
                                  <ChevronDown className="h-4 w-4" />
                                ) : (
                                  <ChevronRight className="h-4 w-4" />
                                )}
                              </div>
                              <div className="min-w-0 flex-1">
                                <h3 className="min-w-0 truncate text-sm font-extrabold text-slate-800">
                                  {subjectName}
                                </h3>
                                <p className="mt-0.5 text-[10px] text-slate-400">
                                  {unitEntries.length}{" "}
                                  {unitEntries.length === 1 ? "unit" : "units"}
                                </p>
                              </div>
                            </button>

                            {subjectExpanded && (
                              <div className="space-y-3 border-t border-slate-100 p-3">
                                {unitEntries.map(([unitKey, unitNode]) => {
                                  const chapterEntries = Object.entries(
                                    unitNode.chapters
                                  );
                                  return (
                                    <div
                                      key={unitKey}
                                      className="min-w-0 overflow-hidden rounded-xl border-slate-100 bg-slate-50/60"
                                    >
                                      {/* Unit header */}
                                      <div className="flex min-w-0 items-center gap-2 px-3.5 py-3">
                                        <Layers className="h-4 w-4 shrink-0 text-brand-green" />
                                        <span className="min-w-0 truncate text-xs font-extrabold text-slate-700 sm:text-sm">
                                          {unitNode.unit?.name || "Unsorted Unit"}
                                        </span>
                                        <span className="ml-auto shrink-0 rounded-full bg-white px-2.5 py-0.5 text-[10px] font-bold text-slate-500">
                                          {chapterEntries.length}{" "}
                                          {chapterEntries.length === 1
                                            ? "chapter"
                                            : "chapters"}
                                        </span>
                                      </div>

                                      {chapterEntries.map(
                                        ([chapterKey, chapterNode]) => (
                                          <div
                                            key={chapterKey}
                                            className="min-w-0 border-t border-slate-100 bg-white"
                                          >
                                            {/* Chapter header */}
                                            <div className="flex min-w-0 items-center gap-2 bg-slate-50/70 px-3.5 py-2.5">
                                              <FolderOpen className="h-4 w-4 shrink-0 text-slate-400" />
                                              <span className="min-w-0 truncate text-xs font-bold text-slate-600">
                                                {chapterNode.chapter?.name ||
                                                  "Unsorted Chapter"}
                                              </span>
                                              <span className="ml-auto shrink-0 text-[10px] font-semibold text-slate-400">
                                                {chapterNode.materials.length}
                                              </span>
                                            </div>

                                            {/* Materials */}
                                            <div className="divide-y divide-slate-100">
                                              {chapterNode.materials.map((m) => {
                                                const TypeIcon = getTypeIcon(
                                                  m.type
                                                );
                                                return (
                                                  <div
                                                    key={m._id}
                                                    className="min-w-0 overflow-hidden px-3.5 py-3 transition hover:bg-slate-50"
                                                  >
                                                    <div className="flex min-w-0 items-start gap-3">
                                                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border-green-100 bg-green-50 text-green-600">
                                                        <TypeIcon className="h-4 w-4" />
                                                      </div>

                                                      <div className="min-w-0 flex-1 pt-0.5">
                                                        <p className="break-words text-sm font-bold leading-5 text-slate-800">
                                                          {m.title}
                                                        </p>

                                                        <div className="mt-1.5 flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1.5 text-[10px] text-slate-400">
                                                          <span className="inline-flex max-w-full items-center gap-1 rounded-full border-blue-200 bg-blue-50 px-2 py-0.5 font-bold uppercase tracking text-blue-700">
                                                            <Users className="h-3 w-3 shrink-0" />
                                                            For: {batchName}
                                                            {batchCode
                                                              ? ` (${batchCode})`
                                                              : ""}
                                                          </span>
                                                          <span className="rounded-full bg-slate-100 px-2 py-0.5 font-bold uppercase tracking-wide text-slate-500">
                                                            {getTypeLabel(m.type)}
                                                          </span>
                                                        </div>
                                                      </div>

                                                      {/* Desktop actions */}
                                                      <div className="hidden shrink-0 items-center gap-2 sm:flex">
                                                        <a
                                                          href={m.fileUrl}
                                                          target="_blank"
                                                          rel="noreferrer"
                                                          className="inline-flex min-h-9 items-center gap-1.5 rounded-lg bg-green-50 px-3 text-xs font-bold text-green-700 transition hover:bg-green-100"
                                                        >
                                                          <ExternalLink className="h-3.5 w-3.5" />
                                                          View
                                                        </a>
                                                        <button
                                                          onClick={() =>
                                                            setMaterialToDelete(m)
                                                          }
                                                          className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-red-500 transition hover:bg-red-100"
                                                          aria-label="Delete material"
                                                        >
                                                          <Trash2 className="h-3.5 w-3.5" />
                                                        </button>
                                                      </div>
                                                    </div>

                                                    {/* Mobile actions */}
                                                    <div className="mt-3 grid-cols-[1fr_42px] gap-2 sm:hidden">
                                                      <a
                                                        href={m.fileUrl}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="inline-flex min-h-10 min-w-0 items-center justify-center gap-1.5 rounded-xl bg-green-50 px-3 text-xs font-bold text-green-700 transition hover:bg-green-100"
                                                      >
                                                        <ExternalLink className="h-3.5 w-3.5 shrink-0" />
                                                        View Material
                                                      </a>
                                                      <button
                                                        onClick={() =>
                                                          setMaterialToDelete(m)
                                                        }
                                                        className="flex h-10 w-full items-center justify-center rounded-xl bg-red-50 text-red-500 transition hover:bg-red-100"
                                                        aria-label="Delete material"
                                                      >
                                                        <Trash2 className="h-4 w-4" />
                                                      </button>
                                                    </div>
                                                  </div>
                                                );
                                              })}
                                            </div>
                                          </div>
                                        )
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </section>
              );
            })}
          </div>
        )}
      </div>

      {/* Upload modal */}
      {showUpload && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/50 p-0 backdrop-blur-sm sm:items-center sm:p-4">
          <div className="flex max-h-[94dvh] w-full min-w-0 flex-col overflow-hidden rounded-t-[1.75rem] bg-white shadow-2xl sm:max-w-2xl sm:rounded-[2rem]">
            {/* Header */}
            <div className="flex shrink-0 items-center justify-between gap-4 border-b border-slate-100 px-5 py-4 sm:px-6 sm:py-5">
              <div className="min-w-0">
                <div className="mb-1 inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-[0.15em] text-brand-green">
                  <Sparkles className="h-3 w-3" />
                  Faculty Library
                </div>

                <h2 className="truncate font-heading text-lg font-extrabold text-slate-900 sm:text-xl">
                  Add Study Material
                </h2>

                <p className="mt-0.5 text-xs text-slate-400">
                  Unit → Chapter → Material
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowUpload(false)}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Form */}
            <form
              onSubmit={handleCreateMaterial}
              className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-5 sm:px-6 sm:py-6"
            >
              <div className="space-y-5">
                {/* Basic details */}
                <div className="space-y-4">
                  <div>
                    <label className="mb-1.5 block text-[10px] font-extrabold uppercase tracking-[0.14em] text-slate-500">
                      Title *
                    </label>

                    <input
                      required
                      value={form.title}
                      onChange={(e) =>
                        setForm((p) => ({
                          ...p,
                          title: e.target.value,
                        }))
                      }
                      placeholder="e.g. Rotational Dynamics — Handwritten Notes"
                      className="min-h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-green-500 focus:ring-4 focus:ring-green-500/10"
                    />
                  </div>

                  <div className="grid min-w-0 gap-4 sm:grid-cols-2">
                    <div className="min-w-0">
                      <label className="mb-1.5 block text-[10px] font-extrabold uppercase tracking-[0.14em] text-slate-500">
                        Batch / Course *
                      </label>

                      <select
                        required
                        value={form.batch}
                        onChange={(e) =>
                          setForm((p) => ({
                            ...p,
                            batch: e.target.value,
                          }))
                        }
                        className="min-h-11 w-full min-w-0 rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-slate-700 outline-none transition focus:border-green-500 focus:ring-4 focus:ring-green-500/10"
                      >
                        <option value="">Select batch</option>

                        {batches.map((b) => (
                          <option key={b._id} value={b._id}>
                            {b.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="min-w-0">
                      <label className="mb-1.5 block text-[10px] font-extrabold uppercase tracking-[0.14em] text-slate-500">
                        Subject
                      </label>

                      <select
                        value={customSubjectMode ? "__other__" : form.subject}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (value === "__other__") {
                            setCustomSubjectMode(true);
                            setCustomSubjectName("");
                            setForm((p) => ({
                              ...p,
                              subject: "",
                              unit: "",
                              chapter: "",
                            }));
                          } else {
                            setCustomSubjectMode(false);
                            setForm((p) => ({
                              ...p,
                              subject: value,
                              unit: "",
                              chapter: "",
                            }));
                          }
                        }}
                        className="min-h-11 w-full min-w-0 rounded-xl border-slate-200 bg-white px-3.5 text-sm text-slate-700 outline-none transition focus:border-green-500 focus:ring-4 focus:ring-green-500/10"
                      >
                        <option value="">Select subject</option>

                        {subjects.map((s) => (
                          <option key={s._id} value={s._id}>
                            {s.name}
                          </option>
                        ))}

                        {!subjects.some((s) => s.name?.toLowerCase() === "other") && (
                          <option value="__other__">Other…</option>
                        )}
                      </select>

                      {customSubjectMode && (
                        <input
                          value={customSubjectName}
                          onChange={(e) => setCustomSubjectName(e.target.value)}
                          placeholder="Type the subject name"
                          className="mt-2 min-h-11 min-w-0 w-full rounded-xl border-slate-200 bg-white px-3.5 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-green-500 focus:ring-4 focus:ring-green-500/10"
                        />
                      )}
                    </div>
                  </div>
                </div>

                {/* Unit */}
                <div className="min-w-0 overflow-hidden rounded-2xl border border-slate-100 bg-slate-50/70 p-4">
                  <div className="mb-3 flex min-w-0 items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-brand-green shadow-sm">
                      <Layers className="h-4 w-4" />
                    </div>

                    <div className="min-w-0">
                      <label className="block text-xs font-extrabold text-slate-700">
                        1 · Unit *
                      </label>

                      {!form.subject && (
                        <p className="mt-0.5 text-[10px] text-slate-400">
                          Pick a subject first
                        </p>
                      )}
                    </div>
                  </div>

                  <select
                    value={form.unit}
                    onChange={(e) =>
                      setForm((p) => ({
                        ...p,
                        unit: e.target.value,
                        chapter: "",
                      }))
                    }
                    disabled={!form.subject}
                    className="min-h-11 w-full min-w-0 rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-slate-700 outline-none transition disabled:bg-slate-100 disabled:text-slate-400 focus:border-green-500 focus:ring-4 focus:ring-green-500/10"
                  >
                    <option value="">Select existing unit</option>

                    {units.map((u) => (
                      <option key={u._id} value={u._id}>
                        {u.name}
                      </option>
                    ))}
                  </select>

                  {/* Manage existing units — rename (fix typos) or delete */}
                  {units.length > 0 && (
                    <div className="mt-2 space-y-1.5">
                      {units.map((u) => (
                        <div
                          key={u._id}
                          className="flex min-w-0 items-center gap-2 rounded-lg border-slate-200 bg-white px-2.5 py-1.5"
                        >
                          {editingUnitId === u._id ? (
                            <>
                              <input
                                value={editingUnitName}
                                onChange={(e) =>
                                  setEditingUnitName(e.target.value)
                                }
                                autoFocus
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") handleRenameUnit(u);
                                  if (e.key === "Escape") setEditingUnitId(null);
                                }}
                                className="min-w-0 flex-1 rounded-md border-green-300 bg-white px-2 py-1 text-xs text-slate-700 outline-none focus:ring-2 focus:ring-green-500/20"
                              />
                              <button
                                type="button"
                                onClick={() => handleRenameUnit(u)}
                                title="Save"
                                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-green-600 transition hover:bg-green-50"
                              >
                                <Check className="h-3.5 w-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => setEditingUnitId(null)}
                                title="Cancel"
                                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-slate-400 transition hover:bg-slate-100"
                              >
                                <X className="h-3.5 w-3.5" />
                              </button>
                            </>
                          ) : (
                            <>
                              <span className="min-w-0 flex-1 truncate text-xs font-medium text-slate-600">
                                {u.name}
                              </span>
                              <button
                                type="button"
                                onClick={() => {
                                  setEditingUnitId(u._id);
                                  setEditingUnitName(u.name);
                                }}
                                title="Rename unit"
                                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                              >
                                <Pencil className="h-3.5 w-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => setUnitToDelete(u)}
                                title="Delete unit"
                                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-slate-400 transition hover:bg-red-50 hover:text-red-500"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="mt-2 flex min-w-0 flex-col gap-2 sm:flex-row">
                    <input
                      value={newUnitName}
                      onChange={(e) => setNewUnitName(e.target.value)}
                      placeholder="Or type a new unit name"
                      disabled={!form.subject}
                      className="min-h-11 min-w-0 flex-1 rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 disabled:bg-slate-100 focus:border-green-500 focus:ring-4 focus:ring-green-500/10"
                    />

                    <button
                      type="button"
                      onClick={handleCreateUnit}
                      disabled={
                        creatingUnit ||
                        !form.subject ||
                        !newUnitName.trim()
                      }
                      className="inline-flex min-h-11 shrink-0 items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      {creatingUnit ? "Adding..." : "Add Unit"}
                    </button>
                  </div>
                </div>

                {/* Chapter */}
                <div className="min-w-0 overflow-hidden rounded-2xl border border-slate-100 bg-slate-50/70 p-4">
                  <div className="mb-3 flex min-w-0 items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-brand-green shadow-sm">
                      <FolderOpen className="h-4 w-4" />
                    </div>

                    <div className="min-w-0">
                      <label className="block text-xs font-extrabold text-slate-700">
                        2 · Chapter *
                      </label>

                      {!form.unit && (
                        <p className="mt-0.5 text-[10px] text-slate-400">
                          Pick a unit first
                        </p>
                      )}
                    </div>
                  </div>

                  <select
                    value={form.chapter}
                    onChange={(e) =>
                      setForm((p) => ({
                        ...p,
                        chapter: e.target.value,
                      }))
                    }
                    disabled={!form.unit}
                    className="min-h-11 w-full min-w-0 rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-slate-700 outline-none transition disabled:bg-slate-100 disabled:text-slate-400 focus:border-green-500 focus:ring-4 focus:ring-green-500/10"
                  >
                    <option value="">Select existing chapter</option>

                    {chapters.map((c) => (
                      <option key={c._id} value={c._id}>
                        {c.name}
                      </option>
                    ))}
                  </select>

                  {/* Manage existing chapters — rename (fix typos) or delete */}
                  {chapters.length > 0 && (
                    <div className="mt-2 space-y-1.5">
                      {chapters.map((c) => (
                        <div
                          key={c._id}
                          className="flex min-w-0 items-center gap-2 rounded-lg border-slate-200 bg-white px-2.5 py-1.5"
                        >
                          {editingChapterId === c._id ? (
                            <>
                              <input
                                value={editingChapterName}
                                onChange={(e) =>
                                  setEditingChapterName(e.target.value)
                                }
                                autoFocus
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") handleRenameChapter(c);
                                  if (e.key === "Escape")
                                    setEditingChapterId(null);
                                }}
                                className="min-w-0 flex-1 rounded-md border-green-300 bg-white px-2 py-1 text-xs text-slate-700 outline-none focus:ring-2 focus:ring-green-500/20"
                              />
                              <button
                                type="button"
                                onClick={() => handleRenameChapter(c)}
                                title="Save"
                                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-green-600 transition hover:bg-green-50"
                              >
                                <Check className="h-3.5 w-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => setEditingChapterId(null)}
                                title="Cancel"
                                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-slate-400 transition hover:bg-slate-100"
                              >
                                <X className="h-3.5 w-3.5" />
                              </button>
                            </>
                          ) : (
                            <>
                              <span className="min-w-0 flex-1 truncate text-xs font-medium text-slate-600">
                                {c.name}
                              </span>
                              <button
                                type="button"
                                onClick={() => {
                                  setEditingChapterId(c._id);
                                  setEditingChapterName(c.name);
                                }}
                                title="Rename chapter"
                                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                              >
                                <Pencil className="h-3.5 w-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => setChapterToDelete(c)}
                                title="Delete chapter"
                                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-slate-400 transition hover:bg-red-50 hover:text-red-500"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="mt-2 flex min-w-0 flex-col gap-2 sm:flex-row">
                    <input
                      value={newChapterName}
                      onChange={(e) =>
                        setNewChapterName(e.target.value)
                      }
                      placeholder="Or type a new chapter name"
                      disabled={!form.unit}
                      className="min-h-11 min-w-0 flex-1 rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 disabled:bg-slate-100 focus:border-green-500 focus:ring-4 focus:ring-green-500/10"
                    />

                    <button
                      type="button"
                      onClick={handleCreateChapter}
                      disabled={
                        creatingChapter ||
                        !form.unit ||
                        !newChapterName.trim()
                      }
                      className="inline-flex min-h-11 shrink-0 items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      {creatingChapter
                        ? "Adding..."
                        : "Add Chapter"}
                    </button>
                  </div>
                </div>

                {/* Material type */}
                <div>
                  <label className="mb-1.5 block text-[10px] font-extrabold uppercase tracking-[0.14em] text-slate-500">
                    3 · Material Type
                  </label>

                  <select
                    value={form.type}
                    onChange={(e) =>
                      setForm((p) => ({
                        ...p,
                        type: e.target.value,
                      }))
                    }
                    className="min-h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-slate-700 outline-none transition focus:border-green-500 focus:ring-4 focus:ring-green-500/10"
                  >
                    <option value="PDF">PDF Document</option>
                    <option value="DOC">Word Document</option>
                    <option value="PPT">
                      Presentation (PPT)
                    </option>
                    <option value="IMAGE">Image / Diagram</option>
                    <option value="VIDEO">Video Lecture</option>
                    <option value="LINK">
                      External Link / Resource
                    </option>
                  </select>
                </div>

                {/* File source */}
                <div className="min-w-0">
                  <label className="mb-1.5 block text-[10px] font-extrabold uppercase tracking-[0.14em] text-slate-500">
                    File Source
                  </label>

                  <div className="mb-3 flex min-w-0 items-start gap-3 rounded-2xl border border-amber-100 bg-amber-50 p-3.5 text-xs leading-5 text-amber-800">
                    <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />

                    <p className="min-w-0 break-words">
                      Prefer a{" "}
                      <strong>
                        Google Drive / YouTube / external link
                      </strong>{" "}
                      over a direct upload. Videos uploaded directly
                      consume significantly more storage and bandwidth.
                    </p>
                  </div>

                  <div className="min-w-0 space-y-3">
                    <div className="min-w-0 overflow-hidden rounded-2xl border border-dashed border-slate-300 bg-slate-50/50 p-4 text-center transition hover:bg-slate-50">
                      <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-white text-slate-400 shadow-sm">
                        <Upload className="h-4 w-4" />
                      </div>

                      <p className="mt-2 text-xs font-bold text-slate-600">
                        Upload a file
                      </p>

                      <p className="mt-0.5 text-[10px] text-slate-400">
                        Optional if you are using an external URL
                      </p>

                      <input
                        type="file"
                        accept={
                          form.type === "VIDEO"
                            ? "video/*"
                            : form.type === "IMAGE"
                            ? "image/*"
                            : undefined
                        }
                        onChange={(e) =>
                          setFileToUpload(
                            e.target.files[0] || null
                          )
                        }
                        className="mt-3 block w-full min-w-0 cursor-pointer text-xs text-slate-500 file:mr-2 file:rounded-lg file:border-0 file:bg-green-50 file:px-3 file:py-1.5 file:text-xs file:font-bold file:text-green-700 hover:file:bg-green-100"
                      />

                      {fileToUpload && (
                        <div className="mt-3 min-w-0 rounded-xl bg-green-50 px-3 py-2 text-left text-xs font-semibold text-green-700">
                          <p className="break-words">
                            {fileToUpload.name}
                          </p>
                          <p className="mt-0.5 text-[10px] font-medium text-green-600">
                            {(
                              fileToUpload.size /
                              (1024 * 1024)
                            ).toFixed(2)}{" "}
                            MB
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      <span className="h-px flex-1 bg-slate-100" />
                      <span>Or use external URL</span>
                      <span className="h-px flex-1 bg-slate-100" />
                    </div>

                    <div className="relative">
                      <LinkIcon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                      <input
                        type="url"
                        value={form.fileUrl}
                        onChange={(e) =>
                          setForm((p) => ({
                            ...p,
                            fileUrl: e.target.value,
                          }))
                        }
                        placeholder={
                          form.type === "VIDEO"
                            ? "https://drive.google.com/... or https://youtu.be/..."
                            : "https://drive.google.com/... or https://example.com/notes.pdf"
                        }
                        className="min-h-11 w-full min-w-0 rounded-xl border border-slate-200 bg-white pl-10 pr-3.5 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-green-500 focus:ring-4 focus:ring-green-500/10"
                      />
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="mb-1.5 block text-[10px] font-extrabold uppercase tracking-[0.14em] text-slate-500">
                    Description
                    <span className="ml-1 normal-case tracking-normal text-slate-400">
                      (optional)
                    </span>
                  </label>

                  <textarea
                    rows={3}
                    value={form.description}
                    onChange={(e) =>
                      setForm((p) => ({
                        ...p,
                        description: e.target.value,
                      }))
                    }
                    placeholder="Summary or chapter coverage..."
                    className="w-full resize-none rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-green-500 focus:ring-4 focus:ring-green-500/10"
                  />
                </div>

                {/* Actions */}
                <div className="grid grid-cols-1 gap-2.5 pt-1 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={() => setShowUpload(false)}
                    className="hidden min-h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-600 transition hover:bg-slate-50 sm:block"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={uploading}
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-brand-green px-4 text-sm font-bold text-white shadow-lg shadow-green-900/10 transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60 sm:col-span-1"
                  >
                    <Save className="h-4 w-4" />

                    {uploading
                      ? "Uploading..."
                      : "Publish Material"}
                  </button>
                </div>
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

      <ConfirmModal
        isOpen={!!unitToDelete}
        onClose={() => setUnitToDelete(null)}
        onConfirm={handleDeleteUnit}
        title="Delete Unit"
        message={`Delete the unit "${unitToDelete?.name}"? Its chapters will be removed too.`}
        confirmLabel="Delete Unit"
        danger={true}
      />

      <ConfirmModal
        isOpen={!!chapterToDelete}
        onClose={() => setChapterToDelete(null)}
        onConfirm={handleDeleteChapter}
        title="Delete Chapter"
        message={`Delete the chapter "${chapterToDelete?.name}"?`}
        confirmLabel="Delete Chapter"
        danger={true}
      />
    </div>
  );
}