"use client";

import { useState } from "react";
import { loginSchema } from "../schema";

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
    <div className="w-full max-w-md mx-auto mt-20 p-8 bg-white shadow-md rounded-lg flex flex-col items-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome!!</h1>
      <p className="text-gray-500 mb-6">Login to continue</p>

      <div className="w-20 h-20 rounded-full bg-gray-200 mb-6 flex items-center justify-center text-gray-500 text-xl font-bold">
        Logo
      </div>

      <input
        type="text"
        placeholder="Username"
        className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
        onChange={(e) => setForm({ ...form, username: e.target.value })}
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full mb-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <div className="w-full flex justify-end mb-2">
        <a href="/forgot-password" className="text-sm text-blue-500 hover:underline">
          Forgot Password?
        </a>
      </div>

      {error && <p className="text-red-500 text-sm mb-2 self-start">{error}</p>}

      <button
        onClick={handleSubmit}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md mt-2 transition-colors"
      >
        Log In
      </button>

      <p className="text-gray-400 text-sm my-4">OR</p>
      <button className="w-full flex items-center justify-center bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-md transition-colors">
        Continue with Google
      </button>
    </div>
  );
}
