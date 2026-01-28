import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import AirportInput from "../components/AirportInput";

const SearchFlights = () => {
  const [form, setForm] = useState({
    origin: "",
    destination: "",
    date: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.origin || !form.destination || !form.date) {
      setError("Please select origin, destination and date");
      return;
    }

    setLoading(true);

    try {
      const res = await api.get("/flights/search", {
        params: {
          ...form,
          origin: form.origin.toUpperCase(),
          destination: form.destination.toUpperCase(),
        },
      });

      const flights = res.data?.data || res.data;

      navigate("/results", {
        state: { flights },
      });
    } catch (err) {
      setError(
        "Flight service is temporarily unavailable. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Search Flights ✈️</h2>

      <form onSubmit={handleSearch} style={styles.form}>
        <AirportInput
          placeholder="From (City or Code)"
          onSelect={(code) => setForm({ ...form, origin: code })}
        />

        <AirportInput
          placeholder="To (City or Code)"
          onSelect={(code) => setForm({ ...form, destination: code })}
        />

        <input
          type="date"
          name="date"
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Searching..." : "Search Flights"}
        </button>
      </form>

      {error && <p style={styles.error}>{error}</p>}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "600px",
    margin: "60px auto",
    padding: "20px",
  },
  form: {
    display: "grid",
    gap: "12px",
  },
  error: {
    color: "red",
    marginTop: "10px",
  },
};

export default SearchFlights;
