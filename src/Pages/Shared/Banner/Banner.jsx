import { Link, useNavigate } from "react-router-dom";
import BannerImg from "../../../assets/BannerImage/Banner.png"
import { FaArrowRight } from "react-icons/fa";
import useAuth from "../../../Hooks/UseAuth";
import useAdmin from "../../../Hooks/useAdmin";


const Banner = () => {
    const [isAdmin] = useAdmin();
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleClick = () => {
        if (!user) {

            navigate("/register");
        } else if (isAdmin) {
            navigate("dashboard/adminProfile")
        } else {
            navigate("dashboard/accountBalance");
        }
    };


    return (
        <div>
            <div className="sm:w-10/12 my-14 sm:my-0 mx-auto min-h-full lg:min-h-screen flex items-center justify-center text-black">

                {/* Banner Section */}
                <div className="flex flex-col lg:flex-row items-center gap-8">

                    {/* Text Section */}
                    <div className="w-full lg:w-1/2 text-center lg:text-left space-y-4">
                        <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                            Data Price <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Company</span> <br />
                            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent"> Financial</span> Freedom
                        </h2>
                        <p className="text-sm lg:text-start md:text-center sm:px-0 px-4 sm:text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                            Join thousands of users earning daily profits through our innovative platform. Secure deposits, withdrawals, and unlimited earning potential.
                        </p>

                        <div className="flex lg:justify-start justify-center">
                            <button
                                onClick={handleClick}
                                className="border-2 border-cyan-400 text-cyan-400 sm:px-8 sm:py-4 px-4 py-2 rounded-xl font-semibold text-lg hover:bg-cyan-400 hover:text-slate-900 transition-all duration-300 flex items-center gap-x-3"
                            >
                                <span>Start Earning Now</span> <FaArrowRight />
                            </button>
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