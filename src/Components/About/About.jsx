import { FaCheckCircle, FaHeart } from "react-icons/fa";
import { IoBookOutline } from "react-icons/io5";

const About = () => {
    return (
        <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 font-[Inter]">
            {/* Header */}
            <header className="text-white sm:py-16 pt-8 text-center px-1 sm:px-6 lg:px-8">
                <h1 className="text-3xl sm:text-5xl font-bold mb-4">Data Price Company Limited</h1>
                <p className="text-sm sm:text-xl opacity-90">Your Trusted Partner in Financial Growth Since 1993</p>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-12">
                {/* Our Story */}
                <section className="sm:mb-16 mb-8 bg-white rounded-2xl shadow-lg p-4 sm:p-8 transition-all duration-300 hover:translate-y-[-5px] hover:shadow-2xl">
                    <div className="flex items-center sm:mb-6 mb-4">
                        <div className="w-8 h-8 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                            <IoBookOutline className="text-[#3268db] text-[27px]" />
                        </div>
                        <h2 className="text-xl sm:text-3xl font-bold text-gray-800">Our Journey</h2>
                    </div>
                    <p className="text-sm sm:text-lg text-gray-600 leading-relaxed">
                        The journey of Data Price Company Limited began in <span className="font-semibold text-blue-600">1993</span> under the leadership of renowned Swiss researcher, <span className="font-semibold">Mettio</span>. His extensive research in the fields of investment and banking laid the foundation for our successful and sustainable organization.
                    </p>
                </section>

                {/* Mission & Commitment */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 sm:mb-16 mb-8">
                    {/* Mission */}
                    <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-8 transition-all duration-300 hover:translate-y-[-5px] hover:shadow-2xl">
                        <div className="flex items-center mb-6">
                            <div className="w-8 h-8 sm:w-12 sm:h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                                <FaCheckCircle className="text-[#32dba3] text-[27px]" />
                            </div>
                            <h3 className="text-xl sm:text-3xl font-bold text-gray-800">Our Mission</h3>
                        </div>
                        <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                            We believe that the right investment is the cornerstone of a secure and prosperous life. That is why we are committed to ensuring a safe, profitable, and long-term financial future based on our clients' investments.
                        </p>
                    </div>

                    {/* Commitment */}
                    <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-8 transition-all duration-300 hover:translate-y-[-5px] hover:shadow-2xl">
                        <div className="flex items-center mb-6">
                            <div className="w-8 h-8 sm:w-12 sm:h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">

                                <FaHeart className="text-[#803fd4] text-[27px]" />
                            </div>
                            <h3 className="text-xl sm:text-3xl font-bold text-gray-800">Our Commitment</h3>
                        </div>
                        <p className="text-gray-600 text-sm sm:text-lg leading-relaxed mb-4">
                            To be a trusted partner in fulfilling your financial dreams.
                        </p>
                        <p className="text-gray-600 text-sm sm:text-lg leading-relaxed">
                            Data Price Company Limited is always ready to strengthen and safeguard your investment future with confidence and dedication.
                        </p>
                    </div>
                </section>

                {/* ROI Highlight */}
                <section className="mb-12">
                    <div className="rounded-2xl shadow-lg p-4 sm:p-8 text-white text-center transition-all duration-300 hover:translate-y-[-5px] hover:shadow-2xl" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
                        <h3 className="text-xl sm:text-2xl font-bold mb-4">Return on Investment (ROI)</h3>
                        <p className="text-sm sm:text-lg opacity-90">
                            "If your network is strong, you have the potential to earn up to <span className="text-xl sm:text-3xl font-bold">$100,000</span> in profit."
                        </p>
                    </div>
                </section>
                {/* Investment Opportunities */}
                <section className="mb-16">
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                        <div className="bg-gray-800 text-white p-6">
                            <h3 className="text-2xl font-bold text-center">Investment Opportunities</h3>
                        </div>
                        <div className="p-6">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b-2 border-gray-200">
                                            <th className="text-left py-4 px-6 font-semibold text-gray-800">Investment (USD)</th>
                                            <th className="text-left py-4 px-6 font-semibold text-gray-800">Profit Rate (%)</th>
                                            <th className="text-left py-4 px-6 font-semibold text-gray-800">Profit (USD)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="investment-row border-b border-gray-100">
                                            <td className="py-4 px-6 font-semibold text-blue-600">$50</td>
                                            <td className="py-4 px-6 text-green-600 font-semibold">7%</td>
                                            <td className="py-4 px-6 font-bold text-gray-800">
                                                <div className="flex items-center">
                                                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 11l5-5m0 0l5 5m-5-5v12"></path>
                                                    </svg>
                                                    $3.50
                                                </div>
                                            </td>
                                        </tr>
                                        <tr className="investment-row border-b border-gray-100">
                                            <td className="py-4 px-6 font-semibold text-blue-600">$140</td>
                                            <td className="py-4 px-6 text-green-600 font-semibold">16%</td>
                                            <td className="py-4 px-6 font-bold text-gray-800">
                                                <div className="flex items-center">
                                                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 11l5-5m0 0l5 5m-5-5v12"></path>
                                                    </svg>
                                                    $22.40
                                                </div>
                                            </td>
                                        </tr>
                                        <tr className="investment-row border-b border-gray-100">
                                            <td className="py-4 px-6 font-semibold text-blue-600">$300</td>
                                            <td className="py-4 px-6 text-green-600 font-semibold">33%</td>
                                            <td className="py-4 px-6 font-bold text-gray-800">
                                                <div className="flex items-center">
                                                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 11l5-5m0 0l5 5m-5-5v12"></path>
                                                    </svg>
                                                    $99.00
                                                </div>
                                            </td>
                                        </tr>
                                        <tr className="investment-row">
                                            <td className="py-4 px-6 font-semibold text-blue-600">$800</td>
                                            <td className="py-4 px-6 text-green-600 font-semibold">70%</td>
                                            <td className="py-4 px-6 font-bold text-gray-800">
                                                <div className="flex items-center">
                                                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 11l5-5m0 0l5 5m-5-5v12"></path>
                                                    </svg>
                                                    $560.00
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Additional sections like Investment Table, Secure Payment, CTA can be converted similarly... */}
            </main>
        </div>
    );
};

export default About;
