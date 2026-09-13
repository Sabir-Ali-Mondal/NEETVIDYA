import { useState, useEffect } from "react";
import api from "../../config/api";
import { BookOpen, Plus, Search, IndianRupee, Clock, Users, ChevronRight, Pencil } from "lucide-react";

export default function AdminCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await api.get("/courses");
        setCourses(data.data?.courses || []);
      } catch {
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const filtered = courses.filter((c) =>
    c.name?.toLowerCase().includes(search.toLowerCase()) ||
    c.targetClass?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-extrabold text-2xl text-slate-900">Courses</h1>
          <p className="text-slate-500 text-sm mt-1">{courses.length} active courses</p>
        </div>
        <button className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2.5 rounded-xl transition shadow-sm text-sm">
          <Plus className="w-4 h-4" /> Add Course
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search courses..."
          className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition bg-white"
        />
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-48">
          <div className="w-9 h-9 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white border border-slate-100 rounded-2xl p-12 text-center shadow-sm">
          <BookOpen className="w-12 h-12 text-slate-200 mx-auto mb-4" />
          <h3 className="font-bold text-slate-600 mb-1">No courses found</h3>
          <p className="text-slate-400 text-sm">Create your first course using the button above.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map((course) => (
            <div key={course._id} className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition group">
              {/* Top color bar */}
              <div className="h-1.5 bg-gradient-to-r from-green-500 to-emerald-400" />
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-green-50 border border-green-100 flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-green-600" />
                  </div>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${course.isActive ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"}`}>
                    {course.isActive ? "Active" : "Inactive"}
                  </span>
                </div>

                <h3 className="font-extrabold text-slate-900 text-lg mb-1 leading-tight">{course.name}</h3>
                <p className="text-xs text-slate-500 mb-4 line-clamp-2">{course.description}</p>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                      <Clock className="w-3.5 h-3.5" /> Duration
                    </div>
                    <div className="font-bold text-slate-700 text-sm">{course.duration || "—"}</div>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                      <IndianRupee className="w-3.5 h-3.5" /> Fees
                    </div>
                    <div className="font-bold text-slate-700 text-sm">
                      ₹{course.feeAmount?.toLocaleString("en-IN") || "—"}
                    </div>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                      <Users className="w-3.5 h-3.5" /> Target
                    </div>
                    <div className="font-bold text-slate-700 text-sm">{course.targetClass || "—"}</div>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                      <BookOpen className="w-3.5 h-3.5" /> Subjects
                    </div>
                    <div className="font-bold text-slate-700 text-sm">{course.subjects?.length || 0}</div>
                  </div>
                </div>

                {course.features?.length > 0 && (
                  <ul className="space-y-1 mb-4">
                    {course.features.slice(0, 3).map((f) => (
                      <li key={f} className="flex items-center gap-1.5 text-xs text-slate-500">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                    {course.features.length > 3 && (
                      <li className="text-xs text-slate-400 pl-3">+{course.features.length - 3} more features</li>
                    )}
                  </ul>
                )}

                <div className="flex gap-2">
                  <button className="flex-1 inline-flex items-center justify-center gap-1.5 text-xs font-semibold py-2.5 rounded-xl bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200 transition">
                    <Pencil className="w-3.5 h-3.5" /> Edit
                  </button>
                  <button className="flex-1 inline-flex items-center justify-center gap-1.5 text-xs font-semibold py-2.5 rounded-xl bg-green-50 text-green-700 hover:bg-green-100 border border-green-200 transition">
                    View Details <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
