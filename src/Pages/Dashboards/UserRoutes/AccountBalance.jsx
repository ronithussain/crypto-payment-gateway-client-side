import { BsCalendarRangeFill } from "react-icons/bs";
import { HiArrowDownLeft, HiArrowUpRight } from "react-icons/hi2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/UseAuth";
import { useQuery } from "@tanstack/react-query";
import { FaArrowTrendUp } from "react-icons/fa6";

const AccountBalance = () => {
  const { user } = useAuth();  // Firebase থেকে email পাবেন
  const axiosSecure = useAxiosSecure();

  // Step 1: Email দিয়ে ইউজার ডাটা আনো (_id, balance ইত্যাদি)
  const { data: dbUser = {}, isLoading: userLoading } = useQuery({
    queryKey: ['dbUser', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/email/${user.email}`);
      return res.data;
    }
  });

  // Step 2: dbUser._id আসলে বাকি ডেটা আনো
  const { data: userData = {}, isLoading: balanceLoading } = useQuery({
    queryKey: ['userBalance', dbUser?._id],
    enabled: !!dbUser?._id,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${dbUser._id}`);
      return res.data;
    }
  });

  const { data: transactionData = {}, isLoading: transactionLoading } = useQuery({
    queryKey: ['userTransactions', dbUser?._id],
    enabled: !!dbUser?._id,
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/deposit/${dbUser._id}`);
      return res.data;
    }
  });

  if (userLoading || balanceLoading || transactionLoading) {
    return <p>Loading...</p>;
  }

  const totalDeposit = transactionData?.totalDeposit || 0;
  const totalWithdraw = transactionData?.totalWithdraw || 0;
  const balance = userData?.balance || 0;

  return (
    <div>
      <div className="bg-gradient-to-br from-blue-600 to-green-600 text-white rounded-2xl p-6 max-w-7xl w-full shadow-lg">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h2 className="text-xl md:text-2xl font-semibold">Account Balance</h2>
            <p className="text-3xl md:text-4xl font-bold mt-2">${balance.toFixed(2)}</p>
          </div>
          <div className="bg-slate-400 bg-opacity-20 p-3 rounded-full mt-4 md:mt-0">
            <BsCalendarRangeFill className="text-white text-2xl" />
          </div>
        </div>

        <div className="divider"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center gap-4">
            <div className="bg-blue-500 p-3 rounded-lg">
              <HiArrowUpRight className="text-white" />
            </div>
            <div>
              <p className="text-sm">Total Deposits</p>
              <p className="text-lg font-semibold">${totalDeposit.toFixed(2)}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-gray-500 p-3 rounded-lg">
              <HiArrowDownLeft className="text-white" />
            </div>
            <div>
              <p className="text-sm">Total Withdrawals</p>
              <p className="text-lg font-semibold">${totalWithdraw.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="divider"></div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-white"><FaArrowTrendUp /></span>
            <span>Total Profit</span>
          </div>
          <p className="text-xl font-bold">$ 00</p>
        </div>
      </div>
    </div>
  );
};

export default AccountBalance;
