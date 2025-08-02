import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaTachometerAlt, FaTicketAlt, FaBookmark, FaEnvelope, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { RiRobot3Fill } from 'react-icons/ri';
import { BsPersonBoundingBox } from 'react-icons/bs';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate(); // ✅ Needed for navigation!

  // Function to check if link is active
  const isActive = (path) =>
    location.pathname === path
      ? "bg-lime-400 text-black"
      : "hover:bg-lime-400 hover:text-black transition-all duration-300";

  // ✅ New logout handler
  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear your auth token
    localStorage.removeItem('user');  // Clear any stored user data too (optional)
    alert('You have been logged out.');
    navigate('/login'); // Redirect to login or home page
  };

  return (
    <div className="w-64 h-screen bg-gradient-to-b from-gray-900 to-gray-800 p-6 flex flex-col text-gray-400 relative space-y-10">
      {/* Logo */}
      <h1 className="text-2xl font-extrabold text-lime-400">Explore<span className="text-white">-TN</span></h1>

      {/* Navigation Links */}
      <ul className="flex flex-col space-y-4">
        <li>
          <Link to="/" className={`flex items-center space-x-4 py-3 px-4 rounded-xl cursor-pointer ${isActive("/")}`}>
            <FaTachometerAlt size={22} />
            <span className="font-semibold text-lg">Dashboard</span>
          </Link>
        </li>

        <li>
          <Link to="/UserPick" className={`flex items-center space-x-4 py-3 px-4 rounded-xl cursor-pointer ${isActive("/UserPick")}`}>
            <FaTicketAlt size={22} />
            <span className="text-lg">User's Pick</span>
          </Link>
        </li>

        <li>
          <Link to="/Favourite" className={`flex items-center space-x-4 py-3 px-4 rounded-xl cursor-pointer ${isActive("/Favourite")}`}>
            <FaBookmark size={22} />
            <span className="text-lg">Favourite</span>
          </Link>
        </li>

        <li>
          <Link to="/hotels" className={`flex items-center space-x-4 py-3 px-4 rounded-xl cursor-pointer ${isActive("/hotels")}`}>
            <FaEnvelope size={22} />
            <span className="text-lg">Bookings</span>
          </Link>
        </li>

        <li>
          <Link to="/Explore-ai" className={`flex items-center space-x-4 py-3 px-4 rounded-xl cursor-pointer ${isActive("/Explore-ai")}`}>
            <RiRobot3Fill size={22} />
            <span className="text-lg">Explore's AI</span>
          </Link>
        </li>

        <li>
          <Link to="/Guides" className={`flex items-center space-x-4 py-3 px-4 rounded-xl cursor-pointer ${isActive("/Guides")}`}>
            <BsPersonBoundingBox size={22} />
            <span className="font-semibold text-lg">Guides</span>
          </Link>
        </li>

        <li>
          <Link to="/settings" className={`flex items-center space-x-4 py-3 px-4 rounded-xl cursor-pointer ${isActive("/settings")}`}>
            <FaCog size={22} />
            <span className="text-lg">Settings</span>
          </Link>
        </li>
      </ul>

      {/* ✅ Working logout button */}
      <div className="mt-auto">
        <button
          onClick={handleLogout} // ✅ call the handler
          className="w-full bg-red-500 flex items-center justify-center gap-2 py-3 rounded-lg text-white hover:bg-red-600 transition-all duration-300"
        >
          <FaSignOutAlt size={20} />
          <span className="text-lg">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
