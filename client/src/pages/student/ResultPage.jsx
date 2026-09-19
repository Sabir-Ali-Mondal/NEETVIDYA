import { useState, useEffect } from "react";
import api from "../../config/api";
import { Award, CheckCircle, XCircle, Clock, BarChart2, BookOpen } from "lucide-react";

export default function ResultPage() {
  const [results, setResults] = useState([]);
  const [selectedResult, setSelectedResult] = useState(null);
  const [solutions, setSolutions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/results/my")
      .then(({ data }) => {
        const resList = data.data.results || [];
        setResults(resList);
        if (resList.length > 0) {
          viewSolutions(resList[0]);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const viewSolutions = async (resItem) => {
    setSelectedResult(resItem);
    try {
      const { data } = await api.get(`/results/${resItem.attempt}/solutions`);
      setSolutions(data.data.solutions || []);
    } catch {
      setSolutions([]);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading font-extrabold text-2xl text-brand-dark">Examination Results & Scorecards</h1>
        <p className="text-xs text-gray-500 mt-1">Review your accuracy, positive marks, negative marks, and question solutions.</p>
      </div>

      {results.length === 0 ? (
        <div className="card text-center py-16">
          <Award className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="font-semibold text-gray-700">No examination attempts found</p>
          <p className="text-xs text-gray-400 mt-1">Complete a practice test to review your scorecard and accuracy diagnostics.</p>
        </div>
      ) : (
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Attempt List */}
          <div className="lg:col-span-4 space-y-3">
            <h3 className="font-heading font-bold text-sm text-gray-600 uppercase tracking-wider">Completed Tests</h3>
            {results.map((r) => (
              <button
                key={r._id}
                onClick={() => viewSolutions(r)}
                className={`w-full text-left p-4 rounded-xl border transition-all ${
                  selectedResult?._id === r._id ? "bg-white border-brand-green shadow-md" : "bg-white border-gray-200 hover:border-gray-300"
                }`}
              >
                <span className="badge bg-emerald-100 text-emerald-800 text-[10px] mb-1">{r.exam?.testType || "TEST"}</span>
                <h4 className="font-bold text-sm text-brand-dark leading-tight">{r.exam?.title || "Mock Test"}</h4>
                <div className="flex items-center justify-between text-xs text-gray-500 mt-3 pt-2 border-t border-gray-100">
                  <span>Score: <strong className="text-brand-green">{r.obtainedMarks} / {r.totalMarks}</strong></span>
                  <span>Accuracy: <strong>{r.accuracy}%</strong></span>
                </div>
              </button>
            ))}
          </div>

          {/* Detailed Scorecard & Solutions */}
          <div className="lg:col-span-8 space-y-6">
            {selectedResult && (
              <>
                {/* Scorecard Hero */}
                <div className="card bg-gradient-to-r from-brand-dark to-brand-black text-white p-6 sm:p-8">
                  <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
                    <div>
                      <span className="badge bg-brand-lime text-brand-black text-xs font-bold mb-1">Official Scorecard</span>
                      <h2 className="font-heading font-extrabold text-2xl text-white">{selectedResult.exam?.title}</h2>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-gray-400 block">Total Scaled Score</span>
                      <span className="font-heading font-extrabold text-3xl text-brand-lime">
                        {selectedResult.obtainedMarks} <span className="text-lg text-gray-400 font-normal">/ {selectedResult.totalMarks}</span>
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 text-center">
                    <div className="bg-white/5 p-3 rounded-xl">
                      <span className="text-xs text-gray-400 block">Correct</span>
                      <span className="font-bold text-lg text-emerald-400">+{selectedResult.correctCount}</span>
                    </div>
                    <div className="bg-white/5 p-3 rounded-xl">
                      <span className="text-xs text-gray-400 block">Incorrect</span>
                      <span className="font-bold text-lg text-rose-400">-{selectedResult.wrongCount}</span>
                    </div>
                    <div className="bg-white/5 p-3 rounded-xl">
                      <span className="text-xs text-gray-400 block">Unattempted</span>
                      <span className="font-bold text-lg text-gray-300">{selectedResult.unattemptedCount}</span>
                    </div>
                    <div className="bg-white/5 p-3 rounded-xl">
                      <span className="text-xs text-gray-400 block">Accuracy</span>
                      <span className="font-bold text-lg text-brand-lime">{selectedResult.accuracy}%</span>
                    </div>
                  </div>
                </div>

                {/* Solution Review */}
                <div className="space-y-4">
                  <h3 className="font-heading font-bold text-lg text-brand-dark flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-brand-green" /> Detailed Solutions & Explanations
                  </h3>

                  {solutions.map((item, idx) => {
                    const q = item.question;
                    const isCorrect = item.yourAnswer === q.correctAnswer;
                    const isUnattempted = item.yourAnswer === null || item.yourAnswer === undefined;

                    return (
                      <div key={idx} className="card space-y-4 border-gray-200">
                        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                          <span className="text-xs font-bold text-gray-500">Question {idx + 1}</span>
                          <span className={`badge text-[11px] ${
                            isCorrect ? "bg-emerald-100 text-emerald-800" : isUnattempted ? "bg-gray-100 text-gray-700" : "bg-rose-100 text-rose-800"
                          }`}>
                            {isCorrect ? "Correct (+4)" : isUnattempted ? "Unattempted (0)" : "Incorrect (-1)"}
                          </span>
                        </div>

                        <p className="text-sm font-medium text-brand-dark leading-relaxed">{q.questionText}</p>

                        {q.questionImageUrl && (
                          <div className="rounded-xl border border-gray-200 bg-white p-2">
                            <img src={q.questionImageUrl} alt="Question illustration" className="max-h-64 rounded-lg object-contain mx-auto" />
                          </div>
                        )}

                        <div className="space-y-2 text-xs">
                          {q.options?.map((opt, optIdx) => {
                            const isSelected = item.yourAnswer === optIdx;
                            const isRight = q.correctAnswer === optIdx;

                            return (
                              <div
                                key={optIdx}
                                className={`p-3 rounded-lg border flex items-center justify-between ${
                                  isRight
                                    ? "bg-emerald-50 border-emerald-400 text-emerald-900 font-semibold"
                                    : isSelected
                                    ? "bg-rose-50 border-rose-300 text-rose-900"
                                    : "bg-white border-gray-200 text-gray-600"
                                }`}
                              >
                                <span>{String.fromCharCode(65 + optIdx)}. {opt.text}</span>
                                {isRight && <CheckCircle className="w-4 h-4 text-emerald-600" />}
                                {!isRight && isSelected && <XCircle className="w-4 h-4 text-rose-600" />}
                              </div>
                            );
                          })}
                        </div>

                        {q.explanation && (
                          <div className="bg-brand-soft p-4 rounded-xl text-xs text-gray-700 border border-gray-200/70">
                            <strong className="text-brand-dark block mb-1">NCERT Concept Explanation:</strong>
                            <p className="leading-relaxed">{q.explanation}</p>
                            {q.explanationImageUrl && (
                              <img src={q.explanationImageUrl} alt="Explanation illustration" className="mt-3 max-h-64 rounded-lg object-contain border border-gray-200 bg-white" />
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
