import { useQuery } from "@tanstack/react-query";
import useAuth from "./UseAuth";
import useAxiosSecure from "./useAxiosSecure";


const useDbUser = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: dbUser = {}, isLoading: userLoading } = useQuery({
        queryKey: ["dbUser", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/email/${user.email}`);
            return res.data;
        },
    });

    return { dbUser, userLoading };
};

export default useDbUser;

