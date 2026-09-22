import React from 'react';
import { Link } from 'react-router-dom';
import { Eye, MapPin, Users, Calendar, ArrowRight, ShieldCheck, Trash2, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { StatusBadge } from '../components/common/StatusBadge';
import { PriorityBadge } from '../components/common/PriorityBadge';
import { ProgressTracker } from '../components/common/ProgressTracker';

export const TrackedProblems = () => {
  const { problems, trackedProblemIds, toggleTrack } = useApp();

  const trackedList = problems.filter(p => trackedProblemIds.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-700 uppercase tracking-wider mb-1">
            <Eye className="w-4 h-4 text-indigo-600" />
            <span>Citizen Monitoring Dashboard</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900">
            My Tracked Problems
          </h1>
          <p className="text-slate-600 text-sm mt-1 max-w-2xl">
            Monitor societal challenges submitted by fellow citizens across Jharkhand to stay updated on ground resolution progress.
          </p>
        </div>

        <Link
          to="/explore"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-xs text-white bg-[#005A36] hover:bg-[#003D24] shadow transition-colors shrink-0"
        >
          <span>Find More Problems to Track</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Cards List */}
      <div className="space-y-6">
        {trackedList.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 space-y-3">
            <Eye className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-800">No Tracked Problems Yet</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              You haven't tracked any public problems yet. Visit the Explore Problems page and click 'Track Problem' on any challenge.
            </p>
            <Link to="/explore" className="inline-block px-5 py-2.5 bg-[#005A36] text-white font-bold text-xs rounded-xl">
              Explore Community Problems
            </Link>
          </div>
        ) : (
          trackedList.map(item => (
            <div key={item.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all overflow-hidden">
              
              <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-mono font-bold text-indigo-800 bg-indigo-50 px-2.5 py-0.5 rounded border border-indigo-200">
                      ID: {item.id}
                    </span>
                    <span className="text-slate-400">•</span>
                    <span className="text-slate-500 font-medium">Category: {item.category}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
                </div>

                <div className="flex items-center gap-2">
                  <PriorityBadge priority={item.priority} size="sm" />
                  <StatusBadge status={item.status} size="sm" />
                </div>
              </div>

              <div className="p-6 space-y-6">
                
                <p className="text-slate-600 text-sm leading-relaxed">{item.description}</p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 bg-slate-50 rounded-xl text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold block uppercase">District & Location</span>
                    <span className="font-bold text-slate-800 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-[#B84A17]" />
                      {item.village || 'Village'}, {item.district}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 font-bold block uppercase">People Affected</span>
                    <span className="font-bold text-slate-800 flex items-center gap-1 mt-0.5">
                      <Users className="w-3.5 h-3.5 text-amber-600" />
                      {item.affectedPeople.toLocaleString()} Citizens
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 font-bold block uppercase">Reported By</span>
                    <span className="font-semibold text-slate-800 block mt-0.5">{item.reportedBy}</span>
                  </div>
                </div>

                {/* Progress Timeline */}
                <div className="bg-white p-4 rounded-xl border border-slate-200">
                  <h4 className="text-xs font-extrabold uppercase text-slate-400 mb-2">Live Progress Timeline</h4>
                  <ProgressTracker currentStatus={item.status} history={item.history} />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    onClick={() => toggleTrack(item.id)}
                    className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1 px-3 py-1.5 bg-red-50 hover:bg-red-100 rounded-lg transition-colors border border-red-200"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Stop Tracking
                  </button>

                  <Link
                    to={`/problem/${item.id}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-lg transition-colors"
                  >
                    <span>View Problem Page</span>
                    <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                  </Link>
                </div>

              </div>

            </div>
          ))
        )}
      </div>

    </div>
  );
};
