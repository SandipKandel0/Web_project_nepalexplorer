"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUserData } from "@/lib/cookies";

interface GuideProfile {
  _id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  username: string;
  imageUrl?: string;
  role: string;
  createdAt: string;
}

export default function GuideProfil() {
  const [profile, setProfile] = useState<GuideProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userData = await getUserData();
        if (userData) {
          setProfile(userData as unknown as GuideProfile);
        }
      } catch (error) {
        console.error("Failed to load profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    // Clear cookies and redirect to login
    document.cookie = "authToken=; max-age=0;";
    document.cookie = "userData=; max-age=0;";
    router.push("/login");
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
        Failed to load profile information.
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      <div className="bg-white rounded-lg shadow-lg p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">My Profile</h1>
          <p className="text-gray-600 mt-2">Guide Account Details</p>
        </div>

        {/* Profile Image */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            {profile.imageUrl ? (
              <img
                src={profile.imageUrl}
                alt={profile.fullName}
                className="w-32 h-32 rounded-full object-cover border-4 border-blue-600"
              />
            ) : (
              <div className="w-32 h-32 rounded-full bg-linear-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-4xl font-bold">
                {profile.fullName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
              </div>
            )}
          </div>
        </div>

        {/* Profile Information */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border-b pb-4">
              <label className="text-sm font-semibold text-gray-600 block mb-2">
                Full Name
              </label>
              <p className="text-lg text-gray-800">{profile.fullName}</p>
            </div>

            <div className="border-b pb-4">
              <label className="text-sm font-semibold text-gray-600 block mb-2">
                Username
              </label>
              <p className="text-lg text-gray-800">@{profile.username}</p>
            </div>

            <div className="border-b pb-4">
              <label className="text-sm font-semibold text-gray-600 block mb-2">
                Email Address
              </label>
              <p className="text-lg text-gray-800">{profile.email}</p>
            </div>

            <div className="border-b pb-4">
              <label className="text-sm font-semibold text-gray-600 block mb-2">
                Phone Number
              </label>
              <p className="text-lg text-gray-800">{profile.phoneNumber}</p>
            </div>

            <div className="border-b pb-4">
              <label className="text-sm font-semibold text-gray-600 block mb-2">
                Account Type
              </label>
              <p className="text-lg text-gray-800">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                  {profile.role === "guide" ? "Guide" : profile.role}
                </span>
              </p>
            </div>

            <div className="border-b pb-4">
              <label className="text-sm font-semibold text-gray-600 block mb-2">
                Member Since
              </label>
              <p className="text-lg text-gray-800">
                {formatDate(profile.createdAt)}
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex gap-4">
          <button
            onClick={() => router.push("/guide/edit-profile")}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition"
          >
            Edit Profile
          </button>
          <button
            onClick={handleLogout}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-lg font-semibold transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Additional Information */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-6">
        <h2 className="text-lg font-semibold text-blue-900 mb-3">
          Guide Information
        </h2>
        <ul className="space-y-2 text-blue-800">
          <li className="flex items-start">
            <span className="mr-3">✓</span>
            <span>You are registered as a guide and can accept booking requests</span>
          </li>
          <li className="flex items-start">
            <span className="mr-3">✓</span>
            <span>View all incoming booking requests in the Booking Requests page</span>
          </li>
          <li className="flex items-start">
            <span className="mr-3">✓</span>
            <span>
              Approve or decline guest requests based on your availability
            </span>
          </li>
          <li className="flex items-start">
            <span className="mr-3">✓</span>
            <span>Update your profile information anytime</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
