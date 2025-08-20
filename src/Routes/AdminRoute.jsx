import { Navigate} from "react-router-dom";
import useAdmin from "../Hooks/useAdmin";
import useAuth from "../Hooks/UseAuth";
import LoadingSpinner from "../Context/LoadingSpinner";


import { useMemo } from 'react';

const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const [isAdmin, isAdminLoading] = useAdmin();
    
    // Memoize করে রাখুন - user change না হলে re-calculate হবে না
    const shouldShowChildren = useMemo(() => {
        return user && isAdmin;
    }, [user, isAdmin]);
    
    if (loading || isAdminLoading) {
        return <LoadingSpinner />
    }
    if (shouldShowChildren) {
        return children;
    }
    return <Navigate to="/login" replace />;
};

export default AdminRoute;