import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Financial = () => {
    return (
        <div className=' sm:py-12 py-6 px-2'> 
            <div className="  border border-[#345f7a] bg-gradient-to-r from-[#131F3D] via-[#1A306F] to-[#21429e] rounded-lg sm:w-8/12  mx-auto sm:p-12 p-4">

                {/* categories */}
                <h5 className=" mb-2 text-orange-300 font-medium uppercase sm:text-base text-xs"></h5>

                {/* popular categories */}
                <div className="flex flex-col justify-center items-center  ">
                    <h3 className="text-white text-center lg:text-4xl md:text-3xl text-xl font-bold">Ready to Start Your Financial Journey?</h3>
                    <p className=" sm:text-base text-xs sm:w-8/12 mx-auto  text-gray-200 mt-2  text-center">
                        Join thousands of successful users and start earning today. No hidden fees, no complicated processes.
                    </p>
                </div>
                <div className="flex justify-center items-center mt-4">
                    {/* location */}
                    <Link to='/login'>
                        <button className=" text-white bg-[#1490DE] flex items-center  gap-x-2 border-none px-4 py-2 rounded-full">
                            <span>Get Started Free</span> <FaArrowRight />
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Financial;