import { Link } from "react-router-dom";
import { ArrowLeft, ShieldCheck, FileText } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/60 sm:p-10">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-green-100 text-green-700">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-green-600">NEETVIDYA</p>
              <h1 className="font-heading text-2xl font-extrabold text-slate-900">Terms of Service & Privacy Policy</h1>
            </div>
          </div>

          <Link to="/register" className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-slate-900">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
        </div>

        <div className="space-y-6 text-sm leading-7 text-slate-600">
          <section>
            <h2 className="mb-2 font-heading text-lg font-bold text-slate-900">Terms of Service</h2>
            <p>
              By creating an account on NEETVIDYA, you agree to use the platform responsibly and for lawful educational purposes only.
              You are responsible for keeping your login details secure and for all activity that occurs under your account.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-heading text-lg font-bold text-slate-900">Privacy Policy</h2>
            <p>
              We collect your name, email, phone number, and other necessary registration details to provide access to the learning portal,
              communicate important updates, and support your preparation journey. This information is kept secure and used only for the intended academic and administrative purposes.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-heading text-lg font-bold text-slate-900">Data Use</h2>
            <p>
              Your data may be used to manage admissions, verify your account, send course-related updates, and provide support through the platform.
              We do not sell or share personal information with third parties for marketing purposes.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-heading text-lg font-bold text-slate-900">Student Responsibility</h2>
            <p>
              Students are expected to provide accurate information and comply with the platform's rules and academic policies.
              NEETVIDYA may update these terms from time to time, and continued use of the platform indicates acceptance of any changes.
            </p>
          </section>

          <div className="rounded-2xl border border-green-100 bg-green-50 p-4 text-green-800">
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0" />
              <p>
                We value your privacy and aim to protect your personal information while providing a safe and useful learning experience.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
