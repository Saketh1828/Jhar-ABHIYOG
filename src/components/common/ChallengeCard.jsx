import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Users, Calendar, Heart, Eye, ArrowRight, Shield, Check } from 'lucide-react';
import { StatusBadge } from './StatusBadge';
import { PriorityBadge } from './PriorityBadge';
import { useApp } from '../../context/AppContext';

export const ChallengeCard = ({ problem }) => {
  const { likedProblemIds, toggleLike, trackedProblemIds, toggleTrack } = useApp();

  const isLiked = likedProblemIds.includes(problem.id);
  const isTracked = trackedProblemIds.includes(problem.id);

  const handleSupportClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleLike(problem.id);
  };

  const handleTrackClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleTrack(problem.id);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col justify-between group">
      
      {/* Header Banner */}
      <div>
        <div className="relative h-44 overflow-hidden bg-slate-100">
          <img 
            src={problem.photos && problem.photos[0] ? problem.photos[0] : "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?w=800&q=80"} 
            alt={problem.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
          
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            <PriorityBadge priority={problem.priority} size="sm" />
          </div>
          
          <div className="absolute top-3 right-3 flex items-center gap-1">
            <StatusBadge status={problem.status} size="sm" />
          </div>

          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs font-medium">
            <span className="bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/20 flex items-center gap-1 font-semibold">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              {problem.district}, JH
            </span>
            <span className="bg-emerald-900/90 backdrop-blur-md px-2.5 py-1 rounded-md border border-emerald-400/30 text-emerald-200 font-bold">
              {problem.category}
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center justify-between">
            <span className="font-mono text-[#005A36] bg-emerald-50 px-1.5 py-0.5 rounded">ID: {problem.id}</span>
            <span className="flex items-center gap-1 text-slate-500">
              <Calendar className="w-3 h-3" />
              {problem.dateReported}
            </span>
          </div>

          <h3 className="font-extrabold text-slate-900 text-base line-clamp-2 group-hover:text-[#005A36] transition-colors leading-snug mb-2">
            {problem.title}
          </h3>

          <p className="text-slate-600 text-xs line-clamp-2 mb-4 leading-relaxed">
            {problem.description}
          </p>

          {/* Impact Stats */}
          <div className="grid grid-cols-2 gap-2 p-3 bg-[#FAF8F5] rounded-xl border border-slate-200/60 mb-4 text-xs">
            <div className="flex items-center gap-2 text-slate-700">
              <Users className="w-4 h-4 text-amber-600 shrink-0" />
              <div>
                <span className="block font-extrabold text-slate-900">{problem.affectedPeople.toLocaleString()}</span>
                <span className="text-slate-500 text-[10px]">People Affected</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-slate-700">
              <Shield className="w-4 h-4 text-[#005A36] shrink-0" />
              <div>
                <span className="block font-extrabold text-slate-900 truncate">
                  {problem.targetResponse ? problem.targetResponse.replace('Target attention: ', '') : '2 Days'}
                </span>
                <span className="text-slate-500 text-[10px]">Target SLA</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Actions (Like + Track + View Details) */}
      <div className="px-5 pb-5 pt-0 flex items-center justify-between gap-1.5 border-t border-slate-100 pt-3">
        
        {/* Support / Like Button (Section 23) */}
        <button
          onClick={handleSupportClick}
          className={`flex items-center gap-1 px-2.5 py-2 text-xs font-bold rounded-lg transition-all border ${
            isLiked 
              ? 'bg-rose-50 text-rose-700 border-rose-300 shadow-sm' 
              : 'bg-slate-100 hover:bg-rose-50 text-slate-700 border-slate-200'
          }`}
          title={isLiked ? "Click to Unlike" : "Support this societal problem"}
        >
          <Heart className={`w-4 h-4 ${isLiked ? 'fill-rose-600 text-rose-600 animate-pulse' : 'text-slate-500'}`} />
          <span>{problem.supportersCount}</span>
        </button>

        {/* Track Problem Button (Section 24) */}
        <button
          onClick={handleTrackClick}
          className={`flex items-center gap-1 px-2.5 py-2 text-xs font-bold rounded-lg transition-all border ${
            isTracked
              ? 'bg-indigo-50 text-indigo-800 border-indigo-300'
              : 'bg-slate-100 hover:bg-indigo-50 text-slate-700 border-slate-200'
          }`}
          title={isTracked ? "Currently tracking updates" : "Track this problem"}
        >
          {isTracked ? <Check className="w-3.5 h-3.5 text-indigo-700" /> : <Eye className="w-3.5 h-3.5 text-indigo-600" />}
          <span>{isTracked ? 'Tracking' : 'Track'}</span>
        </button>

        {/* View Details */}
        <Link
          to={`/problem/${problem.id}`}
          className="inline-flex items-center gap-1 px-3 py-2 text-xs font-extrabold text-white bg-[#005A36] hover:bg-[#003D24] rounded-lg transition-all shadow-sm shrink-0"
        >
          <span>Details</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
