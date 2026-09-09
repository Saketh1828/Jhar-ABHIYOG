import React, { useState } from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Users, 
  Filter, 
  Wrench, 
  UserCheck, 
  ArrowUpRight,
  Sparkles,
  Edit3
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { StatusBadge } from '../components/common/StatusBadge';
import { PriorityBadge } from '../components/common/PriorityBadge';
import { Modal } from '../components/common/Modal';
import { JHARKHAND_DISTRICTS } from '../data/mockData';

export const GovernmentDashboard = () => {
  const { problems, updateProblemStatus, updateProblemPriority } = useApp();

  const [selectedDistrictFilter, setSelectedDistrictFilter] = useState('All');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('All');
  const [editingProblem, setEditingProblem] = useState(null);

  const [assignForm, setAssignForm] = useState({
    status: 'Verified',
    priority: 'HIGH',
    assignedTeam: 'BIT Mesra Student Innovation Cell',
    solutionNote: ''
  });

  const filteredProblems = problems.filter(p => {
    const dMatch = selectedDistrictFilter === 'All' || p.district === selectedDistrictFilter;
    const sMatch = selectedStatusFilter === 'All' || p.status === selectedStatusFilter;
    return dMatch && sMatch;
  });

  // KPI Calculations
  const totalProblems = problems.length;
  const pendingVerification = problems.filter(p => p.status === 'Submitted' || p.status === 'Under Verification').length;
  const criticalProblems = problems.filter(p => p.priority === 'CRITICAL').length;
  const highPriority = problems.filter(p => p.priority === 'HIGH').length;
  const inProgress = problems.filter(p => p.status === 'In Progress' || p.status === 'Solution Proposed').length;
  const resolved = problems.filter(p => p.status === 'Resolved').length;
  const totalPeopleImpacted = problems.reduce((acc, curr) => acc + (curr.affectedPeople || 0), 0);

  const openActionModal = (prob) => {
    setEditingProblem(prob);
    setAssignForm({
      status: prob.status,
      priority: prob.priority,
      assignedTeam: prob.assignedTeam || 'BIT Mesra Student Innovation Cell',
      solutionNote: ''
    });
  };

  const handleApplyAction = (e) => {
    e.preventDefault();
    if (!editingProblem) return;

    if (assignForm.priority !== editingProblem.priority) {
      updateProblemPriority(editingProblem.id, assignForm.priority);
    }

    updateProblemStatus(
      editingProblem.id,
      assignForm.status,
      assignForm.solutionNote || `Updated by Government Admin`,
      assignForm.assignedTeam,
      editingProblem.solutionProposed
    );

    setEditingProblem(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Top Admin Banner */}
      <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl border-b-4 border-amber-400 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
            <ShieldCheck className="w-5 h-5 text-amber-400" />
            <span>Government of Jharkhand • Portal Administration</span>
          </div>
          <h1 className="text-3xl font-black">District Officer Admin Control Portal</h1>
          <p className="text-slate-300 text-sm mt-1">
            Review citizen submissions, set priorities, assign academic solvers, & verify ground completion.
          </p>
        </div>

        <div className="bg-slate-800 p-3.5 rounded-2xl border border-slate-700 text-xs text-right shrink-0">
          <span className="text-slate-400 block font-semibold">Active Jurisdiction</span>
          <span className="text-amber-300 font-extrabold text-sm">All 24 Jharkhand Districts</span>
        </div>
      </div>

      {/* KPI Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
        
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm text-center">
          <span className="text-2xl font-black text-slate-900 block">{totalProblems}</span>
          <span className="text-[11px] text-slate-500 font-semibold">Total Problems</span>
        </div>

        <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 shadow-sm text-center">
          <span className="text-2xl font-black text-amber-700 block">{pendingVerification}</span>
          <span className="text-[11px] text-amber-800 font-bold">Pending Verify</span>
        </div>

        <div className="bg-red-50 p-4 rounded-xl border border-red-200 shadow-sm text-center">
          <span className="text-2xl font-black text-red-700 block">{criticalProblems}</span>
          <span className="text-[11px] text-red-800 font-bold">Critical Level</span>
        </div>

        <div className="bg-orange-50 p-4 rounded-xl border border-orange-200 shadow-sm text-center">
          <span className="text-2xl font-black text-orange-700 block">{highPriority}</span>
          <span className="text-[11px] text-orange-800 font-semibold">High Priority</span>
        </div>

        <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-200 shadow-sm text-center">
          <span className="text-2xl font-black text-indigo-700 block">{inProgress}</span>
          <span className="text-[11px] text-indigo-800 font-semibold">In Progress</span>
        </div>

        <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200 shadow-sm text-center">
          <span className="text-2xl font-black text-[#005A36] block">{resolved}</span>
          <span className="text-[11px] text-emerald-800 font-bold">Resolved</span>
        </div>

        <div className="bg-slate-100 p-4 rounded-xl border border-slate-300 shadow-sm text-center col-span-2 md:col-span-1">
          <span className="text-2xl font-black text-slate-900 block">{totalPeopleImpacted.toLocaleString()}</span>
          <span className="text-[11px] text-slate-600 font-semibold">People Impacted</span>
        </div>

      </div>

      {/* Filter Controls */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-xs font-extrabold text-slate-500 uppercase flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Filters:
          </span>

          <select
            value={selectedDistrictFilter}
            onChange={(e) => setSelectedDistrictFilter(e.target.value)}
            className="px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-bold text-slate-800"
          >
            <option value="All">All Districts</option>
            {JHARKHAND_DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}
          </select>

          <select
            value={selectedStatusFilter}
            onChange={(e) => setSelectedStatusFilter(e.target.value)}
            className="px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-bold text-slate-800"
          >
            <option value="All">All Statuses</option>
            <option value="Submitted">Submitted</option>
            <option value="Under Verification">Under Verification</option>
            <option value="Verified">Verified</option>
            <option value="Assigned">Assigned</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>

        <span className="text-xs text-slate-500 font-semibold">
          Showing <strong>{filteredProblems.length}</strong> reports requiring admin action
        </span>
      </div>

      {/* Management Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900 text-white text-[11px] font-extrabold uppercase tracking-wider">
                <th className="p-4">Report ID & Title</th>
                <th className="p-4">Location</th>
                <th className="p-4">Category</th>
                <th className="p-4 text-center">People Affected</th>
                <th className="p-4">Priority SLA</th>
                <th className="p-4">Current Status</th>
                <th className="p-4 text-center">Admin Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredProblems.map((prob) => (
                <tr key={prob.id} className="hover:bg-slate-50 transition-colors">
                  
                  <td className="p-4 max-w-xs">
                    <span className="font-mono font-bold text-[#005A36] block">{prob.id}</span>
                    <span className="font-bold text-slate-900 line-clamp-1">{prob.title}</span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">Reporter: {prob.reportedBy}</span>
                  </td>

                  <td className="p-4">
                    <span className="font-bold text-slate-800 block">{prob.village || 'Village'}</span>
                    <span className="text-slate-500">{prob.district}, JH</span>
                  </td>

                  <td className="p-4">
                    <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-700 font-medium">
                      {prob.category}
                    </span>
                  </td>

                  <td className="p-4 text-center font-bold text-amber-800">
                    {prob.affectedPeople.toLocaleString()}
                  </td>

                  <td className="p-4">
                    <PriorityBadge priority={prob.priority} size="sm" showPulse={false} />
                  </td>

                  <td className="p-4">
                    <StatusBadge status={prob.status} size="sm" />
                  </td>

                  <td className="p-4 text-center">
                    <button
                      onClick={() => openActionModal(prob)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#005A36] hover:bg-[#003D24] text-white font-bold text-xs rounded-lg transition-colors shadow-sm"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Manage</span>
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Admin Action Modal */}
      <Modal
        isOpen={!!editingProblem}
        onClose={() => setEditingProblem(null)}
        title={`Admin Actions — Report #${editingProblem?.id}`}
        maxWidth="max-w-lg"
      >
        {editingProblem && (
          <form onSubmit={handleApplyAction} className="space-y-4">
            
            <div className="p-3 bg-slate-50 rounded-xl border text-xs">
              <h4 className="font-bold text-slate-900">{editingProblem.title}</h4>
              <p className="text-slate-500 mt-0.5">{editingProblem.village}, {editingProblem.district}</p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Update Status Stage
              </label>
              <select
                value={assignForm.status}
                onChange={(e) => setAssignForm({ ...assignForm, status: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-bold"
              >
                <option value="Under Verification">Under Verification</option>
                <option value="Verified">Verified</option>
                <option value="Assigned">Assigned to University</option>
                <option value="Solution Proposed">Solution Proposed</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved & Closed</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Override Priority Level
              </label>
              <select
                value={assignForm.priority}
                onChange={(e) => setAssignForm({ ...assignForm, priority: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-bold"
              >
                <option value="LOW">Low Priority (14 Days Target)</option>
                <option value="MEDIUM">Medium Priority (7 Days Target)</option>
                <option value="HIGH">High Priority (2 Days Target)</option>
                <option value="CRITICAL">Critical Priority (Immediate Target)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Assign Solver Team / Partner
              </label>
              <input
                type="text"
                value={assignForm.assignedTeam}
                onChange={(e) => setAssignForm({ ...assignForm, assignedTeam: e.target.value })}
                placeholder="e.g. BIT Mesra Student Team / Tata Steel CSR"
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Action Log Note / Remark
              </label>
              <textarea
                rows={3}
                value={assignForm.solutionNote}
                onChange={(e) => setAssignForm({ ...assignForm, solutionNote: e.target.value })}
                placeholder="Enter official remark for citizen tracking..."
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl font-bold text-xs text-white bg-[#005A36] hover:bg-[#003D24] shadow transition-colors"
            >
              Save & Update Report Lifecycle
            </button>
          </form>
        )}
      </Modal>

    </div>
  );
};
