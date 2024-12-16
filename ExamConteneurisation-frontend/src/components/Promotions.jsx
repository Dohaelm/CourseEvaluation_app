import React, { useEffect, useState } from "react";
import coursesService from "../services/coursesService";

const Promotions = () => {
  const [promotions, setPromotions] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newPromotionName, setNewPromotionName] = useState("");

  // Fetch promotions from the database
  const fetchPromotions = async () => {
    try {
      const response = await coursesService.getPromotions();
      setPromotions(response);
    } catch (error) {
      console.error("Failed to fetch promotions:", error);
      alert("Error fetching promotions. Please try again.");
    }
  };

  // Handle create promotion
  const handleCreate = async () => {
    if (!newPromotionName.trim()) {
      alert("Promotion name cannot be empty!");
      return;
    }
    try {
      const newPromotion = { name: newPromotionName };
      const createdPromotion = await coursesService.createPromotion(newPromotion);
      setPromotions((prevPromotions) => [...prevPromotions, createdPromotion]);
      setIsAdding(false);
      setNewPromotionName("");
      alert("Promotion created successfully.");
    } catch (error) {
      console.error("Failed to create promotion:", error);
      alert("Error creating promotion. Please try again.");
    }
  };

  // Delete a promotion by ID
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this promotion?");
    if (confirmDelete) {
      try {
        await coursesService.deletePromotion(id);
        alert("Promotion deleted successfully.");
        setPromotions((prevPromotions) => prevPromotions.filter((promotion) => promotion.id !== id));
      } catch (error) {
        console.error("Failed to delete promotion:", error);
        alert("Error deleting promotion. Please try again.");
      }
    }
  };

  // Fetch promotions on component mount
  useEffect(() => {
    fetchPromotions();
  }, []);

  return (
    <div>
      <h2>Promotions</h2>
      <button onClick={() => setIsAdding(!isAdding)}>+ Add Promotion</button>
      {isAdding && (
        <div>
          <input
            type="text"
            placeholder="Enter promotion name"
            value={newPromotionName}
            onChange={(e) => setNewPromotionName(e.target.value)}
          />
          <button onClick={handleCreate}>Create</button>
        </div>
      )}
      <ul>
        {promotions.map((promotion) => (
          <li key={promotion.id}>
            {promotion.name}{" "}
            <button onClick={() => handleDelete(promotion.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Promotions;
