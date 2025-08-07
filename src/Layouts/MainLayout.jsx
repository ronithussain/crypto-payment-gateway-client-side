import { Outlet } from "react-router-dom";
import Navbar from "../Pages/Shared/NavBar/Navbar";
import Footer from "../Pages/Shared/Footer/Footer";

import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";
import TelegramButton from "../Components/TelegramButton/TelegramButton";



const MainLayout = () => {
     // added dynamic animation something file
    useEffect(() => {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: false,
            delay: 200,
        })
    }, []);


    return (
        <div>
            <Navbar/>
             <main className='min-h-[calc(100vh)] pt-28 pb-8'>
                <Outlet></Outlet>
                <TelegramButton/>
            </main>
            <Footer/>
        </div>
    );
};

export default MainLayout;