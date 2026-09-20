import { useState, useEffect, useContext } from "react";
import api from "../../config/api";
import { AuthContext } from "../../context/AuthContext";
import { alertSuccess, alertError } from "../../utils/alert";
import {
  Camera,
  KeyRound,
  Save,
  BadgeCheck,
  CheckCircle2,
  Eye,
  EyeOff,
  UserRound,
  Mail,
  Phone,
  GraduationCap,
  MapPin,
  ShieldCheck,
  IdCard,
  UsersRound,
  Building2,
  LockKeyhole,
  ChevronRight,
} from "lucide-react";

export default function ProfilePage() {
  const { user, updateUser } = useContext(AuthContext);

  const [student, setStudent] = useState(null);
  const [avatarBase64, setAvatarBase64] = useState("");
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

  const [showPass, setShowPass] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api
      .get("/students/my")
      .then(({ data }) => {
        setStudent(data.data.student);

        if (data.data.student?.avatarBase64) {
          setAvatarBase64(data.data.student.avatarBase64);
        }
      })
      .catch(() => {});
  }, []);

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (file.size > 300 * 1024) {
      alertError("Image must be under 300KB");
      return;
    }

    const reader = new FileReader();

    reader.onload = async (ev) => {
      const b64 = ev.target.result;
      setAvatarBase64(b64);

      try {
        await api.put("/students/my/avatar", {
          avatarBase64: b64,
        });

        alertSuccess("Profile photo updated!");
      } catch {
        alertError("Failed to save photo");
      }
    };

    reader.readAsDataURL(file);
  };

  const handleProfileSave = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const { data } = await api.put("/auth/profile", profileForm);

      updateUser(data.data.user);
      alertSuccess("Profile updated!");
    } catch (err) {
      alertError(err.response?.data?.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordSave = async (e) => {
    e.preventDefault();

    if (
      passwordForm.newPassword !== passwordForm.confirmPassword
    ) {
      alertError("Passwords don't match");
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

      alertSuccess("Password changed successfully!");

      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      alertError(
        err.response?.data?.message ||
          "Failed to change password"
      );
    } finally {
      setSaving(false);
    }
  };

  const tabs = [
    {
      id: "profile",
      label: "Profile",
      description: "Personal information",
      icon: UserRound,
    },
    {
      id: "password",
      label: "Security",
      description: "Password & account security",
      icon: ShieldCheck,
    },
  ];

  const studentInfo = [
    {
      label: "Student ID",
      value: student?.studentId,
      icon: IdCard,
    },
    {
      label: "Current Class",
      value: student?.currentClass,
      icon: GraduationCap,
    },
    {
      label: "Guardian",
      value: student?.parentName,
      icon: UsersRound,
    },
    {
      label: "Guardian Phone",
      value: student?.parentPhone,
      icon: Phone,
    },
    {
      label: "School / College",
      value: student?.school,
      icon: Building2,
    },
    {
      label: "City",
      value: student?.city,
      icon: MapPin,
    },
  ];

  return (
    <div className="relative min-h-full overflow-hidden bg-brand-soft">
      {/* Background atmosphere */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-emerald-200/25 blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-lime-200/20 blur-[100px]" />
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-64 w-64 -translate-x-1/2 rounded-full bg-white/70 blur-[100px]" />

      <div className="relative mx-auto w-full max-w-[1200px] space-y-5 p-3 sm:space-y-6 sm:p-5 lg:p-7">
        {/* Page heading */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-200/70 bg-white/70 px-3 py-1.5 text-[9px] font-extrabold uppercase tracking-[0.18em] text-brand-green shadow-sm backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
              Account Center
            </div>

            <h1 className="font-heading text-2xl font-extrabold tracking-[-0.03em] text-brand-dark sm:text-3xl lg:text-4xl">
              Your Profile
            </h1>

            <p className="mt-1.5 max-w-xl text-xs leading-5 text-slate-500 sm:text-sm">
              Manage your personal information and keep your
              NEETVIDYA account secure.
            </p>
          </div>

          <div className="hidden items-center gap-2 rounded-2xl border border-white/80 bg-white/70 px-4 py-3 shadow-sm backdrop-blur sm:flex">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-50 text-brand-green">
              <ShieldCheck className="h-4 w-4" />
            </div>

            <div>
              <p className="text-[9px] font-extrabold uppercase tracking-wider text-slate-400">
                Account
              </p>
              <p className="text-xs font-bold text-slate-700">
                Secure & Protected
              </p>
            </div>
          </div>
        </div>

        {/* Premium profile hero */}
        <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-brand-black shadow-2xl shadow-slate-900/15">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(24,166,106,0.18),transparent_35%),radial-gradient(circle_at_20%_100%,rgba(168,201,0,0.10),transparent_30%)]" />

          <div className="pointer-events-none absolute -right-24 -top-32 h-80 w-80 rounded-full bg-brand-green/15 blur-[80px]" />
          <div className="pointer-events-none absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-brand-lime/10 blur-[90px]" />

          <div className="relative p-5 sm:p-7 lg:p-9">
            <div className="flex flex-col gap-7 sm:flex-row sm:items-center">
              {/* Avatar */}
              <div className="relative mx-auto shrink-0 sm:mx-0">
                <div className="h-28 w-28 overflow-hidden rounded-[2rem] border border-white/15 bg-white/[0.08] p-1 shadow-2xl sm:h-32 sm:w-32">
                  <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-[1.65rem] bg-white/10 text-4xl font-extrabold text-white">
                    {avatarBase64 ? (
                      <img
                        src={avatarBase64}
                        alt="avatar"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      user?.name?.[0]?.toUpperCase() || "S"
                    )}
                  </div>
                </div>

                <label className="absolute -bottom-2 -right-2 flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border-[3px] border-brand-black bg-brand-green text-white shadow-lg transition hover:scale-105 hover:bg-emerald-500">
                  <Camera className="h-4 w-4" />

                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarUpload}
                  />
                </label>
              </div>

              {/* Identity */}
              <div className="min-w-0 flex-1 text-center sm:text-left">
                <div className="flex flex-col items-center gap-2 sm:flex-row">
                  <h2 className="max-w-full truncate font-heading text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                    {user?.name || "Student"}
                  </h2>

                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-wider text-emerald-300">
                    <BadgeCheck className="h-3 w-3" />
                    Verified Student
                  </span>
                </div>

                <div className="mt-2 flex min-w-0 items-center justify-center gap-2 text-sm text-slate-400 sm:justify-start">
                  <Mail className="h-3.5 w-3.5 shrink-0" />
                  <span className="max-w-full truncate">
                    {user?.email}
                  </span>
                </div>

                <div className="mt-5 flex flex-wrap justify-center gap-2 sm:justify-start">
                  {student?.studentId && (
                    <span className="inline-flex max-w-full items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.06] px-3 py-2 text-[10px] font-bold text-slate-300">
                      <IdCard className="h-3.5 w-3.5 shrink-0 text-slate-500" />
                      <span className="truncate">
                        {student.studentId}
                      </span>
                    </span>
                  )}

                  {student?.currentClass && (
                    <span className="inline-flex max-w-full items-center gap-1.5 rounded-xl border border-brand-lime/20 bg-brand-lime/10 px-3 py-2 text-[10px] font-bold text-brand-lime">
                      <GraduationCap className="h-3.5 w-3.5 shrink-0" />
                      <span className="truncate">
                        {student.currentClass}
                      </span>
                    </span>
                  )}

                  {student?.studentType && (
                    <span className="inline-flex max-w-full rounded-xl border border-white/10 bg-white/[0.06] px-3 py-2 text-[10px] font-bold text-slate-300">
                      <span className="truncate">
                        {student.studentType.replace(/_/g, " ")}
                      </span>
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Navigation */}
        <div className="grid grid-cols-2 gap-2 rounded-[1.5rem] border border-white/80 bg-white/70 p-2 shadow-sm backdrop-blur">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`group relative flex min-w-0 items-center gap-3 rounded-2xl px-3 py-3 text-left transition sm:px-4 ${
                  active
                    ? "bg-brand-black text-white shadow-lg shadow-slate-900/10"
                    : "text-slate-500 hover:bg-white hover:text-slate-800"
                }`}
              >
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition ${
                    active
                      ? "bg-brand-green text-white"
                      : "bg-slate-100 text-slate-400 group-hover:bg-emerald-50 group-hover:text-brand-green"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                </div>

                <div className="min-w-0">
                  <p
                    className={`truncate text-xs font-extrabold sm:text-sm ${
                      active ? "text-white" : "text-slate-700"
                    }`}
                  >
                    {tab.label}
                  </p>

                  <p
                    className={`hidden truncate text-[9px] sm:block ${
                      active ? "text-slate-400" : "text-slate-400"
                    }`}
                  >
                    {tab.description}
                  </p>
                </div>

                <ChevronRight
                  className={`ml-auto hidden h-4 w-4 shrink-0 sm:block ${
                    active ? "text-brand-lime" : "text-slate-300"
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Profile tab */}
        {activeTab === "profile" && (
          <section className="overflow-hidden rounded-[2rem] border border-slate-200/70 bg-white shadow-xl shadow-slate-900/[0.04]">
            <div className="relative overflow-hidden border-b border-slate-100 px-5 py-6 sm:px-7">
              <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-emerald-50 blur-3xl" />

              <div className="relative flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-brand-green">
                  <UserRound className="h-5 w-5" />
                </div>

                <div>
                  <h2 className="font-heading text-base font-extrabold text-brand-dark sm:text-lg">
                    Personal Information
                  </h2>

                  <p className="mt-0.5 text-xs text-slate-400 sm:text-sm">
                    Update the information associated with your
                    account.
                  </p>
                </div>
              </div>
            </div>

            <form
              onSubmit={handleProfileSave}
              className="space-y-7 p-5 sm:p-7 lg:p-8"
            >
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {/* Name */}
                <div>
                  <label className="mb-2 block text-[9px] font-extrabold uppercase tracking-[0.16em] text-slate-400">
                    Full Name
                  </label>

                  <div className="group relative">
                    <UserRound className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 transition group-focus-within:text-brand-green" />

                    <input
                      value={profileForm.name}
                      onChange={(e) =>
                        setProfileForm((f) => ({
                          ...f,
                          name: e.target.value,
                        }))
                      }
                      className="min-h-12 w-full rounded-2xl border border-slate-200 bg-slate-50/60 pl-11 pr-4 text-sm font-medium text-slate-700 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-brand-green focus:bg-white focus:ring-4 focus:ring-brand-green/10"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="mb-2 block text-[9px] font-extrabold uppercase tracking-[0.16em] text-slate-400">
                    Phone Number
                  </label>

                  <div className="group relative">
                    <Phone className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 transition group-focus-within:text-brand-green" />

                    <input
                      value={profileForm.phone}
                      onChange={(e) =>
                        setProfileForm((f) => ({
                          ...f,
                          phone: e.target.value,
                        }))
                      }
                      placeholder="+91 XXXXX XXXXX"
                      className="min-h-12 w-full rounded-2xl border border-slate-200 bg-slate-50/60 pl-11 pr-4 text-sm font-medium text-slate-700 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-brand-green focus:bg-white focus:ring-4 focus:ring-brand-green/10"
                    />
                  </div>
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="mb-2 block text-[9px] font-extrabold uppercase tracking-[0.16em] text-slate-400">
                  Email Address
                </label>

                <div className="relative">
                  <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                  <input
                    value={user?.email || ""}
                    disabled
                    className="min-h-12 w-full cursor-not-allowed rounded-2xl border border-slate-200 bg-slate-100 pl-11 pr-4 text-sm font-medium text-slate-400"
                  />
                </div>

                <p className="mt-2 text-[10px] text-slate-400">
                  Email addresses can only be changed by an
                  administrator.
                </p>
              </div>

              {/* Student information */}
              {student && (
                <div className="border-t border-slate-100 pt-7">
                  <div className="mb-5 flex items-center justify-between">
                    <div>
                      <p className="text-[9px] font-extrabold uppercase tracking-[0.16em] text-brand-green">
                        Academic Details
                      </p>

                      <h3 className="mt-1 font-heading text-base font-extrabold text-brand-dark">
                        Student Information
                      </h3>
                    </div>

                    <div className="hidden h-9 w-9 items-center justify-center rounded-xl bg-slate-50 text-slate-300 sm:flex">
                      <GraduationCap className="h-4 w-4" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {studentInfo.map((field) => {
                      if (!field.value) return null;

                      const Icon = field.icon;

                      return (
                        <div
                          key={field.label}
                          className="group min-w-0 rounded-2xl border border-slate-100 bg-slate-50/60 p-4 transition hover:border-emerald-100 hover:bg-emerald-50/30"
                        >
                          <div className="flex items-start gap-3">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-slate-400 shadow-sm transition group-hover:text-brand-green">
                              <Icon className="h-4 w-4" />
                            </div>

                            <div className="min-w-0">
                              <p className="text-[8px] font-extrabold uppercase tracking-[0.15em] text-slate-400">
                                {field.label}
                              </p>

                              <p className="mt-1.5 break-words text-xs font-bold leading-5 text-slate-700">
                                {field.value}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Save */}
              <div className="flex flex-col gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
                <p className="hidden text-[10px] text-slate-400 sm:block">
                  Changes are saved securely to your account.
                </p>

                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-brand-green px-7 text-sm font-extrabold text-white shadow-lg shadow-brand-green/15 transition hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-xl hover:shadow-brand-green/20 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 sm:w-auto"
                >
                  <Save className="h-4 w-4" />
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </section>
        )}

        {/* Password tab */}
        {activeTab === "password" && (
          <section className="overflow-hidden rounded-[2rem] border border-slate-200/70 bg-white shadow-xl shadow-slate-900/[0.04]">
            <div className="relative overflow-hidden border-b border-slate-100 px-5 py-6 sm:px-7">
              <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-emerald-50 blur-3xl" />

              <div className="relative flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-brand-green">
                  <ShieldCheck className="h-5 w-5" />
                </div>

                <div>
                  <h2 className="font-heading text-base font-extrabold text-brand-dark sm:text-lg">
                    Account Security
                  </h2>

                  <p className="mt-0.5 text-xs text-slate-400 sm:text-sm">
                    Keep your account protected with a strong
                    password.
                  </p>
                </div>
              </div>
            </div>

            <form
              onSubmit={handlePasswordSave}
              className="space-y-5 p-5 sm:p-7 lg:p-8"
            >
              {/* Security banner */}
              <div className="relative overflow-hidden rounded-2xl border border-emerald-100 bg-emerald-50/60 p-4">
                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-emerald-100/70 blur-2xl" />

                <div className="relative flex gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-brand-green shadow-sm">
                    <LockKeyhole className="h-4 w-4" />
                  </div>

                  <div>
                    <p className="text-xs font-extrabold text-slate-700">
                      Password protection
                    </p>

                    <p className="mt-1 text-[10px] leading-5 text-slate-500">
                      Use a unique password with at least 8
                      characters. Never share your account
                      credentials.
                    </p>
                  </div>
                </div>
              </div>

              {[
                "currentPassword",
                "newPassword",
                "confirmPassword",
              ].map((field) => {
                const label =
                  field === "currentPassword"
                    ? "Current Password"
                    : field === "newPassword"
                    ? "New Password"
                    : "Confirm New Password";

                return (
                  <div key={field}>
                    <label className="mb-2 block text-[9px] font-extrabold uppercase tracking-[0.16em] text-slate-400">
                      {label}
                    </label>

                    <div className="group relative">
                      <KeyRound className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 transition group-focus-within:text-brand-green" />

                      <input
                        type={showPass ? "text" : "password"}
                        required
                        value={passwordForm[field]}
                        onChange={(e) =>
                          setPasswordForm((f) => ({
                            ...f,
                            [field]: e.target.value,
                          }))
                        }
                        placeholder="••••••••"
                        className="min-h-12 w-full rounded-2xl border border-slate-200 bg-slate-50/60 pl-11 pr-12 text-sm font-medium text-slate-700 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-brand-green focus:bg-white focus:ring-4 focus:ring-brand-green/10"
                      />

                      {field === "newPassword" && (
                        <button
                          type="button"
                          onClick={() =>
                            setShowPass((v) => !v)
                          }
                          className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                          aria-label={
                            showPass
                              ? "Hide password"
                              : "Show password"
                          }
                        >
                          {showPass ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}

              {/* Match indicator */}
              {passwordForm.newPassword &&
                passwordForm.confirmPassword && (
                  <div
                    className={`flex items-center gap-2 rounded-2xl border px-4 py-3 text-xs font-bold ${
                      passwordForm.newPassword ===
                      passwordForm.confirmPassword
                        ? "border-emerald-100 bg-emerald-50 text-emerald-600"
                        : "border-red-100 bg-red-50 text-red-500"
                    }`}
                  >
                    <CheckCircle2 className="h-4 w-4 shrink-0" />

                    <span>
                      {passwordForm.newPassword ===
                      passwordForm.confirmPassword
                        ? "Passwords match"
                        : "Passwords don't match"}
                    </span>
                  </div>
                )}

              {/* Submit */}
              <div className="flex flex-col gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="hidden items-center gap-2 text-[10px] text-slate-400 sm:flex">
                  <ShieldCheck className="h-3.5 w-3.5 text-brand-green" />
                  Your credentials are securely protected.
                </div>

                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-brand-green px-7 text-sm font-extrabold text-white shadow-lg shadow-brand-green/15 transition hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-xl hover:shadow-brand-green/20 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 sm:w-auto"
                >
                  <KeyRound className="h-4 w-4" />
                  {saving
                    ? "Changing..."
                    : "Change Password"}
                </button>
              </div>
            </form>
          </section>
        )}
      </div>
    </div>
  );
}