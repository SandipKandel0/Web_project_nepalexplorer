"use client";

import { useState } from "react";


export default function LoginForm() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");



  return (
    <div className="w-1/2 bg-gray-50 p-8 flex flex-col items-center">
      <div className="w-20 h-20 rounded-full bg-gray-300 mb-4" />

      <input
        placeholder="Username"
        className="input"
        onChange={(e) => setForm({ ...form, username: e.target.value })}
      />

      <input
        type="password"
        placeholder="Password"
        className="input"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button >
        Log In
      </button>

      <p className="text-sm mt-4">OR</p>

      <button className="btn-google">Continue with Google</button>
    </div>
  );
}   