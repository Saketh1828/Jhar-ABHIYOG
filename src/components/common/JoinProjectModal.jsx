import React, { useState } from 'react';
import { Modal } from './Modal';
import { Send, CheckCircle2, User, Mail, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { buildJoinRequestEmail } from '../../utils/emailService';

export const JoinProjectModal = ({ isOpen, onClose, project }) => {
  const { currentUser, sendEmail, addNotification } = useApp();

  const [role, setRole] = useState('Student / Researcher');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [lastSentEmail, setLastSentEmail] = useState(null);

  if (!project) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailObj = buildJoinRequestEmail({
      recipientName: project.assignedDepartment || project.assignedTeam || 'Project Receiver',
      recipientEmail: 'receiver.department@samasya.example',
      senderName: currentUser.name || 'Ankit Kumar',
      senderEmail: currentUser.email || 'student.demo@samasya.example',
      projectName: project.title,
      role: role,
      message: message
    });

    sendEmail(emailObj);
    setLastSentEmail(emailObj);
    setIsSuccess(true);
  };

  const handleDone = () => {
    setIsSuccess(false);
    setMessage('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleDone} title="JOIN COLLABORATIVE PROJECT" maxWidth="max-w-md">
      {isSuccess ? (
        <div className="text-center py-6 space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#005A36] mx-auto flex items-center justify-center border-2 border-emerald-300 animate-bounce">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h3 className="text-lg font-black text-slate-900">✓ Join Request Sent Successfully!</h3>
          <p className="text-xs text-slate-600 max-w-sm mx-auto">
            Your join request and technical message have been dispatched to the project receiver and department officer.
          </p>

          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-left text-xs space-y-1">
            <span className="font-extrabold text-amber-900 block flex items-center gap-1">
              <Mail className="w-3.5 h-3.5 text-amber-700" /> Demo Email Notification Sent
            </span>
            <p className="text-amber-950 font-mono text-[11px] truncate">Subject: {lastSentEmail?.subject}</p>
            <p className="text-slate-600 text-[10px]">To: {lastSentEmail?.to}</p>
          </div>

          <button
            onClick={handleDone}
            className="w-full py-3 bg-[#005A36] text-white font-bold text-xs rounded-xl shadow"
          >
            Close & Continue
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          
          <div className="p-3 bg-[#FAF8F5] rounded-xl border border-slate-200">
            <span className="text-[10px] text-slate-400 font-bold block uppercase">Target Project</span>
            <span className="font-extrabold text-slate-900 block text-sm mt-0.5">{project.title}</span>
            <span className="text-[11px] text-indigo-700 font-semibold block mt-0.5">
              Receiver: {project.assignedDepartment || "District Engineering Cell"}
            </span>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Your Applicant Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold text-slate-800"
            >
              <option value="Student / Researcher">Student / Researcher</option>
              <option value="University Faculty Mentor">University Faculty Mentor</option>
              <option value="Industry Technical Volunteer">Industry Technical Volunteer</option>
              <option value="Community Champion">Community Champion</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Applicant Name & Contact</label>
            <div className="p-2.5 bg-slate-100 rounded-xl font-medium text-slate-700 flex justify-between">
              <span>{currentUser.name || 'Ankit Kumar'}</span>
              <span className="font-mono text-slate-500">{currentUser.email || 'student.demo@samasya.example'}</span>
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Message to Project Receiver (Optional)</label>
            <textarea
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Describe your technical skills, experience, or why you want to join..."
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-normal focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-3 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 bg-[#005A36] hover:bg-[#003D24] text-white font-extrabold rounded-xl shadow flex items-center justify-center gap-1.5"
            >
              <Send className="w-4 h-4 text-amber-300" />
              <span>SEND JOIN REQUEST</span>
            </button>
          </div>

        </form>
      )}
    </Modal>
  );
};
