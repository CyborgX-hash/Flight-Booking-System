import React, { useEffect, useState } from "react";

const API = "http://localhost:5001";

export default function BookingHistory() {
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
        <div className="history-card" key={b.id}>
          <div>
            <strong>{b.passengerName}</strong>
            <div>{b.route}</div>
          </div>
          <div className="price">₹{b.pricePaid}</div>
          <a
            href={`${API}/tickets/${b.pnr}.pdf`}
            target="_blank"
            rel="noreferrer"
          >
            Download Ticket
          </a>
        </div>
      ))}
    </div>
  );
}
