import images from "../../config/images";
import { CheckCircle2, ShieldCheck, Target, Award } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Intro Section */}
      <section className="section-padding bg-brand-soft border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-bold text-brand-green uppercase tracking-widest">About NEETVIDYA</span>
              <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-brand-dark mt-2 mb-6 leading-tight">
                Focused NEET preparation with structured academic guidance
              </h1>
              <p className="text-gray-600 text-base leading-relaxed mb-4">
                NEETVIDYA is organized around a clear NEET preparation model: concept-driven learning, regular practice, and guided support for students preparing for competitive medical entrance goals.
              </p>
              <p className="text-gray-600 text-base leading-relaxed mb-6">
                The institute currently operates with faculty-led mentoring, admin-managed course publishing, and batch-based academic planning for students seeking consistent preparation support.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-white rounded-xl border border-gray-100">
                  <h4 className="font-extrabold text-2xl text-brand-green">NEET</h4>
                  <p className="text-xs text-gray-500 font-medium">Core academic focus</p>
                </div>
                <div className="p-4 bg-white rounded-xl border border-gray-100">
                  <h4 className="font-extrabold text-2xl text-brand-green">Batch</h4>
                  <p className="text-xs text-gray-500 font-medium">Based learning model</p>
                </div>
              </div>
            </div>
            <div>
              <img src={images.aboutInstitute} alt="Institute Campus" className="rounded-2xl shadow-xl border border-gray-200" />
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-xl mx-auto mb-16">
            <h2 className="font-heading font-extrabold text-3xl text-brand-dark">The NEETVIDYA Pillars</h2>
            <p className="text-sm text-gray-500 mt-2">Every feature in our platform is engineered around these fundamentals</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="card">
              <ShieldCheck className="w-8 h-8 text-brand-green mb-4" />
              <h3 className="font-heading font-bold text-xl mb-2">Concept-first learning</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Students are guided through core concepts and regular revision to build confidence in the subject areas most relevant to NEET preparation.
              </p>
            </div>
            <div className="card">
              <Target className="w-8 h-8 text-brand-lime text-brand-dark mb-4" />
              <h3 className="font-heading font-bold text-xl mb-2">Error Tracking</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Students are encouraged to keep a structured record of mistakes and weak areas so learning remains targeted and improvement is measurable over time.
              </p>
            </div>
            <div className="card">
              <Award className="w-8 h-8 text-brand-green mb-4" />
              <h3 className="font-heading font-bold text-xl mb-2">Practice Under Timed Conditions</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Timed practice sessions help students become comfortable with exam-style pressure and improve their confidence in competitive preparation.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
