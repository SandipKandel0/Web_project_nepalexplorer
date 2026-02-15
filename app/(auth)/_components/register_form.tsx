"use client";

import { useState, useTransition } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../schema";
import { handleRegister } from "@/lib/actions/auth-action";
import Link from "next/link";

export default function RegisterForm() {
  const [pending, setTransition] = useTransition();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    control,
  } = useForm({
    resolver: zodResolver(registerSchema),
    mode: "onSubmit",
    defaultValues: {
      isGuide: false,
    },
  });

  // Watch the isGuide field to show/hide guide-specific fields
  const isGuide = useWatch({
    control,
    name: "isGuide",
  });

  const submit = async (values: any) => {
    setServerError(null);

    setTransition(async () => {
      try {
        const response = await handleRegister(values);
        if (!response.success) {
          throw new Error(response.message);
        }

        alert("Registration successful!");
        window.location.href = "/login"; // Redirect after successful registration
      } catch (err: any) {
        setServerError(err.message || "Registration failed");
      }
    });
  };

  return (
    <div className="w-full max-w-md mx-auto p-10 bg-yellow-20 rounded-2xl shadow-lg flex flex-col items-center">
      <h1 className="text-4xl font-extrabold text-yellow-600 mb-2 text-center">
        Join NepalExplorer
      </h1>
      <p className="text-yellow-800 mb-6 text-center">
        Create an account to start your adventure
      </p>

      {serverError && <p className="text-red-500 text-sm mb-3">{serverError}</p>}

      {/* Full Name */}
      <div className="w-full mb-4">
        <label className="block text-yellow-700 font-semibold mb-1">Full Name</label>
        <input
          type="text"
          placeholder="Enter your full name"
          className="w-full px-4 py-2 border border-yellow-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 text-black"
          {...register("fullName")}
        />
        {errors.fullName && (
          <p className="text-xs text-red-500 mt-1">{errors.fullName.message}</p>
        )}
      </div>

      {/* Email */}
      <div className="w-full mb-4">
        <label className="block text-yellow-700 font-semibold mb-1">Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full px-4 py-2 border border-yellow-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 text-black"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Username */}
      <div className="w-full mb-4">
        <label className="block text-yellow-700 font-semibold mb-1">Username</label>
        <input
          type="text"
          placeholder="Enter your username"
          className="w-full px-4 py-2 border border-yellow-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 text-black"
          {...register("username")}
        />
        {errors.username && (
          <p className="text-xs text-red-500 mt-1">{errors.username.message}</p>
        )}
      </div>

      {/* Phone Number */}
      <div className="w-full mb-4">
        <label className="block text-yellow-700 font-semibold mb-1">Phone Number</label>
        <input
          type="text"
          placeholder="Enter your phone number"
          className="w-full px-4 py-2 border border-yellow-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 text-black"
          {...register("phoneNumber")}
        />
        {errors.phoneNumber && (
          <p className="text-xs text-red-500 mt-1">{errors.phoneNumber.message}</p>
        )}
      </div>

      {/* Are you a Guide Toggle */}
      <div className="w-full mb-4 flex items-center gap-3 bg-yellow-50 p-4 rounded-xl border border-yellow-200">
        <label className="text-yellow-700 font-semibold flex-1">
          Are you a Guide?
        </label>
        <div className="relative inline-flex items-center">
          <input
            type="checkbox"
            className="sr-only peer"
            {...register("isGuide")}
            id="isGuide"
          />
          <label
            htmlFor="isGuide"
            className="relative w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-500 cursor-pointer"
          ></label>
        </div>
      </div>

      {/* Conditional Guide Fields */}
      {isGuide && (
        <>
          {/* City */}
          <div className="w-full mb-4">
            <label className="block text-yellow-700 font-semibold mb-1">City</label>
            <input
              type="text"
              placeholder="Your city"
              className="w-full px-4 py-2 border border-yellow-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 text-black"
              {...register("city")}
            />
            {errors.city && (
              <p className="text-xs text-red-500 mt-1">{errors.city.message}</p>
            )}
          </div>

          {/* Language */}
          <div className="w-full mb-4">
            <label className="block text-yellow-700 font-semibold mb-1">Language</label>
            <input
              type="text"
              placeholder="e.g., English, Nepali, Hindi"
              className="w-full px-4 py-2 border border-yellow-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 text-black"
              {...register("language")}
            />
            {errors.language && (
              <p className="text-xs text-red-500 mt-1">{errors.language.message}</p>
            )}
          </div>

          {/* Experience */}
          <div className="w-full mb-4">
            <label className="block text-yellow-700 font-semibold mb-1">Experience</label>
            <select
              className="w-full px-4 py-2 border border-yellow-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 text-black"
              {...register("experience")}
            >
              <option value="">Select experience level</option>
              <option value="1-3">1-3 years</option>
              <option value="3-5">3-5 years</option>
              <option value="5-10">5-10 years</option>
              <option value="10+">10+ years</option>
            </select>
            {errors.experience && (
              <p className="text-xs text-red-500 mt-1">{errors.experience.message}</p>
            )}
          </div>
        </>
      )}

      {/* Password */}
      <div className="w-full mb-4">
        <label className="block text-yellow-700 font-semibold mb-1">Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          className="w-full px-4 py-2 border border-yellow-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 text-black"
          {...register("password")}
        />
        {errors.password && (
          <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>
        )}
      </div>

      {/* Confirm Password */}
      <div className="w-full mb-2">
        <label className="block text-yellow-700 font-semibold mb-1">Confirm Password</label>
        <input
          type="password"
          placeholder="Confirm your password"
          className="w-full px-4 py-2 border border-yellow-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 text-black"
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && (
          <p className="text-xs text-red-500 mt-1">{errors.confirmPassword.message}</p>
        )}
      </div>

      <button
        onClick={handleSubmit(submit)}
        className="w-full py-2 mb-4 rounded-xl bg-yellow-500 hover:bg-yellow-600 text-white font-semibold shadow-md transition-all disabled:opacity-60"
        disabled={isSubmitting || pending}
      >
        {isSubmitting || pending ? "Registering..." : "Register"}
      </button>

      <p className="text-sm text-yellow-800 mt-4 text-center">
        Already have an account?{" "}
        <Link href="/login" className="text-yellow-600 font-semibold hover:underline">
          Log in
        </Link>
      </p>
    </div>
  );
}
