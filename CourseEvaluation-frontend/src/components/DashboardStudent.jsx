import React, { useEffect, useState } from "react";
import coursesService from "../services/coursesService";
import userService from "../services/userService";
import { useNavigate } from "react-router-dom";
import './Dashboard'

const DashboardStudent = () => {
  const navigate = useNavigate();

  const [allCourses, setAllCourses] = useState([]); // Store all courses
  const [latestCourses, setLatestCourses] = useState([]); // Store filtered courses
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await coursesService.getCourses();
        const currentUser = await userService.getCurrentUser();

        const courses = response.data;
        const promotion = currentUser.promotionId;

        const userCourses = courses.filter(
          (course) => course.promotion.id == promotion
        );

        const completedCourses = userCourses.filter(
          (course) => course.status === "COMPLETED"
        );

        const latestSemestre = Math.max(
          ...completedCourses.map((course) => course.semestre)
        );

        const coursesWithMaxSemestre = completedCourses.filter(
          (course) => course.semestre === latestSemestre
        );

        const latestPeriode = Math.max(
          ...coursesWithMaxSemestre.map((course) => course.periode)
        );

        const filteredCourses = coursesWithMaxSemestre.filter(
          (course) => course.periode === latestPeriode
        );

        setAllCourses(courses);
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
    let total = 0;
    const stars = evaluation.map((e) => e.stars);
    for (let i = 0; i < stars.length; i++) {
      total += stars[i];
    }
    return total / stars.length;
  }

  if (loading)
    return (
      <div className="container mt-5">
        <h1>Dashboard</h1>
        <p>Loading...</p>
      </div>
    );
  if (error)
    return (
      <div className="container mt-5">
        
        <p>{error}</p>
      </div>
    );

  return (
    <div className="container mt-5 ">
      <h2 className="mt-5">Bienvenue Étudiant</h2>
     
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

export default DashboardStudent;
