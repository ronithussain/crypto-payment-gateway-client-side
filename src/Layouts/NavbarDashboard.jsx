import { Link, NavLink } from "react-router-dom";
import { HiMenu } from "react-icons/hi";
import { RxCross1 } from "react-icons/rx";
import useAuth from "../Hooks/UseAuth";
import { FiLogOut } from "react-icons/fi";
import { BiDollar } from "react-icons/bi";

import useAdmin from "../Hooks/useAdmin";
import useDbUser from "../Hooks/useDbUser";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";


const NavbarDashboard = () => {
    const { handleLogout } = useAuth();
    const [isAdmin] = useAdmin();

    const { dbUser } = useDbUser();
    const axiosSecure = useAxiosSecure();

    //  closed drawer
    const handleDrawerClose = () => {
        document.getElementById("my-drawer-4").checked = false;
    }

    const navLinks = (
        <>
            {
                isAdmin ? (
                    <>
                        <li>
                            <NavLink
                                onClick={handleDrawerClose}
                                to="/dashboard/adminProfile"
                                className={({ isActive }) =>
                                    `font-medium ${isActive ? "text-yellow-400 underline" : "hover:text-yellow-400"}`
                                }
                            >
                                Admin Profile
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                onClick={handleDrawerClose}
                                to="/dashboard/userControl"
                                className={({ isActive }) =>
                                    `font-medium ${isActive ? "text-yellow-400 underline" : "hover:text-yellow-400"}`
                                }
                            >
                                User Control
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                onClick={handleDrawerClose}
                                to="/dashboard/pendingTransaction"
                                className={({ isActive }) =>
                                    `font-medium ${isActive ? "text-yellow-400 underline" : "hover:text-yellow-400"}`
                                }
                            >
                                Pending Transaction
                            </NavLink>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <NavLink
                                onClick={handleDrawerClose}
                                to="/dashboard/accountBalance"
                                className={({ isActive }) =>
                                    `font-medium ${isActive ? "text-yellow-400 underline" : "hover:text-yellow-400"}`
                                }
                            >
                                Account Balance
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                onClick={handleDrawerClose}
                                to="/dashboard/transaction"
                                className={({ isActive }) =>
                                    `font-medium ${isActive ? "text-yellow-400 underline" : "hover:text-yellow-400"}`
                                }
                            >
                                Deposit/Withdraw
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                onClick={handleDrawerClose}
                                to="/dashboard/dailyProfitGenerator"
                                className={({ isActive }) =>
                                    `font-medium ${isActive ? "text-yellow-400 underline" : "hover:text-yellow-400"}`
                                }
                            >
                                Task Center
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                onClick={handleDrawerClose}
                                to="/dashboard/referralProgram"
                                className={({ isActive }) =>
                                    `font-medium ${isActive ? "text-yellow-400 underline" : "hover:text-yellow-400"}`
                                }
                            >
                                Referral Promotion
                            </NavLink>
                        </li>
                    </>
                )
            }
        </>
    );




    // Step: fetch user balance info
    const { data: userData = {}, } = useQuery({
        queryKey: ['userBalance', dbUser?._id],
        enabled: !!dbUser?._id,
        queryFn: async () => {
            const res = await axiosSecure.get(`/usersBalance/${dbUser._id}`);
            return res.data;
        }
    });
    // console.log(userData);

    const balance = Number(userData?.balance || 0);
    const formattedBalance = balance.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });


    return (
        <div className="drawer drawer-end z-50">

            <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content w-full">
                {/* Navbar */}
                <div className="fixed top-0 z-50 w-full  text-white shadow-sm backdrop-blur py-4 px-3">
                    <div className="max-w-7xl mx-auto flex justify-between items-center">
                        {/* Left: Logo & Hamburger */}
                        <div className="flex items-center gap-3">
                            <label htmlFor="dashboard-drawer" className="lg:hidden cursor-pointer">
                                <HiMenu className="text-2xl text-white" />
                            </label>
                            <Link to="/">
                                <div className="flex items-center">
                                    <BiDollar className="text-3xl text-[#32bbca]" />
                                    <h2 className="text-xl sm:text-2xl font-bold tracking-wide">
                                        E-<span className="text-yellow-400">B<span>anking</span></span>
                                    </h2>
                                </div>
                            </Link>
                        </div>

                        {/* Middle: Desktop Nav Links */}
                        <ul className="hidden lg:flex gap-6 text-sm font-medium">
                            {navLinks}
                        </ul>

                        {/* Right: Balance & Logout */}
                        <div className="flex items-center gap-4 text-sm">
                            <span className="hidden sm:block">
                                {/* {isAdmin && <AllUsers />} */}
                                {!isAdmin && (
                                    <span className="font-semibold text-yellow-300 text-xl">
                                        Balance: ${formattedBalance}

                                    </span>
                                )}
                            </span>
                            <button
                                onClick={handleLogout}
                                className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white sm:px-8 sm:py-4 px-4 py-2 rounded-xl font-semibold text-lg hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-cyan-500/25 flex items-center gap-x-2"
                            >
                                <FiLogOut className="text-xl" />
                                <span className="hidden sm:inline">Logout</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Drawer Sidebar for Mobile */}
            <div className="drawer-side z-50">
                <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
                <ul className="menu p-4 md:w-[50%] w-[70%] min-h-full bg-[#1a2250] text-white space-y-2">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold">Menu</h3>
                        <label htmlFor="dashboard-drawer">
                            <RxCross1 className="text-xl cursor-pointer" />
                        </label>
                    </div>
                    {!isAdmin && (
                        <div className="mt-4 ">
                            <div>
                                Balance:{" "}
                                <span className="font-semibold text-yellow-300 ">
                                 ${formattedBalance}
                                </span>
                                <div className="mt-3 border-t border-gray-500  text-sm"></div>
                            </div>
                        </div>
                    )}
                    {navLinks}
                    <div className="mt-4 border-t border-gray-500 pt-4 text-sm">
                        <button
                            onClick={handleLogout}
                            className="mt-3 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-md font-medium"
                        >
                            Logout
                        </button>
                    </div>
                </ul>
            </div>
        </div>
    );
};

export default NavbarDashboard;
