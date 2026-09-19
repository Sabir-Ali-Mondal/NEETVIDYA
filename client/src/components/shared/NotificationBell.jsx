import { useState, useEffect, useRef } from "react";
import {
  Bell,
  CheckCheck,
  X,
  Inbox,
  Circle,
} from "lucide-react";
import api from "../../config/api";

const NotificationBell = () => {
  const [count, setCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);

  const wrapperRef = useRef(null);

  useEffect(() => {
    const fetchCount = () => {
      api
        .get("/notifications/unread-count")
        .then(({ data }) =>
          setCount(data.data?.count || 0)
        )
        .catch(() => {});
    };

    fetchCount();

    const interval = setInterval(fetchCount, 60000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener(
        "mousedown",
        handleClickOutside
      );
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  const fetchNotifications = () => {
    api
      .get("/notifications")
      .then(({ data }) =>
        setNotifications(
          data.data?.notifications || []
        )
      )
      .catch(() => {});
  };

  const handleBellClick = () => {
    setOpen((value) => {
      const nextValue = !value;

      if (nextValue) {
        fetchNotifications();
      }

      return nextValue;
    });
  };

  const markAllRead = async () => {
    try {
      await api.put("/notifications/read-all");

      setCount(0);

      setNotifications((prev) =>
        prev.map((n) => ({
          ...n,
          isRead: true,
        }))
      );
    } catch {}
  };

  const formatDate = (date) => {
    const notificationDate = new Date(date);
    const now = new Date();

    const diff =
      now.getTime() - notificationDate.getTime();

    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;

    return notificationDate.toLocaleDateString(undefined, {
      day: "numeric",
      month: "short",
      year:
        notificationDate.getFullYear() !==
        now.getFullYear()
          ? "numeric"
          : undefined,
    });
  };

  return (
    <div
      ref={wrapperRef}
      className="relative"
    >
      {/* BELL */}
      <button
        type="button"
        onClick={handleBellClick}
        aria-label="Notifications"
        aria-expanded={open}
        className={`relative flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-200 ${
          open
            ? "bg-brand-green/10 text-brand-green"
            : "text-slate-500 hover:bg-slate-100 hover:text-brand-dark"
        }`}
      >
        <Bell
          className={`h-[19px] w-[19px] transition-transform duration-200 ${
            open ? "scale-105" : ""
          }`}
        />

        {count > 0 && (
          <span className="absolute right-1 top-1 flex h-[17px] min-w-[17px] items-center justify-center rounded-full border-2 border-white bg-brand-green px-1 text-[8px] font-extrabold leading-none text-white shadow-sm">
            {count > 9 ? "9+" : count}
          </span>
        )}
      </button>

      {/* NOTIFICATION PANEL */}
      {open && (
        <>
          {/* Mobile backdrop */}
          <div
            className="fixed inset-0 z-40 bg-slate-900/10 backdrop-blur-[1px] sm:hidden"
            onClick={() => setOpen(false)}
          />

          <div
            className="
              fixed
              left-3
              right-3
              top-[4.5rem]
              z-50
              overflow-hidden
              rounded-[1.25rem]
              border
              border-slate-200/80
              bg-white
              shadow-[0_25px_70px_-25px_rgba(15,23,42,0.35)]
              sm:absolute
              sm:left-auto
              sm:right-0
              sm:top-12
              sm:w-[360px]
            "
          >
            {/* HEADER */}
            <div className="border-b border-slate-100 bg-white px-4 py-3.5">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-green/10">
                    <Bell className="h-4 w-4 text-brand-green" />
                  </div>

                  <div>
                    <h4 className="font-heading text-sm font-extrabold text-brand-dark">
                      Notifications
                    </h4>

                    <p className="mt-0.5 text-[10px] text-slate-400">
                      {count > 0
                        ? `${count} unread ${
                            count === 1
                              ? "notification"
                              : "notifications"
                          }`
                        : "You're all caught up"}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-brand-dark sm:hidden"
                  aria-label="Close notifications"
                >
                  <X className="h-4 w-4" />
                </button>

                {count > 0 && (
                  <button
                    type="button"
                    onClick={markAllRead}
                    className="hidden items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[10px] font-bold text-brand-green transition hover:bg-brand-green/5 sm:flex"
                  >
                    <CheckCheck className="h-3.5 w-3.5" />
                    Mark all read
                  </button>
                )}
              </div>

              {/* Mobile mark all */}
              {count > 0 && (
                <button
                  type="button"
                  onClick={markAllRead}
                  className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-lg border border-brand-green/15 bg-brand-green/5 py-2 text-[10px] font-bold text-brand-green transition hover:bg-brand-green/10 sm:hidden"
                >
                  <CheckCheck className="h-3.5 w-3.5" />
                  Mark all notifications as read
                </button>
              )}
            </div>

            {/* CONTENT */}
            <div className="max-h-[min(65vh,420px)] overflow-y-auto overscroll-contain">
              {notifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50">
                    <Inbox className="h-6 w-6 text-slate-300" />
                  </div>

                  <p className="mt-4 text-sm font-bold text-brand-dark">
                    No notifications
                  </p>

                  <p className="mt-1 max-w-[230px] text-xs leading-5 text-slate-400">
                    You're all caught up. New updates will
                    appear here.
                  </p>
                </div>
              ) : (
                notifications.slice(0, 10).map((n) => (
                  <div
                    key={n._id}
                    className={`group relative border-b border-slate-100 px-4 py-3.5 transition-colors last:border-b-0 ${
                      n.isRead
                        ? "bg-white hover:bg-slate-50"
                        : "bg-brand-green/[0.035] hover:bg-brand-green/[0.07]"
                    }`}
                  >
                    {/* Unread indicator */}
                    {!n.isRead && (
                      <span className="absolute left-1.5 top-5 h-1.5 w-1.5 rounded-full bg-brand-green" />
                    )}

                    <div className="flex gap-3">
                      <div
                        className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                          n.isRead
                            ? "bg-slate-100 text-slate-400"
                            : "bg-brand-green/10 text-brand-green"
                        }`}
                      >
                        <Bell className="h-3.5 w-3.5" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <p
                            className={`text-xs leading-5 ${
                              n.isRead
                                ? "font-semibold text-slate-700"
                                : "font-bold text-brand-dark"
                            }`}
                          >
                            {n.title}
                          </p>

                          {!n.isRead && (
                            <span className="mt-1 shrink-0 text-[8px] font-bold uppercase tracking-wider text-brand-green">
                              New
                            </span>
                          )}
                        </div>

                        <p className="mt-0.5 line-clamp-2 text-[11px] leading-5 text-slate-500">
                          {n.message}
                        </p>

                        <div className="mt-2 flex items-center gap-1.5">
                          <Circle className="h-1 w-1 fill-current text-slate-300" />

                          <p className="text-[9px] font-medium text-slate-400">
                            {formatDate(n.createdAt)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* FOOTER */}
            {notifications.length > 0 && (
              <div className="border-t border-slate-100 bg-slate-50/60 px-4 py-2.5 text-center">
                <p className="text-[9px] font-medium uppercase tracking-[0.14em] text-slate-400">
                  Showing latest {Math.min(notifications.length, 10)}{" "}
                  notifications
                </p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default NotificationBell;