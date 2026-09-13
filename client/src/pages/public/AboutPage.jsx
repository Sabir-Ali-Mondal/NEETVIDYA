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
              <span className="text-xs font-bold text-brand-green uppercase tracking-widest">Our Legacy</span>
              <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-brand-dark mt-2 mb-6 leading-tight">
                Dedicated Solely to Creating Exceptional Doctors
              </h1>
              <p className="text-gray-600 text-base leading-relaxed mb-4">
                NEETVIDYA was established with a singular focus: stripping away the noise of multi-exam coaching and providing deep, dedicated mastery of the National Eligibility cum Entrance Test (NEET UG).
              </p>
              <p className="text-gray-600 text-base leading-relaxed mb-6">
                Our institute brings together elite educators, scientifically crafted NCERT question sets, and high-frequency testing that replicates actual competitive examination psychology.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-white rounded-xl border border-gray-100">
                  <h4 className="font-extrabold text-2xl text-brand-green">100%</h4>
                  <p className="text-xs text-gray-500 font-medium">NEET Medical Focus</p>
                </div>
                <div className="p-4 bg-white rounded-xl border border-gray-100">
                  <h4 className="font-extrabold text-2xl text-brand-green">4:1</h4>
                  <p className="text-xs text-gray-500 font-medium">Practice to Theory Ratio</p>
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
              <h3 className="font-heading font-bold text-xl mb-2">No Gimmicks, Pure NCERT</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                95%+ of NEET questions originate directly from NCERT lines and diagrams. We drill NCERT text until students can recall every caption effortlessly.
              </p>
            </div>
            <div className="card">
              <Target className="w-8 h-8 text-brand-lime text-brand-dark mb-4" />
              <h3 className="font-heading font-bold text-xl mb-2">Error Log Notebook</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                We mandate that every student maintains a categorized error log for every wrong attempt or silly mistake, systematically eliminating negative marks.
              </p>
            </div>
            <div className="card">
              <Award className="w-8 h-8 text-brand-green mb-4" />
              <h3 className="font-heading font-bold text-xl mb-2">Psychological Resilience</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                With timed test simulators matching exact 3-hour 20-minute NTA slots, our students feel zero pressure or panic on the actual examination day.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
