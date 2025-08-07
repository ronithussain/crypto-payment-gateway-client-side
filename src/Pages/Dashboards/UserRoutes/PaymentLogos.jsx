import ProTip from "./ProTip";


// PayPal Icon Component
const PayPalIcon = () => (
  <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
    <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.421c-.862-.543-2.17-.829-3.779-.829h-2.297c-.524 0-.968.382-1.05.9l-1.12 7.106h2.19c4.298 0 7.664-1.747 8.647-6.797.03-.149.054-.294.077-.437.292-1.867-.002-3.137-1.012-4.287-.111-.127-.23-.248-.356-.364z" />
  </svg>
);

// Binance Icon Component
const BinanceIcon = () => (
  <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L8.5 5.5L12 9L15.5 5.5L12 2ZM5.5 8.5L2 12L5.5 15.5L9 12L5.5 8.5ZM18.5 8.5L15 12L18.5 15.5L22 12L18.5 8.5ZM12 15L8.5 18.5L12 22L15.5 18.5L12 15Z" />
  </svg>
);

// Trust Wallet Icon Component
const TrustWalletIcon = () => (
  <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
  </svg>
);

// CoinMarketCap Icon Component
const CoinMarketCapIcon = () => (
  <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z" />
  </svg>
);

// MetaMask Icon Component
const MetaMaskIcon = () => (
  <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
  </svg>
);

// Exodus Icon Component
const ExodusIcon = () => (
  <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z" />
  </svg>
);

// Blockchain.com Icon Component
const BlockchainIcon = () => (
  <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z" />
  </svg>
);

const PaymentLogos = () => {
  const paymentLogos = [
    {
      name: 'PayPal',
      bgColor: 'bg-blue-600',
      icon: <PayPalIcon />
    },
    {
      name: 'Binance',
      bgColor: 'bg-yellow-400',
      icon: <BinanceIcon />
    },
    {
      name: 'Trust Wallet',
      bgColor: 'bg-blue-500',
      icon: <TrustWalletIcon />
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
      icon: <CoinMarketCapIcon />
    },
    {
      name: 'MetaMask',
      bgColor: 'bg-orange-500',
      icon: <MetaMaskIcon />
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
      icon: <ExodusIcon />
    },
    {
      name: 'Bitget',
      bgColor: 'bg-blue-500',
      icon: <span className="text-white font-bold text-sm">BG</span>
    },
    {
      name: 'Blockchain.com',
      bgColor: 'bg-blue-700',
      icon: <BlockchainIcon />
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
          {/* <ProTip></ProTip> */}
        </div>
      </section>
    </main>
  );
};

export default PaymentLogos;