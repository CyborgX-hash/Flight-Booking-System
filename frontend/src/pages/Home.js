import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/home.css";
import bgVideo from "../Assets/bg-video.mp4";

export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      {/* HERO SECTION */}
      <div className="home">
        <video autoPlay loop muted playsInline preload="auto">
          <source src={bgVideo} type="video/mp4" />
        </video>

        <div className="home-overlay">
          <h1>Smart Flight Booking</h1>
          <p>Dynamic pricing • Secure booking • Instant tickets</p>

          <div className="home-buttons">
            <button onClick={() => navigate("/search")}>
              Search Flights
            </button>
            <button onClick={() => navigate("/history")}>
              Booking History
            </button>
          </div>
        </div>
      </div>

      {/* ABOUT SECTION */}
      <section className="about">
        <h2>About Us</h2>
        <p>
          Smart Flight Booking is a modern web-based flight reservation system
          designed to provide fast, secure, and affordable bookings.  
          Our platform uses dynamic pricing algorithms to offer competitive fares
          while ensuring a smooth and reliable booking experience.
        </p>
      </section>

      {/* FEATURES SECTION */}
      <section className="features">
        <h2>Why Choose Us?</h2>

        <div className="feature-grid">
          <div className="feature-card">
            <h3>💰 Smart Pricing</h3>
            <p>
              Prices adjust dynamically based on demand, ensuring fair and
              transparent fares.
            </p>
          </div>

          <div className="feature-card">
            <h3>🔐 Secure Payments</h3>
            <p>
              Wallet-based booking ensures secure transactions without sharing
              sensitive details.
            </p>
          </div>

          <div className="feature-card">
            <h3>📄 Instant Tickets</h3>
            <p>
              Get downloadable PDF tickets immediately after booking.
            </p>
          </div>

          <div className="feature-card">
            <h3>📊 Booking History</h3>
            <p>
              Track all your past bookings and download tickets anytime.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <p>© 2025 Smart Flight Booking. All rights reserved.</p>
        <p>Built with React, Node.js, Express & Prisma</p>
      </footer>
    </>
  );
}
