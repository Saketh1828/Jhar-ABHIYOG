import React from 'react';
import { Link } from 'react-router-dom';
import { Users, GraduationCap, Building2, ShieldCheck, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';

export const Collaborate = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#005A36] via-[#003D24] to-slate-900 text-white p-8 sm:p-12 rounded-3xl shadow-xl border-b-4 border-amber-400 text-center space-y-4">
        <span className="bg-amber-500/20 px-3.5 py-1 rounded-full text-amber-300 font-extrabold text-xs uppercase tracking-wider border border-amber-400/40 inline-block">
          Triple-Helix Partnership Model
        </span>
        <h1 className="text-3xl sm:text-5xl font-black">
          Collaborative Problem Solving Engine
        </h1>
        <p className="text-emerald-100 text-sm sm:text-base max-w-3xl mx-auto leading-relaxed">
          Bridging the gap between citizen challenges in Jharkhand villages and academic research labs, corporate CSR funds, and government execution machinery.
        </p>
      </div>

      {/* 3 Stakeholder Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* University / Student */}
        <div className="bg-white rounded-3xl p-8 border-2 border-indigo-100 shadow-md hover:shadow-xl transition-all space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-lg">
              <GraduationCap className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black text-slate-900">University & Student Teams</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Students and academic faculties transform real societal problems into capstone innovation projects, hackathon solutions, and scientific research papers.
            </p>
            <ul className="space-y-2 text-xs text-slate-700 font-medium">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" /> Ground problem research & fieldwork
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" /> Rapid engineering prototyping
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" /> Academic credit & hackathon awards
              </li>
            </ul>
          </div>
          <Link
            to="/student"
            className="w-full py-3.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs rounded-xl shadow text-center inline-flex items-center justify-center gap-2"
          >
            <span>EXPLORE STUDENT PORTAL</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Industry */}
        <div className="bg-white rounded-3xl p-8 border-2 border-amber-100 shadow-md hover:shadow-xl transition-all space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-600 text-white flex items-center justify-center shadow-lg">
              <Building2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black text-slate-900">Industry & CSR Partners</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Corporates and industrial enterprises provide technical guidance, specialized hardware, equipment grants, and CSR sponsorships to scale student solutions.
            </p>
            <ul className="space-y-2 text-xs text-slate-700 font-medium">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" /> Technical expert mentorship
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" /> CSR funding & hardware grants
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" /> High-impact societal outreach
              </li>
            </ul>
          </div>
          <Link
            to="/industry"
            className="w-full py-3.5 px-4 bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-xs rounded-xl shadow text-center inline-flex items-center justify-center gap-2"
          >
            <span>EXPLORE INDUSTRY PORTAL</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Government */}
        <div className="bg-white rounded-3xl p-8 border-2 border-emerald-100 shadow-md hover:shadow-xl transition-all space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-[#005A36] text-white flex items-center justify-center shadow-lg border-2 border-amber-400">
              <ShieldCheck className="w-8 h-8 text-amber-400" />
            </div>
            <h3 className="text-2xl font-black text-slate-900">Government Administration</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              District officers, PWD engineers, and health departments verify problem reports, grant regulatory permissions, and adopt proven solutions permanently.
            </p>
            <ul className="space-y-2 text-xs text-slate-700 font-medium">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#005A36] shrink-0" /> Official report verification & SLA
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#005A36] shrink-0" /> Infrastructure & regulatory approval
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#005A36] shrink-0" /> Permanent ground implementation
              </li>
            </ul>
          </div>
          <Link
            to="/government"
            className="w-full py-3.5 px-4 bg-[#005A36] hover:bg-[#003D24] text-white font-extrabold text-xs rounded-xl shadow text-center inline-flex items-center justify-center gap-2"
          >
            <span>EXPLORE ADMIN PORTAL</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>

    </div>
  );
};
