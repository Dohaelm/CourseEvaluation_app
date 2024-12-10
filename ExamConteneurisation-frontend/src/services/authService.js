import axios from "axios";



const authService = {
    login: async (email, password) => {
      try {
        const response = await axios.post("http://localhost:8080/api/auth/authenticate", {
          email,
          password,
        });
        const { token } = response.data;
        localStorage.setItem("jwtToken", token); // Save token
        return token;
      } catch (error) {
        throw new Error("Login failed");
      }
    },
  
    logout: () => {
      localStorage.removeItem("jwtToken");
      window.location.href = "/"; // Redirect to login page
    },
  
    isAuthenticated: () => {
      const token = localStorage.getItem("jwtToken");
      return !!token; 
    },
  };
  
  export default authService;
  