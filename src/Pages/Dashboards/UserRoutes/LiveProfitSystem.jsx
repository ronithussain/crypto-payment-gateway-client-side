import BankDollar from '../../../assets/ProfitTask/Bank_Dollar.png';
import BankEuro from '../../../assets/ProfitTask/Bank_Euro.png';
import { RxCross2 } from "react-icons/rx";
import { MdPayment, MdTrendingUp, MdSecurity } from "react-icons/md";
import { HiCurrencyDollar } from "react-icons/hi2";
import { FaExchangeAlt, FaShieldAlt, FaChartLine } from "react-icons/fa";
import { useState, useEffect } from 'react';
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useDbUser from "../../../Hooks/useDbUser";
import { useQueryClient } from "@tanstack/react-query";
import toast from 'react-hot-toast';

// tasks list as before...
const surveyTasks = [
  { id: 1, title: "JPMorgan Chase ⇄ Deutsche Bank", reward: 2.4, isSpecial: false },
  { id: 2, title: "Bank of America ⇄ Commerzbank", reward: 1.7, isSpecial: false },
  { id: 3, title: "Wells Fargo ⇄ Dz Bank", reward: 3, isSpecial: false },
  { id: 4, title: "Huntington National Bank ⇄ Nrw.bank", reward: 2.1, isSpecial: false },
  { id: 5, title: "U.S. Bank ⇄ Norddeutsche Landesbank", reward: 1.4, isSpecial: false },
  { id: 6, title: "Goldman Sachs ⇄ HypoVereinsbank", reward: 2, isSpecial: false },
  { id: 7, title: "Citibank ⇄ Santander Consumer Bank", reward: 1.9, isSpecial: false },
  { id: 8, title: "PNC Bank ⇄ SpareBank 1 Sør-Norge", reward: 2.7, isSpecial: false },
  { id: 9, title: "Truist Bank ⇄ DNB Bank", reward: 3.5, isSpecial: false },
  { id: 10, title: "Capital One ⇄ Storebrand Bank", reward: 1, isSpecial: false },
  { id: 11, title: "BNY Mellon ⇄ BN Bank ASA", reward: 2.6, isSpecial: false },
  { id: 12, title: "BMO Harris Bank ⇄ Bank Norwegian", reward: 1.8, isSpecial: false },
  { id: 13, title: "Morgan Stanley ⇄ Nordea Bank", reward: 3.2, isSpecial: false },
  { id: 14, title: "First Citizens Bank ⇄ UBS", reward: 2.1, isSpecial: false },
  { id: 15, title: "Citizens Bank ⇄ Julius Baer", reward: 3.4, isSpecial: false },
  { id: 16, title: "Bank of Montreal ⇄ Basler Kantonalbank", reward: 2.5, isSpecial: false },
  { id: 17, title: "Royal Bank of Canada ⇄ Credit Suisse", reward: 100, isSpecial: true, specialText: "INVITE 10 PEOPLE and" },

  { id: 18, title: "TD Bank Canada ⇄ Raiffeisen", reward: 1.7, isSpecial: false },
  { id: 19, title: "National Bank of Canada ⇄ EFG International", reward: 1.1, isSpecial: false },
  { id: 20, title: "Bank of Nova Scotia ⇄ Bank of Åland", reward: 2.7, isSpecial: false },
  { id: 21, title: "Scotiabank ⇄ Zurich Cantonal Bank", reward: 1, isSpecial: false },
  { id: 22, title: "Cibc ⇄ Aktia Oyj", reward: 3.4, isSpecial: false },
  { id: 23, title: "HSBC Bank Canada ⇄ Danske Bank", reward: 2.6, isSpecial: false },
  { id: 24, title: "EQ Bank ⇄ Nordea", reward: 1.9, isSpecial: false },
  { id: 25, title: "Neo Financial ⇄ Evli Bank plc", reward: 2.7, isSpecial: false },
  { id: 26, title: "Commonwealth Bank ⇄ Handelsbanken", reward: 92, isSpecial: true, specialText: "You are lucky💰\nYou got a strong network\nDeposit: $80" },

  { id: 27, title: "Westpac ⇄ S-Bank", reward: 2.8, isSpecial: false },
  { id: 28, title: "National Australia Bank ⇄ BNP Paribas", reward: 4, isSpecial: false },
  { id: 29, title: "Bendigo Bank ⇄ Nordea Bank Finland", reward: 3.2, isSpecial: false },
  { id: 30, title: "Macquarie Bank ⇄ La Banque Postale", reward: 3.9, isSpecial: false },
  { id: 31, title: "Bank of Queensland ⇄ BPCE", reward: 160, isSpecial: true, specialText: "You are lucky💰\nYou got a strong network\nDeposit: $140" },

  { id: 32, title: "Suncorp Bank ⇄ Axa Banque", reward: 4.8, isSpecial: false },
  { id: 33, title: "Alex Bank ⇄ Crédit du Nord", reward: 3.8, isSpecial: false },
  { id: 34, title: "Bank of Melbourne ⇄ Boursorama Banque", reward: 6.3, isSpecial: false },
  { id: 35, title: "HSBC Bank Australia ⇄ Crédit Coopératif", reward: 5.7, isSpecial: false },
  { id: 36, title: "ANZ Bank ⇄ Crédit Mutuel", reward: 4.2, isSpecial: false },
  { id: 37, title: "Teachers Mutual Bank ⇄ Deutsche Bank", reward: 370, isSpecial: true, specialText: "You are lucky💰\nYou got a strong network\nDeposit: $320" },

  { id: 38, title: "Bank of Sydney Limited ⇄ Santander Group", reward: 9.4, isSpecial: false },
  { id: 39, title: "Bank of Singapore ⇄ Julius Baer", reward: 8.9, isSpecial: false },
  { id: 40, title: "Maybank ⇄ CaixaBank", reward: 840, isSpecial: true, specialText: "You are lucky💰\nYou got a strong network\nDeposit: $730" },

  { id: 41, title: "Standard Chartered ⇄ Banco Sabadell", reward: 18.7, isSpecial: false },
  { id: 42, title: "HSBC Singapore ⇄ Bankia", reward: 1500, isSpecial: true, specialText: "You are lucky💰\nYou got a strong network\nDeposit: $1300" },
  
  { id: 43, title: "ASB Bank ⇄ Société Générale", reward: 3000, isSpecial: true, specialText: "You are lucky💰\nYou got a strong network\nDeposit: $2500" },
  { id: 44, title: "Kiwibank ⇄ Bankinter", reward: 6000, isSpecial: true, specialText: "You are lucky💰\nYou got a strong network\nDeposit: $5000" },
  { id: 45, title: "Bank of New Zealand ⇄ Kutxabank", reward: 9500, isSpecial: true, specialText: "You are lucky💰\nYou got a strong network\nDeposit: $8000" },
  { id: 46, title: "TSB Bank ⇄ Deutsche Bank Spain", reward: 19700, isSpecial: true, specialText: "You are lucky💰\nYou got a strong network\nDeposit: $15000" },
  { id: 47, title: "The Co-operative Bank ⇄ BGL BNP Paribas", reward: 30000, isSpecial: true, specialText: "You are lucky💰\nYou got a strong network\nDeposit: $25000" },
  { id: 48, title: "Rabobank NZ ⇄ Commerzbank", reward: 50000, isSpecial: true, specialText: "You are lucky💰\nYou got a strong network\nDeposit: $40000" },
  { id: 49, title: "Westpac New Zealand ⇄ Pictet & Cie", reward: 90000, isSpecial: true, specialText: "You are lucky💰\nYou got a strong network\nDeposit: $60000" },
  { id: 50, title: "Standard Chartered Bank ⇄ Deutsche Bank AG", reward: 1500000, isSpecial: true, specialText: "You are lucky💰\nYou got a strong network\nDeposit: $100000" }
];

