import { useLocation, useNavigate } from "react-router-dom";
import "./FlightResults.css";

const FlightResults = () => {
    const { state } = useLocation()
    const navigate = useNavigate()
    const flights = state?.flights || []

    // Helper to get route info for the header
    const getRouteInfo = () => {
        if (flights.length > 0) {
            const firstSegment = flights[0].itineraries[0].segments[0];
            const lastSegment = flights[0].itineraries[0].segments[flights[0].itineraries[0].segments.length - 1];
            return {
                origin: firstSegment.departure.iataCode,
                destination: lastSegment.arrival.iataCode
            };
        }
        return { origin: "—", destination: "—" };
    };

    const { origin, destination } = getRouteInfo();

    if (flights.length === 0) {
        return (
            <div className="empty-results-container">
                <div className="empty-content">
                    <h2>No Flights Found</h2>
                    <p>We couldn't find any flights matching your search.</p>
                    <button onClick={() => navigate("/")}>Modify Search</button>
                </div>
            </div>
        )
    }

    const handleSelectFlight = (flight) => {
        navigate("/booking", { state: { flight } });
    };

    return (
        <div className="results-modern-page">
            <div className="results-header">
                <div className="route-badge">Return Trip</div>
                <h1 className="route-title">
                    {origin} <span className="route-divider">—</span> {destination}
                </h1>
                <p className="results-count">{flights.length} flights found · Economy Class</p>
            </div>

            <div className="tickets-list">
                {flights.map((flight, index) => {
                    const itenerary = flight.itineraries[0]
                    const segments = itenerary.segments
                    const startTime = new Date(segments[0].departure.at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                    const endTime = new Date(segments[segments.length - 1].arrival.at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                    return (
                        <div key={index} className="ticket-card">
                            {/* Left Side: Flight Info */}
                            <div className="ticket-main">
                                <div className="airline-info">
                                    <span className="airline-code">{flight.validatingAirlineCodes[0]}</span>
                                    <span className="flight-number">Flight {segments[0].number}</span>
                                </div>

                                <div className="flight-path-display">
                                    <div className="time-group">
                                        <span className="time-large">{startTime}</span>
                                        <span className="city-code">{segments[0].departure.iataCode}</span>
                                    </div>

                                    <div className="duration-visual">
                                        <div className="duration-line"></div>
                                        <span className="duration-text">{itenerary.duration.replace('PT', '').toLowerCase()}</span>
                                    </div>

                                    <div className="time-group text-right">
                                        <span className="time-large">{endTime}</span>
                                        <span className="city-code">{segments[segments.length - 1].arrival.iataCode}</span>
                                    </div>
                                </div>

                                <div className="ticket-perks">
                                    <span>{segments.length - 1 === 0 ? "Direct" : `${segments.length - 1} Stop`}</span>
                                    <span>•</span>
                                    <span>Meal Included</span>
                                    <span>•</span>
                                    <span>USB Power</span>
                                </div>
                            </div>

                            {/* Perforation Line */}
                            <div className="ticket-rip">
                                <div className="circle-top"></div>
                                <div className="dashed-line"></div>
                                <div className="circle-bottom"></div>
                            </div>

                            {/* Right Side: Price & Action */}
                            <div className="ticket-action">
                                <div className="price-group">
                                    <span className="currency">{flight.price.currency}</span>
                                    <span className="amount">{flight.price.total}</span>
                                </div>
                                <button className="select-btn" onClick={() => handleSelectFlight(flight)}>
                                    Select
                                </button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default FlightResults;