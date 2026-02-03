import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import AirportInput from "../components/AirportInput";
import "./SearchFlights.css";

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
    <div className="search-container">
      <h2>Search Flights ✈️</h2>

      <div className="search-card">
        <form onSubmit={handleSearch} className="search-form">
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

        {error && <p className="search-error">{error}</p>}
      </div>
    </div>
  );
};

export default SearchFlights;
