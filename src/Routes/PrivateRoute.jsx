import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/UseAuth";

// import LoadingSpinner from "../shared/LoadingSpinner";




const PrivateRoute = ({children}) => {
    const {user, loading} = useAuth();
    const location = useLocation();
    // console.log(location)
    
    if(loading){
        return <p>Loading......</p>
    }
    if (!user) {
        return <Navigate to="/login" state={{ from: location}} replace />;
    }
    return children;
};

export default PrivateRoute;