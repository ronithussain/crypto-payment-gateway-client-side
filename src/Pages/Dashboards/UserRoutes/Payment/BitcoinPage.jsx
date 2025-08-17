import React, { useState, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Copy, Upload, X, File, Check, Loader2 } from 'lucide-react';
import BitcoinQRcode from '../../../../assets/QRcode/BitcoinQRcode.jpg';
import { imageUpload } from '../../../../api/utils';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import useAuth from '../../../../Hooks/UseAuth';
import useDbUser from '../../../../Hooks/useDbUser';
import toast from 'react-hot-toast';

// Success Message Component
const SuccessMessage = ({ message, isVisible }) => {
  if (!isVisible) return null;
  
  return (
    <div className="mb-6 p-3 bg-green-100 border border-green-200 rounded-lg">
      <div className="flex items-center">
        <Check className="w-5 h-5 text-green-600 mr-2" />
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
          <File className="w-5 h-5 text-blue-600 mr-2" />
          <span className="text-sm text-blue-700 font-medium">{fileName}</span>
        </div>
        <button onClick={onRemove} className="text-red-500 hover:text-red-700 transition-colors">
          <X className="w-4 h-4" />
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
          <Check className="w-5 h-5 text-green-600" />
        ) : (
          <Copy className="w-5 h-5" />
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
          <Upload className="w-8 h-8 mb-2 text-gray-400" />
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
        <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" />
        Uploading...
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
        <Check className="w-6 h-6 text-green-600 mr-3" />
        <div>
          <h3 className="text-green-800 font-medium">Payment proof submitted successfully!</h3>
          <p className="text-green-700 text-sm mt-1">We'll verify your payment and process it shortly.</p>
        </div>
      </div>
    </div>
  );
};

// Main BitcoinPage Component
const BitcoinPage = () => {
  const [searchParams] = useSearchParams();
  const transactionId = searchParams.get("transactionId");
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { dbUser } = useDbUser();
  
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
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = walletAddress;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 3000);
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
    if (!uploadedFile) {
      toast.error("Please select a file first!");
      return;
    }
    
    if (!transactionId) {
      toast.error("Transaction ID not found!");
      return;
    }

    setIsSubmitting(true);
    try {
      // Step 1: Upload to imgbb
      const imageUrl = await imageUpload(uploadedFile);
      console.log("Image uploaded to imgbb:", imageUrl);

      // Step 2: Send to backend with transactionId
      const response = await axiosSecure.post("/api/payment-proof", {
        name: user.displayName,
        email: user.email,
        dbUserId: dbUser._id,
        transactionId: transactionId,
        walletAddress,
        proofUrl: imageUrl,
        uploadedAt: new Date()
      });

      console.log("Payment proof submitted:", response.data);

      setSubmitSuccess(true);
      removeFile();
      toast.success("Payment proof submitted successfully!");
      
      setTimeout(() => {
        successRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err) {
      console.error("Image upload or save failed:", err);
      toast.error("Failed to submit payment proof. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
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
      <div className="container mx-auto py-2 max-w-md lg:max-w-lg xl:max-w-xl">
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