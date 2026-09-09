import React, { useState, useRef, useEffect } from 'react';
import { Bell, Check, ExternalLink, ShieldCheck, Sparkles, Building2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Link } from 'react-router-dom';

export const NotificationDropdown = () => {
  const { notifications, markNotificationRead, markAllNotificationsRead } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const unreadCount = notifications.filter(n => n.unread).length;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-slate-700 hover:text-[#005A36] hover:bg-slate-100 rounded-full transition-colors focus:outline-none"
        aria-label="Notifications"
      >
        <Bell className="w-6 h-6" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-5 h-5 bg-red-600 text-white font-bold text-[10px] rounded-full flex items-center justify-center border-2 border-white animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-2xl border border-slate-200 z-50 overflow-hidden text-slate-800">
          <div className="p-3.5 bg-slate-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-amber-400" />
              <h3 className="font-bold text-sm">System Notifications</h3>
            </div>
            {unreadCount > 0 && (
              <button
                onClick={markAllNotificationsRead}
                className="text-xs text-amber-300 hover:underline flex items-center gap-1"
              >
                <Check className="w-3 h-3" /> Mark all read
              </button>
            )}
          </div>

          <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
            {notifications.length === 0 ? (
              <div className="p-6 text-center text-slate-400 text-sm">
                No notifications right now.
              </div>
            ) : (
              notifications.map((notif) => (
                <div
                  key={notif.id}
                  onClick={() => markNotificationRead(notif.id)}
                  className={`p-3.5 hover:bg-slate-50 transition-colors flex items-start gap-3 ${
                    notif.unread ? 'bg-amber-50/40 border-l-4 border-l-amber-500' : ''
                  }`}
                >
                  <div className="mt-0.5 shrink-0">
                    {notif.type === 'status' && <ShieldCheck className="w-5 h-5 text-emerald-600" />}
                    {notif.type === 'collaboration' && <Sparkles className="w-5 h-5 text-indigo-600" />}
                    {notif.type === 'industry' && <Building2 className="w-5 h-5 text-amber-600" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <h4 className="font-bold text-xs text-slate-900">{notif.title}</h4>
                      <span className="text-[10px] text-slate-400">{notif.time}</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1 leading-snug">{notif.message}</p>
                    {notif.link && (
                      <Link
                        to={notif.link}
                        onClick={() => setIsOpen(false)}
                        className="mt-2 text-[11px] font-bold text-[#005A36] hover:underline inline-flex items-center gap-1"
                      >
                        <span>View Details</span>
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="p-2 bg-slate-50 border-t text-center">
            <Link
              to="/notifications"
              onClick={() => setIsOpen(false)}
              className="text-xs font-bold text-[#005A36] hover:underline"
            >
              See all notifications →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
