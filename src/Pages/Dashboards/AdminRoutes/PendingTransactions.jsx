import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useState } from 'react';
import { Search, ChevronDown, ChevronLeft, ChevronRight, DollarSign, Mail } from 'lucide-react';

const PendingTransactions = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const [openDropdown, setOpenDropdown] = useState(null);
    const [selectedScreenshot, setSelectedScreenshot] = useState(null);
    const [transactionSearchTerm, setTransactionSearchTerm] = useState('');

    // Pagination states
    const [currentTransactionPage, setCurrentTransactionPage] = useState(1);
    const itemsPerPage = 5;

    // Fetch transactions
    const { data: transactions = [], isLoading } = useQuery({
        queryKey: ['pendingTransactions'],
        queryFn: async () => {
            const res = await axiosSecure.get('/api/transactions/pending');
            return res.data;
        }
    });

    // Mutation for approve/decline
    const mutation = useMutation({
        mutationFn: async ({ id, status }) => {
            const res = await axiosSecure.patch(`/api/transactions/${status}/${id}`);
            return res.data;
        },
        onSuccess: () => {
            toast.success('Transaction updated!');
            queryClient.invalidateQueries(['pendingTransactions']);
        },
        onError: () => {
            toast.error('Update failed!');
        }
    });

    // Close dropdown when clicking outside
    const handleOutsideClick = () => {
        setOpenDropdown(null);
    };

    // Filter function (safe checks with optional chaining)
    const filteredTransactions = transactions.filter(transaction => {
        const search = transactionSearchTerm.toLowerCase();
        return (
            transaction.userName?.toLowerCase().includes(search) ||
            transaction.userEmail?.toLowerCase().includes(search) ||
            transaction.type?.toLowerCase().includes(search) ||
            transaction.method?.toLowerCase().includes(search) ||
            transaction.status?.toLowerCase().includes(search) ||
            transaction.amount?.toString().includes(search) ||
            transaction.dateTime?.includes(search)
        );
    });

    // Pagination calculations
    const totalTransactionPages = Math.ceil(filteredTransactions.length / itemsPerPage);
    const startTransactionIndex = (currentTransactionPage - 1) * itemsPerPage;
    const endTransactionIndex = startTransactionIndex + itemsPerPage;
    const currentTransactions = filteredTransactions.slice(startTransactionIndex, endTransactionIndex);

    // Reset to first page when search changes
    const handleTransactionSearch = (term) => {
        setTransactionSearchTerm(term);
        setCurrentTransactionPage(1);
    };

    if (isLoading) return <p className="p-4">Loading...</p>;

    return (
        <div className="min-h-screen bg-gray-100 rounded-2xl" onClick={handleOutsideClick}>
            {/* Header */}
            <div className="bg-white shadow-sm rounded-2xl">
                <div className="px-4 py-3 sm:px-6 sm:py-4">
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Deposit & Withdrawal Management</h1>
                    <p className="text-sm sm:text-base text-gray-600">Manage financial transactions</p>
                </div>
            </div>

            <div className="p-3 sm:p-6">
                <div className="space-y-4 sm:space-y-6">
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Transaction Management</h2>

                    {/* Transaction Search */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search transactions..."
                            value={transactionSearchTerm}
                            onChange={(e) => handleTransactionSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        />
                    </div>

                    {/* Transactions List */}
                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        {/* Mobile Cards */}
                        <div className="block lg:hidden space-y-3 p-4">
                            {currentTransactions.length === 0 ? (
                                <div className="text-center py-8 text-gray-500">
                                    <DollarSign className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                                    <p>No transactions found</p>
                                </div>
                            ) : (
                                currentTransactions.map((transaction) => (
                                    <div key={transaction.id} className="bg-gray-50 rounded-lg p-4">
                                        <div className="flex items-start justify-between mb-3">
                                            <div>
                                                <div className="text-sm font-medium text-gray-900">{transaction.userName}</div>
                                                <div className="text-xs text-gray-500 flex items-center">
                                                    <Mail className="w-3 h-3 mr-1" />
                                                    {transaction.userEmail}
                                                </div>
                                            </div>
                                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${transaction.type === 'deposit' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                                                {transaction.type}
                                            </span>
                                        </div>

                                        <div className="grid grid-cols-2 gap-3 mb-3 text-xs">
                                            <div>
                                                <span className="text-gray-500">Amount:</span>
                                                <div className="font-semibold text-gray-900">৳{Number(transaction.amount || 0).toLocaleString()}</div>
                                            </div>
                                            <div>
                                                <span className="text-gray-500">Method:</span>
                                                <div className="text-gray-900">{transaction.method}</div>
                                            </div>
                                            <div>
                                                <span className="text-gray-500">Date:</span>
                                                <div className="text-gray-900">{transaction.dateTime?.split(' ')[0]}</div>
                                            </div>
                                            <div>
                                                <span className="text-gray-500">Time:</span>
                                                <div className="text-gray-900">{transaction.dateTime?.split(' ')[1]}</div>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between mb-3">
                                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${transaction.status === 'approved' ? 'bg-green-100 text-green-800' :
                                                transaction.status === 'declined' ? 'bg-red-100 text-red-800' :
                                                    'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                {transaction.status}
                                            </span>

                                            {transaction.screenshot ? (
                                                <button
                                                    onClick={() => setSelectedScreenshot(transaction.screenshot)}
                                                    className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs hover:bg-blue-200"
                                                >
                                                    View Proof
                                                </button>
                                            ) : (
                                                <span className="text-gray-400 text-xs">No Proof</span>
                                            )}
                                        </div>

                                        {transaction.status === 'pending' && (
                                            <div className="relative" onClick={(e) => e.stopPropagation()}>
                                                <button
                                                    onClick={() => setOpenDropdown(openDropdown === `trans-${transaction.id}` ? null : `trans-${transaction.id}`)}
                                                    className="w-full bg-gray-100 text-gray-700 px-3 py-2 rounded text-sm font-medium hover:bg-gray-200 flex items-center justify-center"
                                                >
                                                    Actions
                                                    <ChevronDown className="w-4 h-4 ml-1" />
                                                </button>

                                                {openDropdown === `trans-${transaction.id}` && (
                                                    <div className="absolute left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-20">
                                                        <div className="py-1">
                                                            <button
                                                                onClick={() => mutation.mutate({ id: transaction.id, status: 'approve' })}
                                                                className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-green-600"
                                                            >
                                                                Approve
                                                            </button>
                                                            <button
                                                                onClick={() => mutation.mutate({ id: transaction.id, status: 'decline' })}
                                                                className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-600"
                                                            >
                                                                Decline
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Desktop Table */}
                        <div className="hidden lg:block overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Method</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date & Time</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Proof</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {currentTransactions.length === 0 ? (
                                        <tr>
                                            <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
                                                <DollarSign className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                                                <p>No transactions found</p>
                                            </td>
                                        </tr>
                                    ) : (
                                        currentTransactions.map((transaction) => (
                                            <tr key={transaction.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div>
                                                        <div className="text-sm font-medium text-gray-900">{transaction.userName}</div>
                                                        <div className="text-sm text-gray-500 flex items-center">
                                                            <Mail className="w-3 h-3 mr-1" />
                                                            {transaction.userEmail}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 inline-flex text-xs font-semibold rounded-full ${transaction.type === 'deposit' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                                                        {transaction.type}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    ${Number(transaction.amount || 0).toLocaleString()}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">{transaction.method}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div>{transaction.dateTime?.split(' ')[0]}</div>
                                                    <div className="text-xs text-gray-500">{transaction.dateTime?.split(' ')[1]}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 inline-flex text-xs font-semibold rounded-full ${transaction.status === 'approved' ? 'bg-green-100 text-green-800' :
                                                        transaction.status === 'declined' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                                                        }`}>
                                                        {transaction.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {transaction.screenshot ? (
                                                        <button
                                                            onClick={() => setSelectedScreenshot(transaction.screenshot)}
                                                            className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs hover:bg-blue-200"
                                                        >
                                                            View Proof
                                                        </button>
                                                    ) : (
                                                        <span className="text-gray-400 text-xs">No Proof</span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium relative">
                                                    {transaction.status === 'pending' && (
                                                        <div className="relative" onClick={(e) => e.stopPropagation()}>
                                                            <button
                                                                onClick={() => setOpenDropdown(openDropdown === `trans-${transaction.id}` ? null : `trans-${transaction.id}`)}
                                                                className="bg-gray-100 text-gray-700 px-3 py-1 rounded text-xs font-medium hover:bg-gray-200 flex items-center"
                                                            >
                                                                Actions
                                                                <ChevronDown className="w-3 h-3 ml-1" />
                                                            </button>
                                                            {openDropdown === `trans-${transaction.id}` && (
                                                                <div className="absolute right-0 mt-1 w-36 bg-white border border-gray-200 rounded-md shadow-lg z-20">
                                                                    <div className="py-1">
                                                                        <button
                                                                            onClick={() => mutation.mutate({ id: transaction.id, status: 'approve' })}
                                                                            className="block w-full text-left px-4 py-2 text-xs hover:bg-gray-100 text-green-600"
                                                                        >
                                                                            Approve
                                                                        </button>
                                                                        <button
                                                                            onClick={() => mutation.mutate({ id: transaction.id, status: 'decline' })}
                                                                            className="block w-full text-left px-4 py-2 text-xs hover:bg-gray-100 text-red-600"
                                                                        >
                                                                            Decline
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Pagination */}
                    {filteredTransactions.length > itemsPerPage && (
                        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 rounded-lg shadow">
                            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                                <p className="text-sm text-gray-700">
                                    Showing <span className="font-medium">{startTransactionIndex + 1}</span> to{' '}
                                    <span className="font-medium">{Math.min(endTransactionIndex, filteredTransactions.length)}</span> of{' '}
                                    <span className="font-medium">{filteredTransactions.length}</span> transactions
                                </p>
                                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                                    <button
                                        onClick={() => setCurrentTransactionPage(Math.max(currentTransactionPage - 1, 1))}
                                        disabled={currentTransactionPage === 1}
                                        className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                                    >
                                        <ChevronLeft className="h-5 w-5" />
                                    </button>
                                    {Array.from({ length: totalTransactionPages }, (_, i) => i + 1).map((page) => (
                                        <button
                                            key={page}
                                            onClick={() => setCurrentTransactionPage(page)}
                                            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${page === currentTransactionPage
                                                ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                                                : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                                                }`}
                                        >
                                            {page}
                                        </button>
                                    ))}
                                    <button
                                        onClick={() => setCurrentTransactionPage(Math.min(currentTransactionPage + 1, totalTransactionPages))}
                                        disabled={currentTransactionPage === totalTransactionPages}
                                        className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                                    >
                                        <ChevronRight className="h-5 w-5" />
                                    </button>
                                </nav>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {/* Screenshot Modal */}
            {selectedScreenshot && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg p-4 sm:p-6 max-w-sm sm:max-w-md w-full" onClick={(e) => e.stopPropagation()}>
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold">Payment Proof</h3>
                            <button
                                onClick={() => setSelectedScreenshot(null)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="mb-4">
                            <img
                                src={selectedScreenshot}
                                alt="Payment Proof"
                                className="w-full h-48 sm:h-64 object-cover rounded-lg border"
                            />
                        </div>
                        <button
                            onClick={() => setSelectedScreenshot(null)}
                            className="w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PendingTransactions;
