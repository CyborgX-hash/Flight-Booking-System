import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../api/axios";

const Booking = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [passengers, setPassengers] = useState([{ name: "", age: "" }]);
  const [loading, setLoading] = useState(false);

  const flight = state?.flight;

  if (!flight) {
    return <p style={{ padding: "40px" }}>No flight selected.</p>;
  }

  const itinerary = flight.itineraries?.[0];
  const segments = itinerary?.segments || [];
  const pricePerPassenger = Number(flight.price?.total || 0);

  if (!segments.length || !itinerary) {
    return <p style={{ padding: "40px" }}>Invalid flight data.</p>;
  }

  const addPassenger = () => {
    setPassengers([...passengers, { name: "", age: "" }]);
  };

  const removePassenger = (index) => {
    setPassengers(passengers.filter((_, i) => i !== index));
  };

  const handleChange = (index, field, value) => {
    const updated = [...passengers];
    updated[index][field] = value;
    setPassengers(updated);
  };

  const totalPrice = passengers.length * pricePerPassenger;

  const handleCheckout = async () => {
    const validPassengers = passengers.filter(
      (p) => p.name.trim() && Number(p.age) > 0
    );

    if (validPassengers.length !== passengers.length) {
      alert("Please enter valid passenger name and age");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        flight: {
          airline: segments[0].carrierCode,
          flightNumbers: segments.map(
            (s) => `${s.carrierCode}-${s.number}`
          ),
          origin: segments[0].departure.iataCode,
          destination: segments[segments.length - 1].arrival.iataCode,
          departureTime: segments[0].departure.at,
          arrivalTime: segments[segments.length - 1].arrival.at,
          duration: itinerary.duration,
        },
        passengers: validPassengers.map((p) => ({
          name: p.name.trim(),
          age: Number(p.age),
        })),
        price: {
          total: totalPrice,
          currency: flight.price.currency || "INR",
        },
      };

      // ✅ Capture response
      const res = await api.post("/bookings", payload);

      // ✅ Redirect to checkout success page
      navigate("/checkout-success", {
        state: { booking: res.data },
      });
    } catch (error) {
      console.error("Booking error:", error.response?.data || error);
      alert("Booking failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Booking Details</h2>

      <div style={styles.card}>
        <p>
          <strong>
            {segments[0].departure.iataCode} →{" "}
            {segments[segments.length - 1].arrival.iataCode}
          </strong>
        </p>
        <p>Duration: {itinerary.duration}</p>
        <p>Price per passenger: ₹{pricePerPassenger}</p>
      </div>

      <h3>Passenger Details</h3>

      {passengers.map((p, index) => (
        <div key={index} style={styles.passenger}>
          <input
            type="text"
            placeholder="Passenger Name"
            value={p.name}
            onChange={(e) =>
              handleChange(index, "name", e.target.value)
            }
          />
          <input
            type="number"
            placeholder="Age"
            value={p.age}
            onChange={(e) =>
              handleChange(index, "age", e.target.value)
            }
          />
          {passengers.length > 1 && (
            <button onClick={() => removePassenger(index)}>
              Remove
            </button>
          )}
        </div>
      ))}

      <button onClick={addPassenger}>Add Passenger</button>

      <h3>Total Price: ₹{totalPrice}</h3>

      <button
        style={styles.checkout}
        onClick={handleCheckout}
        disabled={loading}
      >
        {loading ? "Booking..." : "Checkout & Confirm"}
      </button>
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
    padding: "15px",
    borderRadius: "8px",
    marginBottom: "20px",
  },
  passenger: {
    display: "flex",
    gap: "10px",
    marginBottom: "10px",
  },
  checkout: {
    marginTop: "20px",
    padding: "10px 16px",
    fontSize: "16px",
  },
};

export default Booking;
