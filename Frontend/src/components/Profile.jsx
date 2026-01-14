/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Profile() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: ""
    });

    const storedUser = useSelector((state) => state.auth.user);

    useEffect(() => {
        if (!storedUser) {
            navigate("/");
            return;
        }

        setFormData({
            name: storedUser.name,
            email: storedUser.email
        });
    }, [storedUser, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const updatedUser = {
            ...storedUser,
            name: formData.name,
            email: formData.email,
        };

        // Update Redux (optional if you have updateProfile action)
        // dispatch(updateProfile(updatedUser));

        // Update localStorage
        localStorage.setItem("user", JSON.stringify(updatedUser));

        alert("Profile updated successfully");

        if (storedUser.role === "admin") navigate("/admin-home");
        else navigate("/user-home");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-xl shadow-lg w-96">
                <h2 className="text-2xl font-semibold mb-6 text-center">
                    Edit Profile
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full border rounded-lg px-3 py-2"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full border rounded-lg px-3 py-2"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                    >
                        Save Changes
                    </button>
                    <div className="flex justify-center mt-0">
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="px-6 py-2 rounded-lg bg-blue-600 text-white font-medium
            hover:bg-blue-700 transition cursor-pointer"
                        >
                            Back
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Profile;
