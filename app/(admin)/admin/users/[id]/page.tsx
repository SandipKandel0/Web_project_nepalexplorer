"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getUserById } from "@/lib/api/admin";

export default function UserDetailPage() {
  const params = useParams();
  const userId = params.id as string;
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (userId) fetchUser();
  }, [userId]);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const response = await getUserById(userId);
      setUser(response.data);
      setError("");
    } catch (err: any) {
      setError(err.message || "Failed to fetch user");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error)
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    );
  if (!user)
    return (
      <div className="text-center py-8 text-gray-500">User not found</div>
    );

  return (
    <div>
      <div className="mb-6">
        <Link
          href="/admin/users"
          className="text-blue-600 hover:text-blue-800"
        >
          ← Back to Users
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow p-8 max-w-2xl">
        <h1 className="text-3xl font-bold mb-4">{user.fullName}</h1>

        {user.imageUrl && (
          <img
            src={user.imageUrl}
            alt="Profile"
            className="w-32 h-32 rounded-lg mb-4 object-cover"
          />
        )}

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-gray-600">Email</p>
            <p className="font-semibold">{user.email}</p>
          </div>
          <div>
            <p className="text-gray-600">Username</p>
            <p className="font-semibold">{user.username}</p>
          </div>
          <div>
            <p className="text-gray-600">Phone</p>
            <p className="font-semibold">{user.phoneNumber}</p>
          </div>
          <div>
            <p className="text-gray-600">Role</p>
            <p className="font-semibold">{user.role}</p>
          </div>
          <div>
            <p className="text-gray-600">Created At</p>
            <p className="font-semibold">
              {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div>
            <p className="text-gray-600">Updated At</p>
            <p className="font-semibold">
              {new Date(user.updatedAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <Link
            href={`/admin/users/${userId}/edit`}
            className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded"
          >
            Edit User
          </Link>
          <Link
            href="/admin/users"
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
          >
            Back
          </Link>
        </div>
      </div>
    </div>
  );
}
