import { useState, useEffect } from "react";
import api from "../../config/api";
import {
  Users,
  Search,
  Plus,
  Phone,
  Mail,
  Building2,
  BookOpen,
  Save,
  ShieldCheck,
  UserX,
  UserCheck,
  Eye,
  Pencil,
  Trash2,
  X,
  GraduationCap,
  MapPin,
} from "lucide-react";
import { alertSuccess, alertError } from "../../utils/alert";
import ConfirmModal from "../../components/shared/ConfirmModal";

const typeColors = {
  REGULAR_OFFLINE: "bg-green-50 text-green-700 border-green-200",
  REGULAR_ONLINE: "bg-blue-50 text-blue-700 border-blue-200",
  HYBRID: "bg-purple-50 text-purple-700 border-purple-200",
  EXAM_ONLY: "bg-orange-50 text-orange-700 border-orange-200",
  GUEST: "bg-slate-100 text-slate-600 border-slate-200",
};

const inputClass =
  "w-full min-w-0 min-h-11 px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-green-500/15 focus:border-green-500 transition";

const labelClass =
  "block text-[10px] font-extrabold text-slate-500 uppercase tracking-[0.16em] mb-1.5";

const getInitial = (name) =>
  name?.trim()?.charAt(0)?.toUpperCase() || "?";

const getTypeLabel = (type) =>
  type?.replace(/_/g, " ") || "—";

