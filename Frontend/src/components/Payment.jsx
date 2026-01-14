import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { apiRequest } from "../api/api";

function PaymentPage() {
    const { state } = useLocation();
    const navigate = useNavigate();

    const [paymentMethod, setPaymentMethod] = useState("card");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    if (!state) {
        navigate("/");
        return null;
    }

    const { movie, selectedSeats, totalAmount } = state;

    const handlePayment = async () => {
        setLoading(true);
        setError("");

        try {
            await apiRequest("/user/book", "POST", {
                movieTitle: movie.title,
                showDate: "2026-01-05",
                showTime: "7:30 PM",
                venue: "INOX Pune",
                seats: selectedSeats,
                totalAmount,
            });

            navigate("/payment-success", {
                state: {
                    movie,
                    selectedSeats,
                    totalAmount,
                },
            });

        } catch (err) {
            setError(err.message || "Booking failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-5xl mx-auto grid grid-cols-3 gap-6">

                <div className="col-span-2 bg-white rounded-xl p-6 shadow">
                    <h1 className="text-2xl font-bold mb-6">Payment</h1>

                    {error && (
                        <div className="mb-4 text-red-600 font-medium">
                            {error}
                        </div>
                    )}

                    <div className="space-y-4">
                        <label className="flex items-center gap-3">
                            <input
                                type="radio"
                                checked={paymentMethod === "card"}
                                onChange={() => setPaymentMethod("card")}
                            />
                            Credit / Debit Card
                        </label>

                        <label className="flex items-center gap-3">
                            <input
                                type="radio"
                                checked={paymentMethod === "upi"}
                                onChange={() => setPaymentMethod("upi")}
                            />
                            UPI
                        </label>

                        <label className="flex items-center gap-3">
                            <input
                                type="radio"
                                checked={paymentMethod === "wallet"}
                                onChange={() => setPaymentMethod("wallet")}
                            />
                            Wallet
                        </label>
                    </div>

                    <button
                        onClick={handlePayment}
                        disabled={loading}
                        className="mt-8 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 disabled:opacity-50"
                    >
                        {loading ? "Processing..." : "Pay Now"}
                    </button>
                </div>

                <div className="bg-white rounded-xl p-6 shadow h-fit">
                    <h2 className="text-xl font-semibold">Order Summary</h2>

                    <div className="mt-4 text-sm space-y-2">
                        <p><strong>Movie:</strong> {movie.title}</p>
                        <p><strong>Seats:</strong> {selectedSeats.join(", ")}</p>
                        <p><strong>Tickets:</strong> {selectedSeats.length}</p>
                        <p className="font-bold text-lg">
                            Total: ₹{totalAmount}
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default PaymentPage;
