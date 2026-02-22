"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { getPublicDestinations } from "@/lib/api/destinations";

interface Destination {
  _id: string;
  name: string;
  location: string;
  description?: string;
  imageUrl?: string;
  activities?: string[];
  bestTime?: string;
  difficulty?: string;
  fullDescription?: string;
  nearbyPlaces?: string[];
  popularHotels?: { name: string }[];
}

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

export default function DestinationsPage() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        setLoading(true);
        const response = await getPublicDestinations();
        console.log("Destinations API Response:", response);
        console.log("First destination data:", response.data?.[0]);
        setDestinations(response.data || []);
        setError("");
      } catch (err: any) {
        console.error("Error fetching destinations:", err);
        setError(err.message || "Failed to fetch destinations");
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  const filteredDestinations = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return destinations;

    return destinations.filter((destination) => {
      return (
        destination.name.toLowerCase().includes(query) ||
        destination.location.toLowerCase().includes(query) ||
        destination.description?.toLowerCase().includes(query)
      );
    });
  }, [destinations, searchQuery]);

  return (
    <div className="text-black">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-black mb-2">Explore Destinations</h1>
        <p className="text-black">
          Discover amazing places and book a local guide for your adventure
        </p>
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <label className="block text-sm font-semibold text-black mb-2">
          Search Destinations
        </label>
        <input
          type="text"
          placeholder="Search by name, location, or description"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
        />
      </div>

      {loading && (
        <div className="text-center py-8 text-black">Loading destinations...</div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {!loading && filteredDestinations.length === 0 && (
        <div className="text-center py-12 text-black">No destinations found.</div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDestinations.map((destination) => (
          <div
            key={destination._id}
            className="bg-white rounded-lg shadow hover:shadow-xl transition overflow-hidden"
          >
            <div className="h-48 overflow-hidden bg-gray-200">
              {destination.imageUrl ? (
                <img
                  src={getImageUrl(destination.imageUrl)}
                  alt={destination.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-black">
                  No image
                </div>
              )}
            </div>

            <div className="p-6 text-black">
              <h3 className="text-xl font-bold text-black mb-2">
                {destination.name}
              </h3>
              <p className="text-sm text-black mb-3">{destination.location}</p>
              <p className="text-sm text-black mb-4">
                {destination.description || "No description available."}
              </p>

              {destination.activities && destination.activities.length > 0 && (
                <div className="mb-4 flex flex-wrap gap-2">
                  {destination.activities.map((activity, index) => (
                    <span
                      key={`${destination._id}-activity-${index}`}
                      className="px-3 py-1 bg-gray-200 text-black text-xs rounded-full"
                    >
                      {activity}
                    </span>
                  ))}
                </div>
              )}

              {(destination.bestTime || destination.difficulty) && (
                <div className="flex items-center justify-between text-sm mb-4">
                  {destination.bestTime && (
                    <div>
                      <span className="text-black">Best Time:</span>
                      <span className="ml-1 font-semibold text-black">
                        {destination.bestTime}
                      </span>
                    </div>
                  )}
                  {destination.difficulty && (
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-200 text-black">
                      {destination.difficulty}
                    </span>
                  )}
                </div>
              )}

              <div className="flex gap-2">
                <Link
                  href={`/user/guide-booked?destination=${encodeURIComponent(destination.name)}`}
                  className="flex-1 text-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition"
                >
                  Book a Guide
                </Link>
                <button
                  onClick={() => {
                    console.log("Selected destination:", destination);
                    console.log("Activities:", destination.activities);
                    console.log("Nearby Places:", destination.nearbyPlaces);
                    console.log("Hotels:", destination.popularHotels);
                    setSelectedDestination(destination);
                  }}
                  className="px-4 py-2 bg-gray-900 hover:bg-black text-white rounded-lg font-semibold transition"
                  title="Learn more"
                >
                  Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedDestination && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto text-black">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
              <h2 className="text-3xl font-bold text-black">
                {selectedDestination.name}
              </h2>
              <button
                onClick={() => setSelectedDestination(null)}
                className="text-black border border-gray-300 rounded-full w-10 h-10 flex items-center justify-center"
              >
                x
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <h3 className="text-xl font-bold text-black mb-3">About This Destination</h3>
                <p className="text-black leading-relaxed">
                  {selectedDestination.fullDescription || selectedDestination.description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedDestination.bestTime && (
                  <div className="bg-gray-100 rounded-lg p-4">
                    <h4 className="font-semibold text-black mb-2">Best Time to Visit</h4>
                    <p className="text-black">{selectedDestination.bestTime}</p>
                  </div>
                )}
                {selectedDestination.difficulty && (
                  <div className="bg-gray-100 rounded-lg p-4">
                    <h4 className="font-semibold text-black mb-2">Difficulty Level</h4>
                    <p className="text-black">{selectedDestination.difficulty}</p>
                  </div>
                )}
              </div>

              {selectedDestination.activities && selectedDestination.activities.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold text-black mb-3">Activities & Things to Do</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedDestination.activities.map((activity, index) => (
                      <span
                        key={`modal-activity-${index}`}
                        className="px-4 py-2 bg-gray-200 text-black rounded-full text-sm font-semibold"
                      >
                        {activity}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {selectedDestination.nearbyPlaces && selectedDestination.nearbyPlaces.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold text-black mb-3">Nearby Places</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {selectedDestination.nearbyPlaces.map((place, index) => (
                      <div key={`nearby-${index}`} className="bg-gray-100 rounded-lg p-3">
                        <p className="text-black font-semibold">{place}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedDestination.popularHotels && selectedDestination.popularHotels.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold text-black mb-3">Popular Hotels</h3>
                  <div className="space-y-3">
                    {selectedDestination.popularHotels.map((hotel, index) => (
                      <div key={`hotel-${index}`} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-bold text-black text-lg">{hotel.name}</h4>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <Link
                  href={`/user/guide-booked?destination=${encodeURIComponent(selectedDestination.name)}`}
                  className="flex-1 text-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition"
                >
                  Book Guide for {selectedDestination.name}
                </Link>
                <button
                  onClick={() => setSelectedDestination(null)}
                  className="flex-1 bg-gray-900 hover:bg-black text-white font-bold py-3 rounded-lg transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
