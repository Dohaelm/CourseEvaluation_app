import axios from "axios";
import { jwtDecode } from 'jwt-decode'  // Correct

import { useNavigate } from "react-router-dom";
import authService from "../services/authService";
// Create Axios instance
const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api",
  timeout: 10000,
});

// Intercept requests to add JWT token to headers
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwtToken");

    if (token) {
      // Check if the token is expired
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Current time in seconds

      if (decodedToken.exp < currentTime) {
        // Token expired, remove it and redirect to login
        localStorage.removeItem("jwtToken");
        window.location.href = "/"; // Redirect to login page
        return Promise.reject(new Error("Token expired"));
      }

      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercept responses to handle invalid token errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Unauthorized (401), likely due to invalid token
      localStorage.removeItem("jwtToken");
      window.location.href = "/"; // Redirect to login page
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
