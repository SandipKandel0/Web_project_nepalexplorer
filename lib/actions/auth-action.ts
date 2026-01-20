"use server";

import { loginSchema, registerSchema } from "@/app/(auth)/schema";
import { login, register } from "@/lib/api/auth";
import { redirect } from "next/navigation";
import { clearAuthCookies, setAuthToken, setUserData } from "../cookies";

export const handleRegister = async (data: any) => {
  try {
    // Validate using Zod schema
    registerSchema.parse(data);
    const response = await register(data);
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
    message: error.message || "Registration action failed",
    };
  }
};

export const handleLogin = async (data: any) => {
try {
    // Validate using Zod schema
    loginSchema.parse(data);

    const response = await login(data);

    if (response.success) {
    if (response.token) await setAuthToken(response.token);
    if (response.data) await setUserData(response.data);

    return {
        success: true,
        message: "Login successful",
        data: response.data,
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
