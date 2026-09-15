import { useState, useEffect } from "react";
import api from "../../config/api";
import { Save, Globe, Mail, Send, RotateCcw, ExternalLink } from "lucide-react";
import toast from "react-hot-toast";

const defaultSettings = {
  instituteEmail: "contact@neetvidya.com",
  institutePhone: "+91 98765 43210",
  address: "NEETVIDYA Medical Academy, Ring Road",
  city: "New Delhi",
  state: "Delhi",
  telegramChannelLink: "https://t.me/neetvidya720official",
  whatsappGroupLink: "https://chat.whatsapp.com/neetvidya",
  whatsappNumber: "919876543210",
  whatsappDefaultMessage: "Hello NEETVIDYA, I would like admission details.",
  facebookLink: "https://facebook.com/neetvidya",
  instagramLink: "https://instagram.com/neetvidya",
  youtubeLink: "https://youtube.com/@neetvidya",
  officeHours: "Mon–Sat: 8:00 AM – 7:00 PM",
  mapEmbedUrl: "",
};

export default function AdminContactSettings() {
  const [form, setForm] = useState({
    instituteEmail: "",
    institutePhone: "",
    address: "",
    city: "",
    state: "",
    telegramChannelLink: "",
    whatsappGroupLink: "",
    whatsappNumber: "",
    whatsappDefaultMessage: "",
    facebookLink: "",
    instagramLink: "",
    youtubeLink: "",
    officeHours: "",
    mapEmbedUrl: "",
  });
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/contact-settings")
      .then(({ data }) => {
        if (data.data?.settings) setForm(data.data.settings);
      })
      .catch(() => { })
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleReset = () => {
    if (confirm("Reset all contact settings to institute defaults?")) {
      setForm(defaultSettings);
      toast.success("Settings reset to defaults. Click 'Save All Settings' to persist.");
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.put("/contact-settings", form);
      toast.success("Contact settings saved successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const inputCls =
    "w-full px-4 py-3 border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition";
  const labelCls =
    "block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2";

  return (
    <div className="p-6 space-y-6 max-w-4xl">
      <div>
        <h1 className="font-extrabold text-2xl text-slate-900">Contact &amp; Links Settings</h1>
        <p className="text-slate-500 text-sm mt-1">
          Manage institute contact details and social/channel links
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* Basic Contact */}
        <div className="bg-white border-slate-100 rounded-2xl shadow-sm p-6 space-y-4">
          <h2 className="font-bold text-slate-800 flex items-center gap-2">
            <Mail className="w-4 h-4 text-green-600" /> Basic Contact
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Email</label>
              <input
                name="instituteEmail"
                value={form.instituteEmail}
                onChange={handleChange}
                className={inputCls}
              />
            </div>
            <div>
              <label className={labelCls}>Phone</label>
              <input
                name="institutePhone"
                value={form.institutePhone}
                onChange={handleChange}
                className={inputCls}
              />
            </div>
          </div>
          <div>
            <label className={labelCls}>Address</label>
            <input
              name="address"
              value={form.address}
              onChange={handleChange}
              className={inputCls}
            />
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className={labelCls}>City</label>
              <input name="city" value={form.city} onChange={handleChange} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>State</label>
              <input name="state" value={form.state} onChange={handleChange} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Office Hours</label>
              <input
                name="officeHours"
                value={form.officeHours}
                onChange={handleChange}
                className={inputCls}
              />
            </div>
          </div>
        </div>

        {/* Channel Links */}
        <div className="bg-white border-slate-100 rounded-2xl shadow-sm p-6 space-y-4">
          <h2 className="font-bold text-slate-800 flex items-center gap-2">
            <Send className="w-4 h-4 text-sky-600" /> Channel &amp; Group Links
          </h2>
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className={labelCls}>Telegram Channel Link</label>
              {form.telegramChannelLink && (
                <a
                  href={form.telegramChannelLink}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-sky-600 hover:underline inline-flex items-center gap-1 font-semibold"
                >
                  Test Link <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
            <input
              name="telegramChannelLink"
              value={form.telegramChannelLink}
              onChange={handleChange}
              placeholder="https://t.me/neetvidya720official"
              className={inputCls}
            />
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className={labelCls}>WhatsApp Group Link</label>
              {form.whatsappGroupLink && (
                <a
                  href={form.whatsappGroupLink}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-green-600 hover:underline inline-flex items-center gap-1 font-semibold"
                >
                  Test Link <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
            <input
              name="whatsappGroupLink"
              value={form.whatsappGroupLink}
              onChange={handleChange}
              placeholder="https://chat.whatsapp.com/ABC123XYZ"
              className={inputCls}
            />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>WhatsApp Number (direct chat)</label>
              <input
                name="whatsappNumber"
                value={form.whatsappNumber}
                onChange={handleChange}
                placeholder="919876543210"
                className={inputCls}
              />
            </div>
            <div>
              <label className={labelCls}>WhatsApp Default Message</label>
              <input
                name="whatsappDefaultMessage"
                value={form.whatsappDefaultMessage}
                onChange={handleChange}
                className={inputCls}
              />
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="bg-white border-slate-100 rounded-2xl shadow-sm p-6 space-y-4">
          <h2 className="font-bold text-slate-800 flex items-center gap-2">
            <Globe className="w-4 h-4 text-purple-600" /> Social Media Links
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Facebook</label>
              <input
                name="facebookLink"
                value={form.facebookLink}
                onChange={handleChange}
                placeholder="https://facebook.com/neetvidya"
                className={inputCls}
              />
            </div>
            <div>
              <label className={labelCls}>Instagram</label>
              <input
                name="instagramLink"
                value={form.instagramLink}
                onChange={handleChange}
                placeholder="https://instagram.com/neetvidya"
                className={inputCls}
              />
            </div>
            <div>
              <label className={labelCls}>YouTube</label>
              <input
                name="youtubeLink"
                value={form.youtubeLink}
                onChange={handleChange}
                placeholder="https://youtube.com/@neetvidya"
                className={inputCls}
              />
            </div>
            <div>
              <label className={labelCls}>Google Map Embed URL</label>
              <input
                name="mapEmbedUrl"
                value={form.mapEmbedUrl}
                onChange={handleChange}
                placeholder="https://www.google.com/maps/embed?pb=..."
                className={inputCls}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white font-bold px-8 py-3 rounded-xl transition shadow-sm"
          >
            <Save className="w-4 h-4" />
            {saving ? "Saving..." : "Save All Settings"}
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-5 py-3 border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold rounded-xl text-sm transition"
          >
            <RotateCcw className="w-4 h-4" /> Reset to Defaults
          </button>
        </div>
      </form>
    </div>
  );
}
