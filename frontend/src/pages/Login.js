import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import "./Auth.css";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="auth-split-layout">
      {/* Left Side: The Console */}
      <div className="auth-left">
        <Link to="/" className="auth-logo">FlightBooker</Link>

        <div className="auth-header">
          <h2>WELCOME <br /><span className="auth-title-accent">BACK</span></h2>
          <p>Login in to access your curated journeys.</p>
        </div>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-input-group">
            <label>Email Address</label>
            <input
              className="auth-input"
              type="email"
              name="email"
              placeholder="e.g. pilot@flightbooker.com"
              onChange={handleChange}
              required
            />
          </div>

          <div className="auth-input-group">
            <label>Password</label>
            <input
              className="auth-input"
              type="password"
              name="password"
              placeholder="••••••••"
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="auth-btn">Sign In</button>
        </form>

        <p className="auth-footer">
          New here? <Link to="/signup">Begin your journey</Link>
        </p>
      </div>

      {/* Right Side: The View */}
      <div className="auth-right">
        <div className="auth-image-wrapper">
          <img
            src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop"
            alt="Airplane wing view"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
