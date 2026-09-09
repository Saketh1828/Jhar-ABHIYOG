import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Building2, Handshake, HeartHandshake, ShieldCheck, ArrowRight, DollarSign, Award } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PriorityBadge } from '../components/common/PriorityBadge';
import { StatusBadge } from '../components/common/StatusBadge';
import { Modal } from '../components/common/Modal';

export const IndustryPortal = () => {
  const { problems, currentUser } = useApp();
  const [selectedIndustryChallenge, setSelectedIndustryChallenge] = useState(null);
  const [offerType, setOfferType] = useState('Mentorship');
  const [companyName, setCompanyName] = useState(currentUser.organization || 'Tata Steel CSR Division');

  const handlePledgeSupport = (e) => {
    e.preventDefault();
    alert(`Thank you! ${companyName} has successfully registered a ${offerType} pledge for challenge #${selectedIndustryChallenge.id}.`);
    setSelectedIndustryChallenge(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Industry Header */}
      <div className="bg-gradient-to-r from-amber-900 via-amber-800 to-slate-900 text-white p-8 rounded-3xl shadow-xl border-b-4 border-amber-400 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-wider mb-2">
            <Building2 className="w-5 h-5 text-amber-400" />
            <span>Corporate & CSR Collaboration Portal</span>
          </div>
          <h1 className="text-3xl font-extrabold">Industry Mentorship & CSR Sponsorship</h1>
          <p className="text-amber-100 text-sm mt-1 max-w-2xl">
            Partner with student innovation teams & local administration across Jharkhand to fund equipment, technical mentorship, and prototype deployment.
          </p>
        </div>

        <div className="bg-amber-950 p-4 rounded-2xl border border-amber-700 text-xs shrink-0 space-y-1">
          <span className="text-amber-300 block font-bold">Active Corporate Partners</span>
          <span className="text-2xl font-black text-white">45 CSR Organizations</span>
        </div>
      </div>

      {/* Grid of Industry Opportunities */}
      <div className="space-y-4">
        <h2 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
          <HeartHandshake className="w-6 h-6 text-amber-600" />
          <span>Challenges Seeking Industry Expertise & Hardware</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {problems.map((challenge) => (
            <div key={challenge.id} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-4 flex flex-col justify-between">
              
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="font-mono text-xs font-bold text-amber-900 bg-amber-50 px-2.5 py-0.5 rounded border border-amber-200">
                    ID: {challenge.id}
                  </span>
                  <StatusBadge status={challenge.status} size="sm" />
                </div>

                <h3 className="font-bold text-slate-900 text-lg mb-2">{challenge.title}</h3>
                <p className="text-slate-600 text-xs line-clamp-2 leading-relaxed mb-3">{challenge.description}</p>

                <div className="p-3 bg-slate-50 rounded-xl border space-y-1.5 text-xs">
                  <div className="flex justify-between text-slate-700">
                    <span className="font-semibold text-slate-500">Assigned Student Solver:</span>
                    <span className="font-bold text-indigo-700">{challenge.assignedTeam || 'Seeking Student Team'}</span>
                  </div>
                  <div className="flex justify-between text-slate-700">
                    <span className="font-semibold text-slate-500">Required Expertise:</span>
                    <span className="font-bold text-slate-900">{challenge.category} Engineering</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between gap-2 pt-4 border-t border-slate-100">
                <button
                  onClick={() => {
                    setSelectedIndustryChallenge(challenge);
                    setOfferType('Mentorship');
                  }}
                  className="px-3.5 py-2 bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-extrabold rounded-lg transition-colors border border-amber-300"
                >
                  Offer Mentorship
                </button>

                <button
                  onClick={() => {
                    setSelectedIndustryChallenge(challenge);
                    setOfferType('Hardware Sponsorship');
                  }}
                  className="px-3.5 py-2 bg-[#005A36] hover:bg-[#003D24] text-white text-xs font-extrabold rounded-lg transition-colors shadow-sm"
                >
                  Support Project
                </button>

                <Link
                  to={`/problem/${challenge.id}`}
                  className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-lg transition-colors"
                >
                  View Details
                </Link>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* Support Pledge Modal */}
      <Modal
        isOpen={!!selectedIndustryChallenge}
        onClose={() => setSelectedIndustryChallenge(null)}
        title="Pledge Industry Support & Corporate Sponsorship"
        maxWidth="max-w-md"
      >
        {selectedIndustryChallenge && (
          <form onSubmit={handlePledgeSupport} className="space-y-4">
            <div className="p-3 bg-amber-50 text-amber-950 rounded-xl text-xs font-semibold border border-amber-200">
              Supporting: {selectedIndustryChallenge.title}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Company / Organization Name</label>
              <input
                type="text"
                required
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border rounded-lg text-xs font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Support Type</label>
              <select
                value={offerType}
                onChange={(e) => setOfferType(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border rounded-lg text-xs font-bold"
              >
                <option value="Technical Mentorship">Technical Mentorship</option>
                <option value="Hardware Sponsorship">Hardware & Equipment Funding</option>
                <option value="CSR Grant Support">CSR Grant Sponsorship</option>
                <option value="Pilot Testing Facility">Pilot Testing Facility</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#005A36] hover:bg-[#003D24] text-white font-extrabold text-xs rounded-xl shadow"
            >
              Confirm Corporate Pledge
            </button>
          </form>
        )}
      </Modal>

    </div>
  );
};
