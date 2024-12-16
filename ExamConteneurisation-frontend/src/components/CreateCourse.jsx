import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import coursesService from "../services/coursesService";

const CreateCourse = () => {
  const [courseDetails, setCourseDetails] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    instructorId: "",
    moduleId: "",
    promotionId: "", // This will be filled with the selected promotion ID
    periode: "",
    semestre: "",
  });
  const [promotions, setPromotions] = useState([]); // State for available promotions
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  // Fetch available promotions on component mount
  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const response = await coursesService.getPromotions(); // Fetch promotions
        setPromotions(response); // Store them in state
      } catch (err) {
        console.error("Failed to fetch promotions:", err);
        setError("Failed to load promotions. Please try again.");
      }
    };

    fetchPromotions();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseDetails({ ...courseDetails, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await coursesService.createCourse(courseDetails);
      setSuccess("Course created successfully!");
      navigate("/mes-cours"); // Redirect to the course list page
    } catch (err) {
      console.error("Failed to create course:", err);
      setError("Failed to create course. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Créer un nouveau cours</h2>
      <form onSubmit={handleSubmit}>
        {/* Title */}
        <div>
          <label htmlFor="title">Course Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={courseDetails.title}
            onChange={handleChange}
            required
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={courseDetails.description}
            onChange={handleChange}
            required
          />
        </div>

        {/* Start Date */}
        <div>
          <label htmlFor="startDate">Start Date</label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={courseDetails.startDate}
            onChange={handleChange}
            required
          />
        </div>

        {/* End Date */}
        <div>
          <label htmlFor="endDate">End Date</label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={courseDetails.endDate}
            onChange={handleChange}
            required
          />
        </div>

        {/* Instructor ID */}
        <div>
          <label htmlFor="instructorId">Instructor ID</label>
          <input
            type="number"
            id="instructorId"
            name="instructorId"
            value={courseDetails.instructorId}
            onChange={handleChange}
            required
          />
        </div>

        {/* Module ID */}
        <div>
          <label htmlFor="moduleId">Module ID</label>
          <input
            type="number"
            id="moduleId"
            name="moduleId"
            value={courseDetails.moduleId}
            onChange={handleChange}
            required
          />
        </div>

        {/* Promotion Dropdown */}
        <div>
          <label htmlFor="promotionId">Promotion</label>
          <select
            id="promotionId"
            name="promotionId"
            value={courseDetails.promotionId}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select a promotion
            </option>
            {promotions.map((promotion) => (
              <option key={promotion.id} value={promotion.id}>
                {promotion.name} {/* Display the promotion name */}
              </option>
            ))}
          </select>
        </div>

        {/* Periode */}
        <div>
          <label htmlFor="periode">Période</label>
          <input
            type="number"
            id="periode"
            name="periode"
            value={courseDetails.periode}
            onChange={handleChange}
            required
          />
        </div>

        {/* Semestre */}
        <div>
          <label htmlFor="semestre">Semestre</label>
          <input
            type="number"
            id="semestre"
            name="semestre"
            value={courseDetails.semestre}
            onChange={handleChange}
            required
          />
        </div>

        {/* Submit Button */}
        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Course"}
        </button>
      </form>

      {/* Error Message */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Success Message */}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </div>
  );
};

export default CreateCourse;
