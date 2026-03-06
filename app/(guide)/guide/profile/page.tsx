"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUserData, setUserData } from "@/lib/cookies";
import { guideApi } from "@/lib/api/guide";

export default function GuideProfilePage() {
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
      }
    } catch (err: any) {
      setError(err.message || "Failed to update guide profile");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8 text-black">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-orange-50 py-8">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-orange-200">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-orange-700">Guide Profile</h1>
          </div>

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
            <div className="mb-8 rounded-2xl border border-orange-200 bg-linear-to-br from-orange-50 to-white p-6">
              <div className="flex flex-col items-center text-center">
                {preview ? (
                  <img
                    src={preview}
                    alt="Guide profile"
                    className="w-36 h-36 rounded-full object-cover border-4 border-orange-400 shadow-md mb-3"
                  />
                ) : (
                  <div className="w-36 h-36 rounded-full bg-orange-200 text-orange-700 flex items-center justify-center text-4xl font-bold border-4 border-orange-400 shadow-md mb-3">
                    {form.fullName
                      ? form.fullName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .slice(0, 2)
                          .toUpperCase()
                      : "G"}
                  </div>
                )}

                <h2 className="text-xl font-bold text-black mb-4">{form.fullName || "Guide Profile"}</h2>

                <label
                  htmlFor="guideProfileImage"
                  className="cursor-pointer rounded-lg bg-orange-500 px-4 py-2 text-white font-semibold hover:bg-orange-600 transition"
                >
                  Change Photo
                </label>
                <input
                  id="guideProfileImage"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
            </div>

            <div className="rounded-2xl border border-orange-100 bg-white p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-black font-semibold mb-2">Full Name</label>
                <input
                  type="text"
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  className="w-full px-4 py-2 border border-orange-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400 text-black"
                  required
                />
              </div>

              <div>
                <label className="block text-black font-semibold mb-2">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-2 border border-orange-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400 text-black"
                  required
                />
              </div>

              <div>
                <label className="block text-black font-semibold mb-2">Phone</label>
                <input
                  type="text"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-4 py-2 border border-orange-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400 text-black"
                  required
                />
              </div>

              <div>
                <label className="block text-black font-semibold mb-2">Language</label>
                <input
                  type="text"
                  value={form.language}
                  onChange={(e) => setForm({ ...form, language: e.target.value })}
                  className="w-full px-4 py-2 border border-orange-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400 text-black"
                  required
                />
              </div>

              <div>
                <label className="block text-black font-semibold mb-2">Experience</label>
                <input
                  type="text"
                  value={form.experience}
                  onChange={(e) => setForm({ ...form, experience: e.target.value })}
                  className="w-full px-4 py-2 border border-orange-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400 text-black"
                  required
                />
              </div>

              <div>
                <label className="block text-black font-semibold mb-2">City</label>
                <input
                  type="text"
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  className="w-full px-4 py-2 border border-orange-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400 text-black"
                  required
                />
              </div>
              </div>

              <div className="mt-4">
                <label className="block text-black font-semibold mb-2">Bio</label>
                <textarea
                  value={form.bio}
                  onChange={(e) => setForm({ ...form, bio: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 border border-orange-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400 text-black"
                />
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded disabled:opacity-60"
                >
                  {submitting ? "Updating..." : "Update Profile"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
