import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Heart, MapPin, Phone, Mail, ExternalLink } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { TRANSLATIONS } from '../../utils/translations';

export const Footer = () => {
  const { currentLanguage } = useApp();
  const t = TRANSLATIONS[currentLanguage || 'en'] || TRANSLATIONS.en;

  return (
    <footer className="bg-slate-900 text-slate-300 border-t-4 border-[#005A36] pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-slate-800">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#005A36] flex items-center justify-center text-white border-2 border-amber-400">
                <Shield className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <span className="font-black text-xl text-white tracking-tight">SAMASYA </span>
                <span className="font-black text-xl text-amber-400">NIVARK</span>
              </div>
            </Link>
            
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              "{t.tagline || "From Community Problems to Real-World Solutions."}" — A Jharkhand civic problem reporting and collaborative problem-solving platform developed for SIH 2026.
            </p>

            <div className="flex items-center gap-3 text-xs text-amber-300 font-semibold bg-slate-800/80 p-3 rounded-lg border border-slate-700 w-fit">
              <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Department of Information Technology, Govt. of Jharkhand</span>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-4 border-l-2 border-[#005A36] pl-2">
              Platform
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-amber-400 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/report-problem" className="text-amber-400 font-bold hover:underline">Report a Problem</Link>
              </li>
              <li>
                <Link to="/my-reports" className="hover:text-amber-400 transition-colors">My Complaints</Link>
              </li>
              <li>
                <Link to="/tracked-problems" className="hover:text-amber-400 transition-colors">Tracked Problems</Link>
              </li>
              <li>
                <Link to="/resolved" className="hover:text-amber-400 transition-colors">Resolved Problems</Link>
              </li>
            </ul>
          </div>

          {/* Stakeholder Portals */}
          <div>
            <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-4 border-l-2 border-amber-500 pl-2">
              Collaborate
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/student" className="hover:text-amber-400 transition-colors">Student Innovation</Link>
              </li>
              <li>
                <Link to="/collaborate" className="hover:text-amber-400 transition-colors">University Network</Link>
              </li>
              <li>
                <Link to="/industry" className="hover:text-amber-400 transition-colors">Industry CSR & Mentors</Link>
              </li>
              <li>
                <Link to="/government" className="hover:text-amber-400 transition-colors">Government Portal</Link>
              </li>
            </ul>
          </div>

          {/* Support & Contact */}
          <div>
            <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-4 border-l-2 border-[#B84A17] pl-2">
              Support
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/help" className="hover:text-amber-400 transition-colors">Help & Guide</Link>
              </li>
              <li>
                <Link to="/help#faq" className="hover:text-amber-400 transition-colors">FAQs</Link>
              </li>
              <li className="flex items-center gap-2 text-slate-400">
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>Toll Free: 181</span>
              </li>
              <li className="flex items-center gap-2 text-slate-400">
                <Mail className="w-4 h-4 text-amber-400" />
                <span>narsimhacharya09@gmail.com</span>
                <span>skaginis@gmail.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Legal Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div className="flex items-center gap-1">
            <span>© 2026 Samasya Nivark. Built with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 inline mx-0.5" />
            <span>for Government of Jharkhand & SIH 2026.</span>
          </div>

          <div className="flex items-center gap-6">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
            <a href="https://jharkhand.gov.in" target="_blank" rel="noreferrer" className="flex items-center gap-1 text-amber-400 hover:underline font-medium">
              <span>Jharkhand Portal</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
