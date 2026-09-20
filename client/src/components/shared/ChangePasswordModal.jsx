import { useState } from "react";
import { Lock, X, Save } from "lucide-react";
import api from "../../config/api";
import { alertSuccess, alertError } from "../../utils/alert";

/**
 * Reusable change-password modal.
 *
 * - `dismissable` = false is used by the first-login gate (no close button).
 * - On success it calls `onChanged()` so the caller can refresh the user / unlock the UI.
 */
export default function ChangePasswordModal({
  open,
  onClose,
  onChanged,
  dismissable = true,
  title = "Change Password",
  subtitle = "Update your account password.",
}) {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [saving, setSaving] = useState(false);

  if (!open) return null;

  const inputCls =
    "min-h-11 w-full rounded-xl border-slate-200 bg-white px-3.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-green-500 focus:ring-4 focus:ring-green-500/10";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.newPassword !== form.confirmPassword) {
      alertError("New passwords do not match");
      return;
    }
    if (form.newPassword.length < 8) {
      alertError("Password must be at least 8 characters");
      return;
    }

    setSaving(true);
    try {
      await api.put("/auth/change-password", {
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
      });

      alertSuccess("Password updated successfully");
      setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
      onChanged?.();
      onClose?.();
    } catch (err) {
      alertError(
        err.response?.data?.message || "Failed to update password"
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-end justify-center bg-black/60 p-0 backdrop-blur-sm sm:items-center sm:p-4">
      <div className="flex max-h-[94dvh] w-full flex-col overflow-hidden rounded-t-[2rem] bg-white shadow-2xl sm:max-h-[92dvh] sm:max-w-md sm:rounded-[2rem]">
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-6 sm:py-5">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-50 text-brand-green">
              <Lock className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <h2 className="truncate text-lg font-extrabold text-slate-900">
                {title}
              </h2>
              <p className="mt-0.5 text-xs text-slate-400">{subtitle}</p>
            </div>
          </div>

          {dismissable && (
            <button
              type="button"
              onClick={onClose}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Body */}
        <form
          onSubmit={handleSubmit}
          className="min-h-0 flex-1 overflow-y-auto overscroll-contain"
        >
          <div className="space-y-4 p-5 sm:p-6">
            <div>
              <label className="mb-1.5 block text-[10px] font-extrabold uppercase tracking-[0.16em] text-slate-500">
                Current Password
              </label>
              <input
                required
                type="password"
                value={form.currentPassword}
                onChange={(e) =>
                  setForm((f) => ({ ...f, currentPassword: e.target.value }))
                }
                className={inputCls}
                placeholder="Enter current password"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-[10px] font-extrabold uppercase tracking-[0.16em] text-slate-500">
                New Password
              </label>
              <input
                required
                type="password"
                value={form.newPassword}
                onChange={(e) =>
                  setForm((f) => ({ ...f, newPassword: e.target.value }))
                }
                className={inputCls}
                placeholder="At least 8 characters"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-[10px] font-extrabold uppercase tracking-[0.16em] text-slate-500">
                Confirm New Password
              </label>
              <input
                required
                type="password"
                value={form.confirmPassword}
                onChange={(e) =>
                  setForm((f) => ({ ...f, confirmPassword: e.target.value }))
                }
                className={inputCls}
                placeholder="Re-enter new password"
              />
            </div>

            <div className="grid grid-cols-1 gap-2.5 pt-1">
              <button
                type="submit"
                disabled={saving}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-brand-green px-4 text-sm font-bold text-white shadow-lg shadow-green-900/10 transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Save className="h-4 w-4" />
                {saving ? "Saving..." : "Update Password"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
