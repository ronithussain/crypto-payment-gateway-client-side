import { useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/UseAuth";



const Register = () => {
    const [showsPassword, setShowsPassword] = useState(false);

    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
    const password = watch("password");
    const { handleRegister, handleUpdateProfile, sendVerificationEmail } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/';
    console.log('in the location login page', location.state)

    const onSubmit = data => {
        // console.log(data);
        handleRegister(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);

                handleUpdateProfile(data.name, data.photo)
                    .then(() => {
                        sendVerificationEmail();
                        console.log('email varification send')
                    })
                    .then(() => {
                        reset();
                        Swal.fire({
                            title: "User Login Successful.css",
                            showclassName: {
                                popup: ` animate__animated
                                                    animate__fadeInUp
                                                    animate__faster `
                            },
                            hideclassName: {
                                popup: ` animate__animated
                                                     animate__fadeOutDown
                                                    animate__faster `
                            }
                        });
                        navigate(from, { replace: true });
                        // // create user entry in the database starts here............
                        // const userInfo = {
                        //     name: data.name,
                        //     email: data.email,
                        // }
                        // axiosPublic.post('/users', userInfo)
                        //     .then(res => {
                        //         if (res.data.insertedId) {
                        //             console.log("user added to the database")

                        //         }
                        //     })
                        // ends here
                    })
                    .catch(error => {
                        console.log('User updated failed!!!', error.message)
                    })
            })
    };

    return (
        <>
            <div data-aos="fade-right" className="hero-content border w-full mx-auto min-h-screen">
                {/* Registration Card */}
                <div
                    className="relative card-body w-full max-w-lg mx-auto shadow-2xl p-6 rounded-lg overflow-hidden bg-white"
                >
                    <div>
                        <Link to="/">
                            <span className="text-sm flex items-center gap-x-1 text-gray-600">
                                <BsArrowLeft /> Back To Home
                            </span>
                        </Link>
                        <div className="text-center mt-3 space-y-2">
                            <h2 className="text-2xl sm:text-4xl   font-bold ">Create Account</h2>
                            <p className="text-gray-700">Join Us Today</p>
                        </div>
                    </div>

                    {/* Form Content */}
                    <div className="relative z-10">
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="fieldset space-y-2">
                            {/* Name */}
                            <label className="fieldset-label mb-0 font-medium text-gray-700">Username</label>
                            <input
                                type="text"
                                name='name'
                                {...register("name", { required: true })}
                                className="input w-full border hover:border-blue-500"
                                placeholder="Enter your name" />
                            {errors.name && <span className='text-red-500 text-xs'>Name is required</span>}

                            {/* Email */}
                            <label className="fieldset-label mb-0 font-medium text-gray-700">Email Address</label>
                            <input
                                type="email"
                                name='email'
                                {...register("email", { required: true })}
                                className="input w-full border hover:border-blue-500"
                                placeholder="Enter your email" />
                            {errors.email && <span className='text-red-500 text-xs'>Email is required</span>}

                            {/* Password */}
                            <div className='relative'>
                                <label className="fieldset-label mb-1 font-medium text-gray-700">Password</label>
                                <input
                                    // type="password" 
                                    type={showsPassword ? "text" : "password"}
                                    name='password'
                                    {...register("password", {
                                        required: true,
                                        minLength: 6,
                                        maxLength: 20,
                                        pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                                    })}
                                    className="input w-full border hover:border-blue-500"
                                    placeholder="Enter your password" />
                                <button
                                    type='button'
                                    onClick={() => setShowsPassword(!showsPassword)}
                                    className='btn-sm absolute top-8 right-4 text-base'>
                                    {showsPassword ? <FaEye /> : <FaEyeSlash />}
                                </button>
                                {errors.password?.type === 'required' && <p className='text-red-500 text-xs'>Password is required</p>}
                                {errors.password?.type === 'maxLength' && <p className='text-red-500 text-xs'>Password must be less then 20 characters</p>}
                                {errors.password?.type === 'minLength' && <p className='text-red-500 text-xs'>Password must be at least 6 characters</p>}
                                {errors.password?.type === 'pattern' && <p className='text-red-500 text-xs'>Password must include one uppercase letter, one lowercase letter, one number, and one special character</p>}

                            </div>
                            {/*Confirm Password */}
                            <div className='relative'>
                                <label className="fieldset-label mb-1 font-medium text-gray-700">Confirm Password</label>
                                <input
                                    // type="password" 
                                    type={showsPassword ? "text" : "password"}
                                    name='confirmPassword'
                                    {...register("confirmPassword", {
                                        required: true,
                                        validate: value => value === password || "Passwords do not match"
                                    })}
                                    className="input w-full border hover:border-blue-500"
                                    placeholder="Confirm your password" />
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
                            <label className="fieldset-label mb-0 font-medium text-gray-700">Referral Code <span>(Optional)</span></label>
                                <input
                                    type="number"
                                    name='number'
                                    {...register("number", { required: false })}
                                    className="input w-full rounded transition border hover:border-blue-500"
                                    placeholder="Enter referral code if you have one" />
                                {/* {errors.email && <span className='text-red-500 text-xs'>Email is required</span>} */}



                            {/* Register Button */}
                            <input className="btn w-full mt-4 bg-[#4F46E5] text-white/80 rounded-xl" type="submit" value="Create Account" />

                            {/* Login Link */}
                            <p className="text-center text-sm">
                                <span>
                                    Already have an account?
                                </span>
                                <Link className="text-[#4F46E5]" to="/login"> Sign In</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </>

    );
};

export default Register;


