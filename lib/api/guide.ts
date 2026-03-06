// GUIDE BOOKING & NOTIFICATION API CALLS
import { API } from "./endpoints";
import axiosInstance from "./axios";

// Helper to get guide token specifically
const getGuideToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("guide_token");
  }
  return null;
};

// Helper to get token from localStorage (user or guide)
const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("user_token") || localStorage.getItem("guide_token");
  }
  return null;
};

// Guide Requests
export const createGuideRequest = async (guideRequestData: any) => {
  try {
    const token = getToken();
    const response = await axiosInstance.post(
      API.GUIDE.CREATE_REQUEST,
      guideRequestData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.data || response.data;
  } catch (err: Error | any) {
    throw new Error(
      err.response?.data?.message || 
      err.message || 
      "Failed to create guide request"
    );
  }
};

export const getMyGuideRequests = async () => {
  try {
    const token = getToken();
    const response = await axiosInstance.get(
      API.GUIDE.GET_MY_GUIDE_REQUESTS,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.data || response.data;
  } catch (err: Error | any) {
    throw new Error(
      err.response?.data?.message || 
      err.message || 
      "Failed to fetch guide requests"
    );
  }
};

export const getGuideRequests = async () => {
  try {
    const token = getToken();
    const response = await axiosInstance.get(
      API.GUIDE.GET_MY_GUIDE_REQUESTS,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.data || response.data;
  } catch (err: Error | any) {
    throw new Error(
      err.response?.data?.message || 
      err.message || 
      "Failed to fetch guide requests"
    );
  }
};

export const getMyRequestedGuides = async () => {
  try {
    const token = getToken();
    const response = await axiosInstance.get(
      API.GUIDE.GET_MY_REQUESTED_GUIDES,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.data || response.data;
  } catch (err: Error | any) {
    throw new Error(
      err.response?.data?.message || 
      err.message || 
      "Failed to fetch requested guides"
    );
  }
};

export const getGuideRequest = async (id: string) => {
  try {
    const token = getToken();
    const response = await axiosInstance.get(
      API.GUIDE.GET_REQUEST.replace(":id", id),
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.data || response.data;
  } catch (err: Error | any) {
    throw new Error(
      err.response?.data?.message || 
      err.message || 
      "Failed to fetch guide request"
    );
  }
};

export const approveGuideRequest = async (id: string) => {
  try {
    const token = getToken();
    const response = await axiosInstance.patch(
      API.GUIDE.APPROVE_REQUEST.replace(":id", id),
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
      "Failed to approve guide request"
    );
  }
};

export const declineGuideRequest = async (id: string) => {
  try {
    const token = getToken();
    const response = await axiosInstance.patch(
      API.GUIDE.DECLINE_REQUEST.replace(":id", id),
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
      "Failed to decline guide request"
    );
  }
};

export const deleteGuideRequest = async (id: string) => {
  try {
    const token = getToken();
    const response = await axiosInstance.delete(
      API.GUIDE.DELETE_REQUEST.replace(":id", id),
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
      "Failed to delete guide request"
    );
  }
};

// Notifications
export const getNotifications = async () => {
  try {
    const token = getGuideToken();
    const response = await axiosInstance.get(
      API.NOTIFICATION.GUIDE_GET_NOTIFICATIONS,
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

export const getUnreadCount = async () => {
  try {
    const token = getGuideToken();
    const response = await axiosInstance.get(
      API.NOTIFICATION.GUIDE_GET_UNREAD_COUNT,
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
      "Failed to fetch unread count"
    );
  }
};

export const markNotificationAsRead = async (id: string) => {
  try {
    const token = getGuideToken();
    const response = await axiosInstance.put(
      API.NOTIFICATION.GUIDE_MARK_AS_READ.replace(":id", id),
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

export const markAllNotificationsAsRead = async () => {
  try {
    const token = getGuideToken();
    const response = await axiosInstance.put(
      API.NOTIFICATION.GUIDE_MARK_ALL_READ,
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
      "Failed to mark notifications as read"
    );
  }
};

export const deleteNotification = async (id: string) => {
  try {
    const token = getGuideToken();
    const response = await axiosInstance.delete(
      API.NOTIFICATION.GUIDE_DELETE_NOTIFICATION.replace(":id", id),
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

// Export all guide API methods as a namespace
export const guideApi = {
  createGuideRequest,
  getMyGuideRequests,
  getGuideRequests,
  getMyRequestedGuides,
  getGuideRequest,
  approveGuideRequest,
  declineGuideRequest,
  deleteGuideRequest,
  getNotifications,
  getUnreadCount,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteNotification,
};
