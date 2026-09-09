import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, MapPin, Users, Calendar, PlusCircle, ArrowRight, ShieldCheck, Search } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { StatusBadge } from '../components/common/StatusBadge';
import { PriorityBadge } from '../components/common/PriorityBadge';
import { ProgressTracker } from '../components/common/ProgressTracker';

export const MyReports = () => {
  const { problems, currentUser } = useApp();
  const [activeTab, setActiveTab] = useState('all');

  // Filter citizen's own reports (or sample user reports in prototype mode)
  const myReports = problems.filter(p => 
    p.reportedBy === currentUser.name || p.id === "JH-2026-8901" || activeTab === 'all'
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#005A36] uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>Citizen Tracking Portal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            My Submitted Reports & Status
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            Track real-time verification, university assignments, and ground solutions for your reported problems.
          </p>
        </div>

        <Link
          to="/report-problem"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-black text-sm text-white bg-[#005A36] hover:bg-[#003D24] shadow transition-all shrink-0"
        >
          <PlusCircle className="w-5 h-5" />
          <span>Report New Problem</span>
        </Link>
      </div>

      {/* Reports List */}
      <div className="space-y-6">
        {myReports.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 space-y-4">
            <FileText className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-lg font-bold text-slate-800">No Reports Found</h3>
            <p className="text-sm text-slate-500 max-w-md mx-auto">
              You haven't submitted any societal problem reports yet.
            </p>
            <Link
              to="/report-problem"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#005A36] text-white font-bold text-sm rounded-xl"
            >
              Report a Problem Now
            </Link>
          </div>
        ) : (
          myReports.map(report => (
            <div key={report.id} className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              
              {/* Report Card Header */}
              <div className="p-6 border-b border-slate-100 bg-[#FAF8F5]/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="font-mono font-bold text-[#005A36] bg-emerald-100 px-2.5 py-0.5 rounded">
                      ID: {report.id}
                    </span>
                    <span className="text-slate-400">•</span>
                    <span className="text-slate-500 font-medium flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      Filed on {report.dateReported}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-slate-900">{report.title}</h2>
                </div>

                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  <PriorityBadge priority={report.priority} size="sm" />
                  <StatusBadge status={report.status} size="sm" />
                </div>
              </div>

              {/* Body Content */}
              <div className="p-6 space-y-6">
                
                <p className="text-slate-600 text-sm leading-relaxed">
                  {report.description}
                </p>

                {/* Location & Impact Bar */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 bg-slate-50 rounded-xl text-xs">
                  <div>
                    <span className="text-slate-400 font-bold block uppercase text-[10px]">Location</span>
                    <span className="font-bold text-slate-800 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-[#B84A17]" />
                      {report.village || 'Village'}, {report.district}
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-400 font-bold block uppercase text-[10px]">People Affected</span>
                    <span className="font-bold text-slate-800 flex items-center gap-1 mt-0.5">
                      <Users className="w-3.5 h-3.5 text-amber-600" />
                      {report.affectedPeople.toLocaleString()} Citizens
                    </span>
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <span className="text-slate-400 font-bold block uppercase text-[10px]">Target Response SLA</span>
                    <span className="font-bold text-[#005A36] block mt-0.5">
                      {report.targetResponse.replace('Target attention: ', '')}
                    </span>
                  </div>
                </div>

                {/* Interactive Progress Tracker Component */}
                <div className="bg-white p-4 rounded-xl border border-slate-200">
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-2">
                    Live Status Progress Timeline
                  </h4>
                  <ProgressTracker currentStatus={report.status} history={report.history} />
                </div>

                {report.solutionProposed && (
                  <div className="p-4 bg-indigo-50/80 rounded-xl border border-indigo-200 text-xs space-y-1">
                    <span className="font-extrabold text-indigo-900 block">Proposed Solution Blueprint:</span>
                    <p className="text-indigo-800 leading-relaxed">{report.solutionProposed}</p>
                  </div>
                )}

                <div className="flex justify-end pt-2">
                  <Link
                    to={`/problem/${report.id}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-lg transition-colors"
                  >
                    <span>View Complete Report Page</span>
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
