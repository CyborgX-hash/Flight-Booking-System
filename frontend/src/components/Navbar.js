import { Link } from "react-router-dom";
import ProfileDropdown from "./ProfileDropdown";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar-modern">
      <Link to="/" className="navbar-logo">
        <h3>FlightBooker</h3>
      </Link>

      <div className="navbar-links">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/bookings" className="nav-link">My Bookings</Link>
        <Link to="/offers" className="nav-link">Offers</Link>
      </div>

      <div className="navbar-actions">
        <ProfileDropdown />
      </div>
    </nav>
  );
};

export default Navbar;
