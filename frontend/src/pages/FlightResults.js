import {useLocation,useNavigate} from "react-router-dom"
const FlightResults=()=>{
    const {state} = useLocation()
    const navigate = useNavigate() 
    const flights = state?.flights || []
    if(flights.length === 0){
        return <p style={{padding:"40px"}}>No flights found</p>
    }
    const handleSelectFlight = (flight) => {
        navigate("/booking", { state: { flight } });
    };
    return(
        <div style={StyleSheet.container}>
            <h2>Available Flights</h2>
            {flights.map((flight,index)=>{
                const itenerary = flight.itineraries[0]
                const segments = itenerary.segments
                return(
                    <div key={index} style={StyleSheet.card}>
                        <p>
                            <strong>
                                {segments[0].departure.iataCode} {" "}
                                {segments[segments.length-1].arrival.iataCode}
                            </strong>
                        </p>
                        <p>Stops: {segments.length -1}</p>
                        <p>Duration: {itenerary.duration}</p>
                        <p>
                            Price : ₹{flight.price.total} {flight.price.currency}
                        </p>
                        <button style={styles.button} onClick={()=> handleSelectFlight(flight)}>Select Flight</button>
                    </div>
                )
            })}
        </div>
    )
}
const styles = {
    container: {
      maxWidth: "800px",
      margin: "40px auto",
      padding: "20px",
    },
    card: {
      border: "1px solid #ddd",
      borderRadius: "8px",
      padding: "15px",
      marginBottom: "15px",
    },
  };
  
  export default FlightResults;