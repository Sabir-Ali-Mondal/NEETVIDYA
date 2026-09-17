import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../config/api";
import { ClipboardList, Clock, ArrowRight, Archive, BookOpen } from "lucide-react";
import Pagination from "../../components/shared/Pagination";

export default function TestsPage() {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);
  const [meta, setMeta] = useState({ total: 0, pages: 1 });

  useEffect(() => {
    setLoading(true);
    api
      .get(`/exams?page=${page}&limit=${limit}`)
      .then(({ data }) => {
        setExams(data.data?.exams || []);
        setMeta({ total: data.data?.total || 0, pages: data.data?.pages || 1 });
      })
      .catch(() => setExams([]))
      .finally(() => setLoading(false));
  }, [page, limit]);

  // Split live/published exams from archived study papers.
  const liveExams = exams.filter((e) => ["LIVE", "PUBLISHED"].includes(e.status));
  const studyExams = exams.filter(
    (e) => ["CLOSED", "ARCHIVED"].includes(e.status) && e.studyVisible
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading font-extrabold text-2xl text-brand-dark">
          Tests & Computerized Exams
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          Exams released to your batch. Secret/unpublished exams never appear here.
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-48">
          <div className="w-9 h-9 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : exams.length === 0 ? (
        <div className="bg-white border-slate-100 rounded-2xl p-12 text-center shadow-sm">
          <ClipboardList className="w-12 h-12 text-slate-200 mx-auto mb-4" />
          <h3 className="font-bold text-slate-600 mb-1">No exams available right now</h3>
          <p className="text-slate-400 text-sm">
            When your teachers publish an exam for your batch, it will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {liveExams.length > 0 && (
            <div className="space-y-4">
              <h2 className="font-heading font-bold text-lg text-brand-dark">Live & Upcoming</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {liveExams.map((exam) => (
                  <div key={exam._id} className="card card-hover flex-col justify-between border-gray-200">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="badge bg-purple-100 text-purple-800">
                          {exam.testType?.replace(/_/g, " ")}
                        </span>
                        <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                          {exam.status === "LIVE" ? "Active" : "Scheduled"}
                        </span>
                      </div>
                      <h3 className="font-heading font-bold text-lg text-brand-dark mb-1">{exam.title}</h3>
                      {exam.batch?.name && (
                        <p className="text-[11px] text-gray-400 mb-2">{exam.batch.name}</p>
                      )}
                      <p className="text-xs text-gray-500 mb-4 line-clamp-2">
                        {exam.instructions || "Standard exam with negative marking."}
                      </p>

                      <div className="grid grid-cols-2 gap-2 bg-brand-soft p-3 rounded-xl text-xs mb-4">
                        <div><span className="text-gray-400">MCQs:</span> <strong className="text-brand-dark">{exam.totalQuestions}</strong></div>
                        <div><span className="text-gray-400">Duration:</span> <strong className="text-brand-dark">{exam.duration} Min</strong></div>
                        <div><span className="text-gray-400">Total Marks:</span> <strong className="text-brand-dark">{exam.totalMarks}</strong></div>
                        <div><span className="text-gray-400">Pattern:</span> <strong className="text-brand-dark">+{exam.marksPerCorrect ?? 4}/-{exam.negativePerWrong ?? 1}</strong></div>
                      </div>
                    </div>

                    <Link
                      to={`/exam/${exam._id}/attempt`}
                      className="btn-primary w-full text-center text-xs !py-2.5 inline-flex items-center justify-center gap-1"
                    >
                      Start Exam Now <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}

          {studyExams.length > 0 && (
            <div className="space-y-4">
              <h2 className="font-heading font-bold text-lg text-brand-dark flex items-center gap-2">
                <Archive className="w-5 h-5 text-purple-600" /> Previous Papers (Study)
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {studyExams.map((exam) => (
                  <div key={exam._id} className="card flex-col justify-between border-gray-200 p-5">
                    <div>
                      <span className="badge bg-purple-100 text-purple-800 mb-2 inline-block">
                        {exam.testType?.replace(/_/g, " ")}
                      </span>
                      <h3 className="font-heading font-bold text-base text-brand-dark mb-1">{exam.title}</h3>
                      <p className="text-xs text-gray-500">
                        {exam.totalQuestions} questions · {exam.duration} min
                      </p>
                    </div>
                    <div className="pt-3 mt-3 border-t border-gray-100 flex items-center gap-1 text-xs text-purple-600 font-semibold">
                      <BookOpen className="w-3.5 h-3.5" /> Available for study
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <Pagination
            page={page}
            totalPages={meta.pages}
            totalItems={meta.total}
            pageSize={limit}
            pageSizeOptions={[12, 24, 48]}
            onPageChange={setPage}
            onPageSizeChange={(n) => {
              setLimit(n);
              setPage(1);
            }}
          />
        </div>
      )}
    </div>
  );
}

