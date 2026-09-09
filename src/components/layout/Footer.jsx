import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Heart, MapPin, Phone, Mail, Globe, ExternalLink } from 'lucide-react';

export const Footer = () => {
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
                <span className="font-extrabold text-xl text-white tracking-tight">Jharkhand </span>
                <span className="font-extrabold text-xl text-amber-400">Samadhan</span>
              </div>
            </Link>
            
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              A citizen-centric digital platform created for the Government of Jharkhand under Smart India Hackathon 2026 (Problem Statement SIH26043). Empowering citizens to report societal challenges and driving collaborative solutions with universities and industry partners.
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
                <Link to="/" className="hover:text-amber-400 transition-colors">Home Page</Link>
              </li>
              <li>
                <Link to="/report-problem" className="text-amber-400 font-bold hover:underline">Report a Problem</Link>
              </li>
              <li>
                <Link to="/explore" className="hover:text-amber-400 transition-colors">Explore Problems</Link>
              </li>
              <li>
                <Link to="/my-reports" className="hover:text-amber-400 transition-colors">Track My Report</Link>
              </li>
              <li>
                <Link to="/notifications" className="hover:text-amber-400 transition-colors">Notifications</Link>
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
                <Link to="/student" className="hover:text-amber-400 transition-colors">Students & Innovation</Link>
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
                <Link to="/help" className="hover:text-amber-400 transition-colors">Help & Citizen Guide</Link>
              </li>
              <li>
                <Link to="/help#faq" className="hover:text-amber-400 transition-colors">Frequently Asked Questions</Link>
              </li>
              <li className="flex items-center gap-2 text-slate-400">
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>Toll Free: 1800-JH-SOLVE</span>
              </li>
              <li className="flex items-center gap-2 text-slate-400">
                <Mail className="w-4 h-4 text-amber-400" />
                <span>skaginis@gmail.com</span>
                <span>narsimhacharya09@gmail.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Legal Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div className="flex items-center gap-1">
            <span>© 2026 Government of Jharkhand. Built with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 inline mx-0.5" />
            <span>for SIH 2026.</span>
          </div>

          <div className="flex items-center gap-6">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-400 cursor-pointer">Accessibility Statement</span>
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
