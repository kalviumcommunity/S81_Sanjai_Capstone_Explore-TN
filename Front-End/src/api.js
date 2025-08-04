// src/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8000/User',
});

export const getFavorites = (token) =>
  API.get('/favorites', {
    headers: { Authorization: `Bearer ${token}` },
  });

export const toggleFavorite = (placeTitle, token) =>
  API.post(
    '/favorites',
    { placeTitle },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
