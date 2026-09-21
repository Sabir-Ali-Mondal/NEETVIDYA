import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, BookOpen, CheckCircle2, Clock3, FileText, ShieldCheck } from "lucide-react";
import api from "../../config/api";
import { alertError } from "../../utils/alert";

export default function StudyExamPage() {
  const { examId } = useParams();
  const navigate = useNavigate();
  const [exam, setExam] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudyPaper = async () => {
      try {
        const [examRes, questionsRes] = await Promise.all([
          api.get(`/exams/${examId}`),
          api.get(`/exams/${examId}/questions`),
        ]);

        setExam(examRes.data?.data?.exam || null);
        setQuestions(questionsRes.data?.data?.questions || []);
      } catch (error) {
        alertError(error.response?.data?.message || "This study paper is not available");
        navigate("/student/tests");
      } finally {
        setLoading(false);
      }
    };

    fetchStudyPaper();
  }, [examId, navigate]);

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-9 w-9 animate-spin rounded-full border-2 border-slate-200 border-t-brand-green" />
          <p className="mt-3 text-xs text-slate-400">Loading study paper...</p>
        </div>
      </div>
    );
  }

  if (!exam) {
    return null;
  }

  return (
    <div className="space-y-6 pb-8">
      <div className="flex items-center justify-between gap-3">
        <Link
          to="/student/tests"
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to tests
        </Link>
        <span className="rounded-full bg-purple-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-purple-700">
          Study mode
        </span>
      </div>

      <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-brand-green/10 px-3 py-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-brand-green" />
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand-green">
                Archived Paper
              </span>
            </div>
            <h1 className="font-heading text-2xl font-extrabold text-brand-dark">{exam.title}</h1>
            {exam.batch?.name && (
              <p className="mt-1 text-xs text-slate-500">Batch: {exam.batch.name}</p>
            )}
          </div>

          <div className="grid grid-cols-3 gap-2 text-xs text-slate-600 sm:min-w-[280px]">
            <div className="rounded-xl bg-slate-50 px-3 py-2 text-center">
              <div className="font-bold text-brand-dark">{exam.totalQuestions}</div>
              <div className="text-[10px] uppercase tracking-wider text-slate-400">Qns</div>
            </div>
            <div className="rounded-xl bg-slate-50 px-3 py-2 text-center">
              <div className="font-bold text-brand-dark">{exam.duration}</div>
              <div className="text-[10px] uppercase tracking-wider text-slate-400">Min</div>
            </div>
            <div className="rounded-xl bg-slate-50 px-3 py-2 text-center">
              <div className="font-bold text-brand-dark">{exam.totalMarks}</div>
              <div className="text-[10px] uppercase tracking-wider text-slate-400">Marks</div>
            </div>
          </div>
        </div>
      </div>

      {questions.length === 0 ? (
        <div className="rounded-[1.5rem] border border-slate-200 bg-white p-10 text-center">
          <FileText className="mx-auto h-10 w-10 text-slate-200" />
          <h2 className="mt-4 text-lg font-bold text-slate-700">No questions available</h2>
          <p className="mt-1 text-xs text-slate-400">This paper has no question set attached yet.</p>
        </div>
      ) : (
        <div className="space-y-5">
          {questions.map((q, index) => (
            <div key={q._id || index} className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-600">
                  <BookOpen className="h-3 w-3" /> Question {index + 1}
                </span>
                <div className="flex items-center gap-2 text-[10px] text-slate-400">
                  <Clock3 className="h-3 w-3" />
                  <span>{q.marks || exam.marksPerCorrect || 4} mark{(q.marks || exam.marksPerCorrect || 4) === 1 ? "" : "s"}</span>
                </div>
              </div>

              <p className="text-base font-medium leading-relaxed text-brand-dark">{q.questionText}</p>

              {q.questionImageUrl && (
                <img src={q.questionImageUrl} alt="Question" className="mt-4 max-h-72 rounded-xl border border-slate-200 object-contain bg-slate-50" />
              )}

              <div className="mt-5 grid gap-2">
                {q.options?.map((option, optionIndex) => {
                  const isCorrect = optionIndex === q.correctAnswer;
                  return (
                    <div
                      key={`${q._id}-option-${optionIndex}`}
                      className={`flex items-start gap-3 rounded-xl border px-3 py-2.5 text-sm ${
                        isCorrect
                          ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                          : "border-slate-200 bg-slate-50 text-slate-700"
                      }`}
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-current text-[10px] font-bold">
                        {String.fromCharCode(65 + optionIndex)}
                      </span>
                      <div className="flex-1">
                        <span className="leading-relaxed">{option.text}</span>
                        {option.imageUrl && (
                          <img
                            src={option.imageUrl}
                            alt={`Option ${String.fromCharCode(65 + optionIndex)}`}
                            className="mt-2 max-h-48 rounded-lg border-slate-200 bg-white object-contain"
                          />
                        )}
                      </div>
                      {isCorrect && <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />}
                    </div>
                  );
                })}
              </div>

              {q.explanation && (
                <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
                  <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.18em] text-amber-700">Explanation</p>
                  <p className="leading-relaxed">{q.explanation}</p>
                  {q.explanationImageUrl && (
                    <img src={q.explanationImageUrl} alt="Explanation" className="mt-3 max-h-72 rounded-lg border border-amber-200 object-contain bg-white" />
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
