import React, { useEffect, useState } from "react";
import coursesService from "../services/coursesService";
import userService from "../services/userService";
import { useNavigate } from "react-router-dom";

const DashboardAdmin = () => {
  const Navigate = useNavigate();

  const [allCourses, setAllCourses] = useState([]); // Pour stocker tous les cours
  const [latestCourses, setLatestCourses] = useState([]); // Pour stocker les cours filtrés
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await coursesService.getCourses();
        const currentUser=  await userService.getCurrentUser();

        const courses = response.data;
      
       

         
      
        const completedCourses = courses.filter(course => course.status === "COMPLETED");

// Step 2: Find the highest semestre (S max) among the completed courses
const latestSemestre = Math.max(...completedCourses.map(course => course.semestre));

// Step 3: Filter courses to get only those with the highest semestre
const coursesWithMaxSemestre = completedCourses.filter(course => course.semestre === latestSemestre);

// Step 4: Find the highest periode (P max) among the filtered courses
const latestPeriode = Math.max(...coursesWithMaxSemestre.map(course => course.periode));

// Step 5: Filter courses to get only those with the highest semestre and highest periode
const filteredCourses = coursesWithMaxSemestre.filter(
  course => course.periode === latestPeriode
);


        setAllCourses(courses); // Mettre à jour avec tous les cours
        setLatestCourses(filteredCourses); // Mettre à jour avec les cours filtrés
        setLoading(false);
        console.log("API Response:", courses);
        console.log(currentUser)
      } catch (err) {
        console.error("Failed to fetch courses:", err);
        setError("Failed to load courses. Please try again later.");
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);
  function averageStars(evaluation) {
    let total= 0;
   const stars= evaluation.map(e => e.stars);
   for (let i = 0; i < stars.length; i++) {
    total += stars[i]; 
  }
    return total/stars.length;
    
  }

  if (loading) return <div><p>Loading...</p></div>;
  if (error) return <div><p>{error}</p></div>;

  return (
    <div>
      <h2>Bienvenue Admin</h2>
      <p>Voici les cours complétés de la dernière période pour le semestre le plus récent :</p>
      {latestCourses.length === 0 ? (
        <p>Aucun cours complété disponible pour cette période.</p>
      ) : (
        <ul>
          {latestCourses.map((course) => (
            <li key={course.id}>
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              <p>{course.promotion.name}</p>
              <p>Professeur : {course.instructor.lastName} {course.instructor.firstName}</p>
              { course.evaluations && course.evaluations.length!==0 && 
              <p>Moyenne des avis : {averageStars(course.evaluations)} étoiles</p>}
              <button onClick={()=> Navigate(`/cours/${course.id}`)}>Evaluation du cours</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DashboardAdmin;
