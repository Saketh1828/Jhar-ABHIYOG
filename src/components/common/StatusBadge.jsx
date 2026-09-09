import React from 'react';
import { Clock, CheckCircle2, ShieldCheck, UserCheck, Wrench, Sparkles } from 'lucide-react';

const statusConfig = {
  "Submitted": {
    label: "Submitted",
    bg: "bg-slate-100 text-slate-700 border-slate-300",
    icon: Clock
  },
  "Under Verification": {
    label: "Under Verification",
    bg: "bg-amber-100 text-amber-800 border-amber-300",
    icon: ShieldCheck
  },
  "Verified": {
    label: "Verified",
    bg: "bg-blue-100 text-blue-800 border-blue-300",
    icon: CheckCircle2
  },
  "Assigned": {
    label: "Assigned",
    bg: "bg-purple-100 text-purple-800 border-purple-300",
    icon: UserCheck
  },
  "Solution Proposed": {
    label: "Solution Proposed",
    bg: "bg-indigo-100 text-indigo-800 border-indigo-300",
    icon: Sparkles
  },
  "In Progress": {
    label: "In Progress",
    bg: "bg-orange-100 text-orange-800 border-orange-300",
    icon: Wrench
  },
  "Resolved": {
    label: "Resolved",
    bg: "bg-emerald-100 text-emerald-800 border-emerald-300",
    icon: CheckCircle2
  }
};

export const StatusBadge = ({ status, size = "md" }) => {
  const config = statusConfig[status] || statusConfig["Submitted"];
  const Icon = config.icon;
  
  const sizeClasses = size === "sm" 
    ? "px-2 py-0.5 text-xs gap-1 font-medium" 
    : "px-3 py-1 text-xs sm:text-sm gap-1.5 font-semibold";

  return (
    <span className={`inline-flex items-center rounded-full border shadow-sm ${config.bg} ${sizeClasses}`}>
      <Icon className={size === "sm" ? "w-3 h-3" : "w-4 h-4"} />
      <span>{config.label}</span>
    </span>
  );
};
