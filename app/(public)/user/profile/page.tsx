"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getUserData, setUserData } from "@/lib/cookies";
import { updateProfile } from "@/lib/api/auth";

interface UserProfile {
  id?: string;
  _id?: string;
  fullName: string;
  username?: string;
  email: string;
  phone?: string;
  role?: string;
  profileImage?: string;
  createdAt?: string;
}

export default function UserProfilePage() {
  const router = useRouter();

  const [user, setUser] = useState<UserProfile | null>(null);
  const [form, setForm] = useState({
    fullName: "",
    username: "",
    email: "",
    phone: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUserData();
        if (!userData) {
          router.push("/login");
          return;
        }
        const parsedUser = userData.user || userData;
        setUser(parsedUser);
        setForm({
          fullName: parsedUser.fullName || "",
          username: parsedUser.username || "",
          email: parsedUser.email || "",
          phone: parsedUser.phone || "",
        });
        if (parsedUser.profileImage) {
          setPreview(parsedUser.profileImage);
        }
      } catch (err) {
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  const resetForm = () => {
    if (!user) return;
    setForm({
      fullName: user.fullName || "",
      username: user.username || "",
      email: user.email || "",
      phone: user.phone || "",
    });
    setPreview(user.profileImage || "");
    setImageFile(null);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setError("");
    setSuccess("");

    try {
      setSubmitting(true);

      const formData = new FormData();
      formData.append("fullName", form.fullName);
      if (form.username) formData.append("username", form.username);
      formData.append("email", form.email);
      formData.append("phone", form.phone);

      if (imageFile) {
        formData.append("profileImage", imageFile);
      }

      const response = await updateProfile((user?._id || user?.id) as string, formData);
      if (response.success) {
        setSuccess("Profile updated successfully!");
        const mergedUser = {
          ...user,
          ...response.data,
          _id: response.data?._id || response.data?.id || user?._id || user?.id,
          id: response.data?.id || response.data?._id || user?.id || user?._id,
        };

        setUser(mergedUser);
        setForm({
          fullName: mergedUser.fullName || "",
          username: mergedUser.username || "",
          email: mergedUser.email || "",
          phone: mergedUser.phone || "",
        });
        setPreview(mergedUser.profileImage || "");
        setImageFile(null);

        localStorage.setItem("user_data", JSON.stringify(mergedUser));
        await setUserData(mergedUser);
        setIsEditing(false);
      }
    } catch (err: any) {
      setError(err.message || "Failed to update profile");
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
      </div>
    );
  }
  if (!user)
    return (
      <div className="text-center py-8 text-gray-500">Please login first</div>
    );

  return (
    <div className="max-w-4xl mx-auto space-y-6 py-6">
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-green-700">
          {success}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-lg overflow-hidden"
      >
        <div className="h-32 bg-linear-to-r from-orange-400 to-orange-600"></div>

        <div className="px-6 pb-6">
          <div className="flex flex-col items-center -mt-16 mb-6">
            <div className="relative">
              {preview ? (
                <img
                  src={preview}
                  alt={user.fullName}
                  className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                />
              ) : (
                <div className="w-32 h-32 rounded-full bg-linear-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white text-5xl font-bold border-4 border-white shadow-lg">
                  {user.fullName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()}
                </div>
              )}
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mt-4">{user.fullName}</h1>
            <p className="text-orange-600 font-semibold mt-1">Guest Profile</p>

            {isEditing && (
              <div className="mt-4 w-full max-w-sm">
                <label className="block text-sm font-medium text-gray-600 mb-2 text-left">
                  Profile Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
                <p className="text-xs text-gray-500 mt-1 text-left">
                  Leave empty to keep current image
                </p>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-8 border-t border-gray-200">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact Information</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-600">Email</label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                      required
                    />
                  ) : (
                    <p className="text-gray-800">{user.email}</p>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Phone</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                      required
                    />
                  ) : (
                    <p className="text-gray-800">{user.phone || "N/A"}</p>
                  )}
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Account Information</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-600">Full Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={form.fullName}
                      onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                      required
                    />
                  ) : (
                    <p className="text-gray-800">{user.fullName}</p>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Username</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={form.username}
                      onChange={(e) => setForm({ ...form, username: e.target.value })}
                      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  ) : (
                    <p className="text-gray-800">{user.username || "N/A"}</p>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Role</label>
                  <p className="text-gray-800 capitalize">{user.role || "user"}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="py-6 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-600">Member since {formatDate(user.createdAt)}</p>
          </div>
        </div>
      </form>

      <div className="bg-white rounded-lg shadow p-6 text-center">
        <p className="text-gray-600 mb-4">
          {isEditing ? "Update your profile details" : "Manage your profile"}
        </p>
        {isEditing ? (
          <div className="flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => {
                setError("");
                setSuccess("");
                resetForm();
                setIsEditing(false);
              }}
              className="inline-block bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-6 rounded-lg transition"
              disabled={submitting}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => handleSubmit()}
              className="inline-block bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-6 rounded-lg transition disabled:opacity-60"
              disabled={submitting}
            >
              {submitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => {
              setError("");
              setSuccess("");
              resetForm();
              setIsEditing(true);
            }}
            className="inline-block bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-6 rounded-lg transition mr-3"
          >
            Edit Profile
          </button>
        )}
        <Link
          href="/user/dashboard"
          className="inline-block bg-orange-100 hover:bg-orange-200 text-orange-700 font-semibold py-2 px-6 rounded-lg transition"
        >
          ← Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
