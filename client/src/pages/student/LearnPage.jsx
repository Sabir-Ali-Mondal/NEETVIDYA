import { useState, useEffect } from "react";
import api from "../../config/api";
import { BookOpen, FileText, Video, Download, ExternalLink } from "lucide-react";

export default function LearnPage() {
  const [courses, setCourses] = useState([]);
  const [activeSubject, setActiveSubject] = useState("all");

  const sampleMaterials = [
    { title: "Kinematics & 1D Motion Formula Sheet", subject: "Physics", chapter: "Units & Kinematics", size: "2.4 MB", url: "#" },
    { title: "Cell: The Unit of Life - NCERT Notes", subject: "Biology", chapter: "Cell Biology", size: "3.8 MB", url: "#" },
    { title: "Periodic Table & Periodic Trends Cheat Sheet", subject: "Chemistry", chapter: "Inorganic", size: "1.9 MB", url: "#" },
    { title: "Newton's Laws of Motion & Friction DPP 01", subject: "Physics", chapter: "NLM", size: "1.1 MB", url: "#" },
    { title: "Plant Anatomy & Tissues Flash Cards", subject: "Biology", chapter: "Botany", size: "2.7 MB", url: "#" },
  ];

  const filtered = activeSubject === "all" ? sampleMaterials : sampleMaterials.filter(m => m.subject.toLowerCase() === activeSubject);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading font-extrabold text-2xl text-brand-dark">Digital Learning Center</h1>
        <p className="text-xs text-gray-500 mt-1">Access curated theory handouts, formula sheets, and Daily Practice Papers (DPPs).</p>
      </div>

      {/* Subject Filter Tabs */}
      <div className="flex gap-2 border-b border-gray-200 pb-3">
        {["all", "physics", "biology", "chemistry"].map((subj) => (
          <button
            key={subj}
            onClick={() => setActiveSubject(subj)}
            className={`px-4 py-2 rounded-btn text-xs font-bold uppercase tracking-wider transition-colors ${
              activeSubject === subj
                ? "bg-brand-green text-white shadow-sm"
                : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            {subj}
          </button>
        ))}
      </div>

      {/* Materials List */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((mat, i) => (
          <div key={i} className="card card-hover flex flex-col justify-between border-gray-200">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="badge bg-emerald-100 text-emerald-800">{mat.subject}</span>
                <span className="text-[11px] text-gray-400 font-medium">{mat.size}</span>
              </div>
              <h3 className="font-heading font-bold text-base text-brand-dark mb-1">{mat.title}</h3>
              <p className="text-xs text-gray-500 mb-4">{mat.chapter}</p>
            </div>

            <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
              <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                <FileText className="w-3.5 h-3.5" /> PDF Handout
              </span>
              <button onClick={() => alert("Downloading study handout...")} className="btn-secondary text-xs !py-1.5 !px-3">
                <Download className="w-3.5 h-3.5" /> Download
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
