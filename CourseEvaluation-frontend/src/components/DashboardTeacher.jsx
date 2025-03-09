import React, { useEffect, useState } from "react";
import coursesService from "../services/coursesService";
import userService from "../services/userService";
import { useNavigate } from "react-router-dom";
import './Dashboard';

const DashboardTeacher = () => {
  const navigate = useNavigate();
  const [latestCourses, setLatestCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await coursesService.getCourses();
        const currentUser = await userService.getCurrentUser();

        const courses = response.data;

        // Filter courses by instructor ID and get the latest completed courses
        const userCourses = courses.filter(course => course.instructor.id === currentUser.id);
        const completedCourses = userCourses.filter(course => course.status === "COMPLETED");

        const latestSemestre = Math.max(...completedCourses.map(course => course.semestre));
        const coursesWithMaxSemestre = completedCourses.filter(course => course.semestre === latestSemestre);

        const latestPeriode = Math.max(...coursesWithMaxSemestre.map(course => course.periode));
        const filteredCourses = coursesWithMaxSemestre.filter(course => course.periode === latestPeriode);

        setLatestCourses(filteredCourses);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch courses:", err);
        setError("Failed to load courses. Please try again later.");
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  function averageStars(evaluation) {
    if (!evaluation || evaluation.length === 0) return "N/A";
    const total = evaluation.reduce((sum, e) => sum + e.stars, 0);
    return (total / evaluation.length).toFixed(2);
  }

  if (loading || error) {
    return (
      <div className="container">
        <h1>Dashboard</h1>
        {loading ? <p>Loading...</p> : <p>{error}</p>}
      </div>
    );
  }

  return (
    <div className="container">
      <h2 className="mt-5">Bienvenue Professeur</h2>
      {latestCourses.length === 0 ? (
        <p>Aucun cours complété disponible pour cette période.</p>
      ) : (<p>
        Voici les cours complétés de la dernière période pour le semestre le
        plus récent :
      </p> )}
        
        <div className="card-container">
          {latestCourses.map((course) => (
            <div key={course.id} className="card">
              <div className="card-body">
                <h3 className="card-title">{course.title}</h3>
                <p className="card-text">{course.description}</p>
                <p className="card-text">Promotion : {course.promotion.name}</p>
                <p className="card-text">
                  Professeur : {course.instructor.lastName} {course.instructor.firstName}
                </p>
                {course.evaluations && course.evaluations.length > 0 && (
                  <p className="card-text">
                    Moyenne des avis : {averageStars(course.evaluations)} étoiles
                  </p>
                )}
                <button onClick={() => navigate(`/cours/${course.id}`)}>
                  Voir les évaluations
                </button>
              </div>
            </div>
          ))}
        </div>
      
    </div>
  );
};

export default DashboardTeacher;
