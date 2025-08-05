// src/api.js
import axios from 'axios';

// ✅ Use your deployed Render backend here
const API = axios.create({
  baseURL: 'https://s81-sanjai-capstone-explore-tn-1.onrender.com/User',
  withCredentials: true, // Optional: only if you're using cookies
});

// ✅ Get favorites with token
export const getFavorites = (token) =>
  API.get('/favorites', {
    headers: { Authorization: `Bearer ${token}` },
  });

// ✅ Toggle favorite with token and placeTitle
export const toggleFavorite = (placeTitle, token) =>
  API.post(
    '/favorites',
    { placeTitle },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

export default API;
