import { useLocation, useNavigate } from "react-router-dom";
import "./CheckoutSuccess.css";

const CheckoutSuccess = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const booking = state?.booking;

  if (!booking) {
    return <p className="success-empty">No booking details found.</p>;
  }

  return (
    <div className="success-container">
      <div className="success-icon">🎉</div>
      <h2>Booking Confirmed!</h2>

      <div className="success-card">
        <div className="success-route">
          {booking.flight.origin}
          <span className="success-arrow">→</span>
          {booking.flight.destination}
        </div>

        <div className="success-details">
          <div className="success-detail-item">
            <span className="success-detail-label">Airline</span>
            <span className="success-detail-value">{booking.flight.airline}</span>
          </div>
          <div className="success-detail-item">
            <span className="success-detail-label">Duration</span>
            <span className="success-detail-value">{booking.flight.duration}</span>
          </div>
          <div className="success-detail-item">
            <span className="success-detail-label">Status</span>
            <span className="success-detail-value">{booking.status}</span>
          </div>
        </div>

        <div className="success-price">
          Total Paid: ₹{booking.price.total} {booking.price.currency}
        </div>

        <div className="success-reference">
          <div className="success-reference-label">Booking Reference</div>
          <div className="success-reference-value">{booking.bookingReference}</div>
        </div>
      </div>

      <div className="success-actions">
        <button onClick={() => navigate("/bookings")}>
          View My Bookings
        </button>
      </div>
    </div>
  );
};

export default CheckoutSuccess;
