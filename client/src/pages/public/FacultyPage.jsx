import { useState, useEffect } from "react";
import api from "../../config/api";
import images from "../../config/images";
import { GraduationCap, Award, BookOpen } from "lucide-react";

export default function FacultyPage() {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    api.get("/teachers/public")
      .then(({ data }) => setTeachers(data.data.teachers || []))
      .catch(() => {});
  }, []);

  return (
    <div className="section-padding bg-brand-soft min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-brand-green uppercase tracking-widest">Master Mentors</span>
          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-brand-dark mt-2">Meet Our Expert Faculty</h1>
          <p className="text-gray-600 text-sm sm:text-base mt-3">
            Learn directly from seasoned medical coaching educators with proven track records of mentoring All-India Top 100 rankers.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teachers.map((teacher, idx) => (
            <div key={teacher._id} className="card card-hover text-center p-8 bg-white">
              <div className="w-28 h-28 mx-auto rounded-full overflow-hidden mb-5 border-4 border-brand-green/20 bg-gray-100">
                <img src={images[`teacher${(idx % 6) + 1}`] || images.teacher1} alt={teacher.user?.name} className="w-full h-full object-cover" />
              </div>
              <span className="badge bg-emerald-100 text-emerald-800 mb-2">{teacher.subject?.name || "NEET Specialist"}</span>
              <h2 className="font-heading font-bold text-xl text-brand-dark">{teacher.user?.name}</h2>
              <p className="text-xs text-brand-green font-semibold mt-1">{teacher.qualification || "M.Sc, B.Ed"}</p>
              <p className="text-xs text-gray-500 mt-1">{teacher.experience || "10+ Years Experience"}</p>
              <p className="text-sm text-gray-600 mt-4 leading-relaxed line-clamp-3">{teacher.bio || "Dedicated mentor focusing on conceptual clarity and exam confidence."}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
