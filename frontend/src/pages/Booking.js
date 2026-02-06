import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../api/axios";
import "./Booking.css";

const Booking = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [passengers, setPassengers] = useState([{ name: "", age: "" }]);
  const [loading, setLoading] = useState(false);

  const flight = state?.flight;

  if (!flight) {
    return <div className="booking-modern-page"><p className="error-msg">No flight selected.</p></div>;
  }

  const itinerary = flight.itineraries?.[0];
  const segments = itinerary?.segments || [];
  const pricePerPassenger = Number(flight.price?.total || 0);

  if (!segments.length || !itinerary) {
    return <div className="booking-modern-page"><p className="error-msg">Invalid flight data.</p></div>;
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

      const res = await api.post("/bookings", payload);

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
    <div className="booking-modern-page">
      <div className="booking-split-container">
        {/* Left Side: Manifest (Forms) */}
        <div className="booking-manifest-section">
          <div className="manifest-header">
            <span className="step-badge">Final Step</span>
            <h1 className="manifest-title">PASSENGER <br /><span className="title-outline">MANIFEST</span></h1>
            <p className="manifest-subtitle">Secure your seats for the upcoming journey.</p>
          </div>

          <div className="passenger-form-group">
            {passengers.map((p, index) => (
              <div key={index} className="passenger-input-row">
                <div className="passenger-number">0{index + 1}</div>
                <div className="input-field-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    placeholder="e.g. John Doe"
                    value={p.name}
                    onChange={(e) => handleChange(index, "name", e.target.value)}
                  />
                </div>
                <div className="input-field-group">
                  <label>Age</label>
                  <input
                    type="number"
                    placeholder="25"
                    value={p.age}
                    onChange={(e) => handleChange(index, "age", e.target.value)}
                  />
                </div>
                {passengers.length > 1 && (
                  <button className="remove-btn-icon" onClick={() => removePassenger(index)}>
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>

          <button className="add-passenger-link" onClick={addPassenger}>
            + Add Another Passenger
          </button>
        </div>

        {/* Right Side: Trip Summary Panel */}
        <div className="booking-summary-panel">
          <div className="summary-card sticky-card">
            <div className="summary-header">
              <h3>Flight Summary</h3>
              <div className="route-tags">
                <span className="tag">{segments[0].departure.iataCode}</span>
                <span className="arrow">→</span>
                <span className="tag">{segments[segments.length - 1].arrival.iataCode}</span>
              </div>
            </div>

            <div className="summary-details">
              <div className="detail-row">
                <span>Duration</span>
                <strong>{itinerary.duration.replace("PT", "").toLowerCase()}</strong>
              </div>
              <div className="detail-row">
                <span>Class</span>
                <strong>Economy</strong>
              </div>
              <div className="detail-row">
                <span>Date</span>
                <strong>{new Date(segments[0].departure.at).toLocaleDateString()}</strong>
              </div>
            </div>

            <div className="summary-divider"></div>

            <div className="price-breakdown">
              <div className="breakdown-row">
                <span>Passenger x {passengers.length}</span>
                <span>₹{pricePerPassenger * passengers.length}</span>
              </div>
              <div className="breakdown-row total">
                <span>Total</span>
                <span>₹{totalPrice}</span>
              </div>
            </div>

            <button
              className="confirm-booking-btn"
              onClick={handleCheckout}
              disabled={loading}
            >
              {loading ? "Processing..." : "Confirm & Pay"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
