"use client";

import { useState } from "react";
import { registerSchema } from "../schema";

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
    // Simple manual validation
    if (!form.fullName || form.fullName === " ") {
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
    <div className="w-full max-w-md mx-auto mt-10 p-8 bg-white shadow-md rounded-lg flex flex-col items-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome</h1>
      <p className="text-gray-500 mb-6">Create your account</p>

      <input
        type="text"
        placeholder="Full Name"
        value={form.fullName}
        onChange={(e) => setForm({ ...form, fullName: e.target.value })}
        className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md text-black"
      />

      <input
        type="text"
        placeholder="Mobile Number"
        value={form.mobile}
        onChange={(e) => setForm({ ...form, mobile: e.target.value })}
        className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md text-black"
      />

      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md text-black"
      />

      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md text-black"
      />

      <input
        type="password"
        placeholder="Confirm Password"
        value={form.confirmPassword}
        onChange={(e) =>
          setForm({ ...form, confirmPassword: e.target.value })
        }
        className="w-full mb-2 px-4 py-2 border border-gray-300 rounded-md text-black"
      />

      {error && <p className="text-red-500 text-sm mb-2 self-start">{error}</p>}

      <button
        onClick={handleSubmit}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md mt-2"
      >
        Register
      </button>


      <p className="text-sm text-gray-500 mt-4">
        Already have an account?{" "}
        <a href="/login" className="text-blue-500 hover:underline">
          Log in
        </a>
      </p>
    </div>
  );
}
