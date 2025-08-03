import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Folder, UserCircle, Trash2, Pencil } from 'lucide-react';

function UserPicks() {
  const navigate = useNavigate();
  const [userPicks, setUserPicks] = useState([]);
  const [userId, setUserId] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const fetchUserPicks = async () => {
      try {
        const res = await fetch('http://localhost:8000/api/user-picks/get');
        if (!res.ok) throw new Error(`Server error: ${res.status}`);
        const data = await res.json();
        setUserPicks(data);
      } catch (err) {
        console.error('Error fetching picks:', err);
      }
    };

    const storedUserId = localStorage.getItem('userId');
    setUserId(storedUserId);
    fetchUserPicks();
  }, []);

  const goToCreateForm = () => navigate('/UserPickForm');
  const goToEditForm = (id) => navigate(`/edit-userpick/${id}`);

  const handleLogout = () => {
    localStorage.removeItem('userId');
    setUserId(null);
    window.location.reload();
  };

  const deletePick = async (id) => {
    const confirmDelete = window.confirm('Delete this pick?');
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:8000/UserPick/picks/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        alert('Deleted!');
        setUserPicks(userPicks.filter((p) => p._id !== id));
      } else {
        alert('Failed to delete.');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const locations = [...new Set(userPicks.map((p) => p.location))];
  const categories = [...new Set(userPicks.map((p) => p.category))];

  const filteredPicks = userPicks.filter((p) => {
    const matchesLocation = selectedLocation ? p.location === selectedLocation : true;
    const matchesCategory = selectedCategory ? p.category === selectedCategory : true;
    return matchesLocation && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">🌟 User Picks</h1>
        <div className="flex gap-4">
          {userId ? (
            <>
              <button
                onClick={goToCreateForm}
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 px-5 py-2 rounded-lg font-semibold text-white"
              >
                ➕ Add Place
              </button>
              <button
                onClick={handleLogout}
                className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 px-5 py-2 rounded-lg font-semibold text-white"
              >
                🚪 Logout
              </button>
            </>
          ) : (
            <button
              onClick={goToCreateForm}
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 px-5 py-2 rounded-lg font-semibold text-white"
            >
              Share a Hidden Gem
            </button>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <select
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
          className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 px-4 py-2 rounded-lg"
        >
          <option value="">🌍 All Locations</option>
          {locations.map((loc) => (
            <option key={loc} value={loc}>{loc}</option>
          ))}
        </select>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 px-4 py-2 rounded-lg"
        >
          <option value="">📂 All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Cards Grid */}
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
  {filteredPicks.map((pick) => (
    <div
      key={pick._id}
      className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow hover:shadow-lg transition-all duration-300 flex flex-col relative"
    >
      <div className="w-full h-48">
        {pick.imageUrl ? (
          <img
            src={pick.imageUrl}
            alt={pick.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
            <UserCircle size={48} className="text-gray-500" />
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-1 line-clamp-1">{pick.title}</h2>
        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-2">
          <span className="flex items-center gap-1">
            <MapPin size={14} /> {pick.location}
          </span>
          <span className="flex items-center gap-1">
            <Folder size={14} /> {pick.category}
          </span>
        </div>
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 line-clamp-2">
          {pick.description || 'No description provided.'}
        </p>
        <div className="mt-auto text-xs text-gray-500 dark:text-gray-400">
          Posted by: {pick.username || 'Anonymous'}
        </div>
      </div>

      {pick.userId === userId && (
        <div className="absolute top-3 right-3 flex gap-2">
          <button
            onClick={() => goToEditForm(pick._id)}
            className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full"
          >
            <Pencil size={16} />
          </button>
          <button
            onClick={() => deletePick(pick._id)}
            className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full"
          >
            <Trash2 size={16} />
          </button>
        </div>
      )}
    </div>
  ))}
</div>


    </div>
  );
}

export default UserPicks;