import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Topbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profile, setProfile] = useState(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
  const token = localStorage.getItem('token');
  setIsLoggedIn(!!token && token !== 'undefined' && token !== 'null');

  if (token && token !== 'undefined' && token !== 'null') {
    const userData = localStorage.getItem('user');
    if (userData && userData !== 'undefined' && userData !== 'null') {
      try {
        setProfile(JSON.parse(userData));
      } catch (err) {
        console.error("Invalid JSON for user data:", err);
        setProfile(null);
      }
    } else {
      setProfile(null);
    }
  } else {
    setProfile(null);
  }
}, [location]);


  if (location.pathname !== '/') return null;

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0c1220] text-white shadow-md">
      <div className="flex flex-col md:flex-row items-center justify-between px-6 py-4 gap-4">

        {/* Longer Search Bar */}
        <div className="flex w-full md:w-[65%] lg:w-[70%] xl:w-[75%] relative transition-all duration-300">
          <input
            type="text"
            placeholder="Search for your favourite destination"
            className="w-full px-4 py-4 bg-[#131a2a] placeholder-gray-400 focus:outline-none text-white rounded-md pr-32"
          />
          <button
            className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-lime-400 hover:bg-lime-500 text-black px-6 py-4 rounded-md transition"
          >
            Search
          </button>
        </div>

        {/* Auth Buttons or Profile */}
        <div className="flex items-center gap-4 relative">
          {!isLoggedIn ? (
            <>
              <button
                onClick={() => navigate('/login')}
                className="px-10 py-2.5 bg-red-500 text-white rounded-md shadow hover:bg-red-600 transition"
              >
                Login
              </button>
              <button
                onClick={() => navigate('/signup')}
                className="px-8 py-2.5 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 transition"
              >
                Signup
              </button>
            </>
          ) : (
            <div
              className="relative"
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              <button className="px-5 py-2.5 bg-green-500 text-white rounded-md shadow hover:bg-green-600 transition">
                👤 My Profile
              </button>

              {hovered && profile && (
                <div className="absolute top-full right-0 mt-2 bg-white text-black border shadow-lg rounded-lg p-4 w-64 z-50">
                  <p className="mb-2"><strong>Name:</strong> {profile.name}</p>
                  <p className="mb-4"><strong>Email:</strong> {profile.email}</p>
                  <button
                    onClick={() => {
                      localStorage.removeItem("token");
                      localStorage.removeItem("user");
                      navigate("/");
                    }}
                    className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

      </div>
    </header>
  );
};

export default Topbar;
