"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface FavouriteGuide {
  _id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  imageUrl?: string;
  specialization?: string;
  rating?: number;
  reviews?: number;
  addedDate: string;
}

interface Destination {
  id: number;
  name: string;
  description: string;
  image: string;
  activities: string[];
  bestTime: string;
  difficulty: string;
}

const allDestinations: Destination[] = [
  {
    id: 1,
    name: "Kathmandu Valley",
    description: "Explore ancient temples, palaces, and vibrant markets in Nepal's capital",
    image: "/images/kathmandu.jpg",
    activities: ["Temple Tours", "Cultural Tours", "Food Tours"],
    bestTime: "Oct - Nov, Mar - Apr",
    difficulty: "Easy",
  },
  {
    id: 2,
    name: "Pokhara",
    description: "Lakeside paradise with stunning mountain views and adventure activities",
    image: "/images/pokhara.jpg",
    activities: ["Paragliding", "Boating", "Mountain Views"],
    bestTime: "Oct - Nov, Mar - May",
    difficulty: "Easy to Moderate",
  },
  {
    id: 3,
    name: "Everest Base Camp",
    description: "Trek to the base of the world's highest mountain",
    image: "/images/everest.jpg",
    activities: ["Trekking", "Mountain Views", "Photography"],
    bestTime: "Mar - May, Sep - Nov",
    difficulty: "Challenging",
  },
  {
    id: 4,
    name: "Chitwan National Park",
    description: "Wildlife safari and jungle adventures in Nepal's first national park",
    image: "/images/chitwan.jpg",
    activities: ["Wildlife Safari", "Jungle Walk", "Canoeing"],
    bestTime: "Oct - Mar",
    difficulty: "Easy",
  },
  {
    id: 5,
    name: "Annapurna Circuit",
    description: "One of the world's best trekking routes with diverse landscapes",
    image: "/images/annapurna.jpg",
    activities: ["Trekking", "Mountain Views", "Cultural Experience"],
    bestTime: "Mar - May, Oct - Nov",
    difficulty: "Moderate to Challenging",
  },
  {
    id: 6,
    name: "Lumbini",
    description: "Birthplace of Lord Buddha and UNESCO World Heritage Site",
    image: "/images/lumbini.jpg",
    activities: ["Temple Tours", "Meditation", "Cultural Tours"],
    bestTime: "Oct - Mar",
    difficulty: "Easy",
  },
];

