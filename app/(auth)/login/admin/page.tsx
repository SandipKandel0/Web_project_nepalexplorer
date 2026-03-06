"use client";

import { useState } from "react";
import { useTransition } from "react";
import { loginSchema } from "../../schema";
import { handleLogin } from "@/lib/actions/auth-action";
import Link from "next/link";
import { SiGoogle } from "react-icons/si";

export default function AdminLoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [pending, setTransition] = useTransition();

  const handleSubmit = async () => {
    // Validate using Zod
    const result = loginSchema.safeParse(form);
    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }

    setError("");

    setTransition(async () => {
      try {
        const response = await handleLogin(form);

        if (!response.success) {
          throw new Error(response.message);
        }

        // Verify it's an admin login
        const user = response.data?.user;
        if (user?.role !== "admin") {
          setError(
            `This account does not have admin access. Please use the appropriate login page.`
          );
          return;
        }

        // Successful login, redirect to admin dashboard
        window.location.href = "/admin/users";
      } catch (err: any) {
        setError(err.message || "Login failed");
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white rounded-3xl shadow-2xl flex flex-col md:flex-row w-full max-w-5xl overflow-hidden">
        {/* Left Side: Login Form */}
        <div className="w-full md:w-1/2 p-10 flex flex-col items-center justify-center bg-white">
          <div className="w-full max-w-md flex flex-col items-center">
            <div className="text-5xl mb-4">⚙️</div>
            <h1 className="text-3xl font-extrabold text-gray-800 mb-2">
              Admin Login
            </h1>
            <p className="text-gray-500 mb-6 text-center">
              Manage the platform and users
            </p>

            <div className="w-full mb-4">
              <label htmlFor="email" className="block text-gray-700 font-semibold mb-1">
                Email
              </label>
              <input
                id="email"
                type="text"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-gray-600"
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>

            <div className="w-full mb-2">
              <label htmlFor="password" className="block text-gray-700 font-semibold mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-gray-600"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>

            <div className="w-full flex justify-end mb-3">
              <a href="/forgot-password" className="text-sm text-gray-600 hover:underline">
                Forgot Password?
              </a>
            </div>

            {error && <p className="text-red-500 text-sm mb-3 self-start">{error}</p>}

            <button
              onClick={handleSubmit}
              className="w-full py-2 mb-4 rounded-xl bg-linear-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 text-white font-semibold shadow-md transition-all"
              disabled={pending}
            >
              {pending ? "Logging in..." : "Log In"}
            </button>

            <div className="text-center text-sm text-gray-500 mt-4 pt-4 border-t border-gray-200 w-full">
              <Link
                href="/login"
                className="text-gray-600 hover:text-gray-800 font-semibold"
              >
                ← Back to login selection
              </Link>
            </div>
          </div>
        </div>

        {/* Right Side: Hero / Image Section */}
        <div className="w-full md:w-1/2 relative flex flex-col items-center justify-center p-10 bg-linear-to-br from-gray-200 to-gray-100">
          <div className="absolute top-0 left-0 w-24 h-24 bg-gray-400 opacity-10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>

          <h2 className="font-extrabold text-3xl md:text-4xl mb-6 text-center text-gray-900">
            Platform Management
          </h2>
          <img
            src="/image.jpeg"
            alt="Admin Dashboard"
            className="rounded-2xl shadow-xl object-cover w-72 h-48 md:w-96 md:h-64 border-4 border-white"
          />

          <div className="mt-8 bg-white bg-opacity-90 rounded-lg p-6 text-center">
            <p className="text-gray-900 font-semibold mb-3">
              🛡️ Secure Admin Portal
            </p>
            <p className="text-gray-700 text-sm">
              Manage users, monitor activities, and keep the platform running smoothly
            </p>
          </div>

          <div className="absolute bottom-0 right-0 w-32 h-32 bg-gray-400 opacity-10 rounded-full translate-x-1/3 translate-y-1/3"></div>
        </div>
      </div>
    </div>
  );
}
