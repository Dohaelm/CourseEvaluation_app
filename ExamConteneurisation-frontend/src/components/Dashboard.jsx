import React, { useEffect,useState } from "react";
import authService from "../services/authService";
import coursesService from "../services/coursesService";

const Dashboard = () => {
    
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
  
    useEffect(() => {
    
      const fetchCourses = async () => {
        try {
          const response = await coursesService.getCourses();
          setCourses(response.data); 
          setLoading(false);
          console.log("API Response:", response.data);
        } catch (err) {
          console.error("Failed to fetch courses:", err);
          setError("Failed to load courses. Please try again later.");
          setLoading(false);
        }
      };
  
      fetchCourses();
    }, []);
  
    if (loading) return <div> <h1>Dashboard</h1>
    
<p>Loading...</p> </div>; 
    if (error) return <div> <h1>Dashboard</h1>
    
<p>{error}</p> </div>; 
  
    return (
      <div>
        <h1>Dashboard</h1>
        
  
        <h2>Courses</h2>
        {Array.isArray(courses) && courses.length === 0 ? (
          <p>No courses available.</p>
        ) : (
          <ul>
            {courses.map((course) => (
              <li key={course.id}>
                <h3>{course.title}</h3>
                <p>{course.description}</p>
                <p>Professeur {course.instructor.lastName} {course.instructor.firstName}</p>
              </li>
            ))}
          </ul>
        )}
      </div> )}

export default Dashboard; 