"use client";

import { ReactNode, useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import NotificationsDropdown from "./_components/NotificationsDropdown";

export default function UserLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userName, setUserName] = useState("Guest");

  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem("user_data");
    if (userData) {
      try {
        const user = JSON.parse(userData);
        setUserName(user.fullName || user.username || "Guest");
      } catch (e) {
        console.error("Error parsing user data", e);
      }
    }
  }, []);

  const isActive = (path: string) => pathname === path;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link href="/user/dashboard" className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-600">👤 {userName}</h1>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <Link
                href="/user/dashboard"
                className={`font-semibold transition-colors ${
                  isActive("/user/dashboard")
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                🏠 Home
              </Link>
              <Link
                href="/user/destinations"
                className={`font-semibold transition-colors ${
                  isActive("/user/destinations")
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                🗺️ Destinations
              </Link>
              <Link
                href="/user/guide-booked"
                className={`font-semibold transition-colors ${
                  isActive("/user/guide-booked")
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                📋 Book Guide
              </Link>
              <Link
                href="/user/favourite"
                className={`font-semibold transition-colors ${
                  isActive("/user/favourite")
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                ❤️ Favourite
              </Link>
              <Link
                href="/user/profile"
                className={`font-semibold transition-colors ${
                  isActive("/user/profile")
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                👤 Profile
              </Link>
            </div>

            {/* Right Side Icons */}
            <div className="hidden md:flex items-center gap-4">
              <NotificationsDropdown />
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-gray-700 hover:text-blue-600"
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
                href="/user/dashboard"
                className="block py-2 px-4 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded"
              >
                🏠 Home
              </Link>
              <Link
                href="/user/destinations"
                className="block py-2 px-4 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded"
              >
                🗺️ Destinations
              </Link>
              <Link
                href="/user/guide-booked"
                className="block py-2 px-4 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded"
              >
                📋 Book Guide
              </Link>
              <Link
                href="/user/favourite"
                className="block py-2 px-4 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded"
              >
                ❤️ Favourite
              </Link>
              <Link
                href="/user/profile"
                className="block py-2 px-4 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded"
              >
                👤 Profile
              </Link>
              <div className="py-2 px-4 border-t border-gray-200 mt-2">
                <NotificationsDropdown />
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
