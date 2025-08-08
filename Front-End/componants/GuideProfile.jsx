import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaLanguage,
  FaUserTie,
  FaInfoCircle,
  FaEdit,
  FaTrash
} from 'react-icons/fa';
import BASE_URL from '../baseURL'; // ✅ Import base URL

const GuideProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [guide, setGuide] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bioExpanded, setBioExpanded] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    const fetchGuide = async () => {
      try {
        const res = await fetch(`${BASE_URL}/Guide/guides/${id}`);
        if (res.ok) {
          const data = await res.json();
          setGuide(data);
        } else if (res.status === 404) {
          setGuide(null);
        } else {
          console.error('Failed to fetch guide:', res.status);
          setGuide(null);
        }
      } catch (error) {
        console.error('Error fetching guide profile:', error);
        setGuide(null);
      } finally {
        setLoading(false);
      }
    };

    fetchGuide();

    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setCurrentUserId(payload.id);
      } catch (e) {
        console.error("Invalid token format");
      }
    }
  }, [id]);

  const handleBioToggle = () => setBioExpanded(prev => !prev);

  const handleEdit = () => navigate(`/guides/${id}/edit`);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this guide?')) {
      try {
        const token = localStorage.getItem('token');
        await fetch(`${BASE_URL}/Guide/guides/${id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` }
        });
        navigate('/guides');
      } catch (error) {
        console.error('Error deleting guide:', error);
      }
    }
  };

  if (loading) return <div className="text-white p-6">Loading...</div>;

  if (!guide) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white p-6">
        <h1 className="text-2xl font-bold">Guide profile not found.</h1>
      </div>
    );
  }

  const isOwner = guide.userId === currentUserId;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#020617] flex items-center justify-center px-4">
      <div className="bg-[#1e293b] text-white rounded-2xl shadow-xl p-6 max-w-3xl w-full flex flex-wrap items-center justify-between gap-6 relative">
        <div className="flex-1 min-w-[220px] space-y-2 flex-grow-1">
          <h1 className="text-3xl font-bold text-cyan-400 mb-2">{guide.name}</h1>

          <p><span className="font-semibold"><FaEnvelope className="inline mr-2" />Email:</span> {guide.email || 'N/A'}</p>
          <p><span className="font-semibold"><FaPhone className="inline mr-2" />Phone:</span> {guide.phone || 'N/A'}</p>
          <p><span className="font-semibold"><FaMapMarkerAlt className="inline mr-2" />Location:</span> {guide.location || 'N/A'}</p>
          <p><span className="font-semibold"><FaLanguage className="inline mr-2" />Languages:</span> {guide.languages?.join(', ') || 'N/A'}</p>
          <p><span className="font-semibold"><FaUserTie className="inline mr-2" />Experience:</span> {guide.experience || 'N/A'}</p>

          <div className="bio-container space-y-2">
            <p className="font-semibold"><FaInfoCircle className="inline mr-2" />Bio:</p>
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

          {isOwner && (
            <div className="flex gap-4 mt-6">
              <button
                onClick={handleEdit}
                className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-lg transition"
              >
                <FaEdit /> Edit
              </button>
              <button
                onClick={handleDelete}
                className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
              >
                <FaTrash /> Delete
              </button>
            </div>
          )}
        </div>

        {guide.photo && (
          <div className="flex justify-center items-center flex-shrink-0">
            <img
  src={`${BASE_URL}/uploads/${guide.photo}`}
  alt="Guide"
  className="rounded-2xl w-72 h-72 object-cover border border-cyan-500 shadow-lg"
/>

          </div>
        )}

        <div className="absolute w-32 h-32 bg-cyan-400 rounded-full blur-3xl opacity-20 top-[-40px] right-[-40px]" />
      </div>
    </div>
  );
};

export default GuideProfile;
