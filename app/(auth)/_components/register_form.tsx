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
    const result = registerSchema.safeParse(form);
    if (!result.success) {
      setError(result.error.issues[0].message);
    } else {
      setError("");
      alert("Registration successful ");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-10 p-8 bg-white shadow-md rounded-lg flex flex-col items-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome</h1>
      <p className="text-gray-500 mb-6">Complete this form with correct information</p>

      <input
        type="text"
        placeholder="Full Name"
        className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
        onChange={(e) => setForm({ ...form, fullName: e.target.value })}
      />

      <input
        type="text"
        placeholder="Mobile Number"
        className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
        onChange={(e) => setForm({ ...form, mobile: e.target.value })}
      />

      <input
        type="email"
        placeholder="Email"
        className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <input
        type="password"
        placeholder="Confirm Password"
        className="w-full mb-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
        onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
      />

      {error && <p className="text-red-500 text-sm mb-2 self-start">{error}</p>}

      <button
        onClick={handleSubmit}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md mt-2 transition-colors"
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
