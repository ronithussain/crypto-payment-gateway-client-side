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
// // import { useData } from '../../contexts/DataContext';
// // import { useAuth } from '../../contexts/AuthContext';

// const TransactionHistory = () => {
//     //   const { user } = useAuth();
//     //   const { transactions } = useData();

//     //   const userTransactions = transactions.filter(t => t.userId === user?.id);

//     //   const getStatusIcon = (status) => {
//     //     switch (status) {
//     //       case 'approved':
//     //         return <CheckCircle className="h-5 w-5 text-emerald-500" />;
//     //       case 'rejected':
//     //         return <XCircle className="h-5 w-5 text-red-500" />;
//     //       default:
//     //         return <Clock className="h-5 w-5 text-yellow-500" />;
//     //     }
//     //   };

//     //   const getTypeIcon = (type) => {
//     //     switch (type) {
//     //       case 'deposit':
//     //         return <ArrowUpRight className="h-5 w-5 text-emerald-500" />;
//     //       case 'withdrawal':
//     //         return <ArrowDownLeft className="h-5 w-5 text-blue-500" />;
//     //       case 'profit':
//     //         return <TrendingUp className="h-5 w-5 text-purple-500" />;
//     //       case 'referral_bonus':
//     //         return <Gift className="h-5 w-5 text-pink-500" />;
//     //       default:
//     //         return <Clock className="h-5 w-5 text-gray-500" />;
//     //     }
//     //   };

//     //   const getStatusColor = (status) => {
//     //     switch (status) {
//     //       case 'approved':
//     //         return 'bg-emerald-100 text-emerald-800';
//     //       case 'rejected':
//     //         return 'bg-red-100 text-red-800';
//     //       default:
//     //         return 'bg-yellow-100 text-yellow-800';
//     //     }
//     //   };

//     return (
//         <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 sm:w-full max-w-7xl ">
//             <h3 className="text-xl font-bold text-gray-900 mb-6">Transaction History</h3>

//             {/* No transaction (comment this block if needed) */}
//             {/* 
//       <div className="text-center py-8">
//         <div className="bg-gray-100 p-6 rounded-full w-fit mx-auto mb-4">
//           <Clock className="h-12 w-12 text-gray-400" />
//         </div>
//         <p className="text-gray-500">No transactions yet</p>
//         <p className="text-sm text-gray-400 mt-1">
//           Your transaction history will appear here
//         </p>
//       </div>
//       */}

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


import {
    Clock,
    CheckCircle,
    ArrowDownLeft,
    ArrowUpRight
} from 'lucide-react';

const transactions = [
    {
        id: 1,
        type: 'Task Reward',
        description: 'Task completed: Daily Login Bonus',
        date: '8/2/2025 at 6:58:13 PM',
        amount: 5.0,
        status: 'approved',
        icon: <Clock className="text-gray-500" />,
        amountColor: 'text-red-600',
        badgeColor: 'bg-green-100 text-green-700',
        iconBg: 'bg-gray-100'
    },
    {
        id: 2,
        type: 'Deposit',
        description: 'Initial deposit',
        date: '8/1/2025 at 6:56:53 PM',
        amount: 500.0,
        status: 'approved',
        icon: <ArrowUpRight className="text-green-500" />,
        amountColor: 'text-green-600',
        badgeColor: 'bg-green-100 text-green-700',
        iconBg: 'bg-green-50'
    },
    {
        id: 3,
        type: 'Withdrawal',
        description: 'Withdrawal request',
        date: '8/2/2025 at 5:56:53 PM',
        amount: 200.0,
        status: 'pending',
        icon: <ArrowDownLeft className="text-blue-500" />,
        amountColor: 'text-red-600',
        badgeColor: 'bg-yellow-100 text-yellow-700',
        iconBg: 'bg-blue-50'
    }
];

const TransactionHistoryCard = () => {
    return (
        <div className="bg-white rounded-2xl shadow-lg p-6 max-w-7xl mt-10 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Transaction History</h2>
            <div className="space-y-4">
                {transactions.map((tx) => (
                    <div
                        key={tx.id}
                        className="flex flex-col sm:flex-row justify-between items-start md:items-center p-4 bg-gray-100 rounded-xl"
                    >
                        <div className="flex items-start sm:items-center space-x-4 w-full md:w-auto">
                            <div className={`p-3 rounded-full ${tx.iconBg}`}>
                                {tx.icon}
                            </div>
                            <div>
                                <p className="text-lg font-semibold text-gray-800">{tx.type}</p>
                                <p className="text-sm text-gray-600">{tx.description}</p>
                                <p className="text-xs text-gray-500">{tx.date}</p>
                            </div>
                        </div>

                        <div className="mt-4 md:mt-0 text-right w-full md:w-auto">
                            <p className={`font-bold text-lg ${tx.amountColor}`}>
                                {tx.amountColor.includes('green') ? '+' : '-'}${tx.amount.toFixed(2)}
                            </p>
                            <div className="inline-flex items-center gap-1 mt-1 text-sm px-3 py-1 rounded-full font-medium capitalize 
                ${tx.badgeColor}">
                                {tx.status === 'approved' && <CheckCircle className="w-4 h-4" />}
                                {tx.status === 'pending' && <Clock className="w-4 h-4" />}
                                <span className="ml-1">{tx.status}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TransactionHistoryCard;
