import { useEffect, useState } from "react";
import api from "../api/axios";
import "./MyBookings.css";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await api.get("/bookings"); // ✅ correct route
        setBookings(res.data);
      } catch (err) {
        setError("Failed to load bookings");
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="bookings-container">
      <h2>My Bookings</h2>

      {error && <p className="bookings-error">{error}</p>}

      {bookings.length === 0 && <p className="bookings-empty">No bookings found.</p>}

      {bookings.map((b) => (
        <div key={b._id} className="booking-card">
          <div className="booking-header">
            <div className="booking-route">
              {b.flight.origin}
              <span className="booking-arrow">→</span>
              {b.flight.destination}
            </div>
            <div className={`booking-status ${b.status.toLowerCase()}`}>
              {b.status}
            </div>
          </div>
          <div className="booking-details">
            <div className="booking-detail-item">
              <span className="booking-detail-label">Flight</span>
              <span className="booking-detail-value">{b.flight.flightNumbers.join(", ")}</span>
            </div>
            <div className="booking-detail-item">
              <span className="booking-detail-label">Duration</span>
              <span className="booking-detail-value">{b.flight.duration}</span>
            </div>
          </div>
          <div className="booking-price">
            ₹{b.price.total} {b.price.currency}
          </div>
          <div className="booking-reference">
            <div className="booking-reference-label">Booking Reference</div>
            <div className="booking-reference-value">{b.bookingReference}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyBookings;
