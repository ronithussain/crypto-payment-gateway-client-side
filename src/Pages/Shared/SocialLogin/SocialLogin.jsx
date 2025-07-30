import { FcGoogle } from "react-icons/fc";
import useAuth from "../../../Hooks/UseAuth";
import { useNavigate } from "react-router-dom";


const SocialLogin = () => {
    const { signInWithGoogle } = useAuth();
    const navigate = useNavigate();
    // const axiosPublic = useAxiosPublic();


    const handleGoogleLogin = () => {
        signInWithGoogle()
            .then(result => {
                console.log(result.user)
                navigate('/');
                // // //------------------------------------
                // const userInfo = {
                //     email: result.user?.email,
                //     name: result.user?.displayName,
                //     image:result.user?.photoURL,
                // }
                // axiosPublic.post('/users', userInfo)
                // .then(res => {
                //     console.log(res.data);
                //     navigate('/');
                // })
                // // //------------------------------------
            })
            .catch(error => {
                console.log(error.message)
            })
    }
    return (
        <>
            <div className="flex justify-center items-center my-6 ">

                <button
                    onClick={handleGoogleLogin}
                    className="btn w-full flex items-center justify-center bg-white gap-2 px-4 py-2 rounded transition "
                >
                    <FcGoogle className="text-xl" />
                    Continue with Google
                </button>
            </div>
        </>
    );
};

export default SocialLogin;