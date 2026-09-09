import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  MapPin, 
  Users, 
  Calendar, 
  ThumbsUp, 
  Share2, 
  Sparkles, 
  CheckCircle2, 
  Shield, 
  ArrowLeft, 
  Building2, 
  GraduationCap, 
  Send,
  MessageSquare,
  Bot
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { StatusBadge } from '../components/common/StatusBadge';
import { PriorityBadge } from '../components/common/PriorityBadge';
import { ProgressTracker } from '../components/common/ProgressTracker';
import { Modal } from '../components/common/Modal';

export const ProblemDetail = () => {
  const { id } = useParams();
  const { problems, supportProblem, proposeSolution, currentUser } = useApp();

  const problem = problems.find(p => p.id === id) || problems[0];

  const [isSolutionModalOpen, setIsSolutionModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const [solutionForm, setSolutionForm] = useState({
    teamName: currentUser.university ? `${currentUser.name}'s Innovation Cell` : 'BIT Mesra Student Innovation Cell',
    institution: currentUser.university || 'Birsa Institute of Technology / NIT Jamshedpur',
    contactEmail: 'solver@jharkhand-solutions.org',
    description: ''
  });

  const handleSupport = () => {
    supportProblem(problem.id);
  };

  const handleSolutionSubmit = (e) => {
    e.preventDefault();
    if (!solutionForm.description.trim()) {
      alert("Please enter details of your proposed solution.");
      return;
    }

    proposeSolution(problem.id, solutionForm);
    setIsSolutionModalOpen(false);
    alert("Solution proposal submitted successfully! The government officer and reporter have been notified.");
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Back Link */}
      <div>
        <Link to="/explore" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-[#005A36]">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Explore Problems</span>
        </Link>
      </div>

      {/* Main Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold bg-[#005A36] text-white px-3 py-1 rounded-full">
              ID: {problem.id}
            </span>
            <span className="text-xs text-[#005A36] bg-emerald-50 px-2.5 py-1 rounded-md font-bold border border-emerald-200 flex items-center gap-1">
              <Bot className="w-3.5 h-3.5 text-amber-600" />
              Category: {problem.category}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <PriorityBadge priority={problem.priority} size="sm" />
            <StatusBadge status={problem.status} size="sm" />
          </div>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 leading-snug">
          {problem.title}
        </h1>

        {/* Location & Meta Info Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-[#FAF8F5] rounded-2xl border border-slate-200/80 text-xs">
          <div>
            <span className="text-slate-400 font-bold block uppercase text-[10px]">Location</span>
            <span className="font-bold text-slate-900 flex items-center gap-1 mt-0.5">
              <MapPin className="w-3.5 h-3.5 text-[#B84A17]" />
              {problem.village || 'Village'}, {problem.district}
            </span>
          </div>

          <div>
            <span className="text-slate-400 font-bold block uppercase text-[10px]">People Affected</span>
            <span className="font-bold text-slate-900 flex items-center gap-1 mt-0.5">
              <Users className="w-3.5 h-3.5 text-amber-600" />
              {problem.affectedPeople.toLocaleString()} Citizens
            </span>
          </div>

          <div>
            <span className="text-slate-400 font-bold block uppercase text-[10px]">Date Reported</span>
            <span className="font-bold text-slate-900 flex items-center gap-1 mt-0.5">
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              {problem.dateReported}
            </span>
          </div>

          <div>
            <span className="text-slate-400 font-bold block uppercase text-[10px]">Target Response SLA</span>
            <span className="font-extrabold text-[#005A36] block mt-0.5">
              {problem.targetResponse.replace('Target attention: ', '')}
            </span>
          </div>
        </div>

        {/* Action Buttons Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          
          <div className="flex items-center gap-3">
            <button
              onClick={handleSupport}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-extrabold text-slate-800 bg-amber-50 border border-amber-300 hover:bg-amber-100 transition-colors shadow-sm"
            >
              <ThumbsUp className="w-4 h-4 text-amber-600" />
              <span>Support This Problem ({problem.supportersCount})</span>
            </button>

            <button
              onClick={() => setIsShareModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
            >
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </button>
          </div>

          <button
            onClick={() => setIsSolutionModalOpen(true)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-extrabold text-sm text-white bg-gradient-to-r from-[#005A36] to-emerald-700 hover:from-emerald-800 hover:to-[#005A36] shadow-lg transition-all ring-2 ring-emerald-400"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>PROPOSE A SOLUTION</span>
          </button>

        </div>

      </div>

      {/* Photos Gallery */}
      {problem.photos && problem.photos.length > 0 && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
          <h3 className="text-sm font-bold text-slate-900">Uploaded Ground Photos ({problem.photos.length})</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {problem.photos.map((src, i) => (
              <div key={i} className="rounded-2xl overflow-hidden aspect-video border border-slate-200 bg-slate-100">
                <img src={src} alt={`Problem Ground ${i+1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Description & Details */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div>
          <h3 className="text-lg font-extrabold text-slate-900 mb-2">Detailed Description</h3>
          <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-line">
            {problem.description}
          </p>
        </div>

        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
          <div>
            <span className="block font-bold text-slate-800">Reported By Citizen:</span>
            <span>{problem.reportedBy} ({problem.reporterMobile})</span>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="bg-emerald-100 text-[#005A36] px-2.5 py-1 rounded font-bold text-[11px]">
              Verified Citizen
            </span>
            {problem.aiConfidence && (
              <span className="bg-amber-100 text-amber-900 px-2.5 py-1 rounded font-bold text-[11px] border border-amber-300 flex items-center gap-1">
                <Bot className="w-3 h-3 text-amber-700" />
                AI Categorization: {problem.aiConfidence}% Confidence
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Status Timeline */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-lg font-extrabold text-slate-900">Transparent Lifecycle Progress</h3>
        <ProgressTracker currentStatus={problem.status} history={problem.history} />
      </div>

      {/* Special "Looking for Solutions" Collaboration Section */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-[#1A2E40] text-white rounded-3xl p-8 shadow-xl border-2 border-amber-400 space-y-6">
        
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-black">
            <Sparkles className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white">Looking for Collaborative Solutions</h2>
            <p className="text-xs text-amber-300">
              This issue is not just a complaint—it is an active societal challenge open for academic research & corporate CSR partnership.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          
          <div className="p-4 bg-slate-800/80 rounded-2xl border border-slate-700 space-y-2">
            <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
              <GraduationCap className="w-5 h-5" />
              <span>For Universities & Students</span>
            </div>
            <p className="text-xs text-slate-300">
              Adopt this challenge for your final year project or SIH innovation cell prototype.
            </p>
            <button
              onClick={() => setIsSolutionModalOpen(true)}
              className="text-xs font-bold text-indigo-300 hover:underline inline-flex items-center gap-1 pt-1"
            >
              Submit Technical Solution Proposal →
            </button>
          </div>

          <div className="p-4 bg-slate-800/80 rounded-2xl border border-slate-700 space-y-2">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
              <Building2 className="w-5 h-5" />
              <span>For Industry & CSR Sponsors</span>
            </div>
            <p className="text-xs text-slate-300">
              Provide equipment, technical mentorship, or hardware sponsorship to accelerate ground resolution.
            </p>
            <button
              onClick={() => setIsSolutionModalOpen(true)}
              className="text-xs font-bold text-amber-300 hover:underline inline-flex items-center gap-1 pt-1"
            >
              Pledge Industry Support →
            </button>
          </div>

        </div>

        {problem.solutionProposed && (
          <div className="p-4 bg-emerald-950/80 rounded-2xl border border-emerald-500 text-xs space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-extrabold text-sm">
              <CheckCircle2 className="w-5 h-5" />
              <span>Active Solution Under Implementation</span>
            </div>
            <p className="text-emerald-100 font-medium">Assigned Solver: {problem.assignedTeam}</p>
            <p className="text-emerald-200">{problem.solutionProposed}</p>
          </div>
        )}

      </div>

      {/* Propose Solution Modal */}
      <Modal
        isOpen={isSolutionModalOpen}
        onClose={() => setIsSolutionModalOpen(false)}
        title="Propose Solution / Offer Partnership"
        maxWidth="max-w-lg"
      >
        <form onSubmit={handleSolutionSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Team / Organization Name
            </label>
            <input
              type="text"
              required
              value={solutionForm.teamName}
              onChange={(e) => setSolutionForm({ ...solutionForm, teamName: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Institution / Company
            </label>
            <input
              type="text"
              required
              value={solutionForm.institution}
              onChange={(e) => setSolutionForm({ ...solutionForm, institution: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Proposed Technical Blueprint / Support Plan
            </label>
            <textarea
              rows={4}
              required
              value={solutionForm.description}
              onChange={(e) => setSolutionForm({ ...solutionForm, description: e.target.value })}
              placeholder="Describe your technical prototype approach, estimated cost, and implementation roadmap..."
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 rounded-xl font-bold text-xs text-white bg-[#005A36] hover:bg-[#003D24] shadow transition-colors flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" />
            <span>Submit Solution Proposal</span>
          </button>
        </form>
      </Modal>

      {/* Share Modal */}
      <Modal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        title="Share Problem Challenge"
        maxWidth="max-w-md"
      >
        <div className="space-y-4 text-center">
          <p className="text-xs text-slate-600">
            Share this societal problem with student developers, university innovation cells, or district authorities.
          </p>

          <div className="flex items-center gap-2 p-2 bg-slate-100 rounded-xl border border-slate-300">
            <input
              type="text"
              readOnly
              value={window.location.href}
              className="w-full bg-transparent text-xs font-mono border-none focus:outline-none"
            />
            <button
              onClick={handleCopyLink}
              className="px-3 py-1.5 bg-[#005A36] text-white text-xs font-bold rounded-lg shrink-0"
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>
      </Modal>

    </div>
  );
};
