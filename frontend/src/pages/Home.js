import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">
      <h1>✈️ Book Flights Easily</h1>
      <p>Fast • Secure • Smart Pricing</p>

      <button className="primary-btn" onClick={() => navigate("/search")}>
        Search Flights
      </button>

      <button className="secondary-btn" onClick={() => navigate("/history")}>
        View Booking History
      </button>
    </div>
  );
}
