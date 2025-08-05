// componants/PrivateRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  // Decode JWT and check expiration
  const isTokenValid = () => {
    if (!token) return false;
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const now = Math.floor(Date.now() / 1000);
      return payload.exp > now;
    } catch (err) {
      return false;
    }
  };

  return isTokenValid() ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
