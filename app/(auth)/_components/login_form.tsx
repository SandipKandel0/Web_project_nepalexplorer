"use client";

import { useState, useTransition } from "react";
import { loginSchema } from "../schema";
import { handleLogin } from "@/lib/actions/auth-action";
import Link from "next/link";
import { SiGoogle } from "react-icons/si";

export default function LoginForm() {
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

        // Successful login, redirect based on role
        const redirectUrl = response.redirectUrl || "/user/dashboard";
        window.location.href = redirectUrl;
      } catch (err: any) {
        setError(err.message || "Login failed");
      }
    });
  };

  return (
    <div className="w-full max-w-md flex flex-col items-center">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-2">Welcome Back!</h1>
      <p className="text-gray-500 mb-6 text-center">
        Login to continue
      </p>

      <div className="w-full mb-4">
        <label htmlFor="email" className="block text-gray-700 font-semibold mb-1">
          Email
        </label>
        <input
          id="email"
          type="text"
          placeholder="Enter your email"
          className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
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
          className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
      </div>

      <div className="w-full flex justify-end mb-3">
        <a href="/forgot-password" className="text-sm text-blue-500 hover:underline">
          Forgot Password?
        </a>
      </div>

      {error && <p className="text-red-500 text-sm mb-3 self-start">{error}</p>}

      <button
        onClick={handleSubmit}
        className="w-full py-2 mb-4 rounded-xl bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold shadow-md transition-all"
        disabled={pending}
      >
        {pending ? "Logging in..." : "Log In"}
      </button>

      <div className="flex items-center w-full my-3">
        <hr className="grow border-gray-300" />
        <span className="mx-2 text-gray-400">OR</span>
        <hr className="grow border-gray-300" />
      </div>

      <button
        type="button"
        className="w-full py-2 mb-4 rounded-xl border border-gray-300 flex items-center justify-center gap-2 hover:bg-gray-100 transition-all"
      >
        <SiGoogle className="text-red-500" /> Login with Google
      </button>

      <p className="text-sm text-gray-500 mt-6">
        Don’t have an account?{" "}
        <Link href="/register" className="text-blue-500 hover:underline font-semibold">
          Sign Up
        </Link>
      </p>
    </div>
  );
}
