//AUTHENTICATION API CALLS
import axiosInstance from "./axios";
import { USER_ENDPOINTS, GUIDE_ENDPOINTS } from "./endpoints";

interface RegisterUserData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  profileImage?: File;
}

interface RegisterGuideData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  language: string;
  experience: string;
  city: string;
  bio?: string;
  profileImage?: File;
}

interface LoginData {
  email: string;
  password: string;
}

interface ForgotPasswordData {
  email: string;
}

interface ResetPasswordData {
  token: string;
  newPassword: string;
  confirmPassword: string;
}

export const authAPI = {
  // User Auth
  registerUser: async (data: RegisterUserData) => {
    const formData = new FormData();
    formData.append("fullName", data.fullName);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("confirmPassword", data.confirmPassword);
    formData.append("phone", data.phone);
    if (data.profileImage) {
      formData.append("profileImage", data.profileImage);
    }

    const response = await axiosInstance.post(USER_ENDPOINTS.REGISTER, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  loginUser: async (data: LoginData) => {
    const response = await axiosInstance.post(USER_ENDPOINTS.LOGIN, data);
    return response.data;
  },

  forgotPasswordUser: async (data: ForgotPasswordData) => {
    const response = await axiosInstance.post(USER_ENDPOINTS.FORGOT_PASSWORD, data);
    return response.data;
  },

  resetPasswordUser: async (data: ResetPasswordData) => {
    const response = await axiosInstance.post(USER_ENDPOINTS.RESET_PASSWORD, data);
    return response.data;
  },

  // Guide Auth
  registerGuide: async (data: RegisterGuideData) => {
    const formData = new FormData();
    formData.append("fullName", data.fullName);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("phone", data.phone);
    formData.append("language", data.language);
    formData.append("experience", data.experience);
    formData.append("city", data.city);
    formData.append("bio", data.bio || "");
    if (data.profileImage) {
      formData.append("profileImage", data.profileImage);
    }

    const response = await axiosInstance.post(GUIDE_ENDPOINTS.REGISTER, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  loginGuide: async (data: LoginData) => {
    const response = await axiosInstance.post(GUIDE_ENDPOINTS.LOGIN, data);
    return response.data;
  },

  forgotPasswordGuide: async (data: ForgotPasswordData) => {
    const response = await axiosInstance.post(GUIDE_ENDPOINTS.FORGOT_PASSWORD, data);
    return response.data;
  },

  resetPasswordGuide: async (data: ResetPasswordData) => {
    const response = await axiosInstance.post(GUIDE_ENDPOINTS.RESET_PASSWORD, data);
    return response.data;
  },

  // Store token
  setToken: (token: string, role: "user" | "guide") => {
    localStorage.setItem(`${role}_token`, token);
  },

  // Get token
  getToken: (role: "user" | "guide") => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(`${role}_token`);
    }
    return null;
  },

  // Clear token
  clearToken: (role: "user" | "guide") => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(`${role}_token`);
    }
  },

  // Check if user is authenticated
  isAuthenticated: (role: "user" | "guide") => {
    if (typeof window !== "undefined") {
      return !!localStorage.getItem(`${role}_token`);
    }
    return false;
  },
};

// Generic login function (determines role from data or defaults to user)
export const login = async (data: LoginData & { role?: "user" | "guide" | "admin" }) => {
  const role = data.role || "user";
  const loginData = { email: data.email, password: data.password };
  
  if (role === "guide") {
    return await authAPI.loginGuide(loginData);
  } else {
    return await authAPI.loginUser(loginData);
  }
};

// Generic register function (determines type from data fields)
export const register = async (data: any) => {
  // If data has guide-specific fields, register as guide
  if (data.language || data.experience || data.city) {
    return await authAPI.registerGuide(data);
  } else {
    return await authAPI.registerUser(data);
  }
};

// Update user profile
export const updateProfile = async (userId: string, formData: FormData) => {
  try {
    const response = await axiosInstance.put(`/user/${userId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to update profile");
  }
};

export const updateGuideProfile = async (guideId: string, formData: FormData) => {
  try {
    const response = await axiosInstance.put(
      GUIDE_ENDPOINTS.UPDATE_PROFILE(guideId),
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to update guide profile");
  }
};
