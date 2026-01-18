import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";

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
    <div style={styles.container}>
      <h2>Login</h2>

      {error && <p style={styles.error}>{error}</p>}

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />

        <button type="submit">Login</button>
      </form>

      <p>
        Don’t have an account? <Link to="/signup">Signup</Link>
      </p>
    </div>
  );
};

const styles = {
  container: { maxWidth: "400px", margin: "80px auto", textAlign: "center" },
  form: { display: "flex", flexDirection: "column", gap: "10px" },
  error: { color: "red" },
};

export default Login;
