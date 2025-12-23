import React, { useEffect, useState, useContext } from "react";
import { WalletContext } from "../components/WalletContext";
import "../styles/search.css";

// ❗ DO NOT USE FALLBACKS IN PROD
const API = process.env.REACT_APP_API_URL;

if (!API) {
  console.error("❌ REACT_APP_API_URL is NOT defined");
}

export default function Search() {
  const [flights, setFlights] = useState([]);
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [sort, setSort] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { deduct } = useContext(WalletContext);

  const fetchFlights = async () => {
    try {
      setLoading(true);
      setError("");

      const params = new URLSearchParams();
      if (from) params.append("from", from);
      if (to) params.append("to", to);

      const url = `${API}/flights${params.toString() ? `?${params}` : ""}`;

      console.log("📡 Fetching:", url);

      const res = await fetch(url);

      if (!res.ok) {
        const text = await res.text();
        console.error("API ERROR:", res.status, text);
        throw new Error(`API failed: ${res.status}`);
      }

      const data = await res.json();
      setFlights(data.flights || []);
      setFilteredFlights(data.flights || []);
    } catch (err) {
      console.error("Failed to fetch flights", err);
      setError("Failed to load flights. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFlights();
  }, []);

  useEffect(() => {
    let sorted = [...flights];
    if (sort === "low") sorted.sort((a, b) => a.current_price - b.current_price);
    if (sort === "high") sorted.sort((a, b) => b.current_price - a.current_price);
    setFilteredFlights(sorted);
  }, [sort, flights]);

  const bookFlight = async (flight) => {
    if (!deduct(flight.current_price)) return;

    const res = await fetch(`${API}/book`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        passengerName: "Saksham",
        flightId: flight.flight_id,
      }),
    });

    const data = await res.json();
    if (data.ticketUrl) {
      window.open(`${API}${data.ticketUrl}`, "_blank");
    } else {
      alert(data.error || "Booking failed");
    }
  };

  return (
    <div className="section">
      <h2>Search Flights</h2>

      <div className="search-bar">
        <input placeholder="From" value={from} onChange={(e) => setFrom(e.target.value)} />
        <input placeholder="To" value={to} onChange={(e) => setTo(e.target.value)} />

        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="">Sort by Price</option>
          <option value="low">Low → High</option>
          <option value="high">High → Low</option>
        </select>

        <button onClick={fetchFlights}>Search</button>
      </div>

      {loading && <p>Loading flights...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading &&
        filteredFlights.map((f) => (
          <div className="card" key={f.flight_id}>
            <div>
              <strong>{f.airline}</strong>
              <p>{f.departure_city} → {f.arrival_city}</p>
            </div>
            <div className="card-price">
              <p>₹{f.current_price}</p>
              <button onClick={() => bookFlight(f)}>Book</button>
            </div>
          </div>
        ))}
    </div>
  );
}
