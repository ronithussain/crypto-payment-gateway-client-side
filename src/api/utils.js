import axios from "axios";

// upload image and return image url:
export const imageUpload = async (imageData) => {
    const formData = new FormData();
    formData.append("image", imageData);

    // env key নিতে হবে import.meta.env থেকে
    const apiKey = import.meta.env.VITE_IMGBB_API_KEY;

    // send image data to imgbb
    const { data } = await axios.post(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        formData
    );

    return data.data.display_url;
};


// import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "../../../Hooks/useAxiosSecure";
// import useDbUser from "../../../Hooks/useDbUser";
// import UserProfile from "../UserRoutes/UserProfile"
// import LiveProfitSystem from "./LiveProfitSystem";
// import PurchaseInfo from "./PurchaseInfo";

// const AccountBalance = () => {
//   const { dbUser } = useDbUser();
//   const axiosSecure = useAxiosSecure();

//   const { data: userData = {}, refetch } = useQuery({
//     queryKey: ['userBalance', dbUser?._id],
//     enabled: !!dbUser?._id,
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/usersBalance/${dbUser._id}`);
//       return res.data;
//     },
//     // ✅ Auto refetch every 5 seconds
//     refetchInterval: 5000,
//     // ✅ Refetch when window focus
//     refetchOnWindowFocus: true
//   });

//   // ✅ Manual refetch function
//   const handleRefreshBalance = () => {
//     refetch();
//   };

//   return (
//     <>
//       <UserProfile />
//       <div>
//         <div className="bg-gradient-to-br from-blue-600 to-green-600 text-white rounded-2xl p-6">
//           <div className="flex justify-between items-center">
//             <div>
//               <h2 className="text-xl font-semibold">Account Balance</h2>
//               <p className="text-3xl font-bold">${(userData?.balance || 0).toFixed(2)}</p>
//             </div>
//             {/* ✅ Manual refresh button */}
//             <button onClick={handleRefreshBalance} className="btn btn-sm">
//               Refresh
//             </button>
//           </div>
//         </div>
//       </div>
//       <LiveProfitSystem onBalanceUpdate={handleRefreshBalance} />
//       <PurchaseInfo />
//     </>
//   );
// };

// export default AccountBalance;