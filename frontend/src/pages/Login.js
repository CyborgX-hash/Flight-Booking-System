import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import "./Auth.css";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Check API health on load
  useEffect(() => {
    console.log("✈️ API Base URL Configured:", api.defaults.baseURL);
    const checkHealth = async () => {
      try {
        await api.get("/health");
        console.log("🟢 API connection healthy");
      } catch (err) {
        console.error("🔴 API connection failed:", err);
        setError("Warning: Cannot connect to the flight service. Please check if the backend is running.");
      }
    };
    checkHealth();
  }, []);

  // Redirect if already logged in

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      console.log("🚀 Sending Login Request:", form.email);
      const res = await api.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      console.log("✅ Login Success, navigating to /search");
      navigate("/search");
    } catch (err) {
      console.error("❌ Login Error:", err);
      if (err.code === "ERR_NETWORK") {
        setError("Network error: Cannot reach the server. Please check your backend connection or REACT_APP_API_URL.");
      } else {
        setError(err.response?.data?.message || err.message || "Login failed. Please try again.");
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
          <h2>WELCOME <br /><span className="auth-title-accent">BACK</span></h2>
          <p>Sign in to access your curated journeys.</p>
        </div>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
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
              placeholder="••••••••"
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? "Signing In..." : "Sign In"}
          </button>
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
