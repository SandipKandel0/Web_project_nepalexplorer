"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createGuideRequest } from "@/lib/api/guide";
import { getUserData } from "@/lib/cookies";
import Link from "next/link";

export default function GuideBookingPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    tripDate: "",
    duration: 1,
    location: "",
    description: "",
    budget: 0,
    numberOfPeople: 1,
    guideId: "",
  });

  const [user, setUser] = useState<any>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUserData();
        setUser(userData.user || userData);
      } catch (err) {
        console.error("Failed to fetch user");
      }
    };
    fetchUser();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validate form
    if (
      !form.tripDate ||
      !form.location ||
      !form.description ||
      !form.budget ||
      !form.guideId
    ) {
      setError("Please fill in all required fields");
      return;
    }

    try {
      setSubmitting(true);

      const guideRequestData = {
        ...form,
        tripDate: new Date(form.tripDate).toISOString(),
        guideId: form.guideId,
        guestName: user?.fullName || "Guest",
      };

      const response = await createGuideRequest(guideRequestData);

      if (response.success) {
        setSuccess("Guide request sent successfully!");
        setForm({
          tripDate: "",
          duration: 1,
          location: "",
          description: "",
          budget: 0,
          numberOfPeople: 1,
          guideId: "",
        });

        // Redirect after delay
        setTimeout(() => {
          router.push("/user/dashboard");
        }, 2000);
      }
    } catch (err: any) {
      setError(err.message || "Failed to send guide request");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-orange-50 via-amber-50 to-white py-8 px-4">
      <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link href="/user/dashboard" className="inline-flex items-center gap-2 rounded-full bg-white border border-orange-200 px-4 py-2 text-orange-700 hover:bg-orange-100 font-semibold transition">
          <span>←</span>
          <span>Back to Dashboard</span>
        </Link>
      </div>

      <div className="bg-white/95 backdrop-blur rounded-3xl shadow-xl border border-orange-100 p-8 max-w-3xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Request a Guide</h1>
        <p className="text-gray-600 mb-6">
          Fill in the details below to request a personal guide for your trip
        </p>

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
          {/* Guide ID */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Select Guide *
            </label>
            <input
              type="text"
              value={form.guideId}
              onChange={(e) => setForm({ ...form, guideId: e.target.value })}
              placeholder="Enter guide ID (e.g., userId from profile)"
              className="w-full px-4 py-3 border border-orange-200 rounded-xl bg-orange-50/40 focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
            <p className="text-sm text-gray-500 mt-1">
              You can find guide ID from their profile
            </p>
          </div>

          {/* Trip Date */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Trip Date *
            </label>
            <input
              type="datetime-local"
              value={form.tripDate}
              onChange={(e) => setForm({ ...form, tripDate: e.target.value })}
              className="w-full px-4 py-3 border border-orange-200 rounded-xl bg-orange-50/40 focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
          </div>

          {/* Duration */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Duration (days) *
            </label>
            <input
              type="number"
              min="1"
              value={form.duration}
              onChange={(e) =>
                setForm({ ...form, duration: parseInt(e.target.value) })
              }
              className="w-full px-4 py-3 border border-orange-200 rounded-xl bg-orange-50/40 focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
          </div>

          {/* Location */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Location *
            </label>
            <input
              type="text"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              placeholder="e.g., Kathmandu, Pokhara"
              className="w-full px-4 py-3 border border-orange-200 rounded-xl bg-orange-50/40 focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
          </div>

          {/* Number of People */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Number of People *
            </label>
            <input
              type="number"
              min="1"
              value={form.numberOfPeople}
              onChange={(e) =>
                setForm({ ...form, numberOfPeople: parseInt(e.target.value) })
              }
              className="w-full px-4 py-3 border border-orange-200 rounded-xl bg-orange-50/40 focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
          </div>

          {/* Budget */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Budget (per day in USD) *
            </label>
            <input
              type="number"
              min="1"
              value={form.budget}
              onChange={(e) => setForm({ ...form, budget: parseFloat(e.target.value) })}
              placeholder="e.g., 100"
              className="w-full px-4 py-3 border border-orange-200 rounded-xl bg-orange-50/40 focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
          </div>

          {/* Description */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">
              Trip Description *
            </label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Describe your trip, interests, and expectations..."
              rows={5}
              className="w-full px-4 py-3 border border-orange-200 rounded-xl bg-orange-50/40 focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={submitting}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-xl disabled:opacity-50 font-semibold"
            >
              {submitting ? "Sending..." : "Send Request"}
            </button>
            <Link
              href="/user/dashboard"
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-xl font-semibold"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
      </div>
    </div>
  );
}
