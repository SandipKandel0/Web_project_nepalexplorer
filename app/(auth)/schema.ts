import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().min(3, "Username is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const registerSchema = z.object({
  fullName: z.string().min(3, "Full name is required"),
  mobile: z.string().min(10, "Invalid mobile number"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Minimum 6 characters"),
});
