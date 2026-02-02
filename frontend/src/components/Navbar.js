import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div style={styles.nav}>
      <h3 style={styles.logo}>✈️ FlightBooker</h3>

      <div style={styles.links}>
        <Link to="/" style={styles.link}>Search Flights</Link>
        <Link to="/bookings" style={styles.link}>My Bookings</Link>
        <button onClick={logout} style={styles.logout}>
          Logout
        </button>
      </div>
    </div>
  );
};

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: "12px 20px",
    borderBottom: "1px solid #ddd",
    alignItems: "center",
  },
  logo: {
    margin: 0,
  },
  links: {
    display: "flex",
    gap: "12px",
    alignItems: "center",
  },
  link: {
    textDecoration: "none",
    color: "#333",
  },
  logout: {
    padding: "6px 12px",
    cursor: "pointer",
  },
};

export default Navbar;
