"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const destinations = [
  {
    id: 1,
    name: "Kathmandu Valley",
    description: "Explore ancient temples, palaces, and vibrant markets in Nepal's capital",
    image: "/image.jpeg",
    activities: ["Temple Tours", "Cultural Tours", "Food Tours"],
    bestTime: "Oct - Nov, Mar - Apr",
    difficulty: "Easy",
  },
  {
    id: 2,
    name: "Pokhara",
    description: "Lakeside paradise with stunning mountain views and adventure activities",
    image: "/image1.jpg",
    activities: ["Paragliding", "Boating", "Mountain Views"],
    bestTime: "Oct - Nov, Mar - May",
    difficulty: "Easy to Moderate",
  },
  {
    id: 3,
    name: "Everest Base Camp",
    description: "Trek to the base of the world's highest mountain",
    image: "/image.jpeg",
    activities: ["Trekking", "Mountain Views", "Photography"],
    bestTime: "Mar - May, Sep - Nov",
    difficulty: "Challenging",
  },
  {
    id: 4,
    name: "Chitwan National Park",
    description: "Wildlife safari and jungle adventures in Nepal's first national park",
    image: "/image1.jpg",
    activities: ["Wildlife Safari", "Jungle Walk", "Canoeing"],
    bestTime: "Oct - Mar",
    difficulty: "Easy",
  },
  {
    id: 5,
    name: "Annapurna Circuit",
    description: "One of the world's best trekking routes with diverse landscapes",
    image: "/image.jpeg",
    activities: ["Trekking", "Mountain Views", "Cultural Experience"],
    bestTime: "Mar - May, Oct - Nov",
    difficulty: "Moderate to Challenging",
  },
  {
    id: 6,
    name: "Lumbini",
    description: "Birthplace of Lord Buddha and UNESCO World Heritage Site",
    image: "/image1.jpg",
    activities: ["Temple Tours", "Meditation", "Cultural Tours"],
    bestTime: "Oct - Mar",
    difficulty: "Easy",
  },
];

export default function DestinationsPage() {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState<number[]>([]);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("favorite_destinations");
    if (saved) {
      setFavorites(JSON.parse(saved));
    }
  }, []);

  const toggleFavorite = (destinationId: number) => {
    let newFavorites;
    if (favorites.includes(destinationId)) {
      newFavorites = favorites.filter((id) => id !== destinationId);
    } else {
      newFavorites = [...favorites, destinationId];
    }
    setFavorites(newFavorites);
    localStorage.setItem("favorite_destinations", JSON.stringify(newFavorites));
  };

  const filteredDestinations = destinations.filter((dest) => {
    const matchesDifficulty =
      selectedDifficulty === "All" || dest.difficulty.includes(selectedDifficulty);
    const matchesSearch =
      dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDifficulty && matchesSearch;
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          🗺️ Explore Destinations
        </h1>
        <p className="text-gray-600">
          Discover amazing places and book a local guide for your adventure
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Search Destinations
            </label>
            <input
              type="text"
              placeholder="Search by name or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Difficulty Level
            </label>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All Levels</option>
              <option value="Easy">Easy</option>
              <option value="Moderate">Moderate</option>
              <option value="Challenging">Challenging</option>
            </select>
          </div>
        </div>
      </div>

      {/* Destinations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDestinations.map((destination) => (
          <div
            key={destination.id}
            className="bg-white rounded-lg shadow hover:shadow-xl transition overflow-hidden relative"
          >
            {/* Favorite Button */}
            <button
              onClick={() => toggleFavorite(destination.id)}
              className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:scale-110 transition"
              title={favorites.includes(destination.id) ? "Remove from favorites" : "Add to favorites"}
            >
              {favorites.includes(destination.id) ? (
                <span className="text-2xl">❤️</span>
              ) : (
                <span className="text-2xl">🤍</span>
              )}
            </button>

            <div className="relative h-48 overflow-hidden">
              <Image
                src={destination.image}
                alt={destination.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
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
                  {destination.activities.map((activity, idx) => (
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
                  <span className="ml-1 font-semibold text-gray-700">
                    {destination.bestTime}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    destination.difficulty.includes("Easy")
                      ? "bg-green-100 text-green-600"
                      : destination.difficulty.includes("Moderate")
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {destination.difficulty}
                </span>
              </div>

              <Link
                href={`/user/guide-booked?destination=${encodeURIComponent(destination.name)}`}
                className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition"
              >
                Book a Guide
              </Link>
            </div>
          </div>
        ))}
      </div>

      {filteredDestinations.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No destinations found matching your criteria
          </p>
        </div>
      )}
    </div>
  );
}
