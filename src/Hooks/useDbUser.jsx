import { useQuery } from "@tanstack/react-query";
import useAuth from "./UseAuth";
import useAxiosSecure from "./useAxiosSecure";


const useDbUser = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    console.log('Current user:', user);

    const { data: dbUser = {}, isLoading: userLoading } = useQuery({
        queryKey: ["dbUser", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            console.log('Fetching user data for:', user.email);
            const res = await axiosSecure.get(`/users/email/${user.email}`);
            console.log('User data response:', res.data); // Debug log
            return res.data;
        },
    });

    return { dbUser, userLoading };
};

export default useDbUser;

