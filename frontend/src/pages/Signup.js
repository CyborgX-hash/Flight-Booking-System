import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";

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
    <div style={styles.container}>
      <h2>Signup</h2>

      {error && <p style={styles.error}>{error}</p>}

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          required
        />

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

        <button type="submit">Signup</button>
      </form>

      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

const styles = {
  container: { maxWidth: "400px", margin: "80px auto", textAlign: "center" },
  form: { display: "flex", flexDirection: "column", gap: "10px" },
  error: { color: "red" },
};

export default Signup;
