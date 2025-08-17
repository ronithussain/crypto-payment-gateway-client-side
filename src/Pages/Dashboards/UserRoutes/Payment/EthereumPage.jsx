import React, { useState, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Copy, Upload, X, File, Check, Loader2 } from 'lucide-react';
import EthereumQRcode from '../../../../assets/QRcode/EthereumQRcode.jpg';
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
    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium py-3 px-4 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
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

// Main EthereumPage Component
const EthereumPage = () => {
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

  const walletAddress = "0x1582f707456fc96da08ef9ff18392dfa58f100d6";

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