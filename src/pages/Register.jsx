import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Phone, Lock, User, MapPin, ArrowRight, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { JHARKHAND_DISTRICTS } from '../data/mockData';
import { MockAadhaarModal } from '../components/common/MockAadhaarModal';

export const Register = () => {
  const { loginUser } = useApp();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    district: 'Dumka',
    village: '',
    role: 'citizen',
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = useState('');
  const [isAadhaarVerified, setIsAadhaarVerified] = useState(false);
  const [isAadhaarModalOpen, setIsAadhaarModalOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name) {
      setError('Please enter your full name.');
      return;
    }
    if (!formData.mobile || formData.mobile.length < 10) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (!formData.email || !formData.email.trim().toLowerCase().endsWith('@gmail.com')) {
      setError('Please enter a valid Gmail address (e.g. yourname@gmail.com).');
      return;
    }

    loginUser({
      name: formData.name,
      mobile: `+91 ${formData.mobile}`,
      email: formData.email.trim().toLowerCase(),
      role: formData.role,
      district: formData.district,
      village: formData.village,
      isAadhaarVerified: isAadhaarVerified
    });

    navigate('/');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#FAF8F5]">
      <div className="max-w-lg w-full space-y-8 bg-white p-8 rounded-3xl shadow-xl border border-slate-200">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-[#005A36] text-amber-400 mx-auto flex items-center justify-center shadow-lg border-2 border-amber-400">
            <Shield className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            SAMASYA NIVARK
          </h2>
          <p className="text-xs text-slate-500 font-bold">
            Create New Account — "From Community Problems to Real-World Solutions."
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-700 text-xs p-3 rounded-lg border border-red-200">
            {error}
          </div>
        )}

        <form className="space-y-4 text-xs" onSubmit={handleSubmit}>
          
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Account Type / Role <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold text-slate-800"
            >
              <option value="citizen">Citizen / Villager</option>
              <option value="student">Student / Researcher</option>
              <option value="university">University / Faculty</option>
              <option value="industry">Industry / CSR Partner</option>
              <option value="government">Government / Admin</option>
              <option value="ngo">NGO / Community Organization</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Full Name</label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Rameshwar Tudu"
                className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Mobile Number</label>
              <div className="relative flex">
                <span className="inline-flex items-center px-2.5 rounded-l-xl border border-r-0 border-slate-300 bg-slate-100 text-slate-600 font-bold">
                  +91
                </span>
                <input
                  type="tel"
                  required
                  maxLength={10}
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value.replace(/\D/g, '') })}
                  placeholder="10-digit mobile"
                  className="w-full pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-r-xl font-mono font-bold"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Gmail Address <span className="text-red-500">*</span></label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="yourname@gmail.com"
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-medium"
              />
              <p className="text-[10px] text-slate-400 mt-0.5">Only @gmail.com addresses are accepted</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Home District</label>
              <select
                value={formData.district}
                onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold"
              >
                {JHARKHAND_DISTRICTS.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Village / Town</label>
              <input
                type="text"
                value={formData.village}
                onChange={(e) => setFormData({ ...formData, village: e.target.value })}
                placeholder="e.g. Jama"
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-medium"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Password</label>
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="Create password"
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-medium"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Confirm Password</label>
              <input
                type="password"
                required
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                placeholder="Confirm password"
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-medium"
              />
            </div>
          </div>

          {/* Optional Mock Aadhaar Verification (Section 5) */}
          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center justify-between text-xs">
            <span className="font-bold text-emerald-950 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#005A36]" />
              {isAadhaarVerified ? '✓ Aadhaar Verified' : 'Identity Verification'}
            </span>

            <button
              type="button"
              onClick={() => setIsAadhaarModalOpen(true)}
              className="text-[11px] font-extrabold text-[#005A36] hover:underline bg-white px-2.5 py-1 rounded border border-emerald-300"
            >
              {isAadhaarVerified ? 'Verified' : 'Verify Identity (Aadhaar)'}
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-4 rounded-xl font-black text-sm text-white bg-[#005A36] hover:bg-[#003D24] shadow-md transition-all flex items-center justify-center gap-2 mt-4"
          >
            <span>CREATE ACCOUNT</span>
            <ArrowRight className="w-4 h-4 text-amber-400" />
          </button>
        </form>

        <div className="text-center pt-4 border-t border-slate-100">
          <p className="text-xs text-slate-600">
            Already registered?{' '}
            <Link to="/login" className="font-bold text-[#005A36] hover:underline">
              Sign In Here
            </Link>
          </p>
        </div>

      </div>

      <MockAadhaarModal
        isOpen={isAadhaarModalOpen}
        onClose={() => setIsAadhaarModalOpen(false)}
        onVerified={() => setIsAadhaarVerified(true)}
      />
    </div>
  );
};
