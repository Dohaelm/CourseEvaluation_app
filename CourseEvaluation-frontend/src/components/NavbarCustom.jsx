import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import authService from "../services/authService";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import userService from "../services/userService";

const NavbarCustom = () => {
  const navigate = useNavigate();

  const [isAdmin,setIsAdmin]=useState(true);

  useEffect(() => {
    const fetchIsAdmin = async () => {
      try {
        const response = userService.isAdmin();
        console.log(response)
      
       

        setIsAdmin(response); // Mettre à jour avec tous les cours
       
        
      } catch (err) {
        console.error("Failed to fetch role :", err);
        setError("Failed to fetch role. Please try again later.");
        
      }
    };

    fetchIsAdmin();
  }, []);

  const handleLogout = () => {
    authService.logout();
    navigate("/"); // Redirect to login page after logout
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top" className="w-100">
      <Container fluid>
        <Navbar.Brand
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        >
          ASEDSFeedback
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
           
            <Nav.Link onClick={() => navigate("/mes-cours")}>Mes cours</Nav.Link>
            {isAdmin && (
              <>
                <Nav.Link onClick={() => navigate("/utilisateurs")}>
                  Utilisateurs
                </Nav.Link>
                <Nav.Link onClick={() => navigate("/modules")}>Modules</Nav.Link>
                <Nav.Link onClick={() => navigate("/promotions")}>
                  Promotions
                </Nav.Link>
              </>
            )}
          </Nav>
          <Nav>
            <Nav.Link onClick={handleLogout}>Se déconnecter</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarCustom;