const ModalBackdrop = ({ children, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
    <div className="bg-white rounded-2xl sm:rounded-3xl max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto w-full relative shadow-2xl mx-2">
      <button
        onClick={onClose}
        className="absolute top-3 right-3 sm:top-4 sm:right-4 lg:top-6 lg:right-6 z-10 bg-red-500 hover:bg-red-600 text-white rounded-full w-7 h-7 sm:w-9 sm:h-9 lg:w-10 lg:h-10 flex items-center justify-center transition-colors shadow-lgb "
      >
        <RxCross2 className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>
      {children}
    </div>
  </div>
);

const SurveyTask = ({ task, onTaskComplete, onClose, currentTaskNumber, totalTasks, completedTasks }) => {
  const [isCompleting, setIsCompleting] = useState(false);
  const [isCollecting, setIsCollecting] = useState(false);
  const [taskCompleted, setTaskCompleted] = useState(false);

  const handleCollectProfit = () => {
    setIsCollecting(true);
    setTimeout(() => {
      setIsCollecting(false);
      setIsCompleting(true);
      setTimeout(() => {
        onTaskComplete(task.reward);
        setIsCompleting(false);
        setTaskCompleted(true);
      }, 1500);
    }, 500);
  };

  if (isCollecting) {
    return (
      <div className="p-6 sm:p-8 lg:p-12 text-center bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="w-16 h-16 sm:w-18 sm:h-18 lg:w-20 lg:h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 animate-bounce shadow-xl">
          <svg className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-green-700 mb-3 sm:mb-4">Profit Collected!</h2>
        <p className="text-xl sm:text-2xl font-bold text-green-600">+${task.reward.toLocaleString()}</p>
      </div>
    );
  }

  if (isCompleting) {
    return (
      <div className="p-6 sm:p-8 lg:p-12 text-center bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="animate-spin w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4 sm:mb-6"></div>
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-3 sm:mb-4">Processing Trade...</h2>
        <p className="text-gray-600 text-base sm:text-lg">Adding ${task.reward.toLocaleString()} to your balance</p>
        <p className="text-gray-500 mt-2 text-sm sm:text-base">Please wait...</p>
      </div>
    );
  }

  if (taskCompleted) {
    return (
      <div className="p-6 sm:p-8 lg:p-12 text-center bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="w-16 h-16 sm:w-18 sm:h-18 lg:w-20 lg:h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-xl">
          <svg className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-green-700 mb-4 sm:mb-6">Task Completed Successfully!</h2>
        <p className="text-lg sm:text-xl font-semibold text-gray-700 mb-6 sm:mb-8">
          +${task.reward.toLocaleString()} added to your balance
        </p>
        <button
          onClick={onClose}
          className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold py-3 px-6 sm:py-4 sm:px-8 lg:px-10 rounded-xl sm:rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-sm sm:text-base w-full sm:w-auto"
        >
          Continue to Next Task
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-gray-50 to-white">
      {/* Header Section */}
      <div className="text-center mb-6 sm:mb-8">
        <div className="mb-4 sm:mb-6">
          <div className="flex justify-between text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">
            <span className="font-medium">Trading Progress</span>
            <span className="mr-8 sm:mr-8 font-semibold">{completedTasks}/{totalTasks}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 sm:h-3 shadow-inner">
            <div
              className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 sm:h-3 rounded-full transition-all duration-500 shadow-sm"
              style={{ width: `${(completedTasks / totalTasks) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100 mb-4 sm:mb-6">
          <h2 className="text-sm sm:text-lg font-semibold text-gray-700 mb-2">International Trade #{currentTaskNumber}</h2>
          <div className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-700 mb-3 sm:mb-4 break-words leading-tight">{task.title}</div>

          {task.isSpecial && task.specialText && (
            <div className="bg-gradient-to-r from-yellow-100 via-amber-50 to-orange-100 border border-yellow-300 p-3 sm:p-4 rounded-lg sm:rounded-xl mb-4">
              <div className="flex items-center justify-center mb-2">
                <FaShieldAlt className="text-yellow-600 mr-2 text-sm sm:text-base" />
                <span className="text-xs sm:text-sm font-semibold text-yellow-800">PREMIUM OPPORTUNITY</span>
              </div>
              <div className="text-center">
                {task.specialText.split('\n').map((line, index) => (
                  <p key={index} className="text-xs sm:text-sm font-medium text-yellow-800">{line}</p>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Trading Visualization */}
      <div className="flex items-center justify-center mb-6 sm:mb-8">
        <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100 w-full max-w-sm sm:max-w-md">
          <div className="flex items-center justify-between">
            <div className="text-center">
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center shadow-lg mb-2">
                <MdPayment className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />
              </div>
              <span className="text-xs sm:text-sm text-gray-600 font-medium">Source Bank</span>
            </div>

            <div className="flex flex-col items-center mx-3 sm:mx-4">
              <FaExchangeAlt className="text-2xl sm:text-3xl text-green-500 animate-pulse mb-1 sm:mb-2" />
              <MdTrendingUp className="text-base sm:text-lg text-green-600" />
            </div>

            <div className="text-center">
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-green-600 to-emerald-600 rounded-full flex items-center justify-center shadow-lg mb-2">
                <HiCurrencyDollar className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />
              </div>
              <span className="text-xs sm:text-sm text-gray-600 font-medium">Target Bank</span>
            </div>
          </div>
        </div>
      </div>

      {/* Profit Section */}
      <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100 text-center mb-6 sm:mb-8">
        <div className="flex items-center justify-center mb-3">
          <FaChartLine className="text-green-600 mr-2 text-sm sm:text-base" />
          <span className="text-base sm:text-lg text-gray-700 font-medium">Expected Profit</span>
        </div>
        <div className={`text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 ${task.isSpecial ? 'text-orange-600 animate-pulse' : 'text-green-600'}`}>
          ${task.reward.toLocaleString()}
        </div>
        <p className="text-xs sm:text-sm text-gray-600">Instant transfer to your account</p>
      </div>

      {/* Action Button */}
      <button
        onClick={handleCollectProfit}
        className={`w-full ${task.isSpecial
          ? 'bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500 hover:from-yellow-600 hover:via-amber-600 hover:to-orange-600 shadow-yellow-500/25'
          : 'bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600 hover:from-blue-700 hover:via-blue-800 hover:to-cyan-700 shadow-blue-500/25'
          } text-white font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-xl sm:rounded-2xl transition-all duration-300 transform hover:scale-[1.02] shadow-xl hover:shadow-2xl flex items-center justify-center space-x-2 text-sm sm:text-base`}
      >
        <MdSecurity className="w-4 h-4 sm:w-5 sm:h-5" />
        <span>Secure Collect ${task.reward.toLocaleString()}</span>
      </button>
    </div>
  );
};

const LiveProfitSystem = ({ onBalanceUpdate }) => {
  const { dbUser } = useDbUser();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [userTaskProgress, setUserTaskProgress] = useState(0);
  const [isLoadingProgress, setIsLoadingProgress] = useState(true);

  // Load user's task progress from database
  useEffect(() => {
    const fetchTaskProgress = async () => {
      if (dbUser?._id) {
        setIsLoadingProgress(true);
        try {
          const response = await axiosSecure.get(`/userTaskProgress/${dbUser._id}`);
          setUserTaskProgress(response.data.taskProgress || 0);
        } catch (error) {
          console.error('Error fetching task progress:', error);
          // Fallback to localStorage if database fails
          const savedProgress = localStorage.getItem(`taskProgress_${dbUser._id}`);
          if (savedProgress) {
            setUserTaskProgress(parseInt(savedProgress));
          }
        } finally {
          setIsLoadingProgress(false);
        }
      }
    };

    fetchTaskProgress();
  }, [dbUser, axiosSecure]);

  const handleOpenModal = () => {
    // Check if user has completed all tasks
    if (userTaskProgress >= surveyTasks.length) {
      toast.success("You have completed all the tasks! Congratulations!");
      return;
    }

    setIsButtonLoading(true);
    setTimeout(() => {
      setIsModalOpen(true);
      setIsButtonLoading(false);
    }, 2000);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleTaskComplete = async (reward) => {
    try {
      // 1. Update balance
      await axiosSecure.patch(`/usersBalance/${dbUser._id}`, { amount: reward });

      // 2. Update task progress in database
      const newProgress = userTaskProgress + 1;
      await axiosSecure.patch(`/userTaskProgress/${dbUser._id}`, {
        taskProgress: newProgress
      });

      // 3. Update local state
      setUserTaskProgress(newProgress);

      // 4. Update localStorage as backup
      localStorage.setItem(`taskProgress_${dbUser._id}`, newProgress.toString());

      // 5. Invalidate and refetch queries
      queryClient.invalidateQueries(['userBalance', dbUser._id]);
      await queryClient.refetchQueries(['userBalance', dbUser._id]);

      // 6. Notify parent component
      if (onBalanceUpdate) {
        onBalanceUpdate();
      }

      // Note: Modal will NOT close automatically - user needs to click "Continue to Next Task"

    } catch (err) {
      console.error("Task completion failed:", err);
      alert("Error completing task. Please try again.");
    }
  };

  // Current task to show
  const currentTask = surveyTasks[userTaskProgress];
  const hasMoreTasks = userTaskProgress < surveyTasks.length;

  if (isLoadingProgress) {
    return (
      <div className="py-8 flex justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <>
      {/* Professional Trading Section - Mobile First Design */}
      <div className="bg-white rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-lg sm:shadow-xl border border-gray-100 p-3 sm:p-4 md:p-6 lg:p-8 my-3 sm:my-4 lg:my-6">
        {/* Header */}
        <div className="text-center mb-4 sm:mb-6 lg:mb-8">
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-1 sm:mb-2">Live Trading System</h2>
          <p className="text-xs sm:text-sm md:text-base text-gray-600 px-2">Secure international bank transfers with instant profits</p>
        </div>

        {/* Trading Interface - Optimized for Mobile */}
        <div className="mb-4 sm:mb-6 lg:mb-8">
          {/* Mobile Layout - Stacked */}
          <div className="block sm:hidden">
            {/* Banks Row */}
            <div className="flex justify-between items-center mb-4">
              {/* Left Bank */}
              <div className="text-center">
                <div className="relative inline-block">
                  <img
                    className="w-16 h-auto mx-auto mb-2 drop-shadow-lg"
                    src={BankDollar}
                    alt="USD Banking Network"
                  />
                </div>
              </div>

              {/* Trading Button - Mobile */}
              <div className="mb-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-2 shadow-lg">
                  <FaExchangeAlt className="w-4 h-4 text-white animate-pulse" />
                </div>
                <p className="text-xs text-gray-600 font-medium">Live Trading</p>
              </div>

              {/* Right Bank */}
              <div className="text-center">
                <div className="relative inline-block">
                  <img
                    className="w-16 h-auto mx-auto mb-2 drop-shadow-lg"
                    src={BankEuro}
                    alt="EUR Banking Network"
                  />
                  {/* <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div> */}
                </div>
              </div>
            </div>


            <div className="text-center">
              <button
                onClick={handleOpenModal}
                disabled={isButtonLoading || !hasMoreTasks}
                className={`${isButtonLoading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : !hasMoreTasks
                    ? 'bg-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 transform hover:scale-105 shadow-blue-500/25'
                  } text-white px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 w-full max-w-xs mx-auto`}
              >
                {isButtonLoading ? (
                  <>
                    <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                    <span>Connecting...</span>
                  </>
                ) : !hasMoreTasks ? (
                  <>
                    <MdSecurity className="w-4 h-4" />
                    <span>Completed</span>
                  </>
                ) : (
                  <>
                    <MdTrendingUp className="w-4 h-4" />
                    <span>Start Trading</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Desktop/Tablet Layout - Horizontal */}
          <div className="hidden sm:flex justify-between items-center gap-4 md:gap-6">
            {/* Left Bank */}
            <div className="flex-1 text-center">
              <div className="relative inline-block">
                <img
                  className="w-20 md:w-24 lg:w-32 mx-auto mb-2 md:mb-4 drop-shadow-lg"
                  src={BankDollar}
                  alt="USD Banking Network"
                />
              </div>
            </div>

            {/* Center Trading Button */}
            <div className="flex-shrink-0 text-center">
              <div className="mb-3 md:mb-4">
                <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-1 md:mb-2 shadow-lg">
                  <FaExchangeAlt className="w-7 h-7 md:w-8 md:h-8 text-white animate-pulse" />
                </div>
                <p className="text-xs text-gray-600 font-medium">Live Trading</p>
              </div>

              <button
                onClick={handleOpenModal}
                disabled={isButtonLoading || !hasMoreTasks}
                className={`${isButtonLoading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : !hasMoreTasks
                    ? 'bg-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 transform hover:scale-105 shadow-blue-500/25'
                  } text-white px-4 md:px-6 py-2 md:py-3 rounded-xl font-semibold text-xs md:text-sm transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 min-w-[140px]`}
              >
                {isButtonLoading ? (
                  <>
                    <div className="animate-spin w-3 h-3 md:w-4 md:h-4 border-2 border-white border-t-transparent rounded-full"></div>
                    <span>Connecting...</span>
                  </>
                ) : !hasMoreTasks ? (
                  <>
                    <MdSecurity className="w-3 h-3 md:w-4 md:h-4" />
                    <span>Completed</span>
                  </>
                ) : (
                  <>
                    <MdTrendingUp className="w-3 h-3 md:w-4 md:h-4" />
                    <span>Start Trading</span>
                  </>
                )}
              </button>
            </div>

            {/* Right Bank */}
            <div className="flex-1 text-center">
              <div className="relative inline-block">
                <img
                  className="w-20 md:w-24 lg:w-32 mx-auto mb-2 md:mb-4 drop-shadow-lg"
                  src={BankEuro}
                  alt="EUR Banking Network"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section - Mobile Optimized Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6">
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg md:rounded-xl p-3 sm:p-4 border border-blue-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-blue-600 font-medium">Tasks Completed</p>
                <p className="text-lg sm:text-xl font-bold text-blue-800">{userTaskProgress}</p>
              </div>
              <FaChartLine className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-blue-600 flex-shrink-0" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg md:rounded-xl p-3 sm:p-4 border border-green-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-green-600 font-medium">Success Rate</p>
                <p className="text-lg sm:text-xl font-bold text-green-800">100%</p>
              </div>
              <MdSecurity className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-green-600 flex-shrink-0" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg md:rounded-xl p-3 sm:p-4 border border-purple-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-purple-600 font-medium">Next Trade</p>
                <p className="text-base sm:text-lg font-bold text-purple-800">
                  {hasMoreTasks ? `#${userTaskProgress + 1}` : 'All Done!'}
                </p>
              </div>
              <MdTrendingUp className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-purple-600 flex-shrink-0" />
            </div>
          </div>
        </div>

        {/* Progress Info - Mobile Friendly */}
        <div className="text-center">
          <div className="inline-flex items-center bg-gray-50 rounded-full px-3 sm:px-4 py-2 border border-gray-200 max-w-full">
            <div className="w-2 h-2 rounded-full mr-2 flex-shrink-0 animate-colorPulse"></div>

            <style>
              {`
  @keyframes colorPulse {
    0% { background-color: #22c55e; } /* green-500 */
    50% { background-color: #ef4444; } /* red-500 */
    100% { background-color: #22c55e; } /* green-500 */
  }
  .animate-colorPulse {
    animation: colorPulse 2s ease-in-out infinite;
  }
`}
            </style>

            {hasMoreTasks ? (
              <span className="text-xs sm:text-sm text-gray-700 font-medium truncate">
                Ready for Task {userTaskProgress + 1} of {surveyTasks.length}
              </span>
            ) : (
              <span className="text-xs sm:text-sm text-gray-700 font-medium">
                🎉 All {surveyTasks.length} tasks completed!
              </span>
            )}
          </div>
        </div>
      </div>

      {isModalOpen && currentTask && (
        <ModalBackdrop onClose={handleCloseModal}>
          <SurveyTask
            task={currentTask}
            onTaskComplete={handleTaskComplete}
            onClose={handleCloseModal}
            currentTaskNumber={userTaskProgress + 1}
            totalTasks={surveyTasks.length}
            completedTasks={userTaskProgress}
          />
        </ModalBackdrop>
      )}
    </>
  );
};

export default LiveProfitSystem;