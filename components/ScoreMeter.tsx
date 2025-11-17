
import React from 'react';

interface ScoreMeterProps {
  value: number;
  label: string;
  size?: 'small' | 'large';
}

const ScoreMeter: React.FC<ScoreMeterProps> = ({ value, label, size = 'small' }) => {
  const percentage = Math.round(value * 100);
  
  const getColor = (val: number) => {
    if (val > 0.8) return 'text-green-400';
    if (val > 0.6) return 'text-yellow-400';
    return 'text-orange-400';
  };
  
  if (size === 'large') {
    const radius = 54;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - value * circumference;
    const colorClass = getColor(value);

    return (
      <div className="flex flex-col items-center justify-center p-2 rounded-lg">
        <div className="relative">
          <svg className="transform -rotate-90" width="120" height="120">
            <circle className="text-slate-700" strokeWidth="8" stroke="currentColor" fill="transparent" r={radius} cx="60" cy="60" />
            <circle className={colorClass} strokeWidth="8" strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" stroke="currentColor" fill="transparent" r={radius} cx="60" cy="60" />
          </svg>
          <span className={`absolute inset-0 flex items-center justify-center text-2xl font-bold ${colorClass}`}>
            {percentage}%
          </span>
        </div>
        <span className="mt-2 text-sm font-semibold text-slate-300">{label}</span>
      </div>
    );
  }

  // Small version
  const widthPercentage = `${percentage}%`;
  const colorClassBg = getColor(value).replace('text-', 'bg-');
  
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs font-medium text-slate-400">{label}</span>
        <span className={`text-xs font-bold ${getColor(value)}`}>{percentage}%</span>
      </div>
      <div className="w-full bg-slate-700 rounded-full h-2">
        <div className={`${colorClassBg} h-2 rounded-full`} style={{ width: widthPercentage }}></div>
      </div>
    </div>
  );
};

export default ScoreMeter;
