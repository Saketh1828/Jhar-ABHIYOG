import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, ArrowLeft, Home, User, Shield } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AccessDenied = ({ requiredRole = "SUPER_ADMIN", currentRole = "CITIZEN" }) => {
  const { currentUser, switchRole } = useApp();

  return (
    <div className="min-h-[75vh] flex items-center justify-center p-4 bg-[#FAF8F5]">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-xl border-2 border-red-200 text-center space-y-6">
        
        <div className="w-20 h-20 rounded-full bg-red-100 text-red-600 mx-auto flex items-center justify-center shadow-inner border-4 border-red-200 animate-pulse">
          <ShieldAlert className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="bg-red-100 text-red-800 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
            403 — Access Denied
          </span>
          <h1 className="text-2xl font-black text-slate-900">
            Permission Restricted
          </h1>
          <p className="text-slate-600 text-xs leading-relaxed max-w-sm mx-auto">
            "You don't have permission to access this page."
          </p>
        </div>

        <div className="p-4 bg-slate-50 rounded-2xl border text-xs text-left space-y-2 font-medium">
          <div className="flex justify-between">
            <span className="text-slate-500">Current User:</span>
            <span className="font-bold text-slate-900">{currentUser.name || 'User'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Current Role:</span>
            <span className="font-extrabold text-red-600 uppercase">{currentUser.role || currentRole}</span>
          </div>
          <div className="flex justify-between border-t pt-2 mt-1">
            <span className="text-slate-500">Required Role:</span>
            <span className="font-extrabold text-[#005A36] uppercase">{requiredRole}</span>
          </div>
        </div>

        {/* Prototype Demo Role Switcher Helper */}
        <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-left text-xs space-y-2">
          <span className="font-extrabold text-amber-900 block">Demonstration Shortcut:</span>
          <p className="text-[11px] text-amber-800">
            Switch to an authorized admin account below to view this dashboard:
          </p>
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={() => {
                switchRole('SUPER_ADMIN');
                window.location.reload();
              }}
              className="px-2.5 py-1.5 bg-[#005A36] text-white font-bold rounded-lg text-[10px]"
            >
              Switch to Super Admin
            </button>
            <button
              onClick={() => {
                switchRole('UNIVERSITY_ADMIN');
                window.location.reload();
              }}
              className="px-2.5 py-1.5 bg-indigo-600 text-white font-bold rounded-lg text-[10px]"
            >
              Switch to University Admin
            </button>
          </div>
        </div>

        <div className="flex justify-center gap-3 pt-2">
          <Link
            to="/"
            className="w-full py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs rounded-xl shadow inline-flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4 text-amber-400" />
            <span>Return to Home Dashboard</span>
          </Link>
        </div>

      </div>
    </div>
  );
};
