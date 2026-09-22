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
  Edit3,
  Download,
  FileSpreadsheet,
  Award,
  Layers
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { StatusBadge } from '../components/common/StatusBadge';
import { PriorityBadge } from '../components/common/PriorityBadge';
import { Modal } from '../components/common/Modal';
import { ResolvedAnimationModal } from '../components/common/ResolvedAnimationModal';
import { JharkhandMap } from '../components/common/JharkhandMap';
import { exportProblemsToExcelCSV } from '../utils/excelExporter';
import { JHARKHAND_DISTRICTS } from '../data/mockData';

export const GovernmentDashboard = () => {
  const { problems, updateProblemStatus, updateProblemPriority, resolvedAnimationProblem, setResolvedAnimationProblem } = useApp();

  const [activeViewTab, setActiveViewTab] = useState('manage'); // 'manage' or 'accountability'
  const [selectedDistrictFilter, setSelectedDistrictFilter] = useState('All');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('All');
  const [editingProblem, setEditingProblem] = useState(null);

  const [assignForm, setAssignForm] = useState({
    status: 'Verified',
    priority: 'HIGH',
    assignedTeam: 'BIT Mesra Student Innovation Cell',
    assignedDepartment: 'Public Works Department (PWD)',
    solutionNote: '',
    resolutionEvidence: 'Water pipeline & solar pump installed successfully.'
  });

  const filteredProblems = problems.filter(p => {
    const dMatch = selectedDistrictFilter === 'All' || p.district === selectedDistrictFilter;
    const sMatch = selectedStatusFilter === 'All' || p.status === selectedStatusFilter;
    return dMatch && sMatch;
  });

  // KPI Calculations (Section 32)
  const totalProblems = problems.length;
  const openProblems = problems.filter(p => p.status === 'Submitted').length;
  const underReview = problems.filter(p => p.status === 'Under Verification' || p.status === 'Verified').length;
  const inProgress = problems.filter(p => p.status === 'In Progress' || p.status === 'Assigned' || p.status === 'Solution Proposed').length;
  const resolved = problems.filter(p => p.status === 'Resolved').length;
  const totalPeopleImpacted = problems.reduce((acc, curr) => acc + (curr.affectedPeople || 0), 0);
  const avgResolutionTime = "4.2 Days";

  const openActionModal = (prob) => {
    setEditingProblem(prob);
    setAssignForm({
      status: prob.status,
      priority: prob.priority,
      assignedTeam: prob.assignedTeam || 'BIT Mesra Student Innovation Cell',
      assignedDepartment: prob.assignedDepartment || 'DWSD Dumka Division',
      solutionNote: '',
      resolutionEvidence: prob.solutionProposed || 'Ground infrastructure project completed and tested.'
    });
  };

  const handleApplyAction = (e) => {
    e.preventDefault();
    if (!editingProblem) return;

    if (assignForm.status === 'Resolved' && !assignForm.solutionNote && !assignForm.resolutionEvidence) {
      alert("Please provide a Resolution Description / Evidence before marking as RESOLVED.");
      return;
    }

    if (assignForm.priority !== editingProblem.priority) {
      updateProblemPriority(editingProblem.id, assignForm.priority);
    }

    updateProblemStatus(
      editingProblem.id,
      assignForm.status,
      assignForm.solutionNote || `Updated by District Officer`,
      assignForm.assignedTeam,
      assignForm.resolutionEvidence
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
            <span>SAMASYA NIVARK • District Officer & Admin Control</span>
          </div>
          <h1 className="text-3xl font-black">Government & Receiver Admin Portal</h1>
          <p className="text-slate-300 text-sm mt-1">
            Validate citizen reports, set priorities, assign receivers & academic solvers, and manage resolution accountability.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => exportProblemsToExcelCSV(problems)}
            className="px-5 py-3 bg-[#005A36] hover:bg-emerald-800 text-white font-black text-xs rounded-xl shadow border border-emerald-400/40 flex items-center gap-2 transition-all"
          >
            <FileSpreadsheet className="w-4 h-4 text-amber-300" />
            <span>EXPORT EXCEL/CSV DATASET</span>
          </button>
        </div>
      </div>

      {/* KPI Summary Cards (Section 32) */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
        
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm text-center">
          <span className="text-2xl font-black text-slate-900 block">{totalProblems}</span>
          <span className="text-[10px] text-slate-500 font-bold uppercase">Total Problems</span>
        </div>

        <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-300 shadow-sm text-center">
          <span className="text-2xl font-black text-slate-700 block">{openProblems}</span>
          <span className="text-[10px] text-slate-600 font-bold uppercase">Open Reports</span>
        </div>

        <div className="bg-amber-50 p-3.5 rounded-xl border border-amber-200 shadow-sm text-center">
          <span className="text-2xl font-black text-amber-700 block">{underReview}</span>
          <span className="text-[10px] text-amber-900 font-extrabold uppercase">Under Review</span>
        </div>

        <div className="bg-indigo-50 p-3.5 rounded-xl border border-indigo-200 shadow-sm text-center">
          <span className="text-2xl font-black text-indigo-700 block">{inProgress}</span>
          <span className="text-[10px] text-indigo-900 font-bold uppercase">In Progress</span>
        </div>

        <div className="bg-emerald-50 p-3.5 rounded-xl border border-emerald-200 shadow-sm text-center">
          <span className="text-2xl font-black text-[#005A36] block">{resolved}</span>
          <span className="text-[10px] text-emerald-900 font-black uppercase">Resolved</span>
        </div>

        <div className="bg-purple-50 p-3.5 rounded-xl border border-purple-200 shadow-sm text-center">
          <span className="text-xl font-black text-purple-800 block">{avgResolutionTime}</span>
          <span className="text-[10px] text-purple-900 font-bold uppercase">Avg Resolve Time</span>
        </div>

        <div className="bg-rose-50 p-3.5 rounded-xl border border-rose-200 shadow-sm text-center">
          <span className="text-xl font-black text-rose-800 block">24 Districts</span>
          <span className="text-[10px] text-rose-900 font-bold uppercase">Districts Covered</span>
        </div>

        <div className="bg-slate-900 text-white p-3.5 rounded-xl shadow-sm text-center col-span-2 md:col-span-1">
          <span className="text-xl font-black text-amber-400 block">{totalPeopleImpacted.toLocaleString()}</span>
          <span className="text-[10px] text-slate-300 font-bold uppercase">People Impacted</span>
        </div>

      </div>

      {/* Spatial Interactive Leaflet Map Tracker */}
      <JharkhandMap problems={problems} />

      {/* Main View Tabs: Manage vs Accountability */}
      <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
        <button
          onClick={() => setActiveViewTab('manage')}
          className={`px-4 py-2.5 rounded-xl font-extrabold text-xs transition-colors ${
            activeViewTab === 'manage' 
              ? 'bg-[#0F766E] text-white shadow' 
              : 'bg-white text-slate-700 hover:bg-slate-100 border'
          }`}
        >
          Manage & Assign Receiver Queue
        </button>

        <button
          onClick={() => setActiveViewTab('accountability')}
          className={`px-4 py-2.5 rounded-xl font-extrabold text-xs transition-colors ${
            activeViewTab === 'accountability' 
              ? 'bg-slate-900 text-amber-400 shadow' 
              : 'bg-white text-slate-700 hover:bg-slate-100 border'
          }`}
        >
          Resolution Accountability Table (Section 33)
        </button>
      </div>

      {activeViewTab === 'manage' ? (
        <>
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
                <option value="All">All 24 Districts</option>
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
              Showing <strong>{filteredProblems.length}</strong> reports
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
                    <th className="p-4">Recommended Receiver</th>
                    <th className="p-4 text-center">People Affected</th>
                    <th className="p-4">Priority SLA</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-center">Admin Action</th>
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

                      <td className="p-4 max-w-xs">
                        <span className="font-bold text-indigo-900 block truncate">
                          {prob.recommendedReceiver || prob.assignedDepartment || "DWSD Dumka"}
                        </span>
                        <span className="text-[10px] text-slate-500 block truncate">{prob.receiverType || "Government Dept"}</span>
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
                          <span>Action</span>
                        </button>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        /* Section 33: Resolution Accountability Table */
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden space-y-4 p-6">
          <div className="flex items-center justify-between border-b pb-4">
            <div>
              <h2 className="text-xl font-black text-slate-900">Resolution Accountability Table</h2>
              <p className="text-xs text-slate-500">Track assigned departments, progress milestones, and ground resolution dates for total civic transparency.</p>
            </div>
            <button
              onClick={() => exportProblemsToExcelCSV(problems)}
              className="px-4 py-2 bg-slate-900 text-amber-400 font-bold text-xs rounded-xl flex items-center gap-1.5"
            >
              <Download className="w-4 h-4" /> Download Complete CSV
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-100 text-slate-700 font-extrabold uppercase text-[10px]">
                  <th className="p-3">Problem ID & Title</th>
                  <th className="p-3">Assigned To / Department</th>
                  <th className="p-3">Assigned Date</th>
                  <th className="p-3">Current Status</th>
                  <th className="p-3">Last Update</th>
                  <th className="p-3">Resolution Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {problems.map(p => (
                  <tr key={p.id} className="hover:bg-slate-50">
                    <td className="p-3 font-bold text-slate-900 max-w-xs">
                      <span className="font-mono text-[#005A36] block">{p.id}</span>
                      <span className="truncate block">{p.title}</span>
                    </td>
                    <td className="p-3 font-semibold text-indigo-900">
                      {p.assignedDepartment || p.assignedTeam || "DWSD Dumka"}
                    </td>
                    <td className="p-3 text-slate-600">{p.dateReported}</td>
                    <td className="p-3"><StatusBadge status={p.status} size="sm" /></td>
                    <td className="p-3 text-slate-500">{p.history[p.history.length - 1]?.date || p.dateReported}</td>
                    <td className="p-3 font-bold text-[#005A36]">
                      {p.resolutionDate || (p.status === 'Resolved' ? '2026-08-25' : 'In Progress')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Admin Action Modal */}
      <Modal
        isOpen={!!editingProblem}
        onClose={() => setEditingProblem(null)}
        title={`Admin Actions — Report #${editingProblem?.id}`}
        maxWidth="max-w-lg"
      >
        {editingProblem && (
          <form onSubmit={handleApplyAction} className="space-y-4 text-xs">
            
            <div className="p-3 bg-slate-50 rounded-xl border">
              <h4 className="font-bold text-slate-900">{editingProblem.title}</h4>
              <p className="text-slate-500 mt-0.5">{editingProblem.village}, {editingProblem.district}</p>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Update Lifecycle Status Stage
              </label>
              <select
                value={assignForm.status}
                onChange={(e) => setAssignForm({ ...assignForm, status: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg font-bold text-slate-900"
              >
                <option value="Under Verification">Under Verification</option>
                <option value="Verified">Verified</option>
                <option value="Assigned">Assigned to Receiver</option>
                <option value="Solution Proposed">Solution Proposed</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">✓ Mark RESOLVED (Triggers Celebration Popup)</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Assign Receiver Department
              </label>
              <input
                type="text"
                value={assignForm.assignedDepartment}
                onChange={(e) => setAssignForm({ ...assignForm, assignedDepartment: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg font-semibold"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Assign Solver Team / University
              </label>
              <input
                type="text"
                value={assignForm.assignedTeam}
                onChange={(e) => setAssignForm({ ...assignForm, assignedTeam: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg font-semibold"
              />
            </div>

            {assignForm.status === 'Resolved' && (
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-300 space-y-2">
                <span className="font-extrabold text-[#005A36] block uppercase text-[10px]">
                  Resolution Outcome Description (Required for Resolved)
                </span>
                <textarea
                  rows={3}
                  required
                  value={assignForm.resolutionEvidence}
                  onChange={(e) => setAssignForm({ ...assignForm, resolutionEvidence: e.target.value })}
                  placeholder="Describe ground resolution outcome (e.g., New drinking water pipeline & solar pump installed)..."
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg"
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl font-extrabold text-white bg-[#005A36] hover:bg-[#003D24] shadow transition-colors"
            >
              Save Changes & Notify Citizen
            </button>
          </form>
        )}
      </Modal>

      {/* Resolved Celebration Popup (Section 18 & 28) */}
      <ResolvedAnimationModal
        problem={resolvedAnimationProblem}
        onClose={() => setResolvedAnimationProblem(null)}
      />

    </div>
  );
};
