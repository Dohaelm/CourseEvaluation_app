import React, { useEffect, useState } from "react";
import coursesService from "../services/coursesService";

const Modules = () => {
  const [modules, setModules] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newModuleName, setNewModuleName] = useState("");

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
    fetchModules();
  }, []);

  return (
    <div>
      <h2>Modules</h2>
      <button onClick={() => setIsAdding(!isAdding)}>+ Add Module</button>
      {isAdding && (
        <div>
          <input
            type="text"
            placeholder="Enter module name"
            value={newModuleName}
            onChange={(e) => setNewModuleName(e.target.value)}
          />
          <button onClick={handleCreate}>Create</button>
        </div>
      )}
      <ul>
        {modules.map((module) => (
          <li key={module.id}>
            {module.name}{" "}
            <button onClick={() => handleDelete(module.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Modules;
