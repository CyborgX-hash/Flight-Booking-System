import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import "./Auth.css";

const Signup = () => {
  useEffect(() => {
    console.log("✈️ API Base URL Configured:", api.defaults.baseURL);
  }, []);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      console.log("🚀 Sending Signup Request:", form.email);
      await api.post("/auth/signup", form);
      console.log("✅ Signup Success, navigating to /");
      // Redirect to root (Login) after signup
      navigate("/");
    } catch (err) {
      console.error("❌ Signup Error:", err);
      if (err.code === "ERR_NETWORK") {
        setError("Network error: Cannot reach the server. Please check your backend connection or REACT_APP_API_URL.");
      } else {
        setError(err.response?.data?.message || err.message || "Signup failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-split-layout">
      {/* Left Side: The Console */}
      <div className="auth-left">
        <Link to="/search" className="auth-logo">FlightBooker</Link>

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
              value={form.name}
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
              value={form.email}
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
              value={form.password}
              placeholder="Create a strong password"
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p className="auth-footer">
          Already a member? <Link to="/">Sign In</Link>
        </p>
      </div>

      {/* Right Side: The View */}
      <div className="auth-right">
        <div className="auth-image-wrapper">
          <img
            src="https://images.unsplash.com/photo-1542296332-2e44a785e755?q=80&w=1888&auto=format&fit=crop"
            alt="Travel adventure"
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
