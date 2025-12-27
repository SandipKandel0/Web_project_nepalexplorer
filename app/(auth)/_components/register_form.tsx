"use client";

import { useState } from "react";
import { registerSchema } from "../schema";
import Link from "next/link";

export default function RegisterForm() {
  const [form, setForm] = useState({
    fullName: "",
    mobile: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!form.fullName.trim()) {
      setError("Full name is required");
      return;
    }
    if (!form.mobile || form.mobile.length < 10) {
      setError("Invalid mobile number");
      return;
    }
    if (!form.email) {
      setError("Email is required");
      return;
    }
    if (!form.password || form.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError("");
    alert("Registration successful (dummy)");
  };

  return (
    <div className="w-full max-w-md mx-auto p-10 bg-yellow-20 rounded-2xl shadow-lg flex flex-col items-center">
      <h1 className="text-4xl font-extrabold text-yellow-600 mb-2 text-center">
        Join NepalExplorer
      </h1>
      <p className="text-yellow-800 mb-6 text-center">
        Create an account to start your adventure
      </p>

      <div className="w-full mb-4">
        <label className="block text-yellow-700 font-semibold mb-1">Full Name</label>
        <input
          type="text"
          placeholder="Enter your full name"
          value={form.fullName}
          onChange={(e) => setForm({ ...form, fullName: e.target.value })}
          className="w-full px-4 py-2 border border-yellow-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 text-black"
        />
      </div>

      <div className="w-full mb-4">
        <label className="block text-yellow-700 font-semibold mb-1">Mobile Number</label>
        <input
          type="text"
          placeholder="Enter your mobile number"
          value={form.mobile}
          onChange={(e) => setForm({ ...form, mobile: e.target.value })}
          className="w-full px-4 py-2 border border-yellow-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 text-black"
        />
      </div>

      <div className="w-full mb-4">
        <label className="block text-yellow-700 font-semibold mb-1">Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full px-4 py-2 border border-yellow-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 text-black"
        />
      </div>

      <div className="w-full mb-4">
        <label className="block text-yellow-700 font-semibold mb-1">Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full px-4 py-2 border border-yellow-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 text-black"
        />
      </div>

      <div className="w-full mb-2">
        <label className="block text-yellow-700 font-semibold mb-1">Confirm Password</label>
        <input
          type="password"
          placeholder="Confirm your password"
          value={form.confirmPassword}
          onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
          className="w-full px-4 py-2 border border-yellow-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 text-black"
        />
      </div>

      {error && <p className="text-red-500 text-sm mb-3 self-start">{error}</p>}

      <button
        onClick={handleSubmit}
        className="w-full py-2 mb-4 rounded-xl bg-yellow-500 hover:bg-yellow-600 text-white font-semibold shadow-md transition-all"
      >
        Register
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
