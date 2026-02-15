"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface GuideProfile {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  language: string;
  experience: string;
  city: string;
  bio?: string;
  profileImage?: string;
  rating?: number;
  createdAt: string;
}

export default function GuideProfile() {
  const [profile, setProfile] = useState<GuideProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const guideData = localStorage.getItem("guide_data");
        if (guideData) {
          const parsed = JSON.parse(guideData);
          setProfile(parsed);
        } else {
          router.push("/login/guide");
        }
      } catch (error) {
        console.error("Failed to load profile:", error);
        router.push("/login/guide");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [router]);

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
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
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
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Profile Card */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header Background */}
        <div className="h-32 bg-gradient-to-r from-orange-400 to-orange-600"></div>

        {/* Profile Content */}
        <div className="px-6 pb-6">
          {/* Profile Image and Name */}
          <div className="flex flex-col items-center -mt-16 mb-6">
            <div className="relative">
              {profile.profileImage ? (
                <img
                  src={profile.profileImage}
                  alt={profile.fullName}
                  className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                />
              ) : (
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white text-5xl font-bold border-4 border-white shadow-lg">
                  {profile.fullName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()}
                </div>
              )}
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mt-4">
              {profile.fullName}
            </h1>
            <p className="text-orange-600 font-semibold mt-1">Professional Guide</p>
          </div>

          {/* Guide Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-8 border-t border-gray-200">
            {/* Contact Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Contact Information
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-600">Email</label>
                  <p className="text-gray-800">{profile.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Phone</label>
                  <p className="text-gray-800">{profile.phone}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">City</label>
                  <p className="text-gray-800">{profile.city}</p>
                </div>
              </div>
            </div>

            {/* Professional Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Professional Information
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-600">Language</label>
                  <p className="text-gray-800">{profile.language}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Experience</label>
                  <p className="text-gray-800">{profile.experience} years</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Rating</label>
                  <p className="text-gray-800">
                    {profile.rating ? `${profile.rating} ⭐` : "No ratings yet"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bio Section */}
          {profile.bio && (
            <div className="py-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Bio</h3>
              <p className="text-gray-700">{profile.bio}</p>
            </div>
          )}

          {/* Member Since */}
          <div className="py-6 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-600">
              Member since {formatDate(profile.createdAt)}
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="bg-white rounded-lg shadow p-6 text-center">
        <p className="text-gray-600 mb-4">Profile information is read-only</p>
        <Link
          href="/guide/dashboard"
          className="inline-block bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-6 rounded-lg transition"
        >
          ← Back to Dashboard
        </Link>
      </div>
    </div>
  );
}

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
