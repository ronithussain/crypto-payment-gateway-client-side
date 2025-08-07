import { MdArrowOutward } from 'react-icons/md';
import BankDollar from '../../../assets/ProfitTask/Bank_Dollar.png'
import BankEuro from '../../../assets/ProfitTask/Bank_Euro.png'
import { useNavigate } from 'react-router-dom';

const ProfitTask = () => {
  const navigate = useNavigate();

  return (
    <div className="py-6 sm:py-8">
      <div className="flex justify-between items-center gap-4  md:flex-nowrap">

        {/* Left Image */}
        <div>
          <img className="w-32 sm:w-44" src={BankDollar} alt="BankDollar" />
        </div>

        {/* Center Button */}
        <div>
          <button
          onClick={()=> navigate('/dashboard/dailyProfitGenerator')}
            className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white sm:px-8 sm:py-4 px-6 py-3 rounded-xl font-semibold text-xs sm:text-sm hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-cyan-500/25"
          >
            <span>Live Profit</span>
          </button>
        </div>

        {/* Right Image */}
        <div className="p-2 rounded-full">
          <img className="w-32 sm:w-44" src={BankEuro} alt="BankEuro" />
        </div>

      </div>
    </div>

  );
};

export default ProfitTask;