import React from 'react';
import "../CSS/login.css";
import {useNavigate} from "react-router-dom"
import {useState} from 'react'
import axios from 'axios'


const Signup = () => {
    const navigate = useNavigate();
    const gotoLogin = ()=>{
       navigate("/");
    }

    const [credentials, setCredentials] = useState({ email: "", psd: "" ,con_psd:""});
    const[error,setError] = useState("");

    const handleSignup = async (event) => {
      event.preventDefault(); 
  
     
        if(credentials.psd === credentials.con_psd){
          
            try {
              const res = await axios.post("http://localhost:3000/signup", {"email":credentials.email,"psd":credentials.psd});
        
              if (res.status === 200) {
                navigate("/form");
              }
            } catch (error) {
                setError("Server Error");
                navigate("/signup");
            }
          }

          else{
            setError("Password mismatched🙄");
            navigate("/signup");
          }
      };

  return (
    <div className="login_container">
      <div className="brand">
        
      </div>
      <div className="login">
        
        <form onSubmit={handleSignup}>            
          <h2>Sign Up</h2>
          <input type="email" placeholder="Enter your email" value = {credentials.email} onChange={(e) =>setCredentials((prev) => ({ ...prev, email: e.target.value }))} required />
          <input type="password" placeholder="Enter your password"  value = {credentials.psd} onChange={(e) =>setCredentials((prev) => ({ ...prev, psd: e.target.value }))} required  />
          <input type="password" placeholder="Reenter your password"  value = {credentials.con_psd} onChange={(e) =>setCredentials((prev) => ({ ...prev, con_psd: e.target.value }))} required />
          <div
            style={{
              color: "rgb(255, 237, 39)",
              fontSize: "15px",
              height: "10px",
              textAlign:"left",
              marginBottom: "8px",
            }}
          >
            {error}
          </div>
          <input type="submit" value="Signup" />
          <a onClick={gotoLogin}>already having a account?</a>
        </form>
      </div>
    </div>
  );
};

export default Signup;
