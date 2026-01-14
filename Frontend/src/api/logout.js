import { apiRequest } from "./api";

export async function logout(navigate) {
  await apiRequest("/auth/logout", "POST")
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  navigate("/");
}
