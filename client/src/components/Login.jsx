import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:8000/api/login", { email, password });
      alert("Login Successful!");
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (error) {
      alert("Invalid Credentials");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4">
        <h3>Login</h3>
        <input type="email" placeholder="Email" className="form-control mb-2"
          onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" className="form-control mb-2"
          onChange={(e) => setPassword(e.target.value)} />
        <button className="btn btn-primary w-100" onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}

export default Login;
