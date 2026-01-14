import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function LandingPage() {
    const navigate = useNavigate();
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);

    const { list: movies } = useSelector((state) => state.movies);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleBookNow = () => {
        const token = localStorage.getItem("token");

        if (!token) {
            alert("Please login or create an account to book tickets.");
            navigate("/create-account");
            return;
        }

        alert("Proceed to booking flow (next step)");
    };

    return (
        <div className="w-full min-h-screen bg-gray-50">
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

                    {showDropdown && (
                        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-md">
                            <div
                                className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                                onClick={() => navigate("/login")}
                            >
                                Login
                            </div>
                            <div
                                className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                                onClick={() => navigate("/create-account")}
                            >
                                Create Account
                            </div>
                        </div>
                    )}
                </div>
            </nav>
            <div className="px-8 py-10">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-10 mb-10">
                    <h1 className="text-4xl font-bold mb-4">
                        Book Tickets for Movies & Events
                    </h1>
                    <p className="text-lg mb-6">
                        Discover movies, concerts, sports, and live shows near you
                    </p>
                    <button
                        className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100"
                        onClick={() => navigate("/create-account")}
                    >
                        Get Started
                    </button>
                </div>
                <h2 className="text-2xl font-semibold mb-6">
                    Popular Movies
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
                                <h3 className="font-semibold text-lg mb-3">
                                    {movie.title}
                                </h3>

                                <button
                                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                                    onClick={handleBookNow}
                                >
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

export default LandingPage;
