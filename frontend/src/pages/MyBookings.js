import { useEffect, useState } from "react";
import api from "../api/axios";
import "./MyBookings.css";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await api.get("/bookings");
        setBookings(res.data);
      } catch (err) {
        setError("Failed to load your journey history.");
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="bookings-modern-page">
      <div className="bookings-header-wrapper">
        <h1 className="bookings-title">
          MY <br />
          <span className="bookings-title-accent">JOURNEYS</span>
        </h1>
        <p className="bookings-subtitle">
          A collection of your past and upcoming adventures.
        </p>
      </div>

      {error && <div className="bookings-error-banner">{error}</div>}

      {bookings.length === 0 && !error && (
        <div className="no-bookings-placeholder">
          <h3>No upcoming trips</h3>
          <p>Time to plan your next escape.</p>
        </div>
      )}

      <div className="bookings-masonry-container">
        {bookings.map((b, index) => (
          <div key={b._id} className="booking-modern-card">
            <div className="card-top-decor"></div>

            <div className="booking-main-content">
              <div className="route-header">
                <span className="city-large">{b.flight.origin}</span>
                <span className="direction-icon">→</span>
                <span className="city-large">{b.flight.destination}</span>
              </div>

              <div className="booking-badges">
                <span className={`status-pill ${b.status.toLowerCase()}`}>{b.status}</span>
                <span className="class-pill">Economy</span>
              </div>

              <div className="details-grid">
                <div className="detail-block">
                  <label>Flight</label>
                  <span>{b.flight.flightNumbers[0]}</span>
                </div>
                <div className="detail-block">
                  <label>Duration</label>
                  <span>{b.flight.duration}</span>
                </div>
                <div className="detail-block full-width">
                  <label>Date</label>
                  <span>{new Date(b.createdAt).toLocaleDateString(undefined, {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</span>
                </div>
              </div>
            </div>

            <div className="booking-footer">
              <div className="price-display">
                <span className="curr">{b.price.currency}</span>
                <span className="val">{b.price.total}</span>
              </div>
              <div className="ref-code">
                <label>Ref</label>
                <code>{b.bookingReference}</code>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookings;
