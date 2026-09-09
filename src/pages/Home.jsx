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
  Award,
  Layers,
  HeartHandshake
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ChallengeCard } from '../components/common/ChallengeCard';
import { MOCK_STATS } from '../data/mockData';

export const Home = () => {
  const { problems } = useApp();
  const featuredProblems = problems.slice(0, 3);

  const steps = [
    {
      step: "01",
      title: "Report",
      desc: "Citizens submit societal problems in simple language with location & photos.",
      icon: PlusCircle,
      color: "bg-[#005A36] text-white"
    },
    {
      step: "02",
      title: "Verify",
      desc: "District government officials verify authenticity & system assigns response SLA.",
      icon: ShieldCheck,
      color: "bg-amber-600 text-white"
    },
    {
      step: "03",
      title: "Collaborate",
      desc: "Universities, student innovation cells, & industry partners adopt the challenge.",
      icon: Users,
      color: "bg-indigo-600 text-white"
    },
    {
      step: "04",
      title: "Solve",
      desc: "Students build prototypes & industry sponsors pilot implementation.",
      icon: Sparkles,
      color: "bg-[#B84A17] text-white"
    },
    {
      step: "05",
      title: "Track Impact",
      desc: "Transparent status tracking till problem is solved and verified on ground.",
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
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-amber-400/40 text-amber-300 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Government of Jharkhand Crowdsourcing Initiative</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white">
                Your Problem. <span className="text-amber-400">Our Priority.</span> <br />
                Together, We Solve.
              </h1>

              <p className="text-lg sm:text-xl text-emerald-100 font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
                A simple, trustworthy platform connecting citizens of Jharkhand with government authorities, university student innovators, and industry leaders to solve real community challenges.
              </p>

              {/* Primary & Secondary CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <Link
                  to="/report-problem"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-extrabold text-base text-white bg-gradient-to-r from-[#B84A17] to-amber-600 hover:from-amber-700 hover:to-[#B84A17] shadow-xl hover:shadow-2xl transition-all duration-200 ring-4 ring-amber-400/40 transform hover:-translate-y-0.5"
                >
                  <PlusCircle className="w-6 h-6 text-white" />
                  <span>REPORT A PROBLEM</span>
                </Link>

                <Link
                  to="/explore"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold text-base text-white bg-white/10 hover:bg-white/20 border border-white/30 backdrop-blur-md transition-all"
                >
                  <Search className="w-5 h-5 text-amber-300" />
                  <span>Explore Problems</span>
                </Link>
              </div>

              <div className="pt-2 flex items-center justify-center lg:justify-start gap-6 text-xs text-emerald-200">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400" /> 100% Free Citizen Service
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400" /> Direct Govt SLA Tracking
                </span>
              </div>
            </div>

            {/* Hero Quick Highlight Card */}
            <div className="lg:col-span-5">
              <div className="bg-white/95 backdrop-blur-md text-slate-900 rounded-2xl p-6 sm:p-8 shadow-2xl border-2 border-amber-400/80 space-y-6">
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <h3 className="font-extrabold text-lg text-[#005A36]">Quick Impact Summary</h3>
                    <p className="text-xs text-slate-500">Live Jharkhand Platform Statistics</p>
                  </div>
                  <span className="bg-emerald-100 text-[#005A36] text-xs font-bold px-2.5 py-1 rounded-full border border-emerald-300">
                    Live SIH Data
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200">
                    <span className="text-2xl sm:text-3xl font-black text-[#005A36] block">
                      {MOCK_STATS.problemsReported.toLocaleString()}
                    </span>
                    <span className="text-xs font-semibold text-slate-600">Problems Reported</span>
                  </div>
                  <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200">
                    <span className="text-2xl sm:text-3xl font-black text-amber-700 block">
                      {MOCK_STATS.problemsResolved.toLocaleString()}
                    </span>
                    <span className="text-xs font-semibold text-slate-600">Problems Resolved</span>
                  </div>
                  <div className="p-3.5 bg-indigo-50 rounded-xl border border-indigo-200">
                    <span className="text-2xl sm:text-3xl font-black text-indigo-700 block">
                      {MOCK_STATS.universitiesConnected}
                    </span>
                    <span className="text-xs font-semibold text-slate-600">Universities Partnered</span>
                  </div>
                  <div className="p-3.5 bg-rose-50 rounded-xl border border-rose-200">
                    <span className="text-2xl sm:text-3xl font-black text-rose-700 block">
                      {MOCK_STATS.peopleImpacted}
                    </span>
                    <span className="text-xs font-semibold text-slate-600">People Impacted</span>
                  </div>
                </div>

                <div className="p-4 bg-slate-900 text-white rounded-xl flex items-center justify-between">
                  <div className="space-y-0.5">
                    <p className="text-xs text-amber-300 font-bold">Facing a problem in your village?</p>
                    <p className="text-[11px] text-slate-300">Takes less than 2 minutes to report.</p>
                  </div>
                  <Link
                    to="/report-problem"
                    className="px-3.5 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs rounded-lg transition-colors shrink-0"
                  >
                    Report Now
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Quick Statistics Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-md border border-slate-200">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Transforming Jharkhand Communities Together
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              Transparent, measurable progress across all 24 districts of Jharkhand.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <TrendingUp className="w-6 h-6 text-[#005A36] mx-auto mb-2" />
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 block">{MOCK_STATS.problemsReported}</span>
              <span className="text-xs text-slate-500 font-medium">Problems Reported</span>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <CheckCircle2 className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 block">{MOCK_STATS.problemsResolved}</span>
              <span className="text-xs text-slate-500 font-medium">Solutions Implemented</span>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <GraduationCap className="w-6 h-6 text-indigo-600 mx-auto mb-2" />
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 block">{MOCK_STATS.universitiesConnected}</span>
              <span className="text-xs text-slate-500 font-medium">Universities Active</span>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <Building2 className="w-6 h-6 text-amber-600 mx-auto mb-2" />
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 block">{MOCK_STATS.industryPartners}</span>
              <span className="text-xs text-slate-500 font-medium">Industry CSR Partners</span>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 col-span-2 md:col-span-1">
              <Users className="w-6 h-6 text-[#B84A17] mx-auto mb-2" />
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 block">{MOCK_STATS.peopleImpacted}</span>
              <span className="text-xs text-slate-500 font-medium">Citizens Benefited</span>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF8F5] rounded-3xl p-8 sm:p-12 border border-amber-200/60">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#B84A17] bg-amber-100 px-3 py-1 rounded-full">
              5-Step Simple Process
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-3">
              How Jharkhand Samadhan Works
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Designed specifically for ease of use, transparency, and actionable problem solving.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
            {steps.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={item.step} className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow relative">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm shadow ${item.color}`}>
                        {item.step}
                      </span>
                      <Icon className="w-6 h-6 text-slate-400" />
                    </div>
                    <h3 className="font-extrabold text-slate-900 text-lg mb-2">{item.title}</h3>
                    <p className="text-slate-600 text-xs leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Problems */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Featured Community Challenges</h2>
            <p className="text-slate-600 text-sm">Real societal problems reported by citizens across Jharkhand districts.</p>
          </div>
          <Link
            to="/explore"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#005A36] hover:text-[#003D24] hover:underline"
          >
            <span>View All {problems.length} Problems</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProblems.map(problem => (
            <ChallengeCard key={problem.id} problem={problem} />
          ))}
        </div>
      </section>

      {/* Who Can Help / Stakeholders Collaboration */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 border-t-4 border-amber-400">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold">Who Can Help Solve Challenges?</h2>
            <p className="text-slate-300 text-sm mt-2">
              Our platform brings together three vital stakeholder pillars to work alongside citizens.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="bg-slate-800/80 rounded-2xl p-6 border border-slate-700 hover:border-indigo-400 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center mb-4">
                <GraduationCap className="w-7 h-7" />
              </div>
              <h3 className="font-extrabold text-lg text-white mb-2">Student & University Teams</h3>
              <p className="text-slate-300 text-xs leading-relaxed mb-4">
                Students and researchers analyze real rural problems, conduct field research, and engineer prototype solutions as hackathon & academic projects.
              </p>
              <Link to="/student" className="text-xs font-bold text-indigo-400 hover:underline inline-flex items-center gap-1">
                <span>Explore Student Portal</span> →
              </Link>
            </div>

            <div className="bg-slate-800/80 rounded-2xl p-6 border border-slate-700 hover:border-amber-400 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-amber-600 text-white flex items-center justify-center mb-4">
                <Building2 className="w-7 h-7" />
              </div>
              <h3 className="font-extrabold text-lg text-white mb-2">Industry & CSR Partners</h3>
              <p className="text-slate-300 text-xs leading-relaxed mb-4">
                Corporates offer technical mentorship, equipment, hardware funding, and CSR sponsorships to turn student prototypes into scalable real-world solutions.
              </p>
              <Link to="/industry" className="text-xs font-bold text-amber-400 hover:underline inline-flex items-center gap-1">
                <span>Explore Industry Portal</span> →
              </Link>
            </div>

            <div className="bg-slate-800/80 rounded-2xl p-6 border border-slate-700 hover:border-emerald-400 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-[#005A36] text-white flex items-center justify-center mb-4">
                <ShieldCheck className="w-7 h-7 text-amber-400" />
              </div>
              <h3 className="font-extrabold text-lg text-white mb-2">Government Administration</h3>
              <p className="text-slate-300 text-xs leading-relaxed mb-4">
                District officials verify authenticity, set response targets, provide infrastructure permissions, and ensure permanent implementation on ground.
              </p>
              <Link to="/government" className="text-xs font-bold text-emerald-400 hover:underline inline-flex items-center gap-1">
                <span>Explore Admin Portal</span> →
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* Prominent Footer Banner Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#005A36] via-[#003D24] to-[#1A2E40] text-white rounded-3xl p-8 sm:p-10 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 border-2 border-amber-400/60">
          <div className="space-y-2 text-center sm:text-left">
            <h3 className="text-2xl font-black text-amber-300">Are you facing a problem in your village or town?</h3>
            <p className="text-sm text-emerald-100">
              Report it right now. Government officers, university students, and industry solvers are ready to help.
            </p>
          </div>
          <Link
            to="/report-problem"
            className="px-8 py-4 rounded-xl font-extrabold text-sm text-white bg-[#B84A17] hover:bg-amber-600 shadow-lg transition-all shrink-0 ring-2 ring-amber-300"
          >
            REPORT A PROBLEM NOW
          </Link>
        </div>
      </section>
    </div>
  );
};
