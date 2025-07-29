import { Link } from "react-router-dom";
import BannerImg from "../../../assets/BannerImage/Banner.png"
import { FaArrowRight } from "react-icons/fa";


const Banner = () => {
    return (
        <div className="bg-gradient-to-r from-[#131F3D] via-[#1A306F] to-[#21429e]">
            <div className="sm:w-10/12 mx-auto min-h-screen flex items-center justify-center text-black">

                {/* Banner Section */}
                <div className="flex flex-col lg:flex-row items-center gap-8">

                    {/* Text Section */}
                    <div className="w-full lg:w-1/2 text-center lg:text-left space-y-4">
                        <h2 className="text-2xl sm:text-4xl lg:text-6xl font-bold leading-tight text-white/90">
                            Your Gateway to <br />
                            <span className="text-[#2EACF1]">Financial Freedom</span>
                        </h2>
                        <p className=" sm:text-base text-sm  text-gray-300 lg:text-start md:text-center">
                           Join thousands of users earning daily profits through our innovative platform. Secure deposits, instant withdrawals, and unlimited earning potential.
                        </p>

                        {/* Search Section */}
                        <div className="flex lg:justify-start justify-center">
                            {/* location */}
                            <Link to='/start-earning-now'>
                                <button className=" text-white bg-[#1490DE] flex items-center border-none px-4 py-2 rounded-full">
                                 <span>Start Earning Now</span> <FaArrowRight />
                                </button>
                            </Link>
                            
                        </div>
                    </div>

                    {/* Image Section */}
                    <div className="w-full lg:w-1/2 flex justify-center">
                        <img
                            className="w-[90%] sm:w-[75%] md:w-[60%] lg:w-[80%] max-w-xs sm:max-w-md lg:max-w-lg h-auto rounded-lg shadow-lg"
                            src={BannerImg}
                            alt="Banner"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;