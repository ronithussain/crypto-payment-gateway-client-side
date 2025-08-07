import React from 'react';

const ProTip = () => {
    return (
        < div >
            <div className="bg-green-50 rounded-lg p-4 mb-6 border border-green-200">
                <div className="text-sm text-gray-700">
                    <span>You can purchase </span>
                    <span className="font-semibold text-blue-600">USDT</span>
                    <span>, </span>
                    <span className="font-semibold text-orange-500">BITCOIN</span>
                    <span>, </span>
                    <span className="font-semibold text-gray-800">ETH</span>
                    <span>, </span>
                    <span className="font-semibold text-yellow-600">BNB</span>
                    <span> directly using your debit or credit card.</span>
                    <br />
                    <span className="text-gray-600">
                        Additionally, depending on your country, you can also buy cryptocurrency easily through available P2P (Peer-to-Peer) payment systems.
                    </span>
                </div>
            </div>


            <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                <div className="text-sm">
                    <span className="font-semibold text-gray-800">Pro Tip: </span>
                    <span className="text-gray-700">
                        Choose any of the supported apps at your convenience to make quick and hassle-free deposits.
                    </span>
                </div>
            </div>
        </div >
    );
};

export default ProTip;