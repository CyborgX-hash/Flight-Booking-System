import React, { useEffect, useState } from "react";

const API = "http://localhost:5001";

export default function FlightSearch() {
  const [flights, setFlights] = useState([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [message, setMessage] = useState("");

  const fetchFlights = async () => {
    const res = await fetch(`${API}/flights?from=${from}&to=${to}`);
    const data = await res.json();
    setFlights(data.flights || []);
  };

  const bookFlight = async (flightId) => {
    const res = await fetch(`${API}/book`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        passengerName: "Saksham",
        flightId,
      }),
    });

    const data = await res.json();

    if (data.ticketUrl) {
      setMessage(`Booked successfully! Download ticket below 👇`);
      window.open(`${API}${data.ticketUrl}`, "_blank");
    } else {
      setMessage(data.error || "Booking failed");
    }
  };

  useEffect(() => {
    fetchFlights();
  }, []);

  return (
    <div className="section">
      <h2>Search Flights</h2>

      <input
        placeholder="From"
        value={from}
        onChange={(e) => setFrom(e.target.value)}
      />
      <input
        placeholder="To"
        value={to}
        onChange={(e) => setTo(e.target.value)}
      />
      <button onClick={fetchFlights}>Search</button>

      {flights.map((f) => (
        <div className="flight-card" key={f.flight_id}>
          <div>
            <strong>{f.airline}</strong>
            <div>
              {f.departure_city} → {f.arrival_city}
            </div>
          </div>
          <div className="price">₹{f.current_price}</div>
          <button onClick={() => bookFlight(f.flight_id)}>Book</button>
        </div>
      ))}

      {message && <div className="success">{message}</div>}
    </div>
  );
}
