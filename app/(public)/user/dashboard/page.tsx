"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authAPI } from "@/lib/api/auth";
import { guideApi } from "@/lib/api/guide";

interface UserData {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  profileImage?: string;
}

export default function UserDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [bookingCount, setBookingCount] = useState(0);
  const [favouriteCount, setFavouriteCount] = useState(0);
  const [destinationCount, setDestinationCount] = useState(0);

  useEffect(() => {
    // Check if user is authenticated
    if (!authAPI.isAuthenticated("user")) {
      router.push("/login/user");
      return;
    }

    // Get user data from localStorage
    const userData = localStorage.getItem("user_data");
    if (userData) {
      setUser(JSON.parse(userData));
    }

    // Fetch bookings
    fetchDashboardData();
  }, [router]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch guide requests (bookings made by user)
      const requests = await guideApi.getMyGuideRequests();
      if (Array.isArray(requests)) {
        setBookingCount(requests.length);
        
        // Count unique destinations from bookings
        const destinations = new Set(requests.map((r: any) => r.location));
        setDestinationCount(destinations.size);
      }

      // Fetch favourites from localStorage
      const favs = localStorage.getItem("favorite_destinations");
      if (favs) {
        try {
          const favArray = JSON.parse(favs);
          setFavouriteCount(favArray.length);
        } catch (e) {
          setFavouriteCount(0);
        }
      }
    } catch (err) {
      console.error("Failed to fetch dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div>
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Welcome, {user.fullName}! 👋
          </h1>
          <p className="text-gray-600">Manage your travel bookings and preferences</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">📊 Your Bookings</h3>
            <p className="text-4xl font-bold text-blue-600 mb-2">{bookingCount}</p>
            <p className="text-gray-600 text-sm">Active bookings</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">❤️ Favourites</h3>
            <p className="text-4xl font-bold text-red-600 mb-2">{favouriteCount}</p>
            <p className="text-gray-600 text-sm">Favourite guides</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">🗺️ Destinations</h3>
            <p className="text-4xl font-bold text-green-600 mb-2">{destinationCount}</p>
            <p className="text-gray-600 text-sm">Visited places</p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Recent Activity</h2>
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg mb-4">No recent activity yet</p>
            <p className="text-gray-500">Book a guide to get started on your next adventure! 🎉</p>
          </div>
        </div>
      </div>
  );
}
