"use client";

import { useState, useEffect } from "react";

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

export default function FavouritePage() {
  const [favourites, setFavourites] = useState<FavouriteGuide[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulated data - in real app, fetch from API
    setFavourites([]);
    setLoading(false);
  }, []);

  const removeFavourite = (guideId: string) => {
    setFavourites(favourites.filter((guide) => guide._id !== guideId));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-gray-600">Loading your favourites...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">❤️ My Favourite Guides</h1>
        <p className="text-gray-600">
          Your saved guides for quick booking and reference
        </p>
      </div>

      {/* Favourites Grid */}
      {favourites.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <div className="text-5xl mb-4">🔖</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            No Favourite Guides Yet
          </h2>
          <p className="text-gray-600 mb-6">
            Start exploring and save your favourite guides for easy access later
          </p>
          <a
            href="/user/guide-booking"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition"
          >
            Browse Guides
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favourites.map((guide) => (
            <div
              key={guide._id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
            >
              {/* Guide Image */}
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

              {/* Guide Info */}
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-800 mb-1">
                  {guide.fullName}
                </h3>
                {guide.specialization && (
                  <p className="text-sm text-gray-600 mb-2">
                    {guide.specialization}
                  </p>
                )}

                {/* Rating */}
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

                {/* Contact Info */}
                <div className="text-sm text-gray-600 mb-4 space-y-1">
                  <p>📧 {guide.email}</p>
                  <p>📱 {guide.phoneNumber}</p>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition">
                    Book Now
                  </button>
                  <button
                    onClick={() => removeFavourite(guide._id)}
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

      {/* Info Section */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">
          💡 About Favourites
        </h3>
        <ul className="space-y-2 text-blue-800">
          <li className="flex items-start">
            <span className="mr-3">✓</span>
            <span>Save your favourite guides for quick access</span>
          </li>
          <li className="flex items-start">
            <span className="mr-3">✓</span>
            <span>Compare guides and their specializations</span>
          </li>
          <li className="flex items-start">
            <span className="mr-3">✓</span>
            <span>Book directly from your favourites list</span>
          </li>
          <li className="flex items-start">
            <span className="mr-3">✓</span>
            <span>Remove guides anytime if you change your mind</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
