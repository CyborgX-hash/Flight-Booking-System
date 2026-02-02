import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../api/axios";

const Booking = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  // ✅ Hooks MUST be at top
  const [passengers, setPassengers] = useState([
    { name: "", age: "" },
  ]);

  const flight = state?.flight;

  // ✅ early return AFTER hooks
  if (!flight) {
    return <p style={{ padding: "40px" }}>No flight selected.</p>;
  }

  const itinerary = flight.itineraries[0];
  const segments = itinerary.segments;
  const pricePerPassenger = Number(flight.price.total);

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
    try {
      const payload = {
        flight: {
          airline: segments[0].carrierCode,
          flightNumbers: segments.map(
            (s) => `${s.carrierCode}-${s.number}`
          ),
          origin: segments[0].departure.iataCode,
          destination:
            segments[segments.length - 1].arrival.iataCode,
          departureTime: segments[0].departure.at,
          arrivalTime:
            segments[segments.length - 1].arrival.at,
          duration: itinerary.duration,
        },
        passengers,
        price: {
          total: totalPrice,
          currency: flight.price.currency,
        },
      };

      const res = await api.post("/bookings", payload);
      navigate("/checkout-success", {
  state: { booking: res.data },
});

    } catch (error) {
      alert("Booking failed. Please try again.");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Booking Details</h2>

      {/* Flight summary */}
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

      {/* Passenger details */}
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

      <button style={styles.checkout} onClick={handleCheckout}>
        Checkout & Confirm
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
