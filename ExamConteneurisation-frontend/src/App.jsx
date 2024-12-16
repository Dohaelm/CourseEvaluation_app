import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
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


function App() {
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
            element={authService.isAuthenticated() && userService.isAdmin()?(
              <ProtectedRoute>
                <CreateUser />
              </ProtectedRoute>):( <Navigate to="/dashboard" replace />)
            }
          /> 
          <Route
            path="/modules"
            element={authService.isAuthenticated() && userService.isAdmin()?(
              <ProtectedRoute>
                <Modules />
              </ProtectedRoute>):( <Navigate to="/dashboard" replace />)
            }
          /> 
          <Route
            path="/promotions"
            element={authService.isAuthenticated() && userService.isAdmin()?(
              <ProtectedRoute>
                <Promotions />
              </ProtectedRoute>):( <Navigate to="/dashboard" replace />)
            }
          /> 
           <Route
            path="/ajouter-cours"
            element={authService.isAuthenticated() && userService.isAdmin()?(
              <ProtectedRoute>
                <CreateCourse />
              </ProtectedRoute>):( <Navigate to="/dashboard" replace />)
            }
          /> 
           <Route
            path="/utilisateurs"
            element={authService.isAuthenticated() && userService.isAdmin()?(
              <ProtectedRoute>
                <Users />
              </ProtectedRoute>):( <Navigate to="/dashboard" replace />)
            }
          /> 
          
           
        </Route>
         
       

        
        <Route
        path="/"
        element={
          authService.isAuthenticated() ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Login />
          )
        }
      />
      </Routes>
    </Router>
  );
}

export default App;
