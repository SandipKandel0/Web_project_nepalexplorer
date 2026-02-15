"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createGuideRequest } from "@/lib/api/guide";
import Link from "next/link";

function GuideBookedForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const destinationParam = searchParams.get("destination");

  const [form, setForm] = useState({
    tripDate: "",
    duration: 1,
    location: destinationParam || "",
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
    const userData = localStorage.getItem("user_data");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  useEffect(() => {
    if (destinationParam) {
      setForm((prev) => ({ ...prev, location: destinationParam }));
    }
  }, [destinationParam]);

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
    <div>
      <div className="mb-6">
        <Link
          href="/user/destinations"
          className="text-blue-600 hover:text-blue-800 font-semibold"
        >
          ← Back to Destinations
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow p-8 max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">📋 Book a Guide</h1>
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

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Guide ID */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Select Guide ID *
            </label>
            <input
              type="text"
              value={form.guideId}
              onChange={(e) => setForm({ ...form, guideId: e.target.value })}
              placeholder="Enter guide ID"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <p className="text-sm text-gray-500 mt-1">
              Browse available guides to find their ID
            </p>
          </div>

          {/* Trip Date */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Trip Date *
            </label>
            <input
              type="datetime-local"
              value={form.tripDate}
              onChange={(e) => setForm({ ...form, tripDate: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Duration */}
            <div>
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Number of People */}
            <div>
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Destination *
            </label>
            <input
              type="text"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              placeholder="e.g., Kathmandu, Pokhara, Everest Base Camp"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Budget */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Budget (per day in USD) *
            </label>
            <input
              type="number"
              min="1"
              value={form.budget}
              onChange={(e) =>
                setForm({ ...form, budget: parseFloat(e.target.value) })
              }
              placeholder="e.g., 100"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Trip Description *
            </label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Describe your trip, interests, and expectations..."
              rows={5}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg disabled:opacity-50 font-semibold transition"
            >
              {submitting ? "Sending Request..." : "Send Booking Request"}
            </button>
            <Link
              href="/user/destinations"
              className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition flex items-center justify-center"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function GuideBookedPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <GuideBookedForm />
    </Suspense>
  );
}
