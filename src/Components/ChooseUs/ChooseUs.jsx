import { useEffect, useState } from "react";
import SectionTitle from "../../Pages/Shared/SectionTitle/SectionTitle";



const ChooseUs = () => {
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        fetch('/chooseUs.json')
            .then(res => res.json())
            .then(data => {
                setCategories(data)
            })
    }, [])
    return (
        <div className="sm:w-10/12 mx-auto sm:px-0  px-2 ">
            <SectionTitle Heading='Why Choose Demo Company?' SubHeading="Experience the most advanced financial platform with cutting-edge features designed for your success,">
            </SectionTitle>

            {/* dynamic categories card layout with map */}
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 sm:gap-8 gap-2 my-8 px-0.5">
                {categories.map(category => (
                    <div
                        key={category._id}
                        className="border border-[#345f7a] sm:p-4 p-2.5 rounded-lg sm:py-8 py-4"
                    >
                        {/* hover effect er jonno relative and z-10 css use kora holo */}
                        <div className="relative z-10 ">
                            <img
                                className=" sm:w-24 w-18 sm:h-24 h-18 mb-3 "
                                src={category.image}
                                alt={category.title}
                            />
                            <h2 className="sm:text-2xl text-base font-semibold text-white">{category.title}</h2>
                            <p className="text-gray-400 sm:text-base text-xs mt-1.5">{category.providers}</p>
                        </div>
                    </div>
                ))}
            </div>

            
            {/* _____________________________ */}
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 sm:gap-8 gap-2 my-8 px-0.5">

  {/* Card 1 */}
  <div className="border border-[#345f7a] sm:p-4 p-2.5 rounded-lg sm:py-8 py-4">
    <div className="relative z-10">
      <img className="sm:w-24 w-18 sm:h-24 h-18 mb-3" src="https://i.ibb.co.com/mr4d9n1J/Apartment-rent-rafiki.png" alt="Bank-Level Security" />
      <h2 className="sm:text-2xl text-base font-semibold text-white">Bank-Level Security</h2>
      <p className="text-gray-400 sm:text-base text-xs mt-1.5">Advanced encryption and multi-layer security protocols protect your investments.</p>
    </div>
  </div>

  {/* Card 2 */}
  <div className="border border-[#345f7a] sm:p-4 p-2.5 rounded-lg sm:py-8 py-4">
    <div className="relative z-10">
      <img className="sm:w-24 w-18 sm:h-24 h-18 mb-3" src="https://i.ibb.co.com/2YqS5bPC/Breastfeeding-pana.png" alt="Daily Profit Generation" />
      <h2 className="sm:text-2xl text-base font-semibold text-white">Daily Profit Generation</h2>
      <p className="text-gray-400 sm:text-base text-xs mt-1.5">Earn consistent daily profits through our innovative click-to-earn system.</p>
    </div>
  </div>

  {/* Card 3 */}
  <div className="border border-[#345f7a] sm:p-4 p-2.5 rounded-lg sm:py-8 py-4">
    <div className="relative z-10">
      <img className="sm:w-24 w-18 sm:h-24 h-18 mb-3" src="https://i.ibb.co.com/1Gs9yhMB/Construction-costs-pana.png" alt="Referral Rewards" />
      <h2 className="sm:text-2xl text-base font-semibold text-white">Referral Rewards</h2>
      <p className="text-gray-400 sm:text-base text-xs mt-1.5">Earn unlimited bonuses by inviting friends to join our growing community.</p>
    </div>
  </div>

  {/* Card 4 */}
  <div className="border border-[#345f7a] sm:p-4 p-2.5 rounded-lg sm:py-8 py-4">
    <div className="relative z-10">
      <img className="sm:w-24 w-18 sm:h-24 h-18 mb-3" src="https://i.ibb.co.com/Q3nRwnqY/House-searching-cuate.png" alt="Instant Withdrawals" />
      <h2 className="sm:text-2xl text-base font-semibold text-white">Instant Withdrawals</h2>
      <p className="text-gray-400 sm:text-base text-xs mt-1.5">Access your earnings instantly with our fast withdrawal processing system.</p>
    </div>
  </div>

  {/* Card 5 */}
  <div className="border border-[#345f7a] sm:p-4 p-2.5 rounded-lg sm:py-8 py-4">
    <div className="relative z-10">
      <img className="sm:w-24 w-18 sm:h-24 h-18 mb-3" src="https://i.ibb.co.com/g5fq1Ft/Living-room-amico.png" alt="24/7 Support" />
      <h2 className="sm:text-2xl text-base font-semibold text-white">24/7 Support</h2>
      <p className="text-gray-400 sm:text-base text-xs mt-1.5">Get help anytime with our dedicated customer support team.</p>
    </div>
  </div>

  {/* Card 6 */}
  <div className="border border-[#345f7a] sm:p-4 p-2.5 rounded-lg sm:py-8 py-4">
    <div className="relative z-10">
      <img className="sm:w-24 w-18 sm:h-24 h-18 mb-3" src="https://i.ibb.co.com/4ZMR56Ph/Realtor-rafiki.png" alt="Verified Platform" />
      <h2 className="sm:text-2xl text-base font-semibold text-white">Verified Platform</h2>
      <p className="text-gray-400 sm:text-base text-xs mt-1.5">Fully licensed and regulated platform with transparent operations.</p>
    </div>
  </div>

</div>


        </div>
    );
};

export default ChooseUs;