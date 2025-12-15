import axios from "axios";

const baseURL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:8000'
  : 'https://s81-sanjai-capstone-explore-tn-1.onrender.com';

const API = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;
    