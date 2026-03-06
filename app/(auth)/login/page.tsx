"use client";

import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-orange-50 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-3">
            Choose Your Login Type
          </h1>
        </div>

        {/* Login Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Guest Login Card */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 border-2 border-transparent hover:border-blue-400">
            <div className="bg-linear-to-br from-blue-400 to-blue-600 p-8 text-white text-center">
              <div className="text-5xl mb-4">👤</div>
              <h2 className="text-2xl font-bold">Guest Login</h2>
            </div>
            <div className="p-8">
              <p className="text-gray-700 mb-6 text-center">Book trusted local guides for your trip.</p>
              <Link
                href="/login/user"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-colors block text-center"
              >
                Continue as Guest
              </Link>
            </div>
          </div>

          {/* Guide Login Card */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 border-2 border-transparent hover:border-orange-400">
            <div className="bg-linear-to-br from-orange-400 to-orange-600 p-8 text-white text-center">
              <div className="text-5xl mb-4">🧭</div>
              <h2 className="text-2xl font-bold">Guide Login</h2>
            </div>
            <div className="p-8">
              <p className="text-gray-700 mb-6 text-center">Manage trip requests and grow your bookings.</p>
              <Link
                href="/login/guide"
                className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-6 rounded-xl transition-colors block text-center"
              >
                Continue as Guide
              </Link>
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <div className="text-center space-y-3">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <Link href="/register" className="text-blue-600 font-semibold hover:underline">
              Create one here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
