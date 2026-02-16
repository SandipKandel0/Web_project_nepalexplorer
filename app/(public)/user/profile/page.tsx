"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getUserData, setUserData } from "@/lib/cookies";
import { updateProfile } from "@/lib/api/auth";

export default function UserProfilePage() {
  const router = useRouter();

  const [user, setUser] = useState<any>(null);
  const [form, setForm] = useState({
    fullName: "",
    username: "",
    email: "",
    phoneNumber: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(true);
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
        setUser(userData.user || userData);
        setForm({
          fullName: userData.user?.fullName || userData.fullName || "",
          username: userData.user?.username || userData.username || "",
          email: userData.user?.email || userData.email || "",
          phoneNumber: userData.user?.phoneNumber || userData.phoneNumber || "",
        });
        if (userData.user?.imageUrl || userData.imageUrl) {
          setPreview(userData.user?.imageUrl || userData.imageUrl);
        }
      } catch (err) {
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      setSubmitting(true);

      const formData = new FormData();
      formData.append("fullName", form.fullName);
      if (form.username) formData.append("username", form.username);
      formData.append("email", form.email);
      formData.append("phone", form.phoneNumber); // Backend expects 'phone'

      if (imageFile) {
        formData.append("profileImage", imageFile); // Backend expects 'profileImage'
      }

      const response = await updateProfile(user._id || user.id, formData);
      if (response.success) {
        setSuccess("Profile updated successfully!");
        // Update localStorage with new user data
        localStorage.setItem("user_data", JSON.stringify(response.data));
        // Update cookies with new user data
        await setUserData(response.data);
        setTimeout(() => {
          setSuccess("");
          window.location.reload();
        }, 1500);
      }
    } catch (err: any) {
      setError(err.message || "Failed to update profile");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (!user)
    return (
      <div className="text-center py-8 text-gray-500">Please login first</div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">My Profile</h1>
        </div>

        <div className="bg-white rounded-lg shadow p-8">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">
                Profile Picture
              </label>
              {preview && (
                <img
                  src={preview}
                  alt="Profile"
                  className="w-32 h-32 rounded-lg mb-4 object-cover"
                />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-sm text-gray-500 mt-1">
                Leave empty to keep current image
              </p>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={form.fullName}
                onChange={(e) =>
                  setForm({ ...form, fullName: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Username
              </label>
              <input
                type="text"
                value={form.username}
                onChange={(e) =>
                  setForm({ ...form, username: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Email
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                value={form.phoneNumber}
                onChange={(e) =>
                  setForm({ ...form, phoneNumber: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={submitting}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded disabled:opacity-50"
              >
                {submitting ? "Updating..." : "Update Profile"}
              </button>
            </div>
          </form>

          <div className="mt-8 pt-8 border-t">
            <h2 className="text-lg font-semibold mb-4">Account Information</h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Role</p>
                <p className="font-semibold">{user?.role || "N/A"}</p>
              </div>
              <div>
                <p className="text-gray-600">Member Since</p>
                <p className="font-semibold">
                  {user?.createdAt
                    ? new Date(user.createdAt).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
