import React, { useEffect, useState } from "react";

const API = process.env.REACT_APP_API_URL;

export default function History() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetch(`${API}/history`)
      .then((res) => res.json())
      .then((data) => setBookings(data.bookings || []));
  }, []);

  return (
    <div className="section">
      <h2>Booking History</h2>

      {bookings.map((b) => (
        <div className="card" key={b.id}>
          <div>
            <strong>{b.passengerName}</strong>
            <p>{b.route}</p>
          </div>

          <div>
            <p>₹{b.pricePaid}</p>
            <a href={`${API}/tickets/${b.pnr}.pdf`} target="_blank" rel="noreferrer">
              Download
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
