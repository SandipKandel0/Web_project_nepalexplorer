"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUserData, setUserData } from "@/lib/cookies";
import { guideApi } from "@/lib/api/guide";

export default function GuideEditProfilePage() {
  const router = useRouter();
  const [guide, setGuide] = useState<any>(null);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    language: "",
    experience: "",
    city: "",
    bio: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchGuide = async () => {
      try {
        const userData = await getUserData();
        if (!userData) {
          router.push("/login");
          return;
        }

        const currentGuide = userData.user || userData;
        setGuide(currentGuide);
        setForm({
          fullName: currentGuide.fullName || "",
          email: currentGuide.email || "",
          phone: currentGuide.phone || currentGuide.phoneNumber || "",
          language: currentGuide.language || "",
          experience: currentGuide.experience || "",
          city: currentGuide.city || "",
          bio: currentGuide.bio || "",
        });
        if (currentGuide.profileImage) {
          setPreview(currentGuide.profileImage);
        }
      } catch (_err) {
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchGuide();
  }, [router]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }

    setImageFile(file);
    const reader = new FileReader();
    reader.onload = (event) => {
      setPreview(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!guide?._id && !guide?.id) {
      setError("Guide ID not found. Please login again.");
      return;
    }

    try {
      setSubmitting(true);
      const payload = new FormData();
      payload.append("fullName", form.fullName);
      payload.append("email", form.email);
      payload.append("phone", form.phone);
      payload.append("language", form.language);
      payload.append("experience", form.experience);
      payload.append("city", form.city);
      payload.append("bio", form.bio);

      if (imageFile) {
        payload.append("profileImage", imageFile);
      }

      const response = await guideApi.updateGuideProfile(guide._id || guide.id, payload);

      if (response.success) {
        setSuccess("Profile updated successfully!");
        const updatedGuide = response.data;
        localStorage.setItem("guide_data", JSON.stringify(updatedGuide));
        localStorage.setItem("user_data", JSON.stringify(updatedGuide));
        await setUserData(updatedGuide);

        setTimeout(() => {
          router.push("/guide/profile");
        }, 800);
      }
    } catch (err: any) {
      setError(err.message || "Failed to update guide profile");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Guide Profile</h1>

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
            <label className="block text-gray-700 font-semibold mb-2">Profile Picture</label>
            {preview && (
              <img
                src={preview}
                alt="Guide profile"
                className="w-28 h-28 rounded-lg object-cover mb-3"
              />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-4 py-2 border border-gray-300 rounded"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Full Name</label>
              <input
                type="text"
                value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Phone</label>
              <input
                type="text"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Language</label>
              <input
                type="text"
                value={form.language}
                onChange={(e) => setForm({ ...form, language: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Experience</label>
              <input
                type="text"
                value={form.experience}
                onChange={(e) => setForm({ ...form, experience: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">City</label>
              <input
                type="text"
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded"
                required
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-gray-700 font-semibold mb-2">Bio</label>
            <textarea
              value={form.bio}
              onChange={(e) => setForm({ ...form, bio: e.target.value })}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded"
            />
          </div>

          <div className="flex gap-3 mt-6">
            <button
              type="submit"
              disabled={submitting}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded disabled:opacity-60"
            >
              {submitting ? "Updating..." : "Save Changes"}
            </button>
            <button
              type="button"
              onClick={() => router.push("/guide/profile")}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
