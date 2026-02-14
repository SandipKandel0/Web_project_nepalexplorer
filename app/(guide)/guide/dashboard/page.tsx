import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Guide Dashboard",
};

export default function GuideDashboard() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Welcome Back!</h2>
        <p className="text-gray-600 mb-4">
          Manage your guide services, view booking requests, and track your
          approvals.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-linear-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
            <h3 className="text-gray-600 text-sm font-semibold">
              Pending Requests
            </h3>
            <p className="text-3xl font-bold text-blue-600 mt-2">0</p>
          </div>
          <div className="bg-linear-to-br from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
            <h3 className="text-gray-600 text-sm font-semibold">
              Approved Bookings
            </h3>
            <p className="text-3xl font-bold text-green-600 mt-2">0</p>
          </div>
          <div className="bg-linear-to-br from-red-50 to-red-100 rounded-lg p-4 border border-red-200">
            <h3 className="text-gray-600 text-sm font-semibold">
              Declined Requests
            </h3>
            <p className="text-3xl font-bold text-red-600 mt-2">0</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-semibold transition">
              View Booking Requests
            </button>
            <button className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-semibold transition">
              Update My Profile
            </button>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Recent Activity
        </h3>
        <p className="text-gray-500 text-center py-8">
          No recent activity yet. Check back when you have booking requests!
        </p>
      </div>
    </div>
  );
}
