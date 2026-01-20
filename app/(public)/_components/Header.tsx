"use client";

import Link from "next/link";

export default function Header() {
  return (
    <nav className="w-full bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
         
          <span className="text-lg font-semibold text-blue-600">NepalExplorer</span>
        </Link>

        {/* Search */}
        <div className="hidden md:block w-1/3">
          <input
            type="text"
            placeholder="Search destinations"
            className="w-full px-4 py-2 rounded-full border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Auth Buttons */}
        <div className="flex gap-3">
          <Link
            href="/login"
            className="px-4 py-2 text-sm rounded-md border border-blue-600 text-blue-600 hover:bg-blue-50 transition"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="px-4 py-2 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
}
