"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { guideApi } from "@/lib/api/guide";

interface GuideRequest {
  _id: string;
  status: "pending" | "approved" | "declined";
  createdAt: string;
}

export default function GuideDashboard() {
  const [stats, setStats] = useState({
    pending: 0,
    approved: 0,
    declined: 0,
    total: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [recentRequests, setRecentRequests] = useState<GuideRequest[]>([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const requests = await guideApi.getGuideRequests();
      
      if (Array.isArray(requests)) {
        const pending = requests.filter((r) => r.status === "pending").length;
        const approved = requests.filter((r) => r.status === "approved").length;
        const declined = requests.filter((r) => r.status === "declined").length;

        setStats({
          pending,
          approved,
          declined,
          total: requests.length,
        });

        // Get recent requests (last 5)
        const recent = requests.slice(0, 5);
        setRecentRequests(recent);
      }
      setError(null);
    } catch (err) {
      console.error("Failed to fetch dashboard data:", err);
      setError("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
        <span className="ml-3 text-gray-600">Loading dashboard...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Welcome Back!</h2>
        <p className="text-gray-600 mb-6">
          Manage your guide services, view booking requests, and track your
          approvals.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
            <h3 className="text-gray-600 text-sm font-semibold">
              Total Requests
            </h3>
            <p className="text-3xl font-bold text-blue-600 mt-2">{stats.total}</p>
          </div>
          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg p-4 border border-yellow-200">
            <h3 className="text-gray-600 text-sm font-semibold">
              Pending Requests
            </h3>
            <p className="text-3xl font-bold text-yellow-600 mt-2">
              {stats.pending}
            </p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
            <h3 className="text-gray-600 text-sm font-semibold">
              Approved Bookings
            </h3>
            <p className="text-3xl font-bold text-green-600 mt-2">
              {stats.approved}
            </p>
          </div>
          <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-4 border border-red-200">
            <h3 className="text-gray-600 text-sm font-semibold">
              Declined Requests
            </h3>
            <p className="text-3xl font-bold text-red-600 mt-2">
              {stats.declined}
            </p>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Recent Requests
        </h3>
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 mb-4">
            {error}
          </div>
        )}
        {recentRequests.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            No requests yet. Check back when users book your services!
          </p>
        ) : (
          <div className="space-y-3">
            {recentRequests.map((request) => (
              <div
                key={request._id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition"
              >
                <div className="flex-1">
                  <p className="font-medium text-gray-800">
                    Request ID: {request._id.slice(0, 8)}...
                  </p>
                  <p className="text-sm text-gray-600">
                    {formatDate(request.createdAt)}
                  </p>
                </div>
                <div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      request.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : request.status === "approved"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {request.status.charAt(0).toUpperCase() +
                      request.status.slice(1)}
                  </span>
                </div>
              </div>
            ))}
            <div className="text-center mt-4">
              <Link
                href="/guide/requests"
                className="text-orange-600 hover:text-orange-700 font-semibold"
              >
                View All Requests →
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
