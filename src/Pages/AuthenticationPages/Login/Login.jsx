import { useRef, useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import SocialLogin from "../../Shared/SocialLogin/SocialLogin";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/UseAuth";




const Login = () => {
    const [showsPassword, setShowsPassword] = useState(false);
    const { handleLoginUser, resetPassword } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    // forgotPassword
    const emailRef = useRef()

    const from = location.state?.from?.pathname || '/';
    console.log('in the location login page', location.state)


    const handleLogin = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        handleLoginUser(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);

                // email verified
                if (user) {
                    Swal.fire({
                        title: "User Login Successful",
                        showclassName: {
                            popup: `
                        animate__animated
                        animate__fadeInUp
                        animate__faster
                      `
                        },
                        hideclassName: {
                            popup: `
                        animate__animated
                        animate__fadeOutDown
                        animate__faster
                      `
                        }
                    });
                    navigate(from, { replace: true });
                } else {
                    Swal.fire({
                        icon: "warning",
                        title: "Email Not Verified",
                        text: "Please verify your email before logging in.",
                    });
                }
            })
            .catch(error => {
                console.error("Login Error:", error.message);
                Swal.fire({
                    icon: 'error',
                    title: 'Login Failed',
                    text: error.message,
                });
            });
    }

    // Forgot password function implement;
    const handleForgotPassword = () => {
        console.log('get me email address', emailRef.current.value);

        const email = emailRef.current.value;
        if (!email) {
            Swal.fire({
                icon: "warning",
                title: "Missing Email",
                text: "Please enter your email before clicking 'Forgot your password?'",
            });
            return;
        }
        resetPassword(email)
            .then(() => {
                Swal.fire({
                    icon: "success",
                    title: "Reset Email Sent",
                    text: "Check your inbox for reset instructions.",
                });
            })
            .catch(error => {
                Swal.fire({
                    icon: "error",
                    title: "Reset Failed",
                    text: error.message,
                });
            });
    }

    return (
        <>
            <div data-aos="fade-left" className="flex justify-center items-center px-4 min-h-full lg:min-h-screen ">
                <div className=" w-full max-w-lg bg-white shadow-lg rounded-lg p-6">
                    <div>
                        <Link to="/">
                            <span className="text-sm flex items-center gap-x-1 text-gray-600">
                                <BsArrowLeft /> Back To Home
                            </span>
                        </Link>
                        <div className="text-center mt-3 space-y-2">
                            <h2 className="text-2xl  sm:text-4xl   font-bold ">Welcome Back</h2>
                            <p className="text-gray-600">Sign in to your account</p>
                        </div>
                    </div>
                    {/* <SocialLogin></SocialLogin> */}
                    <SocialLogin></SocialLogin>
                    <div className="divider">or</div>

                    {/* Login Form */}
                    <form
                        onSubmit={handleLogin}
                        className="space-y-4">
                        {/* Email */}
                        <div>
                            <label className="block font-medium text-gray-700">Email</label>
                            <input
                                ref={emailRef}
                                type="email"
                                name='email'
                                className="input w-full rounded transition border hover:border-blue-500"
                                placeholder="Enter your email"
                                autoComplete="email"
                            />
                        </div>

                        {/* Password */}
                        <div className="relative">
                            <label className="block font-medium text-gray-700">Password</label>
                            <input
                                type={showsPassword ? "text" : "password"}
                                name='password'
                                className="input w-full rounded transition border hover:border-blue-500"
                                placeholder="Enter your password"
                                autoComplete="current-password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowsPassword(!showsPassword)}
                                className="absolute top-10 right-4 text-gray-500"
                            >
                                {showsPassword ? <FaEye /> : <FaEyeSlash />}
                            </button>
                        </div>

                        {/* Login Button */}
                        <input
                            disabled={false}
                            type="submit" value='Login' className='btn w-full mt-4 bg-[#4F46E5] text-white/80 rounded-xl' />

                        {/* Register Link */}
                        <div className="text-center text-sm">
                            <span>
                                Don't have an account?
                            </span>
                            <Link className="text-[#4F46E5]" to="/register"> Sign up</Link>
                            <p
                                onClick={handleForgotPassword}
                                className="text-[#4F46E5] my-2 cursor-pointer">
                                Forgot your password?
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Login;
