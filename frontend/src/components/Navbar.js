import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { WalletContext } from "./WalletContext";

export default function Navbar() {
  const { balance } = useContext(WalletContext);

  return (
    <nav className="navbar">
      <h2>Flight Booking</h2>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/search">Search</Link>
        <Link to="/history">History</Link>
      </div>

      <div className="wallet">
        💰 Wallet: ₹{balance}
      </div>
    </nav>
  );
}
