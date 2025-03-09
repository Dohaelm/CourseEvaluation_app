import React, { useEffect, useState } from "react";
import coursesService from "../services/coursesService";
import userService from "../services/userService";
import { useNavigate } from "react-router-dom";
import "./Module.css";
import { Trash2 } from "lucide-react";
const Modules = () => {
  const [modules, setModules] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newModuleName, setNewModuleName] = useState("");
  const navigate=useNavigate();
  // Fetch modules from the database
  const fetchModules = async () => {
    try {
      const response = await coursesService.getModules();
      setModules(response);
    } catch (error) {
      console.error("Failed to fetch modules:", error);
      alert("Error fetching modules. Please try again.");
    }
  };

  // Handle create module
  const handleCreate = async () => {
    if (!newModuleName.trim()) {
      alert("Module name cannot be empty!");
      return;
    }
    try {
      const newModule = { name: newModuleName };
      const createdModule = await coursesService.createModule(newModule);
      setModules((prevModules) => [...prevModules, createdModule]);
      setIsAdding(false);
      setNewModuleName("");
      alert("Module created successfully.");
    } catch (error) {
      console.error("Failed to create module:", error);
      alert("Error creating module. Please try again.");
    }
  };

  // Delete a module by ID
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this module?");
    if (confirmDelete) {
      try {
        await coursesService.deleteModule(id);
        alert("Module deleted successfully.");
        setModules((prevModules) => prevModules.filter((module) => module.id !== id));
      } catch (error) {
        console.error("Failed to delete module:", error);
        alert("Error deleting module. Please try again.");
      }
    }
  };

  // Fetch modules on component mount
  useEffect(() => {
    const Admin =  userService.isAdmin();
        
    if (!Admin) {
      navigate('/');
    }
    else{
      fetchModules();

    }
  }, []);

  return (
  <div className="page">
    <div className="modules-container">
      <h2 className="modules-title">Modules</h2>
      <button
        onClick={() => setIsAdding(!isAdding)}
        className="add-module-btn"
      >
        + Add Module
      </button>

      {isAdding && (
        <div className="add-module-form">
          <input
            type="text"
            placeholder="Enter module name"
            value={newModuleName}
            onChange={(e) => setNewModuleName(e.target.value)}
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
        {modules.map((module) => (
          <li key={module.id} className="module-item">
            {module.name}
            <button
              onClick={() => handleDelete(module.id)}
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

export default Modules;
