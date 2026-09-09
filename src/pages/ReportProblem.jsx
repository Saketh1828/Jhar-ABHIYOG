import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  PlusCircle, 
  MapPin, 
  Users, 
  AlertTriangle, 
  FileText, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  Sparkles,
  Info,
  ArrowRight,
  Bot,
  RefreshCw,
  Edit3
} from 'lucide-react';
import { useApp, calculatePriority } from '../context/AppContext';
import { JHARKHAND_DISTRICTS, PROBLEM_CATEGORIES } from '../data/mockData';
import { ImageUploader } from '../components/common/ImageUploader';
import { classifyProblemDescription } from '../utils/aiClassifier';

export const ReportProblem = () => {
  const { addProblem, currentUser } = useApp();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    category: 'Water & Sanitation',
    aiSuggestedCategory: 'Water & Sanitation',
    aiConfidence: 0,
    isAiCategoryOverridden: false,
    description: '',
    affectedPeople: '250',
    village: currentUser.village || '',
    district: currentUser.district || 'Dumka',
    state: 'Jharkhand',
    severity: 'HIGH',
    photos: []
  });

  const [isAiAnalyzing, setIsAiAnalyzing] = useState(false);
  const [hasAnalyzedOnce, setHasAnalyzedOnce] = useState(false);

  // Trigger AI Agent classification when description or title changes
  useEffect(() => {
    const textToAnalyze = (formData.title + ' ' + formData.description).trim();
    if (!textToAnalyze || textToAnalyze.length < 5) {
      return;
    }

    setIsAiAnalyzing(true);

    const timer = setTimeout(() => {
      const result = classifyProblemDescription(formData.description, formData.title);
      
      setFormData(prev => ({
        ...prev,
        aiSuggestedCategory: result.category,
        aiConfidence: result.confidence,
        // Only set category automatically if citizen hasn't manually changed it
        category: prev.isAiCategoryOverridden ? prev.category : result.category
      }));

      setIsAiAnalyzing(false);
      setHasAnalyzedOnce(true);
    }, 650); // Realistic AI analyzing delay simulation

    return () => clearTimeout(timer);
  }, [formData.title, formData.description]);

  // Dynamic priority calculation for live preview
  const livePriority = calculatePriority(
    formData.affectedPeople,
    formData.severity,
    formData.category
  );

  const handleCategoryChange = (e) => {
    const selected = e.target.value;
    setFormData(prev => ({
      ...prev,
      category: selected,
      isAiCategoryOverridden: selected !== prev.aiSuggestedCategory
    }));
  };

  const handleReanalyzeAI = () => {
    setIsAiAnalyzing(true);
    setTimeout(() => {
      const result = classifyProblemDescription(formData.description, formData.title);
      setFormData(prev => ({
        ...prev,
        category: result.category,
        aiSuggestedCategory: result.category,
        aiConfidence: result.confidence,
        isAiCategoryOverridden: false
      }));
      setIsAiAnalyzing(false);
    }, 600);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.description.trim()) {
      alert("Please fill in the problem title and description.");
      return;
    }

    const createdProblem = addProblem(formData);
    navigate('/confirmation');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-[#005A36] to-[#003D24] text-white p-6 sm:p-8 rounded-2xl shadow-lg border-2 border-amber-400">
        <div className="flex flex-wrap items-center gap-3 mb-2">
          <span className="bg-amber-500 text-slate-950 font-black text-xs px-2.5 py-1 rounded-full uppercase tracking-wide">
            Step-by-Step Reporting Form
          </span>
          <span className="bg-emerald-800/80 text-emerald-200 text-xs font-bold px-2.5 py-1 rounded-full border border-emerald-400/30 flex items-center gap-1">
            <Bot className="w-3.5 h-3.5 text-amber-300" /> AI Categorization Enabled
          </span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
          Report a Societal Problem
        </h1>
        <p className="text-emerald-100 text-sm mt-1 max-w-2xl">
          Help us understand real problems in your community so government officials, university teams, and industry partners can collaborate to solve them.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Form Column */}
        <div className="lg:col-span-8">
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 sm:p-8 shadow-md border border-slate-200 space-y-6">
            
            {/* Step 1: Problem Title */}
            <div>
              <label className="block text-sm font-bold text-slate-900 mb-1">
                Problem Title <span className="text-red-500">*</span>
              </label>
              <p className="text-xs text-slate-500 mb-2">State the main problem clearly in a few words.</p>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Drinking water shortage & broken borewell in Jama village"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold focus:ring-2 focus:ring-[#005A36] focus:bg-white focus:outline-none"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-bold text-slate-900 mb-1">
                Detailed Description <span className="text-red-500">*</span>
              </label>
              <p className="text-xs text-slate-500 mb-2">Explain what is happening in simple language. Our AI Agent will analyze your text to suggest the best problem category.</p>
              <textarea
                rows={4}
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Explain the problem in detail (e.g., broken borewell, unpaved muddy road, clinic power cuts, school roof leak)..."
                className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-[#005A36] focus:bg-white focus:outline-none"
              />
            </div>

            {/* AI Categorization Agent Box */}
            <div className="p-4 bg-gradient-to-br from-emerald-50/80 via-white to-amber-50/50 rounded-2xl border-2 border-emerald-500/60 shadow-sm space-y-3">
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#005A36] text-amber-400 flex items-center justify-center shadow-sm">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                      AI Categorization Agent
                    </h3>
                    <p className="text-[11px] text-slate-500">Autonomous intent & category analysis</p>
                  </div>
                </div>

                {isAiAnalyzing ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-900 text-xs font-extrabold rounded-full border border-amber-300 animate-pulse">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-700" />
                    <span>AI Agent Analyzing...</span>
                  </span>
                ) : hasAnalyzedOnce ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-100 text-[#005A36] text-xs font-extrabold rounded-full border border-emerald-300">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span>Analysis Complete</span>
                  </span>
                ) : null}
              </div>

              {/* AI Agent Status Display */}
              {isAiAnalyzing ? (
                <div className="p-3 bg-white/80 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full border-2 border-amber-600 border-t-transparent animate-spin shrink-0" />
                  <span>Analyzing key terms & public impact intent...</span>
                </div>
              ) : hasAnalyzedOnce ? (
                <div className="space-y-2 pt-1">
                  
                  <div className="p-3 bg-white rounded-xl border border-emerald-200 shadow-sm flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">AI Suggested Category</span>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-sm font-extrabold text-[#005A36]">
                          {formData.aiSuggestedCategory}
                        </span>
                        <span className="bg-emerald-600 text-white font-extrabold text-[10px] px-2 py-0.5 rounded-md">
                          {formData.aiConfidence}% Confidence
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleReanalyzeAI}
                      className="text-[11px] font-bold text-[#005A36] hover:underline flex items-center gap-1"
                    >
                      <RefreshCw className="w-3 h-3" /> Re-analyze
                    </button>
                  </div>

                  {formData.isAiCategoryOverridden && (
                    <p className="text-[11px] text-amber-800 font-bold bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-200 flex items-center gap-1">
                      <Edit3 className="w-3.5 h-3.5 text-amber-600" />
                      Note: You have manually selected '{formData.category}'. The system will use your chosen category.
                    </p>
                  )}

                </div>
              ) : (
                <p className="text-xs text-slate-500 italic">
                  Type a title and problem description above to see AI suggested category and confidence score.
                </p>
              )}

              {/* Category Select Dropdown */}
              <div className="pt-2">
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Selected Category (Confirm or Change) <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.category}
                  onChange={handleCategoryChange}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs font-extrabold text-slate-900 focus:ring-2 focus:ring-[#005A36] focus:outline-none shadow-sm"
                >
                  {PROBLEM_CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>
                      {cat} {cat === formData.aiSuggestedCategory ? '★ (AI Suggested)' : ''}
                    </option>
                  ))}
                </select>
              </div>

            </div>

            {/* Affected People */}
            <div>
              <label className="block text-sm font-bold text-slate-900 mb-1">
                Approximately How Many People Are Affected? <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Users className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="number"
                  min="1"
                  required
                  value={formData.affectedPeople}
                  onChange={(e) => setFormData({ ...formData, affectedPeople: e.target.value })}
                  placeholder="e.g. 350"
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold focus:ring-2 focus:ring-[#005A36] focus:outline-none"
                />
              </div>
            </div>

            {/* Location Section */}
            <div className="p-4 bg-[#FAF8F5] rounded-xl border border-slate-200 space-y-4">
              <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#B84A17]" />
                <span>Problem Location Details</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Village / Town</label>
                  <input
                    type="text"
                    required
                    value={formData.village}
                    onChange={(e) => setFormData({ ...formData, village: e.target.value })}
                    placeholder="e.g. Jama"
                    className="w-full px-3 py-2.5 bg-white border border-slate-300 rounded-lg text-xs font-semibold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">District</label>
                  <select
                    value={formData.district}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                    className="w-full px-3 py-2.5 bg-white border border-slate-300 rounded-lg text-xs font-semibold focus:outline-none"
                  >
                    {JHARKHAND_DISTRICTS.map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">State</label>
                  <input
                    type="text"
                    disabled
                    value={formData.state}
                    className="w-full px-3 py-2.5 bg-slate-100 border border-slate-300 rounded-lg text-xs font-bold text-slate-600"
                  />
                </div>
              </div>

              {/* Map Preview Mock */}
              <div className="bg-slate-200 rounded-xl h-32 flex items-center justify-center relative overflow-hidden border border-slate-300">
                <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#005a36_1px,transparent_1px)] [background-size:12px_12px]" />
                <div className="relative text-center p-2 bg-white/90 backdrop-blur-md rounded-lg shadow border border-slate-300">
                  <MapPin className="w-6 h-6 text-[#B84A17] mx-auto animate-bounce" />
                  <span className="text-xs font-bold text-slate-900 block">
                    Location Pinned: {formData.village || 'Village'}, {formData.district}, Jharkhand
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">GPS Coordinates Verified</span>
                </div>
              </div>
            </div>

            {/* Photo Uploader */}
            <ImageUploader
              photos={formData.photos}
              onPhotosChange={(photos) => setFormData({ ...formData, photos })}
              maxPhotos={4}
            />

            {/* Difficulty / Severity Selection */}
            <div className="space-y-3">
              <label className="block text-sm font-bold text-slate-900">
                Problem Seriousness / Severity Level <span className="text-red-500">*</span>
              </label>
              <p className="text-xs text-slate-500">Select how serious this issue is for the community.</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  {
                    id: "LOW",
                    title: "LOW SEVERITY",
                    desc: "Minor inconvenience • Can be addressed later",
                    bg: "bg-emerald-50 border-emerald-300 text-emerald-900"
                  },
                  {
                    id: "MEDIUM",
                    title: "MEDIUM SEVERITY",
                    desc: "Significant problem • Requires attention",
                    bg: "bg-amber-50 border-amber-300 text-amber-900"
                  },
                  {
                    id: "HIGH",
                    title: "HIGH SEVERITY",
                    desc: "Serious problem • Many affected • Urgent attention",
                    bg: "bg-orange-50 border-orange-400 text-orange-950 font-bold"
                  },
                  {
                    id: "CRITICAL",
                    title: "CRITICAL SEVERITY",
                    desc: "Immediate danger or severe impact • Urgent govt response",
                    bg: "bg-red-50 border-red-500 text-red-950 font-extrabold"
                  }
                ].map((sev) => (
                  <button
                    key={sev.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, severity: sev.id })}
                    className={`p-3.5 text-left rounded-xl border-2 transition-all flex flex-col justify-between ${
                      formData.severity === sev.id 
                        ? `${sev.bg} ring-2 ring-[#005A36] shadow-sm` 
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black uppercase tracking-wider">{sev.title}</span>
                      {formData.severity === sev.id && (
                        <CheckCircle2 className="w-4 h-4 text-[#005A36]" />
                      )}
                    </div>
                    <span className="text-[11px] mt-1 opacity-90 block">{sev.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4 border-t border-slate-200">
              <button
                type="submit"
                className="w-full py-4 px-6 rounded-xl font-black text-base text-white bg-gradient-to-r from-[#B84A17] to-amber-600 hover:from-amber-700 hover:to-[#B84A17] shadow-xl hover:shadow-2xl transition-all duration-200 ring-2 ring-amber-400 flex items-center justify-center gap-3"
              >
                <PlusCircle className="w-6 h-6 text-white" />
                <span>SUBMIT REPORT ({formData.category})</span>
              </button>
            </div>

          </form>
        </div>

        {/* Priority Calculation Live Preview Panel */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-xl border-2 border-amber-400 sticky top-24">
            
            <div className="flex items-center gap-2 text-amber-400 mb-4 pb-3 border-b border-slate-800">
              <Sparkles className="w-5 h-5" />
              <h3 className="font-extrabold text-sm uppercase tracking-wide">Automated Priority Calculator</h3>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed mb-6">
              Our system automatically calculates priority score based on affected population, severity, and category urgency.
            </p>

            <div className="space-y-4">
              
              <div className="p-4 bg-slate-800 rounded-xl border border-slate-700">
                <span className="text-[11px] text-slate-400 uppercase tracking-wider block font-semibold">Calculated Priority Level</span>
                <span className={`text-xl font-black block mt-1 uppercase ${
                  livePriority.priority === 'CRITICAL' ? 'text-red-400' :
                  livePriority.priority === 'HIGH' ? 'text-amber-400' :
                  livePriority.priority === 'MEDIUM' ? 'text-amber-200' : 'text-emerald-300'
                }`}>
                  {livePriority.priority} PRIORITY
                </span>
                <span className="text-[11px] text-slate-400 mt-1 block">
                  Priority Score: <strong>{livePriority.priorityScore} / 120</strong>
                </span>
              </div>

              <div className="p-4 bg-[#005A36] rounded-xl border border-emerald-400/40 space-y-1">
                <span className="text-[11px] text-emerald-200 font-bold uppercase tracking-wider block">Target Attention SLA</span>
                <p className="text-sm font-extrabold text-white">
                  {livePriority.targetResponse}
                </p>
                <p className="text-[10px] text-emerald-200 pt-1">
                  *Platform-defined response target for district officers.
                </p>
              </div>

              <div className="p-3 bg-slate-800/80 rounded-lg text-[11px] text-slate-300 space-y-1.5 border border-slate-700">
                <div className="flex justify-between">
                  <span>Selected Category:</span>
                  <span className="font-bold text-amber-300 truncate max-w-[140px]">{formData.category}</span>
                </div>
                <div className="flex justify-between">
                  <span>AI Confidence:</span>
                  <span className="font-bold text-emerald-400">{formData.aiConfidence ? `${formData.aiConfidence}%` : 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Category Urgency:</span>
                  <span className="font-bold text-emerald-400">+15 pts</span>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
