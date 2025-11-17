
import React from 'react';

const ProfilePage: React.FC = () => {
  const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  return (
    <div className="bg-slate-800 p-6 sm:p-8 rounded-xl shadow-2xl border border-slate-700 space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-cyan-300">Your Career Dashboard</h2>
        <p className="text-slate-400 mt-1">Track your progress, review saved careers, and manage your journey.</p>
      </div>

       <div className="border-t border-slate-700 pt-6">
        <h3 className="text-xl font-semibold mb-4">Saved Career Paths</h3>
        <div className="space-y-3">
            <div className="bg-slate-700/50 p-4 rounded-lg">
                <h4 className="font-semibold text-slate-300">Biotechnologist</h4>
                <p className="text-sm text-slate-400 mt-1">Biotech demand growing 18% in East Africa. Supports local health innovation & food security.</p>
                <div className="mt-3 flex gap-4 text-xs">
                    <span className="font-bold text-green-400">Confidence: 82%</span>
                    <span className="font-bold text-yellow-400">Africa Impact: 86%</span>
                </div>
            </div>
            <p className="text-center text-sm text-slate-500 pt-2">You haven't saved any other careers yet.</p>
        </div>
      </div>

       <div className="border-t border-slate-700 pt-6">
        <h3 className="text-xl font-semibold mb-4">Assessment History</h3>
         <div className="bg-slate-700/50 p-4 rounded-lg flex justify-between items-center">
            <div>
                <p className="font-semibold text-slate-300">Career Assessment</p>
                <p className="text-sm text-slate-400">Completed on {today}</p>
            </div>
            <button className="px-4 py-2 text-sm font-semibold bg-slate-600 hover:bg-slate-500 rounded-md transition-colors">
                View Results
            </button>
        </div>
      </div>

    </div>
  );
};

export default ProfilePage;
