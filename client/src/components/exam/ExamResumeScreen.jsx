import { Clock, RefreshCw } from "lucide-react";

export default function ExamResumeScreen({ timeLeft = 0, onResume }) {
  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 text-center">
        <RefreshCw className="w-12 h-12 text-blue-600 mx-auto mb-4" />
        <h1 className="font-extrabold text-xl text-slate-900 mb-2">Exam Session Found</h1>
        <p className="text-slate-500 text-sm mb-4">
          You have an exam in progress. Your answers have been saved.
        </p>
        <div className="bg-slate-50 rounded-xl p-4 mb-6">
          <Clock className="w-6 h-6 mx-auto mb-1 text-slate-400" />
          <div className="font-mono font-bold text-2xl text-slate-800">
            {formatTime(timeLeft)}
          </div>
          <div className="text-xs text-slate-400">Time Remaining</div>
        </div>
        <button
          onClick={onResume}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl transition"
        >
          Resume Exam
        </button>
      </div>
    </div>
  );
}
