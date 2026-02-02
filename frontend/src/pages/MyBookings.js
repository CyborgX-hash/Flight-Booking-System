import { useEffect, useState } from "react";
import api from "../api/axios";

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
    <div style={styles.container}>
      <h2>My Bookings</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {bookings.length === 0 && <p>No bookings found.</p>}

      {bookings.map((b) => (
        <div key={b._id} style={styles.card}>
          <p>
            <strong>
              {b.flight.origin} → {b.flight.destination}
            </strong>
          </p>
          <p>Flight: {b.flight.flightNumbers.join(", ")}</p>
          <p>Duration: {b.flight.duration}</p>
          <p>
            Price: ₹{b.price.total} {b.price.currency}
          </p>
          <p>Status: {b.status}</p>
          <p>Ref: {b.bookingReference}</p>
        </div>
      ))}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "800px",
    margin: "40px auto",
    padding: "20px",
  },
  card: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "12px",
    marginBottom: "12px",
  },
};

export default MyBookings;
