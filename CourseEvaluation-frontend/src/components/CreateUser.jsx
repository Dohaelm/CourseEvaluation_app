import React, { useEffect, useState } from "react";
import userService from "../services/userService";
import coursesService from "../services/coursesService"; // Service to fetch promotions

const CreateUser = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "STUDENT", // Default role
    promotionId: "",
  });
  const [promotions, setPromotions] = useState([]); // State to hold promotions
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Fetch promotions on component mount
  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const response = await coursesService.getPromotions();
        // Ensure response is an array
        if (Array.isArray(response)) {
          setPromotions(response); // Populate promotions
        } else {
          console.error("Promotions response is not an array:", response);
          setError("Failed to load promotions. Invalid response.");
        }
      } catch (err) {
        console.error("Failed to fetch promotions:", err);
        setError("Failed to load promotions. Please try again.");
      }
    };

    fetchPromotions();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await userService.createUser(formData);
      setSuccessMessage("User created successfully!");
      setError("");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        role: "STUDENT",
        promotionId: "",
      });
    } catch (err) {
      console.error("Failed to create user:", err);
      setError(err.message || "Failed to create user.");
      setSuccessMessage("");
    }
  };

  return (
    <div>
      <h2>Ajouter Utilisateur</h2>
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        {/* First Name */}
        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>

        {/* Last Name */}
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>

        {/* Email */}
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Password */}
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {/* Role */}
        <div>
          <label>Role:</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="STUDENT">Student</option>
            <option value="TEACHER">Teacher</option>
            <option value="ADMIN">Admin</option>
          </select>
        </div>

        {/* Promotion Dropdown */}
        <div>
          <label>Promotion:</label>
          <select
            name="promotionId"
            value={formData.promotionId}
            onChange={handleChange}
            required={formData.role === "STUDENT"} // Promotion is only required for students
          >
            <option value="" disabled>
              Select a promotion
            </option>
            {Array.isArray(promotions) && promotions.map((promotion) => (
              <option key={promotion.id} value={promotion.id}>
                {promotion.name} {/* Display promotion name */}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">Create User</button>
      </form>
    </div>
  );
};

export default CreateUser;
