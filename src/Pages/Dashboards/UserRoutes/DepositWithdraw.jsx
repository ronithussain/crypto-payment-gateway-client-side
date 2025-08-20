import { useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { FaCreditCard, FaMoneyBillWave } from 'react-icons/fa6';
import toast from 'react-hot-toast';
import useAuth from '../../../Hooks/UseAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import PurchaseInfo from './PurchaseInfo';
import { useNavigate } from 'react-router-dom';
import TransactionHistory from './TransactionHistory';



const DepositWithdraw = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState('deposit');
    const [amount, setAmount] = useState('');
    const [paymentMethod, setPaymentMethod] = useState("");
    const [walletAddress, setWalletAddress] = useState(''); //withdraw state

    const [isProcessing, setIsProcessing] = useState(false);

    // Local system settings
    const systemSettings = {
        minDeposit: 50,
        withdrawalFee: 0.05 // ৫% ফি
    };

    const { data: dbUser = {}, } = useQuery({
        queryKey: ['dbUser', user?.email],
        enabled: !!user?.email, // wait for email to be available
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/email/${user.email}`);
            return res.data;
        }
    });

    // console.log(dbUser)

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!dbUser || !amount) return;
        const numAmount = Number(parseFloat(amount).toFixed(2));

        if (activeTab === 'deposit' && numAmount < systemSettings.minDeposit) {
            toast.error(`Deposit must be at least $${systemSettings.minDeposit}`);
            return;
        }

        if (
            activeTab === 'withdraw' &&
            ['bitcoin', 'usdt', 'ethereum'].includes(paymentMethod) &&
            !walletAddress.trim()
        ) {
            toast.error("Wallet address is required for crypto withdrawals!");
            return;
        }

        // 🟢 Withdrawal validation - check balance with fee
        // if (activeTab === 'withdraw') {
        //     const fee = numAmount * systemSettings.withdrawalFee;
        //     const totalDeduction = numAmount + fee;

        //     if ((dbUser.balance || 0) < totalDeduction) {
        //         toast.error(`Insufficient balance. You need $${totalDeduction.toFixed(2)} including fee.`);
        //         return;
        //     }
        // }
        if (activeTab === 'withdraw') {
            const totalDeduction = numAmount; // fee বাদ দিয়ে শুধু amount চেক করো
            if ((dbUser.balance || 0) < totalDeduction) {
                toast.error(`Insufficient balance. You need at least $${totalDeduction.toFixed(2)}.`);
                return;
            }
        }


        setIsProcessing(true);

        const payload = {
            email: user?.email,
            name: user?.displayName,
            userId: dbUser?._id?.toString(), // string type userId
            type: activeTab,
            amount: numAmount,
            description: `${activeTab} request`,
            walletAddress: activeTab === 'withdraw' ? walletAddress : '',
            paymentMethod,
        };
        // console.log(payload);
        axiosSecure
            .post('/api/transactions', payload)
            .then((res) => {
                if (res.data.insertedId || res.data.success) {
                    if (activeTab === 'withdraw') {
                        // ✅ শুধু withdraw হলে toast দেখাবে
                        toast.success('Withdrawal submitted successfully!');
                    }

                    setAmount('');

                    // ✅ শুধু deposit হলে redirect হবে
                    if (activeTab === 'deposit') {
                        const transactionId = res.data.insertedId;

                        if (paymentMethod === 'bitcoin') {
                            navigate(`/dashboard/payment/bitcoin?transactionId=${transactionId}`);
                        } else if (paymentMethod === 'usdt') {
                            navigate(`/dashboard/payment/usdt?transactionId=${transactionId}`);
                        } else if (paymentMethod === 'ethereum') {
                            navigate(`/dashboard/payment/ethereum?transactionId=${transactionId}`);
                        }
                    }
                } else {
                    toast.error('Something went wrong!');
                }
                // console.log(res, 'deposit/withdraw data successful ');
            })
            .catch((err) => {
                if (err.response) {
                    console.error('Axios error response data:', err.response.data);

                    // ✅ NEW: Special handling for task completion error
                    if (err.response.data.error === 'Please complete tasks 1 to 50 before withdrawing') {
                        const currentProgress = err.response.data.taskProgress || 0;
                        toast.error(`Please complete tasks 1 to 50 before withdrawing. Current progress: ${currentProgress}/50`);
                    } else {
                        toast.error(err.response.data.error || 'Failed to submit transaction');
                    }
                } else {
                    console.error('Axios error:', err);
                    toast.error('Failed to submit transaction');
                }
                setIsProcessing(false); // ✅ Add this line to reset processing state
            });



    };


    // handlePaymentChange function...
    const handlePaymentChange = (e) => {
        const selected = e.target.value;
        setPaymentMethod(selected);
    };


    return (
        <>
            <div>
                <div className="bg-white rounded-xl shadow-lg p-4 sm:mt-8 border border-gray-100 max-w-7xl mx-auto">
                    <PurchaseInfo></PurchaseInfo>
                    <h3 className="text-xl font-bold text-gray-900 my-6">Financial Operations</h3>

                    {/* Tab Buttons */}
                    <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
                        <button
                            onClick={() => setActiveTab('deposit')}
                            className={`flex-1 flex items-center justify-center space-x-1 py-2 px-3 rounded-md font-medium transition-all duration-200 ${activeTab === 'deposit' ? 'bg-emerald-500 text-white shadow-md' : 'text-gray-600 hover:text-emerald-600'}`}
                        >
                            <FaPlus className="h-4 w-4" />
                            <span>Deposit</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('withdraw')}
                            className={`flex-1 flex items-center justify-center space-x-1 py-2 px-3 rounded-md font-medium transition-all duration-200 ${activeTab === 'withdraw' ? 'bg-blue-500 text-white shadow-md' : 'text-gray-600 hover:text-blue-600'}`}
                        >
                            <FaMinus className="h-4 w-4" />
                            <span>Withdraw</span>
                        </button>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Amount Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Amount ($)</label>
                            <div className="relative">
                                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">$</div>
                                <input
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                    placeholder="Enter Amount . . ."
                                    required
                                />
                            </div>
                            <div className="mt-2 text-sm text-gray-500">
                                {activeTab === 'deposit' ? `Min: $${systemSettings.minDeposit}` : ""}
                            </div>
                        </div>

                        {/* Payment Method Dropdown */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
                            <select
                                value={paymentMethod}
                                onChange={handlePaymentChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                required
                            >
                                <option value="" disabled>$ Crypto Credit</option>
                                <option value="bitcoin">Bitcoin</option>
                                <option value="usdt">USDT (TRC20)</option>
                                <option value="ethereum">Ethereum (ERC20)</option>
                            </select>
                        </div>

                        {/* Wallet Address Input - ONLY for Withdrawal and if bitcoin/ethereum is selected */}
                        {activeTab === 'withdraw' && (paymentMethod === 'bitcoin' || paymentMethod === 'usdt' || paymentMethod === 'ethereum') && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    {paymentMethod === 'bitcoin' ? 'Enter your Bitcoin wallet' :
                                        paymentMethod === 'usdt' ? 'Enter your USDT wallet (TRC20)' :
                                            'Enter your Ethereum wallet (ERC20)'}
                                </label>

                                <input
                                    type="text"
                                    value={walletAddress}
                                    onChange={(e) => setWalletAddress(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                    placeholder={
                                        paymentMethod === 'bitcoin'
                                            ? 'e.g. bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh'
                                            : paymentMethod === 'usdt'
                                                ? 'e.g. TLYpXnU4RZ88zKW4pKDEzKHkMbeLqXu4L6'
                                                : 'e.g. 0x3e8b2c0a7b6c6eeed0e111f2a118d7380e0c2fbd'
                                    }
                                    required
                                />

                            </div>
                        )}


                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isProcessing || !amount || !paymentMethod}
                            className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all duration-200 ${activeTab === 'deposit'
                                ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700'
                                : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700'
                                } disabled:opacity-50 disabled:cursor-not-allowed`}
                        >
                            {isProcessing ? 'Processing...' : `Submit ${activeTab === 'deposit' ? 'Deposit' : 'Withdrawal'}`}
                        </button>
                    </form>


                    {/* Info */}
                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                            {activeTab === 'deposit' ? (
                                <FaCreditCard className="h-5 w-5 text-emerald-600" />
                            ) : (
                                <FaMoneyBillWave className="h-5 w-5 text-blue-600" />
                            )}
                            <span className="font-medium text-gray-900">
                                {activeTab === 'deposit' ? 'Deposit Info' : 'Withdrawal Info'}
                            </span>
                        </div>
                        <p className="text-sm text-gray-600">
                            {activeTab === 'deposit'
                                ? 'Deposits are processed instantly.'
                                : `Withdrawals require admin approval and will incur a ${(systemSettings.withdrawalFee * 100).toFixed(1)}% fee.`}
                        </p>
                    </div>
                    <TransactionHistory></TransactionHistory>
                </div>
            </div>

        </>
    );
};

export default DepositWithdraw;



