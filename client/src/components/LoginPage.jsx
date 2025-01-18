import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault(); // Prevent form submission if used inside a form.
    if (username === "demo" && password === "demo") {
      navigate("/dashboard");
    } else {
      setError("Invalid credentials");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleLogin(e);
    }
  };

  return (
    <div className="login__page">
      <div className="form__container">
        <h2 className="title">Login</h2>
        <input
          className="username"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={handleKeyDown}
          aria-label="Username"
        />
        <input
          className="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={handleKeyDown}
          aria-label="Password"
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button
          className="btn"
          onClick={handleLogin}
          onKeyDown={handleKeyDown}
          
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
