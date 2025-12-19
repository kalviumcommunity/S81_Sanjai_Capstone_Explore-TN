import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { TbUserCircle } from 'react-icons/tb';
import { FaChevronDown, FaEdit, FaSave, FaTimes, FaTrash } from 'react-icons/fa';
import { updateUserProfile, deleteUserAccount } from '../src/userService';
import { toast } from 'react-toastify';

const Topbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profile, setProfile] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token && token !== 'undefined' && token !== 'null');

    if (token && token !== 'undefined' && token !== 'null') {
      const userData = localStorage.getItem('user');
      if (userData && userData !== 'undefined' && userData !== 'null') {
        try {
          const parsedUser = JSON.parse(userData);
          setProfile(parsedUser);
          setEditedName(parsedUser.name || '');
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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.profile-dropdown')) {
        setDropdownOpen(false);
        setIsEditing(false);
        setShowDeleteConfirm(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      setEditedName(profile?.name || '');
    }
  };

  const handleSaveName = async () => {
    if (!editedName.trim()) {
      toast.error('Name cannot be empty');
      return;
    }

    setIsLoading(true);
    try {
      const response = await updateUserProfile(editedName.trim());

      // Update local storage and state
      const updatedUser = response.user;
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setProfile(updatedUser);
      setIsEditing(false);

      toast.success('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error(error.response?.data?.message || 'Failed to update profile');
      setEditedName(profile?.name || '');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setEditedName(profile?.name || '');
    setIsEditing(false);
  };

  const handleDeleteAccount = async () => {
    setIsLoading(true);
    try {
      await deleteUserAccount();

      // Clear all user data
      localStorage.removeItem('token');
      localStorage.removeItem('user');

      toast.success('Account deleted successfully');
      setDropdownOpen(false);
      navigate('/');
      window.location.reload();
    } catch (error) {
      console.error('Error deleting account:', error);
      toast.error(error.response?.data?.message || 'Failed to delete account');
    } finally {
      setIsLoading(false);
      setShowDeleteConfirm(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    toast.info('Logged out successfully');
    navigate("/");
  };

  if (location.pathname !== '/') return null;

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0c1220] text-white shadow-md">
      <div className="flex flex-col md:flex-row items-center justify-between px-6 py-4 gap-6">

        {/* Search Bar */}
        <div className="flex w-full md:w-[65%] lg:w-[70%] xl:w-[76%] relative">
          <input
            type="text"
            placeholder="Search for your favourite destination"
            className="w-full px-4 py-4 bg-[#131a2a] placeholder-gray-400 focus:outline-none text-white rounded-md pr-32"
          />
          <button
            className="absolute right-1 top-1/2 -translate-y-1/2 bg-lime-400 hover:bg-lime-500 text-black px-6 py-4 rounded-md transition"
          >
            Search
          </button>
        </div>

        {/* Auth or Profile */}
        <div className="flex items-center gap-4 relative pr-2">
          {!isLoggedIn ? (
            <>
              <button
                onClick={() => navigate('/login')}
                className="px-6 py-2.5 bg-red-500 text-white rounded-md shadow hover:bg-red-600 transition"
              >
                Login
              </button>
              <button
                onClick={() => navigate('/signup')}
                className="px-6 py-2.5 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 transition"
              >
                Signup
              </button>
            </>
          ) : (
            <div
              className="flex items-center gap-2 cursor-pointer relative pr-13 px-12 py-3 rounded-full bg-[#1f2937] hover:bg-[#374151] transition profile-dropdown"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <TbUserCircle size={32} className="text-green-400" />
              <span className="text-white font-medium text-[18px] whitespace-nowrap">
                {profile?.name || "User"}
              </span>
              <FaChevronDown size={12} className="text-white" />

              {dropdownOpen && profile && (
                <div className="absolute top-full right-0 mt-2 bg-white text-black border border-gray-200 shadow-lg rounded-lg p-4 w-80 z-50 animate-fadeIn">

                  {/* Name Section */}
                  <div className="mb-3">
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Name</label>
                    {isEditing ? (
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={editedName}
                          onChange={(e) => setEditedName(e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Enter your name"
                          disabled={isLoading}
                          onClick={(e) => e.stopPropagation()}
                        />
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSaveName();
                          }}
                          disabled={isLoading}
                          className="p-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition disabled:opacity-50"
                          title="Save"
                        >
                          <FaSave size={16} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCancelEdit();
                          }}
                          disabled={isLoading}
                          className="p-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition disabled:opacity-50"
                          title="Cancel"
                        >
                          <FaTimes size={16} />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <span className="text-gray-900 font-medium">{profile.name}</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditToggle();
                          }}
                          className="p-2 text-blue-500 hover:bg-blue-50 rounded-md transition"
                          title="Edit name"
                        >
                          <FaEdit size={16} />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Email Section */}
                  <div className="mb-4">
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                    <p className="text-gray-900">{profile.email}</p>
                  </div>

                  {/* Divider */}
                  <hr className="my-3 border-gray-200" />

                  {/* Action Buttons */}
                  <div className="space-y-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLogout();
                      }}
                      className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition font-medium"
                    >
                      Logout
                    </button>

                    {!showDeleteConfirm ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowDeleteConfirm(true);
                        }}
                        className="w-full bg-gray-200 text-gray-700 py-2 rounded-md hover:bg-gray-300 transition font-medium flex items-center justify-center gap-2"
                      >
                        <FaTrash size={14} />
                        Delete Account
                      </button>
                    ) : (
                      <div className="bg-red-50 border border-red-200 rounded-md p-3" onClick={(e) => e.stopPropagation()}>
                        <p className="text-sm text-red-800 mb-2 font-semibold">Are you sure?</p>
                        <div className="flex gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteAccount();
                            }}
                            disabled={isLoading}
                            className="flex-1 bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition text-sm font-medium disabled:opacity-50"
                          >
                            {isLoading ? 'Deleting...' : 'Yes, Delete'}
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowDeleteConfirm(false);
                            }}
                            disabled={isLoading}
                            className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-400 transition text-sm font-medium disabled:opacity-50"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
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
