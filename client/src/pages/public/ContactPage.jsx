import { useState } from "react";
import api from "../../config/api";
import { alertSuccess, alertError } from "../../utils/alert";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  GraduationCap,
  MessageCircle,
  ArrowUpRight,
  Navigation,
} from "lucide-react";
import WhatsAppLink from "../../components/shared/WhatsAppLink";
import TelegramLink from "../../components/shared/TelegramLink";
import useContactSettings from "../../hooks/useContactSettings";
import { Reveal, FadeInCard } from "../../components/shared/MotionReveal";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const { settings } = useContactSettings();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("/enquiries", form);

      alertSuccess(
        "Enquiry submitted! Our admissions counselor will call you within 24 hours."
      );

      setForm({
        name: "",
        email: "",
        phone: "",
        course: "",
        message: "",
      });
    } catch (err) {
      alertError("Failed to submit enquiry. Please call us directly.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-800 outline-none transition-all duration-200 placeholder:text-slate-400 hover:border-slate-300 focus:border-brand-green focus:bg-white focus:ring-4 focus:ring-brand-green/10";

  const labelClass =
    "mb-2 block text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500";

  return (
    <main className="relative min-h-screen overflow-hidden bg-brand-soft">
      {/* Decorative background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 right-0 h-96 w-96 rounded-full bg-brand-green/10 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[45%] -left-40 h-96 w-96 rounded-full bg-emerald-200/20 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-[-8rem] h-80 w-80 rounded-full bg-lime-200/20 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        {/* Hero */}
        <Reveal className="mx-auto mb-14 max-w-3xl text-center sm:mb-20">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-green/20 bg-white/80 px-4 py-2 shadow-sm backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-brand-green" />

            <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-green">
              Connect With Us
            </span>
          </div>

          <h1 className="font-heading text-4xl font-extrabold leading-tight tracking-tight text-brand-dark sm:text-5xl lg:text-6xl">
            Your NEET Journey
            <span className="mt-1 block text-brand-green">
              Starts Here.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            Speak with our academic mentors about course eligibility, batch
            timings, fees, and admission support. We are here to help you take
            the next step.
          </p>

          <div className="mx-auto mt-8 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-brand-green/40" />
            <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
            <span className="h-px w-10 bg-brand-green/40" />
          </div>
        </Reveal>

        {/* Contact + Form */}
        <div className="grid items-start gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Left */}
          <div className="space-y-8 lg:col-span-5">
            {/* Institute card */}
            <div className="group overflow-hidden rounded-[2rem] border border-white/80 bg-white shadow-[0_12px_50px_-20px_rgba(15,23,42,0.18)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_60px_-20px_rgba(15,23,42,0.24)]">
              <div className="relative overflow-hidden bg-brand-black px-6 py-7 text-white sm:px-8 sm:py-8">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-10 -top-16 h-44 w-44 rounded-full border-[26px] border-brand-green/10"
                />

                <div className="relative flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-green text-white shadow-lg shadow-brand-green/20">
                    <GraduationCap className="h-6 w-6" />
                  </div>

                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-lime">
                      Visit Us
                    </p>

                    <h2 className="mt-1 font-heading text-xl font-extrabold sm:text-2xl">
                      NEETVIDYA Campus
                    </h2>
                  </div>
                </div>
              </div>

              <div className="space-y-5 p-6 sm:p-8">
                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand-green">
                    <MapPin className="h-5 w-5" />
                  </div>

                  <div className="min-w-0 pt-1">
                    <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">
                      Our Address
                    </p>

                    <p className="mt-1 text-sm font-medium leading-6 text-slate-600">
                      NEETVIDYA COACHING CENTER, Karimpur Main Road,
                      Karimpur, Nadia
                    </p>
                  </div>
                </div>

                <div className="h-px bg-slate-100" />

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand-green">
                    <Phone className="h-5 w-5" />
                  </div>

                  <div className="min-w-0 pt-1">
                    <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">
                      Call Us
                    </p>

                    <p className="mt-1 break-words text-sm font-semibold text-slate-600">
                      {settings.institutePhone ||
                        "+91 74396 85658 / +91 83910 21878"}
                    </p>
                  </div>
                </div>

                <div className="h-px bg-slate-100" />

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand-green">
                    <Mail className="h-5 w-5" />
                  </div>

                  <div className="min-w-0 pt-1">
                    <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">
                      Email Us
                    </p>

                    <p className="mt-1 break-all text-sm font-semibold text-slate-600">
                      {settings.instituteEmail || "neetvidya720@gmail.com"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct channels */}
            <div className="relative overflow-hidden rounded-[2rem] border border-brand-green/15 bg-white p-6 shadow-[0_12px_50px_-20px_rgba(15,23,42,0.15)] sm:p-8">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-16 -right-12 h-44 w-44 rounded-full bg-brand-green/10 blur-3xl"
              />

              <div className="relative">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-green text-white shadow-md shadow-brand-green/20">
                    <MessageCircle className="h-5 w-5" />
                  </div>

                  <div>
                    <h3 className="font-heading text-lg font-extrabold text-brand-dark">
                      Direct Chat Channels
                    </h3>

                    <p className="mt-1 text-xs text-slate-500">
                      We are just a message away
                    </p>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  {/* WhatsApp */}
                  <div className="flex items-center gap-3 rounded-xl border border-slate-100 bg-brand-soft/50 px-4 py-3 transition-all duration-300 hover:border-brand-green/30 hover:bg-white">
                    <WhatsAppLink
                      number={settings.whatsappNumber}
                      message={settings.whatsappDefaultMessage}
                      label="Chat with Counselor on WhatsApp"
                      className="flex-1 text-sm font-semibold text-brand-green hover:text-brand-dark"
                    />

                    <ArrowUpRight className="h-4 w-4 shrink-0 text-brand-green" />
                  </div>

                  {/* WhatsApp group */}
                  {settings.whatsappGroupLink && (
                    <a
                      href={settings.whatsappGroupLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 rounded-xl border border-slate-100 bg-brand-soft/50 px-4 py-3 text-sm font-semibold text-brand-green transition-all duration-300 hover:border-brand-green/30 hover:bg-white hover:text-brand-dark"
                    >
                      <span className="flex-1">Join WhatsApp Group</span>
                      <ArrowUpRight className="h-4 w-4 shrink-0" />
                    </a>
                  )}

                  {/* Telegram */}
                  <div className="flex items-center gap-3 rounded-xl border border-sky-100 bg-sky-50/40 px-4 py-3 transition-all duration-300 hover:border-sky-200 hover:bg-white">
                    <TelegramLink
                      url={settings.telegramChannelLink}
                      label="Join Telegram Channel"
                      className="flex-1 text-sm font-semibold text-sky-700 hover:text-sky-900"
                    />

                    <ArrowUpRight className="h-4 w-4 shrink-0 text-sky-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Form */}
          <div id="contact-form" className="lg:col-span-7">
            <div className="overflow-hidden rounded-[2rem] border border-white/80 bg-white shadow-[0_12px_50px_-20px_rgba(15,23,42,0.2)]">
              {/* Form header */}
              <div className="border-b border-slate-100 bg-gradient-to-r from-white via-white to-emerald-50/70 px-6 py-7 sm:px-10 sm:py-9">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-soft text-brand-green">
                    <Send className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.18em] text-brand-green">
                      Admission Support
                    </p>

                    <h2 className="font-heading text-xl font-extrabold text-brand-dark sm:text-2xl">
                      Send an Admission Enquiry
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      Fill in your details and our team will get back to you.
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-2">
                  <span className="h-1.5 w-10 rounded-full bg-brand-green" />
                  <span className="h-1.5 w-5 rounded-full bg-emerald-200" />
                  <span className="h-1.5 w-2 rounded-full bg-emerald-100" />
                </div>
              </div>

              {/* Form */}
              <form
                onSubmit={handleSubmit}
                className="space-y-6 p-6 sm:p-10"
              >
                {/* Name + phone */}
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className={labelClass}>
                      Student Full Name
                    </label>

                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      placeholder="e.g. Priya Das"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>
                      Contact Phone
                    </label>

                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) =>
                        setForm({ ...form, phone: e.target.value })
                      }
                      placeholder="+91 98765 XXXXX"
                      className={inputClass}
                    />
                  </div>
                </div>

                {/* Email + course */}
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className={labelClass}>
                      Email Address
                    </label>

                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      placeholder="priya@gmail.com"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>
                      Target Program
                    </label>

                    <select
                      value={form.course}
                      onChange={(e) =>
                        setForm({ ...form, course: e.target.value })
                      }
                      className={`${inputClass} cursor-pointer`}
                    >
                      <option value="">Select a program</option>
                      <option value="12th Batch – SANKALP">
                        12th Batch – SANKALP
                      </option>
                      <option value="11th Batch – UDAAN">
                        11th Batch – UDAAN
                      </option>
                      <option value="Admin-managed course">
                        Admin-managed course
                      </option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className={labelClass}>
                    Message / Current Status
                  </label>

                  <textarea
                    rows={5}
                    required
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                    placeholder="Tell us about your current class, target NEET score, and any specific queries..."
                    className={`${inputClass} resize-none leading-6`}
                  />

                  <p className="mt-2 text-xs text-slate-400">
                    Share your questions so our academic team can guide you
                    better.
                  </p>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="group flex w-full items-center justify-center gap-3 rounded-xl bg-brand-green px-6 py-4 text-sm font-bold text-white shadow-md shadow-brand-green/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-dark hover:shadow-lg hover:shadow-brand-green/20 focus:outline-none focus:ring-4 focus:ring-brand-green/20 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                >
                  {loading ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Submitting Enquiry...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      Submit Admission Enquiry
                    </>
                  )}
                </button>

                <p className="text-center text-xs leading-5 text-slate-400">
                  Your details will only be used to respond to your admission
                  enquiry.
                </p>
              </form>
            </div>
          </div>
        </div>

        {/* Google Maps */}
        <div className="mt-12 sm:mt-16">
          <div className="overflow-hidden rounded-[2rem] border border-white/80 bg-white shadow-[0_12px_50px_-20px_rgba(15,23,42,0.2)]">
            {/* Map header */}
            <div className="flex flex-col gap-5 border-b border-slate-100 bg-gradient-to-r from-white to-emerald-50/70 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-soft text-brand-green">
                  <MapPin className="h-6 w-6" />
                </div>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-green">
                    Find Our Location
                  </p>

                  <h2 className="mt-1 font-heading text-xl font-extrabold text-brand-dark sm:text-2xl">
                    NEETVIDYA COACHING CENTER
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Karimpur Main Road, Karimpur, Nadia
                  </p>
                </div>
              </div>

              <a
                href="https://maps.app.goo.gl/w8qdwchcmCKUuiBA8"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 self-start rounded-xl bg-brand-green px-5 py-3 text-sm font-bold text-white shadow-md shadow-brand-green/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-dark hover:shadow-lg sm:self-center"
              >
                <Navigation className="h-4 w-4" />
                Get Directions
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>

            {/* Map */}
            <div className="relative h-[300px] w-full overflow-hidden bg-slate-100 sm:h-[400px] lg:h-[460px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3645.389904738659!2d88.62802537541862!3d23.982004878513003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f95b496d5aa2a3%3A0xf782e256576893df!2sNEETVIDYA%20COACHING%20CENTER!5e0!3m2!1sen!2sin!4v1789449477986!5m2!1sen!2sin"
                title="NEETVIDYA COACHING CENTER Google Maps Location"
                className="absolute inset-0 h-full w-full border-0"
                loading="lazy"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>

            {/* Map footer */}
            <div className="flex flex-col gap-3 border-t border-slate-100 bg-white px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <MapPin className="h-4 w-4 shrink-0 text-brand-green" />

                <span>
                  Visit us for admission enquiries and academic guidance.
                </span>
              </div>

              <a
                href="https://maps.app.goo.gl/w8qdwchcmCKUuiBA8"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-brand-green transition-colors hover:text-brand-dark"
              >
                View on Google Maps →
              </a>
            </div>
          </div>
        </div>

        {/* Bottom message */}
        <div className="mx-auto mt-12 max-w-2xl text-center sm:mt-16">
          <p className="font-heading text-xl font-bold text-brand-dark sm:text-2xl">
            Have questions? Let's talk.
          </p>

          <p className="mt-3 text-sm leading-6 text-slate-500 sm:text-base">
            Get the information you need to take your next step with
            NEETVIDYA.
          </p>
        </div>
      </div>
    </main>
  );
}