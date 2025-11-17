
import React from 'react';
import type { CbcRecommendation } from '../types';
import type { View } from '../App';
import ScoreMeter from './ScoreMeter';

interface CbcResultsDisplayProps {
  recommendation: CbcRecommendation;
  onNavigate: (view: View) => void;
}

const CbcResultsDisplay: React.FC<CbcResultsDisplayProps> = ({ recommendation, onNavigate }) => {
  const { cbc_profile, micro_pathways, recommended_activities, teacher_notes, africa_relevance } = recommendation;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-cyan-300">Child's Competency Profile</h2>
        <p className="mt-2 text-slate-400">An overview of the child's emerging strengths based on your observations.</p>
      </div>

      <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
        <h3 className="text-xl font-semibold mb-4 text-slate-200">Core Competencies</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
          {Object.entries(cbc_profile.competency_scores).map(([key, value]) => (
            <div key={key} className="text-center">
              <ScoreMeter value={value} label={key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} size="large" />
            </div>
          ))}
        </div>
      </div>
      
       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                <h3 className="text-xl font-semibold mb-4 text-slate-200">Recommended Micro-Pathways</h3>
                 <div className="space-y-4">
                    {micro_pathways.map((pathway, index) => (
                        <div key={index} className="bg-slate-700/40 p-4 rounded-lg">
                            <h4 className="font-bold text-cyan-400">{pathway.name}</h4>
                            <p className="text-sm text-slate-400 mt-1">{pathway.description}</p>
                        </div>
                    ))}
                </div>
            </div>
             <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                <h3 className="text-xl font-semibold mb-4 text-slate-200">Gamified Activities & Play</h3>
                 <ul className="list-disc list-inside space-y-2 text-slate-300">
                    {recommended_activities.map((activity, index) => (
                        <li key={index}>{activity}</li>
                    ))}
                 </ul>
            </div>
       </div>

      <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
        <h3 className="text-xl font-semibold mb-4 text-slate-200">Africa Relevance &amp; Long-term Impact</h3>
        <div className="space-y-3 mb-4 flex flex-col sm:flex-row gap-4">
            <ScoreMeter value={africa_relevance.stem_alignment_score} label="Future STEM Alignment" />
            <ScoreMeter value={africa_relevance.problem_centrality_score} label="Problem Centrality" />
        </div>
        <p className="text-slate-300 leading-relaxed text-sm">{africa_relevance.development_contribution}</p>
      </div>


      <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
        <h3 className="text-xl font-semibold mb-2 text-slate-200">Notes for Parents & Teachers</h3>
        <p className="text-slate-300 leading-relaxed">{teacher_notes}</p>
      </div>


      <div className="text-center mt-12">
        <button
          onClick={() => onNavigate('ASSESSMENT')}
          className="px-8 py-3 bg-slate-700 hover:bg-slate-600 rounded-md font-semibold transition-colors"
        >
          Start New Assessment
        </button>
      </div>
    </div>
  );
};

export default CbcResultsDisplay;
