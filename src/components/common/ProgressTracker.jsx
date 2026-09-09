import React from 'react';
import { Check, Clock, AlertCircle } from 'lucide-react';

const STAGES = [
  { id: "Submitted", label: "Submitted", desc: "Report filed by citizen" },
  { id: "Verified", label: "Verified", desc: "District officer verification" },
  { id: "Assigned", label: "Assigned", desc: "University/Student team attached" },
  { id: "Solution Proposed", label: "Solution Proposed", desc: "Technical blueprint submitted" },
  { id: "In Progress", label: "In Progress", desc: "Implementation on ground" },
  { id: "Resolved", label: "Resolved", desc: "Problem solved & closed" }
];

export const ProgressTracker = ({ currentStatus, history = [] }) => {
  const getStageIndex = (status) => {
    if (status === "Under Verification") return 0.5;
    const index = STAGES.findIndex(s => s.id === status);
    return index !== -1 ? index : 0;
  };

  const currentIndex = getStageIndex(currentStatus);

  return (
    <div className="w-full py-4">
      {/* Desktop Horizontal Tracker */}
      <div className="hidden md:block">
        <div className="flex items-center justify-between relative">
          {/* Connecting Line */}
          <div className="absolute top-1/2 left-6 right-6 -translate-y-1/2 h-1 bg-slate-200 -z-0">
            <div 
              className="h-full bg-[#005A36] transition-all duration-500" 
              style={{ width: `${(Math.min(currentIndex, STAGES.length - 1) / (STAGES.length - 1)) * 100}%` }}
            />
          </div>

          {STAGES.map((stage, idx) => {
            const isCompleted = idx <= currentIndex;
            const isCurrent = idx === Math.floor(currentIndex);
            const historyEntry = history.find(h => h.step === stage.id);

            return (
              <div key={stage.id} className="relative z-10 flex flex-col items-center group">
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all shadow-md ${
                    isCompleted 
                      ? 'bg-[#005A36] text-white border-2 border-emerald-300 ring-2 ring-emerald-600/20' 
                      : isCurrent 
                        ? 'bg-amber-500 text-white ring-4 ring-amber-100 animate-pulse' 
                        : 'bg-slate-100 text-slate-400 border-2 border-slate-300'
                  }`}
                >
                  {isCompleted ? <Check className="w-5 h-5" /> : idx + 1}
                </div>
                <div className="mt-2 text-center max-w-[110px]">
                  <p className={`text-xs font-bold ${isCurrent ? 'text-[#005A36]' : isCompleted ? 'text-slate-800' : 'text-slate-400'}`}>
                    {stage.label}
                  </p>
                  {historyEntry && (
                    <span className="text-[10px] text-slate-500 block mt-0.5 font-medium">
                      {historyEntry.date}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile Vertical Tracker */}
      <div className="block md:hidden space-y-4">
        {STAGES.map((stage, idx) => {
          const isCompleted = idx <= currentIndex;
          const isCurrent = idx === Math.floor(currentIndex);
          const historyEntry = history.find(h => h.step === stage.id);

          return (
            <div key={stage.id} className="flex items-start gap-3 relative">
              {idx !== STAGES.length - 1 && (
                <div className={`absolute left-4 top-8 bottom-0 w-0.5 ${idx < currentIndex ? 'bg-[#005A36]' : 'bg-slate-200'}`} />
              )}
              <div 
                className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center font-bold text-xs shadow-sm ${
                  isCompleted 
                    ? 'bg-[#005A36] text-white' 
                    : isCurrent 
                      ? 'bg-amber-500 text-white ring-2 ring-amber-200' 
                      : 'bg-slate-100 text-slate-400 border'
                }`}
              >
                {isCompleted ? <Check className="w-4 h-4" /> : idx + 1}
              </div>
              <div className="pb-2">
                <div className="flex items-center gap-2">
                  <h4 className={`text-sm font-bold ${isCompleted ? 'text-slate-900' : 'text-slate-400'}`}>
                    {stage.label}
                  </h4>
                  {isCurrent && (
                    <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full">
                      Current Stage
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500 mt-0.5">{stage.desc}</p>
                {historyEntry && (
                  <p className="text-[11px] text-[#005A36] font-medium mt-1">
                    ✓ Completed on {historyEntry.date}: {historyEntry.note}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
