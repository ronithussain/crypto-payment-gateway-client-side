import React, { createContext } from 'react';
import useDbUser from '../Hooks/useDbUser';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

export const BalanceContext = createContext();

const BalanceProvider = ({ children }) => {
    const { dbUser } = useDbUser();
    const axiosSecure = useAxiosSecure();


    const { data: userData = {}, isLoading, error } = useQuery({
        queryKey: ['userBalance', dbUser?._id],
        enabled: !!dbUser?._id,
        queryFn: async () => {
            const res = await axiosSecure.get(`/usersBalance/${dbUser._id}`);
            return res.data;
        }
    });

    console.log(userData);

    const balanceInfo = {
        userData,
        isLoading, error
    }


    return (
        <BalanceContext.Provider value={balanceInfo}>
            {children}
        </BalanceContext.Provider>
    )
};

export default BalanceProvider;