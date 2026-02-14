import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

export default function LoginPage() {
  const { login } = useAuth();
  const nav = useNavigate();

  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({ username: "", password: "", role: "user" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const endpoint = isRegister ? "register" : "login";
      const res = await axios.post(`http://localhost:3010/auth/${endpoint}`, form);

      login(res.data.access_token, res.data.user);
      if (res.data.user.role === 'admin') {
        nav("/admin");
      } else {
        nav("/");
      }
    } catch (err: any) {
      alert(err.response?.data?.message || "Operation failed");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container premium-card">
        <h1 className="login-title">
          {isRegister ? "Create Account" : "Welcome Back"}
        </h1>
        <p className="login-subtitle">
          {isRegister ? "Join us today" : "Sign in to your account"}
        </p>

        <form onSubmit={handleSubmit} className="premium-form">
          <div className="form-group">
            <label>Username</label>
            <input
              name="username"
              placeholder="Username"
              onChange={handleChange}
              className="premium-input"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              className="premium-input"
              required
            />
          </div>

          {isRegister && (
            <div className="form-group">
              <label>Role</label>
              <select
                name="role"
                onChange={handleChange}
                className="premium-input"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          )}

          <button className="premium-button login-btn">
            {isRegister ? "Sign Up" : "Sign In"}
          </button>
        </form>

        <div className="login-footer">
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="toggle-auth-btn"
          >
            {isRegister ? "Already have an account? Login" : "Don't have an account? Register"}
          </button>
        </div>
      </div>
    </div>
  );
}
