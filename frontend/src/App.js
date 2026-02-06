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
import PublicLayout from "./components/PublicLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Public Routes with Navbar */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<SearchFlights />} />
          <Route path="/results" element={<FlightResults />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/offers" element={<Offers />} />
        </Route>

        {/* Protected Routes (Require Login) */}
        <Route element={<ProtectedLayout />}>
          <Route path="/bookings" element={<MyBookings />} />
          <Route path="/checkout-success" element={<CheckoutSuccess />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
