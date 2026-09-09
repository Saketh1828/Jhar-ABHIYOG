import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Users, Calendar, ThumbsUp, ArrowRight, Shield } from 'lucide-react';
import { StatusBadge } from './StatusBadge';
import { PriorityBadge } from './PriorityBadge';
import { useApp } from '../../context/AppContext';

export const ChallengeCard = ({ problem }) => {
  const { supportProblem } = useApp();

  const handleSupport = (e) => {
    e.preventDefault();
    e.stopPropagation();
    supportProblem(problem.id);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col justify-between group">
      {/* Header Banner */}
      <div>
        <div className="relative h-44 overflow-hidden bg-slate-100">
          <img 
            src={problem.photos && problem.photos[0] ? problem.photos[0] : "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?w=800&q=80"} 
            alt={problem.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
          
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            <PriorityBadge priority={problem.priority} size="sm" />
          </div>
          
          <div className="absolute top-3 right-3">
            <StatusBadge status={problem.status} size="sm" />
          </div>

          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs font-medium">
            <span className="bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/20 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              {problem.district}, Jharkhand
            </span>
            <span className="bg-emerald-900/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-emerald-400/30 text-emerald-200">
              {problem.category}
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center justify-between">
            <span>ID: {problem.id}</span>
            <span className="flex items-center gap-1 text-slate-500">
              <Calendar className="w-3 h-3" />
              {problem.dateReported}
            </span>
          </div>

          <h3 className="font-bold text-slate-900 text-lg line-clamp-2 group-hover:text-[#005A36] transition-colors leading-snug mb-2">
            {problem.title}
          </h3>

          <p className="text-slate-600 text-sm line-clamp-2 mb-4 leading-relaxed">
            {problem.description}
          </p>

          {/* Details Row */}
          <div className="grid grid-cols-2 gap-2 p-3 bg-[#FAF8F5] rounded-lg border border-slate-200/60 mb-4 text-xs">
            <div className="flex items-center gap-2 text-slate-700">
              <Users className="w-4 h-4 text-amber-600 shrink-0" />
              <div>
                <span className="block font-bold text-slate-900">{problem.affectedPeople.toLocaleString()}</span>
                <span className="text-slate-500 text-[11px]">People Affected</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-slate-700">
              <Shield className="w-4 h-4 text-[#005A36] shrink-0" />
              <div>
                <span className="block font-bold text-slate-900 truncate">{problem.targetResponse.replace('Target attention: ', '')}</span>
                <span className="text-slate-500 text-[11px]">Target SLA</span>
              </div>
            </div>
          </div>

          {problem.assignedTeam && (
            <div className="mb-4 text-xs bg-purple-50 text-purple-900 p-2.5 rounded-md border border-purple-200">
              <span className="font-bold block">Assigned Solver:</span>
              <span className="text-purple-700">{problem.assignedTeam}</span>
            </div>
          )}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="px-5 pb-5 pt-0 flex items-center justify-between gap-2 border-t border-slate-100 pt-3">
        <button
          onClick={handleSupport}
          className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-emerald-50 hover:text-[#005A36] rounded-lg transition-colors border border-slate-200"
          title="Support this societal problem"
        >
          <ThumbsUp className="w-3.5 h-3.5 text-amber-600" />
          <span>{problem.supportersCount} Support</span>
        </button>

        <Link
          to={`/problem/${problem.id}`}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-[#005A36] hover:bg-[#003D24] rounded-lg transition-all shadow-sm hover:shadow"
        >
          <span>View Details</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
