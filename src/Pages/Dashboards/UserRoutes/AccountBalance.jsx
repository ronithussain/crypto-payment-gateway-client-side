import { BsCalendarRangeFill } from "react-icons/bs";
import { FaArrowTrendUp } from "react-icons/fa6";
import { HiArrowDownLeft, HiArrowUpRight } from "react-icons/hi2";


const AccountBalance = () => {
    return (
        <div class="bg-gray-900">
            <div class="bg-gradient-to-br from-blue-600 to-green-600 text-white rounded-2xl p-6 max-w-7xl w-full shadow-lg">
                <div class="flex flex-col md:flex-row justify-between items-start md:items-center">
                    <div>
                        <h2 class="text-xl md:text-2xl font-semibold">Account Balance</h2>
                        <p class="text-3xl md:text-4xl font-bold mt-2">$1250.50</p>
                    </div>
                    <div class="bg-slate-400 bg-opacity-20 p-3 rounded-full mt-4 md:mt-0">
                        <i class="fas fa-wallet text-white text-2xl"><BsCalendarRangeFill /></i>
                    </div>
                </div>

                {/* <hr class="my-6 border-blue-200"> */}
                <div className="divider"></div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="flex items-center gap-4">
                        <div class="bg-blue-500 p-3 rounded-lg">
                            <i class="fas fa-arrow-up-right-from-square text-white"><HiArrowUpRight/></i>
                        </div>
                        <div>
                            <p class="text-sm">Total Deposits</p>
                            <p class="text-lg font-semibold">$2000.00</p>
                        </div>
                    </div>
                    <div class="flex items-center gap-4">
                        <div class="bg-gray-500 p-3 rounded-lg">
                            <i class="fas fa-arrow-down-left-from-square text-white"><HiArrowDownLeft /></i>
                        </div>
                        <div>
                            <p class="text-sm">Total Withdrawals</p>
                            <p class="text-lg font-semibold">$500.00</p>
                        </div>
                    </div>
                </div>

                {/* <hr class="my-6 border-blue-200"> */}
                 <div className="divider"></div>

                <div class="flex justify-between items-center">
                    <div class="flex items-center gap-2">
                        <i class="fas fa-chart-line"><FaArrowTrendUp /></i>
                        <span>Total Profit</span>
                    </div>
                    <p class="text-xl font-bold">$750.50</p>
                </div>
            </div>
        </div>
    );
};

export default AccountBalance;