import React, { useEffect, useState } from "react";
import coursesService from "../services/coursesService";
import userService from "../services/userService";
import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import './Module.css'


const Promotions = () => {
  const [promotions, setPromotions] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newPromotionName, setNewPromotionName] = useState("");
  const navigate = useNavigate();


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
  useEffect( () => {
    const fetchUserAndPromotions = async () => {
      try {
        const Admin =  userService.isAdmin();
        
        if (!Admin) {
          navigate('/');
        } else {
          fetchPromotions();
        }
      } catch (error) {
        console.error("Error fetching current user or promotions", error);
      }
    };
    fetchUserAndPromotions();
    
    
  }, []);

  return (
    <div className="page">
    <div className="modules-container"> {/* Reusing the same container class */}
      <h2 className="modules-title">Promotions</h2>
      <button
        onClick={() => setIsAdding(!isAdding)}
        className="add-module-btn"
      >
        + Add Promotion
      </button>

      {isAdding && (
        <div className="add-module-form">
          <input
            type="text"
            placeholder="Enter promotion name"
            value={newPromotionName}
            onChange={(e) => setNewPromotionName(e.target.value)}
            className="module-input"
          />
          <button
            onClick={handleCreate}
            className="create-module-btn"
          >
            Create
          </button>
        </div>
      )}

      <ul className="module-list">
        {promotions.map((promotion) => (
          <li key={promotion.id} className="module-item"> {/* Reusing the module-item class */}
            {promotion.name}
            <button
              onClick={() => handleDelete(promotion.id)}
             className=" bg-transparent delete-btn"
            >
             <Trash2 className="w-6 h-6 " />
            </button>
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
};

export default Promotions;