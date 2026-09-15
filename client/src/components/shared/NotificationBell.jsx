import { useState, useEffect } from "react";
import { Bell } from "lucide-react";
import api from "../../config/api";

const NotificationBell = () => {
  const [count, setCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchCount = () => {
      api
        .get("/notifications/unread-count")
        .then(({ data }) => setCount(data.data?.count || 0))
        .catch(() => { });
    };
    fetchCount();
    const interval = setInterval(fetchCount, 60000);
    return () => clearInterval(interval);
  }, []);

  const fetchNotifications = () => {
    api
      .get("/notifications")
      .then(({ data }) => setNotifications(data.data?.notifications || []))
      .catch(() => { });
  };

  const handleBellClick = () => {
    setOpen(!open);
    if (!open) fetchNotifications();
  };

  const markAllRead = async () => {
    try {
      await api.put("/notifications/read-all");
      setCount(0);
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    } catch {}
  };

  return (
    <div className="relative">
      <button
        onClick={handleBellClick}
        className="relative p-2 rounded-lg hover:bg-gray-100 transition"
      >
        <Bell className="w-5 h-5 text-gray-600" />
        {count > 0 && (
          <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
            {count > 9 ? "9+" : count}
          </span>
        )}
      </button>
      {open && (
        <div className="absolute right-0 top-12 w-80 bg-white rounded-card shadow-xl border-gray-100 z-50 max-h-96 overflow-y-auto border">
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <h4 className="font-heading font-bold text-sm">Notifications</h4>
            <button
              onClick={markAllRead}
              className="text-xs text-brand-green hover:underline font-semibold"
            >
              Mark all read
            </button>
          </div>
          {notifications.length === 0 ? (
            <p className="p-4 text-sm text-gray-400 text-center">No notifications</p>
          ) : (
            notifications.slice(0, 10).map((n) => (
              <div
                key={n._id}
                className="p-3 border-b border-gray-50 hover:bg-gray-50 cursor-pointer"
              >
                <p className="text-sm font-medium text-brand-dark">{n.title}</p>
                <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{n.message}</p>
                <p className="text-[10px] text-gray-400 mt-1">
                  {new Date(n.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
