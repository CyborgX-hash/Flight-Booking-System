import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../api/axios";
import "./Booking.css";

const Booking = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [passengers, setPassengers] = useState([{ name: "", age: "" }]);
  const [loading, setLoading] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  /* Promo Code Logic (Moved to top) */
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [promoError, setPromoError] = useState("");

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

  /* Promo Code Logic */
  /* Promo Code Logic */
  // Moved to top

  const basePrice = passengers.length * pricePerPassenger;
  const totalPrice = basePrice - discount;

  const handleApplyPromo = () => {
    setPromoError("");
    setDiscount(0);

    if (!promoCode) return;

    if (promoCode === "PAIR20") {
      if (passengers.length < 2) {
        setPromoError("This coupon requires at least 2 passengers.");
        return;
      }
      const discValue = basePrice * 0.20;
      setDiscount(discValue);
      setAppliedCoupon("PAIR20 (20% OFF)");
    } else if (promoCode === "FIRST50") {
      const discValue = basePrice * 0.50;
      setDiscount(discValue);
      setAppliedCoupon("FIRST50 (50% OFF)");
    } else if (promoCode === "SUMMER10") {
      const discValue = basePrice * 0.10;
      setDiscount(discValue);
      setAppliedCoupon("SUMMER10 (10% OFF)");
    } else if (promoCode === "FAMILY25") {
      if (passengers.length < 4) {
        setPromoError("Family pack requires min 4 passengers.");
        return;
      }
      const discValue = basePrice * 0.25;
      setDiscount(discValue);
      setAppliedCoupon("FAMILY25 (25% OFF)");
    } else {
      setPromoError("Invalid Coupon Code");
    }
  };

  const handleCheckout = async () => {
    const validPassengers = passengers.filter(
      (p) => p.name.trim() && Number(p.age) > 0
    );

    // Authentication Gate
    const token = localStorage.getItem("token");
    if (!token) {
      setShowAuthModal(true);
      return;
    }

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

            {/* Promo Code Section */}
            <div className="promo-section">
              <div className="promo-input-group">
                <input
                  type="text"
                  placeholder="Promo Code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                  disabled={appliedCoupon}
                />
                {!appliedCoupon ? (
                  <button className="apply-btn" onClick={handleApplyPromo}>Apply</button>
                ) : (
                  <button className="remove-btn" onClick={() => {
                    setAppliedCoupon(null);
                    setDiscount(0);
                    setPromoCode("");
                  }}>Remove</button>
                )}
              </div>
              {promoError && <p className="promo-error">{promoError}</p>}
              {appliedCoupon && <p className="promo-success">Coupon applied: {appliedCoupon}</p>}
            </div>

            <div className="price-breakdown">
              <div className="breakdown-row">
                <span>Passenger x {passengers.length}</span>
                <span>₹{pricePerPassenger * passengers.length}</span>
              </div>
              {discount > 0 && (
                <div className="breakdown-row discount">
                  <span>Discount</span>
                  <span>- ₹{discount}</span>
                </div>
              )}
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


      {/* Auth Gate Modal */}
      {
        showAuthModal && (
          <div className="auth-modal-overlay">
            <div className="auth-modal-card">
              <h3>Login Required</h3>
              <p>Please sign in or create an account to finalize your booking.</p>
              <div className="auth-modal-actions">
                <button
                  className="auth-modal-btn login"
                  onClick={() => navigate("/login")}
                >
                  Log In
                </button>
                <button
                  className="auth-modal-btn signup"
                  onClick={() => navigate("/signup")}
                >
                  Create Account
                </button>
              </div>
              <button
                className="auth-modal-close"
                onClick={() => setShowAuthModal(false)}
              >
                Continue as Guest (Not Allowed)
              </button>
            </div>
          </div>
        )
      }
    </div >
  );
};

export default Booking;
