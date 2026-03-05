"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

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

export default function FavouritePage() {
  const [favouriteDestinations, setFavouriteDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);

  useEffect(() => {
    const savedDestinations = localStorage.getItem("favorite_destinations_data");
    if (savedDestinations) {
      try {
        const favorites = JSON.parse(savedDestinations) as Destination[];
        setFavouriteDestinations(favorites);
      } catch {
        localStorage.removeItem("favorite_destinations_data");
      }
    }
    setLoading(false);
  }, []);

  const removeFavouriteDestination = (destinationId: string) => {
    const nextFavorites = favouriteDestinations.filter((destination) => destination._id !== destinationId);
    setFavouriteDestinations(nextFavorites);
    localStorage.setItem("favorite_destinations_data", JSON.stringify(nextFavorites));
    if (selectedDestination?._id === destinationId) {
      setSelectedDestination(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-black">Loading your favourites...</span>
      </div>
    );
  }

  const hasDestinations = favouriteDestinations.length > 0;

  return (
    <div className="max-w-6xl mx-auto text-black py-6">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
        <div className="h-28 bg-linear-to-r from-blue-500 to-blue-700"></div>

        <div className="px-6 pb-6 -mt-8">
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm mb-6">
            <h1 className="text-3xl font-bold text-black mb-2">My Favourite Destinations</h1>
            <p className="text-black">Your saved destinations for quick access.</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            {!hasDestinations ? (
              <div className="text-center py-12">
                <div className="text-5xl mb-4">♡</div>
                <h2 className="text-2xl font-bold text-black mb-2">No Favourite Destinations Yet</h2>
                <p className="text-black mb-6">
                  Browse destinations and click the heart icon to save your favourites.
                </p>
                <Link
                  href="/user/destinations"
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition"
                >
                  Explore Destinations
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favouriteDestinations.map((destination) => (
                  <div
                    key={destination._id}
                    className="bg-white rounded-lg shadow hover:shadow-xl transition overflow-hidden border border-gray-200"
                  >
                    <div className="h-48 overflow-hidden bg-gray-200">
                      {destination.imageUrl ? (
                        <img
                          src={getImageUrl(destination.imageUrl)}
                          alt={destination.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-black">No image</div>
                      )}
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-bold text-black mb-1">{destination.name}</h3>
                      <p className="text-sm text-black mb-2">{destination.location}</p>
                      <p className="text-black text-sm mb-4">{destination.description || "No description available."}</p>

                      <div className="flex gap-2">
                        <Link
                          href={`/user/guide-booked?destination=${encodeURIComponent(destination.name)}`}
                          className="flex-1 text-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition"
                        >
                          Book Guide
                        </Link>
                        <button
                          onClick={() => setSelectedDestination(destination)}
                          className="px-4 py-2 bg-gray-900 hover:bg-black text-white rounded-lg font-semibold transition"
                          title="Details"
                        >
                          Details
                        </button>
                        <button
                          onClick={() => removeFavouriteDestination(destination._id)}
                          className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg font-semibold transition"
                          title="Remove from favourites"
                        >
                          ♥
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {selectedDestination && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto text-black">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
              <h2 className="text-3xl font-bold text-black">{selectedDestination.name}</h2>
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
                        key={`fav-modal-activity-${index}`}
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
                      <div key={`fav-nearby-${index}`} className="bg-gray-100 rounded-lg p-3">
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
                      <div key={`fav-hotel-${index}`} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <h4 className="font-bold text-black text-lg">{hotel.name}</h4>
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
