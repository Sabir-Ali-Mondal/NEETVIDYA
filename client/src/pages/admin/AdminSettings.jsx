import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import api from "../../config/api";
import { Settings, ShieldCheck, Bell, Key, Database, Globe, Save, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";

export default function AdminSettings() {
  const { user, updateUser } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("profile");
  const [profileForm, setProfileForm] = useState({ name: user?.name || "", phone: user?.phone || "" });
  const [passwordForm, setPasswordForm] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [saving, setSaving] = useState(false);

  const handleProfileSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const { data } = await api.put("/auth/profile", profileForm);
      updateUser(data.data.user);
      toast.success("Profile updated successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordSave = async (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }
    if (passwordForm.newPassword.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }
    setSaving(true);
    try {
      await api.put("/auth/change-password", {
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      });
      toast.success("Password changed successfully");
      setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to change password");
    } finally {
      setSaving(false);
    }
  };

  const tabs = [
    { id: "profile", label: "Profile", icon: Settings },
    { id: "password", label: "Password", icon: Key },
    { id: "system", label: "System Info", icon: Database },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="font-extrabold text-2xl text-slate-900">Settings</h1>
        <p className="text-slate-500 text-sm mt-1">Manage your admin profile and system settings</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div className="lg:w-56 flex-shrink-0">
          <div className="bg-white border border-slate-100 rounded-2xl shadow-sm p-3 space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition ${
                  activeTab === tab.id
                    ? "bg-green-600 text-white shadow-sm"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          {activeTab === "profile" && (
            <div className="bg-white border border-slate-100 rounded-2xl shadow-sm">
              <div className="p-6 border-b border-slate-100">
                <h2 className="font-bold text-lg text-slate-900">Admin Profile</h2>
                <p className="text-slate-500 text-sm">Update your name and contact information</p>
              </div>
              <form onSubmit={handleProfileSave} className="p-6 space-y-5">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-white font-extrabold text-2xl shadow-lg">
                    {user?.name?.charAt(0)?.toUpperCase() || "A"}
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">{user?.name}</div>
                    <div className="text-sm text-slate-500">{user?.email}</div>
                    <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-0.5 rounded-full bg-green-100 text-green-700 mt-1">
                      <ShieldCheck className="w-3 h-3" /> Administrator
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-2">Full Name</label>
                  <input
                    value={profileForm.name}
                    onChange={(e) => setProfileForm((f) => ({ ...f, name: e.target.value }))}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-2">Email Address</label>
                  <input
                    value={user?.email}
                    disabled
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm bg-slate-50 text-slate-400 cursor-not-allowed"
                  />
                  <p className="text-xs text-slate-400 mt-1">Email cannot be changed. Contact system admin.</p>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-2">Phone Number</label>
                  <input
                    value={profileForm.phone}
                    onChange={(e) => setProfileForm((f) => ({ ...f, phone: e.target.value }))}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
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
                <h2 className="font-bold text-lg text-slate-900">Change Password</h2>
                <p className="text-slate-500 text-sm">Use a strong password with at least 8 characters</p>
              </div>
              <form onSubmit={handlePasswordSave} className="p-6 space-y-5">
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-2">Current Password</label>
                  <input
                    type="password"
                    required
                    value={passwordForm.currentPassword}
                    onChange={(e) => setPasswordForm((f) => ({ ...f, currentPassword: e.target.value }))}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition"
                    placeholder="Enter current password"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-2">New Password</label>
                  <input
                    type="password"
                    required
                    value={passwordForm.newPassword}
                    onChange={(e) => setPasswordForm((f) => ({ ...f, newPassword: e.target.value }))}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition"
                    placeholder="Minimum 8 characters"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-2">Confirm New Password</label>
                  <input
                    type="password"
                    required
                    value={passwordForm.confirmPassword}
                    onChange={(e) => setPasswordForm((f) => ({ ...f, confirmPassword: e.target.value }))}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition"
                    placeholder="Re-enter new password"
                  />
                </div>
                {passwordForm.newPassword && passwordForm.confirmPassword && (
                  <div className={`flex items-center gap-2 text-sm ${passwordForm.newPassword === passwordForm.confirmPassword ? "text-green-600" : "text-red-500"}`}>
                    <CheckCircle className="w-4 h-4" />
                    {passwordForm.newPassword === passwordForm.confirmPassword ? "Passwords match" : "Passwords do not match"}
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

          {activeTab === "system" && (
            <div className="bg-white border border-slate-100 rounded-2xl shadow-sm">
              <div className="p-6 border-b border-slate-100">
                <h2 className="font-bold text-lg text-slate-900">System Information</h2>
                <p className="text-slate-500 text-sm">Platform configuration and environment details</p>
              </div>
              <div className="p-6 space-y-4">
                {[
                  { label: "Platform", value: "NEETVIDYA v1.0.0" },
                  { label: "Environment", value: import.meta.env.MODE || "development" },
                  { label: "API Base", value: import.meta.env.VITE_API_URL || "http://localhost:5000/api" },
                  { label: "Logged in as", value: user?.email },
                  { label: "Role", value: "Administrator" },
                  { label: "Last login", value: user?.lastLogin ? new Date(user.lastLogin).toLocaleString("en-IN") : "—" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between py-3 border-b border-slate-50 last:border-0">
                    <span className="text-sm text-slate-500 font-medium">{item.label}</span>
                    <span className="text-sm font-semibold text-slate-800 font-mono">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
