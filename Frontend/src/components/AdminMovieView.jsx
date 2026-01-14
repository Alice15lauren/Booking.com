/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function AdminMovieView() {
  const { movieId } = useParams(); 
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);

  const movies = [
    {
      id: 1,
      title: "Avengers: Secret Wars",
      showDate: "2026-01-10",
      showTime: "18:30",
      venue: "PVR Cinemas, Mumbai",
      poster: "https://via.placeholder.com/400x250?text=Avengers",
      status: "Scheduled",
      description: "Superheroes unite to fight a new threat!",
    },
    {
      id: 2,
      title: "The Flash",
      showDate: "2026-01-12",
      showTime: "20:00",
      venue: "INOX, Delhi",
      poster: "https://via.placeholder.com/400x250?text=The+Flash",
      status: "Scheduled",
      description: "The fastest man alive returns to save the day.",
    },
    {
      id: 3,
      title: "Avatar 3",
      showDate: "2026-01-15",
      showTime: "19:00",
      venue: "PVR Cinemas, Bangalore",
      poster: "https://via.placeholder.com/400x250?text=The+Flash",
      status: "Scheduled",
      //description: "The fastest man alive returns to save the day.",
    },
    {
      id: 4,
      title: "Mission Impossible 8",
      showDate: "2026-01-18",
      showTime: "21:00",
      venue: "INOX, Pune",
      poster: "https://via.placeholder.com/400x250?text=The+Flash",
      status: "Scheduled",
      //description: "The fastest man alive returns to save the day.",
    },
  ];

  useEffect(() => {
    const m = movies.find((m) => m.id === parseInt(movieId));
    setMovie(m || null);
  }, [movieId]);

  if (!movie) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Movie not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <button
        className="mb-6 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        onClick={() => navigate(-1)}
      >
        Back
      </button>

      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-64 object-cover"
        />
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800">{movie.title}</h1>
          <p className="text-gray-600 mt-2">{movie.description}</p>

          <div className="mt-4 text-gray-700">
            <p>
              <span className="font-semibold">Show Date:</span> {movie.showDate}
            </p>
            <p>
              <span className="font-semibold">Show Time:</span> {movie.showTime}
            </p>
            <p>
              <span className="font-semibold">Venue:</span> {movie.venue}
            </p>
            <p>
              <span className="font-semibold">Status:</span>{" "}
              <span className="px-2 py-1 text-xs font-medium text-blue-800 bg-blue-100 rounded-full">
                {movie.status}
              </span>
            </p>
          </div>

          {/* <div className="mt-6 flex gap-3">
            <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
              Edit
            </button>
            <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
              Delete
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default AdminMovieView;
