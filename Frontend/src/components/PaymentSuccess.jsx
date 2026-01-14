import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function PaymentSuccess() {
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!state) {
      navigate("/");
    }
  }, [state, navigate]);

  if (!state) return null;

  const { movie, selectedSeats, totalAmount } = state;

  // eslint-disable-next-line react-hooks/purity
  const bookingId = "BMS" + Math.floor(100000 + Math.random() * 900000);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-xl max-w-xl w-full p-8">

        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
            <span className="text-green-600 text-3xl">✓</span>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-center text-green-600">
          Payment Successful
        </h1>

        <p className="text-center text-gray-500 mt-2">
          Your tickets have been booked successfully
        </p>

        <div className="mt-6 border rounded-xl p-4 space-y-3 text-sm">
          <p><strong>Movie:</strong> {movie.title}</p>
          <p><strong>Genre:</strong> {movie.genre}</p>
          <p><strong>Seats:</strong> {selectedSeats.join(", ")}</p>
          <p><strong>Total Paid:</strong> ₹{totalAmount}</p>
          <p><strong>Booking ID:</strong> {bookingId}</p>
          <p><strong>Show Time:</strong> Today • 7:30 PM</p>
          <p><strong>Venue:</strong> INOX Pune</p>
        </div>

        <div className="mt-8 flex gap-4">
          <button
            onClick={() => navigate("/user-home")}
            className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
          >
            Go to Home
          </button>

          <button
            className="flex-1 border border-gray-300 py-3 rounded-lg hover:bg-gray-100"
          >
            Download Ticket
          </button>
        </div>

      </div>
    </div>
  );
}

export default PaymentSuccess;
