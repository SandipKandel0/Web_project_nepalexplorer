//ADMIN API CALLS
import { API } from "./endpoints";
import axiosInstance from "./axios";
const getClientToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("user_token") || localStorage.getItem("guide_token");
  }
  return null;
};

export const getAllUsers = async () => {
  try {
    const token = getClientToken();
    const response = await axiosInstance.get(API.ADMIN.USERS, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err: Error | any) {
    throw new Error(
      err.response?.data?.message || err.message || "Failed to fetch users"
    );
  }
};

export const getUserById = async (id: string) => {
  try {
    const token = getClientToken();
    const response = await axiosInstance.get(
      API.ADMIN.GET_USER.replace(":id", id),
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (err: Error | any) {
    throw new Error(
      err.response?.data?.message || err.message || "Failed to fetch user"
    );
  }
};

export const createUser = async (userData: FormData) => {
  try {
    const token = getClientToken();
    const response = await axiosInstance.post(API.ADMIN.CREATE_USER, userData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (err: Error | any) {
    throw new Error(
      err.response?.data?.message || err.message || "Failed to create user"
    );
  }
};

export const updateUser = async (id: string, userData: FormData) => {
  try {
    const token = getClientToken();
    const response = await axiosInstance.put(
      API.ADMIN.UPDATE_USER.replace(":id", id),
      userData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (err: Error | any) {
    throw new Error(
      err.response?.data?.message || err.message || "Failed to update user"
    );
  }
};

export const deleteUser = async (id: string) => {
  try {
    const token = getClientToken();
    const response = await axiosInstance.delete(
      API.ADMIN.DELETE_USER.replace(":id", id),
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (err: Error | any) {
    throw new Error(
      err.response?.data?.message || err.message || "Failed to delete user"
    );
  }
};

export const getAllGuests = async () => {
  try {
    const token = getClientToken();
    const response = await axiosInstance.get(API.ADMIN.GUIDES, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err: Error | any) {
    throw new Error(
      err.response?.data?.message || err.message || "Failed to fetch guests"
    );
  }
};

export const getAllDestinations = async () => {
  try {
    const token = getClientToken();
    const response = await axiosInstance.get(API.ADMIN.DESTINATIONS, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err: Error | any) {
    throw new Error(
      err.response?.data?.message || err.message || "Failed to fetch destinations"
    );
  }
};

export const uploadDestination = async (destinationData: FormData) => {
  try {
    const token = getClientToken();
    const response = await axiosInstance.post(
      API.ADMIN.DESTINATIONS,
      destinationData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (err: Error | any) {
    throw new Error(
      err.response?.data?.message || err.message || "Failed to upload destination"
    );
  }
};

export const deleteDestination = async (id: string) => {
  try {
    const token = getClientToken();
    const response = await axiosInstance.delete(
      API.ADMIN.DELETE_DESTINATION.replace(":id", id),
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (err: Error | any) {
    throw new Error(
      err.response?.data?.message || err.message || "Failed to delete destination"
    );
  }
};

export const updateDestination = async (id: string, destinationData: FormData) => {
  try {
    const token = getClientToken();
    const response = await axiosInstance.put(
      API.ADMIN.UPDATE_DESTINATION.replace(":id", id),
      destinationData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (err: Error | any) {
    throw new Error(
      err.response?.data?.message || err.message || "Failed to update destination"
    );
  }
};

export const deleteGuide = async (id: string) => {
  try {
    const token = getClientToken();
    const response = await axiosInstance.delete(
      API.ADMIN.DELETE_GUIDE.replace(":id", id),
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (err: Error | any) {
    throw new Error(
      err.response?.data?.message || err.message || "Failed to delete guide"
    );
  }
};
