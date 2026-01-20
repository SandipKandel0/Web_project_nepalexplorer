import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(3, "Username is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});


export const registerSchema = z.object({
  fullName: z.string().min(3, "Full name is required"),
  username: z.string().min(3, "Username is required"),
  email: z.string().email("Invalid email"),
  phoneNumber: z.string().min(10, "Invalid phone number"),
  password: z.string().min(6, "Minimum 6 characters"),
  confirmPassword: z.string().min(6, "Minimum 6 characters"),
}).refine((v) => v.password === v.confirmPassword, {
  path: ["confirmPassword"],
  message: "Passwords do not match",
});