import React from 'react';
import { AlertTriangle, AlertCircle, ShieldAlert, Info } from 'lucide-react';

const priorityConfig = {
  "CRITICAL": {
    label: "CRITICAL PRIORITY",
    bg: "bg-red-600 text-white border-red-700 font-bold",
    badgePulse: true,
    icon: ShieldAlert
  },
  "HIGH": {
    label: "HIGH PRIORITY",
    bg: "bg-amber-600 text-white border-amber-700 font-bold",
    icon: AlertTriangle
  },
  "MEDIUM": {
    label: "MEDIUM PRIORITY",
    bg: "bg-amber-100 text-amber-900 border-amber-300 font-semibold",
    icon: AlertCircle
  },
  "LOW": {
    label: "LOW PRIORITY",
    bg: "bg-emerald-100 text-emerald-900 border-emerald-300 font-semibold",
    icon: Info
  }
};

export const PriorityBadge = ({ priority, size = "md", showPulse = true }) => {
  const pKey = (priority || "MEDIUM").toUpperCase();
  const config = priorityConfig[pKey] || priorityConfig["MEDIUM"];
  const Icon = config.icon;

  const sizeClasses = size === "sm"
    ? "px-2 py-0.5 text-xs gap-1"
    : "px-3 py-1 text-xs uppercase tracking-wide gap-1.5";

  return (
    <span className={`inline-flex items-center rounded-md border shadow-sm ${config.bg} ${sizeClasses} ${config.badgePulse && showPulse ? 'badge-pulse' : ''}`}>
      <Icon className={size === "sm" ? "w-3 h-3" : "w-4 h-4"} />
      <span>{config.label}</span>
    </span>
  );
};
