import { useLocation, useNavigate } from "react-router-dom";
import "./FlightResults.css";
const FlightResults = () => {
    const { state } = useLocation()
    const navigate = useNavigate()
    const flights = state?.flights || []
    if (flights.length === 0) {
        return <p className="results-empty">No flights found</p>
    }
    const handleSelectFlight = (flight) => {
        navigate("/booking", { state: { flight } });
    };
    return (
        <div className="results-container">
            <h2>Available Flights</h2>
            {flights.map((flight, index) => {
                const itenerary = flight.itineraries[0]
                const segments = itenerary.segments
                return (
                    <div key={index} className="flight-card">
                        <div className="flight-header">
                            <div className="flight-route">
                                {segments[0].departure.iataCode}
                                <span className="flight-arrow">→</span>
                                {segments[segments.length - 1].arrival.iataCode}
                            </div>
                            <div className="flight-price">
                                ₹{flight.price.total} {flight.price.currency}
                            </div>
                        </div>
                        <div className="flight-details">
                            <div className="flight-detail-item">
                                <span className="flight-detail-label">Stops</span>
                                <span className="flight-detail-value">{segments.length - 1}</span>
                            </div>
                            <div className="flight-detail-item">
                                <span className="flight-detail-label">Duration</span>
                                <span className="flight-detail-value">{itenerary.duration}</span>
                            </div>
                        </div>
                        <button onClick={() => handleSelectFlight(flight)}>Select Flight</button>
                    </div>
                )
            })}
        </div>
    )
}

export default FlightResults;