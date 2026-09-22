import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Users, 
  GraduationCap, 
  Building2, 
  Shield, 
  FileText, 
  CheckCircle2, 
  Clock, 
  Search, 
  Filter, 
  UserCheck, 
  UserX, 
  Edit3, 
  PlusCircle, 
  Sparkles, 
  Download, 
  FileSpreadsheet, 
  History, 
  Settings, 
  MapPin, 
  Check, 
  Layers
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { exportProblemsToExcelCSV } from '../utils/excelExporter';
import { StatusBadge } from '../components/common/StatusBadge';
import { PriorityBadge } from '../components/common/PriorityBadge';
import { Modal } from '../components/common/Modal';

export const SuperAdminDashboard = () => {
  const { 
    currentUser, 
    problems, 
    users, 
    universities, 
    industries, 
    projects, 
    auditLogs, 
    changeUserRole, 
    deactivateUser, 
    addUniversity, 
    addIndustry 
  } = useApp();

  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'users', 'orgs', 'problems', 'projects', 'audit', 'settings'
  const [userSearch, setUserSearch] = useState('');
  const [userRoleFilter, setUserRoleFilter] = useState('All');
  const [editingUser, setEditingUser] = useState(null);
  const [newRoleInput, setNewRoleInput] = useState('STUDENT');

  const [isUnivModalOpen, setIsUnivModalOpen] = useState(false);
  const [isIndustryModalOpen, setIsIndustryModalOpen] = useState(false);

  const [univForm, setUnivForm] = useState({ name: '', district: 'Ranchi', address: '', email: 'admin@univ.example' });
  const [indForm, setIndForm] = useState({ name: '', district: 'East Singhbhum', type: 'Manufacturing CSR', email: 'csr@industry.example' });

  // Filter Users
  const filteredUsers = (users || []).filter(u => {
    const matchesSearch = (u.name + ' ' + u.email + ' ' + (u.district || '')).toLowerCase().includes(userSearch.toLowerCase());
    const matchesRole = userRoleFilter === 'All' || u.role === userRoleFilter;
    return matchesSearch && matchesRole;
  });

  // KPI Computations
  const totalUsers = (users || []).length;
  const citizensCount = (users || []).filter(u => u.role === 'citizen' || u.role === 'CITIZEN').length;
  const studentsCount = (users || []).filter(u => u.role === 'student' || u.role === 'STUDENT').length;
  const universitiesCount = (universities || []).length;
  const industriesCount = (industries || []).length;
  const govtCount = (users || []).filter(u => u.role === 'government' || u.role === 'GOVERNMENT_ADMIN').length;

  const totalProblems = (problems || []).length;
  const openProblems = (problems || []).filter(p => p.status === 'Submitted').length;
  const inProgressProblems = (problems || []).filter(p => p.status === 'In Progress' || p.status === 'Solution Proposed').length;
  const resolvedProblems = (problems || []).filter(p => p.status === 'Resolved').length;
  const totalPeopleAffected = (problems || []).reduce((acc, curr) => acc + (curr.affectedPeople || 0), 0);

  const handleRoleChangeSubmit = (e) => {
    e.preventDefault();
    if (!editingUser) return;
    changeUserRole(editingUser.id, newRoleInput);
    setEditingUser(null);
  };

  const handleCreateUniv = (e) => {
    e.preventDefault();
    if (!univForm.name) return;
    addUniversity(univForm);
    setUnivForm({ name: '', district: 'Ranchi', address: '', email: 'admin@univ.example' });
    setIsUnivModalOpen(false);
  };

  const handleCreateIndustry = (e) => {
    e.preventDefault();
    if (!indForm.name) return;
    addIndustry(indForm);
    setIndForm({ name: '', district: 'East Singhbhum', type: 'Manufacturing CSR', email: 'csr@industry.example' });
    setIsIndustryModalOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Top Super Admin Creator Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-[#003D24] to-slate-900 text-white p-8 rounded-3xl shadow-2xl border-2 border-amber-400 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-amber-400 text-slate-950 font-black text-xs px-3 py-1 rounded-full uppercase tracking-wider">
              LEVEL 1 — PLATFORM SUPER ADMIN
            </span>
            <span className="bg-emerald-900/90 text-emerald-200 text-xs font-bold px-2.5 py-1 rounded-full border border-emerald-400/30">
              Platform Creator & Owner Access
            </span>
          </div>
          <h1 className="text-3xl font-black">Super Admin Command Center</h1>
          <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl">
            Full platform governance across Citizens, Universities, Industry CSR, Government Departments, AI Classification, & Audit Logs.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => exportProblemsToExcelCSV(problems)}
            className="px-5 py-3 bg-[#005A36] hover:bg-emerald-800 text-white font-black text-xs rounded-xl shadow border border-emerald-400/40 flex items-center gap-2 transition-all"
          >
            <FileSpreadsheet className="w-4 h-4 text-amber-300" />
            <span>EXPORT PLATFORM DATASET</span>
          </button>
        </div>
      </div>

      {/* Top Statistics Cards (Section 3) */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 text-xs">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm text-center">
          <span className="text-2xl font-black text-slate-900 block">{totalUsers}</span>
          <span className="text-[10px] text-slate-500 font-bold uppercase">Total Platform Users</span>
        </div>

        <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200 shadow-sm text-center">
          <span className="text-2xl font-black text-[#005A36] block">{citizensCount}</span>
          <span className="text-[10px] text-emerald-900 font-bold uppercase">Registered Citizens</span>
        </div>

        <div className="bg-indigo-50 p-4 rounded-2xl border border-indigo-200 shadow-sm text-center">
          <span className="text-2xl font-black text-indigo-700 block">{studentsCount}</span>
          <span className="text-[10px] text-indigo-900 font-bold uppercase">Student Innovators</span>
        </div>

        <div className="bg-purple-50 p-4 rounded-2xl border border-purple-200 shadow-sm text-center">
          <span className="text-2xl font-black text-purple-700 block">{universitiesCount}</span>
          <span className="text-[10px] text-purple-900 font-bold uppercase">Universities Partnered</span>
        </div>

        <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 shadow-sm text-center">
          <span className="text-2xl font-black text-amber-800 block">{industriesCount}</span>
          <span className="text-[10px] text-amber-950 font-bold uppercase">Industry CSR Partners</span>
        </div>

        <div className="bg-rose-50 p-4 rounded-2xl border border-rose-200 shadow-sm text-center">
          <span className="text-2xl font-black text-rose-700 block">{totalProblems}</span>
          <span className="text-[10px] text-rose-900 font-bold uppercase">Total Problems ({resolvedProblems} Resolved)</span>
        </div>
      </div>

      {/* Super Admin Navigation Tabs / Sidebar (Section 4) */}
      <div className="bg-white rounded-2xl p-2 shadow-sm border border-slate-200 flex flex-wrap items-center gap-1 text-xs font-bold">
        {[
          { id: 'overview', label: 'Dashboard Overview', icon: Layers },
          { id: 'users', label: `User Management (${totalUsers})`, icon: Users },
          { id: 'orgs', label: `Organizations (${universitiesCount + industriesCount})`, icon: Building2 },
          { id: 'problems', label: `Problem Governance (${totalProblems})`, icon: FileText },
          { id: 'audit', label: 'Audit Logs', icon: History },
          { id: 'settings', label: 'System Settings', icon: Settings },
        ].map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5 ${
                activeTab === tab.id 
                  ? 'bg-[#005A36] text-white shadow font-extrabold' 
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <h3 className="font-extrabold text-slate-900 text-sm">Resolution Performance Rate</h3>
              <div className="text-3xl font-black text-[#005A36]">
                {Math.round((resolvedProblems / Math.max(1, totalProblems)) * 100)}%
              </div>
              <p className="text-xs text-slate-500">Average Resolution Time: 4.2 Days across 24 Jharkhand Districts.</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <h3 className="font-extrabold text-slate-900 text-sm">Civic Impact Summary</h3>
              <div className="text-3xl font-black text-amber-700">
                {totalPeopleAffected.toLocaleString()}
              </div>
              <p className="text-xs text-slate-500">Total citizens benefited through crowdsourced solutions.</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <h3 className="font-extrabold text-slate-900 text-sm">Active Academic Projects</h3>
              <div className="text-3xl font-black text-indigo-700">
                {(projects || []).length} Active Projects
              </div>
              <p className="text-xs text-slate-500">Engineering prototypes under university development.</p>
            </div>

          </div>
        </div>
      )}

      {/* TAB 2: USER MANAGEMENT (Section 5 & 6) */}
      {activeTab === 'users' && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4">
            <div>
              <h3 className="font-black text-lg text-slate-900">Platform User Management</h3>
              <p className="text-xs text-slate-500">Search, edit roles, deactivate, or reactivate user accounts across Samasya Nivark.</p>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                placeholder="Search user name, email, district..."
                className="px-3.5 py-2 bg-slate-50 border rounded-xl text-xs font-semibold focus:outline-none w-64"
              />
              <select
                value={userRoleFilter}
                onChange={(e) => setUserRoleFilter(e.target.value)}
                className="px-3 py-2 bg-slate-50 border rounded-xl text-xs font-bold"
              >
                <option value="All">All Roles</option>
                <option value="SUPER_ADMIN">SUPER_ADMIN</option>
                <option value="UNIVERSITY_ADMIN">UNIVERSITY_ADMIN</option>
                <option value="INDUSTRY_ADMIN">INDUSTRY_ADMIN</option>
                <option value="GOVERNMENT_ADMIN">GOVERNMENT_ADMIN</option>
                <option value="STUDENT">STUDENT</option>
                <option value="FACULTY">FACULTY</option>
                <option value="CITIZEN">CITIZEN</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-900 text-white font-extrabold uppercase text-[10px]">
                  <th className="p-3">User Name & Email</th>
                  <th className="p-3">Role Badge</th>
                  <th className="p-3">Organization</th>
                  <th className="p-3">District</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredUsers.map(u => (
                  <tr key={u.id} className="hover:bg-slate-50">
                    <td className="p-3">
                      <span className="font-bold text-slate-900 block">{u.name}</span>
                      <span className="text-slate-500 text-[11px] font-mono">{u.email}</span>
                    </td>

                    <td className="p-3">
                      <span className={`px-2.5 py-1 rounded text-[10px] font-extrabold uppercase ${
                        u.role === 'SUPER_ADMIN' ? 'bg-amber-400 text-slate-950' :
                        u.role === 'UNIVERSITY_ADMIN' ? 'bg-indigo-100 text-indigo-900' :
                        u.role === 'INDUSTRY_ADMIN' ? 'bg-amber-100 text-amber-900' :
                        'bg-emerald-100 text-[#005A36]'
                      }`}>
                        {u.role}
                      </span>
                    </td>

                    <td className="p-3 font-semibold text-slate-700">{u.organization || 'N/A'}</td>
                    <td className="p-3 font-semibold text-slate-700">{u.district || 'Dumka'}</td>

                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${u.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}`}>
                        {u.status || 'Active'}
                      </span>
                    </td>

                    <td className="p-3 text-center space-x-1">
                      <button
                        onClick={() => {
                          setEditingUser(u);
                          setNewRoleInput(u.role);
                        }}
                        className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded font-bold text-[10px]"
                      >
                        Change Role
                      </button>

                      <button
                        onClick={() => deactivateUser(u.id)}
                        className={`px-2.5 py-1 rounded font-bold text-[10px] ${u.status === 'Active' ? 'bg-red-100 text-red-700 hover:bg-red-200' : 'bg-emerald-100 text-emerald-700'}`}
                      >
                        {u.status === 'Active' ? 'Deactivate' : 'Reactivate'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: ORGANIZATIONS MANAGEMENT (Section 7 & 14) */}
      {activeTab === 'orgs' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center bg-white p-6 rounded-2xl border">
            <div>
              <h3 className="font-black text-lg text-slate-900">University & Industry Organization Registry</h3>
              <p className="text-xs text-slate-500">Super Admin can register new Universities and Industry CSR bodies.</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setIsUnivModalOpen(true)}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow flex items-center gap-1.5"
              >
                <PlusCircle className="w-4 h-4" /> Add University
              </button>

              <button
                onClick={() => setIsIndustryModalOpen(true)}
                className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl shadow flex items-center gap-1.5"
              >
                <PlusCircle className="w-4 h-4" /> Add Industry
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            {/* Universities */}
            <div className="bg-white p-6 rounded-2xl border space-y-4">
              <h4 className="font-extrabold text-sm text-indigo-900 border-b pb-2">Registered Universities ({universities.length})</h4>
              <div className="space-y-2">
                {universities.map(u => (
                  <div key={u.id} className="p-3 bg-indigo-50/50 rounded-xl border flex justify-between items-center">
                    <div>
                      <span className="font-bold text-slate-900 block">{u.name}</span>
                      <span className="text-slate-500">{u.district}, JH • Admin: {u.adminEmail}</span>
                    </div>
                    <span className="bg-emerald-100 text-emerald-800 font-bold text-[10px] px-2 py-0.5 rounded">Active</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Industries */}
            <div className="bg-white p-6 rounded-2xl border space-y-4">
              <h4 className="font-extrabold text-sm text-amber-900 border-b pb-2">Registered Industry CSR Partners ({industries.length})</h4>
              <div className="space-y-2">
                {industries.map(ind => (
                  <div key={ind.id} className="p-3 bg-amber-50/50 rounded-xl border flex justify-between items-center">
                    <div>
                      <span className="font-bold text-slate-900 block">{ind.name}</span>
                      <span className="text-slate-500">{ind.district}, JH • {ind.type}</span>
                    </div>
                    <span className="bg-emerald-100 text-emerald-800 font-bold text-[10px] px-2 py-0.5 rounded">Active</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: AUDIT LOGS (Section 26) */}
      {activeTab === 'audit' && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-4">
          <h3 className="font-black text-lg text-slate-900">System Audit Logs</h3>
          <div className="overflow-x-auto text-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-900 text-white font-extrabold uppercase text-[10px]">
                  <th className="p-3">Timestamp</th>
                  <th className="p-3">Action</th>
                  <th className="p-3">Performed By</th>
                  <th className="p-3">Target / Detail</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {(auditLogs || []).map(log => (
                  <tr key={log.id} className="hover:bg-slate-50">
                    <td className="p-3 font-mono text-slate-500">{log.timestamp}</td>
                    <td className="p-3 font-bold text-[#005A36]">{log.action}</td>
                    <td className="p-3 font-semibold text-slate-800">{log.performedBy} ({log.role})</td>
                    <td className="p-3 text-slate-600">{log.target}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Edit Role Modal */}
      <Modal
        isOpen={!!editingUser}
        onClose={() => setEditingUser(null)}
        title={`Change Role — ${editingUser?.name}`}
        maxWidth="max-w-md"
      >
        {editingUser && (
          <form onSubmit={handleRoleChangeSubmit} className="space-y-4 text-xs">
            <p className="text-slate-600">Assign a new role to user account <strong className="text-slate-900">{editingUser.email}</strong>.</p>
            
            <div>
              <label className="block font-bold text-slate-700 mb-1">Target Role</label>
              <select
                value={newRoleInput}
                onChange={(e) => setNewRoleInput(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 border rounded-xl font-bold"
              >
                <option value="SUPER_ADMIN">SUPER_ADMIN (Platform Super Admin)</option>
                <option value="UNIVERSITY_ADMIN">UNIVERSITY_ADMIN (University Admin)</option>
                <option value="INDUSTRY_ADMIN">INDUSTRY_ADMIN (Industry Admin)</option>
                <option value="GOVERNMENT_ADMIN">GOVERNMENT_ADMIN</option>
                <option value="STUDENT">STUDENT</option>
                <option value="FACULTY">FACULTY</option>
                <option value="CITIZEN">CITIZEN</option>
              </select>
            </div>

            <button type="submit" className="w-full py-3 bg-[#005A36] text-white font-extrabold rounded-xl shadow">
              Confirm Role Assignment
            </button>
          </form>
        )}
      </Modal>

      {/* Add University Modal */}
      <Modal isOpen={isUnivModalOpen} onClose={() => setIsUnivModalOpen(false)} title="Create New University Record" maxWidth="max-w-md">
        <form onSubmit={handleCreateUniv} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">University Name</label>
            <input type="text" required value={univForm.name} onChange={(e) => setUnivForm({ ...univForm, name: e.target.value })} placeholder="e.g. BIT Mesra" className="w-full px-3 py-2 border rounded-lg font-semibold" />
          </div>
          <div>
            <label className="block font-bold text-slate-700 mb-1">Admin Email</label>
            <input type="email" required value={univForm.email} onChange={(e) => setUnivForm({ ...univForm, email: e.target.value })} className="w-full px-3 py-2 border rounded-lg" />
          </div>
          <button type="submit" className="w-full py-3 bg-indigo-600 text-white font-bold rounded-xl">Save University Record</button>
        </form>
      </Modal>

      {/* Add Industry Modal */}
      <Modal isOpen={isIndustryModalOpen} onClose={() => setIsIndustryModalOpen(false)} title="Create New Industry CSR Record" maxWidth="max-w-md">
        <form onSubmit={handleCreateIndustry} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Industry Name</label>
            <input type="text" required value={indForm.name} onChange={(e) => setIndForm({ ...indForm, name: e.target.value })} placeholder="e.g. Tata Steel CSR" className="w-full px-3 py-2 border rounded-lg font-semibold" />
          </div>
          <div>
            <label className="block font-bold text-slate-700 mb-1">Admin Email</label>
            <input type="email" required value={indForm.email} onChange={(e) => setIndForm({ ...indForm, email: e.target.value })} className="w-full px-3 py-2 border rounded-lg" />
          </div>
          <button type="submit" className="w-full py-3 bg-amber-600 text-white font-bold rounded-xl">Save Industry Record</button>
        </form>
      </Modal>

    </div>
  );
};
