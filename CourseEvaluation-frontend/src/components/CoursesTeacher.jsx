import React, { useEffect, useState } from "react";
import coursesService from "../services/coursesService";
import userService from "../services/userService";
import './Courses.css';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const CoursesStudent = () => {
  const navigate = useNavigate()

  const [allCourses, setAllCourses] = useState([]); // Pour stocker tous les cours
 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await coursesService.getCourses();
        const currentUser = await userService.getCurrentUser();
  
        const courses = response.data;
  
        const instructorId = currentUser.id;
  
  
        const userCourses = courses.filter((course) => {
         
          return course.instructor.id == instructorId; // Use non-strict equality to avoid data type mismatch
        });
  
        console.log("Filtered Courses:", userCourses); // Log the filtered courses
  
        setAllCourses(userCourses);
        setFilteredCourses(userCourses);
  
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
    let total= 0;
   const stars= evaluation.map(e => e.stars);
   for (let i = 0; i < stars.length; i++) {
    total += stars[i]; 
  }
    return total/stars.length;
    
  }
  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      const query = e.target.value.toLowerCase();
      const filtered = allCourses.filter((course) => {
        return (
          course.title.toLowerCase().includes(query) ||
          course.status.toLowerCase().includes(query) ||
          course.promotion.name.toLowerCase().includes(query)||
          course.module.name.toLowerCase().includes(query))
        
      });
  
      setFilteredCourses(filtered);
    }
  };
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  if (loading) return <div><p>Loading...</p></div>;
  if (error) return <div><p>{error}</p></div>;

  return (
    <div className="courses-admin mt-5">
    <h2>Bienvenue Professeur</h2>
    <p>Voici l'ensemble des cours</p>
    <div className="search-bar">
      <input
        type="text"
        placeholder="Chercher par titre, module , statut ou professeur"
        value={searchQuery}
        onChange={handleSearchChange}
        onKeyDown={handleSearchKeyDown}
      />
    </div>
      {filteredCourses.length === 0 ? (
        <p>Aucun cours disponible.</p>
      ) : (
        
        <ul className="courses-grid">
          {filteredCourses.map((course) => (
            <li className="course-card" key={course.id}>
             <Link to={`/cours/${course.id}`} >
              <h3 className="course-link">{course.title}</h3>
              </Link>
              <p>Description: {course.description}</p>
              <p>Statut: {course.status}</p>
              <p>Module: {course.module.name}</p>
              <p>Promotion: {course.promotion.name}</p>
              <p>
                S: {course.semestre} P: {course.periode}
              </p>
              <p>
                Professeur: {course.instructor.lastName} {course.instructor.firstName}
              </p>
              {course.evaluations && course.evaluations.length !== 0 && (
                <p>Moyenne des avis: {averageStars(course.evaluations)} étoiles</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CoursesStudent;
