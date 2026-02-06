import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import AirportInput from "../components/AirportInput";
import "./SearchFlights.css";

const SearchFlights = () => {
  const [form, setForm] = useState({
    origin: "",
    destination: "",
    date: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.origin || !form.destination || !form.date) {
      setError("Please select origin, destination and date");
      return;
    }

    setLoading(true);

    try {
      const res = await api.get("/flights/search", {
        params: {
          ...form,
          origin: form.origin.toUpperCase(),
          destination: form.destination.toUpperCase(),
        },
      });

      const flights = res.data?.data || res.data;

      navigate("/results", {
        state: { flights },
      });
    } catch (err) {
      setError(
        "Flight service is temporarily unavailable. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-page-modern">
      {/* Split Hero Section */}
      <div className="hero-split-container">
        <div className="hero-text-side">
          <div className="hero-badge">New Experience</div>
          <h1 className="hero-title">
            EXPLORE <br />
            <span className="hero-title-accent">THE WORLD</span>
          </h1>
          <p className="hero-subtitle">
            Curated journeys for the modern traveler.
            Find hidden gems and unbeatable fares.
          </p>
          <div className="hero-scroll-indicator">
            <span>Scroll to discover</span>
            <div className="scroll-line"></div>
          </div>
        </div>
        <div className="hero-image-side">
          <div className="hero-image-wrapper">
            <img src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=2000&q=80" alt="Travel" />
            <div className="hero-overlay-gradient"></div>
          </div>
        </div>
      </div>

      <div className="search-capsule-container">
        <div className="search-capsule">
          <form onSubmit={handleSearch} className="search-form-inline">
            <div className="input-group-inline">
              <label>From</label>
              <AirportInput
                placeholder="Origin"
                onSelect={(code) => setForm({ ...form, origin: code })}
              />
            </div>
            <div className="divider-vertical"></div>
            <div className="input-group-inline">
              <label>To</label>
              <AirportInput
                placeholder="Destination"
                onSelect={(code) => setForm({ ...form, destination: code })}
              />
            </div>
            <div className="divider-vertical"></div>
            <div className="input-group-inline">
              <label>When</label>
              <input
                type="date"
                name="date"
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" disabled={loading} className="search-btn-round">
              {loading ? "..." : "→"}
            </button>
          </form>
          {error && <div className="search-error-tooltip">{error}</div>}
        </div>
      </div>

      {/* Scrolling Trust Ticker */}
      <div className="trust-ticker">
        <div className="ticker-content">
          <span>★ BEST PRICES GUARANTEED</span>
          <span className="separator">•</span>
          <span>★ 24/7 PREMIUM SUPPORT</span>
          <span className="separator">•</span>
          <span>★ VERIFIED BOOKINGS</span>
          <span className="separator">•</span>
          <span>★ INSTANT CONFIRMATION</span>
          <span className="separator">•</span>
          <span>★ BEST PRICES GUARANTEED</span>
          <span className="separator">•</span>
          <span>★ 24/7 PREMIUM SUPPORT</span>
        </div>
      </div>

      {/* Masonry Destinations Grid */}
      <div className="masonry-section">
        <div className="section-header">
          <h2>Trending Now</h2>
          <p>Handpicked destinations for this season</p>
        </div>

        <div className="masonry-grid">
          <div className="masonry-item tall">
            <img src="https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=600&q=80" alt="Mumbai" />
            <div className="masonry-overlay">
              <h3>Mumbai</h3>
            </div>
          </div>
          <div className="masonry-item wide">
            <img src="https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=800&q=80" alt="New Delhi" />
            <div className="masonry-overlay">
              <h3>New Delhi</h3>
            </div>
          </div>
          <div className="masonry-item">
            <img src="https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=600&q=80" alt="Goa" />
            <div className="masonry-overlay">
              <h3>Goa</h3>
            </div>
          </div>
          <div className="masonry-item large">
            <img src="https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=800&q=80" alt="Jaipur" />
            <div className="masonry-overlay">
              <h3>Jaipur</h3>
            </div>
          </div>
          <div className="masonry-item">
            <img src="https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=600&q=80" alt="Bangalore" />
            <div className="masonry-overlay">
              <h3>Bangalore</h3>
            </div>
          </div>
        </div>
      </div>

      <footer className="luxury-footer">
        <div className="footer-content">
          <div className="footer-top">
            <div className="footer-brand-section">
              <h2>Stay Connected</h2>
              <p>Join our exclusive newsletter for the latest travel insights and premium offers.</p>
              <div className="footer-input-group">
                <input type="email" placeholder="Enter your email address" />
                <button>Subscribe</button>
              </div>
            </div>
            <div className="footer-links-grid">
              <div className="footer-column">
                <h4>Company</h4>
                <span>About Us</span>
              </div>
              <div className="footer-column">
                <h4>Support</h4>
                <span>Help Center</span>
                <span>Cancellation Options</span>
                <span>Safety Information</span>
              </div>
              <div className="footer-column">
                <h4>Legal</h4>
                <span>Privacy</span>
                <span>Terms</span>
                <span>Sitemap</span>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <div className="watermark-text">FLIGHTBOOKER</div>
            <div className="copyright-row">
              <span>© 2026 FlightBooker Inc.</span>
              <div className="social-links">
                <span>Instagram</span>
                <span>Twitter</span>
                <span>LinkedIn</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SearchFlights;
