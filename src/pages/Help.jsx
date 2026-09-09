import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle, ChevronDown, ChevronUp, PlusCircle, ShieldCheck, GraduationCap, Building2, Phone, MessageSquare } from 'lucide-react';

export const Help = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      q: "How do I report a societal problem in my village?",
      a: "Click on the large orange 'REPORT A PROBLEM' button at the top of the screen. Fill in your problem title, category, village location, number of people affected, and upload up to 4 photos. Submit the form to instantly receive your tracking ID."
    },
    {
      q: "How does the system calculate problem priority?",
      a: "Priority is automatically calculated based on affected population size, severity level (Low, Medium, High, Critical), and category urgency. Critical problems trigger an immediate government target response SLA."
    },
    {
      q: "How do university students participate?",
      a: "Students can visit the 'Student Portal' or 'Explore Problems' page, select a societal challenge matching their engineering or research discipline, and submit a technical solution blueprint or join a student innovation team."
    },
    {
      q: "How do industry partners offer CSR support?",
      a: "Corporates can visit the 'Industry Portal', select a challenge adopted by a university team, and offer technical mentorship, equipment hardware funding, or CSR grants."
    },
    {
      q: "Is there any fee to report a problem on this portal?",
      a: "No! Jharkhand Samadhan is a 100% free digital platform provided by the Government of Jharkhand to serve citizens."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-[#005A36] to-[#003D24] text-white p-8 rounded-3xl shadow-lg border-2 border-amber-400 text-center space-y-3">
        <div className="w-12 h-12 rounded-full bg-amber-400 text-slate-950 mx-auto flex items-center justify-center font-bold">
          <HelpCircle className="w-7 h-7" />
        </div>
        <h1 className="text-3xl font-extrabold">Help & Citizen Guidance Center</h1>
        <p className="text-emerald-100 text-sm max-w-xl mx-auto">
          Simple step-by-step answers to help you navigate the Jharkhand Samadhan platform easily.
        </p>
      </div>

      {/* 4 Steps Quick Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-black">1</div>
            <h3 className="font-extrabold text-slate-900 text-base">How to Report a Problem</h3>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Click 'REPORT A PROBLEM', describe the issue in simple language, select your district & village, upload ground photos, and submit.
          </p>
          <Link to="/report-problem" className="text-xs font-extrabold text-[#B84A17] hover:underline block pt-1">
            Report a Problem Now →
          </Link>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#005A36] flex items-center justify-center font-black">2</div>
            <h3 className="font-extrabold text-slate-900 text-base">How to Track Progress</h3>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Go to 'My Reports' from the top navigation to view the live 6-stage lifecycle timeline for all your submitted problems.
          </p>
          <Link to="/my-reports" className="text-xs font-extrabold text-[#005A36] hover:underline block pt-1">
            Track My Reports →
          </Link>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-800 flex items-center justify-center font-black">3</div>
            <h3 className="font-extrabold text-slate-900 text-base">How Students Participate</h3>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Students browse societal challenges, form interdisciplinary innovation teams, and submit engineering prototypes to solve rural issues.
          </p>
          <Link to="/student" className="text-xs font-extrabold text-indigo-600 hover:underline block pt-1">
            Go to Student Portal →
          </Link>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center font-black">4</div>
            <h3 className="font-extrabold text-slate-900 text-base">How Organizations Partner</h3>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Corporate CSR departments provide equipment funding, mentorship, and grants to scale student solutions into ground reality.
          </p>
          <Link to="/industry" className="text-xs font-extrabold text-slate-800 hover:underline block pt-1">
            Go to Industry Portal →
          </Link>
        </div>

      </div>

      {/* FAQ Accordion */}
      <div id="faq" className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <h2 className="text-2xl font-black text-slate-900">Frequently Asked Questions</h2>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border border-slate-200 rounded-2xl overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full text-left p-4 bg-slate-50 hover:bg-slate-100 transition-colors flex items-center justify-between font-bold text-slate-900 text-sm"
              >
                <span>{faq.q}</span>
                {openFaq === idx ? <ChevronUp className="w-5 h-5 text-[#005A36]" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
              </button>

              {openFaq === idx && (
                <div className="p-4 bg-white text-xs text-slate-600 leading-relaxed border-t border-slate-200">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Contact Toll Free Box */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 text-center space-y-3 border-2 border-amber-400">
        <h3 className="text-xl font-black text-amber-300">Need Further Assistance?</h3>
        <p className="text-xs text-slate-300">
          Our citizen support team is available Monday through Saturday (9:00 AM – 6:00 PM).
        </p>
        <div className="inline-flex items-center gap-2 px-6 py-3 bg-[#005A36] text-white rounded-xl font-extrabold text-sm border border-emerald-400">
          <Phone className="w-4 h-4 text-amber-400" />
          <span>Toll Free Helpline: 1800-JH-SOLVE (1800-547-6583)</span>
        </div>
      </div>

    </div>
  );
};
