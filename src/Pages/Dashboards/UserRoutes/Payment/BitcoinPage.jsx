import React, { useState, useRef } from 'react';
import BitcoinQRcode from '../../../../assets/QRcode/BitcoinQRcode.jpg'

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
const QRCode = () => (
  <svg width="200" height="200" viewBox="0 0 200 200" className="qr-code">
    <rect width="200" height="200" fill="white"/>
    {/* Corner squares */}
    <rect x="0" y="0" width="60" height="60" fill="black"/>
    <rect x="10" y="10" width="40" height="40" fill="white"/>
    <rect x="20" y="20" width="20" height="20" fill="black"/>
    
    <rect x="140" y="0" width="60" height="60" fill="black"/>
    <rect x="150" y="10" width="40" height="40" fill="white"/>
    <rect x="160" y="20" width="20" height="20" fill="black"/>
    
    <rect x="0" y="140" width="60" height="60" fill="black"/>
    <rect x="10" y="150" width="40" height="40" fill="white"/>
    <rect x="20" y="160" width="20" height="20" fill="black"/>
    
    {/* Data pattern */}
    <rect x="80" y="10" width="10" height="10" fill="black"/>
    <rect x="100" y="10" width="10" height="10" fill="black"/>
    <rect x="120" y="10" width="10" height="10" fill="black"/>
    <rect x="70" y="20" width="10" height="10" fill="black"/>
    <rect x="90" y="20" width="10" height="10" fill="black"/>
    <rect x="110" y="20" width="10" height="10" fill="black"/>
    <rect x="130" y="20" width="10" height="10" fill="black"/>
    
    {/* More data pattern */}
    <rect x="10" y="80" width="10" height="10" fill="black"/>
    <rect x="30" y="80" width="10" height="10" fill="black"/>
    <rect x="50" y="80" width="10" height="10" fill="black"/>
    <rect x="70" y="80" width="10" height="10" fill="black"/>
    <rect x="90" y="80" width="10" height="10" fill="black"/>
    <rect x="110" y="80" width="10" height="10" fill="black"/>
    <rect x="130" y="80" width="10" height="10" fill="black"/>
    <rect x="150" y="80" width="10" height="10" fill="black"/>
    <rect x="170" y="80" width="10" height="10" fill="black"/>
    <rect x="190" y="80" width="10" height="10" fill="black"/>
    
    {/* Additional pattern */}
    <rect x="20" y="100" width="10" height="10" fill="black"/>
    <rect x="40" y="100" width="10" height="10" fill="black"/>
    <rect x="80" y="100" width="10" height="10" fill="black"/>
    <rect x="120" y="100" width="10" height="10" fill="black"/>
    <rect x="160" y="100" width="10" height="10" fill="black"/>
    <rect x="180" y="100" width="10" height="10" fill="black"/>
    
    <rect x="10" y="120" width="10" height="10" fill="black"/>
    <rect x="50" y="120" width="10" height="10" fill="black"/>
    <rect x="90" y="120" width="10" height="10" fill="black"/>
    <rect x="130" y="120" width="10" height="10" fill="black"/>
    <rect x="170" y="120" width="10" height="10" fill="black"/>
  </svg>
);

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

// Bitcoin Logo Component
const BitcoinLogo = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bitcoinGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f7931a"/>
        <stop offset="100%" stopColor="#ff8c00"/>
      </linearGradient>
    </defs>
    {/* Bitcoin circle */}
    <circle cx="16" cy="16" r="16" fill="url(#bitcoinGradient)"/>
    
    {/* Bitcoin B */}
    <g fill="white">
      {/* Vertical line */}
      <rect x="12" y="6" width="2" height="20"/>
      {/* Top line */}
      <rect x="11" y="8" width="2" height="1"/>
      <rect x="11" y="23" width="2" height="1"/>
      
      {/* Bitcoin B shape */}
      <path d="M14,8 L14,24 L20,24 C22.2,24 24,22.2 24,20 C24,18.9 23.6,17.8 22.8,17 C23.6,16.2 24,15.1 24,14 C24,11.8 22.2,10 20,10 L14,10 L14,8 Z M16,12 L19,12 C20.1,12 21,12.9 21,14 C21,15.1 20.1,16 19,16 L16,16 L16,12 Z M16,18 L20,18 C21.1,18 22,18.9 22,20 C22,21.1 21.1,22 20,22 L16,22 L16,18 Z"/>
      
      {/* Top and bottom extensions */}
      <rect x="15" y="6" width="2" height="2"/>
      <rect x="15" y="24" width="2" height="2"/>
    </g>
  </svg>
);

// Network Badge Component
const NetworkBadge = () => (
  <div className="flex items-center justify-center mb-6">
    <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
      <BitcoinLogo className="w-6 h-6 mr-2" />
      <span className="text-sm font-medium text-gray-700">Bitcoin (BTC)</span>
    </div>
  </div>
);

// Wallet Address Component
const WalletAddress = ({ address, onCopy, copySuccess }) => (
  <div className="mb-6">
    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
      <span>Send to </span>
      <span className="text-orange-600 font-semibold ml-1 flex items-center">
        <BitcoinLogo className="w-4 h-4 mr-1" />
        Bitcoin (BTC)
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
    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium py-3 px-4 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
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
const BitcoinPage = () => {
  const [copySuccess, setCopySuccess] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);
  const successRef = useRef(null);

  const walletAddress = "1HWTySECxeo2s7AvoQBzbPjExYvVUTC9eN";

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
    <div className="min-h-screen font-sans">
      <div className="container mx-auto px-4 py-6 max-w-md lg:max-w-lg xl:max-w-xl">
        {/* Payment Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          {/* Network Badge */}
          <NetworkBadge />

          {/* QR Code */}
          <div className="flex justify-center mb-6">
            <div className="bg-white p-4 rounded-xl border-2 border-gray-100">
              <img className='w-32' src={BitcoinQRcode} alt="" />
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

export default BitcoinPage;