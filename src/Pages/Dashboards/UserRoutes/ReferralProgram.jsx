// import React, { useState } from 'react';
import { Users, Gift, Copy, Check } from 'lucide-react';

const ReferralProgram = () => {
    // Mock user data - replace with your actual data source
    //   const user = {
    //     referralCode: 'JD2024X7B',
    //     referrals: 12
    //   };

    //   // This would come from your backend/API
    //   const systemSettings = {
    //     referralBonus: 10
    //   };

    //   const [copied, setCopied] = useState(false);

    //   const referralLink = https://platform.com/register?ref=${user?.referralCode};

    //   const copyToClipboard = async () => {
    //     try {
    //       await navigator.clipboard.writeText(referralLink);
    //       setCopied(true);
    //       setTimeout(() => setCopied(false), 2000);
    //     } catch (error) {
    //       console.error('Failed to copy:', error);
    //     }
    //   };

    return (
        <div className='max-w-7xl mx-auto sm:px-0 px-2'>
            <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border border-gray-100 ">
                {/* Header */}
                <div className="text-center mb-6">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-full w-fit mx-auto mb-4">
                        <Gift className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900">Referral Program</h3>
                    <p className="text-gray-600 mt-2 text-sm sm:text-base">
                        Earn $10 for each friend you refer!
                    </p>
                </div>

                <div className="space-y-6">
                    {/* Referral Code Box */}
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3">
                            <span className="font-medium text-gray-900 mb-2 sm:mb-0">Your Referral Code</span>
                            <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-mono w-fit">
                                ABC12345
                            </span>
                        </div>

                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 mb-3">
                            <input
                                type="text"
                                value="https://yourapp.com/ref/ABC12345"
                                readOnly
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm"
                            />
                            <button className="flex items-center justify-center space-x-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors duration-200 whitespace-nowrap">
                                <Copy className="h-4 w-4" />
                                <span className="text-sm">Copy</span>
                            </button>
                        </div>
                    </div>

                    {/* Referral Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                            <Users className="h-6 w-6 sm:h-8 sm:w-8 text-purple-500 mx-auto mb-2" />
                            <p className="text-xl sm:text-2xl font-bold text-gray-900">5</p>
                            <p className="text-sm text-gray-600">Total Referrals</p>
                        </div>

                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                            <Gift className="h-6 w-6 sm:h-8 sm:w-8 text-emerald-500 mx-auto mb-2" />
                            <p className="text-xl sm:text-2xl font-bold text-gray-900">$50.00</p>
                            <p className="text-sm text-gray-600">Earned</p>
                        </div>
                    </div>

                    {/* How It Works */}
                    <div className="p-4 bg-blue-50 rounded-lg">
                        <h4 className="font-medium text-blue-900 mb-2">How it works:</h4>
                        <ul className="text-sm text-blue-800 space-y-1">
                            <li>• Share your referral link with friends</li>
                            <li>• They sign up using your code</li>
                            <li>• You both earn $10 bonus</li>
                            <li>• No limit on referrals!</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        // <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border border-gray-100 max-w-4xl mx-auto">
        //     <div className="text-center mb-6">
        //         <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-full w-fit mx-auto mb-4">
        //             <Gift className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
        //         </div>
        //         <h3 className="text-lg sm:text-xl font-bold text-gray-900">Referral Program</h3>
        //         <p className="text-gray-600 mt-2 text-sm sm:text-base">
        //             Earn ${systemSettings.referralBonus} for each friend you refer!
        //         </p>
        //     </div>

        //     <div className="space-y-6">
        //         <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg">
        //             <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3">
        //                 <span className="font-medium text-gray-900 mb-2 sm:mb-0">Your Referral Code</span>
        //                 <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-mono w-fit">
        //                     {user?.referralCode}
        //                 </span>
        //             </div>

        //             <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 mb-3">
        //                 <input
        //                     type="text"
        //                     value={referralLink}
        //                     readOnly
        //                     className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm"
        //                 />
        //                 <button
        //                     onClick={copyToClipboard}
        //                     className="flex items-center justify-center space-x-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors duration-200 whitespace-nowrap"
        //                 >
        //                     {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        //                     <span className="text-sm">{copied ? 'Copied!' : 'Copy'}</span>
        //                 </button>
        //             </div>
        //         </div>

        //         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        //             <div className="text-center p-4 bg-gray-50 rounded-lg">
        //                 <Users className="h-6 w-6 sm:h-8 sm:w-8 text-purple-500 mx-auto mb-2" />
        //                 <p className="text-xl sm:text-2xl font-bold text-gray-900">{user?.referrals || 0}</p>
        //                 <p className="text-sm text-gray-600">Total Referrals</p>
        //             </div>

        //             <div className="text-center p-4 bg-gray-50 rounded-lg">
        //                 <Gift className="h-6 w-6 sm:h-8 sm:w-8 text-emerald-500 mx-auto mb-2" />
        //                 <p className="text-xl sm:text-2xl font-bold text-gray-900">
        //                     ${((user?.referrals || 0) * systemSettings.referralBonus).toFixed(2)}
        //                 </p>
        //                 <p className="text-sm text-gray-600">Earned</p>
        //             </div>
        //         </div>

        //         <div className="p-4 bg-blue-50 rounded-lg">
        //             <h4 className="font-medium text-blue-900 mb-2">How it works:</h4>
        //             <ul className="text-sm text-blue-800 space-y-1">
        //                 <li>• Share your referral link with friends</li>
        //                 <li>• They sign up using your code</li>
        //                 <li>• You both earn ${systemSettings.referralBonus} bonus</li>
        //                 <li>• No limit on referrals!</li>
        //             </ul>
        //         </div>
        //     </div>
        // </div>
    );
};

export default ReferralProgram;