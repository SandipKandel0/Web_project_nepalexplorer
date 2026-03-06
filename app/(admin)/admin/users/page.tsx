"use client";

import { useState, useEffect } from "react";
import { deleteGuide, getAllGuests, getAllUsers, deleteUser } from "@/lib/api/admin";
import { MdDelete } from "react-icons/md";

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [guests, setGuests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const [usersResponse, guestsResponse] = await Promise.all([
        getAllUsers(),
        getAllGuests(),
      ]);
      setUsers(usersResponse.data || []);
      setGuests(guestsResponse.data || []);
      setError("");
    } catch (err: any) {
      setError(err.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (userId: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    try {
      await deleteUser(userId);
      setUsers(users.filter((u) => u._id !== userId));
    } catch (err: any) {
      setError(err.message || "Failed to delete user");
    }
  };

  const handleDeleteGuide = async (guideId: string) => {
    if (!confirm("Are you sure you want to delete this guide?")) return;

    try {
      await deleteGuide(guideId);
      setGuests((prev) => prev.filter((guest) => (guest._id || guest.id) !== guideId));
    } catch (err: any) {
      setError(err.message || "Failed to delete guide");
    }
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Users Management</h1>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Username
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Role</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Phone
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-3">{user.fullName}</td>
                <td className="px-6 py-3">{user.email}</td>
                <td className="px-6 py-3">{user.username}</td>
                <td className="px-6 py-3">
                  <span
                    className={`px-3 py-1 rounded text-sm font-medium ${
                      user.role === "admin"
                        ? "bg-red-100 text-red-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-3">{user.phone || user.phoneNumber}</td>
                <td className="px-6 py-3">
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="text-red-600 hover:text-red-800 flex items-center gap-1"
                  >
                    <MdDelete size={16} /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {users.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No users found. Create one to get started.
        </div>
      )}

      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">Guest Data (Guides)</h2>
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="w-full">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Phone</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Language</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Experience</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">City</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {guests.map((guest) => (
                <tr key={guest._id || guest.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-3">{guest.fullName}</td>
                  <td className="px-6 py-3">{guest.email}</td>
                  <td className="px-6 py-3">{guest.phone}</td>
                  <td className="px-6 py-3">{guest.language}</td>
                  <td className="px-6 py-3">{guest.experience}</td>
                  <td className="px-6 py-3">{guest.city}</td>
                  <td className="px-6 py-3">
                    <button
                      onClick={() => handleDeleteGuide(guest._id || guest.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {guests.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No guest data found.
          </div>
        )}
      </div>
    </div>
  );
}
