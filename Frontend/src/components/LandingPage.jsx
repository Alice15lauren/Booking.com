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
        <div className="w-full min-h-screen bg-[#F7F7FA]">

            {/* NAVBAR */}
            <nav className="backdrop-blur-md bg-white/70 border-b border-gray-200 w-full h-16 px-8 flex items-center justify-between fixed top-0 left-0 z-50">
                <div className="text-2xl font-semibold text-gray-800 tracking-tight">
                    Booking.com
                </div>

                <div className="flex gap-8 text-gray-700 font-medium">
                    <span className="cursor-pointer hover:text-indigo-500 transition">Home</span>
                    <span className="cursor-pointer hover:text-indigo-500 transition">About</span>
                    <span className="cursor-pointer hover:text-indigo-500 transition">Contact</span>
                </div>

                <div className="relative" ref={dropdownRef}>
                    <div
                        className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden cursor-pointer border border-gray-400"
                        onClick={() => setShowDropdown(!showDropdown)}
                    >
                        <img
                            src="/download.jpeg"
                            alt="profile"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {showDropdown && (
                        <div className="absolute right-0 mt-3 w-48 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden animate-fadeIn">
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

            {/* HERO SECTION */}
            <div className="pt-28 px-8">
                <div className="bg-gradient-to-r from-indigo-200 via-pink-100 to-sky-200 rounded-3xl p-14 shadow-lg">
                    <h1 className="text-5xl font-bold text-gray-800 mb-5 leading-tight">
                        Discover & Book Movie Tickets Easily
                    </h1>

                    <p className="text-lg text-gray-700 mb-8 max-w-xl">
                        Explore the latest movies, trending shows, and premium cinemas around you with a refreshing, smooth, and modern booking experience.
                    </p>

                    <button
                        className="bg-indigo-500 text-white px-8 py-3 rounded-full font-medium shadow-md hover:bg-indigo-600 transition"
                        onClick={() => navigate("/create-account")}
                    >
                        Get Started
                    </button>
                </div>

                {/* MOVIE SECTION */}
<div className="mt-16">
    <h2 className="text-3xl font-semibold text-gray-800 mb-8">
        Trending Movies
    </h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {movies && movies.length > 0 ? (
            movies.map((movie) => (
                <div
                    key={movie.title}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col"
                >
                    <div className="w-full h-80 overflow-hidden rounded-t-2xl">
                        <img
                            src={movie.image}
                            alt={movie.title}
                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                    </div>

                    <div className="p-5 flex flex-col items-center text-center flex-grow">
                        <h3 className="font-semibold text-xl text-gray-800 mb-3 line-clamp-1">
                            {movie.title}
                        </h3>

                        <button
                            className="w-full bg-indigo-500 text-white py-3 rounded-xl font-medium hover:bg-indigo-600 transition mt-auto"
                            onClick={handleBookNow}
                        >
                            Book Now
                        </button>
                    </div>
                </div>
            ))
        ) : (
            <p className="text-gray-500 text-lg col-span-full text-center py-10">
                No movies available right now.
            </p>
        )}
    </div>
</div>

            </div>
        </div>
    );
}

export default LandingPage;
