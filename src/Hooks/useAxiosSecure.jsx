import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./UseAuth";


export const axiosSecure = axios.create({
    baseURL: 'https://crypto-payment-gateway-server-side.vercel.app'
    // baseURL: 'http://localhost:5000',
})

const useAxiosSecure = () => {

    const navigate = useNavigate();
    const { handleLogout, } = useAuth();
    
    // request interceptor to add authorization header for every secure call to api 
    axiosSecure.interceptors.request.use(function (config) {
        // start jwt
        const token = localStorage.getItem('access-token')
        // console.log('request stopped by interceptors', token);
        config.headers.authorization = `Bearer ${token}`;
        return config;
    }, function (error) {
        return Promise.reject(error);
    })
    // end jwt


    // start intercepts 401 and 403 status
    axiosSecure.interceptors.response.use(function (response) {
        return response;
    }, async (error) => {
        const status = error.response.status;
        // console.log('status error in the interceptor', status);
        // for 401 or 403 logout the user and move the user to the login
        if (status === 401 || status === 403) {
            await handleLogout();
            navigate('/login')
        }
        return Promise.reject(error);
    })
    // end interceptor


    return axiosSecure;
};

export default useAxiosSecure;