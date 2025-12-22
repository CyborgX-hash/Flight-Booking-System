import React from "react";
import FlightSearch from "./pages/FlightSearch";
import BookingHistory from "./pages/BookingHistory";

export default function App() {
  return (
    <>
      <header>✈️ Flight Booking System</header>
      <div className="container">
        <FlightSearch />
        <BookingHistory />
      </div>
    </>
  );
}
