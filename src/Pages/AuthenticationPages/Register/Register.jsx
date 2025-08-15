// ===== FIXED REGISTER COMPONENT =====

import { useEffect, useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { FaEye, FaEyeSlash, FaCheck, FaTimes } from "react-icons/fa";
import { Link, useLocation, useSearchParams } from "react-router-dom";
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
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

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
                    });
                    navigate(from, { replace: true });
                } else {
                    Swal.fire({
                        title: "Info",
                        text: res.data.message || "Account processed",
                        icon: "info"
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
            <div className="relative card-body w-full max-w-lg mx-auto shadow-2xl p-6 rounded-lg overflow-hidden bg-white">
                <Link to="/">
                    <span className="text-sm flex items-center gap-x-1 text-gray-600">
                        <BsArrowLeft /> Back To Home
                    </span>
                </Link>
                <div className="text-center mt-3 space-y-2">
                    <h2 className="text-2xl sm:text-4xl font-bold">Create Account</h2>
                    <p className="text-gray-700">Join Us Today</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="fieldset space-y-2">
                    {/* Name */}
                    <label className="font-medium text-gray-700">Username</label>
                    <input
                        type="text"
                        {...register("name", { required: true })}
                        className="input w-full border hover:border-blue-500"
                        placeholder="Enter your name"
                    />
                    {errors.name && <span className='text-red-500 text-xs'>Name is required</span>}

                    {/* Email */}
                    <label className="font-medium text-gray-700">Email Address</label>
                    <input
                        type="email"
                        {...register("email", { required: true })}
                        className="input w-full border hover:border-blue-500"
                        placeholder="Enter your email"
                    />
                    {errors.email && <span className='text-red-500 text-xs'>Email is required</span>}

                    {/* Password */}
                    <div className='relative'>
                        <label className="font-medium text-gray-700">Password</label>
                        <input
                            type={showsPassword ? "text" : "password"}
                            {...register("password", {
                                required: true,
                                minLength: 6,
                                maxLength: 20,
                                pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                            })}
                            className="input w-full border hover:border-blue-500"
                            placeholder="Enter your password"
                        />
                        <button
                            type='button'
                            onClick={() => setShowsPassword(!showsPassword)}
                            className='btn-sm absolute top-8 right-4 text-base'>
                            {showsPassword ? <FaEye /> : <FaEyeSlash />}
                        </button>
                    </div>

                    {/* Confirm Password */}
                    <div className='relative'>
                        <label className="font-medium text-gray-700">Confirm Password</label>
                        <input
                            type={showsPassword ? "text" : "password"}
                            {...register("confirmPassword", {
                                required: true,
                                validate: value => value === password || "Passwords do not match"
                            })}
                            className="input w-full border hover:border-blue-500"
                            placeholder="Confirm your password"
                        />
                        <button
                            type='button'
                            onClick={() => setShowsPassword(!showsPassword)}
                            className='btn-sm absolute top-8 right-4 text-base'>
                            {showsPassword ? <FaEye /> : <FaEyeSlash />}
                        </button>
                        {errors.confirmPassword && (
                            <p className="text-red-500 text-xs">{errors.confirmPassword.message}</p>
                        )}
                    </div>

                    {/* Referral Code */}
                    <div>
                        <label className="font-medium text-gray-700">
                            Referral Code <span className="text-gray-500">(Optional)</span>
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                value={referralCode}
                                onChange={handleReferralCodeChange}
                                className={`input w-full pr-10 ${
                                    referralCode
                                        ? referralValidation.isValid === true
                                            ? 'border-green-500 bg-green-50'
                                            : referralValidation.isValid === false
                                                ? 'border-red-500 bg-red-50'
                                                : 'border-gray-300'
                                        : 'border-gray-300'
                                }`}
                                placeholder="Enter referral code"
                                maxLength={6}
                            />
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                {referralValidation.isValidating && (
                                    <TbFidgetSpinner className="animate-spin text-blue-500" />
                                )}
                                {!referralValidation.isValidating && referralCode && referralValidation.isValid === true && (
                                    <FaCheck className="text-green-500" />
                                )}
                                {!referralValidation.isValidating && referralCode && referralValidation.isValid === false && (
                                    <FaTimes className="text-red-500" />
                                )}
                            </div>
                        </div>
                        {referralCode && referralValidation.message && (
                            <p className={`text-xs mt-1 ${
                                referralValidation.isValid ? 'text-green-600' : 'text-red-600'
                            }`}>
                                {referralValidation.message}
                                {referralValidation.isValid && referralValidation.referrerName && (
                                    <span> (Referred by: {referralValidation.referrerName})</span>
                                )}
                            </p>
                        )}
                    </div>

                    {/* Register Button */}
                    <button
                        type="submit"
                        className="btn w-full mt-4 bg-[#4F46E5] text-white/80 rounded-xl flex justify-center items-center gap-2"
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
            </div>
        </div>
    );
};

export default Register;
