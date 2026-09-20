import { useState, useEffect } from "react";
import api from "../../config/api";
import {
  Save,
  Globe,
  Mail,
  Send,
  RotateCcw,
  ExternalLink,
  MapPin,
  Phone,
  Clock3,
  MessageCircle,
} from "lucide-react";
import {
  alertSuccess,
  alertError,
  confirmDialog,
} from "../../utils/alert";

const defaultSettings = {
  instituteEmail: "contact@neetvidya.com",
  institutePhone: "+91 98765 43210",
  address: "NEETVIDYA Medical Academy, Ring Road",
  city: "New Delhi",
  state: "Delhi",
  telegramChannelLink: "https://t.me/neetvidya720official",
  whatsappGroupLink: "https://chat.whatsapp.com/neetvidya",
  whatsappNumber: "919876543210",
  whatsappDefaultMessage:
    "Hello NEETVIDYA, I would like admission details.",
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
        if (data.data?.settings) {
          setForm(data.data.settings);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleReset = async () => {
    const confirmed = await confirmDialog({
      title: "Reset Settings?",
      text: "Reset all contact settings to institute defaults?",
      confirmText: "Yes, reset",
    });

    if (confirmed) {
      setForm(defaultSettings);

      alertSuccess(
        "Settings reset to defaults. Click 'Save All Settings' to persist."
      );
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();

    setSaving(true);

    try {
      await api.put("/contact-settings", form);

      alertSuccess("Contact settings saved successfully");
    } catch (err) {
      alertError(
        err.response?.data?.message || "Failed to save"
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[320px] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-9 w-9 animate-spin rounded-full border-4 border-green-100 border-t-brand-green" />
          <p className="text-sm font-medium text-slate-500">
            Loading contact settings...
          </p>
        </div>
      </div>
    );
  }

  const inputCls =
    "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-brand-green focus:ring-4 focus:ring-green-500/10";

  const labelCls =
    "mb-1.5 block text-[11px] font-bold uppercase tracking-widest text-slate-500";

  const sectionCls =
    "overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-sm";

  const sectionHeaderCls =
    "flex items-center gap-3 border-b border-slate-100 px-5 py-4 sm:px-6";

  const testLink = (url, color = "green") => {
    if (!url) return null;

    const colorClasses =
      color === "sky"
        ? "text-sky-600 hover:bg-sky-50"
        : "text-brand-green hover:bg-green-50";

    return (
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className={`inline-flex shrink-0 items-center gap-1 rounded-lg px-2 py-1 text-[11px] font-bold transition ${colorClasses}`}
      >
        Test
        <ExternalLink className="h-3 w-3" />
      </a>
    );
  };

  return (
    <div className="min-h-full space-y-5 p-3 sm:space-y-6 sm:p-5 lg:p-7">
      {/* HEADER */}
      <section className="relative overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-6 lg:p-7">
        <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-green-100/60 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-emerald-100/50 blur-3xl" />

        <div className="relative">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-brand-green">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
            Website Configuration
          </div>

          <h1 className="font-heading text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
            Contact &amp; Links
          </h1>

          <p className="mt-1.5 max-w-2xl text-sm leading-6 text-slate-500">
            Manage institute contact information, communication
            channels, social links and Google Maps settings.
          </p>
        </div>
      </section>

      <form onSubmit={handleSave} className="space-y-5 sm:space-y-6">
        {/* BASIC CONTACT */}
        <section className={sectionCls}>
          <div className={sectionHeaderCls}>
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-50 text-brand-green">
              <Mail className="h-4 w-4" />
            </div>

            <div>
              <h2 className="text-sm font-extrabold text-slate-800 sm:text-base">
                Basic Contact
              </h2>

              <p className="mt-0.5 text-xs text-slate-400">
                Main institute contact and location details
              </p>
            </div>
          </div>

          <div className="space-y-5 p-5 sm:p-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className={labelCls}>Email</label>

                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                  <input
                    name="instituteEmail"
                    type="email"
                    value={form.instituteEmail}
                    onChange={handleChange}
                    className={`${inputCls} pl-10`}
                  />
                </div>
              </div>

              <div>
                <label className={labelCls}>Phone</label>

                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                  <input
                    name="institutePhone"
                    value={form.institutePhone}
                    onChange={handleChange}
                    className={`${inputCls} pl-10`}
                  />
                </div>
              </div>
            </div>

            <div>
              <label className={labelCls}>Address</label>

              <div className="relative">
                <MapPin className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <input
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  className={`${inputCls} pl-10`}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <label className={labelCls}>City</label>

                <input
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  className={inputCls}
                />
              </div>

              <div>
                <label className={labelCls}>State</label>

                <input
                  name="state"
                  value={form.state}
                  onChange={handleChange}
                  className={inputCls}
                />
              </div>

              <div>
                <label className={labelCls}>Office Hours</label>

                <div className="relative">
                  <Clock3 className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                  <input
                    name="officeHours"
                    value={form.officeHours}
                    onChange={handleChange}
                    className={`${inputCls} pl-10`}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CHANNEL LINKS */}
        <section className={sectionCls}>
          <div className={sectionHeaderCls}>
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
              <Send className="h-4 w-4" />
            </div>

            <div>
              <h2 className="text-sm font-extrabold text-slate-800 sm:text-base">
                Channel &amp; Group Links
              </h2>

              <p className="mt-0.5 text-xs text-slate-400">
                Telegram, WhatsApp and direct communication
              </p>
            </div>
          </div>

          <div className="space-y-5 p-5 sm:p-6">
            <div>
              <div className="mb-1.5 flex items-center justify-between gap-3">
                <label className={`${labelCls} mb-0`}>
                  Telegram Channel Link
                </label>

                {testLink(form.telegramChannelLink, "sky")}
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
              <div className="mb-1.5 flex items-center justify-between gap-3">
                <label className={`${labelCls} mb-0`}>
                  WhatsApp Group Link
                </label>

                {testLink(form.whatsappGroupLink)}
              </div>

              <input
                name="whatsappGroupLink"
                value={form.whatsappGroupLink}
                onChange={handleChange}
                placeholder="https://chat.whatsapp.com/..."
                className={inputCls}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className={labelCls}>
                  WhatsApp Number
                </label>

                <div className="relative">
                  <MessageCircle className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                  <input
                    name="whatsappNumber"
                    value={form.whatsappNumber}
                    onChange={handleChange}
                    placeholder="919876543210"
                    className={`${inputCls} pl-10`}
                  />
                </div>

                <p className="mt-1.5 text-[11px] text-slate-400">
                  Use country code without + or spaces.
                </p>
              </div>

              <div>
                <label className={labelCls}>
                  WhatsApp Default Message
                </label>

                <input
                  name="whatsappDefaultMessage"
                  value={form.whatsappDefaultMessage}
                  onChange={handleChange}
                  placeholder="Hello NEETVIDYA..."
                  className={inputCls}
                />
              </div>
            </div>
          </div>
        </section>

        {/* SOCIAL LINKS */}
        <section className={sectionCls}>
          <div className={sectionHeaderCls}>
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
              <Globe className="h-4 w-4" />
            </div>

            <div>
              <h2 className="text-sm font-extrabold text-slate-800 sm:text-base">
                Social Media &amp; Map
              </h2>

              <p className="mt-0.5 text-xs text-slate-400">
                Public social profiles and Google Maps embed
              </p>
            </div>
          </div>

          <div className="space-y-5 p-5 sm:p-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <div className="mb-1.5 flex items-center justify-between gap-3">
                  <label className={`${labelCls} mb-0`}>
                    Facebook
                  </label>

                  {testLink(form.facebookLink, "sky")}
                </div>

                <input
                  name="facebookLink"
                  value={form.facebookLink}
                  onChange={handleChange}
                  placeholder="https://facebook.com/neetvidya"
                  className={inputCls}
                />
              </div>

              <div>
                <div className="mb-1.5 flex items-center justify-between gap-3">
                  <label className={`${labelCls} mb-0`}>
                    Instagram
                  </label>

                  {testLink(form.instagramLink, "sky")}
                </div>

                <input
                  name="instagramLink"
                  value={form.instagramLink}
                  onChange={handleChange}
                  placeholder="https://instagram.com/neetvidya"
                  className={inputCls}
                />
              </div>

              <div>
                <div className="mb-1.5 flex items-center justify-between gap-3">
                  <label className={`${labelCls} mb-0`}>
                    YouTube
                  </label>

                  {testLink(form.youtubeLink, "sky")}
                </div>

                <input
                  name="youtubeLink"
                  value={form.youtubeLink}
                  onChange={handleChange}
                  placeholder="https://youtube.com/@neetvidya"
                  className={inputCls}
                />
              </div>

              <div>
                <div className="mb-1.5 flex items-center justify-between gap-3">
                  <label className={`${labelCls} mb-0`}>
                    Google Map Embed URL
                  </label>

                  {testLink(form.mapEmbedUrl, "sky")}
                </div>

                <input
                  name="mapEmbedUrl"
                  value={form.mapEmbedUrl}
                  onChange={handleChange}
                  placeholder="https://www.google.com/maps/embed?pb=..."
                  className={inputCls}
                />
              </div>
            </div>

            <div className="rounded-2xl border border-green-100 bg-green-50/60 p-4">
              <div className="flex gap-3">
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-brand-green shadow-sm">
                  <MapPin className="h-4 w-4" />
                </div>

                <div>
                  <p className="text-xs font-bold text-slate-700">
                    Google Maps Embed
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Paste the complete Google Maps embed URL here.
                    This is used by the public contact page to
                    display the institute location.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ACTIONS */}
        <div className="flex flex-col gap-2.5 rounded-[1.5rem] border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-5">
          <div>
            <p className="text-sm font-bold text-slate-800">
              Save website settings
            </p>

            <p className="mt-0.5 text-xs text-slate-400">
              Changes will be applied to the public contact
              information.
            </p>
          </div>

          <div className="flex w-full flex-col gap-2.5 sm:w-auto sm:flex-row">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50"
            >
              <RotateCcw className="h-4 w-4" />
              Reset Defaults
            </button>

            <button
              type="submit"
              disabled={saving}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-brand-green px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-green-700 hover:shadow-lg hover:shadow-green-900/10 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Save className="h-4 w-4" />
              {saving ? "Saving..." : "Save All Settings"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}