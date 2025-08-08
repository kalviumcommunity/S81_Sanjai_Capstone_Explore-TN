import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../src/baseURL";
const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You are not logged in!");
        navigate("/login");
        return;
      }

      try {
        const res = await fetch(`${BASE_URL}/User/profile`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (res.ok) {
          setProfile(data.user);
        } else {
          alert(data.message || "Failed to fetch profile");
          navigate("/login");
        }
      } catch (err) {
        console.error("Profile fetch failed:", err);
        alert("Server error");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl">
        Loading your profile...
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-black">
      <div
        className="relative"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* This is the base */}
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700">
          👤 My Profile
        </button>

        {/* This is the hover card */}
        {hovered && (
          <div className="absolute top-full mt-2 right-0 bg-white border shadow-lg rounded-lg p-4 w-64 text-left z-50">
            <p className="mb-2"><strong>Name:</strong> {profile.name}</p>
            <p className="mb-4"><strong>Email:</strong> {profile.email}</p>
            <button
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/");
              }}
              className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
