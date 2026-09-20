import { useState, useEffect } from "react";
import api from "../../config/api";
import {
  Users,
  Plus,
  Search,
  BookOpen,
  Clock,
  Calendar,
  Pencil,
  Trash2,
  X,
  Save,
  UserMinus,
} from "lucide-react";
import { alertSuccess, alertError } from "../../utils/alert";
import { DEFAULT_COURSES, getCourseByValue } from "../../config/courses";
import ConfirmModal from "../../components/shared/ConfirmModal";

const batchTypeColors = {
  OFFLINE: "bg-emerald-100 text-emerald-700",
  ONLINE: "bg-blue-100 text-blue-700",
  HYBRID: "bg-purple-100 text-purple-700",
  EXAM_ONLY: "bg-orange-100 text-orange-700",
};

const initialForm = {
  name: "",
  code: "",
  batchType: "OFFLINE",
  course: "",
  academicYear: "",
  capacity: "",
  schedule: "",
  color: "#22c55e",
};

const getStudentName = (student) => {
  if (!student) return "Unknown Student";

  if (typeof student.name === "string" && student.name.trim()) {
    return student.name.trim();
  }

  if (
    typeof student.user?.name === "string" &&
    student.user.name.trim()
  ) {
    return student.user.name.trim();
  }

  const userFullName = [
    student.user?.firstName,
    student.user?.lastName,
  ]
    .filter(Boolean)
    .join(" ")
    .trim();

  if (userFullName) return userFullName;

  const fullName = [student.firstName, student.lastName]
    .filter(Boolean)
    .join(" ")
    .trim();

  if (fullName) return fullName;

  if (student.email) return student.email;
  if (student.user?.email) return student.user.email;

  return "Unknown Student";
};

const getStudentEmail = (student) =>
  student?.email ||
  student?.user?.email ||
  student?.emailAddress ||
  "";

const getStudentId = (student) =>
  student?._id ||
  student?.id ||
  student?.user?._id ||
  student?.user?.id;

