"use client";

import { ReactNode, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import GuideNotificationsDropdown from "./guide/_components/GuideNotificationsDropdown";

export default function GuideLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string) => pathname === path;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link href="/guide/dashboard" className="flex items-center">
              <h1 className="text-2xl font-bold text-orange-600">🧭 Guide</h1>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <Link
                href="/guide/dashboard"
                className={`font-semibold transition-colors ${
                  isActive("/guide/dashboard")
                    ? "text-orange-600 border-b-2 border-orange-600"
                    : "text-gray-700 hover:text-orange-600"
                }`}
              >
                🏠 Home
              </Link>
              <Link
                href="/guide/requests"
                className={`font-semibold transition-colors ${
                  isActive("/guide/requests")
                    ? "text-orange-600 border-b-2 border-orange-600"
                    : "text-gray-700 hover:text-orange-600"
                }`}
              >
                📋 Requests
              </Link>
              <Link
                href="/guide/profile"
                className={`font-semibold transition-colors ${
                  isActive("/guide/profile")
                    ? "text-orange-600 border-b-2 border-orange-600"
                    : "text-gray-700 hover:text-orange-600"
                }`}
              >
                👤 Profile
              </Link>
            </div>

            {/* Right Side Icons */}
            <div className="hidden md:flex items-center gap-4">
              <GuideNotificationsDropdown />
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-gray-700 hover:text-orange-600"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-gray-200 space-y-2">
              <Link
                href="/guide/dashboard"
                className="block py-2 px-4 text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                🏠 Home
              </Link>
              <Link
                href="/guide/requests"
                className="block py-2 px-4 text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                📋 Requests
              </Link>
              <Link
                href="/guide/profile"
                className="block py-2 px-4 text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                👤 Profile
              </Link>
              <div className="py-2 px-4 border-t border-gray-200 mt-2">
                <GuideNotificationsDropdown />
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-8 px-4">{children}</main>
    </div>
  );
}
