import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/home.css";
import bgVideo from "../Assets/bg-video.mp4"; // ✅ REQUIRED

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      >
        <source src={bgVideo} type="video/mp4" />
      </video>

      <div className="home-overlay">
        <h1> Smart Flight Booking</h1>
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
  );
}