export default function AdminBatches() {
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [showCreate, setShowCreate] = useState(false);
  const [creating, setCreating] = useState(false);

  const [viewingBatch, setViewingBatch] = useState(null);
  const [batchStudents, setBatchStudents] = useState([]);
  const [allStudents, setAllStudents] = useState([]);
  const [studentToEnroll, setStudentToEnroll] = useState("");
  const [loadingStudents, setLoadingStudents] = useState(false);
  const [enrollingStudent, setEnrollingStudent] = useState(false);

  const [editingBatch, setEditingBatch] = useState(null);
  const [savingEdit, setSavingEdit] = useState(false);

  const [batchToDelete, setBatchToDelete] = useState(null);

  const [form, setForm] = useState(initialForm);

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

  useEffect(() => {
    fetchBatches();
  }, []);

  const resetCreateForm = () => {
    setForm(initialForm);
  };

  const handleCreate = async (e) => {
    e.preventDefault();

    if (!form.course) {
      alertError("Please select a course before creating a batch");
      return;
    }

    setCreating(true);

    try {
      await api.post("/batches", {
        ...form,
        capacity: Number(form.capacity || 0),
      });

      alertSuccess("Batch created successfully");

      setShowCreate(false);
      resetCreateForm();
      fetchBatches();
    } catch (err) {
      alertError(
        err.response?.data?.message || "Failed to create batch"
      );
    } finally {
      setCreating(false);
    }
  };

  const handleOpenStudents = async (batch) => {
    setViewingBatch(batch);
    setLoadingStudents(true);
    setStudentToEnroll("");

    try {
      const [bRes, sRes] = await Promise.all([
        api.get(`/batches/${batch._id}/students`),
        api.get("/students?limit=100"),
      ]);

      const enrolledStudents =
        bRes.data?.data?.students ||
        bRes.data?.students ||
        [];

      const students =
        sRes.data?.data?.students ||
        sRes.data?.students ||
        [];

      setBatchStudents(
        Array.isArray(enrolledStudents)
          ? enrolledStudents
          : []
      );

      setAllStudents(
        Array.isArray(students) ? students : []
      );
    } catch {
      setBatchStudents([]);
      setAllStudents([]);
      alertError("Failed to load students in this batch");
    } finally {
      setLoadingStudents(false);
    }
  };

  const handleEnrollStudent = async (e) => {
    e.preventDefault();

    if (!studentToEnroll || !viewingBatch) return;

    setEnrollingStudent(true);

    try {
      await api.post(`/batches/${viewingBatch._id}/students`, {
        studentIds: [studentToEnroll],
      });

      alertSuccess("Student enrolled into batch successfully");

      const { data } = await api.get(
        `/batches/${viewingBatch._id}/students`
      );

      const enrolledStudents =
        data?.data?.students ||
        data?.students ||
        [];

      setBatchStudents(
        Array.isArray(enrolledStudents)
          ? enrolledStudents
          : []
      );

      setStudentToEnroll("");
      fetchBatches();
    } catch (err) {
      alertError(
        err.response?.data?.message ||
          "Failed to enroll student"
      );
    } finally {
      setEnrollingStudent(false);
    }
  };

  const handleRemoveStudent = async (studentId) => {
    if (!viewingBatch || !studentId) return;

    try {
      await api.delete(
        `/batches/${viewingBatch._id}/students/${studentId}`
      );

      alertSuccess("Student removed from batch");

      setBatchStudents((prev) =>
        prev.filter(
          (student) => getStudentId(student) !== studentId
        )
      );

      fetchBatches();
    } catch (err) {
      alertError(
        err.response?.data?.message ||
          "Failed to remove student"
      );
    }
  };

  const handleSaveBatchEdit = async (e) => {
    e.preventDefault();

    if (!editingBatch) return;

    setSavingEdit(true);

    try {
      await api.put(`/batches/${editingBatch._id}`, {
        name: editingBatch.name,
        code: editingBatch.code,
        batchType: editingBatch.batchType,
        course:
          typeof editingBatch.course === "object"
            ? editingBatch.course?._id
            : editingBatch.course,
        academicYear: editingBatch.academicYear,
        capacity: Number(editingBatch.capacity || 0),
        schedule: editingBatch.schedule,
        color: editingBatch.color,
      });

      alertSuccess("Batch updated successfully");

      setEditingBatch(null);
      fetchBatches();
    } catch (err) {
      alertError(
        err.response?.data?.message ||
          "Failed to update batch"
      );
    } finally {
      setSavingEdit(false);
    }
  };

  const confirmDeleteBatch = async () => {
    if (!batchToDelete) return;

    try {
      await api.delete(`/batches/${batchToDelete._id}`);

      alertSuccess("Batch deleted successfully");

      setBatchToDelete(null);
      fetchBatches();
    } catch (err) {
      alertError(
        err.response?.data?.message ||
          "Failed to delete batch"
      );
    }
  };

  const filtered = batches.filter(
    (b) =>
      b.name?.toLowerCase().includes(search.toLowerCase()) ||
      b.code?.toLowerCase().includes(search.toLowerCase())
  );

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
              Batches
            </h1>

            <p className="mt-1.5 text-sm leading-6 text-slate-500">
              Manage courses, students, capacity and batch schedules.
            </p>

            <div className="mt-3 inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-500">
              {batches.length} active{" "}
              {batches.length === 1 ? "batch" : "batches"}
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              resetCreateForm();
              setShowCreate(true);
            }}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-brand-green px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-green-700 hover:shadow-lg hover:shadow-green-900/10"
          >
            <Plus className="h-4 w-4" />
            Create Batch
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
            placeholder="Search batches by name or code..."
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
              Loading batches...
            </p>
          </div>
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-[1.5rem] border border-dashed border-slate-300 bg-white px-5 py-14 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-brand-green">
            <BookOpen size={25} />
          </div>

          <h3 className="text-base font-bold text-slate-800">
            {search ? "No batches found" : "No batches created yet"}
          </h3>

          <p className="mx-auto mt-1 max-w-md text-sm leading-6 text-slate-500">
            {search
              ? "Try another batch name or code."
              : "Create your first batch to start managing students and schedules."}
          </p>

          {!search && (
            <button
              type="button"
              onClick={() => {
                resetCreateForm();
                setShowCreate(true);
              }}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-brand-green px-4 py-2.5 text-sm font-bold text-white transition hover:bg-green-700"
            >
              <Plus size={17} />
              Create Batch
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
          {filtered.map((batch) => {
            const course =
              getCourseByValue(batch.course)?.name ||
              batch.course?.name;

            return (
              <article
                key={batch._id}
                className="group overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-slate-900/5"
              >
                <div
                  className="h-1.5 w-full"
                  style={{
                    backgroundColor:
                      batch.color || "#22c55e",
                  }}
                />

                <div className="p-4 sm:p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-lg bg-slate-100 px-2.5 py-1 font-mono text-[11px] font-black text-slate-600">
                          {batch.code}
                        </span>

                        <span
                          className={`rounded-lg px-2.5 py-1 text-[11px] font-bold ${
                            batchTypeColors[batch.batchType] ||
                            "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {batch.batchType}
                        </span>
                      </div>

                      <h2 className="mt-3 break-words text-lg font-bold leading-7 text-slate-900 sm:text-xl">
                        {batch.name}
                      </h2>
                    </div>

                    <button
                      type="button"
                      onClick={() => setBatchToDelete(batch)}
                      className="shrink-0 rounded-xl p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-500"
                      title="Delete Batch"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="mt-5 grid grid-cols-3 gap-2.5 sm:gap-3">
                    <div className="rounded-xl border border-slate-100 bg-slate-50 p-3 text-center">
                      <div className="text-xl font-extrabold text-slate-800">
                        {batch.students?.length || 0}
                      </div>

                      <div className="mt-0.5 text-[11px] font-medium text-slate-400">
                        Students
                      </div>
                    </div>

                    <div className="rounded-xl border border-slate-100 bg-slate-50 p-3 text-center">
                      <div className="text-xl font-extrabold text-slate-800">
                        {batch.capacity || "—"}
                      </div>

                      <div className="mt-0.5 text-[11px] font-medium text-slate-400">
                        Capacity
                      </div>
                    </div>

                    <div className="rounded-xl border border-slate-100 bg-slate-50 p-3 text-center">
                      <div className="text-xl font-extrabold text-slate-800">
                        {batch.assignedTeachers?.length || 0}
                      </div>

                      <div className="mt-0.5 text-[11px] font-medium text-slate-400">
                        Teachers
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 space-y-2 text-xs text-slate-500">
                    {course && (
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                        <span>{course}</span>
                      </div>
                    )}

                    {batch.schedule && (
                      <div className="flex items-center gap-2">
                        <Clock className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                        <span>{batch.schedule}</span>
                      </div>
                    )}

                    {batch.academicYear && (
                      <div className="flex items-center gap-2">
                        <Calendar className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                        <span>
                          Academic Year: {batch.academicYear}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
                    <button
                      type="button"
                      onClick={() => handleOpenStudents(batch)}
                      className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs font-bold text-slate-600 transition hover:bg-slate-100"
                    >
                      <Users className="h-3.5 w-3.5" />
                      View Students
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setEditingBatch({
                          ...batch,
                          course:
                            typeof batch.course === "object"
                              ? batch.course?._id || ""
                              : batch.course || "",
                        })
                      }
                      className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-green-200 bg-green-50 px-3 py-2.5 text-xs font-bold text-green-700 transition hover:bg-green-100"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                      Edit Batch
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* =====================================================
          CREATE BATCH MODAL
          ===================================================== */}
      {showCreate && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center bg-slate-950/50 px-2 py-2 backdrop-blur-sm sm:items-center sm:px-4 sm:py-6">
          <div className="flex h-[calc(100dvh-1rem)] w-full max-w-xl flex-col overflow-hidden rounded-[1.5rem] border border-white/70 bg-white shadow-2xl sm:h-auto sm:max-h-[90vh]">
            <div className="flex shrink-0 items-center justify-between gap-4 border-b border-slate-100 bg-white px-5 py-4 sm:px-6">
              <div className="min-w-0">
                <div className="mb-1 inline-flex rounded-full bg-green-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-brand-green">
                  Academic Management
                </div>

                <h2 className="text-lg font-extrabold text-slate-900 sm:text-xl">
                  Create New Batch
                </h2>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Associate the batch with an active course.
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

            <form
              onSubmit={handleCreate}
              className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-5 sm:px-6 sm:py-6"
            >
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="md:col-span-2">
                  <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-widest text-slate-500">
                    Batch Name *
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
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-brand-green focus:ring-4 focus:ring-green-500/10"
                    placeholder="12th Batch – SANKALP"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-widest text-slate-500">
                    Batch Code *
                  </label>

                  <input
                    required
                    value={form.code}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        code: e.target.value,
                      }))
                    }
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-brand-green focus:ring-4 focus:ring-green-500/10"
                    placeholder="SANKALP-12TH"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-widest text-slate-500">
                    Batch Type
                  </label>

                  <select
                    value={form.batchType}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        batchType: e.target.value,
                      }))
                    }
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-800 outline-none transition focus:border-brand-green focus:ring-4 focus:ring-green-500/10"
                  >
                    <option value="OFFLINE">OFFLINE</option>
                    <option value="ONLINE">ONLINE</option>
                    <option value="HYBRID">HYBRID</option>
                    <option value="EXAM_ONLY">EXAM_ONLY</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-widest text-slate-500">
                    Course *
                  </label>

                  <select
                    required
                    value={form.course}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        course: e.target.value,
                      }))
                    }
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-800 outline-none transition focus:border-brand-green focus:ring-4 focus:ring-green-500/10"
                  >
                    <option value="">Select a course</option>

                    {DEFAULT_COURSES.map((course) => (
                      <option
                        key={course.value}
                        value={course.value}
                      >
                        {course.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-widest text-slate-500">
                    Academic Year
                  </label>

                  <input
                    value={form.academicYear}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        academicYear: e.target.value,
                      }))
                    }
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-brand-green focus:ring-4 focus:ring-green-500/10"
                    placeholder="2026-2027"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-widest text-slate-500">
                    Capacity
                  </label>

                  <input
                    type="number"
                    min="0"
                    value={form.capacity}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        capacity: e.target.value,
                      }))
                    }
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-brand-green focus:ring-4 focus:ring-green-500/10"
                    placeholder="40"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-widest text-slate-500">
                    Schedule
                  </label>

                  <input
                    value={form.schedule}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        schedule: e.target.value,
                      }))
                    }
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-brand-green focus:ring-4 focus:ring-green-500/10"
                    placeholder="Mon–Sat: 08:30 AM – 01:30 PM"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-widest text-slate-500">
                    Batch Color
                  </label>

                  <input
                    type="color"
                    value={form.color}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        color: e.target.value,
                      }))
                    }
                    className="h-12 w-full rounded-xl border border-slate-200 bg-white px-2 py-1"
                  />
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-2.5 pb-6 sm:grid-cols-2">
                {/* HIDDEN ON MOBILE */}
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
                  {creating ? "Creating..." : "Create Batch"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =====================================================
          VIEW STUDENTS MODAL
          ===================================================== */}
      {viewingBatch && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center bg-slate-950/50 px-2 py-2 backdrop-blur-sm sm:items-center sm:px-4 sm:py-6">
          <div className="flex h-[calc(100dvh-1rem)] w-full max-w-2xl flex-col overflow-hidden rounded-[1.5rem] border border-white/70 bg-white shadow-2xl sm:h-auto sm:max-h-[90vh]">
            <div className="flex shrink-0 items-center justify-between gap-4 border-b border-slate-100 bg-white px-5 py-4 sm:px-6">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-lg bg-slate-100 px-2.5 py-1 font-mono text-[10px] font-bold text-slate-600">
                    {viewingBatch.code}
                  </span>

                  <h2 className="break-words text-base font-extrabold text-slate-900 sm:text-lg">
                    {viewingBatch.name}
                  </h2>
                </div>

                <p className="mt-1 text-xs text-slate-500">
                  Enrolled Students ({batchStudents.length} /{" "}
                  {viewingBatch.capacity || "Unlimited"})
                </p>
              </div>

              <button
                type="button"
                onClick={() => setViewingBatch(null)}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-5 sm:px-6 sm:py-6">
              <div className="mb-5 rounded-2xl border border-slate-200 bg-slate-50 p-3.5">
                <div className="mb-2.5">
                  <p className="text-sm font-bold text-slate-800">
                    Enroll Student
                  </p>

                  <p className="mt-0.5 text-xs text-slate-500">
                    Add an existing student to this batch.
                  </p>
                </div>

                <form
                  onSubmit={handleEnrollStudent}
                  className="flex flex-col gap-2.5 sm:flex-row"
                >
                  <select
                    value={studentToEnroll}
                    onChange={(e) =>
                      setStudentToEnroll(e.target.value)
                    }
                    disabled={
                      loadingStudents || enrollingStudent
                    }
                    className="min-h-11 min-w-0 flex-1 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs text-slate-700 outline-none transition focus:border-brand-green focus:ring-4 focus:ring-green-500/10"
                  >
                    <option value="">
                      Select a student to enroll...
                    </option>

                    {allStudents
                      .filter(
                        (student) =>
                          !batchStudents.some(
                            (enrolled) =>
                              getStudentId(enrolled) ===
                              student?._id
                          )
                      )
                      .map((student) => (
                        <option
                          key={student._id}
                          value={student._id}
                        >
                          {getStudentName(student)}
                          {student.studentId
                            ? ` (${student.studentId})`
                            : getStudentEmail(student)
                            ? ` (${getStudentEmail(student)})`
                            : ""}
                        </option>
                      ))}
                  </select>

                  <button
                    type="submit"
                    disabled={
                      !studentToEnroll ||
                      loadingStudents ||
                      enrollingStudent
                    }
                    className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-brand-green px-5 py-2.5 text-sm font-bold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Plus className="h-4 w-4" />

                    {enrollingStudent
                      ? "Enrolling..."
                      : "Enroll"}
                  </button>
                </form>
              </div>

              <div>
                <div className="mb-3 flex items-center justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-bold text-slate-800">
                      Enrolled Students
                    </h3>

                    <p className="mt-0.5 text-xs text-slate-400">
                      Students currently assigned to this batch
                    </p>
                  </div>

                  <span className="shrink-0 rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-500">
                    {batchStudents.length} /{" "}
                    {viewingBatch.capacity || "∞"}
                  </span>
                </div>

                {loadingStudents ? (
                  <div className="flex min-h-[220px] items-center justify-center rounded-2xl border border-slate-200 bg-slate-50">
                    <div className="flex flex-col items-center gap-3">
                      <div className="h-8 w-8 animate-spin rounded-full border-4 border-green-100 border-t-brand-green" />

                      <p className="text-xs font-medium text-slate-500">
                        Loading students...
                      </p>
                    </div>
                  </div>
                ) : batchStudents.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-12 text-center">
                    <Users
                      size={28}
                      className="mx-auto text-slate-300"
                    />

                    <p className="mt-3 text-sm font-bold text-slate-600">
                      No students enrolled
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-400">
                      Select a student above to enroll them into
                      this batch.
                    </p>
                  </div>
                ) : (
                  <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                    {batchStudents.map((student, index) => {
                      const studentId = getStudentId(student);
                      const studentName = getStudentName(student);
                      const studentEmail =
                        getStudentEmail(student);

                      return (
                        <div
                          key={studentId || index}
                          className={`flex items-center justify-between gap-3 p-3.5 transition hover:bg-slate-50 sm:p-4 ${
                            index !== batchStudents.length - 1
                              ? "border-b border-slate-100"
                              : ""
                          }`}
                        >
                          <div className="flex min-w-0 items-center gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-50 text-sm font-extrabold text-brand-green">
                              {studentName
                                .charAt(0)
                                .toUpperCase() || "S"}
                            </div>

                            <div className="min-w-0">
                              <div className="truncate text-sm font-bold text-slate-800">
                                {studentName}
                              </div>

                              <div className="mt-1 flex min-w-0 flex-wrap items-center gap-x-2 gap-y-0.5 text-[11px] text-slate-400">
                                {student.studentId && (
                                  <span>
                                    ID: {student.studentId}
                                  </span>
                                )}

                                {student.studentId &&
                                  studentEmail && (
                                    <span>•</span>
                                  )}

                                {studentEmail && (
                                  <span className="max-w-[220px] truncate">
                                    {studentEmail}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() =>
                              handleRemoveStudent(studentId)
                            }
                            disabled={!studentId}
                            className="inline-flex min-h-9 shrink-0 items-center justify-center gap-1.5 rounded-xl border border-red-100 bg-red-50 px-3 py-2 text-xs font-bold text-red-500 transition hover:bg-red-100 hover:text-red-700 disabled:opacity-40"
                          >
                            <UserMinus className="h-3.5 w-3.5" />

                            <span className="hidden sm:inline">
                              Remove
                            </span>
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="mt-6 pb-6">
                {/* HIDDEN ON MOBILE */}
                <button
                  type="button"
                  onClick={() => setViewingBatch(null)}
                  className="hidden min-h-11 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50 sm:block"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          EDIT BATCH MODAL
          ===================================================== */}
      {editingBatch && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center bg-slate-950/50 px-2 py-2 backdrop-blur-sm sm:items-center sm:px-4 sm:py-6">
          <div className="flex h-[calc(100dvh-1rem)] w-full max-w-xl flex-col overflow-hidden rounded-[1.5rem] border border-white/70 bg-white shadow-2xl sm:h-auto sm:max-h-[90vh]">
            <div className="flex shrink-0 items-center justify-between gap-4 border-b border-slate-100 bg-white px-5 py-4 sm:px-6">
              <div className="min-w-0">
                <div className="mb-1 inline-flex rounded-full bg-green-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-brand-green">
                  Batch Settings
                </div>

                <h2 className="text-lg font-extrabold text-slate-900 sm:text-xl">
                  Edit Batch
                </h2>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Modify batch details, schedule or capacity.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setEditingBatch(null)}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form
              onSubmit={handleSaveBatchEdit}
              className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-5 sm:px-6 sm:py-6"
            >
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="md:col-span-2">
                  <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-widest text-slate-500">
                    Batch Name *
                  </label>

                  <input
                    required
                    value={editingBatch.name || ""}
                    onChange={(e) =>
                      setEditingBatch((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-800 outline-none transition focus:border-brand-green focus:ring-4 focus:ring-green-500/10"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-widest text-slate-500">
                    Batch Code *
                  </label>

                  <input
                    required
                    value={editingBatch.code || ""}
                    onChange={(e) =>
                      setEditingBatch((prev) => ({
                        ...prev,
                        code: e.target.value,
                      }))
                    }
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-800 outline-none transition focus:border-brand-green focus:ring-4 focus:ring-green-500/10"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-widest text-slate-500">
                    Batch Type
                  </label>

                  <select
                    value={editingBatch.batchType || "OFFLINE"}
                    onChange={(e) =>
                      setEditingBatch((prev) => ({
                        ...prev,
                        batchType: e.target.value,
                      }))
                    }
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-800 outline-none transition focus:border-brand-green focus:ring-4 focus:ring-green-500/10"
                  >
                    <option value="OFFLINE">OFFLINE</option>
                    <option value="ONLINE">ONLINE</option>
                    <option value="HYBRID">HYBRID</option>
                    <option value="EXAM_ONLY">EXAM_ONLY</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-widest text-slate-500">
                    Course *
                  </label>

                  <select
                    required
                    value={editingBatch.course || ""}
                    onChange={(e) =>
                      setEditingBatch((prev) => ({
                        ...prev,
                        course: e.target.value,
                      }))
                    }
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-800 outline-none transition focus:border-brand-green focus:ring-4 focus:ring-green-500/10"
                  >
                    <option value="">Select a course</option>

                    {DEFAULT_COURSES.map((course) => (
                      <option
                        key={course.value}
                        value={course.value}
                      >
                        {course.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-widest text-slate-500">
                    Academic Year
                  </label>

                  <input
                    value={editingBatch.academicYear || ""}
                    onChange={(e) =>
                      setEditingBatch((prev) => ({
                        ...prev,
                        academicYear: e.target.value,
                      }))
                    }
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-800 outline-none transition focus:border-brand-green focus:ring-4 focus:ring-green-500/10"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-widest text-slate-500">
                    Capacity
                  </label>

                  <input
                    type="number"
                    min="0"
                    value={editingBatch.capacity || ""}
                    onChange={(e) =>
                      setEditingBatch((prev) => ({
                        ...prev,
                        capacity: e.target.value,
                      }))
                    }
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-800 outline-none transition focus:border-brand-green focus:ring-4 focus:ring-green-500/10"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-widest text-slate-500">
                    Schedule
                  </label>

                  <input
                    value={editingBatch.schedule || ""}
                    onChange={(e) =>
                      setEditingBatch((prev) => ({
                        ...prev,
                        schedule: e.target.value,
                      }))
                    }
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-800 outline-none transition focus:border-brand-green focus:ring-4 focus:ring-green-500/10"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-widest text-slate-500">
                    Batch Color
                  </label>

                  <input
                    type="color"
                    value={editingBatch.color || "#22c55e"}
                    onChange={(e) =>
                      setEditingBatch((prev) => ({
                        ...prev,
                        color: e.target.value,
                      }))
                    }
                    className="h-12 w-full rounded-xl border border-slate-200 bg-white px-2 py-1"
                  />
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-2.5 pb-6 sm:grid-cols-2">
                {/* HIDDEN ON MOBILE */}
                <button
                  type="button"
                  onClick={() => setEditingBatch(null)}
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
        isOpen={!!batchToDelete}
        onClose={() => setBatchToDelete(null)}
        onConfirm={confirmDeleteBatch}
        title="Delete Batch"
        message={`Are you sure you want to delete "${batchToDelete?.name}"? Students enrolled in this batch will be unlinked.`}
        confirmLabel="Delete Batch"
        danger={true}
      />
    </div>
  );
}