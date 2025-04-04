import React from 'react';
import "../CSS/login.css";
import {useNavigate} from "react-router-dom"


const Signup = () => {
    const navigate = useNavigate();
    const gotoLogin = ()=>{
       navigate("/");
    }

  return (
    <div className="login_container">
      <div className="brand">
        
      </div>
      <div className="login">
        
        <form>            
          <h2>Sign Up</h2>
          <input type="email" placeholder="Enter your email" required />
          <input type="password" placeholder="Enter your password" required />
          <input type="password" placeholder="Reenter your password" required />
          
          <input type="submit" value="Signup" />
          <a onClick={gotoLogin}>already having a account?</a>
        </form>
      </div>
    </div>
  );
};

export default Signup;
