/* eslint-disable no-unused-vars */
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AdminHome() {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Hardcoded upcoming movies
  const upcomingMovies = [
    {
      id: 1,
      title: "Avengers: Secret Wars",
      showDate: "2026-01-10",
      showTime: "18:30",
      venue: "PVR Cinemas, Mumbai",
      poster: "https://via.placeholder.com/400x250?text=Avengers",
      status: "Scheduled",
    },
    {
      id: 2,
      title: "The Flash",
      showDate: "2026-01-12",
      showTime: "20:00",
      venue: "INOX, Delhi",
      poster: "https://via.placeholder.com/400x250?text=The+Flash",
      status: "Scheduled",
    },
    {
      id: 3,
      title: "Avatar 3",
      showDate: "2026-01-15",
      showTime: "19:00",
      venue: "PVR Cinemas, Bangalore",
      poster: "https://via.placeholder.com/400x250?text=Avatar+3",
      status: "Scheduled",
    },
    {
      id: 4,
      title: "Mission Impossible 8",
      showDate: "2026-01-18",
      showTime: "21:00",
      venue: "INOX, Pune",
      poster: "https://via.placeholder.com/400x250?text=Mission+Impossible+8",
      status: "Scheduled",
    },
  ];

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function handleLogout() {
    try {
      // optional API call
    } catch (e) {
      // Error Message
    } finally {
      localStorage.clear();
      navigate("/");
    }
  }

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="w-full h-14 px-6 flex items-center justify-between border-b border-gray-200 bg-white">
        <div className="text-xl font-semibold text-gray-800">
          Booking.com
        </div>

        <div className="flex gap-6 text-gray-600 font-medium">
          <span
            className="cursor-pointer hover:text-blue-600"
            onClick={() => navigate("/admin-dashboard")}
          >
            Dashboard
          </span>
          <button className="cursor-pointer hover:text-blue-600"
            onClick={() => navigate("/admin-bookings")}
          >
            Booking Info
          </button>
          <span className="cursor-pointer hover:text-blue-600">
            Contact
          </span>
        </div>

        <div className="relative" ref={dropdownRef}>
          <div className="flex items-center gap-4">
            <button
              className="hover:text-blue-400"
              onClick={() => navigate("/user-info")}
            >
              Users Info
            </button>

            <div
              className="w-9 h-9 rounded-full bg-gray-300 cursor-pointer"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <img
                src="/download.jpeg"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </div>

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-md">
              <div className="px-4 py-2 text-sm hover:bg-gray-100"
                onClick={() => {
                  setShowDropdown(false);
                  navigate("/profile", {
                  });
                }}
              >
                Profile
              </div>
              <div
                className="px-4 py-2 text-sm text-red-600 hover:bg-gray-100 cursor-pointer"
                onClick={handleLogout}
              >
                Logout
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Upcoming Movies Section */}
      <div className="max-w-7xl mx-auto p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Upcoming Movies
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {upcomingMovies.map((movie) => (
            <div
              key={movie.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow"
            >
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">{movie.title}</h3>
                <p className="text-gray-600 text-sm mt-1">
                  {movie.showDate} • {movie.showTime}
                </p>
                <p className="text-gray-600 text-sm">{movie.venue}</p>
                <span className="inline-block mt-2 px-2 py-1 text-xs font-medium text-blue-800 bg-blue-100 rounded-full">
                  {movie.status}
                </span>

                <div className="mt-3 flex justify-end">
                  <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-sm"
                     onClick={()=>navigate(`/admin-movie-view/${movie.id}`)}>
                    View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminHome;
