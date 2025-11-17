
import React from 'react';
import type { CareerMatch } from '../types';
import type { View } from '../App';
import ScoreMeter from './ScoreMeter';

interface CareerCardProps {
  recommendation: CareerMatch;
  onNavigate: (view: View) => void;
}

const CareerCard: React.FC<CareerCardProps> = ({ recommendation, onNavigate }) => {
  const { role, fit_reasons, market_insight, confidence } = recommendation;
  
  const handleSave = () => {
    alert(`'${role}' saved to profile! (Feature in development)`);
  };

  const handleExploreResources = () => {
    onNavigate('RESOURCES');
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl shadow-lg overflow-hidden transition-all hover:border-cyan-500/50 hover:shadow-cyan-500/10">
      <div className="p-6">
        <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4">
          <div>
            <h3 className="text-2xl font-bold text-cyan-400">{role}</h3>
            <p className="text-sm text-slate-400 mt-1">{market_insight}</p>
          </div>
          <div className="flex-shrink-0">
             <ScoreMeter value={confidence} label="Confidence" size="large" />
          </div>
        </div>

        <div className="mt-6 bg-slate-700/30 p-4 rounded-lg">
            <h4 className="font-semibold text-slate-300 mb-2">Why It's a Strong Fit</h4>
            <ul className="list-disc list-inside space-y-1 text-slate-400 text-sm">
                {fit_reasons.map((reason, i) => <li key={i}>{reason}</li>)}
            </ul>
        </div>
        
        <div className="mt-6 border-t border-slate-700 pt-4 flex flex-col sm:flex-row items-center gap-4">
            <button onClick={handleSave} className="w-full sm:w-auto flex-1 px-4 py-2 text-sm font-semibold bg-slate-700 hover:bg-slate-600 rounded-md transition-colors">
                Save to Profile
            </button>
            <button onClick={handleExploreResources} className="w-full sm:w-auto flex-1 px-4 py-2 text-sm font-semibold bg-cyan-600 hover:bg-cyan-700 rounded-md transition-colors">
                Explore Learning Resources
            </button>
        </div>

      </div>
    </div>
  );
};

export default CareerCard;