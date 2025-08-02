import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../Hooks/useAdmin";
import useAuth from "../Hooks/UseAuth";
import LoadingSpinner from "../Context/LoadingSpinner";


const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const [isAdmin, isAdminLoading] = useAdmin();

    const location = useLocation();
    // console.log(location)
    if (loading || isAdminLoading) {
        return <LoadingSpinner />
    }
    if (!user && isAdmin) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    return children;

};

export default AdminRoute;