import React, { useState } from 'react';
import { 
  Building2, 
  Handshake, 
  HeartHandshake, 
  Users, 
  Sparkles, 
  CheckCircle2, 
  PlusCircle, 
  Layers, 
  Mail, 
  ArrowRight,
  ShieldAlert
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { StatusBadge } from '../components/common/StatusBadge';
import { PriorityBadge } from '../components/common/PriorityBadge';
import { OfferMembershipModal } from '../components/common/OfferMembershipModal';

export const IndustryAdminDashboard = () => {
  const { currentUser, problems, setIsDemoEmailModalOpen } = useApp();

  const industryName = currentUser.organization || "Tata Steel CSR Division";
  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'sponsorships', 'membership'
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);

  const supportedProblems = problems.filter(p => p.industryPartner?.includes('Tata') || p.status === 'In Progress' || p.status === 'Resolved');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-amber-950 via-amber-900 to-slate-900 text-white p-8 rounded-3xl shadow-xl border-b-4 border-amber-400 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-amber-400 text-slate-950 font-black text-xs px-3 py-1 rounded-full uppercase tracking-wider">
              LEVEL 3 — INDUSTRY ADMIN
            </span>
            <span className="bg-amber-950 text-amber-200 text-xs font-bold px-3 py-1 rounded-full border border-amber-700">
              Organization: {industryName}
            </span>
          </div>
          <h1 className="text-3xl font-black">{industryName} CSR Portal</h1>
          <p className="text-amber-100 text-xs sm:text-sm mt-1 max-w-2xl">
            Sponsor equipment, fund university engineering prototypes, offer technical mentorship, & manage corporate membership offers.
          </p>
        </div>

        <button
          onClick={() => setIsOfferModalOpen(true)}
          className="px-5 py-3 bg-[#005A36] hover:bg-emerald-800 text-white font-black text-xs rounded-xl shadow border border-emerald-400 flex items-center gap-1.5 shrink-0"
        >
          <Mail className="w-4 h-4 text-amber-300" /> Offer Corporate Membership
        </button>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 text-xs">
        <div className="bg-white p-4 rounded-2xl border text-center shadow-sm">
          <span className="text-2xl font-black text-amber-800 block">12</span>
          <span className="text-[10px] text-slate-500 font-bold uppercase">CSR Projects Sponsored</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border text-center shadow-sm">
          <span className="text-2xl font-black text-indigo-700 block">5</span>
          <span className="text-[10px] text-slate-500 font-bold uppercase">University Partnerships</span>
        </div>

        <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 text-center shadow-sm">
          <span className="text-2xl font-black text-amber-900 block">{supportedProblems.length}</span>
          <span className="text-[10px] text-amber-950 font-extrabold uppercase">Adopted Challenges</span>
        </div>

        <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200 text-center shadow-sm">
          <span className="text-2xl font-black text-[#005A36] block">₹45 Lakhs</span>
          <span className="text-[10px] text-emerald-900 font-bold uppercase">CSR Grants Pledged</span>
        </div>

        <div className="bg-purple-50 p-4 rounded-2xl border border-purple-200 text-center shadow-sm">
          <span className="text-2xl font-black text-purple-800 block">8</span>
          <span className="text-[10px] text-purple-900 font-bold uppercase">Membership Offers</span>
        </div>

        <div className="bg-slate-900 text-white p-4 rounded-2xl text-center shadow-sm">
          <span className="text-xl font-black text-amber-400 block">4,200+</span>
          <span className="text-[10px] text-slate-300 font-bold uppercase">Citizens Benefited</span>
        </div>
      </div>

      {/* Industry Admin Sidebar / Navigation Tabs (Section 17) */}
      <div className="bg-white rounded-2xl p-2 shadow-sm border border-slate-200 flex flex-wrap items-center gap-1 text-xs font-bold">
        {[
          { id: 'overview', label: 'CSR Overview', icon: Layers },
          { id: 'sponsorships', label: `Supported Projects (${supportedProblems.length})`, icon: HeartHandshake },
          { id: 'membership', label: 'Membership Offers & Emails', icon: Mail },
        ].map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5 ${
                activeTab === tab.id 
                  ? 'bg-amber-600 text-white shadow font-extrabold' 
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB: SPONSORED PROJECTS */}
      {activeTab === 'sponsorships' && (
        <div className="space-y-4">
          <h3 className="font-black text-lg text-slate-900">CSR Sponsored Societal Projects</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            {supportedProblems.map(p => (
              <div key={p.id} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-mono font-bold text-[#005A36] bg-emerald-50 px-2 py-0.5 rounded">ID: {p.id}</span>
                  <StatusBadge status={p.status} size="sm" />
                </div>
                <h4 className="font-extrabold text-base text-slate-900">{p.title}</h4>
                <p className="text-slate-600 line-clamp-2">{p.description}</p>
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 font-medium">
                  <strong>CSR Partner:</strong> {industryName} • <strong>Academic Solver:</strong> {p.assignedTeam || "BIT Mesra Team"}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Offer Membership Modal */}
      <OfferMembershipModal
        isOpen={isOfferModalOpen}
        onClose={() => setIsOfferModalOpen(false)}
        targetUser={{ name: "Ankit Kumar", email: "student.demo@samasya.example" }}
        challenge={supportedProblems[0]}
      />

    </div>
  );
};
