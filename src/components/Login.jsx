import React from 'react';
import "../CSS/login.css";
import { useNavigate } from "react-router-dom"
import img from "../assets/login_img.png";

const Login = () => {
    const navigate = useNavigate();
    
    const gotoSignup = ()=>{
        navigate("/signup");
    }
  return (
    <div className="login_container">
      <div className="brand">
        
      </div>
      <div className="login">
        
        <form>            
          <h2>LOGIN</h2>
          <input type="email" placeholder="Enter your email" required />
          <input type="password" placeholder="Enter your password" required />
          <input type="submit" value="Login" />
          <a onClick={gotoSignup}>Don't have an account?</a>
        </form>
      </div>
    </div>
  );
};

export default Login;
