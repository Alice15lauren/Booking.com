import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../api/api";

function AdminBookings() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.role !== "admin") {
      navigate("/");
      return;
    }

    async function loadBookings() {
      try {
        const data = await apiRequest("/admin/bookings", "GET");
        setBookings(data || []);
      } catch (error) {
        console.error("Failed to load admin bookings", error);
      } finally {
        setLoading(false);
      }
    }

    loadBookings();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 font-medium">
        Loading bookings...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 p-6">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl p-6">

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">All Bookings (Admin)</h1>
          <button
            className="px-4 py-2 rounded bg-blue-200 hover:bg-blue-300 transition-colors shadow"
            onClick={() => navigate(-1)}
          >
            Back
          </button>
        </div>
        {bookings.length === 0 ? (
          <p className="text-gray-500 text-center py-10 text-lg">No bookings found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full rounded-lg overflow-hidden shadow-md">
              <thead className="bg-blue-500 text-white">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold">User</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Email</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Movie</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Show</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Venue</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Seats</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Amount</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Booked At</th>
                </tr>
              </thead>

              <tbody>
                {bookings.map((b, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-blue-50 hover:bg-blue-100 transition-colors" : "bg-white hover:bg-blue-50 transition-colors"}
                  >
                    <td className="px-4 py-3 text-gray-800">{b.userName}</td>
                    <td className="px-4 py-3 text-gray-700">{b.userEmail}</td>
                    <td className="px-4 py-3 text-gray-800 font-medium">{b.movieTitle}</td>
                    <td className="px-4 py-3 text-gray-700">{b.showDate} • {b.showTime}</td>
                    <td className="px-4 py-3 text-gray-700">{b.venue}</td>
                    <td className="px-4 py-3 text-gray-700">{b.seats.join(", ")}</td>
                    <td className="px-4 py-3 font-semibold text-green-600">₹{b.totalAmount}</td>
                    <td className="px-4 py-3 text-gray-500 text-sm">{new Date(b.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminBookings;
