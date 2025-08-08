import { RxCross1 } from "react-icons/rx";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../../Context/AuthProvider";
import { useContext } from "react";
import { FiLogOut } from "react-icons/fi";
import useAdmin from "../../../Hooks/useAdmin";

const Navbar = () => {
    const { user, handleLogout: logOut } = useContext(AuthContext);
    const [isAdmin, isAdminLoading] = useAdmin();


    const handleLogout = () => {
        logOut().catch(error => console.log(error));
    };

    const handleDrawerClose = () => {
        document.getElementById("my-drawer-4").checked = false;
    };

    const navOptions = (
        <>
            <li>
                <NavLink
                    onClick={handleDrawerClose}
                    className="nav-link hover:text-[#FF0000] hover:scale-105 transition duration-300 font-medium"
                    to="/"
                >
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink
                    onClick={handleDrawerClose}
                    className="nav-link hover:text-[#FF0000] hover:scale-105 transition duration-300 font-medium"
                    to="/about"
                >
                    About Us
                </NavLink>
            </li>

            {user && !isAdminLoading && (
                <li>
                    <NavLink
                        to={isAdmin ? "/dashboard/adminProfile" : "/dashboard/accountBalance"}
                        onClick={handleDrawerClose}
                        className="nav-link hover:text-[#FF0000] hover:scale-105 transition duration-300 font-medium"
                    >
                        Dashboard
                    </NavLink>
                </li>
            )}

        </>
    );

    return (
        <div className="fixed top-0 z-50 bg-opacity-80 backdrop-blur py-4 sm:px-0 px-2 w-full">
            <div className="sm:w-10/12 mx-auto navbar flex items-center justify-between px-0">
                {/* Left: Logo & Hamburger */}
                <div className="flex items-center gap-x-4">
                    <div className="lg:hidden ml-2">
                        <label htmlFor="my-drawer-4" className="hover:bg-[#0BAAD7]">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="white"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16"
                                />
                            </svg>
                        </label>
                    </div>
                    <Link to="/">
                        <h3 className="font-medium sm:text-2xl md:text-2xl text-base text-white/90">
                            Bank<span className="text-[#40aaec]">P</span>rofit
                        </h3>
                    </Link>
                </div>

                {/* Middle: Nav Links */}
                <div className="hidden lg:flex">
                    <ul className="menu menu-horizontal space-x-4">{navOptions}</ul>
                </div>

                {/* Right: Auth Buttons */}
                <div>
                    <div className="hidden sm:block">
                        <div className="flex items-center gap-3">
                            {user?.email ? (
                                <>
                                    <button className="flex items-center bg-black/0">
                                        <img
                                            className="w-12 rounded-full cursor-pointer transition duration-300 hover:scale-105"
                                            src={
                                                user?.photoURL ||
                                                `https://ui-avatars.com/api/?name=${user?.displayName?.charAt(0)}&background=random`
                                            }
                                            alt="User"
                                        />
                                    </button>

                                    <button
                                        onClick={handleLogout}
                                        className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white sm:px-8 sm:py-4 px-4 py-2 rounded-xl font-semibold text-lg hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-cyan-500/25 flex items-center gap-x-2"
                                    >
                                        <FiLogOut className="text-xl" />
                                        <span className="hidden sm:inline">Logout</span>
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link
                                        to="login"
                                        className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white sm:px-8 sm:py-4 px-4 py-2 rounded-xl font-semibold text-lg hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-cyan-500/25"
                                    >
                                        Sign In
                                    </Link>
                                    <Link
                                        to="register"
                                        className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white sm:px-8 sm:py-4 px-4 py-2 rounded-xl font-semibold text-lg hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-cyan-500/25"
                                    >
                                        Sign Up
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Drawer Sidebar Mobile */}
                    <input id="my-drawer-4" type="checkbox" className="drawer-toggle hidden" />
                    <div className="drawer-side z-50 lg:hidden">
                        <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-open"></label>
                        <ul className="menu bg-gradient-to-r from-[#131F3D] via-[#1A306F] to-[#21429e] backdrop-blur opacity-95 text-base-content min-h-full md:w-[50%] w-[70%] p-4">
                            {/* Drawer Header */}
                            <div className="flex justify-between items-center">
                                <div className="flex items-center">
                                    {user?.email ? (
                                        <img
                                            className="w-8 rounded-full cursor-pointer transition duration-300 hover:scale-105"
                                            src={
                                                user?.photoURL ||
                                                `https://ui-avatars.com/api/?name=${user?.displayName?.charAt(0) || "U"}&background=random`
                                            }
                                            alt="User"
                                        />
                                    ) : (
                                        <Link
                                            onClick={handleDrawerClose}
                                            to="login"
                                            className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-2 py-1 rounded-md font-semibold text-xs hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 shadow-md hover:shadow-cyan-500/25"
                                        >
                                            Sign In
                                        </Link>
                                    )}
                                    {user?.email && (
                                        <button
                                            onClick={handleLogout}
                                            className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-2 py-1 rounded-md font-semibold text-xs hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 shadow-md hover:shadow-cyan-500/25 ml-3 flex items-center gap-x-0.5"
                                        >
                                            <FiLogOut className="text-base" />
                                            <span className="hidden sm:inline">Logout</span>
                                        </button>
                                    )}
                                </div>
                                <button
                                    onClick={() => (document.getElementById("my-drawer-4").checked = false)}
                                    className="md:text-2xl text-xl text-gray-200 hover:bg-[#0BAAD7] p-2 rounded-full hover:text-white transition duration-500"
                                >
                                    <RxCross1 />
                                </button>
                            </div>

                            <div className="my-4 mt-12">
                                <Link to="/" onClick={handleDrawerClose} className="flex items-center">
                                    <h3 className="font-medium sm:text-2xl md:text-2xl text-base text-white/90">
                                        Demo<span className="text-[#40aaec]">C</span>ompany
                                    </h3>
                                </Link>
                            </div>

                            <div className="space-y-4 ml-3">{navOptions}</div>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
