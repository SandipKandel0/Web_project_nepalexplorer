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
          <p className="text-lg text-gray-600">
            Select whether you're logging in as a Guest or a Guide
          </p>
        </div>

        {/* Login Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Guest Login Card */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 border-2 border-transparent hover:border-blue-400">
            <div className="bg-linear-to-br from-blue-400 to-blue-600 p-8 text-white text-center">
              <div className="text-5xl mb-4">👤</div>
              <h2 className="text-2xl font-bold">Guest Login</h2>
              <p className="text-blue-100 mt-2">For travelers and explorers</p>
            </div>
            <div className="p-8">
              <ul className="space-y-3 mb-6 text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-3 font-bold">✓</span>
                  <span>Book guides for your trips</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-3 font-bold">✓</span>
                  <span>Manage your bookings</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-3 font-bold">✓</span>
                  <span>View guide profiles</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-3 font-bold">✓</span>
                  <span>Get real-time notifications</span>
                </li>
              </ul>
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
              <p className="text-orange-100 mt-2">For local guides and experts</p>
            </div>
            <div className="p-8">
              <ul className="space-y-3 mb-6 text-gray-700">
                <li className="flex items-start">
                  <span className="text-orange-500 mr-3 font-bold">✓</span>
                  <span>Manage booking requests</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-3 font-bold">✓</span>
                  <span>Accept or decline trips</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-3 font-bold">✓</span>
                  <span>Build your reputation</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-3 font-bold">✓</span>
                  <span>Earn from bookings</span>
                </li>
              </ul>
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
