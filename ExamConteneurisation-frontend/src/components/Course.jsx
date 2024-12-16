import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import coursesService from "../services/coursesService";
import userService from "../services/userService";
import {jwtDecode} from "jwt-decode";

const Course = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [stars, setStars] = useState(0);
  const [comment, setComment] = useState("");
  const [evaluationError, setEvaluationError] = useState("");
  const [evaluationDone, setEvaluationDone] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        const decodedToken = jwtDecode(token);
        const role = decodedToken.role;
        setIsAdmin(role === "ADMIN");

        const response = await coursesService.getCourseById(id);
        setCourse(response);

        if (role === "STUDENT") {
          const evaluated = await userService.hasEvaluatedCourse(id);
          setEvaluationDone(evaluated);
        }

        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch course:", err);
        setError("Failed to load course. Please try again later.");
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [id]);

  const averageStars = (evaluations) => {
    if (!evaluations || evaluations.length === 0) return 0;
    const total = evaluations.reduce((sum, e) => sum + e.stars, 0);
    return (total / evaluations.length).toFixed(1);
  };

  const handleEvaluation = async () => {
    try {
      await coursesService.evaluateCourse(id, stars, comment);

      // Reload course data to reflect the new evaluation
      const updatedCourse = await coursesService.getCourseById(id);
      setCourse(updatedCourse);

      // Reset the form
      setStars(0);
      setComment("");
    } catch (err) {
      console.error("Evaluation failed:", err);
      setEvaluationError("Failed to submit evaluation. Please try again.");
    }
  };

  const handleDeleteCourse = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this course?");
    if (confirmDelete) {
      try {
        await coursesService.deleteCourse(id);
        alert("Course deleted successfully.");
        navigate("/courses"); // Redirect to the courses list page
      } catch (error) {
        console.error("Failed to delete course:", error);
        alert("Error deleting course. Please try again.");
      }
    }
  };

  if (loading) return <div><p>Loading...</p></div>;
  if (error) return <div><p>{error}</p></div>;

  return (
    <div>
      <h2>{course.title}</h2>
      <p>{course.description}</p>
      <p>{course.module.name}</p>
      <p>S: {course.semestre} P: {course.periode}</p>
      <p>Professeur: {course.instructor.firstName} {course.instructor.lastName}</p>

      {course.evaluations && course.evaluations.length > 0 && (
        <>
          <p>Moyenne des avis : {averageStars(course.evaluations)} étoiles</p>
          <ul>
            {course.evaluations.map((ev) => (
              <li key={ev.id}>
                <p>{ev.stars} étoiles {ev.comment && <span>: {ev.comment}</span>}</p>
              </li>
            ))}
          </ul>
        </>
      )}

      {!evaluationDone && course.status === "COMPLETED" && (
        <div>
          <h3>Évaluer ce cours</h3>
          {evaluationError && <p style={{ color: "red" }}>{evaluationError}</p>}
          <label>
            Nombre d'étoiles (1-5): 
            <input
              type="number"
              value={stars}
              onChange={(e) => setStars(Number(e.target.value))}
              min="1"
              max="5"
            />
          </label>
          <br />
          <label>
            Commentaire:
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </label>
          <br />
          <button onClick={handleEvaluation}>Soumettre l'évaluation</button>
        </div>
      )}

      {isAdmin && (
        <div>
          
          <button onClick={handleDeleteCourse} style={{ marginLeft: "10px", color: "red" }}>
            Supprimer ce cours
          </button>
        </div>
      )}
    </div>
  );
};

export default Course;
