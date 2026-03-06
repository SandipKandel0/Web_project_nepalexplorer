"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { requestPasswordResetSchema } from "@/app/(auth)/schema";
import { handleRequestPasswordReset } from "@/lib/actions/auth-action";

type RequestPasswordResetDTO = {
  email: string;
};

export default function ForgotPasswordPage() {
  const searchParams = useSearchParams();
  const role = searchParams.get("role") === "guide" ? "guide" : "user";

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RequestPasswordResetDTO>({
    resolver: zodResolver(requestPasswordResetSchema),
  });

  const onSubmit = async (data: RequestPasswordResetDTO) => {
    setError("");
    setMessage("");
import { Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { authAPI } from "@/lib/api/auth";

function ForgotPasswordContent() {
  const searchParams = useSearchParams();
  const role = searchParams.get("role") === "guide" ? "guide" : "user";

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email) {
      setError("Email is required");
      return;
    }

    try {
      setLoading(true);

      const response = await handleRequestPasswordReset(data.email, role);

      if (response.success) {
        setMessage(response.message || "Password reset link sent to your email.");
      } else {
        setError(response.message || "Failed to request password reset.");
      }
    } catch (err: any) {
      setError(err.message || "Failed to request password reset.");
      if (role === "guide") {
        await authAPI.forgotPasswordGuide({ email });
      } else {
        await authAPI.forgotPasswordUser({ email });
      }

      setSuccess("If your account exists, a reset link has been sent to your email.");
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to send reset link");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Forgot Password</h1>
          <p className="text-gray-600">Enter your email to receive a reset link</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        {message && (
          <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg text-sm">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {error && <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">{error}</div>}
        {success && <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg text-sm">{success}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
            <input
              type="email"
              {...register("email")}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="your@email.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="your@email.com"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-2 px-6 rounded-xl transition-colors mt-6"
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-2 px-6 rounded-xl transition-colors"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6 text-sm">
          Remembered your password?{" "}
          <Link
            href={role === "guide" ? "/login/guide" : "/login/user"}
            className="text-blue-600 font-semibold hover:underline"
          >
          <Link href={role === "guide" ? "/login/guide" : "/login/user"} className="text-blue-600 font-semibold hover:underline">
            Back to login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function ForgotPasswordPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <ForgotPasswordContent />
    </Suspense>
  );
}
