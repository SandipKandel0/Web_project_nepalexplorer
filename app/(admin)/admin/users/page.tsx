"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getAllUsers, getAllGuides, deleteUser, deleteGuide } from "@/lib/api/admin";
import { handleLogout } from "@/lib/actions/auth-action";
import { MdEdit, MdDelete } from "react-icons/md";

interface AdminAccountRow {
  _id: string;
  fullName: string;
  email: string;
  username?: string;
  role: "admin" | "user" | "guide";
  phone?: string;
  phoneNumber?: string;
}

export default function UsersPage() {
  const [accounts, setAccounts] = useState<AdminAccountRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const [usersResponse, guidesResponse] = await Promise.all([
        getAllUsers(),
        getAllGuides(),
      ]);

      const users = ((usersResponse?.data || []) as any[]).map((user) => ({
        ...user,
        role: (user.role === "admin" ? "admin" : "user") as "admin" | "user",
      })) as AdminAccountRow[];

      const guides = ((guidesResponse?.data || []) as any[]).map((guide) => ({
        ...guide,
        role: "guide" as const,
      }));

      setAccounts([...users, ...guides]);
      setError("");
    } catch (err: any) {
      setError(err.message || "Failed to fetch users and guides");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (account: AdminAccountRow) => {
    const label = account.role === "guide" ? "guide" : "user";
    if (!confirm(`Are you sure you want to delete this ${label}?`)) return;

    try {
      if (account.role === "guide") {
        await deleteGuide(account._id);
      } else {
        await deleteUser(account._id);
      }

      setAccounts((prev) => prev.filter((u) => u._id !== account._id));
    } catch (err: any) {
      setError(err.message || "Failed to delete account");
    }
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;

  return (
    <div className="text-black">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-black">Users & Guides Management</h1>
        <div className="flex items-center gap-3">
          <form action={handleLogout}>
            <button
              type="submit"
              className="bg-red-200 hover:bg-red-300 text-black px-4 py-2 rounded"
            >
              Logout
            </button>
          </form>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="overflow-x-auto bg-white rounded-lg shadow text-black">
        <table className="w-full">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-black">Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-black">Email</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-black">
                Username
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-black">Role</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-black">
                Phone
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-black">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((user) => (
              <tr key={user._id} className="border-b hover:bg-gray-50 text-black">
                <td className="px-6 py-3 text-black">{user.fullName}</td>
                <td className="px-6 py-3 text-black">{user.email}</td>
                <td className="px-6 py-3 text-black">{user.username || "-"}</td>
                <td className="px-6 py-3 text-black">
                  <span
                    className={`px-3 py-1 rounded text-sm font-medium ${
                      user.role === "admin"
                        ? "bg-red-100 text-black"
                        : user.role === "guide"
                        ? "bg-blue-100 text-black"
                        : "bg-green-100 text-black"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-3 text-black">{user.phoneNumber || user.phone || "-"}</td>
                <td className="px-6 py-3 flex gap-3 text-black">
                  {user.role !== "guide" && (
                    <>
                      <Link
                        href={`/admin/users/${user._id}`}
                        className="text-black hover:underline"
                      >
                        View
                      </Link>
                      <Link
                        href={`/admin/users/${user._id}/edit`}
                        className="text-black hover:underline flex items-center gap-1"
                      >
                        <MdEdit size={16} /> Edit
                      </Link>
                    </>
                  )}
                  <button
                    onClick={() => handleDelete(user)}
                    className="text-black hover:underline flex items-center gap-1"
                  >
                    <MdDelete size={16} /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {accounts.length === 0 && (
        <div className="text-center py-8 text-black">
          No users or guides found.
        </div>
      )}
    </div>
  );
}
