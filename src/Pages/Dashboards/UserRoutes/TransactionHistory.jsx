// import React from 'react';
// import {
//     Clock,
//     CheckCircle,
//     XCircle,
//     ArrowUpRight,
//     ArrowDownLeft,
//     Gift,
//     TrendingUp,
//     CheckCircle2,
//     Clock3
// } from 'lucide-react';
// import { useData } from '../../contexts/DataContext';
// import { useAuth } from '../../contexts/AuthContext';

// const TransactionHistory = () => {
//     const { user } = useAuth();
//     const { transactions } = useData();

//     const userTransactions = transactions.filter(t => t.userId === user?.id);

//     const getStatusIcon = (status) => {
//         switch (status) {
//             case 'approved':
//                 return <CheckCircle className="h-5 w-5 text-emerald-500" />;
//             case 'rejected':
//                 return <XCircle className="h-5 w-5 text-red-500" />;
//             default:
//                 return <Clock className="h-5 w-5 text-yellow-500" />;
//         }
//     };

//     const getTypeIcon = (type) => {
//         switch (type) {
//             case 'deposit':
//                 return <ArrowUpRight className="h-5 w-5 text-emerald-500" />;
//             case 'withdrawal':
//                 return <ArrowDownLeft className="h-5 w-5 text-blue-500" />;
//             case 'profit':
//                 return <TrendingUp className="h-5 w-5 text-purple-500" />;
//             case 'referral_bonus':
//                 return <Gift className="h-5 w-5 text-pink-500" />;
//             default:
//                 return <Clock className="h-5 w-5 text-gray-500" />;
//         }
//     };

//     const getStatusColor = (status) => {
//         switch (status) {
//             case 'approved':
//                 return 'bg-emerald-100 text-emerald-800';
//             case 'rejected':
//                 return 'bg-red-100 text-red-800';
//             default:
//                 return 'bg-yellow-100 text-yellow-800';
//         }
//     };

//     return (
//         <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 sm:w-full max-w-7xl ">
//             <h3 className="text-xl font-bold text-gray-900 mb-6">Transaction History</h3>

//             {/* No transaction (comment this block if needed) */}

//             <div className="text-center py-8">
//                 <div className="bg-gray-100 p-6 rounded-full w-fit mx-auto mb-4">
//                     <Clock className="h-12 w-12 text-gray-400" />
//                 </div>
//                 <p className="text-gray-500">No transactions yet</p>
//                 <p className="text-sm text-gray-400 mt-1">
//                     Your transaction history will appear here
//                 </p>
//             </div>


//             {/* Hardcoded Transactions */}
//             <div className="space-y-4">
//                 {/* Transaction 1 */}
//                 <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
//                     <div className="flex items-center space-x-4">
//                         <div className="bg-white p-2 rounded-full shadow-sm">
//                             <CheckCircle2 className="w-6 h-6 text-emerald-500" />
//                         </div>
//                         <div>
//                             <p className="font-medium text-gray-900 capitalize">Deposit</p>
//                             <p className="text-sm text-gray-600">Deposit from card</p>
//                             <p className="text-xs text-gray-400">2025-08-01 at 12:30 PM</p>
//                         </div>
//                     </div>

//                     <div className="text-right">
//                         <p className="font-bold text-emerald-600">+$120.00</p>
//                         <div className="flex items-center space-x-2 mt-1">
//                             <CheckCircle2 className="w-4 h-4 text-emerald-500" />
//                             <span className="text-xs px-2 py-1 rounded-full font-medium bg-emerald-100 text-emerald-600">
//                                 completed
//                             </span>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Transaction 2 */}
//                 <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
//                     <div className="flex items-center space-x-4">
//                         <div className="bg-white p-2 rounded-full shadow-sm">
//                             <XCircle className="w-6 h-6 text-red-500" />
//                         </div>
//                         <div>
//                             <p className="font-medium text-gray-900 capitalize">Withdrawal</p>
//                             <p className="text-sm text-gray-600">Withdraw to bank</p>
//                             <p className="text-xs text-gray-400">2025-07-28 at 09:15 AM</p>
//                         </div>
//                     </div>

//                     <div className="text-right">
//                         <p className="font-bold text-red-600">-$75.00</p>
//                         <div className="flex items-center space-x-2 mt-1">
//                             <XCircle className="w-4 h-4 text-red-500" />
//                             <span className="text-xs px-2 py-1 rounded-full font-medium bg-red-100 text-red-600">
//                                 failed
//                             </span>
//                         </div>
//                     </div>
//                 </div>

//                 {/* View All Button */}
//                 <div className="text-center pt-4">
//                     <button className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors duration-200">
//                         View All Transactions
//                     </button>
//                 </div>
//             </div>
//         </div>
//         // <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
//         //   <h3 className="text-xl font-bold text-gray-900 mb-6">Transaction History</h3>

//         //   {userTransactions.length === 0 ? (
//         //     <div className="text-center py-8">
//         //       <div className="bg-gray-100 p-6 rounded-full w-fit mx-auto mb-4">
//         //         <Clock className="h-12 w-12 text-gray-400" />
//         //       </div>
//         //       <p className="text-gray-500">No transactions yet</p>
//         //       <p className="text-sm text-gray-400 mt-1">
//         //         Your transaction history will appear here
//         //       </p>
//         //     </div>
//         //   ) : (
//         //     <div className="space-y-4">
//         //       {userTransactions.slice(0, 5).map((transaction) => (
//         //         <div
//         //           key={transaction.id}
//         //           className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
//         //         >
//         //           <div className="flex items-center space-x-4">
//         //             <div className="bg-white p-2 rounded-full shadow-sm">
//         //               {getTypeIcon(transaction.type)}
//         //             </div>
//         //             <div>
//         //               <p className="font-medium text-gray-900 capitalize">
//         //                 {transaction.type.replace('_', ' ')}
//         //               </p>
//         //               <p className="text-sm text-gray-600">{transaction.description}</p>
//         //               <p className="text-xs text-gray-400">
//         //                 {new Date(transaction.createdAt).toLocaleDateString()} at{' '}
//         //                 {new Date(transaction.createdAt).toLocaleTimeString()}
//         //               </p>
//         //             </div>
//         //           </div>

