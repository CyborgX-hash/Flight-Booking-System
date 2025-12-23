import React, { useEffect, useState, useContext } from "react";
import { WalletContext } from "../components/WalletContext";
import "../styles/search.css";

const API =
  process.env.REACT_APP_API_URL ||
  "https://flight-booking-system-1-w7cb.onrender.com";

console.log("API URL:", API);


export default function Search() {
  const [flights, setFlights] = useState([]);
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [sort, setSort] = useState(""); 
  const [loading, setLoading] = useState(false);

  const { deduct } = useContext(WalletContext);

  const fetchFlights = async () => {
    try {
      setLoading(true);

      let url = `${API}/flights`;
      if (from || to) {
        url += `?from=${from}&to=${to}`;
      }

      const res = await fetch(url);
      const data = await res.json();

      setFlights(data.flights || []);
      setFilteredFlights(data.flights || []);
    } catch (err) {
      console.error("Failed to fetch flights", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFlights();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    let sorted = [...flights];

    if (sort === "low") {
      sorted.sort((a, b) => a.current_price - b.current_price);
    } else if (sort === "high") {
      sorted.sort((a, b) => b.current_price - a.current_price);
    }

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

      {loading && <p>Loading flights...</p>}

      {!loading && filteredFlights.length === 0 && (
        <p>No flights found for this route.</p>
      )}

      {!loading &&
        filteredFlights.map((f) => (
          <div className="card" key={f.flight_id}>
            <div>
              <strong>{f.airline}</strong>
              <p>
                {f.departure_city} → {f.arrival_city}
              </p>
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
