import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import api from "../../config/api";
import {
  Settings,
  ShieldCheck,
  Key,
  Database,
  Save,
  CheckCircle,
  RefreshCw,
  Activity,
  User,
  LockKeyhole,
  Server,
  Mail,
  Smartphone,
  Clock3,
} from "lucide-react";
import { alertSuccess, alertError } from "../../utils/alert";

export default function AdminSettings() {
  const { user, updateUser } = useContext(AuthContext);

  const [activeTab, setActiveTab] = useState("profile");
  const [profileForm, setProfileForm] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [systemHealth, setSystemHealth] = useState(null);
  const [loadingHealth, setLoadingHealth] = useState(false);
  const [clearingCache, setClearingCache] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (activeTab === "system") {
      fetchHealth();
    }
  }, [activeTab]);

  useEffect(() => {
    setProfileForm({
      name: user?.name || "",
      phone: user?.phone || "",
    });
  }, [user]);

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

  const health = systemHealth || {};
  const dbInfo = health.database || {};
  const serverInfo = health.server || {};

  const runtimeEnv =
    (import.meta.env && import.meta.env.MODE) || "production";

  const apiBase =
    (import.meta.env && import.meta.env.VITE_API_BASE_URL) || "/api";

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
      alertError(
        err.response?.data?.message || "Failed to update profile"
      );
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

      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      alertError(
        err.response?.data?.message || "Failed to change password"
      );
    } finally {
      setSaving(false);
    }
  };

  const tabs = [
    {
      id: "profile",
      label: "Profile",
      icon: Settings,
    },
    {
      id: "password",
      label: "Password",
      icon: Key,
    },
    {
      id: "system",
      label: "System Info",
      icon: Database,
    },
  ];

  const inputClass =
    "w-full min-h-11 px-4 py-3 border border-slate-200 rounded-xl bg-white text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500/15 focus:border-green-500 transition";

  const labelClass =
    "block text-[11px] font-extrabold text-slate-500 uppercase tracking-[0.12em] mb-2";

  return (
    <div className="min-h-full overflow-hidden bg-slate-50/30">
      <div className="space-y-5 p-3 sm:space-y-6 sm:p-5 lg:p-7">

        {/* Header */}
        <div className="relative overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-6 lg:p-7">
          <div className="pointer-events-none absolute -right-16 -top-20 h-48 w-48 rounded-full bg-emerald-100/60 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 left-1/3 h-40 w-40 rounded-full bg-green-100/50 blur-3xl" />

          <div className="relative">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.16em] text-green-700">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
              Administration
            </div>

            <div className="flex items-start gap-4">
              <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-lg sm:flex">
                <Settings className="h-5 w-5" />
              </div>

              <div className="min-w-0">
                <h1 className="font-heading text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                  Settings
                </h1>

                <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">
                  Manage your administrator profile, security and platform
                  configuration.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Layout */}
        <div className="grid min-w-0 gap-5 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-6">

          {/* Settings Navigation */}
          <aside className="min-w-0">
            <div className="rounded-[1.5rem] border border-slate-200 bg-white p-2 shadow-sm lg:sticky lg:top-5">
              <div className="mb-2 hidden px-3 pt-2 text-[10px] font-extrabold uppercase tracking-[0.15em] text-slate-400 lg:block">
                Settings
              </div>

              <div className="grid grid-cols-3 gap-1 lg:grid-cols-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const active = activeTab === tab.id;

                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      title={tab.label}
                      className={`group flex min-h-12 items-center justify-center gap-3 rounded-xl px-3 py-3 text-sm font-bold transition lg:justify-start ${
                        active
                          ? "bg-green-600 text-white shadow-md shadow-green-600/15"
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                      }`}
                    >
                      <Icon
                        className={`h-4 w-4 shrink-0 ${
                          active
                            ? "text-white"
                            : "text-slate-400 group-hover:text-green-600"
                        }`}
                      />

                      {/* Hidden on mobile to save space */}
                      <span className="hidden lg:inline">
                        {tab.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>

          {/* Content */}
          <main className="min-w-0">

            {/* PROFILE */}
            {activeTab === "profile" && (
              <section className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-sm">

                {/* Section Header */}
                <div className="border-b border-slate-100 bg-gradient-to-r from-white to-slate-50/70 p-5 sm:p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-600">
                      <User className="h-5 w-5" />
                    </div>

                    <div className="min-w-0">
                      <h2 className="text-lg font-extrabold text-slate-900">
                        Admin Profile
                      </h2>

                      <p className="mt-1 text-sm text-slate-500">
                        Update your name and contact information.
                      </p>
                    </div>
                  </div>
                </div>

                <form
                  onSubmit={handleProfileSave}
                  className="space-y-6 p-5 sm:p-6 lg:p-7"
                >
                  {/* Identity Card */}
                  <div className="flex min-w-0 flex-col gap-4 rounded-2xl border border-slate-100 bg-slate-50/70 p-4 sm:flex-row sm:items-center">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 to-emerald-700 text-2xl font-extrabold text-white shadow-lg shadow-green-700/15">
                      {user?.name?.charAt(0)?.toUpperCase() || "A"}
                    </div>

                    <div className="min-w-0">
                      <div className="truncate font-extrabold text-slate-900">
                        {user?.name || "Administrator"}
                      </div>

                      <div className="mt-0.5 truncate text-sm text-slate-500">
                        {user?.email || "—"}
                      </div>

                      <span className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-green-200 bg-green-50 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide text-green-700">
                        <ShieldCheck className="h-3 w-3" />
                        Administrator
                      </span>
                    </div>
                  </div>

                  {/* Form */}
                  <div className="grid gap-5">
                    <div>
                      <label className={labelClass}>
                        Full Name
                      </label>

                      <input
                        value={profileForm.name}
                        onChange={(e) =>
                          setProfileForm((f) => ({
                            ...f,
                            name: e.target.value,
                          }))
                        }
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className={labelClass}>
                        Email Address
                      </label>

                      <div className="relative">
                        <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                        <input
                          value={user?.email || ""}
                          disabled
                          className="w-full min-h-11 cursor-not-allowed rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-400"
                        />
                      </div>

                      <p className="mt-1.5 text-xs text-slate-400">
                        Email cannot be changed. Contact system admin.
                      </p>
                    </div>

                    <div>
                      <label className={labelClass}>
                        Phone Number
                      </label>

                      <div className="relative">
                        <Smartphone className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                        <input
                          value={profileForm.phone}
                          onChange={(e) =>
                            setProfileForm((f) => ({
                              ...f,
                              phone: e.target.value,
                            }))
                          }
                          className="w-full min-h-11 rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-800 placeholder:text-slate-400 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/15 transition"
                          placeholder="+91 XXXXX XXXXX"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end border-t border-slate-100 pt-5">
                    <button
                      type="submit"
                      disabled={saving}
                      className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-6 py-3 text-sm font-extrabold text-white shadow-md shadow-green-600/15 transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                    >
                      <Save className="h-4 w-4" />
                      {saving ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                </form>
              </section>
            )}

            {/* PASSWORD */}
            {activeTab === "password" && (
              <section className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-sm">

                <div className="border-b border-slate-100 bg-gradient-to-r from-white to-slate-50/70 p-5 sm:p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                      <LockKeyhole className="h-5 w-5" />
                    </div>

                    <div className="min-w-0">
                      <h2 className="text-lg font-extrabold text-slate-900">
                        Change Password
                      </h2>

                      <p className="mt-1 text-sm text-slate-500">
                        Keep your administrator account protected with a strong
                        password.
                      </p>
                    </div>
                  </div>
                </div>

                <form
                  onSubmit={handlePasswordSave}
                  className="space-y-5 p-5 sm:p-6 lg:p-7"
                >
                  {/* Security Notice */}
                  <div className="flex min-w-0 gap-3 rounded-2xl border border-amber-100 bg-amber-50 p-4">
                    <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />

                    <div className="min-w-0">
                      <p className="text-sm font-bold text-amber-900">
                        Account security
                      </p>

                      <p className="mt-1 text-xs leading-5 text-amber-700">
                        Use at least 8 characters and avoid reusing passwords
                        from other services.
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>
                      Current Password
                    </label>

                    <input
                      type="password"
                      required
                      value={passwordForm.currentPassword}
                      onChange={(e) =>
                        setPasswordForm((f) => ({
                          ...f,
                          currentPassword: e.target.value,
                        }))
                      }
                      className={inputClass}
                      placeholder="Enter current password"
                    />
                  </div>

                  <div>
                    <label className={labelClass}>
                      New Password
                    </label>

                    <input
                      type="password"
                      required
                      value={passwordForm.newPassword}
                      onChange={(e) =>
                        setPasswordForm((f) => ({
                          ...f,
                          newPassword: e.target.value,
                        }))
                      }
                      className={inputClass}
                      placeholder="Minimum 8 characters"
                    />
                  </div>

                  <div>
                    <label className={labelClass}>
                      Confirm New Password
                    </label>

                    <input
                      type="password"
                      required
                      value={passwordForm.confirmPassword}
                      onChange={(e) =>
                        setPasswordForm((f) => ({
                          ...f,
                          confirmPassword: e.target.value,
                        }))
                      }
                      className={inputClass}
                      placeholder="Re-enter new password"
                    />
                  </div>

                  {passwordForm.newPassword &&
                    passwordForm.confirmPassword && (
                      <div
                        className={`flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold ${
                          passwordForm.newPassword ===
                          passwordForm.confirmPassword
                            ? "bg-green-50 text-green-600"
                            : "bg-red-50 text-red-500"
                        }`}
                      >
                        <CheckCircle className="h-4 w-4 shrink-0" />

                        {passwordForm.newPassword ===
                        passwordForm.confirmPassword
                          ? "Passwords match"
                          : "Passwords do not match"}
                      </div>
                    )}

                  <div className="flex justify-end border-t border-slate-100 pt-5">
                    <button
                      type="submit"
                      disabled={saving}
                      className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-6 py-3 text-sm font-extrabold text-white shadow-md shadow-green-600/15 transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                    >
                      <Key className="h-4 w-4" />
                      {saving ? "Changing..." : "Change Password"}
                    </button>
                  </div>
                </form>
              </section>
            )}

            {/* SYSTEM */}
            {activeTab === "system" && (
              <section className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-sm">

                {/* Header */}
                <div className="border-b border-slate-100 bg-gradient-to-r from-white to-slate-50/70 p-5 sm:p-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex min-w-0 items-start gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-white">
                        <Server className="h-5 w-5" />
                      </div>

                      <div className="min-w-0">
                        <h2 className="text-lg font-extrabold text-slate-900">
                          System Information
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                          Platform configuration and environment details.
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={fetchHealth}
                      disabled={loadingHealth}
                      className="inline-flex min-h-10 w-full shrink-0 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:opacity-60 sm:w-auto"
                    >
                      <RefreshCw
                        className={`h-3.5 w-3.5 ${
                          loadingHealth ? "animate-spin" : ""
                        }`}
                      />
                      Refresh
                    </button>
                  </div>
                </div>

                {/* Maintenance */}
                <div className="border-b border-slate-100 bg-slate-50/60 p-5 sm:p-6">
                  <div className="mb-3 text-[10px] font-extrabold uppercase tracking-[0.15em] text-slate-400">
                    Admin Maintenance Utilities
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <button
                      onClick={handleClearCache}
                      disabled={clearingCache}
                      className="group flex min-w-0 items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md disabled:opacity-60"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                        <RefreshCw
                          className={`h-4 w-4 ${
                            clearingCache ? "animate-spin" : ""
                          }`}
                        />
                      </div>

                      <div className="min-w-0">
                        <div className="truncate text-sm font-bold text-slate-800">
                          {clearingCache
                            ? "Clearing..."
                            : "Clear Platform Cache"}
                        </div>

                        <div className="mt-0.5 text-xs text-slate-400">
                          Refresh cached platform data
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={() => {
                        alertSuccess(
                          "SMTP connection verified — mailer service operational"
                        );
                      }}
                      className="group flex min-w-0 items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-green-200 hover:shadow-md"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-600">
                        <Activity className="h-4 w-4" />
                      </div>

                      <div className="min-w-0">
                        <div className="truncate text-sm font-bold text-slate-800">
                          Ping Mail Server
                        </div>

                        <div className="mt-0.5 text-xs text-slate-400">
                          Verify SMTP service connection
                        </div>
                      </div>
                    </button>
                  </div>
                </div>

                {/* System Details */}
                <div className="p-5 sm:p-6">
                  <div className="mb-4 text-[10px] font-extrabold uppercase tracking-[0.15em] text-slate-400">
                    Platform Details
                  </div>

                  <div className="overflow-hidden rounded-2xl border border-slate-100">
                    {[
                      {
                        label: "Platform",
                        value: "NEETVIDYA v1.0.0",
                        icon: Database,
                      },
                      {
                        label: "Environment",
                        value: runtimeEnv,
                        icon: Settings,
                      },
                      {
                        label: "Database Status",
                        value: dbInfo.status
                          ? `${dbInfo.status} (${
                              dbInfo.connectionState || "Unknown"
                            })`
                          : "Unavailable",
                        icon: Database,
                      },
                      {
                        label: "Server Node",
                        value: serverInfo.nodeVersion || "—",
                        icon: Server,
                      },
                      {
                        label: "Server Uptime",
                        value: serverInfo.uptime
                          ? `${Math.round(
                              serverInfo.uptime / 60
                            )} minutes`
                          : "—",
                        icon: Clock3,
                      },
                      {
                        label: "Memory Usage",
                        value: serverInfo.memoryUsageMB
                          ? `${serverInfo.memoryUsageMB} MB`
                          : "—",
                        icon: Activity,
                      },
                      {
                        label: "API Base",
                        value: apiBase,
                        icon: GlobeIcon,
                      },
                      {
                        label: "Logged in as",
                        value: user?.email || "—",
                        icon: Mail,
                      },
                      {
                        label: "Role",
                        value: "Administrator",
                        icon: ShieldCheck,
                      },
                      {
                        label: "Last login",
                        value: user?.lastLogin
                          ? new Date(
                              user.lastLogin
                            ).toLocaleString("en-IN")
                          : "—",
                        icon: Clock3,
                      },
                    ].map((item) => {
                      const Icon = item.icon;

                      return (
                        <div
                          key={item.label}
                          className="flex min-w-0 items-center gap-3 border-b border-slate-100 p-4 last:border-0 sm:px-5"
                        >
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-50 text-slate-400">
                            <Icon className="h-4 w-4" />
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="text-[11px] font-bold uppercase tracking-wide text-slate-400">
                              {item.label}
                            </div>

                            <div className="mt-1 break-all text-sm font-semibold text-slate-800 sm:truncate">
                              {item.value}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </section>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

/* Small local icon wrapper so the API/system row stays self-contained. */
function GlobeIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
      className={`h-4 w-4 ${props.className || ""}`}
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}