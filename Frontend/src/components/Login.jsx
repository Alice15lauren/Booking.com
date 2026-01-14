import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { apiRequest } from "../api/api";
import { useDispatch, useSelector } from "react-redux";
import { loginStart, loginFailure, loginSuccess } from "../store/slices/authSlice";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const { user, isAuthenticated, loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!isAuthenticated || !user) return;

    if (user.role === "admin") navigate("/admin-home");
    else navigate("/user-home");
  }, [isAuthenticated, user, navigate]);

  const handleLogin = async () => {
    dispatch(loginStart());
    try {
      const data = await apiRequest("/auth/login", "POST", {
        email,
        password,
      });

      // Store in localStorage for persistence
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Dispatch to Redux with both user and token
      dispatch(loginSuccess({
        user: data.user,
        token: data.token
      }));

      // Navigation happens via useEffect above
    } catch (err) {
      dispatch(loginFailure(err.message));
    }
  };

  return (
    <div className="w-80 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow p-6">
      <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
        Login
      </h2>

      <div className="mb-4">
        <input
          type="email"
          name="email"
          autoComplete="off"
          placeholder="Email"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg
                    text-gray-700 placeholder-gray-400
                    focus:outline-none focus:border-blue-500
                    focus:ring-1 focus:ring-blue-500 transition"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="mb-5">
        <input
          type="password"
          name="password"
          autoComplete="new-password"
          placeholder="Password"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg
                    text-gray-700 placeholder-gray-400
                    focus:outline-none focus:border-blue-500
                    focus:ring-1 focus:ring-blue-500 transition"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
          {error}
        </div>
      )}

      <button
        type="button"
        disabled={loading}
        className="w-full py-2.5 rounded-lg font-medium
                  bg-blue-600 text-white
                  hover:bg-blue-700 disabled:bg-gray-400
                  active:scale-[0.98]
                  transition-all"
        onClick={handleLogin}
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </div>
  );
}

export default Login;