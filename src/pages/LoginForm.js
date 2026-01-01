import React, { useState } from "react";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const auth = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  if (!auth) {
    return <p>Auth system not ready</p>;
  }

  const { login } = auth;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const success = await login(username, password, email);

      if (success) {
        alert("Login successful!");
        navigate("/admin");
      } else {
        alert("Invalid login!");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Admin Login</h2>

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <button type="submit">Login</button>
    </form>
  );
}

export default LoginForm;
