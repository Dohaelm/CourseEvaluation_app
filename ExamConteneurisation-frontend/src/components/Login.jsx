import React, {useState} from 'react';
import authService from '../services/authService';
import { useNavigate } from 'react-router-dom';

const Login= () => {
    const [email, setEmail]= useState("");
    const [password,setPassword]=useState("");
    const [error, setError]=useState("");
    const navigate=useNavigate();
    const handleSubmit= async(e) =>{
        e.preventDefault();
        try{
            await authService.login(email,password);
            navigate("/dashboard")
        } catch(err){
            setError(err.message);

        }

    };
    return(
        <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        {error && <p>{error}</p>}
      </form>

)
}
export default Login;