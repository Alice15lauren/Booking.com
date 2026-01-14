const API_BASE_URL = "http://localhost:3000";

export async function apiRequest(endpoint, method, body) {
  const token = localStorage.getItem("token");
  //const role = localStorage.getItem("role");
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: body ? JSON.stringify(body) : null,
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Something went wrong");
  }

  return res.json();
}
