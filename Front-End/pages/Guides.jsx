import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle, FaStar } from 'react-icons/fa';

function Guides() {
  const navigate = useNavigate();
  const [guides, setGuides] = useState([]);
  const [guideId, setGuideId] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');

  useEffect(() => {
    const fetchGuides = async () => {
      try {
        const res = await fetch('http://localhost:8000/Guide/guides');
        const data = await res.json();
        setGuides(data);
      } catch (error) {
        console.error('Error fetching guides:', error);
      }
    };

    const storedGuideId = localStorage.getItem('guideId');
    setGuideId(storedGuideId);

    fetchGuides();
  }, []);

  const goToSignupForm = () => navigate('/GuideForm');

  const goToGuideProfile = (id) => navigate(`/guides/${id}`);

  const handleLogout = () => {
    localStorage.removeItem('guideId');
    setGuideId(null);
  };

  const locations = [...new Set(guides.map((g) => g.location))];
  const languages = [...new Set(guides.flatMap((g) => g.languages || []))];

  const filteredGuides = guides.filter((guide) => {
    const matchesLocation = selectedLocation ? guide.location === selectedLocation : true;
    const matchesLanguage = selectedLanguage ? guide.languages?.includes(selectedLanguage) : true;
    return matchesLocation && matchesLanguage;
  });

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Guide Dashboard</h1>
        <div className="flex items-center gap-4">
          {guideId ? (
            <>
              <button
                onClick={() => goToGuideProfile(guideId)}
                className="text-3xl text-white bg-cyan-500 hover:bg-cyan-600 rounded-full p-3 transition"
              >
                <FaUserCircle />
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg transition"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={goToSignupForm}
              className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-4 py-2 rounded-lg transition"
            >
              Create Guide Profile
            </button>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <select
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
          className="bg-gray-800 text-white px-4 py-2 rounded-lg"
        >
          <option value="">All Locations</option>
          {locations.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>

        <select
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
          className="bg-gray-800 text-white px-4 py-2 rounded-lg"
        >
          <option value="">All Languages</option>
          {languages.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>
      </div>

      {/* Guide Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {filteredGuides.map((guide) => (
          <div
            key={guide._id}
            onClick={() => goToGuideProfile(guide._id)}
            className="bg-gray-800 hover:bg-gray-700 transition rounded-xl shadow-lg cursor-pointer flex p-4 gap-4 items-start"
          >
            <div className="w-55 h-55 rounded-lg overflow-hidden flex-shrink-0">
              {guide.photo ? (
                <img
                  src={`http://localhost:8000${guide.photo}`}
                  alt="Guide"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-600 flex items-center justify-center text-5xl text-gray-300">
                  <FaUserCircle />
                </div>
              )}
            </div>

            <div className="flex flex-col gap-3 text-sm w-full">
              <p><span className="font-semibold">Name:</span> {guide.name}</p>
              <p><span className="font-semibold">Email:</span> {guide.email}</p>
              <p><span className="font-semibold">Mobile:</span> {guide.phone}</p>
              <p><span className="font-semibold">Location:</span> {guide.location}</p>
              <p>
                <span className="font-semibold">Bio:</span>{' '}
                {guide.bio ? (
                  <span title={guide.bio}>
                    {guide.bio.length > 60 ? guide.bio.slice(0, 60) + '...' : guide.bio}
                  </span>
                ) : (
                  'No Bio available'
                )}
              </p>
              <p>
                <span className="font-semibold">Languages:</span>{' '}
                {guide.languages?.length > 0 ? guide.languages.join(', ') : 'Not listed'}
              </p>

              <RatingWidget
                avgRating={guide.avgRating}
                totalRatings={guide.totalRatings}
                onRate={(rating) => {
                  console.log(`User rated ${guide.name} with ${rating} stars`);
                  // TODO: Call your backend here
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Guides;

const RatingWidget = ({ avgRating = 0, totalRatings = 0, onRate }) => {
  const [userRating, setUserRating] = useState(0);
  const [hover, setHover] = useState(null);

  const handleClick = (rating, e) => {
    e.stopPropagation();
    setUserRating(rating);
    if (onRate) onRate(rating);
  };

  return (
    <div>
      <div className="flex items-center gap-1 mt-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar
            key={star}
            size={18}
            className={`cursor-pointer transition ${
              (hover || userRating || Math.round(avgRating)) >= star
                ? 'text-yellow-400'
                : 'text-gray-500'
            }`}
            onClick={(e) => handleClick(star, e)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(null)}
          />
        ))}
        <span className="ml-2 text-sm text-gray-300">
          {avgRating.toFixed(1)} ({totalRatings})
        </span>
      </div>
    </div>
  );
};
