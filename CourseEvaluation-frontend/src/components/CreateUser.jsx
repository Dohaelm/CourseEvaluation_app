import React, { useEffect, useState } from "react";
import userService from "../services/userService";
import coursesService from "../services/coursesService"; // Service to fetch promotions
import "./CreateUser.css"
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
    const Admin =  userService.isAdmin();
        
    if (!Admin) {
      navigate('/');
    } 
    else{

      fetchPromotions();
    }

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
    <div className="create-user-container">
  <div className="create-user-form">
    <h2>Ajouter Utilisateur</h2>
    {successMessage && <p className="success-message">{successMessage}</p>}
    {error && <p className="error-message">{error}</p>}
    <form onSubmit={handleSubmit}>
      {/* First Name */}
      <div>
        <label>Prénom :</label>
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
        <label>Nom :</label>
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
        <label>Email :</label>
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
        <label>Mot de passe :</label>
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
        <label>Role :</label>
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          required
        >
          <option value="STUDENT">Elève</option>
          <option value="TEACHER">Professeur</option>
          <option value="ADMIN">Admin</option>
        </select>
      </div>

      {/* Promotion Dropdown */}
      <div>
        <label>Promotion :</label>
        <select
          name="promotionId"
          value={formData.promotionId}
          onChange={handleChange}
          required={formData.role === "STUDENT"}
        >
          <option value="" disabled>
            Selectionner une promotion
          </option>
          {Array.isArray(promotions) &&
            promotions.map((promotion) => (
              <option key={promotion.id} value={promotion.id}>
                {promotion.name}
              </option>
            ))}
        </select>
      </div>

      <button type="submit">Ajouter utilisateur</button>
    </form>
  </div>
</div>
  );
};

export default CreateUser;
