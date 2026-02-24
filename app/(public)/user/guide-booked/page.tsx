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

  useEffect(() => {
    const userData = localStorage.getItem("user_data");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
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
        location: destinationParam,
      }));
    }
  }, [destinationParam]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

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

        setTimeout(() => {
          router.push("/user/dashboard");
        }, 1800);
      }
    } catch (err: any) {
      setError(err.message || "Failed to send guide request");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto text-black py-6">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
        <div className="h-28 bg-linear-to-r from-blue-500 to-blue-700"></div>

        <div className="px-6 pb-6 -mt-8">
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm mb-6">
            <h1 className="text-3xl font-bold text-black">Book a Guide</h1>
            <p className="text-black mt-2">
              Fill out your trip details and we will match you with the right local guide.
            </p>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-5">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-5">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8 bg-white border border-gray-200 rounded-xl p-5 md:p-6">
            <section>
              <h3 className="text-lg font-bold text-black mb-4">Your Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-black font-semibold mb-2">Full Name *</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-black font-semibold mb-2">Email Address *</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-black font-semibold mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="Enter your phone number"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-lg font-bold text-black mb-4">Trip Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-black font-semibold mb-2">Destination *</label>
                  <input
                    type="text"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    placeholder="e.g., Kathmandu, Pokhara"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-black font-semibold mb-2">Booking Date *</label>
                  <input
                    type="date"
                    value={form.bookingDate}
                    onChange={(e) => setForm({ ...form, bookingDate: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-black font-semibold mb-2">Trip Duration (days) *</label>
                  <input
                    type="number"
                    min="1"
                    value={form.tripDuration}
                    onChange={(e) =>
                      setForm({ ...form, tripDuration: parseInt(e.target.value) || 1 })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-black font-semibold mb-2">Number of People *</label>
                  <input
                    type="number"
                    min="1"
                    value={form.numberOfPeople}
                    onChange={(e) =>
                      setForm({ ...form, numberOfPeople: parseInt(e.target.value) || 1 })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-black font-semibold mb-2">Preferred Language *</label>
                  <input
                    type="text"
                    value={form.language}
                    onChange={(e) => setForm({ ...form, language: e.target.value })}
                    placeholder="English, Nepali"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-lg font-bold text-black mb-4">Message for Guide</h3>
              <div>
                <label className="block text-black font-semibold mb-2">Trip Notes / Custom Message *</label>
                <textarea
                  value={form.customMessage}
                  onChange={(e) => setForm({ ...form, customMessage: e.target.value })}
                  placeholder="Tell us your interests, pace, places you want to explore, and any special requirements."
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </section>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl disabled:opacity-50 font-semibold transition"
              >
                {submitting ? "Sending Request..." : "Send Booking Request"}
              </button>
              <Link
                href="/user/destinations"
                className="sm:w-auto text-center bg-gray-900 hover:bg-black text-white px-6 py-3 rounded-xl font-semibold transition"
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

export default function GuideBookedPage() {
  return (
    <Suspense fallback={<div className="text-black">Loading...</div>}>
      <GuideBookedForm />
    </Suspense>
  );
}
