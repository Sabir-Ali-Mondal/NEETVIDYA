import { useState, useEffect } from "react";
import api from "../../config/api";
import {
  BookOpen,
  Plus,
  Search,
  IndianRupee,
  Clock,
  Users,
  ChevronRight,
  Pencil,
  Trash2,
  X,
  Save,
  CheckCircle2,
} from "lucide-react";
import { alertSuccess, alertError } from "../../utils/alert";
import ConfirmModal from "../../components/shared/ConfirmModal";

export default function AdminCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [creating, setCreating] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [savingEdit, setSavingEdit] = useState(false);
  const [viewingCourse, setViewingCourse] = useState(null);
  const [courseToDelete, setCourseToDelete] = useState(null);

  const [form, setForm] = useState({
    name: "",
    description: "",
    targetClass: "",
    duration: "",
    feeAmount: "",
    features: "",
  });

  const fetchCourses = async () => {
    try {
      const { data } = await api.get("/courses");
      setCourses(data.data?.courses || []);
    } catch {
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    setCreating(true);

    try {
      const payload = {
        ...form,
        feeAmount: Number(form.feeAmount || 0),
        features: form.features
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
      };

      await api.post("/courses", payload);

      alertSuccess("Course created successfully");

      setShowCreate(false);

      setForm({
        name: "",
        description: "",
        targetClass: "",
        duration: "",
        feeAmount: "",
        features: "",
      });

      fetchCourses();
    } catch (err) {
      alertError(
        err.response?.data?.message ||
          "Failed to create course"
      );
    } finally {
      setCreating(false);
    }
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();

    if (!editingCourse) return;

    setSavingEdit(true);

    try {
      const payload = {
        name: editingCourse.name,
        description: editingCourse.description,
        targetClass: editingCourse.targetClass,
        duration: editingCourse.duration,
        feeAmount: Number(editingCourse.feeAmount || 0),
        isActive: editingCourse.isActive,
        features: Array.isArray(editingCourse.features)
          ? editingCourse.features
          : String(editingCourse.features || "")
              .split(",")
              .map((i) => i.trim())
              .filter(Boolean),
      };

      await api.put(`/courses/${editingCourse._id}`, payload);

      alertSuccess("Course updated successfully");

      setEditingCourse(null);
      fetchCourses();
    } catch (err) {
      alertError(
        err.response?.data?.message ||
          "Failed to update course"
      );
    } finally {
      setSavingEdit(false);
    }
  };

  const confirmDeleteCourse = async () => {
    if (!courseToDelete) return;

    try {
      await api.delete(`/courses/${courseToDelete._id}`);

      alertSuccess("Course deleted successfully");

      setCourseToDelete(null);
      fetchCourses();
    } catch (err) {
      alertError(
        err.response?.data?.message ||
          "Failed to delete course"
      );
    }
  };

  const filtered = courses.filter(
    (c) =>
      c.name
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      c.targetClass
        ?.toLowerCase()
        .includes(search.toLowerCase())
  );

  const openEditCourse = (course) => {
    setEditingCourse({
      ...course,
      features: course.features?.join(", ") || "",
    });
  };

  const inputCls =
    "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-brand-green focus:ring-4 focus:ring-green-500/10";

  const labelCls =
    "mb-1.5 block text-[11px] font-bold uppercase tracking-widest text-slate-500";

  return (
    <div className="min-h-full space-y-5 p-3 sm:space-y-6 sm:p-5 lg:p-7">
      {/* HEADER */}
      <section className="relative overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-6 lg:p-7">
        <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-green-100/60 blur-3xl" />

        <div className="absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-emerald-100/50 blur-3xl" />

        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-brand-green">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
              Academic Management
            </div>

            <h1 className="font-heading text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              Courses
            </h1>

            <p className="mt-1.5 text-sm leading-6 text-slate-500">
              Create and manage academic programs, pricing,
              features and publication status.
            </p>

            <div className="mt-3 inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-500">
              {courses.length}{" "}
              {courses.length === 1 ? "course" : "courses"}
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowCreate(true)}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-brand-green px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-green-700 hover:shadow-lg hover:shadow-green-900/10"
          >
            <Plus className="h-4 w-4" />
            Add Course
          </button>
        </div>
      </section>

      {/* SEARCH */}
      <section className="rounded-[1.5rem] border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search courses by name or target class..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-brand-green focus:bg-white focus:ring-4 focus:ring-green-500/10"
          />
        </div>
      </section>

      {/* CONTENT */}
      {loading ? (
        <div className="flex min-h-[300px] items-center justify-center rounded-[1.5rem] border border-slate-200 bg-white">
          <div className="flex flex-col items-center gap-3">
            <div className="h-9 w-9 animate-spin rounded-full border-4 border-green-100 border-t-brand-green" />

            <p className="text-sm font-medium text-slate-500">
              Loading courses...
            </p>
          </div>
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-[1.5rem] border border-dashed border-slate-300 bg-white px-5 py-14 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-brand-green">
            <BookOpen className="h-6 w-6" />
          </div>

          <h3 className="text-base font-bold text-slate-800">
            {search
              ? "No courses found"
              : "No courses published yet"}
          </h3>

          <p className="mx-auto mt-1 max-w-md text-sm leading-6 text-slate-500">
            {search
              ? "Try searching with another course name or target class."
              : "Create your first course and it will appear on the public site when published."}
          </p>

          {!search && (
            <button
              type="button"
              onClick={() => setShowCreate(true)}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-brand-green px-4 py-2.5 text-sm font-bold text-white transition hover:bg-green-700"
            >
              <Plus className="h-4 w-4" />
              Add Course
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
          {filtered.map((course) => (
            <article
              key={course._id}
              className="group overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-slate-900/5"
            >
              {/* COLOR BAR */}
              <div className="h-1.5 w-full bg-gradient-to-r from-green-500 to-emerald-400" />

              <div className="p-4 sm:p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-green-100 bg-green-50 text-brand-green">
                      <BookOpen className="h-5 w-5" />
                    </div>

                    <div className="min-w-0">
                      <span
                        className={`inline-flex rounded-lg px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${
                          course.isActive
                            ? "bg-green-100 text-green-700"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {course.isActive
                          ? "Active"
                          : "Inactive"}
                      </span>

                      <h2 className="mt-1.5 break-words text-lg font-extrabold leading-6 text-slate-900 sm:text-xl">
                        {course.name}
                      </h2>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setCourseToDelete(course)
                    }
                    className="shrink-0 rounded-xl p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-500"
                    title="Delete Course"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                <p className="mt-4 line-clamp-2 text-xs leading-5 text-slate-500">
                  {course.description ||
                    "No description provided."}
                </p>

                {/* STATS */}
                <div className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-4 sm:gap-3">
                  <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
                    <div className="mb-1 flex items-center gap-1.5 text-[10px] font-medium text-slate-400">
                      <Clock className="h-3.5 w-3.5" />
                      Duration
                    </div>

                    <div className="truncate text-sm font-extrabold text-slate-700">
                      {course.duration || "—"}
                    </div>
                  </div>

                  <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
                    <div className="mb-1 flex items-center gap-1.5 text-[10px] font-medium text-slate-400">
                      <IndianRupee className="h-3.5 w-3.5" />
                      Fees
                    </div>

                    <div className="truncate text-sm font-extrabold text-slate-700">
                      ₹
                      {course.feeAmount?.toLocaleString(
                        "en-IN"
                      ) || "—"}
                    </div>
                  </div>

                  <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
                    <div className="mb-1 flex items-center gap-1.5 text-[10px] font-medium text-slate-400">
                      <Users className="h-3.5 w-3.5" />
                      Target
                    </div>

                    <div className="truncate text-sm font-extrabold text-slate-700">
                      {course.targetClass || "—"}
                    </div>
                  </div>

                  <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
                    <div className="mb-1 flex items-center gap-1.5 text-[10px] font-medium text-slate-400">
                      <BookOpen className="h-3.5 w-3.5" />
                      Subjects
                    </div>

                    <div className="text-sm font-extrabold text-slate-700">
                      {course.subjects?.length || 0}
                    </div>
                  </div>
                </div>

                {/* FEATURES */}
                {course.features?.length > 0 && (
                  <div className="mt-5 rounded-xl border border-slate-100 bg-slate-50/70 p-3.5">
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                      Key Features
                    </p>

                    <ul className="space-y-1.5">
                      {course.features
                        .slice(0, 3)
                        .map((feature) => (
                          <li
                            key={feature}
                            className="flex items-start gap-2 text-xs leading-5 text-slate-600"
                          >
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-green" />
                            <span>{feature}</span>
                          </li>
                        ))}

                      {course.features.length > 3 && (
                        <li className="pl-3.5 text-xs font-medium text-slate-400">
                          +
                          {course.features.length - 3}{" "}
                          more features
                        </li>
                      )}
                    </ul>
                  </div>
                )}

                {/* ACTIONS */}
                <div className="mt-5 grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => openEditCourse(course)}
                    className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs font-bold text-slate-600 transition hover:bg-slate-100"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setViewingCourse(course)
                    }
                    className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-xl border border-green-200 bg-green-50 px-3 py-2.5 text-xs font-bold text-green-700 transition hover:bg-green-100"
                  >
                    View Details
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* CREATE COURSE MODAL */}
      {showCreate && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center bg-slate-950/50 px-2 py-2 backdrop-blur-sm sm:items-center sm:px-4 sm:py-6">
          <div className="flex h-[calc(100dvh-1rem)] w-full max-w-xl flex-col overflow-hidden rounded-[1.5rem] border border-white/70 bg-white shadow-2xl sm:h-auto sm:max-h-[90vh]">
            {/* HEADER */}
            <div className="flex shrink-0 items-center justify-between gap-4 border-b border-slate-100 bg-white px-5 py-4 sm:px-6">
              <div className="min-w-0">
                <div className="mb-1 inline-flex rounded-full bg-green-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-brand-green">
                  Academic Management
                </div>

                <h2 className="text-lg font-extrabold text-slate-900 sm:text-xl">
                  Add New Course
                </h2>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Create a program for the NEETVIDYA public
                  website.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowCreate(false)}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* BODY */}
            <form
              onSubmit={handleCreate}
              className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-5 sm:px-6 sm:py-6"
            >
              <div className="space-y-4">
                <div>
                  <label className={labelCls}>
                    Course Name *
                  </label>

                  <input
                    required
                    value={form.name}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        name: e.target.value,
                      }))
                    }
                    className={inputCls}
                    placeholder="12th Batch – SANKALP"
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className={labelCls}>
                      Target Class
                    </label>

                    <input
                      value={form.targetClass}
                      onChange={(e) =>
                        setForm((f) => ({
                          ...f,
                          targetClass: e.target.value,
                        }))
                      }
                      className={inputCls}
                      placeholder="Class 12, Droppers"
                    />
                  </div>

                  <div>
                    <label className={labelCls}>
                      Duration
                    </label>

                    <input
                      value={form.duration}
                      onChange={(e) =>
                        setForm((f) => ({
                          ...f,
                          duration: e.target.value,
                        }))
                      }
                      className={inputCls}
                      placeholder="Complete 1 Year"
                    />
                  </div>
                </div>

                <div>
                  <label className={labelCls}>
                    Fees (₹)
                  </label>

                  <div className="relative">
                    <IndianRupee className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                    <input
                      type="number"
                      min="0"
                      value={form.feeAmount}
                      onChange={(e) =>
                        setForm((f) => ({
                          ...f,
                          feeAmount: e.target.value,
                        }))
                      }
                      className={`${inputCls} pl-10`}
                      placeholder="20000"
                    />
                  </div>
                </div>

                <div>
                  <label className={labelCls}>
                    Description
                  </label>

                  <textarea
                    rows={4}
                    value={form.description}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        description: e.target.value,
                      }))
                    }
                    className={`${inputCls} resize-none`}
                    placeholder="Describe the course, focus area, and outcomes."
                  />
                </div>

                <div>
                  <label className={labelCls}>
                    Features
                  </label>

                  <textarea
                    rows={4}
                    value={form.features}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        features: e.target.value,
                      }))
                    }
                    className={`${inputCls} resize-none`}
                    placeholder="NCERT mastery, DPPs, mock tests"
                  />

                  <p className="mt-1.5 text-[11px] text-slate-400">
                    Separate each feature with a comma.
                  </p>
                </div>
              </div>

              {/* ACTIONS */}
              <div className="mt-6 grid grid-cols-1 gap-2.5 pb-6 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => setShowCreate(false)}
                  className="hidden min-h-11 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50 sm:block"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={creating}
                  className="min-h-11 rounded-xl bg-brand-green px-4 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60 sm:col-start-2"
                >
                  {creating
                    ? "Creating..."
                    : "Create Course"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* VIEW COURSE DETAILS MODAL */}
      {viewingCourse && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center bg-slate-950/50 px-2 py-2 backdrop-blur-sm sm:items-center sm:px-4 sm:py-6">
          <div className="flex h-[calc(100dvh-1rem)] w-full max-w-lg flex-col overflow-hidden rounded-[1.5rem] border border-white/70 bg-white shadow-2xl sm:h-auto sm:max-h-[90vh]">
            {/* HEADER */}
            <div className="flex shrink-0 items-center justify-between gap-4 border-b border-slate-100 bg-white px-5 py-4 sm:px-6">
              <div className="min-w-0">
                <span
                  className={`inline-flex rounded-lg px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${
                    viewingCourse.isActive
                      ? "bg-green-100 text-green-700"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {viewingCourse.isActive
                    ? "Active Course"
                    : "Inactive"}
                </span>

                <h2 className="mt-1.5 break-words text-lg font-extrabold text-slate-900 sm:text-xl">
                  {viewingCourse.name}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setViewingCourse(null)}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* BODY */}
            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-5 sm:px-6 sm:py-6">
              <div className="space-y-5">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs leading-6 text-slate-600">
                    {viewingCourse.description ||
                      "No description provided."}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-slate-100 bg-slate-50 p-3.5">
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Duration
                    </span>

                    <span className="mt-1 block text-sm font-extrabold text-slate-800">
                      {viewingCourse.duration || "—"}
                    </span>
                  </div>

                  <div className="rounded-xl border border-slate-100 bg-slate-50 p-3.5">
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Course Fees
                    </span>

                    <span className="mt-1 block text-sm font-extrabold text-slate-800">
                      ₹
                      {viewingCourse.feeAmount?.toLocaleString(
                        "en-IN"
                      ) || "—"}
                    </span>
                  </div>

                  <div className="rounded-xl border border-slate-100 bg-slate-50 p-3.5">
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Target Audience
                    </span>

                    <span className="mt-1 block text-sm font-extrabold text-slate-800">
                      {viewingCourse.targetClass || "—"}
                    </span>
                  </div>

                  <div className="rounded-xl border border-slate-100 bg-slate-50 p-3.5">
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Subjects
                    </span>

                    <span className="mt-1 block text-sm font-extrabold text-slate-800">
                      {viewingCourse.subjects?.length ||
                        "All NEET"}
                    </span>
                  </div>
                </div>

                {viewingCourse.features?.length > 0 && (
                  <div>
                    <div className="mb-3">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                        Key Highlights
                      </span>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white">
                      {viewingCourse.features.map(
                        (feature, index) => (
                          <div
                            key={index}
                            className={`flex items-start gap-3 px-4 py-3 ${
                              index !==
                              viewingCourse.features.length - 1
                                ? "border-b border-slate-100"
                                : ""
                            }`}
                          >
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" />

                            <span className="text-xs leading-5 text-slate-600">
                              {feature}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}

                <div className="rounded-2xl border border-green-100 bg-green-50/60 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-brand-green shadow-sm">
                      <BookOpen className="h-4 w-4" />
                    </div>

                    <div>
                      <p className="text-xs font-bold text-slate-700">
                        Course Status
                      </p>

                      <p className="mt-0.5 text-xs text-slate-500">
                        {viewingCourse.isActive
                          ? "This course is currently published."
                          : "This course is currently hidden from the public site."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* ACTIONS */}
              <div className="mt-6 grid grid-cols-1 gap-2.5 pb-6 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() =>
                    setViewingCourse(null)
                  }
                  className="hidden min-h-11 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50 sm:block"
                >
                  Close
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const c = viewingCourse;

                    setViewingCourse(null);

                    setEditingCourse({
                      ...c,
                      features:
                        c.features?.join(", ") || "",
                    });
                  }}
                  className="min-h-11 rounded-xl bg-brand-green px-4 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-green-700 sm:col-start-2"
                >
                  Edit Program
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* EDIT COURSE MODAL */}
      {editingCourse && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center bg-slate-950/50 px-2 py-2 backdrop-blur-sm sm:items-center sm:px-4 sm:py-6">
          <div className="flex h-[calc(100dvh-1rem)] w-full max-w-xl flex-col overflow-hidden rounded-[1.5rem] border border-white/70 bg-white shadow-2xl sm:h-auto sm:max-h-[90vh]">
            {/* HEADER */}
            <div className="flex shrink-0 items-center justify-between gap-4 border-b border-slate-100 bg-white px-5 py-4 sm:px-6">
              <div className="min-w-0">
                <div className="mb-1 inline-flex rounded-full bg-green-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-brand-green">
                  Course Settings
                </div>

                <h2 className="text-lg font-extrabold text-slate-900 sm:text-xl">
                  Edit Course
                </h2>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Modify program details, pricing and
                  publication status.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setEditingCourse(null)}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* BODY */}
            <form
              onSubmit={handleSaveEdit}
              className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-5 sm:px-6 sm:py-6"
            >
              <div className="space-y-4">
                <div>
                  <label className={labelCls}>
                    Course Name *
                  </label>

                  <input
                    required
                    value={editingCourse.name}
                    onChange={(e) =>
                      setEditingCourse((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    className={inputCls}
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className={labelCls}>
                      Target Class
                    </label>

                    <input
                      value={editingCourse.targetClass || ""}
                      onChange={(e) =>
                        setEditingCourse((prev) => ({
                          ...prev,
                          targetClass: e.target.value,
                        }))
                      }
                      className={inputCls}
                    />
                  </div>

                  <div>
                    <label className={labelCls}>
                      Duration
                    </label>

                    <input
                      value={editingCourse.duration || ""}
                      onChange={(e) =>
                        setEditingCourse((prev) => ({
                          ...prev,
                          duration: e.target.value,
                        }))
                      }
                      className={inputCls}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className={labelCls}>
                      Fees (₹)
                    </label>

                    <div className="relative">
                      <IndianRupee className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                      <input
                        type="number"
                        min="0"
                        value={editingCourse.feeAmount ?? ""}
                        onChange={(e) =>
                          setEditingCourse((prev) => ({
                            ...prev,
                            feeAmount: e.target.value,
                          }))
                        }
                        className={`${inputCls} pl-10`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className={labelCls}>
                      Status
                    </label>

                    <select
                      value={
                        editingCourse.isActive
                          ? "active"
                          : "inactive"
                      }
                      onChange={(e) =>
                        setEditingCourse((prev) => ({
                          ...prev,
                          isActive:
                            e.target.value === "active",
                        }))
                      }
                      className={`${inputCls} bg-white`}
                    >
                      <option value="active">
                        Active (Published)
                      </option>

                      <option value="inactive">
                        Inactive (Hidden)
                      </option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className={labelCls}>
                    Description
                  </label>

                  <textarea
                    rows={4}
                    value={editingCourse.description || ""}
                    onChange={(e) =>
                      setEditingCourse((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    className={`${inputCls} resize-none`}
                  />
                </div>

                <div>
                  <label className={labelCls}>
                    Features
                  </label>

                  <textarea
                    rows={4}
                    value={editingCourse.features || ""}
                    onChange={(e) =>
                      setEditingCourse((prev) => ({
                        ...prev,
                        features: e.target.value,
                      }))
                    }
                    className={`${inputCls} resize-none`}
                    placeholder="NCERT Coverage, Daily Practice Tests, 1-on-1 Mentorship"
                  />

                  <p className="mt-1.5 text-[11px] text-slate-400">
                    Separate each feature with a comma.
                  </p>
                </div>
              </div>

              {/* ACTIONS */}
              <div className="mt-6 grid grid-cols-1 gap-2.5 pb-6 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() =>
                    setEditingCourse(null)
                  }
                  className="hidden min-h-11 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50 sm:block"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={savingEdit}
                  className="min-h-11 rounded-xl bg-brand-green px-4 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60 sm:col-start-2"
                >
                  <span className="inline-flex items-center justify-center gap-2">
                    <Save className="h-4 w-4" />

                    {savingEdit
                      ? "Saving..."
                      : "Save Changes"}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION */}
      <ConfirmModal
        isOpen={!!courseToDelete}
        onClose={() => setCourseToDelete(null)}
        onConfirm={confirmDeleteCourse}
        title="Delete Course"
        message={`Are you sure you want to permanently delete "${courseToDelete?.name}"? Associated batches should be updated.`}
        confirmLabel="Delete Course"
        danger={true}
      />
    </div>
  );
}