import {BrowserRouter,Routes,Route} from "react-router-dom"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import SearchFlights from "./pages/SearchFlights"
import FlightResults from "./pages/FlightResults"
import MyBookings from "./pages/MyBookings"
import ProtectedRoute from "./components/ProtectedRoute"
function App(){
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/" element = {<ProtectedRoute><SearchFlights/></ProtectedRoute>}/>
      <Route path="/results" element = {<ProtectedRoute><FlightResults/></ProtectedRoute>}/>
      <Route path="/bookings" element = {<ProtectedRoute><MyBookings/></ProtectedRoute>}/>

    </Routes>
    </BrowserRouter>
  )
}
export default App