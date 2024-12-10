import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import ProtectedRoute from "./routes/ProtectedRoutes";
import Dashboard from "./components/Dashboard";
// import Courses from "./components/Courses"; // Assuming this exists
// import Admin from "./components/Admin"; // Assuming this exists
 import Layout from "./components/Layout"; // Assuming this exists

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
          {/* <Route
            path="/mes-cours"
            element={
              <ProtectedRoute>
                <Courses />
              </ProtectedRoute>
            }
          /> */}
          {/* <Route
            path="/utilisateurs"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          /> */}
        </Route>

        {/* Public route */}
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
