import React from 'react';
import { FaBell } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';

const Topbar = () => {
    const navigate = useNavigate();
    const location = useLocation();

   
    if (location.pathname !== '/') {
        return null;
    }

    return (
        <div className="flex items-center py-4 px-6 bg-[#0c1220] text-white gap-4">
            <div className="flex items-center w-[50%] relative">
                <input
                    type="text"
                    placeholder="Search for your favourite destination"
                    className="w-full px-4 py-4 bg-[#131a2a] placeholder-gray-400 focus:outline-none text-white pr-28"
                    style={{ borderRadius: '8px' }}
                />
                <button
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-lime-400 hover:bg-lime-500 text-black px-6 py-3.5"
                    style={{ borderRadius: '10px' }}
                >
                    Search
                </button>
            </div>

            {/* <div
                className="relative bg-[#1f1f2e] p-4 cursor-pointer hover:bg-lime-400 transition-colors duration-300 group"
                style={{ borderRadius: '30px' }}
            >
                <FaBell className="text-gray-300 text-xl transition-colors duration-300 group-hover:text-black" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
            </div> */}

            <div className="flex space-x-4">
                <button
                    onClick={() => navigate('/login')}
                    className="px-5 py-3 bg-red-400 text-gray-800 rounded-lg shadow-md hover:bg-red-500 transition"
                >
                    Login
                </button>
                <button
                    onClick={() => navigate('/signup')}
                    className="px-5 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
                >
                    Signup
                </button>
            </div>
        </div>
    );
};

export default Topbar;