//         //           <div className="text-right">
//         //             <p
//         //               className={`font-bold ${
//         //                 transaction.type === 'deposit' ||
//         //                 transaction.type === 'profit' ||
//         //                 transaction.type === 'referral_bonus'
//         //                   ? 'text-emerald-600'
//         //                   : 'text-red-600'
//         //               }`}
//         //             >
//         //               {transaction.type === 'withdrawal' ? '-' : '+'}${transaction.amount.toFixed(2)}
//         //             </p>
//         //             <div className="flex items-center space-x-2 mt-1">
//         //               {getStatusIcon(transaction.status)}
//         //               <span
//         //                 className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(
//         //                   transaction.status
//         //                 )}`}
//         //               >
//         //                 {transaction.status}
//         //               </span>
//         //             </div>
//         //           </div>
//         //         </div>
//         //       ))}

//         //       {userTransactions.length > 5 && (
//         //         <div className="text-center pt-4">
//         //           <button className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors duration-200">
//         //             View All Transactions
//         //           </button>
//         //         </div>
//         //       )}
//         //     </div>
//         //   )}
//         // </div>
//     );
// };

// export default TransactionHistory;



import { useQuery } from '@tanstack/react-query';
import {
    Clock,
    CheckCircle,
    ArrowDownLeft,
    ArrowUpRight
} from 'lucide-react';
import useDbUser from '../../../Hooks/useDbUser';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';


const TransactionHistory = () => {
    const { dbUser } = useDbUser();
    const axiosSecure = useAxiosSecure();


    // API কলের জন্য React Query useQuery hook
    const { data: history = [], error, isLoading } = useQuery({
        queryKey: ['transactions', dbUser._id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/api/transactions/user/${dbUser._id}`);
            return res.data.transactions;
        }
    });


    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading transactions</div>;

    // fetched transactions
    const transactions = history || [];
    // console.log(transactions)

    // icon, color ইত্যাদি assign করার জন্য একটা হেল্পার ফাংশন
    const getTxDetails = (tx) => {
        let icon = null;
        let iconBg = '';
        let amountColor = '';
        let badgeColor = '';

        if (tx.type === 'deposit') {
            icon = <ArrowDownLeft className="w-6 h-6 text-green-600" />;
            iconBg = 'bg-green-100';
            badgeColor = 'bg-green-100 text-green-800';

            // ✅ deposit হলে color status অনুযায়ী
            if (tx.status === 'pending') {
                amountColor = 'text-red-600'; // pending deposit = red
            } else {
                amountColor = 'text-green-600'; // approved deposit = green
            }

        } else if (tx.type === 'withdraw') {
            icon = <ArrowUpRight className="w-6 h-6 text-red-600" />;
            iconBg = 'bg-red-100';
            amountColor = 'text-red-600'; // সবসময় লাল
            badgeColor = 'bg-red-100 text-red-800';

        } else {
            icon = <Clock className="w-6 h-6 text-gray-500" />;
            iconBg = 'bg-gray-100';
            amountColor = 'text-gray-500';
            badgeColor = 'bg-gray-100 text-gray-700';
        }

        return { icon, iconBg, amountColor, badgeColor };
    };


    return (
        <div className="bg-white rounded-2xl shadow-xs p-4 max-w-7xl mt-10 border border-gray-50 mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Transaction History</h2>
            <div className="space-y-4">
                {transactions.length === 0 && (
                    <p className="text-center text-gray-500">No transactions found.</p>
                )}
                {transactions.map((tx) => {
                    const { icon, iconBg, amountColor, badgeColor } = getTxDetails(tx);
                    // date formatting (optional)
                    const date = new Date(tx.createdAt).toLocaleDateString();

                    return (
                        <div
                            key={tx._id}
                            className="flex flex-col sm:flex-row justify-between items-start md:items-center p-4 bg-gray-100 rounded-xl"
                        >
                            <div className="flex items-start sm:items-center space-x-4 w-full md:w-auto">
                                <div className={`p-3 rounded-full ${iconBg}`}>
                                    {icon}
                                </div>
                                <div>
                                    <p className="text-lg font-semibold text-gray-800 capitalize">{tx.type}</p>
                                    <p className="text-sm text-gray-600">{tx.description || '-'}</p>
                                    <p className="text-xs text-gray-500">{date}</p>
                                </div>
                            </div>

                            <div className="mt-4 md:mt-0 text-right w-full md:w-auto">
                                <p className={`font-bold text-lg ${amountColor}`}>
                                    {tx.type === 'deposit' ? '+' : '-'}${tx.amount.toFixed(2)}
                                </p>
                                <div className={`inline-flex items-center gap-1 mt-1 text-sm px-3 py-1 rounded-full font-medium capitalize ${badgeColor}`}>
                                    {tx.status === 'approved' && <CheckCircle className="w-4 h-4" />}
                                    {tx.status === 'pending' && <Clock className="w-4 h-4" />}
                                    <span className="ml-1">{tx.status}</span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default TransactionHistory;

