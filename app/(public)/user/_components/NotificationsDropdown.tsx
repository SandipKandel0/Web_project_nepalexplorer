"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getNotifications, markNotificationAsRead, deleteNotification } from "@/lib/api/guide";
import { MdNotifications, MdClose, MdLogout } from "react-icons/md";

export default function NotificationsDropdown() {
  const router = useRouter();
  const [notifications, setNotifications] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    if (isOpen) {
      fetchNotifications();
    }
  }, [isOpen]);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const response = await getNotifications();
      const list = Array.isArray(response)
        ? response
        : Array.isArray(response?.data)
        ? response.data
        : Array.isArray(response?.data?.data)
        ? response.data.data
        : [];
      setNotifications(list);
      setError("");
    } catch (err: any) {
      setError(err.message || "Failed to fetch notifications");
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (notificationId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await markNotificationAsRead(notificationId);
      setNotifications((prev) =>
        prev.map((n) =>
          n._id === notificationId ? { ...n, read: true } : n
        )
      );
    } catch (err) {
      console.error("Failed to mark notification as read");
    }
  };

  const handleDelete = async (notificationId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await deleteNotification(notificationId);
      setNotifications((prev) => prev.filter((n) => n._id !== notificationId));
    } catch (err) {
      console.error("Failed to delete notification");
    }
  };

  const handleLogout = () => {
    // Clear all user data from localStorage
    localStorage.removeItem("user_data");
    localStorage.removeItem("guide_data");
    localStorage.removeItem("user_token");
    localStorage.removeItem("guide_token");
    localStorage.removeItem("favorite_destinations");
    
    // Redirect to login page
    router.push("/login");
  };

  return (
    <div className="relative">
      {/* Bell Icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-700 hover:text-blue-600"
      >
        <MdNotifications size={24} />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          {/* Header */}
          <div className="border-b p-4 flex justify-between items-center">
            <h3 className="font-semibold">Notifications</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <MdClose size={20} />
            </button>
          </div>

          {/* Notifications List */}
          <div className="max-h-96 overflow-y-auto">
            {loading ? (
              <div className="p-4 text-center text-gray-500">Loading...</div>
            ) : error ? (
              <div className="p-4 text-center text-red-500">{error}</div>
            ) : notifications.length === 0 ? (
              <div className="p-4 text-center text-gray-500">No notifications</div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification._id}
                  className={`border-b p-4 hover:bg-gray-50 transition cursor-pointer ${
                    !notification.read ? "bg-blue-50" : ""
                  }`}
                  onClick={() => handleMarkAsRead(notification._id, {} as any)}
                >
                  <div className="flex justify-between items-start gap-2">
                    <div className="flex-1">
                      <p className="font-semibold text-sm capitalize">
                        {notification.type === "approval" && "✅ Request Approved"}
                        {notification.type === "decline" && "❌ Request Declined"}
                        {notification.type === "new_request" && "📩 New Request"}
                      </p>
                      <p className="text-sm text-gray-700">
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(notification.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <button
                      onClick={(e) => handleDelete(notification._id, e)}
                      className="text-gray-400 hover:text-red-600"
                    >
                      <MdClose size={18} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="border-t">
            {notifications.length > 0 && (
              <div className="p-3 text-center border-b">
                <button className="text-blue-600 hover:text-blue-800 text-sm font-semibold">
                  View All Notifications
                </button>
              </div>
            )}
            <div className="p-3">
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition"
              >
                <MdLogout size={18} />
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
