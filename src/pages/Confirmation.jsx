import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ShieldCheck, MapPin, Users, Calendar, ArrowRight, FileText } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PriorityBadge } from '../components/common/PriorityBadge';
import { StatusBadge } from '../components/common/StatusBadge';

export const Confirmation = () => {
  const { problems, lastSubmittedId } = useApp();
  
  const problem = problems.find(p => p.id === lastSubmittedId) || problems[0];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-2xl border-2 border-emerald-500 text-center space-y-8">
        
        {/* Success Icon */}
        <div className="w-20 h-20 rounded-full bg-emerald-100 text-[#005A36] mx-auto flex items-center justify-center shadow-inner border-4 border-emerald-300 animate-bounce">
          <CheckCircle2 className="w-12 h-12" />
        </div>

        <div className="space-y-2">
          <span className="bg-emerald-100 text-[#005A36] text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
            Official Receipt Logged
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
            Problem Reported Successfully!
          </h1>
          <p className="text-slate-600 text-sm max-w-lg mx-auto">
            Your societal challenge has been submitted to the Jharkhand Samadhan platform and assigned a unique tracking ID.
          </p>
        </div>

        {/* Receipt Details Card */}
        <div className="bg-[#FAF8F5] rounded-2xl p-6 border border-slate-200 text-left space-y-4 max-w-xl mx-auto">
          
          <div className="flex flex-wrap items-center justify-between pb-3 border-b border-slate-200/80 gap-2">
            <div>
              <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block">Official Tracking ID</span>
              <span className="text-lg font-black text-[#005A36] font-mono">{problem.id}</span>
            </div>
            <StatusBadge status={problem.status} />
          </div>

          <div>
            <h3 className="font-extrabold text-slate-900 text-base mb-1">{problem.title}</h3>
            <p className="text-xs text-slate-600 line-clamp-2">{problem.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
            <div className="p-3 bg-white rounded-xl border border-slate-200">
              <span className="text-[10px] text-slate-400 font-bold block uppercase">Location</span>
              <span className="font-bold text-slate-800 flex items-center gap-1 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-[#B84A17]" />
                {problem.village || 'Village'}, {problem.district}
              </span>
            </div>

            <div className="p-3 bg-white rounded-xl border border-slate-200">
              <span className="text-[10px] text-slate-400 font-bold block uppercase">People Affected</span>
              <span className="font-bold text-slate-800 flex items-center gap-1 mt-0.5">
                <Users className="w-3.5 h-3.5 text-amber-600" />
                {problem.affectedPeople} Citizens
              </span>
            </div>
          </div>

          <div className="p-4 bg-emerald-900 text-white rounded-xl flex items-center justify-between">
            <div>
              <span className="text-[10px] text-amber-300 font-bold uppercase block">Calculated System Priority</span>
              <PriorityBadge priority={problem.priority} size="sm" showPulse={false} />
            </div>
            <div className="text-right">
              <span className="text-[10px] text-emerald-200 block">Target SLA</span>
              <span className="text-xs font-bold text-white">{problem.targetResponse}</span>
            </div>
          </div>

        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <Link
            to="/my-reports"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-black text-sm text-white bg-[#005A36] hover:bg-[#003D24] shadow-lg transition-all"
          >
            <FileText className="w-5 h-5" />
            <span>TRACK MY REPORT STATUS</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            to="/explore"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold text-sm text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
          >
            <span>Explore Other Challenges</span>
          </Link>
        </div>

      </div>
    </div>
  );
};
