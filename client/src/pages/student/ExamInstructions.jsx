import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Clock, AlertTriangle, ArrowRight } from "lucide-react";
import api from "../../config/api";
import { alertError } from "../../utils/alert";

export default function ExamInstructions() {
  const { examId } = useParams();
  const navigate = useNavigate();
  const [exam, setExam] = useState(null);
  const [agreed, setAgreed] = useState(false);
  const [starting, setStarting] = useState(false);

  useEffect(() => {
    api
      .get(`/exams/${examId}`)
      .then(({ data }) => setExam(data.data?.exam))
      .catch(() => navigate("/student/tests"));
  }, [examId, navigate]);

  const handleStart = async () => {
    setStarting(true);
    try {
      await api.post(`/attempts/exam/${examId}/start`);
      navigate(`/exam/${examId}/attempt`);
    } catch (err) {
      alertError(err.response?.data?.message || "Cannot start exam");
      setStarting(false);
    }
  };

  if (!exam) return null;

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full p-8">
        <h1 className="font-extrabold text-2xl text-slate-900 mb-2">{exam.title}</h1>
        <p className="text-slate-500 text-sm mb-6">{exam.description}</p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <div className="bg-slate-50 rounded-xl p-4 text-center">
            <Clock className="w-5 h-5 mx-auto mb-1 text-blue-600" />
            <div className="font-bold text-lg">{exam.duration} min</div>
            <div className="text-xs text-slate-400">Duration</div>
          </div>
          <div className="bg-slate-50 rounded-xl p-4 text-center">
            <div className="font-bold text-lg">{exam.totalQuestions}</div>
            <div className="text-xs text-slate-400">Questions</div>
          </div>
          <div className="bg-slate-50 rounded-xl p-4 text-center">
            <div className="font-bold text-lg text-green-600">+{exam.marksPerCorrect}</div>
            <div className="text-xs text-slate-400">Correct</div>
          </div>
          <div className="bg-slate-50 rounded-xl p-4 text-center">
            <div className="font-bold text-lg text-red-600">-{exam.negativePerWrong}</div>
            <div className="text-xs text-slate-400">Wrong</div>
          </div>
        </div>

        <div className="bg-amber-50 border-amber-200 rounded-xl p-4 mb-6">
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5" />
            <div className="text-sm text-amber-800">
              <p className="font-bold mb-1">Important Instructions:</p>
              <ul className="list-disc list-inside space-y-1 text-xs">
                <li>Timer starts immediately upon clicking Start</li>
                <li>Test auto-submits when time expires</li>
                <li>Tab switching is recorded</li>
                <li>Only {exam.maxAttempts} attempt(s) allowed</li>
              </ul>
            </div>
          </div>
        </div>

        <label className="flex items-center gap-3 mb-6 cursor-pointer">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="w-4 h-4 rounded accent-green-600"
          />
          <span className="text-sm text-slate-700">
            I have read and understood all instructions
          </span>
        </label>

        <button
          onClick={handleStart}
          disabled={!agreed || starting}
          className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-40 text-white font-bold py-3.5 rounded-xl transition flex items-center justify-center gap-2"
        >
          {starting ? "Starting..." : "Start Examination"} <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
