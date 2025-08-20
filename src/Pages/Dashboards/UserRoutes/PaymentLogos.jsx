import { CreditCard, Wallet, Shield, TrendingUp } from "lucide-react";


const PaymentLogos = () => {
  const paymentLogos = [
    {
      name: 'PayPal',
      bgColor: 'bg-blue-600',
      icon: <CreditCard className="w-8 h-8 text-white" />
    },
    {
      name: 'Binance',
      bgColor: 'bg-yellow-400',
      icon: <TrendingUp className="w-8 h-8 text-white" />
    },
    {
      name: 'Trust Wallet',
      bgColor: 'bg-blue-500',
      icon: <Shield className="w-8 h-8 text-white" />
    },
    {
      name: 'Coinbase',
      bgColor: 'bg-blue-600',
      icon: <div className="w-6 h-6 bg-white rounded-full"></div>
    },
    {
      name: 'Cash App',
      bgColor: 'bg-green-500',
      icon: <span className="text-white font-bold text-lg">$</span>
    },
    {
      name: 'Venmo',
      bgColor: 'bg-blue-400',
      icon: <span className="text-white font-bold text-lg">V</span>
    },
    {
      name: 'CoinMarketCap',
      bgColor: 'bg-yellow-500',
      icon: <TrendingUp className="w-8 h-8 text-white" />
    },
    {
      name: 'MetaMask',
      bgColor: 'bg-orange-500',
      icon: <Wallet className="w-8 h-8 text-white" />
    },
    {
      name: 'MEXC',
      bgColor: 'bg-green-600',
      icon: <span className="text-white font-bold text-sm">MX</span>
    },
    {
      name: 'ByBit',
      bgColor: 'bg-yellow-400',
      icon: <span className="text-white font-bold text-sm">BB</span>
    },
    {
      name: 'Base',
      bgColor: 'bg-blue-600',
      icon: <div className="w-6 h-6 bg-white rounded-full border-2 border-blue-300"></div>
    },
    {
      name: 'Exodus',
      bgColor: 'bg-purple-600',
      icon: <Wallet className="w-8 h-8 text-white" />
    },
    {
      name: 'Bitget',
      bgColor: 'bg-blue-500',
      icon: <span className="text-white font-bold text-sm">BG</span>
    },
    {
      name: 'Blockchain.com',
      bgColor: 'bg-blue-700',
      icon: <Shield className="w-8 h-8 text-white" />
    },
    {
      name: 'Gemini Exchange',
      bgColor: 'bg-green-500',
      icon: <span className="text-white font-bold text-sm">♊</span>
    },
    {
      name: 'TokenPocket',
      bgColor: 'bg-blue-600',
      icon: <span className="text-white font-bold text-sm">TP</span>
    },
    {
      name: 'YellowCard',
      bgColor: 'bg-yellow-500',
      icon: <span className="text-white font-bold text-sm">YC</span>
    },
    {
      name: 'OKX',
      bgColor: 'bg-blue-600',
      icon: <span className="text-white font-bold text-sm">OKX</span>
    },
    {
      name: 'Bitcoin.com',
      bgColor: 'bg-orange-500',
      icon: <span className="text-white font-bold text-lg">₿</span>
    },
    {
      name: 'Cex.io',
      bgColor: 'bg-blue-600',
      icon: <span className="text-white font-bold text-sm">CEX</span>
    },
  ];

  return (
    <main className="max-w-7xl w-full mx-auto py-6 sm:py-3">
      <style>
        {`
          @keyframes scroll-left {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}
      </style>

      <section>
        <div>
          <div className="overflow-hidden">
            <div
              className="flex gap-4"
              style={{
                animation: 'scroll-left 30s linear infinite',
                width: '200%'
              }}
            >
              {/* First set of logos */}
              <div className="flex gap-4 min-w-max">
                {paymentLogos.map((logo, index) => (
                  <div
                    key={`first-${index}`}
                    className="p-4 rounded-xl text-center transform hover:scale-105 hover:-translate-y-2 transition-all duration-300"
                  >
                    <div className={`w-12 h-12 mx-auto mb-3 ${logo.bgColor} rounded-lg flex items-center justify-center shadow-md`}>
                      {logo.icon}
                    </div>
                    <span className="text-sm font-semibold text-gray-600">{logo.name}</span>
                  </div>
                ))}
              </div>

              {/* Duplicate set for seamless looping */}
              <div className="flex gap-4 min-w-max">
                {paymentLogos.map((logo, index) => (
                  <div
                    key={`second-${index}`}
                    className="p-4 rounded-xl text-center transform hover:scale-105 hover:-translate-y-2 transition-all duration-300"
                  >
                    <div className={`w-12 h-12 mx-auto mb-3 ${logo.bgColor} rounded-lg flex items-center justify-center shadow-md`}>
                      {logo.icon}
                    </div>
                    <span className="text-sm font-semibold text-white">{logo.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default PaymentLogos;