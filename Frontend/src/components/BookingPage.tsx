import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiRequest } from "../api/api";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import {
    setSelectedMovie,
    setSelectedShowTime,
    toggleSeat as toggleSeatAction,
    clearSeats
} from "../store/slices/bookingSlice";

function BookingPage() {
    const navigate = useNavigate();
    const location = useLocation();

    // ******** FIX: Type the location state ********
    const state = location.state as { movie: any } | null;

    const [bookedSeats, setBookedSeats] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();

    // ******** FIX: Type useSelector ********
    const { selectedMovie, selectedSeats, selectedShowTime } = useSelector(
        (state: RootState) => state.booking
    );

    if (!state?.movie) {
        navigate("/");
        return null;
    }

    const movie = state.movie;

    const pricePerSeat = 250;
    const showDate = "2026-01-05";
    const showTime = "7:30 PM";
    const venue = "INOX Pune";

    const seatLayout = [
        "A1", "A2", "A3", "A4", "A5",
        "B1", "B2", "B3", "B4", "B5",
        "C1", "C2", "C3", "C4", "C5",
    ];

    // ******** Runs first time only ********
    useEffect(() => {
        dispatch(setSelectedMovie(movie));
        dispatch(setSelectedShowTime(showTime));
    }, [movie, dispatch]);

    const toggleSeat = (seat: string) => {
        if (bookedSeats.includes(seat)) {
            alert("This seat is already booked.");
            return;
        }
        dispatch(toggleSeatAction(seat));
    };

    const loadBookedSeats = async () => {
        const data = await apiRequest(
            `/user/booked-seats?movieTitle=${movie.title}&showDate=${showDate}&showTime=${showTime}`,
            "GET"
        );
        setBookedSeats(data || []);
    };

    const validateSeatsBeforePayment = async () => {
        setLoading(true);

        const latestBookedSeats = await apiRequest(
            `/user/booked-seats?movieTitle=${movie.title}&showDate=${showDate}&showTime=${showTime}`,
            "GET"
        );

        const conflict = selectedSeats.some((seat) =>
            latestBookedSeats.includes(seat)
        );

        if (conflict) {
            alert("One or more selected seats were just booked. Please select again.");
            setBookedSeats(latestBookedSeats);
            dispatch(clearSeats());
            setLoading(false);
            return false;
        }

        setLoading(false);
        return true;
    };

    useEffect(() => {
        loadBookedSeats().catch(console.error);
    }, [movie.title, showDate, showTime, venue]);

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-7xl mx-auto grid grid-cols-3 gap-6">

                <div className="col-span-2 bg-white rounded-xl p-6 shadow">
                    <div className="flex gap-6">
                        <img
                            src={movie.image}
                            alt={movie.title}
                            className="w-40 h-60 object-cover rounded-lg"
                        />
                        <div>
                            <h1 className="text-3xl font-bold">{movie.title}</h1>
                            <p className="text-gray-600 mt-1">{movie.genre}</p>
                            <p className="text-gray-600">{movie.duration}</p>
                            <p className="text-gray-600 mt-2">
                                {venue} • {showDate} • {showTime}
                            </p>
                        </div>
                    </div>

                    <h2 className="mt-8 font-semibold text-lg">Select Seats</h2>

                    <div className="grid grid-cols-5 gap-3 mt-4">
                        {seatLayout.map((seat) => (
                            <button
                                key={seat}
                                disabled={bookedSeats.includes(seat)}
                                onClick={() => toggleSeat(seat)}
                                className={`p-3 rounded text-sm font-medium
                                    ${bookedSeats.includes(seat)
                                        ? "bg-red-400 text-white cursor-not-allowed"
                                        : selectedSeats.includes(seat)
                                            ? "bg-green-500 text-white"
                                            : "bg-gray-200 hover:bg-gray-300"
                                    }
                                `}
                            >
                                {seat}
                            </button>
                        ))}
                    </div>

                    <div className="flex gap-6 mt-6 text-sm">
                        <div className="flex items-center gap-2">
                            <span className="w-4 h-4 bg-gray-200 rounded"></span> Available
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-4 h-4 bg-green-500 rounded"></span> Selected
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-4 h-4 bg-red-400 rounded"></span> Booked
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow sticky top-6 h-fit">
                    <h2 className="text-xl font-semibold">Booking Summary</h2>

                    <div className="mt-4 space-y-2 text-sm">
                        <p><strong>Movie:</strong> {movie.title}</p>
                        <p><strong>Seats:</strong> {selectedSeats.join(", ") || "None"}</p>
                        <p><strong>Price per seat:</strong> ₹{pricePerSeat}</p>
                        <p className="font-bold text-lg">
                            Total: ₹{selectedSeats.length * pricePerSeat}
                        </p>
                    </div>

                    <button
                        disabled={selectedSeats.length === 0 || loading}
                        onClick={async () => {
                            const ok = await validateSeatsBeforePayment();
                            if (!ok) return;

                            navigate("/payment", {
                                state: {
                                    movie,
                                    selectedSeats,
                                    selectedShowTime,
                                    showDate,
                                    showTime,
                                    venue,
                                    totalAmount: selectedSeats.length * pricePerSeat,
                                },
                            });
                        }}
                        className="w-full mt-6 bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 disabled:opacity-50"
                    >
                        {loading ? "Checking seats..." : "Proceed to Payment"}
                    </button>
                </div>

            </div>
        </div>
    );
}

export default BookingPage;
