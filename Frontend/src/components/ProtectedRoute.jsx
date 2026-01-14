import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, role }) {
  const { user, token, isAuthenticated } = useSelector((state) => state.auth);

  // If Redux state is available, use it (after login)
  if (isAuthenticated && user && token) {
    if (role && user.role !== role) {
      return <Navigate to="/" replace />;
    }
    return children;
  }

  // Fallback to localStorage (for page refresh/cold start)
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");

  if (!storedUser || !storedToken) {
    return <Navigate to="/" replace />;
  }

  if (role && storedUser.role !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;