import { useState, useEffect } from "react";
import api from "../../config/api";
import { MessageSquare, Search, CheckCircle, XCircle, Clock, Phone, Mail, Eye } from "lucide-react";
import toast from "react-hot-toast";

const statusColors = {
  NEW: "bg-blue-100 text-blue-700 border-blue-200",
  IN_PROGRESS: "bg-amber-100 text-amber-700 border-amber-200",
  RESOLVED: "bg-green-100 text-green-700 border-green-200",
  CLOSED: "bg-slate-100 text-slate-600 border-slate-200",
};

export default function AdminEnquiries() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selected, setSelected] = useState(null);

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

  useEffect(() => { fetchEnquiries(); }, []);

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/enquiries/${id}`, { status });
      toast.success("Status updated");
      fetchEnquiries();
      setSelected(null);
    } catch {
      toast.error("Failed to update status");
    }
  };

  const filtered = enquiries.filter((e) => {
    const matchSearch =
      e.name?.toLowerCase().includes(search.toLowerCase()) ||
      e.email?.toLowerCase().includes(search.toLowerCase()) ||
      e.phone?.includes(search);
    const matchStatus = statusFilter === "All" || e.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-extrabold text-2xl text-slate-900">Enquiries</h1>
          <p className="text-slate-500 text-sm mt-1">{enquiries.length} total enquiries</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-blue-100 text-blue-700 border border-blue-200">
            {enquiries.filter((e) => e.status === "NEW").length} New
          </span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email or phone..."
            className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition bg-white"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2.5 border border-slate-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
        >
          {["All", "NEW", "IN_PROGRESS", "RESOLVED", "CLOSED"].map((s) => (
            <option key={s} value={s}>{s.replace(/_/g, " ")}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-48">
          <div className="w-9 h-9 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white border border-slate-100 rounded-2xl p-12 text-center shadow-sm">
          <MessageSquare className="w-12 h-12 text-slate-200 mx-auto mb-4" />
          <h3 className="font-bold text-slate-600 mb-1">No enquiries found</h3>
          <p className="text-slate-400 text-sm">Enquiries from the contact form will appear here.</p>
        </div>
      ) : (
        <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50">
                  <th className="text-left py-3.5 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Contact</th>
                  <th className="text-left py-3.5 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider hidden md:table-cell">Course Interest</th>
                  <th className="text-left py-3.5 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider hidden lg:table-cell">Message</th>
                  <th className="text-left py-3.5 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="text-left py-3.5 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider hidden sm:table-cell">Date</th>
                  <th className="py-3.5 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filtered.map((e) => (
                  <tr key={e._id} className="hover:bg-slate-50/50 transition group">
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-800">{e.name}</div>
                      <div className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                        <Mail className="w-3 h-3" /> {e.email}
                      </div>
                      {e.phone && (
                        <div className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                          <Phone className="w-3 h-3" /> {e.phone}
                        </div>
                      )}
                    </td>
                    <td className="py-3.5 px-4 hidden md:table-cell">
                      <span className="text-sm text-slate-600">{e.courseInterest || "General"}</span>
                    </td>
                    <td className="py-3.5 px-4 hidden lg:table-cell">
                      <p className="text-xs text-slate-500 line-clamp-2 max-w-xs">{e.message}</p>
                    </td>
                    <td className="py-3.5 px-4">
                      <select
                        value={e.status || "NEW"}
                        onChange={(ev) => updateStatus(e._id, ev.target.value)}
                        className={`text-xs font-bold px-2.5 py-1.5 rounded-lg border cursor-pointer bg-transparent ${statusColors[e.status || "NEW"]}`}
                      >
                        {["NEW", "IN_PROGRESS", "RESOLVED", "CLOSED"].map((s) => (
                          <option key={s} value={s}>{s.replace(/_/g, " ")}</option>
                        ))}
                      </select>
                    </td>
                    <td className="py-3.5 px-4 hidden sm:table-cell text-xs text-slate-500">
                      {e.createdAt ? new Date(e.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" }) : "—"}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => setSelected(e)}
                        className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 transition opacity-0 group-hover:opacity-100"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="p-6 border-b border-slate-100">
              <h2 className="font-extrabold text-xl text-slate-900">{selected.name}</h2>
              <p className="text-slate-500 text-sm mt-1">{selected.email} · {selected.phone}</p>
            </div>
            <div className="p-6 space-y-4">
              {selected.courseInterest && (
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Course Interest</span>
                  <p className="text-sm text-slate-700 mt-1">{selected.courseInterest}</p>
                </div>
              )}
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Message</span>
                <p className="text-sm text-slate-700 mt-1 leading-relaxed">{selected.message}</p>
              </div>
            </div>
            <div className="p-6 border-t border-slate-100 flex gap-3">
              <button onClick={() => setSelected(null)}
                className="flex-1 py-2.5 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition">
                Close
              </button>
              <a href={`mailto:${selected.email}`}
                className="flex-1 py-2.5 bg-green-600 hover:bg-green-700 text-white text-sm font-bold rounded-xl transition text-center">
                Reply via Email
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
