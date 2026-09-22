import React, { useState } from 'react';
import { 
  GraduationCap, 
  Users, 
  Sparkles, 
  CheckCircle2, 
  PlusCircle, 
  Layers, 
  UserCheck, 
  Building2, 
  ArrowRight,
  ShieldAlert,
  Search,
  BookOpen
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { StatusBadge } from '../components/common/StatusBadge';
import { PriorityBadge } from '../components/common/PriorityBadge';
import { Modal } from '../components/common/Modal';

export const UniversityAdminDashboard = () => {
  const { currentUser, problems, users, projects, addProject, updateProblemStatus } = useApp();

  const universityName = currentUser.university || "BIT Mesra";
  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'students', 'faculty', 'projects', 'problems'
  const [studentSearch, setStudentSearch] = useState('');
  
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [projectForm, setProjectForm] = useState({
    title: 'Smart Water Monitoring Microgrid',
    problemId: 'JH-2026-8901',
    leadStudent: 'Ankit Kumar',
    facultyMentor: 'Dr. S. K. Mahato',
    description: 'IoT sensor network for rural borewell flow tracking.'
  });

  // Filter student & faculty members belonging to this university
  const univStudents = (users || []).filter(u => u.role === 'STUDENT' || u.role === 'student');
  const univFaculty = [
    { id: 'F-1', name: 'Dr. S. K. Mahato', department: 'Civil Engineering', expertise: 'Hydro-geology', projects: 2 },
    { id: 'F-2', name: 'Dr. Ananya Sharma', department: 'Electrical Engineering', expertise: 'Solar Microgrids', projects: 3 },
    { id: 'F-3', name: 'Prof. R. N. Munda', department: 'Environmental Science', expertise: 'Water Sanitation', projects: 1 }
  ];

  const assignedProblems = problems.filter(p => p.assignedUniversity?.includes('BIT') || p.assignedTeam?.includes('BIT') || p.status === 'Assigned' || p.status === 'Solution Proposed');

  const handleCreateProject = (e) => {
    e.preventDefault();
    if (!projectForm.title) return;
    addProject({
      ...projectForm,
      university: universityName,
      status: 'Active'
    });
    setIsProjectModalOpen(false);
    alert(`Project '${projectForm.title}' successfully created under ${universityName}!`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-850 to-slate-900 text-white p-8 rounded-3xl shadow-xl border-b-4 border-indigo-400 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-indigo-400 text-slate-950 font-black text-xs px-3 py-1 rounded-full uppercase tracking-wider">
              LEVEL 2 — UNIVERSITY ADMIN
            </span>
            <span className="bg-indigo-950 text-indigo-200 text-xs font-bold px-3 py-1 rounded-full border border-indigo-700">
              Jurisdiction: {universityName}
            </span>
          </div>
          <h1 className="text-3xl font-black">{universityName} Admin Portal</h1>
          <p className="text-indigo-100 text-xs sm:text-sm mt-1 max-w-2xl">
            Manage student innovation cells, faculty mentors, academic project blueprints, & societal problem adoption.
          </p>
        </div>

        <button
          onClick={() => setIsProjectModalOpen(true)}
          className="px-5 py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs rounded-xl shadow border border-amber-300 flex items-center gap-1.5 shrink-0"
        >
          <PlusCircle className="w-4 h-4" /> Create Academic Project
        </button>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 text-xs">
        <div className="bg-white p-4 rounded-2xl border text-center shadow-sm">
          <span className="text-2xl font-black text-indigo-700 block">{univStudents.length}</span>
          <span className="text-[10px] text-slate-500 font-bold uppercase">Enrolled Students</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border text-center shadow-sm">
          <span className="text-2xl font-black text-slate-900 block">{univFaculty.length}</span>
          <span className="text-[10px] text-slate-500 font-bold uppercase">Faculty Mentors</span>
        </div>

        <div className="bg-indigo-50 p-4 rounded-2xl border border-indigo-200 text-center shadow-sm">
          <span className="text-2xl font-black text-indigo-900 block">{(projects || []).length + 2}</span>
          <span className="text-[10px] text-indigo-800 font-extrabold uppercase">Active Projects</span>
        </div>

        <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 text-center shadow-sm">
          <span className="text-2xl font-black text-amber-800 block">{assignedProblems.length}</span>
          <span className="text-[10px] text-amber-950 font-bold uppercase">Assigned Challenges</span>
        </div>

        <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200 text-center shadow-sm">
          <span className="text-2xl font-black text-[#005A36] block">4</span>
          <span className="text-[10px] text-emerald-900 font-bold uppercase">Completed Prototypes</span>
        </div>

        <div className="bg-purple-50 p-4 rounded-2xl border border-purple-200 text-center shadow-sm">
          <span className="text-2xl font-black text-purple-800 block">3</span>
          <span className="text-[10px] text-purple-900 font-bold uppercase">CSR Partnerships</span>
        </div>
      </div>

      {/* University Admin Navigation Tabs (Section 10) */}
      <div className="bg-white rounded-2xl p-2 shadow-sm border border-slate-200 flex flex-wrap items-center gap-1 text-xs font-bold">
        {[
          { id: 'overview', label: 'University Overview', icon: Layers },
          { id: 'students', label: `Student Roster (${univStudents.length})`, icon: Users },
          { id: 'faculty', label: `Faculty Mentors (${univFaculty.length})`, icon: GraduationCap },
          { id: 'projects', label: 'Academic Projects', icon: Sparkles },
          { id: 'problems', label: `Assigned Problems (${assignedProblems.length})`, icon: BookOpen },
        ].map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5 ${
                activeTab === tab.id 
                  ? 'bg-indigo-600 text-white shadow font-extrabold' 
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB: STUDENTS */}
      {activeTab === 'students' && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-4">
          <div className="flex justify-between items-center border-b pb-4">
            <h3 className="font-black text-lg text-slate-900">Enrolled Student Innovators ({universityName})</h3>
            <input
              type="text"
              value={studentSearch}
              onChange={(e) => setStudentSearch(e.target.value)}
              placeholder="Search student name or course..."
              className="px-3.5 py-2 bg-slate-50 border rounded-xl text-xs font-semibold w-60"
            />
          </div>

          <div className="overflow-x-auto text-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-indigo-950 text-white font-extrabold uppercase text-[10px]">
                  <th className="p-3">Student Name</th>
                  <th className="p-3">Course & Year</th>
                  <th className="p-3">Technical Skills</th>
                  <th className="p-3">Active Project</th>
                  <th className="p-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {univStudents.map((st, i) => (
                  <tr key={i} className="hover:bg-slate-50">
                    <td className="p-3 font-bold text-slate-900">{st.name}</td>
                    <td className="p-3 text-slate-600 font-semibold">B.Tech Civil • 4th Year</td>
                    <td className="p-3 text-indigo-700 font-bold">Hydro-geology, Paving</td>
                    <td className="p-3 font-semibold text-slate-800">Smart Water Monitoring</td>
                    <td className="p-3 text-center">
                      <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded text-[10px]">Active</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB: FACULTY */}
      {activeTab === 'faculty' && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-4">
          <h3 className="font-black text-lg text-slate-900">Faculty Mentors & Supervisors</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            {univFaculty.map(f => (
              <div key={f.id} className="p-4 bg-indigo-50/50 rounded-xl border border-indigo-200 space-y-2">
                <span className="font-extrabold text-sm text-indigo-950 block">{f.name}</span>
                <span className="text-slate-500 block">{f.department}</span>
                <span className="bg-indigo-200 text-indigo-900 font-bold text-[10px] px-2 py-0.5 rounded inline-block">
                  Expertise: {f.expertise}
                </span>
                <span className="text-slate-600 font-semibold block pt-1">Mentoring {f.projects} Projects</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Create Project Modal */}
      <Modal isOpen={isProjectModalOpen} onClose={() => setIsProjectModalOpen(false)} title="Create New Academic Innovation Project" maxWidth="max-w-md">
        <form onSubmit={handleCreateProject} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Project Title</label>
            <input type="text" required value={projectForm.title} onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })} className="w-full px-3 py-2 border rounded-lg font-semibold" />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Lead Student</label>
            <input type="text" required value={projectForm.leadStudent} onChange={(e) => setProjectForm({ ...projectForm, leadStudent: e.target.value })} className="w-full px-3 py-2 border rounded-lg font-semibold" />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Faculty Mentor</label>
            <input type="text" required value={projectForm.facultyMentor} onChange={(e) => setProjectForm({ ...projectForm, facultyMentor: e.target.value })} className="w-full px-3 py-2 border rounded-lg font-semibold" />
          </div>

          <button type="submit" className="w-full py-3 bg-indigo-600 text-white font-extrabold rounded-xl shadow">
            Launch Academic Project
          </button>
        </form>
      </Modal>

    </div>
  );
};
