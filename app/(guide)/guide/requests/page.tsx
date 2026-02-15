"use client";

import { useEffect, useState } from "react";
import { guideApi } from "@/lib/api/guide";

interface GuideRequest {
  _id: string;
  guestId: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  tripDate: string;
  duration: number;
  location: string;
  numberOfPeople: number;
  language: string;
  customMessage?: string;
  status: "pending" | "approved" | "declined";
  createdAt: string;
}

export default function GuideRequestsPage() {
  const [requests, setRequests] = useState<GuideRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    fetchGuideRequests();
  }, []);

  const fetchGuideRequests = async () => {
    try {
      setLoading(true);
      const data = await guideApi.getGuideRequests();
      setRequests(data);
      setError(null);
    } catch (err) {
      setError("Failed to load booking requests");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (requestId: string) => {
    try {
      setActionLoading(requestId);
      await guideApi.approveGuideRequest(requestId);
      setRequests(
        requests.map((req) =>
          req._id === requestId ? { ...req, status: "approved" } : req
        )
      );
    } catch (err) {
      setError("Failed to approve request");
      console.error(err);
    } finally {
      setActionLoading(null);
    }
  };

  const handleDecline = async (requestId: string) => {
    try {
      setActionLoading(requestId);
      await guideApi.declineGuideRequest(requestId);
      setRequests(
        requests.map((req) =>
          req._id === requestId ? { ...req, status: "declined" } : req
        )
      );
    } catch (err) {
      setError("Failed to decline request");
      console.error(err);
    } finally {
      setActionLoading(null);
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "approved":
        return "bg-green-100 text-green-800";
      case "declined":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-gray-600">Loading requests...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
        {error}
      </div>
    );
  }

  if (requests.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-8">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            No Booking Requests Yet
          </h3>
          <p className="text-gray-600">
            You don't have any booking requests at the moment. Check back later!
          </p>
        </div>
      </div>
    );
  }

  const pendingRequests = requests.filter((r) => r.status === "pending");
  const approvedRequests = requests.filter((r) => r.status === "approved");
  const declinedRequests = requests.filter((r) => r.status === "declined");

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-gray-600">Pending Requests</p>
          <p className="text-3xl font-bold text-yellow-600 mt-1">
            {pendingRequests.length}
          </p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-sm text-gray-600">Approved</p>
          <p className="text-3xl font-bold text-green-600 mt-1">
            {approvedRequests.length}
          </p>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-sm text-gray-600">Declined</p>
          <p className="text-3xl font-bold text-red-600 mt-1">
            {declinedRequests.length}
          </p>
        </div>
      </div>

      {/* Pending Requests */}
      {pendingRequests.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Pending Requests ({pendingRequests.length})
          </h2>
          <div className="space-y-4">
            {pendingRequests.map((request) => (
              <div
                key={request._id}
                className="bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-400"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Guest Info */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">
                      Guest Details
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-gray-600">Name:</span>
                        <p className="font-medium text-gray-800">
                          {request.guestName}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-600">Email:</span>
                        <p className="font-medium text-gray-800">
                          {request.guestEmail}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-600">Phone:</span>
                        <p className="font-medium text-gray-800">
                          {request.guestPhone}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Trip Details */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">
                      Trip Details
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-gray-600">Date:</span>
                        <p className="font-medium text-gray-800">
                          {formatDate(request.tripDate)}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-600">Duration:</span>
                        <p className="font-medium text-gray-800">
                          {request.duration} hour
                          {request.duration !== 1 ? "s" : ""}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-600">Location:</span>
                        <p className="font-medium text-gray-800">
                          {request.location}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-600">Number of People:</span>
                        <p className="font-medium text-gray-800">
                          {request.numberOfPeople}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-600">Language:</span>
                        <p className="font-medium text-gray-800">
                          {request.language}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Custom Message */}
                {request.customMessage && (
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-gray-600 text-sm mb-2">Guest Message:</p>
                    <p className="text-gray-800 bg-gray-50 p-3 rounded">
                      {request.customMessage}
                    </p>
                  </div>
                )}

                {/* Actions */}
                <div className="mt-4 flex gap-3">
                  <button
                    onClick={() => handleApprove(request._id)}
                    disabled={actionLoading === request._id}
                    className="bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white py-2 px-6 rounded-lg font-semibold transition"
                  >
                    {actionLoading === request._id ? "Processing..." : "Approve"}
                  </button>
                  <button
                    onClick={() => handleDecline(request._id)}
                    disabled={actionLoading === request._id}
                    className="bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white py-2 px-6 rounded-lg font-semibold transition"
                  >
                    {actionLoading === request._id ? "Processing..." : "Decline"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Approved Requests */}
      {approvedRequests.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Approved Requests ({approvedRequests.length})
          </h2>
          <div className="space-y-4">
            {approvedRequests.map((request) => (
              <div
                key={request._id}
                className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-400"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">
                      Guest Details
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-gray-600">Name:</span>
                        <p className="font-medium text-gray-800">
                          {request.guestName}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-600">Email:</span>
                        <p className="font-medium text-gray-800">
                          {request.guestEmail}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-600">Phone:</span>
                        <p className="font-medium text-gray-800">
                          {request.guestPhone}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">
                      Trip Details
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-gray-600">Date:</span>
                        <p className="font-medium text-gray-800">
                          {formatDate(request.tripDate)}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-600">Duration:</span>
                        <p className="font-medium text-gray-800">
                          {request.duration} hour
                          {request.duration !== 1 ? "s" : ""}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-600">Location:</span>
                        <p className="font-medium text-gray-800">
                          {request.location}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-600">Language:</span>
                        <p className="font-medium text-gray-800">
                          {request.language}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex justify-end">
                  <span className="bg-green-100 text-green-800 px-4 py-2 rounded-lg font-semibold text-sm">
                    ✓ Approved
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Declined Requests */}
      {declinedRequests.length > 0 && (
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Declined Requests ({declinedRequests.length})
          </h3>
          <div className="space-y-4">
            {declinedRequests.map((request) => (
              <div
                key={request._id}
                className="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-400 opacity-75"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="font-medium text-gray-800">
                      {request.guestName}
                    </p>
                    <p className="text-sm text-gray-600">
                      {request.location} - {formatDate(request.tripDate)}
                    </p>
                  </div>
                  <div className="flex justify-end">
                    <span className="bg-red-100 text-red-800 px-4 py-2 rounded-lg font-semibold text-sm">
                      ✗ Declined
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
