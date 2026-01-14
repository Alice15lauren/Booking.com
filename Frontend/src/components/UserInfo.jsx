/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { apiRequest } from "../api/api";
import { useNavigate } from "react-router-dom";

function UserInfo() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUsers() {
      try {
        const data = await apiRequest("/admin/users", "GET");
        setUsers(data);
      } catch (e) {
        setError("Failed to load users");
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="p-8 text-gray-500 text-center">
        Loading users…
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-red-600 text-center">
        {error}
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">
        User Information
      </h1>

      <div className="overflow-x-auto bg-white rounded-xl shadow-sm border">
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="p-4 text-left text-sm font-semibold text-gray-600">
                Name
              </th>
              <th className="p-4 text-left text-sm font-semibold text-gray-600">
                Email
              </th>
              <th className="p-4 text-left text-sm font-semibold text-gray-600">
                Role
              </th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr
                key={u.id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="p-4 text-gray-800 font-medium">
                  {u.name}
                </td>

                <td className="p-4 text-gray-600">
                  {u.email}
                </td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${u.role === "admin"
                      ? "bg-purple-100 text-purple-700"
                      : "bg-blue-100 text-blue-700"
                      }`}
                  >
                    {u.role}
                  </span>
                </td>
              </tr>
            ))}

            {users.length === 0 && (
              <tr>
                <td
                  colSpan="3"
                  className="p-6 text-center text-gray-500"
                >
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-8">
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-2 rounded-lg bg-blue-600 text-white font-medium
            hover:bg-blue-700 transition cursor-pointer"
        >
          Back
        </button>
      </div>
    </div>
  );
}

export default UserInfo;
