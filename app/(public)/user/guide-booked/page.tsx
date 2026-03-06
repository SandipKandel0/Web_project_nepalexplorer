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
    name: "",
    email: "",
    phone: "",
    destination: destinationParam || "",
    bookingDate: "",
    tripDuration: 1,
    location: destinationParam || "",
    numberOfPeople: 1,
    language: "",
    customMessage: "",
  });

  const [user, setUser] = useState<any>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch user data
  useEffect(() => {
    const userData = localStorage.getItem("user_data");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      // Pre-fill form with user data
      setForm((prev) => ({
        ...prev,
        name: parsedUser.fullName || "",
        email: parsedUser.email || "",
        phone: parsedUser.phone || parsedUser.phoneNumber || "",
      }));
    }
  }, []);

  useEffect(() => {
    if (destinationParam) {
      setForm((prev) => ({ 
        ...prev, 
        destination: destinationParam,
        location: destinationParam 
      }));
    }
  }, [destinationParam]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validate form
    if (
      !form.name ||
      !form.email ||
      !form.phone ||
      !form.bookingDate ||
      !form.location ||
      !form.language ||
      !form.customMessage
    ) {
      setError("Please fill in all required fields");
      return;
    }

    try {
      setSubmitting(true);

      const guideRequestData = {
        guestName: form.name,
        guestEmail: form.email,
        guestPhone: form.phone,
        tripDate: form.bookingDate,
        duration: form.tripDuration,
        location: form.location,
        numberOfPeople: form.numberOfPeople,
        language: form.language,
        customMessage: form.customMessage,
      };

      const response = await createGuideRequest(guideRequestData);

      if (response.success) {
        setSuccess("Guide request sent successfully!");
        setForm({
          name: user?.fullName || "",
          email: user?.email || "",
          phone: user?.phone || user?.phoneNumber || "",
          destination: "",
          bookingDate: "",
          tripDuration: 1,
          location: "",
          numberOfPeople: 1,
          language: "",
          customMessage: "",
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
          {/* Name */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Full Name *
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Enter your full name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Email Address *
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Phone Number *
            </label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="Enter your phone number"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Destination */}
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

          {/* Booking Date */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Booking Date *
            </label>
            <input
              type="date"
              value={form.bookingDate}
              onChange={(e) => setForm({ ...form, bookingDate: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Trip Duration */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Trip Duration (days) *
              </label>
              <input
                type="number"
                min="1"
                value={form.tripDuration}
                onChange={(e) =>
                  setForm({ ...form, tripDuration: parseInt(e.target.value) || 1 })
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
                  setForm({ ...form, numberOfPeople: parseInt(e.target.value) || 1 })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          {/* Language */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Preferred Language *
            </label>
            <input
              type="text"
              value={form.language}
              onChange={(e) => setForm({ ...form, language: e.target.value })}
              placeholder="e.g., English, Nepali, Hindi"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Custom Message */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Custom Message *
            </label>
            <textarea
              value={form.customMessage}
              onChange={(e) => setForm({ ...form, customMessage: e.target.value })}
              placeholder="Tell us about your trip, interests, special requirements, and expectations..."
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
