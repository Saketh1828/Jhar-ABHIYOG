import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  MapPin, 
  Users, 
  Calendar, 
  Heart, 
  Eye, 
  Share2, 
  Sparkles, 
  CheckCircle2, 
  Shield, 
  ArrowLeft, 
  Building2, 
  GraduationCap, 
  Send,
  Bot,
  Check,
  Layers
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { StatusBadge } from '../components/common/StatusBadge';
import { PriorityBadge } from '../components/common/PriorityBadge';
import { ProgressTracker } from '../components/common/ProgressTracker';
import { Modal } from '../components/common/Modal';
import { JoinProjectModal } from '../components/common/JoinProjectModal';
import { OfferMembershipModal } from '../components/common/OfferMembershipModal';

export const ProblemDetail = () => {
  const { id } = useParams();
  const { 
    problems, 
    likedProblemIds, 
    toggleLike, 
    trackedProblemIds, 
    toggleTrack,
    proposeSolution, 
    currentUser 
  } = useApp();

  const problem = problems.find(p => p.id === id) || problems[0];

  const isLiked = likedProblemIds.includes(problem.id);
  const isTracked = trackedProblemIds.includes(problem.id);

  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

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
              {problem.targetResponse ? problem.targetResponse.replace('Target attention: ', '') : '2 Days Target'}
            </span>
          </div>
        </div>

        {/* Action Buttons Bar: Support + Track + Join + Offer + Share */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          
          <div className="flex flex-wrap items-center gap-2">
            {/* Support / Like Button (Section 23) */}
            <button
              onClick={() => toggleLike(problem.id)}
              className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all border ${
                isLiked 
                  ? 'bg-rose-50 text-rose-700 border-rose-300 shadow-sm' 
                  : 'bg-slate-100 hover:bg-rose-50 text-slate-700 border-slate-200'
              }`}
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-rose-600 text-rose-600 animate-pulse' : 'text-slate-500'}`} />
              <span>{isLiked ? '♥ Supported' : '♡ Support Problem'} ({problem.supportersCount})</span>
            </button>

            {/* Track Problem Button (Section 24) */}
            <button
              onClick={() => toggleTrack(problem.id)}
              className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all border ${
                isTracked
                  ? 'bg-indigo-50 text-indigo-800 border-indigo-300'
                  : 'bg-slate-100 hover:bg-indigo-50 text-slate-700 border-slate-200'
              }`}
            >
              {isTracked ? <Check className="w-4 h-4 text-indigo-700" /> : <Eye className="w-4 h-4 text-indigo-600" />}
              <span>{isTracked ? '✓ Tracking' : '👁 Track Problem'}</span>
            </button>

            <button
              onClick={() => setIsShareModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
            >
              <Share2 className="w-4 h-4 text-slate-500" />
              <span>Share</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsOfferModalOpen(true)}
              className="px-4 py-2.5 rounded-xl font-bold text-xs text-amber-900 bg-amber-100 hover:bg-amber-200 border border-amber-300 shadow-sm"
            >
              Offer Membership
            </button>

            <button
              onClick={() => setIsJoinModalOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-extrabold text-xs text-white bg-gradient-to-r from-[#005A36] to-emerald-700 hover:from-emerald-800 hover:to-[#005A36] shadow-md transition-all ring-2 ring-emerald-400"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>JOIN PROJECT</span>
            </button>
          </div>

        </div>

      </div>

      {/* Receiver Recommendation Perspective (Section 20, 21, 22) */}
      <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-[#003D24] text-white rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-indigo-400 space-y-4">
        <div className="flex items-center justify-between border-b border-indigo-800 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm uppercase text-amber-400 tracking-wide">
                RECEIVER PERSPECTIVE & AI RECOMMENDATION
              </h3>
              <p className="text-[11px] text-indigo-200">System identification of responsible receiver</p>
            </div>
          </div>
          <span className="bg-indigo-900 text-indigo-200 text-xs font-bold px-3 py-1 rounded-full border border-indigo-700">
            Receiver Type: {problem.receiverType || "Government Department"}
          </span>
        </div>

        <div className="space-y-3">
          <div>
            <span className="text-[11px] text-slate-400 font-bold block uppercase">Recommended Official Receiver</span>
            <p className="text-xl font-black text-white mt-0.5">
              {problem.recommendedReceiver || problem.assignedDepartment || "Department of Drinking Water & Sanitation (Dumka Division)"}
            </p>
          </div>

          <div className="p-3.5 bg-slate-800/80 rounded-xl border border-slate-700 text-xs text-slate-200 leading-relaxed">
            <strong className="text-amber-300 block mb-1">Why this receiver?</strong>
            "{problem.whyReceiver || `Based on the problem category (${problem.category}) and location in ${problem.district}, this department is officially responsible for ground infrastructure and public maintenance.`}"
          </div>
        </div>

        {/* 6-Stage Assignment Flow (Section 22) */}
        <div className="pt-2">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-2">
            Assignment Workflow Flow
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 text-center text-[10px] font-bold">
            <div className="p-2 bg-slate-800 rounded-lg text-emerald-400 border border-slate-700">1. Citizen Report</div>
            <div className="p-2 bg-slate-800 rounded-lg text-amber-400 border border-slate-700">2. AI Analysis</div>
            <div className="p-2 bg-slate-800 rounded-lg text-indigo-400 border border-slate-700">3. Govt Validation</div>
            <div className="p-2 bg-slate-800 rounded-lg text-purple-400 border border-slate-700">4. Receiver Assigned</div>
            <div className="p-2 bg-slate-800 rounded-lg text-rose-400 border border-slate-700">5. University Collab</div>
            <div className="p-2 bg-slate-800 rounded-lg text-emerald-300 border border-slate-700">6. Ground Resolution</div>
          </div>
        </div>
      </div>

      {/* Ground Photos */}
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
              Verified Identity
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

      {/* Modals */}
      <JoinProjectModal
        isOpen={isJoinModalOpen}
        onClose={() => setIsJoinModalOpen(false)}
        project={problem}
      />

      <OfferMembershipModal
        isOpen={isOfferModalOpen}
        onClose={() => setIsOfferModalOpen(false)}
        targetUser={{ name: problem.reportedBy, email: problem.reporterEmail }}
        challenge={problem}
      />

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
