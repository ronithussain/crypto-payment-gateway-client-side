import { useQuery } from '@tanstack/react-query';
import {
    Clock,
    CheckCircle,
    ArrowDownLeft,
    ArrowUpRight
} from 'lucide-react';
import useDbUser from '../../../Hooks/useDbUser';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useState } from 'react';

const TransactionHistory = () => {
    const { dbUser } = useDbUser();
    const axiosSecure = useAxiosSecure();

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

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

    const transactions = history || [];

    // Pagination calculations
    const totalPages = Math.ceil(transactions.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentTransactions = transactions.slice(startIndex, endIndex);

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

            if (tx.status === 'pending') {
                amountColor = 'text-red-600'; 
            } else {
                amountColor = 'text-green-600'; 
            }

        } else if (tx.type === 'withdraw') {
            icon = <ArrowUpRight className="w-6 h-6 text-red-600" />;
            iconBg = 'bg-red-100';
            amountColor = 'text-red-600'; 
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

                {currentTransactions.map((tx) => {
                    const { icon, iconBg, amountColor, badgeColor } = getTxDetails(tx);
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

            {/* Pagination Controls */}
            {transactions.length > itemsPerPage && (
                <div className="flex justify-center mt-6 space-x-2">
                    <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                    >
                        Prev
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`px-3 py-1 rounded ${page === currentPage ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                        >
                            {page}
                        </button>
                    ))}

                    <button
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default TransactionHistory;
