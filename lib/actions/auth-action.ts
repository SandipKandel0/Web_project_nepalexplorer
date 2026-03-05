"use server";

import { loginSchema, registerSchema } from "@/app/(auth)/schema";
import { login, register } from "@/lib/api/auth";
import { redirect } from "next/navigation";
import { clearAuthCookies, setAuthToken, setUserData } from "../cookies";

export const handleRegister = async (data: any) => {
try {
    // 1️⃣ Validate FIRST (confirmPassword required here)
    const parsed = registerSchema.parse(data);

    // 2️⃣ Remove confirmPassword BEFORE backend
    const { confirmPassword, ...payload } = parsed;

    // 3️⃣ Call backend API
    const response = await register(payload);

    if (response.success) {
    return {
        success: true,
        message: "Registration successful",
        data: response.data,
    };
    }

    return {
    success: false,
    message: response.message || "Registration failed",
    };
} catch (error: any) {
    return {
    success: false,
    message: error.errors?.[0]?.message || error.message,
    };
}
};

export const handleLogin = async (data: any) => {
try {
    // Validate using Zod schema
    loginSchema.parse(data);

    const response = await login(data);
    if (response.success) {

    if (response.data.token) await setAuthToken(response.data.token);
    if (response.data) await setUserData(response.data);

    // Determine redirect based on role
    const user = response.data.user;
    const userRole = user?.role || response.data?.role;
    let redirectUrl = "/user/dashboard"; // default
    
    if (userRole === "guide") {
      redirectUrl = "/guide/dashboard";
    } else if (userRole === "admin") {
      redirectUrl = "/admin/users";
    }

    return {
        success: true,
        message: "Login successful",
        data: response.data,
        redirectUrl,
    };
    }

    return {
      success: false,
      message: response.message || "Login failed",
    };
  } catch (error: any) {
    // Handle Zod validation errors or API errors
    if (error?.errors) {
      return {
        success: false,
        message: error.errors.map((e: any) => e.message).join(", "),
      };
    }
    return {
      success: false,
      message: error.message || "Login action failed",
    };
  }
};

export const handleLogout = async () => {
  await clearAuthCookies();
  redirect("/login");
};
