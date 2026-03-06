"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authAPI } from "@/lib/api/auth";
import { handleLogin } from "@/lib/actions/auth-action";

export default function UserLoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password) {
      setError("Email and password are required");
      return;
    }

    try {
      setLoading(true);
      const response = await handleLogin({ ...formData, role: "user" });

      if (response.success) {
        if (response.data?.token) {
          authAPI.setToken(response.data.token, "user");
        }
        localStorage.setItem("user_data", JSON.stringify(response.data));
        alert("Login successful!");
        router.push(response.redirectUrl || "/user/dashboard");
      }
    } catch (err: any) {
      console.error(err);
      const message = err.message || "Login failed. Please try again.";
      if (message.toLowerCase().includes("invalid email or password")) {
        setError("No guest account found with these credentials. Please register as guest first.");
      } else {
        setError(message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-sky-100 to-indigo-200 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Guest Login</h1>
          <p className="text-gray-600">Sign in to your account</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>

          <div className="flex justify-end">
            <Link href="/forgot-password?role=user" className="text-sm text-blue-600 hover:underline">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-2 px-6 rounded-xl transition-colors mt-6"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6 text-sm">
          Don't have an account?{" "}
          <Link href="/register" className="text-blue-600 font-semibold hover:underline">
            Register here
          </Link>
        </p>

        <p className="text-center text-gray-600 mt-4">
          <Link href="/login" className="text-gray-700 font-semibold hover:underline">
            Back to login options
          </Link>
        </p>
      </div>
    </div>
  );
}
