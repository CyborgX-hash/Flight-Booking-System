import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import "./Auth.css";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await api.post("/auth/signup", form);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="auth-split-layout">
      {/* Left Side: The Console */}
      <div className="auth-left">
        <Link to="/" className="auth-logo">FlightBooker</Link>

        <div className="auth-header">
          <h2>START <br /><span className="auth-title-accent">JOURNEY</span></h2>
          <p>Join the club for exclusive fares and updates.</p>
        </div>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-input-group">
            <label>Full Name</label>
            <input
              className="auth-input"
              type="text"
              name="name"
              placeholder="e.g. Amelia Earhart"
              onChange={handleChange}
              required
            />
          </div>

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
              placeholder="Create a strong password"
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="auth-btn">Create Account</button>
        </form>

        <p className="auth-footer">
          Already a member? <Link to="/login">LogIn</Link>
        </p>
      </div>

      {/* Right Side: The View */}
      <div className="auth-right">
        <div className="auth-image-wrapper">
          <img
            src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop"
            alt="Travel adventure"
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
