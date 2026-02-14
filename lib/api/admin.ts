//ADMIN API CALLS
import { API } from "./endpoints";
import axiosInstance from "./axios";
import { getAuthToken } from "../cookies";

export const getAllUsers = async () => {
  try {
    const token = await getAuthToken();
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
    const token = await getAuthToken();
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
    const token = await getAuthToken();
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
    const token = await getAuthToken();
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
    const token = await getAuthToken();
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
