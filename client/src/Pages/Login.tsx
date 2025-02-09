//useRef: allows us to reference the input fields without re-rendering
//useState: allows us to manage the error message
//useNavigate: allows us to navigate to another page
//handleLogin: sends a POST request to the server to log in the user
//Login.css: styles for the login form
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { loginUser} from "../services/authService.ts";

//Props for managing the Login state
//setIsLoggedIn: function that updates the login status (passed from a parent component)
//the function changes the UI when the user logs in (e.g.hiding the login button, showing the logout button)
// interface LoginProps {
//   setIsLoggedIn: (status: boolean) => void;
// }

//useRef<HTMLInputElement>null: 
  //(1) stores references to the input fields 
  //(2) instead of using useState, we read values only when the LogIn button is clicked
const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Hook for redirecting

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await loginUser(username, password);

    if (result) {
      localStorage.setItem("token", result.token); // Store token
      navigate("/dashboard"); // Redirect after successful login
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Login;