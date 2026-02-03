import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="navbar">
      <h3>FlightBooker</h3>

      <div>
        <Link to="/">Search Flights</Link>
        <Link to="/bookings">My Bookings</Link>
        <button onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