export default function AdminStudents() {
  const [students, setStudents] = useState([]);
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [showCreate, setShowCreate] = useState(false);
  const [creating, setCreating] = useState(false);
  const [viewingStudent, setViewingStudent] = useState(null);
  const [editingStudent, setEditingStudent] = useState(null);
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [savingEdit, setSavingEdit] = useState(false);
  const [grantableExams, setGrantableExams] = useState([]);
  const [examToPermit, setExamToPermit] = useState("");
  const [grantingAccess, setGrantingAccess] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    currentClass: "DROPPER",
    studentType: "REGULAR_OFFLINE",
    city: "",
    parentName: "",
    parentPhone: "",
    school: "",
  });

  const limit = 15;

  const loadGrantableExams = async () => {
    try {
      const { data } = await api.get("/exams?limit=100");
      setGrantableExams(data.data?.exams || []);
    } catch {
      setGrantableExams([]);
    }
  };

  const handleGrantExamAccess = async () => {
    if (!examToPermit || !viewingStudent?.user?._id) return;

    setGrantingAccess(true);

    try {
      await api.post(`/exams/${examToPermit}/permissions`, {
        studentId: viewingStudent.user._id,
        reason: "Admin granted exam-only access",
      });

      alertSuccess("Exam access granted");

      const granted = grantableExams.find(
        (e) => e._id === examToPermit
      );

      setViewingStudent((prev) => ({
        ...prev,
        examPermissions: [
          ...(prev.examPermissions || []),
          granted || { _id: examToPermit },
        ],
      }));

      setExamToPermit("");
    } catch (err) {
      alertError(
        err.response?.data?.message || "Failed to grant access"
      );
    } finally {
      setGrantingAccess(false);
    }
  };

  const handleRevokeExamAccess = async (examId) => {
    if (!viewingStudent?.user?._id) return;

    try {
      await api.delete(
        `/exams/${examId}/permissions/${viewingStudent.user._id}`
      );

      alertSuccess("Exam access revoked");

      setViewingStudent((prev) => ({
        ...prev,
        examPermissions: (prev.examPermissions || []).filter(
          (e) => (e._id || e) !== examId
        ),
      }));
    } catch {
      alertError("Failed to revoke access");
    }
  };

  const fetchStudents = async () => {
    setLoading(true);

    try {
      const { data } = await api.get(
        `/students?page=${page}&limit=${limit}&search=${search}`
      );

      setStudents(data.data?.students || []);
      setTotal(data.data?.total || 0);
    } catch {
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchBatches = async () => {
    try {
      const { data } = await api.get("/batches");
      setBatches(data.data?.batches || []);
    } catch {
      setBatches([]);
    }
  };

  useEffect(() => {
    fetchStudents();
    fetchBatches();
  }, [page, search]);

  const handleCreate = async (e) => {
    e.preventDefault();
    setCreating(true);

    try {
      const { data } = await api.post(
        "/auth/admin/create-student",
        form
      );

      alertSuccess(
        `Student created. ID: ${data.data.studentId}. Default password: Neetvidya@123 — the student must change it on first login.`
      );

      setShowCreate(false);

      setForm({
        name: "",
        email: "",
        phone: "",
        currentClass: "DROPPER",
        studentType: "REGULAR_OFFLINE",
        city: "",
        parentName: "",
        parentPhone: "",
        school: "",
      });

      fetchStudents();
    } catch (err) {
      alertError(
        err.response?.data?.message || "Failed to create student"
      );
    } finally {
      setCreating(false);
    }
  };

  const toggleActive = async (studentId, isActive) => {
    try {
      await api.put(`/students/${studentId}/toggle-active`);

      alertSuccess(
        isActive
          ? "Student deactivated"
          : "Student activated"
      );

      fetchStudents();
    } catch {
      alertError("Failed to update student");
    }
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();

    if (!editingStudent) return;

    setSavingEdit(true);

    try {
      await api.put(`/students/${editingStudent._id}`, {
        name: editingStudent.name,
        phone: editingStudent.phone,
        currentClass: editingStudent.currentClass,
        studentType: editingStudent.studentType,
        city: editingStudent.city,
        school: editingStudent.school,
        parentName: editingStudent.parentName,
        parentPhone: editingStudent.parentPhone,
        batches:
          editingStudent.batches?.map((b) =>
            typeof b === "object" ? b._id : b
          ) || [],
      });

      alertSuccess("Student updated successfully");

      setEditingStudent(null);
      fetchStudents();
    } catch (err) {
      alertError(
        err.response?.data?.message ||
          "Failed to update student"
      );
    } finally {
      setSavingEdit(false);
    }
  };

  const confirmDeleteStudent = async () => {
    if (!studentToDelete) return;

    try {
      await api.delete(
        `/students/${studentToDelete._id}`
      );

      alertSuccess("Student deleted successfully");

      setStudentToDelete(null);
      fetchStudents();
    } catch (err) {
      alertError(
        err.response?.data?.message ||
          "Failed to delete student"
      );
    }
  };

  const openStudent = (student) => {
    setViewingStudent(student);
    setExamToPermit("");
    loadGrantableExams();
  };

  const openEdit = (student) => {
    setEditingStudent({
      ...student,
      name: student.user?.name || "",
      phone: student.user?.phone || student.phone || "",
      batches: student.batches || [],
    });
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="min-h-full space-y-5 overflow-x-hidden p-3 sm:space-y-6 sm:p-5 lg:p-7">
      {/* Header */}
      <section className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
        <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-green-200/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 left-1/3 h-48 w-48 rounded-full bg-emerald-100/30 blur-3xl" />

        <div className="relative flex flex-col gap-5 p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between lg:p-7">
          <div className="min-w-0">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.16em] text-green-700">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
              Student Management
            </div>

            <h1 className="font-heading text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              Students
            </h1>

            <p className="mt-1.5 max-w-xl text-sm leading-6 text-slate-500">
              Manage student profiles, batches, access permissions,
              and account status from one place.
            </p>

            <div className="mt-4 inline-flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2 text-xs font-bold text-slate-600">
              <Users className="h-4 w-4 text-brand-green" />
              {total} total students
            </div>
          </div>

          <button
            onClick={() => setShowCreate(true)}
            className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-green-600/15 transition hover:bg-green-700 hover:shadow-xl hover:shadow-green-600/20"
          >
            <Plus className="h-4 w-4" />
            Add Student
          </button>
        </div>
      </section>

      {/* Search */}
      <section className="rounded-[1.5rem] border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search by name, email or student ID..."
            className="min-h-11 w-full rounded-xl border border-slate-200 bg-slate-50/60 pl-10 pr-4 text-sm text-slate-800 transition focus:border-green-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-500/15"
          />
        </div>
      </section>

      {/* Loading */}
      {loading ? (
        <div className="rounded-[1.75rem] border border-slate-200 bg-white p-10 shadow-sm">
          <div className="flex flex-col items-center justify-center">
            <div className="h-10 w-10 animate-spin rounded-full border-2 border-green-500 border-t-transparent" />
            <p className="mt-4 text-xs font-semibold text-slate-400">
              Loading students...
            </p>
          </div>
        </div>
      ) : students.length === 0 ? (
        /* Empty */
        <div className="rounded-[1.75rem] border border-slate-200 bg-white p-10 text-center shadow-sm sm:p-14">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-green-50 text-green-500">
            <Users className="h-7 w-7" />
          </div>

          <h3 className="mt-5 font-bold text-slate-700">
            No students found
          </h3>

          <p className="mx-auto mt-1 max-w-sm text-sm leading-6 text-slate-400">
            Add your first student or adjust the search
            to find an existing student.
          </p>
        </div>
      ) : (
        <>
          {/* Mobile / Tablet Cards */}
          <div className="grid min-w-0 gap-3 md:grid-cols-2 lg:hidden">
            {students.map((s) => {
              const name = s.user?.name || "Unnamed Student";
              const email = s.user?.email || "No email";
              const type =
                s.studentType || "GUEST";

              return (
                <article
                  key={s._id}
                  className="min-w-0 w-full overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-900/5 sm:p-5"
                >
                  {/* Student heading */}
                  <div className="flex min-w-0 items-start gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-green-400 to-emerald-600 text-lg font-extrabold text-white shadow-md shadow-green-600/15">
                      {getInitial(name)}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex min-w-0 items-start justify-between gap-2">
                        <div className="min-w-0 flex-1">
                          <h3 className="truncate text-sm font-extrabold text-slate-800">
                            {name}
                          </h3>

                          <div className="mt-1 flex min-w-0 items-center gap-1.5 text-[11px] text-slate-400">
                            <Mail className="h-3 w-3 shrink-0" />
                            <span className="min-w-0 truncate">
                              {email}
                            </span>
                          </div>
                        </div>

                        <span
                          className={`inline-flex max-w-[105px] shrink-0 items-center gap-1.5 overflow-hidden rounded-full border px-2 py-1 text-[9px] font-bold uppercase tracking-wide ${
                            s.isActive
                              ? "border-green-200 bg-green-50 text-green-700"
                              : "border-red-200 bg-red-50 text-red-600"
                          }`}
                        >
                          <span
                            className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                              s.isActive
                                ? "bg-green-500"
                                : "bg-red-500"
                            }`}
                          />
                          <span className="truncate">
                            {s.isActive
                              ? "Active"
                              : "Inactive"}
                          </span>
                        </span>
                      </div>

                      <div className="mt-2 flex min-w-0 items-center gap-2">
                        <span className="max-w-[140px] truncate rounded-lg bg-slate-100 px-2 py-1 font-mono text-[10px] font-bold text-slate-600">
                          {s.studentId || "No ID"}
                        </span>

                        <span className="truncate text-[11px] font-semibold text-slate-400">
                          {s.currentClass || "—"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="mt-4 grid min-w-0 grid-cols-2 gap-2">
                    <div className="min-w-0 rounded-xl bg-slate-50 p-3">
                      <div className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wider text-slate-400">
                        <GraduationCap className="h-3 w-3 shrink-0" />
                        Class
                      </div>
                      <p className="mt-1 truncate text-xs font-bold text-slate-700">
                        {s.currentClass || "—"}
                      </p>
                    </div>

                    <div className="min-w-0 rounded-xl bg-slate-50 p-3">
                      <div className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wider text-slate-400">
                        <ShieldCheck className="h-3 w-3 shrink-0" />
                        Type
                      </div>
                      <p className="mt-1 truncate text-xs font-bold text-slate-700">
                        {getTypeLabel(type)}
                      </p>
                    </div>

                    <div className="min-w-0 rounded-xl bg-slate-50 p-3">
                      <div className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wider text-slate-400">
                        <MapPin className="h-3 w-3 shrink-0" />
                        City
                      </div>
                      <p className="mt-1 truncate text-xs font-bold text-slate-700">
                        {s.city || "—"}
                      </p>
                    </div>

                    <div className="min-w-0 rounded-xl bg-slate-50 p-3">
                      <div className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wider text-slate-400">
                        <Phone className="h-3 w-3 shrink-0" />
                        Phone
                      </div>
                      <p className="mt-1 truncate text-xs font-bold text-slate-700">
                        {s.user?.phone ||
                          s.phone ||
                          "—"}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-3 grid min-w-0 grid-cols-[1fr_1fr_40px_40px] gap-2">
                    <button
                      onClick={() => openStudent(s)}
                      className="flex min-h-10 min-w-0 items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-2 text-xs font-bold text-slate-600 transition hover:bg-slate-50 hover:text-slate-800"
                    >
                      <Eye className="h-3.5 w-3.5 shrink-0" />
                      <span className="truncate">
                        View
                      </span>
                    </button>

                    <button
                      onClick={() => openEdit(s)}
                      className="flex min-h-10 min-w-0 items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-2 text-xs font-bold text-slate-600 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
                    >
                      <Pencil className="h-3.5 w-3.5 shrink-0" />
                      <span className="truncate">
                        Edit
                      </span>
                    </button>

                    <button
                      onClick={() =>
                        toggleActive(
                          s._id,
                          s.isActive
                        )
                      }
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition ${
                        s.isActive
                          ? "border-red-100 bg-red-50 text-red-500 hover:bg-red-100"
                          : "border-green-100 bg-green-50 text-green-600 hover:bg-green-100"
                      }`}
                      title={
                        s.isActive
                          ? "Deactivate"
                          : "Activate"
                      }
                    >
                      {s.isActive ? (
                        <UserX className="h-4 w-4" />
                      ) : (
                        <UserCheck className="h-4 w-4" />
                      )}
                    </button>

                    <button
                      onClick={() =>
                        setStudentToDelete(s)
                      }
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-red-100 bg-red-50 text-red-400 transition hover:bg-red-100 hover:text-red-600"
                      title="Delete Student"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Desktop Table */}
          <div className="hidden overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-sm lg:block">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] text-sm">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/70">
                    <th className="px-5 py-4 text-left text-[10px] font-extrabold uppercase tracking-[0.14em] text-slate-400">
                      Student
                    </th>
                    <th className="px-5 py-4 text-left text-[10px] font-extrabold uppercase tracking-[0.14em] text-slate-400">
                      Student ID
                    </th>
                    <th className="px-5 py-4 text-left text-[10px] font-extrabold uppercase tracking-[0.14em] text-slate-400">
                      Class
                    </th>
                    <th className="px-5 py-4 text-left text-[10px] font-extrabold uppercase tracking-[0.14em] text-slate-400">
                      Type
                    </th>
                    <th className="px-5 py-4 text-left text-[10px] font-extrabold uppercase tracking-[0.14em] text-slate-400">
                      City
                    </th>
                    <th className="px-5 py-4 text-left text-[10px] font-extrabold uppercase tracking-[0.14em] text-slate-400">
                      Status
                    </th>
                    <th className="px-5 py-4 text-right text-[10px] font-extrabold uppercase tracking-[0.14em] text-slate-400">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {students.map((s) => (
                    <tr
                      key={s._id}
                      className="group transition hover:bg-slate-50/60"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-green-400 to-emerald-600 text-sm font-extrabold text-white shadow-sm">
                            {getInitial(
                              s.user?.name
                            )}
                          </div>

                          <div className="min-w-0">
                            <div className="max-w-[220px] truncate font-bold text-slate-800">
                              {s.user?.name ||
                                "Unnamed Student"}
                            </div>

                            <div className="mt-0.5 max-w-[240px] truncate text-xs text-slate-400">
                              {s.user?.email ||
                                "No email"}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <span className="rounded-lg bg-slate-100 px-2.5 py-1.5 font-mono text-[11px] font-bold text-slate-600">
                          {s.studentId || "—"}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <span className="text-sm font-semibold text-slate-600">
                          {s.currentClass || "—"}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex max-w-[150px] truncate rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${
                            typeColors[
                              s.studentType
                            ] ||
                            "border-slate-200 bg-slate-100 text-slate-600"
                          }`}
                        >
                          {getTypeLabel(
                            s.studentType
                          )}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <span className="max-w-[130px] truncate text-sm font-medium text-slate-600">
                          {s.city || "—"}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold ${
                            s.isActive
                              ? "border-green-200 bg-green-50 text-green-700"
                              : "border-red-200 bg-red-50 text-red-600"
                          }`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              s.isActive
                                ? "bg-green-500"
                                : "bg-red-500"
                            }`}
                          />
                          {s.isActive
                            ? "Active"
                            : "Inactive"}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() =>
                              openStudent(s)
                            }
                            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                            title="View Details"
                          >
                            <Eye className="h-4 w-4" />
                          </button>

                          <button
                            onClick={() =>
                              openEdit(s)
                            }
                            className="rounded-lg p-2 text-slate-400 transition hover:bg-indigo-50 hover:text-indigo-600"
                            title="Edit Student"
                          >
                            <Pencil className="h-4 w-4" />
                          </button>

                          <button
                            onClick={() =>
                              toggleActive(
                                s._id,
                                s.isActive
                              )
                            }
                            className={`rounded-lg p-2 transition ${
                              s.isActive
                                ? "text-red-400 hover:bg-red-50 hover:text-red-600"
                                : "text-green-500 hover:bg-green-50 hover:text-green-700"
                            }`}
                            title={
                              s.isActive
                                ? "Deactivate"
                                : "Activate"
                            }
                          >
                            {s.isActive ? (
                              <UserX className="h-4 w-4" />
                            ) : (
                              <UserCheck className="h-4 w-4" />
                            )}
                          </button>

                          <button
                            onClick={() =>
                              setStudentToDelete(s)
                            }
                            className="rounded-lg p-2 text-red-400 transition hover:bg-red-50 hover:text-red-600"
                            title="Delete Student"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination
                page={page}
                total={total}
                limit={limit}
                totalPages={totalPages}
                setPage={setPage}
              />
            )}
          </div>

          {/* Mobile Pagination */}
          {totalPages > 1 && (
            <div className="lg:hidden">
              <Pagination
                page={page}
                total={total}
                limit={limit}
                totalPages={totalPages}
                setPage={setPage}
              />
            </div>
          )}
        </>
      )}

      {/* Create Student Modal */}
      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/45 p-0 backdrop-blur-sm sm:items-center sm:p-4">
          <div className="flex max-h-[94dvh] w-full max-w-2xl flex-col overflow-hidden rounded-t-[2rem] bg-white shadow-2xl sm:max-h-[92dvh] sm:rounded-[2rem]">
            {/* Header */}
            <div className="flex shrink-0 items-start justify-between border-b border-slate-100 p-5 sm:p-6">
              <div className="min-w-0 pr-3">
                <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-green-50 px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-wider text-green-700">
                  <Plus className="h-3 w-3" />
                  New Student
                </div>

                <h2 className="text-xl font-extrabold text-slate-900">
                  Add New Student
                </h2>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  A student ID and temporary password
                  will be auto-generated and emailed.
                </p>
              </div>

              <button
                onClick={() => setShowCreate(false)}
                className="shrink-0 rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form
              onSubmit={handleCreate}
              className="min-h-0 flex-1 overflow-y-auto overscroll-contain"
            >
              <div className="space-y-5 p-5 sm:p-6">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className={labelClass}>
                      Full Name *
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
                      className={inputClass}
                      placeholder="Student's full name"
                    />
                  </div>

                  <div>
                    <label className={labelClass}>
                      Email *
                    </label>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) =>
                        setForm((f) => ({
                          ...f,
                          email: e.target.value,
                        }))
                      }
                      className={inputClass}
                      placeholder="email@example.com"
                    />
                  </div>

                  <div>
                    <label className={labelClass}>
                      Phone
                    </label>
                    <input
                      value={form.phone}
                      onChange={(e) =>
                        setForm((f) => ({
                          ...f,
                          phone: e.target.value,
                        }))
                      }
                      className={inputClass}
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>

                  <div>
                    <label className={labelClass}>
                      Current Class
                    </label>
                    <select
                      value={form.currentClass}
                      onChange={(e) =>
                        setForm((f) => ({
                          ...f,
                          currentClass:
                            e.target.value,
                        }))
                      }
                      className={inputClass}
                    >
                      {[
                        "XI",
                        "XII",
                        "DROPPER",
                        "REPEATER",
                      ].map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className={labelClass}>
                      Student Type
                    </label>
                    <select
                      value={form.studentType}
                      onChange={(e) =>
                        setForm((f) => ({
                          ...f,
                          studentType:
                            e.target.value,
                        }))
                      }
                      className={inputClass}
                    >
                      {[
                        "REGULAR_OFFLINE",
                        "REGULAR_ONLINE",
                        "HYBRID",
                        "EXAM_ONLY",
                        "GUEST",
                      ].map((t) => (
                        <option key={t} value={t}>
                          {t.replace(/_/g, " ")}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className={labelClass}>
                      City
                    </label>
                    <input
                      value={form.city}
                      onChange={(e) =>
                        setForm((f) => ({
                          ...f,
                          city: e.target.value,
                        }))
                      }
                      className={inputClass}
                      placeholder="City"
                    />
                  </div>

                  <div>
                    <label className={labelClass}>
                      Parent Name
                    </label>
                    <input
                      value={form.parentName}
                      onChange={(e) =>
                        setForm((f) => ({
                          ...f,
                          parentName:
                            e.target.value,
                        }))
                      }
                      className={inputClass}
                      placeholder="Parent's name"
                    />
                  </div>

                  <div>
                    <label className={labelClass}>
                      Parent Phone
                    </label>
                    <input
                      value={form.parentPhone}
                      onChange={(e) =>
                        setForm((f) => ({
                          ...f,
                          parentPhone:
                            e.target.value,
                        }))
                      }
                      className={inputClass}
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className={labelClass}>
                      School/College
                    </label>
                    <input
                      value={form.school}
                      onChange={(e) =>
                        setForm((f) => ({
                          ...f,
                          school: e.target.value,
                        }))
                      }
                      className={inputClass}
                      placeholder="School or college name"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className={labelClass}>
                      Initial Batch
                    </label>
                    <select
                      value={form.batch || ""}
                      onChange={(e) =>
                        setForm((f) => ({
                          ...f,
                          batch: e.target.value,
                        }))
                      }
                      className={inputClass}
                    >
                      <option value="">
                        No Batch Assigned
                      </option>

                      {batches.map((b) => (
                        <option
                          key={b._id}
                          value={b._id}
                        >
                          {b.name} ({b.code})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
                  <div className="flex gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-600">
                      <ShieldCheck className="h-4 w-4" />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs font-bold text-amber-800">
                        Account credentials
                      </p>
                      <p className="mt-0.5 text-[11px] leading-5 text-amber-700">
                        A unique Student ID and
                        temporary password will be
                        auto-generated and sent to the
                        student's email.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-1">
                  <button
                    type="button"
                    onClick={() =>
                      setShowCreate(false)
                    }
                    className="hidden flex-1 min-h-11 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 sm:block"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={creating}
                    className="flex min-h-11 flex-1 items-center justify-center rounded-xl bg-green-600 px-4 text-sm font-bold text-white shadow-lg shadow-green-600/15 transition hover:bg-green-700 disabled:opacity-60"
                  >
                    {creating
                      ? "Creating..."
                      : "Create Student"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Student Modal */}
      {viewingStudent && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/45 p-0 backdrop-blur-sm sm:items-center sm:p-4">
          <div className="flex max-h-[94dvh] w-full max-w-2xl flex-col overflow-hidden rounded-t-[2rem] bg-white shadow-2xl sm:max-h-[92dvh] sm:rounded-[2rem]">
            {/* Header */}
            <div className="flex shrink-0 items-center justify-between border-b border-slate-100 p-5 sm:p-6">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-green-400 to-emerald-600 text-xl font-extrabold text-white shadow-md">
                  {getInitial(
                    viewingStudent.user?.name
                  )}
                </div>

                <div className="min-w-0">
                  <h3 className="truncate text-lg font-extrabold text-slate-900">
                    {viewingStudent.user?.name ||
                      "Student"}
                  </h3>

                  <p className="truncate font-mono text-[10px] text-slate-400">
                    ID:{" "}
                    {viewingStudent.studentId ||
                      "—"}
                  </p>
                </div>
              </div>

              <button
                onClick={() =>
                  setViewingStudent(null)
                }
                className="shrink-0 rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Body */}
            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
              <div className="space-y-5 p-5 sm:p-6">
                {/* Basic info */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-2xl border border-slate-100 bg-slate-50 p-3.5">
                    <div className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                      Class
                    </div>
                    <div className="mt-1 font-bold text-slate-800">
                      {viewingStudent.currentClass ||
                        "—"}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-100 bg-slate-50 p-3.5">
                    <div className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                      Student Type
                    </div>
                    <div className="mt-1 truncate font-bold text-slate-800">
                      {getTypeLabel(
                        viewingStudent.studentType
                      )}
                    </div>
                  </div>
                </div>

                {/* Contact */}
                <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
                  <div className="mb-3 text-[10px] font-extrabold uppercase tracking-[0.14em] text-slate-400">
                    Contact Information
                  </div>

                  <div className="space-y-3">
                    <div className="flex min-w-0 items-start gap-2.5 text-sm text-slate-600">
                      <Mail className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
                      <span className="min-w-0 break-all">
                        {viewingStudent.user?.email ||
                          "No email"}
                      </span>
                    </div>

                    <div className="flex min-w-0 items-center gap-2.5 text-sm text-slate-600">
                      <Phone className="h-4 w-4 shrink-0 text-slate-400" />
                      <span className="truncate">
                        {viewingStudent.user?.phone ||
                          viewingStudent.phone ||
                          "No phone"}
                      </span>
                    </div>

                    {viewingStudent.city && (
                      <div className="flex min-w-0 items-start gap-2.5 text-sm text-slate-600">
                        <Building2 className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
                        <span className="min-w-0 break-words">
                          City:{" "}
                          {viewingStudent.city}
                        </span>
                      </div>
                    )}

                    {viewingStudent.school && (
                      <div className="flex min-w-0 items-start gap-2.5 text-sm text-slate-600">
                        <BookOpen className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
                        <span className="min-w-0 break-words">
                          School/College:{" "}
                          {viewingStudent.school}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Guardian */}
                <div className="border-t border-slate-100 pt-5">
                  <div className="mb-2 text-[10px] font-extrabold uppercase tracking-[0.14em] text-slate-400">
                    Guardian Information
                  </div>

                  <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                    <div className="font-bold text-slate-800">
                      {viewingStudent.parentName ||
                        "Not specified"}
                    </div>

                    {viewingStudent.parentPhone && (
                      <div className="mt-1.5 flex items-center gap-1.5 text-xs text-slate-500">
                        <Phone className="h-3 w-3 text-slate-400" />
                        {viewingStudent.parentPhone}
                      </div>
                    )}
                  </div>
                </div>

                {/* Batches */}
                <div className="border-t border-slate-100 pt-5">
                  <div className="mb-2 text-[10px] font-extrabold uppercase tracking-[0.14em] text-slate-400">
                    Enrolled Batches
                  </div>

                  {viewingStudent.batches?.length >
                  0 ? (
                    <div className="flex flex-wrap gap-2">
                      {viewingStudent.batches.map(
                        (b) => (
                          <span
                            key={b._id || b}
                            className="max-w-full truncate rounded-xl border border-green-200 bg-green-50 px-3 py-1.5 text-xs font-bold text-green-700"
                          >
                            {b.name ||
                              b.code ||
                              "Batch"}
                          </span>
                        )
                      )}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-400">
                      No batch assigned currently.
                    </p>
                  )}
                </div>

                {/* Exam Permissions */}
                <div className="border-t border-slate-100 pt-5">
                  <div className="mb-1 text-[10px] font-extrabold uppercase tracking-[0.14em] text-slate-400">
                    Exam Access Permissions
                  </div>

                  <p className="mb-3 text-xs leading-5 text-slate-400">
                    Grant this student access to a
                    specific exam without joining its
                    batch.
                  </p>

                  <div className="flex min-w-0 flex-col gap-2 sm:flex-row">
                    <select
                      value={examToPermit}
                      onChange={(e) =>
                        setExamToPermit(
                          e.target.value
                        )
                      }
                      className={`${inputClass} min-w-0 flex-1`}
                    >
                      <option value="">
                        Select an exam to grant
                        access...
                      </option>

                      {grantableExams.map((ex) => (
                        <option
                          key={ex._id}
                          value={ex._id}
                        >
                          {ex.title}
                          {ex.batch?.name
                            ? ` — ${ex.batch.name}`
                            : ""}
                        </option>
                      ))}
                    </select>

                    <button
                      onClick={
                        handleGrantExamAccess
                      }
                      disabled={
                        !examToPermit ||
                        grantingAccess
                      }
                      className="inline-flex min-h-11 shrink-0 items-center justify-center gap-1.5 rounded-xl bg-green-600 px-4 text-xs font-bold text-white transition hover:bg-green-700 disabled:opacity-50"
                    >
                      <ShieldCheck className="h-3.5 w-3.5" />
                      {grantingAccess
                        ? "Granting..."
                        : "Grant"}
                    </button>
                  </div>

                  {viewingStudent.examPermissions
                    ?.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {viewingStudent.examPermissions.map(
                        (ex) => (
                          <span
                            key={ex._id || ex}
                            className="inline-flex max-w-full items-center gap-1.5 rounded-xl border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700"
                          >
                            <span className="max-w-[180px] truncate">
                              {ex.title || "Exam"}
                            </span>

                            <button
                              onClick={() =>
                                handleRevokeExamAccess(
                                  ex._id || ex
                                )
                              }
                              className="shrink-0 text-blue-400 transition hover:text-red-500"
                              title="Revoke access"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </span>
                        )
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="shrink-0 border-t border-slate-100 p-5 sm:p-6">
              <div className="flex gap-3">
                <button
                  onClick={() =>
                    setViewingStudent(null)
                  }
                  className="hidden flex-1 min-h-11 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 sm:block"
                >
                  Close
                </button>

                <button
                  onClick={() => {
                    const s = viewingStudent;

                    setViewingStudent(null);

                    setEditingStudent({
                      ...s,
                      name:
                        s.user?.name || "",
                      phone:
                        s.user?.phone ||
                        s.phone ||
                        "",
                      batches:
                        s.batches || [],
                    });
                  }}
                  className="flex min-h-11 flex-1 items-center justify-center rounded-xl bg-green-600 text-sm font-bold text-white shadow-lg shadow-green-600/15 transition hover:bg-green-700"
                >
                  Edit Student
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Student Modal */}
      {editingStudent && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/45 p-0 backdrop-blur-sm sm:items-center sm:p-4">
          <div className="flex max-h-[94dvh] w-full max-w-2xl flex-col overflow-hidden rounded-t-[2rem] bg-white shadow-2xl sm:max-h-[92dvh] sm:rounded-[2rem]">
            {/* Header */}
            <div className="flex shrink-0 items-start justify-between border-b border-slate-100 p-5 sm:p-6">
              <div className="min-w-0 pr-3">
                <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-indigo-50 px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-wider text-indigo-600">
                  <Pencil className="h-3 w-3" />
                  Student Profile
                </div>

                <h2 className="text-xl font-extrabold text-slate-900">
                  Edit Student
                </h2>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Update student details, class, or
                  assigned batches.
                </p>
              </div>

              <button
                onClick={() =>
                  setEditingStudent(null)
                }
                className="shrink-0 rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form
              onSubmit={handleSaveEdit}
              className="min-h-0 flex-1 overflow-y-auto overscroll-contain"
            >
              <div className="space-y-5 p-5 sm:p-6">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className={labelClass}>
                      Full Name *
                    </label>

                    <input
                      required
                      value={editingStudent.name}
                      onChange={(e) =>
                        setEditingStudent(
                          (prev) => ({
                            ...prev,
                            name: e.target.value,
                          })
                        )
                      }
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>
                      Phone
                    </label>

                    <input
                      value={
                        editingStudent.phone || ""
                      }
                      onChange={(e) =>
                        setEditingStudent(
                          (prev) => ({
                            ...prev,
                            phone: e.target.value,
                          })
                        )
                      }
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>
                      Current Class
                    </label>

                    <select
                      value={
                        editingStudent.currentClass
                      }
                      onChange={(e) =>
                        setEditingStudent(
                          (prev) => ({
                            ...prev,
                            currentClass:
                              e.target.value,
                          })
                        )
                      }
                      className={inputClass}
                    >
                      {[
                        "XI",
                        "XII",
                        "DROPPER",
                        "REPEATER",
                      ].map((c) => (
                        <option
                          key={c}
                          value={c}
                        >
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className={labelClass}>
                      Student Type
                    </label>

                    <select
                      value={
                        editingStudent.studentType
                      }
                      onChange={(e) =>
                        setEditingStudent(
                          (prev) => ({
                            ...prev,
                            studentType:
                              e.target.value,
                          })
                        )
                      }
                      className={inputClass}
                    >
                      {[
                        "REGULAR_OFFLINE",
                        "REGULAR_ONLINE",
                        "HYBRID",
                        "EXAM_ONLY",
                        "GUEST",
                      ].map((t) => (
                        <option
                          key={t}
                          value={t}
                        >
                          {t.replace(/_/g, " ")}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className={labelClass}>
                      City
                    </label>

                    <input
                      value={
                        editingStudent.city || ""
                      }
                      onChange={(e) =>
                        setEditingStudent(
                          (prev) => ({
                            ...prev,
                            city: e.target.value,
                          })
                        )
                      }
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>
                      Parent Name
                    </label>

                    <input
                      value={
                        editingStudent.parentName ||
                        ""
                      }
                      onChange={(e) =>
                        setEditingStudent(
                          (prev) => ({
                            ...prev,
                            parentName:
                              e.target.value,
                          })
                        )
                      }
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>
                      Parent Phone
                    </label>

                    <input
                      value={
                        editingStudent.parentPhone ||
                        ""
                      }
                      onChange={(e) =>
                        setEditingStudent(
                          (prev) => ({
                            ...prev,
                            parentPhone:
                              e.target.value,
                          })
                        )
                      }
                      className={inputClass}
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className={labelClass}>
                      School/College
                    </label>

                    <input
                      value={
                        editingStudent.school || ""
                      }
                      onChange={(e) =>
                        setEditingStudent(
                          (prev) => ({
                            ...prev,
                            school: e.target.value,
                          })
                        )
                      }
                      className={inputClass}
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className={labelClass}>
                      Assign Batch
                    </label>

                    <select
                      value={
                        editingStudent.batches?.[0]
                          ?._id ||
                        editingStudent.batches?.[0] ||
                        ""
                      }
                      onChange={(e) => {
                        const selectedVal =
                          e.target.value;

                        setEditingStudent(
                          (prev) => ({
                            ...prev,
                            batches: selectedVal
                              ? [selectedVal]
                              : [],
                          })
                        );
                      }}
                      className={inputClass}
                    >
                      <option value="">
                        No Batch Assigned
                      </option>

                      {batches.map((b) => (
                        <option
                          key={b._id}
                          value={b._id}
                        >
                          {b.name} ({b.code})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex gap-3 pt-1">
                  <button
                    type="button"
                    onClick={() =>
                      setEditingStudent(null)
                    }
                    className="hidden flex-1 min-h-11 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 sm:block"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={savingEdit}
                    className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-green-600 text-sm font-bold text-white shadow-lg shadow-green-600/15 transition hover:bg-green-700 disabled:opacity-60"
                  >
                    <Save className="h-4 w-4" />
                    {savingEdit
                      ? "Saving..."
                      : "Save Changes"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmModal
        isOpen={!!studentToDelete}
        onClose={() => setStudentToDelete(null)}
        onConfirm={confirmDeleteStudent}
        title="Delete Student"
        message={`Are you sure you want to permanently delete ${
          studentToDelete?.user?.name ||
          "this student"
        }? This action cannot be undone.`}
        confirmLabel="Delete Student"
        danger={true}
      />
    </div>
  );
}

function Pagination({
  page,
  total,
  limit,
  totalPages,
  setPage,
}) {
  return (
    <div className="flex flex-col gap-3 border-t border-slate-100 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
      <span className="text-center text-[11px] font-medium text-slate-400 sm:text-left">
        Showing{" "}
        {(page - 1) * limit + 1}–
        {Math.min(page * limit, total)} of{" "}
        {total}
      </span>

      <div className="flex justify-center gap-2 sm:justify-end">
        <button
          onClick={() =>
            setPage((p) => Math.max(1, p - 1))
          }
          disabled={page === 1}
          className="min-h-9 rounded-xl border border-slate-200 px-3.5 text-xs font-bold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Previous
        </button>

        <div className="flex min-h-9 items-center rounded-xl bg-slate-50 px-3 text-xs font-bold text-slate-500">
          {page} / {totalPages}
        </div>

        <button
          onClick={() =>
            setPage((p) =>
              Math.min(totalPages, p + 1)
            )
          }
          disabled={page === totalPages}
          className="min-h-9 rounded-xl border border-slate-200 px-3.5 text-xs font-bold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}