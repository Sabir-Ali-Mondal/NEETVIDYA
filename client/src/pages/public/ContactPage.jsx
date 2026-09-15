
import { useState } from "react";
import api from "../../config/api";
import toast from "react-hot-toast";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  GraduationCap,
  MessageCircle,
  ArrowUpRight,
  Clock,
  Navigation,
} from "lucide-react";
import WhatsAppLink from "../../components/shared/WhatsAppLink";
import TelegramLink from "../../components/shared/TelegramLink";
import useContactSettings from "../../hooks/useContactSettings";

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

      toast.success(
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
      toast.error("Failed to submit enquiry. Please call us directly.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-gray-200 bg-gray-50/70 px-4 py-3 text-sm text-gray-800 outline-none transition-all duration-200 placeholder:text-gray-400 hover:border-gray-300 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10";

  const labelClass =
    "mb-2 block text-xs font-bold uppercase tracking-wider text-gray-600";

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#f5f8f6] py-14 sm:py-20 lg:py-24">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-emerald-200/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-teal-200/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mx-auto mb-12 max-w-2xl text-center sm:mb-16">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-2 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-800">
              Connect With Us
            </span>
          </div>

          <h1 className="font-heading text-3xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            Your NEET Journey
            <span className="mt-1 block text-emerald-700">
              Starts Here.
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-gray-600 sm:text-base">
            Speak with our academic mentors regarding course eligibility,
            batch timing, and fee assistance. We are here to help you take
            the next step towards your dream.
          </p>
        </div>

        {/* Contact Details and Enquiry Form */}
        <div className="grid items-start gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Left: Contact Information */}
          <div className="space-y-6 lg:col-span-5">
            {/* Campus Card */}
            <div className="overflow-hidden rounded-3xl border border-gray-200/80 bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg">
              <div className="relative overflow-hidden bg-gradient-to-br from-emerald-800 via-emerald-700 to-teal-800 p-6 text-white sm:p-8">
                <div className="pointer-events-none absolute -right-8 -top-12 h-40 w-40 rounded-full border-[24px] border-white/5" />

                <div className="relative flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/20">
                    <GraduationCap className="h-6 w-6" />
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-emerald-100">
                      Visit Us
                    </p>
                    <h2 className="mt-1 font-heading text-xl font-bold sm:text-2xl">
                      Institute Campus
                    </h2>
                  </div>
                </div>
              </div>

              <div className="space-y-5 p-6 sm:p-8">
                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                    <MapPin className="h-5 w-5" />
                  </div>

                  <div className="min-w-0 pt-1">
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                      Our Address
                    </p>
                    <p className="mt-1 text-sm font-medium leading-6 text-gray-700">
                      NEETVIDYA COACHING CENTER, Karimpur Main Road,
                      Karimpur, Nadia
                    </p>
                  </div>
                </div>

                <div className="h-px bg-gray-100" />

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                    <Phone className="h-5 w-5" />
                  </div>

                  <div className="min-w-0 pt-1">
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                      Call Us
                    </p>
                    <p className="mt-1 break-words text-sm font-semibold text-gray-700">
                      {settings.institutePhone ||
                        "+91 74396 85658 / +91 83910 21878"}
                    </p>
                  </div>
                </div>

                <div className="h-px bg-gray-100" />

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                    <Mail className="h-5 w-5" />
                  </div>

                  <div className="min-w-0 pt-1">
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                      Email Us
                    </p>
                    <p className="mt-1 break-all text-sm font-semibold text-gray-700">
                      {settings.instituteEmail || "neetvidya720@gmail.com"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Chat Channels */}
            <div className="relative overflow-hidden rounded-3xl border border-emerald-200/70 bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-6 shadow-sm sm:p-8">
              <div className="pointer-events-none absolute -bottom-12 -right-10 h-36 w-36 rounded-full bg-emerald-100/60 blur-2xl" />

              <div className="relative">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-sm">
                    <MessageCircle className="h-5 w-5" />
                  </div>

                  <div>
                    <h3 className="font-heading text-lg font-bold text-gray-900">
                      Direct Chat Channels
                    </h3>
                    <p className="mt-1 text-xs text-emerald-700">
                      We are just a message away
                    </p>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-3 rounded-xl border border-emerald-100 bg-white px-4 py-3 transition-colors hover:border-emerald-300">
                    <WhatsAppLink
                      number={settings.whatsappNumber}
                      message={settings.whatsappDefaultMessage}
                      label="Chat with Counselor on WhatsApp"
                      className="flex-1 text-sm font-semibold text-emerald-700 hover:text-emerald-900"
                    />
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-emerald-600" />
                  </div>

                  {settings.whatsappGroupLink && (
                    <a
                      href={settings.whatsappGroupLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 rounded-xl border border-emerald-100 bg-white px-4 py-3 text-sm font-semibold text-emerald-700 transition-colors hover:border-emerald-300 hover:text-emerald-900"
                    >
                      <span className="flex-1">Join WhatsApp Group</span>
                      <ArrowUpRight className="h-4 w-4 shrink-0" />
                    </a>
                  )}

                  <div className="flex items-center gap-3 rounded-xl border border-sky-100 bg-white px-4 py-3 transition-colors hover:border-sky-300">
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

          {/* Right: Enquiry Form */}
          <div className="lg:col-span-7">
            <div className="overflow-hidden rounded-3xl border border-gray-200/80 bg-white shadow-lg shadow-gray-200/40">
              {/* Form Heading */}
              <div className="border-b border-gray-100 bg-gradient-to-r from-white to-emerald-50/50 px-6 py-7 sm:px-10 sm:py-9">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                    <Send className="h-5 w-5" />
                  </div>

                  <div>
                    <h2 className="font-heading text-xl font-bold text-gray-900 sm:text-2xl">
                      Send an Admission Enquiry
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-gray-500">
                      Fill in your details below and our team will get back
                      to you promptly.
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-2">
                  <span className="h-1.5 w-10 rounded-full bg-emerald-600" />
                  <span className="h-1.5 w-5 rounded-full bg-emerald-200" />
                  <span className="h-1.5 w-2 rounded-full bg-emerald-100" />
                </div>
              </div>

              {/* Form Fields */}
              <form
                onSubmit={handleSubmit}
                className="space-y-6 p-6 sm:p-10"
              >
                {/* Name and Phone */}
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

                {/* Email and Course */}
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

                  <p className="mt-2 text-xs text-gray-400">
                    Share your questions so our academic team can guide you
                    better.
                  </p>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="group flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-emerald-700 to-emerald-600 px-6 py-4 text-sm font-bold text-white shadow-md shadow-emerald-700/20 transition-all duration-200 hover:-translate-y-0.5 hover:from-emerald-800 hover:to-emerald-700 hover:shadow-lg hover:shadow-emerald-700/25 focus:outline-none focus:ring-4 focus:ring-emerald-500/20 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                >
                  {loading ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Submitting Enquiry...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      Submit Admission Enquiry
                    </>
                  )}
                </button>

                <p className="text-center text-xs leading-5 text-gray-400">
                  Your details will be used to respond to your admission
                  enquiry.
                </p>
              </form>
            </div>
          </div>
        </div>

        {/* Google Maps Location */}
        <div className="mt-12 sm:mt-16">
          <div className="overflow-hidden rounded-3xl border border-gray-200/80 bg-white shadow-lg shadow-gray-200/40">
            {/* Map Header */}
            <div className="flex flex-col gap-5 border-b border-gray-100 bg-gradient-to-r from-white to-emerald-50/50 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                  <MapPin className="h-6 w-6" />
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-emerald-700">
                    Find Our Location
                  </p>

                  <h2 className="mt-1 font-heading text-xl font-extrabold text-gray-900 sm:text-2xl">
                    NEETVIDYA COACHING CENTER
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Karimpur Main Road, Karimpur, Nadia
                  </p>
                </div>
              </div>

              <a
                href="https://maps.app.goo.gl/w8qdwchcmCKUuiBA8"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 self-start rounded-xl bg-emerald-700 px-5 py-3 text-sm font-bold text-white shadow-md shadow-emerald-700/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-emerald-800 hover:shadow-lg sm:self-center"
              >
                <Navigation className="h-4 w-4" />
                Get Directions
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>

            {/* Embedded Google Map */}
            <div className="relative h-[300px] w-full overflow-hidden bg-gray-100 sm:h-[400px] lg:h-[460px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3645.389904738659!2d88.62802537541862!3d23.982004878513003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f95b496d5aa2a3%3A0xf782e256576893df!2sNEETVIDYA%20COACHING%20CENTER!5e0!3m2!1sen!2sin!4v1789449477986!5m2!1sen!2sin"
                title="NEETVIDYA COACHING CENTER Google Maps Location"
                className="absolute inset-0 h-full w-full border-0"
                loading="lazy"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>

            {/* Map Footer */}
            <div className="flex flex-col gap-2 border-t border-gray-100 bg-white px-6 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <MapPin className="h-4 w-4 shrink-0 text-emerald-600" />
                <span>
                  Visit us for admission enquiries and academic guidance.
                </span>
              </div>

              <a
                href="https://maps.app.goo.gl/w8qdwchcmCKUuiBA8"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-emerald-700 transition-colors hover:text-emerald-900"
              >
                View on Google Maps →
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Note */}
        <div className="mt-10 text-center">
          <p className="text-xs text-gray-400">
            NEETVIDYA Coaching Center · Your partner in NEET preparation
          </p>
        </div>
      </div>
    </section>
  );
}