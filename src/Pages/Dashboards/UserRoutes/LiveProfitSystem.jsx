// Fully Responsive LiveProfitSystem Component
import BankDollar from '../../../assets/ProfitTask/Bank_Dollar.png';
import BankEuro from '../../../assets/ProfitTask/Bank_Euro.png';
import { RxCross2 } from "react-icons/rx";
import { MdPayment, MdTrendingUp, MdSecurity } from "react-icons/md";
import { HiCurrencyDollar } from "react-icons/hi2";
import { FaExchangeAlt, FaShieldAlt, FaChartLine, FaUsers, FaWallet } from "react-icons/fa";
import { useState, useEffect, useCallback } from 'react';
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useDbUser from "../../../Hooks/useDbUser";
import { useQueryClient } from "@tanstack/react-query";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

// Fully Responsive Modal Backdrop
const ModalBackdrop = ({ children, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 xs:p-3 sm:p-4">
    <div className="bg-white rounded-lg xs:rounded-xl sm:rounded-2xl lg:rounded-3xl 
                    w-full max-w-xs xs:max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-4xl 
                    max-h-[90vh] xs:max-h-[92vh] sm:max-h-[90vh] lg:max-h-[95vh]
                    overflow-y-auto relative shadow-xl sm:shadow-2xl mx-1 xs:mx-2">
      <button
        onClick={onClose}
        className="absolute top-2 right-2 xs:top-3 xs:right-3 sm:top-4 sm:right-4 lg:top-6 lg:right-6 
                   z-10 bg-red-500 hover:bg-red-600 text-white rounded-full 
                   w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 
                   flex items-center justify-center transition-colors shadow-lg"
      >
        <RxCross2 className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
      </button>
      {children}
    </div>
  </div>
);

// Fully Responsive Validation Modal Component
const ValidationModal = ({ type, onClose, onDeposit, requiredAmount, currentReferrals, requiredReferrals }) => {
  const navigate = useNavigate();

  const handleDepositRedirect = () => {
    onClose();
    navigate('/dashboard/transaction');
  };

  if (type === 'initial_deposit') {
    return (
      <div className="p-3 xs:p-4 sm:p-6 lg:p-8 text-center bg-gradient-to-br from-red-50 to-orange-50">
        <div className="w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-red-500 to-orange-500 
                        rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
          <FaWallet className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 text-white" />
        </div>
        <h2 className="text-base xs:text-lg sm:text-xl lg:text-2xl font-bold text-red-700 mb-3 sm:mb-4">
          Minimum Deposit Required
        </h2>
        <p className="text-sm xs:text-base sm:text-lg text-gray-700 mb-4 sm:mb-6 px-2">
          You need to make a minimum deposit of <span className="font-bold text-red-600">$50</span> before you can start trading tasks.
        </p>
        <div className="space-y-2 sm:space-y-3">
          <button
            onClick={handleDepositRedirect}
            className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 
                       text-white font-bold py-2.5 xs:py-3 sm:py-3 px-4 xs:px-5 sm:px-6 
                       rounded-lg xs:rounded-xl sm:rounded-xl transition-all duration-300
                       text-sm xs:text-base"
          >
            Make Deposit Now
          </button>
          <button
            onClick={onClose}
            className="w-full bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold 
                       py-2.5 xs:py-3 sm:py-3 px-4 xs:px-5 sm:px-6 
                       rounded-lg xs:rounded-xl sm:rounded-xl transition-all duration-300
                       text-sm xs:text-base"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  if (type === 'referrals') {
    return (
      <div className="p-3 xs:p-4 sm:p-6 lg:p-8 text-center bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-purple-500 
                        rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
          <FaUsers className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 text-white" />
        </div>
        <h2 className="text-base xs:text-lg sm:text-xl lg:text-2xl font-bold text-blue-700 mb-3 sm:mb-4">
          Referrals Required
        </h2>
        <p className="text-sm xs:text-base sm:text-lg text-gray-700 mb-3 sm:mb-4 px-2">
          You need <span className="font-bold text-blue-600">{requiredReferrals} referrals</span> to unlock this task.
        </p>
        <p className="text-sm xs:text-base text-gray-600 mb-4 sm:mb-6 px-2">
          Current referrals: <span className="font-bold">{currentReferrals}</span> / {requiredReferrals}
        </p>
        <div className="space-y-2 sm:space-y-3">
          <button
            onClick={() => {
              onClose();
              navigate('/dashboard/referralProgram');
            }}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 
                       text-white font-bold py-2.5 xs:py-3 sm:py-3 px-4 xs:px-5 sm:px-6 
                       rounded-lg xs:rounded-xl sm:rounded-xl transition-all duration-300
                       text-sm xs:text-base"
          >
            Invite Friends
          </button>
          <button
            onClick={onClose}
            className="w-full bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold 
                       py-2.5 xs:py-3 sm:py-3 px-4 xs:px-5 sm:px-6 
                       rounded-lg xs:rounded-xl sm:rounded-xl transition-all duration-300
                       text-sm xs:text-base"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  if (type === 'deposit') {
    return (
      <div className="p-3 xs:p-4 sm:p-6 lg:p-8 text-center bg-gradient-to-br from-yellow-50 to-orange-50">
        <div className="w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-yellow-500 to-orange-500 
                        rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
          <HiCurrencyDollar className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 text-white" />
        </div>
        <h2 className="text-base xs:text-lg sm:text-xl lg:text-2xl font-bold text-orange-700 mb-3 sm:mb-4">
          Deposit Required
        </h2>
        <p className="text-sm xs:text-base sm:text-lg text-gray-700 mb-4 sm:mb-6 px-2">
          This premium task requires a deposit of <span className="font-bold text-orange-600">${requiredAmount}</span> to unlock.
        </p>
        <div className="space-y-2 sm:space-y-3">
          <button
            onClick={handleDepositRedirect}
            className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 
                       text-white font-bold py-2.5 xs:py-3 sm:py-3 px-4 xs:px-5 sm:px-6 
                       rounded-lg xs:rounded-xl sm:rounded-xl transition-all duration-300
                       text-sm xs:text-base"
          >
            Make Deposit (${requiredAmount})
          </button>
          <button
            onClick={onClose}
            className="w-full bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold 
                       py-2.5 xs:py-3 sm:py-3 px-4 xs:px-5 sm:px-6 
                       rounded-lg xs:rounded-xl sm:rounded-xl transition-all duration-300
                       text-sm xs:text-base"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return null;
};

// Fully Responsive SurveyTask Component
const SurveyTask = ({ task, onTaskComplete, onClose, currentTaskNumber, totalTasks, completedTasks }) => {
  const [isCompleting, setIsCompleting] = useState(false);
  const [isCollecting, setIsCollecting] = useState(false);
  const [taskCompleted, setTaskCompleted] = useState(false);

  const handleCollectProfit = async () => {
    setIsCollecting(true);

    // Simulate collection animation
    setTimeout(() => {
      setIsCollecting(false);
      setIsCompleting(true);

      // Complete the task
      setTimeout(async () => {
        setIsCompleting(false);

        try {
          // Call the completion handler
          await onTaskComplete(task.reward);
          setTaskCompleted(true);

          // Auto-close after 2 seconds to show next task
          setTimeout(() => {
            onClose();
          }, 2000);

        } catch (error) {
          console.error('Task completion error:', error);
          onClose(); // Close on error
        }
      }, 1500);
    }, 500);
  };

  if (isCollecting) {
    return (
      <div className="p-3 xs:p-4 sm:p-6 lg:p-8 xl:p-12 text-center bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 lg:w-18 lg:h-18 xl:w-20 xl:h-20 
                        bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center 
                        mx-auto mb-3 xs:mb-4 sm:mb-6 animate-bounce shadow-xl">
          <svg className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9 xl:w-10 xl:h-10 text-white"
            fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
        <h2 className="text-lg xs:text-xl sm:text-2xl lg:text-3xl font-bold text-green-700 mb-2 xs:mb-3 sm:mb-4">
          Profit Collected!
        </h2>
        <p className="text-xl xs:text-2xl sm:text-3xl font-bold text-green-600">+${task.reward.toLocaleString()}</p>
      </div>
    );
  }

  if (isCompleting) {
    return (
      <div className="p-3 xs:p-4 sm:p-6 lg:p-8 xl:p-12 text-center bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="animate-spin w-10 h-10 xs:w-12 xs:h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 
                        border-3 xs:border-4 border-blue-500 border-t-transparent rounded-full 
                        mx-auto mb-3 xs:mb-4 sm:mb-6"></div>
        <h2 className="text-lg xs:text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-2 xs:mb-3 sm:mb-4">
          Processing Trade...
        </h2>
        <p className="text-gray-600 text-sm xs:text-base sm:text-lg">Adding ${task.reward.toLocaleString()} to your balance</p>
        <p className="text-gray-500 mt-2 text-xs xs:text-sm sm:text-base">Please wait...</p>
      </div>
    );
  }

  if (taskCompleted) {
    return (
      <div className="p-3 xs:p-4 sm:p-6 lg:p-8 xl:p-12 text-center bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 lg:w-18 lg:h-18 xl:w-20 xl:h-20 
                        bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center 
                        mx-auto mb-3 xs:mb-4 sm:mb-6 shadow-xl">
          <svg className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9 xl:w-10 xl:h-10 text-white"
            fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
        <h2 className="text-lg xs:text-xl sm:text-2xl lg:text-3xl font-bold text-green-700 mb-3 xs:mb-4 sm:mb-6">
          Task Completed Successfully!
        </h2>
        <p className="text-base xs:text-lg sm:text-xl font-semibold text-gray-700 mb-4 xs:mb-6 sm:mb-8">
          +${task.reward.toLocaleString()} added to your balance
        </p>
        <p className="text-xs xs:text-sm text-gray-600 mb-3 xs:mb-4">Automatically proceeding to next task...</p>
        <div className="w-full bg-gray-200 rounded-full h-1.5 xs:h-2">
          <div className="bg-green-500 h-1.5 xs:h-2 rounded-full animate-pulse" style={{ width: '100%' }}></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-2 xs:p-3 sm:p-4 lg:p-6 xl:p-8 bg-gradient-to-br from-gray-50 to-white">
      {/* Header Section */}
      <div className="text-center mb-4 xs:mb-5 sm:mb-6 lg:mb-8">
        <div className="mb-3 xs:mb-4 sm:mb-6">
          <div className="flex justify-between text-xs sm:text-sm text-gray-600 mb-1.5 xs:mb-2 sm:mb-3">
            <span className="font-medium">Trading Progress</span>
            <span className="mr-6 xs:mr-7 sm:mr-8 font-semibold">{completedTasks}/{totalTasks}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5 xs:h-2 sm:h-3 shadow-inner">
            <div
              className="bg-gradient-to-r from-blue-500 to-cyan-500 h-1.5 xs:h-2 sm:h-3 rounded-full 
                         transition-all duration-500 shadow-sm"
              style={{ width: `${(completedTasks / totalTasks) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-white rounded-lg xs:rounded-xl sm:rounded-2xl p-3 xs:p-4 sm:p-6 
                        shadow-lg border border-gray-100 mb-3 xs:mb-4 sm:mb-6">
          <h2 className="text-xs xs:text-sm sm:text-lg font-semibold text-gray-700 mb-1.5 xs:mb-2">
            International Trade #{currentTaskNumber}
          </h2>
          <div className="text-sm xs:text-base sm:text-lg lg:text-xl xl:text-2xl font-bold text-blue-700 
                          mb-2 xs:mb-3 sm:mb-4 break-words leading-tight px-1">
            {task.title}
          </div>

          {task.isSpecial && task.specialText && (
            <div className="bg-gradient-to-r from-yellow-100 via-amber-50 to-orange-100 border border-yellow-300 
                            p-2 xs:p-3 sm:p-4 rounded-lg sm:rounded-xl mb-3 xs:mb-4">
              <div className="flex items-center justify-center mb-1.5 xs:mb-2">
                <FaShieldAlt className="text-yellow-600 mr-1.5 xs:mr-2 text-xs xs:text-sm sm:text-base" />
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
      <div className="flex items-center justify-center mb-4 xs:mb-5 sm:mb-6 lg:mb-8">
        <div className="bg-white rounded-lg xs:rounded-xl sm:rounded-2xl p-3 xs:p-4 sm:p-6 
                        shadow-lg border border-gray-100 w-full max-w-xs xs:max-w-sm sm:max-w-md">
          <div className="flex items-center justify-between">
            <div className="text-center">
              <div className="w-10 h-10 xs:w-12 xs:h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 
                              bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center 
                              shadow-lg mb-1.5 xs:mb-2">
                <MdPayment className="w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />
              </div>
              <span className="text-xs sm:text-sm text-gray-600 font-medium">Source Bank</span>
            </div>

            <div className="flex flex-col items-center mx-2 xs:mx-3 sm:mx-4">
              <FaExchangeAlt className="text-xl xs:text-2xl sm:text-3xl text-green-500 animate-pulse mb-1 sm:mb-2" />
              <MdTrendingUp className="text-sm xs:text-base sm:text-lg text-green-600" />
            </div>

            <div className="text-center">
              <div className="w-10 h-10 xs:w-12 xs:h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 
                              bg-gradient-to-br from-green-600 to-emerald-600 rounded-full flex items-center justify-center 
                              shadow-lg mb-1.5 xs:mb-2">
                <HiCurrencyDollar className="w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />
              </div>
              <span className="text-xs sm:text-sm text-gray-600 font-medium">Target Bank</span>
            </div>
          </div>
        </div>
      </div>

      {/* Profit Section */}
      <div className="bg-white rounded-lg xs:rounded-xl sm:rounded-2xl p-3 xs:p-4 sm:p-6 
                      shadow-lg border border-gray-100 text-center mb-4 xs:mb-5 sm:mb-6 lg:mb-8">
        <div className="flex items-center justify-center mb-2 xs:mb-3">
          <FaChartLine className="text-green-600 mr-1.5 xs:mr-2 text-xs xs:text-sm sm:text-base" />
          <span className="text-sm xs:text-base sm:text-lg text-gray-700 font-medium">Expected Profit</span>
        </div>
        <div className={`text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-bold mb-1.5 xs:mb-2 ${task.isSpecial ? 'text-orange-600 animate-pulse' : 'text-green-600'
          }`}>
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
          } text-white font-bold py-2.5 xs:py-3 sm:py-4 px-3 xs:px-4 sm:px-6 
          rounded-lg xs:rounded-xl sm:rounded-2xl transition-all duration-300 transform hover:scale-[1.02] 
          shadow-xl hover:shadow-2xl flex items-center justify-center space-x-1.5 xs:space-x-2 
          text-xs xs:text-sm sm:text-base`}
      >
        <MdSecurity className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5" />
        <span>Secure Collect ${task.reward.toLocaleString()}</span>
      </button>
    </div>
  );
};

// MAIN COMPONENT - Fully Responsive
const LiveProfitSystem = ({ onBalanceUpdate }) => {
  const { dbUser, refetch: refetchDbUser } = useDbUser();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [userTaskProgress, setUserTaskProgress] = useState(0);
  const [isLoadingProgress, setIsLoadingProgress] = useState(true);
  const [validationModal, setValidationModal] = useState({ show: false, type: null });
  const [surveyTasks, setSurveyTasks] = useState([]);

  // User data states for validation
  const [userData, setUserData] = useState({
    balance: 0,
    totalDeposits: 0,
    totalReferrals: 0,
    taskProgress: 0
  });

  // Load survey tasks from JSON file
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const response = await fetch('/surveyTasks.json');
        const tasks = await response.json();
        setSurveyTasks(tasks);
      } catch (error) {
        console.error('Error loading survey tasks:', error);
        toast.error('Failed to load tasks. Please refresh the page.');
      }
    };

    loadTasks();
  }, []);

  // Better data fetching with proper error handling (UNCHANGED)
  const fetchUserData = useCallback(async () => {
    if (!dbUser?._id) {
      console.log('No dbUser._id available');
      return;
    }

    setIsLoadingProgress(true);
    try {
      console.log('🔄 Fetching user data for ID:', dbUser._id);

      // Use existing userStats API for comprehensive data
      const response = await axiosSecure.get(`/userStats/${dbUser._id}`);

      if (response.data.success) {
        const stats = response.data.stats;

        console.log('✅ Received user stats:', stats);

        const newUserData = {
          balance: stats.balance || 0,
          totalDeposits: stats.totalDeposits || 0,
          totalReferrals: stats.totalReferrals || 0,
          taskProgress: stats.taskProgress || 0
        };

        setUserData(newUserData);
        setUserTaskProgress(stats.taskProgress || 0);

        console.log('📊 Updated local state:', {
          taskProgress: stats.taskProgress,
          totalDeposits: stats.totalDeposits,
          totalReferrals: stats.totalReferrals
        });

      } else {
        throw new Error('API returned success: false');
      }

    } catch (error) {
      console.error('❌ Error fetching user stats:', error);

      // Fallback to individual API calls
      try {
        console.log('🔄 Trying fallback APIs...');

        const [balanceRes, referralsRes, taskProgressRes] = await Promise.all([
          axiosSecure.get(`/usersBalance/${dbUser._id}`).catch(e => ({ data: { balance: 0, totalDeposits: 0 } })),
          axiosSecure.get(`/userReferrals/${dbUser._id}`).catch(e => ({ data: { totalReferrals: 0 } })),
          axiosSecure.get(`/userTaskProgress/${dbUser._id}`).catch(e => ({ data: { taskProgress: 0 } }))
        ]);

        const fallbackData = {
          balance: balanceRes.data.balance || 0,
          totalDeposits: balanceRes.data.totalDeposits || 0,
          totalReferrals: referralsRes.data.totalReferrals || 0,
          taskProgress: taskProgressRes.data.taskProgress || 0
        };

        console.log('✅ Fallback data loaded:', fallbackData);

        setUserData(fallbackData);
        setUserTaskProgress(fallbackData.taskProgress);

      } catch (fallbackError) {
        console.error('❌ All API calls failed:', fallbackError);
        toast.error('Failed to load user data. Please refresh the page.');
      }
    } finally {
      setIsLoadingProgress(false);
    }
  }, [dbUser?._id, axiosSecure]);

  // Load user data on component mount and when dbUser changes
  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  // Validation function with proper task requirements matching backend (UNCHANGED)
  const validateTaskAccess = useCallback((taskIndex) => {
    const task = surveyTasks[taskIndex];

    console.log('🔍 Validating task access:', {
      taskIndex,
      taskTitle: task?.title,
      userData: userData,
      taskRequirements: {
        requiresDeposit: task?.requiresDeposit,
        requiresReferrals: task?.requiresReferrals
      }
    });

    // First task requires $50 minimum deposit (matching backend logic)
    if (taskIndex === 0 && userData.totalDeposits < 50) {
      console.log('❌ First task blocked: insufficient deposit', {
        required: 50,
        current: userData.totalDeposits
      });
      return { valid: false, type: 'initial_deposit', required: 50 };
    }

    // Task 17 (index 16) requires 10 referrals (matching backend)
    if (taskIndex === 16 && userData.totalReferrals < 10) {
      console.log('❌ Task 17 blocked: insufficient referrals', {
        required: 10,
        current: userData.totalReferrals
      });
      return {
        valid: false,
        type: 'referrals',
        required: 10,
        current: userData.totalReferrals
      };
    }

    // Special deposit tasks (matching backend requirements)
    const depositRequirements = {
      25: 80,    // Task 26
      30: 140,   // Task 31  
      36: 320,   // Task 37
      39: 730,   // Task 40
      41: 1300,  // Task 42
      42: 2500,  // Task 43
      43: 5000,  // Task 44
      44: 8000,  // Task 45
      45: 15000, // Task 46
      46: 25000, // Task 47
      47: 40000, // Task 48
      48: 60000, // Task 49
      49: 100000 // Task 50
    };

    const requiredDeposit = depositRequirements[taskIndex];
    if (requiredDeposit && userData.totalDeposits < requiredDeposit) {
      console.log('❌ Task blocked: insufficient deposit for special task', {
        taskIndex,
        required: requiredDeposit,
        current: userData.totalDeposits
      });
      return {
        valid: false,
        type: 'deposit',
        required: requiredDeposit
      };
    }

    console.log('✅ Task validation passed for index:', taskIndex);
    return { valid: true };
  }, [userData, surveyTasks]);

  // Modal opening with better validation (UNCHANGED)
  const handleOpenModal = useCallback(() => {
    console.log('🚀 Handle open modal called:', {
      userTaskProgress,
      totalTasks: surveyTasks.length,
      userData
    });

    // Check if user has completed all tasks
    if (userTaskProgress >= surveyTasks.length) {
      toast.success("🎉 Congratulations! You have completed all trading tasks!");
      return;
    }

    // Validate access to current task
    const validation = validateTaskAccess(userTaskProgress);
    console.log('🔍 Validation result:', validation);

    if (!validation.valid) {
      console.log('❌ Task access denied, showing validation modal:', validation.type);
      setValidationModal({
        show: true,
        type: validation.type,
        requiredAmount: validation.required,
        currentReferrals: validation.current,
        requiredReferrals: validation.required
      });
      return;
    }

    console.log('✅ Opening task modal');
    setIsButtonLoading(true);
    setTimeout(() => {
      setIsModalOpen(true);
      setIsButtonLoading(false);
    }, 800);
  }, [userTaskProgress, validateTaskAccess, userData, surveyTasks.length]);

  const handleCloseModal = () => {
    console.log('🔄 Closing task modal');
    setIsModalOpen(false);
  };

  const handleCloseValidationModal = () => {
    console.log('🔄 Closing validation modal');
    setValidationModal({ show: false, type: null });
  };

  // Task completion with proper state management (UNCHANGED)
  const handleTaskComplete = async (reward) => {
    try {
      console.log('🎯 Starting task completion:', {
        taskIndex: userTaskProgress,
        reward,
        userId: dbUser._id
      });

      // Use the completeTaskProfit API
      const response = await axiosSecure.post(`/completeTaskProfit/${dbUser._id}`, {
        taskIndex: userTaskProgress,
        reward: reward
      });

      console.log('✅ Task completion response:', response.data);

      if (response.data.success) {
        // Immediately update local state for instant UI response
        const newTaskProgress = userTaskProgress + 1;
        const newBalance = userData.balance + reward;

        console.log('📈 Updating local state:', {
          oldProgress: userTaskProgress,
          newProgress: newTaskProgress,
          oldBalance: userData.balance,
          newBalance: newBalance
        });

        setUserTaskProgress(newTaskProgress);
        setUserData(prev => ({
          ...prev,
          balance: newBalance,
          taskProgress: newTaskProgress
        }));

        // Show success message
        toast.success(`🎉 Task ${userTaskProgress + 1} completed! +${reward.toLocaleString()} earned`);

        // Refresh data after a short delay to sync with server
        setTimeout(async () => {
          console.log('🔄 Refreshing data from server...');
          await fetchUserData();

          // Call parent balance update callback
          if (onBalanceUpdate) {
            onBalanceUpdate();
          }

          // Refetch dbUser data for other components
          if (refetchDbUser) {
            refetchDbUser();
          }
        }, 1000);

      } else {
        throw new Error(response.data.message || 'Task completion failed');
      }

    } catch (error) {
      console.error('❌ Task completion failed:', error);

      // Show user-friendly error message
      const errorMessage = error.response?.data?.error || error.message || 'Task completion failed';
      toast.error(`Failed to complete task: ${errorMessage}`);

      // Refresh data on error to ensure consistency
      console.log('🔄 Refreshing data due to error...');
      await fetchUserData();
    }
  };

  // Current task to show
  const currentTask = surveyTasks[userTaskProgress];
  const hasMoreTasks = userTaskProgress < surveyTasks.length;

  // Better next task requirements display (UNCHANGED)
  const getNextTaskRequirements = () => {
    if (!hasMoreTasks) return null;

    const validation = validateTaskAccess(userTaskProgress);
    if (validation.valid) return null;

    switch (validation.type) {
      case 'initial_deposit':
        return `⚠️ Requires $50 minimum deposit (Current: ${userData.totalDeposits})`;
      case 'referrals':
        return `⚠️ Requires ${validation.required} referrals (${validation.current}/${validation.required})`;
      case 'deposit':
        return `⚠️ Requires ${validation.required} deposit (Current: ${userData.totalDeposits})`;
      default:
        return null;
    }
  };

  // Debug logging with better formatting (UNCHANGED)
  useEffect(() => {
    console.log('📊 LiveProfitSystem state update:', {
      userTaskProgress,
      userData,
      currentTaskTitle: currentTask?.title,
      hasMoreTasks,
      nextTaskValidation: hasMoreTasks ? validateTaskAccess(userTaskProgress) : null
    });
  }, [userTaskProgress, userData, currentTask, hasMoreTasks, validateTaskAccess]);

  if (isLoadingProgress || surveyTasks.length === 0) {
    return (
      <div className="py-6 xs:py-7 sm:py-8 flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 border-3 xs:border-4 
                          border-blue-500 border-t-transparent rounded-full mx-auto mb-2"></div>
          <p className="text-gray-600 text-xs xs:text-sm">Loading trading data...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Professional Trading Section - Fully Responsive */}
      <div className="bg-white rounded-lg xs:rounded-xl sm:rounded-2xl lg:rounded-3xl 
                      shadow-md xs:shadow-lg sm:shadow-xl border border-gray-100 
                      p-2 xs:p-3 sm:p-4 md:p-6 lg:p-8 
                      my-2 xs:my-3 sm:my-4 lg:my-6">

        {/* Header */}
        <div className="text-center mb-3 xs:mb-4 sm:mb-6 lg:mb-8">
          <h2 className="text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 
                         mb-1 xs:mb-1.5 sm:mb-2">
            Live Trading System
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-gray-600 px-1 xs:px-2 leading-tight">
            Secure international bank transfers with instant profits
          </p>
        </div>

        {/* Trading Interface - Fully Responsive */}
        <div className="mb-3 xs:mb-4 sm:mb-6 lg:mb-8">
          {/* Mobile Layout - Stacked (xs to sm) */}
          <div className="block md:hidden">
            {/* Banks Row */}
            <div className="flex justify-between items-center mb-3 xs:mb-4">
              {/* Left Bank */}
              <div className="text-center flex-1">
                <div className="relative inline-block">
                  <img
                    className="w-12 xs:w-14 sm:w-16 h-auto mx-auto mb-1.5 xs:mb-2 drop-shadow-md"
                    src={BankDollar}
                    alt="USD Banking Network"
                  />
                </div>
              </div>

              {/* Trading Button - Mobile */}
              <div className="mb-2 xs:mb-3 flex-shrink-0 px-2">
                <div className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-blue-600 to-cyan-600 
                                rounded-full flex items-center justify-center mx-auto mb-1 xs:mb-1.5 shadow-lg">
                  <FaExchangeAlt className="w-3 h-3 xs:w-4 xs:h-4 text-white animate-pulse" />
                </div>
                <p className="text-xs text-gray-600 font-medium">Live Trading</p>
              </div>

              {/* Right Bank */}
              <div className="text-center flex-1">
                <div className="relative inline-block">
                  <img
                    className="w-12 xs:w-14 sm:w-16 h-auto mx-auto mb-1.5 xs:mb-2 drop-shadow-md"
                    src={BankEuro}
                    alt="EUR Banking Network"
                  />
                </div>
              </div>
            </div>

            {/* Mobile Button */}
            <div className="text-center">
              <button
                onClick={handleOpenModal}
                disabled={isButtonLoading || !hasMoreTasks}
                className={`${isButtonLoading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : !hasMoreTasks
                    ? 'bg-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 transform hover:scale-105 shadow-blue-500/25'
                  } text-white px-4 xs:px-5 sm:px-6 py-4 xs:py-2.5 sm:py-3 
                  rounded-lg xs:rounded-xl font-semibold text-xs xs:text-sm 
                  transition-all duration-300 shadow-lg hover:shadow-xl 
                  flex items-center justify-center space-x-1.5 xs:space-x-2 
                  w-full max-w-xs mx-auto`}
              >
                {isButtonLoading ? (
                  <>
                    <div className="animate-spin w-3 h-3 xs:w-4 xs:h-4 border-2 border-white border-t-transparent rounded-full"></div>
                    <span>Connecting...</span>
                  </>
                ) : !hasMoreTasks ? (
                  <>
                    <MdSecurity className="w-3 h-3 xs:w-4 xs:h-4" />
                    <span>All Tasks Completed</span>
                  </>
                ) : (
                  <>
                    <MdTrendingUp className="w-3 h-3 xs:w-4 xs:h-4" />
                    <span>Start Task</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Desktop/Tablet Layout - Horizontal (md and up) */}
          <div className="hidden md:flex justify-between items-center gap-4 lg:gap-6 xl:gap-8">
            {/* Left Bank */}
            <div className="flex-1 text-center">
              <div className="relative inline-block">
                <img
                  className="w-18 md:w-20 lg:w-24 xl:w-32 mx-auto mb-2 md:mb-3 lg:mb-4 drop-shadow-lg"
                  src={BankDollar}
                  alt="USD Banking Network"
                />
              </div>
            </div>

            {/* Center Trading Button */}
            <div className="flex-shrink-0 text-center">
              <div className="mb-3 md:mb-4 lg:mb-5">
                <div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-blue-600 to-cyan-600 
                                rounded-full flex items-center justify-center mx-auto mb-1.5 md:mb-2 shadow-lg">
                  <FaExchangeAlt className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-white animate-pulse" />
                </div>
                <p className="text-xs md:text-sm text-gray-600 font-medium">Live Trading</p>
              </div>

              <button
                onClick={handleOpenModal}
                disabled={isButtonLoading || !hasMoreTasks}
                className={`${isButtonLoading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : !hasMoreTasks
                    ? 'bg-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 transform hover:scale-105 shadow-blue-500/25'
                  } text-white px-4 md:px-5 lg:px-8 py-2 md:py-2.5 lg:py-4 
                  rounded-lg md:rounded-xl font-semibold text-xs md:text-sm lg:text-base 
                  transition-all duration-300 shadow-lg hover:shadow-xl 
                  flex items-center justify-center space-x-1.5 md:space-x-2 
                  min-w-[120px] md:min-w-[140px] lg:min-w-[160px]`}
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
                    <span>Start Task</span>
                  </>
                )}
              </button>
            </div>

            {/* Right Bank */}
            <div className="flex-1 text-center">
              <div className="relative inline-block">
                <img
                  className="w-18 md:w-20 lg:w-24 xl:w-32 mx-auto mb-2 md:mb-3 lg:mb-4 drop-shadow-lg"
                  src={BankEuro}
                  alt="EUR Banking Network"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section - Fully Responsive Grid */}
        <div className="grid grid-cols-1 xs:grid-cols-3 gap-1.5 xs:gap-2 sm:gap-3 md:gap-4 
                        mb-3 xs:mb-4 sm:mb-6">
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg md:rounded-xl 
                          p-2 xs:p-2.5 sm:p-3 md:p-4 border border-blue-100">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm text-blue-600 font-medium truncate">Tasks Completed</p>
                <p className="text-base xs:text-lg sm:text-xl font-bold text-blue-800">
                  {userTaskProgress}/{surveyTasks.length}
                </p>
              </div>
              <FaChartLine className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 
                                      text-blue-600 flex-shrink-0 ml-2" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg md:rounded-xl 
                          p-2 xs:p-2.5 sm:p-3 md:p-4 border border-green-100">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm text-green-600 font-medium truncate">Total Deposits</p>
                <p className="text-base xs:text-lg sm:text-xl font-bold text-green-800">
                  ${userData.totalDeposits.toLocaleString()}
                </p>
              </div>
              <MdSecurity className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 
                                     text-green-600 flex-shrink-0 ml-2" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg md:rounded-xl 
                          p-2 xs:p-2.5 sm:p-3 md:p-4 border border-purple-100">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm text-purple-600 font-medium truncate">Referrals</p>
                <p className="text-base xs:text-lg sm:text-xl font-bold text-purple-800">
                  {userData.totalReferrals}
                </p>
              </div>
              <FaUsers className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 
                                  text-purple-600 flex-shrink-0 ml-2" />
            </div>
          </div>
        </div>

        {/* Progress Info - Fully Responsive */}
        <div className="text-center">
          <div className="inline-flex items-center bg-gray-50 rounded-full 
                          px-2.5 xs:px-3 sm:px-4 py-1.5 xs:py-2 border border-gray-200 max-w-full">
            <div className="w-1.5 h-1.5 xs:w-2 xs:h-2 rounded-full mr-1.5 xs:mr-2 flex-shrink-0 animate-colorPulse"></div>

            <style>
              {`
  @keyframes colorPulse {
    0% { background-color: #22c55e; }
    50% { background-color: #ef4444; }
    100% { background-color: #22c55e; }
  }
  .animate-colorPulse {
    animation: colorPulse 2s ease-in-out infinite;
  }
`}
            </style>

            {hasMoreTasks ? (
              <span className="text-xs sm:text-sm text-gray-700 font-medium">
                <span className="block">Next: Task {userTaskProgress + 1} of {surveyTasks.length}</span>
                {getNextTaskRequirements() && (
                  <span className="block text-xs text-red-600 mt-0.5 xs:mt-1 leading-tight">
                    {getNextTaskRequirements()}
                  </span>
                )}
              </span>
            ) : (
              <span className="text-xs sm:text-sm text-gray-700 font-medium">
                🎉 All {surveyTasks.length} tasks completed! Amazing work!
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Task Modal */}
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

      {/* Validation Modal */}
      {validationModal.show && (
        <ModalBackdrop onClose={handleCloseValidationModal}>
          <ValidationModal
            type={validationModal.type}
            onClose={handleCloseValidationModal}
            requiredAmount={validationModal.requiredAmount}
            currentReferrals={validationModal.currentReferrals}
            requiredReferrals={validationModal.requiredReferrals}
          />
        </ModalBackdrop>
      )}
    </>
  );
};

export default LiveProfitSystem;