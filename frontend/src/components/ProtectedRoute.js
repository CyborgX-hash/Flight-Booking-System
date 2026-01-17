import {Navigate} from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';
import { Children } from 'react';
const ProtectedRoute = ({children})=>{
    return isAuthenticated()? children : <Navigate to="/login"/>
}
export default ProtectedRoute;