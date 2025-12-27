"use client";

import { useState } from "react";
import { loginSchema } from "../schema";
import Link from "next/link";
import { SiGoogle } from "react-icons/si";

export default function LoginForm() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = () => {
    const result = loginSchema.safeParse(form);
    if (!result.success) {
      setError(result.error.issues[0].message);
    } else {
      setError("");
      alert("Login successful (dummy)");
    }
  };

  return (
    <div className="w-full max-w-md flex flex-col items-center">

      <h1 className="text-3xl font-extrabold text-gray-800 mb-2">Welcome Back!</h1>
      <p className="text-gray-500 mb-6 text-center">
        Login to continue 
      </p>


      <div className="w-full mb-4">
        <label htmlFor="username" className="block text-gray-700 font-semibold mb-1">
          Username
        </label>
        <input
          id="username"
          type="text"
          placeholder="Enter your username"
          className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
          onChange={(e) => setForm({ ...form, username: e.target.value })}
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
        className="w-full py-2 mb-4 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold shadow-md transition-all"
      >
        Log In
      </button>


      <div className="flex items-center w-full my-3">
        <hr className="flex-grow border-gray-300" />
        <span className="mx-2 text-gray-400">OR</span>
        <hr className="flex-grow border-gray-300" />
      </div>

      <p className="text-sm text-gray-500 mt-6">
        Don’t have an account?{" "}
        <Link href="/register" className="text-blue-500 hover:underline font-semibold">
          Sign Up
        </Link>
      </p>
    </div>
  );
}
