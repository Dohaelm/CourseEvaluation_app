import React, {useState,useEffect} from 'react';
import authService from '../services/authService';
import { useNavigate } from 'react-router-dom';
import { FaLock } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import './Login.css';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    const Authenticated =  authService.isAuthenticated();
    console.log(Authenticated)
        
    if (Authenticated) {
      navigate('/dashboard');
    }
    
  }, []);

  const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          await authService.login(email, password);
          navigate("/dashboard");
      } catch (err) {
          setError(err.message);
      }
  };

  return (
      <div className="login-page">
          <div className="login-form shadow-box">
              <h3 className="text-center text-white mb-5">Bienvenue sur ASEDSfeedback!</h3>
              <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="email">
                
                      <Form.Control
                          type="email"
                          placeholder="Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                      />
                       
                      

                  </Form.Group>
                  <div className='flex justify-center items-center '>
                 
                  

                  <Form.Group controlId="password" className="mt-3 ">
                      <Form.Control
                          type="password"
                          placeholder={"Mot de passe"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          className=''
                      />
                     
                  </Form.Group>
                  
                  </div>
                  <Button variant="primary" type="submit" className="w-100 mt-4 mb-5">
                      Se connecter
                  </Button>
              </Form>
              {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
             
          </div>
      </div>
  );
};

export default Login;