import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Award, Sparkles, Building2, Calendar, ArrowRight, X } from 'lucide-react';

export const ResolvedAnimationModal = ({ problem, onClose }) => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    if (problem) {
      // Generate 24 random confetti particles
      const newParticles = Array.from({ length: 24 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100 - 50,
        y: Math.random() * -120 - 20,
        size: Math.random() * 8 + 4,
        color: ['#005A36', '#D99B00', '#B84A17', '#4F46E5', '#10B981'][Math.floor(Math.random() * 5)],
        delay: Math.random() * 0.3
      }));
      setParticles(newParticles);
    }
  }, [problem]);

  if (!problem) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md animate-fadeIn">
      
      {/* Particle Canvas Simulation */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
        {particles.map(p => (
          <div
            key={p.id}
            className="absolute rounded-full animate-ping"
            style={{
              width: `${p.size}px`,
              height: `${p.size}px`,
              backgroundColor: p.color,
              transform: `translate(${p.x * 4}px, ${p.y * 3}px)`,
              animationDuration: `${1.5 + Math.random()}s`,
              animationDelay: `${p.delay}s`
            }}
          />
        ))}
      </div>

      {/* Main Animated Card */}
      <div className="bg-white rounded-3xl shadow-2xl border-4 border-emerald-500 w-full max-w-lg overflow-hidden relative transform transition-all scale-100 animate-bounceIn text-slate-800">
        
        {/* Top Banner */}
        <div className="bg-gradient-to-r from-[#005A36] via-emerald-800 to-[#003D24] text-white p-6 text-center relative overflow-hidden">
          
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-1 text-emerald-200 hover:text-white rounded-full hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-16 h-16 rounded-full bg-white text-[#005A36] mx-auto flex items-center justify-center shadow-xl border-4 border-amber-400 mb-3 animate-pulse">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" /> 🎉 Problem Resolved!
          </div>

          <h2 className="text-xl sm:text-2xl font-black">
            Societal Impact Achieved!
          </h2>
          <p className="text-emerald-100 text-xs mt-1">
            "Your reported problem has been successfully resolved."
          </p>

        </div>

        {/* Card Body Details */}
        <div className="p-6 space-y-4 bg-slate-50/50">
          
          <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-3">
            
            <div className="flex items-center justify-between border-b pb-2 text-xs">
              <span className="font-mono font-bold text-[#005A36] bg-emerald-100 px-2 py-0.5 rounded">
                ✓ Report ID: {problem.id}
              </span>
              <span className="text-slate-500 font-medium flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                ✓ Resolved: {problem.resolutionDate || new Date().toISOString().split('T')[0]}
              </span>
            </div>

            <div>
              <h3 className="font-extrabold text-slate-900 text-base leading-snug">
                ✓ {problem.title}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Location: {problem.village || 'Village'}, {problem.district}, Jharkhand
              </p>
            </div>

            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs space-y-1">
              <span className="text-[10px] text-emerald-800 font-extrabold uppercase block">
                ✓ Resolving Department / Institution
              </span>
              <span className="font-bold text-[#005A36] flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-emerald-700" />
                {problem.assignedDepartment || problem.assignedTeam || "DWSD Dumka & BIT Mesra"}
              </span>
            </div>

            {problem.solutionProposed && (
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs">
                <span className="font-extrabold text-amber-900 block text-[10px] uppercase">Ground Resolution Outcome:</span>
                <p className="text-amber-950 font-medium mt-0.5">{problem.solutionProposed}</p>
              </div>
            )}

          </div>

          <div className="flex items-center gap-3 pt-2">
            <Link
              to={`/problem/${problem.id}`}
              onClick={onClose}
              className="flex-1 py-3 px-4 bg-[#005A36] hover:bg-[#003D24] text-white font-extrabold text-xs rounded-xl shadow-md text-center flex items-center justify-center gap-2 transition-all"
            >
              <span>View Full Details</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <button
              onClick={onClose}
              className="px-5 py-3 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs rounded-xl transition-colors"
            >
              Close
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
