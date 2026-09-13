import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../config/api";
import { ClipboardList, Clock, Award, ArrowRight } from "lucide-react";

export default function TestsPage() {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/exams")
      .then(({ data }) => setExams(data.data.exams || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading font-extrabold text-2xl text-brand-dark">Tests & Computerized Exams</h1>
        <p className="text-xs text-gray-500 mt-1">
          Take your daily practice papers (DPPs), chapter tests, and national diagnostic mock exams.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {exams.map((exam) => (
          <div key={exam._id} className="card card-hover flex flex-col justify-between border-gray-200">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="badge bg-purple-100 text-purple-800">{exam.testType}</span>
                <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">Active</span>
              </div>
              <h3 className="font-heading font-bold text-lg text-brand-dark mb-2">{exam.title}</h3>
              <p className="text-xs text-gray-500 mb-4 line-clamp-2">{exam.instructions || "Full marks test with standard negative marking."}</p>

              <div className="grid grid-cols-2 gap-2 bg-brand-soft p-3 rounded-xl text-xs mb-4">
                <div><span className="text-gray-400">MCQs:</span> <strong className="text-brand-dark">{exam.totalQuestions}</strong></div>
                <div><span className="text-gray-400">Duration:</span> <strong className="text-brand-dark">{exam.duration} Min</strong></div>
                <div><span className="text-gray-400">Total Marks:</span> <strong className="text-brand-dark">{exam.totalMarks}</strong></div>
                <div><span className="text-gray-400">Pattern:</span> <strong className="text-brand-dark">+{exam.marksPerCorrect}/-{exam.negativePerWrong}</strong></div>
              </div>
            </div>

            <Link to={`/exam/${exam._id}/attempt`} className="btn-primary w-full text-center text-xs !py-2.5">
              Start Exam Now <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
