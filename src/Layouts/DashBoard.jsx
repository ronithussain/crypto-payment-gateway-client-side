import { Outlet } from "react-router-dom";
import NavbarDashboard from "./NavbarDashboard";
import Footer from "../Pages/Shared/Footer/Footer";

const DashBoard = () => {

    return (
        <div>
            {/* Dashboard NavBar ----------------*/}
            <NavbarDashboard></NavbarDashboard>

            <main className='min-h-[calc(100vh)] pt-26 pb-8 sm:px-0 px-4 max-w-7xl mx-auto'>
                <Outlet></Outlet>
            </main>

            <Footer></Footer>
        </div >
    );
};

export default DashBoard;
