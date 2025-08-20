import { useQuery } from "@tanstack/react-query";
import useAuth from "./UseAuth";
import useAxiosSecure from "./useAxiosSecure";


const useAdmin = () => {
    const {user, loading} = useAuth();
    const axiosSecure = useAxiosSecure();
     
    const {data: isAdmin, isPending: isAdminLoading} = useQuery({
        queryKey: ['isAdmin', user?.email], // key order change করুন
        enabled: !!user?.email && !loading, // ✅ user email আছে কিনা check করুন
        queryFn: async() => {
            const res = await axiosSecure.get(`/users/admin/${user.email}`);
            return res.data?.admin;
        },
        staleTime: 5 * 60 * 1000, // ✅ 5 minutes cache রাখুন
        refetchOnWindowFocus: false, // ✅ window focus এ refetch বন্ধ
    });
    
    return [isAdmin ?? false, isAdminLoading];
};

export default useAdmin;