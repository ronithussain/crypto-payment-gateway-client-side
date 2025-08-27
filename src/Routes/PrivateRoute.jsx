import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/UseAuth";

const PrivateRoute = ({children}) => {
    const {user, loading} = useAuth();
    const location = useLocation();
    
    // ✅ loading থাকলেও spinner দেখাবো না, শুধু কিছুই render করবো না
    if(loading) {
        return null; 
    }

    if (!user) {
        return <Navigate to="/login" state={{ from: location}} replace />;
    }

    return children;
};

export default PrivateRoute;
