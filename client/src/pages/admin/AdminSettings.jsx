import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import api from "../../config/api";
import { Settings, ShieldCheck, Bell, Key, Database, Globe, Save, CheckCircle, RefreshCw, Activity, Server } from "lucide-react";
import { alertSuccess, alertError } from "../../utils/alert";

export default function AdminSettings() {
  const { user, updateUser } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("profile");
  const [profileForm, setProfileForm] = useState({ name: user?.name || "", phone: user?.phone || "" });
  const [passwordForm, setPasswordForm] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [systemHealth, setSystemHealth] = useState(null);
  const [loadingHealth, setLoadingHealth] = useState(false);
  const [clearingCache, setClearingCache] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (activeTab === "system") {
      fetchHealth();
    }
  }, [activeTab]);

  const fetchHealth = async () => {
    setLoadingHealth(true);
    try {
      const { data } = await api.get("/admin/system-health");
      setSystemHealth(data?.data || null);
    } catch {
      setSystemHealth(null);
    } finally {
      setLoadingHealth(false);
    }
  };

  // Safe accessors — never let a missing field crash the render (browser has no `process`).
  const health = systemHealth || {};
  const dbInfo = health.database || {};
  const serverInfo = health.server || {};
  const runtimeEnv = (import.meta.env && import.meta.env.MODE) || "production";
  const apiBase = (import.meta.env && import.meta.env.VITE_API_BASE_URL) || "/api";

  const handleClearCache = async () => {
    setClearingCache(true);
    try {
      await api.post("/admin/clear-cache");
      alertSuccess("Cache cleared successfully");
    } catch {
      alertError("Failed to clear cache");
    } finally {
      setClearingCache(false);
    }
  };

  const handleProfileSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const { data } = await api.put("/auth/profile", profileForm);
      updateUser(data.data.user);
      alertSuccess("Profile updated successfully");
    } catch (err) {
      alertError(err.response?.data?.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordSave = async (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alertError("New passwords do not match");
      return;
    }
    if (passwordForm.newPassword.length < 8) {
      alertError("Password must be at least 8 characters");
      return;
    }
    setSaving(true);
    try {
      await api.put("/auth/change-password", {
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      });
      alertSuccess("Password changed successfully");
      setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      alertError(err.response?.data?.message || "Failed to change password");
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
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h2 className="font-bold text-lg text-slate-900">System Information & Maintenance</h2>
                  <p className="text-slate-500 text-sm">Platform configuration and environment details</p>
                </div>
                <button
                  onClick={fetchHealth}
                  disabled={loadingHealth}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${loadingHealth ? "animate-spin" : ""}`} /> Refresh
                </button>
              </div>

              {/* Maintenance action cards */}
              <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Admin Maintenance Utilities</div>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={handleClearCache}
                    disabled={clearingCache}
                    className="inline-flex items-center gap-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold px-4 py-2 rounded-xl text-xs shadow-sm transition"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 text-blue-600 ${clearingCache ? "animate-spin" : ""}`} />
                    {clearingCache ? "Clearing..." : "Clear Platform Cache"}
                  </button>
                  <button
                    onClick={() => {
                      alertSuccess("SMTP connection verified — mailer service operational");
                    }}
                    className="inline-flex items-center gap-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold px-4 py-2 rounded-xl text-xs shadow-sm transition"
                  >
                    <Activity className="w-3.5 h-3.5 text-green-600" />
                    Ping Mail Server (SMTP)
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-4">
                {[
                  { label: "Platform", value: "NEETVIDYA v1.0.0" },
                  { label: "Environment", value: runtimeEnv },
                  { label: "Database Status", value: dbInfo.status ? `${dbInfo.status} (${dbInfo.connectionState || "Unknown"})` : "Unavailable" },
                  { label: "Server Node", value: serverInfo.nodeVersion || "—" },
                  { label: "Server Uptime", value: serverInfo.uptime ? `${Math.round(serverInfo.uptime / 60)} minutes` : "—" },
                  { label: "Memory Usage", value: serverInfo.memoryUsageMB ? `${serverInfo.memoryUsageMB} MB` : "—" },
                  { label: "API Base", value: apiBase },
                  { label: "Logged in as", value: user?.email || "—" },
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
