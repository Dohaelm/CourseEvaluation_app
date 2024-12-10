
import axios from "axios";
import axiosInstance from "../utils/AxiosInstance";

const coursesService={
    getCourses : async ()=>{
        try {
            const token = localStorage.getItem("jwtToken"); // Retrieve the JWT
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
        }
}
export default coursesService;
  