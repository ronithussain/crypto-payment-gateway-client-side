import { useEffect, useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { FaEye, FaEyeSlash, FaCheck, FaTimes } from "react-icons/fa";
import { Link, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/UseAuth";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { TbFidgetSpinner } from "react-icons/tb";

const Register = () => {
    const { loading, handleRegister, handleUpdateProfile, sendVerificationEmail } = useAuth();
    const axiosPublic = useAxiosPublic();
    const [showsPassword, setShowsPassword] = useState(false);
    const [showsConfirmPassword, setShowsConfirmPassword] = useState(false);
    const [searchParams] = useSearchParams();
    const [referralCode, setReferralCode] = useState('');
    const [referralValidation, setReferralValidation] = useState({
        isValidating: false,
        isValid: null,
        message: '',
        referrerName: ''
    });

    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
    const password = watch("password");
    const navigate = useNavigate();
    // const location = useLocation();
    // Dashboard redirect instead of previous location
    const from = '/dashboard/accountBalance';

    // Password validation helper function
    const getPasswordErrors = (password) => {
        const errors = [];
        if (!password) return errors;
        
        if (password.length < 6) errors.push("At least 6 characters");
        if (password.length > 20) errors.push("Maximum 20 characters");
        if (!/(?=.*[a-z])/.test(password)) errors.push("One lowercase letter");
        if (!/(?=.*[A-Z])/.test(password)) errors.push("One uppercase letter");
        if (!/(?=.*[0-9])/.test(password)) errors.push("One number");
        if (!/(?=.*[!@#$&*])/.test(password)) errors.push("One special character (!@#$&*)");
        
        return errors;
    };

    const passwordErrors = getPasswordErrors(password);
    const isPasswordValid = password && passwordErrors.length === 0;

    // URL থেকে রেফারেল কোড নেওয়া
    useEffect(() => {
        const ref = searchParams.get('ref');
        if (ref) {
            const upperRef = ref.toUpperCase();
            setReferralCode(upperRef);
            validateReferralCode(upperRef);
        }
    }, [searchParams]);

    // রেফারেল কোড validation function
    const validateReferralCode = async (code) => {
        if (!code || code.length < 3) {
            setReferralValidation({
                isValidating: false,
                isValid: null,
                message: '',
                referrerName: ''
            });
            return;
        }
        setReferralValidation(prev => ({ ...prev, isValidating: true }));
        try {
            const response = await axiosPublic.post('/validate-referral', {
                referralCode: code.trim().toUpperCase()
            });
            setReferralValidation({
                isValidating: false,
                isValid: response.data.valid,
                message: response.data.message,
                referrerName: response.data.referrerName || ''
            });
        } catch (error) {
            setReferralValidation({
                isValidating: false,
                isValid: false,
                message: 'Error validating referral code',
                referrerName: ''
            });
            console.log(error);
        }
    };

    // রেফারেল কোড change handler
    const handleReferralCodeChange = (e) => {
        const value = e.target.value.toUpperCase();
        setReferralCode(value);
        if (window.referralTimeout) clearTimeout(window.referralTimeout);
        window.referralTimeout = setTimeout(() => {
            validateReferralCode(value);
        }, 500);
    };

    // Form submission
    const onSubmit = data => {
        if (referralCode && referralValidation.isValid === false) {
            Swal.fire({
                title: 'Invalid Referral Code',
                text: 'The referral code you entered is invalid. Do you want to continue without it?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Continue',
                cancelButtonText: 'Check Code'
            }).then((result) => {
                if (result.isConfirmed) {
                    proceedWithRegistration({ ...data, referralCodeFromFrontend: null });
                }
            });
            return;
        }
        proceedWithRegistration(data);
    };

    // Registration process (Password NOT sent to backend)
    const proceedWithRegistration = (data) => {
        handleRegister(data.email, data.password)
            .then(result => {
                console.log(result);
                return handleUpdateProfile(data.name);
            })
            .then(() => {
                sendVerificationEmail();
                const userInfo = {
                    name: data.name,
                    email: data.email,
                    referralCodeFromFrontend: referralCode && referralValidation.isValid ? referralCode.trim() : null
                };
                return axiosPublic.post('/users', userInfo);
            })
            .then(res => {
                if (res.data.insertedId) {
                    reset();
                    let successMessage = 'Account created successfully!';
                    if (res.data.referralApplied) {
                        successMessage += ` Referral bonus applied! ${referralValidation.referrerName} will receive $10.`;
                    }
                    Swal.fire({
                        title: "Registration Successful!",
                        text: successMessage,
                        icon: "success"
                    }).then(() => {
                        // Navigate to dashboard after success message
                        navigate(from, { replace: true });
                    });
                } else {
                    Swal.fire({
                        title: "Info",
                        text: res.data.message || "Account processed",
                        icon: "info"
                    }).then(() => {
                        // Navigate to dashboard even if account already exists
                        navigate(from, { replace: true });
                    });
                }
            })
            .catch(error => {
                Swal.fire({
                    title: "Error!",
                    text: error.response?.data?.message || error.message || "Registration failed",
                    icon: "error"
                });
            });
    };

    return (
        <div className="hero-content w-full mx-auto min-h-full lg:min-h-screen">
            <div className="relative sm:p-6 p-4 w-full max-w-lg mx-auto shadow-2xl rounded-lg overflow-hidden bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                {/* Back to Home Link */}
                <Link to="/" className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 transition-colors mb-6">
                    <BsArrowLeft className="w-4 h-4" />
                    Back To Home
                </Link>

                {/* Header */}
                <div className="text-center mt-3 space-y-2">
                    <h2 className="text-2xl sm:text-4xl font-bold text-gray-900 dark:text-white">Create Account</h2>
                    <p className="text-gray-700 dark:text-gray-300">Join Us Today</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="fieldset space-y-2">
                    {/* Name Field */}
                    <div>
                        <label className="font-medium text-gray-700 dark:text-gray-200">
                            Username
                        </label>
                        <input
                            type="text"
                            {...register("name", { 
                                required: "Username is required",
                                minLength: {
                                    value: 2,
                                    message: "Username must be at least 2 characters"
                                },
                                pattern: {
                                    value: /^[a-z0-9_]+$/,
                                    message: "Username can only contain lowercase letters, numbers, and underscores"
                                },
                                validate: {
                                    noSpaces: value => !/\s/.test(value) || "Username cannot contain spaces",
                                    noUppercase: value => value === value.toLowerCase() || "Username must be lowercase only"
                                }
                            })}
                            className={`input w-full border bg-white dark:bg-gray-700 dark:text-white hover:border-blue-500 dark:hover:border-blue-400 ${
                                errors.name 
                                    ? 'border-red-300 bg-red-50 dark:border-red-500 dark:bg-red-900/20' 
                                    : 'border-gray-300 dark:border-gray-600'
                            }`}
                            placeholder="Enter your username (lowercase only)"
                            autoComplete="username" 
                            onChange={(e) => {
                                e.target.value = e.target.value.toLowerCase().replace(/\s/g, '');
                            }}
                        />
                        {errors.name && (
                            <span className='text-red-500 dark:text-red-400 text-xs'>{errors.name.message}</span>
                        )}
                    </div>

                    {/* Email Field */}
                    <div>
                        <label className="font-medium text-gray-700 dark:text-gray-200">
                            Email Address
                        </label>
                        <input
                            type="email"
                            {...register("email", { 
                                required: "Email is required",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Please enter a valid email address"
                                }
                            })}
                            className={`input w-full border bg-white dark:bg-gray-700 dark:text-white hover:border-blue-500 dark:hover:border-blue-400 ${
                                errors.email 
                                    ? 'border-red-300 bg-red-50 dark:border-red-500 dark:bg-red-900/20' 
                                    : 'border-gray-300 dark:border-gray-600'
                            }`}
                            placeholder="Enter your email"
                            autoComplete="email" 
                        />
                        {errors.email && (
                            <span className='text-red-500 dark:text-red-400 text-xs'>{errors.email.message}</span>
                        )}
                    </div>

                    {/* Password Field */}
                    <div className="relative">
                        <label className="font-medium text-gray-700 dark:text-gray-200">
                            Password
                        </label>
                        <input
                            type={showsPassword ? "text" : "password"}
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message: "Password must be at least 6 characters"
                                },
                                maxLength: {
                                    value: 20,
                                    message: "Password must not exceed 20 characters"
                                },
                                pattern: {
                                    value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                                    message: "Password must contain uppercase, lowercase, number and special character"
                                }
                            })}
                            className={`input w-full border bg-white dark:bg-gray-700 dark:text-white hover:border-blue-500 dark:hover:border-blue-400 ${
                                errors.password 
                                    ? 'border-red-300 bg-red-50 dark:border-red-500 dark:bg-red-900/20' 
                                    : isPasswordValid 
                                        ? 'border-green-300 bg-green-50 dark:border-green-500 dark:bg-green-900/20' 
                                        : 'border-gray-300 dark:border-gray-600'
                            }`}
                            placeholder="Enter your password"
                            autoComplete="password" 
                        />
                        <button
                            type="button"
                            onClick={() => setShowsPassword(!showsPassword)}
                            className='btn-sm absolute top-8 right-4 text-base text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                        >
                            {showsPassword ? <FaEye /> : <FaEyeSlash />}
                        </button>
                        
                        {/* Password Requirements */}
                        {password && (
                            <div className="mt-2 space-y-1">
                                {passwordErrors.map((error, index) => (
                                    <div key={index} className="flex items-center gap-2 text-sm text-red-600 dark:text-red-400">
                                        <FaTimes className="w-3 h-3" />
                                        <span>{error}</span>
                                    </div>
                                ))}
                                {isPasswordValid && (
                                    <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                                        <FaCheck className="w-3 h-3" />
                                        <span>Password meets all requirements</span>
                                    </div>
                                )}
                            </div>
                        )}
                        
                        {errors.password && (
                            <span className='text-red-500 dark:text-red-400 text-xs'>{errors.password.message}</span>
                        )}
                    </div>

                    {/* Confirm Password Field */}
                    <div className='relative'>
                        <label className="font-medium text-gray-700 dark:text-gray-200">
                            Confirm Password
                        </label>
                        <input
                            type={showsConfirmPassword ? "text" : "password"}
                            {...register("confirmPassword", {
                                required: "Please confirm your password",
                                validate: value => value === password || "Passwords do not match"
                            })}
                            className={`input w-full border bg-white dark:bg-gray-700 dark:text-white hover:border-blue-500 dark:hover:border-blue-400 ${
                                errors.confirmPassword 
                                    ? 'border-red-300 bg-red-50 dark:border-red-500 dark:bg-red-900/20' 
                                    : 'border-gray-300 dark:border-gray-600'
                            }`}
                            placeholder="Confirm your password"
                            autoComplete="confirm password" 
                        />
                        <button
                            type="button"
                            onClick={() => setShowsConfirmPassword(!showsConfirmPassword)}
                            className='btn-sm absolute top-8 right-4 text-base text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                        >
                            {showsConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                        </button>
                        {errors.confirmPassword && (
                            <span className='text-red-500 dark:text-red-400 text-xs'>{errors.confirmPassword.message}</span>
                        )}
                    </div>

                    {/* Referral Code Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                            Referral Code{" "}
                            <span className="text-gray-500 dark:text-gray-400 font-normal">(Optional)</span>
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                value={referralCode}
                                onChange={handleReferralCodeChange}
                                className={`w-full px-4 py-3 pr-12 border rounded-lg bg-white dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 ${
                                    referralCode
                                        ? referralValidation.isValid === true
                                            ? 'border-green-300 bg-green-50 dark:border-green-500 dark:bg-green-900/20'
                                            : referralValidation.isValid === false
                                                ? 'border-red-300 bg-red-50 dark:border-red-500 dark:bg-red-900/20'
                                                : 'border-gray-300 dark:border-gray-600'
                                        : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                                }`}
                                placeholder="Enter referral code"
                                maxLength={6}
                            />
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                {referralValidation.isValidating && (
                                    <TbFidgetSpinner className="w-5 h-5 animate-spin text-indigo-500" />
                                )}
                                {!referralValidation.isValidating && referralCode && referralValidation.isValid === true && (
                                    <FaCheck className="w-5 h-5 text-green-500" />
                                )}
                                {!referralValidation.isValidating && referralCode && referralValidation.isValid === false && (
                                    <FaTimes className="w-5 h-5 text-red-500" />
                                )}
                            </div>
                        </div>
                        {referralCode && referralValidation.message && (
                            <p className={`mt-1 text-sm ${
                                referralValidation.isValid ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                            }`}>
                                {referralValidation.message}
                                {referralValidation.isValid && referralValidation.referrerName && (
                                    <span className="block text-gray-600 dark:text-gray-400">
                                        Referred by: {referralValidation.referrerName}
                                    </span>
                                )}
                            </p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="btn w-full mt-4 bg-[#4F46E5] hover:bg-[#4338CA] text-white rounded-md flex justify-center items-center gap-2 border-none"
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <TbFidgetSpinner className="animate-spin" />
                                Creating...
                            </>
                        ) : (
                            'Create Account'
                        )}
                    </button>
                </form>

                {/* Login Link */}
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                        Already have an account?{" "}
                        <Link to="/login" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium hover:underline">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;