import { useState, useEffect } from "react";
import api from "../../config/api";
import {
  GraduationCap,
  Plus,
  Search,
  Eye,
  Mail,
  Pencil,
  X,
  Save,
  Phone,
  Clock,
  Target,
  Users,
  UserCheck,
  UserX,
} from "lucide-react";
import { alertSuccess, alertError } from "../../utils/alert";

export default function AdminTeachers() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [creating, setCreating] = useState(false);
  const [viewingTeacher, setViewingTeacher] = useState(null);
  const [editingTeacher, setEditingTeacher] = useState(null);
  const [savingEdit, setSavingEdit] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    qualification: "",
    experience: "",
    specialisation: "",
    bio: "",
  });

  const fetchTeachers = async () => {
    setLoading(true);

    try {
      const { data } = await api.get(`/teachers?search=${search}`);
      setTeachers(data.data?.teachers || []);
    } catch {
      setTeachers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, [search]);

  const handleCreate = async (e) => {
    e.preventDefault();
    setCreating(true);

    try {
      const { data } = await api.post(
        "/auth/admin/create-teacher",
        form
      );

      alertSuccess(
        `Teacher created! Temp password: ${data.data.tempPassword}`
      );

      setShowCreate(false);

      setForm({
        name: "",
        email: "",
        phone: "",
        qualification: "",
        experience: "",
        specialisation: "",
        bio: "",
      });

      fetchTeachers();
    } catch (err) {
      alertError(
        err.response?.data?.message || "Failed to create teacher"
      );
    } finally {
      setCreating(false);
    }
  };

  const toggleActive = async (teacherId, currentStatus) => {
    try {
      await api.put(`/teachers/${teacherId}/toggle-active`);

      alertSuccess(
        currentStatus
          ? "Faculty deactivated"
          : "Faculty activated"
      );

      fetchTeachers();
    } catch {
      alertError("Failed to update status");
    }
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();

    if (!editingTeacher) return;

    setSavingEdit(true);

    try {
      await api.put(`/teachers/${editingTeacher._id}`, {
        name: editingTeacher.name,
        phone: editingTeacher.phone,
        qualification: editingTeacher.qualification,
        experience: editingTeacher.experience,
        specialisation: editingTeacher.specialisation,
        bio: editingTeacher.bio,
      });

      alertSuccess("Teacher profile updated successfully");

      setEditingTeacher(null);
      fetchTeachers();
    } catch (err) {
      alertError(
        err.response?.data?.message ||
          "Failed to update teacher"
      );
    } finally {
      setSavingEdit(false);
    }
  };

  const filtered = teachers.filter((t) => {
    const query = search.toLowerCase();

    return (
      t.user?.name?.toLowerCase().includes(query) ||
      t.user?.email?.toLowerCase().includes(query) ||
      t.specialisation?.toLowerCase().includes(query)
    );
  });

  const openEdit = (teacher) => {
    setEditingTeacher({
      ...teacher,
      name: teacher.user?.name || "",
      phone: teacher.user?.phone || teacher.phone || "",
    });
  };

  const inputClass =
    "min-h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-green-500 focus:ring-4 focus:ring-green-500/10";

  const labelClass =
    "mb-1.5 block text-[10px] font-extrabold uppercase tracking-[0.16em] text-slate-500";

  return (
    <div className="min-h-full space-y-5 p-3 sm:space-y-6 sm:p-5 lg:p-7">
      {/* Header */}
      <section className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
        <div className="pointer-events-none absolute -right-16 -top-20 h-48 w-48 rounded-full bg-green-100/70 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 left-1/3 h-40 w-40 rounded-full bg-emerald-50 blur-3xl" />

        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-green-100 bg-green-50 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.16em] text-brand-green">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
              Faculty Management
            </div>

            <h1 className="font-heading text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl">
              Teachers & Faculty
            </h1>

            <p className="mt-1.5 max-w-xl text-sm leading-6 text-slate-500">
              Manage faculty profiles, contact information and
              account availability from one place.
            </p>

            <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-slate-400">
              <Users className="h-4 w-4" />
              <span>
                {teachers.length}{" "}
                {teachers.length === 1
                  ? "faculty member"
                  : "faculty members"}
              </span>
            </div>
          </div>

          <button
            onClick={() => setShowCreate(true)}
            className="inline-flex min-h-11 w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-brand-green px-5 text-sm font-bold text-white shadow-lg shadow-green-900/10 transition hover:-translate-y-0.5 hover:bg-green-700 sm:w-auto"
          >
            <Plus className="h-4 w-4" />
            Add Teacher
          </button>
        </div>
      </section>

      {/* Search */}
      <section className="rounded-[1.5rem] border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email or specialisation..."
            className="min-h-11 w-full rounded-xl border border-slate-200 bg-slate-50/60 pl-10 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-500/10"
          />
        </div>
      </section>

      {/* Loading */}
      {loading ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 shrink-0 animate-pulse rounded-2xl bg-slate-100" />

                <div className="min-w-0 flex-1 space-y-2">
                  <div className="h-4 w-2/3 animate-pulse rounded bg-slate-100" />
                  <div className="h-3 w-full animate-pulse rounded bg-slate-100" />
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <div className="h-3 w-4/5 animate-pulse rounded bg-slate-100" />
                <div className="h-3 w-3/5 animate-pulse rounded bg-slate-100" />
                <div className="h-3 w-full animate-pulse rounded bg-slate-100" />
              </div>

              <div className="mt-6 h-10 animate-pulse rounded-xl bg-slate-100" />
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        /* Empty */
        <div className="rounded-[2rem] border border-slate-200 bg-white px-5 py-14 text-center shadow-sm sm:px-10">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-green-50 text-brand-green">
            <GraduationCap className="h-8 w-8" />
          </div>

          <h3 className="mt-5 font-heading text-lg font-extrabold text-slate-800">
            No teachers found
          </h3>

          <p className="mx-auto mt-1.5 max-w-md text-sm leading-6 text-slate-400">
            {search
              ? "Try a different name, email or specialisation."
              : "Add your first teacher using the button above."}
          </p>
        </div>
      ) : (
        <>
          {/* Teacher Cards */}
          <div className="grid min-w-0 grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map((t) => (
              <article
                key={t._id}
                className="min-w-0 w-full overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-900/5 sm:p-5"
              >
                {/* Identity */}
                <div className="flex min-w-0 items-center gap-3.5">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-green-700 text-xl font-extrabold text-white shadow-lg shadow-green-900/10">
                    {t.user?.name?.charAt(0)?.toUpperCase() ||
                      "T"}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex min-w-0 items-center gap-2">
                      <h3 className="min-w-0 truncate text-base font-extrabold text-slate-800">
                        {t.user?.name || "Unnamed Teacher"}
                      </h3>

                      {t.isActive ? (
                        <span className="h-2 w-2 shrink-0 rounded-full bg-green-500" />
                      ) : (
                        <span className="h-2 w-2 shrink-0 rounded-full bg-slate-300" />
                      )}
                    </div>

                    <p className="mt-1 min-w-0 truncate text-xs text-slate-400">
                      {t.user?.email || "No email available"}
                    </p>
                  </div>
                </div>

                {/* Details */}
                <div className="mt-5 min-w-0 space-y-3">
                  {t.qualification && (
                    <div className="flex min-w-0 items-start gap-2.5">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-50 text-slate-400">
                        <GraduationCap className="h-3.5 w-3.5" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-[9px] font-extrabold uppercase tracking-widest text-slate-400">
                          Qualification
                        </p>
                        <p className="mt-0.5 break-words text-xs font-semibold leading-5 text-slate-600">
                          {t.qualification}
                        </p>
                      </div>
                    </div>
                  )}

                  {t.experience && (
                    <div className="flex min-w-0 items-start gap-2.5">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-50 text-slate-400">
                        <Clock className="h-3.5 w-3.5" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-[9px] font-extrabold uppercase tracking-widest text-slate-400">
                          Experience
                        </p>
                        <p className="mt-0.5 break-words text-xs font-semibold leading-5 text-slate-600">
                          {t.experience}
                        </p>
                      </div>
                    </div>
                  )}

                  {t.specialisation && (
                    <div className="flex min-w-0 items-start gap-2.5">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-50 text-slate-400">
                        <Target className="h-3.5 w-3.5" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-[9px] font-extrabold uppercase tracking-widest text-slate-400">
                          Specialisation
                        </p>
                        <p className="mt-0.5 line-clamp-2 break-words text-xs font-semibold leading-5 text-slate-600">
                          {t.specialisation}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Bio */}
                {t.bio && (
                  <div className="mt-5 min-w-0 rounded-xl bg-slate-50 p-3">
                    <p className="line-clamp-2 break-words text-xs leading-5 text-slate-500">
                      {t.bio}
                    </p>
                  </div>
                )}

                {/* Actions */}
                <div className="mt-5 grid min-w-0 grid-cols-[1fr_40px_40px_40px] gap-2 border-t border-slate-100 pt-4">
                  <button
                    onClick={() =>
                      toggleActive(t._id, t.isActive)
                    }
                    className={`min-w-0 min-h-10 rounded-xl border px-2 text-xs font-extrabold transition ${
                      t.isActive
                        ? "border-green-200 bg-green-50 text-green-700 hover:bg-green-100"
                        : "border-red-200 bg-red-50 text-red-600 hover:bg-red-100"
                    }`}
                    title="Click to toggle status"
                  >
                    <span className="inline-flex min-w-0 items-center justify-center gap-1.5">
                      {t.isActive ? (
                        <UserCheck className="h-3.5 w-3.5 shrink-0" />
                      ) : (
                        <UserX className="h-3.5 w-3.5 shrink-0" />
                      )}

                      <span className="truncate">
                        {t.isActive ? "Active" : "Inactive"}
                      </span>
                    </span>
                  </button>

                  <button
                    onClick={() => setViewingTeacher(t)}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
                    title="View Profile"
                  >
                    <Eye className="h-4 w-4" />
                  </button>

                  <button
                    onClick={() => openEdit(t)}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-slate-500 transition hover:bg-indigo-50 hover:text-indigo-600"
                    title="Edit Teacher"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>

                  {t.user?.email ? (
                    <a
                      href={`mailto:${t.user.email}?subject=NEETVIDYA Faculty Communication`}
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-slate-500 transition hover:bg-blue-50 hover:text-blue-600"
                      title={`Email ${t.user.name}`}
                    >
                      <Mail className="h-4 w-4" />
                    </a>
                  ) : (
                    <div className="h-10 w-10 shrink-0" />
                  )}
                </div>
              </article>
            ))}
          </div>
        </>
      )}

      {/* Create Teacher Modal */}
      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-0 backdrop-blur-sm sm:items-center sm:p-4">
          <div className="flex max-h-[94dvh] w-full flex-col overflow-hidden rounded-t-[2rem] bg-white shadow-2xl sm:max-h-[92dvh] sm:max-w-2xl sm:rounded-[2rem]">
            {/* Header */}
            <div className="flex shrink-0 items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-6 sm:py-5">
              <div className="min-w-0 pr-3">
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-green-50 text-brand-green">
                    <GraduationCap className="h-4 w-4" />
                  </div>

                  <div className="min-w-0">
                    <h2 className="truncate text-lg font-extrabold text-slate-900">
                      Add New Teacher
                    </h2>

                    <p className="mt-0.5 text-xs text-slate-400">
                      Create a faculty account and profile.
                    </p>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowCreate(false)}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Body */}
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
                      placeholder="Teacher's full name"
                    />
                  </div>

                  <div className="min-w-0">
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
                      placeholder="teacher@neetvidya.com"
                    />
                  </div>

                  <div className="min-w-0">
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

                  <div className="sm:col-span-2">
                    <label className={labelClass}>
                      Qualification
                    </label>

                    <input
                      value={form.qualification}
                      onChange={(e) =>
                        setForm((f) => ({
                          ...f,
                          qualification: e.target.value,
                        }))
                      }
                      className={inputClass}
                      placeholder="e.g. M.Sc Physics, B.Ed"
                    />
                  </div>

                  <div className="min-w-0">
                    <label className={labelClass}>
                      Experience
                    </label>

                    <input
                      value={form.experience}
                      onChange={(e) =>
                        setForm((f) => ({
                          ...f,
                          experience: e.target.value,
                        }))
                      }
                      className={inputClass}
                      placeholder="e.g. 10+ Years in NEET Coaching"
                    />
                  </div>

                  <div className="min-w-0">
                    <label className={labelClass}>
                      Specialisation
                    </label>

                    <input
                      value={form.specialisation}
                      onChange={(e) =>
                        setForm((f) => ({
                          ...f,
                          specialisation: e.target.value,
                        }))
                      }
                      className={inputClass}
                      placeholder="e.g. Mechanics & Electromagnetism"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className={labelClass}>
                      Short Bio
                    </label>

                    <textarea
                      value={form.bio}
                      onChange={(e) =>
                        setForm((f) => ({
                          ...f,
                          bio: e.target.value,
                        }))
                      }
                      rows={4}
                      className={`${inputClass} resize-none py-3`}
                      placeholder="Brief professional bio..."
                    />
                  </div>
                </div>

                <div className="rounded-xl border border-green-100 bg-green-50/70 p-3.5">
                  <div className="flex items-start gap-2.5">
                    <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" />

                    <p className="text-xs leading-5 text-green-800">
                      A temporary password will be generated and
                      emailed to the teacher after the account is
                      created.
                    </p>
                  </div>
                </div>

                {/* Actions inside scrollable body */}
                <div className="grid grid-cols-1 gap-2.5 pt-1 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={() => setShowCreate(false)}
                    className="hidden min-h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-600 transition hover:bg-slate-50 sm:block"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={creating}
                    className="min-h-11 rounded-xl bg-brand-green px-4 text-sm font-bold text-white shadow-lg shadow-green-900/10 transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60 sm:col-start-2"
                  >
                    {creating ? "Creating..." : "Add Teacher"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Teacher Modal */}
      {viewingTeacher && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-0 backdrop-blur-sm sm:items-center sm:p-4">
          <div className="flex max-h-[94dvh] w-full flex-col overflow-hidden rounded-t-[2rem] bg-white shadow-2xl sm:max-h-[92dvh] sm:max-w-xl sm:rounded-[2rem]">
            {/* Header */}
            <div className="flex shrink-0 items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-6 sm:py-5">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-green-700 text-lg font-extrabold text-white shadow-md">
                  {viewingTeacher.user?.name
                    ?.charAt(0)
                    ?.toUpperCase() || "T"}
                </div>

                <div className="min-w-0">
                  <h3 className="truncate text-base font-extrabold text-slate-900 sm:text-lg">
                    {viewingTeacher.user?.name ||
                      "Unnamed Teacher"}
                  </h3>

                  <p className="truncate text-xs text-slate-400">
                    {viewingTeacher.user?.email ||
                      "No email available"}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setViewingTeacher(null)}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Body */}
            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
              <div className="space-y-5 p-5 sm:p-6">
                {/* Status */}
                <div className="flex min-w-0 flex-wrap gap-2">
                  <span
                    className={`inline-flex max-w-full items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide ${
                      viewingTeacher.isActive
                        ? "border-green-200 bg-green-50 text-green-700"
                        : "border-red-200 bg-red-50 text-red-600"
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                        viewingTeacher.isActive
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    />

                    {viewingTeacher.isActive
                      ? "Active Faculty"
                      : "Inactive"}
                  </span>

                  {viewingTeacher.specialisation && (
                    <span className="inline-flex max-w-full items-center rounded-full border border-indigo-100 bg-indigo-50 px-2.5 py-1 text-[10px] font-bold text-indigo-700">
                      <span className="truncate">
                        {viewingTeacher.specialisation}
                      </span>
                    </span>
                  )}
                </div>

                {/* Information */}
                <div className="min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/70">
                  <div className="divide-y divide-slate-200">
                    {viewingTeacher.qualification && (
                      <div className="flex min-w-0 items-start gap-3 p-4">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-slate-400 shadow-sm">
                          <GraduationCap className="h-4 w-4" />
                        </div>

                        <div className="min-w-0 flex-1">
                          <span className="block text-[9px] font-extrabold uppercase tracking-widest text-slate-400">
                            Qualification
                          </span>

                          <span className="mt-1 block break-words text-sm font-bold leading-5 text-slate-700">
                            {viewingTeacher.qualification}
                          </span>
                        </div>
                      </div>
                    )}

                    {viewingTeacher.experience && (
                      <div className="flex min-w-0 items-start gap-3 p-4">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-slate-400 shadow-sm">
                          <Clock className="h-4 w-4" />
                        </div>

                        <div className="min-w-0 flex-1">
                          <span className="block text-[9px] font-extrabold uppercase tracking-widest text-slate-400">
                            Experience
                          </span>

                          <span className="mt-1 block break-words text-sm font-bold leading-5 text-slate-700">
                            {viewingTeacher.experience}
                          </span>
                        </div>
                      </div>
                    )}

                    {viewingTeacher.user?.phone && (
                      <div className="flex min-w-0 items-start gap-3 p-4">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-slate-400 shadow-sm">
                          <Phone className="h-4 w-4" />
                        </div>

                        <div className="min-w-0 flex-1">
                          <span className="block text-[9px] font-extrabold uppercase tracking-widest text-slate-400">
                            Phone
                          </span>

                          <span className="mt-1 block break-words text-sm font-bold text-slate-700">
                            {viewingTeacher.user.phone}
                          </span>
                        </div>
                      </div>
                    )}

                    {viewingTeacher.user?.email && (
                      <div className="flex min-w-0 items-start gap-3 p-4">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-slate-400 shadow-sm">
                          <Mail className="h-4 w-4" />
                        </div>

                        <div className="min-w-0 flex-1">
                          <span className="block text-[9px] font-extrabold uppercase tracking-widest text-slate-400">
                            Email
                          </span>

                          <span className="mt-1 block break-all text-sm font-bold text-slate-700">
                            {viewingTeacher.user.email}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Bio */}
                {viewingTeacher.bio && (
                  <div className="min-w-0">
                    <span className="mb-2 block text-[10px] font-extrabold uppercase tracking-[0.16em] text-slate-400">
                      Professional Bio
                    </span>

                    <div className="min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white p-4">
                      <p className="break-words text-sm leading-6 text-slate-600">
                        {viewingTeacher.bio}
                      </p>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="grid grid-cols-1 gap-2.5 pt-1 sm:grid-cols-2">
                  <button
                    onClick={() => setViewingTeacher(null)}
                    className="hidden min-h-11 rounded-xl border border-slate-200 px-4 text-sm font-bold text-slate-600 transition hover:bg-slate-50 sm:block"
                  >
                    Close
                  </button>

                  <button
                    onClick={() => {
                      const t = viewingTeacher;

                      setViewingTeacher(null);

                      setEditingTeacher({
                        ...t,
                        name: t.user?.name || "",
                        phone:
                          t.user?.phone || t.phone || "",
                      });
                    }}
                    className="min-h-11 rounded-xl bg-brand-green px-4 text-sm font-bold text-white shadow-lg shadow-green-900/10 transition hover:bg-green-700 sm:col-start-2"
                  >
                    Edit Faculty
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Teacher Modal */}
      {editingTeacher && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-0 backdrop-blur-sm sm:items-center sm:p-4">
          <div className="flex max-h-[94dvh] w-full flex-col overflow-hidden rounded-t-[2rem] bg-white shadow-2xl sm:max-h-[92dvh] sm:max-w-2xl sm:rounded-[2rem]">
            {/* Header */}
            <div className="flex shrink-0 items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-6 sm:py-5">
              <div className="min-w-0 pr-3">
                <h2 className="truncate text-lg font-extrabold text-slate-900 sm:text-xl">
                  Edit Faculty Profile
                </h2>

                <p className="mt-0.5 text-xs text-slate-400">
                  Update credentials and contact information.
                </p>
              </div>

              <button
                onClick={() => setEditingTeacher(null)}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Body */}
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
                      value={editingTeacher.name}
                      onChange={(e) =>
                        setEditingTeacher((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      className={inputClass}
                    />
                  </div>

                  <div className="min-w-0">
                    <label className={labelClass}>
                      Phone
                    </label>

                    <input
                      value={editingTeacher.phone || ""}
                      onChange={(e) =>
                        setEditingTeacher((prev) => ({
                          ...prev,
                          phone: e.target.value,
                        }))
                      }
                      className={inputClass}
                    />
                  </div>

                  <div className="min-w-0">
                    <label className={labelClass}>
                      Experience
                    </label>

                    <input
                      value={editingTeacher.experience || ""}
                      onChange={(e) =>
                        setEditingTeacher((prev) => ({
                          ...prev,
                          experience: e.target.value,
                        }))
                      }
                      className={inputClass}
                      placeholder="e.g. 10+ Years"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className={labelClass}>
                      Qualification
                    </label>

                    <input
                      value={
                        editingTeacher.qualification || ""
                      }
                      onChange={(e) =>
                        setEditingTeacher((prev) => ({
                          ...prev,
                          qualification: e.target.value,
                        }))
                      }
                      className={inputClass}
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className={labelClass}>
                      Specialisation
                    </label>

                    <input
                      value={
                        editingTeacher.specialisation || ""
                      }
                      onChange={(e) =>
                        setEditingTeacher((prev) => ({
                          ...prev,
                          specialisation: e.target.value,
                        }))
                      }
                      className={inputClass}
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className={labelClass}>
                      Short Bio
                    </label>

                    <textarea
                      rows={4}
                      value={editingTeacher.bio || ""}
                      onChange={(e) =>
                        setEditingTeacher((prev) => ({
                          ...prev,
                          bio: e.target.value,
                        }))
                      }
                      className={`${inputClass} resize-none py-3`}
                    />
                  </div>
                </div>

                {/* Actions inside scrollable body */}
                <div className="grid grid-cols-1 gap-2.5 pt-1 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={() => setEditingTeacher(null)}
                    className="hidden min-h-11 rounded-xl border border-slate-200 px-4 text-sm font-bold text-slate-600 transition hover:bg-slate-50 sm:block"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={savingEdit}
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-brand-green px-4 text-sm font-bold text-white shadow-lg shadow-green-900/10 transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60 sm:col-start-2"
                  >
                    <Save className="h-4 w-4" />

                    {savingEdit
                      ? "Saving..."
                      : "Save Profile"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}