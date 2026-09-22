import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ShieldCheck, Search, Filter, MapPin, Users, Calendar, Building2, ArrowRight, RefreshCw, Award } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { JHARKHAND_DISTRICTS, PROBLEM_CATEGORIES } from '../data/mockData';

export const ResolvedProblems = () => {
  const { problems } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Filter resolved problems
  const resolvedList = problems.filter(p => {
    const isResolved = p.status === 'Resolved';
    const matchesSearch = 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDistrict = selectedDistrict === 'All' || p.district === selectedDistrict;
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;

    return isResolved && matchesSearch && matchesDistrict && matchesCategory;
  });

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedDistrict('All');
    setSelectedCategory('All');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Transparency Banner */}
      <div className="bg-gradient-to-r from-[#005A36] via-emerald-800 to-slate-900 text-white p-8 sm:p-10 rounded-3xl shadow-xl border-b-4 border-amber-400 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider">
          <CheckCircle2 className="w-4 h-4 text-slate-950" />
          <span>Public Transparency & Accountability Archive</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-white">
          Resolved Societal Problems Archive
        </h1>
        <p className="text-emerald-100 text-sm max-w-2xl leading-relaxed">
          Explore public societal challenges that have been successfully solved by Government Departments, Universities, and Industry Partners across Jharkhand.
        </p>
      </div>

      {/* Filter & Search Controls */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-4">
        
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-4" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search resolved problems by title, district, or department..."
            className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold focus:ring-2 focus:ring-[#005A36] focus:bg-white focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Filter by District</label>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg font-semibold"
            >
              <option value="All">All 24 Districts</option>
              {JHARKHAND_DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Filter by Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg font-semibold"
            >
              <option value="All">All Categories</option>
              {PROBLEM_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={resetFilters}
              className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg flex items-center justify-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Reset Filters
            </button>
          </div>
        </div>

      </div>

      {/* Cards Grid */}
      <div className="space-y-6">
        {resolvedList.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 space-y-3">
            <CheckCircle2 className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-800">No Resolved Problems Match Your Search</h3>
            <p className="text-xs text-slate-500">Try adjusting your keyword query or reset district filters.</p>
            <button onClick={resetFilters} className="px-4 py-2 bg-[#005A36] text-white font-bold text-xs rounded-lg">
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {resolvedList.map(item => (
              <div key={item.id} className="bg-white rounded-2xl border-2 border-emerald-300/80 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col justify-between">
                
                <div className="p-6 space-y-4">
                  
                  <div className="flex items-center justify-between border-b pb-3 text-xs">
                    <span className="bg-emerald-100 text-[#005A36] font-extrabold px-3 py-1 rounded-full border border-emerald-300 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4 text-[#005A36]" />
                      ✓ Resolved
                    </span>

                    <span className="font-mono text-slate-400 font-semibold">
                      ID: {item.id}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-slate-900 leading-snug">{item.title}</h3>
                    <p className="text-slate-600 text-xs mt-1 line-clamp-2">{item.description}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-xl border text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold block uppercase">District & Village</span>
                      <span className="font-bold text-slate-800 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-[#B84A17]" />
                        {item.village || 'Village'}, {item.district}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-400 font-bold block uppercase">People Affected</span>
                      <span className="font-bold text-slate-800 flex items-center gap-1 mt-0.5">
                        <Users className="w-3.5 h-3.5 text-amber-600" />
                        {item.affectedPeople.toLocaleString()} Citizens
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-400 font-bold block uppercase">Submitted Date</span>
                      <span className="font-semibold text-slate-700 block mt-0.5">{item.dateReported}</span>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-400 font-bold block uppercase">Resolved Date</span>
                      <span className="font-extrabold text-[#005A36] block mt-0.5">
                        {item.resolutionDate || '2026-08-25'}
                      </span>
                    </div>
                  </div>

                  <div className="p-3 bg-emerald-50/80 rounded-xl border border-emerald-200 text-xs space-y-1">
                    <span className="text-[10px] text-emerald-900 font-extrabold uppercase block">
                      Resolved By / Responsible Department:
                    </span>
                    <span className="font-bold text-[#005A36] block">
                      {item.assignedDepartment || item.assignedTeam || "DWSD & BIT Mesra"}
                    </span>
                    {item.solutionProposed && (
                      <p className="text-[#003D24] text-[11px] pt-1 leading-relaxed border-t border-emerald-200/60 mt-1">
                        <strong>Resolution Summary:</strong> "{item.solutionProposed}"
                      </p>
                    )}
                  </div>

                </div>

                <div className="p-4 bg-slate-50 border-t flex justify-end">
                  <Link
                    to={`/problem/${item.id}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#005A36] hover:bg-[#003D24] text-white font-extrabold text-xs rounded-lg transition-colors"
                  >
                    <span>View Resolution Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
