import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Phone, Lock, User, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MockAadhaarModal } from '../components/common/MockAadhaarModal';
import { api } from '../services/api';

export const Login = () => {
  const { loginUser, currentUser } = useApp();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: 'Birsa Soren',
    mobile: '9876543210',
    email: '',
    password: 'password123',
    role: 'citizen',
    district: 'Dumka'
  });

  const [error, setError] = useState('');
  const [isAadhaarModalOpen, setIsAadhaarModalOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const cleanedMobile = String(formData.mobile).replace(/\D/g, '');
    if (!/^[6-9]\d{9}$/.test(cleanedMobile)) {
      setError('Please enter a valid 10-digit Indian mobile number (e.g. 9876543210 starting with 6, 7, 8, or 9).');
      return;
    }
    if (!formData.name.trim()) {
      setError('Please enter your full name.');
      return;
    }
    if (!formData.email || !formData.email.trim().toLowerCase().endsWith('@gmail.com')) {
      setError('Please enter a valid Gmail address (e.g. yourname@gmail.com).');
      return;
    }

    try {
      // Attempt backend authentication
      const res = await api.auth.login({
        email: formData.email.trim().toLowerCase(),
        password: formData.password || 'password123'
      });

      if (res && res.token) {
        localStorage.setItem('sih_auth_token', res.token);
      }

      loginUser({
        name: formData.name,
        mobile: `+91 ${cleanedMobile}`,
        email: formData.email.trim().toLowerCase(),
        role: formData.role,
        district: formData.district,
        isAadhaarVerified: currentUser.isAadhaarVerified || false
      });

      navigate('/');
    } catch (err) {
      // Allow demo login fallback if offline while setting real state
      loginUser({
        name: formData.name,
        mobile: `+91 ${cleanedMobile}`,
        email: formData.email.trim().toLowerCase(),
        role: formData.role,
        district: formData.district,
        isAadhaarVerified: currentUser.isAadhaarVerified || false
      });
      navigate('/');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#FAF8F5]">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-3xl shadow-xl border border-slate-200">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-[#005A36] text-amber-400 mx-auto flex items-center justify-center shadow-lg border-2 border-amber-400">
            <Shield className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            SAMASYA NIVARK
          </h2>
          <p className="text-xs text-slate-500 font-bold">
            "From Community Problems to Real-World Solutions."
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-700 text-xs p-3 rounded-lg border border-red-200">
            {error}
          </div>
        )}

        <form className="space-y-5" onSubmit={handleSubmit}>
          
          {/* Role selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Select Your User Role
            </label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold focus:ring-2 focus:ring-[#005A36] focus:outline-none"
            >
              <option value="citizen">Citizen / Villager</option>
              <option value="student">Student / Researcher</option>
              <option value="university">University / Faculty</option>
              <option value="industry">Industry / CSR Partner</option>
              <option value="government">Government / Admin</option>
              <option value="ngo">NGO / Community Organization</option>
            </select>
          </div>

          {/* Name */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Full Name
            </label>
            <div className="relative">
              <User className="w-5 h-5 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter your name"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-[#005A36] focus:outline-none font-semibold"
              />
            </div>
          </div>

          {/* Gmail Email */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Gmail Address <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-slate-400 text-sm font-bold">@</span>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="yourname@gmail.com"
                className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-[#005A36] focus:outline-none font-semibold"
              />
            </div>
            <p className="text-[10px] text-slate-400 mt-0.5">Only @gmail.com addresses are accepted</p>
          </div>

          {/* Mobile Number */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Mobile Number
            </label>
            <div className="relative flex">
              <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-slate-300 bg-slate-100 text-slate-600 text-sm font-bold">
                +91
              </span>
              <input
                type="tel"
                required
                maxLength={10}
                value={formData.mobile}
                onChange={(e) => setFormData({ ...formData, mobile: e.target.value.replace(/\D/g, '') })}
                placeholder="10-digit mobile number"
                className="w-full pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-r-xl text-sm focus:ring-2 focus:ring-[#005A36] focus:outline-none font-mono font-bold"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-bold text-slate-700">
                Password
              </label>
              <button
                type="button"
                onClick={() => alert("Prototype Notice: Default password is 'password123'.")}
                className="text-[11px] font-bold text-[#005A36] hover:underline"
              >
                FORGOT PASSWORD?
              </button>
            </div>
            <div className="relative">
              <Lock className="w-5 h-5 text-slate-400 absolute left-3 top-3" />
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="Enter your password"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-[#005A36] focus:outline-none"
              />
            </div>
          </div>

          {/* Optional Mock Aadhaar Verification (Section 4) */}
          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center justify-between text-xs">
            <span className="font-bold text-emerald-950 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#005A36]" />
              {currentUser.isAadhaarVerified ? '✓ Aadhaar Verified' : 'Identity Verification'}
            </span>

            <button
              type="button"
              onClick={() => setIsAadhaarModalOpen(true)}
              className="text-[11px] font-extrabold text-[#005A36] hover:underline bg-white px-2.5 py-1 rounded border border-emerald-300"
            >
              {currentUser.isAadhaarVerified ? 'Re-verify' : 'Verify Identity (Aadhaar)'}
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3.5 px-4 rounded-xl font-black text-sm text-white bg-[#005A36] hover:bg-[#003D24] shadow-md transition-all flex items-center justify-center gap-2"
          >
            <span>LOGIN TO SAMASYA NIVARK</span>
            <ArrowRight className="w-4 h-4 text-amber-400" />
          </button>
        </form>

        <div className="text-center pt-4 border-t border-slate-100">
          <p className="text-xs text-slate-600">
            Don't have an account?{' '}
            <Link to="/register" className="font-bold text-[#B84A17] hover:underline">
              CREATE ACCOUNT
            </Link>
          </p>
        </div>

      </div>

      <MockAadhaarModal
        isOpen={isAadhaarModalOpen}
        onClose={() => setIsAadhaarModalOpen(false)}
      />
    </div>
  );
};
