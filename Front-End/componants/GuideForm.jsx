import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCamera } from 'react-icons/fa';

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
    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => form.append(key, value));

    try {
      const res = await fetch('http://localhost:8000/Guide/guides', {
        method: 'POST',
        body: form,
      });

      const data = await res.json();
      console.log('Submitted:', data);

      if (data && data._id) {
        localStorage.setItem('guideId', data._id); // Save the guide ID in local storage
        navigate(`/guides/${data._id}`); // Dynamically navigate to the new guide profile
      } else {
        console.error("Guide ID not found. Cannot navigate to profile.");
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  const handleGoBack = () => {
    // Navigate to the guide profile if the guideId exists, else go back to the previous page
    const guideId = localStorage.getItem('guideId');
    if (guideId) {
      navigate(`/guides/${guideId}`);
    } else {
      navigate(-1); // Fallback to previous page
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md text-white space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center mb-2">Guide Sign Up</h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 placeholder-gray-400"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 placeholder-gray-400"
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          required
          className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 placeholder-gray-400"
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
          className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 placeholder-gray-400"
        />
        <input
          type="text"
          name="languages"
          placeholder="Languages (comma separated)"
          value={formData.languages}
          onChange={handleChange}
          required
          className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 placeholder-gray-400"
        />
        <input
          type="number"
          name="experience"
          placeholder="Experience (years)"
          value={formData.experience}
          onChange={handleChange}
          className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 placeholder-gray-400"
        />
        <textarea
          name="bio"
          placeholder="Short Bio"
          value={formData.bio}
          onChange={handleChange}
          rows={3}
          className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 placeholder-gray-400"
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
