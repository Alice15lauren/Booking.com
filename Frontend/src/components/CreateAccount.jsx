import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../api/api";

function CreateAccount() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  return (
    <div className="w-80 bg-white rounded-xl shadow-md p-6">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Create Account
      </h2>

      <input
        type="text"
        placeholder="Name"
        className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="email"
        placeholder="Email"
        autoComplete="off"
        className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        autoComplete="new-password"
        className="w-full mb-5 px-4 py-2 border border-gray-300 rounded-lg"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        className="w-full bg-blue-600 text-white py-2 rounded-lg mb-4"
        onClick={async () => {
  try {
    const data = await apiRequest("/user/create", "POST", {
      name,
      email,
      password,
    });

    localStorage.setItem("token", data.token);

    navigate("/login");
  } catch (err) {
    alert(err.message);
  }
}}
      >
        Create Account
      </button>

      <p
        className="text-sm text-center text-blue-600 cursor-pointer"
        onClick={() => navigate("/login")}
      >
        Already have an account?
      </p>
    </div>
  );
}

export default CreateAccount;
