import { useQuery } from "@tanstack/react-query";
import {
  Clock,
  CheckCircle,
  ArrowDownLeft,
  ArrowUpRight,
} from "lucide-react";
import useDbUser from "../../../Hooks/useDbUser";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useState } from "react";

const TransactionHistory = () => {
  const { dbUser } = useDbUser();
  const axiosSecure = useAxiosSecure();

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const { data: history = [], error, isLoading } = useQuery({
    queryKey: ["transactions", dbUser._id],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/api/transactions/user/${dbUser._id}`
      );
      return res.data.transactions;
    },
  });

  if (isLoading)
    return (
      <div className="flex justify-center py-10 text-gray-600">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center py-10 text-red-500">
        Error loading transactions
      </div>
    );

  const transactions = history || [];

  // Pagination logic
  const totalPages = Math.ceil(transactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTransactions = transactions.slice(startIndex, endIndex);

  // Helper for icon/colors
  const getTxDetails = (tx) => {
    let icon = null;
    let iconBg = "";
    let amountColor = "";
    let badgeColor = "";

    if (tx.type === "deposit") {
      icon = (
        <ArrowDownLeft className="w-4 sm:w-6 h-4 sm:h-6 text-green-600" />
      );
      iconBg = "bg-green-100";

      if (tx.status === "pending") {
        amountColor = "text-red-600";
        badgeColor = "bg-red-100 text-red-700";
      } else {
        amountColor = "text-green-600";
        badgeColor = "bg-green-100 text-green-700";
      }
    } else if (tx.type === "withdraw") {
      icon = <ArrowUpRight className="w-4 sm:w-6 h-4 sm:h-6 text-red-600" />;
      iconBg = "bg-red-100";
      amountColor = "text-red-600";
      badgeColor =
        tx.status === "pending"
          ? "bg-red-100 text-red-700"
          : "bg-red-100 text-red-700";
    } else {
      icon = <Clock className="w-4 sm:w-6 h-4 sm:h-6 text-gray-500" />;
      iconBg = "bg-gray-100";
      amountColor = "text-gray-500";
      badgeColor = "bg-gray-100 text-gray-700";
    }

    return { icon, iconBg, amountColor, badgeColor };
  };

  return (
    <div className="bg-white rounded-2xl  max-w-5xl mt-10  mx-auto">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
        Transaction History
      </h2>

      {/* Empty State */}
      {transactions.length === 0 && (
        <p className="text-center text-gray-500 py-6">
          No transactions found.
        </p>
      )}

      {/* Transactions */}
      <div className="space-y-4">
        {currentTransactions.map((tx) => {
          const { icon, iconBg, amountColor, badgeColor } =
            getTxDetails(tx);
          const date = new Date(tx.createdAt).toLocaleDateString();

          return (
            <div
              key={tx._id}
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              {/* Left side */}
              <div className="flex items-start sm:items-center space-x-4 w-full sm:w-auto">
                <div
                  className={`p-3 rounded-full flex items-center justify-center ${iconBg}`}
                >
                  {icon}
                </div>
                <div>
                  <p className="text-base sm:text-lg font-semibold text-gray-800 capitalize">
                    {tx.type}
                  </p>
                  <p className="text-sm text-gray-600">
                    {tx.description || "-"}
                  </p>
                  <p className="text-xs text-gray-500">{date}</p>
                </div>
              </div>

              {/* Right side */}
              <div className="mt-4 sm:mt-0 text-left sm:text-right w-full sm:w-auto">
                <p className={`font-bold text-base sm:text-lg ${amountColor}`}>
                  {tx.type === "deposit" ? "+" : "-"}${tx.amount.toFixed(2)}
                </p>
                <div
                  className={`inline-flex items-center gap-1 mt-1 text-xs sm:text-sm px-3 py-1 rounded-full font-medium capitalize ${badgeColor}`}
                >
                  {tx.status === "approved" && (
                    <CheckCircle className="w-4 h-4" />
                  )}
                  {tx.status === "pending" && (
                    <Clock className="w-4 h-4" />
                  )}
                  <span className="ml-1">{tx.status}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      {transactions.length > itemsPerPage && (
        <div className="flex justify-center mt-6 space-x-2">
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.max(prev - 1, 1))
            }
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-200 rounded-lg text-sm disabled:opacity-50 hover:bg-gray-300"
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map(
            (page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 rounded-lg text-sm font-medium ${
                  page === currentPage
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {page}
              </button>
            )
          )}

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-200 rounded-lg text-sm disabled:opacity-50 hover:bg-gray-300"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default TransactionHistory;
