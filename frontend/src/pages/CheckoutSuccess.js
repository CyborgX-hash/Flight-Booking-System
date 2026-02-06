import { useLocation, useNavigate } from "react-router-dom";
import "./CheckoutSuccess.css";

const CheckoutSuccess = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const booking = state?.booking;

  if (!booking) {
    return <div className="success-modern-page"><p className="error-text">No booking details found.</p></div>;
  }

  return (
    <div className="success-modern-page">
      <div className="success-center-wrapper">
        <div className="success-header-text">
          <h1>JOURNEY <br /> STARTED</h1>
          <p>Your booking has been successfully confirmed.</p>
        </div>

        <div className="ticket-receipt-card">
          {/* Top Section */}
          <div className="receipt-top">
            <div className="airline-brand">FlightTicket</div>
            <div className="status-stamp">CONFIRMED</div>
          </div>

          {/* Route Section */}
          <div className="receipt-route">
            <div className="city-point">
              <span className="code">{booking.flight.origin}</span>
              <span className="label">Origin</span>
            </div>
            <div className="flight-icon-visual">
              ✈
              <div className="dotted-trail"></div>
            </div>
            <div className="city-point right">
              <span className="code">{booking.flight.destination}</span>
              <span className="label">Destination</span>
            </div>
          </div>

          {/* Details Grid */}
          <div className="receipt-details">
            <div className="detail-item">
              <label>Passenger Name</label>
              {/* Assuming booking.passengers exists, showing first one or 'Guest' */}
              <span>{booking.passengers && booking.passengers.length > 0 ? booking.passengers[0].name : "Guest"} {booking.passengers && booking.passengers.length > 1 ? `+${booking.passengers.length - 1}` : ""}</span>
            </div>
            <div className="detail-item">
              <label>Date</label>
              <span>{new Date().toLocaleDateString()}</span>
            </div>
            <div className="detail-item">
              <label>Flight</label>
              <span>{booking.flight.airline || "FL"}</span>
            </div>
            <div className="detail-item">
              <label>Class</label>
              <span>Economy</span>
            </div>
          </div>

          {/* Rip Line */}
          <div className="receipt-rip-line">
            <div className="half-circle left"></div>
            <div className="dots"></div>
            <div className="half-circle right"></div>
          </div>

          {/* Bottom Section */}
          <div className="receipt-bottom">
            <div className="ref-block">
              <label>Booking Reference</label>
              <code className="ref-number">{booking.bookingReference}</code>
            </div>
            <div className="barcode-mock">
              ||| | ||| || ||| | ||
            </div>
          </div>
        </div>

        <div className="success-actions">
          <button className="primary-action-btn" onClick={() => navigate("/bookings")}>
            View My Bookings
          </button>
          <button className="secondary-action-btn" onClick={() => navigate("/")}>
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccess;
