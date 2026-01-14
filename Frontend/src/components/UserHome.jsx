/* eslint-disable no-unused-vars */
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../api/api";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, reset } from "../store/slices/counterSlice";
import { logout } from "../store/slices/authSlice";

function UserHome() {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  //const [count, setCount] = useState(0);
  const dispatch = useDispatch();
  const counter = useSelector((state) => state.counter.value);
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const { list: movies } = useSelector((state) => state.movies);


  async function handleLogout() {
  try {
    await apiRequest("/auth/logout", "POST");
  } catch (e) {
    // optional log
  } finally {
    // 1) Clear localStorage (persistence)
    localStorage.clear();

    // 2) Clear Redux auth state (in-memory)
    dispatch(logout());

    // 3) Navigate to login
    navigate("/", { replace: true });
  }
}



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


  // const handleClick = () => {
  //   const newCount = count + 1;
  //   setCount(newCount);
  //   alert(`Welcome!! Button Clicked ${newCount} time(s).`);
  // };

  return (
    <div className="w-full min-h-screen">
      <nav className="w-full h-14 px-6 flex items-center justify-between border-b border-gray-200 bg-white">
        <div className="text-xl font-semibold text-gray-800">
          Booking.com
        </div>

        <div className="flex gap-6 text-gray-600 font-medium">
          <span className="cursor-pointer hover:text-blue-600">
            Home
          </span>
          <span className="cursor-pointer hover:text-blue-600">
            About
          </span>
          <span className="cursor-pointer hover:text-blue-600">
            Contact
          </span>
        </div>

        <div className="relative" ref={dropdownRef}>
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="text-grey hover:text-blue-400"
              onClick={()=>{
                //console.log("Clicked");
                dispatch(increment());}}
            >
              Hello {user?.name || "User"}!
            </button>

            <div
              className="w-9 h-9 rounded-full bg-gray-300 flex items-center justify-center cursor-pointer"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <img
                src="/download.jpeg"
                alt="profile"
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
      <div className="px-8 py-6">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-10 mb-10">
          <h1 className="text-4xl font-bold mb-4">
            Book Tickets for Movies & Events
          </h1>
          <p className="text-lg mb-6">
            Discover movies, concerts, sports, and live shows near you
          </p>
          <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100">Explore Now</button>
        </div>

        <h2 className="text-2xl font-semibold mb-6">
          Now Showing
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {movies?.map((movie) => (
            <div
              key={movie.title}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition"
            >
              <img
                src={movie.image}
                alt={movie.title}
                className="w-full h-72 object-cover object-top"
              />

              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">
                  {movie.title}
                </h3>
                <p className="text-sm text-gray-500">
                  {movie.genre}
                </p>
                <p className="text-sm text-gray-500 mb-3">
                  {movie.duration}
                </p>
                <button className="w-full bg-blue-600 text-white py-2 rounded-lg"
                  onClick={() => navigate("/booking-page", { state: { movie } })}>
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserHome;
