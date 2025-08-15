// LiveProfitSystem.jsx
import BankDollar from '../../../assets/ProfitTask/Bank_Dollar.png';
import BankEuro from '../../../assets/ProfitTask/Bank_Euro.png';
import { RxCross2 } from "react-icons/rx";
import { MdPayment } from "react-icons/md";
import { HiCurrencyDollar } from "react-icons/hi2";
import { useState, useEffect } from 'react';
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useDbUser from "../../../Hooks/useDbUser";
import { useQueryClient } from "@tanstack/react-query";

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
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-2xl max-w-4xl max-h-[90vh] overflow-y-auto w-full relative">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 bg-red-500 hover:bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center transition-colors"
      >
        <RxCross2 />
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
      <div className="p-8 text-center">
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-green-600 mb-2">Profit Collected!</h2>
        <p className="text-lg font-semibold text-gray-700">+${task.reward.toLocaleString()}</p>
      </div>
    );
  }

  if (isCompleting) {
    return (
      <div className="p-8 text-center">
        <div className="animate-spin w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full mx-auto mb-4"></div>
        <h2 className="sm:text-2xl text-xl font-bold text-gray-800 mb-2">Processing Trade...</h2>
        <p className="text-gray-600 sm:text-base text-sm">Adding ${task.reward.toLocaleString()} to your balance</p>
        <p className="text-gray-500 text-sm mt-2">Please wait...</p>
      </div>
    );
  }

  if (taskCompleted) {
    return (
      <div className="p-8 text-center">
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-green-600 mb-4">Task Completed Successfully!</h2>
        <p className="text-lg font-semibold text-gray-700 mb-6">
          +${task.reward.toLocaleString()} added to your balance
        </p>
        <button
          onClick={onClose}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
        >
          Continue to Next Task
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="text-center mb-6">
        {/* Progress Indicator */}
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span>Progress</span>
            <span className='mr-8'>{completedTasks}/{totalTasks}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
              style={{ width: `${(completedTasks / totalTasks) * 100}%` }}
            ></div>
          </div>
        </div>

        <h2 className="sm:text-xl text-base font-semibold text-gray-800 mb-4">Trade #{currentTaskNumber}</h2>
        <div className="sm:text-2xl text-xl font-bold text-blue-600 mb-4">{task.title}</div>
        
        {task.isSpecial && task.specialText && (
          <div className="bg-gradient-to-r from-yellow-100 to-orange-100 border-l-4 border-yellow-500 p-4 rounded-lg mb-6 animate-pulse">
            <div className="text-center">
              {task.specialText.split('\n').map((line, index) => (
                <p key={index} className="text-sm font-medium text-yellow-800">{line}</p>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <div className="flex items-center justify-center mb-8">
        <div className="flex items-center space-x-4">
          <div className="sm:w-16 w-12 sm:h-16 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg animate-pulse">
            <MdPayment className="sm:w-8 w-6 sm:h-8 h-6 text-white" />
          </div>
          <div className="text-3xl text-green-500 animate-bounce">⇄</div>
          <div className="sm:w-16 w-12 sm:h-16 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg animate-pulse">
            <HiCurrencyDollar className="sm:w-8 w-6 sm:h-8 h-6 text-white" />
          </div>
        </div>
      </div>
      
      <div className="text-center mb-8">
        <div className="sm:text-lg text-base text-gray-600 mb-2">Expected Profit</div>
        <div className={`sm:text-4xl text-2xl font-bold ${task.isSpecial ? 'text-orange-600 animate-pulse' : 'text-green-600'}`}>
          ${task.reward.toLocaleString()}
        </div>
      </div>
      
      <button
        onClick={handleCollectProfit}
        className={`w-full ${task.isSpecial ? 'bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700' : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'} text-white font-bold sm:py-4 py-2 sm:px-6 px-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl`}
      >
        Collect Profit ${task.reward.toLocaleString()}
      </button>
    </div>
  );
};

const LiveProfitSystem = ({onBalanceUpdate}) => {
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
      alert("আপনি সব task complete করে ফেলেছেন! Congratulations!");
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
      <div className="py-6 sm:py-8 flex justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <>
      <div className="py-6 sm:py-8">
        <div className="flex justify-between items-center gap-4 md:flex-nowrap">
          <div className="animate-pulse">
            <img className="w-32 sm:w-44" src={BankDollar} alt="Bank with Dollar Symbol" />
          </div>
          <div className="text-center">
            <button
              onClick={handleOpenModal}
              disabled={isButtonLoading || !hasMoreTasks}
              className={`${isButtonLoading
                ? 'bg-gray-400 cursor-not-allowed'
                : !hasMoreTasks
                ? 'bg-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 transform hover:scale-105'
                } text-white sm:px-8 sm:py-4 px-6 py-3 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-300 shadow-lg hover:shadow-cyan-500/25`}
            >
              {isButtonLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                  <span>Finding trades...</span>
                </div>
              ) : !hasMoreTasks ? (
                <span>All Tasks Completed!</span>
              ) : (
                <span>Live Profit</span>
              )}
            </button>
            
            {/* Progress Info */}
            <div className="mt-2 text-xs text-gray-600">
              {hasMoreTasks ? (
                <span>Next: Task {userTaskProgress + 1} of {surveyTasks.length}</span>
              ) : (
                <span>🎉 All {surveyTasks.length} tasks completed!</span>
              )}
            </div>
          </div>
          <div className="p-2 rounded-full animate-pulse">
            <img className="w-32 sm:w-44" src={BankEuro} alt="Bank with Euro Symbol" />
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