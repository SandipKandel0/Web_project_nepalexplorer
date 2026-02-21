"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { setUserData } from "@/lib/cookies";
import { updateGuideProfile } from "@/lib/api/auth";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5050/api";
const BACKEND_BASE_URL = API_BASE_URL.replace(/\/api\/?$/, "");

const getImageUrl = (imagePath?: string) => {
  if (!imagePath) return "";
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://") || imagePath.startsWith("data:")) {
    return imagePath;
  }
  if (imagePath.startsWith("/uploads")) {
    return `${BACKEND_BASE_URL}${imagePath}`;
  }
  return `${BACKEND_BASE_URL}/uploads/${imagePath}`;
};

interface GuideProfile {
  id?: string;
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
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    language: "",
    experience: "",
    city: "",
    bio: "",
  });
  const [loading, setLoading] = useState(true);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const guideData = localStorage.getItem("guide_data");
        if (guideData) {
          const parsed = JSON.parse(guideData);
          setProfile(parsed);
          setPreviewImage(getImageUrl(parsed.profileImage));
          setForm({
            fullName: parsed.fullName || "",
            email: parsed.email || "",
            phone: parsed.phone || "",
            language: parsed.language || "",
            experience: parsed.experience || "",
            city: parsed.city || "",
            bio: parsed.bio || "",
          });
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

  const resetForm = () => {
    if (!profile) return;
    setImageFile(null);
    setPreviewImage(getImageUrl(profile.profileImage));
    setForm({
      fullName: profile.fullName || "",
      email: profile.email || "",
      phone: profile.phone || "",
      language: profile.language || "",
      experience: profile.experience || "",
      city: profile.city || "",
      bio: profile.bio || "",
    });
  };

  const handleCancel = () => {
    resetForm();
    setError("");
    setSuccess("");
    setIsEditing(false);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    const reader = new FileReader();
    reader.onload = (event) => {
      setPreviewImage(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!profile) return;

    setError("");
    setSuccess("");

    try {
      setSubmitting(true);
      const formData = new FormData();
      formData.append("fullName", form.fullName);
      formData.append("email", form.email);
      formData.append("phone", form.phone);
      formData.append("language", form.language);
      formData.append("experience", form.experience);
      formData.append("city", form.city);
      formData.append("bio", form.bio);
      if (imageFile) {
        formData.append("profileImage", imageFile);
      }

      const guideId = profile._id || profile.id;
      if (!guideId) {
        throw new Error("Guide ID is missing");
      }

      const response = await updateGuideProfile(guideId, formData);
      const updatedGuide = response?.data || {};

      const mergedProfile = {
        ...profile,
        ...updatedGuide,
        _id: updatedGuide._id || updatedGuide.id || profile._id || profile.id,
        id: updatedGuide.id || updatedGuide._id || profile.id || profile._id,
      } as GuideProfile;

      setProfile(mergedProfile);
      setForm({
        fullName: mergedProfile.fullName || "",
        email: mergedProfile.email || "",
        phone: mergedProfile.phone || "",
        language: mergedProfile.language || "",
        experience: mergedProfile.experience || "",
        city: mergedProfile.city || "",
        bio: mergedProfile.bio || "",
      });
      setImageFile(null);
      setPreviewImage(getImageUrl(mergedProfile.profileImage));

      const existingGuideData = localStorage.getItem("guide_data");
      const parsedExistingGuideData = existingGuideData
        ? JSON.parse(existingGuideData)
        : {};
      const updatedGuideData = {
        ...parsedExistingGuideData,
        ...mergedProfile,
        role: "guide",
      };

      localStorage.setItem("guide_data", JSON.stringify(updatedGuideData));
      localStorage.setItem("user_data", JSON.stringify(updatedGuideData));
      await setUserData(updatedGuideData);

      setSuccess("Profile updated successfully!");
      setIsEditing(false);
    } catch (err: any) {
      setError(err.message || "Failed to update guide profile");
    } finally {
      setSubmitting(false);
    }
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

      {/* Profile Card */}
      <form
        onSubmit={handleSave}
        className="bg-white rounded-lg shadow-lg overflow-hidden"
      >
        {/* Header Background */}
        <div className="h-32 bg-linear-to-r from-orange-400 to-orange-600"></div>

        {/* Profile Content */}
        <div className="px-6 pb-6">
          {/* Profile Image and Name */}
          <div className="flex flex-col items-center -mt-16 mb-6">
            <div className="relative">
              {previewImage || profile.profileImage ? (
                <img
                  src={previewImage || profile.profileImage}
                  alt={profile.fullName}
                  className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                />
              ) : (
                <div className="w-32 h-32 rounded-full bg-linear-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white text-5xl font-bold border-4 border-white shadow-lg">
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
                  {isEditing ? (
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                      required
                    />
                  ) : (
                    <p className="text-gray-800">{profile.email}</p>
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
                    <p className="text-gray-800">{profile.phone}</p>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">City</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={form.city}
                      onChange={(e) => setForm({ ...form, city: e.target.value })}
                      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                      required
                    />
                  ) : (
                    <p className="text-gray-800">{profile.city}</p>
                  )}
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
                  {isEditing ? (
                    <input
                      type="text"
                      value={form.language}
                      onChange={(e) => setForm({ ...form, language: e.target.value })}
                      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                      required
                    />
                  ) : (
                    <p className="text-gray-800">{profile.language}</p>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Experience</label>
                  {isEditing ? (
                    <select
                      value={form.experience}
                      onChange={(e) => setForm({ ...form, experience: e.target.value })}
                      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                      required
                    >
                      <option value="">Select experience</option>
                      <option value="1-3">1-3 years</option>
                      <option value="3-5">3-5 years</option>
                      <option value="5-10">5-10 years</option>
                      <option value="10+">10+ years</option>
                    </select>
                  ) : (
                    <p className="text-gray-800">{profile.experience} years</p>
                  )}
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
          {(profile.bio || isEditing) && (
            <div className="py-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Bio</h3>
              {isEditing ? (
                <textarea
                  value={form.bio}
                  onChange={(e) => setForm({ ...form, bio: e.target.value })}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Tell travelers about yourself"
                />
              ) : (
                <p className="text-gray-700">{profile.bio}</p>
              )}
            </div>
          )}

          {isEditing && (
            <div className="py-6 border-t border-gray-200">
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
          )}
        </div>
      </form>

      {/* Action Buttons */}
      <div className="bg-white rounded-lg shadow p-6 text-center">
        <p className="text-gray-600 mb-4">
          {isEditing ? "Update your profile details" : "Manage your guide profile"}
        </p>
        {isEditing ? (
          <div className="flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={handleCancel}
              className="inline-block bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-6 rounded-lg transition"
              disabled={submitting}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
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
          href="/guide/dashboard"
          className="inline-block bg-orange-100 hover:bg-orange-200 text-orange-700 font-semibold py-2 px-6 rounded-lg transition"
        >
          ← Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
