import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import SearchFlights from "./pages/SearchFlights";
import FlightResults from "./pages/FlightResults";
import Booking from "./pages/Booking";
import MyBookings from "./pages/MyBookings";
import CheckoutSuccess from "./pages/CheckoutSuccess";
import Profile from "./pages/Profile";
import Offers from "./pages/Offers";


import ProtectedLayout from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected routes (with Navbar) */}
        <Route element={<ProtectedLayout />}>
          <Route path="/" element={<SearchFlights />} />
          <Route path="/results" element={<FlightResults />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/bookings" element={<MyBookings />} />
          <Route path="/checkout-success" element={<CheckoutSuccess />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/offers" element={<Offers />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
