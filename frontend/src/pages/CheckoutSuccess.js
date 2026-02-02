import { useLocation, useNavigate } from "react-router-dom";

const CheckoutSuccess = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const booking = state?.booking;

  if (!booking) {
    return <p style={{ padding: "40px" }}>No booking details found.</p>;
  }

  return (
    <div style={styles.container}>
      <h2>🎉 Booking Confirmed!</h2>

      <div style={styles.card}>
        <p>
          <strong>
            {booking.flight.origin} → {booking.flight.destination}
          </strong>
        </p>

        <p>Airline: {booking.flight.airline}</p>
        <p>Duration: {booking.flight.duration}</p>

        <p>
          Total Paid: ₹{booking.price.total} {booking.price.currency}
        </p>

        <p>
          Booking Reference:{" "}
          <strong>{booking.bookingReference}</strong>
        </p>

        <p>Status: {booking.status}</p>
      </div>

      <button onClick={() => navigate("/bookings")}>
        View My Bookings
      </button>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "700px",
    margin: "60px auto",
    padding: "20px",
    textAlign: "center",
  },
  card: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "20px",
    margin: "20px 0",
  },
};

export default CheckoutSuccess;
