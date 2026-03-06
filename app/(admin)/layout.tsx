import Link from "next/link";
import { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar Navigation */}
      <div className="flex">
        <aside className="w-64 bg-slate-800 text-white p-6 min-h-screen">
          <h1 className="text-2xl font-bold mb-8">Admin Panel</h1>
          <nav className="space-y-4">
            <Link
              href="/admin/users"
              className="block px-4 py-2 rounded hover:bg-slate-700 transition"
            >
              Users Management
            </Link>
            <Link
              href="/admin/users/create"
              className="block px-4 py-2 rounded hover:bg-slate-700 transition"
            >
              Create User
            </Link>
            <Link
              href="/user/profile"
              className="block px-4 py-2 rounded hover:bg-slate-700 transition"
            >
              My Profile
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}
