
import React from 'react';
import type { View, UserType } from '../App';

interface HeaderProps {
    onNavigate: (view: View) => void;
    currentView: View;
    onReset: () => void;
    userType: UserType;
}

const SparkleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block mr-2 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.293 2.293a1 1 0 010 1.414L10 16l-4 4 4-4 5.293 5.293a1 1 0 001.414 0L21 18M11 5l-1.293-1.293a1 1 0 00-1.414 0L7 5M11 5l2.293 2.293a1 1 0 010 1.414L8 14l4 4-4-4-1.293 1.293a1 1 0 000 1.414l3 3a1 1 0 001.414 0l7-7" />
    </svg>
);

const NavButton: React.FC<{
    onClick: () => void;
    isActive: boolean;
    children: React.ReactNode;
}> = ({ onClick, isActive, children }) => {
    const activeClasses = "bg-cyan-500/10 text-cyan-300";
    const inactiveClasses = "text-slate-400 hover:bg-slate-700/50 hover:text-slate-200";
    return (
        <button
            onClick={onClick}
            className={`px-4 py-2 rounded-md text-sm font-semibold transition-colors ${isActive ? activeClasses : inactiveClasses}`}
        >
            {children}
        </button>
    );
};


const Header: React.FC<HeaderProps> = ({ onNavigate, currentView, onReset, userType }) => {
    const assessmentViews: View[] = ['ASSESSMENT', 'LOADING', 'RESULTS', 'ERROR'];
    const showNav = userType !== 'UNSELECTED';
    const isStandardUser = userType === 'HIGH_SCHOOL' || userType === 'UNIVERSITY' || userType === 'ADULT';

    return (
        <header className="py-6 border-b border-slate-700">
            <div className="container mx-auto px-4 flex justify-between items-center">
                <div className="text-left">
                    <button onClick={onReset} className="flex items-center group">
                        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
                            <SparkleIcon />
                            AI Career <span className="text-cyan-400 group-hover:text-cyan-300 transition-colors">Navigator</span>
                        </h1>
                    </button>
                     <p className="hidden sm:block mt-1 text-sm text-slate-400">Charting Africa's Future in STEM</p>
                </div>

                {showNav && (
                    <nav className="flex items-center gap-1 sm:gap-2">
                         {isStandardUser && (
                            <>
                                <NavButton onClick={() => onNavigate('ASSESSMENT')} isActive={assessmentViews.includes(currentView)}>
                                    Assessment
                                </NavButton>
                                <NavButton onClick={() => onNavigate('RESOURCES')} isActive={currentView === 'RESOURCES'}>
                                    Resources
                                </NavButton>
                                <NavButton onClick={() => onNavigate('PROFILE')} isActive={currentView === 'PROFILE'}>
                                    Profile
                                </NavButton>
                            </>
                         )}
                         {userType === 'CBC_PRIMARY' && (
                             <NavButton onClick={() => onNavigate('ASSESSMENT')} isActive={assessmentViews.includes(currentView)}>
                                New Assessment
                            </NavButton>
                         )}
                    </nav>
                )}
                 {!showNav && (
                     <div className="w-24 h-8"></div> // Placeholder to keep balance
                 )}
            </div>
             {showNav && <div className="text-center mt-4">
                <button onClick={onReset} className="text-xs text-slate-500 hover:text-slate-300 transition-colors">
                    Change Profile Type
                </button>
             </div>}
        </header>
    );
};

export default Header;