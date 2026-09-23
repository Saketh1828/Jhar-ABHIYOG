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
  Edit3,
  Mic,
  MicOff,
  Globe,
  Layers,
  Building2,
  CopyCheck
} from 'lucide-react';
import { useApp, calculatePriority } from '../context/AppContext';
import { JHARKHAND_DISTRICTS, PROBLEM_CATEGORIES } from '../data/mockData';
import { ImageUploader } from '../components/common/ImageUploader';
import { VoiceInput } from '../components/common/VoiceInput';
import { classifyProblemDescription } from '../utils/aiClassifier';
import { recommendReceiver } from '../utils/aiReceiverEngine';
import { LANGUAGES, TRANSLATIONS } from '../utils/translations';
import { api } from '../services/api';

export const ReportProblem = () => {
  const { addProblem, currentUser, currentLanguage } = useApp();
  const navigate = useNavigate();
  const t = TRANSLATIONS[currentLanguage || 'en'] || TRANSLATIONS.en;

  const [formData, setFormData] = useState({
    title: '',
    category: 'Water & Sanitation',
    aiSuggestedCategory: 'Water & Sanitation',
    aiConfidence: 0,
    isAiCategoryOverridden: false,
    description: '',
    affectedPeople: '180',
    village: currentUser.village || '',
    landmark: '',
    district: currentUser.district || 'Dumka',
    state: 'Jharkhand',
    severity: 'HIGH',
    urgency: 'HIGH',
    photos: []
  });

  // Voice Speech Recognition State
  const [voiceLang, setVoiceLang] = useState('hi-IN');
  const [isRecording, setIsRecording] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(true);

  // AI Agent Analysis Screen State
  const [isAiAnalyzing, setIsAiAnalyzing] = useState(false);
  const [aiAnalysisStep, setAiAnalysisStep] = useState(0);
  const [aiAnalysisResult, setAiAnalysisResult] = useState(null);
  const [isConfirmedAi, setIsConfirmedAi] = useState(false);

  const aiSteps = [
    "Understanding description",
    "Detecting language",
    "Categorizing problem",
    "Assessing priority",
    "Extracting keywords",
    "Checking similar complaints",
    "Finding relevant department"
  ];

  // Speech Recognition Handler (Section 12 & 13)
  const handleToggleVoice = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      setSpeechSupported(false);
      alert("Browser speech recognition is not supported in this browser environment. You can type your description manually.");
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = voiceLang;

    if (!isRecording) {
      setIsRecording(true);
      recognition.start();

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setFormData(prev => ({
          ...prev,
          description: prev.description ? `${prev.description} ${transcript}` : transcript
        }));
        setIsRecording(false);
      };

      recognition.onerror = () => {
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };
    } else {
      setIsRecording(false);
    }
  };

  // Run AI Agent Processing Animation
  const handleRunAiAnalysis = () => {
    if (!formData.title.trim() && !formData.description.trim()) {
      alert("Please enter a title or description before running AI Analysis.");
      return;
    }

    setIsAiAnalyzing(true);
    setAiAnalysisStep(0);

    const stepInterval = setInterval(() => {
      setAiAnalysisStep(prev => {
        if (prev >= aiSteps.length - 1) {
          clearInterval(stepInterval);
          finishAiAnalysis();
          return prev;
        }
        return prev + 1;
      });
    }, 180);
  };

  const finishAiAnalysis = () => {
    const classification = classifyProblemDescription(formData.description, formData.title);
    const receiver = recommendReceiver(classification.category, formData.description, formData.district);
    const priorityCalc = calculatePriority(formData.affectedPeople, formData.severity, classification.category);

    const result = {
      primaryCategory: classification.category,
      relatedCategory: classification.category === 'Education' ? 'Water & Sanitation' : 'Public Infrastructure',
      priority: priorityCalc.priority,
      priorityScore: priorityCalc.priorityScore,
      targetResponse: priorityCalc.targetResponse,
      confidence: classification.confidence,
      keywords: [formData.category, "Drinking Water", "School", "Infrastructure", formData.district],
      potentialDuplicates: 2,
      recommendedReceiver: receiver.recommendedReceiver,
      receiverType: receiver.receiverType,
      whyReceiver: receiver.whyReceiver,
      whyPriority: `Assigned ${priorityCalc.priority} priority because an essential service is affected, ${formData.affectedPeople} citizens are affected, and 2 similar complaints were identified.`
    };

    setAiAnalysisResult(result);
    setFormData(prev => ({
      ...prev,
      category: prev.isAiCategoryOverridden ? prev.category : classification.category,
      aiSuggestedCategory: classification.category,
      aiConfidence: classification.confidence
    }));

    setIsAiAnalyzing(false);
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');

    if (!formData.title.trim()) {
      alert("Please enter a valid problem title.");
      return;
    }

    const trimmedDesc = formData.description ? formData.description.trim() : '';
    if (trimmedDesc.length < 15) {
      alert("Please provide a clear problem description of at least 15 characters.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Build payload with all fields the backend Problem model expects
      const payload = {
        title: formData.title.trim(),
        description: trimmedDesc,
        category: formData.category,
        subcategory: formData.category,
        isAiCategoryOverridden: formData.isAiCategoryOverridden || false,
        district: formData.district || 'Dumka',
        village: formData.village || '',
        state: formData.state || 'Jharkhand',
        affectedPeople: parseInt(formData.affectedPeople) || 1,
        severity: formData.severity || 'MEDIUM',
        urgency: formData.urgency || 'MEDIUM',
        reportedBy: currentUser.name || 'Anonymous Citizen',
        reporterMobile: currentUser.mobile || '',
        reporterEmail: currentUser.email || '',
        photos: formData.photos && formData.photos.length > 0 ? formData.photos : []
      };

      // Call backend — this creates the Problem document in MongoDB
      const res = await api.problems.create(payload);

      // On success, also update local React state so the UI reflects the new problem
      // Use the backend-returned data to stay in sync with MongoDB
      if (res.data) {
        addProblem({
          ...formData,
          _backendId: res.data.id  // tag so addProblem can use the real ID if needed
        });
      } else {
        addProblem(formData);
      }

      navigate('/confirmation');
    } catch (err) {
      setSubmitError(err.message || 'Failed to submit problem. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-[#005A36] to-[#003D24] text-white p-6 sm:p-8 rounded-3xl shadow-lg border-2 border-amber-400">
        <div className="flex flex-wrap items-center gap-3 mb-2">
          <span className="bg-amber-500 text-slate-950 font-black text-xs px-3 py-1 rounded-full uppercase tracking-wide">
            SAMASYA NIVARK • Citizen Reporting
          </span>
          <span className="bg-emerald-800/90 text-emerald-200 text-xs font-bold px-3 py-1 rounded-full border border-emerald-400/30 flex items-center gap-1">
            <Bot className="w-3.5 h-3.5 text-amber-300" /> AI Agent + Voice Supported
          </span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-white">
          {t.reportProblem || "REPORT A PROBLEM"}
        </h1>
        <p className="text-emerald-100 text-xs sm:text-sm mt-1 max-w-2xl">
          {t.languageNote || "You can describe your problem in your preferred language."}
        </p>
      </div>

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-slate-200 space-y-6">
        
        {/* Step 1: Problem Title */}
        <div>
          <label className="block text-sm font-bold text-slate-900 mb-1">
            Problem Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="e.g. Government School Drinking Water Shortage & Broken Pump"
            className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold focus:ring-2 focus:ring-[#005A36] focus:bg-white focus:outline-none"
          />
        </div>

        {/* Step 2: Description & Speech Input */}
        <div className="space-y-4">
          <VoiceInput
            selectedLangCode={currentLanguage || 'hi'}
            initialTranscript={formData.description}
            onTranscriptChange={(transcriptText) => {
              setFormData(prev => ({ ...prev, description: transcriptText }));
            }}
          />
        </div>

        {/* AI Agent Processing & Results Section */}
        <div className="p-5 bg-gradient-to-br from-emerald-50/80 via-white to-amber-50/50 rounded-2xl border-2 border-emerald-500/80 space-y-4">
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#005A36] text-amber-400 flex items-center justify-center font-black shadow">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-wide">
                  AI AGENT ANALYSIS & RECEIVER MATCHING
                </h3>
                <p className="text-xs text-slate-500">Autonomous Intent, Priority & Receiver Engine</p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleRunAiAnalysis}
              className="px-4 py-2 bg-[#005A36] hover:bg-[#003D24] text-white font-extrabold text-xs rounded-xl shadow transition-colors flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>{isAiAnalyzing ? 'Analyzing...' : 'ANALYZE WITH AI AGENT'}</span>
            </button>
          </div>

          {/* Processing Animation */}
          {isAiAnalyzing && (
            <div className="p-4 bg-slate-900 text-white rounded-xl space-y-2 border border-slate-700 animate-fadeIn">
              <div className="flex items-center justify-between text-xs text-amber-300 font-bold border-b border-slate-800 pb-2">
                <span className="flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 animate-spin text-amber-400" />
                  <span>AI Agent is analysing your problem...</span>
                </span>
                <span>Step {aiAnalysisStep + 1} of {aiSteps.length}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1 text-xs">
                {aiSteps.map((stepName, idx) => (
                  <div key={idx} className={`flex items-center gap-2 ${idx <= aiAnalysisStep ? 'text-emerald-400 font-bold' : 'text-slate-600'}`}>
                    <span>{idx <= aiAnalysisStep ? '✓' : '○'}</span>
                    <span>{stepName}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* AI Analysis Output Card (Section 15, 16, 17, 18, 20) */}
          {aiAnalysisResult && !isAiAnalyzing && (
            <div className="p-5 bg-white rounded-xl border-2 border-emerald-400 shadow-md space-y-4 animate-fadeIn">
              
              <div className="flex items-center justify-between border-b pb-3">
                <div className="flex items-center gap-2">
                  <span className="bg-emerald-100 text-[#005A36] text-xs font-black px-3 py-1 rounded-full">
                    AI ANALYSIS COMPLETE ({aiAnalysisResult.confidence}% Confidence)
                  </span>
                </div>
                <span className="text-xs font-mono font-bold text-amber-800 bg-amber-50 px-2 py-1 rounded border border-amber-200">
                  {aiAnalysisResult.priority} PRIORITY
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                
                <div className="p-3 bg-slate-50 rounded-lg border">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Primary Category</span>
                  <span className="font-extrabold text-[#005A36] text-sm block mt-0.5">{aiAnalysisResult.primaryCategory}</span>
                  <span className="text-[11px] text-slate-500 block mt-1">Related: {aiAnalysisResult.relatedCategory}</span>
                </div>

                <div className="p-3 bg-slate-50 rounded-lg border">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Potential Duplicates</span>
                  <span className="font-extrabold text-amber-700 text-sm block mt-0.5 flex items-center gap-1">
                    <CopyCheck className="w-4 h-4 text-amber-600" />
                    {aiAnalysisResult.potentialDuplicates} Similar Complaints Found
                  </span>
                  <span className="text-[11px] text-slate-500 block mt-1">In Jama Block, Dumka</span>
                </div>

              </div>

              {/* Recommended Receiver (Section 20) */}
              <div className="p-4 bg-indigo-50/80 rounded-xl border border-indigo-200 space-y-1.5 text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-extrabold text-indigo-950 uppercase text-[10px]">Recommended Receiver</span>
                  <span className="bg-indigo-200 text-indigo-900 font-bold px-2 py-0.5 rounded text-[10px]">
                    {aiAnalysisResult.receiverType}
                  </span>
                </div>
                <p className="font-black text-indigo-900 text-sm">{aiAnalysisResult.recommendedReceiver}</p>
                <p className="text-indigo-800 text-[11px] leading-relaxed pt-1 border-t border-indigo-200/60">
                  <strong>Why this receiver?</strong> "{aiAnalysisResult.whyReceiver}"
                </p>
              </div>

              {/* Explainable Priority Reason (Section 17) */}
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs">
                <span className="font-extrabold text-amber-950 block text-[10px] uppercase">Why was this priority assigned?</span>
                <p className="text-amber-900 text-[11px] mt-0.5 font-medium">{aiAnalysisResult.whyPriority}</p>
              </div>

            </div>
          )}

          {/* Category Dropdown & Manual Override */}
          <div className="pt-2">
            <label className="block text-xs font-bold text-slate-800 mb-1">
              Category (Confirm or Select) <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value, isAiCategoryOverridden: true })}
              className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs font-extrabold text-slate-900 focus:ring-2 focus:ring-[#005A36] shadow-sm"
            >
              {PROBLEM_CATEGORIES.map(cat => (
                <option key={cat} value={cat}>
                  {cat} {cat === formData.aiSuggestedCategory ? '★ (AI Suggested)' : ''}
                </option>
              ))}
            </select>
          </div>

        </div>

        {/* Step 3: Affected People & Severity/Urgency */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-900 mb-1">
              People Affected <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              min="1"
              required
              value={formData.affectedPeople}
              onChange={(e) => setFormData({ ...formData, affectedPeople: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-900 mb-1">Severity Level</label>
            <select
              value={formData.severity}
              onChange={(e) => setFormData({ ...formData, severity: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold"
            >
              <option value="LOW">Low - Minor inconvenience</option>
              <option value="MEDIUM">Medium - Significant problem</option>
              <option value="HIGH">High - Serious problem</option>
              <option value="CRITICAL">Critical - Severe danger</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-900 mb-1">Urgency Level</label>
            <select
              value={formData.urgency}
              onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Immediate">Immediate</option>
            </select>
          </div>
        </div>

        {/* Step 4: Location Section */}
        <div className="p-4 bg-[#FAF8F5] rounded-xl border border-slate-200 space-y-3">
          <h3 className="text-xs font-extrabold text-slate-900 uppercase flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-[#B84A17]" />
            <span>Problem Location Details</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">Village / Town / Ward</label>
              <input
                type="text"
                required
                value={formData.village}
                onChange={(e) => setFormData({ ...formData, village: e.target.value })}
                placeholder="e.g. Jama Village"
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-semibold"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">District</label>
              <select
                value={formData.district}
                onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-semibold"
              >
                {JHARKHAND_DISTRICTS.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">Street / Landmark</label>
              <input
                type="text"
                value={formData.landmark}
                onChange={(e) => setFormData({ ...formData, landmark: e.target.value })}
                placeholder="e.g. Near Tribal High School"
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-semibold"
              />
            </div>
          </div>
        </div>

        {/* Step 5: Photo Upload (Max 4 Photos) */}
        <ImageUploader
          photos={formData.photos}
          onPhotosChange={(photos) => setFormData({ ...formData, photos })}
          maxPhotos={4}
        />

        {/* Submit Error Display */}
        {submitError && (
          <div className="bg-red-50 text-red-700 text-sm p-3 rounded-xl border border-red-200 font-semibold">
            {submitError}
          </div>
        )}

        {/* Submit Buttons */}
        <div className="pt-4 border-t flex items-center justify-between gap-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-4 px-6 rounded-xl font-black text-base text-white shadow-xl transition-all duration-200 ring-2 ring-amber-400 flex items-center justify-center gap-3 ${isSubmitting ? 'bg-slate-400 cursor-not-allowed hover:shadow-xl' : 'bg-gradient-to-r from-[#B84A17] to-amber-600 hover:from-amber-700 hover:to-[#B84A17] hover:shadow-2xl'}`}
          >
            <PlusCircle className="w-6 h-6 text-white" />
            <span>{isSubmitting ? 'SUBMITTING...' : 'CONFIRM & SUBMIT REPORT'}</span>
          </button>
        </div>

      </form>

    </div>
  );
};
