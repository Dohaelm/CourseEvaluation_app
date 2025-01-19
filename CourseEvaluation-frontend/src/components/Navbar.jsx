import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import authService from "../services/authService";

const Navbar = () => {
    
  const navigate = useNavigate();

  // Decode the token to get the user's role
  const token = localStorage.getItem("jwtToken");
  
  const userRole = token ? jwtDecode(token).role : null;
useEffect(()=>{
 console.log(jwtDecode(token))
 })
  const handleLogout = () => {
    authService.logout();
    navigate("/"); // Redirect to login page after logout
  };

  return (
    <nav style={styles.navbar}>
      <ul style={styles.navList}>
        <li style={styles.navItem} onClick={() => navigate("/")}>
          Accueil
        </li>
        <li style={styles.navItem} onClick={() => navigate("/mes-cours")}>
          Mes cours
        </li>
        {userRole == "ADMIN" && (
          <li style={styles.navItem} onClick={() => navigate("/utilisateurs")}>
            Utilisateurs
          </li>
        )}
        {userRole == "ADMIN" && (
          <li style={styles.navItem} onClick={() => navigate("/modules")}>
            Modules
          </li>
        )}
        {userRole == "ADMIN" && (
          <li style={styles.navItem} onClick={() => navigate("/promotions")}>
            Promotions
          </li>
        )}
        <li style={styles.navItem} onClick={handleLogout}>
          Se déconnecter
        </li>
      </ul>
    </nav>
  );
};

// Simple inline styles for the navbar
const styles = {
  navbar: {
    backgroundColor: "#333",
    padding: "1rem",
    display: "flex",
    justifyContent: "center",
  },
  navList: {
    display: "flex",
    listStyle: "none",
    margin: 0,
    padding: 0,
  },
  navItem: {
    margin: "0 1rem",
    color: "#fff",
    cursor: "pointer",
    textDecoration: "none",
    fontSize: "1rem",
  },
};

export default Navbar;
