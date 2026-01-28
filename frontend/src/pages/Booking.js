import { useLocation,useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../api/axios";
const Booking =()=>{
    const {state} = useLocation()
    const navigate = useNavigate()
    const flight = state?.flight
    const [passangers , setpassangers] = useState([
        {name: "" , age: ""},
    ])
    const priceper = Number(flight.price.total)
    const totalprice = passangers.length * priceper;
    const addpassanger =()=>{
        setpassangers([...passangers,{name:"",age:""}])
    }
    const handleChanges = (index,field,value)=>{
        const updated = [...passangers]
        updated[index][field] = value
        setpassangers(updated)
    }
    const handleCheckout = async ()=>{
        const pay ={
            flight:{},
            passangers,
            price:{
                total:totalprice,
                currency:flight.price.currency
            },
        }
        await api.post("/bookings",pay);
        navigate("/bookings")
    }
    return(
        <div>
      <h2>Passenger Details</h2>

      {passengers.map((p, i) => (
        <div key={i}>
          <input
            placeholder="Passenger Name"
            onChange={(e) =>
              handleChanges(i, "name", e.target.value)
            }
          />
          <input
            placeholder="Age"
            type="number"
            onChange={(e) =>
              handleChanges(i, "age", e.target.value)
            }
          />
        </div>
      ))}

      <button onClick={addPassenger}>Add Passenger</button>

      <h3>Total: ₹{totalprice}</h3>

      <button onClick={handleCheckout}>Checkout</button>
    </div>
    )
}
export default Booking;

