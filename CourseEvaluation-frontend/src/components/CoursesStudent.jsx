import React, { useEffect, useState } from "react";
import coursesService from "../services/coursesService";
import userService from "../services/userService";
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
  
        const promotion = currentUser.promotionId;
  
        // Debug logs
        console.log("Promotion ID:", promotion);
        console.log("Courses data:", courses);
  
        const userCourses = courses.filter((course) => {
          console.log("Course Promotion ID:", course.promotion.id); // Log each course's promotion ID
          return course.promotion.id == promotion; // Use non-strict equality to avoid data type mismatch
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
          course.instructor.firstName.toLowerCase().includes(query) ||
          course.instructor.lastName.toLowerCase().includes(query) ||
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
    <div>
      <h2>Bienvenue Étudiant</h2>
      <p>Voici l'ensemble des cours</p>
      <input
        type="text"
        placeholder="Search by title, instructor, module, status..."
        value={searchQuery}
        onChange={handleSearchChange}
        onKeyDown={handleSearchKeyDown}
      />
      {filteredCourses.length === 0 ? (
        <p>Aucun cours disponible.</p>
      ) : (
        
        <ul>
          {filteredCourses.map((course) => (
            <li key={course.id}>
             <button  onClick={()=> navigate(`/cours/${course.id}`) }> <h3>{course.title}</h3></button>
              <p>Description :{course.description}</p>
              <p>Statut : {course.status}</p>
              <p>Module : {course.module.name}</p>
              <p>Promotion : {course.promotion.name}</p>
              <p>S: {course.semestre} P: {course.periode}</p>
              <p>Professeur : {course.instructor.lastName} {course.instructor.firstName}</p>
              { course.evaluations && course.evaluations.length!==0 && 
              <p>Moyenne des avis : {averageStars(course.evaluations)} étoiles</p>}
             
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CoursesStudent;
