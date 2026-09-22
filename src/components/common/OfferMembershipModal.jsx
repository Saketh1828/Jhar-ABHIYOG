import React, { useState } from 'react';
import { Modal } from './Modal';
import { Send, CheckCircle2, Building2, Mail, Award } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { buildMembershipOfferEmail } from '../../utils/emailService';

export const OfferMembershipModal = ({ isOpen, onClose, targetUser, challenge }) => {
  const { currentUser, sendEmail } = useApp();

  const [role, setRole] = useState('Lead Technical Innovator');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [lastSentEmail, setLastSentEmail] = useState(null);

  const recipientName = targetUser?.name || 'Birsa Soren';
  const recipientEmail = targetUser?.email || 'student.demo@samasya.example';
  const orgName = currentUser.organization || currentUser.name || 'Tata Steel CSR Foundation';

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailObj = buildMembershipOfferEmail({
      recipientName,
      recipientEmail,
      orgName,
      role,
      message
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

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={handleDone} title="OFFER MEMBERSHIP & COLLABORATION" maxWidth="max-w-md">
      {isSuccess ? (
        <div className="text-center py-6 space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#005A36] mx-auto flex items-center justify-center border-2 border-emerald-300 animate-bounce">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h3 className="text-lg font-black text-slate-900">✓ Membership Offer Sent Successfully!</h3>
          <p className="text-xs text-slate-600 max-w-sm mx-auto">
            Your corporate/university membership offer has been sent to {recipientName} via in-app alert & email notification.
          </p>

          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-left text-xs space-y-1">
            <span className="font-extrabold text-amber-900 block flex items-center gap-1">
              <Mail className="w-3.5 h-3.5 text-amber-700" /> Demo Email Dispatch Logged
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
          
          <div className="p-3 bg-[#FAF8F5] rounded-xl border border-slate-200 space-y-1">
            <div className="flex justify-between">
              <span className="text-[10px] text-slate-400 font-bold uppercase">Recipient</span>
              <span className="font-bold text-slate-900">{recipientName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[10px] text-slate-400 font-bold uppercase">Offering Org</span>
              <span className="font-bold text-[#005A36]">{orgName}</span>
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Offered Role / Membership Type</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold text-slate-800"
            >
              <option value="Lead Technical Innovator">Lead Technical Innovator</option>
              <option value="CSR Project Fellow">CSR Project Fellow</option>
              <option value="Hardware Research Intern">Hardware Research Intern</option>
              <option value="Community Project Coordinator">Community Project Coordinator</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Offer Message (Optional)</label>
            <textarea
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter message details regarding mentorship, grant funding, or hardware access..."
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
              className="flex-1 py-3 bg-amber-600 hover:bg-amber-700 text-white font-extrabold rounded-xl shadow flex items-center justify-center gap-1.5"
            >
              <Send className="w-4 h-4 text-white" />
              <span>SEND MEMBERSHIP OFFER</span>
            </button>
          </div>

        </form>
      )}
    </Modal>
  );
};
