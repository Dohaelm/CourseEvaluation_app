import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import React, { useEffect, useState } from "react";
import ProtectedRoute from "./routes/ProtectedRoutes";
import Dashboard from "./components/Dashboard";
import authService from "./services/authService";
 import Courses from "./components/Courses"; // Assuming this exists
// import Admin from "./components/Admin"; // Assuming this exists
 import Layout from "./components/Layout"; // Assuming this exists
import Course from "./components/Course";
import { Navigate } from "react-router-dom";
import userService from "./services/userService";
import CreateUser from "./components/CreateUser";
import CreateCourse from "./components/CreateCourse";
import Users from "./components/Users";
import Modules from "./components/Modules";
import Promotions from "./components/Promotions";
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
  
    const [isAdmin,setIsAdmin]=useState(false);
    const [isAuthenticated, setIsAuthenticated]=useState(false) ;
  useEffect(() => {
    const fetchIsAdmin = async () => {
      try {
        const [responseAd,responseAu] = await Promise.all([userService.isAdmin(), authService.isAuthenticated() ])
     
      
       console.log(responseAd, responseAu)

        setIsAdmin(responseAd); 
        setIsAuthenticated(responseAu);
       
        
      } catch (err) {
        console.error("Failed to fetch role :", err);
        setError("Failed to fetch role. Please try again later.");
        
      }
    };

    fetchIsAdmin();
  }, []);
  return (
    <Router>
      <Routes>
      
        <Route element={<Layout />}>
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cours/:id"
            element={
              <ProtectedRoute>
                <Course />
              </ProtectedRoute>
            }
          />
           <Route
            path="/mes-cours"
            element={
              <ProtectedRoute>
                <Courses />
              </ProtectedRoute>
            }
          /> 
          <Route
            path="/ajouter-utilisateur"
            element={
              <ProtectedRoute>
                <CreateUser />
              </ProtectedRoute>}
           
          /> 
          <Route
            path="/modules"
            element={ 
              <ProtectedRoute>
                <Modules />
              </ProtectedRoute>
            }
          /> 
          <Route
            path="/promotions"
            element={
              <ProtectedRoute>
                <Promotions />
              </ProtectedRoute>
            }
          /> 
           <Route
            path="/ajouter-cours"
            element={
              <ProtectedRoute>
                <CreateCourse />
              </ProtectedRoute>
            }
          /> 
           <Route
            path="/utilisateurs"
            element={
              <ProtectedRoute>
                <Users />
              </ProtectedRoute>
            }
          /> 
          
           
        </Route>
         
       

        
        <Route
        path="/"
        element={
          
           
         
            <Login />
          
        }
      />
      </Routes>
    </Router>
  );
}

export default App;
