// import { FcGoogle } from "react-icons/fc";
// import useAuth from "../../../Hooks/UseAuth";
// import { useNavigate } from "react-router-dom";
// import useAxiosPublic from "../../../Hooks/useAxiosPublic";


// const SocialLogin = () => {
//     const { signInWithGoogle } = useAuth();
//     const navigate = useNavigate();
//     const axiosPublic = useAxiosPublic();



//     const handleGoogleLogin = () => {
//         signInWithGoogle()


//             .then(result => {
//                 console.log(result.user)
//                 //------------------------------------
//                 const userInfo = {
//                     email: result.user?.email,
//                     name: result.user?.displayName,
//                     image: result.user?.photoURL,
//                 }
//                 axiosPublic.post('/users', userInfo)
//                     .then(res => {
//                         console.log(res.data);
//                         navigate('/');
//                     })
//                 //------------------------------------
//             })
//             .catch(error => {
//                 console.log(error.message)
//             })


//     }
//     return (
//         <>
//             <div className="flex justify-center items-center my-6 ">

//                 <button
//                     onClick={handleGoogleLogin}
//                     className="btn w-full flex items-center justify-center bg-white gap-2 px-4 py-2 rounded transition "
//                 >
//                     <FcGoogle className="text-xl" />
//                     Continue with Google
//                 </button>
//             </div>
//         </>
//     );
// };

// export default SocialLogin;


import { FcGoogle } from "react-icons/fc";
import useAuth from "../../../Hooks/UseAuth";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const SocialLogin = () => {
    const { signInWithGoogle } = useAuth();
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();

    const handleGoogleLogin = async () => {
        try {
            // Loading state যোগ করুন
            const result = await signInWithGoogle();
            console.log('Google login successful:', result.user);

            // User info prepare করুন
            const userInfo = {
                email: result.user?.email,
                name: result.user?.displayName,
                image: result.user?.photoURL,
            };

            // Backend এ user save করুন
            const response = await axiosPublic.post('/users', userInfo);
            console.log('User saved to backend:', response.data);

            // Success message
            console.log('Login completed successfully');
            navigate('/');

        } catch (error) {
            console.error('Google login error:', error);

            // Specific error handling
            if (error.code === 'auth/popup-blocked') {
                alert('Pop-up blocked! Please allow pop-ups and try again.');
            } else if (error.code === 'auth/popup-closed-by-user') {
                console.log('User closed the popup');
            } else if (error.code === 'auth/network-request-failed') {
                alert('Network error! Please check your internet connection.');
            } else {
                alert('Login failed! Please try again.');
            }
        }
    };

    return (
        <>
            <div className="flex justify-center items-center my-6">
                <button
                    onClick={handleGoogleLogin}
                    className="btn w-full flex items-center justify-center dark:bg-gray-800 bg-white hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-300 gap-2 px-4 py-2 rounded transition-all duration-200 shadow-sm hover:shadow-md"
                >
                    <FcGoogle className="text-xl" />
                    Continue with Google
                </button>
            </div>
        </>
    );
};

export default SocialLogin;