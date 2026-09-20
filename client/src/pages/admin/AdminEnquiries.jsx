import { useState, useEffect } from "react";
import api from "../../config/api";
import {
  MessageSquare,
  Search,
  Phone,
  Mail,
  Eye,
  Trash2,
  Download,
  ArrowUpRight,
  Inbox,
} from "lucide-react";
import { alertSuccess, alertError } from "../../utils/alert";
import ConfirmModal from "../../components/shared/ConfirmModal";

const statusColors = {
  NEW: "bg-blue-50 text-blue-700 border-blue-200",
  IN_PROGRESS: "bg-amber-50 text-amber-700 border-amber-200",
  RESOLVED: "bg-green-50 text-green-700 border-green-200",
  CLOSED: "bg-slate-100 text-slate-600 border-slate-200",
};

const statusDotColors = {
  NEW: "bg-blue-500",
  IN_PROGRESS: "bg-amber-500",
  RESOLVED: "bg-green-500",
  CLOSED: "bg-slate-400",
};

export default function AdminEnquiries() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selected, setSelected] = useState(null);
  const [enquiryToDelete, setEnquiryToDelete] = useState(null);

  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/enquiries");
      setEnquiries(data.data?.enquiries || []);
    } catch {
      setEnquiries([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/enquiries/${id}`, { status });
      alertSuccess("Status updated");
      fetchEnquiries();
      setSelected(null);
    } catch {
      alertError("Failed to update status");
    }
  };

  const confirmDeleteEnquiry = async () => {
    if (!enquiryToDelete) return;

    try {
      await api.delete(`/enquiries/${enquiryToDelete._id}`);
      alertSuccess("Enquiry deleted");

      if (selected?._id === enquiryToDelete._id) {
        setSelected(null);
      }

      setEnquiryToDelete(null);
      fetchEnquiries();
    } catch {
      alertError("Failed to delete enquiry");
    }
  };

  const filtered = enquiries.filter((e) => {
    const query = search.toLowerCase();

    const matchSearch =
      e.name?.toLowerCase().includes(query) ||
      e.email?.toLowerCase().includes(query) ||
      e.phone?.includes(search);

    const matchStatus =
      statusFilter === "All" || e.status === statusFilter;

    return matchSearch && matchStatus;
  });

  const exportToCSV = () => {
    if (filtered.length === 0) {
      alertError("No enquiries to export");
      return;
    }

    const headers = [
      "Name",
      "Email",
      "Phone",
      "Course Interest",
      "Message",
      "Status",
      "Date",
    ];

    const rows = filtered.map((e) => [
      `"${e.name || ""}"`,
      `"${e.email || ""}"`,
      `"${e.phone || ""}"`,
      `"${e.courseInterest || ""}"`,
      `"${(e.message || "").replace(/"/g, '""')}"`,
      `"${e.status || "NEW"}"`,
      `"${e.createdAt
        ? new Date(e.createdAt).toLocaleDateString("en-IN")
        : ""
      }"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");

    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `neetvidya_enquiries_${new Date().toISOString().slice(0, 10)}.csv`
    );

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    alertSuccess("Enquiries exported to CSV");
  };

  const newCount = enquiries.filter((e) => e.status === "NEW").length;

  return (
    <div className="min-h-full space-y-5 p-3 sm:space-y-6 sm:p-5 lg:p-7">
      {/* Header */}
      <section className="relative overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-6 lg:p-7">
        <div className="absolute -right-20 -top-24 h-56 w-56 rounded-full bg-green-100/60 blur-3xl" />
        <div className="absolute -bottom-24 -left-20 h-56 w-56 rounded-full bg-emerald-100/50 blur-3xl" />

        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-brand-green sm:text-[11px]">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
              Contact Management
            </div>

            <h1 className="font-heading text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              Enquiries
            </h1>

            <p className="mt-1.5 text-sm leading-6 text-slate-500">
              Manage admission enquiries and follow up with prospective
              students.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 rounded-xl border border-blue-100 bg-blue-50 px-3 py-2.5">
              <span className="h-2 w-2 rounded-full bg-blue-500" />
              <span className="text-xs font-bold text-blue-700">
                {newCount} New
              </span>
            </div>

            <button
              onClick={exportToCSV}
              className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-bold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
            >
              <Download className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Export CSV</span>
              <span className="sm:hidden">Export</span>
            </button>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="rounded-[1.5rem] border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, email or phone..."
              className="min-h-11 w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-10 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-500/10"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="min-h-11 rounded-xl border border-slate-200 bg-slate-50/50 px-4 text-sm font-semibold text-slate-600 outline-none transition focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-500/10 sm:min-w-44"
          >
            {["All", "NEW", "IN_PROGRESS", "RESOLVED", "CLOSED"].map((s) => (
              <option key={s} value={s}>
                {s === "All" ? "All Statuses" : s.replace(/_/g, " ")}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-3 flex items-center justify-between px-1">
          <p className="text-[11px] font-medium text-slate-400">
            Showing{" "}
            <span className="font-bold text-slate-600">
              {filtered.length}
            </span>{" "}
            of{" "}
            <span className="font-bold text-slate-600">
              {enquiries.length}
            </span>{" "}
            enquiries
          </p>

          {(search || statusFilter !== "All") && (
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setStatusFilter("All");
              }}
              className="text-[11px] font-bold text-brand-green hover:underline"
            >
              Clear filters
            </button>
          )}
        </div>
      </section>

      {/* Content */}
      {loading ? (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 animate-pulse rounded-xl bg-slate-100" />
                <div className="flex-1">
                  <div className="h-4 w-28 animate-pulse rounded bg-slate-100" />
                  <div className="mt-2 h-3 w-40 animate-pulse rounded bg-slate-100" />
                </div>
              </div>

              <div className="mt-5 h-3 w-full animate-pulse rounded bg-slate-100" />
              <div className="mt-2 h-3 w-4/5 animate-pulse rounded bg-slate-100" />
              <div className="mt-5 h-8 w-24 animate-pulse rounded-lg bg-slate-100" />
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white px-5 py-14 text-center shadow-sm sm:py-20">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-green-50 text-brand-green">
            <Inbox className="h-7 w-7" />
          </div>

          <h3 className="mt-5 text-base font-extrabold text-slate-700">
            No enquiries found
          </h3>

          <p className="mx-auto mt-1.5 max-w-sm text-sm leading-6 text-slate-400">
            Enquiries submitted through the contact form will appear here.
          </p>
        </div>
      ) : (
        <>
          {/* Mobile / Tablet Cards */}
          <div className="grid min-w-0 gap-3 md:grid-cols-2 lg:hidden">
            {filtered.map((e) => {
              const status = e.status || "NEW";

              return (
                <article
                  key={e._id}
                  className="min-w-0 w-full overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-lg hover:shadow-slate-900/5 sm:p-5"
                >
                  <div className="flex min-w-0 items-start gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-50 text-brand-green">
                      <MessageSquare className="h-5 w-5" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex min-w-0 items-start justify-between gap-2">
                        <div className="min-w-0 flex-1">
                          <h3 className="truncate text-sm font-extrabold text-slate-800">
                            {e.name}
                          </h3>

                          <div className="mt-1 flex min-w-0 items-center gap-1 text-[11px] text-slate-400">
                            <Mail className="h-3 w-3 shrink-0" />
                            <span className="min-w-0 truncate">
                              {e.email}
                            </span>
                          </div>
                        </div>

                        <span
                          className={`inline-flex max-w-[110px] shrink-0 items-center gap-1.5 overflow-hidden rounded-full border px-2 py-1 text-[9px] font-bold uppercase tracking-wide ${statusColors[status]}`}
                        >
                          <span
                            className={`h-1.5 w-1.5 shrink-0 rounded-full ${statusDotColors[status]}`}
                          />

                          <span className="truncate">
                            {status.replace(/_/g, " ")}
                          </span>
                        </span>
                      </div>

                      {e.phone && (
                        <div className="mt-2 flex min-w-0 items-center gap-1 text-[11px] text-slate-400">
                          <Phone className="h-3 w-3 shrink-0" />
                          <span className="truncate">{e.phone}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 min-w-0 overflow-hidden rounded-xl bg-slate-50 p-3">
                    <div className="flex min-w-0 items-center justify-between gap-2">
                      <span className="min-w-0 truncate text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Course Interest
                      </span>

                      <span className="shrink-0 text-[10px] font-medium text-slate-400">
                        {e.createdAt
                          ? new Date(e.createdAt).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                          })
                          : "—"}
                      </span>
                    </div>

                    <p className="mt-1 truncate text-xs font-semibold text-slate-600">
                      {e.courseInterest || "General Enquiry"}
                    </p>

                    {e.message && (
                      <p className="mt-2 line-clamp-2 break-words text-xs leading-5 text-slate-500">
                        {e.message}
                      </p>
                    )}
                  </div>

                  <div className="mt-3 grid min-w-0 grid-cols-[1fr_1fr_40px] gap-2">
                    <button
                      type="button"
                      onClick={() => setSelected(e)}
                      className="flex min-w-0 min-h-10 items-center justify-center gap-1.5 overflow-hidden rounded-xl border border-slate-200 bg-white px-2 text-xs font-bold text-slate-600 transition hover:bg-slate-50"
                    >
                      <Eye className="h-3.5 w-3.5 shrink-0" />
                      <span className="truncate">View</span>
                    </button>

                    <select
                      value={status}
                      onChange={(ev) =>
                        updateStatus(e._id, ev.target.value)
                      }
                      className={`min-w-0 min-h-10 w-full rounded-xl border px-1 text-center text-[10px] font-bold outline-none ${statusColors[status]}`}
                    >
                      {["NEW", "IN_PROGRESS", "RESOLVED", "CLOSED"].map(
                        (s) => (
                          <option key={s} value={s}>
                            {s.replace(/_/g, " ")}
                          </option>
                        )
                      )}
                    </select>

                    <button
                      type="button"
                      onClick={() => setEnquiryToDelete(e)}
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-red-100 bg-red-50 text-red-500 transition hover:bg-red-100 hover:text-red-600"
                      title="Delete Enquiry"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Desktop Table */}
          <div className="hidden overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-sm lg:block">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/70">
                    <th className="px-5 py-4 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Contact
                    </th>

                    <th className="px-5 py-4 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Course Interest
                    </th>

                    <th className="px-5 py-4 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Message
                    </th>

                    <th className="px-5 py-4 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Status
                    </th>

                    <th className="px-5 py-4 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Date
                    </th>

                    <th className="px-5 py-4 text-right text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-50">
                  {filtered.map((e) => {
                    const status = e.status || "NEW";

                    return (
                      <tr
                        key={e._id}
                        className="group transition hover:bg-slate-50/60"
                      >
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-50 text-brand-green">
                              <MessageSquare className="h-4 w-4" />
                            </div>

                            <div className="min-w-0">
                              <div className="font-bold text-slate-800">
                                {e.name}
                              </div>

                              <div className="mt-1 flex items-center gap-1 text-[11px] text-slate-400">
                                <Mail className="h-3 w-3" />
                                <span className="max-w-[220px] truncate">
                                  {e.email}
                                </span>
                              </div>

                              {e.phone && (
                                <div className="mt-0.5 flex items-center gap-1 text-[11px] text-slate-400">
                                  <Phone className="h-3 w-3" />
                                  {e.phone}
                                </div>
                              )}
                            </div>
                          </div>
                        </td>

                        <td className="px-5 py-4">
                          <span className="text-xs font-semibold text-slate-600">
                            {e.courseInterest || "General"}
                          </span>
                        </td>

                        <td className="px-5 py-4">
                          <p className="line-clamp-2 max-w-xs text-xs leading-5 text-slate-500">
                            {e.message || "No message"}
                          </p>
                        </td>

                        <td className="px-5 py-4">
                          <select
                            value={status}
                            onChange={(ev) =>
                              updateStatus(e._id, ev.target.value)
                            }
                            className={`cursor-pointer rounded-lg border px-2.5 py-1.5 text-[10px] font-bold outline-none ${statusColors[status]}`}
                          >
                            {[
                              "NEW",
                              "IN_PROGRESS",
                              "RESOLVED",
                              "CLOSED",
                            ].map((s) => (
                              <option key={s} value={s}>
                                {s.replace(/_/g, " ")}
                              </option>
                            ))}
                          </select>
                        </td>

                        <td className="whitespace-nowrap px-5 py-4 text-xs font-medium text-slate-400">
                          {e.createdAt
                            ? new Date(e.createdAt).toLocaleDateString(
                              "en-IN",
                              {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              }
                            )
                            : "—"}
                        </td>

                        <td className="px-5 py-4">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              type="button"
                              onClick={() => setSelected(e)}
                              className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                              title="View Message"
                            >
                              <Eye className="h-4 w-4" />
                            </button>

                            <button
                              type="button"
                              onClick={() => setEnquiryToDelete(e)}
                              className="flex h-9 w-9 items-center justify-center rounded-xl text-red-400 transition hover:bg-red-50 hover:text-red-600"
                              title="Delete Enquiry"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* Detail Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/40 p-0 backdrop-blur-sm sm:items-center sm:p-4">
          <div className="flex max-h-[92dvh] w-full max-w-lg flex-col overflow-hidden rounded-t-[1.75rem] bg-white shadow-2xl sm:max-h-[85vh] sm:rounded-[1.75rem]">
            {/* Modal Header */}
            <div className="flex shrink-0 items-start justify-between border-b border-slate-100 p-5 sm:p-6">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-50 text-brand-green">
                  <MessageSquare className="h-5 w-5" />
                </div>

                <div className="min-w-0">
                  <h2 className="truncate text-lg font-extrabold text-slate-900 sm:text-xl">
                    {selected.name}
                  </h2>

                  <p className="mt-1 truncate text-xs text-slate-400">
                    {selected.email}
                    {selected.phone ? ` · ${selected.phone}` : ""}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelected(null)}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                aria-label="Close"
              >
                <span className="text-xl leading-none">×</span>
              </button>
            </div>

            {/* Modal Body */}
            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-5 sm:p-6">
              <div className="space-y-5">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {selected.courseInterest && (
                    <div className="rounded-xl bg-slate-50 p-3.5">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                        Course Interest
                      </span>

                      <p className="mt-1.5 text-sm font-bold text-slate-700">
                        {selected.courseInterest}
                      </p>
                    </div>
                  )}

                  <div className="rounded-xl bg-slate-50 p-3.5">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                      Status
                    </span>

                    <p className="mt-1.5">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold ${statusColors[selected.status || "NEW"]}`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${statusDotColors[selected.status || "NEW"]}`}
                        />
                        {(selected.status || "NEW").replace(/_/g, " ")}
                      </span>
                    </p>
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    Message
                  </span>

                  <div className="mt-2 rounded-2xl border border-slate-100 bg-slate-50 p-4">
                    <p className="whitespace-pre-wrap text-sm leading-6 text-slate-700">
                      {selected.message || "No message provided."}
                    </p>
                  </div>
                </div>

                {selected.createdAt && (
                  <div className="text-xs text-slate-400">
                    Submitted on{" "}
                    <span className="font-semibold text-slate-600">
                      {new Date(selected.createdAt).toLocaleDateString(
                        "en-IN",
                        {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        }
                      )}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="shrink-0 border-t border-slate-100 p-4 sm:p-5">
              <div className="grid grid-cols-2 gap-2 sm:flex sm:justify-end">
                <button
                  type="button"
                  onClick={() => setEnquiryToDelete(selected)}
                  className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-xl border border-red-200 bg-red-50 px-4 text-xs font-bold text-red-600 transition hover:bg-red-100"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete
                </button>

                <a
                  href={`mailto:${selected.email}`}
                  className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-xl bg-green-600 px-4 text-xs font-bold text-white transition hover:bg-green-700"
                >
                  <Mail className="h-4 w-4" />
                  Reply via Email
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>

                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="col-span-2 hidden min-h-11 rounded-xl border border-slate-200 px-4 text-xs font-bold text-slate-600 transition hover:bg-slate-50 sm:block"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmModal
        isOpen={!!enquiryToDelete}
        onClose={() => setEnquiryToDelete(null)}
        onConfirm={confirmDeleteEnquiry}
        title="Delete Enquiry"
        message={`Are you sure you want to delete the enquiry from "${enquiryToDelete?.name}"?`}
        confirmLabel="Delete Enquiry"
        danger={true}
      />
    </div>
  );
}