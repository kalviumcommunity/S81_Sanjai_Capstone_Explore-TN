import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCamera } from 'react-icons/fa';
import BASE_URL from '../src/baseURL';
const SimpleGuideForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    languages: '',
    experience: '',
    bio: '',
    photo: null,
  });

  const [preview, setPreview] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === 'file') {
      const file = files[0];
      setFormData({ ...formData, [name]: file });

      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        setPreview(null);
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => form.append(key, value));

    const token = localStorage.getItem('token');

    if (!token) {
      setError('You must be logged in to submit.');
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/Guide/guides`, {

        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: form,
      });

      const data = await res.json();
      console.log('Submitted:', data);

      if (res.status === 409) {
        setError(data.message || 'Email already in use.');
        return;
      }

      if (res.ok && data && data._id) {
        localStorage.setItem('guideId', data._id);
        navigate(`/guides/${data._id}`);
      } else {
        setError(data.message || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Network error. Please try again later.');
    }
  };

  const handleGoBack = () => {
    const guideId = localStorage.getItem('guideId');
    if (guideId) {
      navigate(`/guides/${guideId}`);
    } else {
      navigate(-1);
    }
  };

  const inputClasses =
    'w-full p-3 rounded-md bg-gray-700 border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500';

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md text-white space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center mb-2">Guide Sign Up</h2>

        {error && (
          <p className="text-red-500 text-sm text-center">{error}</p>
        )}

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
          className={inputClasses}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className={inputClasses}
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          required
          className={inputClasses}
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
          className={inputClasses}
        />
        <input
          type="text"
          name="languages"
          placeholder="Languages (comma separated)"
          value={formData.languages}
          onChange={handleChange}
          required
          className={inputClasses}
        />
        <input
          type="number"
          name="experience"
          placeholder="Experience (years)"
          value={formData.experience}
          onChange={handleChange}
          className={inputClasses}
        />
        <textarea
          name="bio"
          placeholder="Short Bio"
          value={formData.bio}
          onChange={handleChange}
          rows={3}
          className={inputClasses}
        />

        <div className="flex justify-center">
          <label
            htmlFor="photo"
            className="w-25 h-25 rounded-full bg-orange-500 flex items-center justify-center cursor-pointer overflow-hidden"
          >
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <FaCamera className="text-white text-xl" />
            )}
          </label>
          <input
            type="file"
            name="photo"
            id="photo"
            accept="image/*"
            onChange={handleChange}
            className="hidden"
          />
        </div>

        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-2 rounded-lg"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={handleGoBack}
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-2 rounded-lg"
          >
            Go back
          </button>
        </div>
      </form>
    </div>
  );
};

export default SimpleGuideForm;
