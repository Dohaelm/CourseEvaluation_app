
import axios from "axios";
import axiosInstance from "../utils/AxiosInstance";
import { jwtDecode } from "jwt-decode";
import userService from "./userService";

const coursesService={
    getCourses : async ()=>{
        try {
          const token = localStorage.getItem("jwtToken");
            const response = await axiosInstance.get("http://localhost:8080/api/courses", {
              headers: {
                Authorization: `Bearer ${token}`, 
                
              },
            });
            return response;
          } catch (error) {
           
            console.error("Courses fetch failed:", error);
            throw new Error("Courses fetch failed");
          }
        },
        getCourseById : async(id)=>{
          try{
           
            const token = localStorage.getItem("jwtToken");
            const response = await axiosInstance.get(`http://localhost:8080/api/courses/${id}`, {
              headers: {
                Authorization: `Bearer ${token}`, 
                
              }}
            );
            return response.data

          }catch(error){
            
            console.error("Course fetch failed:", error);
            throw new Error("Course fetch failed");

          }



        },
        evaluateCourse : async (courseId,stars, comment)=>{ 
          try{
            const token = localStorage.getItem("jwtToken");
            const decodedToken = jwtDecode(token);

            // Get the user's email from the token
            const userEmail = decodedToken.sub;
            const user = await userService.getCurrentUser(userEmail)
            const course = await coursesService.getCourseById(courseId)
            let alreadyEvaluated=false
            if    (course.evaluations){
              alreadyEvaluated=course.evaluations.some((ev)=>ev.user_id==user.id)
            }
            if(user && user.role==="STUDENT" && !alreadyEvaluated ){
              
          const  userId=user.id
            
              const response = await axiosInstance.post(`http://localhost:8080/api/courses/${courseId}/evaluations`, {
              userId,
                courseId,
               stars,
               comment
              } , {
                headers: {
                  Authorization: `Bearer ${token}`, 
                  
          }});
          window.location.reload();
        }
          else{
            throw new Error("Not authorized")
          }

          }
          catch(error){
            
            console.error("Evaluation failed:", error);
            throw new Error("Course evaluation failed");


          }
 
        },
        createCourse: async (courseDetails) => {
          const token = localStorage.getItem("jwtToken");
          if (userService.isAdmin()) {
            try {
              const response = await axiosInstance.post(
                "http://localhost:8080/api/courses",
                courseDetails,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );
              return response.data; // Return the created user details
            } catch (error) {
              console.error("Failed to create course:", error);
              throw new Error("Failed to create course. Please try again.");
            }
          } else {
            throw new Error("Not authorized!");
          }
        },
        modifyCourse: async (courseId,courseDetails) => {
          const token = localStorage.getItem("jwtToken");
          if (userService.isAdmin()) {
            try {
              const response = await axiosInstance.put(
                `http://localhost:8080/api/courses/${courseId}`,
               courseDetails,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );
              return response.data; // Return the created user details
            } catch (error) {
              console.error("Failed to create course:", error);
              throw new Error("Failed to create course. Please try again.");
            }
          } else {
            throw new Error("Not authorized!");
          }
        },
        getPromotions: async () => {
          try {
            const token = localStorage.getItem("jwtToken");
            const response = await axiosInstance.get("http://localhost:8080/api/promotions", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            return response.data;
          } catch (error) {
            console.error("Promotions fetch failed:", error);
            throw new Error("Promotions fetch failed");
          }
        },
        getPromotionById: async (id) => {
          try {
            const token = localStorage.getItem("jwtToken");
            const response = await axiosInstance.get(`http://localhost:8080/api/promotions/${id}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            return response.data;
          } catch (error) {
            console.error("Promotion fetch failed:", error);
            throw new Error("Promotion fetch failed");
          }
        },
        getModules: async () => {
          try {
            const token = localStorage.getItem("jwtToken");
            const response = await axiosInstance.get("http://localhost:8080/api/modules", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            return response.data;
          } catch (error) {
            console.error("Modules fetch failed:", error);
            throw new Error("Modules fetch failed");
          }
        },
        getModuleById: async (id) => {
          try {
            const token = localStorage.getItem("jwtToken");
            const response = await axiosInstance.get(`http://localhost:8080/api/modules/${id}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            return response.data;
          } catch (error) {
            console.error("Module fetch failed:", error);
            throw new Error("Module fetch failed");
          }
        },
        createModule: async (moduleDetails) => {
          const token = localStorage.getItem("jwtToken");
          if (userService.isAdmin()) {
            try {
              const response = await axiosInstance.post(
                "http://localhost:8080/api/modules",
                moduleDetails,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );
              return response.data; // Return the created module details
            } catch (error) {
              console.error("Failed to create module:", error);
              throw new Error("Failed to create module. Please try again.");
            }
          } else {
            throw new Error("Not authorized!");
          }
        },
        createPromotion: async (promotionDetails) => {
          const token = localStorage.getItem("jwtToken");
          if (userService.isAdmin()) {
            try {
              const response = await axiosInstance.post(
                "http://localhost:8080/api/promotions",
                promotionDetails,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );
              return response.data; // Return the created promotion details
            } catch (error) {
              console.error("Failed to create promotion:", error);
              throw new Error("Failed to create promotion. Please try again.");
            }
          } else {
            throw new Error("Not authorized!");
          }
        } ,
        deletePromotion: async (id) => {
          try {
            const token = localStorage.getItem("jwtToken");
            const response = await axiosInstance.delete(`http://localhost:8080/api/promotions/${id}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            return response.data;
          } catch (error) {
            console.error("Failed to delete promotion:", error);
            throw new Error("Failed to delete promotion. Please try again.");
          }
        },
       
        
        
        deleteModule: async (id) => {
          try {
            const token = localStorage.getItem("jwtToken");
            const response = await axiosInstance.delete(`http://localhost:8080/api/modules/${id}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            return response.data;
          } catch (error) {
            console.error("Failed to delete module:", error);
            throw new Error("Failed to delete module. Please try again.");
          }
        }        
        
        
        
}

export default coursesService;
  