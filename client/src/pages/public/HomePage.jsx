import { Link } from "react-router-dom";
import { GraduationCap, BookOpen, ClipboardList, Target, ArrowRight, CheckCircle2, Award, Users, Star } from "lucide-react";
import { motion } from "framer-motion";
import images from "../../config/images";
import api from "../../config/api";
import { useState, useEffect } from "react";
import WhatsAppLink from "../../components/shared/WhatsAppLink";
import TelegramLink from "../../components/shared/TelegramLink";
import useContactSettings from "../../hooks/useContactSettings";

export default function HomePage() {
  const [courses, setCourses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const { settings } = useContactSettings();

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
    api.get("/courses").then(({ data }) => setCourses(approvedBatches)).catch(() => setCourses(approvedBatches));
    api.get("/teachers/public").then(({ data }) => setTeachers(data.data.teachers || [])).catch(() => {});
  }, []);

  return (
    <div className="space-y-0">
      {/* Hero Section */}
      <section className="relative bg-brand-black text-white py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-black via-brand-dark/95 to-transparent z-10" />
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-brand-green/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-brand-lime/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-green/20 border border-brand-green/30 text-brand-lime text-xs font-semibold uppercase tracking-wider">
                <Target className="w-3.5 h-3.5" /> NEET-focused academic coaching
              </div>
              <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl leading-[1.1] tracking-tight">
                Learn Better.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-lime to-emerald-400">Prepare Smarter.</span><br />
                Achieve More.
              </h1>
              <p className="text-gray-300 text-base sm:text-lg max-w-xl leading-relaxed">
                NEETVIDYA supports students with concept-based teaching, regular practice, and structured preparation for NEET-focused study goals.
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link to="/register" className="btn-lime text-base !py-3 !px-7 shadow-lg shadow-brand-lime/20">
                  Enroll <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/courses" className="btn-secondary text-base !py-3 !px-6 !border-white/30 !text-white hover:!bg-white/10">
                  View Programs
                </Link>
              </div>

              <div className="pt-6 border-t border-white/10 flex items-center gap-6 text-xs text-gray-400">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-lime" /> Regular Offline & Hybrid
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-lime" /> Daily Practice Papers
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-lime" /> Strict Negative Marking
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-brand-dark">
                <img src={images.aboutInstitute} alt="NEETVIDYA Classroom" className="w-full h-80 sm:h-96 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 bg-brand-black/80 backdrop-blur border border-white/10 p-4 rounded-xl flex items-center justify-between">
                  <div>
                    <p className="text-xs text-brand-lime font-bold uppercase">Admissions Open</p>
                    <p className="text-sm font-bold text-white">Dropper & Class 11, 12 Batches</p>
                  </div>
                  <WhatsAppLink number={settings.whatsappNumber} message={settings.whatsappDefaultMessage} label="Enquire Now" className="text-xs bg-emerald-600 text-white px-3 py-1.5 rounded-lg hover:bg-emerald-700" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Metric Strip */}
      <section className="bg-white py-10 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-brand-green flex items-center justify-center">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-heading font-extrabold text-2xl text-brand-dark">NEET</h4>
                <p className="text-xs text-gray-500 font-medium">Primary focus</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-lime-50 text-brand-dark flex items-center justify-center">
                <ClipboardList className="w-6 h-6 text-brand-green" />
              </div>
              <div>
                <h4 className="font-heading font-extrabold text-2xl text-brand-dark">2</h4>
                <p className="text-xs text-gray-500 font-medium">Core faculty profiles</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-heading font-extrabold text-2xl text-brand-dark">Admin</h4>
                <p className="text-xs text-gray-500 font-medium">Managed programs</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-heading font-extrabold text-2xl text-brand-dark">Batches</h4>
                <p className="text-xs text-gray-500 font-medium">Live institute groups</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="section-padding bg-brand-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-12">
            <div>
              <span className="text-xs font-bold text-brand-green uppercase tracking-widest">Program Listings</span>
              <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-brand-dark mt-1">Published NEET Programs</h2>
            </div>
            <Link to="/courses" className="text-brand-green font-semibold text-sm hover:underline inline-flex items-center gap-1">
              View All Programs <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.length > 0 ? (
              courses.map((course) => (
                <div key={course._id} className="card card-hover flex flex-col justify-between border-gray-200">
                  <div>
                    <div className="h-48 rounded-lg overflow-hidden mb-4 bg-gray-100">
                      <img src={course.coverImageUrl || images.courseNeetFoundation} alt={course.name} className="w-full h-full object-cover" />
                    </div>
                    <span className="badge bg-emerald-100 text-emerald-800 mb-2">{course.targetClass || "All Aspirants"}</span>
                    <h3 className="font-heading font-bold text-xl text-brand-dark mb-2">{course.name}</h3>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-3">{course.description}</p>
                  </div>
                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-gray-500 block">Fees</span>
                      <span className="font-bold text-lg text-brand-dark">₹{course.feeAmount?.toLocaleString() || "Contact"}</span>
                    </div>
                    <Link to="/register" className="btn-primary text-xs !py-2 !px-4">
                      Enroll Now
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center py-12 text-gray-600">
                <p className="font-semibold text-brand-dark mb-2">Courses are managed from the admin panel.</p>
                <p className="text-sm text-gray-500">Publish a course from the admin dashboard to display it on this page.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Teaching Methodology */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-brand-green uppercase tracking-widest">Our Approach</span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-brand-dark mt-2">The NEETVIDYA Preparation Framework</h2>
            <p className="text-gray-600 text-sm mt-3">Concept learning, regular practice, and guided improvement over time</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: "01", title: "NCERT Deep Dive", desc: "Line-by-line concept breakdown in Physics, Chemistry, and Biology." },
              { step: "02", title: "Daily DPP Drills", desc: "Mandatory 30-minute practice papers every evening after classes." },
              { step: "03", title: "CBT Examination", desc: "Simulated exam hall environment with instant negative mark analysis." },
              { step: "04", title: "Personal Mentor Review", desc: "1-on-1 error notebook discussion to guarantee zero repeated mistakes." },
            ].map((item) => (
              <div key={item.step} className="p-6 rounded-2xl bg-brand-soft border border-gray-100 relative group hover:border-brand-green transition-all">
                <span className="font-heading font-extrabold text-3xl text-brand-green/30 group-hover:text-brand-green transition-colors">{item.step}</span>
                <h4 className="font-heading font-bold text-lg text-brand-dark mt-3 mb-2">{item.title}</h4>
                <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Test Series Promo Banner */}
      <section className="section-padding bg-brand-black text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="bg-gradient-to-r from-brand-dark to-gray-900 border border-white/10 p-8 sm:p-12 rounded-3xl grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="badge bg-brand-lime text-brand-black font-bold">Comprehensive Test Series</span>
              <h2 className="font-heading font-extrabold text-3xl sm:text-4xl">NEETVIDYA Computerized Test Engine</h2>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-2xl">
                Experience full-screen exam simulation, Question Palettes, Review tags, and comprehensive solution scorecards with accuracy charts.
              </p>
              <div className="pt-2 flex flex-wrap gap-4">
                <Link to="/test-series" className="btn-primary text-sm">
                  Explore Test Series <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/contact" className="btn-secondary text-sm !border-white/30 !text-white hover:!bg-white/10">
                  Request Sample Papers
                </Link>
              </div>
            </div>
            <div className="lg:col-span-4 flex justify-center">
              <img src={images.testSeriesBanner} alt="Test Series Preview" className="rounded-2xl border border-white/15 shadow-xl max-h-60 object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-brand-soft border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-brand-dark">
            Ready to begin your NEET preparation?
          </h2>
          <p className="text-gray-600 text-sm sm:text-base max-w-xl mx-auto">
            Book a counselling session or register for the next available admission cycle and batch details.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/register" className="btn-primary text-base !py-3 !px-8">
              Register for Admission
            </Link>
            <Link to="/contact" className="btn-secondary text-base !py-3 !px-7">
              Contact Admissions
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
