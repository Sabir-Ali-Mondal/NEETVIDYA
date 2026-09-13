import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../config/api";
import images from "../../config/images";
import { ClipboardList, Clock, Award, CheckCircle2, ArrowRight } from "lucide-react";

export default function TestSeriesPage() {
  const [exams, setExams] = useState([]);

  useEffect(() => {
    api.get("/exams").then(({ data }) => setExams(data.data.exams || [])).catch(() => {});
  }, []);

  return (
    <div className="section-padding bg-brand-soft min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-brand-green uppercase tracking-widest">National Benchmarking</span>
          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-brand-dark mt-2">NEET Computerized Test Series</h1>
          <p className="text-gray-600 text-sm sm:text-base mt-3">
            Simulate the exact NTA computer-based environment with negative marking, accuracy heatmaps, and chapter breakdowns.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {exams.map((exam) => (
            <div key={exam._id} className="card card-hover flex flex-col justify-between border-gray-200">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="badge bg-purple-100 text-purple-800">{exam.testType}</span>
                  <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">Active Test</span>
                </div>
                <h2 className="font-heading font-bold text-xl text-brand-dark mb-2">{exam.title}</h2>
                <p className="text-xs text-gray-600 mb-6 line-clamp-2">{exam.description || "Comprehensive test based on NEET syllabus."}</p>

                <div className="grid grid-cols-2 gap-3 py-3 border-y border-gray-100 text-xs mb-6">
                  <div>
                    <span className="text-gray-400 block">Questions:</span>
                    <span className="font-bold text-brand-dark">{exam.totalQuestions} MCQs</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block">Duration:</span>
                    <span className="font-bold text-brand-dark">{exam.duration} Minutes</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block">Total Marks:</span>
                    <span className="font-bold text-brand-dark">{exam.totalMarks} Marks</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block">Marking:</span>
                    <span className="font-bold text-brand-dark">+{exam.marksPerCorrect} / -{exam.negativePerWrong}</span>
                  </div>
                </div>
              </div>

              <Link to="/register" className="btn-primary w-full text-center text-sm !py-2.5">
                Register to Attempt <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
