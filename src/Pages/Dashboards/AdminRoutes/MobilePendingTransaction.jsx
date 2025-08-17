import { DollarSign, Mail, ChevronDown } from 'lucide-react';

const MobilePendingTransaction = ({ 
    transactions, 
    openDropdown, 
    setOpenDropdown, 
    handleApprove, 
    handleDecline, 
    setSelectedScreenshot, 
    isFetching 
}) => {
    
    const Loader = () => (
        <div className="text-center py-8 text-gray-500">
            <svg className="animate-spin h-6 w-6 text-blue-500 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
            </svg>
            <p>Loading...</p>
        </div>
    );

    if (isFetching) {
        return <Loader />;
    }

    if (transactions.length === 0) {
        return (
            <div className="text-center py-8 text-gray-500">
                <DollarSign className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                <p>No transactions found</p>
            </div>
        );
    }

    return (
        <>
            {transactions.map((transaction) => (
                <div key={transaction._id} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                        <div>
                            <div className="text-sm font-medium text-gray-900">{transaction.name}</div>
                            <div className="text-xs text-gray-500 flex items-center">
                                <Mail className="w-3 h-3 mr-1" />
                                {transaction.email}
                            </div>
                        </div>
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${transaction.type === 'deposit' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                            {transaction.type}
                        </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-3 text-xs">
                        <div>
                            <span className="text-gray-500">Amount:</span>
                            <div className="font-semibold text-gray-900">${Number(transaction.amount || 0).toLocaleString()}</div>
                        </div>
                        <div>
                            <span className="text-gray-500">Method:</span>
                            <div className="text-gray-900">{transaction.paymentMethod}</div>
                        </div>
                        <div>
                            <span className="text-gray-500">Date:</span>
                            <div className="text-gray-900">{transaction.createdAt
                                ? new Date(transaction.createdAt).toISOString().split('T')[0]
                                : 'N/A'}</div>
                        </div>
                        <div>
                            <span className="text-gray-500">Time:</span>
                            <div className="text-gray-900">{transaction.createdAt
                                ? new Date(transaction.createdAt).toLocaleTimeString(undefined, {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                })
                                : 'N/A'}</div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between mb-3">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${transaction.status === 'approved' ? 'bg-green-100 text-green-800' :
                            transaction.status === 'declined' ? 'bg-red-100 text-red-800' :
                                'bg-yellow-100 text-yellow-800'
                            }`}>
                            {transaction.status}
                        </span>

                        {transaction.proofUrl ? (
                            <button
                                onClick={() => setSelectedScreenshot(transaction.proofUrl)}
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
                                onClick={() =>
                                    setOpenDropdown(openDropdown === `mobile-${transaction._id}` ? null : `mobile-${transaction._id}`)
                                }
                                className="w-full bg-gray-100 text-gray-700 px-3 py-2 rounded text-sm font-medium hover:bg-gray-200 flex items-center justify-center"
                            >
                                Actions
                                <ChevronDown className="w-4 h-4 ml-1" />
                            </button>

                            {openDropdown === `mobile-${transaction._id}` && (
                                <div className="absolute left-0 right-0 bottom-full mb-1 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                                    <div className="py-1">
                                        <button
                                            onClick={() => {
                                                handleApprove(transaction._id);
                                                setOpenDropdown(null);
                                            }}
                                            className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-green-600"
                                        >
                                            Approve
                                        </button>
                                        <button
                                            onClick={() => {
                                                handleDecline(transaction._id);
                                                setOpenDropdown(null);
                                            }}
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
            ))}
        </>
    );
};

export default MobilePendingTransaction;