
import React from 'react';
import type { UserType } from '../App';

interface UserTypeSelectorProps {
  onSelect: (userType: UserType) => void;
}

const UserTypeCard: React.FC<{
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
}> = ({ title, description, icon, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full text-left bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-700 hover:border-cyan-500 hover:bg-slate-800/50 transition-all transform hover:-translate-y-1 group"
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500/10 transition-colors">
          {icon}
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-100 group-hover:text-cyan-400 transition-colors">{title}</h3>
          <p className="mt-1 text-slate-400 text-sm">{description}</p>
        </div>
      </div>
    </button>
  );
};

const UserTypeSelector: React.FC<UserTypeSelectorProps> = ({ onSelect }) => {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-cyan-300">Welcome to the Navigator</h2>
        <p className="mt-2 text-slate-400">Please select the profile that best describes you or the person you're guiding.</p>
      </div>
      <div className="space-y-4">
        <UserTypeCard
          title="Primary Student (CBC)"
          description="For parents & teachers of learners (ages 6-12). Discover core competencies and get fun, gamified micro-pathways."
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.364 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.364-1.118L2.98 9.11c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          }
          onClick={() => onSelect('CBC_PRIMARY')}
        />
        <UserTypeCard
          title="High School Student"
          description="Explore your interests, discover which courses map to jobs, and get guidance for your next steps after graduation."
          icon={
             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v11.494m-9-5.747h18" />
             </svg>
          }
          onClick={() => onSelect('HIGH_SCHOOL')}
        />
        <UserTypeCard
          title="University Student"
          description="For students in higher education. Align your major and projects with high-demand careers in the market."
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path d="M12 14l9-5-9-5-9 5 9 5z" />
              <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-9.998 12.078 12.078 0 01.665-6.479L12 14z" />
            </svg>
          }
          onClick={() => onSelect('UNIVERSITY')}
        />
        <UserTypeCard
          title="Adult / Career Changer"
          description="For professionals seeking to advance, pivot, or re-enter the workforce. Leverage your experience for a new path."
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          }
          onClick={() => onSelect('ADULT')}
        />
      </div>
    </div>
  );
};

export default UserTypeSelector;
