import React, { useState } from 'react';
import { Modal } from './Modal';
import { Mail, Send, CheckCircle2, ChevronRight, Inbox, Clock } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const DemoEmailModal = ({ isOpen, onClose }) => {
  const { sentEmails } = useApp();
  const [selectedEmail, setSelectedEmail] = useState(null);

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="📧 Demo Email Dispatches (Backend Email Service)" maxWidth="max-w-2xl">
      <div className="space-y-4 text-xs">
        
        <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 flex items-center justify-between">
          <div>
            <span className="font-extrabold text-sm block">Mock Email Service Status: Active</span>
            <span className="text-[11px] text-amber-800">
              Emails are generated via backend email service abstraction and stored in system logs.
            </span>
          </div>
          <span className="bg-amber-600 text-white font-mono px-2 py-1 rounded text-[10px]">
            {sentEmails.length} Sent Logged
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          
          {/* Email List */}
          <div className="md:col-span-5 border rounded-xl divide-y overflow-hidden max-h-72 overflow-y-auto">
            {sentEmails.length === 0 ? (
              <div className="p-6 text-center text-slate-400">
                <Inbox className="w-8 h-8 mx-auto text-slate-300" />
                <p className="mt-1">No emails sent yet.</p>
              </div>
            ) : (
              sentEmails.map(eml => (
                <button
                  key={eml.id}
                  onClick={() => setSelectedEmail(eml)}
                  className={`w-full text-left p-3 hover:bg-slate-50 transition-colors flex items-center justify-between ${
                    selectedEmail?.id === eml.id ? 'bg-emerald-50 border-l-4 border-l-[#005A36]' : ''
                  }`}
                >
                  <div className="space-y-0.5 truncate pr-2">
                    <span className="font-bold text-slate-900 block truncate">{eml.subject}</span>
                    <span className="text-[10px] text-slate-500 block truncate">To: {eml.to}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                </button>
              ))
            )}
          </div>

          {/* Email Viewer */}
          <div className="md:col-span-7 bg-slate-900 text-slate-100 p-4 rounded-xl border border-slate-700 flex flex-col justify-between font-mono max-h-72 overflow-y-auto">
            {selectedEmail || sentEmails[0] ? (
              <div className="space-y-3 text-[11px]">
                <div className="border-b border-slate-700 pb-2 space-y-1">
                  <div><strong className="text-amber-400">Subject:</strong> {(selectedEmail || sentEmails[0]).subject}</div>
                  <div><strong className="text-emerald-400">To:</strong> {(selectedEmail || sentEmails[0]).to}</div>
                  <div><strong className="text-slate-400">From:</strong> {(selectedEmail || sentEmails[0]).from}</div>
                  <div><strong className="text-slate-500">Date:</strong> {(selectedEmail || sentEmails[0]).timestamp}</div>
                </div>

                <div className="whitespace-pre-line leading-relaxed text-slate-300 text-[10px]">
                  {(selectedEmail || sentEmails[0]).body}
                </div>
              </div>
            ) : (
              <div className="text-center py-10 text-slate-500 font-sans">
                Select an email from the left to view contents.
              </div>
            )}
          </div>

        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs rounded-xl"
          >
            Close Viewer
          </button>
        </div>

      </div>
    </Modal>
  );
};
