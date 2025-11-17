
import React from 'react';
import type { CareerRecommendationResponse } from '../types';
import type { View } from '../App';
import CareerCard from './CareerCard';
import ScoreMeter from './ScoreMeter';

interface ResultsDisplayProps {
  recommendations: CareerRecommendationResponse;
  onNavigate: (view: View) => void;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ recommendations, onNavigate }) => {
  const {
    profile_summary,
    strengths,
    top_career_matches,
    action_plan,
    skill_gap_analysis,
    coach_tip,
    confidence_score
  } = recommendations;

  return (
    <div className="space-y-10">
      <div className="text-center p-6 bg-slate-800/50 rounded-xl border border-slate-700">
        <h2 className="text-3xl font-bold text-cyan-300">Your Personalized Career Plan</h2>
        <p className="mt-2 text-slate-400 max-w-2xl mx-auto">{profile_summary}</p>
        <div className="mt-4 inline-block">
            <ScoreMeter value={confidence_score} label="Overall Confidence" size="large" />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
          <h3 className="text-xl font-semibold mb-4 text-slate-200">Your Core Strengths</h3>
          <div className="flex flex-wrap gap-2">
            {strengths.map((strength, i) => (
              <span key={i} className="bg-cyan-500/10 text-cyan-300 text-sm font-medium px-3 py-1 rounded-full">{strength}</span>
            ))}
          </div>
        </div>
         <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
          <h3 className="text-xl font-semibold mb-4 text-slate-200">Coach's Tip</h3>
          <p className="text-slate-300 italic">"{coach_tip}"</p>
        </div>
      </div>


      <div>
        <h3 className="text-2xl font-bold text-center mb-6 text-slate-200">Top Career Matches</h3>
        <div className="space-y-6">
          {top_career_matches.map((rec, index) => (
            <CareerCard key={index} recommendation={rec} onNavigate={onNavigate} />
          ))}
        </div>
      </div>

      <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
        <h3 className="text-xl font-semibold mb-4 text-slate-200">Your Action Plan</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div>
                <h4 className="font-bold text-cyan-400 mb-2">Short Term (0-6 Months)</h4>
                <ul className="list-disc list-inside space-y-1 text-slate-400">
                    {action_plan.short_term.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
            </div>
             <div>
                <h4 className="font-bold text-cyan-400 mb-2">Medium Term (6-18 Months)</h4>
                <ul className="list-disc list-inside space-y-1 text-slate-400">
                    {action_plan.medium_term.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
            </div>
             <div>
                <h4 className="font-bold text-cyan-400 mb-2">Long Term (2-5 Years)</h4>
                <ul className="list-disc list-inside space-y-1 text-slate-400">
                    {action_plan.long_term.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
            </div>
        </div>
      </div>
      
      <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
        <h3 className="text-xl font-semibold mb-4 text-slate-200">Skill Gap Analysis</h3>
        <div className="space-y-4">
            {skill_gap_analysis.map((skill, i) => (
                <div key={i} className="bg-slate-700/40 p-3 rounded-lg">
                    <div className="flex justify-between items-center">
                        <p className="font-semibold text-slate-300">{skill.skill}</p>
                        <span className="capitalize text-xs font-medium bg-slate-600 px-2 py-0.5 rounded">{skill.current_level}</span>
                    </div>
                    <p className="text-sm text-cyan-400 mt-1">
                       <span className="font-bold">Next Step:</span> {skill.recommended_action}
                    </p>
                </div>
            ))}
        </div>
      </div>


      <div className="text-center mt-12">
        <button
          onClick={() => onNavigate('ASSESSMENT')}
          className="px-8 py-3 bg-slate-700 hover:bg-slate-600 rounded-md font-semibold transition-colors"
        >
          Start a New Assessment
        </button>
      </div>
    </div>
  );
};

export default ResultsDisplay;
