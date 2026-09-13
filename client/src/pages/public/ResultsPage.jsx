import { useState, useEffect } from "react";
import api from "../../config/api";
import { Trophy, Star, Award } from "lucide-react";

export default function ResultsPage() {
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    api.get("/achievements").then(({ data }) => setAchievements(data.data.achievements || [])).catch(() => {});
  }, []);

  return (
    <div className="section-padding bg-brand-soft min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-brand-green uppercase tracking-widest">Hall of Fame</span>
          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-brand-dark mt-2">NEETVIDYA Wall of Ranks</h1>
          <p className="text-gray-600 text-sm sm:text-base mt-3">
            Celebrating our students who converted dedication into top ranks across India's premier government medical institutions.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {achievements.map((item) => (
            <div key={item._id} className="card card-hover border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                  <Trophy className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-brand-green">{item.category}</span>
                  <p className="text-xs text-gray-500">Year {item.year || "2024"}</p>
                </div>
              </div>
              <h2 className="font-heading font-bold text-2xl text-brand-dark mb-1">{item.title}</h2>
              <p className="font-semibold text-sm text-brand-green mb-3">Score: {item.score || "Top Rank"}</p>
              <p className="text-xs text-gray-600 leading-relaxed mb-4">{item.description}</p>
              {item.studentName && (
                <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                  <span>Student: <strong className="text-gray-800">{item.studentName}</strong></span>
                  <span>{item.studentBatch}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
