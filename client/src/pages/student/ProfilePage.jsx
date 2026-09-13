import { useState, useEffect, useContext } from "react";
import api from "../../config/api";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";
import { Camera, Key, Save, BadgeCheck, CheckCircle, Eye, EyeOff } from "lucide-react";

export default function ProfilePage() {
  const { user, updateUser } = useContext(AuthContext);
  const [student, setStudent] = useState(null);
  const [avatarBase64, setAvatarBase64] = useState("");
  const [activeTab, setActiveTab] = useState("profile");
  const [profileForm, setProfileForm] = useState({ name: user?.name || "", phone: user?.phone || "" });
  const [passwordForm, setPasswordForm] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [showPass, setShowPass] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api.get("/students/my").then(({ data }) => {
      setStudent(data.data.student);
      if (data.data.student?.avatarBase64) setAvatarBase64(data.data.student.avatarBase64);
    }).catch(() => {});
  }, []);

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 300 * 1024) { toast.error("Image must be under 300KB"); return; }
    const reader = new FileReader();
    reader.onload = async (ev) => {
      const b64 = ev.target.result;
      setAvatarBase64(b64);
      try {
        await api.put("/students/my/avatar", { avatarBase64: b64 });
        toast.success("Profile photo updated!");
      } catch { toast.error("Failed to save photo"); }
    };
    reader.readAsDataURL(file);
  };

  const handleProfileSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const { data } = await api.put("/auth/profile", profileForm);
      updateUser(data.data.user);
      toast.success("Profile updated!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    } finally { setSaving(false); }
  };

  const handlePasswordSave = async (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) { toast.error("Passwords don't match"); return; }
    if (passwordForm.newPassword.length < 8) { toast.error("Password must be at least 8 characters"); return; }
    setSaving(true);
    try {
      await api.put("/auth/change-password", {
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      });
      toast.success("Password changed successfully!");
      setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to change password");
    } finally { setSaving(false); }
  };

  const tabs = [
    { id: "profile", label: "My Profile" },
    { id: "password", label: "Change Password" },
  ];

  return (
    <div className="p-6 space-y-6 max-w-3xl">
      <div>
        <h1 className="font-extrabold text-2xl text-slate-900">Student Profile</h1>
        <p className="text-slate-500 text-sm mt-1">Manage your personal details and account security</p>
      </div>

      {/* ID Card */}
      <div className="bg-gradient-to-br from-[#0f172a] to-[#1a2e1a] rounded-2xl p-6 text-white shadow-xl flex flex-col sm:flex-row items-center gap-6">
        <div className="relative flex-shrink-0">
          <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-white/20 shadow-lg bg-white/10 flex items-center justify-center text-white font-extrabold text-3xl">
            {avatarBase64 ? (
              <img src={avatarBase64} alt="avatar" className="w-full h-full object-cover" />
            ) : (
              user?.name?.[0]?.toUpperCase() || "S"
            )}
          </div>
          <label className="absolute -bottom-1 -right-1 p-1.5 bg-green-500 hover:bg-green-400 text-white rounded-full cursor-pointer shadow transition">
            <Camera className="w-3.5 h-3.5" />
            <input type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} />
          </label>
        </div>
        <div className="text-center sm:text-left flex-1">
          <div className="font-extrabold text-xl">{user?.name}</div>
          <div className="text-white/60 text-sm">{user?.email}</div>
          <div className="flex flex-wrap gap-2 mt-3 justify-center sm:justify-start">
            {student?.studentId && (
              <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-white/10 border border-white/20">
                🪪 {student.studentId}
              </span>
            )}
            {student?.currentClass && (
              <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-green-500/30 border border-green-400/30">
                📚 {student.currentClass}
              </span>
            )}
            {student?.studentType && (
              <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-white/10 border border-white/20">
                {student.studentType.replace(/_/g, " ")}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-slate-100 rounded-xl w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-2 rounded-lg text-sm font-semibold transition ${
              activeTab === tab.id ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "profile" && (
        <div className="bg-white border border-slate-100 rounded-2xl shadow-sm">
          <div className="p-6 border-b border-slate-100">
            <h2 className="font-bold text-slate-900">Personal Information</h2>
            <p className="text-sm text-slate-500">Update your name and contact details</p>
          </div>
          <form onSubmit={handleProfileSave} className="p-6 space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Full Name</label>
                <input
                  value={profileForm.name}
                  onChange={(e) => setProfileForm((f) => ({ ...f, name: e.target.value }))}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Phone Number</label>
                <input
                  value={profileForm.phone}
                  onChange={(e) => setProfileForm((f) => ({ ...f, phone: e.target.value }))}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition"
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Email Address</label>
              <input
                value={user?.email}
                disabled
                className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm bg-slate-50 text-slate-400 cursor-not-allowed"
              />
              <p className="text-xs text-slate-400 mt-1">Contact admin to change email address</p>
            </div>

            {/* Read-only student info */}
            {student && (
              <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                {[
                  { label: "Student ID", value: student.studentId },
                  { label: "Class", value: student.currentClass },
                  { label: "Guardian Name", value: student.parentName },
                  { label: "Guardian Phone", value: student.parentPhone },
                  { label: "School / College", value: student.school },
                  { label: "City", value: student.city },
                ].map((field) => field.value && (
                  <div key={field.label}>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{field.label}</label>
                    <p className="text-sm font-semibold text-slate-700">{field.value}</p>
                  </div>
                ))}
              </div>
            )}

            <button type="submit" disabled={saving}
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white font-bold px-6 py-2.5 rounded-xl transition shadow-sm">
              <Save className="w-4 h-4" />
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </form>
        </div>
      )}

      {activeTab === "password" && (
        <div className="bg-white border border-slate-100 rounded-2xl shadow-sm">
          <div className="p-6 border-b border-slate-100">
            <h2 className="font-bold text-slate-900">Change Password</h2>
            <p className="text-sm text-slate-500">Use a strong password with at least 8 characters</p>
          </div>
          <form onSubmit={handlePasswordSave} className="p-6 space-y-5">
            {["currentPassword", "newPassword", "confirmPassword"].map((field) => (
              <div key={field}>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                  {field === "currentPassword" ? "Current Password" : field === "newPassword" ? "New Password" : "Confirm New Password"}
                </label>
                <div className="relative">
                  <input
                    type={showPass ? "text" : "password"}
                    required
                    value={passwordForm[field]}
                    onChange={(e) => setPasswordForm((f) => ({ ...f, [field]: e.target.value }))}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition pr-12"
                    placeholder="••••••••"
                  />
                  {field === "newPassword" && (
                    <button type="button" onClick={() => setShowPass((v) => !v)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700">
                      {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  )}
                </div>
              </div>
            ))}
            {passwordForm.newPassword && passwordForm.confirmPassword && (
              <div className={`flex items-center gap-2 text-sm ${passwordForm.newPassword === passwordForm.confirmPassword ? "text-green-600" : "text-red-500"}`}>
                <CheckCircle className="w-4 h-4" />
                {passwordForm.newPassword === passwordForm.confirmPassword ? "Passwords match" : "Passwords don't match"}
              </div>
            )}
            <button type="submit" disabled={saving}
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white font-bold px-6 py-2.5 rounded-xl transition shadow-sm">
              <Key className="w-4 h-4" />
              {saving ? "Changing..." : "Change Password"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
