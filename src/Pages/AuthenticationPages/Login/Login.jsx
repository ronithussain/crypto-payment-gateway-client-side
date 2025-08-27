import { useRef, useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import SocialLogin from "../../Shared/SocialLogin/SocialLogin";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/UseAuth";
import useAdmin from "../../../Hooks/useAdmin";

const Login = () => {
    const [showsPassword, setShowsPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const { handleLoginUser, resetPassword } = useAuth();

    const [isAdmin] = useAdmin();
    const navigate = useNavigate();
    // const location = useLocation();
    // forgotPassword
    const emailRef = useRef()

    // const from = location.state?.from?.pathname || '/dashboard/accountBalance';
    // console.log('in the location login page', location.state)

    // Validation function
    const validateForm = (email, password) => {
        const newErrors = {};

        // Email validation
        if (!email) {
            newErrors.email = "Email is required";
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
            newErrors.email = "Please enter a valid email address";
        }

        // Password validation
        if (!password) {
            newErrors.password = "Password is required";
        } else if (password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        return newErrors;
    };

    const handleLogin = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        // Validate form
        const formErrors = validateForm(email, password);
        setErrors(formErrors);

        if (Object.keys(formErrors).length > 0) {
            return;
        }

        handleLoginUser(email, password)
            .then(result => {
                const user = result.user;

                if (user) {
                    Swal.fire({
                        title: "User Login Successful",
                        icon: "success",
                    });

                    // redirect logic
                    // const from = location.state?.from?.pathname;
                    // navigate(
                    //     from && from !== '/login'
                    //         ? from
                    //         : '/dashboard/accountBalance',
                    //     { replace: true }
                    // );
                    // এটা ঠিক আছে - change করার দরকার নেই
                    { isAdmin ? navigate('/dashboard/adminProfile') : navigate('/dashboard/accountBalance') }
                } else {
                    Swal.fire({
                        icon: "warning",
                        title: "Email Not Verified",
                        text: "Please verify your email before logging in.",
                    });
                }
            })
            .catch(error => {
                Swal.fire({
                    icon: "error",
                    title: "Login Failed",
                    text: error.message,
                });
            });
    };


    // Forgot password function implement;
    const handleForgotPassword = () => {
        // console.log('get me email address', emailRef.current.value);

        const email = emailRef.current.value;
        if (!email) {
            Swal.fire({
                icon: "warning",
                title: "Missing Email",
                text: "Please enter your email before clicking 'Forgot your password?'",
            });
            return;
        }

        // Validate email format for forgot password
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
            Swal.fire({
                icon: "warning",
                title: "Invalid Email",
                text: "Please enter a valid email address",
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

    // Clear specific error when user starts typing
    const handleInputChange = (field) => {
        if (errors[field]) {
            setErrors(prev => ({
                ...prev,
                [field]: undefined
            }));
        }
    };

    return (
        <>
            <div className="flex justify-center items-center px-4 sm:px-0 min-h-full lg:min-h-screen">
                <div className="w-full max-w-lg bg-white dark:bg-gray-800 shadow-lg rounded-lg sm:p-6 p-4 border border-gray-200 dark:border-gray-700">
                    <div>
                        <Link to="/">
                            <span className="text-sm flex items-center gap-x-1 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100">
                                <BsArrowLeft /> Back To Home
                            </span>
                        </Link>
                        <div className="text-center mt-3 space-y-2">
                            <h2 className="text-2xl sm:text-4xl font-bold text-gray-900 dark:text-white">Welcome Back</h2>
                            <p className="text-gray-600 dark:text-gray-300">Sign in to your account</p>
                        </div>
                    </div>
                    {/* <SocialLogin></SocialLogin> */}
                    <SocialLogin></SocialLogin>
                    <div className="divider dark:after:bg-gray-600 dark:before:bg-gray-600 text-gray-500 dark:text-gray-400">or</div>

                    {/* Login Form */}
                    <form
                        onSubmit={handleLogin}
                        className="space-y-4">
                        {/* Email */}
                        <div>
                            <label className="block font-medium text-gray-700 dark:text-gray-200">Email</label>
                            <input
                                ref={emailRef}
                                type="email"
                                name='email'
                                className={`input w-full rounded transition border bg-white dark:bg-gray-700 dark:text-white hover:border-blue-500 dark:hover:border-blue-400 ${errors.email
                                        ? 'border-red-300 bg-red-50 dark:border-red-500 dark:bg-red-900/20'
                                        : 'border-gray-300 dark:border-gray-600'
                                    }`}
                                placeholder="Enter your email"
                                autoComplete="email"
                                onChange={() => handleInputChange('email')}
                            />
                            {errors.email && (
                                <span className='text-red-500 dark:text-red-400 text-xs'>{errors.email}</span>
                            )}
                        </div>

                        {/* Password */}
                        <div className="relative">
                            <label className="block font-medium text-gray-700 dark:text-gray-200">Password</label>
                            <input
                                type={showsPassword ? "text" : "password"}
                                name='password'
                                className={`input w-full rounded transition border bg-white dark:bg-gray-700 dark:text-white hover:border-blue-500 dark:hover:border-blue-400 ${errors.password
                                        ? 'border-red-300 bg-red-50 dark:border-red-500 dark:bg-red-900/20'
                                        : 'border-gray-300 dark:border-gray-600'
                                    }`}
                                placeholder="Enter your password"
                                autoComplete="current-password"
                                onChange={() => handleInputChange('password')}
                            />
                            <button
                                type="button"
                                onClick={() => setShowsPassword(!showsPassword)}
                                className="absolute top-10 right-4 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                            >
                                {showsPassword ? <FaEye /> : <FaEyeSlash />}
                            </button>
                            {errors.password && (
                                <span className='text-red-500 dark:text-red-400 text-xs'>{errors.password}</span>
                            )}
                        </div>

                        {/* Login Button */}
                        <input
                            disabled={false}
                            type="submit"
                            value='Login'
                            className='btn w-full mt-4 bg-[#4F46E5] hover:bg-[#4338CA] text-white rounded-md border-none cursor-pointer'
                        />

                        {/* Register Link */}
                        <div className="text-center text-sm">
                            <span className="text-gray-600 dark:text-gray-300">
                                Don't have an account?
                            </span>
                            <Link className="text-[#4F46E5] dark:text-[#6366F1] hover:underline" to="/register"> Sign up</Link>
                            <p
                                onClick={handleForgotPassword}
                                className="text-[#4F46E5] dark:text-[#6366F1] my-2 cursor-pointer hover:underline">
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