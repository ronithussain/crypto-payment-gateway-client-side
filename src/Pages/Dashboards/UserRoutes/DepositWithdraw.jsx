import { useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { FaCreditCard, FaMoneyBillWave } from 'react-icons/fa6';
import toast from 'react-hot-toast';
import useAuth from '../../../Hooks/UseAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import TransactionHistoryCard from './TransactionHistory';



const DepositWithdraw = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const [activeTab, setActiveTab] = useState('deposit');
    const [amount, setAmount] = useState('');
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
        const numAmount = parseFloat(amount);

        // Validation
        if (activeTab === 'deposit') {
            if (numAmount < systemSettings.minDeposit) {
                alert(`Deposit must be between $${systemSettings.minDeposit}`);
                return;
            }
        } else {
            // if (numAmount < systemSettings.minWithdrawal || numAmount > systemSettings.maxWithdrawal) {
            //     alert(`Withdrawal must be between $${systemSettings.minWithdrawal} and $${systemSettings.maxWithdrawal}`);
            //     return;
            // }
        }

        setIsProcessing(true);

        const payload = {
            email: user?.email,
            name: user?.displayName,
            userId: dbUser?._id,
            type: activeTab,
            amount: numAmount,
            status: activeTab === 'deposit' ? 'approved' : 'pending',
            description: `${activeTab} request`,
        };
        console.log('User:', dbUser, dbUser._id);

        axiosSecure.post('/api/deposit', payload)
            .then((res) => {
                if (res.data.insertedId || res.data.success) {
                    toast.success(`${activeTab === 'deposit' ? 'Deposit' : 'Withdrawal'} submitted successfully!`);
                    setAmount('');
                } else {
                    toast.error('Something went wrong!');
                }
            })
            .catch((err) => {
                console.error(err);
                toast.error('Failed to submit transaction');
            })
            .finally(() => {
                setIsProcessing(false);
            });
        console.log(payload);
    };

    return (
        <>
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 max-w-7xl mx-auto">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Financial Operations</h3>

                {/* Tab Buttons */}
                <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
                    <button
                        onClick={() => setActiveTab('deposit')}
                        className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md font-medium transition-all duration-200 ${activeTab === 'deposit' ? 'bg-emerald-500 text-white shadow-md' : 'text-gray-600 hover:text-emerald-600'}`}
                    >
                        <FaPlus className="h-4 w-4" />
                        <span>Deposit</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('withdraw')}
                        className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md font-medium transition-all duration-200 ${activeTab === 'withdraw' ? 'bg-blue-500 text-white shadow-md' : 'text-gray-600 hover:text-blue-600'}`}
                    >
                        <FaMinus className="h-4 w-4" />
                        <span>Withdraw</span>
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
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
                                placeholder="0.00"
                                required
                            />
                        </div>
                        <div className="mt-2 text-sm text-gray-500">
                            {activeTab === 'deposit'
                                ? `Min: $${systemSettings.minDeposit}`
                                : ""}
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isProcessing || !amount}
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
            </div>
<TransactionHistoryCard></TransactionHistoryCard>
        </>
    );
};

export default DepositWithdraw;