export default function FavouritePage() {
  const [favouriteGuides, setFavouriteGuides] = useState<FavouriteGuide[]>([]);
  const [favouriteDestinations, setFavouriteDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"destinations" | "guides">("destinations");

  useEffect(() => {
    // Load favorite destinations from localStorage
    const savedDestinations = localStorage.getItem("favorite_destinations");
    if (savedDestinations) {
      const favoriteIds = JSON.parse(savedDestinations);
      const favorites = allDestinations.filter((dest) => favoriteIds.includes(dest.id));
      setFavouriteDestinations(favorites);
    }

    // Load favorite guides (simulated - in real app, fetch from API)
    setFavouriteGuides([]);
    setLoading(false);
  }, []);

  const removeFavouriteGuide = (guideId: string) => {
    setFavouriteGuides(favouriteGuides.filter((guide) => guide._id !== guideId));
  };

  const removeFavouriteDestination = (destinationId: number) => {
    const savedDestinations = localStorage.getItem("favorite_destinations");
    if (savedDestinations) {
      const favoriteIds = JSON.parse(savedDestinations);
      const newFavorites = favoriteIds.filter((id: number) => id !== destinationId);
      localStorage.setItem("favorite_destinations", JSON.stringify(newFavorites));
      setFavouriteDestinations(favouriteDestinations.filter((dest) => dest.id !== destinationId));
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-gray-600">Loading your favourites...</span>
      </div>
    );
  }

  const hasDestinations = favouriteDestinations.length > 0;
  const hasGuides = favouriteGuides.length > 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">❤️ My Favourites</h1>
        <p className="text-gray-600">
          Your saved destinations and guides for quick access
        </p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow">
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab("destinations")}
            className={`flex-1 py-4 px-6 font-semibold transition ${
              activeTab === "destinations"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-blue-600"
            }`}
          >
            🗺️ Destinations ({favouriteDestinations.length})
          </button>
          <button
            onClick={() => setActiveTab("guides")}
            className={`flex-1 py-4 px-6 font-semibold transition ${
              activeTab === "guides"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-blue-600"
            }`}
          >
            👤 Guides ({favouriteGuides.length})
          </button>
        </div>

        <div className="p-6">
          {/* Destinations Tab */}
          {activeTab === "destinations" && (
            <>
              {!hasDestinations ? (
                <div className="text-center py-12">
                  <div className="text-5xl mb-4">📍</div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    No Favourite Destinations Yet
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Browse destinations and click the heart icon to save your favorites
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
                      key={destination.id}
                      className="bg-white rounded-lg shadow hover:shadow-xl transition overflow-hidden border"
                    >
                      <div className="h-48 bg-linear-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                        <span className="text-white text-6xl">📍</span>
                      </div>

                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-2">
                          {destination.name}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4">
                          {destination.description}
                        </p>

                        <div className="mb-4">
                          <div className="flex flex-wrap gap-2">
                            {destination.activities.slice(0, 3).map((activity, idx) => (
                              <span
                                key={idx}
                                className="px-3 py-1 bg-blue-100 text-blue-600 text-xs rounded-full"
                              >
                                {activity}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-sm mb-4">
                          <div>
                            <span className="text-gray-500">Best Time:</span>
                            <span className="ml-1 font-semibold text-gray-700 text-xs">
                              {destination.bestTime}
                            </span>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Link
                            href={`/user/guide-booked?destination=${encodeURIComponent(destination.name)}`}
                            className="flex-1 text-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition"
                          >
                            Book Guide
                          </Link>
                          <button
                            onClick={() => removeFavouriteDestination(destination.id)}
                            className="bg-red-100 hover:bg-red-200 text-red-600 px-4 py-2 rounded-lg font-semibold transition"
                            title="Remove from favorites"
                          >
                            ❌
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {/* Guides Tab */}
          {activeTab === "guides" && (
            <>
              {!hasGuides ? (
                <div className="text-center py-12">
                  <div className="text-5xl mb-4">👤</div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    No Favourite Guides Yet
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Start exploring and save your favourite guides for easy access later
                  </p>
                  <Link
                    href="/user/guide-booked"
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition"
                  >
                    Browse Guides
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {favouriteGuides.map((guide) => (
                    <div
                      key={guide._id}
                      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition border"
                    >
                      <div className="bg-linear-to-br from-blue-100 to-blue-200 h-48 flex items-center justify-center">
                        {guide.imageUrl ? (
                          <img
                            src={guide.imageUrl}
                            alt={guide.fullName}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="text-4xl">👤</div>
                        )}
                      </div>

                      <div className="p-4">
                        <h3 className="text-lg font-bold text-gray-800 mb-1">
                          {guide.fullName}
                        </h3>
                        {guide.specialization && (
                          <p className="text-sm text-gray-600 mb-2">
                            {guide.specialization}
                          </p>
                        )}

                        <div className="flex items-center mb-3">
                          <span className="text-yellow-500">⭐</span>
                          <span className="ml-1 font-semibold text-gray-800">
                            {guide.rating || "N/A"}
                          </span>
                          {guide.reviews && (
                            <span className="text-sm text-gray-600 ml-2">
                              ({guide.reviews} reviews)
                            </span>
                          )}
                        </div>

                        <div className="text-sm text-gray-600 mb-4 space-y-1">
                          <p>📧 {guide.email}</p>
                          <p>📱 {guide.phoneNumber}</p>
                        </div>

                        <div className="flex gap-2">
                          <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition">
                            Book Now
                          </button>
                          <button
                            onClick={() => removeFavouriteGuide(guide._id)}
                            className="flex-1 bg-red-100 hover:bg-red-200 text-red-600 font-semibold py-2 rounded-lg transition"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
