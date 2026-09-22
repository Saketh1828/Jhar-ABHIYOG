import React from 'react';
import { Link } from 'react-router-dom';
import { 
  PlusCircle, 
  Search, 
  CheckCircle2, 
  ShieldCheck, 
  Users, 
  Building2, 
  GraduationCap, 
  ArrowRight, 
  TrendingUp, 
  MapPin, 
  Sparkles,
  Eye,
  FileText
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ChallengeCard } from '../components/common/ChallengeCard';
import { MOCK_STATS } from '../data/mockData';
import { TRANSLATIONS } from '../utils/translations';

export const Home = () => {
  const { problems, currentLanguage } = useApp();
  const t = TRANSLATIONS[currentLanguage || 'en'] || TRANSLATIONS.en;
  
  const featuredProblems = problems.slice(0, 3);
  const resolvedProblems = problems.filter(p => p.status === 'Resolved').slice(0, 2);

  const steps = [
    {
      step: "01",
      title: t.step1Title || "Citizen Report",
      desc: t.step1Desc || "Citizens submit societal problems via text or voice in their preferred language.",
      icon: PlusCircle,
      color: "bg-[#005A36] text-white"
    },
    {
      step: "02",
      title: t.step2Title || "AI Analysis",
      desc: t.step2Desc || "AI Agent classifies category, assesses priority, extracts keywords, & recommends receiver.",
      icon: Sparkles,
      color: "bg-amber-600 text-white"
    },
    {
      step: "03",
      title: t.step3Title || "Govt Validation",
      desc: t.step3Desc || "Government officials validate report & officially assign responsible department.",
      icon: ShieldCheck,
      color: "bg-indigo-600 text-white"
    },
    {
      step: "04",
      title: t.step4Title || "Academic & Industry Collab",
      desc: t.step4Desc || "Universities, student innovation teams & industry CSR partners build prototypes.",
      icon: Users,
      color: "bg-[#B84A17] text-white"
    },
    {
      step: "05",
      title: t.step5Title || "Resolution & Impact",
      desc: t.step5Desc || "Ground implementation completed, transparently archived under Resolved Problems.",
      icon: CheckCircle2,
      color: "bg-emerald-600 text-white"
    }
  ];

  return (
    <div className="space-y-16 pb-16">
      
      {/* Hero Section */}
      <section className="relative jharkhand-hero-bg text-white py-16 lg:py-24 overflow-hidden border-b-4 border-amber-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-amber-400/40 text-amber-300 text-xs font-black uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>{t.govtInitiative || "SAMASYA NIVARK • Govt of Jharkhand Initiative"}</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-white">
                {t.appName || "SAMASYA NIVARK"}
                <span className="block text-amber-400 text-xl sm:text-3xl font-extrabold mt-2">
                  "{t.tagline || "From Community Problems to Real-World Solutions."}"
                </span>
              </h1>

              <p className="text-base sm:text-lg text-emerald-100 font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
                {t.heroSubtitle || "A citizen-centric digital platform connecting people of Jharkhand with government departments, university student innovators, and industry sponsors to crowdsource & resolve real societal challenges."}
              </p>

              {/* Primary & Secondary CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <Link
                  to="/report-problem"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-black text-base text-white bg-gradient-to-r from-[#B84A17] to-amber-600 hover:from-amber-700 hover:to-[#B84A17] shadow-xl hover:shadow-2xl transition-all duration-200 ring-4 ring-amber-400/40 transform hover:-translate-y-0.5"
                >
                  <PlusCircle className="w-6 h-6 text-white" />
                  <span>{t.reportProblem || "REPORT A PROBLEM"}</span>
                </Link>

                <Link
                  to="/explore"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold text-base text-white bg-white/10 hover:bg-white/20 border border-white/30 backdrop-blur-md transition-all"
                >
                  <Search className="w-5 h-5 text-amber-300" />
                  <span>{t.exploreProblems || "Explore Problems"}</span>
                </Link>
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-emerald-200 font-medium">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400" /> {t.freeCivicService || "100% Free Civic Service"}
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400" /> {t.aiSlaTracking || "AI Receiver Matching & SLA Tracking"}
                </span>
              </div>
            </div>

            {/* Quick Impact Summary Card */}
            <div className="lg:col-span-5">
              <div className="bg-white/95 backdrop-blur-md text-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-amber-400/80 space-y-6">
                
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <h3 className="font-black text-lg text-[#005A36]">{t.impactSummaryTitle || "Platform Impact Summary"}</h3>
                    <p className="text-xs text-slate-500">{t.impactSummarySub || "Live Jharkhand State Statistics"}</p>
                  </div>
                  <span className="bg-emerald-100 text-[#005A36] text-xs font-black px-3 py-1 rounded-full border border-emerald-300">
                    {t.activeSih || "Active SIH 2026"}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                    <span className="text-2xl sm:text-3xl font-black text-[#005A36] block">
                      {MOCK_STATS.problemsReported.toLocaleString()}
                    </span>
                    <span className="text-[11px] font-bold text-slate-600">{t.problemsReported || "Problems Reported"}</span>
                  </div>

                  <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
                    <span className="text-2xl sm:text-3xl font-black text-amber-700 block">
                      {MOCK_STATS.problemsResolved.toLocaleString()}
                    </span>
                    <span className="text-[11px] font-bold text-slate-600">{t.solutionsImplemented || "Solutions Implemented"}</span>
                  </div>

                  <div className="p-3 bg-indigo-50 rounded-xl border border-indigo-200">
                    <span className="text-2xl sm:text-3xl font-black text-indigo-700 block">
                      {MOCK_STATS.universitiesConnected}
                    </span>
                    <span className="text-[11px] font-bold text-slate-600">{t.universitiesActive || "Universities Active"}</span>
                  </div>

                  <div className="p-3 bg-rose-50 rounded-xl border border-rose-200">
                    <span className="text-2xl sm:text-3xl font-black text-rose-700 block">
                      {MOCK_STATS.peopleImpacted}
                    </span>
                    <span className="text-[11px] font-bold text-slate-600">{t.citizensImpacted || "Citizens Impacted"}</span>
                  </div>
                </div>

                {/* Navigation Quick Links */}
                <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                  <Link to="/my-reports" className="p-3 bg-slate-100 hover:bg-slate-200 rounded-xl text-slate-800 flex items-center justify-center gap-1.5 transition-colors">
                    <FileText className="w-4 h-4 text-[#005A36]" />
                    <span>{t.myComplaints || "My Complaints"}</span>
                  </Link>

                  <Link to="/tracked-problems" className="p-3 bg-slate-100 hover:bg-slate-200 rounded-xl text-slate-800 flex items-center justify-center gap-1.5 transition-colors">
                    <Eye className="w-4 h-4 text-indigo-600" />
                    <span>{t.trackedProblems || "Tracked Problems"}</span>
                  </Link>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF8F5] rounded-3xl p-8 sm:p-12 border border-amber-200/60">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-black uppercase tracking-widest text-[#B84A17] bg-amber-100 px-3.5 py-1 rounded-full">
              {t.howItWorksBadge || "5-Stage Collaborative Process"}
            </span>
            <h2 className="text-3xl font-black text-slate-900 mt-3">
              {t.howItWorksHeading || "How Samasya Nivark Solves Problems"}
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              {t.howItWorksSub || "Designed for ease of use, citizen transparency, AI intelligence, and ground execution."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {steps.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.step} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm shadow ${item.color}`}>
                        {item.step}
                      </span>
                      <Icon className="w-6 h-6 text-slate-400" />
                    </div>
                    <h3 className="font-extrabold text-slate-900 text-base mb-2">{item.title}</h3>
                    <p className="text-slate-600 text-xs leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Community Challenges */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">{t.featuredHeading || "Featured Community Challenges"}</h2>
            <p className="text-slate-600 text-sm">{t.featuredSub || "Real societal problems reported by citizens across Jharkhand districts."}</p>
          </div>
          <Link
            to="/explore"
            className="inline-flex items-center gap-2 text-sm font-extrabold text-[#005A36] hover:text-[#003D24] hover:underline"
          >
            <span>{t.viewAllProblems || "View All Problems"} ({problems.length})</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProblems.map(problem => (
            <ChallengeCard key={problem.id} problem={problem} />
          ))}
        </div>
      </section>

      {/* Resolved Problems Callout Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 border-2 border-emerald-300 shadow-md space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4">
            <div>
              <span className="bg-emerald-100 text-[#005A36] text-xs font-black px-3 py-1 rounded-full uppercase">
                {t.archiveBadge || "Public Accountability Archive"}
              </span>
              <h2 className="text-2xl font-black text-slate-900 mt-2">{t.resolvedHeading || "Recently Resolved Problems"}</h2>
            </div>

            <Link
              to="/resolved"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#005A36] hover:bg-[#003D24] text-white font-extrabold text-xs rounded-xl shadow shrink-0"
            >
              <span>{t.exploreResolvedArchive || "Explore Resolved Problems Archive"}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {resolvedProblems.map(item => (
              <div key={item.id} className="p-5 bg-[#FAF8F5] rounded-2xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                    ✓ {t.resolvedProblems || "Resolved"}
                  </span>
                  <span className="text-slate-500 font-semibold">{item.district}, JH</span>
                </div>
                <h3 className="font-extrabold text-slate-900 text-base">{item.title}</h3>
                <p className="text-xs text-slate-600 line-clamp-2">{item.solutionProposed}</p>
                <div className="text-[11px] text-[#005A36] font-bold pt-1">
                  {t.resolvedBy || "Resolved by:"} {item.assignedDepartment || item.assignedTeam || "DWSD Dumka"}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prominent Footer Banner Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#005A36] via-[#003D24] to-[#1A2E40] text-white rounded-3xl p-8 sm:p-10 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 border-2 border-amber-400/60">
          <div className="space-y-2 text-center sm:text-left">
            <h3 className="text-2xl font-black text-amber-300">{t.footerBannerHeading || "Facing a problem in your village or town?"}</h3>
            <p className="text-sm text-emerald-100">
              {t.footerBannerSub || "Report it right now. Government officers, university students, and industry solvers are ready to help."}
            </p>
          </div>
          <Link
            to="/report-problem"
            className="px-8 py-4 rounded-xl font-black text-sm text-white bg-[#B84A17] hover:bg-amber-600 shadow-lg transition-all shrink-0 ring-2 ring-amber-300"
          >
            {t.reportProblemNow || "REPORT A PROBLEM NOW"}
          </Link>
        </div>
      </section>

    </div>
  );
};
