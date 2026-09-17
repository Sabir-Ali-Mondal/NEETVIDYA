import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../config/api";
import { CheckCircle, ArrowRight, Layers, Clock, Users } from "lucide-react";

// Batch = Course on this platform. This page showcases the institute's batches.
export default function CoursesPage() {
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/batches")
      .then(({ data }) => setBatches(data.data?.batches || []))
      .catch(() => setBatches([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="section-padding bg-brand-soft min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-brand-green uppercase tracking-widest">Batches & Programs</span>
          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-brand-dark mt-2">NEET Program Catalog</h1>
          <p className="text-gray-600 text-sm sm:text-base mt-3">
            Browse the institute's batches. Each batch is a complete course with its own study
            materials and exams.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="w-10 h-10 border-4 border-brand-green border-t-transparent rounded-full animate-spin mx-auto" />
          </div>
        ) : batches.length === 0 ? (
          <div className="text-center py-20 text-gray-600">
            <p className="font-semibold text-brand-dark mb-2">No batches are currently published.</p>
            <p className="text-sm text-gray-500">Batches created in the admin panel appear here automatically.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {batches.map((batch) => (
              <div key={batch._id} className="card card-hover flex-col justify-between border-gray-200">
                <div>
                  <div
                    className="h-2 rounded-full mb-5"
                    style={{ backgroundColor: batch.color || "#18A66A" }}
                  />
                  <div className="flex items-center gap-2 mb-2">
                    <span className="badge bg-brand-black/5 text-brand-dark border-gray-200">
                      {batch.batchType?.replace(/_/g, " ") || "NEET UG"}
                    </span>
                    {batch.academicYear && (
                      <span className="text-[11px] text-gray-500">{batch.academicYear}</span>
                    )}
                  </div>

                  <h2 className="font-heading font-bold text-2xl text-brand-dark mb-2">{batch.name}</h2>
                  <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                    {batch.schedule || "Full NEET syllabus coverage with daily practice and mock tests."}
                  </p>

                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2 text-xs text-gray-700">
                      <Users className="w-4 h-4 text-brand-green shrink-0" />
                      <span>{batch.students?.length || 0} students enrolled</span>
                    </div>
                    {batch.capacity ? (
                      <div className="flex items-center gap-2 text-xs text-gray-700">
                        <CheckCircle className="w-4 h-4 text-brand-green shrink-0" />
                        <span>Limited to {batch.capacity} seats</span>
                      </div>
                    ) : null}
                    {batch.schedule && (
                      <div className="flex items-center gap-2 text-xs text-gray-700">
                        <Clock className="w-4 h-4 text-brand-green shrink-0" />
                        <span>{batch.schedule}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-5 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-gray-500 block">Batch Code</span>
                    <span className="font-mono font-bold text-brand-dark">{batch.code || "—"}</span>
                  </div>
                  <Link to="/register" className="btn-primary text-sm !py-2.5 !px-5">
                    Join Batch <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

