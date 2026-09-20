import { useState, useEffect } from "react";
import api from "../../config/api";
import {
  Trophy,
  Plus,
  Search,
  Star,
  Pencil,
  Trash2,
  X,
  Save,
  Sparkles,
  CalendarDays,
} from "lucide-react";
import { alertSuccess, alertError } from "../../utils/alert";
import ConfirmModal from "../../components/shared/ConfirmModal";

const categoryColors = {
  STUDENT_RESULT: "bg-emerald-50 text-emerald-700 border-emerald-100",
  INSTITUTE_MILESTONE: "bg-blue-50 text-blue-700 border-blue-100",
  AWARD: "bg-amber-50 text-amber-700 border-amber-100",
  CERTIFICATION: "bg-purple-50 text-purple-700 border-purple-100",
  EVENT: "bg-indigo-50 text-indigo-700 border-indigo-100",
  CUSTOM: "bg-slate-50 text-slate-600 border-slate-100",
};

const categoryLabels = {
  STUDENT_RESULT: "Student Result",
  INSTITUTE_MILESTONE: "Institute Milestone",
  AWARD: "Award",
  CERTIFICATION: "Certification",
  EVENT: "Event",
  CUSTOM: "Custom",
};

const inputClass =
  "w-full px-3.5 py-3 border border-slate-200 rounded-xl text-sm text-slate-800 bg-white placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-brand-green/10 focus:border-brand-green transition";

const labelClass =
  "block text-[10px] font-bold text-slate-500 uppercase tracking-[0.12em] mb-1.5";

