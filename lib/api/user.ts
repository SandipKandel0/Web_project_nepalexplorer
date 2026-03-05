// USER NOTIFICATIONS & PROFILE API CALLS
import { API } from "./endpoints";
import axiosInstance from "./axios";

// Helper to get user token specifically
const getUserToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("user_token");
  }
  return null;
};

// Notifications
export const getNotifications = async () => {
  try {
    const token = getUserToken();
    const response = await axiosInstance.get(
      API.NOTIFICATION.USER_GET_NOTIFICATIONS,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (err: Error | any) {
    throw new Error(
      err.response?.data?.message || 
      err.message || 
      "Failed to fetch notifications"
    );
  }
};

export const markNotificationAsRead = async (id: string) => {
  try {
    const token = getUserToken();
    const response = await axiosInstance.put(
      API.NOTIFICATION.USER_MARK_AS_READ.replace(":id", id),
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (err: Error | any) {
    throw new Error(
      err.response?.data?.message || 
      err.message || 
      "Failed to mark notification as read"
    );
  }
};

export const deleteNotification = async (id: string) => {
  try {
    const token = getUserToken();
    const response = await axiosInstance.delete(
      API.NOTIFICATION.USER_DELETE_NOTIFICATION.replace(":id", id),
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (err: Error | any) {
    throw new Error(
      err.response?.data?.message || 
      err.message || 
      "Failed to delete notification"
    );
  }
};

// Export all user API methods as a namespace
export const userApi = {
  getNotifications,
  markNotificationAsRead,
  deleteNotification,
};
