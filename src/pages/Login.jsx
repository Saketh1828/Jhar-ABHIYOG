import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Phone, Lock, User, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Login = () => {
  const { loginUser } = useApp();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: 'Birsa Soren',
    mobile: '9876543210',
    password: 'password123',
    role: 'citizen',
    district: 'Dumka'
  });

  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.mobile || formData.mobile.length < 10) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }
    if (!formData.name) {
      setError('Please enter your name.');
      return;
    }

    loginUser({
      name: formData.name,
      mobile: `+91 ${formData.mobile}`,
      role: formData.role,
      district: formData.district
    });

    navigate('/');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#FAF8F5]">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl border border-slate-200">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-[#005A36] text-amber-400 mx-auto flex items-center justify-center shadow-lg border-2 border-amber-400">
            <Shield className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Citizen & Stakeholder Login
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Jharkhand Samadhan • Crowdsourced Problem Solving Portal
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
              <option value="government">Government Official</option>
              <option value="industry">Industry / CSR Partner</option>
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
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-[#005A36] focus:outline-none"
              />
            </div>
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
                className="w-full pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-r-xl text-sm focus:ring-2 focus:ring-[#005A36] focus:outline-none font-mono"
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
                onClick={() => alert("Prototype Notice: Use default password 'password123' to sign in instantly.")}
                className="text-[11px] font-bold text-[#005A36] hover:underline"
              >
                Forgot Password?
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

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3.5 px-4 rounded-xl font-extrabold text-sm text-white bg-[#005A36] hover:bg-[#003D24] shadow-md transition-all flex items-center justify-center gap-2"
          >
            <span>SIGN IN TO PLATFORM</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center pt-4 border-t border-slate-100">
          <p className="text-xs text-slate-600">
            Don't have an account?{' '}
            <Link to="/register" className="font-bold text-[#B84A17] hover:underline">
              New User Registration
            </Link>
          </p>
        </div>

        <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-900 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
          <span>Prototype Mode: Click Sign In directly to log in with mock credentials.</span>
        </div>

      </div>
    </div>
  );
};
