import {useEffect , useState} from 'react';
import {useLocation} from 'react-router-dom';
import api from '../api/axios';
const MyBookings =()=>{
    const location = useLocation()
    const [bookings,setbookings] = useState([]);
    const [message,setmessage]= useState("");
    useEffect(()=>{
        const createBooking = async()=>{
            if(location.state?.bookingPayload){
                try{
                    const res = await api.post("/bookings",location.state.bookingPayload)
                    setmessage(`Booking Confirmed! Ref: ${res.data.booking.bookingReference}`)

                }
                catch{
                    setmessage("Booking Failed. Please try again.")
                }
            }
        }
        createBooking();
    },[location.state])
    useEffect(()=>{
        const fetchBookings = async ()=>{
            const res = await api.get("/bookings/my")
            setbookings(res.data)

        }
        fetchBookings();
    },[])
    return(
        <div style={StyleSheet.container}>
            <h2>My Bookings</h2>
            {message && <p style ={StyleSheet.success}>{message}</p>}
            {bookings.map((b) => (
                <div key={b._id} style={styles.card}>
                <p>
                <strong>{b.flight.origin} → {b.flight.destination}</strong>
                </p>
                <p>Flight: {b.flight.flightNumbers.join(", ")}</p>
                <p>Duration: {b.flight.duration}</p>
                <p>Price: ₹{b.price.total} {b.price.currency}</p>
                <p>Status: {b.status}</p>
                <p>Ref: {b.bookingReference}</p>
                </div>
            ))}
        </div>
    )
}
const styles = {
    container: { maxWidth: "800px", margin: "40px auto", padding: "20px" },
    card: {
      border: "1px solid #ddd",
      borderRadius: "8px",
      padding: "12px",
      marginBottom: "12px",
    },
    success: {
      color: "green",
      marginBottom: "15px",
    },
  };
  
  export default MyBookings;