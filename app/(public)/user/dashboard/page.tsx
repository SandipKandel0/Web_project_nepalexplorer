"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUserData } from "@/lib/cookies";
import { getMyRequestedGuides, getMyGuideRequests, approveGuideRequest, declineGuideRequest } from "@/lib/api/guide";
import Link from "next/link";
import { MdPerson, MdLogout, MdCheckCircle, MdCancel } from "react-icons/md";

export default function UserDashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [guideRequests, setGuideRequests] = useState<any[]>([]);
  const [myGuideRequests, setMyGuideRequests] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<"overview" | "guide-requests" | "guide-bookings">("overview");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUserData();
        if (!userData) {
          router.push("/login");
          return;
        }
        setUser(userData.user || userData);

        // Fetch guide requests based on role
        const isGuide = userData.user?.role === "guide" || userData.role === "guide";
        if (isGuide) {
          const response = await getMyGuideRequests();
          setMyGuideRequests(response.data);
        }

        // Always fetch requested guides
        const guestResponse = await getMyRequestedGuides();
        setGuideRequests(guestResponse.data);
      } catch (err) {
        console.error("Failed to fetch data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  const handleApprove = async (requestId: string) => {
    try {
      await approveGuideRequest(requestId);
      setMyGuideRequests((prev) =>
        prev.map((r) =>
          r._id === requestId ? { ...r, status: "approved" } : r
        )
      );
    } catch (err) {
      console.error("Failed to approve request");
    }
  };

  const handleDecline = async (requestId: string) => {
    try {
      await declineGuideRequest(requestId);
      setMyGuideRequests((prev) =>
        prev.map((r) =>
          r._id === requestId ? { ...r, status: "declined" } : r
        )
      );
    } catch (err) {
      console.error("Failed to decline request");
    }
  };

  const handleLogout = async () => {
    const { clearAuthCookies } = await import("@/lib/cookies");
    await clearAuthCookies();
    router.push("/login");
  };

  if (loading)
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Loading...</p>
      </div>
    );

  if (!user)
    return (
      <div className="text-center py-8 text-gray-500">
        Please login to continue
      </div>
    );

  const isGuide = user?.role === "guide";

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-bold mb-2">
            Welcome, {user.fullName}!
          </h1>
          <p className="text-gray-600">
            {isGuide
              ? "Manage your guide booking requests"
              : "Find and book a guide for your trip"}
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <MdLogout size={20} /> Logout
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b">
        <button
          onClick={() => setActiveTab("overview")}
          className={`px-4 py-2 font-semibold ${
            activeTab === "overview"
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-700 hover:text-blue-600"
          }`}
        >
          Overview
        </button>
        {isGuide && (
          <button
            onClick={() => setActiveTab("guide-requests")}
            className={`px-4 py-2 font-semibold ${
              activeTab === "guide-requests"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-700 hover:text-blue-600"
            }`}
          >
            Guide Requests ({myGuideRequests.length})
          </button>
        )}
        {!isGuide && (
          <button
            onClick={() => setActiveTab("guide-bookings")}
            className={`px-4 py-2 font-semibold ${
              activeTab === "guide-bookings"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-700 hover:text-blue-600"
            }`}
          >
            My Bookings ({guideRequests.length})
          </button>
        )}
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Profile Card */}
            <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
              <div className="flex items-center gap-4 mb-4">
                {user.imageUrl ? (
                  <img
                    src={user.imageUrl}
                    alt="Profile"
                    className="w-16 h-16 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                    <MdPerson size={32} className="text-blue-600" />
                  </div>
                )}
                <div>
                  <h2 className="text-xl font-semibold">{user.fullName}</h2>
                  <p className="text-gray-500 text-sm">@{user.username}</p>
                </div>
              </div>
              <Link
                href="/user/profile"
                className="text-blue-600 hover:text-blue-800 font-semibold"
              >
                View Profile →
              </Link>
            </div>

            {/* Quick Info Card */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-gray-600">Email</p>
                  <p className="font-medium">{user.email}</p>
                </div>
                <div>
                  <p className="text-gray-600">Phone</p>
                  <p className="font-medium">{user.phoneNumber}</p>
                </div>
              </div>
            </div>

            {/* Action Card */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <Link
                  href="/user/guide-booking"
                  className="block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-center font-semibold"
                >
                  Request a Guide
                </Link>
                <Link
                  href="/user/profile"
                  className="block bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded text-center font-semibold"
                >
                  Edit Profile
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Guide Requests Tab (for guides) */}
      {activeTab === "guide-requests" && isGuide && (
        <div>
          <h2 className="text-2xl font-bold mb-6">Incoming Guide Requests</h2>
          {myGuideRequests.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
              No guide requests yet. Check back later!
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {myGuideRequests.map((request) => (
                <div
                  key={request._id}
                  className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold">
                        {request.guestId?.fullName}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {request.guestId?.email}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded text-sm font-medium ${
                        request.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : request.status === "approved"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {request.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div>
                      <p className="text-gray-600">Location</p>
                      <p className="font-semibold">{request.location}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Duration</p>
                      <p className="font-semibold">{request.duration} days</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Budget</p>
                      <p className="font-semibold">${request.budget}/day</p>
                    </div>
                    <div>
                      <p className="text-gray-600">People</p>
                      <p className="font-semibold">{request.numberOfPeople}</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-gray-600 text-sm mb-1">Description</p>
                    <p className="text-gray-700">{request.description}</p>
                  </div>

                  {request.status === "pending" && (
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleApprove(request._id)}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-semibold flex items-center justify-center gap-2"
                      >
                        <MdCheckCircle size={18} /> Approve
                      </button>
                      <button
                        onClick={() => handleDecline(request._id)}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded font-semibold flex items-center justify-center gap-2"
                      >
                        <MdCancel size={18} /> Decline
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Guide Bookings Tab (for guests) */}
      {activeTab === "guide-bookings" && !isGuide && (
        <div>
          <div className="mb-6">
            <Link
              href="/user/guide-booking"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-semibold"
            >
              + Request a New Guide
            </Link>
          </div>

          <h2 className="text-2xl font-bold mb-6">My Guide Requests</h2>
          {guideRequests.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
              You haven't requested any guides yet.{" "}
              <Link href="/user/guide-booking" className="text-blue-600 hover:text-blue-800">
                Request one now
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {guideRequests.map((request) => (
                <div
                  key={request._id}
                  className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold">
                        {request.guideId?.fullName}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {request.guideId?.email}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded text-sm font-medium ${
                        request.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : request.status === "approved"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {request.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div>
                      <p className="text-gray-600">Location</p>
                      <p className="font-semibold">{request.location}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Trip Date</p>
                      <p className="font-semibold">
                        {new Date(request.tripDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">Duration</p>
                      <p className="font-semibold">{request.duration} days</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Budget</p>
                      <p className="font-semibold">${request.budget}/day</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-gray-600 text-sm mb-1">Description</p>
                    <p className="text-gray-700">{request.description}</p>
                  </div>

                  {request.status === "approved" && (
                    <div className="bg-green-50 border border-green-200 p-4 rounded">
                      <p className="text-green-800 font-semibold">
                        ✓ Your request has been approved! Contact the guide to finalize details.
                      </p>
                    </div>
                  )}

                  {request.status === "declined" && (
                    <div className="bg-red-50 border border-red-200 p-4 rounded">
                      <p className="text-red-800 font-semibold">
                        ✗ The guide declined your request. Feel free to request another guide.
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
