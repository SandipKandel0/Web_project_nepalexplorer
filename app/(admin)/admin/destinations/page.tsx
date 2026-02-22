"use client";

import { useEffect, useState } from "react";
import {
  deleteDestination,
  getAllDestinations,
  uploadDestination,
} from "@/lib/api/admin";

interface Destination {
  _id: string;
  name: string;
  location: string;
  description?: string;
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
  const [form, setForm] = useState({
    name: "",
    location: "",
    description: "",
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

    if (!imageFile) {
      setError("Destination image is required");
      return;
    }

    try {
      setSubmitting(true);
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("location", form.location);
      formData.append("description", form.description);
      formData.append("image", imageFile);

      const response = await uploadDestination(formData);
      setSuccess(response.message || "Destination uploaded successfully");
      setForm({ name: "", location: "", description: "" });
      setImageFile(null);
      setPreview("");
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

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Destination Upload</h1>

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
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Destination Name</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Location</label>
          <input
            type="text"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Image</label>
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
          {submitting ? "Uploading..." : "Upload Destination"}
        </button>
      </form>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold">Image</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Name</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Location</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Description</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Actions</th>
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
                    <span className="text-gray-400 text-sm">No image</span>
                  )}
                </td>
                <td className="px-4 py-3">{destination.name}</td>
                <td className="px-4 py-3">{destination.location}</td>
                <td className="px-4 py-3">{destination.description || "-"}</td>
                <td className="px-4 py-3">
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
        <div className="text-center text-gray-500 py-6">No destinations uploaded yet.</div>
      )}
    </div>
  );
}
