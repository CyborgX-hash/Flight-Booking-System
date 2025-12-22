import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { WalletContext } from "./WalletContext";
import "../styles/navbar.css";

export default function Navbar() {
  const { balance } = useContext(WalletContext);

  return (
    <nav className="navbar">
      {/* LEFT */}
      <div className="nav-left">
        <h2>Flight Booking</h2>
      </div>

      {/* CENTER */}
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/search">Search</Link>
        <Link to="/history">History</Link>
      </div>

      {/* RIGHT */}
      <div className="nav-right">
        <div className="wallet">
          💰 Wallet: ₹{balance}
        </div>
      </div>
    </nav>
  );
}
