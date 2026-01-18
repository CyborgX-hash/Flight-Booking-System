import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import AirportInput from "../components/AirportInput";

const SearchFlights=()=>{
    const [form,setform] = useState({
        origin:"",
        destination:"",
        date:"",
        adults:1,
    })
    const [loading,setloading] = useState(false)
    const[error,seterror] = useState("")
    const navigate = useNavigate()
    const hangleChanges = (e)=>{
        setform({...form,[e.target.name]:e.target.value})
    }
    const handleSearch= async (e)=>{
        e.preventDefault()
        setloading(true)
        seterror("")
        try{
            const res = await api.get("/flights/search",{
                params:form
            })
            navigate("/results",{state:{flights:res.data}})
        }
        catch(err){
            seterror("Failed to fetch flights.")
        }
        finally{
            setloading(false)
        }
    }
    return(
        <div style={styles.container}>
            <h2>Search Flights</h2>
            <form onSubmit={handleSearch} style={styles.form}>
                <AirportInput placeholder="From (City or Code)" onSelect={(code) => setform({ ...form, origin: code })}/>                
                <AirportInput placeholder="To (City or Code)" onSelect={(code) => setform({ ...form, destination: code })}/>                <input type="date" name="date" onChange={hangleChanges} required/>
                <input type="number" name="adults" min="1" placeholder="Adults" value={form.adults} onChange={hangleChanges} required/>
                <button type="submit">{loading ? "Searching..." : "Search Flights"}</button>
            </form>
            {error && <p style={styles.error}>{error}</p>}

        </div>
    )
    

}
const styles = {
    container: {
      maxWidth: "600px",
      margin: "60px auto",
      padding: "20px",
    },
    form: {
      display: "grid",
      gap: "12px",
    },
    error: {
      color: "red",
      marginTop: "10px",
    },
  };
export default SearchFlights;

