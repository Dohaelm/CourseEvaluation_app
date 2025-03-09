import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa"; // Import star icon
import coursesService from "../services/coursesService";
import userService from "../services/userService";
import { jwtDecode } from "jwt-decode";
import { Trash2 } from "lucide-react";
import "./Course.css"; // Import CSS file

const Course = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [stars, setStars] = useState(0);
  const [hover, setHover] = useState(0);
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
        navigate("/courses");
      } catch (error) {
        console.error("Failed to delete course:", error);
        alert("Error deleting course. Please try again.");
      }
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className='page'>
    
    <div className="course-container ">
      
      <h2 className="course-title">{course.title}</h2>
      <p className="course-description">{course.description}</p>
      <p className="course-info">
        {course.module.name} | S: {course.semestre} | P: {course.periode}
      </p>
      <p className="course-instructor">
        Professeur: {course.instructor.firstName} {course.instructor.lastName}
      </p>

      {course.evaluations?.length > 0 && (
        <>
          <p className="course-rating">
            Moyenne des avis : {averageStars(course.evaluations)} étoiles
          </p>
          <ul className="evaluations-list">
            {course.evaluations.map((ev) => (
              <li key={ev.id}>
                <p>
                  {"★".repeat(ev.stars)} {ev.comment && <span>: {ev.comment}</span>}
                </p>
              </li>
            ))}
          </ul>
        </>
      )}

      {!evaluationDone && course.status === "COMPLETED" && (
        <div className="evaluation-container">
          <h3>Évaluer ce cours</h3>
          {evaluationError && <p className="error-message">{evaluationError}</p>}
          <div className="stars-container">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                className="star"
                color={star <= (hover || stars) ? "#FFD700" : "#ccc"}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
                onClick={() => setStars(star)}
              />
            ))}
          </div>
          <textarea
            className="comment-box"
            placeholder="Laissez un commentaire..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button className="submit-btn" onClick={handleEvaluation}>
            Soumettre l'évaluation
          </button>
        </div>
      )}
{isAdmin && (
  <button 
  onClick={handleDeleteCourse} 
  className=" bg-transparent "
>
  <Trash2 className="w-6 h-6 " />
</button>
)}
    </div>
    </div>
  );
};

export default Course;
