import { Link } from "react-router-dom";
import ProfileDropdown from "./ProfileDropdown";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar-modern">
      <Link to="/search" className="navbar-logo">
        <h3>FlightBooker</h3>
      </Link>

      <ProfileDropdown />
      ) : (
      <div className="auth-buttons">
        <Link to="/login" className="nav-btn-login">Log In</Link>
        <Link to="/signup" className="nav-btn-signup">Sign Up</Link>
      </div>
        )}
    </div>
    </nav >
  );
};

export default Navbar;
