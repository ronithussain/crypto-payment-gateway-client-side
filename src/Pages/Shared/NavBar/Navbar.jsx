import { RxCross1 } from "react-icons/rx";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../../Context/AuthProvider";
import { useContext } from "react";





const Navbar = () => {
    const { user, handleLogout: logOut } = useContext(AuthContext);


    const handleLogout = () => {
        logOut()
            .then(() => { })
            .catch(error => {
                console.log(error)
            })
    }

    //  closed drawer
    const handleDrawerClose = () => {
        document.getElementById("my-drawer-4").checked = false;
    }
    // navOptions
    const navOptions = <>
        <li><NavLink onClick={handleDrawerClose} className="nav-link hover:text-[#FF0000] hover:scale-105 transition duration-300 font-medium " to="/">Home</NavLink></li>

        <>
            <li><NavLink onClick={handleDrawerClose} className="nav-link hover:text-[#FF0000] hover:scale-105 transition duration-300 font-medium" to="/about">About Us</NavLink></li>
            <li><NavLink onClick={handleDrawerClose} className="nav-link hover:text-[#FF0000] hover:scale-105 transition duration-300 font-medium" to="/contact">Contact</NavLink></li>
            {/* <li>
                <NavLink
                    to="/dashboard/userProfile"
                    onClick={handleDrawerClose} className="nav-link hover:text-[#FF0000] hover:scale-105 transition duration-300 font-medium" >DashBoard
                </NavLink>
            </li> */}
        </>
    </>;

    return (
        <div className='fixe top-0 z-50 bg-opacity-80  backdrop-blur py-4 sm:px-0 px-2 w-[100%] '>
            <div className="sm:w-10/12 mx-auto navbar flex items-center justify-between px-0 ">

                {/* column----------------------------1 */}
                {/* Logo Section */}
                <div className="flex items-center gap-x-4">
                    {/*Hamburger Drawer for Mobile */}
                    <div className="lg:hidden ml-2">
                        <label htmlFor="my-drawer-4" className="hover:bg-[#0BAAD7]">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="white">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </label>
                    </div>
                    <Link to='/'>
                        <h3 className="font-medium  sm:text-2xl  md:text-2xl  text-base text-white/90">Bank<span className="text-[#40aaec]">P</span>rofit</h3>
                    </Link>
                </div>

                {/* column----------------------------2 */}
                <div>


                    {/* Navigation Links (Desktop View) */}
                    <div className="hidden lg:flex">
                        <ul className="menu menu-horizontal space-x-4 ">
                            {navOptions}
                        </ul>
                    </div>
                </div>

                {/* column----------------------------3 */}
                {/* Buttons */}
                <div>
                    <div className='hidden sm:block'>
                        <div className="flex items-center gap-3  ">
                            {/* conditional */}
                            {user?.email ? (
                                <>
                                    <button className="flex items-center bg-black/0">
                                        {user?.photoURL ? (
                                            <div className="w-12">
                                                <img
                                                    className="rounded-full cursor-pointer transition duration-300 hover:scale-105"
                                                    src={user?.photoURL}
                                                    alt="User"
                                                />
                                            </div>
                                        ) : (
                                            <div className="w-12">
                                                <img
                                                    src={`https://ui-avatars.com/api/?name=${user?.displayName?.charAt(0)}&background=random`}
                                                    alt="Default"
                                                    className="rounded-full cursor-pointer transition duration-300 hover:scale-105"
                                                />
                                            </div>
                                        )}
                                    </button>

                                    <div>
                                        <button
                                            onClick={handleLogout}
                                            className="animated-button px-4 py-2 rounded-md border-none bg-[#0BAAD7] transition-all duration-500 text-white"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <Link to="login" className="animated-button px-4 py-2 rounded-md border-none bg-[#0BAAD7] transition-all duration-500 text-white">
                                        <span>Sign In</span>
                                    </Link>
                                    <Link to="register" className="animated-button px-4 py-2 rounded-md border-none bg-[#0BAAD7] transition-all duration-500 text-white">
                                        <span>Sign Up</span>
                                    </Link>
                                </>
                            )}

                        </div>
                    </div>

                    {/* Drawer Sidebar only for mobile */}
                    <input id="my-drawer-4"
                        type="checkbox"
                        className="drawer-toggle hidden" />
                    <div className="drawer-side z-50 lg:hidden">
                        <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-open"></label>
                        <ul className="menu bg-gradient-to-r from-[#131F3D] via-[#1A306F] to-[#21429e] backdrop-blur opacity-95 text-base-content min-h-full md:w-[50%] w-[70%] p-4">

                            {/* drawer login-register-or-faCross-close-button */}
                            <div className='flex justify-between items-center '>
                                <div className="flex items-center">
                                    {user?.email ?
                                        <>
                                            <div className="relative group">
                                                 <button className="flex items-center bg-black/0">
                                        {user?.photoURL ? (
                                            <div className="w-8">
                                                <img
                                                    className="rounded-full cursor-pointer transition duration-300 hover:scale-105"
                                                    src={user?.photoURL}
                                                    alt="User"
                                                />
                                            </div>
                                        ) : (
                                            <div className="w-8">
                                                <img
                                                    src={`https://ui-avatars.com/api/?name=${user?.displayName?.charAt(0) || 'U'}&background=random`}
                                                    alt="Default"
                                                    className="rounded-full cursor-pointer transition duration-300 hover:scale-105"
                                                />
                                            </div>
                                        )}
                                    </button>
                                            </div>
                                            {/* DarkModeBtn */}
                                        </> :
                                        <>
                                            {/* Sign In Button */}
                                            <Link
                                                onClick={handleDrawerClose}
                                                to="login"
                                                className="animated-button  text-xs rounded-md  text-gray-200 hover:text-[#0BAAD7]   transition-all duration-500"
                                            >
                                                Sign In
                                            </Link>
                                        </>
                                    }

                                    {/* Logout Button */}
                                    <button
                                        // onClick={handleLogout}
                                        onClick={handleDrawerClose}
                                        className="animated-button px-3 py-1 rounded-md border-none bg-[#0BAAD7] transition-all duration-500 text-white ml-3"
                                    >
                                        Logout
                                    </button>

                                </div>
                                {/* Close Button */}
                                <button onClick={() => document.getElementById("my-drawer-4").checked = false}
                                    className="md:text-2xl text-xl  text-gray-200  hover:bg-[#0BAAD7] p-2 rounded-full hover:text-white transition duration-500">
                                    <RxCross1 />
                                </button>
                            </div>

                            {/* Drawer Header */}
                            <div className=" my-4 mt-12">
                                <Link to='/'
                                    onClick={handleDrawerClose}
                                    className="flex items-center">
                                    {/* <img className="w-14" src={navLogo} alt="Logo" /> */}
                                    <h3 className="font-medium  sm:text-2xl  md:text-2xl  text-base text-white/90">Demo<span className="text-[#40aaec]">C</span>ompany</h3>
                                </Link>
                            </div>

                            {/* Navigation Links */}
                            <div className='space-y-4 ml-3'>
                                {navOptions}
                            </div>

                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;