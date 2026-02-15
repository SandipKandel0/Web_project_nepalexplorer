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
  isGuide: z.boolean().optional().default(false),
  language: z.string().optional(),
  experience: z.string().optional(),
  city: z.string().optional(),
}).refine((v) => v.password === v.confirmPassword, {
  path: ["confirmPassword"],
  message: "Passwords do not match",
}).refine((v) => {
  // If isGuide is true, require guide fields
  if (v.isGuide) {
    return !!v.language && !!v.experience && !!v.city;
  }
  return true;
}, {
  path: ["city"],
  message: "Guide fields are required when registering as a guide",
});