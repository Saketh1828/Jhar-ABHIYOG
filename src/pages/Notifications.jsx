import React from 'react';
import { Link } from 'react-router-dom';
import { Bell, Check, ExternalLink, ShieldCheck, Sparkles, Building2, Trash2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Notifications = () => {
  const { notifications, markNotificationRead, markAllNotificationsRead } = useApp();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#005A36] uppercase tracking-wider mb-1">
            <Bell className="w-4 h-4 text-amber-500" />
            <span>Alert Center</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900">System Notifications</h1>
          <p className="text-slate-500 text-xs mt-0.5">Stay updated on problem verification, university assignments, & solution progress.</p>
        </div>

        {notifications.some(n => n.unread) && (
          <button
            onClick={markAllNotificationsRead}
            className="px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-[#005A36] font-bold text-xs rounded-xl border border-emerald-200 transition-colors flex items-center gap-1.5 shrink-0"
          >
            <Check className="w-4 h-4" />
            <span>Mark All As Read</span>
          </button>
        )}
      </div>

      {/* List */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm divide-y divide-slate-100 overflow-hidden">
        {notifications.length === 0 ? (
          <div className="p-12 text-center text-slate-400 text-sm space-y-2">
            <Bell className="w-10 h-10 mx-auto text-slate-300" />
            <p>No notifications present right now.</p>
          </div>
        ) : (
          notifications.map((notif) => (
            <div
              key={notif.id}
              onClick={() => markNotificationRead(notif.id)}
              className={`p-5 flex items-start gap-4 transition-colors ${
                notif.unread ? 'bg-amber-50/40 border-l-4 border-l-amber-500' : 'hover:bg-slate-50'
              }`}
            >
              <div className="mt-1 shrink-0 p-2.5 rounded-xl bg-slate-100">
                {notif.type === 'status' && <ShieldCheck className="w-6 h-6 text-emerald-600" />}
                {notif.type === 'collaboration' && <Sparkles className="w-6 h-6 text-indigo-600" />}
                {notif.type === 'industry' && <Building2 className="w-6 h-6 text-amber-600" />}
              </div>

              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-extrabold text-sm text-slate-900">{notif.title}</h3>
                  <span className="text-[11px] text-slate-400 font-medium">{notif.time}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{notif.message}</p>
                {notif.link && (
                  <Link
                    to={notif.link}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#005A36] hover:underline pt-1"
                  >
                    <span>View Associated Report</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                )}
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
};
