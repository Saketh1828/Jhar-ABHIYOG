import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  PlusCircle, 
  Menu, 
  X, 
  User, 
  Shield, 
  GraduationCap, 
  Building2, 
  HelpCircle, 
  Compass, 
  FileText, 
  Home, 
  ChevronDown,
  LogOut,
  Users,
  Eye,
  CheckCircle2,
  Globe,
  Mail,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { NotificationDropdown } from '../common/NotificationDropdown';
import { DemoEmailModal } from '../common/DemoEmailModal';
import { LANGUAGES, TRANSLATIONS } from '../../utils/translations';

export const Navbar = () => {
  const { currentUser, logoutUser, switchRole, currentLanguage, setLanguage, setIsDemoEmailModalOpen, sentEmails } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const t = TRANSLATIONS[currentLanguage || 'en'] || TRANSLATIONS.en;

  const navLinks = [
    { label: t.home || "Home", path: "/", icon: Home },
    { label: t.exploreProblems || "Explore Problems", path: "/explore", icon: Compass },
    { label: t.myComplaints || "My Complaints", path: "/my-reports", icon: FileText },
    { label: t.trackedProblems || "Tracked Problems", path: "/tracked-problems", icon: Eye },
    { label: t.resolvedProblems || "Resolved Problems", path: "/resolved", icon: CheckCircle2 },
    { label: "Collaborate", path: "/collaborate", icon: Users },
    { label: t.help || "Help", path: "/help", icon: HelpCircle },
  ];

  const roleOptions = [
    { id: 'citizen', label: 'Citizen View', path: '/', icon: User },
    { id: 'government', label: 'Government Portal', path: '/government', icon: Shield },
    { id: 'student', label: 'Student / University', path: '/student', icon: GraduationCap },
    { id: 'industry', label: 'Industry Partner', path: '/industry', icon: Building2 },
    { id: 'SUPER_ADMIN', label: 'Super Admin (Level 1)', path: '/admin', icon: ShieldCheck },
    { id: 'UNIVERSITY_ADMIN', label: 'Univ Admin (Level 2)', path: '/university-admin', icon: GraduationCap },
    { id: 'INDUSTRY_ADMIN', label: 'Industry Admin (Level 3)', path: '/industry-admin', icon: Building2 },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
      {/* Top Govt & Language Bar */}
      <div className="bg-[#7F1D1D] text-amber-200 text-xs px-4 py-1.5 font-medium border-b border-[#5B1515]">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="bg-amber-500/20 px-2 py-0.5 rounded text-[11px] font-bold text-amber-300 border border-amber-400/30">
              SIH 2026 • SAMASYA NIVARK
            </span>
            <span className="hidden md:inline text-white/90">
              Government of Jharkhand • Crowdsourcing Engine
            </span>
            <span className="hidden lg:inline-flex items-center gap-1 bg-emerald-950/80 text-emerald-300 font-mono text-[10px] px-2 py-0.5 rounded border border-emerald-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              MongoDB: samasya_nivark
            </span>
          </div>

          <div className="flex items-center gap-3 text-[11px]">
            
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1 text-amber-300 hover:text-white font-bold px-2 py-0.5 rounded bg-white/10"
              >
                <Globe className="w-3.5 h-3.5 text-amber-400" />
                <span>{LANGUAGES.find(l => l.code === (currentLanguage || 'en'))?.name || 'English'}</span>
                <ChevronDown className="w-3 h-3" />
              </button>

              {langDropdownOpen && (
                <div 
                  className="absolute right-0 mt-1 w-44 bg-white rounded-xl shadow-2xl border border-slate-200 py-1 text-slate-800 z-50 max-h-60 overflow-y-auto"
                  onMouseLeave={() => setLangDropdownOpen(false)}
                >
                  <div className="px-3 py-1 bg-slate-100 text-[10px] font-bold text-slate-500 uppercase">
                    Select UI Language
                  </div>
                  {LANGUAGES.map(lang => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs font-semibold flex items-center justify-between hover:bg-emerald-50 ${
                        (currentLanguage || 'en') === lang.code ? 'text-[#005A36] font-bold bg-emerald-50' : 'text-slate-700'
                      }`}
                    >
                      <span>{lang.name}</span>
                      <span className="text-[10px] text-slate-400">{lang.native}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Demo Email Viewer Button */}
            <button
              onClick={() => setIsDemoEmailModalOpen(true)}
              className="hidden sm:flex items-center gap-1 px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-400/30 hover:bg-amber-500/30 transition-colors font-mono text-[10px]"
              title="Inspect backend simulated email dispatches"
            >
              <Mail className="w-3 h-3 text-amber-400" />
              <span>Emails ({sentEmails?.length || 0})</span>
            </button>

            {currentUser.isLoggedIn ? (
              <span className="hidden sm:inline text-white/80">
                Logged in: <strong className="text-amber-300 capitalize">{currentUser.name}</strong>
              </span>
            ) : (
              <Link to="/login" className="hover:underline text-white font-bold">{t.login || "Login"}</Link>
            )}
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Branding: SAMASYA NIVARK */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#005A36] to-[#003D24] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform border-2 border-amber-400">
              <Shield className="w-7 h-7 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-2xl text-[#005A36] tracking-tight">SAMASYA</span>
                <span className="font-black text-2xl text-[#B84A17]">NIVARK</span>
              </div>
              <p className="text-[11px] text-slate-500 font-bold tracking-tight">
                {t.tagline || "From Community Problems to Real-World Solutions."}
              </p>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-colors ${
                    active
                      ? 'bg-emerald-50 text-[#005A36] font-extrabold border border-emerald-200 shadow-sm'
                      : 'text-slate-700 hover:text-[#005A36] hover:bg-slate-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Action Cluster */}
          <div className="hidden sm:flex items-center gap-3">
            
            {/* Highly Prominent CTA Button */}
            <Link
              to="/report-problem"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-extrabold text-sm text-white bg-gradient-to-r from-[#B84A17] to-amber-600 hover:from-amber-700 hover:to-[#B84A17] shadow-lg shadow-amber-900/20 hover:shadow-xl transition-all duration-200 ring-2 ring-amber-500/30 animate-pulse"
            >
              <PlusCircle className="w-5 h-5 text-white" />
              <span>{t.reportProblem || "REPORT A PROBLEM"}</span>
            </Link>

            {/* Notification Bell */}
            <NotificationDropdown />

            {/* Role Switcher & Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className="flex items-center gap-2 p-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-[#005A36] text-white flex items-center justify-center font-bold text-xs">
                  {currentUser.name ? currentUser.name.charAt(0) : 'U'}
                </div>
                <div className="text-left hidden lg:block">
                  <span className="block text-xs font-bold text-slate-800 line-clamp-1">{currentUser.name || "User"}</span>
                  <span className="block text-[10px] text-amber-700 font-semibold uppercase">{currentUser.role}</span>
                </div>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </button>

              {roleDropdownOpen && (
                <div 
                  className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50"
                  onMouseLeave={() => setRoleDropdownOpen(false)}
                >
                  <div className="px-4 py-2 border-b border-slate-100">
                    <p className="text-xs text-slate-500">Switch View / Role</p>
                  </div>
                  {roleOptions.map(opt => {
                    const Icon = opt.icon;
                    return (
                      <button
                        key={opt.id}
                        onClick={() => {
                          switchRole(opt.id);
                          setRoleDropdownOpen(false);
                          navigate(opt.path);
                        }}
                        className={`w-full text-left px-4 py-2 text-xs font-semibold flex items-center gap-2.5 hover:bg-slate-50 ${
                          currentUser.role === opt.id ? 'text-[#005A36] font-bold bg-emerald-50/50' : 'text-slate-700'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{opt.label}</span>
                      </button>
                    );
                  })}
                  <div className="border-t border-slate-100 mt-1 pt-1">
                    <Link
                      to="/profile"
                      onClick={() => setRoleDropdownOpen(false)}
                      className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                    >
                      <User className="w-4 h-4" />
                      <span>{t.profile || "My Profile"}</span>
                    </Link>
                    {currentUser.isLoggedIn ? (
                      <button
                        onClick={() => {
                          logoutUser();
                          setRoleDropdownOpen(false);
                          navigate('/login');
                        }}
                        className="w-full text-left px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 flex items-center gap-2"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    ) : (
                      <Link
                        to="/login"
                        onClick={() => setRoleDropdownOpen(false)}
                        className="w-full text-left px-4 py-2 text-xs font-semibold text-[#005A36] hover:bg-emerald-50 flex items-center gap-2"
                      >
                        <User className="w-4 h-4" />
                        <span>Sign In</span>
                      </Link>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex xl:hidden items-center gap-2">
            <NotificationDropdown />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-[#005A36] rounded-lg hover:bg-slate-100 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 animate-fadeIn">
          <Link
            to="/report-problem"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-center gap-2 w-full py-3.5 px-4 rounded-xl font-extrabold text-sm text-white bg-gradient-to-r from-[#B84A17] to-amber-600 shadow-md text-center"
          >
            <PlusCircle className="w-5 h-5 text-white" />
            <span>{t.reportProblem || "REPORT A PROBLEM"}</span>
          </Link>

          <div className="space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold ${
                    isActive(link.path) ? 'bg-emerald-50 text-[#005A36] font-bold' : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
