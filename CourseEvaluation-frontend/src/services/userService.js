import axios from "axios";
import { jwtDecode } from "jwt-decode";
import axiosInstance from "../utils/AxiosInstance";
import coursesService from "./coursesService";

const userService = {
  getCurrentUser: async () => {
    try {
      // Get the JWT token from localStorage
      const token = localStorage.getItem("jwtToken");

      // Check if token exists
      if (!token) {
        throw new Error("No JWT token found");
      }

      // Decode the token once
      const decodedToken = jwtDecode(token);

      // Get the user's email from the token
      const userEmail = decodedToken.sub;

      if (!userEmail) {
        throw new Error("No email found in the JWT token");
      }

      // Make the API request to get user data by email
      const response = await axiosInstance.get(`http://localhost:8080/api/users/email/${userEmail}`, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });

      // Return the response data
      return response.data;
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      throw new Error("Failed to fetch user data");
    }
  },
  hasEvaluatedCourse: async (courseId) => {
    try {
      const token = localStorage.getItem("jwtToken");
  
      // Check if token exists
      if (!token) {
        throw new Error("No JWT token found");
      }
  
      // Decode the token once
      const decodedToken = jwtDecode(token);
  
      const role = decodedToken.role;
      if (role === "STUDENT") {
        // Fetch the current user
        const user = await userService.getCurrentUser();
        if (!user) {
          throw new Error("User not found");
        }
  
        const userId = user.id;
  
        // Fetch evaluations for the user
        const evaluationsResponse = await axiosInstance.get(
          `http://localhost:8080/api/users/${userId}/evaluations`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        const evaluations = evaluationsResponse.data;
        console.log(evaluations)
        // Validate that evaluations is an array
        if (!Array.isArray(evaluations)) {
          throw new Error("Invalid response: Expected an array of evaluations");
        }
  
        // Extract course IDs and check if the course has been evaluated
        const coursesIds = evaluations.map((ev) => ev.courseId);
        console.log(coursesIds);
        console.log(courseId)
        return coursesIds.includes(Number(courseId));
      } else {
        throw new Error("Only students can evaluate courses.");
      }
    } catch (error) {
      console.error("Error checking course evaluation:", error);
      throw new Error("Failed to check if the course has been evaluated.");
    }

  },
  createUser: async (userDetails) => {
    const token = localStorage.getItem("jwtToken");
  
    // Check if token exists
    if (!token) {
      throw new Error("No JWT token found");
    }
  
    // Decode the token once
    const decodedToken = jwtDecode(token);
    const role = decodedToken.role;
  
    if (role === "ADMIN") {
      try {
        const response = await axiosInstance.post(
          "http://localhost:8080/api/users",
          userDetails,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        return response.data; // Return the created user details
      } catch (error) {
        console.error("Failed to create user:", error);
        throw new Error("Failed to create user. Please try again.");
      }
    } else {
      throw new Error("Not authorized!");
    }
  },
  isAdmin: ()=>{
    const token = localStorage.getItem("jwtToken");
  
    // Check if token exists
    if (!token) {
      return false;
    }
  
    // Decode the token once
    const decodedToken = jwtDecode(token);
    const role = decodedToken.role;

  
    return role == "ADMIN" 
  
  
}  ,
getAllUsers : async()=>{
  const token = localStorage.getItem("jwtToken");
  if (userService.isAdmin()){
    try {
      const response = await axiosInstance.get( "http://localhost:8080/api/users", {
        headers :{
          Authorization : `Bearer ${token}`
        }
      })
      return response.data
      
    } catch (error) {
      console.error("Failed to fetch users :", error);
      throw new Error("Failed to fetch users. Please try again.");
    }
  }
   else {
    throw new Error ("not authorized!")
   }

},
modifyUser: async (userId,userDetails) => {
  const token = localStorage.getItem("jwtToken");    
  if (userService.isAdmin()) {
    try {
      const response = await axiosInstance.put(
        `http://localhost:8080/api/users/${userId}`,
        userDetails,
        
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data; 
    } catch (error) {
      console.error("Failed to modify user:", error);
      throw new Error("Failed to modify user. Please try again.");
    }
  } else {
    throw new Error("Not authorized!");
  }
},
getUserById : async(userId)=>{
  const token = localStorage.getItem("jwtToken");
  try {
    const user = await axiosInstance.get(`http://localhost:8080/api/users/${userId}`, {
      headers:{
         Authorization: `Bearer ${token}`
      }
    })
    return user.data
    
  } catch (error) {
    console.error(error)
    
  }
  
},
getCoursesByInstructorId : async (instructorId)=>{
  const user = await userService.getUserById(instructorId)
  if(user && user.role==="TEACHER"){
    const coursesResponse= await coursesService.getCourses()
    if(coursesResponse){
      const courses = coursesResponse.data
      const filtered= courses.filter((course)=>course.instructor.id==instructorId)
      return filtered 
    }
  }
  return null
} ,
deleteUser:async(userId)=>{
  const token = localStorage.getItem("jwtToken");
  try {
    const user = await axiosInstance.delete(`http://localhost:8080/api/users/${userId}`, {
      headers:{
         Authorization: `Bearer ${token}`
      }
    })
  } catch (error) {
    console.error(error)
    
  }
 
  
}
}

export default userService;
