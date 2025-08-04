import { Outlet } from "react-router-dom";

import NavbarDashboard from "./NavbarDashboard";
import Footer from "../Pages/Shared/Footer/Footer";


const DashBoard = () => {

 

    return (
        <div>
            {/* Dashboard NavBar ----------------*/}

            <NavbarDashboard></NavbarDashboard>
            {/* _______________________________ */}
            
            <main className='min-h-[calc(100vh)] pt-26'>
                <Outlet></Outlet>
        
            </main>

            <Footer></Footer>
        </div >
    );
};

export default DashBoard;


// {/* <div className="shadow-2xl">
//     {/* <Navbar></Navbar> */}
//     <div className="flex sm:p-3 p-2 justify-between items-center text-white container mx-auto">
//         <div>
//             <h3 className="sm:text-3xl text-xl  font-bold">Dashboard</h3>
//             <p className="sm:text-base text-xs mb-4 text-gray-500">
//                 {
//                     isAdmin ? "You are viewing the Admin Dashboard" : "Welcome to your User Dashboard"
//                 }
//             </p>
//             <Link to='/'>
//                 <div
//                     className="flex items-center gap-x-1 -mt-3 text-gray-300 sm:text-2xl text-xs">
//                     <HiOutlineArrowLeft /><p >Back to home</p>
//                 </div>
//             </Link>

//         </div>
//         <div className="flex items-center mb-4 sm:gap-x-4 gap-x-2">
//             {/* <DarkModeBtn/> */}
//             {/* Logout Button */}
//             {
//                 isAdmin ?
//                     <>
//                         <AllUsers />
//                     </>
//                     :
//                     <>
//                     </>
//             }
//             <button
//                 onClick={handleLogout}
//                 className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white sm:px-8 sm:py-4 px-2 py-1.5 rounded-xl font-semibold lg:text-xl md:text-base text-xs hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-cyan-500/25"
//             >
//                 Logout
//             </button>
//         </div>
//     </div>
// </div> */}
