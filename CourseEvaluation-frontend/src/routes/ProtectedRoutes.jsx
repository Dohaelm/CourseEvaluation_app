import React from "react";
import { Navigate } from "react-router-dom";
import authService from "../services/authService"; // Assuming auth logic is here

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = authService.isAuthenticated();

  return isAuthenticated ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
