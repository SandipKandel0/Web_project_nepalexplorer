"use client";

import RegisterForm from "../_components/register_form";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white rounded-3xl shadow-2xl flex flex-col md:flex-row w-full max-w-5xl overflow-hidden">

        <div className="w-full md:w-1/2 p-10 flex flex-col items-center justify-center bg-gradient-to-br from-purple-100 to-green-150 text-gray-800">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-center drop-shadow-sm">
            Register now and explore the beauty of Nepal like never before.
          </h2>

          <img
            src="/image.jpeg"
            alt="Nepal"
            className="rounded-2xl shadow-xl object-cover w-72 h-48 md:w-96 md:h-64 border-2 border-white"
          />

          <div className="absolute top-0 left-0 w-24 h-24 bg-white opacity-10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full translate-x-1/3 translate-y-1/3"></div>
        </div>

        <div className="w-full md:w-1/2 p-10 flex items-center justify-center bg-white">
          <RegisterForm />
        </div>

      </div>
    </div>
  );
}
