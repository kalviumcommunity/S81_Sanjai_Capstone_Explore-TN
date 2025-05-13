import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaLanguage,
  FaUserTie,
  FaInfoCircle,
} from 'react-icons/fa';
import Guides from '../pages/Guides';

const GuideProfile = () => {
  const { id } = useParams();
  const [guide, setGuide] = useState(null);
  const [bioExpanded, setBioExpanded] = useState(false);

  useEffect(() => {
    const fetchGuide = async () => {
      try {
        const res = await fetch(`http://localhost:8000/Guide/guides/${id}`);
        const data = await res.json();
        setGuide(data);
      } catch (error) {
        console.error('Error fetching guide profile:', error);
      }
    };

    fetchGuide();
  }, [id]);

  if (!guide) return <div className="text-white p-6">Loading...</div>;

  const handleBioToggle = () => {
    setBioExpanded(prev => !prev);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#020617] flex items-center justify-center px-4">
      <div className="bg-[#1e293b] text-white rounded-2xl shadow-xl p-6 max-w-3xl w-full flex flex-wrap items-center justify-between gap-6 relative">
        
        {/* Left - Details */}
        <div className="flex-1 min-w-[220px] space-y-2 flex-grow-1">
          <h1 className="text-3xl font-bold text-cyan-400 mb-2">{guide.name}</h1>

          <p><span className="font-semibold"><i className="fas fa-envelope mr-2"></i>Email:</span> {guide.email || 'N/A'}</p>
          <p><span className="font-semibold"><i className="fas fa-phone mr-2"></i>Phone:</span> {guide.phone || 'N/A'}</p>
          <p><span className="font-semibold"><i className="fas fa-map-marker-alt mr-2"></i>Location:</span> {guide.location || 'N/A'}</p>
          <p><span className="font-semibold"><i className="fas fa-language mr-2"></i>Languages:</span> {guide.languages || 'N/A'}</p>
          <p><span className="font-semibold"><i className="fas fa-user-tie mr-2"></i>Experience:</span> {guide.experience || 'N/A'}</p>
          
          {/* Bio Section */}
          <div className="bio-container space-y-2">
            <p className="font-semibold"><i className="fas fa-info-circle mr-2"></i>Bio:</p>
            <div
              className={`bio-text ${bioExpanded ? 'expanded' : 'collapsed'}`}
              style={{ maxHeight: bioExpanded ? 'none' : '100px', overflow: 'hidden' }}
            >
              {guide.bio || 'N/A'}
            </div>
            <button
              onClick={handleBioToggle}
              className="text-cyan-400 text-sm mt-2 hover:underline"
            >
              {bioExpanded ? 'Show Less' : 'Read More'}
            </button>
          </div>
        </div>

        {/* Right - Guide Image */}
        {guide.photo && (
          <div className="flex justify-center items-center flex-shrink-0">
            <img
             src={`http://localhost:8000${guide.photo}`}

              alt="Guide"
              className="rounded-2xl w-72 h-72 object-cover border border-cyan-500 shadow-lg transform group-hover:scale-105 transition duration-500"
            />
          </div>
        )}

        {/* Glowing Circle Decoration */}
        <div className="absolute w-32 h-32 bg-cyan-400 rounded-full blur-3xl opacity-20 top-[-40px] right-[-40px] group-hover:opacity-40 transition duration-500" />
      </div>
    </div>
  );
};

export default GuideProfile;
