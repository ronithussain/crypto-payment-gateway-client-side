import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const PendingTransactions = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    const { data: transactions = [], isLoading } = useQuery({
        queryKey: ['pendingTransactions'],
        queryFn: async () => {
            const res = await axiosSecure.get('/api/transactions/pending');
            return res.data;
        }
    });

    const mutation = useMutation({
        mutationFn: async (id) => {
            const res = await axiosSecure.patch(`/api/transactions/approve/${id}`);
            return res.data;
        },
        onSuccess: () => {
            toast.success('Transaction approved!');
            queryClient.invalidateQueries(['pendingTransactions']);
        },
        onError: () => {
            toast.error('Approval failed!');
        }
    });

    if (isLoading) return <p>Loading...</p>;

    return (
        <div className="max-w-7xl mx-auto p-6 text-white">
            <h2 className="text-2xl font-semibold mb-4">Pending Transactions</h2>
            {transactions.length === 0 ? (
                <p>No pending transactions.</p>
            ) : (
                <table className="w-full table-auto border">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2">User</th>
                            <th className="border px-4 py-2">Type</th>
                            <th className="border px-4 py-2">Amount</th>
                            <th className="border px-4 py-2">Method</th>
                            <th className="border px-4 py-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map(tx => (
                            <tr key={tx._id}>
                                <td className="border px-4 py-2">{tx.name} ({tx.email})</td>
                                <td className="border px-4 py-2">{tx.type}</td>
                                <td className="border px-4 py-2">${tx.amount}</td>
                                <td className="border px-4 py-2">{tx.paymentMethod}</td>
                                <td className="border px-4 py-2">
                                    <button
                                        onClick={() => mutation.mutate(tx._id)}
                                        className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded"
                                    >
                                        Approve
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default PendingTransactions;
