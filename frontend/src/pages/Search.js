import React, { useEffect, useState, useContext } from "react";
import { WalletContext } from "../components/WalletContext";

const API = "http://localhost:5001";

export default function Search() {
  const [flights, setFlights] = useState([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [sort, setSort] = useState(""); // "", "low", "high"
  const [loading, setLoading] = useState(false);

  const { deduct } = useContext(WalletContext);

  // Fetch flights from backend
  const fetchFlights = async () => {
    setLoading(true);

    let url = `${API}/flights`;
    if (from || to) {
      url += `?from=${from}&to=${to}`;
    }

    const res = await fetch(url);
    const data = await res.json();

    let fetchedFlights = data.flights || [];

    // 🔽 SORTING LOGIC
    if (sort === "low") {
      fetchedFlights.sort((a, b) => a.current_price - b.current_price);
    } else if (sort === "high") {
      fetchedFlights.sort((a, b) => b.current_price - a.current_price);
    }

    setFlights(fetchedFlights);
    setLoading(false);
  };

  // Load all flights initially
  useEffect(() => {
    fetchFlights();
    // eslint-disable-next-line
  }, []);

  // Re-sort when sort option changes
  useEffect(() => {
    if (flights.length > 0) {
      fetchFlights();
    }
    // eslint-disable-next-line
  }, [sort]);

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

      {/* 🔍 SEARCH + SORT BAR */}
      <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
        <input
          placeholder="From (e.g. Delhi)"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
        />

        <input
          placeholder="To (e.g. Mumbai)"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />

        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="">Sort by Price</option>
          <option value="low">Low → High</option>
          <option value="high">High → Low</option>
        </select>

        <button onClick={fetchFlights}>Search</button>
      </div>

      {/* ✈️ FLIGHTS LIST */}
      {loading && <p>Loading flights...</p>}

      {!loading && flights.length === 0 && (
        <p>No flights found for this route.</p>
      )}

      {flights.map((f) => (
        <div className="card" key={f.flight_id}>
          <div>
            <strong>{f.airline}</strong>
            <p>
              {f.departure_city} → {f.arrival_city}
            </p>
          </div>

          <div>
            <p>₹{f.current_price}</p>
            <button onClick={() => bookFlight(f)}>Book</button>
          </div>
        </div>
      ))}
    </div>
  );
}
