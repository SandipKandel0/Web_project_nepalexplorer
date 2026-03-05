"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { authAPI } from "@/lib/api/auth";

export default function UserNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navItems = [
    { href: "/user/dashboard", label: "Home", icon: "🏠" },
    { href: "/user/profile", label: "Profile", icon: "👤" },
    { href: "/user/favourite", label: "Favourites", icon: "❤️" },
    { href: "/user/destinations", label: "Destinations", icon: "🗺️" },
  ];

  const handleLogout = () => {
    authAPI.clearToken("user");
    localStorage.removeItem("user_data");
    router.push("/login");
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/user/dashboard" className="text-2xl font-bold text-blue-600 flex items-center gap-2">
          🌍 TravelGuide
        </Link>

        <div className="hidden md:flex gap-2 items-center">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2 font-semibold transition px-4 py-2 rounded-lg ${
                pathname === item.href
                  ? "text-blue-600 bg-blue-50 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
              }`}
            >
              <span>{item.icon}</span>
              <span className="hidden lg:inline">{item.label}</span>
            </Link>
          ))}
        </div>

        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="text-gray-600 hover:text-blue-600 font-semibold px-4 py-2 rounded-lg hover:bg-gray-100 transition"
          >
            ⚙️
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl z-50 border border-gray-200">
              <Link
                href="/user/settings"
                className="block px-4 py-3 hover:bg-gray-100 rounded-t-lg transition text-gray-700"
              >
                Settings
              </Link>
              <Link 
                href="/user/bookings" 
                className="block px-4 py-3 hover:bg-gray-100 transition text-gray-700"
              >
                My Bookings
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 rounded-b-lg transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}