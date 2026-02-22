"use client";

import { useEffect, useState } from "react";
import {
  deleteDestination,
  getAllDestinations,
  updateDestination,
  uploadDestination,
} from "@/lib/api/admin";

interface Destination {
  _id: string;
  name: string;
  location: string;
  description?: string;
  bestTime?: string;
  difficulty?: string;
  fullDescription?: string;
  activities?: string[];
  nearbyPlaces?: string[];
  popularHotels?: { name: string }[];
  imageUrl?: string;
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

export default function AdminDestinationsPage() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    location: "",
    description: "",
    bestTime: "",
    difficulty: "",
    fullDescription: "",
    activities: "",
    nearbyPlaces: "",
    popularHotels: "",
  });

  const fetchDestinations = async () => {
    try {
      setLoading(true);
      const response = await getAllDestinations();
      setDestinations(response.data || []);
      setError("");
    } catch (err: any) {
      setError(err.message || "Failed to fetch destinations");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDestinations();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    const reader = new FileReader();
    reader.onload = (event) => {
      setPreview(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      setSubmitting(true);
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("location", form.location);
      formData.append("description", form.description);
      formData.append("bestTime", form.bestTime);
      formData.append("difficulty", form.difficulty);
      formData.append("fullDescription", form.fullDescription);
      formData.append("activities", form.activities);
      formData.append("nearbyPlaces", form.nearbyPlaces);
      const hotelLines = form.popularHotels
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean);
      const hotels = hotelLines.map((name) => ({ name }));
      formData.append("popularHotels", JSON.stringify(hotels));
      
      console.log("Uploading destination:");
      console.log("Activities:", form.activities);
      console.log("Nearby Places:", form.nearbyPlaces);
      console.log("Hotels:", hotels);
      
      if (imageFile) {
        formData.append("image", imageFile);
      }

      if (editingId) {
        const response = await updateDestination(editingId, formData);
        setSuccess(response.message || "Destination updated successfully");
      } else {
        if (!imageFile) {
          setError("Destination image is required");
          return;
        }
        const response = await uploadDestination(formData);
        setSuccess(response.message || "Destination uploaded successfully");
      }

      setForm({
        name: "",
        location: "",
        description: "",
        bestTime: "",
        difficulty: "",
        fullDescription: "",
        activities: "",
        nearbyPlaces: "",
        popularHotels: "",
      });
      setImageFile(null);
      setPreview("");
      setEditingId(null);
      await fetchDestinations();
    } catch (err: any) {
      setError(err.message || "Failed to upload destination");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (destinationId: string) => {
    if (!confirm("Delete this destination?")) return;

    try {
      await deleteDestination(destinationId);
      setDestinations((prev) => prev.filter((destination) => destination._id !== destinationId));
    } catch (err: any) {
      setError(err.message || "Failed to delete destination");
    }
  };

  const handleEdit = (destination: Destination) => {
    setEditingId(destination._id);
    setForm({
      name: destination.name,
      location: destination.location,
      description: destination.description || "",
      bestTime: destination.bestTime || "",
      difficulty: destination.difficulty || "",
      fullDescription: destination.fullDescription || "",
      activities: destination.activities?.join(", ") || "",
      nearbyPlaces: destination.nearbyPlaces?.join(", ") || "",
      popularHotels: destination.popularHotels
        ? destination.popularHotels.map((hotel) => hotel.name).join("\n")
        : "",
    });
    setPreview(getImageUrl(destination.imageUrl));
    setImageFile(null);
    setError("");
    setSuccess("");
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setForm({
      name: "",
      location: "",
      description: "",
      bestTime: "",
      difficulty: "",
      fullDescription: "",
      activities: "",
      nearbyPlaces: "",
      popularHotels: "",
    });
    setImageFile(null);
    setPreview("");
  };

  return (
    <div className="space-y-6 text-black">
      <h1 className="text-3xl font-bold text-black">Destination Upload</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          {success}
        </div>
      )}

      <form onSubmit={handleUpload} className="bg-white rounded-lg shadow p-6 space-y-4">
        <h2 className="text-xl font-semibold text-black">
          {editingId ? "Update Destination" : "Upload Destination"}
        </h2>
        <div>
          <label className="block text-sm font-semibold text-black mb-1">Destination Name</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-black mb-1">Location</label>
          <input
            type="text"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-black mb-1">Description</label>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-black mb-1">Best Time</label>
          <input
            type="text"
            value={form.bestTime}
            onChange={(e) => setForm({ ...form, bestTime: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded"
            placeholder="Oct - Nov, Mar - Apr"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-black mb-1">Difficulty</label>
          <select
            value={form.difficulty}
            onChange={(e) => setForm({ ...form, difficulty: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded"
          >
            <option value="">Select difficulty</option>
            <option value="Easy">Easy</option>
            <option value="Moderate">Moderate</option>
            <option value="Challenging">Challenging</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-black mb-1">Full Description</label>
          <textarea
            value={form.fullDescription}
            onChange={(e) => setForm({ ...form, fullDescription: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded"
            rows={4}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-black mb-1">Activities (comma separated)</label>
          <input
            type="text"
            value={form.activities}
            onChange={(e) => setForm({ ...form, activities: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded"
            placeholder="Trekking, Photography, Cultural Tours"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-black mb-1">Nearby Places (comma separated)</label>
          <input
            type="text"
            value={form.nearbyPlaces}
            onChange={(e) => setForm({ ...form, nearbyPlaces: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded"
            placeholder="Patan, Bhaktapur, Nagarkot"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-black mb-1">Popular Hotels (one per line)</label>
          <textarea
            value={form.popularHotels}
            onChange={(e) => setForm({ ...form, popularHotels: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded"
            rows={4}
            placeholder="Hotel A"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-black mb-1">Image</label>
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-32 h-32 object-cover rounded mb-3"
            />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full px-4 py-2 border border-gray-300 rounded"
            required
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded disabled:opacity-50"
        >
          {submitting
            ? editingId
              ? "Updating..."
              : "Uploading..."
            : editingId
            ? "Update Destination"
            : "Upload Destination"}
        </button>
        {editingId && (
          <button
            type="button"
            onClick={handleCancelEdit}
            className="ml-3 bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded"
            disabled={submitting}
          >
            Cancel Edit
          </button>
        )}
      </form>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-black">Image</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-black">Name</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-black">Location</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-black">Description</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-black">Actions</th>
            </tr>
          </thead>
          <tbody>
            {destinations.map((destination) => (
              <tr key={destination._id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">
                  {destination.imageUrl ? (
                    <img
                      src={getImageUrl(destination.imageUrl)}
                      alt={destination.name}
                      className="w-16 h-16 rounded object-cover"
                    />
                  ) : (
                    <span className="text-black text-sm">No image</span>
                  )}
                </td>
                <td className="px-4 py-3">{destination.name}</td>
                <td className="px-4 py-3">{destination.location}</td>
                <td className="px-4 py-3">{destination.description || "-"}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => handleEdit(destination)}
                    className="text-blue-600 hover:text-blue-800 mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(destination._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {!loading && destinations.length === 0 && (
        <div className="text-center text-black py-6">No destinations uploaded yet.</div>
      )}
    </div>
  );
}
