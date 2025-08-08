import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BASE_URL from '../src/baseURL';

const GuideEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [guide, setGuide] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    languages: '',
    experience: '',
    bio: '',
  });

  useEffect(() => {
    const fetchGuide = async () => {
      try {
        const res = await fetch(`${BASE_URL}/Guide/guides/${id}`);
        const data = await res.json();
        setGuide(data);
      } catch (error) {
        console.error('Error fetching guide:', error);
      }
    };
    fetchGuide();
  }, [id]);

  const handleChange = (e) => {
    setGuide({ ...guide, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(`${BASE_URL}/Guide/guides/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(guide),
      });
      navigate(`/guides/${id}`);
    } catch (error) {
      console.error('Error updating guide:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#020617] flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-[#1e293b] text-white rounded-2xl shadow-xl p-6 max-w-3xl w-full space-y-4"
      >
        <h1 className="text-3xl font-bold text-cyan-400 mb-4">Edit Guide</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={guide.name}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg text-black"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={guide.email}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg text-black"
            />
          </div>
          <div>
            <label className="block mb-1">Phone</label>
            <input
              type="text"
              name="phone"
              value={guide.phone}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg text-black"
            />
          </div>
          <div>
            <label className="block mb-1">Location</label>
            <input
              type="text"
              name="location"
              value={guide.location}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg text-black"
            />
          </div>
          <div>
            <label className="block mb-1">Languages</label>
            <input
              type="text"
              name="languages"
              value={guide.languages}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg text-black"
            />
          </div>
          <div>
            <label className="block mb-1">Experience</label>
            <input
              type="text"
              name="experience"
              value={guide.experience}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg text-black"
            />
          </div>
        </div>

        <div>
          <label className="block mb-1">Bio</label>
          <textarea
            name="bio"
            value={guide.bio}
            onChange={handleChange}
            rows="4"
            className="w-full px-3 py-2 rounded-lg text-black"
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-lg transition"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default GuideEdit;
