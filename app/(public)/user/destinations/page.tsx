"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

interface Destination {
  id: number;
  name: string;
  description: string;
  image: string;
  activities: string[];
  bestTime: string;
  difficulty: string;
  fullDescription?: string;
  nearbyPlaces?: string[];
  popularHotels?: {
    name: string;
    rating: string;
    price: string;
  }[];
}

const destinations: Destination[] = [
  {
    id: 1,
    name: "Kathmandu Valley",
    description: "Explore ancient temples, palaces, and vibrant markets in Nepal's capital",
    image: "/image.jpeg",
    activities: ["Temple Tours", "Cultural Tours", "Food Tours"],
    bestTime: "Oct - Nov, Mar - Apr",
    difficulty: "Easy",
    fullDescription: "Kathmandu Valley is the cultural heart of Nepal with ancient temples, UNESCO World Heritage Sites, and vibrant Newari culture. Home to Durbar Square, Swayambhunath, and Boudhanath, it offers a perfect blend of spirituality and history.",
    nearbyPlaces: ["Bhaktapur", "Patan", "Changu Narayan Temple", "Nagarkot"],
    popularHotels: [
      { name: "Radisson Hotel Kathmandu", rating: "4.5/5", price: "$150-200/night" },
      { name: "Hyatt Regency Kathmandu", rating: "4.8/5", price: "$180-250/night" },
      { name: "Temple Tree Resort", rating: "4.3/5", price: "$100-150/night" },
      { name: "The Dwarika's Hotel", rating: "4.6/5", price: "$160-220/night" },
    ]
  },
  {
    id: 2,
    name: "Pokhara",
    description: "Lakeside paradise with stunning mountain views and adventure activities",
    image: "/image.jpeg",
    activities: ["Paragliding", "Boating", "Mountain Views"],
    bestTime: "Oct - Nov, Mar - May",
    difficulty: "Easy to Moderate",
    fullDescription: "Pokhara is Nepal's adventure capital, nestled beside Phewa Lake with panoramic views of the Annapurna Mountains. It's perfect for paragliding, boating, and water sports with excellent hospitality and restaurants.",
    nearbyPlaces: ["Phewa Lake", "Sarangkot", "Davis Falls", "Barahi Temple", "Bat Cave"],
    popularHotels: [
      { name: "Pokhara Grande Hotel", rating: "4.6/5", price: "$120-180/night" },
      { name: "Lakeside Herbs Garden Resort", rating: "4.4/5", price: "$100-150/night" },
      { name: "Rupakot Resort Pokhara", rating: "4.3/5", price: "$80-130/night" },
      { name: "Fishtail Lodge", rating: "4.7/5", price: "$200-300/night" },
    ]
  },
  {
    id: 3,
    name: "Everest Base Camp",
    description: "Trek to the base of the world's highest mountain",
    image: "/image.jpeg",
    activities: ["Trekking", "Mountain Views", "Photography"],
    bestTime: "Mar - May, Sep - Nov",
    difficulty: "Challenging",
    fullDescription: "The Everest Base Camp trek is one of the world's most iconic treks. Standing at 5,364m, it offers breathtaking views of Mount Everest and the surrounding Himalayan peaks. A challenging but rewarding adventure.",
    nearbyPlaces: ["Namche Bazaar", "Tengboche Monastery", "Khumjung", "Gorak Shep"],
    popularHotels: [
      { name: "Everest View Hotel", rating: "4.2/5", price: "$90-140/night" },
      { name: "Namche Rizpn Resort", rating: "4.1/5", price: "$70-110/night" },
      { name: "Tengboche Resort", rating: "3.9/5", price: "$60-100/night" },
    ]
  },
  {
    id: 4,
    name: "Chitwan National Park",
    description: "Wildlife safari and jungle adventures in Nepal's first national park",
    image: "/image.jpeg",
    activities: ["Wildlife Safari", "Jungle Walk", "Canoeing"],
    bestTime: "Oct - Mar",
    difficulty: "Easy",
    fullDescription: "Chitwan National Park is a UNESCO World Heritage Site covering 952 sq km of pristine jungle. It's home to Bengal tigers, one-horned rhinos, wild elephants, and over 500 bird species. Perfect for wildlife enthusiasts.",
    nearbyPlaces: ["Rapti River", "Sauraha Village", "Tharu Cultural Village", "Lumbini"],
    popularHotels: [
      { name: "Jungle Safari Lodge", rating: "4.4/5", price: "$100-150/night" },
      { name: "The Chitwan Safari Resort", rating: "4.3/5", price: "$110-160/night" },
      { name: "Hotel Sapphire Elephant", rating: "4.2/5", price: "$80-130/night" },
      { name: "Tigerland Resort", rating: "4.1/5", price: "$70-120/night" },
    ]
  },
  {
    id: 5,
    name: "Annapurna Circuit",
    description: "One of the world's best trekking routes with diverse landscapes",
    image: "/image.jpeg",
    activities: ["Trekking", "Mountain Views", "Cultural Experience"],
    bestTime: "Mar - May, Oct - Nov",
    difficulty: "Moderate to Challenging",
    fullDescription: "The Annapurna Circuit is a 160-230km trek through diverse landscapes - from dense forests to high mountain passes. It crosses Thorung La Pass at 5,416m and offers stunning views of the Annapurna Massif.",
    nearbyPlaces: ["Besisahar", "Manang", "Jomsom", "Poon Hill", "Ghorepani"],
    popularHotels: [
      { name: "Pokhara Mountain Resort", rating: "4.3/5", price: "$100-150/night" },
      { name: "Annapurna Base Camp Resort", rating: "3.8/5", price: "$50-80/night" },
      { name: "Jomsom Hotel", rating: "3.7/5", price: "$40-70/night" },
    ]
  },
  {
    id: 6,
    name: "Lumbini",
    description: "Birthplace of Lord Buddha and UNESCO World Heritage Site",
    image: "/image.jpeg",
    activities: ["Temple Tours", "Meditation", "Cultural Tours"],
    bestTime: "Oct - Mar",
    difficulty: "Easy",
    fullDescription: "Lumbini is one of the world's most sacred pilgrimage sites and birthplace of Siddhartha Gautama (Buddha). The site features the ancient Mayadevi Temple, internationals monasteries, and meditation centers.",
    nearbyPlaces: ["Tilaurakot", "Niglihava Stupa", "Kapilvastu", "Janakpur"],
    popularHotels: [
      { name: "Lumbini Buddha Boutique Hotel", rating: "4.1/5", price: "$70-120/night" },
      { name: "Hokule'a Lumbini", rating: "4.3/5", price: "$100-150/night" },
      { name: "Lumbini Peace Spiritual Resort", rating: "4.0/5", price: "$80-130/night" },
    ]
  },
];

