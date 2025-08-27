import { Navigate } from "react-router-dom";
import useAdmin from "../Hooks/useAdmin";
import useAuth from "../Hooks/UseAuth";
// import { useMemo } from "react";

// const AdminRoute = ({ children }) => {
//     const { user, loading } = useAuth();
//     const [isAdmin, isAdminLoading] = useAdmin();

//     const shouldShowChildren = useMemo(() => {
//         return user && isAdmin;
//     }, [user, isAdmin]);

//     // ✅ spinner বাদ, শুধু কিছুই দেখাবো না
//     if (loading || isAdminLoading) {
//         return null;
//     }

//     if (shouldShowChildren) {
//         return children;
//     }

//     return <Navigate to="/login" replace />;
// };

// AdminRoute component এ শুধু এই একটা line change করুন:

const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const [isAdmin, isAdminLoading] = useAdmin();

    if (loading || isAdminLoading) {
        return null;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // ❌ Before (যেটা problem করছিল):
    // if (user && !isAdmin) {
    //     return <Navigate to="/login" replace />;
    // }

    // ✅ After (শুধু এটা change করুন):
    if (user && !isAdmin) {
        return <Navigate to="/dashboard/accountBalance" replace />;
    }

    return children;
};

export default AdminRoute;