export default function AdminAchievements() {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [creating, setCreating] = useState(false);
  const [editingAchievement, setEditingAchievement] = useState(null);
  const [savingEdit, setSavingEdit] = useState(false);
  const [achievementToDelete, setAchievementToDelete] = useState(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "STUDENT_RESULT",
    studentName: "",
    studentBatch: "",
    score: "",
    year: new Date().getFullYear(),
    featured: false,
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

  useEffect(() => {
    fetchAchievements();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    setCreating(true);

    try {
      await api.post("/achievements", form);

      alertSuccess("Achievement added successfully");

      setShowCreate(false);

      setForm({
        title: "",
        description: "",
        category: "STUDENT_RESULT",
        studentName: "",
        studentBatch: "",
        score: "",
        year: new Date().getFullYear(),
        featured: false,
      });

      fetchAchievements();
    } catch (err) {
      alertError(
        err.response?.data?.message || "Failed to add achievement"
      );
    } finally {
      setCreating(false);
    }
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();

    if (!editingAchievement) return;

    setSavingEdit(true);

    try {
      await api.put(
        `/achievements/${editingAchievement._id}`,
        editingAchievement
      );

      alertSuccess("Achievement updated");

      setEditingAchievement(null);
      fetchAchievements();
    } catch (err) {
      alertError(
        err.response?.data?.message || "Failed to update achievement"
      );
    } finally {
      setSavingEdit(false);
    }
  };

  const toggleFeatured = async (achievement) => {
    try {
      await api.put(`/achievements/${achievement._id}`, {
        featured: !achievement.featured,
      });

      alertSuccess(
        achievement.featured
          ? "Unmarked from featured"
          : "Marked as featured"
      );

      fetchAchievements();
    } catch {
      alertError("Failed to update status");
    }
  };

  const confirmDelete = async () => {
    if (!achievementToDelete) return;

    try {
      await api.delete(`/achievements/${achievementToDelete._id}`);

      alertSuccess("Achievement deleted");

      setAchievementToDelete(null);
      fetchAchievements();
    } catch {
      alertError("Failed to delete");
    }
  };

  const filtered = achievements.filter(
    (a) =>
      a.title?.toLowerCase().includes(search.toLowerCase()) ||
      a.studentName?.toLowerCase().includes(search.toLowerCase())
  );

  const featuredCount = achievements.filter((a) => a.featured).length;

  return (
    <div className="min-h-full p-4 sm:p-5 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-5 sm:space-y-6">
        {/* =====================================================
            HEADER
        ====================================================== */}
        <section className="relative overflow-hidden rounded-[1.75rem] bg-brand-black text-white border border-white/5 shadow-[0_20px_60px_-35px_rgba(0,0,0,0.6)]">
          <div className="absolute -right-20 -top-24 w-64 h-64 rounded-full bg-brand-green/20 blur-3xl pointer-events-none" />
          <div className="absolute -left-20 -bottom-32 w-72 h-72 rounded-full bg-brand-lime/10 blur-3xl pointer-events-none" />

          <div className="relative px-5 py-6 sm:px-7 sm:py-7 lg:px-8 lg:py-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="min-w-0">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.07] border border-white/10 text-brand-lime text-[10px] font-bold uppercase tracking-[0.14em]">
                  <Trophy className="w-3.5 h-3.5" />
                  Achievements
                </div>

                <h1 className="mt-4 font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl tracking-tight">
                  Celebrate the{" "}
                  <span className="text-brand-lime">milestones.</span>
                </h1>

                <p className="mt-2 max-w-2xl text-sm text-gray-400 leading-relaxed">
                  Manage student results, institute milestones, awards and
                  other achievements displayed across NEETVIDYA.
                </p>

                <div className="mt-5 flex flex-wrap items-center gap-2.5">
                  <div className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.06] border border-white/[0.08]">
                    <span className="w-2 h-2 rounded-full bg-brand-lime" />
                    <span className="text-xs font-semibold text-gray-300">
                      {achievements.length} Total
                    </span>
                  </div>

                  <div className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.06] border border-white/[0.08]">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    <span className="text-xs font-semibold text-gray-300">
                      {featuredCount} Featured
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowCreate(true)}
                className="
                  inline-flex items-center justify-center gap-2
                  w-full sm:w-auto
                  px-5 py-3
                  rounded-xl
                  bg-brand-lime
                  text-brand-black
                  text-sm font-bold
                  shadow-[0_10px_30px_-10px_rgba(190,255,0,0.45)]
                  hover:brightness-105
                  active:scale-[0.98]
                  transition
                  shrink-0
                "
              >
                <Plus className="w-4 h-4" />
                Add Achievement
              </button>
            </div>
          </div>
        </section>

        {/* =====================================================
            SEARCH
        ====================================================== */}
        <section className="bg-white rounded-2xl border border-slate-200/70 shadow-sm p-3 sm:p-4">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by achievement title or student name..."
              className="
                w-full
                pl-10 pr-10
                py-3
                bg-slate-50
                border border-slate-200
                rounded-xl
                text-sm
                text-slate-800
                placeholder:text-slate-400
                focus:outline-none
                focus:bg-white
                focus:ring-4
                focus:ring-brand-green/10
                focus:border-brand-green
                transition
              "
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="
                  absolute right-2.5 top-1/2 -translate-y-1/2
                  w-7 h-7
                  rounded-lg
                  flex items-center justify-center
                  text-slate-400
                  hover:bg-slate-200
                  hover:text-slate-700
                  transition
                "
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </section>

        {/* =====================================================
            RESULTS HEADER
        ====================================================== */}
        {!loading && (
          <div className="flex items-center justify-between gap-3 px-1">
            <div>
              <p className="text-sm font-bold text-slate-800">
                {search ? "Search Results" : "All Achievements"}
              </p>

              <p className="text-xs text-slate-400 mt-0.5">
                {filtered.length}{" "}
                {filtered.length === 1 ? "achievement" : "achievements"}
                {search ? ` matching "${search}"` : ""}
              </p>
            </div>
          </div>
        )}

        {/* =====================================================
            LOADING
        ====================================================== */}
        {loading ? (
          <div className="bg-white rounded-[1.5rem] border border-slate-200/70 shadow-sm min-h-[280px] flex flex-col items-center justify-center">
            <div className="w-10 h-10 rounded-full border-2 border-brand-green/20 border-t-brand-green animate-spin" />

            <p className="mt-4 text-sm font-semibold text-slate-600">
              Loading achievements...
            </p>

            <p className="text-xs text-slate-400 mt-1">
              Fetching your achievement records
            </p>
          </div>
        ) : filtered.length === 0 ? (
          /* =====================================================
              EMPTY STATE
          ====================================================== */
          <div className="relative overflow-hidden bg-white border border-slate-200/70 rounded-[1.75rem] shadow-sm p-8 sm:p-12 text-center">
            <div className="absolute -top-16 -right-16 w-40 h-40 bg-brand-green/5 rounded-full blur-2xl" />

            <div className="relative">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center">
                {search ? (
                  <Search className="w-7 h-7 text-slate-300" />
                ) : (
                  <Trophy className="w-7 h-7 text-slate-300" />
                )}
              </div>

              <h3 className="mt-5 font-heading font-bold text-lg text-slate-800">
                {search
                  ? "No matching achievements"
                  : "No achievements yet"}
              </h3>

              <p className="mt-1.5 text-sm text-slate-400 max-w-md mx-auto">
                {search
                  ? "Try another title or student name."
                  : "Add your first achievement to showcase student results and institute milestones."}
              </p>

              {!search && (
                <button
                  type="button"
                  onClick={() => setShowCreate(true)}
                  className="
                    mt-6
                    inline-flex items-center gap-2
                    px-4 py-2.5
                    rounded-xl
                    bg-brand-green
                    hover:bg-green-700
                    text-white
                    text-sm font-bold
                    transition
                  "
                >
                  <Plus className="w-4 h-4" />
                  Add Achievement
                </button>
              )}
            </div>
          </div>
        ) : (
          /* =====================================================
              ACHIEVEMENT GRID
          ====================================================== */
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            {filtered.map((a) => (
              <div
                key={a._id}
                className="
                  group
                  relative
                  bg-white
                  border border-slate-200/70
                  rounded-[1.5rem]
                  p-4 sm:p-5
                  shadow-sm
                  hover:shadow-[0_18px_45px_-25px_rgba(15,23,42,0.35)]
                  hover:-translate-y-0.5
                  transition-all duration-200
                "
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  {/* Trophy */}
                  <div
                    className={`
                      w-11 h-11 sm:w-12 sm:h-12
                      rounded-2xl
                      flex items-center justify-center
                      shrink-0
                      ${
                        a.featured
                          ? "bg-gradient-to-br from-amber-400 to-orange-500 shadow-[0_8px_20px_-8px_rgba(245,158,11,0.6)]"
                          : "bg-slate-100"
                      }
                    `}
                  >
                    <Trophy
                      className={`w-5 h-5 sm:w-6 sm:h-6 ${
                        a.featured
                          ? "text-white"
                          : "text-slate-400"
                      }`}
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    {/* Tags */}
                    <div className="flex items-center gap-1.5 flex-wrap pr-1">
                      <span
                        className={`
                          inline-flex items-center
                          px-2.5 py-1
                          rounded-full
                          border
                          text-[9px] sm:text-[10px]
                          font-bold
                          uppercase
                          tracking-wide
                          ${
                            categoryColors[a.category] ||
                            "bg-slate-50 text-slate-600 border-slate-100"
                          }
                        `}
                      >
                        {categoryLabels[a.category] ||
                          a.category?.replace(/_/g, " ")}
                      </span>

                      {a.year && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-slate-400">
                          <CalendarDays className="w-3 h-3" />
                          {a.year}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="mt-2 font-heading font-bold text-[15px] sm:text-base text-slate-800 leading-snug break-words">
                      {a.title}
                    </h3>

                    {/* Description */}
                    {a.description && (
                      <p className="mt-1.5 text-xs sm:text-sm text-slate-500 leading-relaxed line-clamp-2">
                        {a.description}
                      </p>
                    )}

                    {/* Student information */}
                    {a.studentName && (
                      <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1.5 text-xs">
                        <span className="font-bold text-slate-700">
                          {a.studentName}
                        </span>

                        {a.studentBatch && (
                          <>
                            <span className="text-slate-300">•</span>
                            <span className="text-slate-500">
                              {a.studentBatch}
                            </span>
                          </>
                        )}

                        {a.score && (
                          <>
                            <span className="text-slate-300">•</span>
                            <span className="font-bold text-brand-green">
                              Score: {a.score}
                            </span>
                          </>
                        )}
                      </div>
                    )}

                    {/* Mobile actions */}
                    <div className="mt-4 flex items-center gap-2 sm:hidden">
                      <button
                        type="button"
                        onClick={() => toggleFeatured(a)}
                        className={`
                          inline-flex items-center gap-1.5
                          px-3 py-2
                          rounded-xl
                          text-[10px]
                          font-bold
                          transition
                          ${
                            a.featured
                              ? "bg-amber-50 text-amber-700 border border-amber-100"
                              : "bg-slate-50 text-slate-500 border border-slate-100"
                          }
                        `}
                      >
                        <Star
                          className={`w-3.5 h-3.5 ${
                            a.featured
                              ? "fill-amber-500 text-amber-500"
                              : ""
                          }`}
                        />

                        {a.featured ? "Featured" : "Set Featured"}
                      </button>

                      <button
                        type="button"
                        onClick={() => setEditingAchievement(a)}
                        className="
                          w-9 h-9
                          rounded-xl
                          border border-slate-200
                          flex items-center justify-center
                          text-slate-500
                          hover:text-indigo-600
                          hover:bg-indigo-50
                          transition
                        "
                        title="Edit Achievement"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={() => setAchievementToDelete(a)}
                        className="
                          w-9 h-9
                          rounded-xl
                          border border-slate-200
                          flex items-center justify-center
                          text-red-500
                          hover:bg-red-50
                          transition
                        "
                        title="Delete Achievement"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Desktop Actions */}
                  <div
                    className="
                      hidden sm:flex
                      flex-col
                      items-end
                      gap-2
                      shrink-0
                    "
                  >
                    <button
                      type="button"
                      onClick={() => toggleFeatured(a)}
                      className={`
                        inline-flex items-center gap-1.5
                        px-2.5 py-1.5
                        rounded-lg
                        text-[10px]
                        font-bold
                        transition
                        ${
                          a.featured
                            ? "bg-amber-50 text-amber-700 border border-amber-100"
                            : "bg-slate-50 text-slate-500 border border-slate-100 hover:bg-slate-100"
                        }
                      `}
                      title="Toggle Featured"
                    >
                      <Star
                        className={`w-3 h-3 ${
                          a.featured
                            ? "fill-amber-500 text-amber-500"
                            : ""
                        }`}
                      />

                      {a.featured ? "Featured" : "Set Featured"}
                    </button>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => setEditingAchievement(a)}
                        className="
                          w-8 h-8
                          rounded-lg
                          flex items-center justify-center
                          text-slate-400
                          hover:text-indigo-600
                          hover:bg-indigo-50
                          transition
                        "
                        title="Edit Achievement"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={() => setAchievementToDelete(a)}
                        className="
                          w-8 h-8
                          rounded-lg
                          flex items-center justify-center
                          text-red-400
                          hover:text-red-600
                          hover:bg-red-50
                          transition
                        "
                        title="Delete Achievement"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* =========================================================
          CREATE MODAL
      ========================================================== */}
      {showCreate && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div
            className="
              bg-white
              w-full
              max-w-lg
              max-h-[94dvh] sm:max-h-[90vh]
              overflow-y-auto
              rounded-t-[1.75rem] sm:rounded-[1.75rem]
              shadow-2xl
            "
          >
            {/* Modal Header */}
            <div className="sticky top-0 z-10 bg-white border-b border-slate-100 px-5 sm:px-6 py-4 sm:py-5 rounded-t-[1.75rem]">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-green/10 text-brand-green flex items-center justify-center">
                    <Trophy className="w-5 h-5" />
                  </div>

                  <div>
                    <h2 className="font-heading font-extrabold text-lg text-slate-900">
                      Add Achievement
                    </h2>

                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Add a new milestone to NEETVIDYA
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setShowCreate(false)}
                  className="
                    w-9 h-9
                    rounded-xl
                    flex items-center justify-center
                    text-slate-400
                    hover:bg-slate-100
                    hover:text-slate-700
                    transition
                  "
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <form onSubmit={handleCreate} className="p-5 sm:p-6 space-y-4">
              {/* Title */}
              <div>
                <label className={labelClass}>Title *</label>

                <input
                  required
                  value={form.title}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      title: e.target.value,
                    }))
                  }
                  className={inputClass}
                  placeholder="e.g. AIR 84 in NEET UG 2024"
                />
              </div>

              {/* Category */}
              <div>
                <label className={labelClass}>Category</label>

                <select
                  value={form.category}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      category: e.target.value,
                    }))
                  }
                  className={`${inputClass} bg-white`}
                >
                  {[
                    "STUDENT_RESULT",
                    "INSTITUTE_MILESTONE",
                    "AWARD",
                    "CERTIFICATION",
                    "EVENT",
                    "CUSTOM",
                  ].map((c) => (
                    <option key={c} value={c}>
                      {c.replace(/_/g, " ")}
                    </option>
                  ))}
                </select>
              </div>

              {/* Description */}
              <div>
                <label className={labelClass}>Description</label>

                <textarea
                  value={form.description}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      description: e.target.value,
                    }))
                  }
                  rows={3}
                  className={`${inputClass} resize-none`}
                  placeholder="Details about this achievement..."
                />
              </div>

              {/* Student Result */}
              {form.category === "STUDENT_RESULT" && (
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-brand-green" />

                    <p className="text-xs font-bold text-slate-700">
                      Student Result Details
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>Student Name</label>

                      <input
                        value={form.studentName}
                        onChange={(e) =>
                          setForm((f) => ({
                            ...f,
                            studentName: e.target.value,
                          }))
                        }
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className={labelClass}>Score</label>

                      <input
                        value={form.score}
                        onChange={(e) =>
                          setForm((f) => ({
                            ...f,
                            score: e.target.value,
                          }))
                        }
                        className={inputClass}
                        placeholder="710 / 720"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className={labelClass}>Batch</label>

                      <input
                        value={form.studentBatch}
                        onChange={(e) =>
                          setForm((f) => ({
                            ...f,
                            studentBatch: e.target.value,
                          }))
                        }
                        className={inputClass}
                        placeholder="e.g. Batch Alpha 2024"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Year + Featured */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Year</label>

                  <input
                    type="number"
                    value={form.year}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        year: parseInt(e.target.value),
                      }))
                    }
                    className={inputClass}
                  />
                </div>

                <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-50 transition">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={form.featured}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        featured: e.target.checked,
                      }))
                    }
                    className="w-4 h-4 rounded accent-green-600"
                  />

                  <span>
                    <span className="block text-xs font-bold text-slate-700">
                      Feature on homepage
                    </span>

                    <span className="block text-[10px] text-slate-400 mt-0.5">
                      Highlight this achievement
                    </span>
                  </span>
                </label>
              </div>

              {/* Buttons */}
              <div className="flex flex-col-reverse sm:flex-row gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreate(false)}
                  className="
                    flex-1
                    py-3
                    border border-slate-200
                    rounded-xl
                    text-sm font-semibold
                    text-slate-600
                    hover:bg-slate-50
                    transition
                  "
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={creating}
                  className="
                    flex-1
                    py-3
                    rounded-xl
                    bg-brand-green
                    hover:bg-green-700
                    disabled:opacity-60
                    text-white
                    text-sm font-bold
                    transition
                  "
                >
                  {creating ? "Adding..." : "Add Achievement"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================
          EDIT MODAL
      ========================================================== */}
      {editingAchievement && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div
            className="
              bg-white
              w-full
              max-w-lg
              max-h-[94dvh] sm:max-h-[90vh]
              overflow-y-auto
              rounded-t-[1.75rem] sm:rounded-[1.75rem]
              shadow-2xl
            "
          >
            {/* Header */}
            <div className="sticky top-0 z-10 bg-white border-b border-slate-100 px-5 sm:px-6 py-4 sm:py-5 rounded-t-[1.75rem]">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                    <Pencil className="w-4 h-4" />
                  </div>

                  <div>
                    <h2 className="font-heading font-extrabold text-lg text-slate-900">
                      Edit Achievement
                    </h2>

                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Update achievement details
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setEditingAchievement(null)}
                  className="
                    w-9 h-9
                    rounded-xl
                    flex items-center justify-center
                    text-slate-400
                    hover:bg-slate-100
                    hover:text-slate-700
                    transition
                  "
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <form
              onSubmit={handleSaveEdit}
              className="p-5 sm:p-6 space-y-4"
            >
              {/* Title */}
              <div>
                <label className={labelClass}>Title *</label>

                <input
                  required
                  value={editingAchievement.title || ""}
                  onChange={(e) =>
                    setEditingAchievement((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                  className={inputClass}
                />
              </div>

              {/* Category */}
              <div>
                <label className={labelClass}>Category</label>

                <select
                  value={editingAchievement.category}
                  onChange={(e) =>
                    setEditingAchievement((prev) => ({
                      ...prev,
                      category: e.target.value,
                    }))
                  }
                  className={`${inputClass} bg-white`}
                >
                  {[
                    "STUDENT_RESULT",
                    "INSTITUTE_MILESTONE",
                    "AWARD",
                    "CERTIFICATION",
                    "EVENT",
                    "CUSTOM",
                  ].map((c) => (
                    <option key={c} value={c}>
                      {c.replace(/_/g, " ")}
                    </option>
                  ))}
                </select>
              </div>

              {/* Description */}
              <div>
                <label className={labelClass}>Description</label>

                <textarea
                  rows={3}
                  value={editingAchievement.description || ""}
                  onChange={(e) =>
                    setEditingAchievement((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  className={`${inputClass} resize-none`}
                />
              </div>

              {/* Student details */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>
                      Student Name
                    </label>

                    <input
                      value={editingAchievement.studentName || ""}
                      onChange={(e) =>
                        setEditingAchievement((prev) => ({
                          ...prev,
                          studentName: e.target.value,
                        }))
                      }
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Score</label>

                    <input
                      value={editingAchievement.score || ""}
                      onChange={(e) =>
                        setEditingAchievement((prev) => ({
                          ...prev,
                          score: e.target.value,
                        }))
                      }
                      className={inputClass}
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className={labelClass}>Batch</label>

                    <input
                      value={editingAchievement.studentBatch || ""}
                      onChange={(e) =>
                        setEditingAchievement((prev) => ({
                          ...prev,
                          studentBatch: e.target.value,
                        }))
                      }
                      className={inputClass}
                    />
                  </div>
                </div>
              </div>

              {/* Year + Featured */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Year</label>

                  <input
                    type="number"
                    value={editingAchievement.year || 2024}
                    onChange={(e) =>
                      setEditingAchievement((prev) => ({
                        ...prev,
                        year:
                          parseInt(e.target.value) || 2024,
                      }))
                    }
                    className={inputClass}
                  />
                </div>

                <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-50 transition">
                  <input
                    type="checkbox"
                    id="editFeatured"
                    checked={editingAchievement.featured || false}
                    onChange={(e) =>
                      setEditingAchievement((prev) => ({
                        ...prev,
                        featured: e.target.checked,
                      }))
                    }
                    className="w-4 h-4 rounded accent-green-600"
                  />

                  <span>
                    <span className="block text-xs font-bold text-slate-700">
                      Feature on homepage
                    </span>

                    <span className="block text-[10px] text-slate-400 mt-0.5">
                      Highlight this achievement
                    </span>
                  </span>
                </label>
              </div>

              {/* Buttons */}
              <div className="flex flex-col-reverse sm:flex-row gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingAchievement(null)}
                  className="
                    flex-1
                    py-3
                    border border-slate-200
                    rounded-xl
                    text-sm font-semibold
                    text-slate-600
                    hover:bg-slate-50
                    transition
                  "
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={savingEdit}
                  className="
                    flex-1
                    py-3
                    rounded-xl
                    bg-brand-green
                    hover:bg-green-700
                    disabled:opacity-60
                    text-white
                    text-sm font-bold
                    transition
                    inline-flex
                    items-center
                    justify-center
                    gap-2
                  "
                >
                  <Save className="w-4 h-4" />
                  {savingEdit ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================
          DELETE CONFIRMATION
      ========================================================== */}
      <ConfirmModal
        isOpen={!!achievementToDelete}
        onClose={() => setAchievementToDelete(null)}
        onConfirm={confirmDelete}
        title="Delete Achievement"
        message={`Are you sure you want to delete "${achievementToDelete?.title}"?`}
        confirmLabel="Delete Achievement"
        danger={true}
      />
    </div>
  );
}