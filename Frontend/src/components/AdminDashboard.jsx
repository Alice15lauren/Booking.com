/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../api/api";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchStats = async () => {
    try {
      const data = await apiRequest("/admin/stats", "GET");
      setStats(data);
      setError("");
    } catch (e) {
      if (e.message === "Unauthorized") {
        //localStorage.clear();
      } else {
        setError("Failed to load dashboard stats");
      }
    }
  };

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 4000);
    return () => clearInterval(interval);
  }, []);

  if (!stats) {
    return (
      <div className="p-8 text-center text-gray-500">
        Loading dashboard…
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-semibold mb-8 text-gray-800">
        Admin Dashboard
      </h1>

      {error && (
        <div className="mb-6 text-red-600 font-medium">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <p className="text-sm text-gray-500 mb-2">Total Users</p>
          <p className="text-3xl font-bold text-gray-800">
            {stats.totalUsers}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <p className="text-sm text-gray-500 mb-2">Active Users</p>
          <p className="text-3xl font-bold text-green-600">
            {stats.activeUsers}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <p className="text-sm text-gray-500 mb-2">Admin Users</p>
          <p className="text-3xl font-bold text-purple-600">
            {stats.adminUsers}
          </p>
        </div>
      </div>

      <div className="flex justify-center mt-10">
        <button
          onClick={() => navigate("/admin-home")}
          className="px-6 py-2 rounded-lg bg-blue-600 text-white font-medium
           hover:bg-blue-700 transition"
        >
          Back
        </button>
      </div>
    </div>
  );
}
