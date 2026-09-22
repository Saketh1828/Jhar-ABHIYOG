import React, { useState } from 'react';
import { Modal } from './Modal';
import { ShieldCheck, CheckCircle2, Lock, ArrowRight, RefreshCw, KeyRound } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const MockAadhaarModal = ({ isOpen, onClose, onVerified }) => {
  const { currentUser, loginUser } = useApp();

  const [step, setStep] = useState('input'); // 'input', 'otp', 'verified'
  const [aadhaarNum, setAadhaarNum] = useState('5894 1234 5678');
  const [otpNum, setOtpNum] = useState('123456');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (aadhaarNum.replace(/\s/g, '').length < 12) {
      alert("Please enter a valid 12-digit Aadhaar number.");
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep('otp');
    }, 600);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep('verified');
      const masked = `XXXX-XXXX-${aadhaarNum.replace(/\s/g, '').slice(-4)}`;
      loginUser({
        ...currentUser,
        isAadhaarVerified: true,
        aadhaarMasked: masked
      });
      if (onVerified) onVerified(masked);
    }, 600);
  };

  const handleClose = () => {
    setStep('input');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="🛡️ Mock Citizen Identity Verification" maxWidth="max-w-md">
      <div className="space-y-4 text-xs">
        
        {/* Security Alert Banner */}
        <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 space-y-1">
          <div className="flex items-center gap-1.5 font-extrabold text-amber-950">
            <Lock className="w-4 h-4 text-amber-700" />
            <span>Prototype Security Notice</span>
          </div>
          <p className="text-[11px] text-amber-900 leading-relaxed">
            This is a prototype demonstration of identity verification. No real Aadhaar data is transmitted or stored.
          </p>
        </div>

        {step === 'input' && (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div>
              <label className="block font-bold text-slate-800 mb-1">Enter 12-Digit Aadhaar Number</label>
              <input
                type="text"
                maxLength={14}
                required
                value={aadhaarNum}
                onChange={(e) => setAadhaarNum(e.target.value)}
                placeholder="e.g. 5894 1234 5678"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-mono font-bold tracking-widest text-slate-900"
              />
              <span className="text-[10px] text-slate-400 block mt-1">Masked display: XXXX-XXXX-5678</span>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-[#005A36] hover:bg-[#003D24] text-white font-extrabold text-xs rounded-xl shadow flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <RefreshCw className="w-4 h-4 animate-spin text-amber-300" />
              ) : (
                <>
                  <span>SEND MOCK OTP TO REGISTERED MOBILE</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}

        {step === 'otp' && (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-950">
              <span className="font-bold text-xs block">OTP Sent to Linked Mobile +91 98*** ***10</span>
              <span className="text-[10px] text-emerald-800">Demo Code: Enter 123456</span>
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1">Enter 6-Digit OTP Code</label>
              <div className="relative">
                <KeyRound className="w-5 h-5 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  maxLength={6}
                  required
                  value={otpNum}
                  onChange={(e) => setOtpNum(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-base font-mono font-extrabold tracking-widest text-slate-900"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-[#005A36] hover:bg-[#003D24] text-white font-extrabold text-xs rounded-xl shadow flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <RefreshCw className="w-4 h-4 animate-spin text-amber-300" />
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span>VERIFY OTP & CONFIRM IDENTITY</span>
                </>
              )}
            </button>
          </form>
        )}

        {step === 'verified' && (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#005A36] mx-auto flex items-center justify-center border-2 border-emerald-300 animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-lg font-black text-slate-900">✓ Aadhaar Identity Verified!</h3>
            <p className="text-xs text-slate-600 font-medium">
              Masked Identity Badge: <strong className="font-mono text-[#005A36]">XXXX-XXXX-{aadhaarNum.slice(-4)}</strong>
            </p>
            <button
              onClick={handleClose}
              className="w-full py-3 bg-[#005A36] text-white font-bold text-xs rounded-xl shadow"
            >
              Continue to Platform
            </button>
          </div>
        )}

      </div>
    </Modal>
  );
};
