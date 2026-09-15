import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../config/api";
import images from "../../config/images";
import { BookOpen, CheckCircle, ArrowRight } from "lucide-react";

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const approvedBatches = [
    {
      _id: "dropper-sankalp",
      name: "SANKALP",
      description: "Duration: Complete 1 Year | Fees: ₹20,000",
      targetClass: "Dropper / 12th",
      feeAmount: 20000,
      coverImageUrl: images.courseClassXii,
    },
    {
      _id: "11th-udaan",
      name: "UDAAN",
      description: "Duration: Complete 2 Years | Fees: ₹35,000",
      targetClass: "11th",
      feeAmount: 35000,
      coverImageUrl: images.courseClassXi,
    },
  ];

  useEffect(() => {
    api.get("/courses")
      .then(() => setCourses(approvedBatches))
      .catch(() => setCourses(approvedBatches))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="section-padding bg-brand-soft min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-brand-green uppercase tracking-widest">Published Programs</span>
          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-brand-dark mt-2">NEET Program Catalog</h1>
          <p className="text-gray-600 text-sm sm:text-base mt-3">
            Browse the institute's published course offerings as managed from the admin panel.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="w-10 h-10 border-4 border-brand-green border-t-transparent rounded-full animate-spin mx-auto" />
          </div>
        ) : courses.length === 0 ? (
          <div className="text-center py-20 text-gray-600">
            <p className="font-semibold text-brand-dark mb-2">No courses are currently published.</p>
            <p className="text-sm text-gray-500">Create and publish a course from the admin panel to make it visible here.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <div key={course._id} className="card card-hover flex flex-col justify-between border-gray-200">
                <div>
                  <div className="h-52 rounded-xl overflow-hidden mb-5 bg-gray-100 relative">
                    <img src={course.coverImageUrl || images.courseNeetFoundation} alt={course.name} className="w-full h-full object-cover" />
                    <div className="absolute top-3 left-3">
                      <span className="badge bg-brand-black/80 text-brand-lime border border-brand-lime/30">{course.targetClass || "NEET UG"}</span>
                    </div>
                  </div>

                  <h2 className="font-heading font-bold text-2xl text-brand-dark mb-2">{course.name}</h2>
                  <p className="text-sm text-gray-600 mb-6 leading-relaxed">{course.description}</p>

                  <div className="space-y-2 mb-6">
                    {course.features?.slice(0, 4).map((f, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-gray-700">
                        <CheckCircle className="w-4 h-4 text-brand-green shrink-0" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-5 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-gray-500 block">Fee</span>
                    <span className="font-extrabold text-xl text-brand-dark">₹{course.feeAmount?.toLocaleString() || "0"}</span>
                  </div>
                  <Link to="/register" className="btn-primary text-sm !py-2.5 !px-5">
                    Join Batch <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
