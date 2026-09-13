import { useState } from "react";
import api from "../../config/api";
import toast from "react-hot-toast";
import { Mail, Phone, MapPin, Send, MessageCircle } from "lucide-react";
import WhatsAppLink from "../../components/shared/WhatsAppLink";
import TelegramLink from "../../components/shared/TelegramLink";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", course: "NEET Dropper Pinnacle", message: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/enquiries", form);
      toast.success("Enquiry submitted! Our admissions counselor will call you within 24 hours.");
      setForm({ name: "", email: "", phone: "", course: "NEET Dropper Pinnacle", message: "" });
    } catch (err) {
      toast.error("Failed to submit enquiry. Please call us directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section-padding bg-brand-soft min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-xs font-bold text-brand-green uppercase tracking-widest">Connect With Us</span>
          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-brand-dark mt-2">Admissions & Consulting</h1>
          <p className="text-gray-600 text-sm mt-3">Speak with our academic mentors regarding course eligibility, batch timing, and fee assistance.</p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12">
          {/* Contact Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="card space-y-4">
              <h3 className="font-heading font-bold text-xl text-brand-dark">Institute Campus</h3>
              <div className="flex items-start gap-3 text-sm text-gray-600">
                <MapPin className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />
                <span>Sector V, Salt Lake, Near Electronic Complex, Kolkata, West Bengal 700091</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Phone className="w-5 h-5 text-brand-green shrink-0" />
                <span>+91 98765 43210 (Mon - Sat: 9 AM - 6 PM)</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Mail className="w-5 h-5 text-brand-green shrink-0" />
                <span>admissions@neetvidya.com</span>
              </div>
            </div>

            <div className="card space-y-3 bg-gradient-to-br from-emerald-50 to-emerald-100/40 border-emerald-200">
              <h4 className="font-heading font-bold text-base text-emerald-900">Direct Chat Channels</h4>
              <p className="text-xs text-emerald-800">For immediate admission enquiries and doubts, reach us directly via WhatsApp or Telegram:</p>
              <div className="pt-2 flex flex-col gap-2">
                <WhatsAppLink number="919876543210" label="Chat with Counselor on WhatsApp" className="text-sm text-emerald-700 hover:text-emerald-800 font-semibold" />
                <TelegramLink username="neetvidya_support" label="Ask Support via Telegram Bot" className="text-sm text-sky-700 hover:text-sky-800 font-semibold" />
              </div>
            </div>
          </div>

          {/* Enquiry Form */}
          <div className="lg:col-span-7">
            <div className="card shadow-lg p-8 sm:p-10 bg-white">
              <h2 className="font-heading font-bold text-2xl text-brand-dark mb-2">Send an Admission Enquiry</h2>
              <p className="text-xs text-gray-500 mb-6">Fill in your details below and our team will get back to you promptly.</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Student Full Name</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="e.g. Priya Das"
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Contact Phone</label>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+91 98765 XXXXX"
                      className="input-field"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="priya@gmail.com"
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Target Program</label>
                    <select
                      value={form.course}
                      onChange={(e) => setForm({ ...form, course: e.target.value })}
                      className="input-field"
                    >
                      <option value="NEET Dropper Pinnacle">NEET Dropper Pinnacle (1 Year)</option>
                      <option value="Class XI Foundation Master">Class XI Foundation Master (2 Years)</option>
                      <option value="NEET Crash Course">NEET Crash Course (3 Months)</option>
                      <option value="Test Series Only">Test Series Only</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Message / Current Status</label>
                  <textarea
                    rows={4}
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell us about your current class, target NEET score, and any specific queries..."
                    className="input-field resize-none"
                  />
                </div>

                <button type="submit" disabled={loading} className="btn-primary w-full !py-3">
                  <Send className="w-4 h-4" />
                  {loading ? "Submitting Enquiry..." : "Submit Admission Enquiry"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
