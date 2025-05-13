import React, { useState } from "react";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);  // Added loading state
  const navigate = useNavigate();

  const handleSignup = async () => {
    // Basic form validation
    if (!form.username || !form.email || !form.password) {
      alert("Please fill in all fields.");
      return;
    }
  
    setLoading(true);
  
    try {
      const res = await fetch("http://localhost:8000/User/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.username,
          email: form.email,
          password: form.password,
        }),
      });
  
      const data = await res.json();
  
      if (res.ok) {
        alert("Signup successful!");
        navigate("/login");
      } else {
        alert(data.message || "Signup failed");
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white w-full max-w-sm p-6 rounded-xl shadow-lg">
        {/* Header Switch */}
        <div className="flex justify-between items-center border-b pb-2 mb-4 gap-2">
          <Link
            to="/login"
            className="w-1/2 text-center text-black bg-gray-200 py-2 hover:bg-blue-600 rounded-lg hover:text-white"
          >
            Login
          </Link>
          <button className="w-1/2 text-center text-white bg-blue-600 py-2 rounded-lg">
            Signup
          </button>
        </div>

        <h2 className="text-xl font-bold text-center text-gray-800 mb-4">
          Signup Form
        </h2>

        <div className="space-y-4 text-black">
          <div className="relative">
            <FaUser className="absolute left-3 top-4 text-gray-500" />
            <input
              type="text"
              placeholder="Username"
              className="pl-10 pr-4 py-3 w-full border rounded-lg bg-gray-100"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
            />
          </div>

          <div className="relative">
            <FaEnvelope className="absolute left-3 top-4 text-gray-500" />
            <input
              type="email"
              placeholder="Email Address"
              className="pl-10 pr-4 py-3 w-full border rounded-lg bg-gray-100"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div className="relative">
            <FaLock className="absolute left-3 top-4 text-gray-500" />
            <input
              type="password"
              placeholder="Password"
              className="pl-10 pr-4 py-3 w-full border rounded-lg bg-gray-100"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          <button
            onClick={handleSignup}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
            disabled={loading} // Disable the button when loading
          >
            {loading ? "Signing Up..." : "Signup"}
          </button>
        </div>

        <div className="mt-4">
          <button
            onClick={() => navigate("/")}
            className="w-full bg-gray-200 text-black py-3 rounded-lg hover:bg-gray-300"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
