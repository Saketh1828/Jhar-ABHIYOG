import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Sparkles, Users, MapPin, ArrowRight, Code, Wrench, Shield, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PriorityBadge } from '../components/common/PriorityBadge';
import { Modal } from '../components/common/Modal';

export const StudentPortal = () => {
  const { problems, currentUser } = useApp();
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [teamForm, setTeamForm] = useState({ studentName: currentUser.name || 'Ankit Kumar', email: 'ankit@bitmesra.ac.in', university: 'BIT Mesra' });

  // Map problems with required skills for students
  const studentChallenges = problems.map((p, idx) => {
    const skillsMap = [
      ["Civil Engineering", "Hydro-geology", "Water Filtration Tech"],
      ["Pavement Design", "Fly-Ash Aggregate", "GIS Mapping"],
      ["Solar Photovoltaics", "Battery Microgrids", "Electrical Eng"],
      ["Waste Segregation", "Environmental Science", "Recycling Tech"],
      ["Agronomy", "Irrigation Engineering", "Hydrology"]
    ];
    return {
      ...p,
      requiredSkills: skillsMap[idx % skillsMap.length]
    };
  });

  const handleJoinTeam = (e) => {
    e.preventDefault();
    alert(`Success! ${teamForm.studentName} from ${teamForm.university} has registered to join the problem-solving team for ID #${selectedChallenge.id}.`);
    setSelectedChallenge(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Student Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 text-white p-8 rounded-3xl shadow-xl border-b-4 border-indigo-400 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-300 uppercase tracking-wider mb-2">
            <GraduationCap className="w-5 h-5 text-indigo-400" />
            <span>Academic & University Innovation Portal</span>
          </div>
          <h1 className="text-3xl font-extrabold">Student Challenge Innovation Hub</h1>
          <p className="text-indigo-100 text-sm mt-1 max-w-2xl">
            Turn real rural & urban challenges of Jharkhand into your SIH projects, final-year engineering thesis, or capstone research.
          </p>
        </div>

        <div className="bg-indigo-950 p-4 rounded-2xl border border-indigo-700 text-xs shrink-0 space-y-1">
          <span className="text-indigo-300 block font-bold">Partner Universities Connected</span>
          <span className="text-2xl font-black text-white">28 Higher Ed Institutions</span>
        </div>
      </div>

      {/* Recommended Problems */}
      <div className="space-y-4">
        <h2 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-indigo-600" />
          <span>Recommended Challenges for Academic Teams</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {studentChallenges.map((challenge) => (
            <div key={challenge.id} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-4 flex flex-col justify-between">
              
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="font-mono text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded border border-indigo-200">
                    ID: {challenge.id}
                  </span>
                  <PriorityBadge priority={challenge.priority} size="sm" />
                </div>

                <h3 className="font-bold text-slate-900 text-lg line-clamp-2 mb-2">{challenge.title}</h3>
                <p className="text-slate-600 text-xs line-clamp-2 leading-relaxed mb-3">{challenge.description}</p>

                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 p-3 bg-[#FAF8F5] rounded-xl border mb-3">
                  <span className="flex items-center gap-1 font-semibold text-slate-900">
                    <MapPin className="w-3.5 h-3.5 text-[#B84A17]" />
                    {challenge.district}, JH
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1 font-semibold text-slate-900">
                    <Users className="w-3.5 h-3.5 text-amber-600" />
                    {challenge.affectedPeople.toLocaleString()} Impacted
                  </span>
                </div>

                <div>
                  <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider block mb-1.5">
                    Recommended Technical Expertise / Skills
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {challenge.requiredSkills.map((skill, idx) => (
                      <span key={idx} className="bg-slate-100 text-slate-700 text-xs px-2.5 py-1 rounded-md border font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between gap-2 pt-4 border-t border-slate-100">
                <button
                  onClick={() => setSelectedChallenge(challenge)}
                  className="px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-900 text-xs font-bold rounded-lg border border-indigo-200 transition-colors"
                >
                  Join Team
                </button>

                <div className="flex items-center gap-2">
                  <Link
                    to={`/problem/${challenge.id}`}
                    className="px-4 py-2 bg-[#005A36] hover:bg-[#003D24] text-white text-xs font-bold rounded-lg transition-colors inline-flex items-center gap-1"
                  >
                    <span>View Challenge</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* Join Team Modal */}
      <Modal
        isOpen={!!selectedChallenge}
        onClose={() => setSelectedChallenge(null)}
        title="Join Student Innovation Team"
        maxWidth="max-w-md"
      >
        {selectedChallenge && (
          <form onSubmit={handleJoinTeam} className="space-y-4">
            <div className="p-3 bg-indigo-50 text-indigo-950 rounded-xl text-xs font-semibold border border-indigo-200">
              Joining challenge: {selectedChallenge.title}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Student Name</label>
              <input
                type="text"
                required
                value={teamForm.studentName}
                onChange={(e) => setTeamForm({ ...teamForm, studentName: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border rounded-lg text-xs font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">University / College</label>
              <input
                type="text"
                required
                value={teamForm.university}
                onChange={(e) => setTeamForm({ ...teamForm, university: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border rounded-lg text-xs font-semibold"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow"
            >
              Confirm Joining Team
            </button>
          </form>
        )}
      </Modal>

    </div>
  );
};
