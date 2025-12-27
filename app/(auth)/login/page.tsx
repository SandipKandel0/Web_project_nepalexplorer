"use client";

import LoginForm from "../_components/login_form";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white rounded-3xl shadow-2xl flex flex-col md:flex-row w-full max-w-5xl overflow-hidden">

        {/* Left Side: Login Form */}
        <div className="w-full md:w-1/2 p-10 flex flex-col items-center justify-center bg-white">
          <LoginForm />
        </div>

        {/* Right Side: Hero / Image Section */}
        <div className="w-full md:w-1/2 relative flex flex-col items-center justify-center p-10 bg-gradient-to-br from-yellow-100 to-orange-300">
          <h2 className="font-extrabold text-3xl md:text-4xl mb-6 text-center text-white drop-shadow-md">
            Discover Places, Create Memories
          </h2>
          <img
            src="/image.jpeg"
            alt="Nepal"
            className="rounded-2xl shadow-xl object-cover w-72 h-48 md:w-96 md:h-64 border-4 border-white"
          />

          {/* Subtle decorative circles */}
          <div className="absolute top-0 left-0 w-24 h-24 bg-white opacity-10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full translate-x-1/3 translate-y-1/3"></div>
        </div>

      </div>
    </div>
  );
}
