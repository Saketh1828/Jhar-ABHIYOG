import React, { useState } from 'react';
import { User, Phone, MapPin, Shield, GraduationCap, Building2, CheckCircle2, Edit } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Profile = () => {
  const { currentUser, problems, switchRole } = useApp();

  const userReports = problems.filter(p => p.reportedBy === currentUser.name || p.id === "JH-2026-8901");
  const resolvedCount = userReports.filter(p => p.status === 'Resolved').length;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Profile Header */}
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
        
        <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-slate-100">
          <div className="w-24 h-24 rounded-full bg-[#005A36] text-amber-400 text-3xl font-black flex items-center justify-center border-4 border-amber-400 shadow-lg">
            {currentUser.name ? currentUser.name.charAt(0) : 'U'}
          </div>

          <div className="text-center sm:text-left space-y-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900">{currentUser.name || "Birsa Soren"}</h1>
              <span className="bg-amber-100 text-amber-900 font-extrabold text-xs px-3 py-1 rounded-full uppercase border border-amber-300">
                {currentUser.role} Profile
              </span>
            </div>
            <p className="text-slate-500 text-sm font-medium flex items-center justify-center sm:justify-start gap-1">
              <Phone className="w-4 h-4 text-emerald-600" /> {currentUser.mobile || "+91 98765 43210"}
            </p>
          </div>
        </div>

        {/* Role Switcher Pills */}
        <div className="space-y-2">
          <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider block">Switch Active Profile Mode</span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { id: 'citizen', label: 'Citizen', icon: User },
              { id: 'student', label: 'Student', icon: GraduationCap },
              { id: 'government', label: 'Government', icon: Shield },
              { id: 'industry', label: 'Organization', icon: Building2 },
            ].map(roleItem => {
              const Icon = roleItem.icon;
              return (
                <button
                  key={roleItem.id}
                  onClick={() => switchRole(roleItem.id)}
                  className={`p-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border transition-all ${
                    currentUser.role === roleItem.id 
                      ? 'bg-[#005A36] text-white border-[#005A36] shadow' 
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{roleItem.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Role-Specific Stats & Content */}
        {currentUser.role === 'citizen' && (
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <h3 className="text-base font-extrabold text-slate-900">Citizen Profile Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-[#FAF8F5] rounded-xl border border-slate-200">
                <span className="text-slate-400 font-bold block text-[10px] uppercase">Home Location</span>
                <span className="font-bold text-slate-800 text-sm flex items-center gap-1 mt-1">
                  <MapPin className="w-4 h-4 text-[#B84A17]" />
                  {currentUser.village || 'Jama'}, {currentUser.district || 'Dumka'}
                </span>
              </div>

              <div className="p-4 bg-[#FAF8F5] rounded-xl border border-slate-200">
                <span className="text-slate-400 font-bold block text-[10px] uppercase">Reports Submitted</span>
                <span className="font-black text-[#005A36] text-xl block mt-0.5">
                  {userReports.length} Reports
                </span>
              </div>

              <div className="p-4 bg-[#FAF8F5] rounded-xl border border-slate-200">
                <span className="text-slate-400 font-bold block text-[10px] uppercase">Problems Resolved</span>
                <span className="font-black text-emerald-700 text-xl block mt-0.5">
                  {resolvedCount} Resolved
                </span>
              </div>
            </div>
          </div>
        )}

        {currentUser.role === 'student' && (
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <h3 className="text-base font-extrabold text-slate-900">Student & Researcher Profile</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-indigo-50/60 rounded-xl border border-indigo-200">
                <span className="text-indigo-900 font-extrabold block text-xs">Affiliated University</span>
                <span className="font-bold text-slate-800 text-sm block mt-1">
                  {currentUser.university || 'BIT Mesra / NIT Jamshedpur'}
                </span>
              </div>

              <div className="p-4 bg-indigo-50/60 rounded-xl border border-indigo-200">
                <span className="text-indigo-900 font-extrabold block text-xs">Solutions Proposed</span>
                <span className="font-black text-indigo-700 text-xl block mt-0.5">
                  3 Innovation Blueprints
                </span>
              </div>
            </div>
          </div>
        )}

        {(currentUser.role === 'industry' || currentUser.role === 'government') && (
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <h3 className="text-base font-extrabold text-slate-900">Organization & Authority Profile</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-amber-50/60 rounded-xl border border-amber-200">
                <span className="text-amber-900 font-extrabold block text-xs">Organization Name</span>
                <span className="font-bold text-slate-800 text-sm block mt-1">
                  {currentUser.organization || 'Government of Jharkhand / Tata Steel CSR'}
                </span>
              </div>

              <div className="p-4 bg-amber-50/60 rounded-xl border border-amber-200">
                <span className="text-amber-900 font-extrabold block text-xs">Active Collaborations</span>
                <span className="font-black text-amber-800 text-xl block mt-0.5">
                  12 Active Projects
                </span>
              </div>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
