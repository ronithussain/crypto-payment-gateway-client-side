import PaymentLogos from './PaymentLogos';

const PurchaseInfo = () => {
    return (
        <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-2xl pt-4 sm:pt-8 " >
                {/* Header */}
                <div className="text-center sm:mb-6 mb-3">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Secure Payment Details</h2>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-center sm:mb-8 mb-4 ">
                    To ensure a smooth and secure deposit experience on our website, you can use the following popular mobile payment apps:
                </p>
                <PaymentLogos></PaymentLogos>
                
            </div>
        </div>
    );
};

export default PurchaseInfo;