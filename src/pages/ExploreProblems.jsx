import React, { useState } from 'react';
import { Search, Filter, Compass, SlidersHorizontal, RefreshCw } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ChallengeCard } from '../components/common/ChallengeCard';
import { JHARKHAND_DISTRICTS, PROBLEM_CATEGORIES } from '../data/mockData';

export const ExploreProblems = () => {
  const { problems } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDistrict, setSelectedDistrict] = useState('All');
  const [selectedPriority, setSelectedPriority] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  const filteredProblems = problems.filter((problem) => {
    const matchesSearch = 
      problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      problem.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      problem.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      problem.district.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'All' || problem.category === selectedCategory;
    const matchesDistrict = selectedDistrict === 'All' || problem.district === selectedDistrict;
    const matchesPriority = selectedPriority === 'All' || problem.priority === selectedPriority;
    const matchesStatus = selectedStatus === 'All' || problem.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesDistrict && matchesPriority && matchesStatus;
  });

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedDistrict('All');
    setSelectedPriority('All');
    setSelectedStatus('All');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-[#005A36] text-white p-8 rounded-3xl shadow-xl border-b-4 border-amber-400">
        <div className="flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-wider mb-2">
          <Compass className="w-4 h-4" />
          <span>Challenge Discovery Portal</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold">Explore Societal Challenges</h1>
        <p className="text-slate-300 text-sm mt-1 max-w-2xl">
          Discover problems reported across all 24 Jharkhand districts. Filter by category, priority, or region to propose solutions or offer industry support.
        </p>
      </div>

      {/* Search & Filters Controls */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-4">
        
        {/* Main Search Bar */}
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-4" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search societal problems by keyword, district, or ID (e.g. water, Dumka, road)..."
            className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold focus:ring-2 focus:ring-[#005A36] focus:bg-white focus:outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-3.5 text-xs text-slate-400 hover:text-slate-600 font-bold"
            >
              Clear
            </button>
          )}
        </div>

        {/* Filter Dropdowns Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
          
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold focus:outline-none"
            >
              <option value="All">All Categories ({PROBLEM_CATEGORIES.length})</option>
              {PROBLEM_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">District</label>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold focus:outline-none"
            >
              <option value="All">All Districts ({JHARKHAND_DISTRICTS.length})</option>
              {JHARKHAND_DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Priority</label>
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold focus:outline-none"
            >
              <option value="All">All Priorities</option>
              <option value="CRITICAL">Critical Priority</option>
              <option value="HIGH">High Priority</option>
              <option value="MEDIUM">Medium Priority</option>
              <option value="LOW">Low Priority</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Status</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold focus:outline-none"
            >
              <option value="All">All Lifecycle Statuses</option>
              <option value="Submitted">Submitted</option>
              <option value="Under Verification">Under Verification</option>
              <option value="Verified">Verified</option>
              <option value="Assigned">Assigned</option>
              <option value="Solution Proposed">Solution Proposed</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>

        </div>

        {/* Results Bar */}
        <div className="flex items-center justify-between pt-2 border-t text-xs text-slate-500">
          <span>
            Showing <strong>{filteredProblems.length}</strong> of <strong>{problems.length}</strong> societal challenges
          </span>
          <button
            onClick={resetFilters}
            className="flex items-center gap-1 font-bold text-[#005A36] hover:underline"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Reset Filters
          </button>
        </div>

      </div>

      {/* Cards Grid */}
      {filteredProblems.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 space-y-3">
          <Search className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">No Challenges Match Your Filter</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try adjusting your search query or reset district and category filters.
          </p>
          <button
            onClick={resetFilters}
            className="px-4 py-2 bg-[#005A36] text-white font-bold text-xs rounded-lg"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProblems.map(problem => (
            <ChallengeCard key={problem.id} problem={problem} />
          ))}
        </div>
      )}

    </div>
  );
};
