import { BsCalendarRangeFill } from "react-icons/bs";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaArrowTrendUp } from "react-icons/fa6";
import UserProfile from "./UserProfile";
import PurchaseInfo from "./PurchaseInfo";
import useDbUser from '../../../Hooks/useDbUser'
import LiveProfitSystem from "./LiveProfitSystem";

const AccountBalance = () => {
  const { dbUser } = useDbUser();
  const axiosSecure = useAxiosSecure();

  // Step: fetch user balance info
  const { data: userData = {} } = useQuery({
    queryKey: ['userBalance', dbUser?._id],
    enabled: !!dbUser?._id,
    queryFn: async () => {
      const res = await axiosSecure.get(`/usersBalance/${dbUser._id}`);
      return res.data;
    },
    // Auto refetch every 5 seconds for real-time updates
    refetchInterval: 5000,
    // Refetch when window becomes active
    refetchOnWindowFocus: true
  });

  // console.log(userData);

  const balance = userData?.balance || 0;
  // const totalProfit = 0; // later dynamic logic can be added here

  //   const formattedBalance = balance.toLocaleString("en-US", { 
  //   minimumFractionDigits: 2, 
  //   maximumFractionDigits: 2 
  // });

  return (
    <>
      <UserProfile />
      <div>
        <div className="bg-gradient-to-br from-blue-600 to-green-600 text-white rounded-2xl p-6 max-w-7xl w-full mx-auto shadow-lg">
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

          {/* <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-white"><FaArrowTrendUp /></span>
              <span>Total Profit</span>
            </div>
            <p className="text-xl font-bold">${totalProfit.toFixed(2)}</p>
          </div> */}
        </div>
      </div>
      <LiveProfitSystem />
      <PurchaseInfo />
    </>
  );
};

export default AccountBalance;