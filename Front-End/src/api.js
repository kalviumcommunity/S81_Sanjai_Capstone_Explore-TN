import axios from "axios";

const API = axios.create({
  baseURL: "https://s81-sanjai-capstone-explore-tn-1.onrender.com", // 🔗 Your deployed backend
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;
