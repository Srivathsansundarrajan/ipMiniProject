import React, { useState } from "react";
import "../CSS/login.css";
import { useNavigate } from "react-router-dom"
import img from "../assets/login_img.png";

const Login = () => {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({ email: "", psd: "" });
  const[error,setError] = useState("");

  const gotoSignup = () => {
    navigate("/signup");
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const res = await axios.post("http://localhost:3000/login",{"email":credentials.email,"psd":credentials.psd});

      if (res.status === 200) {
        navigate("/form");
      }
      
    } catch (error) {
      if(error.response.status === 401){
        setError("Invalid username or password😠");
      }
      
    }
  };

  return (
    <div className="login_container">
      <div className="brand"></div>
      <div className="login">
      <form onSubmit={handleLogin}>
          <h2>LOGIN</h2>
          <input
            type="email"
            placeholder="Enter your email"
            value={credentials.email}
            onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={credentials.psd}
            onChange={(e) => setCredentials({ ...credentials, psd: e.target.value })}
            required
          />
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
          <input type="submit" value="Login" />
          <a onClick={gotoSignup} style={{ cursor: "pointer" }}>
            Don't have an account?
          </a>
          <a onClick={()=>{navigate("/forgotpsd");}} style={{ cursor: "pointer" }}>Forgot Password</a>
        </form>
      </div>
    </div>
  );
};

export default Login;
