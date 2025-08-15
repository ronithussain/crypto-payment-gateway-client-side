// ===== FIXED REFERRAL PROGRAM COMPONENT =====

import { useState, useEffect } from 'react';
import { Users, Gift, Copy, Check, RefreshCw } from 'lucide-react';
import useAuth from '../../../Hooks/UseAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const ReferralProgram = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [copied, setCopied] = useState(false);
    const [referrals, setReferrals] = useState(0);
    const [earned, setEarned] = useState(0);
    const [referralCode, setReferralCode] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // রেফারেল ডাটা লোড করা - Enhanced
    const loadReferralData = async () => {
        if (!user?.email) return;
        
        setLoading(true);
        setError('');
        
        try {
            console.log('Loading referral data for:', user.email); // Debug log
            
            const response = await axiosSecure.get(`/referral-info/${user.email}`);
            console.log('Referral data response:', response.data); // Debug log
            
            setReferrals(response.data.totalReferrals || 0);
            setEarned(response.data.referralBalance || 0);
            setReferralCode(response.data.referralCode || '');
            
            // If no referral code, try to regenerate
            if (!response.data.referralCode) {
                console.log('No referral code found, attempting to regenerate...');
                await regenerateReferralCode();
            }
            
        } catch (err) {
            console.error('Error loading referral data:', err);
            setError('Failed to load referral data');
            
            // Try to regenerate referral code as fallback
            try {
                await regenerateReferralCode();
            } catch (regenerateErr) {
                console.error('Failed to regenerate referral code:', regenerateErr);
            }
        } finally {
            setLoading(false);
        }
    };

    // Regenerate referral code
    const regenerateReferralCode = async () => {
        if (!user?.email) return;
        
        try {
            const response = await axiosSecure.post(`/regenerate-referral/${user.email}`);
            console.log('Regenerated referral code:', response.data);
            
            if (response.data.referralCode) {
                setReferralCode(response.data.referralCode);
                setError('');
            }
        } catch (err) {
            console.error('Error regenerating referral code:', err);
            setError('Failed to generate referral code');
        }
    };

    useEffect(() => {
        loadReferralData();
    }, [user]);

    // Generate referral link
    const referralLink = referralCode 
        ? `${window.location.origin}/register?ref=${referralCode}`
        : 'Generating...';

    // Copy to clipboard function
    const copyToClipboard = async () => {
        if (!referralCode) {
            alert('Referral code not available yet');
            return;
        }
        
        try {
            await navigator.clipboard.writeText(referralLink);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (error) {
            console.error('Failed to copy:', error);
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = referralLink;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    if (loading) {
        return (
            <div className='max-w-7xl mx-auto sm:px-0 px-2'>
                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mx-auto"></div>
                        <p className="mt-2 text-gray-600">Loading referral data...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className='max-w-7xl mx-auto sm:px-0 px-2'>
            <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border border-gray-100">
                {/* Header */}
                <div className="text-center mb-6">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-full w-fit mx-auto mb-4">
                        <Gift className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900">Referral Program</h3>
                    <p className="text-gray-600 mt-2 text-sm sm:text-base">
                        Earn $10 for each friend you refer!
                    </p>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                        <p className="text-red-600 text-sm">{error}</p>
                        <button
                            onClick={loadReferralData}
                            className="mt-2 text-red-600 hover:text-red-800 text-sm underline"
                        >
                            Try Again
                        </button>
                    </div>
                )}

                <div className="space-y-6">
                    {/* Referral Code Box */}
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3">
                            <span className="font-medium text-gray-900 mb-2 sm:mb-0">Your Referral Code</span>
                            <div className="flex items-center gap-2">
                                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-mono w-fit">
                                    {referralCode || 'Generating...'}
                                </span>
                                {!referralCode && (
                                    <button
                                        onClick={regenerateReferralCode}
                                        className="p-1 text-purple-600 hover:text-purple-800"
                                        title="Regenerate Code"
                                    >
                                        <RefreshCw className="h-4 w-4" />
                                    </button>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 mb-3">
                            <input
                                type="text"
                                value={referralLink}
                                readOnly
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm"
                                placeholder="Your referral link will appear here..."
                            />
                            <button
                                onClick={copyToClipboard}
                                disabled={!referralCode}
                                className={`flex items-center justify-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 whitespace-nowrap ${
                                    referralCode 
                                        ? 'bg-purple-500 text-white hover:bg-purple-600' 
                                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                }`}
                            >
                                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                <span className="text-sm">{copied ? 'Copied!' : 'Copy Link'}</span>
                            </button>
                        </div>
                        
                        {/* Share Instructions */}
                        <div className="text-xs text-gray-600 bg-white p-2 rounded border">
                            💡 Share this link with friends. When they sign up using your code, you'll earn $10!
                        </div>
                    </div>

                    {/* Referral Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                            <Users className="h-6 w-6 sm:h-8 sm:w-8 text-purple-500 mx-auto mb-2" />
                            <p className="text-xl sm:text-2xl font-bold text-gray-900">{referrals}</p>
                            <p className="text-sm text-gray-600">Total Referrals</p>
                        </div>

                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                            <Gift className="h-6 w-6 sm:h-8 sm:w-8 text-emerald-500 mx-auto mb-2" />
                            <p className="text-xl sm:text-2xl font-bold text-gray-900">${earned.toFixed(2)}</p>
                            <p className="text-sm text-gray-600">Total Earned</p>
                        </div>
                    </div>

                    {/* How It Works */}
                    <div className="p-4 bg-blue-50 rounded-lg">
                        <h4 className="font-medium text-blue-900 mb-2">How it works:</h4>
                        <ul className="text-sm text-blue-800 space-y-1">
                            <li>• Share your referral link with friends</li>
                            <li>• They sign up using your referral code</li>
                            <li>• You earn $10 bonus per successful referral</li>
                            <li>• No limit on the number of referrals!</li>
                            <li>• Earnings are added to your account balance</li>
                        </ul>
                    </div>

                    {/* Debug Info (Development Only) */}
                    {process.env.NODE_ENV === 'development' && (
                        <div className="p-3 bg-gray-100 rounded text-xs">
                            <p><strong>Debug Info:</strong></p>
                            <p>User Email: {user?.email}</p>
                            <p>Referral Code: {referralCode || 'Not generated'}</p>
                            <p>Total Referrals: {referrals}</p>
                            <p>Total Earned: ${earned}</p>
                        </div>
                    )}

                    {/* Refresh Button */}
                    <div className="text-center">
                        <button
                            onClick={loadReferralData}
                            className="text-sm text-purple-600 hover:text-purple-800 underline"
                        >
                            Refresh Data
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReferralProgram;