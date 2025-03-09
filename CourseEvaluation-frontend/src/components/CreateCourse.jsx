import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import coursesService from "../services/coursesService";
import userService from "../services/userService";

const CreateCourse = () => {
  const [courseDetails, setCourseDetails] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    instructorId: "",
    moduleId: "",
    promotionId: "",
    periode: "",
    semestre: "",
  });
  const [promotions, setPromotions] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const [responseP, users, responseM] = await Promise.all([
          coursesService.getPromotions(),
          userService.getAllUsers(),
          coursesService.getModules(),
        ]);
        const responseT = users.filter((user) => user.role === "TEACHER");
        setPromotions(responseP);
        setModules(responseM);
        setTeachers(responseT);
      } catch (err) {
        console.error("Failed to fetch promotions:", err);
        setError("Failed to load promotions. Please try again.");
      }
    };

    const Admin = userService.isAdmin();

    if (!Admin) {
      navigate("/");
    } else {
      fetchPromotions();
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseDetails({ ...courseDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await coursesService.createCourse(courseDetails);
      setSuccess("Course created successfully!");
      navigate("/mes-cours");
    } catch (err) {
      console.error("Failed to create course:", err);
      setError("Failed to create course. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Créer un nouveau cours</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.field}>
          <label htmlFor="title">Titre du cours</label>
          <input
            type="text"
            id="title"
            name="title"
            value={courseDetails.title}
            onChange={handleChange}
            required
          />
        </div>
        <div style={styles.field}>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={courseDetails.description}
            onChange={handleChange}
            required
          />
        </div>
        <div style={styles.field}>
          <label htmlFor="startDate">Date de début</label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={courseDetails.startDate}
            onChange={handleChange}
            required
          />
        </div>
        <div style={styles.field}>
          <label htmlFor="endDate">Date de fin</label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={courseDetails.endDate}
            onChange={handleChange}
            required
          />
        </div>
        <div style={styles.field}>
          <label htmlFor="instructorId">Professeur</label>
          <select
            id="instructorId"
            name="instructorId"
            value={courseDetails.instructorId}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Sélectionner un professeur
            </option>
            {teachers.map((teacher) => (
              <option key={teacher.id} value={teacher.id}>
                {teacher.firstName} {teacher.lastName}
              </option>
            ))}
          </select>
        </div>
        <div style={styles.field}>
          <label htmlFor="moduleId">Module</label>
          <select
            id="moduleId"
            name="moduleId"
            value={courseDetails.moduleId}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Sélectionner un module
            </option>
            {modules.map((module) => (
              <option key={module.id} value={module.id}>
                {module.name}
              </option>
            ))}
          </select>
        </div>
        <div style={styles.field}>
          <label htmlFor="promotionId">Promotion</label>
          <select
            id="promotionId"
            name="promotionId"
            value={courseDetails.promotionId}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Sélectionner une promotion
            </option>
            {promotions.map((promotion) => (
              <option key={promotion.id} value={promotion.id}>
                {promotion.name}
              </option>
            ))}
          </select>
        </div>
        <div style={styles.field}>
          <label htmlFor="periode">Période</label>
          <select
            id="periode"
            name="periode"
            value={courseDetails.periode}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Sélectionner une période
            </option>
            <option value="1">1</option>
            <option value="2">2</option>
          </select>
        </div>
        <div style={styles.field}>
          <label htmlFor="semestre">Semestre</label>
          <select
            id="semestre"
            name="semestre"
            value={courseDetails.semestre}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Sélectionner un semestre
            </option>
            {[...Array(6)].map((_, index) => (
              <option key={index + 1} value={index + 1}>
                {index + 1}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? "Création en cours..." : "Ajouter cours"}
        </button>
      </form>
      {error && <p style={styles.error}>{error}</p>}
      {success && <p style={styles.success}>{success}</p>}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "600px",
    margin: "20px auto",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    overflowY: "auto",
    maxHeight: "90vh",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
    marginTop:"50px",
    fontSize: "1.5rem",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  },
  button: {
    padding: "10px 15px",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    alignSelf: "center",
    width: "100%",
  },
  error: {
    color: "red",
    textAlign: "center",
  },
  success: {
    color: "green",
    textAlign: "center",
  },
};

export default CreateCourse;
