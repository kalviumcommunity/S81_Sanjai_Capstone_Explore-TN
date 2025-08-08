import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCamera } from 'react-icons/fa';
import BASE_URL from '../src/baseURL'; // ✅ imported base URL

const UserPickForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        title: '',
        location: '',
        category: '',
        description: '',
        image: null, // ✅ change this line
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
            const res = await fetch(`${BASE_URL}/api/user-picks/Post`, {

                method: 'POST',
                body: form,
            });

            const data = await res.json();
            console.log('Submitted:', data);

            if (data && data._id) {
                navigate('/UserPick'); 
            }
            else {
                console.error('Failed to create user pick');
            }
        } catch (err) {
            console.error('Error submitting form:', err);
        }
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
            <form
                onSubmit={handleSubmit}
                className="bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md text-white space-y-4"
            >
                <h2 className="text-2xl font-semibold text-center mb-2">Share Your Hidden Gem</h2>

                <input
                    type="text"
                    name="username"
                    placeholder="Your Name"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 placeholder-gray-400"
                />

                <input
                    type="text"
                    name="title"
                    placeholder="Place Title"
                    value={formData.title}
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
                    name="category"
                    placeholder="Category (e.g. Waterfall, Temple, Viewpoint)"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 placeholder-gray-400"
                />

                <textarea
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    required
                    className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 placeholder-gray-400"
                />

                <div className="flex justify-center">
                    <label
                        htmlFor="image" // ✅ This must match the input's `id`
                        className="w-24 h-24 rounded-full bg-orange-500 flex items-center justify-center cursor-pointer overflow-hidden"
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
                        name="image"
                        id="image" // ✅ Must match htmlFor
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

export default UserPickForm;