export default function DestinationsPage() {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);

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

            <div className="h-48 overflow-hidden bg-gray-200">
              <img
                src={destination.image}
                alt={destination.name}
                className="w-full h-full object-cover"
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

              <div className="flex gap-2">
                <Link
                  href={`/user/guide-booked?destination=${encodeURIComponent(destination.name)}`}
                  className="flex-1 text-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition"
                >
                  Book a Guide
                </Link>
                <button
                  onClick={() => setSelectedDestination(destination)}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition"
                  title="Learn more"
                >
                  ℹ️
                </button>
              </div>
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

      {/* Destination Detail Modal */}
      {selectedDestination && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-linear-to-r from-blue-600 to-purple-600 text-white p-6 flex justify-between items-center">
              <h2 className="text-3xl font-bold">{selectedDestination.name}</h2>
              <button
                onClick={() => setSelectedDestination(null)}
                className="text-2xl hover:bg-white hover:bg-opacity-20 rounded-full w-10 h-10 flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Full Description */}
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">About This Destination</h3>
                <p className="text-gray-700 leading-relaxed">
                  {selectedDestination.fullDescription || selectedDestination.description}
                </p>
              </div>

              {/* Key Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Best Time to Visit</h4>
                  <p className="text-blue-600">{selectedDestination.bestTime}</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Difficulty Level</h4>
                  <p className="text-green-600">{selectedDestination.difficulty}</p>
                </div>
              </div>

              {/* Activities */}
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Activities & Things to Do</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedDestination.activities.map((activity, idx) => (
                    <span
                      key={idx}
                      className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold"
                    >
                      ✓ {activity}
                    </span>
                  ))}
                </div>
              </div>

              {/* Nearby Places */}
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">🏔️ Nearby Places</h3>
                <div className="grid grid-cols-2 gap-2">
                  {selectedDestination.nearbyPlaces?.map((place, idx) => (
                    <div key={idx} className="bg-purple-50 rounded-lg p-3 border border-purple-200">
                      <p className="text-purple-700 font-semibold">{place}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Popular Hotels */}
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">🏨 Popular Hotels</h3>
                <div className="space-y-3">
                  {selectedDestination.popularHotels?.map((hotel, idx) => (
                    <div key={idx} className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-orange-400 transition">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-bold text-gray-800 text-lg">{hotel.name}</h4>
                          <p className="text-yellow-600 font-semibold mt-1">⭐ {hotel.rating}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-orange-600 font-bold text-lg">{hotel.price}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Link
                  href={`/user/guide-booked?destination=${encodeURIComponent(selectedDestination.name)}`}
                  className="flex-1 text-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition"
                >
                  Book Guide for {selectedDestination.name}
                </Link>
                <button
                  onClick={() => setSelectedDestination(null)}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 rounded-lg transition"
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
