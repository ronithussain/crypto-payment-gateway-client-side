import { useState, useRef } from 'react';
import EthereumQRcode from '../../../../assets/QRcode/EthereumQRcode.jpg';

// Icon Components
const CopyIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
  </svg>
);

const UploadIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
  </svg>
);

const CloseIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/>
  </svg>
);

const FileIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd"/>
  </svg>
);

const CheckIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
  </svg>
);

// QR Code Component


// Loading Spinner Component
const LoadingSpinner = () => (
  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

// Success Message Component
const SuccessMessage = ({ message, isVisible }) => {
  if (!isVisible) return null;
  
  return (
    <div className="mb-6 p-3 bg-green-100 border border-green-200 rounded-lg">
      <div className="flex items-center">
        <CheckIcon className="w-5 h-5 text-green-600 mr-2" />
        <span className="text-sm text-green-700 font-medium">{message}</span>
      </div>
    </div>
  );
};

// File Preview Component
const FilePreview = ({ fileName, onRemove, isVisible }) => {
  if (!isVisible) return null;
  
  return (
    <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <FileIcon className="w-5 h-5 text-blue-600 mr-2" />
          <span className="text-sm text-blue-700 font-medium">{fileName}</span>
        </div>
        <button onClick={onRemove} className="text-red-500 hover:text-red-700 transition-colors">
          <CloseIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

// Ethereum Logo Component
const EthereumLogo = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 784.37 1277.39" xmlns="http://www.w3.org/2000/svg">
    <g fill="#627EEA">
      <polygon points="392.07,0 383.5,29.11 383.5,873.74 392.07,882.29 784.13,650.54"/>
      <polygon points="392.07,0 0,650.54 392.07,882.29 392.07,472.33"/>
    </g>
    <g fill="#8A92B2">
      <polygon points="392.07,956.52 387.24,962.41 387.24,1263.28 392.07,1277.38 784.37,724.89"/>
      <polygon points="392.07,1277.38 392.07,956.52 0,724.89"/>
    </g>
    <g fill="#627EEA">
      <polygon points="392.07,882.29 784.13,650.54 392.07,472.33"/>
      <polygon points="0,650.54 392.07,882.29 392.07,472.33"/>
    </g>
  </svg>
);

// Network Badge Component
const NetworkBadge = () => (
  <div className="flex items-center justify-center mb-6">
    <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
      <EthereumLogo className="w-6 h-6 mr-2" />
      <span className="text-sm font-medium text-gray-700">Ethereum (ERC20)</span>
    </div>
  </div>
);

// Wallet Address Component
const WalletAddress = ({ address, onCopy, copySuccess }) => (
  <div className="mb-6">
    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
      <span>Send to </span>
      <span className="text-blue-600 font-semibold ml-1 flex items-center">
        <EthereumLogo className="w-4 h-4 mr-1" />
        Ethereum (ERC20)
      </span>
    </label>
    <div className="relative">
      <input 
        type="text" 
        value={address}
        readOnly
        className="w-full p-3 pr-12 bg-gray-50 border border-gray-200 rounded-lg text-sm font-mono text-gray-800 focus:outline-none"
      />
      <button 
        onClick={onCopy}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-gray-500 hover:text-blue-600 transition-colors duration-200"
      >
        {copySuccess ? (
          <CheckIcon className="w-5 h-5 text-green-600" />
        ) : (
          <CopyIcon />
        )}
      </button>
    </div>
  </div>
);

// File Upload Component
const FileUpload = ({ onFileSelect, isDragOver, onDragOver, onDragLeave, onDrop, fileInputRef }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-2">Attach Screenshot or Receipt</label>
    <div className="relative">
      <input 
        type="file" 
        ref={fileInputRef}
        accept="image/*,.pdf"
        className="hidden"
        onChange={onFileSelect}
      />
      <label 
        onClick={() => fileInputRef.current?.click()}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition-colors duration-200 ${
          isDragOver 
            ? 'border-blue-400 bg-blue-50' 
            : 'border-gray-300 bg-gray-50 hover:bg-gray-100'
        }`}
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <UploadIcon className="w-8 h-8 mb-2 text-gray-400" />
          <p className="text-sm text-gray-500 text-center">
            <span className="font-medium">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-gray-400">PNG, JPG, PDF up to 10MB</p>
        </div>
      </label>
    </div>
  </div>
);

// Submit Button Component
const SubmitButton = ({ onClick, disabled, isSubmitting }) => (
  <button 
    onClick={onClick}
    disabled={disabled}
    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium py-3 px-4 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
  >
    {isSubmitting ? (
      <>
        <LoadingSpinner />
        Processing...
      </>
    ) : (
      'Submit Payment Proof'
    )}
  </button>
);

// Success Notification Component
const SuccessNotification = ({ isVisible, successRef }) => {
  if (!isVisible) return null;
  
  return (
    <div ref={successRef} className="mt-6 p-4 bg-green-100 border border-green-200 rounded-lg">
      <div className="flex items-center">
        <CheckIcon className="w-6 h-6 text-green-600 mr-3" />
        <div>
          <h3 className="text-green-800 font-medium">Payment proof submitted successfully!</h3>
          <p className="text-green-700 text-sm mt-1">We'll verify your payment and process it shortly.</p>
        </div>
      </div>
    </div>
  );
};

// Main CryptoPaymentPortal Component
const EthereumPage = () => {
  const [copySuccess, setCopySuccess] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);
  const successRef = useRef(null);

  const walletAddress = "0x1582f707456fc96da08ef9ff18392dfa58f100d6";

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(walletAddress);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 3000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = walletAddress;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 3000);
      console.log(err);
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const removeFile = () => {
    setUploadedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const submitPaymentProof = async () => {
    if (!uploadedFile) return;
    
    setIsSubmitting(true);
    
    // Simulate upload process
    setTimeout(() => {
      setSubmitSuccess(true);
      setIsSubmitting(false);
      removeFile();
      
      // Scroll to success message
      setTimeout(() => {
        successRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }, 2000);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      setUploadedFile(files[0]);
    }
  };

  return (
    <div className="min-h-screen  font-sans">
      <div className="container mx-auto px-4 py-6 max-w-md lg:max-w-lg xl:max-w-xl">
        {/* Payment Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          {/* Network Badge */}
          <NetworkBadge />

          {/* QR Code */}
          <div className="flex justify-center mb-6">
            <div className="bg-white p-4 rounded-xl border-2 border-gray-100">
            
              <img className='w-32' src={EthereumQRcode} alt="" />
            </div>
          </div>

          {/* Wallet Address */}
          <WalletAddress 
            address={walletAddress}
            onCopy={copyAddress}
            copySuccess={copySuccess}
          />

          {/* Copy Success Message */}
          <SuccessMessage 
            message="Address copied to clipboard!" 
            isVisible={copySuccess} 
          />

          {/* Divider */}
          <div className="border-t border-gray-200 my-6"></div>

          {/* Payment Proof Upload Section */}
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Upload Payment Proof</h2>
          
          {/* File Upload */}
          <FileUpload 
            onFileSelect={handleFileUpload}
            isDragOver={isDragOver}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            fileInputRef={fileInputRef}
          />

          {/* File Preview */}
          <FilePreview 
            fileName={uploadedFile?.name} 
            onRemove={removeFile}
            isVisible={!!uploadedFile} 
          />

          {/* Submit Button */}
          <SubmitButton 
            onClick={submitPaymentProof}
            disabled={!uploadedFile || isSubmitting}
            isSubmitting={isSubmitting}
          />
        </div>

        {/* Success Notification */}
        <SuccessNotification 
          isVisible={submitSuccess} 
          successRef={successRef}
        />
      </div>
    </div>
  );
};

export default EthereumPage;