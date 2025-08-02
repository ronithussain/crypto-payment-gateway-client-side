import useAuth from "../Hooks/UseAuth";
import { Link, Outlet } from "react-router-dom";
import { HiOutlineArrowLeft } from "react-icons/hi";
import UserProfile from "../Pages/Dashboards/UserRoutes/UserProfile";
import AccountBalance from "../Pages/Dashboards/UserRoutes/AccountBalance";
import Admin from "../Pages/Dashboards/AdminRoutes/Admin";
import Modal from "../Pages/Dashboards/AdminRoutes/Modal";
import AllUsers from "../Pages/Dashboards/AdminRoutes/AllUsers";


const DashBoard = () => {
    const isAdmin = false;

    const { user, handleLogout: logOut } = useAuth();
    console.log(user);

    const handleLogout = () => {
        logOut()
            .then(() => { })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <div className=" border border-red-500">
            {/* Dashboard NavBar ----------------*/}
            <div className="shadow-2xl">
                {/* <Navbar></Navbar> */}
                <div className="flex sm:p-3 p-2 justify-between items-center text-white container mx-auto">
                    <div>
                        <h3 className="sm:text-3xl text-xl  font-bold">Dashboard</h3>
                        <p className="sm:text-base text-xs mb-4 text-gray-500">
                            {
                                isAdmin ? "Welcome to your User Dashboard" : " You are viewing the Admin Dashboard"
                            }
                        </p>
                        <Link to='/'>
                            <div
                                className="flex items-center gap-x-1 -mt-3 text-gray-300 sm:text-2xl text-sm">
                                <HiOutlineArrowLeft /><p >Back to home</p>
                            </div>
                        </Link>

                    </div>
                    <div className="flex items-center mb-4 sm:gap-x-4 gap-x-2">
                        {/* <DarkModeBtn/> */}
                        {/* Logout Button */}
                        {
                            isAdmin ?
                                <>

                                </>
                                :
                                <>
                                    <AllUsers />
                                </>
                        }
                        <button
                            onClick={handleLogout}
                            className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white sm:px-8 sm:py-4 px-2 py-1.5 rounded-xl font-semibold lg:text-xl md:text-base text-xs hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-cyan-500/25"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
            {/* _______________________________ */}
            <div className="container mx-auto sm:p-4 p-2">
                <h2 className="text-white text-4xl">Welcome back!</h2>
                <p className="text-white">Lorem ipsum dolor sit.</p>
            </div>
            {/* DashBoard Main Content */}
            <div className="flex flex-col sm:flex-row gap-x-8 min-h-screen border border-yellow-300 container mx-auto sm:p-4 p-2">

                {
                    isAdmin ? <>
                        <div className=" flex-1 min-h-screen  border border-red-500">
                            <AccountBalance></AccountBalance>
                            <UserProfile></UserProfile>
                        </div>
                        <div className="sm:w-80 max-w-2xl border border-white">
                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Harum assumenda, voluptates voluptas, nostrum numquam est repellat maiores quia delectus rerum dolores cum sequi illo. Iusto voluptatem consectetur dignissimos accusamus omnis.</p>
                        </div>
                    </>
                        :
                        <>

                            <div className=" flex-1 min-h-screen  border border-red-500">
                                <Admin></Admin>
                            </div>
                            <div className="sm:w-80 max-w-2xl border border-white">
                                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Harum assumenda, voluptates voluptas, nostrum numquam est repellat maiores quia delectus rerum dolores cum sequi illo. Iusto voluptatem consectetur dignissimos accusamus omnis.</p>
                            </div>

                        </>
                }

            </div>
            {/* <Outlet /> */}
        </div >
    );
};

export default DashBoard;
